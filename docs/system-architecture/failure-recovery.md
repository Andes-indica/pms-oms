```mermaid
flowchart TD
    Failure["API timeout or connection loss"] --> Known{"Broker order ID known?"}

    Known -->|Yes| Fetch["Fetch current broker status"]
    Known -->|No| Search["Search using unique request ID"]

    Fetch --> Reconcile["Compare broker and OMS records"]
    Search --> Reconcile

    Reconcile -->|Order exists| Repair["Update local order state"]
    Reconcile -->|Order absent| Retry["Retry safely with same idempotency key"]

    Repair --> Audit["Write reconciliation audit log"]
    Retry --> Audit