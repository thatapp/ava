---
title: Google Analytics component Technical Notes
layout: component
description: Technical Notes for the Google Analytics component.
icon: google-analytics.png
icontext: Google Analytics component
category: google-analytics
ComponentVersion: 1.0.0
updatedDate: 2024-09-03
---

## AVA 1.0.1 durable polling correction — 2026-10-30

**Published with conditional requirements #57/#72/#79/#80.** [Exact source](https://github.com/thatapp/connector-google-analytics-component/tree/76187ceef1ae0881ebb092594277a3ba7b4b0737) · [Full report](https://github.com/thatapp/connector-google-analytics-component/blob/76187ceef1ae0881ebb092594277a3ba7b4b0737/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-google-analytics-component/blob/76187ceef1ae0881ebb092594277a3ba7b4b0737/INTAKE.json). This verified tag replaces the defective1.0.0 checkpoint path; older release text below remains historical.

Version3 snapshots store numeric SHA-256 digests, counts and millisecond timestamps. They do not persist or encode raw business rows to evade credential masking. Pending prefixes are fetched again and verified before continuation. Single Page polling can therefore repeat earlier HTTP pages; it is not a one-request-per-invocation promise or a transactional vendor report.

Polling now permits at most50 rows in the complete report and5120 serialized UTF-8 bytes per checkpoint. The entire next checkpoint is checked before any data emission. Oversize reports/state refuse413 and require narrowing or another delivery strategy. These are connector durability limits, not Google API limits.100 HTTP pages including replay,3MiB transient rows and a55-second scheduling budget also apply. Historical10000-row/4MiB durable-state claims are superseded.

Valid bounded legacy v2 state migrates by a complete rescan and saved-prefix verification. Corrupted/redacted v2 refuses409; oversized legacy state refuses413; version1/unknown versions require explicit reset. Resets may replay outputs. Aggregate rescanning remains distinct from an event/object modification feed, with the report's UTC/minute/cohort/alpha-continuation and source-contract limitations.

The publisher verified both runtimes with156 offline tests,45 canonical workers,100 independent actual workers and54 real store round-trips, plus80 source workers/2500 decimal oracles.156 unit tests are not described as sealed-worker runs. The documentation chat checked the remote accepted intake and exact tag; it did not rerun those suites. Host4576be and harnessf05a0c4d remain integration dependencies. Old1.0.0 is immutable. Installation, live OAuth/property permissions and UI acceptance remain unverified.

---

## Known polling defect in AVA 1.0.0 — 2026-10-30

**Polling qualification is restricted by a reproduced checkpoint defect.** A coordinating actual-worker audit reproduced a short-credential defect in published1.0.0: masking its string configuration hash makes a resumed poll fail409. At the time of that audit the correction was under review; the verified1.0.1 release above now supersedes this1.0.0 defect.

This qualification supplements the earlier release evidence below; it does not erase the narrower tests that passed. Installation and live acceptance remain unverified. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) for the reviewed replacement and exact pins. An explicit reset may replay records; no automatic recovery is promised.

---

## AVA 1.0.0 source release — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 OAuth and #72 integration; #80 polling limits and #79 source-contract gaps.** The immutable [1.0.0 source](https://github.com/thatapp/connector-google-analytics-component/tree/4cab7ab42d25d787a597fba22f4c67397f893076) is separate from the historical versions below. See the [current scope and limitations](index#ava-100-release-status--2026-10-30) and [full report](https://github.com/thatapp/connector-google-analytics-component/blob/4cab7ab42d25d787a597fba22f4c67397f893076/REPORT.md). All four local intake gates pass; installation, live vendor acceptance and UI behavior remain **UNVERIFIED**.

## Changelog

## 1.0.0 (September 03, 2024)

* Added `Get New and Updated Objects Polling` Trigger
* Added `Make Raw Request` Action
* Initial component release