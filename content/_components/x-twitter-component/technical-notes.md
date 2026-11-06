---
title: X (Twitter) Technical Notes
layout: component
description: Technical Notes for the X (Twitter)
icon: x-twitter.png
icontext: X (Twitter) Component
category: twitter
ComponentVersion: 2.0.0
updatedDate: 2023-11-30
---

> **AVA `1.0.0` published; installation conditional.** [Connector PR1](https://github.com/thatapp/connector-x-twitter-component/pull/1) publishes `e3ece748e6bc1159f622eb8606d02b4166a2e53a`. Both documented actions and all four credential fields are built. Node 20/24 each pass 55 unit tests, 18 canonical and 18 standalone rows, allowlist/secret checks, and 32 supplemental isolated workers with 32 independently verified OAuth 1.0a signatures. [The pinned report](https://github.com/thatapp/connector-x-twitter-component/blob/e3ece748e6bc1159f622eb8606d02b4166a2e53a/REPORT.md) records exact scope, limits and historical failures. Host conditions [#57](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/57), [#72](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72) and [#80](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/80) remain. **No READY/install or final combined-host qualification.** Live X permissions, plan limits and deployment remain UNVERIFIED.


## Changelog

### 2.0.0 (November 30, 2023)

- Component has been fully revitalized and migrated on Twitter API v2
- Added `Make Raw Request` action
- Removed `Search tweets` action (you can use `Make Raw Request` instead)
- Changed output metadata for `Post tweet` action
