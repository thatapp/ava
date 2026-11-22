---
title: Klaviyo component
layout: component
section: Marketing-related components
description: The Klaviyo Component provides a simple way to interact with the Klaviyo API, enabling efficient integration with Klaviyo’s powerful features.
icon: klaviyo.png
icontext: Klaviyo component
category: klaviyo
ComponentVersion: 1.0.0
updatedDate: 2024-12-04
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72 encoded credential recording**. [Published source](https://github.com/thatapp/connector-klaviyo-component/tree/df3d81d3c70644aed52db0034adf0a289f56014e) · [Release scope](https://github.com/thatapp/connector-klaviyo-component/blob/df3d81d3c70644aed52db0034adf0a289f56014e/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/e624e8dd9d8b5bba8d56818c85468651f1b24d1c/docs/ipaas/connector-submissions/klaviyo-component-evidence/intake-release.json).

138 offline npm tests and 109 actual sealed-worker tests pass with zero network attempts. The four-gate intake accepts both declared entries through its legacy smoke path; the separate 109-test suite establishes detailed methods, schemas, timestamp/resume and credential-recording behavior. Smoke alone is not field-parity proof.

The tested host is `09d6e37fc13c0b1e1b422975eb371fb76f71ae50`, runtime `fc1421ebf631e11351884dcb994ebc97fe23c76d`, with harness `5750876bcdd50dc4b652317d9b4ad417b433cc11`. A seeded credential probe leaks a URL-encoded key on the unchanged base and masks it on the reviewed [#72 host fix](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72). Installation remains conditional on that fix; the source secret scan alone does not prove safe runtime recording.

Make Raw Request and Get New and Updated Objects Polling use revision **2026-10-15**, replacing the historical default. Polling accepts only that verified revision. Raw/Verify may use an explicit syntactically valid override, with alternate compatibility unverified; fall-forward is disabled so a retired revision fails instead of silently changing semantics. Modern snapshots from the prior revision require reset.

Polling exposes 39 current private-key collections and 87 timestamp choices derived from the pinned official schema. All are exercised with actual emitted-snapshot resume. Required-query collections, parent-bound resources and public/client authentication surfaces are excluded. Primary JSON:API resources are emitted individually or as `{results: [...]}` batches; side-loaded included resources are not emitted separately. Page size is the output batch size, default/max 100, not the vendor page-size query parameter.

The trigger captures an upper bound before fetching, uses an inclusive initial time and a 60-second resume overlap, hashes resource versions and checkpoints only after successful delivery. Full scans are bounded to 100 pages, 10,000 rows, 25 MiB and 10,000 recent dedupe records. Late data older than the overlap, concurrent collection changes and submillisecond precision can cause gaps; timestamp choices do not reconstruct deletions or every intermediate change. Bounds and later-page failures produce no successful checkpoint or partial output.

Raw GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS accepts a relative private-API path and an optional JSON object up to 1 MiB, returning status/headers/body. Recorded writes retain an unsent 202 response and are not claimed as vendor completion. Binary transport is not offered; 429 errors propagate without automatic retries. Verification checks Lists access only; other resource permissions and live account behavior remain unverified.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication and offline compatibility do not establish live vendor behavior, hosted UI or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims; historical release facts remain preserved.

---

## Table of Contents

- [Klaviyo Component](#klaviyo-component)
  - [Table of Contents](#table-of-contents)
  - [API version](#api-version)
  - [Description](#description)
  - [Credentials](#credentials)
  - [Triggers](#triggers)
    - [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  - [Actions](#actions)
    - [Make Raw Request](#make-raw-request)

## API version

The most recent version is `2024-10-15`

## Description

Klaviyo is a customer data and marketing automation platform tailored for e-commerce businesses. It empowers users to collect, analyze, and utilize customer data to create highly targeted email and SMS marketing campaigns, automate workflows, and foster personalized customer engagement. Klaviyo integrates seamlessly with platforms like Shopify and Magento, making it an indispensable tool for improving customer retention and driving sales.

The Klaviyo Component provides a simple way to interact with the [Klaviyo API](https://developers.klaviyo.com/en/reference/api_overview), enabling efficient integration with Klaviyo's powerful features.

## Credentials

This component supports API key authentication. To obtain an API key, follow these steps:

1. Log in to your [Klaviyo account](https://www.klaviyo.com/settings/account/api-keys)
2. Navigate to **Settings -> API Keys**
3. Create a **Private API Key**
4. Define the required scopes for the API key
5. Use the generated key in this component to authenticate your requests

Now you can set the component credentials:

- **API key**: *(required, string)* - API key you created in the account
- **Revision**: *(optional, string)* - API version to use. Default: `2024-10-15`. Refer to the [Versioning docs](https://developers.klaviyo.com/en/docs/api_versioning_and_deprecation_policy) to find the versions available.

**Important!** Note that in order to successfully verify the credentials in the component, the api key you create must have *at least* the scope: `List: Read Access`.

## Triggers
  
### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

- **Object Type** - (dropdown, required): Type of object to poll on.
- **Timestamp field to poll on** - (dropdown, required): Select the date field to track changes.
- **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
- **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be emitted. Note, that the Klaviyo API sets different page sizes to be returned to the component per each execution. This parameter is not set by this configuration.
- **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000). E.g. 2024-11-21T10:00:00Z.

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message

## Actions

### Make Raw Request

Allows for the execution of custom requests directly using the Klaviyo API.

#### Input Metadata

- **Url** - *(string, required)*: The path of the resource relative to the base URL `https://a.klaviyo.com/api`. For example, `/profiles?page[size]=20`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.