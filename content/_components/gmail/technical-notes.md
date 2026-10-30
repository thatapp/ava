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

## Known polling defect in AVA 1.0.0 — 2026-10-30

**Polling qualification is restricted by a reproduced checkpoint defect.** A coordinating actual-worker audit reproduced a short-credential defect in published1.0.0: string ISO lastUpdated can be masked, then the next poll fails400 before HTTP. A long-token control passes. The old tag is preserved; a corrective source patch is under review and is not yet a verified published replacement.

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
