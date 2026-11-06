---
title: AWS SNS Technical Notes
layout: component
description: Technical Notes for the AWS SNS component.
icon: aws-sns.png
icontext: AWS SNS component
category: aws-sns
updatedDate: 2023-04-06
ComponentVersion: 1.2.4
redirect_from:
  - /components/aws-sns/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72 credential redaction and #75 text/XML transport.** [Published source](https://github.com/thatapp/connector-amazon-aws-sns/tree/5cabb841947edb99e14b2ee062cb22f071064036) · [Contract report](https://github.com/thatapp/connector-amazon-aws-sns/blob/5cabb841947edb99e14b2ee062cb22f071064036/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-amazon-aws-sns/blob/5cabb841947edb99e14b2ee062cb22f071064036/INTAKE.json).

The single **Publish** action retains TopicArn and AWS Region, the ten original region choices and the two static credential fields. It uses SigV4-signed form HTTP through the host instead of the old AWS SDK. There are no triggers. A standard commercial topic ARN must contain a twelve-digit account ID and match the chosen region; the nine-digit example below and in the historical screenshot is invalid. Region is required, replacing the source's silent eu-west-1 fallback.

Message selection follows the recovered source: a truthy incoming `body.message` must be a string and is published verbatim; otherwise the entire body is JSON-serialized. Empty string, false, zero and null therefore select the full body. Only Message and TopicArn are sent. FIFO groups/deduplication, subjects, attributes, protocol-specific MessageStructure, direct SMS/mobile endpoints and batching are outside this documented action. Temporary credential tokens, renewal and noncommercial AWS partitions are not offered.

The connector caps messages at 256 KiB of UTF-8 bytes, even though current SNS topics can be configured with a larger native limit. JSON serialization has depth/node bounds; the strict XML response parser is capped at 64 KiB and rejects DTD/entities, malformed documents and duplicate required fields. A valid HTTP 200 PublishResult emits `{MessageId}` after awaiting delivery. This confirms SNS acceptance, not subscriber delivery. Errors and ambiguous transport failures are not automatically retried. Replaying after acceptance or a failed downstream emit can duplicate notifications.

Verification now makes a signed STS GetCallerIdentity read in us-east-1, replacing the source's nonempty-field check. This verifies identity, not permission to publish to a topic. No environment variables or scoped attachment store are required.

This chat ran all four intake gates on Node 20.20.2 and 24.13.0: 42 npm tests, 17 canonical cases/24 isolated-worker runs, require allowlist and secret scan. Six supplemental actual workers check identity, redaction, throttling, malformed output, ambiguous failure and signed Unicode publication. Network attempts: zero. Tested runtime MR129 is `2483881b48440a06b21288085ecf7d7e29c7634a`; immutable MR157 harness is `5acb7d929bb1a32ea36699ff0de8f4b034e06ef0`. Main remains `c69ad16819b358c2ad6f506ed273b8a28f1ad8e4`.

Installation, live AWS/IAM permissions, subscriber delivery, UI and deployment remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical component versions and source guidance below remain preserved; the release scope above supersedes conflicting verification, ARN and availability claims.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.2.4 (April 06, 2023)

* Fixed version mismatch

### 1.2.3 (November 12, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.2.2 (May 22, 2020)

* Update Sailor version to 2.6.7

### 1.2.1 (June 15, 2018)

* Update Sailor version to 2.2.1

### 1.2.0 (April 20, 2016)

* Update Sailor version to 1.2.1

### 1.1.1 (January 25, 2016)

* Update Sailor version to 1.1.2

### 1.1.0 (January 7, 2016)

* Update Sailor version to 1.1.0

### 1.0.0 (July 29, 2015)

* Initial version
