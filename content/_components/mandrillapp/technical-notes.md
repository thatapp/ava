---
title: Mandrillapp Technical Notes
layout: component
description: Technical Notes fot the Mandrillapp component.
icon: mandrillapp.png
icontext: Mandrillapp component
category: mandrillapp
updatedDate: 2023-04-06
ComponentVersion: 1.0.0
---

## AVA 1.0.0 release status — 2026-10-31

**Published conditionally: #57/#72/#74/#80 remain required.** [Exact source](https://github.com/thatapp/connector-mandrillapp/tree/c08916c81599154fe7feae666c1b79e9a0daf780) · [Full report](https://github.com/thatapp/connector-mandrillapp/blob/c08916c81599154fe7feae666c1b79e9a0daf780/REPORT.md) · [Pinned evidence](https://github.com/thatapp/connector-mandrillapp/blob/c08916c81599154fe7feae666c1b79e9a0daf780/evidence/qualified/qualification.json).

Send Template retains the original API-key credential, template selector, dynamic published merge tags, mapped values and first-recipient output. Every recipient rejection is checked before output; atomic or idempotent email delivery is not promised. The fixed API 1.4 origin follows the pinned official OpenAPI. Read operations also use POST, so clean-room records them unsent and refuses501.

Inbound e-mail uses parent-owned lifecycle, exact callback ownership and current exact-URL webhook-key lookup. Automatic inbound webhook-key lookup is a documented inference, tested with synthetic fixtures and unverified against an account. Mandatory protected callbacks and HMAC-SHA1 are verified before business handoff. Empty setup validation creates no business event or run and requires the corrected [host MR170](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/170). Full inbound events are emitted individually; attachment strings remain opaque JSON. No attachment-store or provider exactly-once guarantee is claimed.

Both Node20.20.2 and24.13.0 pass57 unit tests,9 canonical rows,9 standalone rows,25 supplemental isolated workers and6 actual-source lifecycle cases. The latter exercise durable handoff into the real run loop and downstream mapper, replay suppression, wrong signatures, parent signing-key reflection rejection and uncertain create/delete recovery. All four final intake gates pass, including89-file secret scans, with zero network attempts. Ten source Git blobs and38 exact archived receipts are pinned; failed fixture/driver attempts are retained. Runtime1fb571ed3 has the same whole ai-engine tree as combined corrected runtimef6798247. These results do not establish final combined-host qualification, installation, provider permissions or live delivery. Historical notes below remain preserved. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62).

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.0 (April 06, 2023)

* Fixed version mismatch

### 0.0.2 (December 20, 2020)

* Upgrade to sailor 2.6.21
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 0.0.1 (January 9, 2017)

* Initial release of OIH standardized component
