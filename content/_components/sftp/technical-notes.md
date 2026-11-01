---
title: SFTP Technical Notes
layout: component
description: Technical Notes for the SFTP component.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2025-07-08
ComponentVersion: 2.0.0
redirect_from:
  - /components/sftp/changelog.html
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

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 2.0.0 (July 08, 2025)
* **Breaking change:** Removed the deprecated trigger - `Read Files`
* Migrated the codebase to TypeScript
* Removed deprecated libraries:  
  * `oih-standard-library`
  * `moment`
* Update Sailor from 2.7.3 to 2.7.5
* Update component-commons-library from 3.2.0 to 3.2.2

### 1.7.4 (September 12, 2024)
* Update Sailor version to 2.7.3

### 1.7.3 (August 19, 2024)
* Fix the issue when a SFTP connection drops in realtime flows

### 1.7.2 (July 25, 2024)
* Updated ssh2-sftp-client to 10.0.3 to fix the issue

### 1.7.1 (July 05, 2024)

* Minor test fix.
* Update Sailor version to `2.7.2`.
* Update component-commons-library version to `3.2.0`.

### 1.7.0 (March 01, 2024)

* Added a new option `Emit file content (Base64)` to the configuration of two actions - `Download Files` and `Download Files by name`. This option makes file content to be emitted as a message. Read the documentation to learn more how this feature works.

### 1.6.0 (November 04, 2022)

* Added configurable retries on file upload to platform in `Download Files` action.
* Update Sailor version to `2.7.1`.

### 1.5.2 (August 26, 2022)

* Updated component-commons-library to `3.0.2`.

### 1.5.1 (August 12, 2022)

* Updated component-commons-library to `3.0.1`.

### 1.5.0 (July 29, 2022)

* Added retries on errors while connecting SFTP client.
* Upgrade component-commons-library version to `3.0.0.`
* Upgrade oih-standard-library version to `2.0.3`.
* Add support `passphrase` to credentials.

### 1.4.9 (June 03, 2022)

* Add a file filter to the `Poll Files` trigger.

### 1.4.8 (April 20, 2022)

* Fix memory leak for `Download Files/File by name` actions and `Read Files` trigger.
* Get rid of vulnerabilities in dependencies.

### 1.4.7 (April 12, 2022)

* Fix uploading attachments.

### 1.4.6 (April 08, 2022)

* Fix downloading files of size > 10MB

### 1.4.5 (November 26, 2021)

* Upgrade sailor version to `2.6.26`.
* Reduced the size of component icon file.

### 1.4.4 (February 12, 2021)

* Update sailor version to `2.6.24`.

### 1.4.3 (January 15, 2021)

* Update sailor version to `2.6.23`.

### 1.4.2 (October 30, 2020)

* More logging improvements.
* Update sailor to `2.6.18`.

### 1.4.1 (October 19, 2020)

* Annual audit of the component code to check if it exposes sensitive data in the logs.
* Update sailor to `2.6.17`.

### 1.4.0 (July 6, 2020)

* Update component to new sailor version `2.6.10`.
* If deleting a file that does not exist, emit the empty message.
* Use POSIX rename if possible to move files. It is now possible to replace existing files with move.
* Update all dependencies.
* Use Node `v14`.
* Remove update docs on deploy script.

### 1.3.0 (June 5, 2020)

* Add new 'Move File' action.
* Fix performance problem when trying to download large number of files.

### 1.2.2 (May 19, 2020)

* Update component to new sailor version `2.6.7`.

## 1.2.1 (December 30, 2019)

* Update component to new sailor version `2.5.4`.

### 1.2.0 (December 18, 2019)

* Add max to file size and environment variable to configure.
* Add key-based authentication.
* Add Download files action.
* Add Upload File From URL action.
* The following actions are renamed:
  - Upload files -> Upload files From Attachments Header.
  - Lookup file by name -> Download file by name.
  - Get new and updated files -> Poll files.

### 1.1.2 (December 6 2019)

* New Action: Download files.
* Migrate integration tests to another SFTP Server.
* Fix integration tests error during local running.
* Migrate SFTP-->Attachment upload logic to streams.

#### Action: Poll files

* Fix 0kb file download bug.

#### Action: Download file by name

* Fix 0kb file download bug.

### 1.1.1 (December 6 2019)

* Add Lookup files action.

### 1.1.0 (December 5, 2019)

* Add `Delete file` action.
* Add `Lookup file by name` action.
* Add `Get new and updated files` trigger.

#### Action: Upload files

* Add custom name for uploaded file.

### 1.0.0 (October 8, 2019)

* Initial release.
* Add custom port field instead of defaulting to 22.
* Add more unit tests.
* Fix integration test using `path.resolve` based on test machine.
* Format repository according to Airbnb styling.
