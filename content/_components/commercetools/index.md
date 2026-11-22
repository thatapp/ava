---
title: Commercetools component
layout: component
section: E-Commerce components
description: A software which is often praised for its focus on APIs and extensive API documentation.
icon: sphereio.png
icontext: Commercetools component
category: commercetools
updatedDate: 2023-04-07
ComponentVersion: 1.0.2
---

## AVA 1.0.1 verified source publication — 2026-10-30

**PUBLISHED 1.0.1 numeric polling correction; conditional #72/#75 integration, #79 source contract, #80 size/parity.** [Exact source](https://github.com/thatapp/connector-commercetools/tree/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631) · [Full contract report](https://github.com/thatapp/connector-commercetools/blob/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-commercetools/blob/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631/evidence/prepared-1.0.1-intake-24.json).

Version1.0.1 corrects the published1.0.0 polling checkpoint defect: a short credential could mask string digests and silently restart a full scan. Query Customers and Query Orders now use version2 numeric SHA-256 bytes and millisecond timestamps. Digests and boundary arrays must be dense, bounded and valid. Malformed, corrupted or unknown state refuses before authentication; a changed configuration returns409 and requires an explicit reset. Valid matching legacy state migrates, preserving overlap and deduplication. Null/omitted/empty initial state remains supported.

The complete next checkpoint is checked against the actual5120-byte UTF-8 JSON store cap before any data emission. Overflow returns413 without data or checkpoint; it requires a narrower predicate or another delivery strategy. There is no boundary truncation or fixed safe row-count promise. The outer100-page/10000-row/25MiB scan limits do not promise that every boundary fits in persisted state.

Other action and Product Type metadata behavior remains as described in the full report. Existing storage, source/schema, nontransactional mutation and polling limitations remain; this patch does not establish installation or live account acceptance.

Publisher evidence reports97 offline tests,97 sealed tests and39 canonical workers per runtime, plus92 numeric-state workers and37 parity checks. Independent re-review passed122 checks/120 workers, including actual5120 acceptance/5121 refusal and real store round-trip with a memory adapter. The packaged prepared receipt scans76 files; the coordinating publisher separately verified the final82-file scan. Host4576be and harnessf05a0c4d are pinned.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

## Requirements

### Credentials

To authenticate this component you need to get the details of the project from
inside the project. The information is in the **Client Credential Flow** part of
the `Developers > API CLIENTS`.

{% include img.html max-width="100%" url="img/credentials-finding-information.png" title="Find information in Commercetools" %}

Here are the values to copy to use in the account authentication part:

*   `Project Name` - This is the name of your project that you are trying to get the data from.
*   `Client ID` -  This is the value in the `client_id` field.
*   `Client Secret` - This is the long alpha-numeric code which can be copied from `client_secret` field.

You can configure the credentials in the **Credentials** section by selecting the
component and giving a memorable name for your credential.

{% include img.html max-width="100%" url="img/commercetools-credentials.png" title="Commercetools credentials page" %}

## Triggers

If the Sphere.IO connector is used as a trigger then it is possible to
[Query Customers](#query-customers) or [Query Orders](#query-orders).

### Query Customers

After adding the credential there is only one field here to configure - an
Additional predicate to filter customers.

**Additional predicate to filter customers** is an optional field which you can
use to filter and include only the customers needed for the particular integration
flow. More information about how to use this field can be learned from the
[Commercetools help pages](https://docs.commercetools.com/api/predicates/query).

### Query Orders

After adding the credential there are two possible configuration fields:

*   **Additional predicate to filter orders** is an optional field you can used to filter the resources through flexible predicates which are described in the [Commercetools help pages](https://docs.commercetools.com/api/predicates/query).
*   **Expand customer's external ID** is an optional field that you can use to have external ID also included in the outcome. You can use this to pass the data to other components and sync with the records for existing list of customers.

## Actions

As an action component the Commercetools can help with the following activities:

*   Update Customer
*   Create Product
*   Add/Update Price to Variant
*   Query Product Variant by SKU
*   Get Customer by ID
*   Get Order by ID
*   Add Product Variant
*   Set Order Number
*   Add a Delivery
*   Change shipment state

### Update Customer

For this action we have only **Customer id** and **External id** fields to map from
which **Customer id** is a required field. It is worth to mention that you can
use the **External id** optional field to sync your data about the same customer.


### Create Product

The **Create Product** action has more than 10 fields to map the incoming data
from your trigger component. The number and the language settings of the fields
depend on your Commercetools setup and can be different but there are two
required fields which you must use for this component to work:

*   **Name (en)** (required) - Name of your product in English.
*   **Slug (en)** (required) - The Slug of your product.

### Add/Update Price to Variant

In case we want to add or update Price to Variant then **there are only 4 required fields**
to map your incoming data - **Price amount**, **Price currency**, **Product ID** and **Variant ID**.

### Query Product Variant by SKU

When we wish to map the incoming data with Product Variant by SKU then there are
3 required fields to fill-in:

*   **Price amount** (required)
*   **Price currency** (required)
*   **Variant SKU** (required)


### Get Customer by ID

This case is straightforward since only the **Customer id** is required.

### Get Order by ID

Only **Order id** is required to perform this action.

### Add Product Variant

If we wish to map the Product Variant with incoming data then there are 2 required
field - **Master Variant SKU** and **Sku**. There is also one optional field
**Variant Custom attribute** which you can use to further filter the results.

### Set Order Number

This particular action has two required fields to map with the incoming data:

*   **Order ID** (required)
*   **Order number** (required)

### Add a Delivery

When Add a Delivery action component is selected then we have 3 required fields -
**ID of the line item being delivered**, **Order Number** and **Quantity**. There
are 2 optional fields to configure - **Tracking ID to track the delivery** and
**Unique parcel ID**. Use this particular action for reporting the status of
delivery back to your system.

### Change shipment state

You can use this particular action component to track different types of Order IDs
which is a required field. To select use the drop-down menu near the component
section to choose.
