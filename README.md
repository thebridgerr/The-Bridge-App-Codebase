# The Bridge - Mobile App

## Architectural Philosophy

### Zero-Cost Infrastructure
This application is purposefully designed to operate without ongoing cloud infrastructure costs for its core mechanics.
- **Compute:** All behavioral interception logic, data processing, and decision-making occurs entirely natively on the user's local device.
- **Storage:** We utilize local SQLite (`expo-sqlite`) for all relational data storage requirements. There are no hosted cloud database costs.
- **Authentication:** Appwrite is employed strictly for minimalistic authentication, keeping network requests, bandwidth, and operational overhead at absolute zero unless explicitly logging in.
- **UI/UX:** Custom, highly-performant components built with NativeWind and React Native primitives eliminate the need for bloated, paid, or subscription-based external UI libraries.

### Absolute Local-First Data Sovereignty
"The Bridge" handles extremely sensitive behavioral and emotional data. Therefore, our foundational, uncompromisable law is **Data Sovereignty**.
- **No Telemetry by Default:** App launches, intercepted bundle IDs, and emotional state logs NEVER leave the device.
- **Air-Gapped Core Data:** The `BridgeLogs`, `InterceptedApps`, and `AnchorTasks` tables exist only on the user's local filesystem in the SQLite sandbox. 
- **Privacy by Design:** By strictly removing the capability to sync core behavioral data to a central server, we structurally guarantee user privacy. Network requests are restricted solely to authentication pipelines.

---
*Generated per .agent/rules standard.*
