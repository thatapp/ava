---
title: Commercetools Technical Notes
layout: component
description: Technical Notes for the Commercetools component.
icon: sphereio.png
icontext: Commercetools component
category: commercetools
updatedDate: 2023-04-07
ComponentVersion: 1.0.2
redirect_from:
  - /components/commercetools/changelog.html
---

## AVA 1.0.1 verified source publication — 2026-10-30

**PUBLISHED 1.0.1 numeric polling correction; conditional #72/#75 integration, #79 source contract, #80 size/parity.** [Exact source](https://github.com/thatapp/connector-commercetools/tree/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631) · [Full contract report](https://github.com/thatapp/connector-commercetools/blob/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-commercetools/blob/02fe3b4ad8a3c2c80d1ff2dbf6e0b0c2fc909631/evidence/prepared-1.0.1-intake-24.json).

Version1.0.1 corrects the published1.0.0 polling checkpoint defect: a short credential could mask string digests and silently restart a full scan. Query Customers and Query Orders now use version2 numeric SHA-256 bytes and millisecond timestamps. Digests and boundary arrays must be dense, bounded and valid. Malformed, corrupted or unknown state refuses before authentication; a changed configuration returns409 and requires an explicit reset. Valid matching legacy state migrates, preserving overlap and deduplication. Null/omitted/empty initial state remains supported.

The complete next checkpoint is checked against the actual5120-byte UTF-8 JSON store cap before any data emission. Overflow returns413 without data or checkpoint; it requires a narrower predicate or another delivery strategy. There is no boundary truncation or fixed safe row-count promise. The outer100-page/10000-row/25MiB scan limits do not promise that every boundary fits in persisted state.

Other action and Product Type metadata behavior remains as described in the full report. Existing storage, source/schema, nontransactional mutation and polling limitations remain; this patch does not establish installation or live account acceptance.

Publisher evidence reports97 offline tests,97 sealed tests and39 canonical workers per runtime, plus92 numeric-state workers and37 parity checks. Independent re-review passed122 checks/120 workers, including actual5120 acceptance/5121 refusal and real store round-trip with a memory adapter. The packaged prepared receipt scans76 files; the coordinating publisher separately verified the final82-file scan. Host4576be and harnessf05a0c4d are pinned.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.2 (April 07, 2023)

* Fixed version mismatch

### 1.0.1 (December 30, 2019)

* Update component to new sailor version 2.5.4

### 1.0.0 (March 18, 2018)

* Initial release which includes a bunch of previous unversioned releases
