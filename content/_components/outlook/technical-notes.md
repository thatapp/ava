---
title: Outlook Technical Notes
layout: component
description: Technical Notes for Microsoft Outlook Component.
icon: outlook.png
icontext: Outlook component
category: outlook
updatedDate: 2025-07-22
ComponentVersion: 2.1.1
redirect_from:
  - /components/outlook/changelog.html
  - /components/outlook/completeness-matrix.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST approved Node 20 sidecar #69, #75/!129 and #72/!127**. [Published source](https://github.com/thatapp/connector-outlook/tree/1829c84b84a9fdf12209ddeb7691eac9004b0e74) · [Release scope](https://github.com/thatapp/connector-outlook/blob/1829c84b84a9fdf12209ddeb7691eac9004b0e74/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-outlook/blob/1829c84b84a9fdf12209ddeb7691eac9004b0e74/INTAKE.json).

68 npm tests on Node 20.20.2; 11 exact host cases across seven entries; require allowlist and secret scan PASS; zero network attempts.

All seven declared entries are exercised: Check Availability, Find Next Available Time, Create Event, Move Mail, Send Mail, Contacts, and Read Mail. Stored OAuth is used only with Microsoft Graph v1.0; host #57 owns renewal. Graph nextLink pages are drained before advancing a polling snapshot. Exact timestamps are retained, so same-time records may repeat rather than be skipped.

Read Mail attachments return scoped host references instead of legacy public storage links. Send Mail accepts a public HTTPS source URL or scoped reference and supports total attachment bytes below 3 MiB; larger upload sessions are not implemented. Optional attachment features require scoped storage wiring as well as #75. A recorded clean-room send reports an unsent operation. A Graph acceptance response is not delivery confirmation. Full recurring-calendar behavior and deployed storage remain UNVERIFIED.

Installation is handed off through the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication is not installation. No live vendor account, customer data, server access or deployment was used to establish these results.

The older reference below describes its source version. The scope and limits above supersede any conflicting runtime, attachment, environment-variable, or availability claim; historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

## 2.1.1 (July 22, 2025)

* Slightly improved error handling
* Updated Sailor 2.7.1 -> 2.7.5
* Updated axios 1.4.0 -> 1.10.0
* Updated @thatapp.io/component-commons-library 3.1.5 -> 3.2.2

### 2.1.0 (August 04, 2023)

* Added checkbox `Get Attachment` to `Poll for New Mail` trigger
* Added metadata field `Attachments` to `Send Mail` action

### 2.0.0 (July 19, 2023)

* Breaking change! Reworked authentication mechanism - implemented Secrets feature
* Add new action - Send Mail

### 1.0.3 (April 07, 2023)

* Fixed version mismatch

### 1.0.2 (November 27, 2020)

* Update Sailor version to 2.6.19
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.0 (July 29, 2020)

* Use this.logger functionality instead of console.log
* Update libs to latest versions
* Update sailor to 2.6.14 version
* Add `Poll for New Mail` trigger
* Add `Move Mail` action

### 0.0.3 (July 6, 2017)

* Initial release

## Completeness Matrix

Here is the Completeness Matrix for the Outlook component.

![Completeness Matrix for the Outlook component](https://user-images.githubusercontent.com/16806832/88404425-8a95f400-cdd6-11ea-8712-127d526efbf9.png)
