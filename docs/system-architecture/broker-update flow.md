```mermaid
sequenceDiagram
    participant UI as Manager Dashboard
    participant OMS as PMS-OMS API
    participant BA as Broker Adapter
    participant Broker as Zerodha
    participant DB as Database

    UI->>OMS: Place master order
    OMS->>DB: Save allocations and client orders
    OMS->>BA: Queue approved client orders
    BA->>Broker: Submit separate orders
    Broker-->>BA: Broker order IDs
    BA->>DB: Store acknowledgements
    Broker-->>BA: Fill and status events
    BA->>DB: Store executions and statuses
    DB-->>OMS: Updated order state
    OMS-->>UI: Live WebSocket update