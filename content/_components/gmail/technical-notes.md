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
