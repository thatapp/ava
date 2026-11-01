---
title: SFTP component
layout: component
section: Protocol components
description: A component for connecting to an SFTP server to read and upload files.
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

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Table of Contents
* [Description](#description)
* [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
* [Actions](#actions)


## Description

This component creates a connection to an SFTP server to read and upload files.

## Environment Variables

| Name                          | Mandatory | Description                                                                                  | Values                   |
|-------------------------------|-----------|----------------------------------------------------------------------------------------------|--------------------------|
| `MAX_FILE_SIZE`               | false     | Maximum file size allowed for upload, specified in **megabytes (MB)** (default: 100 MB)     | Any `integer` greater than 0 |
| `MAX_MESSAGE_SIZE`            | false     | Maximum file size that can be emitted as a base64 string, specified in **megabytes (MB)** (default: 10 MB) | Any `integer` greater than 0 |
| `OPERATION_RETRY_MAX_ATTEMPTS` | false     | Number of retry attempts for an operation in case of failure (default: 5)                    | Any `integer` greater than 0 |
| `OPERATION_RETRY_BASE_DELAY`  | false     | Initial delay between retry attempts, specified in **milliseconds** (default: 500 ms). Each subsequent retry uses exponential backoff. | Any `integer` greater than 0 |
| `OPERATION_TIMEOUT`           | false     | Time to wait for a response from the SFTP server before throwing an error or retrying, specified in **milliseconds** (default: 10000 ms) | Any `integer` greater than 0 |
| `CONNECTION_RETRY_MAX_ATTEMPTS` | false     | Number of retry attempts for connection failures (default: 5)                               | Any `integer` greater than 0 |
| `CONNECTION_RETRY_BASE_DELAY` | false     | Initial delay between connection retry attempts, specified in **milliseconds** (default: 500 ms). Each subsequent retry uses exponential backoff. | Any `integer` greater than 0 |
| `AUTO_DISCONNECT_TIMEOUT_MS`  | false     | Time before the client automatically disconnects from the SFTP server, specified in **milliseconds** (default: 15000 ms) | Any `integer` greater than 0 |

## Credentials
* **Host** - (string, required): Host name of SFTP server
* **Port** - (number, optional, defaults to 22): Port of SFTP server
* **User Name** - (string, required): Username for SFTP server
* **Password** - (string, optional): Password for SFTP server. Must stay empty in case you fill a private key field 
* **Private Key** - (string, optional): To access a secure SFTP servers that is configured with a key-based authentication you must at first upload your `Public key` to the SFTP server (please contact your server administrator to do this) and fill in this field with your `Private key.
  Must stay empty in case you fill a password key field. 
  The component has been tested with the following keys:
  * rsa (Minimum allowed key length - 2048 bits, minimum recommended - 3072 bits)
  * rsa-sha2-256
  * rsa-sha2-512
  * ed25519
  * ecdsa
* **Passphrase** - (string, optional): If Private Key was created using passphrase, put it here


## Triggers

SFTP component includes the following triggers:

1.  [Poll files](triggers#poll-files) - Triggers to get all new and updated files since last polling.

## Actions

SFTP component includes the following actions:

1.  [Delete file](actions#delete-file) - Action to delete file by provided full file path.
2.  [Download File by name](actions#download-file-by-name) - Finds a file by name in the provided directory and uploads (streams) to the attachment storage.
3.  [Download Files](actions#download-files) - Finds a file by criteria in the provided directory and uploads (streams) to the attachment storage.
4.  [Move file](actions#move-file) - Action to move file on SFTP already exists in one location on an sftp server to be moved to another location on the same SFTP server.
5.  [Upload File From URL](actions#upload-file-from-url) - Given a filename and a URL to an attachment, transfers the contents of the attachment to the SFTP server.
6.  [Upload Files From Attachments Header](actions#upload-files-from-attachments-header) - Upload all files from the attachments header to a defined SFTP directory.

## Known limitations

* The platform VPN Agent / Local Agent service is **not offered**; the former Agent attachment limitation is not a current setup option.

## Related links

*   The SFTP component uses [ssh2-sftp-client](https://www.npmjs.com/package/ssh2-sftp-client).
*   Explanation of [Unix file types](https://en.wikipedia.org/wiki/Unix_file_types).
