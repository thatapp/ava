---
title: Google PubSub component
layout: component
section: Protocol components
description: A service that makes it easier to pass messages between machines and to collect data from IoT-devices.
icon: google-pubsub.png
icontext: Google PubSub component
category: google-pubsub
updatedDate: 2024-02-01
ComponentVersion: 1.8.0
---

## Description

> **AVA `1.0.0` published; installation conditional.** [Connector PR3](https://github.com/thatapp/connector-blendededge-google-pubsub-oih/pull/3) publishes `2110e96fc88b57be1b979772bad5bfd5c87455de`. Both Subscribe entries now pass exact private-decoder fixtures and synthetic managed lifecycle/accept-before-ACK/continuation checks. Node 20/24 each pass 69 unit tests, 49 canonical and 49 standalone rows, allowlist and secret scan; 24 supplemental workers verify 16 JWT signatures each. [The pinned report](https://github.com/thatapp/connector-blendededge-google-pubsub-oih/blob/2110e96fc88b57be1b979772bad5bfd5c87455de/REPORT.md) records bounds and historical failures. Required host integration: [#57](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/57), [#72](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72), [#80](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/80), and [#83 / MR168](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/168), plus [MR169 canonical decoder intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/169). This is **not an install recommendation or final combined-host qualification**. Live Google behavior and deployment remain UNVERIFIED.

> **AVA behavior differs from the historical instructions below.** Preserve a complete RSA PEM; actual or escaped newlines are accepted. The private key uses a sealed password field. Publish sends the whole message body with a 3 MiB UTF-8 cap and emits `MessageId` only after a returned ID. Modern Subscribe retains JSON-or-text `data`, `attributes`, `id`, `publishTime`, and the first parent observation `received`; deprecated output stays text with `headers` and `id` under the host body envelope. Receiver events must fit the 64 KiB host envelope, including base64 and metadata. The parent owns credentials, managed subscription creation, durable acceptance and acknowledgment. Pause retains backlog; removal deletes only its owned generation. No ordering guarantee. Verification checks topic-list access, not publish permissions. Clean-room publication records the token request unsent and returns 501. The platform [Pub-Sub component](/components/pub-sub/) is a separate contract.

The component interacts with Google Pub-Sub API. The API is an asynchronous messaging service that decouples services that produce events from services that process events.

Pub/Sub offers durable message storage and real-time message delivery with high availability and consistent performance at scale. Pub/Sub servers run in all Google Cloud regions around the world.

## Requirements

### Core concepts

- **Topic:** A named resource to which messages are sent by publishers.
- **Subscription:** A named resource representing the stream of messages from a single, specific topic, to be delivered to the subscribing application. For more details about subscriptions and message delivery semantics, see the [Subscriber Guide](https://cloud.google.com/pubsub/subscriber).
- **Message:** The combination of data and (optional) attributes that a publisher sends to a topic and is eventually delivered to subscribers.
- **Message attribute:** A key-value pair that a publisher can define for a message. For example, the key `iana.org/language_tag` and value `en` could be added to messages to mark them as readable by an English-speaking subscriber.

### Credentials

{% include img.html max-width="100%" url="img/google-pubsub-credentials.png" title="Credentials" %}

> **Please Note** : Google provides a JSON file that includes your private key. You should be careful how you are using the information. Follow the instructions below to succeed:

1.  Copy and paste the private key as is.
2.  Remove any line breakers (`\n`) from your key.
3.  Leave the two lines as is with begin and end parts.

```
-----BEGIN PRIVATE KEY-----
YOUR KEY HERE
-----END PRIVATE KEY-----

```

## How authentication works

PubSub component authentication works with
[Google IAM Service Accounts](https://developers.google.com/identity/protocols/OAuth2ServiceAccount)
and two-legged OAuth, to authenticate your component you would need to create a new Service Account on [Service Accounts Page](https://console.cloud.google.com/iam-admin/serviceaccounts) of your project and download the JSON file with the private key. You would need ``client_email`` and ``private_key`` values on component authentication page (see [here](https://github.com/google/google-api-nodejs-client#using-jwt-service-tokens) for more information).

> **Please Note** : The authentication mechanism required access to the topics in your account to read and publish.
> If your created service account had no read permission (to subscribe as a trigger function) then verifications will fail. Save the credential without verification and use it for the publishing to the topics (as action function).

### Permissions

To use the Subscribe trigger and Publish action make sure that your service account has all required permissions. Follow the screenshot below to succeed:

{% include img.html max-width="100%" url="img/google-pubsub-permissions.png" title="Permissions" %}

## Triggers

**Subscribe**

The Subscribe trigger receives a message from a Topic, emits it, and sends an acknowledgment to Pub/Sub.

### Configuration

- `Select topic to subscribe` - (dropdown, required): Select one of the available topics from the list.

### Output Metadata

- **data** - (object or string, required): Data of the message, the component will try to parse it as JSON object if fails - result will be plain text.
- **attributes** - (object, optional): Attributes for this message - a list of `"key": value` pairs.
- **id** - (string, required): ID of this message, assigned by the server when the message is published.
- **publishTime** - (string, required): The time at which the message was published to Google Pub-Sub server.
- **received** - (string, required): The time at which the message was read by the component.

### Limitations:
* If you use ordinary flow (Real-time functionality is not enabled) after flow starts you will need to run it once (make execution) to create a subscription in Google Pub-Sub.
* Due to API limitations, once the user clicks `Run Now` after the SUSPENDED state, all stored messages in the queues will be processed, but not in the order they were received.


## Deprecated Triggers

<details closed markdown="block">
<summary>
Subscribe
</summary>

### Subscribe

The Subscribe trigger receives a message from a Topic, emits it, and sends an acknowledgment to Pub/Sub.

{% include img.html max-width="100%" url="img/google-pubsub-subscribe-trigger.png" title="Subscribe trigger" %}

#### Configuration

- `Topic Name` - (required field): Fully-qualified topic resource name string, e.g. `projects/<project_id>/topics/<topic_name>`.
</details>

## Actions

### Publish

The Publish action retrieves the message body from a previous step and sends a message to a Topic while remaining unaware of any existing subscriptions.

{% include img.html max-width="100%" url="img/google-pubsub-publish-action.png" title="Publish action" %}

#### Configuration

- `Topic Name` - (required field) fully-qualified topic resource name string, e.g. `projects/<project_id>/topics/<topic_name>`.

## Warning

Please take special care of the independency of your processing flow, here is the extract from [PubSub Subscriber Guide](https://cloud.google.com/pubsub/docs/subscriber).

> For the most part Pub/Sub delivers each message once, and in the order in which it was published. However, once-only and in-order delivery are not guaranteed: it may happen that a message is delivered more than once, and out of order. Therefore, your subscriber should be [idempotent](http://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) when processing messages, and, if necessary, able to handle messages received out of order. If ordering is important, we recommend that the publisher of the topic to which you subscribe include some kind of sequence information in the message; see [this page](https://cloud.google.com/pubsub/ordering) for a full discussion on message ordering. Messages that are not acknowledged, are retried indefinitely for up to seven days.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Google PubSub component like [changelog](/components/google-pubsub/technical-notes#changelog).
