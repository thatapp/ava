---
title: Magento 2 triggers
layout: component
description: Magento 2 component triggers page
icon: magento.png
icontext: Magento 2 component
category: magento2
updatedDate: 2026-08-07
ComponentVersion: 1.8.0
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #58 custom environment, #72 host integration, #79 source/UI, #80 polling/workflow parity.** [Exact source](https://github.com/thatapp/connector-magento2/tree/5751114b2de4a3e05359d40d9f6e08ddd70f270b) · [Full contract report](https://github.com/thatapp/connector-magento2/blob/5751114b2de4a3e05359d40d9f6e08ddd70f270b/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-magento2/blob/5751114b2de4a3e05359d40d9f6e08ddd70f270b/INTAKE.json).

Seventeen actions and two triggers implement the bounded Adobe Commerce2.4.7 REST contract. The release includes global/per-store product custom attributes, named tier-price website IDs and country/region resolution. Discovery and validation complete before the first business mutation in those workflows. Native request metadata retains nonrecursive fields; tenant extensions and exact Open Source edition parity remain unverified.

Polling stages the bounded result before emission and supports null initial state. Rebound/wait-for-missing remains an explicit501 refusal. Offset polling is limited to100 pages,10000 rows and25MiB buffered results, with a50-second between-call budget; this is not exactly-once, deletion or late-index detection. Store/multi-SKU/cart mutations remain nontransactional and race-prone, without automatic retries.

The documented BULK_EXTRACT_PAGE_SIZE worker environment override is unavailable; the default1000 behavior is tested. Legacy/Bulk Extract admin-only authentication, standalone integration-token policy, missing source enum/nesting details, conditional UI, and vendor shipping/payment/MSI semantics retain the report's qualifications.

Publisher evidence reports114 offline tests,115 sealed-loader tests and38 canonical workers on each runtime. Independent review covered33 checks/34 actual workers, including direct null-state checks outside the older canonical harness. The packaged scan covers52 files. Exact host4576be and harnessc749ffb4 are recorded in the report; no deployed runtime is inferred.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

* [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Deprecated Triggers](#deprecated-triggers)
   * [Bulk Extract](#bulk-extract)

## Get New and Updated Objects Polling
  
Lookup objects polling trigger.
  
### Component's configuration:
  
**Object Type** - required, choose entity type for polling data. Possible options: Customers, Orders, Products, Categories, Carts.
  
**Start Time** - optional, specifies the timestamp, in ISO8601 format, to start polling from. The default value is the beginning of time (January 1, 1970 at 00:00.000).
  
**End Time** - optional, specifies the timestamp, in ISO8601 format, indicating the end of the polling period.
  
**Size of Polling Page** - optional, positive integer, indicates the size of pages to be fetched. Defaults to 1000.
  
**Store View Code** - optional, the dropdown list with all store view codes, is only available for such object types: Products, Categories. With this option is possible to retrieve products for defined store view.

**pollConfig** - optional, a dropdown list allowing to specify polling based on updated_at or created_at timestamp

**emitBehavior** - optional, a dropdown list allowing to specify emit behavior: Emit individually or Emit page
  
#### Input Metadata
  N/A
  
#### Output Data
Output metadata will be generated dynamically according to Magento2 documentation
  
## Deprecated Triggers

### Bulk Extract
  
Trigger for retrieval of large sets of person and person related data, using bulk Marketo API.

This trigger does not work as Get New and Updated Objects Polling trigger but for bulk operations due to Magento 2 API limitations. It will poll objects according to specified input parameters again after successful execution.

#### Component's configuration:

**Object Type** - required, choose entity type for polling data. Possible options: Customers, Orders, Products.

**Store View Code** - optional, the dropdown list with all store view codes, is useful for object type `Products`. With this option is possible to retrieve products for defined store view.

#### Input Metadata

N/A

#### Output Data

Each object emitted individually.