---
layout: component
title: MsSQL Technical Notes
description: Technical Notes for MsSQL component.
icon: mssql.png
icontext: MsSQL component
category: mssql
ComponentVersion: 1.1.5
updatedDate: 2023-04-06
redirect_from:
  - /components/mssql/changelog.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.5 (April 06, 2023)

* Fixed version mismatch

### 1.1.4 (March 12, 2021)

* Update sailor version to 2.6.24

### 1.1.3 (November 20, 2020)

* Update Sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.1.2 (July 24, 2020)

* Update sailor version to 2.6.14

### 1.1.1 (May 11, 2020)

* Update sailor version to 2.6.7

### 1.1.0 (January 30, 2020)

* Update sailor version to 2.6.1
* Refactor console.log to built in sailor logger
* Change build type to `docker`

### 1.0.0 (June 14, 2018)

* Initial release
