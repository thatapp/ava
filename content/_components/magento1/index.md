---
title: Magento1 component
layout: component
section: E-Commerce components
description: A component to work with Magento 1.
icon: magento.png
icontext: Magento1 component
category: magento1
updatedDate: 2023-04-06
ComponentVersion: 1.3.2
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #57 metadata authentication, #72 dynamic session integration, #80 bounded enumeration/field parity.** [Exact source](https://github.com/thatapp/connector-magento1/tree/a29252e6229acde3129b82388e4a014c9df940d0) · [Full contract report](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/INTAKE.json).

Three actions and two full-enumeration triggers use XML-RPC v1. Product upsert resolves SKU, category assignment preserves the optional position, and inventory uses the product stock-data path. Triggers hydrate orders/customers and repeat the current bounded set on each run; their completion snapshots are not incremental change cursors.

Dynamic session IDs must be acknowledged by the host secret-registration capability before business or cleanup requests. Host MR161 runtime `d9dd758ca8ab3580c584d5c602c51ad9d853dc8d` is required. A host without that capability refuses before login. Generic UI metadata authentication remains conditional because a clean-room login POST is recorded unsent.

The published implementation is derived from the explicitly non-vendor-hosted OpenMage archive of Magento1.9.4.5. Broad historical version/edition compatibility and the unnamed31/425/38 field counts are not established. Triggers cap200 records; mutations are nontransactional, do not retry, and may have happened before a cleanup error. Domain/subdirectory/complex-product and ID/SKU limits remain in the report. The historical account-setup screenshots are vendor prerequisites, not implemented account-provisioning actions.

Publisher evidence reports52 offline tests,53 sealed-loader tests and21 canonical worker outcomes per runtime, plus30 independent workers. The packaged intake scans36 files; its final external scan includes the receipt itself. Zero network attempts are reported.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

## Description

Magento 1 component for the {{site.data.tenant.name}} platform.

> **Note:** Magento 1 end of life was announced. It will be [supported through June 2020](https://magento.com/blog/magento-news/supporting-magento-1-through-june-2020).
> We recommend migrating to [Magento 2](/components/magento2) any time soon.

Magento is a very flexible and scalable eCommerce software and platform that
allows online merchants to control the look, content and functionality of their
eCommerce store.

Magento offers a number of powerful marketing, search engine optimisation and
catalog-management tools that help you really boost your online shop.

## Requirements

> Our Magento connector talks to **XML-RPC v1 API** of Magento. It is available in
> all versions of Magento starting from 1.1, including Enterprise, Go, and Community.
> More information can be found in [Magento API documentation](https://devdocs.magento.com/guides/m1x/api/soap/introduction.html).

### Credentials

To use Magento component, you need to add your account details into our system
or as we call it authenticate it. This means finding the right kind of
information from your Magento installation and filling-in the form when adding
the new Magento account.

![Magento 1 Credentials](img/credentials.png)

*   **Name your account** (required) - Give any name that you can easily recognise afterwards.

*   **Magento domain** (required) - This is your site domain name excluding `http://` and special symbols (e.g. slashes). For example, if your Magento domain on your browser window is something like `http://magento.yoursite.com/ID` then you must input only `magento.yoursite.com` part in this field.

*   **API Login** (required) - Your Magento API Login. **This is NOT your admin or username that you use to login into your Magento installation.** This is a separate API login that you have to create (read further for more).

*   **API Password** (required) - Your Magento API login password. Again **this is NOT your admin or user password that you use to login into the Magento installation**. This API password is created separately along with the API login name (read further for more).

*   **Port** - Automatically set to `80`.

*   **Secured** - configuration for Secured connection in credentials. Can be `enabled` or
`disabled`.

To set your API login and API password follow instructions presented in a
[dedicated page](set-api-login-password).

## Triggers

### Query Sales Orders

Magento connector can also be used to **Query Sales Orders** from your Magento
Account. This trigger provides a possibility to get more than 425 unique record
fields for each sales order. The only required field here is the Magento account credentials.

### Get Customers

Magento connector can be used as a trigger component to **Get Customers** data
which would return 38 unique fields for each customer including billing and
shipping address fields. The only required field here is the Magento account access.


## Actions

### Create / Update Product

Create or Update Product action can accept data in 31 unique fields from the
previous connector, while only one field, **Product SKU** is required for this
connector to function along with connected Magento account.

To fully use the abilities of this connector we have provided additional filtering
possibilities that can help you to access only one specific segment of products.
To achieve that you can select the appropriate drop-down menu options to suit your needs.

Here is a quick overview of the values that you can expect from these menu options:

*   **Product Attribute Set** - This is the information you can access in your Magento Admin panel by going to **Catalog** > **Attributes** > **Manage Attribute Sets**. This is specific to your Magento eCommerce store.
*   **Product Type** - This information can be accessed by going into your Magento Admin panel **Catalog** > **Manage Products** where the Type is one of the columns in the table. It is not the scope of this document to describe all the product types but generally they can be:
    *   Simple products,
    *   Grouped products,
    *   Configurable products,
    *   Virtual products,
    *   Bundle products and
    *   Downloadable products.
*   **Default product status** - This field can have two values - `enabled` or `disabled`.

### Assign Product Category

This connector accepts information only in 3 fields, two of which are required:
*   **Category ID** (required)
*   **Product ID or SKU** (required)
*   Product position

### Update Inventory

**Update Inventory** action can accept data in 16 unique fields describing the
product inventory. For this connector to function we need at least one field,
**Product ID or SKU** to have a value.
