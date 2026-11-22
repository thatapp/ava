---
title: Kafka component Technical Notes
layout: component
description: Technical Notes for the Kafka component.
icon: kafka.png
icontext: Kafka component
category: kafka
ComponentVersion: 1.1.1
updatedDate: 2024-12-02
---

## AVA 1.0.0 release status — 2026-10-31

**Published conditionally: #57/#72/#80/#83/#86 remain required.** [Exact source](https://github.com/thatapp/connector-blendededge-kafka-component-oih/tree/fc7788a42313d5776e5fc71d689cced7c95ab2bc) · [Full report](https://github.com/thatapp/connector-blendededge-kafka-component-oih/blob/fc7788a42313d5776e5fc71d689cced7c95ab2bc/REPORT.md) · [Pinned evidence](https://github.com/thatapp/connector-blendededge-kafka-component-oih/blob/fc7788a42313d5776e5fc71d689cced7c95ab2bc/evidence/qualified/qualification.json).

Produce implements the documented Messages array with string values and optional keys, preserving order, empty strings and Unicode. Each broker partition acknowledgement produces string topicName/partition/errorCode/baseOffset/logAppendTime/logStartOffset fields. No acknowledgement is invented per input message. Automatic topic creation and publication retries are disabled; uncertain completion refuses. Clean-room/VCR record requests unsent and refuse501 without contacting a provider.

Broker/SASL credentials and OAuth token acquisition remain in the parent; workers receive only public Topic/Group Id configuration. Verified TLS uses saved DNS broker SNI, omits SNI for IP literals and refuses endpoint/verification overrides or plaintext. Every discovered broker must be present in the saved allowlist. Custom trust remains #82. No extra credential fields beyond the documented ones are required.

Consume requires the private parent receiver lifecycle in [host MR171](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/171), corrected runtimed1a96439. One event per bounded cycle crosses isolated decoding and verified durable insertion/readback before a private group offset commit. Auto commit/resolve are disabled. Native close, heartbeats, assignment, scope and generation checks protect the handoff. Lost commit responses reuse matching durable work on redelivery; downstream success and provider exactly-once delivery are not promised. Stop/delete retains topics, group and offsets; retention gaps require explicit recovery. A new group starts at earliest retained position.

Bounds:1–100 produced messages/64KiB aggregate,48KiB value/8KiB key,64KiB received envelope. Value remains text; key is optional and partition is a string. Offsets are numbers when safe and exact decimal strings beyond the safe integer range, an explicit extension to the historical numeric description. The historical throughput/container claims below are unverified on AVA.

Both Node20.20.2 and24.13.0 pass33 unit tests,9 canonical rows,9 standalone hostcheck rows,22 supplemental actual workers and4 actual-source lifecycle cases through the durable ledger, worker run loop and published downstream mapper. Final whole-package four-gate intake passes with75 text files scanned and zero network attempts. Ten source blobs and29 raw artifacts are pinned, including failed external-driver receipts and their corrections. No live broker/wire, Mongo replication, permission, installation, deployment or final combined-host qualification is claimed. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical notes below remain preserved.

---

## Changelog

### 1.1.1 (December 02, 2024)

* Fixed issue when `Consume` trigger stops working when used `SASL/OAUTHBEARER` authentication mechanism

### 1.0.1 (July 05, 2024)

* Added new authentication mechanism: `SASL/OAUTHBEARER`.

### 1.0.0 (January 13, 2023)

* Added `Produce` Action
* Added `Consume` Trigger
* Initial component release
