
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
 * Model Firm
 * 
 */
export type Firm = $Result.DefaultSelection<Prisma.$FirmPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model BrokerAccount
 * 
 */
export type BrokerAccount = $Result.DefaultSelection<Prisma.$BrokerAccountPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model Holding
 * 
 */
export type Holding = $Result.DefaultSelection<Prisma.$HoldingPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model BasketOrder
 * 
 */
export type BasketOrder = $Result.DefaultSelection<Prisma.$BasketOrderPayload>
/**
 * Model RiskLimit
 * 
 */
export type RiskLimit = $Result.DefaultSelection<Prisma.$RiskLimitPayload>
/**
 * Model RestrictedSecurity
 * 
 */
export type RestrictedSecurity = $Result.DefaultSelection<Prisma.$RestrictedSecurityPayload>
/**
 * Model BrokerConnection
 * 
 */
export type BrokerConnection = $Result.DefaultSelection<Prisma.$BrokerConnectionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  PORTFOLIO_MANAGER: 'PORTFOLIO_MANAGER',
  OPERATIONS: 'OPERATIONS',
  VIEWER: 'VIEWER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const OrderSide: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type OrderSide = (typeof OrderSide)[keyof typeof OrderSide]


export const OrderType: {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]


export const OrderStatus: {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  OPEN: 'OPEN',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const AuditAction: {
  ORDER_CREATED: 'ORDER_CREATED',
  ORDER_SUBMITTED: 'ORDER_SUBMITTED',
  ORDER_MODIFIED: 'ORDER_MODIFIED',
  ORDER_FILLED: 'ORDER_FILLED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_REJECTED: 'ORDER_REJECTED',
  ORDER_SYNCED: 'ORDER_SYNCED',
  BASKET_CREATED: 'BASKET_CREATED',
  BASKET_SUBMITTED: 'BASKET_SUBMITTED',
  BASKET_CANCELLED: 'BASKET_CANCELLED'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]


export const AllocationMethod: {
  FIXED_QUANTITY: 'FIXED_QUANTITY',
  EQUAL_QUANTITY: 'EQUAL_QUANTITY',
  PERCENTAGE: 'PERCENTAGE'
};

export type AllocationMethod = (typeof AllocationMethod)[keyof typeof AllocationMethod]


export const BasketOrderStatus: {
  PENDING: 'PENDING',
  PARTIALLY_SUBMITTED: 'PARTIALLY_SUBMITTED',
  SUBMITTED: 'SUBMITTED',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
};

export type BasketOrderStatus = (typeof BasketOrderStatus)[keyof typeof BasketOrderStatus]


export const BrokerConnectionStatus: {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  EXPIRED: 'EXPIRED',
  ERROR: 'ERROR'
};

export type BrokerConnectionStatus = (typeof BrokerConnectionStatus)[keyof typeof BrokerConnectionStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type OrderSide = $Enums.OrderSide

export const OrderSide: typeof $Enums.OrderSide

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

export type AllocationMethod = $Enums.AllocationMethod

export const AllocationMethod: typeof $Enums.AllocationMethod

export type BasketOrderStatus = $Enums.BasketOrderStatus

export const BasketOrderStatus: typeof $Enums.BasketOrderStatus

export type BrokerConnectionStatus = $Enums.BrokerConnectionStatus

export const BrokerConnectionStatus: typeof $Enums.BrokerConnectionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Firms
 * const firms = await prisma.firm.findMany()
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
   * // Fetch zero or more Firms
   * const firms = await prisma.firm.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.firm`: Exposes CRUD operations for the **Firm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Firms
    * const firms = await prisma.firm.findMany()
    * ```
    */
  get firm(): Prisma.FirmDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brokerAccount`: Exposes CRUD operations for the **BrokerAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BrokerAccounts
    * const brokerAccounts = await prisma.brokerAccount.findMany()
    * ```
    */
  get brokerAccount(): Prisma.BrokerAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Portfolios
    * const portfolios = await prisma.portfolio.findMany()
    * ```
    */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.holding`: Exposes CRUD operations for the **Holding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holdings
    * const holdings = await prisma.holding.findMany()
    * ```
    */
  get holding(): Prisma.HoldingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.basketOrder`: Exposes CRUD operations for the **BasketOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BasketOrders
    * const basketOrders = await prisma.basketOrder.findMany()
    * ```
    */
  get basketOrder(): Prisma.BasketOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riskLimit`: Exposes CRUD operations for the **RiskLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskLimits
    * const riskLimits = await prisma.riskLimit.findMany()
    * ```
    */
  get riskLimit(): Prisma.RiskLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.restrictedSecurity`: Exposes CRUD operations for the **RestrictedSecurity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RestrictedSecurities
    * const restrictedSecurities = await prisma.restrictedSecurity.findMany()
    * ```
    */
  get restrictedSecurity(): Prisma.RestrictedSecurityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brokerConnection`: Exposes CRUD operations for the **BrokerConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BrokerConnections
    * const brokerConnections = await prisma.brokerConnection.findMany()
    * ```
    */
  get brokerConnection(): Prisma.BrokerConnectionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
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
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
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
    Firm: 'Firm',
    User: 'User',
    Client: 'Client',
    BrokerAccount: 'BrokerAccount',
    Portfolio: 'Portfolio',
    Holding: 'Holding',
    Order: 'Order',
    AuditLog: 'AuditLog',
    BasketOrder: 'BasketOrder',
    RiskLimit: 'RiskLimit',
    RestrictedSecurity: 'RestrictedSecurity',
    BrokerConnection: 'BrokerConnection'
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
      modelProps: "firm" | "user" | "client" | "brokerAccount" | "portfolio" | "holding" | "order" | "auditLog" | "basketOrder" | "riskLimit" | "restrictedSecurity" | "brokerConnection"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Firm: {
        payload: Prisma.$FirmPayload<ExtArgs>
        fields: Prisma.FirmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FirmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FirmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          findFirst: {
            args: Prisma.FirmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FirmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          findMany: {
            args: Prisma.FirmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          create: {
            args: Prisma.FirmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          createMany: {
            args: Prisma.FirmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FirmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          delete: {
            args: Prisma.FirmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          update: {
            args: Prisma.FirmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          deleteMany: {
            args: Prisma.FirmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FirmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FirmUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>[]
          }
          upsert: {
            args: Prisma.FirmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FirmPayload>
          }
          aggregate: {
            args: Prisma.FirmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFirm>
          }
          groupBy: {
            args: Prisma.FirmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FirmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FirmCountArgs<ExtArgs>
            result: $Utils.Optional<FirmCountAggregateOutputType> | number
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
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      BrokerAccount: {
        payload: Prisma.$BrokerAccountPayload<ExtArgs>
        fields: Prisma.BrokerAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrokerAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrokerAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          findFirst: {
            args: Prisma.BrokerAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrokerAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          findMany: {
            args: Prisma.BrokerAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>[]
          }
          create: {
            args: Prisma.BrokerAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          createMany: {
            args: Prisma.BrokerAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BrokerAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>[]
          }
          delete: {
            args: Prisma.BrokerAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          update: {
            args: Prisma.BrokerAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          deleteMany: {
            args: Prisma.BrokerAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrokerAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BrokerAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>[]
          }
          upsert: {
            args: Prisma.BrokerAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerAccountPayload>
          }
          aggregate: {
            args: Prisma.BrokerAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrokerAccount>
          }
          groupBy: {
            args: Prisma.BrokerAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrokerAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrokerAccountCountArgs<ExtArgs>
            result: $Utils.Optional<BrokerAccountCountAggregateOutputType> | number
          }
        }
      }
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>
        fields: Prisma.PortfolioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortfolioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[]
          }
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>
          }
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolio>
          }
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number
          }
        }
      }
      Holding: {
        payload: Prisma.$HoldingPayload<ExtArgs>
        fields: Prisma.HoldingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findFirst: {
            args: Prisma.HoldingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findMany: {
            args: Prisma.HoldingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          create: {
            args: Prisma.HoldingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          createMany: {
            args: Prisma.HoldingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoldingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          delete: {
            args: Prisma.HoldingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          update: {
            args: Prisma.HoldingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          deleteMany: {
            args: Prisma.HoldingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HoldingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          upsert: {
            args: Prisma.HoldingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          aggregate: {
            args: Prisma.HoldingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHolding>
          }
          groupBy: {
            args: Prisma.HoldingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
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
      BasketOrder: {
        payload: Prisma.$BasketOrderPayload<ExtArgs>
        fields: Prisma.BasketOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BasketOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BasketOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          findFirst: {
            args: Prisma.BasketOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BasketOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          findMany: {
            args: Prisma.BasketOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>[]
          }
          create: {
            args: Prisma.BasketOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          createMany: {
            args: Prisma.BasketOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BasketOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>[]
          }
          delete: {
            args: Prisma.BasketOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          update: {
            args: Prisma.BasketOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          deleteMany: {
            args: Prisma.BasketOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BasketOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BasketOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>[]
          }
          upsert: {
            args: Prisma.BasketOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasketOrderPayload>
          }
          aggregate: {
            args: Prisma.BasketOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBasketOrder>
          }
          groupBy: {
            args: Prisma.BasketOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<BasketOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.BasketOrderCountArgs<ExtArgs>
            result: $Utils.Optional<BasketOrderCountAggregateOutputType> | number
          }
        }
      }
      RiskLimit: {
        payload: Prisma.$RiskLimitPayload<ExtArgs>
        fields: Prisma.RiskLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          findFirst: {
            args: Prisma.RiskLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          findMany: {
            args: Prisma.RiskLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>[]
          }
          create: {
            args: Prisma.RiskLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          createMany: {
            args: Prisma.RiskLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>[]
          }
          delete: {
            args: Prisma.RiskLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          update: {
            args: Prisma.RiskLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          deleteMany: {
            args: Prisma.RiskLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RiskLimitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>[]
          }
          upsert: {
            args: Prisma.RiskLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskLimitPayload>
          }
          aggregate: {
            args: Prisma.RiskLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskLimit>
          }
          groupBy: {
            args: Prisma.RiskLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskLimitCountArgs<ExtArgs>
            result: $Utils.Optional<RiskLimitCountAggregateOutputType> | number
          }
        }
      }
      RestrictedSecurity: {
        payload: Prisma.$RestrictedSecurityPayload<ExtArgs>
        fields: Prisma.RestrictedSecurityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestrictedSecurityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestrictedSecurityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          findFirst: {
            args: Prisma.RestrictedSecurityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestrictedSecurityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          findMany: {
            args: Prisma.RestrictedSecurityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>[]
          }
          create: {
            args: Prisma.RestrictedSecurityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          createMany: {
            args: Prisma.RestrictedSecurityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestrictedSecurityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>[]
          }
          delete: {
            args: Prisma.RestrictedSecurityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          update: {
            args: Prisma.RestrictedSecurityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          deleteMany: {
            args: Prisma.RestrictedSecurityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestrictedSecurityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestrictedSecurityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>[]
          }
          upsert: {
            args: Prisma.RestrictedSecurityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestrictedSecurityPayload>
          }
          aggregate: {
            args: Prisma.RestrictedSecurityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestrictedSecurity>
          }
          groupBy: {
            args: Prisma.RestrictedSecurityGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestrictedSecurityGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestrictedSecurityCountArgs<ExtArgs>
            result: $Utils.Optional<RestrictedSecurityCountAggregateOutputType> | number
          }
        }
      }
      BrokerConnection: {
        payload: Prisma.$BrokerConnectionPayload<ExtArgs>
        fields: Prisma.BrokerConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrokerConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrokerConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          findFirst: {
            args: Prisma.BrokerConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrokerConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          findMany: {
            args: Prisma.BrokerConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>[]
          }
          create: {
            args: Prisma.BrokerConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          createMany: {
            args: Prisma.BrokerConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BrokerConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>[]
          }
          delete: {
            args: Prisma.BrokerConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          update: {
            args: Prisma.BrokerConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          deleteMany: {
            args: Prisma.BrokerConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrokerConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BrokerConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>[]
          }
          upsert: {
            args: Prisma.BrokerConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrokerConnectionPayload>
          }
          aggregate: {
            args: Prisma.BrokerConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrokerConnection>
          }
          groupBy: {
            args: Prisma.BrokerConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrokerConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrokerConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<BrokerConnectionCountAggregateOutputType> | number
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
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
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
    firm?: FirmOmit
    user?: UserOmit
    client?: ClientOmit
    brokerAccount?: BrokerAccountOmit
    portfolio?: PortfolioOmit
    holding?: HoldingOmit
    order?: OrderOmit
    auditLog?: AuditLogOmit
    basketOrder?: BasketOrderOmit
    riskLimit?: RiskLimitOmit
    restrictedSecurity?: RestrictedSecurityOmit
    brokerConnection?: BrokerConnectionOmit
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
   * Count Type FirmCountOutputType
   */

  export type FirmCountOutputType = {
    users: number
    clients: number
    basketOrders: number
    auditLogs: number
  }

  export type FirmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | FirmCountOutputTypeCountUsersArgs
    clients?: boolean | FirmCountOutputTypeCountClientsArgs
    basketOrders?: boolean | FirmCountOutputTypeCountBasketOrdersArgs
    auditLogs?: boolean | FirmCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FirmCountOutputType
     */
    select?: FirmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountBasketOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BasketOrderWhereInput
  }

  /**
   * FirmCountOutputType without action
   */
  export type FirmCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    brokerAccounts: number
    portfolios: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brokerAccounts?: boolean | ClientCountOutputTypeCountBrokerAccountsArgs
    portfolios?: boolean | ClientCountOutputTypeCountPortfoliosArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountBrokerAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrokerAccountWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountPortfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
  }


  /**
   * Count Type BrokerAccountCountOutputType
   */

  export type BrokerAccountCountOutputType = {
    orders: number
  }

  export type BrokerAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | BrokerAccountCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * BrokerAccountCountOutputType without action
   */
  export type BrokerAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccountCountOutputType
     */
    select?: BrokerAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrokerAccountCountOutputType without action
   */
  export type BrokerAccountCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type PortfolioCountOutputType
   */

  export type PortfolioCountOutputType = {
    holdings: number
    orders: number
  }

  export type PortfolioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | PortfolioCountOutputTypeCountHoldingsArgs
    orders?: boolean | PortfolioCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioCountOutputType
     */
    select?: PortfolioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
  }

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type BasketOrderCountOutputType
   */

  export type BasketOrderCountOutputType = {
    orders: number
  }

  export type BasketOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | BasketOrderCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * BasketOrderCountOutputType without action
   */
  export type BasketOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrderCountOutputType
     */
    select?: BasketOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BasketOrderCountOutputType without action
   */
  export type BasketOrderCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Firm
   */

  export type AggregateFirm = {
    _count: FirmCountAggregateOutputType | null
    _min: FirmMinAggregateOutputType | null
    _max: FirmMaxAggregateOutputType | null
  }

  export type FirmMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FirmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FirmCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FirmMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FirmMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FirmCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FirmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Firm to aggregate.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Firms
    **/
    _count?: true | FirmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FirmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FirmMaxAggregateInputType
  }

  export type GetFirmAggregateType<T extends FirmAggregateArgs> = {
        [P in keyof T & keyof AggregateFirm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFirm[P]>
      : GetScalarType<T[P], AggregateFirm[P]>
  }




  export type FirmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FirmWhereInput
    orderBy?: FirmOrderByWithAggregationInput | FirmOrderByWithAggregationInput[]
    by: FirmScalarFieldEnum[] | FirmScalarFieldEnum
    having?: FirmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FirmCountAggregateInputType | true
    _min?: FirmMinAggregateInputType
    _max?: FirmMaxAggregateInputType
  }

  export type FirmGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: FirmCountAggregateOutputType | null
    _min: FirmMinAggregateOutputType | null
    _max: FirmMaxAggregateOutputType | null
  }

  type GetFirmGroupByPayload<T extends FirmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FirmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FirmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FirmGroupByOutputType[P]>
            : GetScalarType<T[P], FirmGroupByOutputType[P]>
        }
      >
    >


  export type FirmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Firm$usersArgs<ExtArgs>
    clients?: boolean | Firm$clientsArgs<ExtArgs>
    basketOrders?: boolean | Firm$basketOrdersArgs<ExtArgs>
    auditLogs?: boolean | Firm$auditLogsArgs<ExtArgs>
    _count?: boolean | FirmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["firm"]>

  export type FirmSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FirmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["firm"]>
  export type FirmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Firm$usersArgs<ExtArgs>
    clients?: boolean | Firm$clientsArgs<ExtArgs>
    basketOrders?: boolean | Firm$basketOrdersArgs<ExtArgs>
    auditLogs?: boolean | Firm$auditLogsArgs<ExtArgs>
    _count?: boolean | FirmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FirmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FirmIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FirmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Firm"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      clients: Prisma.$ClientPayload<ExtArgs>[]
      basketOrders: Prisma.$BasketOrderPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["firm"]>
    composites: {}
  }

  type FirmGetPayload<S extends boolean | null | undefined | FirmDefaultArgs> = $Result.GetResult<Prisma.$FirmPayload, S>

  type FirmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FirmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FirmCountAggregateInputType | true
    }

  export interface FirmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Firm'], meta: { name: 'Firm' } }
    /**
     * Find zero or one Firm that matches the filter.
     * @param {FirmFindUniqueArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FirmFindUniqueArgs>(args: SelectSubset<T, FirmFindUniqueArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Firm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FirmFindUniqueOrThrowArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FirmFindUniqueOrThrowArgs>(args: SelectSubset<T, FirmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Firm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindFirstArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FirmFindFirstArgs>(args?: SelectSubset<T, FirmFindFirstArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Firm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindFirstOrThrowArgs} args - Arguments to find a Firm
     * @example
     * // Get one Firm
     * const firm = await prisma.firm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FirmFindFirstOrThrowArgs>(args?: SelectSubset<T, FirmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Firms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Firms
     * const firms = await prisma.firm.findMany()
     * 
     * // Get first 10 Firms
     * const firms = await prisma.firm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const firmWithIdOnly = await prisma.firm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FirmFindManyArgs>(args?: SelectSubset<T, FirmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Firm.
     * @param {FirmCreateArgs} args - Arguments to create a Firm.
     * @example
     * // Create one Firm
     * const Firm = await prisma.firm.create({
     *   data: {
     *     // ... data to create a Firm
     *   }
     * })
     * 
     */
    create<T extends FirmCreateArgs>(args: SelectSubset<T, FirmCreateArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Firms.
     * @param {FirmCreateManyArgs} args - Arguments to create many Firms.
     * @example
     * // Create many Firms
     * const firm = await prisma.firm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FirmCreateManyArgs>(args?: SelectSubset<T, FirmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Firms and returns the data saved in the database.
     * @param {FirmCreateManyAndReturnArgs} args - Arguments to create many Firms.
     * @example
     * // Create many Firms
     * const firm = await prisma.firm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Firms and only return the `id`
     * const firmWithIdOnly = await prisma.firm.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FirmCreateManyAndReturnArgs>(args?: SelectSubset<T, FirmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Firm.
     * @param {FirmDeleteArgs} args - Arguments to delete one Firm.
     * @example
     * // Delete one Firm
     * const Firm = await prisma.firm.delete({
     *   where: {
     *     // ... filter to delete one Firm
     *   }
     * })
     * 
     */
    delete<T extends FirmDeleteArgs>(args: SelectSubset<T, FirmDeleteArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Firm.
     * @param {FirmUpdateArgs} args - Arguments to update one Firm.
     * @example
     * // Update one Firm
     * const firm = await prisma.firm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FirmUpdateArgs>(args: SelectSubset<T, FirmUpdateArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Firms.
     * @param {FirmDeleteManyArgs} args - Arguments to filter Firms to delete.
     * @example
     * // Delete a few Firms
     * const { count } = await prisma.firm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FirmDeleteManyArgs>(args?: SelectSubset<T, FirmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Firms
     * const firm = await prisma.firm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FirmUpdateManyArgs>(args: SelectSubset<T, FirmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Firms and returns the data updated in the database.
     * @param {FirmUpdateManyAndReturnArgs} args - Arguments to update many Firms.
     * @example
     * // Update many Firms
     * const firm = await prisma.firm.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Firms and only return the `id`
     * const firmWithIdOnly = await prisma.firm.updateManyAndReturn({
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
    updateManyAndReturn<T extends FirmUpdateManyAndReturnArgs>(args: SelectSubset<T, FirmUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Firm.
     * @param {FirmUpsertArgs} args - Arguments to update or create a Firm.
     * @example
     * // Update or create a Firm
     * const firm = await prisma.firm.upsert({
     *   create: {
     *     // ... data to create a Firm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Firm we want to update
     *   }
     * })
     */
    upsert<T extends FirmUpsertArgs>(args: SelectSubset<T, FirmUpsertArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Firms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmCountArgs} args - Arguments to filter Firms to count.
     * @example
     * // Count the number of Firms
     * const count = await prisma.firm.count({
     *   where: {
     *     // ... the filter for the Firms we want to count
     *   }
     * })
    **/
    count<T extends FirmCountArgs>(
      args?: Subset<T, FirmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FirmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FirmAggregateArgs>(args: Subset<T, FirmAggregateArgs>): Prisma.PrismaPromise<GetFirmAggregateType<T>>

    /**
     * Group by Firm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FirmGroupByArgs} args - Group by arguments.
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
      T extends FirmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FirmGroupByArgs['orderBy'] }
        : { orderBy?: FirmGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FirmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFirmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Firm model
   */
  readonly fields: FirmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Firm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FirmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Firm$usersArgs<ExtArgs> = {}>(args?: Subset<T, Firm$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clients<T extends Firm$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Firm$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    basketOrders<T extends Firm$basketOrdersArgs<ExtArgs> = {}>(args?: Subset<T, Firm$basketOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends Firm$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Firm$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Firm model
   */
  interface FirmFieldRefs {
    readonly id: FieldRef<"Firm", 'String'>
    readonly name: FieldRef<"Firm", 'String'>
    readonly createdAt: FieldRef<"Firm", 'DateTime'>
    readonly updatedAt: FieldRef<"Firm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Firm findUnique
   */
  export type FirmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm findUniqueOrThrow
   */
  export type FirmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm findFirst
   */
  export type FirmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firms.
     */
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm findFirstOrThrow
   */
  export type FirmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firm to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firms.
     */
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm findMany
   */
  export type FirmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter, which Firms to fetch.
     */
    where?: FirmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Firms to fetch.
     */
    orderBy?: FirmOrderByWithRelationInput | FirmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Firms.
     */
    cursor?: FirmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Firms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Firms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Firms.
     */
    distinct?: FirmScalarFieldEnum | FirmScalarFieldEnum[]
  }

  /**
   * Firm create
   */
  export type FirmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The data needed to create a Firm.
     */
    data: XOR<FirmCreateInput, FirmUncheckedCreateInput>
  }

  /**
   * Firm createMany
   */
  export type FirmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Firms.
     */
    data: FirmCreateManyInput | FirmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Firm createManyAndReturn
   */
  export type FirmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * The data used to create many Firms.
     */
    data: FirmCreateManyInput | FirmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Firm update
   */
  export type FirmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The data needed to update a Firm.
     */
    data: XOR<FirmUpdateInput, FirmUncheckedUpdateInput>
    /**
     * Choose, which Firm to update.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm updateMany
   */
  export type FirmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Firms.
     */
    data: XOR<FirmUpdateManyMutationInput, FirmUncheckedUpdateManyInput>
    /**
     * Filter which Firms to update
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to update.
     */
    limit?: number
  }

  /**
   * Firm updateManyAndReturn
   */
  export type FirmUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * The data used to update Firms.
     */
    data: XOR<FirmUpdateManyMutationInput, FirmUncheckedUpdateManyInput>
    /**
     * Filter which Firms to update
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to update.
     */
    limit?: number
  }

  /**
   * Firm upsert
   */
  export type FirmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * The filter to search for the Firm to update in case it exists.
     */
    where: FirmWhereUniqueInput
    /**
     * In case the Firm found by the `where` argument doesn't exist, create a new Firm with this data.
     */
    create: XOR<FirmCreateInput, FirmUncheckedCreateInput>
    /**
     * In case the Firm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FirmUpdateInput, FirmUncheckedUpdateInput>
  }

  /**
   * Firm delete
   */
  export type FirmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
    /**
     * Filter which Firm to delete.
     */
    where: FirmWhereUniqueInput
  }

  /**
   * Firm deleteMany
   */
  export type FirmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Firms to delete
     */
    where?: FirmWhereInput
    /**
     * Limit how many Firms to delete.
     */
    limit?: number
  }

  /**
   * Firm.users
   */
  export type Firm$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Firm.clients
   */
  export type Firm$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Firm.basketOrders
   */
  export type Firm$basketOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    where?: BasketOrderWhereInput
    orderBy?: BasketOrderOrderByWithRelationInput | BasketOrderOrderByWithRelationInput[]
    cursor?: BasketOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BasketOrderScalarFieldEnum | BasketOrderScalarFieldEnum[]
  }

  /**
   * Firm.auditLogs
   */
  export type Firm$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Firm without action
   */
  export type FirmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Firm
     */
    select?: FirmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Firm
     */
    omit?: FirmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FirmInclude<ExtArgs> | null
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
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    firmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
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
    name: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    firmId: string
    createdAt: Date
    updatedAt: Date
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
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "firmId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      firmId: string
      createdAt: Date
      updatedAt: Date
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
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly firmId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
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
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    email: number
    firmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    email: string | null
    firmId: string
    createdAt: Date
    updatedAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    brokerAccounts?: boolean | Client$brokerAccountsArgs<ExtArgs>
    portfolios?: boolean | Client$portfoliosArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "firmId" | "createdAt" | "updatedAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    brokerAccounts?: boolean | Client$brokerAccountsArgs<ExtArgs>
    portfolios?: boolean | Client$portfoliosArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
      brokerAccounts: Prisma.$BrokerAccountPayload<ExtArgs>[]
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      firmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
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
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    brokerAccounts<T extends Client$brokerAccountsArgs<ExtArgs> = {}>(args?: Subset<T, Client$brokerAccountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portfolios<T extends Client$portfoliosArgs<ExtArgs> = {}>(args?: Subset<T, Client$portfoliosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly firmId: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.brokerAccounts
   */
  export type Client$brokerAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    where?: BrokerAccountWhereInput
    orderBy?: BrokerAccountOrderByWithRelationInput | BrokerAccountOrderByWithRelationInput[]
    cursor?: BrokerAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BrokerAccountScalarFieldEnum | BrokerAccountScalarFieldEnum[]
  }

  /**
   * Client.portfolios
   */
  export type Client$portfoliosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    cursor?: PortfolioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model BrokerAccount
   */

  export type AggregateBrokerAccount = {
    _count: BrokerAccountCountAggregateOutputType | null
    _min: BrokerAccountMinAggregateOutputType | null
    _max: BrokerAccountMaxAggregateOutputType | null
  }

  export type BrokerAccountMinAggregateOutputType = {
    id: string | null
    broker: string | null
    accountId: string | null
    accountLabel: string | null
    clientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrokerAccountMaxAggregateOutputType = {
    id: string | null
    broker: string | null
    accountId: string | null
    accountLabel: string | null
    clientId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrokerAccountCountAggregateOutputType = {
    id: number
    broker: number
    accountId: number
    accountLabel: number
    clientId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrokerAccountMinAggregateInputType = {
    id?: true
    broker?: true
    accountId?: true
    accountLabel?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrokerAccountMaxAggregateInputType = {
    id?: true
    broker?: true
    accountId?: true
    accountLabel?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrokerAccountCountAggregateInputType = {
    id?: true
    broker?: true
    accountId?: true
    accountLabel?: true
    clientId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrokerAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrokerAccount to aggregate.
     */
    where?: BrokerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerAccounts to fetch.
     */
    orderBy?: BrokerAccountOrderByWithRelationInput | BrokerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrokerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BrokerAccounts
    **/
    _count?: true | BrokerAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrokerAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrokerAccountMaxAggregateInputType
  }

  export type GetBrokerAccountAggregateType<T extends BrokerAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateBrokerAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrokerAccount[P]>
      : GetScalarType<T[P], AggregateBrokerAccount[P]>
  }




  export type BrokerAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrokerAccountWhereInput
    orderBy?: BrokerAccountOrderByWithAggregationInput | BrokerAccountOrderByWithAggregationInput[]
    by: BrokerAccountScalarFieldEnum[] | BrokerAccountScalarFieldEnum
    having?: BrokerAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrokerAccountCountAggregateInputType | true
    _min?: BrokerAccountMinAggregateInputType
    _max?: BrokerAccountMaxAggregateInputType
  }

  export type BrokerAccountGroupByOutputType = {
    id: string
    broker: string
    accountId: string
    accountLabel: string | null
    clientId: string
    createdAt: Date
    updatedAt: Date
    _count: BrokerAccountCountAggregateOutputType | null
    _min: BrokerAccountMinAggregateOutputType | null
    _max: BrokerAccountMaxAggregateOutputType | null
  }

  type GetBrokerAccountGroupByPayload<T extends BrokerAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrokerAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrokerAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrokerAccountGroupByOutputType[P]>
            : GetScalarType<T[P], BrokerAccountGroupByOutputType[P]>
        }
      >
    >


  export type BrokerAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    broker?: boolean
    accountId?: boolean
    accountLabel?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    orders?: boolean | BrokerAccount$ordersArgs<ExtArgs>
    connection?: boolean | BrokerAccount$connectionArgs<ExtArgs>
    _count?: boolean | BrokerAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerAccount"]>

  export type BrokerAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    broker?: boolean
    accountId?: boolean
    accountLabel?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerAccount"]>

  export type BrokerAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    broker?: boolean
    accountId?: boolean
    accountLabel?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerAccount"]>

  export type BrokerAccountSelectScalar = {
    id?: boolean
    broker?: boolean
    accountId?: boolean
    accountLabel?: boolean
    clientId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrokerAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "broker" | "accountId" | "accountLabel" | "clientId" | "createdAt" | "updatedAt", ExtArgs["result"]["brokerAccount"]>
  export type BrokerAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    orders?: boolean | BrokerAccount$ordersArgs<ExtArgs>
    connection?: boolean | BrokerAccount$connectionArgs<ExtArgs>
    _count?: boolean | BrokerAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BrokerAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type BrokerAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $BrokerAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BrokerAccount"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
      connection: Prisma.$BrokerConnectionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      broker: string
      accountId: string
      accountLabel: string | null
      clientId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brokerAccount"]>
    composites: {}
  }

  type BrokerAccountGetPayload<S extends boolean | null | undefined | BrokerAccountDefaultArgs> = $Result.GetResult<Prisma.$BrokerAccountPayload, S>

  type BrokerAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrokerAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrokerAccountCountAggregateInputType | true
    }

  export interface BrokerAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BrokerAccount'], meta: { name: 'BrokerAccount' } }
    /**
     * Find zero or one BrokerAccount that matches the filter.
     * @param {BrokerAccountFindUniqueArgs} args - Arguments to find a BrokerAccount
     * @example
     * // Get one BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrokerAccountFindUniqueArgs>(args: SelectSubset<T, BrokerAccountFindUniqueArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BrokerAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrokerAccountFindUniqueOrThrowArgs} args - Arguments to find a BrokerAccount
     * @example
     * // Get one BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrokerAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, BrokerAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrokerAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountFindFirstArgs} args - Arguments to find a BrokerAccount
     * @example
     * // Get one BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrokerAccountFindFirstArgs>(args?: SelectSubset<T, BrokerAccountFindFirstArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrokerAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountFindFirstOrThrowArgs} args - Arguments to find a BrokerAccount
     * @example
     * // Get one BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrokerAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, BrokerAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BrokerAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BrokerAccounts
     * const brokerAccounts = await prisma.brokerAccount.findMany()
     * 
     * // Get first 10 BrokerAccounts
     * const brokerAccounts = await prisma.brokerAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brokerAccountWithIdOnly = await prisma.brokerAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrokerAccountFindManyArgs>(args?: SelectSubset<T, BrokerAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BrokerAccount.
     * @param {BrokerAccountCreateArgs} args - Arguments to create a BrokerAccount.
     * @example
     * // Create one BrokerAccount
     * const BrokerAccount = await prisma.brokerAccount.create({
     *   data: {
     *     // ... data to create a BrokerAccount
     *   }
     * })
     * 
     */
    create<T extends BrokerAccountCreateArgs>(args: SelectSubset<T, BrokerAccountCreateArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BrokerAccounts.
     * @param {BrokerAccountCreateManyArgs} args - Arguments to create many BrokerAccounts.
     * @example
     * // Create many BrokerAccounts
     * const brokerAccount = await prisma.brokerAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrokerAccountCreateManyArgs>(args?: SelectSubset<T, BrokerAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BrokerAccounts and returns the data saved in the database.
     * @param {BrokerAccountCreateManyAndReturnArgs} args - Arguments to create many BrokerAccounts.
     * @example
     * // Create many BrokerAccounts
     * const brokerAccount = await prisma.brokerAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BrokerAccounts and only return the `id`
     * const brokerAccountWithIdOnly = await prisma.brokerAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BrokerAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, BrokerAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BrokerAccount.
     * @param {BrokerAccountDeleteArgs} args - Arguments to delete one BrokerAccount.
     * @example
     * // Delete one BrokerAccount
     * const BrokerAccount = await prisma.brokerAccount.delete({
     *   where: {
     *     // ... filter to delete one BrokerAccount
     *   }
     * })
     * 
     */
    delete<T extends BrokerAccountDeleteArgs>(args: SelectSubset<T, BrokerAccountDeleteArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BrokerAccount.
     * @param {BrokerAccountUpdateArgs} args - Arguments to update one BrokerAccount.
     * @example
     * // Update one BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrokerAccountUpdateArgs>(args: SelectSubset<T, BrokerAccountUpdateArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BrokerAccounts.
     * @param {BrokerAccountDeleteManyArgs} args - Arguments to filter BrokerAccounts to delete.
     * @example
     * // Delete a few BrokerAccounts
     * const { count } = await prisma.brokerAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrokerAccountDeleteManyArgs>(args?: SelectSubset<T, BrokerAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrokerAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BrokerAccounts
     * const brokerAccount = await prisma.brokerAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrokerAccountUpdateManyArgs>(args: SelectSubset<T, BrokerAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrokerAccounts and returns the data updated in the database.
     * @param {BrokerAccountUpdateManyAndReturnArgs} args - Arguments to update many BrokerAccounts.
     * @example
     * // Update many BrokerAccounts
     * const brokerAccount = await prisma.brokerAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BrokerAccounts and only return the `id`
     * const brokerAccountWithIdOnly = await prisma.brokerAccount.updateManyAndReturn({
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
    updateManyAndReturn<T extends BrokerAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, BrokerAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BrokerAccount.
     * @param {BrokerAccountUpsertArgs} args - Arguments to update or create a BrokerAccount.
     * @example
     * // Update or create a BrokerAccount
     * const brokerAccount = await prisma.brokerAccount.upsert({
     *   create: {
     *     // ... data to create a BrokerAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BrokerAccount we want to update
     *   }
     * })
     */
    upsert<T extends BrokerAccountUpsertArgs>(args: SelectSubset<T, BrokerAccountUpsertArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BrokerAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountCountArgs} args - Arguments to filter BrokerAccounts to count.
     * @example
     * // Count the number of BrokerAccounts
     * const count = await prisma.brokerAccount.count({
     *   where: {
     *     // ... the filter for the BrokerAccounts we want to count
     *   }
     * })
    **/
    count<T extends BrokerAccountCountArgs>(
      args?: Subset<T, BrokerAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrokerAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BrokerAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BrokerAccountAggregateArgs>(args: Subset<T, BrokerAccountAggregateArgs>): Prisma.PrismaPromise<GetBrokerAccountAggregateType<T>>

    /**
     * Group by BrokerAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerAccountGroupByArgs} args - Group by arguments.
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
      T extends BrokerAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrokerAccountGroupByArgs['orderBy'] }
        : { orderBy?: BrokerAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BrokerAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrokerAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BrokerAccount model
   */
  readonly fields: BrokerAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BrokerAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrokerAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends BrokerAccount$ordersArgs<ExtArgs> = {}>(args?: Subset<T, BrokerAccount$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    connection<T extends BrokerAccount$connectionArgs<ExtArgs> = {}>(args?: Subset<T, BrokerAccount$connectionArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BrokerAccount model
   */
  interface BrokerAccountFieldRefs {
    readonly id: FieldRef<"BrokerAccount", 'String'>
    readonly broker: FieldRef<"BrokerAccount", 'String'>
    readonly accountId: FieldRef<"BrokerAccount", 'String'>
    readonly accountLabel: FieldRef<"BrokerAccount", 'String'>
    readonly clientId: FieldRef<"BrokerAccount", 'String'>
    readonly createdAt: FieldRef<"BrokerAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"BrokerAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BrokerAccount findUnique
   */
  export type BrokerAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter, which BrokerAccount to fetch.
     */
    where: BrokerAccountWhereUniqueInput
  }

  /**
   * BrokerAccount findUniqueOrThrow
   */
  export type BrokerAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter, which BrokerAccount to fetch.
     */
    where: BrokerAccountWhereUniqueInput
  }

  /**
   * BrokerAccount findFirst
   */
  export type BrokerAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter, which BrokerAccount to fetch.
     */
    where?: BrokerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerAccounts to fetch.
     */
    orderBy?: BrokerAccountOrderByWithRelationInput | BrokerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrokerAccounts.
     */
    cursor?: BrokerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerAccounts.
     */
    distinct?: BrokerAccountScalarFieldEnum | BrokerAccountScalarFieldEnum[]
  }

  /**
   * BrokerAccount findFirstOrThrow
   */
  export type BrokerAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter, which BrokerAccount to fetch.
     */
    where?: BrokerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerAccounts to fetch.
     */
    orderBy?: BrokerAccountOrderByWithRelationInput | BrokerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrokerAccounts.
     */
    cursor?: BrokerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerAccounts.
     */
    distinct?: BrokerAccountScalarFieldEnum | BrokerAccountScalarFieldEnum[]
  }

  /**
   * BrokerAccount findMany
   */
  export type BrokerAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter, which BrokerAccounts to fetch.
     */
    where?: BrokerAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerAccounts to fetch.
     */
    orderBy?: BrokerAccountOrderByWithRelationInput | BrokerAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BrokerAccounts.
     */
    cursor?: BrokerAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerAccounts.
     */
    distinct?: BrokerAccountScalarFieldEnum | BrokerAccountScalarFieldEnum[]
  }

  /**
   * BrokerAccount create
   */
  export type BrokerAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a BrokerAccount.
     */
    data: XOR<BrokerAccountCreateInput, BrokerAccountUncheckedCreateInput>
  }

  /**
   * BrokerAccount createMany
   */
  export type BrokerAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BrokerAccounts.
     */
    data: BrokerAccountCreateManyInput | BrokerAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BrokerAccount createManyAndReturn
   */
  export type BrokerAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * The data used to create many BrokerAccounts.
     */
    data: BrokerAccountCreateManyInput | BrokerAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrokerAccount update
   */
  export type BrokerAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a BrokerAccount.
     */
    data: XOR<BrokerAccountUpdateInput, BrokerAccountUncheckedUpdateInput>
    /**
     * Choose, which BrokerAccount to update.
     */
    where: BrokerAccountWhereUniqueInput
  }

  /**
   * BrokerAccount updateMany
   */
  export type BrokerAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BrokerAccounts.
     */
    data: XOR<BrokerAccountUpdateManyMutationInput, BrokerAccountUncheckedUpdateManyInput>
    /**
     * Filter which BrokerAccounts to update
     */
    where?: BrokerAccountWhereInput
    /**
     * Limit how many BrokerAccounts to update.
     */
    limit?: number
  }

  /**
   * BrokerAccount updateManyAndReturn
   */
  export type BrokerAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * The data used to update BrokerAccounts.
     */
    data: XOR<BrokerAccountUpdateManyMutationInput, BrokerAccountUncheckedUpdateManyInput>
    /**
     * Filter which BrokerAccounts to update
     */
    where?: BrokerAccountWhereInput
    /**
     * Limit how many BrokerAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrokerAccount upsert
   */
  export type BrokerAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the BrokerAccount to update in case it exists.
     */
    where: BrokerAccountWhereUniqueInput
    /**
     * In case the BrokerAccount found by the `where` argument doesn't exist, create a new BrokerAccount with this data.
     */
    create: XOR<BrokerAccountCreateInput, BrokerAccountUncheckedCreateInput>
    /**
     * In case the BrokerAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrokerAccountUpdateInput, BrokerAccountUncheckedUpdateInput>
  }

  /**
   * BrokerAccount delete
   */
  export type BrokerAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
    /**
     * Filter which BrokerAccount to delete.
     */
    where: BrokerAccountWhereUniqueInput
  }

  /**
   * BrokerAccount deleteMany
   */
  export type BrokerAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrokerAccounts to delete
     */
    where?: BrokerAccountWhereInput
    /**
     * Limit how many BrokerAccounts to delete.
     */
    limit?: number
  }

  /**
   * BrokerAccount.orders
   */
  export type BrokerAccount$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * BrokerAccount.connection
   */
  export type BrokerAccount$connectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    where?: BrokerConnectionWhereInput
  }

  /**
   * BrokerAccount without action
   */
  export type BrokerAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerAccount
     */
    select?: BrokerAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerAccount
     */
    omit?: BrokerAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerAccountInclude<ExtArgs> | null
  }


  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  export type PortfolioAvgAggregateOutputType = {
    cashBalance: Decimal | null
  }

  export type PortfolioSumAggregateOutputType = {
    cashBalance: Decimal | null
  }

  export type PortfolioMinAggregateOutputType = {
    id: string | null
    name: string | null
    clientId: string | null
    cashBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioMaxAggregateOutputType = {
    id: string | null
    name: string | null
    clientId: string | null
    cashBalance: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioCountAggregateOutputType = {
    id: number
    name: number
    clientId: number
    cashBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioAvgAggregateInputType = {
    cashBalance?: true
  }

  export type PortfolioSumAggregateInputType = {
    cashBalance?: true
  }

  export type PortfolioMinAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioMaxAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioCountAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Portfolios
    **/
    _count?: true | PortfolioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioMaxAggregateInputType
  }

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>
  }




  export type PortfolioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioWhereInput
    orderBy?: PortfolioOrderByWithAggregationInput | PortfolioOrderByWithAggregationInput[]
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum
    having?: PortfolioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioCountAggregateInputType | true
    _avg?: PortfolioAvgAggregateInputType
    _sum?: PortfolioSumAggregateInputType
    _min?: PortfolioMinAggregateInputType
    _max?: PortfolioMaxAggregateInputType
  }

  export type PortfolioGroupByOutputType = {
    id: string
    name: string
    clientId: string
    cashBalance: Decimal
    createdAt: Date
    updatedAt: Date
    _count: PortfolioCountAggregateOutputType | null
    _avg: PortfolioAvgAggregateOutputType | null
    _sum: PortfolioSumAggregateOutputType | null
    _min: PortfolioMinAggregateOutputType | null
    _max: PortfolioMaxAggregateOutputType | null
  }

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    clientId?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    holdings?: boolean | Portfolio$holdingsArgs<ExtArgs>
    orders?: boolean | Portfolio$ordersArgs<ExtArgs>
    riskLimit?: boolean | Portfolio$riskLimitArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    clientId?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    clientId?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolio"]>

  export type PortfolioSelectScalar = {
    id?: boolean
    name?: boolean
    clientId?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "clientId" | "cashBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolio"]>
  export type PortfolioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    holdings?: boolean | Portfolio$holdingsArgs<ExtArgs>
    orders?: boolean | Portfolio$ordersArgs<ExtArgs>
    riskLimit?: boolean | Portfolio$riskLimitArgs<ExtArgs>
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type PortfolioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $PortfolioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Portfolio"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      holdings: Prisma.$HoldingPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      riskLimit: Prisma.$RiskLimitPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      clientId: string
      cashBalance: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolio"]>
    composites: {}
  }

  type PortfolioGetPayload<S extends boolean | null | undefined | PortfolioDefaultArgs> = $Result.GetResult<Prisma.$PortfolioPayload, S>

  type PortfolioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioCountAggregateInputType | true
    }

  export interface PortfolioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'], meta: { name: 'Portfolio' } }
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     * 
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioFindManyArgs>(args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     * 
     */
    create<T extends PortfolioCreateArgs>(args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioCreateManyArgs>(args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     * 
     */
    delete<T extends PortfolioDeleteArgs>(args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioUpdateArgs>(args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioUpdateManyArgs>(args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Portfolios and returns the data updated in the database.
     * @param {PortfolioUpdateManyAndReturnArgs} args - Arguments to update many Portfolios.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.updateManyAndReturn({
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
    updateManyAndReturn<T extends PortfolioUpdateManyAndReturnArgs>(args: SelectSubset<T, PortfolioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
    **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PortfolioAggregateArgs>(args: Subset<T, PortfolioAggregateArgs>): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
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
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Portfolio model
   */
  readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    holdings<T extends Portfolio$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Portfolio$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    riskLimit<T extends Portfolio$riskLimitArgs<ExtArgs> = {}>(args?: Subset<T, Portfolio$riskLimitArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<"Portfolio", 'String'>
    readonly name: FieldRef<"Portfolio", 'String'>
    readonly clientId: FieldRef<"Portfolio", 'String'>
    readonly cashBalance: FieldRef<"Portfolio", 'Decimal'>
    readonly createdAt: FieldRef<"Portfolio", 'DateTime'>
    readonly updatedAt: FieldRef<"Portfolio", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Portfolios to fetch.
     */
    orderBy?: PortfolioOrderByWithRelationInput | PortfolioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Portfolios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[]
  }

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
  }

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
  }

  /**
   * Portfolio updateManyAndReturn
   */
  export type PortfolioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * The data used to update Portfolios.
     */
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyInput>
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>
  }

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput
  }

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number
  }

  /**
   * Portfolio.holdings
   */
  export type Portfolio$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    cursor?: HoldingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Portfolio.orders
   */
  export type Portfolio$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Portfolio.riskLimit
   */
  export type Portfolio$riskLimitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    where?: RiskLimitWhereInput
  }

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null
  }


  /**
   * Model Holding
   */

  export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  export type HoldingAvgAggregateOutputType = {
    quantity: number | null
    averagePrice: Decimal | null
  }

  export type HoldingSumAggregateOutputType = {
    quantity: number | null
    averagePrice: Decimal | null
  }

  export type HoldingMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    quantity: number | null
    averagePrice: Decimal | null
    portfolioId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HoldingMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    quantity: number | null
    averagePrice: Decimal | null
    portfolioId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HoldingCountAggregateOutputType = {
    id: number
    symbol: number
    exchange: number
    quantity: number
    averagePrice: number
    portfolioId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HoldingAvgAggregateInputType = {
    quantity?: true
    averagePrice?: true
  }

  export type HoldingSumAggregateInputType = {
    quantity?: true
    averagePrice?: true
  }

  export type HoldingMinAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    quantity?: true
    averagePrice?: true
    portfolioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HoldingMaxAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    quantity?: true
    averagePrice?: true
    portfolioId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HoldingCountAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    quantity?: true
    averagePrice?: true
    portfolioId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HoldingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holdings
    **/
    _count?: true | HoldingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType
  }

  export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
        [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolding[P]>
      : GetScalarType<T[P], AggregateHolding[P]>
  }




  export type HoldingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithAggregationInput | HoldingOrderByWithAggregationInput[]
    by: HoldingScalarFieldEnum[] | HoldingScalarFieldEnum
    having?: HoldingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingCountAggregateInputType | true
    _avg?: HoldingAvgAggregateInputType
    _sum?: HoldingSumAggregateInputType
    _min?: HoldingMinAggregateInputType
    _max?: HoldingMaxAggregateInputType
  }

  export type HoldingGroupByOutputType = {
    id: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal
    portfolioId: string
    createdAt: Date
    updatedAt: Date
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingGroupByOutputType[P]>
        }
      >
    >


  export type HoldingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    quantity?: boolean
    averagePrice?: boolean
    portfolioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    quantity?: boolean
    averagePrice?: boolean
    portfolioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    quantity?: boolean
    averagePrice?: boolean
    portfolioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectScalar = {
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    quantity?: boolean
    averagePrice?: boolean
    portfolioId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HoldingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "exchange" | "quantity" | "averagePrice" | "portfolioId" | "createdAt" | "updatedAt", ExtArgs["result"]["holding"]>
  export type HoldingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type HoldingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type HoldingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $HoldingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holding"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      exchange: string
      quantity: number
      averagePrice: Prisma.Decimal
      portfolioId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["holding"]>
    composites: {}
  }

  type HoldingGetPayload<S extends boolean | null | undefined | HoldingDefaultArgs> = $Result.GetResult<Prisma.$HoldingPayload, S>

  type HoldingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HoldingCountAggregateInputType | true
    }

  export interface HoldingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holding'], meta: { name: 'Holding' } }
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(args: SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(args?: SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     * 
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holdingWithIdOnly = await prisma.holding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoldingFindManyArgs>(args?: SelectSubset<T, HoldingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     * 
     */
    create<T extends HoldingCreateArgs>(args: SelectSubset<T, HoldingCreateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingCreateManyArgs>(args?: SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {HoldingCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoldingCreateManyAndReturnArgs>(args?: SelectSubset<T, HoldingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     * 
     */
    delete<T extends HoldingDeleteArgs>(args: SelectSubset<T, HoldingDeleteArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingUpdateArgs>(args: SelectSubset<T, HoldingUpdateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingDeleteManyArgs>(args?: SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingUpdateManyArgs>(args: SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings and returns the data updated in the database.
     * @param {HoldingUpdateManyAndReturnArgs} args - Arguments to update many Holdings.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.updateManyAndReturn({
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
    updateManyAndReturn<T extends HoldingUpdateManyAndReturnArgs>(args: SelectSubset<T, HoldingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(args: SelectSubset<T, HoldingUpsertArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingCountArgs>(
      args?: Subset<T, HoldingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HoldingAggregateArgs>(args: Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>

    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
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
      T extends HoldingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingGroupByArgs['orderBy'] }
        : { orderBy?: HoldingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holding model
   */
  readonly fields: HoldingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Holding model
   */
  interface HoldingFieldRefs {
    readonly id: FieldRef<"Holding", 'String'>
    readonly symbol: FieldRef<"Holding", 'String'>
    readonly exchange: FieldRef<"Holding", 'String'>
    readonly quantity: FieldRef<"Holding", 'Int'>
    readonly averagePrice: FieldRef<"Holding", 'Decimal'>
    readonly portfolioId: FieldRef<"Holding", 'String'>
    readonly createdAt: FieldRef<"Holding", 'DateTime'>
    readonly updatedAt: FieldRef<"Holding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Holding findUnique
   */
  export type HoldingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findUniqueOrThrow
   */
  export type HoldingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findFirst
   */
  export type HoldingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findFirstOrThrow
   */
  export type HoldingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findMany
   */
  export type HoldingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding create
   */
  export type HoldingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to create a Holding.
     */
    data: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
  }

  /**
   * Holding createMany
   */
  export type HoldingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holding createManyAndReturn
   */
  export type HoldingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holding update
   */
  export type HoldingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to update a Holding.
     */
    data: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
    /**
     * Choose, which Holding to update.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding updateMany
   */
  export type HoldingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
  }

  /**
   * Holding updateManyAndReturn
   */
  export type HoldingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holding upsert
   */
  export type HoldingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: HoldingWhereUniqueInput
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
  }

  /**
   * Holding delete
   */
  export type HoldingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter which Holding to delete.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding deleteMany
   */
  export type HoldingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to delete.
     */
    limit?: number
  }

  /**
   * Holding without action
   */
  export type HoldingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    quantity: number | null
    limitPrice: Decimal | null
    filledQuantity: number | null
    averageFillPrice: Decimal | null
    realizedPnl: Decimal | null
    estimatedPrice: Decimal | null
    reservedCash: Decimal | null
    reservedQuantity: number | null
  }

  export type OrderSumAggregateOutputType = {
    quantity: number | null
    limitPrice: Decimal | null
    filledQuantity: number | null
    averageFillPrice: Decimal | null
    realizedPnl: Decimal | null
    estimatedPrice: Decimal | null
    reservedCash: Decimal | null
    reservedQuantity: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    quantity: number | null
    limitPrice: Decimal | null
    brokerOrderId: string | null
    basketOrderId: string | null
    filledQuantity: number | null
    averageFillPrice: Decimal | null
    realizedPnl: Decimal | null
    filledAt: Date | null
    estimatedPrice: Decimal | null
    reservedCash: Decimal | null
    reservedQuantity: number | null
    portfolioId: string | null
    brokerAccountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    status: $Enums.OrderStatus | null
    quantity: number | null
    limitPrice: Decimal | null
    brokerOrderId: string | null
    basketOrderId: string | null
    filledQuantity: number | null
    averageFillPrice: Decimal | null
    realizedPnl: Decimal | null
    filledAt: Date | null
    estimatedPrice: Decimal | null
    reservedCash: Decimal | null
    reservedQuantity: number | null
    portfolioId: string | null
    brokerAccountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    symbol: number
    exchange: number
    side: number
    orderType: number
    status: number
    quantity: number
    limitPrice: number
    brokerOrderId: number
    basketOrderId: number
    filledQuantity: number
    averageFillPrice: number
    realizedPnl: number
    filledAt: number
    estimatedPrice: number
    reservedCash: number
    reservedQuantity: number
    portfolioId: number
    brokerAccountId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    quantity?: true
    limitPrice?: true
    filledQuantity?: true
    averageFillPrice?: true
    realizedPnl?: true
    estimatedPrice?: true
    reservedCash?: true
    reservedQuantity?: true
  }

  export type OrderSumAggregateInputType = {
    quantity?: true
    limitPrice?: true
    filledQuantity?: true
    averageFillPrice?: true
    realizedPnl?: true
    estimatedPrice?: true
    reservedCash?: true
    reservedQuantity?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    status?: true
    quantity?: true
    limitPrice?: true
    brokerOrderId?: true
    basketOrderId?: true
    filledQuantity?: true
    averageFillPrice?: true
    realizedPnl?: true
    filledAt?: true
    estimatedPrice?: true
    reservedCash?: true
    reservedQuantity?: true
    portfolioId?: true
    brokerAccountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    status?: true
    quantity?: true
    limitPrice?: true
    brokerOrderId?: true
    basketOrderId?: true
    filledQuantity?: true
    averageFillPrice?: true
    realizedPnl?: true
    filledAt?: true
    estimatedPrice?: true
    reservedCash?: true
    reservedQuantity?: true
    portfolioId?: true
    brokerAccountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    status?: true
    quantity?: true
    limitPrice?: true
    brokerOrderId?: true
    basketOrderId?: true
    filledQuantity?: true
    averageFillPrice?: true
    realizedPnl?: true
    filledAt?: true
    estimatedPrice?: true
    reservedCash?: true
    reservedQuantity?: true
    portfolioId?: true
    brokerAccountId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status: $Enums.OrderStatus
    quantity: number
    limitPrice: Decimal | null
    brokerOrderId: string | null
    basketOrderId: string | null
    filledQuantity: number
    averageFillPrice: Decimal | null
    realizedPnl: Decimal | null
    filledAt: Date | null
    estimatedPrice: Decimal | null
    reservedCash: Decimal
    reservedQuantity: number
    portfolioId: string
    brokerAccountId: string
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    status?: boolean
    quantity?: boolean
    limitPrice?: boolean
    brokerOrderId?: boolean
    basketOrderId?: boolean
    filledQuantity?: boolean
    averageFillPrice?: boolean
    realizedPnl?: boolean
    filledAt?: boolean
    estimatedPrice?: boolean
    reservedCash?: boolean
    reservedQuantity?: boolean
    portfolioId?: boolean
    brokerAccountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    status?: boolean
    quantity?: boolean
    limitPrice?: boolean
    brokerOrderId?: boolean
    basketOrderId?: boolean
    filledQuantity?: boolean
    averageFillPrice?: boolean
    realizedPnl?: boolean
    filledAt?: boolean
    estimatedPrice?: boolean
    reservedCash?: boolean
    reservedQuantity?: boolean
    portfolioId?: boolean
    brokerAccountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    status?: boolean
    quantity?: boolean
    limitPrice?: boolean
    brokerOrderId?: boolean
    basketOrderId?: boolean
    filledQuantity?: boolean
    averageFillPrice?: boolean
    realizedPnl?: boolean
    filledAt?: boolean
    estimatedPrice?: boolean
    reservedCash?: boolean
    reservedQuantity?: boolean
    portfolioId?: boolean
    brokerAccountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    status?: boolean
    quantity?: boolean
    limitPrice?: boolean
    brokerOrderId?: boolean
    basketOrderId?: boolean
    filledQuantity?: boolean
    averageFillPrice?: boolean
    realizedPnl?: boolean
    filledAt?: boolean
    estimatedPrice?: boolean
    reservedCash?: boolean
    reservedQuantity?: boolean
    portfolioId?: boolean
    brokerAccountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "exchange" | "side" | "orderType" | "status" | "quantity" | "limitPrice" | "brokerOrderId" | "basketOrderId" | "filledQuantity" | "averageFillPrice" | "realizedPnl" | "filledAt" | "estimatedPrice" | "reservedCash" | "reservedQuantity" | "portfolioId" | "brokerAccountId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    basketOrder?: boolean | Order$basketOrderArgs<ExtArgs>
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      basketOrder: Prisma.$BasketOrderPayload<ExtArgs> | null
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
      brokerAccount: Prisma.$BrokerAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      exchange: string
      side: $Enums.OrderSide
      orderType: $Enums.OrderType
      status: $Enums.OrderStatus
      quantity: number
      limitPrice: Prisma.Decimal | null
      brokerOrderId: string | null
      basketOrderId: string | null
      filledQuantity: number
      averageFillPrice: Prisma.Decimal | null
      realizedPnl: Prisma.Decimal | null
      filledAt: Date | null
      estimatedPrice: Prisma.Decimal | null
      reservedCash: Prisma.Decimal
      reservedQuantity: number
      portfolioId: string
      brokerAccountId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    basketOrder<T extends Order$basketOrderArgs<ExtArgs> = {}>(args?: Subset<T, Order$basketOrderArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    brokerAccount<T extends BrokerAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrokerAccountDefaultArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly symbol: FieldRef<"Order", 'String'>
    readonly exchange: FieldRef<"Order", 'String'>
    readonly side: FieldRef<"Order", 'OrderSide'>
    readonly orderType: FieldRef<"Order", 'OrderType'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly quantity: FieldRef<"Order", 'Int'>
    readonly limitPrice: FieldRef<"Order", 'Decimal'>
    readonly brokerOrderId: FieldRef<"Order", 'String'>
    readonly basketOrderId: FieldRef<"Order", 'String'>
    readonly filledQuantity: FieldRef<"Order", 'Int'>
    readonly averageFillPrice: FieldRef<"Order", 'Decimal'>
    readonly realizedPnl: FieldRef<"Order", 'Decimal'>
    readonly filledAt: FieldRef<"Order", 'DateTime'>
    readonly estimatedPrice: FieldRef<"Order", 'Decimal'>
    readonly reservedCash: FieldRef<"Order", 'Decimal'>
    readonly reservedQuantity: FieldRef<"Order", 'Int'>
    readonly portfolioId: FieldRef<"Order", 'String'>
    readonly brokerAccountId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.basketOrder
   */
  export type Order$basketOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    where?: BasketOrderWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
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
    firmId: string | null
    action: $Enums.AuditAction | null
    entityType: string | null
    entityId: string | null
    message: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    firmId: string | null
    action: $Enums.AuditAction | null
    entityType: string | null
    entityId: string | null
    message: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    firmId: number
    action: number
    entityType: number
    entityId: number
    message: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    firmId?: true
    action?: true
    entityType?: true
    entityId?: true
    message?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    firmId?: true
    action?: true
    entityType?: true
    entityId?: true
    message?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    firmId?: true
    action?: true
    entityType?: true
    entityId?: true
    message?: true
    metadata?: true
    createdAt?: true
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
    firmId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message: string | null
    metadata: JsonValue | null
    createdAt: Date
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
    firmId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firmId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firmId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    firmId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firmId" | "action" | "entityType" | "entityId" | "message" | "metadata" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firmId: string
      action: $Enums.AuditAction
      entityType: string
      entityId: string
      message: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
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
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly firmId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'AuditAction'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly message: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
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
   * Model BasketOrder
   */

  export type AggregateBasketOrder = {
    _count: BasketOrderCountAggregateOutputType | null
    _avg: BasketOrderAvgAggregateOutputType | null
    _sum: BasketOrderSumAggregateOutputType | null
    _min: BasketOrderMinAggregateOutputType | null
    _max: BasketOrderMaxAggregateOutputType | null
  }

  export type BasketOrderAvgAggregateOutputType = {
    limitPrice: Decimal | null
    totalQuantity: number | null
  }

  export type BasketOrderSumAggregateOutputType = {
    limitPrice: Decimal | null
    totalQuantity: number | null
  }

  export type BasketOrderMinAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
    exchange: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    limitPrice: Decimal | null
    totalQuantity: number | null
    allocationMethod: $Enums.AllocationMethod | null
    status: $Enums.BasketOrderStatus | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BasketOrderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
    exchange: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    limitPrice: Decimal | null
    totalQuantity: number | null
    allocationMethod: $Enums.AllocationMethod | null
    status: $Enums.BasketOrderStatus | null
    firmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BasketOrderCountAggregateOutputType = {
    id: number
    name: number
    symbol: number
    exchange: number
    side: number
    orderType: number
    limitPrice: number
    totalQuantity: number
    allocationMethod: number
    status: number
    firmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BasketOrderAvgAggregateInputType = {
    limitPrice?: true
    totalQuantity?: true
  }

  export type BasketOrderSumAggregateInputType = {
    limitPrice?: true
    totalQuantity?: true
  }

  export type BasketOrderMinAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    limitPrice?: true
    totalQuantity?: true
    allocationMethod?: true
    status?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BasketOrderMaxAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    limitPrice?: true
    totalQuantity?: true
    allocationMethod?: true
    status?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BasketOrderCountAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    exchange?: true
    side?: true
    orderType?: true
    limitPrice?: true
    totalQuantity?: true
    allocationMethod?: true
    status?: true
    firmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BasketOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BasketOrder to aggregate.
     */
    where?: BasketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasketOrders to fetch.
     */
    orderBy?: BasketOrderOrderByWithRelationInput | BasketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BasketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BasketOrders
    **/
    _count?: true | BasketOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BasketOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BasketOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BasketOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BasketOrderMaxAggregateInputType
  }

  export type GetBasketOrderAggregateType<T extends BasketOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateBasketOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBasketOrder[P]>
      : GetScalarType<T[P], AggregateBasketOrder[P]>
  }




  export type BasketOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BasketOrderWhereInput
    orderBy?: BasketOrderOrderByWithAggregationInput | BasketOrderOrderByWithAggregationInput[]
    by: BasketOrderScalarFieldEnum[] | BasketOrderScalarFieldEnum
    having?: BasketOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BasketOrderCountAggregateInputType | true
    _avg?: BasketOrderAvgAggregateInputType
    _sum?: BasketOrderSumAggregateInputType
    _min?: BasketOrderMinAggregateInputType
    _max?: BasketOrderMaxAggregateInputType
  }

  export type BasketOrderGroupByOutputType = {
    id: string
    name: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice: Decimal | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status: $Enums.BasketOrderStatus
    firmId: string
    createdAt: Date
    updatedAt: Date
    _count: BasketOrderCountAggregateOutputType | null
    _avg: BasketOrderAvgAggregateOutputType | null
    _sum: BasketOrderSumAggregateOutputType | null
    _min: BasketOrderMinAggregateOutputType | null
    _max: BasketOrderMaxAggregateOutputType | null
  }

  type GetBasketOrderGroupByPayload<T extends BasketOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BasketOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BasketOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BasketOrderGroupByOutputType[P]>
            : GetScalarType<T[P], BasketOrderGroupByOutputType[P]>
        }
      >
    >


  export type BasketOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    limitPrice?: boolean
    totalQuantity?: boolean
    allocationMethod?: boolean
    status?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    orders?: boolean | BasketOrder$ordersArgs<ExtArgs>
    _count?: boolean | BasketOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["basketOrder"]>

  export type BasketOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    limitPrice?: boolean
    totalQuantity?: boolean
    allocationMethod?: boolean
    status?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["basketOrder"]>

  export type BasketOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    limitPrice?: boolean
    totalQuantity?: boolean
    allocationMethod?: boolean
    status?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["basketOrder"]>

  export type BasketOrderSelectScalar = {
    id?: boolean
    name?: boolean
    symbol?: boolean
    exchange?: boolean
    side?: boolean
    orderType?: boolean
    limitPrice?: boolean
    totalQuantity?: boolean
    allocationMethod?: boolean
    status?: boolean
    firmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BasketOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "symbol" | "exchange" | "side" | "orderType" | "limitPrice" | "totalQuantity" | "allocationMethod" | "status" | "firmId" | "createdAt" | "updatedAt", ExtArgs["result"]["basketOrder"]>
  export type BasketOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
    orders?: boolean | BasketOrder$ordersArgs<ExtArgs>
    _count?: boolean | BasketOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BasketOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }
  export type BasketOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    firm?: boolean | FirmDefaultArgs<ExtArgs>
  }

  export type $BasketOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BasketOrder"
    objects: {
      firm: Prisma.$FirmPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      symbol: string
      exchange: string
      side: $Enums.OrderSide
      orderType: $Enums.OrderType
      limitPrice: Prisma.Decimal | null
      totalQuantity: number
      allocationMethod: $Enums.AllocationMethod
      status: $Enums.BasketOrderStatus
      firmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["basketOrder"]>
    composites: {}
  }

  type BasketOrderGetPayload<S extends boolean | null | undefined | BasketOrderDefaultArgs> = $Result.GetResult<Prisma.$BasketOrderPayload, S>

  type BasketOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BasketOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BasketOrderCountAggregateInputType | true
    }

  export interface BasketOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BasketOrder'], meta: { name: 'BasketOrder' } }
    /**
     * Find zero or one BasketOrder that matches the filter.
     * @param {BasketOrderFindUniqueArgs} args - Arguments to find a BasketOrder
     * @example
     * // Get one BasketOrder
     * const basketOrder = await prisma.basketOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BasketOrderFindUniqueArgs>(args: SelectSubset<T, BasketOrderFindUniqueArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BasketOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BasketOrderFindUniqueOrThrowArgs} args - Arguments to find a BasketOrder
     * @example
     * // Get one BasketOrder
     * const basketOrder = await prisma.basketOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BasketOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, BasketOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BasketOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderFindFirstArgs} args - Arguments to find a BasketOrder
     * @example
     * // Get one BasketOrder
     * const basketOrder = await prisma.basketOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BasketOrderFindFirstArgs>(args?: SelectSubset<T, BasketOrderFindFirstArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BasketOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderFindFirstOrThrowArgs} args - Arguments to find a BasketOrder
     * @example
     * // Get one BasketOrder
     * const basketOrder = await prisma.basketOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BasketOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, BasketOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BasketOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BasketOrders
     * const basketOrders = await prisma.basketOrder.findMany()
     * 
     * // Get first 10 BasketOrders
     * const basketOrders = await prisma.basketOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const basketOrderWithIdOnly = await prisma.basketOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BasketOrderFindManyArgs>(args?: SelectSubset<T, BasketOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BasketOrder.
     * @param {BasketOrderCreateArgs} args - Arguments to create a BasketOrder.
     * @example
     * // Create one BasketOrder
     * const BasketOrder = await prisma.basketOrder.create({
     *   data: {
     *     // ... data to create a BasketOrder
     *   }
     * })
     * 
     */
    create<T extends BasketOrderCreateArgs>(args: SelectSubset<T, BasketOrderCreateArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BasketOrders.
     * @param {BasketOrderCreateManyArgs} args - Arguments to create many BasketOrders.
     * @example
     * // Create many BasketOrders
     * const basketOrder = await prisma.basketOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BasketOrderCreateManyArgs>(args?: SelectSubset<T, BasketOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BasketOrders and returns the data saved in the database.
     * @param {BasketOrderCreateManyAndReturnArgs} args - Arguments to create many BasketOrders.
     * @example
     * // Create many BasketOrders
     * const basketOrder = await prisma.basketOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BasketOrders and only return the `id`
     * const basketOrderWithIdOnly = await prisma.basketOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BasketOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, BasketOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BasketOrder.
     * @param {BasketOrderDeleteArgs} args - Arguments to delete one BasketOrder.
     * @example
     * // Delete one BasketOrder
     * const BasketOrder = await prisma.basketOrder.delete({
     *   where: {
     *     // ... filter to delete one BasketOrder
     *   }
     * })
     * 
     */
    delete<T extends BasketOrderDeleteArgs>(args: SelectSubset<T, BasketOrderDeleteArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BasketOrder.
     * @param {BasketOrderUpdateArgs} args - Arguments to update one BasketOrder.
     * @example
     * // Update one BasketOrder
     * const basketOrder = await prisma.basketOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BasketOrderUpdateArgs>(args: SelectSubset<T, BasketOrderUpdateArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BasketOrders.
     * @param {BasketOrderDeleteManyArgs} args - Arguments to filter BasketOrders to delete.
     * @example
     * // Delete a few BasketOrders
     * const { count } = await prisma.basketOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BasketOrderDeleteManyArgs>(args?: SelectSubset<T, BasketOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BasketOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BasketOrders
     * const basketOrder = await prisma.basketOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BasketOrderUpdateManyArgs>(args: SelectSubset<T, BasketOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BasketOrders and returns the data updated in the database.
     * @param {BasketOrderUpdateManyAndReturnArgs} args - Arguments to update many BasketOrders.
     * @example
     * // Update many BasketOrders
     * const basketOrder = await prisma.basketOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BasketOrders and only return the `id`
     * const basketOrderWithIdOnly = await prisma.basketOrder.updateManyAndReturn({
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
    updateManyAndReturn<T extends BasketOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, BasketOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BasketOrder.
     * @param {BasketOrderUpsertArgs} args - Arguments to update or create a BasketOrder.
     * @example
     * // Update or create a BasketOrder
     * const basketOrder = await prisma.basketOrder.upsert({
     *   create: {
     *     // ... data to create a BasketOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BasketOrder we want to update
     *   }
     * })
     */
    upsert<T extends BasketOrderUpsertArgs>(args: SelectSubset<T, BasketOrderUpsertArgs<ExtArgs>>): Prisma__BasketOrderClient<$Result.GetResult<Prisma.$BasketOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BasketOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderCountArgs} args - Arguments to filter BasketOrders to count.
     * @example
     * // Count the number of BasketOrders
     * const count = await prisma.basketOrder.count({
     *   where: {
     *     // ... the filter for the BasketOrders we want to count
     *   }
     * })
    **/
    count<T extends BasketOrderCountArgs>(
      args?: Subset<T, BasketOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BasketOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BasketOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BasketOrderAggregateArgs>(args: Subset<T, BasketOrderAggregateArgs>): Prisma.PrismaPromise<GetBasketOrderAggregateType<T>>

    /**
     * Group by BasketOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasketOrderGroupByArgs} args - Group by arguments.
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
      T extends BasketOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BasketOrderGroupByArgs['orderBy'] }
        : { orderBy?: BasketOrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BasketOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBasketOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BasketOrder model
   */
  readonly fields: BasketOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BasketOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BasketOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    firm<T extends FirmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FirmDefaultArgs<ExtArgs>>): Prisma__FirmClient<$Result.GetResult<Prisma.$FirmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends BasketOrder$ordersArgs<ExtArgs> = {}>(args?: Subset<T, BasketOrder$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BasketOrder model
   */
  interface BasketOrderFieldRefs {
    readonly id: FieldRef<"BasketOrder", 'String'>
    readonly name: FieldRef<"BasketOrder", 'String'>
    readonly symbol: FieldRef<"BasketOrder", 'String'>
    readonly exchange: FieldRef<"BasketOrder", 'String'>
    readonly side: FieldRef<"BasketOrder", 'OrderSide'>
    readonly orderType: FieldRef<"BasketOrder", 'OrderType'>
    readonly limitPrice: FieldRef<"BasketOrder", 'Decimal'>
    readonly totalQuantity: FieldRef<"BasketOrder", 'Int'>
    readonly allocationMethod: FieldRef<"BasketOrder", 'AllocationMethod'>
    readonly status: FieldRef<"BasketOrder", 'BasketOrderStatus'>
    readonly firmId: FieldRef<"BasketOrder", 'String'>
    readonly createdAt: FieldRef<"BasketOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"BasketOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BasketOrder findUnique
   */
  export type BasketOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter, which BasketOrder to fetch.
     */
    where: BasketOrderWhereUniqueInput
  }

  /**
   * BasketOrder findUniqueOrThrow
   */
  export type BasketOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter, which BasketOrder to fetch.
     */
    where: BasketOrderWhereUniqueInput
  }

  /**
   * BasketOrder findFirst
   */
  export type BasketOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter, which BasketOrder to fetch.
     */
    where?: BasketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasketOrders to fetch.
     */
    orderBy?: BasketOrderOrderByWithRelationInput | BasketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BasketOrders.
     */
    cursor?: BasketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BasketOrders.
     */
    distinct?: BasketOrderScalarFieldEnum | BasketOrderScalarFieldEnum[]
  }

  /**
   * BasketOrder findFirstOrThrow
   */
  export type BasketOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter, which BasketOrder to fetch.
     */
    where?: BasketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasketOrders to fetch.
     */
    orderBy?: BasketOrderOrderByWithRelationInput | BasketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BasketOrders.
     */
    cursor?: BasketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BasketOrders.
     */
    distinct?: BasketOrderScalarFieldEnum | BasketOrderScalarFieldEnum[]
  }

  /**
   * BasketOrder findMany
   */
  export type BasketOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter, which BasketOrders to fetch.
     */
    where?: BasketOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasketOrders to fetch.
     */
    orderBy?: BasketOrderOrderByWithRelationInput | BasketOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BasketOrders.
     */
    cursor?: BasketOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasketOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasketOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BasketOrders.
     */
    distinct?: BasketOrderScalarFieldEnum | BasketOrderScalarFieldEnum[]
  }

  /**
   * BasketOrder create
   */
  export type BasketOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a BasketOrder.
     */
    data: XOR<BasketOrderCreateInput, BasketOrderUncheckedCreateInput>
  }

  /**
   * BasketOrder createMany
   */
  export type BasketOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BasketOrders.
     */
    data: BasketOrderCreateManyInput | BasketOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BasketOrder createManyAndReturn
   */
  export type BasketOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * The data used to create many BasketOrders.
     */
    data: BasketOrderCreateManyInput | BasketOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BasketOrder update
   */
  export type BasketOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a BasketOrder.
     */
    data: XOR<BasketOrderUpdateInput, BasketOrderUncheckedUpdateInput>
    /**
     * Choose, which BasketOrder to update.
     */
    where: BasketOrderWhereUniqueInput
  }

  /**
   * BasketOrder updateMany
   */
  export type BasketOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BasketOrders.
     */
    data: XOR<BasketOrderUpdateManyMutationInput, BasketOrderUncheckedUpdateManyInput>
    /**
     * Filter which BasketOrders to update
     */
    where?: BasketOrderWhereInput
    /**
     * Limit how many BasketOrders to update.
     */
    limit?: number
  }

  /**
   * BasketOrder updateManyAndReturn
   */
  export type BasketOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * The data used to update BasketOrders.
     */
    data: XOR<BasketOrderUpdateManyMutationInput, BasketOrderUncheckedUpdateManyInput>
    /**
     * Filter which BasketOrders to update
     */
    where?: BasketOrderWhereInput
    /**
     * Limit how many BasketOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BasketOrder upsert
   */
  export type BasketOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the BasketOrder to update in case it exists.
     */
    where: BasketOrderWhereUniqueInput
    /**
     * In case the BasketOrder found by the `where` argument doesn't exist, create a new BasketOrder with this data.
     */
    create: XOR<BasketOrderCreateInput, BasketOrderUncheckedCreateInput>
    /**
     * In case the BasketOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BasketOrderUpdateInput, BasketOrderUncheckedUpdateInput>
  }

  /**
   * BasketOrder delete
   */
  export type BasketOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
    /**
     * Filter which BasketOrder to delete.
     */
    where: BasketOrderWhereUniqueInput
  }

  /**
   * BasketOrder deleteMany
   */
  export type BasketOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BasketOrders to delete
     */
    where?: BasketOrderWhereInput
    /**
     * Limit how many BasketOrders to delete.
     */
    limit?: number
  }

  /**
   * BasketOrder.orders
   */
  export type BasketOrder$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * BasketOrder without action
   */
  export type BasketOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasketOrder
     */
    select?: BasketOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BasketOrder
     */
    omit?: BasketOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasketOrderInclude<ExtArgs> | null
  }


  /**
   * Model RiskLimit
   */

  export type AggregateRiskLimit = {
    _count: RiskLimitCountAggregateOutputType | null
    _avg: RiskLimitAvgAggregateOutputType | null
    _sum: RiskLimitSumAggregateOutputType | null
    _min: RiskLimitMinAggregateOutputType | null
    _max: RiskLimitMaxAggregateOutputType | null
  }

  export type RiskLimitAvgAggregateOutputType = {
    maxOrderQuantity: number | null
    maxOrderValue: Decimal | null
    maxPositionQuantity: number | null
    maxPositionValue: Decimal | null
  }

  export type RiskLimitSumAggregateOutputType = {
    maxOrderQuantity: number | null
    maxOrderValue: Decimal | null
    maxPositionQuantity: number | null
    maxPositionValue: Decimal | null
  }

  export type RiskLimitMinAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    maxOrderQuantity: number | null
    maxOrderValue: Decimal | null
    maxPositionQuantity: number | null
    maxPositionValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RiskLimitMaxAggregateOutputType = {
    id: string | null
    portfolioId: string | null
    maxOrderQuantity: number | null
    maxOrderValue: Decimal | null
    maxPositionQuantity: number | null
    maxPositionValue: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RiskLimitCountAggregateOutputType = {
    id: number
    portfolioId: number
    maxOrderQuantity: number
    maxOrderValue: number
    maxPositionQuantity: number
    maxPositionValue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RiskLimitAvgAggregateInputType = {
    maxOrderQuantity?: true
    maxOrderValue?: true
    maxPositionQuantity?: true
    maxPositionValue?: true
  }

  export type RiskLimitSumAggregateInputType = {
    maxOrderQuantity?: true
    maxOrderValue?: true
    maxPositionQuantity?: true
    maxPositionValue?: true
  }

  export type RiskLimitMinAggregateInputType = {
    id?: true
    portfolioId?: true
    maxOrderQuantity?: true
    maxOrderValue?: true
    maxPositionQuantity?: true
    maxPositionValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RiskLimitMaxAggregateInputType = {
    id?: true
    portfolioId?: true
    maxOrderQuantity?: true
    maxOrderValue?: true
    maxPositionQuantity?: true
    maxPositionValue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RiskLimitCountAggregateInputType = {
    id?: true
    portfolioId?: true
    maxOrderQuantity?: true
    maxOrderValue?: true
    maxPositionQuantity?: true
    maxPositionValue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RiskLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskLimit to aggregate.
     */
    where?: RiskLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskLimits to fetch.
     */
    orderBy?: RiskLimitOrderByWithRelationInput | RiskLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskLimits
    **/
    _count?: true | RiskLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiskLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiskLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskLimitMaxAggregateInputType
  }

  export type GetRiskLimitAggregateType<T extends RiskLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskLimit[P]>
      : GetScalarType<T[P], AggregateRiskLimit[P]>
  }




  export type RiskLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskLimitWhereInput
    orderBy?: RiskLimitOrderByWithAggregationInput | RiskLimitOrderByWithAggregationInput[]
    by: RiskLimitScalarFieldEnum[] | RiskLimitScalarFieldEnum
    having?: RiskLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskLimitCountAggregateInputType | true
    _avg?: RiskLimitAvgAggregateInputType
    _sum?: RiskLimitSumAggregateInputType
    _min?: RiskLimitMinAggregateInputType
    _max?: RiskLimitMaxAggregateInputType
  }

  export type RiskLimitGroupByOutputType = {
    id: string
    portfolioId: string
    maxOrderQuantity: number | null
    maxOrderValue: Decimal | null
    maxPositionQuantity: number | null
    maxPositionValue: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: RiskLimitCountAggregateOutputType | null
    _avg: RiskLimitAvgAggregateOutputType | null
    _sum: RiskLimitSumAggregateOutputType | null
    _min: RiskLimitMinAggregateOutputType | null
    _max: RiskLimitMaxAggregateOutputType | null
  }

  type GetRiskLimitGroupByPayload<T extends RiskLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskLimitGroupByOutputType[P]>
            : GetScalarType<T[P], RiskLimitGroupByOutputType[P]>
        }
      >
    >


  export type RiskLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    maxOrderQuantity?: boolean
    maxOrderValue?: boolean
    maxPositionQuantity?: boolean
    maxPositionValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskLimit"]>

  export type RiskLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    maxOrderQuantity?: boolean
    maxOrderValue?: boolean
    maxPositionQuantity?: boolean
    maxPositionValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskLimit"]>

  export type RiskLimitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    portfolioId?: boolean
    maxOrderQuantity?: boolean
    maxOrderValue?: boolean
    maxPositionQuantity?: boolean
    maxPositionValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riskLimit"]>

  export type RiskLimitSelectScalar = {
    id?: boolean
    portfolioId?: boolean
    maxOrderQuantity?: boolean
    maxOrderValue?: boolean
    maxPositionQuantity?: boolean
    maxPositionValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RiskLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "portfolioId" | "maxOrderQuantity" | "maxOrderValue" | "maxPositionQuantity" | "maxPositionValue" | "createdAt" | "updatedAt", ExtArgs["result"]["riskLimit"]>
  export type RiskLimitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type RiskLimitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }
  export type RiskLimitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>
  }

  export type $RiskLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskLimit"
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      portfolioId: string
      maxOrderQuantity: number | null
      maxOrderValue: Prisma.Decimal | null
      maxPositionQuantity: number | null
      maxPositionValue: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["riskLimit"]>
    composites: {}
  }

  type RiskLimitGetPayload<S extends boolean | null | undefined | RiskLimitDefaultArgs> = $Result.GetResult<Prisma.$RiskLimitPayload, S>

  type RiskLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiskLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiskLimitCountAggregateInputType | true
    }

  export interface RiskLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskLimit'], meta: { name: 'RiskLimit' } }
    /**
     * Find zero or one RiskLimit that matches the filter.
     * @param {RiskLimitFindUniqueArgs} args - Arguments to find a RiskLimit
     * @example
     * // Get one RiskLimit
     * const riskLimit = await prisma.riskLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskLimitFindUniqueArgs>(args: SelectSubset<T, RiskLimitFindUniqueArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RiskLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiskLimitFindUniqueOrThrowArgs} args - Arguments to find a RiskLimit
     * @example
     * // Get one RiskLimit
     * const riskLimit = await prisma.riskLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitFindFirstArgs} args - Arguments to find a RiskLimit
     * @example
     * // Get one RiskLimit
     * const riskLimit = await prisma.riskLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskLimitFindFirstArgs>(args?: SelectSubset<T, RiskLimitFindFirstArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiskLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitFindFirstOrThrowArgs} args - Arguments to find a RiskLimit
     * @example
     * // Get one RiskLimit
     * const riskLimit = await prisma.riskLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RiskLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskLimits
     * const riskLimits = await prisma.riskLimit.findMany()
     * 
     * // Get first 10 RiskLimits
     * const riskLimits = await prisma.riskLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskLimitWithIdOnly = await prisma.riskLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskLimitFindManyArgs>(args?: SelectSubset<T, RiskLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RiskLimit.
     * @param {RiskLimitCreateArgs} args - Arguments to create a RiskLimit.
     * @example
     * // Create one RiskLimit
     * const RiskLimit = await prisma.riskLimit.create({
     *   data: {
     *     // ... data to create a RiskLimit
     *   }
     * })
     * 
     */
    create<T extends RiskLimitCreateArgs>(args: SelectSubset<T, RiskLimitCreateArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RiskLimits.
     * @param {RiskLimitCreateManyArgs} args - Arguments to create many RiskLimits.
     * @example
     * // Create many RiskLimits
     * const riskLimit = await prisma.riskLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskLimitCreateManyArgs>(args?: SelectSubset<T, RiskLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskLimits and returns the data saved in the database.
     * @param {RiskLimitCreateManyAndReturnArgs} args - Arguments to create many RiskLimits.
     * @example
     * // Create many RiskLimits
     * const riskLimit = await prisma.riskLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskLimits and only return the `id`
     * const riskLimitWithIdOnly = await prisma.riskLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RiskLimit.
     * @param {RiskLimitDeleteArgs} args - Arguments to delete one RiskLimit.
     * @example
     * // Delete one RiskLimit
     * const RiskLimit = await prisma.riskLimit.delete({
     *   where: {
     *     // ... filter to delete one RiskLimit
     *   }
     * })
     * 
     */
    delete<T extends RiskLimitDeleteArgs>(args: SelectSubset<T, RiskLimitDeleteArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RiskLimit.
     * @param {RiskLimitUpdateArgs} args - Arguments to update one RiskLimit.
     * @example
     * // Update one RiskLimit
     * const riskLimit = await prisma.riskLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskLimitUpdateArgs>(args: SelectSubset<T, RiskLimitUpdateArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RiskLimits.
     * @param {RiskLimitDeleteManyArgs} args - Arguments to filter RiskLimits to delete.
     * @example
     * // Delete a few RiskLimits
     * const { count } = await prisma.riskLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskLimitDeleteManyArgs>(args?: SelectSubset<T, RiskLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskLimits
     * const riskLimit = await prisma.riskLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskLimitUpdateManyArgs>(args: SelectSubset<T, RiskLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskLimits and returns the data updated in the database.
     * @param {RiskLimitUpdateManyAndReturnArgs} args - Arguments to update many RiskLimits.
     * @example
     * // Update many RiskLimits
     * const riskLimit = await prisma.riskLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RiskLimits and only return the `id`
     * const riskLimitWithIdOnly = await prisma.riskLimit.updateManyAndReturn({
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
    updateManyAndReturn<T extends RiskLimitUpdateManyAndReturnArgs>(args: SelectSubset<T, RiskLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RiskLimit.
     * @param {RiskLimitUpsertArgs} args - Arguments to update or create a RiskLimit.
     * @example
     * // Update or create a RiskLimit
     * const riskLimit = await prisma.riskLimit.upsert({
     *   create: {
     *     // ... data to create a RiskLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskLimit we want to update
     *   }
     * })
     */
    upsert<T extends RiskLimitUpsertArgs>(args: SelectSubset<T, RiskLimitUpsertArgs<ExtArgs>>): Prisma__RiskLimitClient<$Result.GetResult<Prisma.$RiskLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RiskLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitCountArgs} args - Arguments to filter RiskLimits to count.
     * @example
     * // Count the number of RiskLimits
     * const count = await prisma.riskLimit.count({
     *   where: {
     *     // ... the filter for the RiskLimits we want to count
     *   }
     * })
    **/
    count<T extends RiskLimitCountArgs>(
      args?: Subset<T, RiskLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiskLimitAggregateArgs>(args: Subset<T, RiskLimitAggregateArgs>): Prisma.PrismaPromise<GetRiskLimitAggregateType<T>>

    /**
     * Group by RiskLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskLimitGroupByArgs} args - Group by arguments.
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
      T extends RiskLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskLimitGroupByArgs['orderBy'] }
        : { orderBy?: RiskLimitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiskLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskLimit model
   */
  readonly fields: RiskLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>): Prisma__PortfolioClient<$Result.GetResult<Prisma.$PortfolioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RiskLimit model
   */
  interface RiskLimitFieldRefs {
    readonly id: FieldRef<"RiskLimit", 'String'>
    readonly portfolioId: FieldRef<"RiskLimit", 'String'>
    readonly maxOrderQuantity: FieldRef<"RiskLimit", 'Int'>
    readonly maxOrderValue: FieldRef<"RiskLimit", 'Decimal'>
    readonly maxPositionQuantity: FieldRef<"RiskLimit", 'Int'>
    readonly maxPositionValue: FieldRef<"RiskLimit", 'Decimal'>
    readonly createdAt: FieldRef<"RiskLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"RiskLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RiskLimit findUnique
   */
  export type RiskLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter, which RiskLimit to fetch.
     */
    where: RiskLimitWhereUniqueInput
  }

  /**
   * RiskLimit findUniqueOrThrow
   */
  export type RiskLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter, which RiskLimit to fetch.
     */
    where: RiskLimitWhereUniqueInput
  }

  /**
   * RiskLimit findFirst
   */
  export type RiskLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter, which RiskLimit to fetch.
     */
    where?: RiskLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskLimits to fetch.
     */
    orderBy?: RiskLimitOrderByWithRelationInput | RiskLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskLimits.
     */
    cursor?: RiskLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskLimits.
     */
    distinct?: RiskLimitScalarFieldEnum | RiskLimitScalarFieldEnum[]
  }

  /**
   * RiskLimit findFirstOrThrow
   */
  export type RiskLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter, which RiskLimit to fetch.
     */
    where?: RiskLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskLimits to fetch.
     */
    orderBy?: RiskLimitOrderByWithRelationInput | RiskLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskLimits.
     */
    cursor?: RiskLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskLimits.
     */
    distinct?: RiskLimitScalarFieldEnum | RiskLimitScalarFieldEnum[]
  }

  /**
   * RiskLimit findMany
   */
  export type RiskLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter, which RiskLimits to fetch.
     */
    where?: RiskLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskLimits to fetch.
     */
    orderBy?: RiskLimitOrderByWithRelationInput | RiskLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskLimits.
     */
    cursor?: RiskLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskLimits.
     */
    distinct?: RiskLimitScalarFieldEnum | RiskLimitScalarFieldEnum[]
  }

  /**
   * RiskLimit create
   */
  export type RiskLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * The data needed to create a RiskLimit.
     */
    data: XOR<RiskLimitCreateInput, RiskLimitUncheckedCreateInput>
  }

  /**
   * RiskLimit createMany
   */
  export type RiskLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskLimits.
     */
    data: RiskLimitCreateManyInput | RiskLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskLimit createManyAndReturn
   */
  export type RiskLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * The data used to create many RiskLimits.
     */
    data: RiskLimitCreateManyInput | RiskLimitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskLimit update
   */
  export type RiskLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * The data needed to update a RiskLimit.
     */
    data: XOR<RiskLimitUpdateInput, RiskLimitUncheckedUpdateInput>
    /**
     * Choose, which RiskLimit to update.
     */
    where: RiskLimitWhereUniqueInput
  }

  /**
   * RiskLimit updateMany
   */
  export type RiskLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskLimits.
     */
    data: XOR<RiskLimitUpdateManyMutationInput, RiskLimitUncheckedUpdateManyInput>
    /**
     * Filter which RiskLimits to update
     */
    where?: RiskLimitWhereInput
    /**
     * Limit how many RiskLimits to update.
     */
    limit?: number
  }

  /**
   * RiskLimit updateManyAndReturn
   */
  export type RiskLimitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * The data used to update RiskLimits.
     */
    data: XOR<RiskLimitUpdateManyMutationInput, RiskLimitUncheckedUpdateManyInput>
    /**
     * Filter which RiskLimits to update
     */
    where?: RiskLimitWhereInput
    /**
     * Limit how many RiskLimits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RiskLimit upsert
   */
  export type RiskLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * The filter to search for the RiskLimit to update in case it exists.
     */
    where: RiskLimitWhereUniqueInput
    /**
     * In case the RiskLimit found by the `where` argument doesn't exist, create a new RiskLimit with this data.
     */
    create: XOR<RiskLimitCreateInput, RiskLimitUncheckedCreateInput>
    /**
     * In case the RiskLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskLimitUpdateInput, RiskLimitUncheckedUpdateInput>
  }

  /**
   * RiskLimit delete
   */
  export type RiskLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
    /**
     * Filter which RiskLimit to delete.
     */
    where: RiskLimitWhereUniqueInput
  }

  /**
   * RiskLimit deleteMany
   */
  export type RiskLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskLimits to delete
     */
    where?: RiskLimitWhereInput
    /**
     * Limit how many RiskLimits to delete.
     */
    limit?: number
  }

  /**
   * RiskLimit without action
   */
  export type RiskLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskLimit
     */
    select?: RiskLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiskLimit
     */
    omit?: RiskLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskLimitInclude<ExtArgs> | null
  }


  /**
   * Model RestrictedSecurity
   */

  export type AggregateRestrictedSecurity = {
    _count: RestrictedSecurityCountAggregateOutputType | null
    _min: RestrictedSecurityMinAggregateOutputType | null
    _max: RestrictedSecurityMaxAggregateOutputType | null
  }

  export type RestrictedSecurityMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type RestrictedSecurityMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    exchange: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type RestrictedSecurityCountAggregateOutputType = {
    id: number
    symbol: number
    exchange: number
    reason: number
    createdAt: number
    _all: number
  }


  export type RestrictedSecurityMinAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    reason?: true
    createdAt?: true
  }

  export type RestrictedSecurityMaxAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    reason?: true
    createdAt?: true
  }

  export type RestrictedSecurityCountAggregateInputType = {
    id?: true
    symbol?: true
    exchange?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type RestrictedSecurityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestrictedSecurity to aggregate.
     */
    where?: RestrictedSecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestrictedSecurities to fetch.
     */
    orderBy?: RestrictedSecurityOrderByWithRelationInput | RestrictedSecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestrictedSecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestrictedSecurities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestrictedSecurities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RestrictedSecurities
    **/
    _count?: true | RestrictedSecurityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestrictedSecurityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestrictedSecurityMaxAggregateInputType
  }

  export type GetRestrictedSecurityAggregateType<T extends RestrictedSecurityAggregateArgs> = {
        [P in keyof T & keyof AggregateRestrictedSecurity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestrictedSecurity[P]>
      : GetScalarType<T[P], AggregateRestrictedSecurity[P]>
  }




  export type RestrictedSecurityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestrictedSecurityWhereInput
    orderBy?: RestrictedSecurityOrderByWithAggregationInput | RestrictedSecurityOrderByWithAggregationInput[]
    by: RestrictedSecurityScalarFieldEnum[] | RestrictedSecurityScalarFieldEnum
    having?: RestrictedSecurityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestrictedSecurityCountAggregateInputType | true
    _min?: RestrictedSecurityMinAggregateInputType
    _max?: RestrictedSecurityMaxAggregateInputType
  }

  export type RestrictedSecurityGroupByOutputType = {
    id: string
    symbol: string
    exchange: string
    reason: string | null
    createdAt: Date
    _count: RestrictedSecurityCountAggregateOutputType | null
    _min: RestrictedSecurityMinAggregateOutputType | null
    _max: RestrictedSecurityMaxAggregateOutputType | null
  }

  type GetRestrictedSecurityGroupByPayload<T extends RestrictedSecurityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestrictedSecurityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestrictedSecurityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestrictedSecurityGroupByOutputType[P]>
            : GetScalarType<T[P], RestrictedSecurityGroupByOutputType[P]>
        }
      >
    >


  export type RestrictedSecuritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["restrictedSecurity"]>

  export type RestrictedSecuritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["restrictedSecurity"]>

  export type RestrictedSecuritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["restrictedSecurity"]>

  export type RestrictedSecuritySelectScalar = {
    id?: boolean
    symbol?: boolean
    exchange?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type RestrictedSecurityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "exchange" | "reason" | "createdAt", ExtArgs["result"]["restrictedSecurity"]>

  export type $RestrictedSecurityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RestrictedSecurity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      exchange: string
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["restrictedSecurity"]>
    composites: {}
  }

  type RestrictedSecurityGetPayload<S extends boolean | null | undefined | RestrictedSecurityDefaultArgs> = $Result.GetResult<Prisma.$RestrictedSecurityPayload, S>

  type RestrictedSecurityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestrictedSecurityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestrictedSecurityCountAggregateInputType | true
    }

  export interface RestrictedSecurityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RestrictedSecurity'], meta: { name: 'RestrictedSecurity' } }
    /**
     * Find zero or one RestrictedSecurity that matches the filter.
     * @param {RestrictedSecurityFindUniqueArgs} args - Arguments to find a RestrictedSecurity
     * @example
     * // Get one RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestrictedSecurityFindUniqueArgs>(args: SelectSubset<T, RestrictedSecurityFindUniqueArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RestrictedSecurity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestrictedSecurityFindUniqueOrThrowArgs} args - Arguments to find a RestrictedSecurity
     * @example
     * // Get one RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestrictedSecurityFindUniqueOrThrowArgs>(args: SelectSubset<T, RestrictedSecurityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestrictedSecurity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityFindFirstArgs} args - Arguments to find a RestrictedSecurity
     * @example
     * // Get one RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestrictedSecurityFindFirstArgs>(args?: SelectSubset<T, RestrictedSecurityFindFirstArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestrictedSecurity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityFindFirstOrThrowArgs} args - Arguments to find a RestrictedSecurity
     * @example
     * // Get one RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestrictedSecurityFindFirstOrThrowArgs>(args?: SelectSubset<T, RestrictedSecurityFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RestrictedSecurities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RestrictedSecurities
     * const restrictedSecurities = await prisma.restrictedSecurity.findMany()
     * 
     * // Get first 10 RestrictedSecurities
     * const restrictedSecurities = await prisma.restrictedSecurity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restrictedSecurityWithIdOnly = await prisma.restrictedSecurity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestrictedSecurityFindManyArgs>(args?: SelectSubset<T, RestrictedSecurityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RestrictedSecurity.
     * @param {RestrictedSecurityCreateArgs} args - Arguments to create a RestrictedSecurity.
     * @example
     * // Create one RestrictedSecurity
     * const RestrictedSecurity = await prisma.restrictedSecurity.create({
     *   data: {
     *     // ... data to create a RestrictedSecurity
     *   }
     * })
     * 
     */
    create<T extends RestrictedSecurityCreateArgs>(args: SelectSubset<T, RestrictedSecurityCreateArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RestrictedSecurities.
     * @param {RestrictedSecurityCreateManyArgs} args - Arguments to create many RestrictedSecurities.
     * @example
     * // Create many RestrictedSecurities
     * const restrictedSecurity = await prisma.restrictedSecurity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestrictedSecurityCreateManyArgs>(args?: SelectSubset<T, RestrictedSecurityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RestrictedSecurities and returns the data saved in the database.
     * @param {RestrictedSecurityCreateManyAndReturnArgs} args - Arguments to create many RestrictedSecurities.
     * @example
     * // Create many RestrictedSecurities
     * const restrictedSecurity = await prisma.restrictedSecurity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RestrictedSecurities and only return the `id`
     * const restrictedSecurityWithIdOnly = await prisma.restrictedSecurity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestrictedSecurityCreateManyAndReturnArgs>(args?: SelectSubset<T, RestrictedSecurityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RestrictedSecurity.
     * @param {RestrictedSecurityDeleteArgs} args - Arguments to delete one RestrictedSecurity.
     * @example
     * // Delete one RestrictedSecurity
     * const RestrictedSecurity = await prisma.restrictedSecurity.delete({
     *   where: {
     *     // ... filter to delete one RestrictedSecurity
     *   }
     * })
     * 
     */
    delete<T extends RestrictedSecurityDeleteArgs>(args: SelectSubset<T, RestrictedSecurityDeleteArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RestrictedSecurity.
     * @param {RestrictedSecurityUpdateArgs} args - Arguments to update one RestrictedSecurity.
     * @example
     * // Update one RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestrictedSecurityUpdateArgs>(args: SelectSubset<T, RestrictedSecurityUpdateArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RestrictedSecurities.
     * @param {RestrictedSecurityDeleteManyArgs} args - Arguments to filter RestrictedSecurities to delete.
     * @example
     * // Delete a few RestrictedSecurities
     * const { count } = await prisma.restrictedSecurity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestrictedSecurityDeleteManyArgs>(args?: SelectSubset<T, RestrictedSecurityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestrictedSecurities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RestrictedSecurities
     * const restrictedSecurity = await prisma.restrictedSecurity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestrictedSecurityUpdateManyArgs>(args: SelectSubset<T, RestrictedSecurityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestrictedSecurities and returns the data updated in the database.
     * @param {RestrictedSecurityUpdateManyAndReturnArgs} args - Arguments to update many RestrictedSecurities.
     * @example
     * // Update many RestrictedSecurities
     * const restrictedSecurity = await prisma.restrictedSecurity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RestrictedSecurities and only return the `id`
     * const restrictedSecurityWithIdOnly = await prisma.restrictedSecurity.updateManyAndReturn({
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
    updateManyAndReturn<T extends RestrictedSecurityUpdateManyAndReturnArgs>(args: SelectSubset<T, RestrictedSecurityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RestrictedSecurity.
     * @param {RestrictedSecurityUpsertArgs} args - Arguments to update or create a RestrictedSecurity.
     * @example
     * // Update or create a RestrictedSecurity
     * const restrictedSecurity = await prisma.restrictedSecurity.upsert({
     *   create: {
     *     // ... data to create a RestrictedSecurity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RestrictedSecurity we want to update
     *   }
     * })
     */
    upsert<T extends RestrictedSecurityUpsertArgs>(args: SelectSubset<T, RestrictedSecurityUpsertArgs<ExtArgs>>): Prisma__RestrictedSecurityClient<$Result.GetResult<Prisma.$RestrictedSecurityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RestrictedSecurities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityCountArgs} args - Arguments to filter RestrictedSecurities to count.
     * @example
     * // Count the number of RestrictedSecurities
     * const count = await prisma.restrictedSecurity.count({
     *   where: {
     *     // ... the filter for the RestrictedSecurities we want to count
     *   }
     * })
    **/
    count<T extends RestrictedSecurityCountArgs>(
      args?: Subset<T, RestrictedSecurityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestrictedSecurityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RestrictedSecurity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RestrictedSecurityAggregateArgs>(args: Subset<T, RestrictedSecurityAggregateArgs>): Prisma.PrismaPromise<GetRestrictedSecurityAggregateType<T>>

    /**
     * Group by RestrictedSecurity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestrictedSecurityGroupByArgs} args - Group by arguments.
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
      T extends RestrictedSecurityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestrictedSecurityGroupByArgs['orderBy'] }
        : { orderBy?: RestrictedSecurityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RestrictedSecurityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestrictedSecurityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RestrictedSecurity model
   */
  readonly fields: RestrictedSecurityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RestrictedSecurity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestrictedSecurityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RestrictedSecurity model
   */
  interface RestrictedSecurityFieldRefs {
    readonly id: FieldRef<"RestrictedSecurity", 'String'>
    readonly symbol: FieldRef<"RestrictedSecurity", 'String'>
    readonly exchange: FieldRef<"RestrictedSecurity", 'String'>
    readonly reason: FieldRef<"RestrictedSecurity", 'String'>
    readonly createdAt: FieldRef<"RestrictedSecurity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RestrictedSecurity findUnique
   */
  export type RestrictedSecurityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter, which RestrictedSecurity to fetch.
     */
    where: RestrictedSecurityWhereUniqueInput
  }

  /**
   * RestrictedSecurity findUniqueOrThrow
   */
  export type RestrictedSecurityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter, which RestrictedSecurity to fetch.
     */
    where: RestrictedSecurityWhereUniqueInput
  }

  /**
   * RestrictedSecurity findFirst
   */
  export type RestrictedSecurityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter, which RestrictedSecurity to fetch.
     */
    where?: RestrictedSecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestrictedSecurities to fetch.
     */
    orderBy?: RestrictedSecurityOrderByWithRelationInput | RestrictedSecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestrictedSecurities.
     */
    cursor?: RestrictedSecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestrictedSecurities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestrictedSecurities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestrictedSecurities.
     */
    distinct?: RestrictedSecurityScalarFieldEnum | RestrictedSecurityScalarFieldEnum[]
  }

  /**
   * RestrictedSecurity findFirstOrThrow
   */
  export type RestrictedSecurityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter, which RestrictedSecurity to fetch.
     */
    where?: RestrictedSecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestrictedSecurities to fetch.
     */
    orderBy?: RestrictedSecurityOrderByWithRelationInput | RestrictedSecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestrictedSecurities.
     */
    cursor?: RestrictedSecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestrictedSecurities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestrictedSecurities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestrictedSecurities.
     */
    distinct?: RestrictedSecurityScalarFieldEnum | RestrictedSecurityScalarFieldEnum[]
  }

  /**
   * RestrictedSecurity findMany
   */
  export type RestrictedSecurityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter, which RestrictedSecurities to fetch.
     */
    where?: RestrictedSecurityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestrictedSecurities to fetch.
     */
    orderBy?: RestrictedSecurityOrderByWithRelationInput | RestrictedSecurityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RestrictedSecurities.
     */
    cursor?: RestrictedSecurityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestrictedSecurities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestrictedSecurities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestrictedSecurities.
     */
    distinct?: RestrictedSecurityScalarFieldEnum | RestrictedSecurityScalarFieldEnum[]
  }

  /**
   * RestrictedSecurity create
   */
  export type RestrictedSecurityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * The data needed to create a RestrictedSecurity.
     */
    data: XOR<RestrictedSecurityCreateInput, RestrictedSecurityUncheckedCreateInput>
  }

  /**
   * RestrictedSecurity createMany
   */
  export type RestrictedSecurityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RestrictedSecurities.
     */
    data: RestrictedSecurityCreateManyInput | RestrictedSecurityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestrictedSecurity createManyAndReturn
   */
  export type RestrictedSecurityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * The data used to create many RestrictedSecurities.
     */
    data: RestrictedSecurityCreateManyInput | RestrictedSecurityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestrictedSecurity update
   */
  export type RestrictedSecurityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * The data needed to update a RestrictedSecurity.
     */
    data: XOR<RestrictedSecurityUpdateInput, RestrictedSecurityUncheckedUpdateInput>
    /**
     * Choose, which RestrictedSecurity to update.
     */
    where: RestrictedSecurityWhereUniqueInput
  }

  /**
   * RestrictedSecurity updateMany
   */
  export type RestrictedSecurityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RestrictedSecurities.
     */
    data: XOR<RestrictedSecurityUpdateManyMutationInput, RestrictedSecurityUncheckedUpdateManyInput>
    /**
     * Filter which RestrictedSecurities to update
     */
    where?: RestrictedSecurityWhereInput
    /**
     * Limit how many RestrictedSecurities to update.
     */
    limit?: number
  }

  /**
   * RestrictedSecurity updateManyAndReturn
   */
  export type RestrictedSecurityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * The data used to update RestrictedSecurities.
     */
    data: XOR<RestrictedSecurityUpdateManyMutationInput, RestrictedSecurityUncheckedUpdateManyInput>
    /**
     * Filter which RestrictedSecurities to update
     */
    where?: RestrictedSecurityWhereInput
    /**
     * Limit how many RestrictedSecurities to update.
     */
    limit?: number
  }

  /**
   * RestrictedSecurity upsert
   */
  export type RestrictedSecurityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * The filter to search for the RestrictedSecurity to update in case it exists.
     */
    where: RestrictedSecurityWhereUniqueInput
    /**
     * In case the RestrictedSecurity found by the `where` argument doesn't exist, create a new RestrictedSecurity with this data.
     */
    create: XOR<RestrictedSecurityCreateInput, RestrictedSecurityUncheckedCreateInput>
    /**
     * In case the RestrictedSecurity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestrictedSecurityUpdateInput, RestrictedSecurityUncheckedUpdateInput>
  }

  /**
   * RestrictedSecurity delete
   */
  export type RestrictedSecurityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
    /**
     * Filter which RestrictedSecurity to delete.
     */
    where: RestrictedSecurityWhereUniqueInput
  }

  /**
   * RestrictedSecurity deleteMany
   */
  export type RestrictedSecurityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestrictedSecurities to delete
     */
    where?: RestrictedSecurityWhereInput
    /**
     * Limit how many RestrictedSecurities to delete.
     */
    limit?: number
  }

  /**
   * RestrictedSecurity without action
   */
  export type RestrictedSecurityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestrictedSecurity
     */
    select?: RestrictedSecuritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestrictedSecurity
     */
    omit?: RestrictedSecurityOmit<ExtArgs> | null
  }


  /**
   * Model BrokerConnection
   */

  export type AggregateBrokerConnection = {
    _count: BrokerConnectionCountAggregateOutputType | null
    _min: BrokerConnectionMinAggregateOutputType | null
    _max: BrokerConnectionMaxAggregateOutputType | null
  }

  export type BrokerConnectionMinAggregateOutputType = {
    id: string | null
    brokerAccountId: string | null
    credentialsEncrypted: string | null
    sessionEncrypted: string | null
    externalUserId: string | null
    sessionExpiresAt: Date | null
    status: $Enums.BrokerConnectionStatus | null
    lastConnectedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrokerConnectionMaxAggregateOutputType = {
    id: string | null
    brokerAccountId: string | null
    credentialsEncrypted: string | null
    sessionEncrypted: string | null
    externalUserId: string | null
    sessionExpiresAt: Date | null
    status: $Enums.BrokerConnectionStatus | null
    lastConnectedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrokerConnectionCountAggregateOutputType = {
    id: number
    brokerAccountId: number
    credentialsEncrypted: number
    sessionEncrypted: number
    externalUserId: number
    sessionExpiresAt: number
    status: number
    metadata: number
    lastConnectedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrokerConnectionMinAggregateInputType = {
    id?: true
    brokerAccountId?: true
    credentialsEncrypted?: true
    sessionEncrypted?: true
    externalUserId?: true
    sessionExpiresAt?: true
    status?: true
    lastConnectedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrokerConnectionMaxAggregateInputType = {
    id?: true
    brokerAccountId?: true
    credentialsEncrypted?: true
    sessionEncrypted?: true
    externalUserId?: true
    sessionExpiresAt?: true
    status?: true
    lastConnectedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrokerConnectionCountAggregateInputType = {
    id?: true
    brokerAccountId?: true
    credentialsEncrypted?: true
    sessionEncrypted?: true
    externalUserId?: true
    sessionExpiresAt?: true
    status?: true
    metadata?: true
    lastConnectedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrokerConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrokerConnection to aggregate.
     */
    where?: BrokerConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerConnections to fetch.
     */
    orderBy?: BrokerConnectionOrderByWithRelationInput | BrokerConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrokerConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BrokerConnections
    **/
    _count?: true | BrokerConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrokerConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrokerConnectionMaxAggregateInputType
  }

  export type GetBrokerConnectionAggregateType<T extends BrokerConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateBrokerConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrokerConnection[P]>
      : GetScalarType<T[P], AggregateBrokerConnection[P]>
  }




  export type BrokerConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrokerConnectionWhereInput
    orderBy?: BrokerConnectionOrderByWithAggregationInput | BrokerConnectionOrderByWithAggregationInput[]
    by: BrokerConnectionScalarFieldEnum[] | BrokerConnectionScalarFieldEnum
    having?: BrokerConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrokerConnectionCountAggregateInputType | true
    _min?: BrokerConnectionMinAggregateInputType
    _max?: BrokerConnectionMaxAggregateInputType
  }

  export type BrokerConnectionGroupByOutputType = {
    id: string
    brokerAccountId: string
    credentialsEncrypted: string | null
    sessionEncrypted: string | null
    externalUserId: string | null
    sessionExpiresAt: Date | null
    status: $Enums.BrokerConnectionStatus
    metadata: JsonValue | null
    lastConnectedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BrokerConnectionCountAggregateOutputType | null
    _min: BrokerConnectionMinAggregateOutputType | null
    _max: BrokerConnectionMaxAggregateOutputType | null
  }

  type GetBrokerConnectionGroupByPayload<T extends BrokerConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrokerConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrokerConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrokerConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], BrokerConnectionGroupByOutputType[P]>
        }
      >
    >


  export type BrokerConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brokerAccountId?: boolean
    credentialsEncrypted?: boolean
    sessionEncrypted?: boolean
    externalUserId?: boolean
    sessionExpiresAt?: boolean
    status?: boolean
    metadata?: boolean
    lastConnectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerConnection"]>

  export type BrokerConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brokerAccountId?: boolean
    credentialsEncrypted?: boolean
    sessionEncrypted?: boolean
    externalUserId?: boolean
    sessionExpiresAt?: boolean
    status?: boolean
    metadata?: boolean
    lastConnectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerConnection"]>

  export type BrokerConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brokerAccountId?: boolean
    credentialsEncrypted?: boolean
    sessionEncrypted?: boolean
    externalUserId?: boolean
    sessionExpiresAt?: boolean
    status?: boolean
    metadata?: boolean
    lastConnectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brokerConnection"]>

  export type BrokerConnectionSelectScalar = {
    id?: boolean
    brokerAccountId?: boolean
    credentialsEncrypted?: boolean
    sessionEncrypted?: boolean
    externalUserId?: boolean
    sessionExpiresAt?: boolean
    status?: boolean
    metadata?: boolean
    lastConnectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrokerConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brokerAccountId" | "credentialsEncrypted" | "sessionEncrypted" | "externalUserId" | "sessionExpiresAt" | "status" | "metadata" | "lastConnectedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["brokerConnection"]>
  export type BrokerConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }
  export type BrokerConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }
  export type BrokerConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brokerAccount?: boolean | BrokerAccountDefaultArgs<ExtArgs>
  }

  export type $BrokerConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BrokerConnection"
    objects: {
      brokerAccount: Prisma.$BrokerAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      brokerAccountId: string
      credentialsEncrypted: string | null
      sessionEncrypted: string | null
      externalUserId: string | null
      sessionExpiresAt: Date | null
      status: $Enums.BrokerConnectionStatus
      metadata: Prisma.JsonValue | null
      lastConnectedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brokerConnection"]>
    composites: {}
  }

  type BrokerConnectionGetPayload<S extends boolean | null | undefined | BrokerConnectionDefaultArgs> = $Result.GetResult<Prisma.$BrokerConnectionPayload, S>

  type BrokerConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrokerConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrokerConnectionCountAggregateInputType | true
    }

  export interface BrokerConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BrokerConnection'], meta: { name: 'BrokerConnection' } }
    /**
     * Find zero or one BrokerConnection that matches the filter.
     * @param {BrokerConnectionFindUniqueArgs} args - Arguments to find a BrokerConnection
     * @example
     * // Get one BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrokerConnectionFindUniqueArgs>(args: SelectSubset<T, BrokerConnectionFindUniqueArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BrokerConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrokerConnectionFindUniqueOrThrowArgs} args - Arguments to find a BrokerConnection
     * @example
     * // Get one BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrokerConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, BrokerConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrokerConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionFindFirstArgs} args - Arguments to find a BrokerConnection
     * @example
     * // Get one BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrokerConnectionFindFirstArgs>(args?: SelectSubset<T, BrokerConnectionFindFirstArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrokerConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionFindFirstOrThrowArgs} args - Arguments to find a BrokerConnection
     * @example
     * // Get one BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrokerConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, BrokerConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BrokerConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BrokerConnections
     * const brokerConnections = await prisma.brokerConnection.findMany()
     * 
     * // Get first 10 BrokerConnections
     * const brokerConnections = await prisma.brokerConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brokerConnectionWithIdOnly = await prisma.brokerConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrokerConnectionFindManyArgs>(args?: SelectSubset<T, BrokerConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BrokerConnection.
     * @param {BrokerConnectionCreateArgs} args - Arguments to create a BrokerConnection.
     * @example
     * // Create one BrokerConnection
     * const BrokerConnection = await prisma.brokerConnection.create({
     *   data: {
     *     // ... data to create a BrokerConnection
     *   }
     * })
     * 
     */
    create<T extends BrokerConnectionCreateArgs>(args: SelectSubset<T, BrokerConnectionCreateArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BrokerConnections.
     * @param {BrokerConnectionCreateManyArgs} args - Arguments to create many BrokerConnections.
     * @example
     * // Create many BrokerConnections
     * const brokerConnection = await prisma.brokerConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrokerConnectionCreateManyArgs>(args?: SelectSubset<T, BrokerConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BrokerConnections and returns the data saved in the database.
     * @param {BrokerConnectionCreateManyAndReturnArgs} args - Arguments to create many BrokerConnections.
     * @example
     * // Create many BrokerConnections
     * const brokerConnection = await prisma.brokerConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BrokerConnections and only return the `id`
     * const brokerConnectionWithIdOnly = await prisma.brokerConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BrokerConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, BrokerConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BrokerConnection.
     * @param {BrokerConnectionDeleteArgs} args - Arguments to delete one BrokerConnection.
     * @example
     * // Delete one BrokerConnection
     * const BrokerConnection = await prisma.brokerConnection.delete({
     *   where: {
     *     // ... filter to delete one BrokerConnection
     *   }
     * })
     * 
     */
    delete<T extends BrokerConnectionDeleteArgs>(args: SelectSubset<T, BrokerConnectionDeleteArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BrokerConnection.
     * @param {BrokerConnectionUpdateArgs} args - Arguments to update one BrokerConnection.
     * @example
     * // Update one BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrokerConnectionUpdateArgs>(args: SelectSubset<T, BrokerConnectionUpdateArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BrokerConnections.
     * @param {BrokerConnectionDeleteManyArgs} args - Arguments to filter BrokerConnections to delete.
     * @example
     * // Delete a few BrokerConnections
     * const { count } = await prisma.brokerConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrokerConnectionDeleteManyArgs>(args?: SelectSubset<T, BrokerConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrokerConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BrokerConnections
     * const brokerConnection = await prisma.brokerConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrokerConnectionUpdateManyArgs>(args: SelectSubset<T, BrokerConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrokerConnections and returns the data updated in the database.
     * @param {BrokerConnectionUpdateManyAndReturnArgs} args - Arguments to update many BrokerConnections.
     * @example
     * // Update many BrokerConnections
     * const brokerConnection = await prisma.brokerConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BrokerConnections and only return the `id`
     * const brokerConnectionWithIdOnly = await prisma.brokerConnection.updateManyAndReturn({
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
    updateManyAndReturn<T extends BrokerConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, BrokerConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BrokerConnection.
     * @param {BrokerConnectionUpsertArgs} args - Arguments to update or create a BrokerConnection.
     * @example
     * // Update or create a BrokerConnection
     * const brokerConnection = await prisma.brokerConnection.upsert({
     *   create: {
     *     // ... data to create a BrokerConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BrokerConnection we want to update
     *   }
     * })
     */
    upsert<T extends BrokerConnectionUpsertArgs>(args: SelectSubset<T, BrokerConnectionUpsertArgs<ExtArgs>>): Prisma__BrokerConnectionClient<$Result.GetResult<Prisma.$BrokerConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BrokerConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionCountArgs} args - Arguments to filter BrokerConnections to count.
     * @example
     * // Count the number of BrokerConnections
     * const count = await prisma.brokerConnection.count({
     *   where: {
     *     // ... the filter for the BrokerConnections we want to count
     *   }
     * })
    **/
    count<T extends BrokerConnectionCountArgs>(
      args?: Subset<T, BrokerConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrokerConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BrokerConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BrokerConnectionAggregateArgs>(args: Subset<T, BrokerConnectionAggregateArgs>): Prisma.PrismaPromise<GetBrokerConnectionAggregateType<T>>

    /**
     * Group by BrokerConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrokerConnectionGroupByArgs} args - Group by arguments.
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
      T extends BrokerConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrokerConnectionGroupByArgs['orderBy'] }
        : { orderBy?: BrokerConnectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BrokerConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrokerConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BrokerConnection model
   */
  readonly fields: BrokerConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BrokerConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrokerConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brokerAccount<T extends BrokerAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrokerAccountDefaultArgs<ExtArgs>>): Prisma__BrokerAccountClient<$Result.GetResult<Prisma.$BrokerAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BrokerConnection model
   */
  interface BrokerConnectionFieldRefs {
    readonly id: FieldRef<"BrokerConnection", 'String'>
    readonly brokerAccountId: FieldRef<"BrokerConnection", 'String'>
    readonly credentialsEncrypted: FieldRef<"BrokerConnection", 'String'>
    readonly sessionEncrypted: FieldRef<"BrokerConnection", 'String'>
    readonly externalUserId: FieldRef<"BrokerConnection", 'String'>
    readonly sessionExpiresAt: FieldRef<"BrokerConnection", 'DateTime'>
    readonly status: FieldRef<"BrokerConnection", 'BrokerConnectionStatus'>
    readonly metadata: FieldRef<"BrokerConnection", 'Json'>
    readonly lastConnectedAt: FieldRef<"BrokerConnection", 'DateTime'>
    readonly createdAt: FieldRef<"BrokerConnection", 'DateTime'>
    readonly updatedAt: FieldRef<"BrokerConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BrokerConnection findUnique
   */
  export type BrokerConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter, which BrokerConnection to fetch.
     */
    where: BrokerConnectionWhereUniqueInput
  }

  /**
   * BrokerConnection findUniqueOrThrow
   */
  export type BrokerConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter, which BrokerConnection to fetch.
     */
    where: BrokerConnectionWhereUniqueInput
  }

  /**
   * BrokerConnection findFirst
   */
  export type BrokerConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter, which BrokerConnection to fetch.
     */
    where?: BrokerConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerConnections to fetch.
     */
    orderBy?: BrokerConnectionOrderByWithRelationInput | BrokerConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrokerConnections.
     */
    cursor?: BrokerConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerConnections.
     */
    distinct?: BrokerConnectionScalarFieldEnum | BrokerConnectionScalarFieldEnum[]
  }

  /**
   * BrokerConnection findFirstOrThrow
   */
  export type BrokerConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter, which BrokerConnection to fetch.
     */
    where?: BrokerConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerConnections to fetch.
     */
    orderBy?: BrokerConnectionOrderByWithRelationInput | BrokerConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrokerConnections.
     */
    cursor?: BrokerConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerConnections.
     */
    distinct?: BrokerConnectionScalarFieldEnum | BrokerConnectionScalarFieldEnum[]
  }

  /**
   * BrokerConnection findMany
   */
  export type BrokerConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter, which BrokerConnections to fetch.
     */
    where?: BrokerConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrokerConnections to fetch.
     */
    orderBy?: BrokerConnectionOrderByWithRelationInput | BrokerConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BrokerConnections.
     */
    cursor?: BrokerConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrokerConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrokerConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrokerConnections.
     */
    distinct?: BrokerConnectionScalarFieldEnum | BrokerConnectionScalarFieldEnum[]
  }

  /**
   * BrokerConnection create
   */
  export type BrokerConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a BrokerConnection.
     */
    data: XOR<BrokerConnectionCreateInput, BrokerConnectionUncheckedCreateInput>
  }

  /**
   * BrokerConnection createMany
   */
  export type BrokerConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BrokerConnections.
     */
    data: BrokerConnectionCreateManyInput | BrokerConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BrokerConnection createManyAndReturn
   */
  export type BrokerConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many BrokerConnections.
     */
    data: BrokerConnectionCreateManyInput | BrokerConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrokerConnection update
   */
  export type BrokerConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a BrokerConnection.
     */
    data: XOR<BrokerConnectionUpdateInput, BrokerConnectionUncheckedUpdateInput>
    /**
     * Choose, which BrokerConnection to update.
     */
    where: BrokerConnectionWhereUniqueInput
  }

  /**
   * BrokerConnection updateMany
   */
  export type BrokerConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BrokerConnections.
     */
    data: XOR<BrokerConnectionUpdateManyMutationInput, BrokerConnectionUncheckedUpdateManyInput>
    /**
     * Filter which BrokerConnections to update
     */
    where?: BrokerConnectionWhereInput
    /**
     * Limit how many BrokerConnections to update.
     */
    limit?: number
  }

  /**
   * BrokerConnection updateManyAndReturn
   */
  export type BrokerConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * The data used to update BrokerConnections.
     */
    data: XOR<BrokerConnectionUpdateManyMutationInput, BrokerConnectionUncheckedUpdateManyInput>
    /**
     * Filter which BrokerConnections to update
     */
    where?: BrokerConnectionWhereInput
    /**
     * Limit how many BrokerConnections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrokerConnection upsert
   */
  export type BrokerConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the BrokerConnection to update in case it exists.
     */
    where: BrokerConnectionWhereUniqueInput
    /**
     * In case the BrokerConnection found by the `where` argument doesn't exist, create a new BrokerConnection with this data.
     */
    create: XOR<BrokerConnectionCreateInput, BrokerConnectionUncheckedCreateInput>
    /**
     * In case the BrokerConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrokerConnectionUpdateInput, BrokerConnectionUncheckedUpdateInput>
  }

  /**
   * BrokerConnection delete
   */
  export type BrokerConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
    /**
     * Filter which BrokerConnection to delete.
     */
    where: BrokerConnectionWhereUniqueInput
  }

  /**
   * BrokerConnection deleteMany
   */
  export type BrokerConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrokerConnections to delete
     */
    where?: BrokerConnectionWhereInput
    /**
     * Limit how many BrokerConnections to delete.
     */
    limit?: number
  }

  /**
   * BrokerConnection without action
   */
  export type BrokerConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrokerConnection
     */
    select?: BrokerConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrokerConnection
     */
    omit?: BrokerConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrokerConnectionInclude<ExtArgs> | null
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


  export const FirmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FirmScalarFieldEnum = (typeof FirmScalarFieldEnum)[keyof typeof FirmScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const BrokerAccountScalarFieldEnum: {
    id: 'id',
    broker: 'broker',
    accountId: 'accountId',
    accountLabel: 'accountLabel',
    clientId: 'clientId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrokerAccountScalarFieldEnum = (typeof BrokerAccountScalarFieldEnum)[keyof typeof BrokerAccountScalarFieldEnum]


  export const PortfolioScalarFieldEnum: {
    id: 'id',
    name: 'name',
    clientId: 'clientId',
    cashBalance: 'cashBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioScalarFieldEnum = (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum]


  export const HoldingScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    exchange: 'exchange',
    quantity: 'quantity',
    averagePrice: 'averagePrice',
    portfolioId: 'portfolioId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    exchange: 'exchange',
    side: 'side',
    orderType: 'orderType',
    status: 'status',
    quantity: 'quantity',
    limitPrice: 'limitPrice',
    brokerOrderId: 'brokerOrderId',
    basketOrderId: 'basketOrderId',
    filledQuantity: 'filledQuantity',
    averageFillPrice: 'averageFillPrice',
    realizedPnl: 'realizedPnl',
    filledAt: 'filledAt',
    estimatedPrice: 'estimatedPrice',
    reservedCash: 'reservedCash',
    reservedQuantity: 'reservedQuantity',
    portfolioId: 'portfolioId',
    brokerAccountId: 'brokerAccountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    firmId: 'firmId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    message: 'message',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const BasketOrderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    symbol: 'symbol',
    exchange: 'exchange',
    side: 'side',
    orderType: 'orderType',
    limitPrice: 'limitPrice',
    totalQuantity: 'totalQuantity',
    allocationMethod: 'allocationMethod',
    status: 'status',
    firmId: 'firmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BasketOrderScalarFieldEnum = (typeof BasketOrderScalarFieldEnum)[keyof typeof BasketOrderScalarFieldEnum]


  export const RiskLimitScalarFieldEnum: {
    id: 'id',
    portfolioId: 'portfolioId',
    maxOrderQuantity: 'maxOrderQuantity',
    maxOrderValue: 'maxOrderValue',
    maxPositionQuantity: 'maxPositionQuantity',
    maxPositionValue: 'maxPositionValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RiskLimitScalarFieldEnum = (typeof RiskLimitScalarFieldEnum)[keyof typeof RiskLimitScalarFieldEnum]


  export const RestrictedSecurityScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    exchange: 'exchange',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type RestrictedSecurityScalarFieldEnum = (typeof RestrictedSecurityScalarFieldEnum)[keyof typeof RestrictedSecurityScalarFieldEnum]


  export const BrokerConnectionScalarFieldEnum: {
    id: 'id',
    brokerAccountId: 'brokerAccountId',
    credentialsEncrypted: 'credentialsEncrypted',
    sessionEncrypted: 'sessionEncrypted',
    externalUserId: 'externalUserId',
    sessionExpiresAt: 'sessionExpiresAt',
    status: 'status',
    metadata: 'metadata',
    lastConnectedAt: 'lastConnectedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrokerConnectionScalarFieldEnum = (typeof BrokerConnectionScalarFieldEnum)[keyof typeof BrokerConnectionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'OrderSide'
   */
  export type EnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide'>
    


  /**
   * Reference to a field of type 'OrderSide[]'
   */
  export type ListEnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide[]'>
    


  /**
   * Reference to a field of type 'OrderType'
   */
  export type EnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType'>
    


  /**
   * Reference to a field of type 'OrderType[]'
   */
  export type ListEnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AllocationMethod'
   */
  export type EnumAllocationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllocationMethod'>
    


  /**
   * Reference to a field of type 'AllocationMethod[]'
   */
  export type ListEnumAllocationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllocationMethod[]'>
    


  /**
   * Reference to a field of type 'BasketOrderStatus'
   */
  export type EnumBasketOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BasketOrderStatus'>
    


  /**
   * Reference to a field of type 'BasketOrderStatus[]'
   */
  export type ListEnumBasketOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BasketOrderStatus[]'>
    


  /**
   * Reference to a field of type 'BrokerConnectionStatus'
   */
  export type EnumBrokerConnectionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BrokerConnectionStatus'>
    


  /**
   * Reference to a field of type 'BrokerConnectionStatus[]'
   */
  export type ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BrokerConnectionStatus[]'>
    


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


  export type FirmWhereInput = {
    AND?: FirmWhereInput | FirmWhereInput[]
    OR?: FirmWhereInput[]
    NOT?: FirmWhereInput | FirmWhereInput[]
    id?: StringFilter<"Firm"> | string
    name?: StringFilter<"Firm"> | string
    createdAt?: DateTimeFilter<"Firm"> | Date | string
    updatedAt?: DateTimeFilter<"Firm"> | Date | string
    users?: UserListRelationFilter
    clients?: ClientListRelationFilter
    basketOrders?: BasketOrderListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type FirmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    clients?: ClientOrderByRelationAggregateInput
    basketOrders?: BasketOrderOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type FirmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FirmWhereInput | FirmWhereInput[]
    OR?: FirmWhereInput[]
    NOT?: FirmWhereInput | FirmWhereInput[]
    name?: StringFilter<"Firm"> | string
    createdAt?: DateTimeFilter<"Firm"> | Date | string
    updatedAt?: DateTimeFilter<"Firm"> | Date | string
    users?: UserListRelationFilter
    clients?: ClientListRelationFilter
    basketOrders?: BasketOrderListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id">

  export type FirmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FirmCountOrderByAggregateInput
    _max?: FirmMaxOrderByAggregateInput
    _min?: FirmMinOrderByAggregateInput
  }

  export type FirmScalarWhereWithAggregatesInput = {
    AND?: FirmScalarWhereWithAggregatesInput | FirmScalarWhereWithAggregatesInput[]
    OR?: FirmScalarWhereWithAggregatesInput[]
    NOT?: FirmScalarWhereWithAggregatesInput | FirmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Firm"> | string
    name?: StringWithAggregatesFilter<"Firm"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Firm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Firm"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    firmId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    firmId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    brokerAccounts?: BrokerAccountListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
    brokerAccounts?: BrokerAccountOrderByRelationAggregateInput
    portfolios?: PortfolioOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    firmId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    brokerAccounts?: BrokerAccountListRelationFilter
    portfolios?: PortfolioListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    firmId?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type BrokerAccountWhereInput = {
    AND?: BrokerAccountWhereInput | BrokerAccountWhereInput[]
    OR?: BrokerAccountWhereInput[]
    NOT?: BrokerAccountWhereInput | BrokerAccountWhereInput[]
    id?: StringFilter<"BrokerAccount"> | string
    broker?: StringFilter<"BrokerAccount"> | string
    accountId?: StringFilter<"BrokerAccount"> | string
    accountLabel?: StringNullableFilter<"BrokerAccount"> | string | null
    clientId?: StringFilter<"BrokerAccount"> | string
    createdAt?: DateTimeFilter<"BrokerAccount"> | Date | string
    updatedAt?: DateTimeFilter<"BrokerAccount"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    orders?: OrderListRelationFilter
    connection?: XOR<BrokerConnectionNullableScalarRelationFilter, BrokerConnectionWhereInput> | null
  }

  export type BrokerAccountOrderByWithRelationInput = {
    id?: SortOrder
    broker?: SortOrder
    accountId?: SortOrder
    accountLabel?: SortOrderInput | SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    connection?: BrokerConnectionOrderByWithRelationInput
  }

  export type BrokerAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    broker_accountId?: BrokerAccountBrokerAccountIdCompoundUniqueInput
    AND?: BrokerAccountWhereInput | BrokerAccountWhereInput[]
    OR?: BrokerAccountWhereInput[]
    NOT?: BrokerAccountWhereInput | BrokerAccountWhereInput[]
    broker?: StringFilter<"BrokerAccount"> | string
    accountId?: StringFilter<"BrokerAccount"> | string
    accountLabel?: StringNullableFilter<"BrokerAccount"> | string | null
    clientId?: StringFilter<"BrokerAccount"> | string
    createdAt?: DateTimeFilter<"BrokerAccount"> | Date | string
    updatedAt?: DateTimeFilter<"BrokerAccount"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    orders?: OrderListRelationFilter
    connection?: XOR<BrokerConnectionNullableScalarRelationFilter, BrokerConnectionWhereInput> | null
  }, "id" | "broker_accountId">

  export type BrokerAccountOrderByWithAggregationInput = {
    id?: SortOrder
    broker?: SortOrder
    accountId?: SortOrder
    accountLabel?: SortOrderInput | SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrokerAccountCountOrderByAggregateInput
    _max?: BrokerAccountMaxOrderByAggregateInput
    _min?: BrokerAccountMinOrderByAggregateInput
  }

  export type BrokerAccountScalarWhereWithAggregatesInput = {
    AND?: BrokerAccountScalarWhereWithAggregatesInput | BrokerAccountScalarWhereWithAggregatesInput[]
    OR?: BrokerAccountScalarWhereWithAggregatesInput[]
    NOT?: BrokerAccountScalarWhereWithAggregatesInput | BrokerAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BrokerAccount"> | string
    broker?: StringWithAggregatesFilter<"BrokerAccount"> | string
    accountId?: StringWithAggregatesFilter<"BrokerAccount"> | string
    accountLabel?: StringNullableWithAggregatesFilter<"BrokerAccount"> | string | null
    clientId?: StringWithAggregatesFilter<"BrokerAccount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BrokerAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BrokerAccount"> | Date | string
  }

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    name?: StringFilter<"Portfolio"> | string
    clientId?: StringFilter<"Portfolio"> | string
    cashBalance?: DecimalFilter<"Portfolio"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    holdings?: HoldingListRelationFilter
    orders?: OrderListRelationFilter
    riskLimit?: XOR<RiskLimitNullableScalarRelationFilter, RiskLimitWhereInput> | null
  }

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    holdings?: HoldingOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    riskLimit?: RiskLimitOrderByWithRelationInput
  }

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioWhereInput | PortfolioWhereInput[]
    OR?: PortfolioWhereInput[]
    NOT?: PortfolioWhereInput | PortfolioWhereInput[]
    name?: StringFilter<"Portfolio"> | string
    clientId?: StringFilter<"Portfolio"> | string
    cashBalance?: DecimalFilter<"Portfolio"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    holdings?: HoldingListRelationFilter
    orders?: OrderListRelationFilter
    riskLimit?: XOR<RiskLimitNullableScalarRelationFilter, RiskLimitWhereInput> | null
  }, "id">

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioCountOrderByAggregateInput
    _avg?: PortfolioAvgOrderByAggregateInput
    _max?: PortfolioMaxOrderByAggregateInput
    _min?: PortfolioMinOrderByAggregateInput
    _sum?: PortfolioSumOrderByAggregateInput
  }

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    OR?: PortfolioScalarWhereWithAggregatesInput[]
    NOT?: PortfolioScalarWhereWithAggregatesInput | PortfolioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Portfolio"> | string
    name?: StringWithAggregatesFilter<"Portfolio"> | string
    clientId?: StringWithAggregatesFilter<"Portfolio"> | string
    cashBalance?: DecimalWithAggregatesFilter<"Portfolio"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Portfolio"> | Date | string
  }

  export type HoldingWhereInput = {
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    id?: StringFilter<"Holding"> | string
    symbol?: StringFilter<"Holding"> | string
    exchange?: StringFilter<"Holding"> | string
    quantity?: IntFilter<"Holding"> | number
    averagePrice?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    portfolioId?: StringFilter<"Holding"> | string
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }

  export type HoldingOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    quantity?: SortOrder
    averagePrice?: SortOrder
    portfolioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
  }

  export type HoldingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolioId_symbol_exchange?: HoldingPortfolioIdSymbolExchangeCompoundUniqueInput
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    symbol?: StringFilter<"Holding"> | string
    exchange?: StringFilter<"Holding"> | string
    quantity?: IntFilter<"Holding"> | number
    averagePrice?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    portfolioId?: StringFilter<"Holding"> | string
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }, "id" | "portfolioId_symbol_exchange">

  export type HoldingOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    quantity?: SortOrder
    averagePrice?: SortOrder
    portfolioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HoldingCountOrderByAggregateInput
    _avg?: HoldingAvgOrderByAggregateInput
    _max?: HoldingMaxOrderByAggregateInput
    _min?: HoldingMinOrderByAggregateInput
    _sum?: HoldingSumOrderByAggregateInput
  }

  export type HoldingScalarWhereWithAggregatesInput = {
    AND?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    OR?: HoldingScalarWhereWithAggregatesInput[]
    NOT?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Holding"> | string
    symbol?: StringWithAggregatesFilter<"Holding"> | string
    exchange?: StringWithAggregatesFilter<"Holding"> | string
    quantity?: IntWithAggregatesFilter<"Holding"> | number
    averagePrice?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    portfolioId?: StringWithAggregatesFilter<"Holding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Holding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Holding"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    exchange?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    quantity?: IntFilter<"Order"> | number
    limitPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: StringNullableFilter<"Order"> | string | null
    basketOrderId?: StringNullableFilter<"Order"> | string | null
    filledQuantity?: IntFilter<"Order"> | number
    averageFillPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    filledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFilter<"Order"> | number
    portfolioId?: StringFilter<"Order"> | string
    brokerAccountId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    basketOrder?: XOR<BasketOrderNullableScalarRelationFilter, BasketOrderWhereInput> | null
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    brokerAccount?: XOR<BrokerAccountScalarRelationFilter, BrokerAccountWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    status?: SortOrder
    quantity?: SortOrder
    limitPrice?: SortOrderInput | SortOrder
    brokerOrderId?: SortOrderInput | SortOrder
    basketOrderId?: SortOrderInput | SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrderInput | SortOrder
    realizedPnl?: SortOrderInput | SortOrder
    filledAt?: SortOrderInput | SortOrder
    estimatedPrice?: SortOrderInput | SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
    portfolioId?: SortOrder
    brokerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    basketOrder?: BasketOrderOrderByWithRelationInput
    portfolio?: PortfolioOrderByWithRelationInput
    brokerAccount?: BrokerAccountOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    brokerOrderId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    symbol?: StringFilter<"Order"> | string
    exchange?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    quantity?: IntFilter<"Order"> | number
    limitPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    basketOrderId?: StringNullableFilter<"Order"> | string | null
    filledQuantity?: IntFilter<"Order"> | number
    averageFillPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    filledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFilter<"Order"> | number
    portfolioId?: StringFilter<"Order"> | string
    brokerAccountId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    basketOrder?: XOR<BasketOrderNullableScalarRelationFilter, BasketOrderWhereInput> | null
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
    brokerAccount?: XOR<BrokerAccountScalarRelationFilter, BrokerAccountWhereInput>
  }, "id" | "brokerOrderId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    status?: SortOrder
    quantity?: SortOrder
    limitPrice?: SortOrderInput | SortOrder
    brokerOrderId?: SortOrderInput | SortOrder
    basketOrderId?: SortOrderInput | SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrderInput | SortOrder
    realizedPnl?: SortOrderInput | SortOrder
    filledAt?: SortOrderInput | SortOrder
    estimatedPrice?: SortOrderInput | SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
    portfolioId?: SortOrder
    brokerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    symbol?: StringWithAggregatesFilter<"Order"> | string
    exchange?: StringWithAggregatesFilter<"Order"> | string
    side?: EnumOrderSideWithAggregatesFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeWithAggregatesFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    quantity?: IntWithAggregatesFilter<"Order"> | number
    limitPrice?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    basketOrderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    filledQuantity?: IntWithAggregatesFilter<"Order"> | number
    averageFillPrice?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    filledAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    estimatedPrice?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntWithAggregatesFilter<"Order"> | number
    portfolioId?: StringWithAggregatesFilter<"Order"> | string
    brokerAccountId?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    firmId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    message?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    firmId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    message?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    firmId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    message?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    firmId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    message?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    firmId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    message?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type BasketOrderWhereInput = {
    AND?: BasketOrderWhereInput | BasketOrderWhereInput[]
    OR?: BasketOrderWhereInput[]
    NOT?: BasketOrderWhereInput | BasketOrderWhereInput[]
    id?: StringFilter<"BasketOrder"> | string
    name?: StringNullableFilter<"BasketOrder"> | string | null
    symbol?: StringFilter<"BasketOrder"> | string
    exchange?: StringFilter<"BasketOrder"> | string
    side?: EnumOrderSideFilter<"BasketOrder"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"BasketOrder"> | $Enums.OrderType
    limitPrice?: DecimalNullableFilter<"BasketOrder"> | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFilter<"BasketOrder"> | number
    allocationMethod?: EnumAllocationMethodFilter<"BasketOrder"> | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFilter<"BasketOrder"> | $Enums.BasketOrderStatus
    firmId?: StringFilter<"BasketOrder"> | string
    createdAt?: DateTimeFilter<"BasketOrder"> | Date | string
    updatedAt?: DateTimeFilter<"BasketOrder"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    orders?: OrderListRelationFilter
  }

  export type BasketOrderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    limitPrice?: SortOrderInput | SortOrder
    totalQuantity?: SortOrder
    allocationMethod?: SortOrder
    status?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firm?: FirmOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type BasketOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BasketOrderWhereInput | BasketOrderWhereInput[]
    OR?: BasketOrderWhereInput[]
    NOT?: BasketOrderWhereInput | BasketOrderWhereInput[]
    name?: StringNullableFilter<"BasketOrder"> | string | null
    symbol?: StringFilter<"BasketOrder"> | string
    exchange?: StringFilter<"BasketOrder"> | string
    side?: EnumOrderSideFilter<"BasketOrder"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"BasketOrder"> | $Enums.OrderType
    limitPrice?: DecimalNullableFilter<"BasketOrder"> | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFilter<"BasketOrder"> | number
    allocationMethod?: EnumAllocationMethodFilter<"BasketOrder"> | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFilter<"BasketOrder"> | $Enums.BasketOrderStatus
    firmId?: StringFilter<"BasketOrder"> | string
    createdAt?: DateTimeFilter<"BasketOrder"> | Date | string
    updatedAt?: DateTimeFilter<"BasketOrder"> | Date | string
    firm?: XOR<FirmScalarRelationFilter, FirmWhereInput>
    orders?: OrderListRelationFilter
  }, "id">

  export type BasketOrderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    limitPrice?: SortOrderInput | SortOrder
    totalQuantity?: SortOrder
    allocationMethod?: SortOrder
    status?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BasketOrderCountOrderByAggregateInput
    _avg?: BasketOrderAvgOrderByAggregateInput
    _max?: BasketOrderMaxOrderByAggregateInput
    _min?: BasketOrderMinOrderByAggregateInput
    _sum?: BasketOrderSumOrderByAggregateInput
  }

  export type BasketOrderScalarWhereWithAggregatesInput = {
    AND?: BasketOrderScalarWhereWithAggregatesInput | BasketOrderScalarWhereWithAggregatesInput[]
    OR?: BasketOrderScalarWhereWithAggregatesInput[]
    NOT?: BasketOrderScalarWhereWithAggregatesInput | BasketOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BasketOrder"> | string
    name?: StringNullableWithAggregatesFilter<"BasketOrder"> | string | null
    symbol?: StringWithAggregatesFilter<"BasketOrder"> | string
    exchange?: StringWithAggregatesFilter<"BasketOrder"> | string
    side?: EnumOrderSideWithAggregatesFilter<"BasketOrder"> | $Enums.OrderSide
    orderType?: EnumOrderTypeWithAggregatesFilter<"BasketOrder"> | $Enums.OrderType
    limitPrice?: DecimalNullableWithAggregatesFilter<"BasketOrder"> | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntWithAggregatesFilter<"BasketOrder"> | number
    allocationMethod?: EnumAllocationMethodWithAggregatesFilter<"BasketOrder"> | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusWithAggregatesFilter<"BasketOrder"> | $Enums.BasketOrderStatus
    firmId?: StringWithAggregatesFilter<"BasketOrder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BasketOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BasketOrder"> | Date | string
  }

  export type RiskLimitWhereInput = {
    AND?: RiskLimitWhereInput | RiskLimitWhereInput[]
    OR?: RiskLimitWhereInput[]
    NOT?: RiskLimitWhereInput | RiskLimitWhereInput[]
    id?: StringFilter<"RiskLimit"> | string
    portfolioId?: StringFilter<"RiskLimit"> | string
    maxOrderQuantity?: IntNullableFilter<"RiskLimit"> | number | null
    maxOrderValue?: DecimalNullableFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: IntNullableFilter<"RiskLimit"> | number | null
    maxPositionValue?: DecimalNullableFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"RiskLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RiskLimit"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }

  export type RiskLimitOrderByWithRelationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    maxOrderQuantity?: SortOrderInput | SortOrder
    maxOrderValue?: SortOrderInput | SortOrder
    maxPositionQuantity?: SortOrderInput | SortOrder
    maxPositionValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    portfolio?: PortfolioOrderByWithRelationInput
  }

  export type RiskLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    portfolioId?: string
    AND?: RiskLimitWhereInput | RiskLimitWhereInput[]
    OR?: RiskLimitWhereInput[]
    NOT?: RiskLimitWhereInput | RiskLimitWhereInput[]
    maxOrderQuantity?: IntNullableFilter<"RiskLimit"> | number | null
    maxOrderValue?: DecimalNullableFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: IntNullableFilter<"RiskLimit"> | number | null
    maxPositionValue?: DecimalNullableFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"RiskLimit"> | Date | string
    updatedAt?: DateTimeFilter<"RiskLimit"> | Date | string
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>
  }, "id" | "portfolioId">

  export type RiskLimitOrderByWithAggregationInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    maxOrderQuantity?: SortOrderInput | SortOrder
    maxOrderValue?: SortOrderInput | SortOrder
    maxPositionQuantity?: SortOrderInput | SortOrder
    maxPositionValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RiskLimitCountOrderByAggregateInput
    _avg?: RiskLimitAvgOrderByAggregateInput
    _max?: RiskLimitMaxOrderByAggregateInput
    _min?: RiskLimitMinOrderByAggregateInput
    _sum?: RiskLimitSumOrderByAggregateInput
  }

  export type RiskLimitScalarWhereWithAggregatesInput = {
    AND?: RiskLimitScalarWhereWithAggregatesInput | RiskLimitScalarWhereWithAggregatesInput[]
    OR?: RiskLimitScalarWhereWithAggregatesInput[]
    NOT?: RiskLimitScalarWhereWithAggregatesInput | RiskLimitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiskLimit"> | string
    portfolioId?: StringWithAggregatesFilter<"RiskLimit"> | string
    maxOrderQuantity?: IntNullableWithAggregatesFilter<"RiskLimit"> | number | null
    maxOrderValue?: DecimalNullableWithAggregatesFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: IntNullableWithAggregatesFilter<"RiskLimit"> | number | null
    maxPositionValue?: DecimalNullableWithAggregatesFilter<"RiskLimit"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RiskLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RiskLimit"> | Date | string
  }

  export type RestrictedSecurityWhereInput = {
    AND?: RestrictedSecurityWhereInput | RestrictedSecurityWhereInput[]
    OR?: RestrictedSecurityWhereInput[]
    NOT?: RestrictedSecurityWhereInput | RestrictedSecurityWhereInput[]
    id?: StringFilter<"RestrictedSecurity"> | string
    symbol?: StringFilter<"RestrictedSecurity"> | string
    exchange?: StringFilter<"RestrictedSecurity"> | string
    reason?: StringNullableFilter<"RestrictedSecurity"> | string | null
    createdAt?: DateTimeFilter<"RestrictedSecurity"> | Date | string
  }

  export type RestrictedSecurityOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type RestrictedSecurityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    symbol_exchange?: RestrictedSecuritySymbolExchangeCompoundUniqueInput
    AND?: RestrictedSecurityWhereInput | RestrictedSecurityWhereInput[]
    OR?: RestrictedSecurityWhereInput[]
    NOT?: RestrictedSecurityWhereInput | RestrictedSecurityWhereInput[]
    symbol?: StringFilter<"RestrictedSecurity"> | string
    exchange?: StringFilter<"RestrictedSecurity"> | string
    reason?: StringNullableFilter<"RestrictedSecurity"> | string | null
    createdAt?: DateTimeFilter<"RestrictedSecurity"> | Date | string
  }, "id" | "symbol_exchange">

  export type RestrictedSecurityOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RestrictedSecurityCountOrderByAggregateInput
    _max?: RestrictedSecurityMaxOrderByAggregateInput
    _min?: RestrictedSecurityMinOrderByAggregateInput
  }

  export type RestrictedSecurityScalarWhereWithAggregatesInput = {
    AND?: RestrictedSecurityScalarWhereWithAggregatesInput | RestrictedSecurityScalarWhereWithAggregatesInput[]
    OR?: RestrictedSecurityScalarWhereWithAggregatesInput[]
    NOT?: RestrictedSecurityScalarWhereWithAggregatesInput | RestrictedSecurityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RestrictedSecurity"> | string
    symbol?: StringWithAggregatesFilter<"RestrictedSecurity"> | string
    exchange?: StringWithAggregatesFilter<"RestrictedSecurity"> | string
    reason?: StringNullableWithAggregatesFilter<"RestrictedSecurity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RestrictedSecurity"> | Date | string
  }

  export type BrokerConnectionWhereInput = {
    AND?: BrokerConnectionWhereInput | BrokerConnectionWhereInput[]
    OR?: BrokerConnectionWhereInput[]
    NOT?: BrokerConnectionWhereInput | BrokerConnectionWhereInput[]
    id?: StringFilter<"BrokerConnection"> | string
    brokerAccountId?: StringFilter<"BrokerConnection"> | string
    credentialsEncrypted?: StringNullableFilter<"BrokerConnection"> | string | null
    sessionEncrypted?: StringNullableFilter<"BrokerConnection"> | string | null
    externalUserId?: StringNullableFilter<"BrokerConnection"> | string | null
    sessionExpiresAt?: DateTimeNullableFilter<"BrokerConnection"> | Date | string | null
    status?: EnumBrokerConnectionStatusFilter<"BrokerConnection"> | $Enums.BrokerConnectionStatus
    metadata?: JsonNullableFilter<"BrokerConnection">
    lastConnectedAt?: DateTimeNullableFilter<"BrokerConnection"> | Date | string | null
    createdAt?: DateTimeFilter<"BrokerConnection"> | Date | string
    updatedAt?: DateTimeFilter<"BrokerConnection"> | Date | string
    brokerAccount?: XOR<BrokerAccountScalarRelationFilter, BrokerAccountWhereInput>
  }

  export type BrokerConnectionOrderByWithRelationInput = {
    id?: SortOrder
    brokerAccountId?: SortOrder
    credentialsEncrypted?: SortOrderInput | SortOrder
    sessionEncrypted?: SortOrderInput | SortOrder
    externalUserId?: SortOrderInput | SortOrder
    sessionExpiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    lastConnectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brokerAccount?: BrokerAccountOrderByWithRelationInput
  }

  export type BrokerConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    brokerAccountId?: string
    AND?: BrokerConnectionWhereInput | BrokerConnectionWhereInput[]
    OR?: BrokerConnectionWhereInput[]
    NOT?: BrokerConnectionWhereInput | BrokerConnectionWhereInput[]
    credentialsEncrypted?: StringNullableFilter<"BrokerConnection"> | string | null
    sessionEncrypted?: StringNullableFilter<"BrokerConnection"> | string | null
    externalUserId?: StringNullableFilter<"BrokerConnection"> | string | null
    sessionExpiresAt?: DateTimeNullableFilter<"BrokerConnection"> | Date | string | null
    status?: EnumBrokerConnectionStatusFilter<"BrokerConnection"> | $Enums.BrokerConnectionStatus
    metadata?: JsonNullableFilter<"BrokerConnection">
    lastConnectedAt?: DateTimeNullableFilter<"BrokerConnection"> | Date | string | null
    createdAt?: DateTimeFilter<"BrokerConnection"> | Date | string
    updatedAt?: DateTimeFilter<"BrokerConnection"> | Date | string
    brokerAccount?: XOR<BrokerAccountScalarRelationFilter, BrokerAccountWhereInput>
  }, "id" | "brokerAccountId">

  export type BrokerConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    brokerAccountId?: SortOrder
    credentialsEncrypted?: SortOrderInput | SortOrder
    sessionEncrypted?: SortOrderInput | SortOrder
    externalUserId?: SortOrderInput | SortOrder
    sessionExpiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    lastConnectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrokerConnectionCountOrderByAggregateInput
    _max?: BrokerConnectionMaxOrderByAggregateInput
    _min?: BrokerConnectionMinOrderByAggregateInput
  }

  export type BrokerConnectionScalarWhereWithAggregatesInput = {
    AND?: BrokerConnectionScalarWhereWithAggregatesInput | BrokerConnectionScalarWhereWithAggregatesInput[]
    OR?: BrokerConnectionScalarWhereWithAggregatesInput[]
    NOT?: BrokerConnectionScalarWhereWithAggregatesInput | BrokerConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BrokerConnection"> | string
    brokerAccountId?: StringWithAggregatesFilter<"BrokerConnection"> | string
    credentialsEncrypted?: StringNullableWithAggregatesFilter<"BrokerConnection"> | string | null
    sessionEncrypted?: StringNullableWithAggregatesFilter<"BrokerConnection"> | string | null
    externalUserId?: StringNullableWithAggregatesFilter<"BrokerConnection"> | string | null
    sessionExpiresAt?: DateTimeNullableWithAggregatesFilter<"BrokerConnection"> | Date | string | null
    status?: EnumBrokerConnectionStatusWithAggregatesFilter<"BrokerConnection"> | $Enums.BrokerConnectionStatus
    metadata?: JsonNullableWithAggregatesFilter<"BrokerConnection">
    lastConnectedAt?: DateTimeNullableWithAggregatesFilter<"BrokerConnection"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BrokerConnection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BrokerConnection"> | Date | string
  }

  export type FirmCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFirmInput
    clients?: ClientCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    clients?: ClientUncheckedCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderUncheckedCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFirmNestedInput
    clients?: ClientUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    clients?: ClientUncheckedUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUncheckedUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type FirmCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FirmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FirmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutClientsInput
    brokerAccounts?: BrokerAccountCreateNestedManyWithoutClientInput
    portfolios?: PortfolioCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brokerAccounts?: BrokerAccountUncheckedCreateNestedManyWithoutClientInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutClientsNestedInput
    brokerAccounts?: BrokerAccountUpdateManyWithoutClientNestedInput
    portfolios?: PortfolioUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brokerAccounts?: BrokerAccountUncheckedUpdateManyWithoutClientNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerAccountCreateInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutBrokerAccountsInput
    orders?: OrderCreateNestedManyWithoutBrokerAccountInput
    connection?: BrokerConnectionCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountUncheckedCreateInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBrokerAccountInput
    connection?: BrokerConnectionUncheckedCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBrokerAccountsNestedInput
    orders?: OrderUpdateManyWithoutBrokerAccountNestedInput
    connection?: BrokerConnectionUpdateOneWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBrokerAccountNestedInput
    connection?: BrokerConnectionUncheckedUpdateOneWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountCreateManyInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPortfoliosInput
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateInput = {
    id?: string
    name: string
    clientId: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitUncheckedCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPortfoliosNestedInput
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUncheckedUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioCreateManyInput = {
    id?: string
    name: string
    clientId: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    portfolioId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateManyInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    portfolioId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    basketOrder?: BasketOrderCreateNestedOneWithoutOrdersInput
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
    brokerAccount: BrokerAccountCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    basketOrder?: BasketOrderUpdateOneWithoutOrdersNestedInput
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
    brokerAccount?: BrokerAccountUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    firm: FirmCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    firmId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmId?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    firmId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firmId?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasketOrderCreateInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutBasketOrdersInput
    orders?: OrderCreateNestedManyWithoutBasketOrderInput
  }

  export type BasketOrderUncheckedCreateInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBasketOrderInput
  }

  export type BasketOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutBasketOrdersNestedInput
    orders?: OrderUpdateManyWithoutBasketOrderNestedInput
  }

  export type BasketOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBasketOrderNestedInput
  }

  export type BasketOrderCreateManyInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BasketOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasketOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskLimitCreateInput = {
    id?: string
    maxOrderQuantity?: number | null
    maxOrderValue?: Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: number | null
    maxPositionValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutRiskLimitInput
  }

  export type RiskLimitUncheckedCreateInput = {
    id?: string
    portfolioId: string
    maxOrderQuantity?: number | null
    maxOrderValue?: Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: number | null
    maxPositionValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutRiskLimitNestedInput
  }

  export type RiskLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskLimitCreateManyInput = {
    id?: string
    portfolioId: string
    maxOrderQuantity?: number | null
    maxOrderValue?: Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: number | null
    maxPositionValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    portfolioId?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestrictedSecurityCreateInput = {
    id?: string
    symbol: string
    exchange: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type RestrictedSecurityUncheckedCreateInput = {
    id?: string
    symbol: string
    exchange: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type RestrictedSecurityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestrictedSecurityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestrictedSecurityCreateManyInput = {
    id?: string
    symbol: string
    exchange: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type RestrictedSecurityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestrictedSecurityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerConnectionCreateInput = {
    id?: string
    credentialsEncrypted?: string | null
    sessionEncrypted?: string | null
    externalUserId?: string | null
    sessionExpiresAt?: Date | string | null
    status?: $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brokerAccount: BrokerAccountCreateNestedOneWithoutConnectionInput
  }

  export type BrokerConnectionUncheckedCreateInput = {
    id?: string
    brokerAccountId: string
    credentialsEncrypted?: string | null
    sessionEncrypted?: string | null
    externalUserId?: string | null
    sessionExpiresAt?: Date | string | null
    status?: $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brokerAccount?: BrokerAccountUpdateOneRequiredWithoutConnectionNestedInput
  }

  export type BrokerConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerConnectionCreateManyInput = {
    id?: string
    brokerAccountId: string
    credentialsEncrypted?: string | null
    sessionEncrypted?: string | null
    externalUserId?: string | null
    sessionExpiresAt?: Date | string | null
    status?: $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type BasketOrderListRelationFilter = {
    every?: BasketOrderWhereInput
    some?: BasketOrderWhereInput
    none?: BasketOrderWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BasketOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FirmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FirmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FirmMinOrderByAggregateInput = {
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type FirmScalarRelationFilter = {
    is?: FirmWhereInput
    isNot?: FirmWhereInput
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type BrokerAccountListRelationFilter = {
    every?: BrokerAccountWhereInput
    some?: BrokerAccountWhereInput
    none?: BrokerAccountWhereInput
  }

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput
    some?: PortfolioWhereInput
    none?: PortfolioWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BrokerAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    firmId?: SortOrder
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

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type BrokerConnectionNullableScalarRelationFilter = {
    is?: BrokerConnectionWhereInput | null
    isNot?: BrokerConnectionWhereInput | null
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BrokerAccountBrokerAccountIdCompoundUniqueInput = {
    broker: string
    accountId: string
  }

  export type BrokerAccountCountOrderByAggregateInput = {
    id?: SortOrder
    broker?: SortOrder
    accountId?: SortOrder
    accountLabel?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrokerAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    broker?: SortOrder
    accountId?: SortOrder
    accountLabel?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrokerAccountMinOrderByAggregateInput = {
    id?: SortOrder
    broker?: SortOrder
    accountId?: SortOrder
    accountLabel?: SortOrder
    clientId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type HoldingListRelationFilter = {
    every?: HoldingWhereInput
    some?: HoldingWhereInput
    none?: HoldingWhereInput
  }

  export type RiskLimitNullableScalarRelationFilter = {
    is?: RiskLimitWhereInput | null
    isNot?: RiskLimitWhereInput | null
  }

  export type HoldingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioAvgOrderByAggregateInput = {
    cashBalance?: SortOrder
  }

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioSumOrderByAggregateInput = {
    cashBalance?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type PortfolioScalarRelationFilter = {
    is?: PortfolioWhereInput
    isNot?: PortfolioWhereInput
  }

  export type HoldingPortfolioIdSymbolExchangeCompoundUniqueInput = {
    portfolioId: string
    symbol: string
    exchange: string
  }

  export type HoldingCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    quantity?: SortOrder
    averagePrice?: SortOrder
    portfolioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingAvgOrderByAggregateInput = {
    quantity?: SortOrder
    averagePrice?: SortOrder
  }

  export type HoldingMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    quantity?: SortOrder
    averagePrice?: SortOrder
    portfolioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    quantity?: SortOrder
    averagePrice?: SortOrder
    portfolioId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingSumOrderByAggregateInput = {
    quantity?: SortOrder
    averagePrice?: SortOrder
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

  export type EnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type EnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type BasketOrderNullableScalarRelationFilter = {
    is?: BasketOrderWhereInput | null
    isNot?: BasketOrderWhereInput | null
  }

  export type BrokerAccountScalarRelationFilter = {
    is?: BrokerAccountWhereInput
    isNot?: BrokerAccountWhereInput
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    status?: SortOrder
    quantity?: SortOrder
    limitPrice?: SortOrder
    brokerOrderId?: SortOrder
    basketOrderId?: SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrder
    realizedPnl?: SortOrder
    filledAt?: SortOrder
    estimatedPrice?: SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
    portfolioId?: SortOrder
    brokerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    quantity?: SortOrder
    limitPrice?: SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrder
    realizedPnl?: SortOrder
    estimatedPrice?: SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    status?: SortOrder
    quantity?: SortOrder
    limitPrice?: SortOrder
    brokerOrderId?: SortOrder
    basketOrderId?: SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrder
    realizedPnl?: SortOrder
    filledAt?: SortOrder
    estimatedPrice?: SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
    portfolioId?: SortOrder
    brokerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    status?: SortOrder
    quantity?: SortOrder
    limitPrice?: SortOrder
    brokerOrderId?: SortOrder
    basketOrderId?: SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrder
    realizedPnl?: SortOrder
    filledAt?: SortOrder
    estimatedPrice?: SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
    portfolioId?: SortOrder
    brokerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    quantity?: SortOrder
    limitPrice?: SortOrder
    filledQuantity?: SortOrder
    averageFillPrice?: SortOrder
    realizedPnl?: SortOrder
    estimatedPrice?: SortOrder
    reservedCash?: SortOrder
    reservedQuantity?: SortOrder
  }

  export type EnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type EnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    firmId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    firmId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    firmId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAllocationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AllocationMethod | EnumAllocationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAllocationMethodFilter<$PrismaModel> | $Enums.AllocationMethod
  }

  export type EnumBasketOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BasketOrderStatus | EnumBasketOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBasketOrderStatusFilter<$PrismaModel> | $Enums.BasketOrderStatus
  }

  export type BasketOrderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    limitPrice?: SortOrder
    totalQuantity?: SortOrder
    allocationMethod?: SortOrder
    status?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BasketOrderAvgOrderByAggregateInput = {
    limitPrice?: SortOrder
    totalQuantity?: SortOrder
  }

  export type BasketOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    limitPrice?: SortOrder
    totalQuantity?: SortOrder
    allocationMethod?: SortOrder
    status?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BasketOrderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    limitPrice?: SortOrder
    totalQuantity?: SortOrder
    allocationMethod?: SortOrder
    status?: SortOrder
    firmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BasketOrderSumOrderByAggregateInput = {
    limitPrice?: SortOrder
    totalQuantity?: SortOrder
  }

  export type EnumAllocationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AllocationMethod | EnumAllocationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAllocationMethodWithAggregatesFilter<$PrismaModel> | $Enums.AllocationMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAllocationMethodFilter<$PrismaModel>
    _max?: NestedEnumAllocationMethodFilter<$PrismaModel>
  }

  export type EnumBasketOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BasketOrderStatus | EnumBasketOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBasketOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.BasketOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBasketOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumBasketOrderStatusFilter<$PrismaModel>
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

  export type RiskLimitCountOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    maxOrderQuantity?: SortOrder
    maxOrderValue?: SortOrder
    maxPositionQuantity?: SortOrder
    maxPositionValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskLimitAvgOrderByAggregateInput = {
    maxOrderQuantity?: SortOrder
    maxOrderValue?: SortOrder
    maxPositionQuantity?: SortOrder
    maxPositionValue?: SortOrder
  }

  export type RiskLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    maxOrderQuantity?: SortOrder
    maxOrderValue?: SortOrder
    maxPositionQuantity?: SortOrder
    maxPositionValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskLimitMinOrderByAggregateInput = {
    id?: SortOrder
    portfolioId?: SortOrder
    maxOrderQuantity?: SortOrder
    maxOrderValue?: SortOrder
    maxPositionQuantity?: SortOrder
    maxPositionValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RiskLimitSumOrderByAggregateInput = {
    maxOrderQuantity?: SortOrder
    maxOrderValue?: SortOrder
    maxPositionQuantity?: SortOrder
    maxPositionValue?: SortOrder
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

  export type RestrictedSecuritySymbolExchangeCompoundUniqueInput = {
    symbol: string
    exchange: string
  }

  export type RestrictedSecurityCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type RestrictedSecurityMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type RestrictedSecurityMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    exchange?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBrokerConnectionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BrokerConnectionStatus | EnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel> | $Enums.BrokerConnectionStatus
  }

  export type BrokerConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    brokerAccountId?: SortOrder
    credentialsEncrypted?: SortOrder
    sessionEncrypted?: SortOrder
    externalUserId?: SortOrder
    sessionExpiresAt?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    lastConnectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrokerConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    brokerAccountId?: SortOrder
    credentialsEncrypted?: SortOrder
    sessionEncrypted?: SortOrder
    externalUserId?: SortOrder
    sessionExpiresAt?: SortOrder
    status?: SortOrder
    lastConnectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrokerConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    brokerAccountId?: SortOrder
    credentialsEncrypted?: SortOrder
    sessionEncrypted?: SortOrder
    externalUserId?: SortOrder
    sessionExpiresAt?: SortOrder
    status?: SortOrder
    lastConnectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBrokerConnectionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BrokerConnectionStatus | EnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBrokerConnectionStatusWithAggregatesFilter<$PrismaModel> | $Enums.BrokerConnectionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel>
    _max?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutFirmInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutFirmInput = {
    create?: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput> | ClientCreateWithoutFirmInput[] | ClientUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutFirmInput | ClientCreateOrConnectWithoutFirmInput[]
    createMany?: ClientCreateManyFirmInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type BasketOrderCreateNestedManyWithoutFirmInput = {
    create?: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput> | BasketOrderCreateWithoutFirmInput[] | BasketOrderUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: BasketOrderCreateOrConnectWithoutFirmInput | BasketOrderCreateOrConnectWithoutFirmInput[]
    createMany?: BasketOrderCreateManyFirmInputEnvelope
    connect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutFirmInput = {
    create?: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput> | AuditLogCreateWithoutFirmInput[] | AuditLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutFirmInput | AuditLogCreateOrConnectWithoutFirmInput[]
    createMany?: AuditLogCreateManyFirmInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput> | ClientCreateWithoutFirmInput[] | ClientUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutFirmInput | ClientCreateOrConnectWithoutFirmInput[]
    createMany?: ClientCreateManyFirmInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type BasketOrderUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput> | BasketOrderCreateWithoutFirmInput[] | BasketOrderUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: BasketOrderCreateOrConnectWithoutFirmInput | BasketOrderCreateOrConnectWithoutFirmInput[]
    createMany?: BasketOrderCreateManyFirmInputEnvelope
    connect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutFirmInput = {
    create?: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput> | AuditLogCreateWithoutFirmInput[] | AuditLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutFirmInput | AuditLogCreateOrConnectWithoutFirmInput[]
    createMany?: AuditLogCreateManyFirmInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutFirmNestedInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFirmInput | UserUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFirmInput | UserUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFirmInput | UserUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutFirmNestedInput = {
    create?: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput> | ClientCreateWithoutFirmInput[] | ClientUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutFirmInput | ClientCreateOrConnectWithoutFirmInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutFirmInput | ClientUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: ClientCreateManyFirmInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutFirmInput | ClientUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutFirmInput | ClientUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type BasketOrderUpdateManyWithoutFirmNestedInput = {
    create?: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput> | BasketOrderCreateWithoutFirmInput[] | BasketOrderUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: BasketOrderCreateOrConnectWithoutFirmInput | BasketOrderCreateOrConnectWithoutFirmInput[]
    upsert?: BasketOrderUpsertWithWhereUniqueWithoutFirmInput | BasketOrderUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: BasketOrderCreateManyFirmInputEnvelope
    set?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    disconnect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    delete?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    connect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    update?: BasketOrderUpdateWithWhereUniqueWithoutFirmInput | BasketOrderUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: BasketOrderUpdateManyWithWhereWithoutFirmInput | BasketOrderUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: BasketOrderScalarWhereInput | BasketOrderScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutFirmNestedInput = {
    create?: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput> | AuditLogCreateWithoutFirmInput[] | AuditLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutFirmInput | AuditLogCreateOrConnectWithoutFirmInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutFirmInput | AuditLogUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: AuditLogCreateManyFirmInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutFirmInput | AuditLogUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutFirmInput | AuditLogUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput> | UserCreateWithoutFirmInput[] | UserUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFirmInput | UserCreateOrConnectWithoutFirmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFirmInput | UserUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: UserCreateManyFirmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFirmInput | UserUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFirmInput | UserUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput> | ClientCreateWithoutFirmInput[] | ClientUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutFirmInput | ClientCreateOrConnectWithoutFirmInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutFirmInput | ClientUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: ClientCreateManyFirmInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutFirmInput | ClientUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutFirmInput | ClientUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type BasketOrderUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput> | BasketOrderCreateWithoutFirmInput[] | BasketOrderUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: BasketOrderCreateOrConnectWithoutFirmInput | BasketOrderCreateOrConnectWithoutFirmInput[]
    upsert?: BasketOrderUpsertWithWhereUniqueWithoutFirmInput | BasketOrderUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: BasketOrderCreateManyFirmInputEnvelope
    set?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    disconnect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    delete?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    connect?: BasketOrderWhereUniqueInput | BasketOrderWhereUniqueInput[]
    update?: BasketOrderUpdateWithWhereUniqueWithoutFirmInput | BasketOrderUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: BasketOrderUpdateManyWithWhereWithoutFirmInput | BasketOrderUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: BasketOrderScalarWhereInput | BasketOrderScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutFirmNestedInput = {
    create?: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput> | AuditLogCreateWithoutFirmInput[] | AuditLogUncheckedCreateWithoutFirmInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutFirmInput | AuditLogCreateOrConnectWithoutFirmInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutFirmInput | AuditLogUpsertWithWhereUniqueWithoutFirmInput[]
    createMany?: AuditLogCreateManyFirmInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutFirmInput | AuditLogUpdateWithWhereUniqueWithoutFirmInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutFirmInput | AuditLogUpdateManyWithWhereWithoutFirmInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FirmCreateNestedOneWithoutUsersInput = {
    create?: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutUsersInput
    connect?: FirmWhereUniqueInput
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type FirmUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutUsersInput
    upsert?: FirmUpsertWithoutUsersInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutUsersInput, FirmUpdateWithoutUsersInput>, FirmUncheckedUpdateWithoutUsersInput>
  }

  export type FirmCreateNestedOneWithoutClientsInput = {
    create?: XOR<FirmCreateWithoutClientsInput, FirmUncheckedCreateWithoutClientsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutClientsInput
    connect?: FirmWhereUniqueInput
  }

  export type BrokerAccountCreateNestedManyWithoutClientInput = {
    create?: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput> | BrokerAccountCreateWithoutClientInput[] | BrokerAccountUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutClientInput | BrokerAccountCreateOrConnectWithoutClientInput[]
    createMany?: BrokerAccountCreateManyClientInputEnvelope
    connect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
  }

  export type PortfolioCreateNestedManyWithoutClientInput = {
    create?: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput> | PortfolioCreateWithoutClientInput[] | PortfolioUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutClientInput | PortfolioCreateOrConnectWithoutClientInput[]
    createMany?: PortfolioCreateManyClientInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type BrokerAccountUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput> | BrokerAccountCreateWithoutClientInput[] | BrokerAccountUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutClientInput | BrokerAccountCreateOrConnectWithoutClientInput[]
    createMany?: BrokerAccountCreateManyClientInputEnvelope
    connect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
  }

  export type PortfolioUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput> | PortfolioCreateWithoutClientInput[] | PortfolioUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutClientInput | PortfolioCreateOrConnectWithoutClientInput[]
    createMany?: PortfolioCreateManyClientInputEnvelope
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FirmUpdateOneRequiredWithoutClientsNestedInput = {
    create?: XOR<FirmCreateWithoutClientsInput, FirmUncheckedCreateWithoutClientsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutClientsInput
    upsert?: FirmUpsertWithoutClientsInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutClientsInput, FirmUpdateWithoutClientsInput>, FirmUncheckedUpdateWithoutClientsInput>
  }

  export type BrokerAccountUpdateManyWithoutClientNestedInput = {
    create?: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput> | BrokerAccountCreateWithoutClientInput[] | BrokerAccountUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutClientInput | BrokerAccountCreateOrConnectWithoutClientInput[]
    upsert?: BrokerAccountUpsertWithWhereUniqueWithoutClientInput | BrokerAccountUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BrokerAccountCreateManyClientInputEnvelope
    set?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    disconnect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    delete?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    connect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    update?: BrokerAccountUpdateWithWhereUniqueWithoutClientInput | BrokerAccountUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BrokerAccountUpdateManyWithWhereWithoutClientInput | BrokerAccountUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BrokerAccountScalarWhereInput | BrokerAccountScalarWhereInput[]
  }

  export type PortfolioUpdateManyWithoutClientNestedInput = {
    create?: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput> | PortfolioCreateWithoutClientInput[] | PortfolioUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutClientInput | PortfolioCreateOrConnectWithoutClientInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutClientInput | PortfolioUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PortfolioCreateManyClientInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutClientInput | PortfolioUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutClientInput | PortfolioUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type BrokerAccountUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput> | BrokerAccountCreateWithoutClientInput[] | BrokerAccountUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutClientInput | BrokerAccountCreateOrConnectWithoutClientInput[]
    upsert?: BrokerAccountUpsertWithWhereUniqueWithoutClientInput | BrokerAccountUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BrokerAccountCreateManyClientInputEnvelope
    set?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    disconnect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    delete?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    connect?: BrokerAccountWhereUniqueInput | BrokerAccountWhereUniqueInput[]
    update?: BrokerAccountUpdateWithWhereUniqueWithoutClientInput | BrokerAccountUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BrokerAccountUpdateManyWithWhereWithoutClientInput | BrokerAccountUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BrokerAccountScalarWhereInput | BrokerAccountScalarWhereInput[]
  }

  export type PortfolioUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput> | PortfolioCreateWithoutClientInput[] | PortfolioUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PortfolioCreateOrConnectWithoutClientInput | PortfolioCreateOrConnectWithoutClientInput[]
    upsert?: PortfolioUpsertWithWhereUniqueWithoutClientInput | PortfolioUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PortfolioCreateManyClientInputEnvelope
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[]
    update?: PortfolioUpdateWithWhereUniqueWithoutClientInput | PortfolioUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PortfolioUpdateManyWithWhereWithoutClientInput | PortfolioUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutBrokerAccountsInput = {
    create?: XOR<ClientCreateWithoutBrokerAccountsInput, ClientUncheckedCreateWithoutBrokerAccountsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBrokerAccountsInput
    connect?: ClientWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutBrokerAccountInput = {
    create?: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput> | OrderCreateWithoutBrokerAccountInput[] | OrderUncheckedCreateWithoutBrokerAccountInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBrokerAccountInput | OrderCreateOrConnectWithoutBrokerAccountInput[]
    createMany?: OrderCreateManyBrokerAccountInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BrokerConnectionCreateNestedOneWithoutBrokerAccountInput = {
    create?: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
    connectOrCreate?: BrokerConnectionCreateOrConnectWithoutBrokerAccountInput
    connect?: BrokerConnectionWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutBrokerAccountInput = {
    create?: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput> | OrderCreateWithoutBrokerAccountInput[] | OrderUncheckedCreateWithoutBrokerAccountInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBrokerAccountInput | OrderCreateOrConnectWithoutBrokerAccountInput[]
    createMany?: OrderCreateManyBrokerAccountInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BrokerConnectionUncheckedCreateNestedOneWithoutBrokerAccountInput = {
    create?: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
    connectOrCreate?: BrokerConnectionCreateOrConnectWithoutBrokerAccountInput
    connect?: BrokerConnectionWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutBrokerAccountsNestedInput = {
    create?: XOR<ClientCreateWithoutBrokerAccountsInput, ClientUncheckedCreateWithoutBrokerAccountsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBrokerAccountsInput
    upsert?: ClientUpsertWithoutBrokerAccountsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutBrokerAccountsInput, ClientUpdateWithoutBrokerAccountsInput>, ClientUncheckedUpdateWithoutBrokerAccountsInput>
  }

  export type OrderUpdateManyWithoutBrokerAccountNestedInput = {
    create?: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput> | OrderCreateWithoutBrokerAccountInput[] | OrderUncheckedCreateWithoutBrokerAccountInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBrokerAccountInput | OrderCreateOrConnectWithoutBrokerAccountInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBrokerAccountInput | OrderUpsertWithWhereUniqueWithoutBrokerAccountInput[]
    createMany?: OrderCreateManyBrokerAccountInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBrokerAccountInput | OrderUpdateWithWhereUniqueWithoutBrokerAccountInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBrokerAccountInput | OrderUpdateManyWithWhereWithoutBrokerAccountInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BrokerConnectionUpdateOneWithoutBrokerAccountNestedInput = {
    create?: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
    connectOrCreate?: BrokerConnectionCreateOrConnectWithoutBrokerAccountInput
    upsert?: BrokerConnectionUpsertWithoutBrokerAccountInput
    disconnect?: BrokerConnectionWhereInput | boolean
    delete?: BrokerConnectionWhereInput | boolean
    connect?: BrokerConnectionWhereUniqueInput
    update?: XOR<XOR<BrokerConnectionUpdateToOneWithWhereWithoutBrokerAccountInput, BrokerConnectionUpdateWithoutBrokerAccountInput>, BrokerConnectionUncheckedUpdateWithoutBrokerAccountInput>
  }

  export type OrderUncheckedUpdateManyWithoutBrokerAccountNestedInput = {
    create?: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput> | OrderCreateWithoutBrokerAccountInput[] | OrderUncheckedCreateWithoutBrokerAccountInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBrokerAccountInput | OrderCreateOrConnectWithoutBrokerAccountInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBrokerAccountInput | OrderUpsertWithWhereUniqueWithoutBrokerAccountInput[]
    createMany?: OrderCreateManyBrokerAccountInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBrokerAccountInput | OrderUpdateWithWhereUniqueWithoutBrokerAccountInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBrokerAccountInput | OrderUpdateManyWithWhereWithoutBrokerAccountInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BrokerConnectionUncheckedUpdateOneWithoutBrokerAccountNestedInput = {
    create?: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
    connectOrCreate?: BrokerConnectionCreateOrConnectWithoutBrokerAccountInput
    upsert?: BrokerConnectionUpsertWithoutBrokerAccountInput
    disconnect?: BrokerConnectionWhereInput | boolean
    delete?: BrokerConnectionWhereInput | boolean
    connect?: BrokerConnectionWhereUniqueInput
    update?: XOR<XOR<BrokerConnectionUpdateToOneWithWhereWithoutBrokerAccountInput, BrokerConnectionUpdateWithoutBrokerAccountInput>, BrokerConnectionUncheckedUpdateWithoutBrokerAccountInput>
  }

  export type ClientCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<ClientCreateWithoutPortfoliosInput, ClientUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPortfoliosInput
    connect?: ClientWhereUniqueInput
  }

  export type HoldingCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput> | HoldingCreateWithoutPortfolioInput[] | HoldingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutPortfolioInput | HoldingCreateOrConnectWithoutPortfolioInput[]
    createMany?: HoldingCreateManyPortfolioInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type RiskLimitCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: RiskLimitCreateOrConnectWithoutPortfolioInput
    connect?: RiskLimitWhereUniqueInput
  }

  export type HoldingUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput> | HoldingCreateWithoutPortfolioInput[] | HoldingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutPortfolioInput | HoldingCreateOrConnectWithoutPortfolioInput[]
    createMany?: HoldingCreateManyPortfolioInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type RiskLimitUncheckedCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: RiskLimitCreateOrConnectWithoutPortfolioInput
    connect?: RiskLimitWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ClientUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<ClientCreateWithoutPortfoliosInput, ClientUncheckedCreateWithoutPortfoliosInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPortfoliosInput
    upsert?: ClientUpsertWithoutPortfoliosInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutPortfoliosInput, ClientUpdateWithoutPortfoliosInput>, ClientUncheckedUpdateWithoutPortfoliosInput>
  }

  export type HoldingUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput> | HoldingCreateWithoutPortfolioInput[] | HoldingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutPortfolioInput | HoldingCreateOrConnectWithoutPortfolioInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutPortfolioInput | HoldingUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: HoldingCreateManyPortfolioInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutPortfolioInput | HoldingUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutPortfolioInput | HoldingUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPortfolioInput | OrderUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPortfolioInput | OrderUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPortfolioInput | OrderUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type RiskLimitUpdateOneWithoutPortfolioNestedInput = {
    create?: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: RiskLimitCreateOrConnectWithoutPortfolioInput
    upsert?: RiskLimitUpsertWithoutPortfolioInput
    disconnect?: RiskLimitWhereInput | boolean
    delete?: RiskLimitWhereInput | boolean
    connect?: RiskLimitWhereUniqueInput
    update?: XOR<XOR<RiskLimitUpdateToOneWithWhereWithoutPortfolioInput, RiskLimitUpdateWithoutPortfolioInput>, RiskLimitUncheckedUpdateWithoutPortfolioInput>
  }

  export type HoldingUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput> | HoldingCreateWithoutPortfolioInput[] | HoldingUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutPortfolioInput | HoldingCreateOrConnectWithoutPortfolioInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutPortfolioInput | HoldingUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: HoldingCreateManyPortfolioInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutPortfolioInput | HoldingUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutPortfolioInput | HoldingUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput> | OrderCreateWithoutPortfolioInput[] | OrderUncheckedCreateWithoutPortfolioInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPortfolioInput | OrderCreateOrConnectWithoutPortfolioInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPortfolioInput | OrderUpsertWithWhereUniqueWithoutPortfolioInput[]
    createMany?: OrderCreateManyPortfolioInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPortfolioInput | OrderUpdateWithWhereUniqueWithoutPortfolioInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPortfolioInput | OrderUpdateManyWithWhereWithoutPortfolioInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type RiskLimitUncheckedUpdateOneWithoutPortfolioNestedInput = {
    create?: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: RiskLimitCreateOrConnectWithoutPortfolioInput
    upsert?: RiskLimitUpsertWithoutPortfolioInput
    disconnect?: RiskLimitWhereInput | boolean
    delete?: RiskLimitWhereInput | boolean
    connect?: RiskLimitWhereUniqueInput
    update?: XOR<XOR<RiskLimitUpdateToOneWithWhereWithoutPortfolioInput, RiskLimitUpdateWithoutPortfolioInput>, RiskLimitUncheckedUpdateWithoutPortfolioInput>
  }

  export type PortfolioCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<PortfolioCreateWithoutHoldingsInput, PortfolioUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutHoldingsInput
    connect?: PortfolioWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<PortfolioCreateWithoutHoldingsInput, PortfolioUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutHoldingsInput
    upsert?: PortfolioUpsertWithoutHoldingsInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutHoldingsInput, PortfolioUpdateWithoutHoldingsInput>, PortfolioUncheckedUpdateWithoutHoldingsInput>
  }

  export type BasketOrderCreateNestedOneWithoutOrdersInput = {
    create?: XOR<BasketOrderCreateWithoutOrdersInput, BasketOrderUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BasketOrderCreateOrConnectWithoutOrdersInput
    connect?: BasketOrderWhereUniqueInput
  }

  export type PortfolioCreateNestedOneWithoutOrdersInput = {
    create?: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutOrdersInput
    connect?: PortfolioWhereUniqueInput
  }

  export type BrokerAccountCreateNestedOneWithoutOrdersInput = {
    create?: XOR<BrokerAccountCreateWithoutOrdersInput, BrokerAccountUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutOrdersInput
    connect?: BrokerAccountWhereUniqueInput
  }

  export type EnumOrderSideFieldUpdateOperationsInput = {
    set?: $Enums.OrderSide
  }

  export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BasketOrderUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<BasketOrderCreateWithoutOrdersInput, BasketOrderUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BasketOrderCreateOrConnectWithoutOrdersInput
    upsert?: BasketOrderUpsertWithoutOrdersInput
    disconnect?: BasketOrderWhereInput | boolean
    delete?: BasketOrderWhereInput | boolean
    connect?: BasketOrderWhereUniqueInput
    update?: XOR<XOR<BasketOrderUpdateToOneWithWhereWithoutOrdersInput, BasketOrderUpdateWithoutOrdersInput>, BasketOrderUncheckedUpdateWithoutOrdersInput>
  }

  export type PortfolioUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutOrdersInput
    upsert?: PortfolioUpsertWithoutOrdersInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutOrdersInput, PortfolioUpdateWithoutOrdersInput>, PortfolioUncheckedUpdateWithoutOrdersInput>
  }

  export type BrokerAccountUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<BrokerAccountCreateWithoutOrdersInput, BrokerAccountUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutOrdersInput
    upsert?: BrokerAccountUpsertWithoutOrdersInput
    connect?: BrokerAccountWhereUniqueInput
    update?: XOR<XOR<BrokerAccountUpdateToOneWithWhereWithoutOrdersInput, BrokerAccountUpdateWithoutOrdersInput>, BrokerAccountUncheckedUpdateWithoutOrdersInput>
  }

  export type FirmCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<FirmCreateWithoutAuditLogsInput, FirmUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutAuditLogsInput
    connect?: FirmWhereUniqueInput
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type FirmUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<FirmCreateWithoutAuditLogsInput, FirmUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: FirmCreateOrConnectWithoutAuditLogsInput
    upsert?: FirmUpsertWithoutAuditLogsInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutAuditLogsInput, FirmUpdateWithoutAuditLogsInput>, FirmUncheckedUpdateWithoutAuditLogsInput>
  }

  export type FirmCreateNestedOneWithoutBasketOrdersInput = {
    create?: XOR<FirmCreateWithoutBasketOrdersInput, FirmUncheckedCreateWithoutBasketOrdersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutBasketOrdersInput
    connect?: FirmWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutBasketOrderInput = {
    create?: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput> | OrderCreateWithoutBasketOrderInput[] | OrderUncheckedCreateWithoutBasketOrderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBasketOrderInput | OrderCreateOrConnectWithoutBasketOrderInput[]
    createMany?: OrderCreateManyBasketOrderInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutBasketOrderInput = {
    create?: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput> | OrderCreateWithoutBasketOrderInput[] | OrderUncheckedCreateWithoutBasketOrderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBasketOrderInput | OrderCreateOrConnectWithoutBasketOrderInput[]
    createMany?: OrderCreateManyBasketOrderInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type EnumAllocationMethodFieldUpdateOperationsInput = {
    set?: $Enums.AllocationMethod
  }

  export type EnumBasketOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.BasketOrderStatus
  }

  export type FirmUpdateOneRequiredWithoutBasketOrdersNestedInput = {
    create?: XOR<FirmCreateWithoutBasketOrdersInput, FirmUncheckedCreateWithoutBasketOrdersInput>
    connectOrCreate?: FirmCreateOrConnectWithoutBasketOrdersInput
    upsert?: FirmUpsertWithoutBasketOrdersInput
    connect?: FirmWhereUniqueInput
    update?: XOR<XOR<FirmUpdateToOneWithWhereWithoutBasketOrdersInput, FirmUpdateWithoutBasketOrdersInput>, FirmUncheckedUpdateWithoutBasketOrdersInput>
  }

  export type OrderUpdateManyWithoutBasketOrderNestedInput = {
    create?: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput> | OrderCreateWithoutBasketOrderInput[] | OrderUncheckedCreateWithoutBasketOrderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBasketOrderInput | OrderCreateOrConnectWithoutBasketOrderInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBasketOrderInput | OrderUpsertWithWhereUniqueWithoutBasketOrderInput[]
    createMany?: OrderCreateManyBasketOrderInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBasketOrderInput | OrderUpdateWithWhereUniqueWithoutBasketOrderInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBasketOrderInput | OrderUpdateManyWithWhereWithoutBasketOrderInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutBasketOrderNestedInput = {
    create?: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput> | OrderCreateWithoutBasketOrderInput[] | OrderUncheckedCreateWithoutBasketOrderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutBasketOrderInput | OrderCreateOrConnectWithoutBasketOrderInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutBasketOrderInput | OrderUpsertWithWhereUniqueWithoutBasketOrderInput[]
    createMany?: OrderCreateManyBasketOrderInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutBasketOrderInput | OrderUpdateWithWhereUniqueWithoutBasketOrderInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutBasketOrderInput | OrderUpdateManyWithWhereWithoutBasketOrderInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioCreateNestedOneWithoutRiskLimitInput = {
    create?: XOR<PortfolioCreateWithoutRiskLimitInput, PortfolioUncheckedCreateWithoutRiskLimitInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutRiskLimitInput
    connect?: PortfolioWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortfolioUpdateOneRequiredWithoutRiskLimitNestedInput = {
    create?: XOR<PortfolioCreateWithoutRiskLimitInput, PortfolioUncheckedCreateWithoutRiskLimitInput>
    connectOrCreate?: PortfolioCreateOrConnectWithoutRiskLimitInput
    upsert?: PortfolioUpsertWithoutRiskLimitInput
    connect?: PortfolioWhereUniqueInput
    update?: XOR<XOR<PortfolioUpdateToOneWithWhereWithoutRiskLimitInput, PortfolioUpdateWithoutRiskLimitInput>, PortfolioUncheckedUpdateWithoutRiskLimitInput>
  }

  export type BrokerAccountCreateNestedOneWithoutConnectionInput = {
    create?: XOR<BrokerAccountCreateWithoutConnectionInput, BrokerAccountUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutConnectionInput
    connect?: BrokerAccountWhereUniqueInput
  }

  export type EnumBrokerConnectionStatusFieldUpdateOperationsInput = {
    set?: $Enums.BrokerConnectionStatus
  }

  export type BrokerAccountUpdateOneRequiredWithoutConnectionNestedInput = {
    create?: XOR<BrokerAccountCreateWithoutConnectionInput, BrokerAccountUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: BrokerAccountCreateOrConnectWithoutConnectionInput
    upsert?: BrokerAccountUpsertWithoutConnectionInput
    connect?: BrokerAccountWhereUniqueInput
    update?: XOR<XOR<BrokerAccountUpdateToOneWithWhereWithoutConnectionInput, BrokerAccountUpdateWithoutConnectionInput>, BrokerAccountUncheckedUpdateWithoutConnectionInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedEnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type NestedEnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedEnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAllocationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AllocationMethod | EnumAllocationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAllocationMethodFilter<$PrismaModel> | $Enums.AllocationMethod
  }

  export type NestedEnumBasketOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BasketOrderStatus | EnumBasketOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBasketOrderStatusFilter<$PrismaModel> | $Enums.BasketOrderStatus
  }

  export type NestedEnumAllocationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AllocationMethod | EnumAllocationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllocationMethod[] | ListEnumAllocationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAllocationMethodWithAggregatesFilter<$PrismaModel> | $Enums.AllocationMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAllocationMethodFilter<$PrismaModel>
    _max?: NestedEnumAllocationMethodFilter<$PrismaModel>
  }

  export type NestedEnumBasketOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BasketOrderStatus | EnumBasketOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BasketOrderStatus[] | ListEnumBasketOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBasketOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.BasketOrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBasketOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumBasketOrderStatusFilter<$PrismaModel>
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

  export type NestedEnumBrokerConnectionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BrokerConnectionStatus | EnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel> | $Enums.BrokerConnectionStatus
  }

  export type NestedEnumBrokerConnectionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BrokerConnectionStatus | EnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BrokerConnectionStatus[] | ListEnumBrokerConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBrokerConnectionStatusWithAggregatesFilter<$PrismaModel> | $Enums.BrokerConnectionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel>
    _max?: NestedEnumBrokerConnectionStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutFirmInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFirmInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFirmInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput>
  }

  export type UserCreateManyFirmInputEnvelope = {
    data: UserCreateManyFirmInput | UserCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutFirmInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brokerAccounts?: BrokerAccountCreateNestedManyWithoutClientInput
    portfolios?: PortfolioCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutFirmInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    brokerAccounts?: BrokerAccountUncheckedCreateNestedManyWithoutClientInput
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutFirmInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput>
  }

  export type ClientCreateManyFirmInputEnvelope = {
    data: ClientCreateManyFirmInput | ClientCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type BasketOrderCreateWithoutFirmInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutBasketOrderInput
  }

  export type BasketOrderUncheckedCreateWithoutFirmInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBasketOrderInput
  }

  export type BasketOrderCreateOrConnectWithoutFirmInput = {
    where: BasketOrderWhereUniqueInput
    create: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput>
  }

  export type BasketOrderCreateManyFirmInputEnvelope = {
    data: BasketOrderCreateManyFirmInput | BasketOrderCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutFirmInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutFirmInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutFirmInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput>
  }

  export type AuditLogCreateManyFirmInputEnvelope = {
    data: AuditLogCreateManyFirmInput | AuditLogCreateManyFirmInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutFirmInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFirmInput, UserUncheckedUpdateWithoutFirmInput>
    create: XOR<UserCreateWithoutFirmInput, UserUncheckedCreateWithoutFirmInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFirmInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFirmInput, UserUncheckedUpdateWithoutFirmInput>
  }

  export type UserUpdateManyWithWhereWithoutFirmInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFirmInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firmId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ClientUpsertWithWhereUniqueWithoutFirmInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutFirmInput, ClientUncheckedUpdateWithoutFirmInput>
    create: XOR<ClientCreateWithoutFirmInput, ClientUncheckedCreateWithoutFirmInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutFirmInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutFirmInput, ClientUncheckedUpdateWithoutFirmInput>
  }

  export type ClientUpdateManyWithWhereWithoutFirmInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutFirmInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    email?: StringNullableFilter<"Client"> | string | null
    firmId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    updatedAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type BasketOrderUpsertWithWhereUniqueWithoutFirmInput = {
    where: BasketOrderWhereUniqueInput
    update: XOR<BasketOrderUpdateWithoutFirmInput, BasketOrderUncheckedUpdateWithoutFirmInput>
    create: XOR<BasketOrderCreateWithoutFirmInput, BasketOrderUncheckedCreateWithoutFirmInput>
  }

  export type BasketOrderUpdateWithWhereUniqueWithoutFirmInput = {
    where: BasketOrderWhereUniqueInput
    data: XOR<BasketOrderUpdateWithoutFirmInput, BasketOrderUncheckedUpdateWithoutFirmInput>
  }

  export type BasketOrderUpdateManyWithWhereWithoutFirmInput = {
    where: BasketOrderScalarWhereInput
    data: XOR<BasketOrderUpdateManyMutationInput, BasketOrderUncheckedUpdateManyWithoutFirmInput>
  }

  export type BasketOrderScalarWhereInput = {
    AND?: BasketOrderScalarWhereInput | BasketOrderScalarWhereInput[]
    OR?: BasketOrderScalarWhereInput[]
    NOT?: BasketOrderScalarWhereInput | BasketOrderScalarWhereInput[]
    id?: StringFilter<"BasketOrder"> | string
    name?: StringNullableFilter<"BasketOrder"> | string | null
    symbol?: StringFilter<"BasketOrder"> | string
    exchange?: StringFilter<"BasketOrder"> | string
    side?: EnumOrderSideFilter<"BasketOrder"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"BasketOrder"> | $Enums.OrderType
    limitPrice?: DecimalNullableFilter<"BasketOrder"> | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFilter<"BasketOrder"> | number
    allocationMethod?: EnumAllocationMethodFilter<"BasketOrder"> | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFilter<"BasketOrder"> | $Enums.BasketOrderStatus
    firmId?: StringFilter<"BasketOrder"> | string
    createdAt?: DateTimeFilter<"BasketOrder"> | Date | string
    updatedAt?: DateTimeFilter<"BasketOrder"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutFirmInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutFirmInput, AuditLogUncheckedUpdateWithoutFirmInput>
    create: XOR<AuditLogCreateWithoutFirmInput, AuditLogUncheckedCreateWithoutFirmInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutFirmInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutFirmInput, AuditLogUncheckedUpdateWithoutFirmInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutFirmInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutFirmInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    firmId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    message?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type FirmCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderUncheckedCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutUsersInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
  }

  export type FirmUpsertWithoutUsersInput = {
    update: XOR<FirmUpdateWithoutUsersInput, FirmUncheckedUpdateWithoutUsersInput>
    create: XOR<FirmCreateWithoutUsersInput, FirmUncheckedCreateWithoutUsersInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutUsersInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutUsersInput, FirmUncheckedUpdateWithoutUsersInput>
  }

  export type FirmUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUncheckedUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type FirmCreateWithoutClientsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutClientsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderUncheckedCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutClientsInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutClientsInput, FirmUncheckedCreateWithoutClientsInput>
  }

  export type BrokerAccountCreateWithoutClientInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutBrokerAccountInput
    connection?: BrokerConnectionCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountUncheckedCreateWithoutClientInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBrokerAccountInput
    connection?: BrokerConnectionUncheckedCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountCreateOrConnectWithoutClientInput = {
    where: BrokerAccountWhereUniqueInput
    create: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput>
  }

  export type BrokerAccountCreateManyClientInputEnvelope = {
    data: BrokerAccountCreateManyClientInput | BrokerAccountCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioCreateWithoutClientInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutClientInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitUncheckedCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutClientInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput>
  }

  export type PortfolioCreateManyClientInputEnvelope = {
    data: PortfolioCreateManyClientInput | PortfolioCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type FirmUpsertWithoutClientsInput = {
    update: XOR<FirmUpdateWithoutClientsInput, FirmUncheckedUpdateWithoutClientsInput>
    create: XOR<FirmCreateWithoutClientsInput, FirmUncheckedCreateWithoutClientsInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutClientsInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutClientsInput, FirmUncheckedUpdateWithoutClientsInput>
  }

  export type FirmUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutClientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUncheckedUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type BrokerAccountUpsertWithWhereUniqueWithoutClientInput = {
    where: BrokerAccountWhereUniqueInput
    update: XOR<BrokerAccountUpdateWithoutClientInput, BrokerAccountUncheckedUpdateWithoutClientInput>
    create: XOR<BrokerAccountCreateWithoutClientInput, BrokerAccountUncheckedCreateWithoutClientInput>
  }

  export type BrokerAccountUpdateWithWhereUniqueWithoutClientInput = {
    where: BrokerAccountWhereUniqueInput
    data: XOR<BrokerAccountUpdateWithoutClientInput, BrokerAccountUncheckedUpdateWithoutClientInput>
  }

  export type BrokerAccountUpdateManyWithWhereWithoutClientInput = {
    where: BrokerAccountScalarWhereInput
    data: XOR<BrokerAccountUpdateManyMutationInput, BrokerAccountUncheckedUpdateManyWithoutClientInput>
  }

  export type BrokerAccountScalarWhereInput = {
    AND?: BrokerAccountScalarWhereInput | BrokerAccountScalarWhereInput[]
    OR?: BrokerAccountScalarWhereInput[]
    NOT?: BrokerAccountScalarWhereInput | BrokerAccountScalarWhereInput[]
    id?: StringFilter<"BrokerAccount"> | string
    broker?: StringFilter<"BrokerAccount"> | string
    accountId?: StringFilter<"BrokerAccount"> | string
    accountLabel?: StringNullableFilter<"BrokerAccount"> | string | null
    clientId?: StringFilter<"BrokerAccount"> | string
    createdAt?: DateTimeFilter<"BrokerAccount"> | Date | string
    updatedAt?: DateTimeFilter<"BrokerAccount"> | Date | string
  }

  export type PortfolioUpsertWithWhereUniqueWithoutClientInput = {
    where: PortfolioWhereUniqueInput
    update: XOR<PortfolioUpdateWithoutClientInput, PortfolioUncheckedUpdateWithoutClientInput>
    create: XOR<PortfolioCreateWithoutClientInput, PortfolioUncheckedCreateWithoutClientInput>
  }

  export type PortfolioUpdateWithWhereUniqueWithoutClientInput = {
    where: PortfolioWhereUniqueInput
    data: XOR<PortfolioUpdateWithoutClientInput, PortfolioUncheckedUpdateWithoutClientInput>
  }

  export type PortfolioUpdateManyWithWhereWithoutClientInput = {
    where: PortfolioScalarWhereInput
    data: XOR<PortfolioUpdateManyMutationInput, PortfolioUncheckedUpdateManyWithoutClientInput>
  }

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    OR?: PortfolioScalarWhereInput[]
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[]
    id?: StringFilter<"Portfolio"> | string
    name?: StringFilter<"Portfolio"> | string
    clientId?: StringFilter<"Portfolio"> | string
    cashBalance?: DecimalFilter<"Portfolio"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Portfolio"> | Date | string
    updatedAt?: DateTimeFilter<"Portfolio"> | Date | string
  }

  export type ClientCreateWithoutBrokerAccountsInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutClientsInput
    portfolios?: PortfolioCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutBrokerAccountsInput = {
    id?: string
    name: string
    email?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutBrokerAccountsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutBrokerAccountsInput, ClientUncheckedCreateWithoutBrokerAccountsInput>
  }

  export type OrderCreateWithoutBrokerAccountInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    basketOrder?: BasketOrderCreateNestedOneWithoutOrdersInput
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutBrokerAccountInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutBrokerAccountInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput>
  }

  export type OrderCreateManyBrokerAccountInputEnvelope = {
    data: OrderCreateManyBrokerAccountInput | OrderCreateManyBrokerAccountInput[]
    skipDuplicates?: boolean
  }

  export type BrokerConnectionCreateWithoutBrokerAccountInput = {
    id?: string
    credentialsEncrypted?: string | null
    sessionEncrypted?: string | null
    externalUserId?: string | null
    sessionExpiresAt?: Date | string | null
    status?: $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerConnectionUncheckedCreateWithoutBrokerAccountInput = {
    id?: string
    credentialsEncrypted?: string | null
    sessionEncrypted?: string | null
    externalUserId?: string | null
    sessionExpiresAt?: Date | string | null
    status?: $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerConnectionCreateOrConnectWithoutBrokerAccountInput = {
    where: BrokerConnectionWhereUniqueInput
    create: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
  }

  export type ClientUpsertWithoutBrokerAccountsInput = {
    update: XOR<ClientUpdateWithoutBrokerAccountsInput, ClientUncheckedUpdateWithoutBrokerAccountsInput>
    create: XOR<ClientCreateWithoutBrokerAccountsInput, ClientUncheckedCreateWithoutBrokerAccountsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutBrokerAccountsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutBrokerAccountsInput, ClientUncheckedUpdateWithoutBrokerAccountsInput>
  }

  export type ClientUpdateWithoutBrokerAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutClientsNestedInput
    portfolios?: PortfolioUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutBrokerAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolios?: PortfolioUncheckedUpdateManyWithoutClientNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutBrokerAccountInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutBrokerAccountInput, OrderUncheckedUpdateWithoutBrokerAccountInput>
    create: XOR<OrderCreateWithoutBrokerAccountInput, OrderUncheckedCreateWithoutBrokerAccountInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutBrokerAccountInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutBrokerAccountInput, OrderUncheckedUpdateWithoutBrokerAccountInput>
  }

  export type OrderUpdateManyWithWhereWithoutBrokerAccountInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutBrokerAccountInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    exchange?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    quantity?: IntFilter<"Order"> | number
    limitPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: StringNullableFilter<"Order"> | string | null
    basketOrderId?: StringNullableFilter<"Order"> | string | null
    filledQuantity?: IntFilter<"Order"> | number
    averageFillPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    filledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFilter<"Order"> | number
    portfolioId?: StringFilter<"Order"> | string
    brokerAccountId?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type BrokerConnectionUpsertWithoutBrokerAccountInput = {
    update: XOR<BrokerConnectionUpdateWithoutBrokerAccountInput, BrokerConnectionUncheckedUpdateWithoutBrokerAccountInput>
    create: XOR<BrokerConnectionCreateWithoutBrokerAccountInput, BrokerConnectionUncheckedCreateWithoutBrokerAccountInput>
    where?: BrokerConnectionWhereInput
  }

  export type BrokerConnectionUpdateToOneWithWhereWithoutBrokerAccountInput = {
    where?: BrokerConnectionWhereInput
    data: XOR<BrokerConnectionUpdateWithoutBrokerAccountInput, BrokerConnectionUncheckedUpdateWithoutBrokerAccountInput>
  }

  export type BrokerConnectionUpdateWithoutBrokerAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerConnectionUncheckedUpdateWithoutBrokerAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialsEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    sessionEncrypted?: NullableStringFieldUpdateOperationsInput | string | null
    externalUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBrokerConnectionStatusFieldUpdateOperationsInput | $Enums.BrokerConnectionStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    lastConnectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutClientsInput
    brokerAccounts?: BrokerAccountCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutPortfoliosInput = {
    id?: string
    name: string
    email?: string | null
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brokerAccounts?: BrokerAccountUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutPortfoliosInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutPortfoliosInput, ClientUncheckedCreateWithoutPortfoliosInput>
  }

  export type HoldingCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUncheckedCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingCreateOrConnectWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput
    create: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput>
  }

  export type HoldingCreateManyPortfolioInputEnvelope = {
    data: HoldingCreateManyPortfolioInput | HoldingCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    basketOrder?: BasketOrderCreateNestedOneWithoutOrdersInput
    brokerAccount: BrokerAccountCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput>
  }

  export type OrderCreateManyPortfolioInputEnvelope = {
    data: OrderCreateManyPortfolioInput | OrderCreateManyPortfolioInput[]
    skipDuplicates?: boolean
  }

  export type RiskLimitCreateWithoutPortfolioInput = {
    id?: string
    maxOrderQuantity?: number | null
    maxOrderValue?: Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: number | null
    maxPositionValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskLimitUncheckedCreateWithoutPortfolioInput = {
    id?: string
    maxOrderQuantity?: number | null
    maxOrderValue?: Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: number | null
    maxPositionValue?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RiskLimitCreateOrConnectWithoutPortfolioInput = {
    where: RiskLimitWhereUniqueInput
    create: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
  }

  export type ClientUpsertWithoutPortfoliosInput = {
    update: XOR<ClientUpdateWithoutPortfoliosInput, ClientUncheckedUpdateWithoutPortfoliosInput>
    create: XOR<ClientCreateWithoutPortfoliosInput, ClientUncheckedCreateWithoutPortfoliosInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutPortfoliosInput, ClientUncheckedUpdateWithoutPortfoliosInput>
  }

  export type ClientUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutClientsNestedInput
    brokerAccounts?: BrokerAccountUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brokerAccounts?: BrokerAccountUncheckedUpdateManyWithoutClientNestedInput
  }

  export type HoldingUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput
    update: XOR<HoldingUpdateWithoutPortfolioInput, HoldingUncheckedUpdateWithoutPortfolioInput>
    create: XOR<HoldingCreateWithoutPortfolioInput, HoldingUncheckedCreateWithoutPortfolioInput>
  }

  export type HoldingUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput
    data: XOR<HoldingUpdateWithoutPortfolioInput, HoldingUncheckedUpdateWithoutPortfolioInput>
  }

  export type HoldingUpdateManyWithWhereWithoutPortfolioInput = {
    where: HoldingScalarWhereInput
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type HoldingScalarWhereInput = {
    AND?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    OR?: HoldingScalarWhereInput[]
    NOT?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    id?: StringFilter<"Holding"> | string
    symbol?: StringFilter<"Holding"> | string
    exchange?: StringFilter<"Holding"> | string
    quantity?: IntFilter<"Holding"> | number
    averagePrice?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    portfolioId?: StringFilter<"Holding"> | string
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutPortfolioInput, OrderUncheckedUpdateWithoutPortfolioInput>
    create: XOR<OrderCreateWithoutPortfolioInput, OrderUncheckedCreateWithoutPortfolioInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutPortfolioInput, OrderUncheckedUpdateWithoutPortfolioInput>
  }

  export type OrderUpdateManyWithWhereWithoutPortfolioInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutPortfolioInput>
  }

  export type RiskLimitUpsertWithoutPortfolioInput = {
    update: XOR<RiskLimitUpdateWithoutPortfolioInput, RiskLimitUncheckedUpdateWithoutPortfolioInput>
    create: XOR<RiskLimitCreateWithoutPortfolioInput, RiskLimitUncheckedCreateWithoutPortfolioInput>
    where?: RiskLimitWhereInput
  }

  export type RiskLimitUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: RiskLimitWhereInput
    data: XOR<RiskLimitUpdateWithoutPortfolioInput, RiskLimitUncheckedUpdateWithoutPortfolioInput>
  }

  export type RiskLimitUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskLimitUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxOrderQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxOrderValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    maxPositionQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    maxPositionValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioCreateWithoutHoldingsInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPortfoliosInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutHoldingsInput = {
    id?: string
    name: string
    clientId: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitUncheckedCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutHoldingsInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutHoldingsInput, PortfolioUncheckedCreateWithoutHoldingsInput>
  }

  export type PortfolioUpsertWithoutHoldingsInput = {
    update: XOR<PortfolioUpdateWithoutHoldingsInput, PortfolioUncheckedUpdateWithoutHoldingsInput>
    create: XOR<PortfolioCreateWithoutHoldingsInput, PortfolioUncheckedCreateWithoutHoldingsInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutHoldingsInput, PortfolioUncheckedUpdateWithoutHoldingsInput>
  }

  export type PortfolioUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPortfoliosNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUncheckedUpdateOneWithoutPortfolioNestedInput
  }

  export type BasketOrderCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    firm: FirmCreateNestedOneWithoutBasketOrdersInput
  }

  export type BasketOrderUncheckedCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    firmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BasketOrderCreateOrConnectWithoutOrdersInput = {
    where: BasketOrderWhereUniqueInput
    create: XOR<BasketOrderCreateWithoutOrdersInput, BasketOrderUncheckedCreateWithoutOrdersInput>
  }

  export type PortfolioCreateWithoutOrdersInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPortfoliosInput
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    clientId: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput
    riskLimit?: RiskLimitUncheckedCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutOrdersInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
  }

  export type BrokerAccountCreateWithoutOrdersInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutBrokerAccountsInput
    connection?: BrokerConnectionCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountUncheckedCreateWithoutOrdersInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    connection?: BrokerConnectionUncheckedCreateNestedOneWithoutBrokerAccountInput
  }

  export type BrokerAccountCreateOrConnectWithoutOrdersInput = {
    where: BrokerAccountWhereUniqueInput
    create: XOR<BrokerAccountCreateWithoutOrdersInput, BrokerAccountUncheckedCreateWithoutOrdersInput>
  }

  export type BasketOrderUpsertWithoutOrdersInput = {
    update: XOR<BasketOrderUpdateWithoutOrdersInput, BasketOrderUncheckedUpdateWithoutOrdersInput>
    create: XOR<BasketOrderCreateWithoutOrdersInput, BasketOrderUncheckedCreateWithoutOrdersInput>
    where?: BasketOrderWhereInput
  }

  export type BasketOrderUpdateToOneWithWhereWithoutOrdersInput = {
    where?: BasketOrderWhereInput
    data: XOR<BasketOrderUpdateWithoutOrdersInput, BasketOrderUncheckedUpdateWithoutOrdersInput>
  }

  export type BasketOrderUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firm?: FirmUpdateOneRequiredWithoutBasketOrdersNestedInput
  }

  export type BasketOrderUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    firmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpsertWithoutOrdersInput = {
    update: XOR<PortfolioUpdateWithoutOrdersInput, PortfolioUncheckedUpdateWithoutOrdersInput>
    create: XOR<PortfolioCreateWithoutOrdersInput, PortfolioUncheckedCreateWithoutOrdersInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutOrdersInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutOrdersInput, PortfolioUncheckedUpdateWithoutOrdersInput>
  }

  export type PortfolioUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPortfoliosNestedInput
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUncheckedUpdateOneWithoutPortfolioNestedInput
  }

  export type BrokerAccountUpsertWithoutOrdersInput = {
    update: XOR<BrokerAccountUpdateWithoutOrdersInput, BrokerAccountUncheckedUpdateWithoutOrdersInput>
    create: XOR<BrokerAccountCreateWithoutOrdersInput, BrokerAccountUncheckedCreateWithoutOrdersInput>
    where?: BrokerAccountWhereInput
  }

  export type BrokerAccountUpdateToOneWithWhereWithoutOrdersInput = {
    where?: BrokerAccountWhereInput
    data: XOR<BrokerAccountUpdateWithoutOrdersInput, BrokerAccountUncheckedUpdateWithoutOrdersInput>
  }

  export type BrokerAccountUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBrokerAccountsNestedInput
    connection?: BrokerConnectionUpdateOneWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: BrokerConnectionUncheckedUpdateOneWithoutBrokerAccountNestedInput
  }

  export type FirmCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFirmInput
    clients?: ClientCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    clients?: ClientUncheckedCreateNestedManyWithoutFirmInput
    basketOrders?: BasketOrderUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutAuditLogsInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutAuditLogsInput, FirmUncheckedCreateWithoutAuditLogsInput>
  }

  export type FirmUpsertWithoutAuditLogsInput = {
    update: XOR<FirmUpdateWithoutAuditLogsInput, FirmUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<FirmCreateWithoutAuditLogsInput, FirmUncheckedCreateWithoutAuditLogsInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutAuditLogsInput, FirmUncheckedUpdateWithoutAuditLogsInput>
  }

  export type FirmUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFirmNestedInput
    clients?: ClientUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    clients?: ClientUncheckedUpdateManyWithoutFirmNestedInput
    basketOrders?: BasketOrderUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type FirmCreateWithoutBasketOrdersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFirmInput
    clients?: ClientCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogCreateNestedManyWithoutFirmInput
  }

  export type FirmUncheckedCreateWithoutBasketOrdersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFirmInput
    clients?: ClientUncheckedCreateNestedManyWithoutFirmInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutFirmInput
  }

  export type FirmCreateOrConnectWithoutBasketOrdersInput = {
    where: FirmWhereUniqueInput
    create: XOR<FirmCreateWithoutBasketOrdersInput, FirmUncheckedCreateWithoutBasketOrdersInput>
  }

  export type OrderCreateWithoutBasketOrderInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio: PortfolioCreateNestedOneWithoutOrdersInput
    brokerAccount: BrokerAccountCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutBasketOrderInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutBasketOrderInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput>
  }

  export type OrderCreateManyBasketOrderInputEnvelope = {
    data: OrderCreateManyBasketOrderInput | OrderCreateManyBasketOrderInput[]
    skipDuplicates?: boolean
  }

  export type FirmUpsertWithoutBasketOrdersInput = {
    update: XOR<FirmUpdateWithoutBasketOrdersInput, FirmUncheckedUpdateWithoutBasketOrdersInput>
    create: XOR<FirmCreateWithoutBasketOrdersInput, FirmUncheckedCreateWithoutBasketOrdersInput>
    where?: FirmWhereInput
  }

  export type FirmUpdateToOneWithWhereWithoutBasketOrdersInput = {
    where?: FirmWhereInput
    data: XOR<FirmUpdateWithoutBasketOrdersInput, FirmUncheckedUpdateWithoutBasketOrdersInput>
  }

  export type FirmUpdateWithoutBasketOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFirmNestedInput
    clients?: ClientUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUpdateManyWithoutFirmNestedInput
  }

  export type FirmUncheckedUpdateWithoutBasketOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFirmNestedInput
    clients?: ClientUncheckedUpdateManyWithoutFirmNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutFirmNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutBasketOrderInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutBasketOrderInput, OrderUncheckedUpdateWithoutBasketOrderInput>
    create: XOR<OrderCreateWithoutBasketOrderInput, OrderUncheckedCreateWithoutBasketOrderInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutBasketOrderInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutBasketOrderInput, OrderUncheckedUpdateWithoutBasketOrderInput>
  }

  export type OrderUpdateManyWithWhereWithoutBasketOrderInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutBasketOrderInput>
  }

  export type PortfolioCreateWithoutRiskLimitInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutPortfoliosInput
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput
    orders?: OrderCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioUncheckedCreateWithoutRiskLimitInput = {
    id?: string
    name: string
    clientId: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput
    orders?: OrderUncheckedCreateNestedManyWithoutPortfolioInput
  }

  export type PortfolioCreateOrConnectWithoutRiskLimitInput = {
    where: PortfolioWhereUniqueInput
    create: XOR<PortfolioCreateWithoutRiskLimitInput, PortfolioUncheckedCreateWithoutRiskLimitInput>
  }

  export type PortfolioUpsertWithoutRiskLimitInput = {
    update: XOR<PortfolioUpdateWithoutRiskLimitInput, PortfolioUncheckedUpdateWithoutRiskLimitInput>
    create: XOR<PortfolioCreateWithoutRiskLimitInput, PortfolioUncheckedCreateWithoutRiskLimitInput>
    where?: PortfolioWhereInput
  }

  export type PortfolioUpdateToOneWithWhereWithoutRiskLimitInput = {
    where?: PortfolioWhereInput
    data: XOR<PortfolioUpdateWithoutRiskLimitInput, PortfolioUncheckedUpdateWithoutRiskLimitInput>
  }

  export type PortfolioUpdateWithoutRiskLimitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutPortfoliosNestedInput
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutRiskLimitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
  }

  export type BrokerAccountCreateWithoutConnectionInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutBrokerAccountsInput
    orders?: OrderCreateNestedManyWithoutBrokerAccountInput
  }

  export type BrokerAccountUncheckedCreateWithoutConnectionInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    clientId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutBrokerAccountInput
  }

  export type BrokerAccountCreateOrConnectWithoutConnectionInput = {
    where: BrokerAccountWhereUniqueInput
    create: XOR<BrokerAccountCreateWithoutConnectionInput, BrokerAccountUncheckedCreateWithoutConnectionInput>
  }

  export type BrokerAccountUpsertWithoutConnectionInput = {
    update: XOR<BrokerAccountUpdateWithoutConnectionInput, BrokerAccountUncheckedUpdateWithoutConnectionInput>
    create: XOR<BrokerAccountCreateWithoutConnectionInput, BrokerAccountUncheckedCreateWithoutConnectionInput>
    where?: BrokerAccountWhereInput
  }

  export type BrokerAccountUpdateToOneWithWhereWithoutConnectionInput = {
    where?: BrokerAccountWhereInput
    data: XOR<BrokerAccountUpdateWithoutConnectionInput, BrokerAccountUncheckedUpdateWithoutConnectionInput>
  }

  export type BrokerAccountUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBrokerAccountsNestedInput
    orders?: OrderUpdateManyWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBrokerAccountNestedInput
  }

  export type UserCreateManyFirmInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientCreateManyFirmInput = {
    id?: string
    name: string
    email?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BasketOrderCreateManyFirmInput = {
    id?: string
    name?: string | null
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    totalQuantity: number
    allocationMethod: $Enums.AllocationMethod
    status?: $Enums.BasketOrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyFirmInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    message?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UserUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brokerAccounts?: BrokerAccountUpdateManyWithoutClientNestedInput
    portfolios?: PortfolioUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brokerAccounts?: BrokerAccountUncheckedUpdateManyWithoutClientNestedInput
    portfolios?: PortfolioUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasketOrderUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBasketOrderNestedInput
  }

  export type BasketOrderUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBasketOrderNestedInput
  }

  export type BasketOrderUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalQuantity?: IntFieldUpdateOperationsInput | number
    allocationMethod?: EnumAllocationMethodFieldUpdateOperationsInput | $Enums.AllocationMethod
    status?: EnumBasketOrderStatusFieldUpdateOperationsInput | $Enums.BasketOrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutFirmInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrokerAccountCreateManyClientInput = {
    id?: string
    broker: string
    accountId: string
    accountLabel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioCreateManyClientInput = {
    id?: string
    name: string
    cashBalance?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrokerAccountUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutBrokerAccountNestedInput
    connection?: BrokerConnectionUpdateOneWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutBrokerAccountNestedInput
    connection?: BrokerConnectionUncheckedUpdateOneWithoutBrokerAccountNestedInput
  }

  export type BrokerAccountUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    broker?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    accountLabel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput
    orders?: OrderUncheckedUpdateManyWithoutPortfolioNestedInput
    riskLimit?: RiskLimitUncheckedUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cashBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyBrokerAccountInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutBrokerAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    basketOrder?: BasketOrderUpdateOneWithoutOrdersNestedInput
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutBrokerAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutBrokerAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateManyPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    quantity: number
    averagePrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyPortfolioInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    basketOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    averagePrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    basketOrder?: BasketOrderUpdateOneWithoutOrdersNestedInput
    brokerAccount?: BrokerAccountUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    basketOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyBasketOrderInput = {
    id?: string
    symbol: string
    exchange: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    status?: $Enums.OrderStatus
    quantity: number
    limitPrice?: Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: string | null
    filledQuantity?: number
    averageFillPrice?: Decimal | DecimalJsLike | number | string | null
    realizedPnl?: Decimal | DecimalJsLike | number | string | null
    filledAt?: Date | string | null
    estimatedPrice?: Decimal | DecimalJsLike | number | string | null
    reservedCash?: Decimal | DecimalJsLike | number | string
    reservedQuantity?: number
    portfolioId: string
    brokerAccountId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutBasketOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioUpdateOneRequiredWithoutOrdersNestedInput
    brokerAccount?: BrokerAccountUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutBasketOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutBasketOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    exchange?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    quantity?: IntFieldUpdateOperationsInput | number
    limitPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    brokerOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    filledQuantity?: IntFieldUpdateOperationsInput | number
    averageFillPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    realizedPnl?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    reservedCash?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reservedQuantity?: IntFieldUpdateOperationsInput | number
    portfolioId?: StringFieldUpdateOperationsInput | string
    brokerAccountId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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