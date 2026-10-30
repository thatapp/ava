---
title: Facebook component
layout: component
section: Service components
description: Component is designed to connect with Facebook using Graph API.
icon: facebook.png
icontext: Facebook component
category: facebook
updatedDate: 2023-11-30
ComponentVersion: 1.1.0
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72/#80 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-facebook/tree/036b3f8216df6504412a67566ae46e4bddd46cbd) · [Full report](https://github.com/thatapp/connector-facebook/blob/036b3f8216df6504412a67566ae46e4bddd46cbd/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-facebook/blob/036b3f8216df6504412a67566ae46e4bddd46cbd/evidence/precommit-intake-24.json).

All five documented actions are implemented: Delete Object, Lookup Object, Lookup Objects, Make Raw Request and Upsert Object. There are no triggers. New API and OAuth defaults use the captured v26.0 references. Explicit v18.0 routing and schemas remain historical; its preserved official lifecycle capture lists expiry on January 26, 2026. Changing API version does not update a saved custom Auth Client endpoint. OAuth consent, app review, permissions, token lifetime and UI/save behavior remain unverified (#57); reviewed host integration remains #72.

Typed operations cover Product Item/Products. Versioned SDK-derived metadata describes fields and enums, but nested business schemas and provider requiredness are incomplete. Typed reads request 14 core fields; other described output fields require an explicit raw fields query. Lookup filters and field-specific provider behavior remain qualified. Plural lookup buffers and validates all pages before emission, with limits of 100 pages, 10,000 records and 25 MiB. Continuation must preserve the selected catalogue, version, fields, filter and limit; only a forward after cursor may change. Omitted unique-lookup criteria may emit an empty object by explicit implementation choice. Malformed successful responses fail; only unambiguous HTTP 404 or an empty collection follows missing-object options. Ambiguous Graph permission/missing errors remain errors.

Raw requests accept GET, POST and DELETE within the selected Graph version. GET bodies, method/auth overrides and batch/file transport are refused. The complete encoded form is capped at the current host's 1 MiB credential-registration bound. Recorded unsent writes fail with 501; ordinary provider fields named recorded/clean_room are preserved. Graph messages are bounded and credentials redacted. Custom Graph code/subcode properties remain local because the current isolated worker serializes status/message only. These schema, transport and output differences remain #80; sample-only error behavior is not implemented.

The publisher and independent reviewer record final Node 20.20.2/24.13.0 checks: 129 offline tests, 129 sealed tests, 36 canonical worker outcomes, all four intake gates, 57 supplemental actual workers and 32 focused independent recheck workers per runtime, with zero network attempts. The prior 151-check/156-worker broad review is historical, not a newly rerun full review after the malformed-lookup correction. This docs chat read the complete report, verified the accepted packaged intake, exact tag/main state and all eight external final receipt hashes; the suites are attributed to their authors. Source/runtime and all prior evidence remain preserved.

Annotated tag 7bc37167bd032dae97d5ad32cd4e7168a074a6ca peels to the source above. The repository has no main ref; its Draft PR targets the empty feature baseline 987dd89066037d13eec59ed223f8485424f63557. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical material below retains its original release facts.

---

## Description

Facebook Component is designed to connect with facebook using [Graph API](https://developers.facebook.com/docs/graph-api).
The current release of component tested with API `v18.0`.

## Credentials

Before building any integration flow you must at first [Create an App](https://developers.facebook.com/docs/development/create-an-app).

During this process you will need select following options:
- `Other` as a use case
- `None` as app type

After you create the App, go to `Facebook Login` -> `Setting` and provide `Valid OAuth Redirect URIs` as `https://{your-tenant-address}/callback/oauth2`, that can be found [here](/guides/oauth-callback-redirect-url.html)

Now you can create new credentials for the component:

{% include img.html max-width="100%" url="img/facebook-credentials.png" title="Credentials" %}

* **Type** (dropdown, required) - `OAuth2`.
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
    * **Name** (string, required) - provide any name you want.
    * **Client ID** (string, required) - put here `App ID` from `App settings`.
    * **Client Secret** (string, required) - put here `App secret` from `App settings`.
    * **Authorization Endpoint** (string, required) - Facebook OAuth2 authorization endpoint `https://www.facebook.com/v18.0/dialog/oauth`.
    * **Token Endpoint** (string, required) - Facebook refresh token endpoint `https://graph.facebook.com/v18.0/oauth/access_token`.
* **Name Your Credential** (string, required) - provide any name you want.
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Facebook - e.g.`public_profile,email`, [more info](https://developers.facebook.com/docs/facebook-login/permissions/).
* **Additional parameters (Comma-separated list)** (string, required) - Leave it blank.
* **API version** (string, optional, `v18.0` by default) - Version of API you are going to use, look at [Facebook changelog](https://developers.facebook.com/docs/graph-api/changelog) to find out what changes have been made. Format to input: `vXX.X`.

> *Warning: To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Delete Object

Delete the specified object by a provided ID.

#### Configuration fields
- **Object Type** - (string, required): Object type to delete. Currently, the only supported one is - `Product Item`.

- **Emit strategy when no object found** - (dropdown, optional): This specifies the output when no object is found by the provided ID. One of the following:

    - **Emit nothing** - Emit nothing. Just skips an execution.
    > **Please note:** If this option is selected, when retrieving a sample, you will see an error with the following message: `No object found. Execution stopped. This error is only applicable to the Retrieve Sample. In flow executions there will be no error, just an execution skip. This is fine. In a real flow execution, there will be no error`.

    - **Emit an empty object {}** - Emit an empty object, e.g. {}.

    - **Throw an error (Default)** - This is the default option if nothing else is selected.
    
#### Input Metadata
- **Object ID** - (string, required): An ID of an object to delete. Example:
    
```json
{
    "id": "24449301004715980"
}
```

    
#### Output Metadata
- **id** - (string, optional): An ID of an object deleted.


### Lookup Object (at most one)
Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields
- **Object Type** - (string, required): Object type to lookup on. Currently, the only supported one is - `Product Item`
- **Lookup Criteria** - (dropdown, required): A list of object parameters that can uniquely identify the object in the database.
- **Allow criteria to be omitted** - (boolean, optional): If selected, the field `Lookup Criteria Value` becomes optional.
- **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing an error.

#### Input Metadata
- **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.
- If **Lookup Criteria** set to `Retailer ID` there will be one more additional field:
    - **Product Catalog ID** - (string, required unless `Allow criteria to be omitted` is selected): ID of the catalog where you want to find a product.
    > **Please note:** [Where to get Product Catalog ID](#product-catalog-id).

#### Output Metadata
Object with the result of lookup as a value.


### Lookup Objects (plural)
Lookup a set of objects by a defined criteria list. Can be emitted in different ways.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object type to lookup on. E.g `Products`.
- **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page`, `Emit individually`, `Emit all`.
    > **Please note:** Avoid using `Emit all` if you're going to retrieve a lot of objects.
- **Number of search terms** - text field to specify a number of search terms (positive integer number `[1-99]` or `0`).
- **Expert Mode for Filter Expression** - (checkbox): if checked, any filter expression can be entered in metadata field. `Filter Expression`. For advanced users. Otherwise, enter your search criteria in the appropriate metadata field.
- **Page Size** - (number, optional, defaults to 100, max 100): Indicates the size of pages to be fetched per search request.

#### Input Metadata
- If **Object Type** set to `Products`:
    - **Product Catalog ID**  (string, required): ID of the catalog where you want to search products.
    > **Please note:** [Where to get Product Catalog ID](#product-catalog-id).
- If configuration field `Expert Mode for Filter Expression` is enabled:
    - **Filter Expression** - (strings, required): any filter expression can be entered in metadata field `Filter Expression` (without `$filter=`). For advanced users. Example: `{"retailer_id":{"neq":"3514654651"}}`.
- If configuration field `Expert Mode for Filter Expression` is disabled: Depend on configuration field `Number of search terms`. If = `N` - N search term will be generated, if = `0` - any search term will be generated.
Each search term contains following fields:
    - **Field name** (strings, required) - Name of the field you need to filter.
    - **Condition** (strings, required) - Condition of field selected above, one of:
        - `contains` - match a query string.
        - `not_contains` - do not match a query string.
        - `eq` - exactly match a query value.
        - `neq` - do not exactly match a query value.
        - `lt` - less than a numeric query value.
        - `lte` - less than or equal to a numeric query value.
        - `gt` - greater than a numeric query value.
        - `gte` - greater than or equal to a numeric query value.
        - `starts_with` - string that starts with the query string. This filter option is only available for the product category field.
    - **Field value** (strings, required) - matching value for selected field and condition.
If search terms is more than one, there will be logical operator added, to combine terms:
    - **Logical operator** (strings, optional, default `and`) - one of "`and, or`"
    
Example for `Number of search terms = 2`:
```json
{
"sTerm_1": {
    "fieldName": "retailer_id",
    "condition": "neq",
    "fieldValue": "3514654651"
  },
  "sTerm_2": {
    "fieldName": "brand",
    "condition": "eq",
    "fieldValue": "Instagram"
  },
  "operator": "and"
}
```

#### Output Metadata
- For `Emit Page` and `Emit all` mode: An object with key `results` that has an array as its value.
- For `Emit Individually` mode: Each object which fill the entire message.


### Make Raw Request

Executes custom request.

#### Configuration Fields

There is no configuration fields in this action.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL `https://graph.facebook.com/{API version}/`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object
Updates an existing or creates a new object.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object type to upsert. Currently the only supported one is - `Product Item`.
- **Create or update existing object** - (dropdown, required): Select operation type.

#### Input Metadata
- If `Create new` operation is selected and **Object Type** is set to `Product Item`:
    - **Product Catalog ID** - (string, required): ID of the catalog where you want to create a product.
    > **Please note:** [Where to get Product Catalog ID](#product-catalog-id)
    - All other fields according to chosen object `Object Type`.

- If `Update existing` operation is selected and **Object Type** is set to `Product Item`:
    - **Product Item ID** - (string, required): ID of the product item.
    - All other fields according to chosen `Object Type`.

### Output Metadata
Result object from upsert.


## Additional Info
### Product Catalog ID
To find your Product Catalog ID:
- Go to your Business [Manager subsection](https://business.facebook.com/) - [Commerce Manager](https://business.facebook.com/commerce/)
- At the bottom right you will see the list of the catalogs with it's ID's.

{% include img.html max-width="100%" url="img/product_catalog_id.png" title="Credentials" %}
