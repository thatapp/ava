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

**Not released or installed.** Corrected runtime [b3c2864](https://github.com/thatapp/connector-csv/tree/b3c2864b91f6c9f3518e30b2c85c5654d27bcbac) and its [review/evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199) are in [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). [Full report](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/REPORT.md) and [exact rejected runtime intake](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/evidence/empty-row-qualified/csv-empty-row-final-intake-node24.json) distinguish partial implementation from whole-connector acceptance.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL pass actual worker tests. Reads cover Fetch All/Individual/Batch, headers, delimiters, comments, empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Anonymous HTTPS must return complete 200 binary bytes; partial 206/Content-Range refuses. Scoped inputs are caller-owned. attachmentUrl is a scoped reference object, not the legacy downloadable URL (#75/#80).

Independent review found that empty/null/missing final single-column rows could disappear on write/read. The corrected writer explicitly quotes those empty records; true empty-file and header-only inputs still yield zero rows. Both Node 20/24 now pass 78 npm tests, allowlist, 126-file runtime secret scans, 52 existing supplemental workers and 24 scoped round-trip workers across 12 stores. Independent recheck passes 95 checks/106 workers/28 stores plus 3 sealed controls each. Original failures and all exact corrected receipts remain archived. The evidence-only follow-up changes no runtime or fixtures; its separate scans cover additional evidence files.

Create CSV From Message Stream still refuses 501 before I/O. Original v3 source in six sealed workers per runtime proves that stream calls return without data before an unawaited 10-second timer, then the worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity closure, leased delivery and generation/crash fencing. Canonical intake and standalone hostcheck remain REJECTED solely for missing positive stream-window coverage. There is no CSV tag and no release count includes it.

Bounds are 4 MiB input/aggregate serialized output, 5000 rows and 256 columns. Duplicate/empty/reserved headers and invalid UTF-8 refuse. The trigger rereads the whole file and emits an empty completion snapshot, with no change watermark/deduplication. Typed conversion preserves dates, empty fields and unsafe-range numbers as strings. Column inference uses all row keys; false/zero survive; nonprimitive cells become [object Object]. Custom environment overrides (#58), UI mapping, spreadsheet-client formula interpretation, live operation and deployed storage remain unverified. Both recovered 2.2.2 and current 3.3.0 source, four docs pages and 14 screenshots are preserved; deprecated functions and historical notes below remain historical.

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
