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

## AVA 1.0.1 release status — 2026-10-31

**Published conditionally; installation and final combined-host qualification remain open.** [Exact source](https://github.com/thatapp/connector-csv/tree/6f272f25722604283340fa1ac477baee59ded31c) · [Full report](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/REPORT.md) · [Pinned qualification](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/evidence/qualified-1.0.1/qualification.json) · [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). Conditions remain #57/#58/#72/#75/#80/[#87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87), trusted production storage/clock and live/UI interoperability. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). No READY, install or deployment is claimed.

All four declared entries have positive isolated-worker proof. Reads require complete anonymous HTTPS200 binary bytes or a caller-owned scoped attachment. They cover Fetch All/Individual/Batch, header/delimiter/comments/empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Empty final single-column rows are explicitly quoted. attachmentUrl contains a scoped reference object; clean-room attachment writes remain unsent501. The polling trigger rereads its full URL and has no change watermark/deduplication.

Create CSV From Message Stream validates one mapped items object and boolean header, then stages a bounded row in the parent durable window. Pending acceptance emits no CSV or snapshot. New input extends the inactivity deadline; a gap strictly longer than ten seconds closes the window. A leased immutable flush renders stored rows and follows the ordinary downstream mapper/walker, starting at the aggregator without repeating its predecessors. First-seen column union and the original header persist. The unmerged [host MR174](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/174), runtime38f7d5047f61b019060927e7fd196708f2fd2553, supplies the capability; a tag does not install it.

Binding includes owner/org/workspace/flow/step/published version/graph/settings/config/exact clean installed build. Stop/delete/cancel/generation changes fence old delivery. Majority+journal persistence/readback precede acceptance; only a matching durable successful downstream run marks completion. Lost work completion can adopt its exact successful run without replay. Unknown/running/failed outcomes after an execution fence require explicit recovery; new run IDs remain new deliveries and can duplicate rows. No exactly-once or rollback promise is made. Clean-room/VCR require explicitly isolated storage and simulated clock, with completed rehearsal output distinct from live delivery.

Read/array bounds are4MiB/5000rows/256columns. Stream bounds are48KiB for the complete persisted window, at most1000rows/256columns, ten unresolved windows per binding, and seven-day raw-row retention with eventual TTL cleanup. The byte cap can bind first. Clock correctness is a production prerequisite. The component has no worker timer, socket, direct DB or filesystem privilege. Mapper/logging UI, deployed storage and live interoperability remain unverified; historical source notes/screenshots retain attribution below.

Both Node20.20.2 and24.13.0 pass84 unit checks,46 canonical and46 standalone cases,61 supplemental plus3 metadata workers,24 scoped empty-record workers and14 actual durable lifecycle cases. Final package scans cover211 text files with zero test/host network attempts. Twelve source blobs and20 raw artifacts are pinned. Corrected host suites pass70 focused/122 offline regression checks each; independent unchanged expiry controls pass3/3 each, clearing that bounded finding only. Earlier expired-lease source/failed probes are retained. Strict post-read lease/retention checks and journaled heartbeats stop further walker nodes on lease loss; already-started effects remain potentially partial.

The immutable1.0.0 tag [a5083af](https://github.com/thatapp/connector-csv/tree/a5083afbb0670bc6d299102749dab2245e92d04d) passed functional gates but contained one Windows report punctuation byte that stopped UTF-8 PR-body publication after its atomic push. Version1.0.1 corrects report encoding and version metadata, with unchanged action runtime code and fresh full qualification. Neither tag was rewritten. Recovered2.2.2/current3.3.0 source, four original docs and14 screenshots remain pinned; deprecated functions below remain historical.


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
