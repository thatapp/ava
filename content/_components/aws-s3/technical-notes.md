---
title: AWS S3 Technical notes
layout: component
description: Technical Notes for  AWS S3 component.
icon: aws-s3.png
icontext: AWS S3 component
category: aws-s3
updatedDate: 2026-01-21
ComponentVersion: 1.6.0
redirect_from:
  - /components/aws-s3/completeness-matrix.html
  - /components/aws-s3/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72/#75 text/binary transport and scoped storage; #58 custom environment and #80 URL/size/CSV/polling qualifications.** [Published source](https://github.com/thatapp/connector-amazon-aws-s3/tree/f6fca04376efac05852bbc93f6608bd6db803e12) · [Contract report](https://github.com/thatapp/connector-amazon-aws-s3/blob/f6fca04376efac05852bbc93f6608bd6db803e12/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-amazon-aws-s3/blob/f6fca04376efac05852bbc93f6608bd6db803e12/INTAKE.json).

Seven action entries and one polling trigger use recorded SigV4 HTTP instead of the AWS SDK. The five current actions are provided-attachment upload, read, filenames, delete and rename; deprecated Write/Read aliases remain. Deprecated cross-message Stream to CSV is withheld because durable aggregation is not implemented. The current CSV/Batch-then-upload guidance still applies.

The five credential fields remain Access Key Id, Secret Access Key, Region, Custom Endpoint and Force Path Style. Verification performs authenticated ListBuckets with max-buckets=1; it needs bucket-list permission and does not establish object permissions. Static credentials and general-purpose buckets only. Default endpoints support commercial AWS regions. Custom endpoints must be HTTPS origins and remain subject to host network/trust policy; live S3-compatible provider acceptance is unverified.

Read parses UTF-8 JSON/XML by extension or creates a scoped binary reference. JSON objects are emitted directly; arrays/scalars/null use `{value}`. XML uses ordered elements, rejects DTD/entities and omits whitespace-only text nodes. Binary output uses `body.attachment` and `msg.attachments[filename]`, replacing the legacy `attachmentUrl` promise. Upload accepts a scoped reference in `attachmentUrl` or an anonymous HTTPS URL; AWS authentication is never sent to that source URL. Authenticated legacy Maester URLs are unsupported. Pre-signed reads use HEAD only, including large objects; URL expiry is 1–604800 seconds, default 3600. Polling adds either reference or URL only when Enable File Attachments is selected.

The transfer limit is 4 MiB per file and aggregate, with at most 20 stored attachments per step. ATTACHMENT_MAX_SIZE can lower that limit; isolated custom environment forwarding still needs #58. The historical 100 MB attachment/5 GB upload statements below do not describe this release. No multipart upload, custom metadata, tags, storage-class or encryption options are exposed; AWS default/bucket encryption still applies. Rename can copy at most 5 GiB without downloading.

Get filenames emits individual summaries, or `{}` for an empty bucket. It enforces the current index's 1000-object limit, despite the historical changelog's larger-list claim. Delete checks presence and uses an ETag precondition; versioned buckets use AWS delete-marker semantics. Rename refuses an existing destination, conditionally copies, verifies ETag/size/listing, and then conditionally deletes the source. HTTP 200 copy errors are rejected. Rename is not atomic; a final-delete failure can leave both objects, and ETags do not capture every metadata-only change. Mutations are never automatically retried.

Polling scans at most 100 pages/10000 objects and 4 MiB metadata. Its timestamp range is inclusive at the start and exclusive at the end, excluding the current second. It fully prepares downloads, awaits data, then emits one snapshot. A failed page/download/data emission does not advance the snapshot; retries may duplicate output already accepted. A new null snapshot works, and changed account/bucket/time configuration requires a reset. Listing is not an atomic change stream. Failed delivery removes undelivered scoped references; snapshot failure preserves delivered ones. Host TTL/reconciliation is still needed after worker termination or storage failure.

This chat ran all four intake gates on Node 20.20.2 and 24.13.0: 69 npm tests, 42 canonical cases/49 actual sealed workers and six supplemental worker checks, zero network attempts. The tested runtime is MR129 at `2483881b48440a06b21288085ecf7d7e29c7634a`, with immutable MR157 harness `5acb7d929bb1a32ea36699ff0de8f4b034e06ef0`. No production store was provisioned. Main remains at `a8e298db7dfa90235d2a67134155f6aa69de14f7`.

Installation, deployment, live vendor/account acceptance, storage provisioning and UI behavior remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). The older reference and historical metadata below remain for context; the published scope and limitations above supersede conflicting runtime, URL and size claims.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.6.0 (January 21, 2026)

* Add support for pre-signed URLs in "Read file" action and "Get New and Updated S3 Objects" trigger
* Add support for S3-compatible providers
* Migrate to AWS SDK v3 (modular `@aws-sdk/*` packages)
* Update `Sailor` version to 2.7.7
* Update dev dependencies
* Update the Node engine to version 24.x
* Improve `README.md`
* Update `component-commons-library` version to 4.0.0
* Remove unused `thatapp-node` dependency

### 1.5.2 (September 23, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2
* Update oih-standard-library version to 2.0.3

### 1.5.1 (May 20, 2022)

* Fixed bug in `Get New and Updated S3 Objects` trigger when selected Emit Behaviour - Fetch All

### 1.5.0 (May 20, 2022)

* Created new `Read file` action instead of existing due to incorrect output metadata, old one set as deprecated
* Fix memory leak for `Read file` action and `Get New and Updated S3 Objects` trigger, also added attachment url in message body to them
* Default value for environment variable `ATTACHMENT_MAX_SIZE` increased from `10000000` (almost **10** MB) to `104857600` bytes (**100** MB)
* Implemented additional check attachments size  in `Get New and Updated S3 Objects` trigger
* Get rid of vulnerabilities in dependencies

### 1.4.3 (April 22, 2022)

* Update `component-commons-library` to 2.0.2
* Update `oih-standard-library` to 2.0.2
* Update `thatapp-sailor-nodejs` to 2.6.27
* Added component-pusher to circleci
* Fix dependencies

### 1.4.2 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.4.1 (November 12, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.4.0 (June 5, 2020)

* Add Upsert File Action
* Update dependencies
* Verify Credentials now checks for access to buckets.
* Update to Node v 14
* Replace Component completeness matrix to version 2.3

### 1.3.1 (May 22, 2020)

* Update sailor version to 2.6.7

### 1.3.0 (February 13, 2020)

* Add Get New and Updated S3 Objects trigger
* Fix `Error! Cannot convert undefined or null to object` error on no attachments object in message in Write file action
* Add attachment size limitation
* Add empty response to Delete file action when file already not exists
* Add possibility to retrieve more than 1,000 files for 'Get filenames' action
* Improved error handling for Get filenames action
* Removed invalid docs job from circle ci

### 1.2.1 (December 26, 2019)

* Update sailor version to 2.5.4

### 1.2.0 (December 19, 2019)

* Add `Rename file` action
* Rename field `Bucket Name` to `Bucket Name and Folder`
* Make `Bucket Name and Folder` field non required
* Use one Client for all actions
* Update Sailor version

### 1.1.0 (June 18, 2019)

* Add `Write file` action
* Add `Read file` action
* Add `Get filenames` action
* Add `Delete file` action
* Update versions of dependencies
* Update README.md

### 1.0.0 (April 28, 2016)

* Initial release

## Completeness Matrix

Here is the Completeness Matrix for the AWS S3 component.

![Completeness Matrix](https://user-images.githubusercontent.com/5710732/82918058-312e5780-9f42-11ea-9f80-9eb6cc9aed35.png)
