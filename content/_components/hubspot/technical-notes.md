---
title: Hubspot Technical Notes
layout: component
description: Technical Notes for the Hubspot component
icon: hubspot.png
icontext: Hubspot component
category: hubspot
updatedDate: 2026-07-01
ComponentVersion: 1.7.1
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

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.7.1 (July 01, 2026)

* Made the description `iPaaS` instead of `thatapp.io`

### 1.7.0 (June 12, 2026)

* Added support for HubSpot Service Keys (Beta) authentication
* Removed the `thatapp-node` library in favor of a local messaging utility
* Updated core dependencies:
  * Upgraded `@thatapp.io/component-commons-library` from `3.2.2` to `4.0.0`
  * Upgraded `axios` from `1.9.0` to `1.17.0`
  * Upgraded `thatapp-sailor-nodejs` from `2.7.5` to `2.7.8`
  * Upgraded `form-data` from `4.0.0` to `4.0.5`
  * Removed `thatapp-node` (`0.0.9`)

### 1.6.3 (June 06, 2025)

* Updated `README`
* Updated `component-commons-library` version to 3.2.2
* Updated `Sailor` version to 2.7.5
* Updated dev libs

### 1.6.2 (February 25, 2025)

* Fixed an issue where removing the "Size of Polling Page" value caused a validation error instead of reverting to the default
* Updated `component-commons-library` version to 3.2.1
* Updated `Sailor` version to 2.7.4

### 1.6.1 (August 21, 2024)

* Added `Max amount of Polling Pages` text field for `Get New and Updated Objects` trigger
* Update component-commons-library version to 3.2.0
* Update Sailor version to 2.7.2
* Update Node engine to 20.11.0
* Get rid of vulnerabilities in dependencies

### 1.6.0 (May 22, 2022)

* `Webhook` trigger deprecated in favor `Hubspot webhook` component.

### 1.5.6 (November 04, 2022)

* Fixed output metadata for `Upsert` action

### 1.5.5 (October 21, 2022)

* Implemented support for custom fields in `Get New and Updated Objects` trigger
* Fixed missing output metadata for lookup actions
* Update Sailor version to 2.7.1

### 1.5.4 (October 07, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.5.3 (September 23, 2022)

* Fix `Verify` for credentials

### 1.5.2 (April 13, 2022)

* Fix uploading attachment

### 1.5.1 (April 08, 2022)

* Fixed limit 10000 records for `Get New and Updated Objects` trigger
* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.5.0 (February 11, 2022)

- Added metadata information to `Get New and Updated Objects` trigger

### 1.4.1 (December 22, 2021)

- Fix bug with attachments uploading in `Upsert` action

### 1.4.0 (December 10, 2021)

- Reduced the size of component icon file
- Added support for File Custom Fields in `Upsert` action
- Added option `Enable download attachments` to actions: `Lookup Objects`, `Lookup Object', 'Lookup Set of Objects`

### 1.3.1 (November 12, 2021)

- Minor fix

### 1.3.0 (November 12, 2021)

- Added actions:
  - `Lookup Objects (Plural)`
  - `Create associations`
  - `Remove associations`
  - `Delete Object`

- Added triggers:
  - `Webhook`

### 1.2.0 (October 29, 2021)

- Added actions:
  - `Lookup Object (at most one)`
  - `Upsert`

### 1.1.0 (October 15, 2021)

- Added `Get New and Updated Objects` trigger

### 1.0.0 (October 1, 2021)

- Added `Raw Request` action

## Completeness Matrix

Here is the Hubspot Component Completeness Matrix.

![Hubspot Component Completeness Matrix](https://user-images.githubusercontent.com/30211658/137831852-a998bf9e-52e6-4b19-9db7-d8e9e9f206e3.PNG)
