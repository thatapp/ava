---
title: BigCommerce Technical Notes
layout: component
description: Technical Notes for the BigCommerce component
icon: bigcommerce.png
icontext: BigCommerce Component
category: bigcommerce
updatedDate: 2022-11-18
ComponentVersion: 3.0.0
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-bigcommerce/tree/8c4738ec0588480a6c35bf23eaf182e4e3dded29) · [Release scope](https://github.com/thatapp/connector-bigcommerce/blob/8c4738ec0588480a6c35bf23eaf182e4e3dded29/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/7c670fd3b239019a81d575c62f91e12113323455/docs/ipaas/connector-submissions/bigcommerce-evidence/intake-standalone.json).

49 offline npm tests, 16 exact isolated-worker outcomes, 49 sealed-loader tests and 36 supplemental actual-host outcomes pass. Require allowlist and secret scan pass with zero network attempts. The tested host is `1cfd955f35804ddc03a134c048fe70f741f5c84a`; the fixture harness is `82cf1920f75833cb9757a4eaa980ff3c295faf18`. Counts describe separate test modes and are not summed as unique behaviors.

The release implements the eight documented action families and one polling trigger for Products, Customers and Orders. A broader historical object menu is not established. Product SKU and Customer Email lookup enforce uniqueness; mapping SKU/ID sets supports Products, not variant SKUs. Upsert supports Customers and Orders through a read followed by create/update, with no fallback create after a transient error or failed update. It is not atomic or automatically retried.

Plural lookup supports explicit search-term groups, all/page/individual output, bounded native pagination and complete buffering before emission. Repeated filter names are refused. Requested reads are bounded to 100 pages/25,000 records/25 MiB; Products retain the documented 250-record cap. Current vendor schemas supply structural metadata, but every merchant-specific conditional rule and the historical editor layout are unverified.

New Product polling uses increasing IDs because the current Product API does not provide the documented date-created range filter. Date-based Customer/Order/updated-Product polling uses a fixed window, one-second overlap, fingerprints and resumable page checkpoints, advancing only after delivery. Offset pagination can still skip or repeat records during concurrent changes; late indexing and exactly-once delivery are unverified. Date scans fail explicitly above 1,000 pages or 10,000 remembered fingerprints. One invocation emits at most 250 records; a full history requires resumed invocations.

Only JSON and the implemented API versions/resource types are offered. Binary/raw arbitrary-version support and broader object menus are unbuilt. Source and final standalone intake are stored in the pinned sibling evidence directory linked above; no root `INTAKE.json` is asserted.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## Changelog

### 3.0.0 (November 18, 2022)

* Breaking change - removed `Create a Payment` action

### 2.0.1 (March 03, 2022)

* Expand output metadata for `Lookup Object (at most 1)`, `Upsert Object` actions and `Get New and Updated Objects` trigger

### 2.0.0 (February 11, 2022)

* Rename `Lookup Object by ID` action to `Lookup Object (at most 1)`
* Fix result data for `Lookup Object (at most 1)` action
* Add ability to search `Products` by `SKU` and `Customers` by `Email` in `Lookup Object (at most 1)`
* Add `Get New and Updated Objects` trigger
* Add `Lookup Set Of Objects By Unique Criteria` action
* Add `Upsert Object` action

### 1.2.0 (January 28, 2022)

* Add `Create a Payment` action
* Add `Orders` support for lookup (both) and delete actions
* Add API versioning to `Make Raw Request` action

### 1.1.0 (January 14, 2022)

* Add `Make Raw Request` action

### 1.0.0 (December 1, 2020)

* Add `Create` action
* Add `Update` action
* Add `Delete` action
* Add `Lookup Object by ID` action
* Add `Lookup Objects` by multiple filters action
