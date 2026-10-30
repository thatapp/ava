---
title: Shopware 6  component
layout: component
section: E-Commerce components
description: A component to connect to Shopware 6 API version 6.5.5.2 and lower
icon: shopware.png
category: shopware-6
icontext: Shopware-6 component
updatedDate: 2023-10-31
ComponentVersion: 1.1.3
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 metadata authentication and #72 integration; #80 parity limits.** [Published source](https://github.com/thatapp/connector-shopware-6/tree/535a56fdc3a8b0109dd6a1ec6a9de7238a23a9d2) · [Contract report](https://github.com/thatapp/connector-shopware-6/blob/535a56fdc3a8b0109dd6a1ec6a9de7238a23a9d2/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-shopware-6/blob/535a56fdc3a8b0109dd6a1ec6a9de7238a23a9d2/INTAKE.json).

Five actions and one polling trigger implement bounded JSON operations. This documentation chat reviewed the published report scope and accepted immutable intake: 106 offline tests, 30 canonical actual-worker outcomes, allowlist and secret scan passing (34 files in the committed receipt; the publisher reports 35 in the final scan). The publisher also records 108 sealed tests and 26 independent checks, including 18 actual workers and 14 sealed metadata calls, on both supported runtimes. Those supplemental suites were not rerun by this documentation chat.

Each entity invocation authenticates and discovers the tenant schema, then reuses its token for the data request. Exact technical names take precedence over normalized aliases; no static core-only fallback hides discovery failure. Tenant UUID-ID entities and one association level are supported. Composite keys other than optional versionId are withheld. Entity protection is conservative; field write protection uses the vendor's crud scope. Actual tenant ACL, plugin behavior, custom-field leaves, inheritance/default alternatives and complete domain validation remain unverified.

Lookup supports all/page/individual results, advanced filters and count-only size zero via a valid limit-one request. Upsert is explicit Create POST or Update PATCH, with an optional subsequent GET; it does not infer existence. Update always requires an ID. A failed GET after a successful write cannot roll that write back. Single lookup can explicitly allow no criteria or zero results. Raw requests remain API-relative JSON, with optional 404 handling and no binary transfer.

Full scans stage up to 100 pages, 10000 rows and 4 MiB of serialized JSON before emission. Polling uses inclusive timestamp bounds, timestamp/ID ordering and boundary hashes. Late/backdated records below the watermark can be missed, and concurrent changes can shift offset pages. No deletion detection or exactly-once guarantee is provided. The host's 5 MiB HTTP limit is stricter than the connector's 10 MiB request preflight. Sample limit 10 lacks a trusted host sample context and is not implemented.

Fresh client-credentials authentication is a POST. Clean-room records it unsent and the connector refuses fabricated success. The current generic metadata/select route therefore cannot perform that fresh authentication; direct sealed model callback tests do not establish UI wiring. Verification requires product-read ACL and can reject an otherwise valid limited integration. Compatibility with the historical 6.5.5.2-and-lower claim remains unverified; the preserved official OpenAPI identifies 6.5.6.1 with selected routing corroborated by 6.5.5.2 source.

Qualification pins runtime host `4576be108e21b597d1fbffd4163fb05cd821c834` and harness `5acb7d929bb1a32ea36699ff0de8f4b034e06ef0`. This chat independently verified the annotated tag, peeled commit and unchanged main. Publication does not establish host integration or tenant acceptance.

Installation, deployment, live vendor/account acceptance and UI behavior remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical metadata and reference text below remain for context; the published scope and limitations above supersede conflicting runtime claims.

---

## Credentials

