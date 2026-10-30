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

**Not released or installed.** [Draft PR1](https://github.com/thatapp/connector-csv/pull/1) and [full contract report](https://github.com/thatapp/connector-csv/blob/62f1e8d70e6b56080bde355194232df89893b9f0/REPORT.md) pin candidate62f1e8d70e6b56080bde355194232df89893b9f0. The recovered2.2.2 source is deprecated; the current3.3.0 contract was checked against public elasticio/csv-component-v3 at26de77ac8a1efd2b89714b6ae75e48f1135b2e3f. Both source trees and all four documentation pages/14screenshots are preserved.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL have supplemental actual-worker proofs. Reads support Fetch All/Individual/Batch, headers, delimiter detection, comments, empty-line policy and bounded numeric/boolean conversion. Arrays use current mapped items/header, optional column order/separator/newline and the page's backtick formula prefix. No credentials are required. Anonymous HTTPS downloads must preserve complete200 binary bytes; partial206/Content-Range refuses before emission. Scoped input references are caller-owned. Output attachmentUrl is an explicit scoped reference object, not a legacy downloadable URL; #75/#80 remain.

Create CSV From Message Stream is unavailable and refuses501 before I/O. The original v3 source was tested in six sealed isolated workers per Node20/24: arrays emit correctly, but separate stream calls return success without data before their unawaited10second timers, after which each worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity deadlines, leased flush/delivery, generation fencing and crash recovery. A single-row output or an in-memory timer does not satisfy that contract.

Final committed checks on both Node20.20.2/24.13.0 pass64 unit tests, the require allowlist,106-file secret scans and49 execution/verifier plus3 metadata workers. Canonical intake and standalone hostcheck deliberately remain REJECTED because the full descriptor has no positive stream-window case. No tag exists and no release count includes this candidate. All tests use synthetic data with zero external network attempts.

Current bounds are4MiB input bytes/aggregate serialized output,5000rows,256columns; duplicate/empty/reserved headers and invalid UTF8 refuse. The trigger rereads the whole file, then emits an empty completion snapshot; it has no deduplication/change watermark. Custom environment overrides and historical10MB/RAM-only sizes are not qualified (#58). Typed conversion preserves dates, empty fields and out-of-safe-range numbers as strings. Column-order inference uses all row keys; false/zero are preserved; nonprimitive cells become [object Object]. UI mapping, spreadsheet-client formula interpretation, realtime operation and deployed storage remain unverified. Deprecated functions and historical release notes below remain historical.

The [evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/eb611a398d4aa2fa8f2e4a79c93568ec66de4e89) preserves all six exact runtime receipts and their hashes, including the [rejected Node 24 intake](https://github.com/thatapp/connector-csv/blob/eb611a398d4aa2fa8f2e4a79c93568ec66de4e89/evidence/csv-62f1e8d-committed-intake-node24.json). Runtime and fixtures are unchanged. Both Node 20/24 checks were rerun on that packaging commit: 64 unit tests, the require allowlist, 113-file scans and 52 supplemental workers pass; canonical intake and standalone hostcheck remain rejected for the same stream-window blocker.

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
