---
title: Youtube Technical Notes
layout: component
description: Technical Notes for the Youtube component.
icon: youtube.png
icontext: Youtube component
category: youtube
ComponentVersion: 1.0.0
updatedDate: 2024-11-07
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: OAuth and host integration #57/#72 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-youtube/tree/7dfea8fdc000af28377ced033d66218661b2e264) · [Full report](https://github.com/thatapp/connector-youtube/blob/7dfea8fdc000af28377ced033d66218661b2e264/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-youtube/blob/7dfea8fdc000af28377ced033d66218661b2e264/evidence/precommit-intake-24.json).

One Make Raw Request action supports relative YouTube Data API paths and GET, POST, PUT, PATCH and DELETE, with the documented 404 option, headers and JSON object body. Output contains native status, headers and an optional object body; 204 omits the body. GET bodies refuse. Requests are limited to 1 MiB and responses to 5 MiB; media, binary, arrays and streaming are outside this contract. PATCH is forwarded as a raw verb, but the pinned Google Discovery document declares no native PATCH method. The 83 recursively counted Discovery methods are provenance, not a claim of complete operation coverage. There are no triggers, automatic paging or retries.

Own-app OAuth declarations and synthetic Auth Client persistence, authorization start/completion, PKCE, encrypted grant storage and scoped resolution are tested. Chosen scopes and offline/consent parameters are retained. Actual workspace UI, real consent, permission grants and the tenant callback remain unverified under #57. The qualification host does not renew general-component credentials after 401; reviewed host renewal and secret handling still require integration. The connector never refreshes tokens or retries mutations itself. The historical setup instructions below do not prove the deployed callback route.

Only the exact host preview marker (status 202, case-insensitive header name, exact value recorded) is refused as unsent. Native recorded/clean_room business fields and other response combinations remain intact. URLs remain on the fixed API root, protected headers cannot override transport, and known token echoes are removed from errors. Raw downstream business output remains available for later steps; protected records and ledgers depend on host #72.

Publisher and reviewer final results on each Node 20.20.2/24.13.0: 43 offline tests, 45 sealed tests, 17 canonical outcomes, unchanged require allowlist and 81-file secret scans; 49 source workers, 16 saved OAuth workers and 98 independent checks across 97 workers. Zero external calls. This documentation chat read the full report and accepted packaged intake, verified all 82 published raw blobs and 10 final receipt hashes, and checked the remote annotated tag and absent main. These suites are attributed to their authors. Tag a908a80b8ee9df9637ef932467d7440240d3b8b8 peels to the source above.

Packaging preserves the original probe in a hash-pinned ZIP and changes only its executable synthetic-token prefix for the existing scanner. The initial failed-scan receipt was overwritten; a separately labeled reproduction and that evidence limitation remain in the report. No security audit of the unchanged Axios dependency is claimed. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical release material below remains historical.

---

## Changelog

### 1.0.0 (November 07, 2024)

* Added Make Raw Request Action
* Initial component release