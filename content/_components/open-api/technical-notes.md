---
title: Open API Technical Notes
layout: component
description: Technical Notes for the Open API component.
icon: open-api.png
icontext: Open API component
category: open-api
updatedDate: 2025-11-14
ComponentVersion: 1.1.4
redirect_from:
  - /components/open-api/completeness-matrix.html
  - /components/open-api/changelog.html
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

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.4 (November 14, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 1.1.3 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.1.2 (March 25, 2021)

* Update Sailor version to 2.6.24

### 1.1.1 (December 18, 2020)

* Update Sailor version to 2.6.21
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.1.0 (February 13, 2020)

* Support OAuth2 authentication type

### 1.0.0 (January 30, 2020)

* Add action `Make request`
* Initial release

## Completeness Matrix

 Here is a Open API Component Completeness Matrix:

![image](https://user-images.githubusercontent.com/16806832/73257112-da9b5180-41cb-11ea-83d9-2725552185f7.png)
