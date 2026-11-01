---
title: SFTP triggers
layout: component
description: SFTP component triggers.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2025-07-08
ComponentVersion: 2.0.0
---

## AVA 1.0.0 release status — 2026-10-31

**Published conditionally: #57/#58/#72/#75/#80/#85 and trusted parent policy remain required.** [Exact source](https://github.com/thatapp/connector-blendededge-sftp-component-oih/tree/5058b1a15e8cedf9e03eb264b579262dca8174b9) · [Full report](https://github.com/thatapp/connector-blendededge-sftp-component-oih/blob/5058b1a15e8cedf9e03eb264b579262dca8174b9/REPORT.md) · [Current evidence](https://github.com/thatapp/connector-blendededge-sftp-component-oih/blob/5058b1a15e8cedf9e03eb264b579262dca8174b9/evidence/qualified/qualification.json).

Six current file actions and Poll Files use a parent-only pinned SSH/SFTP capability. Saved host/authentication fields remain outside the sealed worker. Trusted organisation/workspace configuration must supply an exact SHA256 SSH host-key pin, remote root and serverConfined:true; missing policy refuses. SFTPv3 has no atomic openat/no-follow containment, so a server-confined account is an explicit prerequisite against concurrent path changes, not remotely attested here. Observed traversal/symlinks/canonical mismatches refuse. Only normalized absolute POSIX server paths are accepted.

Delete follows the action contract: absent files emit{}, correcting the conflicting example404. Single-file download supports explicit omitted/empty allowances. Multi-file download supports independent scoped-attachment and Base64 options, mapped search terms and deterministic ordering. LIKE uses bounded * and ? glob syntax; configured regex uses RE2. Scoped reference objects replace legacy attachment URLs. Header uploads stage inputs before remote mutation; URL uploads preserve binary bytes, create missing directories and apply exclusive-error/overwrite/append policy. File Mode applies on creation; validated Encoding does not transcode binary bytes. Failed output cleans only new undelivered attachments, never caller-owned inputs.

Move uses POSIX rename when available, otherwise explicit non-atomic delete-destination/rename fallback, reported as atomic:false. Failure can leave a removed destination; uncertainty is never retried. Equal source/destination paths refuse before any I/O. Independent review caught the earlier self-delete race before publication; the exact rejected packet remains preserved and unchanged4-control corrected review passes each runtime.

Current Poll Files emits metadata only; the old Read trigger removed in2.0 remains archived and is not silently redirected. Numeric lastPoll state persists through the ordinary published runner and suppresses old files on resume. It advances after component emission, including an empty poll; downstream business failure is separate and does not roll it back. Server clock correctness remains necessary. One-character credential masking now preserves trusted run controls and numeric state while business output still masks matching values, through the bounded [MR173](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/173) fix; its independent12-case module/callsite review is distinct from the source's3 full-flow tests.

Current bounds replace the historical limits below:1MiB/file,256KiB raw inline aggregate,25files/4MiB transfer per invocation,1000 listed entries,32KiB native chunks,15second call and1000ms close. Environment retry/timeout/memory options are not implicitly forwarded; no automatic retry is introduced. Provider ACK does not promise fsync, atomic delivery or exactly-once behavior. No Agent/attachment-service URL override is offered.

Both Node20.20.2 and24.13.0 pass58 unit tests,20 canonical rows,20 standalone hostcheck rows,29 supplemental actual workers and3 actual published-source/native-parent/mapper/persisted-resume flows. All four release-final gates pass179 text files/zero network attempts. Sixteen source blobs and19 current artifacts are pinned; the rejected candidate preserves16 blobs/74 artifacts. Parent SDK tests additionally pass7 cases per runtime over in-memory SSH/SFTP streams, including password/encrypted-RSA authentication and host-key rejection. [Host MR172](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/172) and MR173 remain conditional; no live server/account, remote confinement attestation, Mongo replication, installation, deployment, READY or final combined-host qualification is claimed. Follow the sole [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical pages and examples below remain preserved.

---

## Poll Files

Triggers to get all new and updated files since last polling.

> **Please Note:** To gain a better understanding of the functionality provided by Poll Files trigger, we recommend checking out our [example article](/components/sftp/usage-example#poll-files). It provides a detailed walkthrough of how to use Poll Files trigger effectively, which will assist you in working with it.

{% include img.html max-width="100%" url="img/pool-files.png" title="Poll Files" %}

### Configuration Fields

* **Directory** - (string, required): The directory of the files to read from
* **Emit Behaviour** - (dropdown, optional): Defines the way result objects will be emitted, defaults to `Emit individually`
    * **Fetch All** - All objects will be emitted as array in one object with key `results`
    * **Emit Individually** - Each object will be emitted separately filling the entire message
* **Start Time** - (string, optional): Start datetime of polling, defaults to`-271821-04-20T00:00:00.000Z`
* **End Time** - (string, optional): End datetime of polling, defaults to `+275760-09-13T00:00:00.000Z`
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done

### Output Metadata

* **filename** - (string, required): File Name
* **size** - (number, required): File Size
* **type** - (string, required): File Type
* **modifyTime** - (string, required): Last Modification Time
* **accessTime** - (string, required): Last Access Time
* **directory** - (string, required): Directory
* **path** - (string, required): Full Path

### Known limitations

* Trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.

## Read files(Deprecated)

>**Please Note:** This trigger is deprecated, please use Poll Files trigger instead

Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component

After a file is found:
 * It is moved to the (hidden) directory `.thatapp_processed` and to name of the file will be added timestamp, ex.: file `test.txt` will be renamed to `test.txt_1657621889133`
 * It is pulled and uploaded (streamed) to the attachment storage

>**Please Note:** you may need to consider cleaning up the `.thatapp_processed` directory manually

### Configuration Fields

* **Directory** - (string, required): The directory of the files to read from
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done.

### Input Metadata

There is no Input Metadata

### Output Metadata

* **filename** - (string, required): Name of the file
* **size** - (number, required): File size
