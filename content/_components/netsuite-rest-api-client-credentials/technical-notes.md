---
title: NetSuite REST API OAuth Client Credentials
layout: component
description: Technical Notes for the NetSuite REST API client credentials component.
icon: netsuite_rest_api_client_credentials.png
icontext: NetSuite REST API client credentials component
category: netsuite-rest-api-client-credentials
updatedDate: 2026-03-27
ComponentVersion: 1.1.0
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.0 (March 27, 2026)

* Added `Execute SuiteQL Query` action
* Added `Request Headers` parameter to `Make Raw Request` action
* Bumped Sailor version from 2.7.3 to 2.7.8
* Updated dependencies
* Removed unnecessary dependencies

### 1.0.1 (November 07, 2024)

* Changed the OAuth2 token algorithm from RS256 to PS256
* Bumped Sailor version from 2.7.2 to 2.7.3
* Bumped axios and component-commons-library non-breaking versions

### 1.0.0 (June 03, 2024)

* Added `Make Raw Request` Action.
* Initial component release.
