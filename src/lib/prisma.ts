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
    // Decode password in case it contains special characters
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
 * A Proxy-based LazyPool that only initializes the heavy Cloud SQL Connector
 * when the first database query is actually performed.
 */
function createLazyPool() {
  const config = getCloudSqlConfig();
  
  if (!config) {
    console.log('[PRISMA] Standard TCP mode detected (Local or Non-Cloud SQL).');
    return new pg.Pool({ connectionString: DATABASE_URL });
  }

  console.log('[PRISMA] Lazy Initialization: Proxy created for Cloud SQL Connector.');

  let realPool: pg.Pool | null = null;
  let connector: Connector | null = null;

  // Cleanup logic
  const cleanup = async () => {
    if (realPool) {
      console.log('[PRISMA] Cleaning up pool...');
      await realPool.end();
      realPool = null;
    }
    if (connector) {
      console.log('[PRISMA] Closing connector...');
      await connector.close();
      connector = null;
    }
  };

  // Signal handlers
  if (!(global as any)._prisma_cleanup_registered) {
    process.once('SIGINT', cleanup);
    process.once('SIGTERM', cleanup);
    (global as any)._prisma_cleanup_registered = true;
  }

  return new Proxy({} as pg.Pool, {
    get(target, prop, receiver) {
      if (prop === 'then') return undefined;

      if (!realPool) {
        console.log(`[PRISMA] Connecting to Cloud SQL instance: ${config.instanceConnectionName}`);
        
        connector = new Connector();
        
        realPool = new pg.Pool({
          user: config.user,
          password: config.password,
          database: config.database,
          max: 10,
          stream: async () => {
            const opts = await connector!.getOptions({
              instanceConnectionName: config.instanceConnectionName,
              ipType: config.ipType,
            });
            return (connector as any).connect(opts);
          },
        });

        realPool.on('connect', () => console.log('[PRISMA] Successfully connected to Cloud SQL.'));
        realPool.on('error', (err) => console.error('[PRISMA] Database Pool Error:', err));
      }

      const value = (realPool as any)[prop];
      return typeof value === 'function' ? value.bind(realPool) : value;
    }
  });
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Singleton pattern for PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    console.log('[PRISMA] Instantiating new PrismaClient with Driver Adapter...');
    const pool = createLazyPool();
    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter, log: ['error', 'warn'] });
  })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
