---
title: PostgreSQL Technical Notes
layout: component
description: Technical Notes for the PostgreSQL component.
icon: postgresql.png
icontext: PostgreSQL component
category: postgresql-component
updatedDate: 2025-11-14
ComponentVersion: 1.4.3
redirect_from:
  - /components/postgresql/completeness-matrix.html
  - /components/postgresql/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #78 SQL provider provisioning/injection; custom trust #82 unbuilt**. [Published source](https://github.com/thatapp/connector-postgresql/tree/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3) · [Release scope](https://github.com/thatapp/connector-postgresql/blob/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-postgresql/blob/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3/INTAKE.json).

15 npm tests and 21 exact cases covering all seven declared entries pass, with 27 actual isolated-worker executions including clean-room cases. Require allowlist and secret scan pass with zero network attempts. Host and harness are pinned to `d989ab777f9f67009b338b50e432f0b95a3e5033` in [SQL MR !152](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/152). PostgreSQL driver provisioning and runtime injection remain [#78](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/78); the connector has no direct database socket dependency.

The seven entries are SELECT action, INSERT/UPDATE/DELETE, INSERT Bulk, SQL Injection, SQL Query, SELECT polling and the deprecated SQL Query trigger. All execute a restricted single statement through the host. The historical SQL Injection name does not permit scripts, procedures or a host bypass. JavaScript/JSONata evaluation, property expressions, multi-statement transactions, automatic deadlock replay and unlimited streaming are not offered.

`@name:type`, typed `${name:type}` and legacy `$name:type` compile to positional parameters. Untyped `${name}` infers a finite scalar type; default `@name` is a string. Int32, exact Int64 strings, boolean, float, real, money, date and null are supported. Values remain separate from SQL text. The host refuses comments, quoted identifiers, CTEs, DDL, procedures, arbitrary functions, locking reads and multiple statements; database permissions remain necessary.

SELECT emits individual rows, or `{values: [...]}` batches of up to 1,000. Empty individual results emit nothing; empty batch mode emits an empty array. Successful INSERT/UPDATE/DELETE emits the original body, including a valid zero-row result. Bulk INSERT accepts a plain table/schema.table, 1–100 plain columns, 1–1,000 rows and at most 1,000 values total; success emits `{result: 'Ok'}`. General/raw queries preserve the `{result: [...]}` envelope. Clean-room mutations return recorded intent without pretending to have changed data.

The default read bound is 1,000 rows, configurable to 10,000; SQL is limited to 64 KiB, results to 5 MiB, parameters to 1,000 and execution to 15 seconds. Complete reads precede delivery. Timeouts or bounds fail explicitly. Timed-out writes may have unknown outcomes and are not retried.

SELECT polling advances `lastPoll` only after successful reads and awaited emissions. Optional `%%AVA_LAST_POLL%%` / legacy `%%EIO_LAST_POLL%%` and `%%AVA_POLL_UNTIL%%` markers bind lower and upper timestamps. Without a timestamp filter, a later poll can reread the same rows. Delivery is at least once. The fixed clock in intake is test-only; production uses invocation time.

The full `conString` PostgreSQL URI takes precedence over separate connection fields. URI query/fragment options are refused. TLS certificate validation defaults on, and `allowSelfSignedCertificates=true` is explicitly refused pending [#82](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/82). Real PostgreSQL and AWS Redshift interoperability have not been tested.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.4.3 (November 14, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 1.4.2 (November 26, 2021)

* Upgrade sailor version to 2.6.26
* Reduced the size of component icon file

### 1.4.1 (March 12, 2021)

* Update sailor version to 2.6.24

### 1.4.0 (November 20, 2020)

* Update Sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit
* Add new options 'Allow self-signed certificates' for credentials

### 1.3.4 (May 22, 2020)

* Update sailor version to 2.6.7

### 1.3.2 (December 27, 2019)

* Update sailor version to 2.5.4

### 1.3.1 (July 19, 2019)

* Added retry in case of a deadlock transaction in `SQL Injection` action

### 1.3.0 (March 19, 2019)

* Added `Insert/Update/Delete` action
* Added `SQL Injection` action
* Added `Select` trigger
* Migrated to sailor 2.3.0

### 1.2.0 (January 24, 2019)

* Added `Insert Bulk` action

### 1.1.1 (April 21, 2017)

* Migrated to sailor 2.1.0

### 1.1.0 (January 13, 2017)

* Added `SQL Query` trigger

### 1.0.1 (December 19, 2016)

* Migrated to sailor 1.3.0

### 1.0.0 (April 3, 2016)

* Initial release


## Completeness matrix

Here is the completeness matrix of the [PostgreSQL component](index).

![PostgreSQL completeness matrix](https://user-images.githubusercontent.com/40201204/61518227-bb985780-aa11-11e9-9d18-d2a9c3cc3e65.png)
