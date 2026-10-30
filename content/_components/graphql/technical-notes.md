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

## AVA candidate status — configuration-time introspection blocked

**Untagged; not installed.** [Draft PR4](https://github.com/thatapp/connector-blendededge-graphql-component-oih/pull/4) pins [source 3aa2f2be0d2a165b5820f48b705a1e99ce524462](https://github.com/thatapp/connector-blendededge-graphql-component-oih/tree/3aa2f2be0d2a165b5820f48b705a1e99ce524462) and the [full report](https://github.com/thatapp/connector-blendededge-graphql-component-oih/blob/3aa2f2be0d2a165b5820f48b705a1e99ce524462/REPORT.md). Both Node 20.20.2/24.13.0 committed runs pass all four gates: 60 unit tests, 18 canonical worker outcomes, unchanged require allowlist and 61-file secret scans. Standalone hostcheck and 23 supplemental actual workers pass with zero external network attempts. Packaged precommit receipts cover the same runtime before evidence packaging (54 files); exact committed receipts are tracked separately.

Raw Request maps Query to one GraphQL query/mutation and emits body.data. Configured Request introspects the chosen root operation field, maps its arguments, preserves defaults and expands fields/edges/pagination output. No triggers or automatic pagination are added. Credentials support no auth, Basic and a custom API-key header; the page's repeated Basic Auth wording under API Key is erroneous. Only recorded Axios transport is used; the pure GraphQL.js parser/schema library is pinned, with no vendor SDK. The recovered OIH query/mutate actions/triggers are archived because they do not match this documented contract.

Actual config-time getObjectTypes/getMetaModel calls are blocked: current general-component routes record POST without sending it and do not resolve scoped stored credentials. [Host #88](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/88) specifies authenticated scoped credential resolution and a narrowly validated parent-owned introspection capability. Ordinary POST/mutations must remain unsent. Recorded live-mode metadata success does not establish UI availability; do not put secret values into route query strings. No tag or release count includes this candidate.

The historical depth control remains declared but does not truncate execution, as the limitations below state. Recursive/deeper-than-12 schemas, generated selections beyond 1500 fields/types or 64 KiB, and nested fields requiring unmapped arguments explicitly refuse. ENUM input values remain unsupported; optional values may be omitted. Required/scalar/unknown input checks are enforced. Custom scalars are opaque JSON. Endpoint is HTTPS only; requests are bounded to 1 MiB and responses to 4 MiB/depth 40. GraphQL errors, including partial-data errors, throw before any emission; real unsent previews refuse 501. Native recorded/clean_room business fields remain intact. No live endpoint, UI/save, installed host or exactly-once mutation claim is made. #57/#72/#80 and independent source review remain open qualifications. Historical examples/releases below retain their original facts.

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
