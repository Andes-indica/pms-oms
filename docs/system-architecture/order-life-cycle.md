```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Validating
    Validating --> Rejected: Risk check failed
    Validating --> Approved: Checks passed
    Approved --> Queued
    Queued --> Submitted
    Submitted --> Rejected: Broker rejected
    Submitted --> Open: Broker accepted
    Open --> PartiallyFilled
    PartiallyFilled --> Filled
    Open --> CancelPending: Cancel requested
    PartiallyFilled --> CancelPending: Cancel remainder
    CancelPending --> Cancelled
    Open --> Filled
    Filled --> [*]
    Rejected --> [*]
    Cancelled --> [*]