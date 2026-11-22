---
title: AMQP component
layout: component
section: Protocol components
description: An open standard application layer protocol for passing business messages between applications or organizations.
icon:  amqp.png
icontext: AMQP component
category: amqp
ComponentVersion: 1.4.4
updatedDate: 2026-01-15
---

## AVA 1.0.0 release status — 2026-10-31

**Published conditionally: #57/#58/#72/#80/#83/#86 remain required.** [Exact source](https://github.com/thatapp/connector-amqp/tree/a0ca09dc7ecb615d90205171e7108709da8909f1) · [Full report](https://github.com/thatapp/connector-amqp/blob/a0ca09dc7ecb615d90205171e7108709da8909f1/REPORT.md) · [Pinned evidence](https://github.com/thatapp/connector-amqp/blob/a0ca09dc7ecb615d90205171e7108709da8909f1/evidence/qualified/qualification.json).

Publish preserves own payload false/zero/null or the full body when payload is absent. Default parent AES encrypts the historical body/attachments envelope; unencrypted publication serializes the selected payload. Opaque attachment metadata is preserved. Output emits the original body only after native confirmation and mandatory routing. Uncertain completion refuses; no source retry is introduced. Clean-room/VCR record unsent and refuse501 with zero provider calls. The applied saved URI and scoped AES password/16-byte IV remain parent-only; missing default AES configuration refuses (#58).

Consume requires the private parent durable lifecycle in [host MR171](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/171), corrected runtime90bdde1c4. One bounded object-body event with stable messageId is decoded in the isolated source and durably persisted/read back before private ACK and same-channel queue readback. basic.ack itself has no broker response. Matching redelivery reuses durable work even after business completion; downstream success is separate. Missing nondurable queues require explicit recovery.

Queue ownership uses a broker-generated fresh physical name, saved durably in private generation state before binding/activation. The historical logical ava_consumer_USER_FLOW scope/generation alias remains event identity, separate from the physical resource. Only confirmed private resources can be pulled/deleted; foreign queues stay untouched. Unknown creation or failed returned-name persistence retains cleanup_required without guessed deletion. Unsafe older v1 records refuse adoption. Nondurable/nonexclusive/autoDelete properties remain; RabbitMQ4.3+ requires compatible broker configuration/permission. No broker setting is changed. basic.get does not establish an auto-delete consumer; explicit owned cleanup remains necessary. Shared exchanges stay retained.

Bounds are48KiB source JSON,64KiB native message/frame,2MiB per parent cycle and one received event per cycle. Raw scalar/array receive payloads refuse because the host requires an object body; encrypted envelopes are emitted complete. Reconnect settings apply only to establishment. Parent-only amqplib0.10.9 uses pre-parser bounds, verified TLS/DNS SNI and bounded1000ms close; custom trust remains #82. Historical throughput/container limits below are unverified on AVA.

Both Node20.20.2 and24.13.0 pass35 unit tests,10 canonical rows,10 standalone hostcheck rows,24 supplemental actual workers and8 actual-source durable lifecycle cases. All final package gates pass104 text files/zero network attempts. Ten source blobs and49 raw artifacts are pinned, with original failed driver receipts retained. Independent review rejected the earlier named-declaration ownership race before publication; corrected exact-source review passes4/4 controls each runtime, clearing that acquisition finding only. No final combined-host/#86 readiness, live broker/wire, Mongo replication, permissions, installation or deployment is claimed. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical notes remain below.

---

## Table of Contents

- [Description](#description)
- [How it works](#how-it-works)
- [Requirements](#requirements)
  - [Environment variables](#environment-variables)
- [Credentials](#credentials)
- [Triggers](#triggers)
  - [Consume](#consume)
- [Actions](#actions)
  - [Publish](#publish)
- [Known limitations](#known-limitations)  

## Description

This component provides connectivity to message brokers that support the Advanced Message Queuing Protocol (**AMQP**). AMQP is an open standard for asynchronous message-based communication between applications. For more information, visit [amqp.org](https://www.amqp.org).

It enables publishing messages to exchanges and consuming messages from queues.

## How it works

The consumer (in the "Consume" trigger) automatically creates a non-exclusive, non-durable queue with the `autoDelete` property set to `true`. This queue does not have a dead-letter exchange configured.

The queue name is dynamically generated using the pattern `ava_consumer_{USER_ID}_{FLOW_ID}`.

This queue is then bound to the specified exchange using one or more binding keys (provided as a comma-separated string).

## Requirements

### Environment variables

The component supports automatic payload encryption and decryption using `AES-256`. This feature is enabled by default but can be disabled using the `Don't encrypt payload` or `Don't decrypt payload` configuration options.

The following environment variables are required for encryption/decryption and are automatically provided by the {{site.data.tenant.name}} platform:

*   `THATAPP_MESSAGE_CRYPTO_IV` - vector for symmetric encryption.
*   `THATAPP_MESSAGE_CRYPTO_PASSWORD` - password for symmetric encryption.

## Credentials

The component requires an AMQP connection URL. The username and password must be embedded within the URL, for example: `amqp://user:password@hostname`.

Additional parameters, such as the `vHost` or `port`, can also be specified as part of the URL syntax.

{% include img.html max-width="100%" url="img/amqp-credentials.png" title="Credentials" %}

## Triggers

### Consume

Consumes messages from a queue bound to a specified exchange. It emits a message for each consumed payload.

If the target exchange does not exist, it will be created automatically.

Will consume the incoming message object that contains `body` with the payload.
If the exchange doesn't exist it will be created on start.

{% include img.html max-width="100%" url="img/consume-trigger.png" title="Consume Trigger" %}

### Limitations:
*   **Real-time Flows Only**: This trigger is designed for real-time flows. Using it in a scheduled flow (e.g., cron-based) can lead to unexpected behavior and make debugging difficult, as each execution creates a separate record. We recommend setting the schedule frequency to a minimum (e.g., once a day) and using the **'Run Now'** button for manual execution. All logs and emitted messages will appear under the most recent execution record.
*   **Message Ordering**: After a flow is unsuspended, any messages that were queued will be processed, but their original order is not guaranteed.

#### Configuration Fields

*   **Exchange** (string, required): The name of the exchange to consume messages from.
*   **Binding Keys** (string, optional): A comma-separated list of binding keys. Supports wildcards (`#` or `*`). For more details, see the [RabbitMQ tutorials](http://www.rabbitmq.com/tutorials/tutorial-five-javascript.html).
*   **Don't decrypt payload** (boolean, optional): If selected, the component will not attempt to decrypt the incoming message payload.
*   **Reconnect Timeout** (number, optional): The time in seconds to wait before attempting to reconnect in case of an error. Defaults to `5`. Maximum value is `1000`.
*   **Reconnect Attempts** (number, optional): The number of times to try reconnecting before failing. Defaults to `12`. Maximum value is `1000`.

## Actions

### Publish

Will publish the messages into an exchange. This exchange will be created on start if it doesn't exists.

{% include img.html max-width="100%" url="img/publish-action.png" title="Publish action" %}

#### Configuration Fields

*   **Exchange** (string, required): The name of the exchange to publish the message to.
*   **Don't encrypt payload** (boolean, optional): If selected, the outgoing message payload will not be encrypted.
*   **Content-Type** (string, optional): The `Content-Type` of the published payload. Defaults to `application/octet-stream`.
*   **Reconnect Timeout** (number, optional): The time in seconds to wait before attempting to reconnect in case of an error. Defaults to `5`. Maximum value is `1000`.
*   **Reconnect Attempts** (number, optional): The number of times to try reconnecting before failing. Defaults to `12`. Maximum value is `1000`.

## Known limitations

Following limitations of the component are known:

*   Publishing to the default (unnamed) exchange is not supported.
*   All exchanges created by this component are of the `topic` type. However, `topic` exchanges can be configured to emulate `direct` and `fanout` behaviors.