---
title: CSV component
layout: component
section: Utility components
description: A component to read and write Comma Separated Values (CSV) files.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2024-06-03
ComponentVersion: 3.3.0
---

## AVA candidate status — stream aggregation blocked

**Not released or installed.** [Draft PR1](https://github.com/thatapp/connector-csv/pull/1) and [full contract report](https://github.com/thatapp/connector-csv/blob/62f1e8d70e6b56080bde355194232df89893b9f0/REPORT.md) pin candidate62f1e8d70e6b56080bde355194232df89893b9f0. The recovered2.2.2 source is deprecated; the current3.3.0 contract was checked against public elasticio/csv-component-v3 at26de77ac8a1efd2b89714b6ae75e48f1135b2e3f. Both source trees and all four documentation pages/14screenshots are preserved.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL have supplemental actual-worker proofs. Reads support Fetch All/Individual/Batch, headers, delimiter detection, comments, empty-line policy and bounded numeric/boolean conversion. Arrays use current mapped items/header, optional column order/separator/newline and the page's backtick formula prefix. No credentials are required. Anonymous HTTPS downloads must preserve complete200 binary bytes; partial206/Content-Range refuses before emission. Scoped input references are caller-owned. Output attachmentUrl is an explicit scoped reference object, not a legacy downloadable URL; #75/#80 remain.

Create CSV From Message Stream is unavailable and refuses501 before I/O. The original v3 source was tested in six sealed isolated workers per Node20/24: arrays emit correctly, but separate stream calls return success without data before their unawaited10second timers, after which each worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity deadlines, leased flush/delivery, generation fencing and crash recovery. A single-row output or an in-memory timer does not satisfy that contract.

Final committed checks on both Node20.20.2/24.13.0 pass64 unit tests, the require allowlist,106-file secret scans and49 execution/verifier plus3 metadata workers. Canonical intake and standalone hostcheck deliberately remain REJECTED because the full descriptor has no positive stream-window case. No tag exists and no release count includes this candidate. All tests use synthetic data with zero external network attempts.

Current bounds are4MiB input bytes/aggregate serialized output,5000rows,256columns; duplicate/empty/reserved headers and invalid UTF8 refuse. The trigger rereads the whole file, then emits an empty completion snapshot; it has no deduplication/change watermark. Custom environment overrides and historical10MB/RAM-only sizes are not qualified (#58). Typed conversion preserves dates, empty fields and out-of-safe-range numbers as strings. Column-order inference uses all row keys; false/zero are preserved; nonprimitive cells become [object Object]. UI mapping, spreadsheet-client formula interpretation, realtime operation and deployed storage remain unverified. Deprecated functions and historical release notes below remain historical.

The [evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/eb611a398d4aa2fa8f2e4a79c93568ec66de4e89) preserves all six exact runtime receipts and their hashes, including the [rejected Node 24 intake](https://github.com/thatapp/connector-csv/blob/eb611a398d4aa2fa8f2e4a79c93568ec66de4e89/evidence/csv-62f1e8d-committed-intake-node24.json). Runtime and fixtures are unchanged. Both Node 20/24 checks were rerun on that packaging commit: 64 unit tests, the require allowlist, 113-file scans and 52 supplemental workers pass; canonical intake and standalone hostcheck remain rejected for the same stream-window blocker.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## How works

The component can read the CSV file from a remote URL or from the message
attachment. It can also write a CSV file from the incoming events.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about CSV component like [changelog](/components/csv/technical-notes#changelog).

## Requirements

### Environment variables

| Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|AVA_REQUIRED_RAM_MB| false | Value of allocated memory to component | Recommended: `512`/`1024` |
|REQUEST_TIMEOUT| false |  HTTP request timeout in milliseconds | Default value: `10000` |
|REQUEST_RETRY_DELAY| false | Delay between retry attempts in milliseconds | Default value: `7000` |
|REQUEST_MAX_RETRY| false | Number of HTTP request retry attempts |  Default value: `7` |
|REQUEST_MAX_CONTENT_LENGTH| false | Max size of http request in bytes | Default value: `10485760` |
|TIMEOUT_BETWEEN_EVENTS| false | Number of milliseconds write action wait before creating separate attachments | Default value: `10000` |

> Please Note: From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

### Credentials

The component does not require credentials to function.


## Triggers

  1. [Read CSV file from URL](/components/csv/actions#read-csv-file-from-url).
  This trigger read the CSV file from the URL provided in the configuration fields and output the result as a JSON object.


## Actions

  1. [Read CSV attachment](/components/csv/actions#read-csv-attachment)
  Read a CSV attachment of an incoming message.

  2. [Create CSV From Message Stream](/components/csv/actions#create-csv-from-message-stream)
  Multiple incoming events can be combined into one CSV file with the write CSV action.

  3. [Create CSV From JSON Array](/components/csv/actions#create-csv-from-json-array)
  Incoming array can be converted into one CSV file with the write CSV action.

## Limitations

  1. You may get `Component run out of memory and terminated.` error during run-time, that means that component needs more memory, please add  `AVA_REQUIRED_RAM_MB` environment variable with an appropriate value (e.g. value `1024` means that 1024 MB will be allocated) for the component in this case.
  2. You may get `Error: write after end` error, as a current workaround try increase value of environment variable: `TIMEOUT_BETWEEN_EVENTS`.
  3. The maximum possible size for an attachment is only limited by the available RAM memory of the component. In case of running into the limit the platform will give an error message, and if problem persists after a number of restarts the platform will suspend the complete integration flow.
  4. The platform VPN Agent / Local Agent service is **not offered**; the former Agent attachment limitation is not a current setup option.