To use this component you need to create own API access integration credentials:
* Go to Settings > System > Integrations create new access to connect to Shopware, [more info](https://docs.shopware.com/en/shopware-6-en/settings/system/integrationen?category=shopware-6-en/settings/system).

Component credentials configuration fields:

* **API Base URI**  (string, required) - Indicates what URL base needs to be used
* **Client id**  (string, required)
* **Client secret**  (string, required)

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

{% include img.html max-width="100%" url="img/get-new-and-update-objects-polling.png" title="Get New and Updated Objects Polling" %}

#### Configuration Fields

* **Object Type** - (dropdown, required): Object Type to be fetched
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 500): Indicates the size of pages to be fetched
* **Timestamp field to poll on** - (string, optional): Can be either `Last Modified` or `Created` (updated or new objects, respectively). Defaults to `Created`.
* **Start Time** - (string, optional): Indicates the beginning time to start retrieving events from in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`
* **End Time** - (string, optional, defaults to execution date): If provided, don’t fetch records created or modified after this time in ISO 8601 Date time utc format - `YYYY-MM-DDThh:mm:ssZ`

#### Input Metadata

There is no input metadata

#### Output Metadata

* For `Fetch page`: An object with key ***results*** that has an array as its value
* For `Emit Individually`:  Each object fill the entire message

#### Limitations

* For new objects "Last Modified" field is empty
* For `Get New and Updated Objects Polling` Trigger and `Lookup Objects (plural)` Action amount of items retrieved in sample is limited to 10. It's done to decrease load on platform UI.

## Actions

### Lookup Objects (plural)

Lookup a set of objects by defined criteria list. Can be emitted in different way.

{% include img.html max-width="100%" url="img/lookup-objects.png" title="Lookup Objects (plural)" %}

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to lookup on. E.g `User`.
* **Emit Behavior** - (dropdown, required): Defines the way result objects will be emitted, one of `Emit all`, `Emit page` or `Emit individually`.

#### Input Metadata

* **Search Criteria** - (array of strings, required): [Search terms to filter objects](https://shopware.stoplight.io/docs/store-api/docs/concepts/search-queries.md#filter). Search terms are array which will be used as value for `filter` param of search. Be default, mapping configured to use fields "type", "field", "value", if you want to use another filter configuration - proceed to advanced mode. E.g: `[{ type: 'equals', field: 'firstName', value: 'John' }]`

If selected `Emit Behavior` is `Emit page` additionally fields will be added:
* **Page Size** - (number, defaults to 500): Indicates amount of objects per page. Value from 0 to 500.
* **Page Number** - (number, defaults 0): Indicates index of page to be fetched.

#### Output Metadata

For `Emit All` mode: An object, with key `results` that has an array as its value.
For `Emit Page` mode: An object with key `results` that has an array as its value (if `Page Size` > 0). Key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria (if `Page Size` = 0).
For `Emit Individually` mode: Each object which fill the entire message.

### Delete Object By ID

Delete a single object by its ID.

{% include img.html max-width="100%" url="img/delete-object.png" title="Delete Object By ID" %}

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Customer`.

#### Input Metadata

* **id** - (string, required): Value for ID of the object to delete.

#### Output Metadata

* **id** - (string, required): ID of deleted object.

### Upsert Object

Updates (if record found) or creates a new object.

{% include img.html max-width="100%" url="img/upsert-object.png" title="Upsert Object" %}

#### Configuration Fields

* **Object Type** - (dropdown, required): Object-type to upsert. E.g `Customer`.
* **Create or update existing object** - (dropdown, required): Options are "Create new" or "Update existing".
* **Make GET request after object created/updated** - (checkbox, optional): Make GET request after object created/updated. If false - only object ID will be emitted.

#### Input Metadata

If `Make GET request after object created/updated` is `true`:
* **ID** - (string, required): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.
If `Make GET request after object created/updated` is `false`:
* **ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.

And dynamically generated fields according to chosen `Upsert Schema` using first level of inherit. If object has link to itself, it will be replaced to empty Object to avoid recursive dependencies

<details close markdown="block"><summary><strong>Create product sample </strong></summary>

  ```json
    {
      "taxId": "31249d3e7d2a46839f0e126f40c4a44f",
      "productNumber": "NSP-10272123",
      "stock": 50,
      "name": "Ice Cream Sweatshirt, Grey, Unisex",
      "createdAt": "2022-11-03T13:49:19.509000+00:00",
      "price": [
        {
          "currencyId": "b7d2554b0ce847cd82f3ac9bd1c0dfca",
          "net": 16.799999999999997,
          "gross": 19.99,
          "linked": true,
          "listPrice": null,
          "percentage": null,
          "regulationPrice": null,
          "extensions": []
        }
      ],
      "children": [
        {
          "taxId": "31249d3e7d2a46839f0e126f40c4a44f",
          "productNumber": "NSP-10272321",
          "stock": 50,
          "name": "Ice Cream Sweatshirt, Grey, Unisex",
          "createdAt": "2022-11-03T13:49:19.509000+00:00",
          "price": [
            {
              "currencyId": "b7d2554b0ce847cd82f3ac9bd1c0dfca",
              "net": 16.799999999999997,
              "gross": 19.99,
              "linked": true,
              "listPrice": null,
              "percentage": null,
              "regulationPrice": null,
              "extensions": []
            }
          ]
        }
      ]
    }
  ```
</details>

#### Output Metadata

If `Make GET request after object created/updated` is `true`:
* **ID** - (string, optional): ID of the object to upsert.
And dynamically generated fields according to chosen `Upsert Schema`.
If `Make GET request after object created/updated` is `false`:
* **ID** - (string, optional): ID of the object to upsert.

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

{% include img.html max-width="100%" url="img/lookup-object.png" title="Lookup Object (at most one)" %}

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `Users`.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `id` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

#### Input Metadata

* **Object Type Id** - (string, required unless `Allow criteria to be omitted` is selected): unique identifier of selected `Object Type`

#### Output Metadata

Object with result of lookup as value.

### Make Raw Request

Executes custom request.

{% include img.html max-width="100%" url="img/make-row-request.png" title="Make Raw Request" %}

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.
