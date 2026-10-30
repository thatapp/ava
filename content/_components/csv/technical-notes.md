---
title: CSV Technical Notes
layout: component
description: Technical Notes for the CSV component.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2024-06-03
ComponentVersion: 3.3.0
redirect_from:
  - /components/csv/changelog.html
---

## AVA candidate status — stream aggregation blocked

**Not released or installed.** Corrected runtime [b3c2864](https://github.com/thatapp/connector-csv/tree/b3c2864b91f6c9f3518e30b2c85c5654d27bcbac) and its [review/evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199) are in [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). [Full report](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/REPORT.md) and [exact rejected runtime intake](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/evidence/empty-row-qualified/csv-empty-row-final-intake-node24.json) distinguish partial implementation from whole-connector acceptance.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL pass actual worker tests. Reads cover Fetch All/Individual/Batch, headers, delimiters, comments, empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Anonymous HTTPS must return complete 200 binary bytes; partial 206/Content-Range refuses. Scoped inputs are caller-owned. attachmentUrl is a scoped reference object, not the legacy downloadable URL (#75/#80).

Independent review found that empty/null/missing final single-column rows could disappear on write/read. The corrected writer explicitly quotes those empty records; true empty-file and header-only inputs still yield zero rows. Both Node 20/24 now pass 78 npm tests, allowlist, 126-file runtime secret scans, 52 existing supplemental workers and 24 scoped round-trip workers across 12 stores. Independent recheck passes 95 checks/106 workers/28 stores plus 3 sealed controls each. Original failures and all exact corrected receipts remain archived. The evidence-only follow-up changes no runtime or fixtures; its separate scans cover additional evidence files.

Create CSV From Message Stream still refuses 501 before I/O. Original v3 source in six sealed workers per runtime proves that stream calls return without data before an unawaited 10-second timer, then the worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity closure, leased delivery and generation/crash fencing. Canonical intake and standalone hostcheck remain REJECTED solely for missing positive stream-window coverage. There is no CSV tag and no release count includes it.

Bounds are 4 MiB input/aggregate serialized output, 5000 rows and 256 columns. Duplicate/empty/reserved headers and invalid UTF-8 refuse. The trigger rereads the whole file and emits an empty completion snapshot, with no change watermark/deduplication. Typed conversion preserves dates, empty fields and unsafe-range numbers as strings. Column inference uses all row keys; false/zero survive; nonprimitive cells become [object Object]. Custom environment overrides (#58), UI mapping, spreadsheet-client formula interpretation, live operation and deployed storage remain unverified. Both recovered 2.2.2 and current 3.3.0 source, four docs pages and 14 screenshots are preserved; deprecated functions and historical notes below remain historical.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 3.3.0 (June 03, 2024)

* Added new trigger - `Read CSV file from URL`.

### 3.2.0 (May 02, 2023)

* Added new config fields to `Read CSV attachment` action:
  * `Skip empty lines`.
  * `Comment char`.
* Added new config fields to `Create CSV From Message Stream` and `Create CSV From JSON Array` actions:
  * `New line delimiter`.
  * `Escape formulae`.

### 3.1.6 (December 16, 2022)

* Update Sailor version to `2.7.1`.

### 3.1.5 (August 26, 2022)

* Update Sailor version to `2.6.29`.
* Get rid of vulnerabilities in dependencies.
* Update component-commons-library version to `3.0.2`.

### 3.1.4 (May 06, 2022)

* Fix memory leak on `Emit Batch` behavior for `Read CSV attachment` action.

### 3.1.3 (April 22, 2022)

* Fix a bug when emit strategy 'Emit Batch' did not process correctly.

### 3.1.2 (April 14, 2022)

* Update `component-commons-library` to read and upload attachments through `Maester`.
* Update `thatapp-sailor-nodejs` to `2.6.27`.
* Fix dependencies.

### 3.1.1 (March 15, 2022)

* Added component pusher build script.

### 3.1.0 (March 3, 2022)

* Added `Emit Batch` behavior for `Read CSV attachment` action.

### 3.0.0 (July 9, 2021)

* Deleted trigger:
  - `Read CSV attachment`.
* Deleted actions:
  - `Write CSV attachment`.
  - `Write CSV attachment from JSON Array`.
  - `Write CSV attachment from JSON Object`.
  - `Read CSV file from URL`.

* Add New actions:
  - `Read CSV attachment`.
  - `Create CSV From Message Stream`.
  - `Create CSV From JSON Array`.

* Removed old dependencies.


### 2.2.1 (April 08, 2022)

* Update Sailor version to `2.6.27`.
* Get rid of vulnerabilities in dependencies.
* Add component pusher job to Circle.ci config.

### 2.2.0 (April 23, 2021)

* Add pipe to list of separators in `Write CSV attachment from JSON Array` and `Write CSV attachment from JSON Object` actions.
* Bump dependencies.

### 2.1.7 (March 12, 2021)

* Add support for reading a file from a remote URL in Read CSV attachment action.
* Update Sailor version to `2.6.24`.

### 2.1.6 (January 4, 2021)

* Fix bug with Write From Array and multiple messages.
* Bump node version to `14`.
* Bump dependencies.

### 2.1.5 (October 30, 2020)

Upgrade to sailor `2.6.18`.

### 2.1.4 (August 21, 2020)

Minor asynchronicity improvement.

### 2.1.3 (June 5, 2020)

* Fix `timeout is not a function` bug.

### 2.1.2 (May 22, 2020)

* Update sailor version to `2.6.7`.

### 2.1.1 (May 7, 2020)

* Add input metadata for objects processing.
* Add the steward URL to the body of the outgoing message.

### 2.1.0 (April 22, 2020)

* Add `Write CSV attachment from Array` action.
* Add `Write CSV attachment from JSON` action.
* Update sailor version to `2.6.5`.

### 2.0.2 (December 24, 2019)

* Update sailor version to `2.5.4`.
* Update component to use logger.
* Update buildType to docker.
* Fixed bug with invalid path to read action.

### 2.0.1 (October 10, 2019)

* Hotfix Action path.

### 2.0.0 (October 3, 2019)

* Remove generators, improve eslint.

### 1.1.6 (September 10, 2019)

* Migrate from TravisCI to CircleCI.

### 1.1.5 (July 15, 2019)

* Add retries mechanism to all request, refactor component to use axios library.

### 1.1.4 (June 27, 2019)

* Added emitAll feature for CSV Write action.

### 1.1.3 (October 31, 2017)

* Make CSV Write dynamic configuration.

### 1.1.2 (September 21, 2017)

* Supporting `startRow` option.

### 1.1.1 (June 18, 2017)

* Updated sailor to `2.1.3`.

### 1.1.0 (June 8, 2017)

* Added new CSV Write action.

### 1.0.1 (January 7, 2016)

* Updated sailor to `1.1.0`.

### 1.0.0 (November 3, 2015)

* Initial release.
