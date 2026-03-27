/* eslint-disable */
import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL || "";

function getCloudSqlConfig() {
  if (!DATABASE_URL || !DATABASE_URL.includes("host=")) return null;

  try {
    // Using a precise regex for the authority section is the most compatible way
    // to handle Cloud SQL strings that often have empty hosts (e.g. @/database).
    // This pattern isolates (username):(password) right after the protocol.
    const authMatch = DATABASE_URL.match(/postgresql:\/\/([^:]+):([^@]+)@/);
    
    const user = authMatch ? decodeURIComponent(authMatch[1]) : 'postgres';
    const password = authMatch ? decodeURIComponent(authMatch[2]) : '';
    
    // The database name is between '@/' or '@' and the start of the query string '?'
    const dbMatch = DATABASE_URL.match(/@(?:\/)?([^?]+)/);
    const database = dbMatch ? decodeURIComponent(dbMatch[1]) : 'postgres';

    // Extract instance connection name from the raw query string.
    const queryString = DATABASE_URL.split('?')[1] || '';
    const searchParams = new URLSearchParams(queryString);
    let instanceConnectionName = searchParams.get('host') || searchParams.get('socket') || '';
    
    if (instanceConnectionName.startsWith('/cloudsql/')) {
      instanceConnectionName = instanceConnectionName.substring(10);
    }

    if (!instanceConnectionName) return null;

    console.log(`[PRISMA] Parsed Config -> User: "${user}", DB: "${database}", Instance: "${instanceConnectionName}"`);
    console.log(`[PRISMA] Credential Check -> Password Length: ${password.length}`);

    return {
      instanceConnectionName,
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
 * A Proxy-based LazyPool that only initializes the heavy Cloud SQL Connector
 * when the first database query is actually performed.
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
      console.log(`[PRISMA] Creating Pool for user "${config.user}" on database "${config.database}"...`);
      connector = new Connector();
      
      const driverOptions = await connector.getOptions({
        instanceConnectionName: config.instanceConnectionName,
        ipType: config.ipType,
      });

      realPool = new pg.Pool({
        ...driverOptions,
        user: config.user,
        password: config.password,
        database: config.database,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });

      realPool.on('connect', () => console.log('[PRISMA] Pooled connection successfully established.'));
      realPool.on('error', (err) => console.error('[PRISMA] Database Pool Error:', err.message));

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
      connector.close();
      connector = null;
    }
  };

  if (!(global as any)._prisma_cleanup_registered) {
    process.once('SIGINT', cleanup);
    process.once('SIGTERM', cleanup);
    (global as any)._prisma_cleanup_registered = true;
  }

  const dummy = new pg.Pool({ max: 0 });

  return new Proxy(dummy, {
    get(target, prop, receiver) {
      if (prop === 'then') return undefined;

      if (prop === 'query' || prop === 'connect') {
        return async (...args: any[]) => {
          const pool = await getPool();
          return (pool as any)[prop](...args);
        };
      }

      if (prop === 'on') {
        return (event: any, listener: any) => {
          getPool().then(pool => pool.on(event, listener));
          return receiver;
        };
      }

      if (prop === 'end') {
        return async () => {
          await cleanup();
        };
      }

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
    console.log('[PRISMA] Instantiating Prisma Client with official Connector pattern...');
    const pool = createLazyPool();
    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter, log: ['error', 'warn'] });
  })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

console.log('[PRISMA] Client initialized.');

export default prisma;
