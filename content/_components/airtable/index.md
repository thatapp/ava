---
title: Airtable component
layout: component
section: Database components
description: The Airtable component is designed to interact seamlessly with the Airtable Web API.
icon: airtable.png
icontext: Airtable component
category: airtable
ComponentVersion: 1.0.0
updatedDate: 2025-05-23
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-airtable/tree/54f43d38e62f17d418741241c5b488f1db535468) · [Release scope](https://github.com/thatapp/connector-airtable/blob/54f43d38e62f17d418741241c5b488f1db535468/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/719e89c00ab312ff61e1a9ab5e7e532760db61ce/docs/ipaas/connector-submissions/airtable-evidence/standalone-intake.json).

69 offline npm tests and 71 sealed-loader/worker tests pass against host `8f2c0408aa1ebfde9d7d8458fe3d9ec6f963ace7`. All four intake gates pass. The canonical intake loads all three actions; the detailed sealed suite checks dropdowns, verification, worker output and recorded writes. The final standalone receipt is linked above. No live Airtable request or installation was performed.

The three actions are Delete Record By ID, Lookup Record By ID and Make Raw Request; there are no triggers. Authentication uses a personal access token. Base dropdowns follow all offset pages; Table dropdowns depend on the selected Base. Lookup and successful delete preserve the actual vendor object. A clean-room DELETE emits recorded intent with no invented `deleted` result.

Raw requests support GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS on relative Airtable `/v0/` paths, with an optional object body and actual status, headers and optional response body. Origin/path escapes and malformed inputs are refused. Empty HEAD/204 responses omit the body. Tokens are scrubbed from errors; writes are not retried automatically.

Use `schema.bases:read` for the Base/Table models, `data.records:read` for lookup and `data.records:write` for delete, together with selected-base access and the user's corresponding role. Verification through `/meta/whoami` establishes authentication only, not those permissions. See Airtable's [Base listing](https://airtable.com/developers/web/api/list-bases) and [schema reference](https://airtable.com/developers/web/api/get-base-schema). The API path is `/v0`; the historical 2025-03-13 date below is a reference baseline, not a version to send.

Record-specific schemas and Generate Stub Sample UI behavior are unverified; metadata remains generic. Hosted model rendering, real scope/base enforcement and live transport behavior have not been tested. This is the documented PAT contract; OAuth user grants are not implemented by this connector.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication and offline compatibility do not establish live vendor behavior, hosted UI or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims; historical release facts remain preserved.

---

## Table of Contents

- [API Version](#api-version)
- [Description](#description)
- [Credentials](#credentials)
- [Actions](#actions)
  - [Delete Record by ID](#delete-record-by-id)
  - [Lookup Record by ID](#lookup-record-by-id)
  - [Make Raw Request](#make-raw-request)

## API Version

The latest API version developed and tested is [`2025-03-13`](https://airtable.com/developers/web/api/changelog#anchor-2025-03-13).

## Description

Airtable is a cloud-based platform that combines the simplicity of a spreadsheet (like Excel or Google Sheets) with the power of a database. The [Airtable Web API](https://airtable.com/developers/web/) allows you to integrate and manage your Airtable data from external systems and applications.

## Credentials

This component supports [Personal access token](https://airtable.com/developers/web/guides/personal-access-tokens) authentication. To obtain an API key, follow these steps:

1. Log in to your [Airtable /create/tokens](https://airtable.com/create/tokens) page.
2. Create a new **Token**.
3. Use the generated key in this component to authenticate your requests.

Set the component credentials as follows:

- **Personal access token**: *(required, string)* - The Personal access token you created in your account.

## Actions

### Delete Record By ID

Deletes a single record by its ID.

#### Configuration Fields

- **Base** - (dropdown, required): The base to delete from.
- **Table** - (dropdown, required): The table within the selected base to delete from.

#### Input Metadata

- **ID Value** - (string, required): The ID of the record to delete.

#### Output Metadata

Returns the ID of the deleted record along with the result of the delete operation (e.g. `deleted: true`).

### Lookup Record By ID

Retrieves a single record using its ID.

#### Configuration Fields

- **Base** - (dropdown, required): The base to lookup in.
- **Table** - (dropdown, required): The table within the selected base to lookup in.

#### Input Metadata

- **ID Value** - (string, required): The ID of the record to lookup.

#### Output Metadata

Returns an object representing the record as a result of the lookup.

**Known limitation**: Currently, the `Generate Stub Sample` button only allows generating generic metadata, without specific object type details.

### Make Raw Request

Enables execution of custom requests directly through the Airtable API.

#### Input Metadata

- **URL** - *(string, required)*: The path of the resource relative to the base URL `https://api.airtable.com/v0/`. For example, `/meta/whoami`.
- **Method** - *(string, required)*: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
- **Request Body** - *(object, optional)*: The payload to include in the request body, if applicable.

#### Output Metadata

- **Status Code** - *(number, required)*: The HTTP response status code returned by the request.
- **HTTP Headers** - *(object, required)*: The HTTP headers included in the response.
- **Response Body** - *(object, optional)*: The content of the HTTP response body, if any.