```mermaid
flowchart TD
    Manager["Portfolio Manager"] --> UI["React + Tailwind Dashboard"]
    UI --> API["Bun + TypeScript API"]

    API --> Auth["Authentication and Permissions"]
    API --> OMS["Order Management Service"]
    API --> Portfolio["Portfolio Service"]

    OMS --> Risk["Pre-trade Risk Checks"]
    Risk --> Queue["Order Execution Queue"]
    Queue --> Adapter["Broker Adapter"]

    Adapter --> Broker["Zerodha Kite API"]
    Broker --> Events["Broker Order Updates"]
    Events --> OMS

    OMS --> DB[("Database")]
    Portfolio --> DB
    Events --> DB

    DB --> Live["WebSocket Updates"]
    Live --> UI
    