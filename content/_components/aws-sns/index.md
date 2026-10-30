---
title: AWS SNS component
layout: component
section: Protocol components
description: A push messaging service that provides a low-cost infrastructure for the mass delivery of messages.
icon: aws-sns.png
icontext: AWS SNS component
category: aws-sns
updatedDate: 2023-04-06
ComponentVersion: 1.2.4
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

## How works

The component publishes a message to the SNS topic in a specific Amazon SNS service access point.

## Requirements

### Environment variables

None required.

## Credentials

The component requires the following credentials to authenticate with the AWS services:

*   `AWS Access Key` - this is your Access Key ID when you created the AWS account
*   `AWS Access Secret` - this is your Secret access key given to you during the key creation

These keys are displayed only once, just after the creation of the credentials in AWS.
To generate new ones follow the instructions given at [Getting Your Credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) page.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Publish

This action will publish a message to an SNS Topic. There are two required fields
in input:

*   `TopicArn` - this is the specific topic name. More about the topic format below.
*   `AWS Region` - set this to the specific Amazon SNS service access point in the required region.

{% include img.html max-width="100%" url="img/aws-sns-publish.png" title="Publish action" %}

**Topic ARN**

Amazon SNS assigns a unique ARN (Amazon Resource Name) to the each topic. It
includes the service name, the region and the AWS ID of the user and the topic
name. For example the ARN for the topic named `mysnsrocks` created by a user with
the AWS account ID `123456789` and hosted in the EU West region would be:
```
arn:aws:sns:eu-west-1:123456789:mysnsrocks
```

**AWS Regions**

Here are the regions the component supports:

*   `us-east-1` - US East (N. Virginia)
*   `us-west-1` - US West (N. California)
*   `us-west-2` - US West (Oregon)
*   `eu-west-1` - EU (Ireland)
*   `eu-central-1` - EU (Frankfurt)
*   `ap-northeast-1` - Asia Pacific (Tokyo)
*   `ap-northeast-2` - Asia Pacific (Seoul)
*   `ap-southeast-1` - Asia Pacific (Singapore)
*   `ap-southeast-2` - Asia Pacific (Sydney)
*   `sa-east-1` - South America (Sao Paulo)

More information about the regions is available at the [AWS Regions and Endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html#sns_region) document.
