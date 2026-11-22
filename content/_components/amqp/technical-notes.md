---
layout: component
title: AMQP Technical Notes
description: Technical Notes for AMQP component.
icon:  amqp.png
icontext: AMQP component
category: amqp
ComponentVersion: 1.4.4
updatedDate: 2026-01-15
redirect_from:
  - /components/amqp/changelog.html
---

## AVA 1.0.0 release status — 2026-10-31

**Published conditionally: #57/#58/#72/#80/#83/#86 remain required.** [Exact source](https://github.com/thatapp/connector-amqp/tree/a0ca09dc7ecb615d90205171e7108709da8909f1) · [Full report](https://github.com/thatapp/connector-amqp/blob/a0ca09dc7ecb615d90205171e7108709da8909f1/REPORT.md) · [Pinned evidence](https://github.com/thatapp/connector-amqp/blob/a0ca09dc7ecb615d90205171e7108709da8909f1/evidence/qualified/qualification.json).

Publish preserves own payload false/zero/null or the full body when payload is absent. Default parent AES encrypts the historical body/attachments envelope; unencrypted publication serializes the selected payload. Opaque attachment metadata is preserved. Output emits the original body only after native confirmation and mandatory routing. Uncertain completion refuses; no source retry is introduced. Clean-room/VCR record unsent and refuse501 with zero provider calls. The applied saved URI and scoped AES password/16-byte IV remain parent-only; missing default AES configuration refuses (#58).

Consume requires the private parent durable lifecycle in [host MR171](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/171), corrected runtime90bdde1c4. One bounded object-body event with stable messageId is decoded in the isolated source and durably persisted/read back before private ACK and same-channel queue readback. basic.ack itself has no broker response. Matching redelivery reuses durable work even after business completion; downstream success is separate. Missing nondurable queues require explicit recovery.

Queue ownership uses a broker-generated fresh physical name, saved durably in private generation state before binding/activation. The historical logical ava_consumer_USER_FLOW scope/generation alias remains event identity, separate from the physical resource. Only confirmed private resources can be pulled/deleted; foreign queues stay untouched. Unknown creation or failed returned-name persistence retains cleanup_required without guessed deletion. Unsafe older v1 records refuse adoption. Nondurable/nonexclusive/autoDelete properties remain; RabbitMQ4.3+ requires compatible broker configuration/permission. No broker setting is changed. basic.get does not establish an auto-delete consumer; explicit owned cleanup remains necessary. Shared exchanges stay retained.

Bounds are48KiB source JSON,64KiB native message/frame,2MiB per parent cycle and one received event per cycle. Raw scalar/array receive payloads refuse because the host requires an object body; encrypted envelopes are emitted complete. Reconnect settings apply only to establishment. Parent-only amqplib0.10.9 uses pre-parser bounds, verified TLS/DNS SNI and bounded1000ms close; custom trust remains #82. Historical throughput/container limits below are unverified on AVA.

Both Node20.20.2 and24.13.0 pass35 unit tests,10 canonical rows,10 standalone hostcheck rows,24 supplemental actual workers and8 actual-source durable lifecycle cases. All final package gates pass104 text files/zero network attempts. Ten source blobs and49 raw artifacts are pinned, with original failed driver receipts retained. Independent review rejected the earlier named-declaration ownership race before publication; corrected exact-source review passes4/4 controls each runtime, clearing that acquisition finding only. No final combined-host/#86 readiness, live broker/wire, Mongo replication, permissions, installation or deployment is claimed. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical notes remain below.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.4.4 (January 15, 2026)

* Updated Node.js engine requirement to `24.x`.
* Upgraded dependencies:
  * `amqp-connection-manager`: 4.1.14 -> 5.0.0
  * `thatapp-sailor-nodejs`: 2.7.2 -> 2.7.7
* Got rid of `thatapp-node` and `amqplib` dependencies
* Updated CircleCI configuration to reflect Node 24 upgrade.
* Enhanced README for clarity, improved language, and better formatting.

### 1.4.3 (July 05, 2024)

* Now logs and messages for `Consume` trigger will be located in the last flow execution.
* Upgrade to sailor `2.7.2`.
* Upgrade amqplib to `0.10.4`.

### 1.4.2 (March 27, 2023)

* Fixed issue with shutdown hook in `Consume` trigger.

### 1.4.1 (March 27, 2023)

Fixed connection cloning in `Publish` action.

### 1.4.0 (March 25, 2023)

* Implemented retry mechanism on connection errors.
* Added configuration fields to set retry options.
* Added `Don't encrypt payload` and `Content-Type` configuration fields to `Publish` action.
* Added `Don't decrypt payload` configuration field to `Consume` trigger.
* Upgrade to sailor `2.7.1`.
* Upgrade amqplib to `0.10.3`.

### 1.3.3 (March 25, 2021)

* Upgrade to sailor `2.6.24`.

### 1.3.2 (November 5, 2020)

* Upgrade to sailor `2.6.18`.
* Annual audit of the component code to check if it exposes a sensitive data in the logs.
* Annual npm vulnerabilities audit.

### 1.3.1 (May 22, 2020)

* Update sailor version to `2.6.7`.

### 1.3.0 (April 21, 2017)

* Update sailor version to `2.1.0`.

### 1.2.0 (February 21, 2017)

* Update sailor version to `2.0.0`.

### 1.1.0 (December 16, 2016)

* Add Consume Trigger.

### 1.0.0 (December 15, 2016)

* Initial release.
* Add Publish Action.
