---
title: BigCommerce component
layout: component
section: E-Commerce components
description: A component to work with BigCommerce online stores
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

## General information

This is the component for working with BigCommerce online stores on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Purpose

The component allows you to connect to the BigCommerce platform through REST API. For more information about BigCommerce API, visit the [BigCommerce’s official documentation](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api).

## Credentials

To use the BigCommerce connector, you need the following:

### Store hash

Specify your unique ID for store.

### Access Token

The following steps outline how to generate store API Credentials.
1. Navigate to **Advanced Settings > API Accounts > Create API Account.**
1. Give the account a name (it will only be visible to store users).
1. In the **OAuth Scopes** section, select the minimum scopes the app will require.
1. Select **Save**.

[Obtaining store API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials#obtaining-store-api-credentials)

## Triggers

### Get New and Updated Objects

This trigger collects all **new** or **new and modified** objects for selected type and send messages with each of them. First run will collect information for all the time.


#### Config fields

* **Object type to Lookup** - a dropdown list where you should choose the object type, which you want to poll. E.g. `Orders`;
* **Field to poll** - Indicates field to poll (new objects or new and modified objects)

#### Input Metadata

Autogenerated depending from selected Object type

#### Limitations

Each call receive maximum 250 records

## Actions

### Make Raw Request

Executes custom request

#### Config fields

* **Don't throw error on 404 Response** - (boolean, optional) Treat 404 HTTP responses not as error, defaults to `false`.

#### Input field description

* **Method** - (string enum (`GET`,`POST`,`PUT`,`DELETE`, `PATCH`), required): HTTP Verb for the request.
* **URL** - (string, required): Path of the resource relative to the URL base. Mostly starts with API version.
* **Request Body** - (object, optional): Body of the request to send.

#### Output field description

* **Status Code** - (number, required): HTTP status code of the response.
* **Response Body** - (object, optional): JSON representation of the response body from the request.

### Create Object

Creates selected object.
Action creates a single object. Input metadata is stored in the component.

#### Input field description

* **Object type to Create** - a dropdown list where you should choose an object type, which you want to create. E.g. `Product`.

### Update Object

Updates selected object.
Action updates a single object. Input metadata is stored in the component.

#### Input field description

* **Object type to Update** - a dropdown list where you should choose an object type, which you want to create. E.g. `Product`.

#### Limitations

The set of fields to update can be different from the set of fields when the object is creating.

### Delete Object

Deletes selected object by ID.

#### Input field description

* **Object type to Delete** - a dropdown list where you should choose the object type, which you want to delete. E.g. `Product`

#### Metadata description

* **ID** - `string`, BigCommerce object ID

Result is an object with a property **id** in case of successful operation.

### Lookup Object by ID

Lookup an object by ID.

#### Input field description

* **Object type to Lookup** - a dropdown list where you should choose the object type, which you want to lookup. E.g. `Product`
* **Allow ID to be omitted** - checkbox, if checked - ID can be omitted and the empty object will be returned, else - ID is required.
* **Allow zero results** - checkbox, if checked and nothing is found - empty object will be returned, else - action throw an error.

#### Metadata description

* **ID** - `string`, BigCommerce object ID

### Lookup Objects

Lookup objects satisfying specified criteria.

#### Input fields description

* **Object type to Lookup** - a dropdown list where you should choose the object type, which you want to lookup. E.g. `Product`;
* **Output method** - a dropdown list of following values: `Emit all`, `Emit page` and `Emit individually`;
* **Number of search terms** - a text field where you can specify a number of search terms (not less than 0 and not greater than 99). If 0 is specified then all records will be returned.

#### Metadata description

The input metadata can contain different fields depending on the configuration field **Output method** :

**Output method** - `Emit all` or `Emit individually`:
* **Maximum number of records** - an optional positive integer (the default value is 250);

**Output method** - `Emit page`:
* **Page size** - a required integer from the interval [1-250]. It defaults to 250 if a value not from the interval is specified;
* **Page number** - a required non-negative integer (greater than 0); It defaults to 1 if a negative value is specified.

Note that the number of records the component emits may affect the performance of the platform/component.

Groups of fields for each search term go next:

* **Field name** - a string represents a lookup field (a list of allowed values is available);
* **Field value** - a string represents value for selected field.

#### Output

The output data depends on the configuration field **Output method**:  
**Output method** - `Emit all`, `Emit page`: an object with key ```results``` that has an array of records as its value;  
**Output method** - `Emit individually`: a record.

### Lookup Set Of Objects By Unique Criteria

Action to bulk map product SKUs to BigCommerce product IDs

>**Please Note:** If no objects found - error will be thrown

#### Input fields description

* **Object type** - a dropdown list where you should choose the object type, which you want to lookup. E.g. `Products`;
* **Conversion direction** - a dropdown list where you should choose direction for conversion: `SKU -> BigCommerce ID` or `BigCommerce ID -> SKU`;

#### Metadata description

If `Conversion direction` is set to `SKU -> BigCommerce ID`:
* **List of SKUs to map** (array, required) - list of SKUs values to map. E.g `["OLP", "TVBS", "KPZE"]`
If `Conversion direction` is set to `BigCommerce ID -> SKU`:
* **Big Commerce IDs to map** (array, required) - list of IDs values to map. E.g `[23, 34, 45, 56]`

#### Output field description

* **result** (object, required) - An object which contains BigCommerce IDs and SKUs as key value pairs

### Upsert Object

Updates selected object if it is present and can be found by it's ID. Otherwise creates new object with supplied parameters.
Action updates or creates a single object.

#### Config fields

* **Object Type** (string, required). Includes Customers & Orders.
Notice that temporarily this action supports only `Customer` or `Order` object types.
Support for other object types will be added shortly.

#### Input metadata

All required and optional metadata fields, obtained dynamically based on the type of the current `Object`.

#### Output metadata

The object that was created or updated by result of the action.

## Limitations

* Actions except `Make Raw Request`, `Lookup Object (at most 1)`, `Lookup Set Of Objects By Unique Criteria`, `Upsert Object` and trigger `Get New and Updated Objects` are not fully tested, use them on your own risk only.* Between each two term's group of fields implicitly applied "AND" logic.
* The maximum number of `Products` returned is 250.
[More about filtering](https://developer.bigcommerce.com/api-docs/getting-started/filtering)
