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

## AVA 1.0.0 source release — 2026-10-30

**PUBLISHED scoped; WAITING HOST #57 OAuth and #72 integration; #80 polling limits and #79 source-contract gaps.** The immutable [1.0.0 source](https://github.com/thatapp/connector-google-analytics-component/tree/4cab7ab42d25d787a597fba22f4c67397f893076) is separate from the historical versions below. See the [current scope and limitations](index#ava-100-release-status--2026-10-30) and [full report](https://github.com/thatapp/connector-google-analytics-component/blob/4cab7ab42d25d787a597fba22f4c67397f893076/REPORT.md). All four local intake gates pass; installation, live vendor acceptance and UI behavior remain **UNVERIFIED**.

## Changelog

## 1.0.0 (September 03, 2024)

* Added `Get New and Updated Objects Polling` Trigger
* Added `Make Raw Request` Action
* Initial component release