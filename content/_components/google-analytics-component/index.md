---
title: Google Analytics component
layout: component
section: Marketing-related components 
description: Google Analytics Component is designed to connect to Google Analytics Data API.
icon: google-analytics.png
icontext: Google Analytics component
category: google-analytics
ComponentVersion: 1.0.0
updatedDate: 2024-09-03
---

## AVA 1.0.1 durable polling correction — 2026-10-30

**Published with conditional requirements #57/#72/#79/#80.** [Exact source](https://github.com/thatapp/connector-google-analytics-component/tree/76187ceef1ae0881ebb092594277a3ba7b4b0737) · [Full report](https://github.com/thatapp/connector-google-analytics-component/blob/76187ceef1ae0881ebb092594277a3ba7b4b0737/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-google-analytics-component/blob/76187ceef1ae0881ebb092594277a3ba7b4b0737/INTAKE.json). This verified tag replaces the defective1.0.0 checkpoint path; older release text below remains historical.

Version3 snapshots store numeric SHA-256 digests, counts and millisecond timestamps. They do not persist or encode raw business rows to evade credential masking. Pending prefixes are fetched again and verified before continuation. Single Page polling can therefore repeat earlier HTTP pages; it is not a one-request-per-invocation promise or a transactional vendor report.

Polling now permits at most50 rows in the complete report and5120 serialized UTF-8 bytes per checkpoint. The entire next checkpoint is checked before any data emission. Oversize reports/state refuse413 and require narrowing or another delivery strategy. These are connector durability limits, not Google API limits.100 HTTP pages including replay,3MiB transient rows and a55-second scheduling budget also apply. Historical10000-row/4MiB durable-state claims are superseded.

Valid bounded legacy v2 state migrates by a complete rescan and saved-prefix verification. Corrupted/redacted v2 refuses409; oversized legacy state refuses413; version1/unknown versions require explicit reset. Resets may replay outputs. Aggregate rescanning remains distinct from an event/object modification feed, with the report's UTC/minute/cohort/alpha-continuation and source-contract limitations.

The publisher verified both runtimes with156 offline tests,45 canonical workers,100 independent actual workers and54 real store round-trips, plus80 source workers/2500 decimal oracles.156 unit tests are not described as sealed-worker runs. The documentation chat checked the remote accepted intake and exact tag; it did not rerun those suites. Host4576be and harnessf05a0c4d remain integration dependencies. Old1.0.0 is immutable. Installation, live OAuth/property permissions and UI acceptance remain unverified.

---

## Known polling defect in AVA 1.0.0 — 2026-10-30

**Polling qualification is restricted by a reproduced checkpoint defect.** A coordinating actual-worker audit reproduced a short-credential defect in published1.0.0: masking its string configuration hash makes a resumed poll fail409. At the time of that audit the correction was under review; the verified1.0.1 release above now supersedes this1.0.0 defect.

This qualification supplements the earlier release evidence below; it does not erase the narrower tests that passed. Installation and live acceptance remain unverified. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) for the reviewed replacement and exact pins. An explicit reset may replay records; no automatic recovery is promised.

---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 OAuth and #72 integration; #80 polling limits and #79 source-contract gaps.** [Published source](https://github.com/thatapp/connector-google-analytics-component/tree/4cab7ab42d25d787a597fba22f4c67397f893076) · [Contract report](https://github.com/thatapp/connector-google-analytics-component/blob/4cab7ab42d25d787a597fba22f4c67397f893076/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-google-analytics-component/blob/4cab7ab42d25d787a597fba22f4c67397f893076/INTAKE.json).

Polling performs bounded complete Analytics report rescans and detects changed aggregate rows, including historical changes within configured Start Time. It is not an event/object modification stream. Raw Request supports same-origin v1beta/v1alpha GET/POST and preserves the statusCode, headers and responseBody envelope. This chat read the immutable report and accepted intake: 129 offline tests, 39 canonical isolated-worker outcomes, allowlist and secret scan passing (33 files). The publisher reports 36 sealed tests, 16 additional actual-worker checks and eight stored-OAuth checks on both runtimes; these supplemental suites were not rerun here.

Version 2 checkpoints contain the completed baseline and optionally pending buffered pages. Null, omitted and empty initial snapshots are supported. Incompatible, corrupted or configuration-mismatched state fails before HTTP; explicit reset may replay prior output. Actual emitted/redacted snapshots were resumed in publisher tests. All report pages must validate before delivery; single-page mode buffers across invocations and emits changes only after completion. Bounds are 10000 rows, 100 HTTP pages per invocation, 3 MiB buffered row JSON, 4 MiB checkpoint and a 55-second scheduling budget. Delivery is not transactional and retries can replay already delivered rows.

