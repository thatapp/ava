---
title: Google Spreadsheets Technical Notes
layout: component
description: Technical Notes for Google Spreadsheets component.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
updatedDate: 2022-10-07
ComponentVersion: 2.0.4
redirect_from:
  - /components/gspreadsheet/completeness-matrix.html
  - /components/gspreadsheet/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**Published with conditional host requirements #57/#58/#72/#80.** Both historical Google Spreadsheets page families now map to one [AVA source release](https://github.com/thatapp/connector-gspreadsheets/tree/d62d1881439c669408752fbef477f03e5bdefbf1). The complete [contract report](https://github.com/thatapp/connector-gspreadsheets/blob/d62d1881439c669408752fbef477f03e5bdefbf1/REPORT.md) and [intake evidence](https://github.com/thatapp/connector-gspreadsheets/blob/d62d1881439c669408752fbef477f03e5bdefbf1/INTAKE.json) define its implemented scope. Historical page versions are not installation versions.

The release combines five actions—Create new Spreadsheet, Add Spreadsheet Row, Read Spreadsheet, Create/Upsert/Update Spreadsheet Row and Get Spreadsheet Row—with the Get Spreadsheet Row polling trigger. The older GData Add Row and Rows entries remain removed; they are not aliases for the Sheets v4 implementation.

All four local intake gates and standalone hostcheck pass on Node 20.20.2 and 24.13.0: 74 offline tests, 50 canonical actual-worker outcomes, 55 supplemental workers and zero network attempts. The final scan covers 62 files. A separate reviewer reran 28 actual workers per runtime, including sparse-state and metadata regressions. Qualification pins host `4576be108e21b597d1fbffd4163fb05cd821c834` and harness `f05a0c4d81f8b79dde6912da8b2b8f8384b40cf7`.

Installation, live Google consent/permissions, UI behavior and host integration remain **UNVERIFIED**. See the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). The scope below supersedes conflicting historical runtime claims; historical changelogs and examples remain for context.

The connector uses recorded REST and host-owned OAuth tokens. Verification is a Drive metadata GET, accepting an empty list; it does not prove workbook write permission or OAuth/UI setup. No connector-managed refresh occurs. Retry/rate controls come from credentials. Historical environment knobs, including REQUEST_MAX_RETRY/REQUEST_RETRY_DELAY/REQUEST_TIMEOUT, are not implemented.

Add Row performs one RAW append to Google's logical table. Header keys preserve legacy space removal and reject collisions; array mode preserves order. False and zero stay typed, while null/missing values clear append cells. Read Spreadsheet supports ROWS/COLUMNS, header/no-header and all/individual result envelopes.

Upsert uses exact typed criteria across the complete bounded sheet; multiple matches refuse. The criterion is required and cannot be null. Other fields may be null to clear cells; absent/empty strings leave cells unchanged. Only supplied changed cells are updated in one RAW batch, preserving untouched formulas. No-match ROWS appends; COLUMNS writes the next positional column and requires existing grid capacity. Concurrent edits can race or shift rows: no transaction, automatic grid expansion or duplicate prevention is promised.

Get Spreadsheet Row, both action and trigger, follows appended row/column positions. It does not detect updates to existing cells, deletes or every intermediate change. Insertions/reordering may replay or skip records. Null/omitted/empty initial state works; saved state uses dense numeric configuration/header digests. Malformed state and changed configuration refuse before HTTP; changed headers or shrinkage refuse before output. It emits at most 1000 new records per invocation. Select All Data deliberately repeats results and refuses more than 1000 records.

Reads are bounded at 10000 major rows/columns, 5000 cells per major row/column, 200000 cells and 4 MiB JSON. The host's 5 MiB HTTP envelope and 60-second step remain authoritative; the connector schedules at most 100 calls or 55 seconds. Only GET 429/5xx responses retry, within the configured 0–8 retries. Network exceptions and writes never retry. A lost write acknowledgement can follow a successful mutation. Clean-room writes are recorded unsent and never fabricate provider success.

Release history preserves two disclosed process deviations: the initial audit/CI commit inherited Seth's identity; later commits use verified ChatGPT Contributor identity. A push helper also sent a correction to an engine GitLab feature branch before the correct GitHub origin was explicitly pushed and read back. Neither deviation changed a main branch or deployed anything.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 2.0.4 (October 07, 2022)

* Update Sailor version to 2.7.0
* Get rid of vulnerabilities in dependencies
* Fixed errors during push to platform - reduced size of metadata

### 2.0.3 (May 20, 2022)

* Moved a delay between calls value from env vars to credentials
* Added a number of retry attempts field to credentials

### 2.0.2 (May 10, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 2.0.1 (November 26, 2021)

* Upgrade sailor version to 2.6.26

### 2.0.0 (October 30, 2020)

* Remove deprecated actions
* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.2.2 (September 6, 2020)

* Add request rate limits handling

### 1.2.1 (June 16, 2020)

* Change OAuth variables naming
* Improve documentation

### 1.2.0 (June 5, 2020)

* Update sailor to 2.6.9
* Update metadata for add row action
* Remove update docs on deploy script

### 1.1.2 (December 30, 2019)

* Update sailor version to 2.5.4
* Refactor console log to built in sailor logger
* Change build type to `docker`

### 1.1.1 (October 1, 2019)

* Change `New Spreadsheet Row` trigger response types to `UNFORMATTED_VALUE`

### 1.1.0 (June 24, 2019)

* Add `Create new Spreadsheet` action
* Add `Add Spreadsheet Row` action
* Add `New Spreadsheet Row` trigger

> Using Google SDK based on API v4 for new actions and triggers

### 1.0.0 (March 15, 2019)

* Initial release

## Completeness Matrix

Google Spreadsheet Component Completeness Matrix:

![Completeness Matrix](https://user-images.githubusercontent.com/8449044/66487235-a2ed8a00-eab4-11e9-9166-c850f7f6d491.png)
