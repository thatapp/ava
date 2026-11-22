---
title: Open API component
layout: component
section: Utility components
description: A component that is designed for utility operations.
icon: open-api.png
icontext: Open API component
category: open-api
updatedDate: 2025-11-14
ComponentVersion: 1.1.4
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-open-api/tree/7dd00dbbaad6222c525d24162a0239b3164ccda9) · [Complete field and qualification report](https://github.com/thatapp/connector-open-api/blob/7dd00dbbaad6222c525d24162a0239b3164ccda9/REPORT.md) · [Immutable final intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/8a6b949c1d4290a8ff7ce7689f53cf4e67edcc07/docs/ipaas/source-inventory-2026-10-30/open-api-release-intake/qualification.json).

Make Request implements a bounded Swagger/OpenAPI2.0 contract through recorded HTTPS. Supply a public HTTPS JSON/YAML specification URL; the document is fetched without API credentials on every action/callback. Select the exact path and GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS operation. A cross-origin document/API pair requires an explicit API base binding. One declared HTTPS host/basePath is supported; OpenAPI3, external references and referenced path items are unsupported.

Authentication supports No Auth, matching declared Basic Auth or a header API key, and an already-issued future-dated accessCode bearer in the historical OAuth key shape. Authorization-code exchange, refresh, scopes, permission and saved OAuth/UI integration remain unverified. Unsupported security combinations and reserved transport/query names refuse; anonymous operations send no configured API credentials. No API credentials are sent while fetching the public document.

Path fields remain outer inputs. Non-body parameters use the historical body bag; when an actual JSON body parameter exists, body is its payload and query/header fields remain outer. Primitive parameters and bounded scalar arrays support declared collection formats; URL-encoded forms retain zero/false. URL/header/form Int64 strings preserve exact integer identity, with normalized numeric enum metadata and matching safe numeric aliases. JSON body integers remain numeric and must be safe. GET/HEAD bodies, multipart/files and binary inputs refuse.

Basic body type/enum/required/additionalProperties checks are enforced, including missing-type conditional constraints. Object enum equality ignores property order; array order and scalar types matter. Local reference fragments are percent-decoded once before JSON Pointer decoding. Malformed UTF8/encodings, cycles and array-node traversal refuse. Dynamic path/operation/input models are bounded; full JSON Schema facets, composition, formats, response validation and complete OpenAPI conformance are not implemented.

The action emits headers/body/responseCode with JSON, UTF8 text or null body. Authentication/cookie headers are omitted. Strict byte decoding and original-token numeric guards reject malformed/lossy responses. Empty/HEAD/204 responses emit null. The error-suppression flag permits4xx/5xx except401, but validation/transport errors still fail. In clean-room mode writes remain recorded-unsent501, including OPTIONS; no successful vendor write is inferred. Live writes can apply before response validation/emission fails. There is no automatic retry, pagination or checkpoint.

Limits include4MiB specification/response,1MiB input/request,20,000 document/parser events and depth40,1,000paths,100effective parameters,1,000 scalar-array items,1,500 schema steps/depth12,256KiB selector/model envelopes,16KiB URLs and8KiB scalar strings. Numeric tokens have a128-character cap; enum comparison has20,000-step/depth40 bounds. YAML anchors/aliases/custom tags/merge semantics and multiple documents refuse. Streaming, attachments, arbitrary binary preservation and produces negotiation are unsupported. Host timeout/DNS/redirect/egress behavior is separately constrained by the installed host.

Exact final Node20.20.2/24.13.0 qualification passes138 npm tests,31 canonical outcomes, the unchanged require allowlist and256-file secret scans, standalone hostcheck and132 source actions/58metadata callbacks/2verifiers/254mockHTTP per runtime. Independent runtime review passes172cases/262mockHTTP each; separate metadata/action review passes260invocations comprising184metadata+76actions/295mockHTTP each. All six independent findings are resolved. Original failures, three owner test-oracle corrections and reviewer caveats remain byte-preserved. All checks use synthetic fixtures with zero external attempts; exact enum-counter boundaries and omitted optional reserved declarations were source-inspected, not separately tested at those exact worker boundaries.

Conditions #57 installation/UI, #72 production callbacks and credential integration, #75 binary HTTP integration and #80 bounded schema/parser/provider behavior remain. Live authentication, authorization/refresh and vendor behavior are UNVERIFIED. Annotated tag f98f1c9634a2d32dbf217ab81edab73f56b8324d peels to the exact source above; main remains unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical documentation below remains historical.

---

## Table of Contents

* [General information](#general-information)
   * [Description](#description)
   * [Purpose](#purpose)
   * [Completeness Matrix](#completeness-matrix)
   * [How it works. API version/SDK version](#how-it-works-api-version--sdk-version)
* [Credentials](#credentials)
     * [Type](#type)
     * [A URL to an OpenAPI/Swagger document](#a-url-to-an-openapiswagger-document)
* [Actions](#actions)
   * [Make Request](#make-request)
* [Known Limitations](#known-limitations)

## General information

### Description

OpenAPI Specification (formerly Swagger Specification) is an API description format for REST APIs.
OpenAPI (Swagger) document needs to be hosted online and should be reached without authentication. You need to provide a URL to this document in the credentials.

### Purpose

Using OpenAPI Specification make request to REST API on the platform.

### How it works. API version / SDK version

Currently, it is supported OpenAPI version 2.0 documents.
It is used [Swagger Client](https://github.com/swagger-api/swagger-js) version 3.10.0.
[OpenAPI Specification](https://swagger.io/docs/specification/about/).

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Open API component like [changelog](/components/open-api/technical-notes#changelog) and [completeness matrix](/components/open-api/technical-notes#completeness-matrix).

## Credentials

{% include img.html max-width="100%" url="img/open-api-credentials.png" title="Credentials" %}

### Type

Authentication type field to define the authentication schema that would be used for making request.

  It is supported 4 auth type:

  - `No Auth` - used by default, make request without authentication.
  - `Basic Auth` - make request with basic authentication, `Username` and `Password` fields should be specified:

{% include img.html max-width="100%" url="img/open-api-credentials-basic-auth.png" title="Credentials Basic" %}

  - `API Key Auth` - make request with API key in headers authentication, `Header Name` and `Header Value` fields should be specified:

{% include img.html max-width="100%" url="img/open-api-credentials-api-key-auth.png" title="Credentials API Key" %}

   - `OAuth2` - it is supported `Authorization code` OAuth2 flow. Fields:
        - `Client Id` - is a public identifier for apps
        - `Client Secret` -  is a secret known only to the application and the authorization server
        - `Auth URI` -  uri for authorization
        - `Token URI` -  uri for getting an access token
        - `Scopes` -  is a scope of the access request

{% include img.html max-width="100%" url="img/open-api-credentials-OAuth2.png" title="Credentials OAuth2" %}

### A URL to an OpenAPI/Swagger document

A URL to an OpenAPI/Swagger document that would define the calls that could be made, as example https://petstore.swagger.io/v2/swagger.json

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Make Request

{% include img.html max-width="100%" url="img/open-api-make-request.png" title="Make Request" %}

#### List of Expected Config fields

* Path - A dropdown for the paths than defined in the OpenAPI document.

* Operation - A dropdown for the operations that are allowed for a previously defined path.

* Do not throw Error on Failed Calls - An option as to whether or not errors should be thrown for HTTP codes in the 4xx/5xx range.

>**Please Note** an exception is the 401 HTTP status code - error would be thrown for this code regardless of field value (true/false)

#### Expected input metadata

Input metadata is depend on parameters, that are defined in [operation](https://swagger.io/docs/specification/2-0/describing-parameters/):

`path parameters` are defined as a separate fields, and `body` as object that should be configured by user.

For example, path `/pet/{petId}` and operation `get` metadata is:

```json
     {
       "type": "object",
       "properties": {
         "petId": {
           "type": "integer",
           "required": true
         }
       }
     }
```

<details close markdown="block"><summary><strong> OpenApi Description for path `/pet/{petId}` and operation `get`</strong></summary>

     {
       "paths": {
         "/pet/{petId}": {
           "get": {
             "tags": [
               "pet"
             ],
             "summary": "Find pet by ID",
             "description": "Returns a single pet",
             "operationId": "getPetById",
             "produces": [
               "application/json",
               "application/xml"
             ],
             "parameters": [
               {
                 "name": "petId",
                 "in": "path",
                 "description": "ID of pet to return",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
               }
             ],
             "responses": {
               "200": {
                 "description": "successful operation",
                 "schema": {
                   "$ref": "#/definitions/Pet"
                 }
               },
               "400": {
                 "description": "Invalid ID supplied"
               },
               "404": {
                 "description": "Pet not found"
               }
             },
             "security": [
               {
                 "api_key": []
               }
             ]
           }
         }
       }
     }

</details>

#### Expected output metadata

```json
     {
         "type": "object",
         "properties": {
           "headers": {
             "type": "object",
             "properties": {},
             "required": true
           },
           "body": {
             "type": "object",
             "properties": {},
             "required": true
           },
           "responseCode": {
             "type": "number",
             "required": true
           }
         }
       }
```

## Known limitations

 - OpenApi v2.0 is supported only
 - Multiply hosts are not supported
 - Each operation should contains only one tag
 - Authentication for access to OpenAPI (Swagger) file is not supported
 - OAuth2 authentication type is not supported in real-time flows due to platform limitations
