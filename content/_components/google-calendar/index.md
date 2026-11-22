---
layout: component
title: Google Calendar component
section: Office components
description: Google Calendar Component is designed to connect to the Google Calendar API.
icon: google-calendar.png
icontext: Google Calendar component
category: google-calendar
ComponentVersion: 1.0.0
updatedDate: 2026-02-11
---

## AVA 1.0.1 verified source publication — 2026-10-30

**PUBLISHED 1.0.1 initial/numeric polling correction; conditional #57/#72/#80.** [Exact source](https://github.com/thatapp/connector-google-calendar/tree/987fe5b867e1a1a7e1741a6de8a4e0548b76cf62) · [Full contract report](https://github.com/thatapp/connector-google-calendar/blob/987fe5b867e1a1a7e1741a6de8a4e0548b76cf62/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-google-calendar/blob/987fe5b867e1a1a7e1741a6de8a4e0548b76cf62/INTAKE.json).

Version1.0.1 fixes null/omitted initial polling state and string-checkpoint corruption under short credentials. Numeric version2 millisecond state is authoritative; legacy strings are informational and may be masked. Valid legacy state migrates. Malformed/partial numeric state fails before HTTP; already-corrupted legacy-only state requires a known valid checkpoint or an explicit reset. Configured pre-1970 starts and genuine negative/epoch watermarks are preserved.

The same five Event actions and polling trigger remain. Rollback to a string-only implementation requires a deliberate state-conversion/restart decision. Bounded timestamp polling is not an exactly-once change stream. OAuth integration and operational qualification remain conditional even though synthetic catalog/OAuth/AES/resolver tests pass.

Publisher evidence on Node20.20.2/24.13.0 reports111 offline tests,112 sealed tests,27 canonical workers,23 direct initial-state outcomes and45 numeric workers; independent review reran42 actual workers per runtime. The packaged intake scans62 files. Both runtime pins and immutable old1.0.0 references are retained in the report.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

## Initial polling defect in 1.0.0 — 2026-10-30

**First-run polling is blocked under #80.** The coordinated publisher reproduced failure with null or omitted initial snapshots on Node 20.20.2 and 24.13.0 using the actual isolated host, synthetic replies and zero network. An explicit empty-object snapshot succeeds. The earlier fixture harness substituted an empty object, so the historical passing intake did not prove the first-run boundary. The immutable 1.0.0 tag remains preserved; a separately tagged patch requires fresh intake. Follow [#62](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) for the qualified replacement. This documentation chat read the publisher's finding; it did not rerun these two connectors.

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED; first-run polling BLOCKED #80; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-google-calendar/tree/35be581702443f31927072be2a01b769022b8040) · [Release scope](https://github.com/thatapp/connector-google-calendar/blob/35be581702443f31927072be2a01b769022b8040/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/0fbb6b5b4d40c9c60491ffc8b5f73f590203dd3f/docs/ipaas/connector-submissions/google-calendar-evidence/intake-standalone.json).

53 offline npm tests and 11 exact isolated-worker outcomes pass; the additional sealed suite has 54 tests including a matrix of 28 host outcomes. Require allowlist and secret scan pass with zero network attempts. Host `1cfd955f35804ddc03a134c048fe70f741f5c84a` and harness `8cd83582eef099b47cf044cee1b9a560c90ba300` are pinned. The harness supplies a test-only clock to verify exact millisecond checkpoints without changing production polling or timers.

The scope is five actions and one polling trigger for Events. Lookup/delete require calendar and event IDs. Upsert with an event ID PATCHes; without one it POSTs a new event. A failed update does not silently create. Raw GET/POST/PATCH/DELETE stays on the Google Calendar origin, supports optional 404 handling and returns actual status, headers and body. Recorded mutations refuse an unsent vendor success.

Event fields come from the official Discovery schema, revision 20261026. The documented page-size range remains 1–100/default 100. List operations collect and deduplicate before emission, bounded to 100 pages, 5,000 events and 25 MiB; exceeding a bound fails without advancing a checkpoint. PATCH replaces supplied arrays rather than appending.

