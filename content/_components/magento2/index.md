---
title: Magento 2 component
layout: component
section: E-Commerce components
description: A component to work with Magento version 2 e-commerce platform.
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

## Table of Contents

* [Description](#description)
   * [API links](#api-links)
   * [Environment variables](#environment-variables)
   * [Technical Notes](#technical-notes)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)
* [Known Limitations](#known-limitations)

## Description

The primary purpose of this component is to integrate an external system with the Magento API. It generates actions based on JSON schemas from relevant Magento API endpoints and is compatible with Magento version `2.4`.

Magento is a powerful, flexible platform offering a comprehensive suite of features for building and managing complex e-commerce sites. It supports advanced integrations, extensive customizations, and features an extensible architecture that enables seamless third-party system integration.

### API links

[Magento API Docs](https://developer.adobe.com/commerce/webapi/rest/quick-reference/)

### Environment variables

| Name                        | Mandatory | Description                                      | Values                     |
|-----------------------------|-----------|--------------------------------------------------|----------------------------|
| `BULK_EXTRACT_PAGE_SIZE`    | false     | Define max page for one call in Bulk Extract trigger | Integer, default is 1000   |

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Magento2 component like [changelog](/components/magento2/technical-notes#changelog).

## Credentials

[Token-based authentication](https://developer.adobe.com/commerce/webapi/get-started/authentication/gs-authentication-token/) is implemented in the component.

1. **Admin Token authorization**: for this option `username` and `password` fields are required, `Integration Token` field should be empty. 
A token is generated for each request.
2. **Integration Token authorization**: for this option `Integration Token` field is required, `username` and `password` fields should be empty.
  
#### Minor Version of Magento
  
Dropdown list for selecting the minor version of Magento 2. Currently, only version `2.4` is available. This is a required field.
  
#### Magento Edition
  
Dropdown list with an edition of Magento 2. It is possible to select `Open source` or `Enterprise` edition. Required field.
  
#### Instance URL
  
It is needed to specify url of Magento instance like `https://magento.instance.com`. Required field.
  
#### Username
  
It is needed to specify username. Required in pair with `password` for `Admin Token authorization`.
  
#### Password
  
It is needed to specify password. Required in pair with `username` for `Admin Token authorization`
  
#### Integration Token
  
An integration token must be specified. Required for `Integration Token authorization`

## Triggers

Magento2 component includes the following triggers:

  1. [Get New and Updated Objects Polling](/components/magento2/triggers#get-new-and-updated-objects-polling)
  Lookup objects polling trigger.

  2. [Deprecated Triggers](/components/magento2/triggers#deprecated-triggers).

## Actions

Magento2 component includes the following actions:

  1. [Delete Object](/components/magento2/actions#delete-object)
This action allows you to delete the following object types: `customer` or `product` by unique criteria.

  2. [Lookup Object by ID](/components/magento2/actions#lookup-object-by-id)
This action allows you to search up one of the object types: `customer`, `product` or `sales order` by unique criteria.

  3. [Make Raw Request](/components/magento2/actions#make-raw-request)
  Given a field-value return all matching records.

  4. [Lookup Objects](/components/magento2/actions#lookup-objects)
  Given a field-value return all matching records.

  5. [Upsert Object](/components/magento2/actions#upsert-object)
  Given a field-value return all matching records.

  6. [Deprecated Actions](/components/magento2/actions#deprecated-actions).

## Known limitations

1. Current component version was tested with Magento `v2.4.7` release. Correct component behavior is not guaranteed for other Magento2 versions.

2. Deprecated triggers and actions don't support `Integration Token authorization`, only `Admin Token authorization`.

3. Currently Magento2 has a bug where encoded URI's are not recognised and will throw errors. For example if you have `some/sku`, it will be encoded to `some%2Fsku`. However, due to the bug this will throw errors. Refrain from using URI's that have special characters which are meant to be encoded.

4. Deleting products through the API does not function in Magento `v2.3.6` release due to a [bug](https://github.com/magento/magento2/issues/33053).

5. When specifying a value for criteria fields in the Lookup Objects action, boolean values (`true` or `false`) will not work correctly. Instead, you must use integer representations:
- Use `1` for `true`
- Use `0` for `false`
