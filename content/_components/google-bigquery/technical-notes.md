---
title: Google BigQuery Technical Notes
layout: component
description: CTechnical Notes for the Google BigQuery component.
icon: google-bigquery.png
icontext: Google BigQuery component
category: bigquery
ComponentVersion: 1.1.0
updatedDate: 2023-02-10
redirect_from:
  - /components/google-bigquery/completeness-matrix.html
  - /components/google-bigquery/changelog.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## AVA 1.0.0 source release — 2026-10-30

**PUBLISHED scoped; WAITING HOST #72/MR159 credential redaction integration; #80 bounded execution, SDK, Arrow and continuous-query differences.** The immutable [1.0.0 source](https://github.com/thatapp/connector-google-bigquery/tree/19d62b19fc0fb53bf5b00bb7d7867a5791d4f0d6) is separate from the historical versions below. See the [current scope and limitations](index#ava-100-release-status--2026-10-30) and [full report](https://github.com/thatapp/connector-google-bigquery/blob/19d62b19fc0fb53bf5b00bb7d7867a5791d4f0d6/REPORT.md). All four local intake gates pass; installation, live vendor acceptance and UI behavior remain **UNVERIFIED**.

## Changelog

### 1.1.0 (Februar 10, 2023)

* Added action `Insert Rows as Stream`
* Upgrade sailor version to 2.7.1
* Upgrade circle.ci configuration

### 1.0.7 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.0.6 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.0.5 (January 29, 2021)

* Update sailor version to 2.6.23

### 1.0.4 (November 6, 2020)

* Update sailor version to 2.6.18

### 1.0.3 (October 20, 2020)

* Update sailor version to 2.6.17

### 1.0.2 (September 24, 2020)

* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.0.1 (September 11, 2020)

* Extend `Query` action metadata with additional options

### 1.0.0 (August 28, 2020)

*   Initial version release: Introducing new `Query` action

## Completeness Matrix

Here is the Google BigQuery Component Completeness Matrix.

![Google BigQuery Component Completeness Matrix](https://user-images.githubusercontent.com/16806832/91313599-3cea1e00-e7be-11ea-8385-1e87e96a9127.png)
