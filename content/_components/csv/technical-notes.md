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

## AVA 1.0.1 release status — 2026-10-31

**Published conditionally; installation and final combined-host qualification remain open.** [Exact source](https://github.com/thatapp/connector-csv/tree/6f272f25722604283340fa1ac477baee59ded31c) · [Full report](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/REPORT.md) · [Pinned qualification](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/evidence/qualified-1.0.1/qualification.json) · [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). Conditions remain #57/#58/#72/#75/#80/[#87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87), trusted production storage/clock and live/UI interoperability. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). No READY, install or deployment is claimed.

All four declared entries have positive isolated-worker proof. Reads require complete anonymous HTTPS200 binary bytes or a caller-owned scoped attachment. They cover Fetch All/Individual/Batch, header/delimiter/comments/empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Empty final single-column rows are explicitly quoted. attachmentUrl contains a scoped reference object; clean-room attachment writes remain unsent501. The polling trigger rereads its full URL and has no change watermark/deduplication.

Create CSV From Message Stream validates one mapped items object and boolean header, then stages a bounded row in the parent durable window. Pending acceptance emits no CSV or snapshot. New input extends the inactivity deadline; a gap strictly longer than ten seconds closes the window. A leased immutable flush renders stored rows and follows the ordinary downstream mapper/walker, starting at the aggregator without repeating its predecessors. First-seen column union and the original header persist. The unmerged [host MR174](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/174), runtime38f7d5047f61b019060927e7fd196708f2fd2553, supplies the capability; a tag does not install it.

Binding includes owner/org/workspace/flow/step/published version/graph/settings/config/exact clean installed build. Stop/delete/cancel/generation changes fence old delivery. Majority+journal persistence/readback precede acceptance; only a matching durable successful downstream run marks completion. Lost work completion can adopt its exact successful run without replay. Unknown/running/failed outcomes after an execution fence require explicit recovery; new run IDs remain new deliveries and can duplicate rows. No exactly-once or rollback promise is made. Clean-room/VCR require explicitly isolated storage and simulated clock, with completed rehearsal output distinct from live delivery.

Read/array bounds are4MiB/5000rows/256columns. Stream bounds are48KiB for the complete persisted window, at most1000rows/256columns, ten unresolved windows per binding, and seven-day raw-row retention with eventual TTL cleanup. The byte cap can bind first. Clock correctness is a production prerequisite. The component has no worker timer, socket, direct DB or filesystem privilege. Mapper/logging UI, deployed storage and live interoperability remain unverified; historical source notes/screenshots retain attribution below.

Both Node20.20.2 and24.13.0 pass84 unit checks,46 canonical and46 standalone cases,61 supplemental plus3 metadata workers,24 scoped empty-record workers and14 actual durable lifecycle cases. Final package scans cover211 text files with zero test/host network attempts. Twelve source blobs and20 raw artifacts are pinned. Corrected host suites pass70 focused/122 offline regression checks each; independent unchanged expiry controls pass3/3 each, clearing that bounded finding only. Earlier expired-lease source/failed probes are retained. Strict post-read lease/retention checks and journaled heartbeats stop further walker nodes on lease loss; already-started effects remain potentially partial.

Coordinating root independently verified the latest tag/full UTF-8 PR report, all12 current source blobs/20 current artifacts, retained earlier packets and both211-file final receipts. Its combined offline checkpoint0f07bb4ff2e038cb460e03a1b0c588551271798b/report72e373c314df2f61f3da9b999210b1ee8c141975 passes353 focused and314 shared regressions on both runtimes, zero skips. Focused guards see zero external attempts; regression guards refuse four deliberate controls each. Two drivers use a private fixed source checkout whose eight runtime library/verifier files match1.0.1. This does not establish final every-connector qualification on one host, operational provisioning or installation.

The immutable1.0.0 tag [a5083af](https://github.com/thatapp/connector-csv/tree/a5083afbb0670bc6d299102749dab2245e92d04d) passed functional gates but contained one Windows report punctuation byte that stopped UTF-8 PR-body publication after its atomic push. Version1.0.1 corrects report encoding and version metadata, with unchanged action runtime code and fresh full qualification. Neither tag was rewritten. Recovered2.2.2/current3.3.0 source, four original docs and14 screenshots remain pinned; deprecated functions below remain historical.


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
