
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
 * Model UserOnboardingToken
 * 
 */
export type UserOnboardingToken = $Result.DefaultSelection<Prisma.$UserOnboardingTokenPayload>
/**
 * Model Portfolio
 * 
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>
/**
 * Model PortfolioBrokerCash
 * 
 */
export type PortfolioBrokerCash = $Result.DefaultSelection<Prisma.$PortfolioBrokerCashPayload>
/**
 * Model BrokerFundsSnapshot
 * 
 */
export type BrokerFundsSnapshot = $Result.DefaultSelection<Prisma.$BrokerFundsSnapshotPayload>
/**
 * Model CashTransaction
 * 
 */
export type CashTransaction = $Result.DefaultSelection<Prisma.$CashTransactionPayload>
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
 * Model ClientOrderConfirmation
 * 
 */
export type ClientOrderConfirmation = $Result.DefaultSelection<Prisma.$ClientOrderConfirmationPayload>
/**
 * Model Allocation
 * 
 */
export type Allocation = $Result.DefaultSelection<Prisma.$AllocationPayload>
/**
 * Model RiskLimit
 * 
 */
export type RiskLimit = $Result.DefaultSelection<Prisma.$RiskLimitPayload>
/**
 * Model Instrument
 * 
 */
export type Instrument = $Result.DefaultSelection<Prisma.$InstrumentPayload>
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
 * Model Execution
 * 
 */
export type Execution = $Result.DefaultSelection<Prisma.$ExecutionPayload>
/**
 * Model ExecutionJob
 * 
 */
export type ExecutionJob = $Result.DefaultSelection<Prisma.$ExecutionJobPayload>

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


export const UserStatus: {
  INVITED: 'INVITED',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const UserOnboardingTokenType: {
  INVITATION: 'INVITATION',
  PASSWORD_RESET: 'PASSWORD_RESET'
};

export type UserOnboardingTokenType = (typeof UserOnboardingTokenType)[keyof typeof UserOnboardingTokenType]


export const OrderExecutionMode: {
  DIRECT_API: 'DIRECT_API',
  CLIENT_CONFIRMATION: 'CLIENT_CONFIRMATION'
};

export type OrderExecutionMode = (typeof OrderExecutionMode)[keyof typeof OrderExecutionMode]


export const ClientConfirmationStatus: {
  AWAITING_CLIENT: 'AWAITING_CLIENT',
  HANDOFF_STARTED: 'HANDOFF_STARTED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
};

export type ClientConfirmationStatus = (typeof ClientConfirmationStatus)[keyof typeof ClientConfirmationStatus]


export const CashTransactionType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  ADJUSTMENT: 'ADJUSTMENT',
  BUY_FILL: 'BUY_FILL',
  SELL_FILL: 'SELL_FILL',
  BROKER_RECONCILIATION: 'BROKER_RECONCILIATION'
};

export type CashTransactionType = (typeof CashTransactionType)[keyof typeof CashTransactionType]


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
  ORDER_CONFIRMATION_REQUESTED: 'ORDER_CONFIRMATION_REQUESTED',
  ORDER_CONFIRMATION_STARTED: 'ORDER_CONFIRMATION_STARTED',
  ORDER_CLIENT_CONFIRMED: 'ORDER_CLIENT_CONFIRMED',
  ORDER_CONFIRMATION_DECLINED: 'ORDER_CONFIRMATION_DECLINED',
  USER_INVITED: 'USER_INVITED',
  USER_ACTIVATED: 'USER_ACTIVATED',
  USER_ROLE_CHANGED: 'USER_ROLE_CHANGED',
  USER_DISABLED: 'USER_DISABLED',
  USER_REACTIVATED: 'USER_REACTIVATED',
  USER_SESSIONS_REVOKED: 'USER_SESSIONS_REVOKED',
  USER_PASSWORD_RESET_REQUESTED: 'USER_PASSWORD_RESET_REQUESTED',
  ADMIN_RECOVERED: 'ADMIN_RECOVERED',
  CLIENT_ARCHIVED: 'CLIENT_ARCHIVED',
  CLIENT_RESTORED: 'CLIENT_RESTORED',
  CLIENT_DELETED: 'CLIENT_DELETED',
  PORTFOLIO_ARCHIVED: 'PORTFOLIO_ARCHIVED',
  PORTFOLIO_RESTORED: 'PORTFOLIO_RESTORED',
  PORTFOLIO_DELETED: 'PORTFOLIO_DELETED',
  BASKET_CREATED: 'BASKET_CREATED',
  BASKET_SUBMITTED: 'BASKET_SUBMITTED',
  BASKET_CANCELLED: 'BASKET_CANCELLED',
  BROKER_RECONCILED: 'BROKER_RECONCILED'
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


export const ExecutionJobStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type ExecutionJobStatus = (typeof ExecutionJobStatus)[keyof typeof ExecutionJobStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type UserOnboardingTokenType = $Enums.UserOnboardingTokenType

export const UserOnboardingTokenType: typeof $Enums.UserOnboardingTokenType

export type OrderExecutionMode = $Enums.OrderExecutionMode

export const OrderExecutionMode: typeof $Enums.OrderExecutionMode

export type ClientConfirmationStatus = $Enums.ClientConfirmationStatus

export const ClientConfirmationStatus: typeof $Enums.ClientConfirmationStatus

export type CashTransactionType = $Enums.CashTransactionType

export const CashTransactionType: typeof $Enums.CashTransactionType

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

export type ExecutionJobStatus = $Enums.ExecutionJobStatus

export const ExecutionJobStatus: typeof $Enums.ExecutionJobStatus

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
   * `prisma.userOnboardingToken`: Exposes CRUD operations for the **UserOnboardingToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnboardingTokens
    * const userOnboardingTokens = await prisma.userOnboardingToken.findMany()
    * ```
    */
  get userOnboardingToken(): Prisma.UserOnboardingTokenDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.portfolioBrokerCash`: Exposes CRUD operations for the **PortfolioBrokerCash** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioBrokerCashes
    * const portfolioBrokerCashes = await prisma.portfolioBrokerCash.findMany()
    * ```
    */
  get portfolioBrokerCash(): Prisma.PortfolioBrokerCashDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brokerFundsSnapshot`: Exposes CRUD operations for the **BrokerFundsSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BrokerFundsSnapshots
    * const brokerFundsSnapshots = await prisma.brokerFundsSnapshot.findMany()
    * ```
    */
  get brokerFundsSnapshot(): Prisma.BrokerFundsSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cashTransaction`: Exposes CRUD operations for the **CashTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CashTransactions
    * const cashTransactions = await prisma.cashTransaction.findMany()
    * ```
    */
  get cashTransaction(): Prisma.CashTransactionDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.orde