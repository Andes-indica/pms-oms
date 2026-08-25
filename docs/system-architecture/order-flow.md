```mermaid
flowchart TD
    Create["Manager creates master order"] --> Allocate["Allocate quantity among clients"]
    Allocate --> Validate["Run pre-trade validation"]

    Validate -->|Failed| Reject["Reject affected allocations<br/>with clear reasons"]
    Validate -->|Passed| Save["Save master order and client orders"]

    Save --> Queue["Add client orders to execution queue"]
    Queue --> Submit["Submit through each client's broker account"]

    Submit -->|Broker rejected| BrokerReject["Record broker rejection"]
    Submit -->|Accepted| Monitor["Monitor broker order updates"]

    Monitor --> Partial["Partially filled"]
    Monitor --> Filled["Fully filled"]
    Monitor --> Cancelled["Cancelled"]

    Partial --> Reconcile["Reconcile executions"]
    Filled --> Reconcile
    Reconcile --> Update["Update positions and portfolio"]
    Update --> Notify["Send live dashboard update"]