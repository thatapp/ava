---
title: Bazaarvoice Technical Notes
layout: component
description: Technical Notes for the Bazaarvoice component.
icon: bazaarvoice.png
icontext: Bazaarvoice component
category: bazaarvoice
updatedDate: 2025-11-14
ComponentVersion: 0.0.4
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #72 recording integration and documented source/account/Curations limits.** [Exact source](https://github.com/thatapp/connector-bazaarvoice/tree/8c170b4498387191984752897f077c8ee0386156) · [Full contract report](https://github.com/thatapp/connector-bazaarvoice/blob/8c170b4498387191984752897f077c8ee0386156/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-bazaarvoice/blob/8c170b4498387191984752897f077c8ee0386156/INTAKE.json).

Twelve actions cover Conversations reads/submissions and Curations content retrieval; there are no triggers. Both API credential channels use official origins and bounded opaque keys. Native response envelopes and business tokens remain intact except where credential masking applies. HasErrors/Errors/FormErrors or failed HTTP responses fail without emitting success.

Verification authenticates Conversations only. It does not independently verify Curations, and the host does not retain the verifier's explanatory return message; that limitation is stated here explicitly. PhotoUrl is forwarded without downloading. externalAuthorId maps to UserId, not an invented encrypted authentication token. Account-specific required fields, hosted-auth completion and Curations entitlement remain vendor/account concerns.

Pagination is one requested page under the documented limit/offset fields. Missing original schemas were reconstructed from published examples; broader schema parity is not asserted. Clean-room submission POSTs are recorded unsent and refuse fabricated success. There is no OAuth or attachment-store dependency in this connector.

Publisher evidence reports95 offline tests,96 sealed-loader tests and38 canonical workers on both runtimes. Independent review has52 checks:51 actual workers and one preflight Unicode refusal, with initially empty redactors and zero leaks/network attempts. The packaged scan covers65 files. Host4576be and harnessf05a0c4d remain integration dependencies.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 0.0.4 (November 14, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 0.0.3 (August 12, 2021)

* Update Sailor version to 2.6.26
* Remove integration tests from build

### 0.0.2 (December 10, 2020)

* Update Sailor version to 2.6.21
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 0.0.1 (April 20, 2018)

* Initial release
