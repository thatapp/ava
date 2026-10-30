---
title: Gmail Technical Notes
layout: component
description: Technical Notes for the Gmail component.
icon: gmail.png
icontext: Gmail component
category: gmail
updatedDate: 2023-09-08
ComponentVersion: 1.0.1
---

## AVA 1.0.1 durable polling correction — 2026-10-30

**Published with conditional requirements #57/#58/#72/#75/#80.** [Exact source](https://github.com/thatapp/connector-gmail/tree/1a688b3d965471b53d2da3a7df270a0780499721) · [Full report](https://github.com/thatapp/connector-gmail/blob/1a688b3d965471b53d2da3a7df270a0780499721/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-gmail/blob/1a688b3d965471b53d2da3a7df270a0780499721/INTAKE.json). This verified tag supersedes the1.0.0 short-credential checkpoint defect. Older release and defect text below is historical; the old tag is unchanged.

Get New Emails now persists exactly numeric stateVersion2 and integer lastUpdatedMs, under64 serialized UTF-8 bytes. No business value or encoded business data is placed in the checkpoint. Null, omitted and empty-object state initialize normally. An exact legacy lastUpdated UTC ISO object migrates with millisecond precision. Corrupt timestamps, extra fields, partial/unknown versions, numeric strings, fractions and out-of-Date-range numbers refuse400 before HTTP or emission. An explicit reset can replay messages.

Polling still resumes from the later of configured Start Time and saved time, with an inclusive start and exclusive end. Same/future windows make no HTTP call and retain the later time. Successful complete windows advance only after emission. The received-time query does not discover late-imported/backdated messages before the watermark and does not guarantee exactly-once delivery.

The publisher and independent reviewer report148 offline tests,148 sealed-loader tests,43 canonical workers,95 independent actual workers with59 real emitted-state save/get round trips,23 attachment audits and16 saved-OAuth checks plus2 workers on each Node runtime. This documentation chat read the full remote report and accepted intake and verified the annotated tag/peeled commit; it did not rerun those suites. Host4576be and harnessf05a0c4d remain candidate dependencies. The OAuth proof deliberately combines separate MR154 credential code with the pinned host and exposes supplemental-config loss in the latter; it is not a merged integration or live-consent proof.

Five actions, scoped attachment ownership and the earlier MIME/bounds qualifications remain. Legacy attachment URLs and15MB capacity remain unavailable;5MiB HTTP envelopes and base64 expansion constrain actual files. Default gmail.readonly does not authorize sending/deletion. Installation, UI, live OAuth/renewal and vendor acceptance remain unverified.

---

## Known polling defect in AVA 1.0.0 — 2026-10-30

**Polling qualification is restricted by a reproduced checkpoint defect.** A coordinating actual-worker audit reproduced a short-credential defect in published1.0.0: string ISO lastUpdated can be masked, then the next poll fails400 before HTTP. A long-token control passes. The old tag is preserved; the verified1.0.1 correction above now supersedes this historical defect.

This qualification supplements the earlier release evidence below; it does not erase the narrower tests that passed. Installation and live acceptance remain unverified. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) for the reviewed replacement and exact pins. An explicit reset may replay records; no automatic recovery is promised.

---

## AVA 1.0.0 source release — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 OAuth, #72/#75 transport/scoped storage, #58 custom environment and #80 URL/size/polling parity.** The immutable [1.0.0 source](https://github.com/thatapp/connector-gmail/tree/3955a08310b705dfe97448f6e610b10bbf7d3055) is separate from the historical versions below. See the [current scope and limitations](index#ava-100-release-status--2026-10-30) and [full report](https://github.com/thatapp/connector-gmail/blob/3955a08310b705dfe97448f6e610b10bbf7d3055/REPORT.md). All four local intake gates pass; installation, live vendor acceptance and UI behavior remain **UNVERIFIED**.

## Changelog

### 1.0.1 (September 08, 2023)

Fixed bug when component does't emit results in `Search emails` Action

### 1.0.0 (September 07, 2023)

* Added `Get New Emails` Trigger
* Added `Make Raw Request` Action
* Added `Delete Email By ID` Action
* Added `Get Email by ID` Action
* Added `Search emails` Action
* Added `Send Email` Action
* Initial component release