Polling supports created/updated only and filters cancelled/deleted events. Created polling scans the bounded collection; updated polling uses updatedMin plus client filtering. The lower timestamp is exclusive and the upper timestamp is fixed at invocation time. Snapshots advance only after complete successful emission, including successful empty polls. Late arrivals at consumed timestamps can be missed; exactly-once delivery is not promised.

The connector consumes host-owned OAuth access tokens and does not refresh them. Consent, grants and UI rendering remain unverified. No extra saved vendor configuration is needed at execution, so the supplemental OAuth-config propagation blocker does not apply to this scoped release. Source and standalone gate receipts are in the pinned sibling evidence directory above.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id) 
  * [Lookup Objects (plural)](#lookup-objects-plural) 
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object) 
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)

## Description

Google Calendar Component is designed to connect to the [Google Calendar API](https://developers.google.com/workspace/calendar/api/v3/reference). The current release of the component supports Google Calendar API v3.

## Credentials

Before building any integration flow you must at first configure the app from inside the [Google Developers Console](https://console.cloud.google.com/).
1. Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the following:
-  Google Calendar API 
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized [redirect URI](/guides/oauth-callback-redirect-url.html) as: `https://{your-tenant-address}/callback/oauth2`

Now you can create new credentials for the component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Web application` in `Google Developers Console`
  * **Client Secret** (string, required) - put here `Client Secret` from `Web application` in `Google Developers Console`
  * **Authorization Endpoint** (string, required) - Google oauth2 authorization endpoint `https://accounts.google.com/o/oauth2/v2/auth`
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Google Calendar - `https://www.googleapis.com/auth/calendar`
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly

## Actions

### Delete Object By ID

Deletes a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): The object type to delete (e.g., `Event`).

#### Input Metadata

Required fields will be dynamically generated based on the selected Object Type.

#### Output Metadata

Returns the id of the deleted object.

### Lookup Object By ID

Retrieve a single object by its ID.

#### Configuration Fields

* **Object Type** - (string, required): The object type to look up (e.g., `Event`).

#### Input Metadata

Required fields will be dynamically generated based on the selected Object Type.

#### Output Metadata

An object containing the lookup result as its value.

### Lookup Objects (plural)

Looks up a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up (e.g., `Event`).
* **Emit Behavior** - (dropdown, required): Defines how result objects are emitted. Options: `Emit page` or `Emit individually`.
* **Page Size** - (integer, optional, 100 by default): The number of records to be fetched per API call. Must be a positive integer, maximum 100.

#### Input Metadata

Contains the fields used to identify the objects. If no fields are available, no input metadata is provided.

#### Output Metadata
For `Emit Page` mode: An object with key `results` that has an array as its value.

For `Emit Individually` mode: Each object fills the entire message.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL. Here comes a part of the path that goes after `https://www.googleapis.com/calendar/v3`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PATCH`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object 

Creates a new object or updates an existing one, depending on whether the unique identifier field is provided.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to upsert (e.g., `Event`).

#### Input Metadata

* Unique field used to identify the object to be updated
* Additional fields generated dynamically based on the selected `Object Type`.

#### Output Metadata

The object returned from the upsert operation.

## Triggers

### Get New and Updated Objects Polling

Retrieve all the new and updated objects within a given time range. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up (e.g., `Event`).
* **Calendar Id** - (string, required): Calendar identifier.
* **Event Types** - (dropdown, optional): Event types to return. If unset, returns all event types.
* **Time stamp field to poll on** - (dropdown, required): The event date field used to track changes.
* **Emit Behavior** - (dropdown, required): Defines how result objects are emitted. Options: `Emit page` or `Emit individually`.
* **Page Size** - (integer, optional, 100 by default): The number of records to be fetched per API call. Must be a positive integer, maximum 100.
* **Start Time** - (string, optional): The exclusive start time for polling, in the format \"YYYY-MM-DD[T]HH:MM:SS[Z]\" where [] wraps a fixed character value. Defaults to 1970-01-01T00:00:00Z

#### Input Metadata

None.

#### Output Metadata

For `Emit Page` mode: An object with key `results` that has an array as its value.

For `Emit Individually` mode: Each object fills the entire message.

#### Known Limitations

* Deleted events are always excluded from the response.