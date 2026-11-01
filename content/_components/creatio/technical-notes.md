---
layout: component
title: Creatio Technical Notes
description: Technical Notes for Creatio component.
icon: creatio.png
icontext: Creatio component
category: creatio
ComponentVersion: 1.1.0
updatedDate: 2026-09-14
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.0 (September 14, 2026)

* Set Node.js environment to 24.x
* Update dependencies to their latest major-compatible versions:
  * `@thatapp.io/component-commons-library`: `4.0.0` -> `4.0.3`
  * `thatapp-sailor-nodejs`: `2.7.7` -> `2.7.9`
  * `axios`: `1.12.2` -> `1.20.0`
  * `fast-xml-parser`: `5.3.2` -> `5.11.1`
* Ensure alphabetical sorting (case-insensitive) across dynamic select models and schema properties

### 1.0.0 (December 15, 2025)

* Added `Delete Object By ID` Action
* Added `Get New and Updated Objects Polling` Trigger
* Added `Lookup Object By ID` Action
* Added `Lookup Objects (plural)` Action
* Added `Make Raw Request` Action
* Added `Upsert Object` Action
* Initial component release