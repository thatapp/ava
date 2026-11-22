---
title: Airtable component Technical Notes
layout: component
description: Technical Notes for the Airtable component.
icon: airtable.png
icontext: Airtable component
category: airtable
ComponentVersion: 1.0.0
updatedDate: 2025-05-20
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-airtable/tree/54f43d38e62f17d418741241c5b488f1db535468) · [Release scope](https://github.com/thatapp/connector-airtable/blob/54f43d38e62f17d418741241c5b488f1db535468/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/719e89c00ab312ff61e1a9ab5e7e532760db61ce/docs/ipaas/connector-submissions/airtable-evidence/standalone-intake.json).

69 offline npm tests and 71 sealed-loader/worker tests pass against host `8f2c0408aa1ebfde9d7d8458fe3d9ec6f963ace7`. All four intake gates pass. The canonical intake loads all three actions; the detailed sealed suite checks dropdowns, verification, worker output and recorded writes. The final standalone receipt is linked above. No live Airtable request or installation was performed.

The three actions are Delete Record By ID, Lookup Record By ID and Make Raw Request; there are no triggers. Authentication uses a personal access token. Base dropdowns follow all offset pages; Table dropdowns depend on the selected Base. Lookup and successful delete preserve the actual vendor object. A clean-room DELETE emits recorded intent with no invented `deleted` result.

Raw requests support GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS on relative Airtable `/v0/` paths, with an optional object body and actual status, headers and optional response body. Origin/path escapes and malformed inputs are refused. Empty HEAD/204 responses omit the body. Tokens are scrubbed from errors; writes are not retried automatically.

Use `schema.bases:read` for the Base/Table models, `data.records:read` for lookup and `data.records:write` for delete, together with selected-base access and the user's corresponding role. Verification through `/meta/whoami` establishes authentication only, not those permissions. See Airtable's [Base listing](https://airtable.com/developers/web/api/list-bases) and [schema reference](https://airtable.com/developers/web/api/get-base-schema). The API path is `/v0`; the historical 2025-03-13 date below is a reference baseline, not a version to send.

Record-specific schemas and Generate Stub Sample UI behavior are unverified; metadata remains generic. Hosted model rendering, real scope/base enforcement and live transport behavior have not been tested. This is the documented PAT contract; OAuth user grants are not implemented by this connector.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication and offline compatibility do not establish live vendor behavior, hosted UI or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims; historical release facts remain preserved.

---

## Changelog

### 1.0.0 (May 20, 2025)

- Added `Delete Record by ID` Action
- Added `Lookup Record by ID` Action
- Added `Make Raw Request` Action
- Initial component release