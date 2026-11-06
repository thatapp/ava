---
title: Magento 2 Technical Notes
layout: component
description: Technical Notes for the Magento2 component.
icon: magento.png
icontext: Magento 2 component
category: magento2
updatedDate: 2026-08-07
ComponentVersion: 1.8.0
redirect_from:
  - /components/magento2/changelog.html
  - /components/magento2/completeness-matrix.html
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #58 custom environment, #72 host integration, #79 source/UI, #80 polling/workflow parity.** [Exact source](https://github.com/thatapp/connector-magento2/tree/5751114b2de4a3e05359d40d9f6e08ddd70f270b) · [Full contract report](https://github.com/thatapp/connector-magento2/blob/5751114b2de4a3e05359d40d9f6e08ddd70f270b/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-magento2/blob/5751114b2de4a3e05359d40d9f6e08ddd70f270b/INTAKE.json).

Seventeen actions and two triggers implement the bounded Adobe Commerce2.4.7 REST contract. The release includes global/per-store product custom attributes, named tier-price website IDs and country/region resolution. Discovery and validation complete before the first business mutation in those workflows. Native request metadata retains nonrecursive fields; tenant extensions and exact Open Source edition parity remain unverified.

Polling stages the bounded result before emission and supports null initial state. Rebound/wait-for-missing remains an explicit501 refusal. Offset polling is limited to100 pages,10000 rows and25MiB buffered results, with a50-second between-call budget; this is not exactly-once, deletion or late-index detection. Store/multi-SKU/cart mutations remain nontransactional and race-prone, without automatic retries.

The documented BULK_EXTRACT_PAGE_SIZE worker environment override is unavailable; the default1000 behavior is tested. Legacy/Bulk Extract admin-only authentication, standalone integration-token policy, missing source enum/nesting details, conditional UI, and vendor shipping/payment/MSI semantics retain the report's qualifications.

Publisher evidence reports114 offline tests,115 sealed-loader tests and38 canonical workers on each runtime. Independent review covered33 checks/34 actual workers, including direct null-state checks outside the older canonical harness. The packaged scan covers52 files. Exact host4576be and harnessc749ffb4 are recorded in the report; no deployed runtime is inferred.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.8.0 (August 07, 2026)

* Added support for configurable Error Handling Policy (`errorTolerance`) and Error Codes (`errorCodes`) in connector actions
* Allowed configured non-2xx HTTP status responses to pass through to integration flows without triggering platform execution errors
* Updated dependencies to latest compatible versions
* Removed the `thatapp-rest-node` dependency

### 1.7.2 (January 05, 2026)

* Updated the `Sailor` version to 2.7.7
* Updated the Axios version to 1.12.2
* Updated the `component-commons-library` version to 4.0.0
* Remove unused `thatapp-node` dependency
* Update the Node engine to version 24.x.

### 1.7.1 (July 03, 2025)

* Fixed tooltips for `Upsert Customer`, `Upsert Object` actions
* Updated the `Sailor` version to 2.7.5
* Updated the `component-commons-library` version to 3.2.2
* Updated dev dependencies

### 1.7.0 (February 28, 2025)

* Fixed issue in `Verify Credentials`: added validation to reject admin panel URLs in Magento configuration
* Added `Upsert Object`, `Make Raw Request` actions
* Revitalized `Lookup Objects`, `Lookup Object by ID`, `Delete Object by ID` actions
* Revitalized `Get New and Updated Objects Polling` trigger
* Updated the `Node engine` to version 20.x.
* Updated the `Sailor` version to 2.7.4
* Updated the `component-commons-library` version to 3.2.1
* Updated dev dependencies

### 1.6.7 (June 3, 2022)

* Add support for Magento2 versions 2.4.4
* Integration tests fix

### 1.6.6 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.6.5 (October 29, 2021)

* Fixed bug in Get New And Updated Objects Trigger's Metadata: the trigger always outputs an array.

### 1.6.4 (June 3, 2021)

* Integration tests fixed

### 1.6.3 (May 19, 2021)

* Add support for Magento2 versions 2.3.5 and 2.3.6

### 1.6.2 (Feb 25, 2021)

* Fixed a bug in `Bulk Extract` trigger with incorrect trigger behavior with a large number of retrieved objects.
* Changed npm audit level=high to level=critical  

### 1.6.1 (Jan 4, 2021)

* Bump Dependencies
* Update to node 14
* Fix some bugs with **Create Order**
  * No need to nest order entries in an **item** object
  * Fix in metadata for order items
  * Fix in metadata for regions & countries
* Fix some bugs in **Upsert Customer**
  * Fix logic for regions & countries
* Countries can now be identified by two letter ISO code, three letter ISO code or by name
* Regions can now be identified by ISO code or name     
* Respond to removed JSON schema reference hosted by Magento docs.
* Remove empty string from list of gender options.

### 1.6.0 (June 5, 2020)

* Add `Bulk Extract` trigger
* Add `Lookup Objects` action
* Add `Lookup Set of Objects` action
* Logging tweaks:
  * Have Magento client use logger from sailor
  * Replace parameters in error messages when parameters are an object, not an array
* Update sailor version to 2.6.7

### 1.5.0 (March 11, 2020)

* Created `Add Update To Sales Order` Action
* Created `Create Order` action
* Add new type of unique ID for Sales Order `ext_order_id` to action `Retrieve Object by ID`
* Add `Check if you'd like to make a series of calls ( Developer mode only )` configuration field for `Custom Request` action
* Improve error message for `Custom Request` action
* Add `Time stamp field to poll on` configuration field for `Get New and Updated Objects Polling` trigger

### 1.4.0 (February 26, 2020)

* Add `Read Store Config` action
* Add `status` field to output metadata, option to turn off throwing errors for `Custom Request` action
* Add `Don't throw error on 4XX/5XX HTTP response codes` configuration field for `Custom Request` action
* Remove support for all Magento versions from 2.3.0 and below
* Add support for Magento versions 2.3.2 and 2.3.4 so that currently supported instances are 2.3.1, 2.3.2, 2.3.3, 2.3.4

### 1.3.0 (November 6, 2019)

* Update Magento version from 2.3.1 to 2.3.3
* Add `Upsert Customer` action
* Add `Delete Object` action
* Add `Lookup Object by ID` action
* Add `Set Tiered Prices` action
* Add custom error handler

### 1.2.0 (June 24, 2019)

* Add `Create Invoice` action

### 1.1.0 (June 6, 2019)

* Add `Set inventory` action
* Add `Set order as shipped` action
* Add `Set order external ID` action
* Add `Upsert product` action
* Add `Get New and Updated Objects Polling` trigger

### 1.0.0 (March 16, 2018)

* Initial release