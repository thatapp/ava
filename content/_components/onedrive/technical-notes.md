---
title: Microsoft OneDrive Technical Notes
layout: component
description: Technical Notes for the Microsoft OneDrive component
icon: onedrive.png
icontext: Microsoft OneDrive component
category: onedrive
ComponentVersion: 2.0.0
updatedDate: 2023-05-19
redirect_from:
  - /components/onedrive/completeness-matrix.html
  - /components/onedrive/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #75/!129 and #72/!127**. [Published source](https://github.com/thatapp/connector-onedrive/tree/cc202fcd9fd328d23d729d808fb109b0bbe1d7b3) · [Release scope](https://github.com/thatapp/connector-onedrive/blob/cc202fcd9fd328d23d729d808fb109b0bbe1d7b3/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-onedrive/blob/cc202fcd9fd328d23d729d808fb109b0bbe1d7b3/INTAKE.json).

38 npm tests including lint/TypeScript compilation on Node 24.13.0; 12 exact cases across five entries; 4 additional attachment worker cases; require allowlist and secret scan PASS; zero network attempts.

All five documented entries are exercised: Create Folder, Delete File, Get File, Upsert File, and New/Updated Objects Polling. Each invocation has a fresh stored-OAuth client. Drive/path segments are encoded separately; public HTTPS file downloads receive no Graph token. OAuth lifecycle remains host #57.

Files are limited to 5 MiB each and 20 upload mappings per invocation. Upsert uses direct content PUT; large upload sessions are not implemented. `attachmentReference` replaces `attachmentUrl`; upsert accepts exactly one HTTPS `url` or scoped `reference`, plus `path`. Optional storage needs an injected scoped store. Short-lived Graph download capabilities are omitted from metadata.

Polling drains pages/descendants before data emission, filters inclusive start/exclusive end, preserves the caller snapshot, and saves the end bound only after success. Limits are 100 pages, 100 visited folders and 10,000 scanned items; exceeding a limit fails without cursor advance. Delivery and multi-file writes are not transactional. `cfg.retries` 0..10 replaces inherited environment knobs. Retrieve Sample-specific debug behavior is not implemented.

Installation is handed off through the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication is not installation. No live vendor account, customer data, server access or deployment was used to establish these results.

The older reference below describes its source version. The scope and limits above supersede any conflicting runtime, attachment, environment-variable, or availability claim; historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 2.0.0 (May 19, 2023)

* New version of component, no backward compatibility! Written from scratch using TS and last versions of libraries
* New authentication mechanism
* Added retries on server errors
* Added retries on 429 (too many requests) errors
* Attachment URL provided directly in messages
* Added support for uploading large files to OneDrive
* Updated ReadMe

### 1.0.6 (September 23, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2
* Update oih-standard-library version to 2.0.3

### 1.0.5 (April 14, 2022)

* Update `component-commons-library` to read and upload attachments through `Maester`
* Update `thatapp-sailor-nodejs` to v2.6.27
* Fix dependencies

### 1.0.4 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.0.3 (March 25, 2021)

* Update sailor version to `2.6.24`

### 1.0.2 (October 30, 2020)

* Update sailor version to `2.6.18`
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.0.1 (August 4, 2020)

* Adapt Polling Trigger to account for the fact that OrderBy is not supported in One Drive for Business
* Polling trigger handles cases where there are more than 200 matching files
* Limit parallelization of writing to steward in polling trigger
* Polling trigger correctly sorts items by timestamp
* Update dependencies. Sailor is updated to version `2.6.14`
* Fix integration tests

### 1.0.0 (March 26, 2020)

* Create Get New And Updated Files Polling Trigger
* Create Upsert File Action
* Create Create Folder Action
* Create Get File Action
* Create Delete File Action
