---
title: Klaviyo component Technical Notes
layout: component
description: Technical Notes for the Klaviyo component.
icon: klaviyo.png
icontext: Klaviyo component
category: klaviyo
ComponentVersion: 1.0.0
updatedDate: 2024-12-04
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72 encoded credential recording**. [Published source](https://github.com/thatapp/connector-klaviyo-component/tree/df3d81d3c70644aed52db0034adf0a289f56014e) · [Release scope](https://github.com/thatapp/connector-klaviyo-component/blob/df3d81d3c70644aed52db0034adf0a289f56014e/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/e624e8dd9d8b5bba8d56818c85468651f1b24d1c/docs/ipaas/connector-submissions/klaviyo-component-evidence/intake-release.json).

138 offline npm tests and 109 actual sealed-worker tests pass with zero network attempts. The four-gate intake accepts both declared entries through its legacy smoke path; the separate 109-test suite establishes detailed methods, schemas, timestamp/resume and credential-recording behavior. Smoke alone is not field-parity proof.

The tested host is `09d6e37fc13c0b1e1b422975eb371fb76f71ae50`, runtime `fc1421ebf631e11351884dcb994ebc97fe23c76d`, with harness `5750876bcdd50dc4b652317d9b4ad417b433cc11`. A seeded credential probe leaks a URL-encoded key on the unchanged base and masks it on the reviewed [#72 host fix](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72). Installation remains conditional on that fix; the source secret scan alone does not prove safe runtime recording.

Make Raw Request and Get New and Updated Objects Polling use revision **2026-10-15**, replacing the historical default. Polling accepts only that verified revision. Raw/Verify may use an explicit syntactically valid override, with alternate compatibility unverified; fall-forward is disabled so a retired revision fails instead of silently changing semantics. Modern snapshots from the prior revision require reset.

Polling exposes 39 current private-key collections and 87 timestamp choices derived from the pinned official schema. All are exercised with actual emitted-snapshot resume. Required-query collections, parent-bound resources and public/client authentication surfaces are excluded. Primary JSON:API resources are emitted individually or as `{results: [...]}` batches; side-loaded included resources are not emitted separately. Page size is the output batch size, default/max 100, not the vendor page-size query parameter.

The trigger captures an upper bound before fetching, uses an inclusive initial time and a 60-second resume overlap, hashes resource versions and checkpoints only after successful delivery. Full scans are bounded to 100 pages, 10,000 rows, 25 MiB and 10,000 recent dedupe records. Late data older than the overlap, concurrent collection changes and submillisecond precision can cause gaps; timestamp choices do not reconstruct deletions or every intermediate change. Bounds and later-page failures produce no successful checkpoint or partial output.

Raw GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS accepts a relative private-API path and an optional JSON object up to 1 MiB, returning status/headers/body. Recorded writes retain an unsent 202 response and are not claimed as vendor completion. Binary transport is not offered; 429 errors propagate without automatic retries. Verification checks Lists access only; other resource permissions and live account behavior remain unverified.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication and offline compatibility do not establish live vendor behavior, hosted UI or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims; historical release facts remain preserved.

---

## Changelog

### 1.0.0 (December 04, 2024)

- Added `Make Raw Request` Action
- Added `Get New and Updated Objects Polling` Trigger
- Initial component release