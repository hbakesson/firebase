/* eslint-disable */
import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";
import { Connector } from "@google-cloud/cloud-sql-connector";

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient | undefined,
  connector: Connector | undefined
};

/**
 * Lazy-initialized Pool for Google Cloud SQL
 * This class wraps a pg.Pool but only initializes it on the first request,
 * allowing us to handle the async nature of the Cloud SQL Connector.
 */
class LazyPool {
  private pool: Pool | null = null;
  private initPromise: Promise<Pool> | null = null;

  constructor(
    private databaseUrl: string,
    private instanceConnectionName: string
  ) {}

  private async getPool(): Promise<Pool> {
    if (this.pool) return this.pool;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      console.log(`[PRISMA] Lazy-initializing Cloud SQL Connector for: ${this.instanceConnectionName}`);
      
      if (!globalForPrisma.connector) {
        globalForPrisma.connector = new Connector();
      }

      // Handle Prisma's socket URL format by adding a dummy host for parsing
      const parseableUrl = this.databaseUrl.replace('@/', '@localhost/');
      const urlParams = new URL(parseableUrl);
      
      const opts = await globalForPrisma.connector.getOptions({
        instanceConnectionName: this.instanceConnectionName,
        ipType: "PUBLIC" as any,
      });

      this.pool = new Pool({
        ...opts,
        user: urlParams.username,
        password: decodeURIComponent(urlParams.password),
        database: urlParams.pathname.replace('/', ''),
      });

      console.log("[PRISMA] Cloud SQL Pool initialized successfully.");
      return this.pool;
    })();

    return this.initPromise;
  }

  // Pool interface required by PrismaPg
  async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const pool = await this.getPool();
    return pool.query(text, params);
  }

  async connect(): Promise<PoolClient> {
    const pool = await this.getPool();
    return pool.connect();
  }

  on(event: "error" | "release" | "connect" | "acquire" | "remove", listener: (...args: any[]) => void): this {
    this.getPool().then(pool => pool.on(event, listener));
    return this;
  }

  async end(): Promise<void> {
    if (this.pool) await this.pool.end();
  }
}

const isBuild = process.env.NEXT_PHASE === "phase-production-build";

const createPrismaClient = () => {
  if (isBuild) {
    console.log("[PRISMA] Build mode detected. Using mock client.");
    return new PrismaClient({
      accelerateUrl: "prisma://mock.prisma-accelerate.io/v1/mock",
    } as any);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("[PRISMA ERROR] DATABASE_URL environment variable is missing.");
  }

  try {
    let pool: Pool | LazyPool;
    
    if (databaseUrl.includes('host=/cloudsql/')) {
      // Prisma Format: host=/cloudsql/project:region:instance
      // We must handle the @/ syntax which the URL constructor rejects
      const parseableUrl = databaseUrl.replace('@/', '@localhost/');
      const urlParams = new URL(parseableUrl);
      const socketPath = urlParams.searchParams.get('host');
      const instanceName = socketPath?.replace('/cloudsql/', '');
      
      if (instanceName) {
        console.log(`[PRISMA] Proxying Cloud SQL connection for: ${instanceName}`);
        pool = new LazyPool(databaseUrl, instanceName);
      } else {
        pool = new Pool({ connectionString: databaseUrl });
      }
    } else {
      pool = new Pool({ connectionString: databaseUrl });
    }

    const adapter = new PrismaPg(pool as any);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("[PRISMA ERROR] Critical initialization failure:", error);
    // Return a client that is guaranteed to fail with a clear message rather than a generic configuration error
    return new PrismaClient({
      errorFormat: 'pretty',
    } as any);
  }
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
