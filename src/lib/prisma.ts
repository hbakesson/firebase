/* eslint-disable */
import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL || "";

/**
 * Robustly parses the Cloud SQL instance connection name from the DATABASE_URL.
 * Supports the standard format: postgresql://user:pass@/db?host=/cloudsql/PROJECT:REGION:INSTANCE
 */
function getCloudSqlConfig() {
  if (!DATABASE_URL || !DATABASE_URL.includes("host=/cloudsql/")) return null;

  try {
    // 1. Create a valid URL for the native parser by adding a dummy host
    const url = new URL(DATABASE_URL.replace('postgresql://', 'http://localhost/'));
    
    // 2. Extract the instance connection name from the 'host' parameter
    let instanceName = url.searchParams.get('host');
    
    if (!instanceName) {
      console.warn('[PRISMA] No Cloud SQL host found in DATABASE_URL. Falling back to default TCP connection.');
      return null;
    }

    // 3. Strip the '/cloudsql/' prefix if it exists (Connector library needs the raw PROJECT:REGION:INSTANCE name)
    const sanitizedInstanceName = instanceName.replace('/cloudsql/', '');

    // 4. Validate the format (PROJECT:REGION:INSTANCE should have 3 segments)
    const segments = sanitizedInstanceName.split(':');
    if (segments.length !== 3) {
      console.warn(`[PRISMA] WARNING: Cloud SQL instance name format seems unusual: "${sanitizedInstanceName}". Expected "PROJECT:REGION:INSTANCE".`);
    }

    // 5. Extract database name from the pathname
    const database = url.pathname.replace('/', '');
    const user = url.username;

    // IMPORTANT: URL API automatically decodes username and password.
    // Double decoding with decodeURIComponent can mangle passwords with actual % or signs.
    const password = url.password;

    console.log(`[PRISMA] Cloud SQL Config Parsed: instance="${sanitizedInstanceName}", database="${database}", user="${user}"`);

    return {
      instanceConnectionName: sanitizedInstanceName,
      user,
      password,
      database,
      ipType: IpAddressTypes.PUBLIC,
    };
  } catch (error: any) {
    console.error(`[PRISMA] CRITICAL BUG: Failed to parse DATABASE_URL: ${error.message}`);
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
    console.log('[PRISMA] Defaulting to TCP connection (Development or non-Cloud SQL URL).');
    return new pg.Pool({ connectionString: DATABASE_URL });
  }

  let realPool: pg.Pool | null = null;
  let connector: Connector | null = null;
  let initPromise: Promise<pg.Pool> | null = null;

  const getPool = async (): Promise<pg.Pool> => {
    if (realPool) return realPool;
    if (initPromise) return initPromise;

    initPromise = (async () => {
      console.log(`[PRISMA] Finalizing Cloud SQL handshake for: ${config.instanceConnectionName}`);
      
      connector = new Connector();
      
      // Fetch connector options for IAM/Auth configuration
      const opts = await connector.getOptions({
        instanceConnectionName: config.instanceConnectionName,
        ipType: config.ipType,
      });

      // DIAGNOSTIC LOG: Let's see what the connector gave us for the pool
      console.log(`[PRISMA] Connector Handshake Success. Options keys: ${Object.keys(opts).join(', ')}`);

      realPool = new pg.Pool({
        user: config.user,
        password: config.password,
        database: config.database,
        max: 10,
        // Explicitly set the stream factory to use the Google Cloud SQL Connector
        stream: () => (connector as any).connect(opts),
      } as any);

      realPool.on('connect', () => console.log('[PRISMA] Database connection stream established.'));
      realPool.on('error', (err) => console.error('[PRISMA] Database Pool Encountered Error:', err.message));

      return realPool;
    })();

    return initPromise;
  };

  const cleanup = async () => {
    if (realPool) {
      console.log('[PRISMA] Closing database pool...');
      await realPool.end();
      realPool = null;
    }
    if (connector) {
      console.log('[PRISMA] Closing Cloud SQL Connector...');
      await connector.close();
      connector = null;
    }
  };

  if (!(global as any)._prisma_cleanup_registered) {
    process.once('SIGINT', cleanup);
    process.once('SIGTERM', cleanup);
    (global as any)._prisma_cleanup_registered = true;
  }

  // Define a dummy pool for the Proxy target (satisfies TypeScript/pg interfaces initially)
  const dummy = new pg.Pool({ max: 0 });

  return new Proxy(dummy, {
    get(target, prop, receiver) {
      if (prop === 'then') return undefined;

      // Wrap the async methods that Prisma Driver Adapter relies on
      if (prop === 'query' || prop === 'connect') {
        return async (...args: any[]) => {
          const pool = await getPool();
          const method = (pool as any)[prop];
          return method.apply(pool, args);
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

// Singleton pattern for the Prisma Client instance
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    console.log('[PRISMA] Instantiating client with optimized Driver Adapter (Lazy-Initial-V2)...');
    const pool = createLazyPool();
    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter, log: ['error', 'warn'] });
  })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

console.log('[PRISMA] Adapter initialized successfully.');

export default prisma;
