---
title: Microsoft Azure AD Technical Notes
layout: component
description: Technical Notes for the Microsoft Azure AD component
icon: microsoft-azure-ad.png
icontext: Microsoft Azure AD component
category: microsoft-azure-ad
updatedDate: 2023-03-10
ComponentVersion: 1.1.0
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72/#80 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-microsoft-azure-ad/tree/f033cd5452576b019b9ccc5465966438d62dcb2b) · [Full report](https://github.com/thatapp/connector-microsoft-azure-ad/blob/f033cd5452576b019b9ccc5465966438d62dcb2b/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-microsoft-azure-ad/blob/f033cd5452576b019b9ccc5465966438d62dcb2b/evidence/precommit-intake-24.json).

This authored AVA/Microsoft Graph implementation provides six actions and one polling trigger for Users, Groups and Applications. Lookup field selection, typed/expert OData filters, advanced-query count headers, CRUD, raw request and inclusive date polling are covered. Typed linking supports only Group Members Add/Remove; other relationships, role/permission assignments and license management are not built. Provider schemas supply current nonnavigation fields, not verified historical UI parity. OAuth endpoints/scopes are declared and stored-token verification is tested; browser consent, Save, renewal, tenant roles and granted permissions remain unverified. The historical reference to authenticating Exact Online is a copy/paste error; use Microsoft endpoints and the host's actual callback URL.

Polling uses createdDateTime for Users/Applications and renewedDateTime for Groups as documented; it cannot capture every update. Current state is exactly {stateVersion:2,lastUpdatedMs,scopeHash,boundaryHashes}, with safe integer time and full SHA256 hashes represented as numeric words. It contains no reversible business data or token-derived scope. Complete state must fit5120 serialized UTF-8 bytes before any business data emits. Dense inclusive boundaries fail413 without truncating IDs;100 pages,5000 objects and25MiB projected output are additional bounds. Timestamp precision beyond milliseconds and null/malformed timestamps refuse. Failed paging/state checks produce no partial output; downstream delivery and persistence are not transactional or exactly-once.

Object type or selected-field changes require explicit checkpoint reset; field order/duplicates do not. Changing the linked account or tenant also requires explicit reset: the current worker has no established immutable account identity, so it cannot detect that change. Ordinary access-token rotation preserves progress. Omitted/null/empty state initializes; exact valid legacy state migrates, while corrupt/redacted/extra-field/unsupported state refuses before HTTP. Legacy migration cannot prove former object/field/account scope. Reset can replay records and is never automatic. Original short-token masking, initial-state and oversized-checkpoint defects remain historical evidence.

The publisher and independent reviewer record final checks on both Node20.20.2/24.13.0:107 offline tests,107 sealed-loader tests,61 canonical worker outcomes, all four gates,54 source workers/24 actual store rounds and79 independent checks/100 workers/39 store rounds plus five separate sealed shape controls. This docs chat read the complete report and accepted packaged intake, checked exact tag/main and reviewed the coordinating chat's final receipt audit; those suites are attributed to their authors. Runtimeb2e56381, host4576be and harnessf05a0c4d are qualification pins, not deployed versions. #80 includes typed relationship, timestamp, collection, checkpoint-density and sample-context differences. Raw requests have a complete5MiB JSON cap, reject GET bodies, and distinguish actual native202 responses from unsent clean-room writes. Original fleet history and upstream technical notes remain preserved.

Annotated tagcd0007bdd5a7d3a2d7a2b9f0e21bb9df1523d337 peels to the source above; main remainsd7a51040c2dfd01b2aee62afaefbca13fd910f66. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical release notes and example material below remain historical, with the release qualifications above controlling current availability.

---

## Changelog

### 1.1.0 (March 10, 2023)

* Added `Linking or Unlinking objects` Action
* Added `Lookup Objects (plural)` Action
* Added `Delete Object` Action
* Added `Lookup Object (at most one)` Action
* Added `Upsert Object` Action
* Added `Get New and Updated Objects Polling` Trigger

### 1.0.0 (February 24, 2023)

* Added `Make Raw Request` Action
* Initial component release
