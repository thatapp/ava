---
layout: component
title: MsSQL Technical Notes
description: Technical Notes for MsSQL component.
icon: mssql.png
icontext: MsSQL component
category: mssql
ComponentVersion: 1.1.5
updatedDate: 2023-04-06
redirect_from:
  - /components/mssql/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #78 SQL provider provisioning/injection; custom trust #82 unbuilt**. [Published source](https://github.com/thatapp/connector-mssql/tree/d3f6a8d3aae408227b1c5609bc7e0ddd1144cf09) · [Release scope](https://github.com/thatapp/connector-mssql/blob/d3f6a8d3aae408227b1c5609bc7e0ddd1144cf09/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-mssql/blob/d3f6a8d3aae408227b1c5609bc7e0ddd1144cf09/INTAKE.json).

15 npm tests and nine exact cases across three declared entries pass through the actual isolated worker. Require allowlist and secret scan pass with zero network attempts. Host and harness are pinned to `bee0303eabdd41b37cdaae6f30d09a0a1a722e6e`; [MR !152](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/152) supplies the tested SQL transport. Its drivers still need provisioning and runtime injection before installation.

SELECT action/polling and INSERT/UPDATE/DELETE use typed parameters and host-bound connection fields. Queries use `@name:type`; the default type is string. Supported types are string, number (Int32), bigint (exact signed Int64), boolean, float, real, money and date. Zero, false and null retain their values. Writes return actual affectedRows or a separate unsent clean-room recording without a fictional count.

The default read bound is 1,000 rows, configurable up to 10,000, with a 5 MiB result limit and a maximum 15-second execution. Complete reads precede emission; exceeding bounds fails instead of silently truncating. A SELECT action emits each row, or an empty body for no rows; optional batch mode emits a rows array. Polling uses bound `%%AVA_LAST_POLL%%` or legacy `%%EIO_LAST_POLL%%`, optional `%%AVA_POLL_UNTIL%%`, and an epoch start. The snapshot advances only after complete successful delivery. Delivery is at least once; timed-out writes can have unknown outcomes and are not retried automatically.

The host accepts a restricted SQL subset. Comments, quoted identifiers, CTEs, procedures, DDL, arbitrary functions and multiple statements are refused. TLS certificate validation defaults on; custom CA/self-signed policy is unbuilt under [#82](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/82). Named-instance/domain compatibility and real database interoperability remain unverified.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication does not establish installation or live vendor behavior. Tests used synthetic data and refused networking. Runtime integration and live checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting runtime, environment, attachment, and availability claims; historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.5 (April 06, 2023)

* Fixed version mismatch

### 1.1.4 (March 12, 2021)

* Update sailor version to 2.6.24

### 1.1.3 (November 20, 2020)

* Update Sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.1.2 (July 24, 2020)

* Update sailor version to 2.6.14

### 1.1.1 (May 11, 2020)

* Update sailor version to 2.6.7

### 1.1.0 (January 30, 2020)

* Update sailor version to 2.6.1
* Refactor console.log to built in sailor logger
* Change build type to `docker`

### 1.0.0 (June 14, 2018)

* Initial release
