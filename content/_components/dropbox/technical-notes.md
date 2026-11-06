---
title: Dropbox Technical Notes
layout: component
description: Technical Notes for the Dropbox component
icon: dropbox.png
icontext: Dropbox component
category: dropbox
updatedDate: 2022-10-07
ComponentVersion: 1.1.0
redirect_from:
  - /components/dropbox/completeness-matrix.html
  - /components/dropbox/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72/#75 transport/scoped storage, #58 custom environment and #80 legacy attachment URL parity.** [Published source](https://github.com/thatapp/connector-dropbox/tree/cb21f9ffab268150e4236add52e86afb9efe699e) · [Contract report](https://github.com/thatapp/connector-dropbox/blob/cb21f9ffab268150e4236add52e86afb9efe699e/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-dropbox/blob/cb21f9ffab268150e4236add52e86afb9efe699e/evidence/intake.json).

Four actions are implemented with a supplied access token: Get File By Path, Upsert File, Delete Folder Or File By Path and Create Folder. There are no triggers. This documentation chat independently read the published report and accepted intake: 80 offline tests, 34 canonical isolated-worker outcomes, allowlist and secret scan passing, zero network attempts. The publisher additionally records 82 sealed-loader tests and 23 guarded-worker audits; this chat did not rerun those suites.

File metadata passes through from Dropbox. Binary download uses native GET and stores exact bytes as an opaque scoped reference in `attachments.file`. Upsert consumes exactly one scoped reference and uploads with overwrite and autorename:false. Zero-byte files work. Legacy URL-backed attachment input and download/upsert `body.url` are not implemented: no temporary or fabricated URL substitutes for that contract. References enforce scope, expiry and integrity through the host capability.

The explicit environment table's 1,000,000-byte default/maximum is enforced in both directions. The conflicting 10 MB Known Limitations statement below does not apply. Custom ATTACHMENT_MAX_SIZE overrides cannot currently reach isolated workers (#58). Failed download emission attempts one real scoped removal, preserves the original error and does not repeat storage or emission; storage failure or worker termination can leave an object until expiry/reconciliation.

Allow Empty Result suppresses only structured path/not_found errors; permission failures remain errors. Create Folder uses the prose default Fail despite the screenshot's Skip default. Rename delegates native autorename; exact suffix behavior remains unverified. Skip suppresses only an existing-folder conflict, not a conflicting file. Root folder creation is rejected. Native metadata and verification POST reads are recorded unsent in clean-room mode and return no fabricated account/vendor result. Mutations have no automatic retries.

The receipt pins host `2483881b48440a06b21288085ecf7d7e29c7634a` and harness `8b953726f61a36e13963763273457c9bc2ad1421`. This chat independently verified the tag and unchanged main at `f8e487d35cf8a78f76de621a43af86c2b95d6dc9`. Actual stored-token authorization and production storage remain unverified.

Installation, deployment, live vendor/account acceptance, storage provisioning and UI behavior remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). The older reference and historical metadata below remain for context; the published scope and limitations above supersede conflicting runtime, URL and size claims.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.0 (October 07, 2022)

* Added attachment url to message body for `Get File By Path` action
* Update Sailor version to 2.7.0

### 1.0.4 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.0.3 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.0.2 (March 12, 2021)

* Upgrade to sailor 2.6.24

### 1.0.1 (November 10, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.0 (April 9, 2020)

* Add `Upsert File` action
* Add `Get File By Path` action
* Add `Delete File By Path` action
* Add `Create Folder` action

## Completeness Matrix

Dropbox component Completeness Matrix:

![image](https://user-images.githubusercontent.com/16806832/78768387-87e0d180-7994-11ea-8808-6fdff76930b7.png)
