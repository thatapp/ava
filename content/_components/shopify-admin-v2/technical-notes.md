---
title: Shopify Admin v2 Technical Notes
layout: component
description: Technical Notes for the Shopify Admin v2 component.
icon: shopify-admin-v2.png
icontext: Shopify Admin v2 component
category: shopify-admin-v2
updatedDate: 2026-03-18
ComponentVersion: 2.6.0
---

## AVA 1.0.0 candidate — 2026-10-31

**Published conditionally; not installed or deployment-ready.** [Exact source](https://github.com/thatapp/connector-shopify-admin-component-v2/tree/8c546552d2aae048a1b5d120aecc55624f2cca36) · [Complete report and bounds](https://github.com/thatapp/connector-shopify-admin-component-v2/blob/8c546552d2aae048a1b5d120aecc55624f2cca36/REPORT.md) · [Draft review PR](https://github.com/thatapp/connector-shopify-admin-component-v2/pull/1).

Five actions/two triggers on pinned GraphQL2026-10. Customer-only upsert; bounded customers/products/orders polling. Host owns capability and durable webhook delivery; body HMAC does not authenticate unsigned routing/delivery headers. Public signature skipping is refused. Legacy REST documentation is a separate contract.

104 tests/23 canonical/23 standalone/161-file secrets each Node20/24; original-byte signed webhook and lifecycle workers. All four intake gates pass with synthetic data and zero external attempts. Receipts use host b48061d6ac446698d772a3aec2b156e018e4a760 and harness6746b51f6f9673493b2ead12ed1b1f1efeb599bf. These are separate-host checks; final combined-host qualification is pending. Conditions #57/#72/#74/#80 remain. Installation status is governed by the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62); historical release notes below do not establish current runtime support.

---


> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Chagelog

### 2.6.0 (March 18, 2026)
* Added support for the new authentication method - `Client credentials grant`

### 2.5.3 (March 03, 2026)
* Fixed issue with GraphQL `InlineFragment` handling in "Additional fields" configuration field.
* Improved the End Time boundary logic in the `Get New and Updated Objects Polling` trigger (see the README)
* Updated Sailor to version 2.7.8.
* Updated `axios` to version 1.13.5.

### 2.5.2 (August 06, 2025)
* Updated Sailor to version 2.7.6.
* Updated `@thatapp.io/component-commons-library` to version 4.0.0.
* Updated `axios` to version 1.11.0.
* Removed the `thatapp-node` library.

### 2.5.1 (April 15, 2025)
* Improved errors text
* Bump dependencies

### 2.5.0 (July 08, 2024)
* Added `Upsert Object` action

### 2.4.0 (May, 08, 2024)
* Added `Emit empty object if no entities found` checkbox to `Lookup Objects (plural)` action.

### 2.3.0 (February 13, 2024)

* Added `Webhook` Trigger.
* Fixed issue with missing object types list in `Get New and Updated Objects Polling` trigger.

### 2.2.1 (January 18, 2024)

* Fixed Error `Cannot read properties of null (reading 'map')` `in Lookup Objects (plural)` action.

### 2.2.0 (February 28, 2023)

* Added `Return Full Response` checkbox for `Get New and Updated Objects Polling` Trigger and `Lookup Objects (plural)` Action.
* Fixed Error `There can be only one argument named "after"` in `Get New and Updated Objects Polling` trigger.

### 2.1.0 (February 24, 2023)

* Added `Get New and Updated Objects Polling` Trigger.
* Added `Execute mutation` Action.
* Added `Lookup Object By ID` Action.
* Added `Lookup Objects (plural)` Action.

### 2.0.0 (January 27, 2023)

* Added `Make Raw Request` Action.
* Initial component release.
