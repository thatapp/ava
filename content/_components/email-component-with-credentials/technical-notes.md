---
title: Email component with Credentials Technical Notes
layout: component
description: Technical Notes for the Email component with Credentials.
icon: email-with-credentials.png
icontext: Email component with Credentials
category: email
ComponentVersion: 1.0.1
updatedDate: 2026-05-07
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #58/#72/#75/#80 remain required.** [Exact source](https://github.com/thatapp/connector-email-component-with-credentials/tree/459f77786bf76e995e010609525caa63f5a22def) · [Full report](https://github.com/thatapp/connector-email-component-with-credentials/blob/459f77786bf76e995e010609525caa63f5a22def/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-email-component-with-credentials/blob/459f77786bf76e995e010609525caa63f5a22def/evidence/precommit-intake-24.json). This authored implementation follows the AVA and native Mailchimp Transactional contracts; it is not recovery of the unexamined upstream code named in the original fleet seed. Existing main and history are preserved. The separate platform-environment Email connector is unchanged.

Send Email accepts Mandrill API key/URL, required sender name/address, comma-separated To/Cc/Bcc, subject and text/HTML. Text objects/arrays are JSON-stringified; HTML passes unchanged with inline_css:true. Rendering is provider/client behavior, not locally verified. Recipient results must form a complete unique set and are matched by email, with sent/queued/scheduled/rejected/invalid mappings. SubmittedAt is local submission time padded to seven fractional digits, not delivery time or higher clock precision. Verification requires PONG! from users/ping.json; no real account was used.

Attachments use anonymous HTTPS or an explicit scoped reference, exactly one selector per entry. At most100 entries,255-byte basename/MIME fields and8192-byte URLs are accepted. All metadata and complete file reads finish before the one Send POST. API keys and caller authentication are not forwarded to downloads; references remain caller-owned and are never removed. Anonymous accessible HTTPS works, while authenticated legacy platform URLs remain unsupported. Scoped references are an explicit extension rather than URL parity.

Binary bytes are preserved, including empty/high-bit/JSON-looking files. Independent review first caught a partial206 download being sent as a complete file; the released correction refuses206 or any Content-Range before Send. Unencoded identity-length mismatches also refuse, while already-decoded/compressed or transfer-coded responses do not compare wire length with decoded bytes. Transport framing/decoding remains host-owned; synthetic tests are not live decompression proof.

The complete serialized request, including credentials, metadata and base64 expansion, must fit5MiB or a smaller supported MAX_BODY_LENGTH. The documented10MiB default does not override the host, and the isolated worker withholds custom environment overrides (#58). Errors before Send never deliver partial attachments. Sends are not automatically retried. With suppression enabled, known recipient outcomes are retained; ambiguous transport failure has explicit deliveryStatus:unknown. Input, attachment, size and clean-room-preview failures still throw. Neither queued results nor suppression establish delivery.

The publisher records both Node20.20.2/24.13.0 final checks:98 offline tests,98 sealed-loader tests,24 canonical workers, all four gates,50 source checks/55 workers and51 independent root workers, zero external network attempts and zero caller reference removals. This documentation chat read the full report and accepted packaged43-file intake, checked the exact annotated tag/main, and attributes those suites to their publisher/reviewer rather than claiming a rerun. Host4576be and harnessf05a0c4d are candidate dependencies; real scoped storage injection, tenant persistence, UI, account permissions and delivery remain unverified. The report preserves the documented API URL default and discloses native-spec/version drift.

Tag object20b1e2d45211586afc77ebaf0605492940911758 peels to the source above; main staysc7cf081cf936cc5053f885035abc01e600820801. No installation or deployment is claimed. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical source release notes below remain verbatim.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.1 (May 07, 2026)

* Enabled automatic CSS inlining for HTML emails by adding `inline_css: true` to Mandrill API requests.
* Updated `README.md` with documentation on HTML email styling best practices and provided an inlined HTML example.
* Upgraded dependencies to latest stable versions:
    * `thatapp-sailor-nodejs`: 2.7.4 -> 2.7.8
    * `@thatapp.io/component-commons-library`: 3.2.1 -> 4.0.0
    * `axios`: 1.7.7 -> 1.16.0
    * `moment`: 2.29.4 -> 2.30.1
* Removed `thatapp-node` dependency and replaced it with a local utility.

### 1.0.0 (November 22, 2024)

* Initial release
* Copy of the existing [Email component](/components/email/index.html), enhanced with the ability to set custom credentials, allowing flexible management of different domains, workflows, and API keys.