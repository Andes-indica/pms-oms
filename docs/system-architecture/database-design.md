```mermaid
erDiagram
    USER ||--o{ CLIENT : manages
    CLIENT ||--o{ BROKER_ACCOUNT : owns
    CLIENT ||--|| PORTFOLIO : has

    USER ||--o{ MASTER_ORDER : creates
    INSTRUMENT ||--o{ MASTER_ORDER : selected_for

    MASTER_ORDER ||--o{ ALLOCATION : divided_into
    CLIENT ||--o{ ALLOCATION : receives

    ALLOCATION ||--|| CLIENT_ORDER : creates
    BROKER_ACCOUNT ||--o{ CLIENT_ORDER : executes

    CLIENT_ORDER ||--o{ EXECUTION : produces
    PORTFOLIO ||--o{ POSITION : contains
    INSTRUMENT ||--o{ POSITION : identifies

    USER ||--o{ AUDIT_LOG : performs

    USER {
        uuid id PK
        string name
        string email
        string role
    }

    CLIENT {
        uuid id PK
        uuid manager_id FK
        string name
        string status
        string risk_profile
    }

    BROKER_ACCOUNT {
        uuid id PK
        uuid client_id FK
        string broker
        string broker_client_id
        string connection_status
    }

    PORTFOLIO {
        uuid id PK
        uuid client_id FK
        decimal cash_balance
        decimal current_value
    }

    INSTRUMENT {
        uuid id PK
        string symbol
        string exchange
        string instrument_token
    }

    MASTER_ORDER {
        uuid id PK
        uuid created_by FK
        uuid instrument_id FK
        string side
        string order_type
        int total_quantity
        string status
    }

    ALLOCATION {
        uuid id PK
        uuid master_order_id FK
        uuid client_id FK
        int allocated_quantity
    }

    CLIENT_ORDER {
        uuid id PK
        uuid allocation_id FK
        uuid broker_account_id FK
        string broker_order_id
        int quantity
        string status
    }

    EXECUTION {
        uuid id PK
        uuid client_order_id FK
        int filled_quantity
        decimal price
        datetime executed_at
    }

    POSITION {
        uuid id PK
        uuid portfolio_id FK
        uuid instrument_id FK
        int quantity
        decimal average_price
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string entity_type
        uuid entity_id
        datetime created_at
    }