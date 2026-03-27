/* eslint-disable */
import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL || "";

/**
 * Robustly parses the Cloud SQL instance connection name from the DATABASE_URL.
 */
function getCloudSqlConfig() {
  if (!DATABASE_URL || !DATABASE_URL.includes("host=/cloudsql/")) return null;

  try {
    const url = new URL(DATABASE_URL.replace('postgresql://', 'http://localhost/'));
    let instanceName = url.searchParams.get('host');
    if (!instanceName) return null;

    const sanitizedInstanceName = instanceName.replace('/cloudsql/', '');
    const database = url.pathname.replace('/', '');
    const user = url.username;
    const password = decodeURIComponent(url.password);

    console.log(`[PRISMA] Cloud SQL Parser: instance="${sanitizedInstanceName}", database="${database}", user="${user}"`);

    return {
      instanceConnectionName: sanitizedInstanceName,
      user,
      password,
      database,
      ipType: IpAddressTypes.PUBLIC,
    };
  } catch (error: any) {
    console.error(`[PRISMA] Error parsing Cloud SQL config: ${error.message}`);
    return null;
  }
}

/**
 * A Proxy-based LazyPool that remains synchronous for Prisma initialization
 * but handles the asynchronous Cloud SQL Connector setup internally.
 */
function createLazyPool(): pg.Pool {
  const config = getCloudSqlConfig();
  
  if (!config) {
    console.log('[PRISMA] Standard TCP mode detected.');
    return new pg.Pool({ connectionString: DATABASE_URL });
  }

  let realPool: pg.Pool | null = null;
  let connector: Connector | null = null;
  let initPromise: Promise<pg.Pool> | null = null;

  const getPool = async (): Promise<pg.Pool> => {
    if (realPool) return realPool;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      console.log(`[PRISMA] Initializing Cloud SQL Connector for: ${config.instanceConnectionName}`);
      connector = new Connector();
      
      const opts = await connector.getOptions({
        instanceConnectionName: config.instanceConnectionName,
        ipType: config.ipType,
      });

      realPool = new pg.Pool({
        ...opts,
        user: config.user,
        password: config.password,
        database: config.database,
        max: 10,
      });

      realPool.on('connect', () => console.log('[PRISMA] Successful connection to Cloud SQL.'));
      realPool.on('error', (err) => console.error('[PRISMA] Database Pool Error:', err));

      return realPool;
    })();

    return initPromise;
  };

  const cleanup = async () => {
    if (realPool) {
      await realPool.end();
      realPool = null;
    }
    if (connector) {
      await connector.close();
      connector = null;
    }
  };

  if (!(global as any)._prisma_cleanup_registered) {
    process.once('SIGINT', cleanup);
    process.once('SIGTERM', cleanup);
    (global as any)._prisma_cleanup_registered = true;
  }

  // Define the core methods Prisma needs
  const dummy = new pg.Pool({ max: 0 });

  return new Proxy(dummy, {
    get(target, prop, receiver) {
      if (prop === 'then') return undefined;

      // Handle the main async methods used by the Driver Adapter
      if (prop === 'query' || prop === 'connect') {
        return async (...args: any[]) => {
          const pool = await getPool();
          return (pool as any)[prop](...args);
        };
      }

      if (prop === 'on') {
        return (event: string, listener: any) => {
          getPool().then(pool => pool.on(event, listener));
          return receiver;
        };
      }

      if (prop === 'end') {
        return async () => {
          await cleanup();
        };
      }

      // Delegate any other properties to the real pool once initialized, or the dummy
      const val = Reflect.get(realPool || target, prop, receiver);
      return typeof val === 'function' ? val.bind(realPool || target) : val;
    }
  }) as unknown as pg.Pool;
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const pool = createLazyPool();
    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter, log: ['error', 'warn'] });
  })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

console.log('[PRISMA] Client created with Driver Adapter (GA).');

export default prisma;
