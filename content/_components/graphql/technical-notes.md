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

## AVA candidate status — host introspection awaiting review and integration

**Untagged; not installed.** [Draft PR4](https://github.com/thatapp/connector-blendededge-graphql-component-oih/pull/4) pins [corrected source 9e5e8073962c9a7ade70e6cafb17f3e78a2641fc](https://github.com/thatapp/connector-blendededge-graphql-component-oih/tree/9e5e8073962c9a7ade70e6cafb17f3e78a2641fc) and the [full report](https://github.com/thatapp/connector-blendededge-graphql-component-oih/blob/9e5e8073962c9a7ade70e6cafb17f3e78a2641fc/REPORT.md). Both Node 20.20.2/24.13.0 final runs pass 72 unit tests, 18 canonical outcomes, unchanged require allowlist, 71-file secret scans, standalone hostcheck and 31 supplemental actual workers. Independent review clears all three reproduced defects with 125 independent workers per runtime and zero external calls. [Immutable corrected receipts](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/tree/47933c316c1d1bcf8d8c96c76ee6b1a73ee29ecd/docs/ipaas/source-inventory-2026-10-30/graphql-correction-intake) preserve the final runs and review; earlier failed evidence remains historical.

Raw Request accepts one GraphQL query/mutation and emits body.data. Configured Request introspects the chosen root operation field, maps arguments/defaults and expands output fields. No triggers or automatic pagination are added. Credentials support no auth, Basic and a custom API-key header; the historical repeated Basic Auth wording under API Key is erroneous. Transport uses host-recorded Axios and a pinned pure GraphQL.js library. Archived OIH query/mutate actions and triggers do not represent the adapted contract.

The corrections preserve native responses unless the exact status/header preview marker is present, reject all three method-override header aliases, and bound input metadata expansion across all arguments to 1500 nodes and the complete model to 256 KiB before a business POST. Recursive/deeper-than-12 schemas, output expansion beyond 1500 fields or 64 KiB selections, and nested fields needing unmapped arguments refuse. ENUM values cannot be supplied; a provider default may be used by omitting that argument, including a non-null ENUM with a default. Custom scalars remain opaque JSON. The historical depth control is declared but does not truncate execution. Requests are bounded to 1 MiB and responses to 4 MiB/depth 40. GraphQL partial-data errors throw before emission.

Current ordinary GET metadata/select routes cannot resolve saved credentials or send introspection POSTs. [Host #88](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/88) now has [Draft MR164](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/164), pinned at 8ef36036afd4e7c3bc3a9dad117a9558c380ae54. Its new authenticated saved-step POST forms resolve a scoped static credential, require an engine-enabled exact clean build, and make one parent-owned fixed introspection request. A sealed worker receives a no-auth schema replay. Ordinary clean-room POST behavior is unchanged. Short credential values colliding with schema identifiers cause a fixed refusal before replay. These routes are a candidate capability; UI adoption and installed availability are unverified.

Host owner qualification passes 112 focused checks per runtime, including 8 model and 15 adversarial workers, plus regressions of 66/78/109 checks and a 27-file secret scan. Three Podio groups lack samples and two existing workspace API documentation omissions remain. Independent host review and conflict resolution/integration are pending; no live TLS/provider or compressed-response interoperability is claimed. Host #72 and UI/scope qualifications #57/#80 remain. No tag or release count includes this candidate. Historical examples and releases below retain their original facts.

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
