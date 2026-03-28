
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Period
 * 
 */
export type Period = $Result.DefaultSelection<Prisma.$PeriodPayload>
/**
 * Model BudgetAllocation
 * 
 */
export type BudgetAllocation = $Result.DefaultSelection<Prisma.$BudgetAllocationPayload>
/**
 * Model ActualAllocation
 * 
 */
export type ActualAllocation = $Result.DefaultSelection<Prisma.$ActualAllocationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.period`: Exposes CRUD operations for the **Period** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Periods
    * const periods = await prisma.period.findMany()
    * ```
    */
  get period(): Prisma.PeriodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.budgetAllocation`: Exposes CRUD operations for the **BudgetAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BudgetAllocations
    * const budgetAllocations = await prisma.budgetAllocation.findMany()
    * ```
    */
  get budgetAllocation(): Prisma.BudgetAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actualAllocation`: Exposes CRUD operations for the **ActualAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActualAllocations
    * const actualAllocations = await prisma.actualAllocation.findMany()
    * ```
    */
  get actualAllocation(): Prisma.ActualAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    Team: 'Team',
    Project: 'Project',
    Period: 'Period',
    BudgetAllocation: 'BudgetAllocation',
    ActualAllocation: 'ActualAllocation',
    AuditLog: 'AuditLog',
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "team" | "project" | "period" | "budgetAllocation" | "actualAllocation" | "auditLog" | "user" | "account" | "session" | "verificationToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Period: {
        payload: Prisma.$PeriodPayload<ExtArgs>
        fields: Prisma.PeriodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeriodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeriodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          findFirst: {
            args: Prisma.PeriodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeriodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          findMany: {
            args: Prisma.PeriodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>[]
          }
          create: {
            args: Prisma.PeriodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          createMany: {
            args: Prisma.PeriodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeriodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>[]
          }
          delete: {
            args: Prisma.PeriodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          update: {
            args: Prisma.PeriodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          deleteMany: {
            args: Prisma.PeriodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeriodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeriodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>[]
          }
          upsert: {
            args: Prisma.PeriodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodPayload>
          }
          aggregate: {
            args: Prisma.PeriodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeriod>
          }
          groupBy: {
            args: Prisma.PeriodGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeriodGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeriodCountArgs<ExtArgs>
            result: $Utils.Optional<PeriodCountAggregateOutputType> | number
          }
        }
      }
      BudgetAllocation: {
        payload: Prisma.$BudgetAllocationPayload<ExtArgs>
        fields: Prisma.BudgetAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BudgetAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BudgetAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          findFirst: {
            args: Prisma.BudgetAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BudgetAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          findMany: {
            args: Prisma.BudgetAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>[]
          }
          create: {
            args: Prisma.BudgetAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          createMany: {
            args: Prisma.BudgetAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BudgetAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>[]
          }
          delete: {
            args: Prisma.BudgetAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          update: {
            args: Prisma.BudgetAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          deleteMany: {
            args: Prisma.BudgetAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BudgetAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BudgetAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>[]
          }
          upsert: {
            args: Prisma.BudgetAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BudgetAllocationPayload>
          }
          aggregate: {
            args: Prisma.BudgetAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBudgetAllocation>
          }
          groupBy: {
            args: Prisma.BudgetAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BudgetAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BudgetAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<BudgetAllocationCountAggregateOutputType> | number
          }
        }
      }
      ActualAllocation: {
        payload: Prisma.$ActualAllocationPayload<ExtArgs>
        fields: Prisma.ActualAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActualAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActualAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          findFirst: {
            args: Prisma.ActualAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActualAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          findMany: {
            args: Prisma.ActualAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>[]
          }
          create: {
            args: Prisma.ActualAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          createMany: {
            args: Prisma.ActualAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActualAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>[]
          }
          delete: {
            args: Prisma.ActualAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          update: {
            args: Prisma.ActualAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          deleteMany: {
            args: Prisma.ActualAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActualAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActualAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>[]
          }
          upsert: {
            args: Prisma.ActualAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActualAllocationPayload>
          }
          aggregate: {
            args: Prisma.ActualAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActualAllocation>
          }
          groupBy: {
            args: Prisma.ActualAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActualAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActualAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<ActualAllocationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    team?: TeamOmit
    project?: ProjectOmit
    period?: PeriodOmit
    budgetAllocation?: BudgetAllocationOmit
    actualAllocation?: ActualAllocationOmit
    auditLog?: AuditLogOmit
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
    projects: number
    teams: number
    periods: number
    auditLogs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
    projects?: boolean | OrganizationCountOutputTypeCountProjectsArgs
    teams?: boolean | OrganizationCountOutputTypeCountTeamsArgs
    periods?: boolean | OrganizationCountOutputTypeCountPeriodsArgs
    auditLogs?: boolean | OrganizationCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountPeriodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeriodWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    childTeams: number
    projects: number
    allocations: number
    actualAllocations: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    childTeams?: boolean | TeamCountOutputTypeCountChildTeamsArgs
    projects?: boolean | TeamCountOutputTypeCountProjectsArgs
    allocations?: boolean | TeamCountOutputTypeCountAllocationsArgs
    actualAllocations?: boolean | TeamCountOutputTypeCountActualAllocationsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountChildTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetAllocationWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountActualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActualAllocationWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    logs: number
    allocations: number
    actualAllocations: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | ProjectCountOutputTypeCountLogsArgs
    allocations?: boolean | ProjectCountOutputTypeCountAllocationsArgs
    actualAllocations?: boolean | ProjectCountOutputTypeCountActualAllocationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetAllocationWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountActualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActualAllocationWhereInput
  }


  /**
   * Count Type PeriodCountOutputType
   */

  export type PeriodCountOutputType = {
    allocations: number
    actualAllocations: number
  }

  export type PeriodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    allocations?: boolean | PeriodCountOutputTypeCountAllocationsArgs
    actualAllocations?: boolean | PeriodCountOutputTypeCountActualAllocationsArgs
  }

  // Custom InputTypes
  /**
   * PeriodCountOutputType without action
   */
  export type PeriodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeriodCountOutputType
     */
    select?: PeriodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PeriodCountOutputType without action
   */
  export type PeriodCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetAllocationWhereInput
  }

  /**
   * PeriodCountOutputType without action
   */
  export type PeriodCountOutputTypeCountActualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActualAllocationWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Organization$usersArgs<ExtArgs>
    projects?: boolean | Organization$projectsArgs<ExtArgs>
    teams?: boolean | Organization$teamsArgs<ExtArgs>
    periods?: boolean | Organization$periodsArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Organization$usersArgs<ExtArgs>
    projects?: boolean | Organization$projectsArgs<ExtArgs>
    teams?: boolean | Organization$teamsArgs<ExtArgs>
    periods?: boolean | Organization$periodsArgs<ExtArgs>
    auditLogs?: boolean | Organization$auditLogsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
      periods: Prisma.$PeriodPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends Organization$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends Organization$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    periods<T extends Organization$periodsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$periodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Organization$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.projects
   */
  export type Organization$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Organization.teams
   */
  export type Organization$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Organization.periods
   */
  export type Organization$periodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    where?: PeriodWhereInput
    orderBy?: PeriodOrderByWithRelationInput | PeriodOrderByWithRelationInput[]
    cursor?: PeriodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeriodScalarFieldEnum | PeriodScalarFieldEnum[]
  }

  /**
   * Organization.auditLogs
   */
  export type Organization$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    code: string | null
    parentTeamId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    code: string | null
    parentTeamId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    code: number
    parentTeamId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    code?: true
    parentTeamId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    code?: true
    parentTeamId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    code?: true
    parentTeamId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    organizationId: string
    name: string
    code: string
    parentTeamId: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    code?: boolean
    parentTeamId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
    childTeams?: boolean | Team$childTeamsArgs<ExtArgs>
    projects?: boolean | Team$projectsArgs<ExtArgs>
    allocations?: boolean | Team$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Team$actualAllocationsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    code?: boolean
    parentTeamId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    code?: boolean
    parentTeamId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    code?: boolean
    parentTeamId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "code" | "parentTeamId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
    childTeams?: boolean | Team$childTeamsArgs<ExtArgs>
    projects?: boolean | Team$projectsArgs<ExtArgs>
    allocations?: boolean | Team$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Team$actualAllocationsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    parentTeam?: boolean | Team$parentTeamArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      parentTeam: Prisma.$TeamPayload<ExtArgs> | null
      childTeams: Prisma.$TeamPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      allocations: Prisma.$BudgetAllocationPayload<ExtArgs>[]
      actualAllocations: Prisma.$ActualAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      name: string
      code: string
      parentTeamId: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parentTeam<T extends Team$parentTeamArgs<ExtArgs> = {}>(args?: Subset<T, Team$parentTeamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    childTeams<T extends Team$childTeamsArgs<ExtArgs> = {}>(args?: Subset<T, Team$childTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends Team$projectsArgs<ExtArgs> = {}>(args?: Subset<T, Team$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allocations<T extends Team$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, Team$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actualAllocations<T extends Team$actualAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, Team$actualAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly organizationId: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly code: FieldRef<"Team", 'String'>
    readonly parentTeamId: FieldRef<"Team", 'String'>
    readonly isActive: FieldRef<"Team", 'Boolean'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.parentTeam
   */
  export type Team$parentTeamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Team.childTeams
   */
  export type Team$childTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team.projects
   */
  export type Team$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Team.allocations
   */
  export type Team$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    where?: BudgetAllocationWhereInput
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    cursor?: BudgetAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * Team.actualAllocations
   */
  export type Team$actualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    where?: ActualAllocationWhereInput
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    cursor?: ActualAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    priority: number | null
    progress: number | null
  }

  export type ProjectSumAggregateOutputType = {
    priority: number | null
    progress: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    teamId: string | null
    name: string | null
    code: string | null
    description: string | null
    status: string | null
    priority: number | null
    progress: number | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    teamId: string | null
    name: string | null
    code: string | null
    description: string | null
    status: string | null
    priority: number | null
    progress: number | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    organizationId: number
    teamId: number
    name: number
    code: number
    description: number
    status: number
    priority: number
    progress: number
    createdAt: number
    updatedAt: number
    createdBy: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    priority?: true
    progress?: true
  }

  export type ProjectSumAggregateInputType = {
    priority?: true
    progress?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    organizationId?: true
    teamId?: true
    name?: true
    code?: true
    description?: true
    status?: true
    priority?: true
    progress?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    organizationId?: true
    teamId?: true
    name?: true
    code?: true
    description?: true
    status?: true
    priority?: true
    progress?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    organizationId?: true
    teamId?: true
    name?: true
    code?: true
    description?: true
    status?: true
    priority?: true
    progress?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    organizationId: string | null
    teamId: string | null
    name: string
    code: string
    description: string | null
    status: string
    priority: number
    progress: number
    createdAt: Date
    updatedAt: Date
    createdBy: string
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    teamId?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    progress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
    logs?: boolean | Project$logsArgs<ExtArgs>
    allocations?: boolean | Project$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Project$actualAllocationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    teamId?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    progress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    teamId?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    progress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    organizationId?: boolean
    teamId?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    progress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "teamId" | "name" | "code" | "description" | "status" | "priority" | "progress" | "createdAt" | "updatedAt" | "createdBy", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
    logs?: boolean | Project$logsArgs<ExtArgs>
    allocations?: boolean | Project$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Project$actualAllocationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Project$organizationArgs<ExtArgs>
    team?: boolean | Project$teamArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
      logs: Prisma.$AuditLogPayload<ExtArgs>[]
      allocations: Prisma.$BudgetAllocationPayload<ExtArgs>[]
      actualAllocations: Prisma.$ActualAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string | null
      teamId: string | null
      name: string
      code: string
      description: string | null
      status: string
      priority: number
      progress: number
      createdAt: Date
      updatedAt: Date
      createdBy: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends Project$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Project$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    team<T extends Project$teamArgs<ExtArgs> = {}>(args?: Subset<T, Project$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    logs<T extends Project$logsArgs<ExtArgs> = {}>(args?: Subset<T, Project$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allocations<T extends Project$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actualAllocations<T extends Project$actualAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$actualAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly organizationId: FieldRef<"Project", 'String'>
    readonly teamId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly code: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly priority: FieldRef<"Project", 'Int'>
    readonly progress: FieldRef<"Project", 'Int'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly createdBy: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.organization
   */
  export type Project$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Project.team
   */
  export type Project$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Project.logs
   */
  export type Project$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * Project.allocations
   */
  export type Project$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    where?: BudgetAllocationWhereInput
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    cursor?: BudgetAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * Project.actualAllocations
   */
  export type Project$actualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    where?: ActualAllocationWhereInput
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    cursor?: ActualAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Period
   */

  export type AggregatePeriod = {
    _count: PeriodCountAggregateOutputType | null
    _min: PeriodMinAggregateOutputType | null
    _max: PeriodMaxAggregateOutputType | null
  }

  export type PeriodMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    type: string | null
    startDate: Date | null
    endDate: Date | null
    label: string | null
    isLocked: boolean | null
  }

  export type PeriodMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    type: string | null
    startDate: Date | null
    endDate: Date | null
    label: string | null
    isLocked: boolean | null
  }

  export type PeriodCountAggregateOutputType = {
    id: number
    organizationId: number
    type: number
    startDate: number
    endDate: number
    label: number
    isLocked: number
    _all: number
  }


  export type PeriodMinAggregateInputType = {
    id?: true
    organizationId?: true
    type?: true
    startDate?: true
    endDate?: true
    label?: true
    isLocked?: true
  }

  export type PeriodMaxAggregateInputType = {
    id?: true
    organizationId?: true
    type?: true
    startDate?: true
    endDate?: true
    label?: true
    isLocked?: true
  }

  export type PeriodCountAggregateInputType = {
    id?: true
    organizationId?: true
    type?: true
    startDate?: true
    endDate?: true
    label?: true
    isLocked?: true
    _all?: true
  }

  export type PeriodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Period to aggregate.
     */
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     */
    orderBy?: PeriodOrderByWithRelationInput | PeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Periods
    **/
    _count?: true | PeriodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeriodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeriodMaxAggregateInputType
  }

  export type GetPeriodAggregateType<T extends PeriodAggregateArgs> = {
        [P in keyof T & keyof AggregatePeriod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeriod[P]>
      : GetScalarType<T[P], AggregatePeriod[P]>
  }




  export type PeriodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeriodWhereInput
    orderBy?: PeriodOrderByWithAggregationInput | PeriodOrderByWithAggregationInput[]
    by: PeriodScalarFieldEnum[] | PeriodScalarFieldEnum
    having?: PeriodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeriodCountAggregateInputType | true
    _min?: PeriodMinAggregateInputType
    _max?: PeriodMaxAggregateInputType
  }

  export type PeriodGroupByOutputType = {
    id: string
    organizationId: string
    type: string
    startDate: Date
    endDate: Date
    label: string
    isLocked: boolean
    _count: PeriodCountAggregateOutputType | null
    _min: PeriodMinAggregateOutputType | null
    _max: PeriodMaxAggregateOutputType | null
  }

  type GetPeriodGroupByPayload<T extends PeriodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeriodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeriodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeriodGroupByOutputType[P]>
            : GetScalarType<T[P], PeriodGroupByOutputType[P]>
        }
      >
    >


  export type PeriodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    label?: boolean
    isLocked?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    allocations?: boolean | Period$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Period$actualAllocationsArgs<ExtArgs>
    _count?: boolean | PeriodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["period"]>

  export type PeriodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    label?: boolean
    isLocked?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["period"]>

  export type PeriodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    label?: boolean
    isLocked?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["period"]>

  export type PeriodSelectScalar = {
    id?: boolean
    organizationId?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    label?: boolean
    isLocked?: boolean
  }

  export type PeriodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "type" | "startDate" | "endDate" | "label" | "isLocked", ExtArgs["result"]["period"]>
  export type PeriodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    allocations?: boolean | Period$allocationsArgs<ExtArgs>
    actualAllocations?: boolean | Period$actualAllocationsArgs<ExtArgs>
    _count?: boolean | PeriodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PeriodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type PeriodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $PeriodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Period"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      allocations: Prisma.$BudgetAllocationPayload<ExtArgs>[]
      actualAllocations: Prisma.$ActualAllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      type: string
      startDate: Date
      endDate: Date
      label: string
      isLocked: boolean
    }, ExtArgs["result"]["period"]>
    composites: {}
  }

  type PeriodGetPayload<S extends boolean | null | undefined | PeriodDefaultArgs> = $Result.GetResult<Prisma.$PeriodPayload, S>

  type PeriodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeriodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeriodCountAggregateInputType | true
    }

  export interface PeriodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Period'], meta: { name: 'Period' } }
    /**
     * Find zero or one Period that matches the filter.
     * @param {PeriodFindUniqueArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeriodFindUniqueArgs>(args: SelectSubset<T, PeriodFindUniqueArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Period that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeriodFindUniqueOrThrowArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeriodFindUniqueOrThrowArgs>(args: SelectSubset<T, PeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Period that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodFindFirstArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeriodFindFirstArgs>(args?: SelectSubset<T, PeriodFindFirstArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Period that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodFindFirstOrThrowArgs} args - Arguments to find a Period
     * @example
     * // Get one Period
     * const period = await prisma.period.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeriodFindFirstOrThrowArgs>(args?: SelectSubset<T, PeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Periods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Periods
     * const periods = await prisma.period.findMany()
     * 
     * // Get first 10 Periods
     * const periods = await prisma.period.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const periodWithIdOnly = await prisma.period.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeriodFindManyArgs>(args?: SelectSubset<T, PeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Period.
     * @param {PeriodCreateArgs} args - Arguments to create a Period.
     * @example
     * // Create one Period
     * const Period = await prisma.period.create({
     *   data: {
     *     // ... data to create a Period
     *   }
     * })
     * 
     */
    create<T extends PeriodCreateArgs>(args: SelectSubset<T, PeriodCreateArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Periods.
     * @param {PeriodCreateManyArgs} args - Arguments to create many Periods.
     * @example
     * // Create many Periods
     * const period = await prisma.period.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeriodCreateManyArgs>(args?: SelectSubset<T, PeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Periods and returns the data saved in the database.
     * @param {PeriodCreateManyAndReturnArgs} args - Arguments to create many Periods.
     * @example
     * // Create many Periods
     * const period = await prisma.period.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Periods and only return the `id`
     * const periodWithIdOnly = await prisma.period.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeriodCreateManyAndReturnArgs>(args?: SelectSubset<T, PeriodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Period.
     * @param {PeriodDeleteArgs} args - Arguments to delete one Period.
     * @example
     * // Delete one Period
     * const Period = await prisma.period.delete({
     *   where: {
     *     // ... filter to delete one Period
     *   }
     * })
     * 
     */
    delete<T extends PeriodDeleteArgs>(args: SelectSubset<T, PeriodDeleteArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Period.
     * @param {PeriodUpdateArgs} args - Arguments to update one Period.
     * @example
     * // Update one Period
     * const period = await prisma.period.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeriodUpdateArgs>(args: SelectSubset<T, PeriodUpdateArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Periods.
     * @param {PeriodDeleteManyArgs} args - Arguments to filter Periods to delete.
     * @example
     * // Delete a few Periods
     * const { count } = await prisma.period.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeriodDeleteManyArgs>(args?: SelectSubset<T, PeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Periods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Periods
     * const period = await prisma.period.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeriodUpdateManyArgs>(args: SelectSubset<T, PeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Periods and returns the data updated in the database.
     * @param {PeriodUpdateManyAndReturnArgs} args - Arguments to update many Periods.
     * @example
     * // Update many Periods
     * const period = await prisma.period.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Periods and only return the `id`
     * const periodWithIdOnly = await prisma.period.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PeriodUpdateManyAndReturnArgs>(args: SelectSubset<T, PeriodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Period.
     * @param {PeriodUpsertArgs} args - Arguments to update or create a Period.
     * @example
     * // Update or create a Period
     * const period = await prisma.period.upsert({
     *   create: {
     *     // ... data to create a Period
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Period we want to update
     *   }
     * })
     */
    upsert<T extends PeriodUpsertArgs>(args: SelectSubset<T, PeriodUpsertArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Periods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodCountArgs} args - Arguments to filter Periods to count.
     * @example
     * // Count the number of Periods
     * const count = await prisma.period.count({
     *   where: {
     *     // ... the filter for the Periods we want to count
     *   }
     * })
    **/
    count<T extends PeriodCountArgs>(
      args?: Subset<T, PeriodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeriodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Period.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PeriodAggregateArgs>(args: Subset<T, PeriodAggregateArgs>): Prisma.PrismaPromise<GetPeriodAggregateType<T>>

    /**
     * Group by Period.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PeriodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeriodGroupByArgs['orderBy'] }
        : { orderBy?: PeriodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Period model
   */
  readonly fields: PeriodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Period.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeriodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    allocations<T extends Period$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, Period$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actualAllocations<T extends Period$actualAllocationsArgs<ExtArgs> = {}>(args?: Subset<T, Period$actualAllocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Period model
   */
  interface PeriodFieldRefs {
    readonly id: FieldRef<"Period", 'String'>
    readonly organizationId: FieldRef<"Period", 'String'>
    readonly type: FieldRef<"Period", 'String'>
    readonly startDate: FieldRef<"Period", 'DateTime'>
    readonly endDate: FieldRef<"Period", 'DateTime'>
    readonly label: FieldRef<"Period", 'String'>
    readonly isLocked: FieldRef<"Period", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Period findUnique
   */
  export type PeriodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter, which Period to fetch.
     */
    where: PeriodWhereUniqueInput
  }

  /**
   * Period findUniqueOrThrow
   */
  export type PeriodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter, which Period to fetch.
     */
    where: PeriodWhereUniqueInput
  }

  /**
   * Period findFirst
   */
  export type PeriodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter, which Period to fetch.
     */
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     */
    orderBy?: PeriodOrderByWithRelationInput | PeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Periods.
     */
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periods.
     */
    distinct?: PeriodScalarFieldEnum | PeriodScalarFieldEnum[]
  }

  /**
   * Period findFirstOrThrow
   */
  export type PeriodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter, which Period to fetch.
     */
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     */
    orderBy?: PeriodOrderByWithRelationInput | PeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Periods.
     */
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periods.
     */
    distinct?: PeriodScalarFieldEnum | PeriodScalarFieldEnum[]
  }

  /**
   * Period findMany
   */
  export type PeriodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter, which Periods to fetch.
     */
    where?: PeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periods to fetch.
     */
    orderBy?: PeriodOrderByWithRelationInput | PeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Periods.
     */
    cursor?: PeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periods.
     */
    distinct?: PeriodScalarFieldEnum | PeriodScalarFieldEnum[]
  }

  /**
   * Period create
   */
  export type PeriodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * The data needed to create a Period.
     */
    data: XOR<PeriodCreateInput, PeriodUncheckedCreateInput>
  }

  /**
   * Period createMany
   */
  export type PeriodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Periods.
     */
    data: PeriodCreateManyInput | PeriodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Period createManyAndReturn
   */
  export type PeriodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * The data used to create many Periods.
     */
    data: PeriodCreateManyInput | PeriodCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Period update
   */
  export type PeriodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * The data needed to update a Period.
     */
    data: XOR<PeriodUpdateInput, PeriodUncheckedUpdateInput>
    /**
     * Choose, which Period to update.
     */
    where: PeriodWhereUniqueInput
  }

  /**
   * Period updateMany
   */
  export type PeriodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Periods.
     */
    data: XOR<PeriodUpdateManyMutationInput, PeriodUncheckedUpdateManyInput>
    /**
     * Filter which Periods to update
     */
    where?: PeriodWhereInput
    /**
     * Limit how many Periods to update.
     */
    limit?: number
  }

  /**
   * Period updateManyAndReturn
   */
  export type PeriodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * The data used to update Periods.
     */
    data: XOR<PeriodUpdateManyMutationInput, PeriodUncheckedUpdateManyInput>
    /**
     * Filter which Periods to update
     */
    where?: PeriodWhereInput
    /**
     * Limit how many Periods to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Period upsert
   */
  export type PeriodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * The filter to search for the Period to update in case it exists.
     */
    where: PeriodWhereUniqueInput
    /**
     * In case the Period found by the `where` argument doesn't exist, create a new Period with this data.
     */
    create: XOR<PeriodCreateInput, PeriodUncheckedCreateInput>
    /**
     * In case the Period was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeriodUpdateInput, PeriodUncheckedUpdateInput>
  }

  /**
   * Period delete
   */
  export type PeriodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
    /**
     * Filter which Period to delete.
     */
    where: PeriodWhereUniqueInput
  }

  /**
   * Period deleteMany
   */
  export type PeriodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Periods to delete
     */
    where?: PeriodWhereInput
    /**
     * Limit how many Periods to delete.
     */
    limit?: number
  }

  /**
   * Period.allocations
   */
  export type Period$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    where?: BudgetAllocationWhereInput
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    cursor?: BudgetAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * Period.actualAllocations
   */
  export type Period$actualAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    where?: ActualAllocationWhereInput
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    cursor?: ActualAllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * Period without action
   */
  export type PeriodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Period
     */
    select?: PeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Period
     */
    omit?: PeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodInclude<ExtArgs> | null
  }


  /**
   * Model BudgetAllocation
   */

  export type AggregateBudgetAllocation = {
    _count: BudgetAllocationCountAggregateOutputType | null
    _avg: BudgetAllocationAvgAggregateOutputType | null
    _sum: BudgetAllocationSumAggregateOutputType | null
    _min: BudgetAllocationMinAggregateOutputType | null
    _max: BudgetAllocationMaxAggregateOutputType | null
  }

  export type BudgetAllocationAvgAggregateOutputType = {
    plannedHours: number | null
  }

  export type BudgetAllocationSumAggregateOutputType = {
    plannedHours: number | null
  }

  export type BudgetAllocationMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    projectId: string | null
    periodId: string | null
    plannedHours: number | null
    updatedAt: Date | null
  }

  export type BudgetAllocationMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    projectId: string | null
    periodId: string | null
    plannedHours: number | null
    updatedAt: Date | null
  }

  export type BudgetAllocationCountAggregateOutputType = {
    id: number
    teamId: number
    projectId: number
    periodId: number
    plannedHours: number
    updatedAt: number
    _all: number
  }


  export type BudgetAllocationAvgAggregateInputType = {
    plannedHours?: true
  }

  export type BudgetAllocationSumAggregateInputType = {
    plannedHours?: true
  }

  export type BudgetAllocationMinAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    plannedHours?: true
    updatedAt?: true
  }

  export type BudgetAllocationMaxAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    plannedHours?: true
    updatedAt?: true
  }

  export type BudgetAllocationCountAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    plannedHours?: true
    updatedAt?: true
    _all?: true
  }

  export type BudgetAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetAllocation to aggregate.
     */
    where?: BudgetAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetAllocations to fetch.
     */
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BudgetAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BudgetAllocations
    **/
    _count?: true | BudgetAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetAllocationMaxAggregateInputType
  }

  export type GetBudgetAllocationAggregateType<T extends BudgetAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateBudgetAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBudgetAllocation[P]>
      : GetScalarType<T[P], AggregateBudgetAllocation[P]>
  }




  export type BudgetAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BudgetAllocationWhereInput
    orderBy?: BudgetAllocationOrderByWithAggregationInput | BudgetAllocationOrderByWithAggregationInput[]
    by: BudgetAllocationScalarFieldEnum[] | BudgetAllocationScalarFieldEnum
    having?: BudgetAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetAllocationCountAggregateInputType | true
    _avg?: BudgetAllocationAvgAggregateInputType
    _sum?: BudgetAllocationSumAggregateInputType
    _min?: BudgetAllocationMinAggregateInputType
    _max?: BudgetAllocationMaxAggregateInputType
  }

  export type BudgetAllocationGroupByOutputType = {
    id: string
    teamId: string
    projectId: string
    periodId: string
    plannedHours: number
    updatedAt: Date
    _count: BudgetAllocationCountAggregateOutputType | null
    _avg: BudgetAllocationAvgAggregateOutputType | null
    _sum: BudgetAllocationSumAggregateOutputType | null
    _min: BudgetAllocationMinAggregateOutputType | null
    _max: BudgetAllocationMaxAggregateOutputType | null
  }

  type GetBudgetAllocationGroupByPayload<T extends BudgetAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BudgetAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BudgetAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BudgetAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], BudgetAllocationGroupByOutputType[P]>
        }
      >
    >


  export type BudgetAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    plannedHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetAllocation"]>

  export type BudgetAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    plannedHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetAllocation"]>

  export type BudgetAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    plannedHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["budgetAllocation"]>

  export type BudgetAllocationSelectScalar = {
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    plannedHours?: boolean
    updatedAt?: boolean
  }

  export type BudgetAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "projectId" | "periodId" | "plannedHours" | "updatedAt", ExtArgs["result"]["budgetAllocation"]>
  export type BudgetAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }
  export type BudgetAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }
  export type BudgetAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }

  export type $BudgetAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BudgetAllocation"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      period: Prisma.$PeriodPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      projectId: string
      periodId: string
      plannedHours: number
      updatedAt: Date
    }, ExtArgs["result"]["budgetAllocation"]>
    composites: {}
  }

  type BudgetAllocationGetPayload<S extends boolean | null | undefined | BudgetAllocationDefaultArgs> = $Result.GetResult<Prisma.$BudgetAllocationPayload, S>

  type BudgetAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BudgetAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BudgetAllocationCountAggregateInputType | true
    }

  export interface BudgetAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BudgetAllocation'], meta: { name: 'BudgetAllocation' } }
    /**
     * Find zero or one BudgetAllocation that matches the filter.
     * @param {BudgetAllocationFindUniqueArgs} args - Arguments to find a BudgetAllocation
     * @example
     * // Get one BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BudgetAllocationFindUniqueArgs>(args: SelectSubset<T, BudgetAllocationFindUniqueArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BudgetAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BudgetAllocationFindUniqueOrThrowArgs} args - Arguments to find a BudgetAllocation
     * @example
     * // Get one BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BudgetAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, BudgetAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationFindFirstArgs} args - Arguments to find a BudgetAllocation
     * @example
     * // Get one BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BudgetAllocationFindFirstArgs>(args?: SelectSubset<T, BudgetAllocationFindFirstArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BudgetAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationFindFirstOrThrowArgs} args - Arguments to find a BudgetAllocation
     * @example
     * // Get one BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BudgetAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, BudgetAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BudgetAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BudgetAllocations
     * const budgetAllocations = await prisma.budgetAllocation.findMany()
     * 
     * // Get first 10 BudgetAllocations
     * const budgetAllocations = await prisma.budgetAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetAllocationWithIdOnly = await prisma.budgetAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BudgetAllocationFindManyArgs>(args?: SelectSubset<T, BudgetAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BudgetAllocation.
     * @param {BudgetAllocationCreateArgs} args - Arguments to create a BudgetAllocation.
     * @example
     * // Create one BudgetAllocation
     * const BudgetAllocation = await prisma.budgetAllocation.create({
     *   data: {
     *     // ... data to create a BudgetAllocation
     *   }
     * })
     * 
     */
    create<T extends BudgetAllocationCreateArgs>(args: SelectSubset<T, BudgetAllocationCreateArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BudgetAllocations.
     * @param {BudgetAllocationCreateManyArgs} args - Arguments to create many BudgetAllocations.
     * @example
     * // Create many BudgetAllocations
     * const budgetAllocation = await prisma.budgetAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BudgetAllocationCreateManyArgs>(args?: SelectSubset<T, BudgetAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BudgetAllocations and returns the data saved in the database.
     * @param {BudgetAllocationCreateManyAndReturnArgs} args - Arguments to create many BudgetAllocations.
     * @example
     * // Create many BudgetAllocations
     * const budgetAllocation = await prisma.budgetAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BudgetAllocations and only return the `id`
     * const budgetAllocationWithIdOnly = await prisma.budgetAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BudgetAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, BudgetAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BudgetAllocation.
     * @param {BudgetAllocationDeleteArgs} args - Arguments to delete one BudgetAllocation.
     * @example
     * // Delete one BudgetAllocation
     * const BudgetAllocation = await prisma.budgetAllocation.delete({
     *   where: {
     *     // ... filter to delete one BudgetAllocation
     *   }
     * })
     * 
     */
    delete<T extends BudgetAllocationDeleteArgs>(args: SelectSubset<T, BudgetAllocationDeleteArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BudgetAllocation.
     * @param {BudgetAllocationUpdateArgs} args - Arguments to update one BudgetAllocation.
     * @example
     * // Update one BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BudgetAllocationUpdateArgs>(args: SelectSubset<T, BudgetAllocationUpdateArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BudgetAllocations.
     * @param {BudgetAllocationDeleteManyArgs} args - Arguments to filter BudgetAllocations to delete.
     * @example
     * // Delete a few BudgetAllocations
     * const { count } = await prisma.budgetAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BudgetAllocationDeleteManyArgs>(args?: SelectSubset<T, BudgetAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BudgetAllocations
     * const budgetAllocation = await prisma.budgetAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BudgetAllocationUpdateManyArgs>(args: SelectSubset<T, BudgetAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BudgetAllocations and returns the data updated in the database.
     * @param {BudgetAllocationUpdateManyAndReturnArgs} args - Arguments to update many BudgetAllocations.
     * @example
     * // Update many BudgetAllocations
     * const budgetAllocation = await prisma.budgetAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BudgetAllocations and only return the `id`
     * const budgetAllocationWithIdOnly = await prisma.budgetAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BudgetAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, BudgetAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BudgetAllocation.
     * @param {BudgetAllocationUpsertArgs} args - Arguments to update or create a BudgetAllocation.
     * @example
     * // Update or create a BudgetAllocation
     * const budgetAllocation = await prisma.budgetAllocation.upsert({
     *   create: {
     *     // ... data to create a BudgetAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BudgetAllocation we want to update
     *   }
     * })
     */
    upsert<T extends BudgetAllocationUpsertArgs>(args: SelectSubset<T, BudgetAllocationUpsertArgs<ExtArgs>>): Prisma__BudgetAllocationClient<$Result.GetResult<Prisma.$BudgetAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BudgetAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationCountArgs} args - Arguments to filter BudgetAllocations to count.
     * @example
     * // Count the number of BudgetAllocations
     * const count = await prisma.budgetAllocation.count({
     *   where: {
     *     // ... the filter for the BudgetAllocations we want to count
     *   }
     * })
    **/
    count<T extends BudgetAllocationCountArgs>(
      args?: Subset<T, BudgetAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BudgetAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BudgetAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BudgetAllocationAggregateArgs>(args: Subset<T, BudgetAllocationAggregateArgs>): Prisma.PrismaPromise<GetBudgetAllocationAggregateType<T>>

    /**
     * Group by BudgetAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BudgetAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BudgetAllocationGroupByArgs['orderBy'] }
        : { orderBy?: BudgetAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BudgetAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BudgetAllocation model
   */
  readonly fields: BudgetAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BudgetAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BudgetAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    period<T extends PeriodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeriodDefaultArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BudgetAllocation model
   */
  interface BudgetAllocationFieldRefs {
    readonly id: FieldRef<"BudgetAllocation", 'String'>
    readonly teamId: FieldRef<"BudgetAllocation", 'String'>
    readonly projectId: FieldRef<"BudgetAllocation", 'String'>
    readonly periodId: FieldRef<"BudgetAllocation", 'String'>
    readonly plannedHours: FieldRef<"BudgetAllocation", 'Float'>
    readonly updatedAt: FieldRef<"BudgetAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BudgetAllocation findUnique
   */
  export type BudgetAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter, which BudgetAllocation to fetch.
     */
    where: BudgetAllocationWhereUniqueInput
  }

  /**
   * BudgetAllocation findUniqueOrThrow
   */
  export type BudgetAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter, which BudgetAllocation to fetch.
     */
    where: BudgetAllocationWhereUniqueInput
  }

  /**
   * BudgetAllocation findFirst
   */
  export type BudgetAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter, which BudgetAllocation to fetch.
     */
    where?: BudgetAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetAllocations to fetch.
     */
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetAllocations.
     */
    cursor?: BudgetAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetAllocations.
     */
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * BudgetAllocation findFirstOrThrow
   */
  export type BudgetAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter, which BudgetAllocation to fetch.
     */
    where?: BudgetAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetAllocations to fetch.
     */
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BudgetAllocations.
     */
    cursor?: BudgetAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetAllocations.
     */
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * BudgetAllocation findMany
   */
  export type BudgetAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter, which BudgetAllocations to fetch.
     */
    where?: BudgetAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BudgetAllocations to fetch.
     */
    orderBy?: BudgetAllocationOrderByWithRelationInput | BudgetAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BudgetAllocations.
     */
    cursor?: BudgetAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BudgetAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BudgetAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BudgetAllocations.
     */
    distinct?: BudgetAllocationScalarFieldEnum | BudgetAllocationScalarFieldEnum[]
  }

  /**
   * BudgetAllocation create
   */
  export type BudgetAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a BudgetAllocation.
     */
    data: XOR<BudgetAllocationCreateInput, BudgetAllocationUncheckedCreateInput>
  }

  /**
   * BudgetAllocation createMany
   */
  export type BudgetAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BudgetAllocations.
     */
    data: BudgetAllocationCreateManyInput | BudgetAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BudgetAllocation createManyAndReturn
   */
  export type BudgetAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many BudgetAllocations.
     */
    data: BudgetAllocationCreateManyInput | BudgetAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetAllocation update
   */
  export type BudgetAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a BudgetAllocation.
     */
    data: XOR<BudgetAllocationUpdateInput, BudgetAllocationUncheckedUpdateInput>
    /**
     * Choose, which BudgetAllocation to update.
     */
    where: BudgetAllocationWhereUniqueInput
  }

  /**
   * BudgetAllocation updateMany
   */
  export type BudgetAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BudgetAllocations.
     */
    data: XOR<BudgetAllocationUpdateManyMutationInput, BudgetAllocationUncheckedUpdateManyInput>
    /**
     * Filter which BudgetAllocations to update
     */
    where?: BudgetAllocationWhereInput
    /**
     * Limit how many BudgetAllocations to update.
     */
    limit?: number
  }

  /**
   * BudgetAllocation updateManyAndReturn
   */
  export type BudgetAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * The data used to update BudgetAllocations.
     */
    data: XOR<BudgetAllocationUpdateManyMutationInput, BudgetAllocationUncheckedUpdateManyInput>
    /**
     * Filter which BudgetAllocations to update
     */
    where?: BudgetAllocationWhereInput
    /**
     * Limit how many BudgetAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BudgetAllocation upsert
   */
  export type BudgetAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the BudgetAllocation to update in case it exists.
     */
    where: BudgetAllocationWhereUniqueInput
    /**
     * In case the BudgetAllocation found by the `where` argument doesn't exist, create a new BudgetAllocation with this data.
     */
    create: XOR<BudgetAllocationCreateInput, BudgetAllocationUncheckedCreateInput>
    /**
     * In case the BudgetAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BudgetAllocationUpdateInput, BudgetAllocationUncheckedUpdateInput>
  }

  /**
   * BudgetAllocation delete
   */
  export type BudgetAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
    /**
     * Filter which BudgetAllocation to delete.
     */
    where: BudgetAllocationWhereUniqueInput
  }

  /**
   * BudgetAllocation deleteMany
   */
  export type BudgetAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BudgetAllocations to delete
     */
    where?: BudgetAllocationWhereInput
    /**
     * Limit how many BudgetAllocations to delete.
     */
    limit?: number
  }

  /**
   * BudgetAllocation without action
   */
  export type BudgetAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BudgetAllocation
     */
    select?: BudgetAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BudgetAllocation
     */
    omit?: BudgetAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BudgetAllocationInclude<ExtArgs> | null
  }


  /**
   * Model ActualAllocation
   */

  export type AggregateActualAllocation = {
    _count: ActualAllocationCountAggregateOutputType | null
    _avg: ActualAllocationAvgAggregateOutputType | null
    _sum: ActualAllocationSumAggregateOutputType | null
    _min: ActualAllocationMinAggregateOutputType | null
    _max: ActualAllocationMaxAggregateOutputType | null
  }

  export type ActualAllocationAvgAggregateOutputType = {
    actualHours: number | null
  }

  export type ActualAllocationSumAggregateOutputType = {
    actualHours: number | null
  }

  export type ActualAllocationMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    projectId: string | null
    periodId: string | null
    actualHours: number | null
    updatedAt: Date | null
  }

  export type ActualAllocationMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    projectId: string | null
    periodId: string | null
    actualHours: number | null
    updatedAt: Date | null
  }

  export type ActualAllocationCountAggregateOutputType = {
    id: number
    teamId: number
    projectId: number
    periodId: number
    actualHours: number
    updatedAt: number
    _all: number
  }


  export type ActualAllocationAvgAggregateInputType = {
    actualHours?: true
  }

  export type ActualAllocationSumAggregateInputType = {
    actualHours?: true
  }

  export type ActualAllocationMinAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    actualHours?: true
    updatedAt?: true
  }

  export type ActualAllocationMaxAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    actualHours?: true
    updatedAt?: true
  }

  export type ActualAllocationCountAggregateInputType = {
    id?: true
    teamId?: true
    projectId?: true
    periodId?: true
    actualHours?: true
    updatedAt?: true
    _all?: true
  }

  export type ActualAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActualAllocation to aggregate.
     */
    where?: ActualAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActualAllocations to fetch.
     */
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActualAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActualAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActualAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActualAllocations
    **/
    _count?: true | ActualAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActualAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActualAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActualAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActualAllocationMaxAggregateInputType
  }

  export type GetActualAllocationAggregateType<T extends ActualAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateActualAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActualAllocation[P]>
      : GetScalarType<T[P], AggregateActualAllocation[P]>
  }




  export type ActualAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActualAllocationWhereInput
    orderBy?: ActualAllocationOrderByWithAggregationInput | ActualAllocationOrderByWithAggregationInput[]
    by: ActualAllocationScalarFieldEnum[] | ActualAllocationScalarFieldEnum
    having?: ActualAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActualAllocationCountAggregateInputType | true
    _avg?: ActualAllocationAvgAggregateInputType
    _sum?: ActualAllocationSumAggregateInputType
    _min?: ActualAllocationMinAggregateInputType
    _max?: ActualAllocationMaxAggregateInputType
  }

  export type ActualAllocationGroupByOutputType = {
    id: string
    teamId: string
    projectId: string
    periodId: string
    actualHours: number
    updatedAt: Date
    _count: ActualAllocationCountAggregateOutputType | null
    _avg: ActualAllocationAvgAggregateOutputType | null
    _sum: ActualAllocationSumAggregateOutputType | null
    _min: ActualAllocationMinAggregateOutputType | null
    _max: ActualAllocationMaxAggregateOutputType | null
  }

  type GetActualAllocationGroupByPayload<T extends ActualAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActualAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActualAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActualAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], ActualAllocationGroupByOutputType[P]>
        }
      >
    >


  export type ActualAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    actualHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actualAllocation"]>

  export type ActualAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    actualHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actualAllocation"]>

  export type ActualAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    actualHours?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actualAllocation"]>

  export type ActualAllocationSelectScalar = {
    id?: boolean
    teamId?: boolean
    projectId?: boolean
    periodId?: boolean
    actualHours?: boolean
    updatedAt?: boolean
  }

  export type ActualAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "projectId" | "periodId" | "actualHours" | "updatedAt", ExtArgs["result"]["actualAllocation"]>
  export type ActualAllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }
  export type ActualAllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }
  export type ActualAllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    period?: boolean | PeriodDefaultArgs<ExtArgs>
  }

  export type $ActualAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActualAllocation"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      period: Prisma.$PeriodPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      projectId: string
      periodId: string
      actualHours: number
      updatedAt: Date
    }, ExtArgs["result"]["actualAllocation"]>
    composites: {}
  }

  type ActualAllocationGetPayload<S extends boolean | null | undefined | ActualAllocationDefaultArgs> = $Result.GetResult<Prisma.$ActualAllocationPayload, S>

  type ActualAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActualAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActualAllocationCountAggregateInputType | true
    }

  export interface ActualAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActualAllocation'], meta: { name: 'ActualAllocation' } }
    /**
     * Find zero or one ActualAllocation that matches the filter.
     * @param {ActualAllocationFindUniqueArgs} args - Arguments to find a ActualAllocation
     * @example
     * // Get one ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActualAllocationFindUniqueArgs>(args: SelectSubset<T, ActualAllocationFindUniqueArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActualAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActualAllocationFindUniqueOrThrowArgs} args - Arguments to find a ActualAllocation
     * @example
     * // Get one ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActualAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, ActualAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActualAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationFindFirstArgs} args - Arguments to find a ActualAllocation
     * @example
     * // Get one ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActualAllocationFindFirstArgs>(args?: SelectSubset<T, ActualAllocationFindFirstArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActualAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationFindFirstOrThrowArgs} args - Arguments to find a ActualAllocation
     * @example
     * // Get one ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActualAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, ActualAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActualAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActualAllocations
     * const actualAllocations = await prisma.actualAllocation.findMany()
     * 
     * // Get first 10 ActualAllocations
     * const actualAllocations = await prisma.actualAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actualAllocationWithIdOnly = await prisma.actualAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActualAllocationFindManyArgs>(args?: SelectSubset<T, ActualAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActualAllocation.
     * @param {ActualAllocationCreateArgs} args - Arguments to create a ActualAllocation.
     * @example
     * // Create one ActualAllocation
     * const ActualAllocation = await prisma.actualAllocation.create({
     *   data: {
     *     // ... data to create a ActualAllocation
     *   }
     * })
     * 
     */
    create<T extends ActualAllocationCreateArgs>(args: SelectSubset<T, ActualAllocationCreateArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActualAllocations.
     * @param {ActualAllocationCreateManyArgs} args - Arguments to create many ActualAllocations.
     * @example
     * // Create many ActualAllocations
     * const actualAllocation = await prisma.actualAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActualAllocationCreateManyArgs>(args?: SelectSubset<T, ActualAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActualAllocations and returns the data saved in the database.
     * @param {ActualAllocationCreateManyAndReturnArgs} args - Arguments to create many ActualAllocations.
     * @example
     * // Create many ActualAllocations
     * const actualAllocation = await prisma.actualAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActualAllocations and only return the `id`
     * const actualAllocationWithIdOnly = await prisma.actualAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActualAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, ActualAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActualAllocation.
     * @param {ActualAllocationDeleteArgs} args - Arguments to delete one ActualAllocation.
     * @example
     * // Delete one ActualAllocation
     * const ActualAllocation = await prisma.actualAllocation.delete({
     *   where: {
     *     // ... filter to delete one ActualAllocation
     *   }
     * })
     * 
     */
    delete<T extends ActualAllocationDeleteArgs>(args: SelectSubset<T, ActualAllocationDeleteArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActualAllocation.
     * @param {ActualAllocationUpdateArgs} args - Arguments to update one ActualAllocation.
     * @example
     * // Update one ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActualAllocationUpdateArgs>(args: SelectSubset<T, ActualAllocationUpdateArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActualAllocations.
     * @param {ActualAllocationDeleteManyArgs} args - Arguments to filter ActualAllocations to delete.
     * @example
     * // Delete a few ActualAllocations
     * const { count } = await prisma.actualAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActualAllocationDeleteManyArgs>(args?: SelectSubset<T, ActualAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActualAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActualAllocations
     * const actualAllocation = await prisma.actualAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActualAllocationUpdateManyArgs>(args: SelectSubset<T, ActualAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActualAllocations and returns the data updated in the database.
     * @param {ActualAllocationUpdateManyAndReturnArgs} args - Arguments to update many ActualAllocations.
     * @example
     * // Update many ActualAllocations
     * const actualAllocation = await prisma.actualAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActualAllocations and only return the `id`
     * const actualAllocationWithIdOnly = await prisma.actualAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActualAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, ActualAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActualAllocation.
     * @param {ActualAllocationUpsertArgs} args - Arguments to update or create a ActualAllocation.
     * @example
     * // Update or create a ActualAllocation
     * const actualAllocation = await prisma.actualAllocation.upsert({
     *   create: {
     *     // ... data to create a ActualAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActualAllocation we want to update
     *   }
     * })
     */
    upsert<T extends ActualAllocationUpsertArgs>(args: SelectSubset<T, ActualAllocationUpsertArgs<ExtArgs>>): Prisma__ActualAllocationClient<$Result.GetResult<Prisma.$ActualAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActualAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationCountArgs} args - Arguments to filter ActualAllocations to count.
     * @example
     * // Count the number of ActualAllocations
     * const count = await prisma.actualAllocation.count({
     *   where: {
     *     // ... the filter for the ActualAllocations we want to count
     *   }
     * })
    **/
    count<T extends ActualAllocationCountArgs>(
      args?: Subset<T, ActualAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActualAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActualAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActualAllocationAggregateArgs>(args: Subset<T, ActualAllocationAggregateArgs>): Prisma.PrismaPromise<GetActualAllocationAggregateType<T>>

    /**
     * Group by ActualAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActualAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActualAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActualAllocationGroupByArgs['orderBy'] }
        : { orderBy?: ActualAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActualAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActualAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActualAllocation model
   */
  readonly fields: ActualAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActualAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActualAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    period<T extends PeriodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeriodDefaultArgs<ExtArgs>>): Prisma__PeriodClient<$Result.GetResult<Prisma.$PeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActualAllocation model
   */
  interface ActualAllocationFieldRefs {
    readonly id: FieldRef<"ActualAllocation", 'String'>
    readonly teamId: FieldRef<"ActualAllocation", 'String'>
    readonly projectId: FieldRef<"ActualAllocation", 'String'>
    readonly periodId: FieldRef<"ActualAllocation", 'String'>
    readonly actualHours: FieldRef<"ActualAllocation", 'Float'>
    readonly updatedAt: FieldRef<"ActualAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActualAllocation findUnique
   */
  export type ActualAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter, which ActualAllocation to fetch.
     */
    where: ActualAllocationWhereUniqueInput
  }

  /**
   * ActualAllocation findUniqueOrThrow
   */
  export type ActualAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter, which ActualAllocation to fetch.
     */
    where: ActualAllocationWhereUniqueInput
  }

  /**
   * ActualAllocation findFirst
   */
  export type ActualAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter, which ActualAllocation to fetch.
     */
    where?: ActualAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActualAllocations to fetch.
     */
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActualAllocations.
     */
    cursor?: ActualAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActualAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActualAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActualAllocations.
     */
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * ActualAllocation findFirstOrThrow
   */
  export type ActualAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter, which ActualAllocation to fetch.
     */
    where?: ActualAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActualAllocations to fetch.
     */
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActualAllocations.
     */
    cursor?: ActualAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActualAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActualAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActualAllocations.
     */
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * ActualAllocation findMany
   */
  export type ActualAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter, which ActualAllocations to fetch.
     */
    where?: ActualAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActualAllocations to fetch.
     */
    orderBy?: ActualAllocationOrderByWithRelationInput | ActualAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActualAllocations.
     */
    cursor?: ActualAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActualAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActualAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActualAllocations.
     */
    distinct?: ActualAllocationScalarFieldEnum | ActualAllocationScalarFieldEnum[]
  }

  /**
   * ActualAllocation create
   */
  export type ActualAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a ActualAllocation.
     */
    data: XOR<ActualAllocationCreateInput, ActualAllocationUncheckedCreateInput>
  }

  /**
   * ActualAllocation createMany
   */
  export type ActualAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActualAllocations.
     */
    data: ActualAllocationCreateManyInput | ActualAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActualAllocation createManyAndReturn
   */
  export type ActualAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many ActualAllocations.
     */
    data: ActualAllocationCreateManyInput | ActualAllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActualAllocation update
   */
  export type ActualAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a ActualAllocation.
     */
    data: XOR<ActualAllocationUpdateInput, ActualAllocationUncheckedUpdateInput>
    /**
     * Choose, which ActualAllocation to update.
     */
    where: ActualAllocationWhereUniqueInput
  }

  /**
   * ActualAllocation updateMany
   */
  export type ActualAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActualAllocations.
     */
    data: XOR<ActualAllocationUpdateManyMutationInput, ActualAllocationUncheckedUpdateManyInput>
    /**
     * Filter which ActualAllocations to update
     */
    where?: ActualAllocationWhereInput
    /**
     * Limit how many ActualAllocations to update.
     */
    limit?: number
  }

  /**
   * ActualAllocation updateManyAndReturn
   */
  export type ActualAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * The data used to update ActualAllocations.
     */
    data: XOR<ActualAllocationUpdateManyMutationInput, ActualAllocationUncheckedUpdateManyInput>
    /**
     * Filter which ActualAllocations to update
     */
    where?: ActualAllocationWhereInput
    /**
     * Limit how many ActualAllocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActualAllocation upsert
   */
  export type ActualAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the ActualAllocation to update in case it exists.
     */
    where: ActualAllocationWhereUniqueInput
    /**
     * In case the ActualAllocation found by the `where` argument doesn't exist, create a new ActualAllocation with this data.
     */
    create: XOR<ActualAllocationCreateInput, ActualAllocationUncheckedCreateInput>
    /**
     * In case the ActualAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActualAllocationUpdateInput, ActualAllocationUncheckedUpdateInput>
  }

  /**
   * ActualAllocation delete
   */
  export type ActualAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
    /**
     * Filter which ActualAllocation to delete.
     */
    where: ActualAllocationWhereUniqueInput
  }

  /**
   * ActualAllocation deleteMany
   */
  export type ActualAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActualAllocations to delete
     */
    where?: ActualAllocationWhereInput
    /**
     * Limit how many ActualAllocations to delete.
     */
    limit?: number
  }

  /**
   * ActualAllocation without action
   */
  export type ActualAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActualAllocation
     */
    select?: ActualAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActualAllocation
     */
    omit?: ActualAllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActualAllocationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    projectName: string | null
    previousValue: string | null
    newValue: string | null
    userId: string | null
    userEmail: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    projectName: string | null
    previousValue: string | null
    newValue: string | null
    userId: string | null
    userEmail: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    organizationId: number
    action: number
    entityType: number
    entityId: number
    projectName: number
    previousValue: number
    newValue: number
    userId: number
    userEmail: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    organizationId?: true
    action?: true
    entityType?: true
    entityId?: true
    projectName?: true
    previousValue?: true
    newValue?: true
    userId?: true
    userEmail?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    organizationId?: true
    action?: true
    entityType?: true
    entityId?: true
    projectName?: true
    previousValue?: true
    newValue?: true
    userId?: true
    userEmail?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    organizationId?: true
    action?: true
    entityType?: true
    entityId?: true
    projectName?: true
    previousValue?: true
    newValue?: true
    userId?: true
    userEmail?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    organizationId: string | null
    action: string
    entityType: string
    entityId: string | null
    projectName: string
    previousValue: string | null
    newValue: string | null
    userId: string
    userEmail: string
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    projectName?: boolean
    previousValue?: boolean
    newValue?: boolean
    userId?: boolean
    userEmail?: boolean
    timestamp?: boolean
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    projectName?: boolean
    previousValue?: boolean
    newValue?: boolean
    userId?: boolean
    userEmail?: boolean
    timestamp?: boolean
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    projectName?: boolean
    previousValue?: boolean
    newValue?: boolean
    userId?: boolean
    userEmail?: boolean
    timestamp?: boolean
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    organizationId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    projectName?: boolean
    previousValue?: boolean
    newValue?: boolean
    userId?: boolean
    userEmail?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "action" | "entityType" | "entityId" | "projectName" | "previousValue" | "newValue" | "userId" | "userEmail" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | AuditLog$organizationArgs<ExtArgs>
    project?: boolean | AuditLog$projectArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      project: Prisma.$ProjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string | null
      action: string
      entityType: string
      entityId: string | null
      projectName: string
      previousValue: string | null
      newValue: string | null
      userId: string
      userEmail: string
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends AuditLog$organizationArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    project<T extends AuditLog$projectArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly organizationId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly projectName: FieldRef<"AuditLog", 'String'>
    readonly previousValue: FieldRef<"AuditLog", 'String'>
    readonly newValue: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly userEmail: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.organization
   */
  export type AuditLog$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * AuditLog.project
   */
  export type AuditLog$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    isGuest: boolean | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    isGuest: boolean | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    organizationId: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    isGuest: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    isGuest?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    isGuest?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    organizationId?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    isGuest?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    organizationId: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    isGuest: boolean
    role: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    isGuest?: boolean
    role?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    isGuest?: boolean
    role?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    isGuest?: boolean
    role?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    organizationId?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    isGuest?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "name" | "email" | "emailVerified" | "image" | "password" | "isGuest" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string | null
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
      isGuest: boolean
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends User$organizationArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly organizationId: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isGuest: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.organization
   */
  export type User$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    code: 'code',
    parentTeamId: 'parentTeamId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    teamId: 'teamId',
    name: 'name',
    code: 'code',
    description: 'description',
    status: 'status',
    priority: 'priority',
    progress: 'progress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdBy: 'createdBy'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const PeriodScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    type: 'type',
    startDate: 'startDate',
    endDate: 'endDate',
    label: 'label',
    isLocked: 'isLocked'
  };

  export type PeriodScalarFieldEnum = (typeof PeriodScalarFieldEnum)[keyof typeof PeriodScalarFieldEnum]


  export const BudgetAllocationScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    projectId: 'projectId',
    periodId: 'periodId',
    plannedHours: 'plannedHours',
    updatedAt: 'updatedAt'
  };

  export type BudgetAllocationScalarFieldEnum = (typeof BudgetAllocationScalarFieldEnum)[keyof typeof BudgetAllocationScalarFieldEnum]


  export const ActualAllocationScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    projectId: 'projectId',
    periodId: 'periodId',
    actualHours: 'actualHours',
    updatedAt: 'updatedAt'
  };

  export type ActualAllocationScalarFieldEnum = (typeof ActualAllocationScalarFieldEnum)[keyof typeof ActualAllocationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    projectName: 'projectName',
    previousValue: 'previousValue',
    newValue: 'newValue',
    userId: 'userId',
    userEmail: 'userEmail',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    isGuest: 'isGuest',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    projects?: ProjectListRelationFilter
    teams?: TeamListRelationFilter
    periods?: PeriodListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
    periods?: PeriodOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    projects?: ProjectListRelationFilter
    teams?: TeamListRelationFilter
    periods?: PeriodListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    organizationId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    code?: StringFilter<"Team"> | string
    parentTeamId?: StringNullableFilter<"Team"> | string | null
    isActive?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    parentTeam?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    childTeams?: TeamListRelationFilter
    projects?: ProjectListRelationFilter
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    parentTeamId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    parentTeam?: TeamOrderByWithRelationInput
    childTeams?: TeamOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    allocations?: BudgetAllocationOrderByRelationAggregateInput
    actualAllocations?: ActualAllocationOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    organizationId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    parentTeamId?: StringNullableFilter<"Team"> | string | null
    isActive?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    parentTeam?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    childTeams?: TeamListRelationFilter
    projects?: ProjectListRelationFilter
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }, "id" | "code">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    parentTeamId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    organizationId?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    code?: StringWithAggregatesFilter<"Team"> | string
    parentTeamId?: StringNullableWithAggregatesFilter<"Team"> | string | null
    isActive?: BoolWithAggregatesFilter<"Team"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    organizationId?: StringNullableFilter<"Project"> | string | null
    teamId?: StringNullableFilter<"Project"> | string | null
    name?: StringFilter<"Project"> | string
    code?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    priority?: IntFilter<"Project"> | number
    progress?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringFilter<"Project"> | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    logs?: AuditLogListRelationFilter
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    progress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    logs?: AuditLogOrderByRelationAggregateInput
    allocations?: BudgetAllocationOrderByRelationAggregateInput
    actualAllocations?: ActualAllocationOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    code?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    organizationId?: StringNullableFilter<"Project"> | string | null
    teamId?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    priority?: IntFilter<"Project"> | number
    progress?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringFilter<"Project"> | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    logs?: AuditLogListRelationFilter
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }, "id" | "name" | "code">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    progress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    organizationId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    name?: StringWithAggregatesFilter<"Project"> | string
    code?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: StringWithAggregatesFilter<"Project"> | string
    priority?: IntWithAggregatesFilter<"Project"> | number
    progress?: IntWithAggregatesFilter<"Project"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Project"> | string
  }

  export type PeriodWhereInput = {
    AND?: PeriodWhereInput | PeriodWhereInput[]
    OR?: PeriodWhereInput[]
    NOT?: PeriodWhereInput | PeriodWhereInput[]
    id?: StringFilter<"Period"> | string
    organizationId?: StringFilter<"Period"> | string
    type?: StringFilter<"Period"> | string
    startDate?: DateTimeFilter<"Period"> | Date | string
    endDate?: DateTimeFilter<"Period"> | Date | string
    label?: StringFilter<"Period"> | string
    isLocked?: BoolFilter<"Period"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }

  export type PeriodOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    label?: SortOrder
    isLocked?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    allocations?: BudgetAllocationOrderByRelationAggregateInput
    actualAllocations?: ActualAllocationOrderByRelationAggregateInput
  }

  export type PeriodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeriodWhereInput | PeriodWhereInput[]
    OR?: PeriodWhereInput[]
    NOT?: PeriodWhereInput | PeriodWhereInput[]
    organizationId?: StringFilter<"Period"> | string
    type?: StringFilter<"Period"> | string
    startDate?: DateTimeFilter<"Period"> | Date | string
    endDate?: DateTimeFilter<"Period"> | Date | string
    label?: StringFilter<"Period"> | string
    isLocked?: BoolFilter<"Period"> | boolean
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    allocations?: BudgetAllocationListRelationFilter
    actualAllocations?: ActualAllocationListRelationFilter
  }, "id">

  export type PeriodOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    label?: SortOrder
    isLocked?: SortOrder
    _count?: PeriodCountOrderByAggregateInput
    _max?: PeriodMaxOrderByAggregateInput
    _min?: PeriodMinOrderByAggregateInput
  }

  export type PeriodScalarWhereWithAggregatesInput = {
    AND?: PeriodScalarWhereWithAggregatesInput | PeriodScalarWhereWithAggregatesInput[]
    OR?: PeriodScalarWhereWithAggregatesInput[]
    NOT?: PeriodScalarWhereWithAggregatesInput | PeriodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Period"> | string
    organizationId?: StringWithAggregatesFilter<"Period"> | string
    type?: StringWithAggregatesFilter<"Period"> | string
    startDate?: DateTimeWithAggregatesFilter<"Period"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Period"> | Date | string
    label?: StringWithAggregatesFilter<"Period"> | string
    isLocked?: BoolWithAggregatesFilter<"Period"> | boolean
  }

  export type BudgetAllocationWhereInput = {
    AND?: BudgetAllocationWhereInput | BudgetAllocationWhereInput[]
    OR?: BudgetAllocationWhereInput[]
    NOT?: BudgetAllocationWhereInput | BudgetAllocationWhereInput[]
    id?: StringFilter<"BudgetAllocation"> | string
    teamId?: StringFilter<"BudgetAllocation"> | string
    projectId?: StringFilter<"BudgetAllocation"> | string
    periodId?: StringFilter<"BudgetAllocation"> | string
    plannedHours?: FloatFilter<"BudgetAllocation"> | number
    updatedAt?: DateTimeFilter<"BudgetAllocation"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    period?: XOR<PeriodScalarRelationFilter, PeriodWhereInput>
  }

  export type BudgetAllocationOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    plannedHours?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    period?: PeriodOrderByWithRelationInput
  }

  export type BudgetAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_projectId_periodId?: BudgetAllocationTeamIdProjectIdPeriodIdCompoundUniqueInput
    AND?: BudgetAllocationWhereInput | BudgetAllocationWhereInput[]
    OR?: BudgetAllocationWhereInput[]
    NOT?: BudgetAllocationWhereInput | BudgetAllocationWhereInput[]
    teamId?: StringFilter<"BudgetAllocation"> | string
    projectId?: StringFilter<"BudgetAllocation"> | string
    periodId?: StringFilter<"BudgetAllocation"> | string
    plannedHours?: FloatFilter<"BudgetAllocation"> | number
    updatedAt?: DateTimeFilter<"BudgetAllocation"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    period?: XOR<PeriodScalarRelationFilter, PeriodWhereInput>
  }, "id" | "teamId_projectId_periodId">

  export type BudgetAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    plannedHours?: SortOrder
    updatedAt?: SortOrder
    _count?: BudgetAllocationCountOrderByAggregateInput
    _avg?: BudgetAllocationAvgOrderByAggregateInput
    _max?: BudgetAllocationMaxOrderByAggregateInput
    _min?: BudgetAllocationMinOrderByAggregateInput
    _sum?: BudgetAllocationSumOrderByAggregateInput
  }

  export type BudgetAllocationScalarWhereWithAggregatesInput = {
    AND?: BudgetAllocationScalarWhereWithAggregatesInput | BudgetAllocationScalarWhereWithAggregatesInput[]
    OR?: BudgetAllocationScalarWhereWithAggregatesInput[]
    NOT?: BudgetAllocationScalarWhereWithAggregatesInput | BudgetAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BudgetAllocation"> | string
    teamId?: StringWithAggregatesFilter<"BudgetAllocation"> | string
    projectId?: StringWithAggregatesFilter<"BudgetAllocation"> | string
    periodId?: StringWithAggregatesFilter<"BudgetAllocation"> | string
    plannedHours?: FloatWithAggregatesFilter<"BudgetAllocation"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"BudgetAllocation"> | Date | string
  }

  export type ActualAllocationWhereInput = {
    AND?: ActualAllocationWhereInput | ActualAllocationWhereInput[]
    OR?: ActualAllocationWhereInput[]
    NOT?: ActualAllocationWhereInput | ActualAllocationWhereInput[]
    id?: StringFilter<"ActualAllocation"> | string
    teamId?: StringFilter<"ActualAllocation"> | string
    projectId?: StringFilter<"ActualAllocation"> | string
    periodId?: StringFilter<"ActualAllocation"> | string
    actualHours?: FloatFilter<"ActualAllocation"> | number
    updatedAt?: DateTimeFilter<"ActualAllocation"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    period?: XOR<PeriodScalarRelationFilter, PeriodWhereInput>
  }

  export type ActualAllocationOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    actualHours?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    period?: PeriodOrderByWithRelationInput
  }

  export type ActualAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_projectId_periodId?: ActualAllocationTeamIdProjectIdPeriodIdCompoundUniqueInput
    AND?: ActualAllocationWhereInput | ActualAllocationWhereInput[]
    OR?: ActualAllocationWhereInput[]
    NOT?: ActualAllocationWhereInput | ActualAllocationWhereInput[]
    teamId?: StringFilter<"ActualAllocation"> | string
    projectId?: StringFilter<"ActualAllocation"> | string
    periodId?: StringFilter<"ActualAllocation"> | string
    actualHours?: FloatFilter<"ActualAllocation"> | number
    updatedAt?: DateTimeFilter<"ActualAllocation"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    period?: XOR<PeriodScalarRelationFilter, PeriodWhereInput>
  }, "id" | "teamId_projectId_periodId">

  export type ActualAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    actualHours?: SortOrder
    updatedAt?: SortOrder
    _count?: ActualAllocationCountOrderByAggregateInput
    _avg?: ActualAllocationAvgOrderByAggregateInput
    _max?: ActualAllocationMaxOrderByAggregateInput
    _min?: ActualAllocationMinOrderByAggregateInput
    _sum?: ActualAllocationSumOrderByAggregateInput
  }

  export type ActualAllocationScalarWhereWithAggregatesInput = {
    AND?: ActualAllocationScalarWhereWithAggregatesInput | ActualAllocationScalarWhereWithAggregatesInput[]
    OR?: ActualAllocationScalarWhereWithAggregatesInput[]
    NOT?: ActualAllocationScalarWhereWithAggregatesInput | ActualAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActualAllocation"> | string
    teamId?: StringWithAggregatesFilter<"ActualAllocation"> | string
    projectId?: StringWithAggregatesFilter<"ActualAllocation"> | string
    periodId?: StringWithAggregatesFilter<"ActualAllocation"> | string
    actualHours?: FloatWithAggregatesFilter<"ActualAllocation"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ActualAllocation"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    projectName?: StringFilter<"AuditLog"> | string
    previousValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    userId?: StringFilter<"AuditLog"> | string
    userEmail?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    projectName?: SortOrder
    previousValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    timestamp?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    projectName?: StringFilter<"AuditLog"> | string
    previousValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    userId?: StringFilter<"AuditLog"> | string
    userEmail?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    projectName?: SortOrder
    previousValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    organizationId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    projectName?: StringWithAggregatesFilter<"AuditLog"> | string
    previousValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    userEmail?: StringWithAggregatesFilter<"AuditLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    organizationId?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    isGuest?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    role?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    organizationId?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    isGuest?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    organizationId?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    isGuest?: BoolWithAggregatesFilter<"User"> | boolean
    role?: StringWithAggregatesFilter<"User"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
    teams?: TeamCreateNestedManyWithoutOrganizationInput
    periods?: PeriodCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
    teams?: TeamUncheckedCreateNestedManyWithoutOrganizationInput
    periods?: PeriodUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUncheckedUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    organization?: OrganizationCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    logs?: AuditLogCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    organizationId?: string | null
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    logs?: AuditLogUncheckedCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    logs?: AuditLogUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    logs?: AuditLogUncheckedUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    organizationId?: string | null
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type PeriodCreateInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    organization: OrganizationCreateNestedOneWithoutPeriodsInput
    allocations?: BudgetAllocationCreateNestedManyWithoutPeriodInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutPeriodInput
  }

  export type PeriodUncheckedCreateInput = {
    id?: string
    organizationId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutPeriodInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type PeriodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutPeriodsNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutPeriodNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutPeriodNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodCreateManyInput = {
    id?: string
    organizationId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
  }

  export type PeriodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PeriodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BudgetAllocationCreateInput = {
    id?: string
    plannedHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutAllocationsInput
    project: ProjectCreateNestedOneWithoutAllocationsInput
    period: PeriodCreateNestedOneWithoutAllocationsInput
  }

  export type BudgetAllocationUncheckedCreateInput = {
    id?: string
    teamId: string
    projectId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutAllocationsNestedInput
    project?: ProjectUpdateOneRequiredWithoutAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type BudgetAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationCreateManyInput = {
    id?: string
    teamId: string
    projectId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationCreateInput = {
    id?: string
    actualHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutActualAllocationsInput
    project: ProjectCreateNestedOneWithoutActualAllocationsInput
    period: PeriodCreateNestedOneWithoutActualAllocationsInput
  }

  export type ActualAllocationUncheckedCreateInput = {
    id?: string
    teamId: string
    projectId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutActualAllocationsNestedInput
    project?: ProjectUpdateOneRequiredWithoutActualAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutActualAllocationsNestedInput
  }

  export type ActualAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationCreateManyInput = {
    id?: string
    teamId: string
    projectId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType?: string
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
    organization?: OrganizationCreateNestedOneWithoutAuditLogsInput
    project?: ProjectCreateNestedOneWithoutLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    organizationId?: string | null
    action: string
    entityType?: string
    entityId?: string | null
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutAuditLogsNestedInput
    project?: ProjectUpdateOneWithoutLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    organizationId?: string | null
    action: string
    entityType?: string
    entityId?: string | null
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    organizationId?: string | null
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    organizationId?: string | null
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type PeriodListRelationFilter = {
    every?: PeriodWhereInput
    some?: PeriodWhereInput
    none?: PeriodWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PeriodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type BudgetAllocationListRelationFilter = {
    every?: BudgetAllocationWhereInput
    some?: BudgetAllocationWhereInput
    none?: BudgetAllocationWhereInput
  }

  export type ActualAllocationListRelationFilter = {
    every?: ActualAllocationWhereInput
    some?: ActualAllocationWhereInput
    none?: ActualAllocationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BudgetAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActualAllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    parentTeamId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    parentTeamId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    parentTeamId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    progress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    priority?: SortOrder
    progress?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    progress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    progress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    priority?: SortOrder
    progress?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PeriodCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    label?: SortOrder
    isLocked?: SortOrder
  }

  export type PeriodMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    label?: SortOrder
    isLocked?: SortOrder
  }

  export type PeriodMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    label?: SortOrder
    isLocked?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type PeriodScalarRelationFilter = {
    is?: PeriodWhereInput
    isNot?: PeriodWhereInput
  }

  export type BudgetAllocationTeamIdProjectIdPeriodIdCompoundUniqueInput = {
    teamId: string
    projectId: string
    periodId: string
  }

  export type BudgetAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    plannedHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetAllocationAvgOrderByAggregateInput = {
    plannedHours?: SortOrder
  }

  export type BudgetAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    plannedHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    plannedHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type BudgetAllocationSumOrderByAggregateInput = {
    plannedHours?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ActualAllocationTeamIdProjectIdPeriodIdCompoundUniqueInput = {
    teamId: string
    projectId: string
    periodId: string
  }

  export type ActualAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    actualHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActualAllocationAvgOrderByAggregateInput = {
    actualHours?: SortOrder
  }

  export type ActualAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    actualHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActualAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    projectId?: SortOrder
    periodId?: SortOrder
    actualHours?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActualAllocationSumOrderByAggregateInput = {
    actualHours?: SortOrder
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    projectName?: SortOrder
    previousValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    projectName?: SortOrder
    previousValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    projectName?: SortOrder
    previousValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
    userEmail?: SortOrder
    timestamp?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    isGuest?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    isGuest?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    isGuest?: SortOrder
    role?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput> | TeamCreateWithoutOrganizationInput[] | TeamUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutOrganizationInput | TeamCreateOrConnectWithoutOrganizationInput[]
    createMany?: TeamCreateManyOrganizationInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type PeriodCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput> | PeriodCreateWithoutOrganizationInput[] | PeriodUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PeriodCreateOrConnectWithoutOrganizationInput | PeriodCreateOrConnectWithoutOrganizationInput[]
    createMany?: PeriodCreateManyOrganizationInputEnvelope
    connect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput> | TeamCreateWithoutOrganizationInput[] | TeamUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutOrganizationInput | TeamCreateOrConnectWithoutOrganizationInput[]
    createMany?: TeamCreateManyOrganizationInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type PeriodUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput> | PeriodCreateWithoutOrganizationInput[] | PeriodUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PeriodCreateOrConnectWithoutOrganizationInput | PeriodCreateOrConnectWithoutOrganizationInput[]
    createMany?: PeriodCreateManyOrganizationInputEnvelope
    connect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOrganizationInput | ProjectUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOrganizationInput | ProjectUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOrganizationInput | ProjectUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput> | TeamCreateWithoutOrganizationInput[] | TeamUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutOrganizationInput | TeamCreateOrConnectWithoutOrganizationInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutOrganizationInput | TeamUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TeamCreateManyOrganizationInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutOrganizationInput | TeamUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutOrganizationInput | TeamUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type PeriodUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput> | PeriodCreateWithoutOrganizationInput[] | PeriodUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PeriodCreateOrConnectWithoutOrganizationInput | PeriodCreateOrConnectWithoutOrganizationInput[]
    upsert?: PeriodUpsertWithWhereUniqueWithoutOrganizationInput | PeriodUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: PeriodCreateManyOrganizationInputEnvelope
    set?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    disconnect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    delete?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    connect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    update?: PeriodUpdateWithWhereUniqueWithoutOrganizationInput | PeriodUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: PeriodUpdateManyWithWhereWithoutOrganizationInput | PeriodUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: PeriodScalarWhereInput | PeriodScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput> | ProjectCreateWithoutOrganizationInput[] | ProjectUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOrganizationInput | ProjectCreateOrConnectWithoutOrganizationInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOrganizationInput | ProjectUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ProjectCreateManyOrganizationInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOrganizationInput | ProjectUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOrganizationInput | ProjectUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput> | TeamCreateWithoutOrganizationInput[] | TeamUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutOrganizationInput | TeamCreateOrConnectWithoutOrganizationInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutOrganizationInput | TeamUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: TeamCreateManyOrganizationInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutOrganizationInput | TeamUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutOrganizationInput | TeamUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type PeriodUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput> | PeriodCreateWithoutOrganizationInput[] | PeriodUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: PeriodCreateOrConnectWithoutOrganizationInput | PeriodCreateOrConnectWithoutOrganizationInput[]
    upsert?: PeriodUpsertWithWhereUniqueWithoutOrganizationInput | PeriodUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: PeriodCreateManyOrganizationInputEnvelope
    set?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    disconnect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    delete?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    connect?: PeriodWhereUniqueInput | PeriodWhereUniqueInput[]
    update?: PeriodUpdateWithWhereUniqueWithoutOrganizationInput | PeriodUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: PeriodUpdateManyWithWhereWithoutOrganizationInput | PeriodUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: PeriodScalarWhereInput | PeriodScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput> | AuditLogCreateWithoutOrganizationInput[] | AuditLogUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutOrganizationInput | AuditLogCreateOrConnectWithoutOrganizationInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutOrganizationInput | AuditLogUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: AuditLogCreateManyOrganizationInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutOrganizationInput | AuditLogUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutOrganizationInput | AuditLogUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutTeamsInput = {
    create?: XOR<OrganizationCreateWithoutTeamsInput, OrganizationUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTeamsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutChildTeamsInput = {
    create?: XOR<TeamCreateWithoutChildTeamsInput, TeamUncheckedCreateWithoutChildTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutChildTeamsInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamCreateNestedManyWithoutParentTeamInput = {
    create?: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput> | TeamCreateWithoutParentTeamInput[] | TeamUncheckedCreateWithoutParentTeamInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutParentTeamInput | TeamCreateOrConnectWithoutParentTeamInput[]
    createMany?: TeamCreateManyParentTeamInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutTeamInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type BudgetAllocationCreateNestedManyWithoutTeamInput = {
    create?: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput> | BudgetAllocationCreateWithoutTeamInput[] | BudgetAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutTeamInput | BudgetAllocationCreateOrConnectWithoutTeamInput[]
    createMany?: BudgetAllocationCreateManyTeamInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationCreateNestedManyWithoutTeamInput = {
    create?: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput> | ActualAllocationCreateWithoutTeamInput[] | ActualAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutTeamInput | ActualAllocationCreateOrConnectWithoutTeamInput[]
    createMany?: ActualAllocationCreateManyTeamInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutParentTeamInput = {
    create?: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput> | TeamCreateWithoutParentTeamInput[] | TeamUncheckedCreateWithoutParentTeamInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutParentTeamInput | TeamCreateOrConnectWithoutParentTeamInput[]
    createMany?: TeamCreateManyParentTeamInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput> | BudgetAllocationCreateWithoutTeamInput[] | BudgetAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutTeamInput | BudgetAllocationCreateOrConnectWithoutTeamInput[]
    createMany?: BudgetAllocationCreateManyTeamInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput> | ActualAllocationCreateWithoutTeamInput[] | ActualAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutTeamInput | ActualAllocationCreateOrConnectWithoutTeamInput[]
    createMany?: ActualAllocationCreateManyTeamInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<OrganizationCreateWithoutTeamsInput, OrganizationUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTeamsInput
    upsert?: OrganizationUpsertWithoutTeamsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutTeamsInput, OrganizationUpdateWithoutTeamsInput>, OrganizationUncheckedUpdateWithoutTeamsInput>
  }

  export type TeamUpdateOneWithoutChildTeamsNestedInput = {
    create?: XOR<TeamCreateWithoutChildTeamsInput, TeamUncheckedCreateWithoutChildTeamsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutChildTeamsInput
    upsert?: TeamUpsertWithoutChildTeamsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutChildTeamsInput, TeamUpdateWithoutChildTeamsInput>, TeamUncheckedUpdateWithoutChildTeamsInput>
  }

  export type TeamUpdateManyWithoutParentTeamNestedInput = {
    create?: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput> | TeamCreateWithoutParentTeamInput[] | TeamUncheckedCreateWithoutParentTeamInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutParentTeamInput | TeamCreateOrConnectWithoutParentTeamInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutParentTeamInput | TeamUpsertWithWhereUniqueWithoutParentTeamInput[]
    createMany?: TeamCreateManyParentTeamInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutParentTeamInput | TeamUpdateWithWhereUniqueWithoutParentTeamInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutParentTeamInput | TeamUpdateManyWithWhereWithoutParentTeamInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTeamInput | ProjectUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTeamInput | ProjectUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTeamInput | ProjectUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type BudgetAllocationUpdateManyWithoutTeamNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput> | BudgetAllocationCreateWithoutTeamInput[] | BudgetAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutTeamInput | BudgetAllocationCreateOrConnectWithoutTeamInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutTeamInput | BudgetAllocationUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: BudgetAllocationCreateManyTeamInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutTeamInput | BudgetAllocationUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutTeamInput | BudgetAllocationUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput> | ActualAllocationCreateWithoutTeamInput[] | ActualAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutTeamInput | ActualAllocationCreateOrConnectWithoutTeamInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutTeamInput | ActualAllocationUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ActualAllocationCreateManyTeamInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutTeamInput | ActualAllocationUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutTeamInput | ActualAllocationUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TeamUncheckedUpdateManyWithoutParentTeamNestedInput = {
    create?: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput> | TeamCreateWithoutParentTeamInput[] | TeamUncheckedCreateWithoutParentTeamInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutParentTeamInput | TeamCreateOrConnectWithoutParentTeamInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutParentTeamInput | TeamUpsertWithWhereUniqueWithoutParentTeamInput[]
    createMany?: TeamCreateManyParentTeamInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutParentTeamInput | TeamUpdateWithWhereUniqueWithoutParentTeamInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutParentTeamInput | TeamUpdateManyWithWhereWithoutParentTeamInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput> | ProjectCreateWithoutTeamInput[] | ProjectUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput | ProjectCreateOrConnectWithoutTeamInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutTeamInput | ProjectUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ProjectCreateManyTeamInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutTeamInput | ProjectUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutTeamInput | ProjectUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput> | BudgetAllocationCreateWithoutTeamInput[] | BudgetAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutTeamInput | BudgetAllocationCreateOrConnectWithoutTeamInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutTeamInput | BudgetAllocationUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: BudgetAllocationCreateManyTeamInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutTeamInput | BudgetAllocationUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutTeamInput | BudgetAllocationUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput> | ActualAllocationCreateWithoutTeamInput[] | ActualAllocationUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutTeamInput | ActualAllocationCreateOrConnectWithoutTeamInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutTeamInput | ActualAllocationUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ActualAllocationCreateManyTeamInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutTeamInput | ActualAllocationUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutTeamInput | ActualAllocationUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutProjectsInput = {
    create?: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutProjectsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutProjectsInput = {
    create?: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutProjectsInput
    connect?: TeamWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutProjectInput = {
    create?: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput> | AuditLogCreateWithoutProjectInput[] | AuditLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutProjectInput | AuditLogCreateOrConnectWithoutProjectInput[]
    createMany?: AuditLogCreateManyProjectInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type BudgetAllocationCreateNestedManyWithoutProjectInput = {
    create?: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput> | BudgetAllocationCreateWithoutProjectInput[] | BudgetAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutProjectInput | BudgetAllocationCreateOrConnectWithoutProjectInput[]
    createMany?: BudgetAllocationCreateManyProjectInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationCreateNestedManyWithoutProjectInput = {
    create?: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput> | ActualAllocationCreateWithoutProjectInput[] | ActualAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutProjectInput | ActualAllocationCreateOrConnectWithoutProjectInput[]
    createMany?: ActualAllocationCreateManyProjectInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput> | AuditLogCreateWithoutProjectInput[] | AuditLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutProjectInput | AuditLogCreateOrConnectWithoutProjectInput[]
    createMany?: AuditLogCreateManyProjectInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput> | BudgetAllocationCreateWithoutProjectInput[] | BudgetAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutProjectInput | BudgetAllocationCreateOrConnectWithoutProjectInput[]
    createMany?: BudgetAllocationCreateManyProjectInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput> | ActualAllocationCreateWithoutProjectInput[] | ActualAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutProjectInput | ActualAllocationCreateOrConnectWithoutProjectInput[]
    createMany?: ActualAllocationCreateManyProjectInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrganizationUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutProjectsInput
    upsert?: OrganizationUpsertWithoutProjectsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutProjectsInput, OrganizationUpdateWithoutProjectsInput>, OrganizationUncheckedUpdateWithoutProjectsInput>
  }

  export type TeamUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutProjectsInput
    upsert?: TeamUpsertWithoutProjectsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutProjectsInput, TeamUpdateWithoutProjectsInput>, TeamUncheckedUpdateWithoutProjectsInput>
  }

  export type AuditLogUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput> | AuditLogCreateWithoutProjectInput[] | AuditLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutProjectInput | AuditLogCreateOrConnectWithoutProjectInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutProjectInput | AuditLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AuditLogCreateManyProjectInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutProjectInput | AuditLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutProjectInput | AuditLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type BudgetAllocationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput> | BudgetAllocationCreateWithoutProjectInput[] | BudgetAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutProjectInput | BudgetAllocationCreateOrConnectWithoutProjectInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutProjectInput | BudgetAllocationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BudgetAllocationCreateManyProjectInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutProjectInput | BudgetAllocationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutProjectInput | BudgetAllocationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput> | ActualAllocationCreateWithoutProjectInput[] | ActualAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutProjectInput | ActualAllocationCreateOrConnectWithoutProjectInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutProjectInput | ActualAllocationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ActualAllocationCreateManyProjectInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutProjectInput | ActualAllocationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutProjectInput | ActualAllocationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput> | AuditLogCreateWithoutProjectInput[] | AuditLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutProjectInput | AuditLogCreateOrConnectWithoutProjectInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutProjectInput | AuditLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: AuditLogCreateManyProjectInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutProjectInput | AuditLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutProjectInput | AuditLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput> | BudgetAllocationCreateWithoutProjectInput[] | BudgetAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutProjectInput | BudgetAllocationCreateOrConnectWithoutProjectInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutProjectInput | BudgetAllocationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BudgetAllocationCreateManyProjectInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutProjectInput | BudgetAllocationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutProjectInput | BudgetAllocationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput> | ActualAllocationCreateWithoutProjectInput[] | ActualAllocationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutProjectInput | ActualAllocationCreateOrConnectWithoutProjectInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutProjectInput | ActualAllocationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ActualAllocationCreateManyProjectInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutProjectInput | ActualAllocationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutProjectInput | ActualAllocationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutPeriodsInput = {
    create?: XOR<OrganizationCreateWithoutPeriodsInput, OrganizationUncheckedCreateWithoutPeriodsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPeriodsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BudgetAllocationCreateNestedManyWithoutPeriodInput = {
    create?: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput> | BudgetAllocationCreateWithoutPeriodInput[] | BudgetAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutPeriodInput | BudgetAllocationCreateOrConnectWithoutPeriodInput[]
    createMany?: BudgetAllocationCreateManyPeriodInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationCreateNestedManyWithoutPeriodInput = {
    create?: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput> | ActualAllocationCreateWithoutPeriodInput[] | ActualAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutPeriodInput | ActualAllocationCreateOrConnectWithoutPeriodInput[]
    createMany?: ActualAllocationCreateManyPeriodInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type BudgetAllocationUncheckedCreateNestedManyWithoutPeriodInput = {
    create?: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput> | BudgetAllocationCreateWithoutPeriodInput[] | BudgetAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutPeriodInput | BudgetAllocationCreateOrConnectWithoutPeriodInput[]
    createMany?: BudgetAllocationCreateManyPeriodInputEnvelope
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
  }

  export type ActualAllocationUncheckedCreateNestedManyWithoutPeriodInput = {
    create?: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput> | ActualAllocationCreateWithoutPeriodInput[] | ActualAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutPeriodInput | ActualAllocationCreateOrConnectWithoutPeriodInput[]
    createMany?: ActualAllocationCreateManyPeriodInputEnvelope
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutPeriodsNestedInput = {
    create?: XOR<OrganizationCreateWithoutPeriodsInput, OrganizationUncheckedCreateWithoutPeriodsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutPeriodsInput
    upsert?: OrganizationUpsertWithoutPeriodsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutPeriodsInput, OrganizationUpdateWithoutPeriodsInput>, OrganizationUncheckedUpdateWithoutPeriodsInput>
  }

  export type BudgetAllocationUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput> | BudgetAllocationCreateWithoutPeriodInput[] | BudgetAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutPeriodInput | BudgetAllocationCreateOrConnectWithoutPeriodInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutPeriodInput | BudgetAllocationUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: BudgetAllocationCreateManyPeriodInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutPeriodInput | BudgetAllocationUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutPeriodInput | BudgetAllocationUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput> | ActualAllocationCreateWithoutPeriodInput[] | ActualAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutPeriodInput | ActualAllocationCreateOrConnectWithoutPeriodInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutPeriodInput | ActualAllocationUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: ActualAllocationCreateManyPeriodInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutPeriodInput | ActualAllocationUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutPeriodInput | ActualAllocationUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput> | BudgetAllocationCreateWithoutPeriodInput[] | BudgetAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: BudgetAllocationCreateOrConnectWithoutPeriodInput | BudgetAllocationCreateOrConnectWithoutPeriodInput[]
    upsert?: BudgetAllocationUpsertWithWhereUniqueWithoutPeriodInput | BudgetAllocationUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: BudgetAllocationCreateManyPeriodInputEnvelope
    set?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    disconnect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    delete?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    connect?: BudgetAllocationWhereUniqueInput | BudgetAllocationWhereUniqueInput[]
    update?: BudgetAllocationUpdateWithWhereUniqueWithoutPeriodInput | BudgetAllocationUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: BudgetAllocationUpdateManyWithWhereWithoutPeriodInput | BudgetAllocationUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
  }

  export type ActualAllocationUncheckedUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput> | ActualAllocationCreateWithoutPeriodInput[] | ActualAllocationUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: ActualAllocationCreateOrConnectWithoutPeriodInput | ActualAllocationCreateOrConnectWithoutPeriodInput[]
    upsert?: ActualAllocationUpsertWithWhereUniqueWithoutPeriodInput | ActualAllocationUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: ActualAllocationCreateManyPeriodInputEnvelope
    set?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    disconnect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    delete?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    connect?: ActualAllocationWhereUniqueInput | ActualAllocationWhereUniqueInput[]
    update?: ActualAllocationUpdateWithWhereUniqueWithoutPeriodInput | ActualAllocationUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: ActualAllocationUpdateManyWithWhereWithoutPeriodInput | ActualAllocationUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<TeamCreateWithoutAllocationsInput, TeamUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutAllocationsInput
    connect?: TeamWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<ProjectCreateWithoutAllocationsInput, ProjectUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAllocationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type PeriodCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<PeriodCreateWithoutAllocationsInput, PeriodUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: PeriodCreateOrConnectWithoutAllocationsInput
    connect?: PeriodWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeamUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<TeamCreateWithoutAllocationsInput, TeamUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutAllocationsInput
    upsert?: TeamUpsertWithoutAllocationsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutAllocationsInput, TeamUpdateWithoutAllocationsInput>, TeamUncheckedUpdateWithoutAllocationsInput>
  }

  export type ProjectUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<ProjectCreateWithoutAllocationsInput, ProjectUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutAllocationsInput
    upsert?: ProjectUpsertWithoutAllocationsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutAllocationsInput, ProjectUpdateWithoutAllocationsInput>, ProjectUncheckedUpdateWithoutAllocationsInput>
  }

  export type PeriodUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<PeriodCreateWithoutAllocationsInput, PeriodUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: PeriodCreateOrConnectWithoutAllocationsInput
    upsert?: PeriodUpsertWithoutAllocationsInput
    connect?: PeriodWhereUniqueInput
    update?: XOR<XOR<PeriodUpdateToOneWithWhereWithoutAllocationsInput, PeriodUpdateWithoutAllocationsInput>, PeriodUncheckedUpdateWithoutAllocationsInput>
  }

  export type TeamCreateNestedOneWithoutActualAllocationsInput = {
    create?: XOR<TeamCreateWithoutActualAllocationsInput, TeamUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutActualAllocationsInput
    connect?: TeamWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutActualAllocationsInput = {
    create?: XOR<ProjectCreateWithoutActualAllocationsInput, ProjectUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActualAllocationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type PeriodCreateNestedOneWithoutActualAllocationsInput = {
    create?: XOR<PeriodCreateWithoutActualAllocationsInput, PeriodUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: PeriodCreateOrConnectWithoutActualAllocationsInput
    connect?: PeriodWhereUniqueInput
  }

  export type TeamUpdateOneRequiredWithoutActualAllocationsNestedInput = {
    create?: XOR<TeamCreateWithoutActualAllocationsInput, TeamUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutActualAllocationsInput
    upsert?: TeamUpsertWithoutActualAllocationsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutActualAllocationsInput, TeamUpdateWithoutActualAllocationsInput>, TeamUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type ProjectUpdateOneRequiredWithoutActualAllocationsNestedInput = {
    create?: XOR<ProjectCreateWithoutActualAllocationsInput, ProjectUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActualAllocationsInput
    upsert?: ProjectUpsertWithoutActualAllocationsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutActualAllocationsInput, ProjectUpdateWithoutActualAllocationsInput>, ProjectUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type PeriodUpdateOneRequiredWithoutActualAllocationsNestedInput = {
    create?: XOR<PeriodCreateWithoutActualAllocationsInput, PeriodUncheckedCreateWithoutActualAllocationsInput>
    connectOrCreate?: PeriodCreateOrConnectWithoutActualAllocationsInput
    upsert?: PeriodUpsertWithoutActualAllocationsInput
    connect?: PeriodWhereUniqueInput
    update?: XOR<XOR<PeriodUpdateToOneWithWhereWithoutActualAllocationsInput, PeriodUpdateWithoutActualAllocationsInput>, PeriodUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type OrganizationCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutLogsInput = {
    create?: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLogsInput
    connect?: ProjectWhereUniqueInput
  }

  export type OrganizationUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutAuditLogsInput
    upsert?: OrganizationUpsertWithoutAuditLogsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutAuditLogsInput, OrganizationUpdateWithoutAuditLogsInput>, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type ProjectUpdateOneWithoutLogsNestedInput = {
    create?: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLogsInput
    upsert?: ProjectUpsertWithoutLogsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutLogsInput, ProjectUpdateWithoutLogsInput>, ProjectUncheckedUpdateWithoutLogsInput>
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationUpdateOneWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutOrganizationInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    team?: TeamCreateNestedOneWithoutProjectsInput
    logs?: AuditLogCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutOrganizationInput = {
    id?: string
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    logs?: AuditLogUncheckedCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput>
  }

  export type ProjectCreateManyOrganizationInputEnvelope = {
    data: ProjectCreateManyOrganizationInput | ProjectCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutOrganizationInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutOrganizationInput = {
    id?: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutOrganizationInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput>
  }

  export type TeamCreateManyOrganizationInputEnvelope = {
    data: TeamCreateManyOrganizationInput | TeamCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type PeriodCreateWithoutOrganizationInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    allocations?: BudgetAllocationCreateNestedManyWithoutPeriodInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutPeriodInput
  }

  export type PeriodUncheckedCreateWithoutOrganizationInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutPeriodInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type PeriodCreateOrConnectWithoutOrganizationInput = {
    where: PeriodWhereUniqueInput
    create: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput>
  }

  export type PeriodCreateManyOrganizationInputEnvelope = {
    data: PeriodCreateManyOrganizationInput | PeriodCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutOrganizationInput = {
    id?: string
    action: string
    entityType?: string
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
    project?: ProjectCreateNestedOneWithoutLogsInput
  }

  export type AuditLogUncheckedCreateWithoutOrganizationInput = {
    id?: string
    action: string
    entityType?: string
    entityId?: string | null
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogCreateManyOrganizationInputEnvelope = {
    data: AuditLogCreateManyOrganizationInput | AuditLogCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    organizationId?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    isGuest?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutOrganizationInput, ProjectUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ProjectCreateWithoutOrganizationInput, ProjectUncheckedCreateWithoutOrganizationInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutOrganizationInput, ProjectUncheckedUpdateWithoutOrganizationInput>
  }

  export type ProjectUpdateManyWithWhereWithoutOrganizationInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    organizationId?: StringNullableFilter<"Project"> | string | null
    teamId?: StringNullableFilter<"Project"> | string | null
    name?: StringFilter<"Project"> | string
    code?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    priority?: IntFilter<"Project"> | number
    progress?: IntFilter<"Project"> | number
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    createdBy?: StringFilter<"Project"> | string
  }

  export type TeamUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutOrganizationInput, TeamUncheckedUpdateWithoutOrganizationInput>
    create: XOR<TeamCreateWithoutOrganizationInput, TeamUncheckedCreateWithoutOrganizationInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutOrganizationInput, TeamUncheckedUpdateWithoutOrganizationInput>
  }

  export type TeamUpdateManyWithWhereWithoutOrganizationInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    organizationId?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    code?: StringFilter<"Team"> | string
    parentTeamId?: StringNullableFilter<"Team"> | string | null
    isActive?: BoolFilter<"Team"> | boolean
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type PeriodUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: PeriodWhereUniqueInput
    update: XOR<PeriodUpdateWithoutOrganizationInput, PeriodUncheckedUpdateWithoutOrganizationInput>
    create: XOR<PeriodCreateWithoutOrganizationInput, PeriodUncheckedCreateWithoutOrganizationInput>
  }

  export type PeriodUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: PeriodWhereUniqueInput
    data: XOR<PeriodUpdateWithoutOrganizationInput, PeriodUncheckedUpdateWithoutOrganizationInput>
  }

  export type PeriodUpdateManyWithWhereWithoutOrganizationInput = {
    where: PeriodScalarWhereInput
    data: XOR<PeriodUpdateManyMutationInput, PeriodUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type PeriodScalarWhereInput = {
    AND?: PeriodScalarWhereInput | PeriodScalarWhereInput[]
    OR?: PeriodScalarWhereInput[]
    NOT?: PeriodScalarWhereInput | PeriodScalarWhereInput[]
    id?: StringFilter<"Period"> | string
    organizationId?: StringFilter<"Period"> | string
    type?: StringFilter<"Period"> | string
    startDate?: DateTimeFilter<"Period"> | Date | string
    endDate?: DateTimeFilter<"Period"> | Date | string
    label?: StringFilter<"Period"> | string
    isLocked?: BoolFilter<"Period"> | boolean
  }

  export type AuditLogUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
    create: XOR<AuditLogCreateWithoutOrganizationInput, AuditLogUncheckedCreateWithoutOrganizationInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutOrganizationInput, AuditLogUncheckedUpdateWithoutOrganizationInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutOrganizationInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    organizationId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    projectName?: StringFilter<"AuditLog"> | string
    previousValue?: StringNullableFilter<"AuditLog"> | string | null
    newValue?: StringNullableFilter<"AuditLog"> | string | null
    userId?: StringFilter<"AuditLog"> | string
    userEmail?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type OrganizationCreateWithoutTeamsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
    periods?: PeriodCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutTeamsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
    periods?: PeriodUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutTeamsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutTeamsInput, OrganizationUncheckedCreateWithoutTeamsInput>
  }

  export type TeamCreateWithoutChildTeamsInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutChildTeamsInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutChildTeamsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutChildTeamsInput, TeamUncheckedCreateWithoutChildTeamsInput>
  }

  export type TeamCreateWithoutParentTeamInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutParentTeamInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutParentTeamInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput>
  }

  export type TeamCreateManyParentTeamInputEnvelope = {
    data: TeamCreateManyParentTeamInput | TeamCreateManyParentTeamInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutTeamInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    organization?: OrganizationCreateNestedOneWithoutProjectsInput
    logs?: AuditLogCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTeamInput = {
    id?: string
    organizationId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    logs?: AuditLogUncheckedCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput>
  }

  export type ProjectCreateManyTeamInputEnvelope = {
    data: ProjectCreateManyTeamInput | ProjectCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type BudgetAllocationCreateWithoutTeamInput = {
    id?: string
    plannedHours?: number
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutAllocationsInput
    period: PeriodCreateNestedOneWithoutAllocationsInput
  }

  export type BudgetAllocationUncheckedCreateWithoutTeamInput = {
    id?: string
    projectId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationCreateOrConnectWithoutTeamInput = {
    where: BudgetAllocationWhereUniqueInput
    create: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput>
  }

  export type BudgetAllocationCreateManyTeamInputEnvelope = {
    data: BudgetAllocationCreateManyTeamInput | BudgetAllocationCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type ActualAllocationCreateWithoutTeamInput = {
    id?: string
    actualHours?: number
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutActualAllocationsInput
    period: PeriodCreateNestedOneWithoutActualAllocationsInput
  }

  export type ActualAllocationUncheckedCreateWithoutTeamInput = {
    id?: string
    projectId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateOrConnectWithoutTeamInput = {
    where: ActualAllocationWhereUniqueInput
    create: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput>
  }

  export type ActualAllocationCreateManyTeamInputEnvelope = {
    data: ActualAllocationCreateManyTeamInput | ActualAllocationCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutTeamsInput = {
    update: XOR<OrganizationUpdateWithoutTeamsInput, OrganizationUncheckedUpdateWithoutTeamsInput>
    create: XOR<OrganizationCreateWithoutTeamsInput, OrganizationUncheckedCreateWithoutTeamsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutTeamsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutTeamsInput, OrganizationUncheckedUpdateWithoutTeamsInput>
  }

  export type OrganizationUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type TeamUpsertWithoutChildTeamsInput = {
    update: XOR<TeamUpdateWithoutChildTeamsInput, TeamUncheckedUpdateWithoutChildTeamsInput>
    create: XOR<TeamCreateWithoutChildTeamsInput, TeamUncheckedCreateWithoutChildTeamsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutChildTeamsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutChildTeamsInput, TeamUncheckedUpdateWithoutChildTeamsInput>
  }

  export type TeamUpdateWithoutChildTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutChildTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUpsertWithWhereUniqueWithoutParentTeamInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutParentTeamInput, TeamUncheckedUpdateWithoutParentTeamInput>
    create: XOR<TeamCreateWithoutParentTeamInput, TeamUncheckedCreateWithoutParentTeamInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutParentTeamInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutParentTeamInput, TeamUncheckedUpdateWithoutParentTeamInput>
  }

  export type TeamUpdateManyWithWhereWithoutParentTeamInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutParentTeamInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutTeamInput, ProjectUncheckedUpdateWithoutTeamInput>
    create: XOR<ProjectCreateWithoutTeamInput, ProjectUncheckedCreateWithoutTeamInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutTeamInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutTeamInput, ProjectUncheckedUpdateWithoutTeamInput>
  }

  export type ProjectUpdateManyWithWhereWithoutTeamInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutTeamInput>
  }

  export type BudgetAllocationUpsertWithWhereUniqueWithoutTeamInput = {
    where: BudgetAllocationWhereUniqueInput
    update: XOR<BudgetAllocationUpdateWithoutTeamInput, BudgetAllocationUncheckedUpdateWithoutTeamInput>
    create: XOR<BudgetAllocationCreateWithoutTeamInput, BudgetAllocationUncheckedCreateWithoutTeamInput>
  }

  export type BudgetAllocationUpdateWithWhereUniqueWithoutTeamInput = {
    where: BudgetAllocationWhereUniqueInput
    data: XOR<BudgetAllocationUpdateWithoutTeamInput, BudgetAllocationUncheckedUpdateWithoutTeamInput>
  }

  export type BudgetAllocationUpdateManyWithWhereWithoutTeamInput = {
    where: BudgetAllocationScalarWhereInput
    data: XOR<BudgetAllocationUpdateManyMutationInput, BudgetAllocationUncheckedUpdateManyWithoutTeamInput>
  }

  export type BudgetAllocationScalarWhereInput = {
    AND?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
    OR?: BudgetAllocationScalarWhereInput[]
    NOT?: BudgetAllocationScalarWhereInput | BudgetAllocationScalarWhereInput[]
    id?: StringFilter<"BudgetAllocation"> | string
    teamId?: StringFilter<"BudgetAllocation"> | string
    projectId?: StringFilter<"BudgetAllocation"> | string
    periodId?: StringFilter<"BudgetAllocation"> | string
    plannedHours?: FloatFilter<"BudgetAllocation"> | number
    updatedAt?: DateTimeFilter<"BudgetAllocation"> | Date | string
  }

  export type ActualAllocationUpsertWithWhereUniqueWithoutTeamInput = {
    where: ActualAllocationWhereUniqueInput
    update: XOR<ActualAllocationUpdateWithoutTeamInput, ActualAllocationUncheckedUpdateWithoutTeamInput>
    create: XOR<ActualAllocationCreateWithoutTeamInput, ActualAllocationUncheckedCreateWithoutTeamInput>
  }

  export type ActualAllocationUpdateWithWhereUniqueWithoutTeamInput = {
    where: ActualAllocationWhereUniqueInput
    data: XOR<ActualAllocationUpdateWithoutTeamInput, ActualAllocationUncheckedUpdateWithoutTeamInput>
  }

  export type ActualAllocationUpdateManyWithWhereWithoutTeamInput = {
    where: ActualAllocationScalarWhereInput
    data: XOR<ActualAllocationUpdateManyMutationInput, ActualAllocationUncheckedUpdateManyWithoutTeamInput>
  }

  export type ActualAllocationScalarWhereInput = {
    AND?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
    OR?: ActualAllocationScalarWhereInput[]
    NOT?: ActualAllocationScalarWhereInput | ActualAllocationScalarWhereInput[]
    id?: StringFilter<"ActualAllocation"> | string
    teamId?: StringFilter<"ActualAllocation"> | string
    projectId?: StringFilter<"ActualAllocation"> | string
    periodId?: StringFilter<"ActualAllocation"> | string
    actualHours?: FloatFilter<"ActualAllocation"> | number
    updatedAt?: DateTimeFilter<"ActualAllocation"> | Date | string
  }

  export type OrganizationCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    teams?: TeamCreateNestedManyWithoutOrganizationInput
    periods?: PeriodCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutProjectsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    teams?: TeamUncheckedCreateNestedManyWithoutOrganizationInput
    periods?: PeriodUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutProjectsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
  }

  export type TeamCreateWithoutProjectsInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutProjectsInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutProjectsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
  }

  export type AuditLogCreateWithoutProjectInput = {
    id?: string
    action: string
    entityType?: string
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
    organization?: OrganizationCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateWithoutProjectInput = {
    id?: string
    organizationId?: string | null
    action: string
    entityType?: string
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutProjectInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput>
  }

  export type AuditLogCreateManyProjectInputEnvelope = {
    data: AuditLogCreateManyProjectInput | AuditLogCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type BudgetAllocationCreateWithoutProjectInput = {
    id?: string
    plannedHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutAllocationsInput
    period: PeriodCreateNestedOneWithoutAllocationsInput
  }

  export type BudgetAllocationUncheckedCreateWithoutProjectInput = {
    id?: string
    teamId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationCreateOrConnectWithoutProjectInput = {
    where: BudgetAllocationWhereUniqueInput
    create: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput>
  }

  export type BudgetAllocationCreateManyProjectInputEnvelope = {
    data: BudgetAllocationCreateManyProjectInput | BudgetAllocationCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ActualAllocationCreateWithoutProjectInput = {
    id?: string
    actualHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutActualAllocationsInput
    period: PeriodCreateNestedOneWithoutActualAllocationsInput
  }

  export type ActualAllocationUncheckedCreateWithoutProjectInput = {
    id?: string
    teamId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateOrConnectWithoutProjectInput = {
    where: ActualAllocationWhereUniqueInput
    create: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput>
  }

  export type ActualAllocationCreateManyProjectInputEnvelope = {
    data: ActualAllocationCreateManyProjectInput | ActualAllocationCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutProjectsInput = {
    update: XOR<OrganizationUpdateWithoutProjectsInput, OrganizationUncheckedUpdateWithoutProjectsInput>
    create: XOR<OrganizationCreateWithoutProjectsInput, OrganizationUncheckedCreateWithoutProjectsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutProjectsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutProjectsInput, OrganizationUncheckedUpdateWithoutProjectsInput>
  }

  export type OrganizationUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUncheckedUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type TeamUpsertWithoutProjectsInput = {
    update: XOR<TeamUpdateWithoutProjectsInput, TeamUncheckedUpdateWithoutProjectsInput>
    create: XOR<TeamCreateWithoutProjectsInput, TeamUncheckedCreateWithoutProjectsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutProjectsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutProjectsInput, TeamUncheckedUpdateWithoutProjectsInput>
  }

  export type TeamUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type AuditLogUpsertWithWhereUniqueWithoutProjectInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutProjectInput, AuditLogUncheckedUpdateWithoutProjectInput>
    create: XOR<AuditLogCreateWithoutProjectInput, AuditLogUncheckedCreateWithoutProjectInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutProjectInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutProjectInput, AuditLogUncheckedUpdateWithoutProjectInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutProjectInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutProjectInput>
  }

  export type BudgetAllocationUpsertWithWhereUniqueWithoutProjectInput = {
    where: BudgetAllocationWhereUniqueInput
    update: XOR<BudgetAllocationUpdateWithoutProjectInput, BudgetAllocationUncheckedUpdateWithoutProjectInput>
    create: XOR<BudgetAllocationCreateWithoutProjectInput, BudgetAllocationUncheckedCreateWithoutProjectInput>
  }

  export type BudgetAllocationUpdateWithWhereUniqueWithoutProjectInput = {
    where: BudgetAllocationWhereUniqueInput
    data: XOR<BudgetAllocationUpdateWithoutProjectInput, BudgetAllocationUncheckedUpdateWithoutProjectInput>
  }

  export type BudgetAllocationUpdateManyWithWhereWithoutProjectInput = {
    where: BudgetAllocationScalarWhereInput
    data: XOR<BudgetAllocationUpdateManyMutationInput, BudgetAllocationUncheckedUpdateManyWithoutProjectInput>
  }

  export type ActualAllocationUpsertWithWhereUniqueWithoutProjectInput = {
    where: ActualAllocationWhereUniqueInput
    update: XOR<ActualAllocationUpdateWithoutProjectInput, ActualAllocationUncheckedUpdateWithoutProjectInput>
    create: XOR<ActualAllocationCreateWithoutProjectInput, ActualAllocationUncheckedCreateWithoutProjectInput>
  }

  export type ActualAllocationUpdateWithWhereUniqueWithoutProjectInput = {
    where: ActualAllocationWhereUniqueInput
    data: XOR<ActualAllocationUpdateWithoutProjectInput, ActualAllocationUncheckedUpdateWithoutProjectInput>
  }

  export type ActualAllocationUpdateManyWithWhereWithoutProjectInput = {
    where: ActualAllocationScalarWhereInput
    data: XOR<ActualAllocationUpdateManyMutationInput, ActualAllocationUncheckedUpdateManyWithoutProjectInput>
  }

  export type OrganizationCreateWithoutPeriodsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
    teams?: TeamCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutPeriodsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
    teams?: TeamUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutPeriodsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutPeriodsInput, OrganizationUncheckedCreateWithoutPeriodsInput>
  }

  export type BudgetAllocationCreateWithoutPeriodInput = {
    id?: string
    plannedHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutAllocationsInput
    project: ProjectCreateNestedOneWithoutAllocationsInput
  }

  export type BudgetAllocationUncheckedCreateWithoutPeriodInput = {
    id?: string
    teamId: string
    projectId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationCreateOrConnectWithoutPeriodInput = {
    where: BudgetAllocationWhereUniqueInput
    create: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput>
  }

  export type BudgetAllocationCreateManyPeriodInputEnvelope = {
    data: BudgetAllocationCreateManyPeriodInput | BudgetAllocationCreateManyPeriodInput[]
    skipDuplicates?: boolean
  }

  export type ActualAllocationCreateWithoutPeriodInput = {
    id?: string
    actualHours?: number
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutActualAllocationsInput
    project: ProjectCreateNestedOneWithoutActualAllocationsInput
  }

  export type ActualAllocationUncheckedCreateWithoutPeriodInput = {
    id?: string
    teamId: string
    projectId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateOrConnectWithoutPeriodInput = {
    where: ActualAllocationWhereUniqueInput
    create: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput>
  }

  export type ActualAllocationCreateManyPeriodInputEnvelope = {
    data: ActualAllocationCreateManyPeriodInput | ActualAllocationCreateManyPeriodInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutPeriodsInput = {
    update: XOR<OrganizationUpdateWithoutPeriodsInput, OrganizationUncheckedUpdateWithoutPeriodsInput>
    create: XOR<OrganizationCreateWithoutPeriodsInput, OrganizationUncheckedCreateWithoutPeriodsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutPeriodsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutPeriodsInput, OrganizationUncheckedUpdateWithoutPeriodsInput>
  }

  export type OrganizationUpdateWithoutPeriodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutPeriodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type BudgetAllocationUpsertWithWhereUniqueWithoutPeriodInput = {
    where: BudgetAllocationWhereUniqueInput
    update: XOR<BudgetAllocationUpdateWithoutPeriodInput, BudgetAllocationUncheckedUpdateWithoutPeriodInput>
    create: XOR<BudgetAllocationCreateWithoutPeriodInput, BudgetAllocationUncheckedCreateWithoutPeriodInput>
  }

  export type BudgetAllocationUpdateWithWhereUniqueWithoutPeriodInput = {
    where: BudgetAllocationWhereUniqueInput
    data: XOR<BudgetAllocationUpdateWithoutPeriodInput, BudgetAllocationUncheckedUpdateWithoutPeriodInput>
  }

  export type BudgetAllocationUpdateManyWithWhereWithoutPeriodInput = {
    where: BudgetAllocationScalarWhereInput
    data: XOR<BudgetAllocationUpdateManyMutationInput, BudgetAllocationUncheckedUpdateManyWithoutPeriodInput>
  }

  export type ActualAllocationUpsertWithWhereUniqueWithoutPeriodInput = {
    where: ActualAllocationWhereUniqueInput
    update: XOR<ActualAllocationUpdateWithoutPeriodInput, ActualAllocationUncheckedUpdateWithoutPeriodInput>
    create: XOR<ActualAllocationCreateWithoutPeriodInput, ActualAllocationUncheckedCreateWithoutPeriodInput>
  }

  export type ActualAllocationUpdateWithWhereUniqueWithoutPeriodInput = {
    where: ActualAllocationWhereUniqueInput
    data: XOR<ActualAllocationUpdateWithoutPeriodInput, ActualAllocationUncheckedUpdateWithoutPeriodInput>
  }

  export type ActualAllocationUpdateManyWithWhereWithoutPeriodInput = {
    where: ActualAllocationScalarWhereInput
    data: XOR<ActualAllocationUpdateManyMutationInput, ActualAllocationUncheckedUpdateManyWithoutPeriodInput>
  }

  export type TeamCreateWithoutAllocationsInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutAllocationsInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutAllocationsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutAllocationsInput, TeamUncheckedCreateWithoutAllocationsInput>
  }

  export type ProjectCreateWithoutAllocationsInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    organization?: OrganizationCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    logs?: AuditLogCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAllocationsInput = {
    id?: string
    organizationId?: string | null
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    logs?: AuditLogUncheckedCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAllocationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAllocationsInput, ProjectUncheckedCreateWithoutAllocationsInput>
  }

  export type PeriodCreateWithoutAllocationsInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    organization: OrganizationCreateNestedOneWithoutPeriodsInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutPeriodInput
  }

  export type PeriodUncheckedCreateWithoutAllocationsInput = {
    id?: string
    organizationId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type PeriodCreateOrConnectWithoutAllocationsInput = {
    where: PeriodWhereUniqueInput
    create: XOR<PeriodCreateWithoutAllocationsInput, PeriodUncheckedCreateWithoutAllocationsInput>
  }

  export type TeamUpsertWithoutAllocationsInput = {
    update: XOR<TeamUpdateWithoutAllocationsInput, TeamUncheckedUpdateWithoutAllocationsInput>
    create: XOR<TeamCreateWithoutAllocationsInput, TeamUncheckedCreateWithoutAllocationsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutAllocationsInput, TeamUncheckedUpdateWithoutAllocationsInput>
  }

  export type TeamUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type ProjectUpsertWithoutAllocationsInput = {
    update: XOR<ProjectUpdateWithoutAllocationsInput, ProjectUncheckedUpdateWithoutAllocationsInput>
    create: XOR<ProjectCreateWithoutAllocationsInput, ProjectUncheckedCreateWithoutAllocationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutAllocationsInput, ProjectUncheckedUpdateWithoutAllocationsInput>
  }

  export type ProjectUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    logs?: AuditLogUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    logs?: AuditLogUncheckedUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PeriodUpsertWithoutAllocationsInput = {
    update: XOR<PeriodUpdateWithoutAllocationsInput, PeriodUncheckedUpdateWithoutAllocationsInput>
    create: XOR<PeriodCreateWithoutAllocationsInput, PeriodUncheckedCreateWithoutAllocationsInput>
    where?: PeriodWhereInput
  }

  export type PeriodUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: PeriodWhereInput
    data: XOR<PeriodUpdateWithoutAllocationsInput, PeriodUncheckedUpdateWithoutAllocationsInput>
  }

  export type PeriodUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutPeriodsNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type TeamCreateWithoutActualAllocationsInput = {
    id?: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTeamsInput
    parentTeam?: TeamCreateNestedOneWithoutChildTeamsInput
    childTeams?: TeamCreateNestedManyWithoutParentTeamInput
    projects?: ProjectCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutActualAllocationsInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childTeams?: TeamUncheckedCreateNestedManyWithoutParentTeamInput
    projects?: ProjectUncheckedCreateNestedManyWithoutTeamInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutActualAllocationsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutActualAllocationsInput, TeamUncheckedCreateWithoutActualAllocationsInput>
  }

  export type ProjectCreateWithoutActualAllocationsInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    organization?: OrganizationCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    logs?: AuditLogCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutActualAllocationsInput = {
    id?: string
    organizationId?: string | null
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    logs?: AuditLogUncheckedCreateNestedManyWithoutProjectInput
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutActualAllocationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutActualAllocationsInput, ProjectUncheckedCreateWithoutActualAllocationsInput>
  }

  export type PeriodCreateWithoutActualAllocationsInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    organization: OrganizationCreateNestedOneWithoutPeriodsInput
    allocations?: BudgetAllocationCreateNestedManyWithoutPeriodInput
  }

  export type PeriodUncheckedCreateWithoutActualAllocationsInput = {
    id?: string
    organizationId: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type PeriodCreateOrConnectWithoutActualAllocationsInput = {
    where: PeriodWhereUniqueInput
    create: XOR<PeriodCreateWithoutActualAllocationsInput, PeriodUncheckedCreateWithoutActualAllocationsInput>
  }

  export type TeamUpsertWithoutActualAllocationsInput = {
    update: XOR<TeamUpdateWithoutActualAllocationsInput, TeamUncheckedUpdateWithoutActualAllocationsInput>
    create: XOR<TeamCreateWithoutActualAllocationsInput, TeamUncheckedCreateWithoutActualAllocationsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutActualAllocationsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutActualAllocationsInput, TeamUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type TeamUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type ProjectUpsertWithoutActualAllocationsInput = {
    update: XOR<ProjectUpdateWithoutActualAllocationsInput, ProjectUncheckedUpdateWithoutActualAllocationsInput>
    create: XOR<ProjectCreateWithoutActualAllocationsInput, ProjectUncheckedCreateWithoutActualAllocationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutActualAllocationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutActualAllocationsInput, ProjectUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type ProjectUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    logs?: AuditLogUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    logs?: AuditLogUncheckedUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PeriodUpsertWithoutActualAllocationsInput = {
    update: XOR<PeriodUpdateWithoutActualAllocationsInput, PeriodUncheckedUpdateWithoutActualAllocationsInput>
    create: XOR<PeriodCreateWithoutActualAllocationsInput, PeriodUncheckedCreateWithoutActualAllocationsInput>
    where?: PeriodWhereInput
  }

  export type PeriodUpdateToOneWithWhereWithoutActualAllocationsInput = {
    where?: PeriodWhereInput
    data: XOR<PeriodUpdateWithoutActualAllocationsInput, PeriodUncheckedUpdateWithoutActualAllocationsInput>
  }

  export type PeriodUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    organization?: OrganizationUpdateOneRequiredWithoutPeriodsNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodUncheckedUpdateWithoutActualAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type OrganizationCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
    teams?: TeamCreateNestedManyWithoutOrganizationInput
    periods?: PeriodCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
    teams?: TeamUncheckedCreateNestedManyWithoutOrganizationInput
    periods?: PeriodUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutAuditLogsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
  }

  export type ProjectCreateWithoutLogsInput = {
    id?: string
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    organization?: OrganizationCreateNestedOneWithoutProjectsInput
    team?: TeamCreateNestedOneWithoutProjectsInput
    allocations?: BudgetAllocationCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutLogsInput = {
    id?: string
    organizationId?: string | null
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    allocations?: BudgetAllocationUncheckedCreateNestedManyWithoutProjectInput
    actualAllocations?: ActualAllocationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutLogsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
  }

  export type OrganizationUpsertWithoutAuditLogsInput = {
    update: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<OrganizationCreateWithoutAuditLogsInput, OrganizationUncheckedCreateWithoutAuditLogsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutAuditLogsInput, OrganizationUncheckedUpdateWithoutAuditLogsInput>
  }

  export type OrganizationUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUncheckedUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type ProjectUpsertWithoutLogsInput = {
    update: XOR<ProjectUpdateWithoutLogsInput, ProjectUncheckedUpdateWithoutLogsInput>
    create: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutLogsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutLogsInput, ProjectUncheckedUpdateWithoutLogsInput>
  }

  export type ProjectUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutProjectsNestedInput
    team?: TeamUpdateOneWithoutProjectsNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutOrganizationInput
    teams?: TeamCreateNestedManyWithoutOrganizationInput
    periods?: PeriodCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutOrganizationInput
    teams?: TeamUncheckedCreateNestedManyWithoutOrganizationInput
    periods?: PeriodUncheckedCreateNestedManyWithoutOrganizationInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutOrganizationNestedInput
    teams?: TeamUncheckedUpdateManyWithoutOrganizationNestedInput
    periods?: PeriodUncheckedUpdateManyWithoutOrganizationNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    organizationId?: string | null
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    organizationId?: string | null
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    isGuest?: boolean
    role?: string
  }

  export type ProjectCreateManyOrganizationInput = {
    id?: string
    teamId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type TeamCreateManyOrganizationInput = {
    id?: string
    name: string
    code: string
    parentTeamId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PeriodCreateManyOrganizationInput = {
    id?: string
    type: string
    startDate: Date | string
    endDate: Date | string
    label: string
    isLocked?: boolean
  }

  export type AuditLogCreateManyOrganizationInput = {
    id?: string
    action: string
    entityType?: string
    entityId?: string | null
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    team?: TeamUpdateOneWithoutProjectsNestedInput
    logs?: AuditLogUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    logs?: AuditLogUncheckedUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentTeam?: TeamUpdateOneWithoutChildTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    parentTeamId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    allocations?: BudgetAllocationUpdateManyWithoutPeriodNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutPeriodNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type PeriodUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    label?: StringFieldUpdateOperationsInput | string
    isLocked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuditLogUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateManyParentTeamInput = {
    id?: string
    organizationId: string
    name: string
    code: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyTeamInput = {
    id?: string
    organizationId?: string | null
    name: string
    code?: string
    description?: string | null
    status?: string
    priority?: number
    progress?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type BudgetAllocationCreateManyTeamInput = {
    id?: string
    projectId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateManyTeamInput = {
    id?: string
    projectId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type TeamUpdateWithoutParentTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTeamsNestedInput
    childTeams?: TeamUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutParentTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childTeams?: TeamUncheckedUpdateManyWithoutParentTeamNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutTeamNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutTeamNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutParentTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    organization?: OrganizationUpdateOneWithoutProjectsNestedInput
    logs?: AuditLogUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    logs?: AuditLogUncheckedUpdateManyWithoutProjectNestedInput
    allocations?: BudgetAllocationUncheckedUpdateManyWithoutProjectNestedInput
    actualAllocations?: ActualAllocationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    progress?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type BudgetAllocationUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type BudgetAllocationUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutActualAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutActualAllocationsNestedInput
  }

  export type ActualAllocationUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyProjectInput = {
    id?: string
    organizationId?: string | null
    action: string
    entityType?: string
    projectName: string
    previousValue?: string | null
    newValue?: string | null
    userId: string
    userEmail: string
    timestamp?: Date | string
  }

  export type BudgetAllocationCreateManyProjectInput = {
    id?: string
    teamId: string
    periodId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateManyProjectInput = {
    id?: string
    teamId: string
    periodId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type AuditLogUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    projectName?: StringFieldUpdateOperationsInput | string
    previousValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type BudgetAllocationUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutActualAllocationsNestedInput
    period?: PeriodUpdateOneRequiredWithoutActualAllocationsNestedInput
  }

  export type ActualAllocationUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationCreateManyPeriodInput = {
    id?: string
    teamId: string
    projectId: string
    plannedHours?: number
    updatedAt?: Date | string
  }

  export type ActualAllocationCreateManyPeriodInput = {
    id?: string
    teamId: string
    projectId: string
    actualHours?: number
    updatedAt?: Date | string
  }

  export type BudgetAllocationUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutAllocationsNestedInput
    project?: ProjectUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type BudgetAllocationUncheckedUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BudgetAllocationUncheckedUpdateManyWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    plannedHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutActualAllocationsNestedInput
    project?: ProjectUpdateOneRequiredWithoutActualAllocationsNestedInput
  }

  export type ActualAllocationUncheckedUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActualAllocationUncheckedUpdateManyWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    actualHours?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}