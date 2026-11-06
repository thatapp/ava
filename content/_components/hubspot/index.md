---
title: HubSpot component
layout: component
section: CRM components
description: Hubspot component is designed to connect to the Hubspot API.
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2026-07-01
ComponentVersion: 1.7.1
redirect_from:
  - /components/hubspot-component
  - /components/hubspot-component/actions
  - /components/hubspot-component/triggers
---

## AVA 1.0.2 checkpoint correction — 2026-10-30

**Published 1.0.2 replaces the older polling checkpoints; existing conditional requirements remain.** [Exact source](https://github.com/thatapp/connector-hubspot/tree/20b4cce794da5dc9f92657de46d403fccaaa6590) · [Report](https://github.com/thatapp/connector-hubspot/blob/20b4cce794da5dc9f92657de46d403fccaaa6590/REPORT.md) · [Intake](https://github.com/thatapp/connector-hubspot/blob/20b4cce794da5dc9f92657de46d403fccaaa6590/INTAKE.json).

Actual host workers reproduced string-checkpoint corruption in 1.0.1 with short synthetic credentials. Version 1.0.2 emits version-2 checkpoints with 32 numeric SHA-256 bytes, requiring every byte to be an own integer at the expected index. Sparse arrays cannot bypass state/configuration validation. Valid uncorrupted legacy version-1 checkpoints migrate on the next emission; already masked state needs an explicit reset and can replay records. Component, package and lock metadata now all identify 1.0.2; 1.0.1 had retained component version 1.0.0.

The final committed source passes 84 offline tests, 55 canonical actual-worker outcomes, allowlist, secret scan (74 files) and standalone hostcheck on both supported runtimes. Fourteen supplemental state workers cover initial state, short-token resume and sparse refusals. Independent bounded review ran 49 actual workers and 84 unit tests per runtime, then repeated against exact LF Git bytes after documenting a CRLF review-archive difference. Zero network attempts. These checks concern checkpoint/version behavior, not complete HubSpot vendor parity.

Host `4576be108e21b597d1fbffd4163fb05cd821c834` and harness `f05a0c4d81f8b79dde6912da8b2b8f8384b40cf7` remain the qualification pins. Tags 1.0.0/1.0.1 and main remain immutable. OAuth, environment settings, recording, deprecated webhook, scoped file storage and the original polling bounds/limitations remain conditional under #57/#58/#72/#74/#75/#80. Installation and live account behavior remain **UNVERIFIED**. Earlier release descriptions below are historical and do not override this correction.

---

## AVA 1.0.1 polling correction — 2026-10-30

**Published 1.0.1 replaces the defective 1.0.0 polling path; existing conditional host requirements remain.** [Exact source](https://github.com/thatapp/connector-hubspot/tree/491571cc0590cbe60e216656997b37ba9779ca83) · [Report](https://github.com/thatapp/connector-hubspot/blob/491571cc0590cbe60e216656997b37ba9779ca83/REPORT.md) · [Intake](https://github.com/thatapp/connector-hubspot/blob/491571cc0590cbe60e216656997b37ba9779ca83/INTAKE.json).

This chat reproduced 1.0.0 failure with null or omitted snapshots, then corrected null initial state without accepting malformed or incompatible checkpoints. The final 1.0.1 commit passes 74 offline tests, 53 canonical actual-worker outcomes, allowlist and secret scan (59 files) on Node 20.20.2 and 24.13.0. Seven direct worker probes per runtime cover null/omitted/empty state and four invalid-state controls. Hostcheck passes. Runtime host is `4576be108e21b597d1fbffd4163fb05cd821c834`; corrected harness `f05a0c4d81f8b79dde6912da8b2b8f8384b40cf7` preserves explicit null and omits absent snapshot instead of substituting an object. Zero network attempts; no real credentials or customer data.

The immutable 1.0.0 tag and main branch are unchanged. Its scope and original receipts below are historical; they do not establish initial-state correctness. Version 1.0.1 fixes that defect only. OAuth, environment delivery, inbound webhook, scoped storage and other polling qualifications remain. Installation and live vendor behavior remain UNVERIFIED.

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 credentials/OAuth and #75 binary transport/scoped storage; custom environment #58, deprecated webhook #74 and polling limitations #80 remain qualified**. [Published source](https://github.com/thatapp/connector-hubspot/tree/6479855a0bcb20ace70af2ed0b4d3763412531e1) · [Contract report](https://github.com/thatapp/connector-hubspot/blob/6479855a0bcb20ace70af2ed0b4d3763412531e1/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-hubspot/blob/6479855a0bcb20ace70af2ed0b4d3763412531e1/INTAKE.json).

71 offline tests and 35 exact fixture cases pass, with 53 actual isolated-worker executions. Both Node 20.20.2 and 24.13.0 pass the four intake gates: tests, the real sealed loader/context, require allowlist and secret scan. Five additional checks cover multipart bytes, scoped attachment integrity and clean-room behavior (four worker executions and one parent-capability scope probe). The source and evidence links pin commit `6479855a0bcb20ace70af2ed0b4d3763412531e1`; offline checks do not establish installation or live account behavior.

The release supplies the eight actions listed below and Get New and Updated Objects. HubSpot REST routes use API version 2026-09. The old OIH contact-only implementation is archived in the source repository. Service Key takes precedence over a host-managed OAuth access token. Verification reads one owner and needs `crm.objects.owners.read`; OAuth also needs `oauth` and the object/schema/file scopes used by your flow. OAuth clients, scopes and renewal are host-owned.

Upsert uses properties at the input root and dynamic metadata. A supplied existing ID updates, a missing email/custom unique value creates, and a nonexistent HubSpot ID fails; omit HubSpot ID to create. Email identifies Contacts only. Lookup Set accepts `idValues` (1–100) and emits `{results: [...]}` only after every member is found. Allowed ID omission emits `{}` without a request. Page lookup uses a zero-based page number and emits `totalCountOfMatchingResults` without the historical stray asterisk.

Custom file inputs retain all nine documented upload fields. Files are fetched anonymously over HTTPS and uploaded as multipart; the returned HubSpot file ID is stored in the property. Downloads preserve that ID and add `attachments.<property>[]` with scoped host references, not public URLs. They need an explicitly provisioned host storage adapter. Limits are 20 files and 4 MiB aggregate per step; TTL supports P1D–P365D. Legacy URL-valued file properties are refused. Partial file uploads cannot be rolled back transactionally.

Raw Request emits `{statusCode, headers, body}`, stays on `https://api.hubapi.com`, and treats 404 as a response unless configured to throw. Create Association uses the default unlabelled association; Remove Association removes all associations between the pair. Delete Object archives the record and returns its actual ID; it is not GDPR erasure.

Search retains the documented three AND criteria and page size at most 100. Fetch-all fails beyond 100 pages/10000 results, the vendor 3000-character search request limit, or the 4 MiB aggregate output bound. Metadata includes non-sensitive properties only. No custom object types are added beyond the documented selections.

Polling collects complete bounded results before awaited emissions and one snapshot. Max amount of Polling Pages overrides Single Page per Interval. A limited execution retains its fixed window and offset; timestamp renewal defers the last timestamp group, and an unpageable group fails without advancing state. Page mode emits batches no larger than the polling page size. Reset the snapshot after changing the account or polling configuration.

The historical guarantee of no missed or duplicate records is too strong: HubSpot search indexing is delayed and offset pages can change during a window. Timestamp groups spanning executions may repeat at renewal. This action is not a lossless audit/change stream. `REQUEST_MAX_RETRY` defaults to 3, capped at 10, and retries only 429 or GET 5xx responses with bounded delays; ambiguous writes are never retried. `RENEW_LIMIT` defaults to 9800 and accepts 1–9999. Custom environment delivery requires host #58.

Deprecated Webhook is withheld pending host #74 and the separate HubSpot Webhook connector. Shared host prerequisites and the installation hand-off remain in the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Production OAuth, attachment storage, vendor permissions, UI rendering and deployment are **UNVERIFIED**. No real credentials or customer data were used.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting setup, behavior and availability claims. Historical release facts remain preserved.

---

## Table of Contents

* [General information](#general-information)
  * [Description](#description)
  * [Completeness Matrix](/components/hubspot/technical-notes.html#completeness-matrix)
  * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects](#get-new-and-updated-objects)
  * [Deprecated triggers](#webhook-deprecated)
* [Actions](#actions)
  * [Raw Request](#raw-request)
  * [Upsert Object](#upsert-object)
  * [Lookup Set Of Objects By Unique Criteria](#lookup-set-of-objects-by-unique-criteria)
  * [Lookup Object (at most one)](#lookup-object-at-most-one)
  * [Lookup Objects (Plural)](#lookup-objects-plural)
  * [Create Association](#create-association)
  * [Remove Association](#remove-association)
  * [Delete Object](#delete-object)
* [Known Limitations](#known-limitations)

## General information

### Description

Hubspot component is designed to connect to the [Hubspot API](https://developers.hubspot.com/docs/reference/api/overview).

### Environment variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `REQUEST_MAX_RETRY` | false | Specifies how many times the system retries a failed API request (default: 3) | any `integer` above 0 |
|`RENEW_LIMIT`| false | Maximum number of records retrieved by the `Get New and Updated Objects` trigger before advancing the start date (default: 9800) | any `integer` above 0 and less than 10000|

## Credentials

The component supports two authentication mechanisms:
1. **Service Keys (Beta)**
2. **OAuth 2.0 (Standard)**

If a **Service Key (Beta)** is provided, the component will use it directly and bypass the OAuth 2.0 flow. If it is left empty, the component will use standard OAuth 2.0.

### 1. Service Keys (Beta)

Provide your HubSpot Service Key in the **Service Key (Beta)** field. Service Keys are static token keys managed at the HubSpot account level. For more details, see the [HubSpot Account Service Keys Documentation](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys).

{% include img.html max-width="100%" url="img/hubspot-credentials-noauth.png" title="No Auth" %}

> **Please Note:**
* If you select the **OAuth 2.0** credential type on the platform but provide a Service Key, you must still provide a valid Auth Client, scopes, and pass the OAuth authentication flow to save the credentials. However, the component will prioritize and use your Service Key for all HubSpot API access, bypassing the OAuth token.
* To use this option, you must create a Service Key in your HubSpot portal (under **Settings > Integrations > Service Keys** or **Development > Keys > Service keys**).
* Ensure you configure the appropriate scopes when creating your Service Key. For example:
    - `crm.objects.contacts.read`
    - `crm.objects.contacts.write`
* No OAuth Client ID, Secret, redirect URLs, or OAuth login flow is required when using a Service Key.

### 2. OAuth 2.0

Before you can make it work on our platform you MUST create an OAuth2 App on HubSpot side.

The HubSpot documentation already contains a detailed explanation of the process and we encourage you to [follow it](https://developers.hubspot.com/docs/api/working-with-oauth).

> **Please Note:** After granting access, you should be redirected back to our platform via a `redirect_url`. To do this, you will need to provide our [OAuth Callback Redirect URL](/guides/oauth-callback-redirect-url).

{% include img.html max-width="100%" url="img/hubspot-credentials-screen.png" title="Oauth2" %}

**1.** During the OAuth2 App creation you would need to select an existing Auth Client from the drop-down list **Choose Auth Client** or create the new one. Next you MUST specify the following fields:

| Field name | Mandatory | Description |
|----|---------|-----------|
|Name| true | A name for your Auth Client (can be any value) |
|Client ID| true | OAuth Client ID (provided by HubSpot) |
|Client Secret| true | OAuth Client Secret (provided by HubSpot) |
|Authorization Endpoint| true | OAuth authorization endpoint. ex: <br>`https://app-eu1.hubspot.com/oauth/authorize`
|Token Endpoint| true | OAuth Token endpoint for refreshing the access token: <br>`https://api.hubapi.com/oauth/v1/token`|

{% include img.html max-width="100%" url="img/auth-settings.png" title="Hubspot Auth settings" %}

**2.**  Fill-in the field **Name Your Credential** (any).

{% include img.html max-width="50%" url="img/hubspot-oauth2.png" title="OAuth2" %}

**3.**  Fill-in the field **Scopes** like: 
```
crm.objects.contacts.read crm.objects.contacts.write crm.schemas.contacts.read oauth
```
{% include img.html max-width="100%" url="img/scopes.png" title="Hubspot scopes" %}

> **Please Note:** 
  * Scopes must be the same as provided during app creation in Hubspot, use a space-separated list (not comma-separated).
  * The scope `oauth` is always required for verification and must be included in the scopes list for all app installs.
  * The scope `crm.objects.owners.read` is always required for credential verification.
  * The required scopes for your integration depend on the types of HubSpot objects your flow will access. You must ensure that all scopes necessary to access the specific object types you want to retrieve or modify are included in this list.
  * **Required scopes** must always be included in the OAuth `scope` parameter for your app to work correctly.
  * **Conditionally required** scopes depend on which HubSpot objects or features your app accesses. For instance, if your flow retrieves contacts, you must include contact-related scopes like `crm.objects.contacts.read`.

{% include img.html max-width="100%" url="img/credential-scopes.png" title="Credential scopes" %}

**4.**  Click on **Authenticate** button - if you have not logged into HubSpot before, then log in by entering data in the login window that appears

**5.** Click on **Verify** button for verifying your credentials

**6.** Click on **Save** button for saving your credentials.

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

### User Permissions

The user who authorizes the component (i.e., logs in during the OAuth flow) must have the necessary HubSpot user permissions to access the HubSpot objects your flow will handle.

To verify and manage user permissions, users can refer to the official [HubSpot guide on user permissions and roles](https://knowledge.hubspot.com/user-management/hubspot-user-permissions-guide).

If the authorizing user lacks permissions for certain objects, your flow may fail or return authorization errors.

## Triggers

### Get New and Updated Objects

Retrieves new or modified objects in HubSpot based on a polling mechanism.

### Configuration Fields

* **Object Type** Dropdown: Specifies the type of object to retrieve.
* **Emit behavior** Dropdown: Determines whether to emit each object individually or emit them in a batch (by page).
* **Field to poll** Dropdown: The field to use for detecting new or updated records.
* **Start Time** - TextField (string, optional): The starting point in time to begin retrieving events.
* **End Time** - TextField (string, optional, defaults to never): If set, records modified after this time will not be retrieved.
* **Size of Polling Page** - TextField (optional, positive integer, max 100, defaults to 100): Indicates the page size to be fetched.
* **Single Page per Interval** - Checkbox: When selected, if the number of records exceeds the page limit, the connector will wait until the next polling interval to fetch additional pages. This is ignored if `Max Amount of Polling Pages` is set.
* **Max amount of Polling Pages** - TextField (optional, positive integer, max 1000, defaults to 1000): Maximum number of pages to fetch per execution.

#### Input Metadata

None

#### Output Metadata

- For `Fetch page`: An object with a ***results*** key containing an array of records.
- For `Emit Individually`: Each object fills the entire message.

#### Limitations

After retrieving **9800** records, the connector will take the highest value of the selected Field to Poll from the last polling page and use it as the `Start Time` for the next polling cycle.
Records with exactly that timestamp will be excluded from the current iteration and included in the next one to avoid duplicates and ensure no records are missed.

### Webhook (deprecated)

> This trigger is deprecated. Please use [HubSpot Webhook component](/components/hubspot-webhook/) instead.

Receive data from HubSpot based on configured [webhooks](https://developers.hubspot.com/docs/api/webhooks).

### Configuration Fields

**Client secret** - Provide the Client secret from the HubSpot application here otherwise you will get an error during the webhook requests in case of incorrect or missing value.

#### Output Metadata

Triggered object from HubSpot.

## Actions

### Raw Request

Executes custom request.

{% include img.html max-width="100%" url="img/raw-request.png" title="Raw Request" %}

#### Configuration Fields

* **Throw Error on 404 Response** - (optional) Configures the handling of 404 HTTP responses as non-errors. The default is `false`.

#### Input Metadata

* **Url** - Path of the resource relative to the base URL (https://api.hubapi.com), required.
* **Method** - Allowed values are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, required. HTTP verb to use in the request.
* **Request Body** - The body content for the request.

### Upsert Object

Performs an upsert (update or create) operation on an object in HubSpot.

{% include img.html max-width="100%" url="img/upsert-object.png" title="Upsert" %}

#### Configuration Fields

* **Object type** - The type of object to upsert ("Companies", "Contacts", "Deals", "Line Items", "Tickets")
* **ID to Search On** - Choose the field used for identification (e.g., "HubSpot ID", "Email").
>**Please Note:** "Email" is valid only for the Contacts object type.

#### Input Metadata

Metadata is generated dynamically based on the selected object type and fields.

For each custom file field, an input object is generated to upload a file for that field. The object includes the following fields:

* Attachment URL (URL containing the file contents to upload)
* Folder Path
* File Name
* Charset Hunch
* Access 
* TTL 
* Overwrite 
* Duplicate Validation Strategy 
* Duplicate Validation Scope

Files are uploaded using the [Hubspot Files API](https://developers.hubspot.com/docs/api/files/files).

### Lookup Set Of Objects By Unique Criteria

Looks up a set of objects in HubSpot using a unique field.
All specified items must be found, otherwise, an error will be thrown.

{% include img.html max-width="100%" url="img/lookup-set-of-objects.png" title="Lookup Set Of Objects By Unique Criteria" %}

#### Configuration Fields

* **Object type** - Select the object type to look up ("Companies", "Contacts", "Deals", "Line Items", "Tickets", "Quotes").
* **ID to Search On** - Choose the field used for identification (e.g., "HubSpot ID", "Email").
>**Please Note:** "Email" is valid only for the Contacts object type.
* **Enable download attachments** -  Enable downloading of attachments from fields of type `file`.

#### Input Metadata

An array of ID values to look up.

#### Output Metadata

Returns the matched objects.

### Lookup Object (at most one)

Retrieves a single object from HubSpot using a unique field.

{% include img.html max-width="100%" url="img/lookup-object-at-most-one.png" title="Lookup Object (at most one)" %}

#### Configuration Fields

* **Object Type** Dropdown: Select the type of object to look up.
* **ID to Search On** Dropdown: Select the unique field used for lookup.
* **Allow ID to be omitted** Checkbox: When enabled, the ID field becomes optional. If disabled, the field is required.
* **Allow zero results** Checkbox: When enabled, an empty object {} is emitted if no match is found. If disabled, an error will be thrown when no results are found.
* **Enable download attachments** - Enable downloading of attachments from fields of type `file`.

#### Input Metadata

**ID value** Text field: The value to use for the ID to Search On field (must be a unique value).

#### Output Metadata

Returns the matched object, or an empty object {} if no match is found and Allow zero results is enabled.

### Lookup Objects (Plural)

Looks up a set of objects based on a defined list of criteria. The results can be emitted in different ways.

{% include img.html max-width="100%" url="img/lookup-objects.png" title="Lookup Objects (Plural)" %}

#### Configuration Fields

* **Object Type** Dropdown: Select the type of object to search for.
* **Behaviour** Dropdown with options: `Fetch all`, `Fetch page`, `Emit individually`, required.
* **Enable download attachments** - Enable downloading of attachments from fields of type `file`.

#### Input Metadata

**Search Criteria** Array: An array of search terms combined using the `AND` operator.

> **Please note:** HubSpot supports up to three criteria.

Example:
Records created after *'2021-10-01T03:30:17.883Z'* where the *'firstname'* property contains *'Tony'*

```
["createdate GT 1633059017883", "firstname CONTAINS_TOKEN Tony"]
```

Supported operators:

| OPERATOR | DESCRIPTION |
| ---- | ------ |
| `EQ` | equal to |
| `NEQ` | not equal to |
| `LT` | less than |
| `LTE` | less than or equal to |
| `GT` | greater than |
| `GTE` | greater than or equal to |
| `HAS_PROPERTY` | has property value |
| `NOT_HAS_PROPERTY` | does not have property value |
| `CONTAINS_TOKEN` | contains token |
| `NOT_CONTAINS_TOKEN` | does not contain token |

If selected `Fetch page` additional metadata fields:
*   **Page Size** - Number of records to retrieve, limit - 100.
*   **Page Number** - Number of pages to skip.
*   **Order** - Order direction, **ASCENDING** or **DESCENDING**

Order example:

```
'createdate DESCENDING'
```

#### Output Metadata

*   For `Fetch page`: An object with:
    *   key `results` that has an array as its value.
    *   key `*totalCountOfMatchingResults` containing the total number of results (not just on the page) matching the search criteria.
*   For `Fetch All`:  An object with the `results` key containing all matched records.
*   For `Emit Individually`:  Each object fill the entire message.

### Create Association

Creates an association between two HubSpot objects.

{% include img.html max-width="100%" url="img/create-associations.png" title="Create Association" %}

#### Configuration Fields

*   **From Object Type** dropdown: Choose an object type to create association.
*   **To Object Type** dropdown: Choose an object type to associate to.

> **Please note**: We do not retrieve objects to associate dynamically. Check the
> HubSpot documentation to verify that the association between selected objects is possible.

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to create association.
*   **To Object ID** - id of associated object.

#### Output Metadata

An object containing the `statusCode` key, representing the result of the request.

### Remove Association

Removes an association between two HubSpot objects.

{% include img.html max-width="100%" url="img/remove-associations.png" title="Remove Association" %}

#### Configuration Fields

*   **From Object Type** dropdown: Choose from which object to remove association.
*   **To Object Type** dropdown: Choose to which object.

> **Please note**: We do not retrieve objects to associate dynamically. Check the
> HubSpot documentation to verify that the association between selected objects is possible.

#### Input Metadata

*   **From Object ID** - HubSpot id of object which needs to remove association.
*   **To Object ID** - id of associated object.

#### Output Metadata

An object containing the `statusCode` key, representing the result of the request.

### Delete Object

Deletes a single object using a unique identifier.

{% include img.html max-width="100%" url="img/delete-object.png" title="Delete Object" %}

#### Configuration Fields

*   **Object Type** dropdown: Indicates Object Type to find.
*   **ID to Search On** dropdown: Indicates unique field to search on.

#### Input Metadata

**ID value** text field: value for `ID to Search On` (unique field value by itself).

#### Output Metadata

The expected output is an object with a `id` property. `id` value stands for id of delete object.

## Known Limitations

1.  [Rate Limits](https://developers.hubspot.com/docs/api/usage-details#rate-limits).
2.  Please use a delay (around 5 seconds) if you are implementing a flow sequence such as `Upsert Object Action` followed by any `Lookup Object(s) Action` with "Enable download attachments" enabled. Because file uploads to HubSpot are processed asynchronously and take some time, a lookup triggered immediately after an upsert may return a 404 error.