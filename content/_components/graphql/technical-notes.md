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
