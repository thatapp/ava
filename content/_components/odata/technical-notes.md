---
title: ODATA Technical Notes
layout: component
description: Technical Notes for the ODATA component.
icon: odata.png
icontext: ODATA component
category: odata
updatedDate: 2023-04-06
ComponentVersion: 3.0.3
redirect_from:
  - /components/odata/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-odata/tree/466adc8944ba02297fd499bc6120081137c725ae) · [Complete field and qualification report](https://github.com/thatapp/connector-odata/blob/466adc8944ba02297fd499bc6120081137c725ae/REPORT.md) · [Immutable final intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/3cb714010647d373f743cdf5127febfff9fb363e/docs/ipaas/source-inventory-2026-10-30/odata-release-intake/qualification.json).

This release implements Lookup Object By Field, Upsert Object By ID and Get Objects Polling. Configure an HTTPS OData v4 service root and No Auth, Basic Auth or custom-header API Key Auth; OAuth and refresh are unsupported. Verification lists matching service-document entity sets and does not prove write or delta permissions. Dynamic object/field selectors and input/output models run in isolated callbacks; production saved-step UI remains conditional on #72/#57.

Lookup builds typed equality with `$top=2` and requires exactly one result. With Allow Empty Criteria enabled, missing/null/empty-string input emits an empty object without HTTP; zero and false are values. Upsert creates by POST when all keys are absent and updates by PATCH with `If-Match: *` when all keys are present. Partial keys refuse. Composite, inherited and aliased complex keys are supported; cloned update payloads omit keys. A returned representation must contain valid keys matching the addressed update identity; only then is `isNew` added. PATCH204 performs an additional representation GET. A write can apply before response validation fails; retries are not transactional.

**Every nonempty lookup and every upsert fetches current CSDL, including warm state.** Normal actions use two HTTP calls; PATCH204 uses three. Cached field/key drift requires reset. Int64/Decimal action fields use exact strings, including known nested complex collections; input values for those types must be strings. Raw JSON arrives as UTF-8 bytes, negotiates IEEE754Compatible and refuses native numeric values that would lose precision, including unsafe integral floating values. Safe native numbers remain supported. This is a bounded original-token check, not full media-parameter or OData conformance. Unknown/open and navigation values remain opaque; Decimal string exponents are unsupported.

Polling performs one GET per invocation, emits records and then stores next/delta state. Relative links resolve using payload context or the actual request URL and remain confined to the configured service origin/path. The initial pages contain existing records, followed by provider-supported deltas. Tombstones pass through; no output metadata, time-range controls, timestamps or `isNew` are added. Checkpoints store bounded numeric control bytes and a SHA-256 configuration scope, not business records or credential strings. This is not encryption. Credential/configuration or cached-metadata changes require explicit reset; legacy/corrupt state refuses. Actual snapshot storage and fresh-worker resume were tested with synthetic memory dependencies; production durability remains unverified.

Limits include4MiB JSON/CSDL,1MiB write/input,1,000 records,256KiB callback envelopes,16keys and5KiB serialized checkpoints. CSDL has namespace, depth, node and expansion limits; DTDs, external models, unsupported encodings and partial metadata responses refuse. Primitive/enum types, type definitions, bounded inheritance and complex collections are modeled. Facets, capability/writability annotations, every inheritance semantic, spatial/navigation structure and full vendor conformance are not. The historical approximately12MiB CRM metadata sample exceeds the supported cap.

Exact final Node20.20.2/24.13.0 qualification passes137 npm tests,34 canonical outcomes, the unchanged require allowlist and291-file secret scans, plus standalone hostcheck and68 supplemental process workers/16metadata callbacks/101mockHTTP per runtime. Independent runtime review passes161checks/198processworkers/59real snapshot-store roundtrips each; separate metadata review passes137checks comprising113metadata callbacks and24process actions. Six original findings are resolved; original failures and reviewer-test corrections are preserved. All checks use synthetic data with zero external network attempts.

Conditions #57 installation/UI, #72 production callbacks, #75 binary transport and #80 durable control/polling state and explicit compatibility bounds remain. Complete OData/provider behavior, live write/delta permission and deployment are UNVERIFIED. Annotated tag 5960a37c6c7af66538c053e6013894af7e1c0f48 peels to the exact source above; main remains unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical upstream documentation below remains historical.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 3.0.3 (April 06, 2023)

* Fixed version mismatch

### 3.0.2 (October 30, 2020)

* Update Sailor version to 2.6.18

### 3.0.1 (May 22, 2020)

* Update Sailor version to 2.6.7

### 3.0.0 (July 5, 2019)

* Migrate OData component to OData client library

### 2.0.0 (December 11, 2018)

* Initial release
