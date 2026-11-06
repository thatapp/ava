---
title: Slack Technical Notes
layout: component
description: Technical Notes for the Slack component
icon: slack.png
icontext: Slack component
category: slack
updatedDate: 2025-02-02
ComponentVersion: 1.1.1
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped stored-token action installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-slack/tree/3effc2853be155437516bbdbe84c5ee56a94e51a) · [Release scope](https://github.com/thatapp/connector-slack/blob/3effc2853be155437516bbdbe84c5ee56a94e51a/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-slack/blob/3effc2853be155437516bbdbe84c5ee56a94e51a/INTAKE.json).

15 npm tests; 175 inherited/new entry smoke checks; 7 exact documented-action cases; require allowlist and secret scan PASS; zero network attempts.

The supported documented actions are Lookup Object (User by ID or email), Make Raw Request (GET/POST within Slack API), and Post Message. The stored OAuth token is consumed by the connector; provisioning and renewal remain host #57. Missing lookup values/users produce an empty object only when their corresponding allow option is enabled.

The 172 inherited wrappers remain for compatibility. Their loader smoke pass does not establish current Slack endpoint availability. Historical generic Delete/Lookup Objects/Upsert selectors are not implemented with the documented generic interface. Webhook subscription lifecycle is blocked by host #74. No full historical or UI parity is claimed.

Installation is handed off through the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication is not installation. No live vendor account, customer data, server access or deployment was used to establish these results.

The older reference below describes its source version. The scope and limits above supersede any conflicting runtime, attachment, environment-variable, or availability claim; historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

## 1.1.1 (February 02, 2025)

* Fixed CircleCI issue

## 1.1.0 (January 31, 2025)

* Added `Delete Object` Action
* Revitalized `Lookup Object (at most one)` Action
* Added `Lookup Objects (plural)` Action
* Added `Upsert Object` Action
* Added `Webhook` Trigger
* Updated the Node engine to version 20.x.
* Updated the Sailor version to 2.7.4
* Updated dev dependencies

### 1.0.0 (July 15, 2022)

* Added `Make Raw Request` Action
* Added `Lookup Object (at most one)` Action
* Added `Post Message` Action
* Initial component release