Comparisons participate in identity/change detection. Compatible custom ordering preserves numeric precision; current alpha conversion attributes are forwarded with structural checks. Metrics and dimensions use property metadata, with one automatic dateHourMinute dimension. Only UTC-equivalent property timezones and minute-aligned windows are accepted. Non-UTC/DST, sub-minute windows and typed cohort polling explicitly refuse. Raw requests may express cohort reports. A nonempty alpha nextPageToken also refuses because the reviewed request contract lacks its continuation field; no invented pagination is used.

Full rescans suppress unchanged metrics and emit changed or new historical rows. Removed rows do not fabricate deletion events. Offset scans are not frozen vendor snapshots, so same-count concurrent changes can evade consistency checks; later scans can recover stable changes, not every intermediate state. Exactly-once delivery and unbounded retention are not claimed.

The connector consumes host-owned OAuth access tokens. Publisher tests use the actual credential catalog, in-memory auth-client persistence, OAuth start/complete, resolver, verifier and dispatcher. A separate #57 host candidate demonstrates persisted Property ID/configuration and safe GET-401 renewal; report POST-401 is not renewed or replayed under that policy. UI/model-route wiring and real consent/grants remain unverified. POST clean-room previews are paired with positive closed-response fixtures and never count as vendor success.

Four-gate runtime is host `4576be108e21b597d1fbffd4163fb05cd821c834`, harness `c54cbed14ccfcc73e059e7bc1d7801fc134a7187`; stored-OAuth qualification separately pins `3af6acd2b6340e4d46567c3ad2643e428210a9fa`. These candidates are not claimed merged together. This chat independently verified the immutable tag and absence of a main ref.

Installation, deployment, live vendor/account acceptance and UI behavior remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical metadata and reference text below remain for context; the published scope and limitations above supersede conflicting runtime claims.

---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers) 
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling) 
* [Actions](#actions) 
  * [Make Raw Request](#make-raw-request)
* [Known Limitations](#known-limitations)

## Description

Google Analytics Component is designed to connect to Google [Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1).
The current release of component supports `v1beta` and `v1alpha` API versions.

## Credentials

Before building any integration flow you must at first configure the app from inside the [Google Developers Console](https://console.cloud.google.com/).
1. Go to the `APIs & Services` -> `Enabled APIs & services` page and enable the following:
- Google Analytics Data API
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`
3. Create new or link existing [Billing account](https://console.cloud.google.com/billing/) to your project in `Billing` section - it must be valid (Status: active) to use this service

Now you can create new credentials for component:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from `Web application` in `Google Developers Console`
  * **Client Secret** (string, required) - put here `Client Secret` from `Web application` in `Google Developers Console`
  * **Authorization Endpoint** (string, required) - Google oauth2 authorization endpoint `https://accounts.google.com/o/oauth2/auth`
  * **Token Endpoint** (string, required) - Google refresh token endpoint `https://oauth2.googleapis.com/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Google Analytics - `https://www.googleapis.com/auth/analytics`, [more info](https://developers.google.com/identity/protocols/oauth2/scopes#analytics)
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly
* **Property ID** (string, required) - Property ID is a unique identifier that represents a specific Google Analytics property. A property in Google Analytics is where the data for your website, app, or other digital resource is collected and managed. [Where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id#what_is_my_property_id)
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request 
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Triggers 
  
### Get New and Updated Objects Polling 

Retrieve all the updated objects within a given time range.

#### Configuration Fields
* **Method** - (dropdown, required): Select one of the available methods to be executed for data retrieving.
* **Metrics** - (dropdown, required): Specify the metrics to be included in the report. [All available metrics can be found here](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics)
* **Dimensions** - (dropdown, required): Specify the dimensions to be included in the report. By default the dateHourMinute dimension is included in each request for data filtering. [All available dimensions can be found here](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions)
* **Additional Report Attributes** - (string, optional): Specify additional report configurations such as metricFilter, comparisons, etc. It must be a valid JSON Object. Please avoid specifing dataRanges, limit, offset, metrics and dimensions since there are separate fields for them. [All available fields for a request body](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport#request-body)
* **Emit Behavior** - (dropdown, optional, default `Emit individually`): Defines the way result objects will be emitted, one of `Emit page` or `Emit individually`.
* **Page Size** - (number, optional, defaults to 100, max 100): Indicates the size of pages to be fetched per request.
* **Single Page per Interval** - Checkbox: Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.
* **Start Time** - (string, optional): The timestamp to start polling from (inclusive) - using ISO 8601 Date time utc format - YYYY-MM-DDThh:mm:ssZ. Default value is 2015-08-14T00:00:00Z. Cannot be less than 2015-08-14T00:00:00Z.

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

## Actions 

### Make Raw Request 

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

## Known Limitations
The maximum number of selected metrics for a `Get New and Updated Objects Polling` trigger is 10

The maximum number of selected dimensions for a `Get New and Updated Objects Polling` trigger is 8