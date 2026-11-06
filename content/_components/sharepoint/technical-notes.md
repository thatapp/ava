---
layout: component
title: SharePoint  Technical Notes
description: Technical Notes for SharePoint component.
icon: sharepoint.png
icontext: SharePoint component
category: sharepoint
ComponentVersion: 1.0.0
updatedDate: 2026-01-28
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; NOT READY: host #57/#72/#75 and contract/parity limits remain**. [Published source](https://github.com/thatapp/connector-ai-now-ag-aibox-sharepoint-connector/tree/914464792ac1910a344455ba8f3d79a234ad01b8) · [Release scope](https://github.com/thatapp/connector-ai-now-ag-aibox-sharepoint-connector/blob/914464792ac1910a344455ba8f3d79a234ad01b8/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-ai-now-ag-aibox-sharepoint-connector/blob/914464792ac1910a344455ba8f3d79a234ad01b8/evidence/intake.json).

85 offline npm tests, 82 exact isolated-worker fixture rows and 33 supplemental sealed-worker audits pass. Require allowlist and secret scan pass with zero network attempts. Host `2483881b48440a06b21288085ecf7d7e29c7634a` includes the reviewed #72/#75 changes; harness `82cf1920f75833cb9757a4eaa980ff3c295faf18` runs the fixtures. These checks do not establish a combined deployment of all prerequisites.

This release replaces the active aibox Vector KB updater with five Graph actions and one polling trigger on its feature branch/tag. The old action is preserved in Git history, not exposed as an undocumented AVA function. Consumers of that action must retain the earlier source version.

Native structural Graph metadata and dictionaries cover lookup/list/delete/upsert/raw operations. Drive content supports an unauthenticated HTTPS file URL or text content, including empty text; Graph credentials are not forwarded to the file host. The tested byte transport is limited to 5 MiB, not the historical 250 MB. Large upload sessions are unbuilt. Maester download options explicitly refuse 501 because a Maester destination/internalUrl/lifecycle contract is not implemented under [#75](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/75).

Sites listing explicitly refuses 422: the all-sites API requires application permissions, while the documented authorization-code setup provides delegated permissions. Native structural fields are present, but tenant-specific required/custom-column discovery and navigation expansions are not exhaustive (#79). The historical automatic sample/debug page-size reduction to 10 is unbuilt; explicit pageSize remains 1–100.

Polling supports Base Site Pages and List Items with created/modified timestamps, individual/page output, strict-after resume and configuration fingerprints. It buffers a bounded full scan (100 pages/10,000 rows) before emission. Snapshots follow successful delivery; the documented empty-run +1 second behavior is implemented. Equal/late timestamps and collection changes during pagination can still miss records; no transactional snapshot or delta cursor is claimed (#80).

Retries apply only to explicit 429 responses, within a 55-second window; ambiguous writes and other errors are not replayed. Default retry settings work directly. Saved custom retry settings and parent-owned bearer renewal need [OAuth MR !154](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/154), runtime commit `04aab9a1fd7e6a824ad52b9533f10ff810d0b9e5`. That change is separate from the tested binary checkout. Host wiring, Maester behavior, full binary capacity, metadata completeness and polling limitations keep this release **NOT READY**.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## Changelog

### 1.0.0 (January 28, 2026)

* Added `Delete Object By ID` Action
* Added `Get New and Updated Objects Polling` Trigger
* Added `Lookup Object By ID` Action
* Added `Lookup Objects (plural)` Action
* Added `Make Raw Request` Action
* Added `Upsert Object` Action
* Initial component release