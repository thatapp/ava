---
title: Facebook Technical Notes
layout: component
description: Technical Notes for the Facebook component
icon: facebook.png
icontext: Facebook component
category: facebook
updatedDate: 2023-09-19
ComponentVersion: 1.0.0
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72/#80 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-facebook/tree/036b3f8216df6504412a67566ae46e4bddd46cbd) · [Full report](https://github.com/thatapp/connector-facebook/blob/036b3f8216df6504412a67566ae46e4bddd46cbd/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-facebook/blob/036b3f8216df6504412a67566ae46e4bddd46cbd/evidence/precommit-intake-24.json).

All five documented actions are implemented: Delete Object, Lookup Object, Lookup Objects, Make Raw Request and Upsert Object. There are no triggers. New API and OAuth defaults use the captured v26.0 references. Explicit v18.0 routing and schemas remain historical; its preserved official lifecycle capture lists expiry on January 26, 2026. Changing API version does not update a saved custom Auth Client endpoint. OAuth consent, app review, permissions, token lifetime and UI/save behavior remain unverified (#57); reviewed host integration remains #72.

Typed operations cover Product Item/Products. Versioned SDK-derived metadata describes fields and enums, but nested business schemas and provider requiredness are incomplete. Typed reads request 14 core fields; other described output fields require an explicit raw fields query. Lookup filters and field-specific provider behavior remain qualified. Plural lookup buffers and validates all pages before emission, with limits of 100 pages, 10,000 records and 25 MiB. Continuation must preserve the selected catalogue, version, fields, filter and limit; only a forward after cursor may change. Omitted unique-lookup criteria may emit an empty object by explicit implementation choice. Malformed successful responses fail; only unambiguous HTTP 404 or an empty collection follows missing-object options. Ambiguous Graph permission/missing errors remain errors.

Raw requests accept GET, POST and DELETE within the selected Graph version. GET bodies, method/auth overrides and batch/file transport are refused. The complete encoded form is capped at the current host's 1 MiB credential-registration bound. Recorded unsent writes fail with 501; ordinary provider fields named recorded/clean_room are preserved. Graph messages are bounded and credentials redacted. Custom Graph code/subcode properties remain local because the current isolated worker serializes status/message only. These schema, transport and output differences remain #80; sample-only error behavior is not implemented.

The publisher and independent reviewer record final Node 20.20.2/24.13.0 checks: 129 offline tests, 129 sealed tests, 36 canonical worker outcomes, all four intake gates, 57 supplemental actual workers and 32 focused independent recheck workers per runtime, with zero network attempts. The prior 151-check/156-worker broad review is historical, not a newly rerun full review after the malformed-lookup correction. This docs chat read the complete report, verified the accepted packaged intake, exact tag/main state and all eight external final receipt hashes; the suites are attributed to their authors. Source/runtime and all prior evidence remain preserved.

Annotated tag 7bc37167bd032dae97d5ad32cd4e7168a074a6ca peels to the source above. The repository has no main ref; its Draft PR targets the empty feature baseline 987dd89066037d13eec59ed223f8485424f63557. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical material below retains its original release facts.

---

## Changelog

### 1.1.0 (November 30, 2023)

* Added `Upsert Object` Action
* Added `Lookup Objects (plural)` Action
* Added `Lookup Object (at most one)` Action
* Added `Delete Object` Action

### 1.0.0 (September 19, 2023)

* Added `Make Raw Request` Action
* Initial component release
