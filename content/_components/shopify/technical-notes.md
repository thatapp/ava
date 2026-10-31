---
title: Shopify Technical Notes
layout: component
description: Changelog for Shopify component.
icon: shopify-admin.png
icontext: Shopify component
category: shopify-component
updatedDate: 2023-12-29
ComponentVersion: 1.6.8
redirect_from:
  - /components/shopify-admin/completeness-matrix.html
  - /components/shopify-admin/changelog.html
  - /components/shopify-admin/technical-notes.html
---

## AVA 1.0.0 candidate — 2026-10-31

**Published conditionally; not installed or deployment-ready.** [Exact source](https://github.com/thatapp/connector-shopify-admin-component-v2/tree/8c546552d2aae048a1b5d120aecc55624f2cca36) · [Complete report and bounds](https://github.com/thatapp/connector-shopify-admin-component-v2/blob/8c546552d2aae048a1b5d120aecc55624f2cca36/REPORT.md) · [Draft review PR](https://github.com/thatapp/connector-shopify-admin-component-v2/pull/1).

Five actions/two triggers on pinned GraphQL2026-10. Customer-only upsert; bounded customers/products/orders polling. Host owns capability and durable webhook delivery; body HMAC does not authenticate unsigned routing/delivery headers. Public signature skipping is refused. Legacy REST documentation is a separate contract.

104 tests/23 canonical/23 standalone/161-file secrets each Node20/24; original-byte signed webhook and lifecycle workers. All four intake gates pass with synthetic data and zero external attempts. Receipts use host b48061d6ac446698d772a3aec2b156e018e4a760 and harness6746b51f6f9673493b2ead12ed1b1f1efeb599bf. These are separate-host checks; final combined-host qualification is pending. Conditions #57/#72/#74/#80 remain. Installation status is governed by the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62); historical release notes below do not establish current runtime support.

---


> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.6.8 (December 29, 2023)

* Fixed incorrect output metadata structure for arrays

### 1.6.7 (October 04, 2023)

* Modified the credentials verification process so that it did not require any Shopify scope (it required `read_products` scope before).
Now instead of `list products` the platform calls `get shop` endpoint which does not require any scope.

### 1.6.6 (December 02, 2022)

* Updated Sailor to 2.7.1

### 1.6.5 (September 23, 2022)

* Added retry on `429` error (respecting the `Retry-After` header)

### 1.6.4 (July 29, 2022)

* Added `email` support in `Upsert Object` action for `customer` objectType
* Improved error message
* Updated thatapp-sailor-nodejs to v2.6.29
* Updated oih-standard-library to v2.0.3

### 1.6.3 (July 1, 2022)

* Action `Lookup Objects` now uses method `search` instead of `list` for `customer` objectType

### 1.6.2 (June 17, 2022)

* Added information about required permissions for credential verification

### 1.6.1 (May 20, 2022)

* More info in logs if got errors

### 1.6.0 (May 06, 2022)

* Add validation the HMAC signature for `Webhook subscription` trigger

### 1.5.1 (April 08, 2022)

* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.5.0 (March 25, 2022)

- Added new action `Update Inventory Level`
- Fixed output metadata for `Get New And Updated Objects Polling` trigger
- Upgraded `sailor-nodejs` to version 2.6.27

### 1.4.7 (March 15, 2022)

- Added component pusher build script

### 1.4.6 (February 11, 2022)

- Added *Time stamp field to poll on* field for `Get New and Updated Objects` trigger
- Fixed dynamic-metadata schema

### 1.4.5 (January 28, 2022)

* Fix `startTime` and `endTime` parameters processing for `Polling Trigger`

### 1.4.4 (December 10, 2021)

* Fix output metadata for `Lookup Objects` action

### 1.4.3 (November 26, 2021)

* Reduced the size of component icon file

### 1.4.2 (September 15, 2021)

*   Add Make Raw Request Action
*   Upgrade to Sailor `2.6.26`

### 1.4.1 (November 10, 2020)

*   Upgrade to sailor 2.6.18
*   Annual audit of the component code to check if it exposes a sensitive data in the logs
*   Annual npm vulnerabilities audit

### 1.4.0 (Sept 11, 2020)

* Add support for reading & writing metafields
* Bump dependencies
* Change API Key in credentials to password level
* Remove sensitive info from logs

### 1.3.0 (November 15, 2019)

**Triggers:**

* Add Webhook Subscription trigger
* Add Polling trigger

**Actions:**

* Add Create Object Action
* Add Upsert Object Action
* Depreacte updateProductVariant action
* Depreacte createProductVariant action
* Depreacte createProductImage action
* Depreacte updateProductImage action
* Depreacte upsertProduct action

### 1.2.0 (November 5, 2019)

**Actions:**

* Add Lookup Object Action
* Add Delete Object action
* Deprecate Get Product action
* Deprecate Get Inventory Item action
* Deprecate Delete Product action
* Deprecate Delete Product Image action
* Deprecate Delete Product Variant action

### 1.1.0 (October 4, 2019)

**Actions:**

* Add List Obejct action
* Deprecate List products
* Deprecate List inventory items

### 1.0.0 (May 7, 2018)

* Initial release

## Completeness Matrix

Here is the Shopify Admin component Completeness Matrix:

![Shopify Admin component Completeness Matrix](img/completeness-matrix.png)
