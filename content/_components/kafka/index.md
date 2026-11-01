---
title: Kafka component
layout: component
section: Protocol components
description: Kafka Component is designed to consume (read) and produce (send) messages to/from Kafka servers
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

## Credentials

Component credentials configuration fields:

* **Username** (string, required) - for SASL.
* **Password**  (string, required) - for SASL.
* **Mechanism**  (dropdown, optional, `scram-sha-512` by default) - - Select authentication mechanism, if you select `SASL/OAUTHBEARER` use your Client Id as Username and Client Secret as Password in previous fields.
* **Client Id**  (string, required) - An id string to pass to the server when making requests. The purpose of this is to be able to track the source of requests beyond just ip/port by allowing a logical application name to be included in server-side request logging.
* **Brokers**  (string, required) - Provide at least one broker, or coma/space separated list of brokers (hosts), example - `serv1.mykafkaserver.com:9094 serv2.mykafkaserver.com:9094`.
* **Token URL** (string, optional) - Required if you use OAuth2 Authentication - `SASL/OAUTHBEARER`.

## Triggers

### Consume

This trigger is used to read messages from Kafka.

>**Please note:** The flow must be set as real-time. Otherwise, errors will appear.

We recommend you set the lowest flow schedule (cron expression) frequency possible. E.g. once a day (0 0 * * *). Even though it does not affect the logic directly, each scheduled flow execution will create a record in the Executions list with no messages and no logs inside. All the logs and emitted messages will be appearing in the first execution.

#### Configuration Fields

* **Topic** - (string, required): topic name where you want to read messages from.
* **Group Id** - (string, required): consumer groups allow a group of machines or processes to coordinate access to a list of topics, distributing the load among the consumers. When a consumer fails the load is automatically distributed to other members of the group. Consumer groups must have unique group ids within the cluster, from a kafka broker perspective.

#### Input Metadata

There is no Input Metadata in this Trigger.

#### Output Metadata

* **Value** - (string, required): message content.
* **Key** - (string, optional): message key, if it exists.
* **Partition** - (string, optional): the smallest storage unit that holds a subset of records owned by a topic.
* **Offset** - (number, optional): the consumer offset is a way of tracking the sequential order in which messages are received by Kafka topics.

## Actions

### Produce

This action is used to publish messages to Kafka.

#### Configuration Fields

* **Topic** - (string, required): topic name where you want to send message to.

#### Input Metadata

* **Messages** - (array, required): An array of objects with the following properties:
  * **key** - (string, optional): By default, Kafka uses the key of the message to select the partition of the topic it writes to, if there is no key provided, then Kafka will partition the data in a round-robin fashion.
  * **value** - (string, required): Your message content.

```json
{
  "messages": [{
    "key": "Car status",
    "value": "arrived"
  }]
}
```

#### Output Metadata

* **topicName** - (string, required): should be same as in config.
* **partition** - (string, required): the smallest storage unit that holds a subset of records owned by a topic.
* **errorCode** - (string, required): error code in case of fail.
* **baseOffset** - (string, required): offset of the first message.
* **logAppendTime** - (string, required): timestamp is assigned when record is appended to the log on the broker.
* **logStartOffset** - (string, required): the first offset in a topic-partition.

## Known limitations

* Currently component supports the following authentication mechanisms:
  * SASL/SCRAM:
    - `scram-sha-256`
    - `scram-sha-512`
  * SASL/OAUTHBEARER
* For the `SASL/OAUTHBEARER` authentication mechanism, the token will be generated and stored only within the component for the lifetime of the container. This means that if there are more than one step of the Kafka component having the same credentials, each step will generate and use its own token. This should not be an issue under moderate load, but under heavy load (or having many steps/flows processing at the same time) this might lead to frequent token refresh issues.

## High load performance

After several load tests we can make several conclusions:

  - Produce action is able to generate:
    - `5-20` messages per second 1 by 1, each up to 10KB in size.
    - `1500-2000` smaller messages per second using an array of messages.
  - Consume trigger is able to receive:
    - `100` messages per second, each up to 10KB in size (platform limit).
    - `20-50` messages per second that are up to 100KB in size.
  - No issues with processing large amounts of messages (tested up to 1,000,000).

These numbers are just for reference and can depend on many factors - like current Kafka server and platform load, network stability, and so on.

### Recommendations
To reach best performance we recommend using arrays in Produce action. Several messages can be combined in array using Splitter component - Re-assemble Messages action.
