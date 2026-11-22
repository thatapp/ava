---
title: Google BigQuery component
layout: component
section: Database components
description: Integration component to interact with the Google BigQuery.
icon: google-bigquery.png
icontext: Google BigQuery component
category: bigquery
ComponentVersion: 1.1.0
updatedDate: 2023-02-10
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72/MR159 credential redaction integration; #80 bounded execution, SDK, Arrow and continuous-query differences.** [Published source](https://github.com/thatapp/connector-google-bigquery/tree/19d62b19fc0fb53bf5b00bb7d7867a5791d4f0d6) · [Contract report](https://github.com/thatapp/connector-google-bigquery/blob/19d62b19fc0fb53bf5b00bb7d7867a5791d4f0d6/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-google-bigquery/blob/19d62b19fc0fb53bf5b00bb7d7867a5791d4f0d6/INTAKE.json).

Query and Insert Rows as Stream execute through recorded REST requests using an in-memory RS256 service-account grant. This documentation chat independently read the immutable report and accepted intake: 52 offline tests, 26 canonical isolated-worker outcomes, allowlist and secret scan passing (33 files), zero network attempts. The publisher additionally records 54 sealed-loader tests on each of Node20/24, 32 supplemental host outcomes and 16 independently verified JWT signatures per runtime, plus eight adversarial credential probes with zero PEM-line leaks. This chat did not rerun those suites.

Pasted service-account JSON uses the supported PasswordFieldView. Catalog/splitKeys tests establish secret-only placement, and the reviewed host registers both the JSON and inner PEM. Real UI persistence, account permissions and installation remain unverified. The token destination is fixed to Google's OAuth endpoint; there is no token cache, delegated subject or automatic mutation retry.

Query buffers one final result array across bounded completion/pagination. It caps 100 continuation GETs, 10000 rows and 25 MiB decoded output, with a 55-second continuation budget after authentication. The tested host's 60-second step, 15-second HTTP and 5 MiB request/response limits remain authoritative. Requests are size-checked before authentication. Timed-out jobs may continue remotely; automatic cancellation/resume is not built.

REST row decoding handles nested/repeated records and safe scalar values. Unsafe integers and precise numeric/date/time/bytes/JSON values retain string/REST representations instead of historical SDK wrappers. All current QueryRequest options have an explicit status in the report; vendor-specific semantics remain unverified. Continuous=true, Arrow output and arrowSerializationOptions refuse before authentication. Native SDK retry and unbounded/continuous behavior are not claimed.

Insert accepts documented developer object and integrator array forms, filters null rows, and maps partial errors back to submitted rows. It does not retry or roll back partial inserts. Throw-on-error emits an error through the host, which omits the custom PartialFailureError name/errors array; return-errors mode preserves structured row details.

Qualification depends on unmerged host MR159 runtime `4576be108e21b597d1fbffd4163fb05cd821c834`, whose parent is host2483881b; its follow-up c0a0f500 changes only the report. The preserved host248 credential probe exposed four PEM-line leaks; the new unseeded probes report zero. A canonical fixture pass alone is insufficient because that harness pre-registers generated keys. The intake harness is `5acb7d929bb1a32ea36699ff0de8f4b034e06ef0`. This chat independently verified the tag and unchanged main at `3ed1b1a641bc2bc3f5a3dced63848b6c78f9e498`. No attachment storage is required.

Installation, deployment, live vendor/account acceptance and UI behavior remain **UNVERIFIED**. Follow the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical metadata and reference text below remain for context; the published scope and limitations above supersede conflicting runtime claims.

---

## Table of Contents
* [General information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](/components/google-bigquery/technical-notes#completeness-matrix)
   * [API version / SDK version](#api-version--sdk-version)
* [Credentials](#credentials)
* [Actions](#actions)
   * [Query](#query)
   * [Insert Rows as Stream](#insert-rows-as-stream)
* [BigQuery API and Documentation links](#bigquery-api-and-documentation-links)

## General Information
### Description

{{page.description}}

### API version / SDK version

The component uses `@google-cloud/bigquery` client library, version `5.2.0`.

## Credentials

`Service Account` - Set of credentials (project ID, private key, etc) provided by Google.

More information on how to generate credentials you can find [here](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries).

After you perform all authentication steps described above just copy and paste
content of an authentication JSON file as-is to the field **Service Account credentials**.

It should look like this:

```json
{
  "type": "service_account",
  "project_id": "projectname",
  "private_key_id": "ds67f57s6df5sd76f57s6df57sdf67sdf76df",
  "private_key": "PRIVATE_KEY",
  "client_email": "email",
  "client_id": "2348238472834782348723",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "cert_url"
}

```

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Query

Performs a query provided by user.

#### Expected input metadata

Input metadata include query options according to [documentations](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest).
The `query` option is required.

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "query": {
      "type": "string",
      "required": true
    }
  }
}
```

#### Expected output metadata

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "result": {
      "required": true,
      "type": "array"
    }
  }
}
```

#### Limitations

The query [options](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest) are an experimental feature and correct behavior is not guaranteed. Only `query`, `location`, `dryRun`, `useQueryCache`, `useLegacySql`, `parameterMode`,`maximumBytesBilled` options were tested.

### Insert Rows as Stream

Inserts an array on rows into the table as stream.

#### Configuration Fields

* **Dataset** - (required, string) dataset to insert rows.
* **Table** - (required, string) table to insert rows.
* **Throw error if insert fails** - (required, checkbox) if selected a default error `PartialFailureError` will be thrown in case if insert fails. Otherwise, an object containing error details will be emitted.

#### Input metadata

Input metadata includes an array of json objects representing the table schema. There might be 1 or more objects in the array.

* **Rows** - (array, required) Array of JSON objects each representing a row.

Example:

Integrator Mode:
```
[{"comment": "Lorem ipsum"}, {"comment": "dolor"}]
```

Developer Mode:
```json
{
  "rows": [
    {
      "comment": "Lorem ipsum"
    },
    {
      "comment": "dolor"
    }
  ]
}
```

#### Output metadata

In case of a successful insert an object with an empty errors object inside will be emitted:
```json
{
  "errors": []
}
```
Otherwise, the errors object will contain all the errors with regard to all the rows being sent. E.g.:
```json
{
  "errors": [
    {
      "errors": [
        {
          "message": "no such field: commddent.",
          "reason": "invalid"
        }
      ],
      "row": {
        "commddent": "Lorem ipsum"
      }
    },
    {
      "errors": [
        {
          "message": "",
          "reason": "stopped"
        }
      ],
      "row": {
        "comment": "dolor"
      }
    }
  ]
}
```

## BigQuery API and Documentation links

* [BigQuery documentation](https://cloud.google.com/bigquery/docs)
