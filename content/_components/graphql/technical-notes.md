---
title: GraphQL Technical Notes
layout: component
description: Technical Notes for the GraphQL component
icon: graphql.png
icontext: GraphQL component
category:  graphql
updatedDate: 2025-11-14
ComponentVersion: 1.1.3
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-blendededge-graphql-component-oih/tree/a76d6ddc58a5ae043797cc86ea4104166717715b) · [Complete field and qualification report](https://github.com/thatapp/connector-blendededge-graphql-component-oih/blob/a76d6ddc58a5ae043797cc86ea4104166717715b/REPORT.md) · [Immutable final intake and host receipts](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/1e02a2fc121b3ef7ff4208b401e299f254098a58/docs/ipaas/source-inventory-2026-10-30/graphql-release-intake/qualification.json).

Raw Request accepts one GraphQL query or mutation and emits `body.data`. Configured Request introspects the selected root operation, maps its arguments/defaults and expands output fields. Credentials support no auth, Basic and a custom API-key header. No triggers or automatic pagination are added. Archived OIH query/mutate actions and triggers are historical source, not the current AVA contract. The historical API-key section incorrectly repeats Basic Auth wording.

Configured metadata and Object Type selection require [reviewed host MR164](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/164), exact host commit cac38ac10c623706b086454a5ccf91f84adab89b, installed and explicitly enabled for the connector's full release commit. Its saved-step POST routes resolve static credentials in the parent, verify the saved flow/step/build/scope and issue one fixed introspection request. An isolated worker receives only a no-auth schema replay. The older general metadata routes remain unavailable, and ordinary clean-room POSTs remain unsent. UI adoption and saved-credential integration are not established by this release. NoAuth also needs a saved endpoint credential. OAuth/reference credentials are unsupported by this metadata capability.

Input metadata is limited across all arguments to1500 expanded nodes and256KiB before a business POST. Recursive/deeper-than12 schemas, output expansion above1500 fields or64KiB selections, and nested fields needing unmapped arguments refuse. ENUM inputs cannot be supplied; omission may use a provider default, including for a non-null ENUM. Custom scalars are opaque JSON. The historical depth control does not truncate execution. Requests are bounded to1MiB and responses to4MiB/depth40. Provider partial-data errors throw before emission. Short credential values that collide with schema identifiers cause a fixed refusal before metadata replay. Full limits and delivery semantics are in the report.

Final Node20.20.2 and24.13.0 each pass72 unit tests,18 canonical outcomes, unchanged require allowlist and86-file secret scans, standalone hostcheck and31 source workers. The exact release package passes122 focused checks against host88 on each runtime (eight model and15 adversarial workers), plus the host's66/78/109 regression suites qualified during integration. Independent connector review passes125 actual workers plus three direct sealed checks per runtime. Independent integrated-host review passes48 service checks with nine model workers and24 fixed mock fetches; it does not claim authenticated-route execution. All use synthetic data and zero external attempts. The earlier delegated route review remains incomplete; original failures and corrections are preserved. Two baseline workspace API documentation omissions and three Podio NO-SAMPLE groups remain.

Host #88 installation/enabling, #72 production integration, #57 UI/save verification and #80 explicit contract limits remain conditional. Live TLS/provider/compressed-response interoperability and complete deployed behavior remain unverified. Tag d2adce7e0974f698386c34e8c4aaef1b4e29e5ee peels to the source above; original main is unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical examples and release notes below remain historical.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.3 (November 14, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 1.1.2 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.1.1 (March 16, 2022)

- Added component pusher build script

### 1.1.0 (March 11, 2022)

- Added new authentication method
- Minor readme fix
- Removed sensitive data from logs
- Bump dependencies

### 1.0.1 (May 14, 2021)

* Fix build
* Update non-graph QL dependencies

### 1.0.0 (July 17, 2020)

* Initial release


## Completeness Matrix

Here is a GraphQL Completeness Matrix:

![GraphQL Completeness Matrix](https://user-images.githubusercontent.com/22715422/92729874-a56afa80-f37b-11ea-986a-823db26bda78.png)
