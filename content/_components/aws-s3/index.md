---
title: AWS S3 component
layout: component
section: Protocol components
description: This component enables interaction with Amazon Simple Storage Service (Amazon S3) object storage.
icon:  aws-s3.png
icontext: AWS S3 component
category: aws-s3
updatedDate: 2026-01-21
ComponentVersion: 1.6.0
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

## Table of Contents

* [General information](#general-information)
   * [Description](#description)
   * [Purpose](#purpose)
   * [Completeness Matrix](/components/aws-s3/technical-notes#completeness-matrix)
   * [How It Works. SDK Version](#how-it-works-sdk-version)
* [Requirements](#requirements)
   * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
   * [Get New and Updated S3 Objects](#get-new-and-updated-s3-objects)
* [Actions](#actions)
   * [Write File to S3 From a Provided Attachment](#write-file-to-s3-from-a-provided-attachment)
   * [Read file](#read-file)
   * [Get filenames](#get-filenames)
   * [Delete file](#delete-file)
   * [Rename file](#rename-file)
* [Deprecated Actions](#deprecated-actions)
   * [Write file](#write-file)
   * [Stream to CSV](#stream-to-csv)
* [Known Limitations](#known-limitations)

## General information

This component provides integration capabilities for Amazon Simple Storage Service (Amazon S3), enabling you to interact with S3 buckets and objects through a standardized interface. 

### Description

This component enables interaction with Amazon Simple Storage Service (Amazon S3) object storage. It supports common S3 operations including reading, writing, deleting, and renaming files, as well as listing bucket contents and polling for new or updated objects.

### Purpose

The component simplifies integration with Amazon S3 by providing a unified interface for common storage operations, file management, and object monitoring tasks without requiring direct AWS SDK implementation.

### How It Works. SDK Version

The component is based on [AWS S3 SDK](https://aws.amazon.com/sdk-for-node-js/ 'SDK for NodeJS') version `3.947.0`.

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`ATTACHMENT_MAX_SIZE`| false | For {{site.data.tenant.name}} attachments configuration. Maximum possible attachment size in bytes. By default set to `104857600` and according to platform limitations **CAN'T** be bigger than that. | Up to `104857600` bytes (100MB)|
|`ACCESS_KEY_ID`| false | This variable is required for integration-tests |  |
|`ACCESS_KEY_SECRET`| false | This variable is required for integration-tests |  |
|`REGION`| false | This variable is required for integration-tests |  |

> **Please Note:** From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Credentials

Access keys consist of three parts: an access key ID, a secret access key, and a region. Like a user name and password, you must use both the access key ID and secret access key together to authenticate your requests.

According to [AWS documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro), for buckets created in Regions launched after March 20, 2019, `Region` is required for AWS credentials.

* **Access Key Id** (string, required) – An access key ID (for example, `AKIAIOSFODNN7EXAMPLE`).
* **Secret Access Key** (string, required) – A secret access key (for example, `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`).
* **Region** (string, required) – AWS region where your S3 bucket is located (for example, `ca-central-1`).
* **Custom Endpoint** (string, optional) – Set this when using an S3-compatible provider (for example MinIO, DigitalOcean Spaces, Backblaze B2). Example: `https://s3.eu-central-003.backblazeb2.com`.
* **Force Path Style** (boolean, optional) - If your provider requires path-style access, enable this option.

## Triggers

### Get New and Updated S3 Objects

Polls S3 for all new and updated objects since the last polling. Results can be emitted individually or as an array.

#### List of Expected Config fields

* **Bucket Name and folder** (string, required) – Name of S3 bucket to read files from.
* **Emit Behaviour** (dropdown, optional, default `Emit Individually`) – Choose how objects are emitted:
  * `Emit Individually` – Emits each object in a separate message (default).
  * `Fetch All` – Emits all objects as an array in one object with key `results`.
* **Start Time** (string, optional) – Start datetime of polling. Default: `-271821-04-20T00:00:00.000Z`.
* **End Time** (string, optional) – End datetime of polling. Default: `+275760-09-13T00:00:00.000Z`.
* **Enable File Attachments** (boolean, optional) – If selected, the contents of the file will be exported as an attachment in addition to the metadata.
* **Use Pre-signed URLs** (boolean, optional) – Generate pre-signed URLs instead of attachments. Works with files of any size. URLs expire after specified time.
* **Pre-signed URL Expiration** (number, optional) – URL expiration time in seconds. Default: `3600` (1 hour), Max: `604800` (7 days).

#### Output Metadata

The output structure depends on the selected **Emit Behaviour**:

* **Emit Individually**: Each output message contains a single object with the schema below.
* **Fetch All**: Each output message contains an object with key `results` containing an array of objects, each following the schema below.

`attachmentUrl` or `preSignedUrl` appears only if **Enable File Attachments** is selected. `preSignedUrl` is used when **Use Pre-signed URLs** is enabled, otherwise `attachmentUrl` is used.

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "attachmentUrl": {
      "type": "string",
      "required": false
    },
    "preSignedUrl": {
      "type": "string",
      "required": false
    },
    "Key": {
      "type": "string",
      "required": true
    },
    "LastModified": {
      "type": "string",
      "required": true
    },
    "ETag": {
      "type": "string",
      "required": true
    },
    "Size": {
      "type": "number",
      "required": true
    },
    "StorageClass": {
      "type": "string",
      "required": true
    },
    "Owner": {
      "type": "object",
      "properties": {
        "ID": {
          "type": "string",
          "required": true
        }
      }
    }
  }
}
```

</details>

## Actions

### Write File to S3 From a Provided Attachment

Given a filename and a URL to an attachment stored in the platform, transfers the contents of the attachment to AWS S3. The component returns a summary of the written file. AWS S3 always overwrites the contents of the file if it already exists.

#### Configuration Fields

None.

#### Input Metadata

* **bucketName** (string, required) – Name of S3 bucket to write the file to. Sufficient write permission is required.
* **fileName** (string, required) – Name of the file/S3 object to write. Use `/` characters in the filename to create folders.
* **attachmentUrl** (string, required) – URL to the attachment stored in the platform. The contents of this attachment will be written to S3 without any transformation.

#### Output Metadata

Returns a summary object with the following properties:

* **ETag** (string, required) – Entity tag for the uploaded object.
* **Location** (string, optional) – URL of the uploaded object.
* **Key** (string, required) – Key (filename) of the uploaded object.
* **Bucket** (string, required) – Name of the bucket where the file was written.

#### Limitations

* It is not possible to set file or object metadata in S3.
* Files/Objects cannot be larger than the memory available in the component's docker container.
* Files/Objects cannot be more than 5 GB in size.
* It is not possible to set the AWS S3 Storage Class for written files/objects. They will always be written with the `standard` storage class.
* It is not possible to set file/object tags.
* It is not possible to compress objects/files (with zip, gzip, etc.).
* It is not possible to encrypt objects/files.

### Read file

Reads a file from an S3 bucket. The result is stored in the output body (for JSON or XML) or in the output attachment (for other types). File type is resolved by its extension. The name of the attachment will be the same as the filename.

**Pre-signed URLs**: When enabled, generates pre-signed URLs instead of attachments. This allows working with files of any size without the 100MB attachment limit. URLs expire after the specified time (default: 1 hour, max: 7 days).

#### Configuration Fields

* **Default Bucket Name and folder** (string, required) – Name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata).
* **Use Pre-signed URLs** (boolean, optional) – Generate pre-signed URLs instead of attachments. Works with files of any size.
* **Pre-signed URL Expiration** (number, optional) – URL expiration time in seconds. Default: `3600` (1 hour), Max: `604800` (7 days).

#### Input Metadata

* **filename** (string, required) – Name of the file in the S3 bucket to read.
* **bucketName** (string, optional) – Name of S3 bucket to read file from (will replace `Default Bucket Name and folder` if provided).


<details close markdown="block"><summary><strong>Input metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Output Metadata

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    },
    "attachmentUrl": {
      "type": "string",
      "required": false
    },
    "preSignedUrl": {
      "type": "string",
      "required": false
    },
    "size": {
      "type": "number",
      "required": true
    }
  }
}
```

</details>

### Get filenames

Retrieves all filenames from an S3 bucket and emits them individually. This action gets all names of files which are stored in the S3 bucket with the provided name.

**Notice**: If you provide bucket and folder (as an example `ava-dev/inbound`), not only all names of files will be returned but the name of the root folder (`inbound/`) as well.

#### Configuration Fields

* **Default Bucket Name and folder** (string, required) – Name of S3 bucket to read file from (by default, if `bucketName` is not provided in metadata).

#### Input Metadata

* **bucketName** (string, optional) – Name of S3 bucket to read file from (will replace `Default Bucket Name and folder` if provided).

<details close markdown="block"><summary><strong>Input metadata:</strong></summary>


```json
{
  "type": "object",
  "properties": {
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Output metadata

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "ETag": {
      "type": "string",
      "required": true
    },
    "Location": {
      "type": "string",
      "required": false
    },
    "Key": {
      "type": "string",
      "required": true
    },
    "Bucket": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

#### Known limitations

A maximum of 1000 file names can be retrieved.

### Delete file

Removes a file from an S3 bucket by the provided name in the selected bucket. The action will emit the single filename of the removed file.

#### Configuration Fields

* **Default Bucket Name and folder** (string, required) – Name of S3 bucket to delete file from (by default, if `bucketName` is not provided).

#### Input Metadata

* **filename** (string, required) – Name of the file in the S3 bucket to delete.
* **bucketName** (string, optional) – Name of S3 bucket and folder to delete file from (will replace `Default Bucket Name and folder` if provided).

<details close markdown="block"><summary><strong>Input metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Output metadata

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

### Rename file

Renames a file in an S3 bucket and folder. The action will emit properties of the renamed file.

#### Configuration Fields

None.

#### Input Metadata

* **bucketName** (string, required) – Name of S3 bucket where file is placed.
* **folder** (string, optional) – Name of folder where file is placed (can be omitted).
* **oldFileName** (string, required) – Name of the file that should be renamed.
* **newFileName** (string, required) – New name of the file.

<details close markdown="block"><summary><strong>Input metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "bucketName": {
      "title":"Bucket Name",
      "type": "string",
      "required": true
    },
    "folder": {
      "type": "string",
      "required": false
    },
    "oldFileName": {
      "type": "string",
      "required": true
    },
    "newFileName": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

#### Output metadata

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "Key": {
      "type": "string",
      "required": true
    },
    "LastModified": {
      "type": "string",
      "required": true
    },
    "ETag": {
      "type": "string",
      "required": true
    },
    "Size": {
      "type": "number",
      "required": true
    },
    "StorageClass": {
      "type": "string",
      "required": true
    },
    "Owner": {
      "type": "object",
      "required": true,
      "properties": {
        "ID": {
          "type": "string",
          "required": true
        }
      }
    }
  }
}
```

</details>

## Deprecated Actions

The following actions are deprecated and should not be used in new integrations. They are maintained for backward compatibility with existing flows.

### Write file

**This action is deprecated.** Please use [Write File to S3 From a Provided Attachment](#write-file-to-s3-from-a-provided-attachment) instead.
Put stream as file into S3 bucket.
This action creates or rewrites a new file on S3 with the content that is passed as an input attachment.
The name of the file would be the same to the attachment name.
Be careful: this action can process only one attachment - if it would be more or no attachment at all the execution would fail with exception.

#### List of Expected Config fields

 - **Default Bucket Name and folder** - name of S3 bucket to write file in (by default, if `bucketName` is not provided in metadata);

#### Expected input metadata

 - **filename** - name of resulted file at S3 bucket (optional);
 - **bucketName** - name of S3 bucket to write file in (will replace `Default Bucket Name and folder` if provided, the field is optional).

 <details close markdown="block"><summary><strong>Input metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "filename": {
      "type": "string",
      "required": false
    },
    "bucketName": {
      "type": "string",
      "required": false
    }
  }
}
```

</details>

#### Output metadata

<details close markdown="block"><summary><strong>Output metadata:</strong></summary>

```json
{
  "type": "object",
  "properties": {
    "ETag": {
      "type": "string",
      "required": true
    },
    "Location": {
      "type": "string",
      "required": false
    },
    "Key": {
      "type": "string",
      "required": true
    },
    "Bucket": {
      "type": "string",
      "required": true
    }
  }
}
```

</details>

### Stream to CSV

**Action is deprecated.** Use the [CSV](/components/csv/index) & or [Batch](/components/batch/index) component to create a csv file first, then write that file to S3.

## Known Limitations

1. The maximum possible size for an attachment is 100 MB.
2. The platform VPN Agent / Local Agent service is **not offered**; the former Agent attachment limitation is not a current setup option.