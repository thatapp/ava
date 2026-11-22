---
title: AWS Lambda Technical Notes
layout: component
description: Technical Notes for AWS Lambda component.
icon: aws-lambda.png
icontext: AWS Lambda component
category: aws-lambda
updatedDate: 2023-04-07
ComponentVersion: 1.0.2
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72 credential redaction and #75 text/XML transport; long synchronous execution remains a qualified #80 limitation.** [Published source](https://github.com/thatapp/connector-amazon-aws-lambda/tree/196a02f22b79e8e00e9b1e7497dc478664ecb848) · [Contract report](https://github.com/thatapp/connector-amazon-aws-lambda/blob/196a02f22b79e8e00e9b1e7497dc478664ecb848/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-amazon-aws-lambda/blob/196a02f22b79e8e00e9b1e7497dc478664ecb848/INTAKE.json).

The release passes all four intake gates on Node 20.20.2 and 24.13.0: 47 offline tests, actual sealed loader/context execution, require allowlist and secret scan. Eighteen canonical cases produce 27 isolated-worker runs; six additional worker checks cover verification, errors, redaction, retry behavior, Tail logs and JSONata timeout. Network attempts: zero. The links pin commit `196a02f22b79e8e00e9b1e7497dc478664ecb848`; installation and live account behavior remain **UNVERIFIED**.

The one action, **Invoke a lambda function**, retains FunctionName, AWS Region, Invocation Type, Log Type, Qualifier and JSONata Expression. It uses signed HTTP through the host instead of the old AWS SDK. The lowercase Qualifier field is now honored. RequestResponse is the default; Event returns an acceptance envelope, not an execution result. DryRun and triggers are not offered. Omitted JSONata forwards the incoming body.

Credentials retain AWS Access Key and AWS Access Secret. Verification uses a signed STS GetCallerIdentity read in `us-east-1`, replacing the source's unconditional success. This verifies identity, not permission to invoke a particular function. Only static credentials and standard commercial AWS endpoints are supported; no temporary-token renewal or other AWS partition is offered. The original ten region choices remain in the selector.

A JSON object result becomes the emitted body. Arrays, scalars, null, empty and non-JSON results use `{StatusCode, Payload}` so the body remains an object. HTTP 200 with a FunctionError is an error and emits no success. Tail can be requested with RequestResponse, but returned function logs are discarded, matching the recovered source; the old promise of platform log output below does not apply.

Requests and responses are bounded at 4 MiB for synchronous invocation; Event requests at 1 MiB. JSONata 2.2.2 has a 64 KiB expression limit, stack/sequence guards and a one-second evaluator deadline. That evaluator deadline does not cover every native regular expression; the isolated worker also has an outer deadline. No environment variables are required.

The candidate host's HTTP deadline is 15 seconds. Longer synchronous functions are unsupported; a timeout may happen after AWS accepts the invocation. The connector does not automatically retry, and manually retrying can duplicate effects. AWS may itself retry or redeliver asynchronous Events. This is not an exactly-once contract.

The tested host is MR129 at `2483881b48440a06b21288085ecf7d7e29c7634a`, with the MR157 intake harness at `8b953726f61a36e13963763273457c9bc2ad1421`. Host integration and installation remain in the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). No attachment store is needed for this connector. Live AWS acceptance, IAM permissions, UI rendering and deployment remain **UNVERIFIED**.

The older reference and metadata version below describe the source component. The AVA scope and limits above supersede conflicting output, logging, verification and availability claims. Historical release entries remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.2 (April 07, 2023)

* Fix version mismatch

### 1.0.1 (November 27, 2020)

* Update Sailor version to 2.6.19
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.0 (March 14, 2019)

* Initial release
