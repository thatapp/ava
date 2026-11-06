---
title: Magento1 Technical Notes
layout: component
description: Technical Notes for the Magento 1 component.
icon: magento.png
icontext: Magento1 component
category: magento1
updatedDate: 2023-04-06
ComponentVersion: 1.3.2
redirect_from:
  - /components/magento1/changelog.html
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #57 metadata authentication, #72 dynamic session integration, #80 bounded enumeration/field parity.** [Exact source](https://github.com/thatapp/connector-magento1/tree/a29252e6229acde3129b82388e4a014c9df940d0) · [Full contract report](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/INTAKE.json).

Three actions and two full-enumeration triggers use XML-RPC v1. Product upsert resolves SKU, category assignment preserves the optional position, and inventory uses the product stock-data path. Triggers hydrate orders/customers and repeat the current bounded set on each run; their completion snapshots are not incremental change cursors.

Dynamic session IDs must be acknowledged by the host secret-registration capability before business or cleanup requests. Host MR161 runtime `d9dd758ca8ab3580c584d5c602c51ad9d853dc8d` is required. A host without that capability refuses before login. Generic UI metadata authentication remains conditional because a clean-room login POST is recorded unsent.

The published implementation is derived from the explicitly non-vendor-hosted OpenMage archive of Magento1.9.4.5. Broad historical version/edition compatibility and the unnamed31/425/38 field counts are not established. Triggers cap200 records; mutations are nontransactional, do not retry, and may have happened before a cleanup error. Domain/subdirectory/complex-product and ID/SKU limits remain in the report. The historical account-setup screenshots are vendor prerequisites, not implemented account-provisioning actions.

Publisher evidence reports52 offline tests,53 sealed-loader tests and21 canonical worker outcomes per runtime, plus30 independent workers. The packaged intake scans36 files; its final external scan includes the receipt itself. Zero network attempts are reported.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.3.2 (April 06, 2023)

* Fixed version mismatch

### 1.3.1 (March 3, 2020)

* Add configuration for Secured connection in credentials

### 1.3.0 (November 6, 2019)

* Update sailor version to 2.2.1

### 1.2.0 (January 7, 2016)

* Update sailor version to 1.1.0

### 1.1.0 (November 26, 2015)

* Update sailor version to 1.0.3

### 1.0.0 (July 29, 2015)

* Initial release
