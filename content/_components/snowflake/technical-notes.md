---
title: Snowflake Technical Notes
layout: component
description: Technical Notes for the Snowflake component.
icon: snowflake.png
icontext: Snowflake component
category: snowflake
updatedDate: 2025-07-11
ComponentVersion: 2.1.0
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 2.1.0 (July 11, 2025)
* Added `Key-pair authentication` method

### 2.0.0 (March 31, 2025)
* ❗**Breaking changes** – The authentication mechanism has been changed to OAuth 2.0 due to [Snowflake restrictions](https://www.snowflake.com/en/blog/blocking-single-factor-password-authentification/):
  * This will break backward compatibility with versions 1.x.x.
  * It is required to update the existing credentials.
* Implemented reuseable client and connection for all actions and trigger
* Updated the `Node` engine to version 20.x.
* Updated the `Sailor` version to 2.7.5
* Updated the `component-commons-library` version to 3.2.2

### 1.3.1 (June 03, 2024)

* Added `Emit Behaviour` select view to the Select Action.

### 1.3.0 (July 29, 2022)

* Added schema name to tables names in dropdown lists
* Fixed issue when tables use schema other than PUBLIC
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update sailor-nodejs to v2.6.29
* Added `emitIndividually` emitBehavior for trigger `Get rows polling trigger`
* Added ability to operate with snowflake `Views` same to `Tables`

### 1.2.1 (November 26, 2021)

* Reduced the size of component icon file

### 1.2.0 (October 28, 2021)

* Added new `Get rows polling trigger`

### 1.1.1 (October 15, 2021)

* Metadata fix for `Execute stored procedure`

### 1.1.0 (October 1, 2021)

- `Upsert row by primary key`
- `Execute stored procedure`

### 1.0.0 (September 25, 2021)

- `Custom query`
- `Insert`
- `Lookup row by primary key`
- `Delete row by primary key`
- `Select`
