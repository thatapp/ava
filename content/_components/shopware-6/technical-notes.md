---
title: Shopware 6 Technical Notes
layout: component
description: Technical Notes for the Shopware component.
icon: shopware.png
icontext: Shopware-6 component
category: shopware-6
updatedDate: 2023-10-31
ComponentVersion: 1.1.3
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Chagelog

### 1.1.3 (October 31, 2023)

* Fixed an issue when component crashes due to the input metadata for `Upsert Object` action
* Fixed error in `Object Type` selection for `Lookup Objects (plural)` action

### 1.1.2 (December 16, 2022)

* Fix schema to support both namings e.g. `product_flat` and `Product`
* Limited number of (infinitely in general) nesting depth of 'parent' and 'children' objects for Products metadata to 1
* Update Sailor version to 2.7.1

### 1.1.1 (September 23, 2022)

* Fix sample retrieving when message body is empty
* Correct amount of objects to emit in sample (10 objects maximum)
* Now error will be thrown if `Start Time` is bigger `End Time` in `Get New and Updated Objects Polling` Trigger

### 1.1.0 (September 09, 2022)

* New authentication method using client credentials grant
* Added `Lookup Object (at most one)` Action
* Added `Lookup Objects (plural)` Action
* Added `Upsert Object` Action
* Added `Delete Object By ID` Action
* Added `Get New and Updated Objects Polling` Trigger

### 1.0.0 (August 12, 2022)

* Added `Make Raw Request` Action
* Initial component release
