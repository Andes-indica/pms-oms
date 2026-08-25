``` mermaid 
flowchart TD
    Master["Master Order<br/>Buy 100 RELIANCE"] --> A["Client A<br/>40 shares"]
    Master --> B["Client B<br/>35 shares"]
    Master --> C["Client C<br/>25 shares"]

    A --> OA["Broker order A<br/>Client A account"]
    B --> OB["Broker order B<br/>Client B account"]
    C --> OC["Broker order C<br/>Client C account"]