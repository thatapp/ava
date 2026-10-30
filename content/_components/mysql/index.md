---
title: MySQL component
layout: component
section: Database components
description: Bounded MySQL queries and polling through the host-owned prepared SQL transport.
icon: mysql.svg
icontext: MySQL database component
category: mysql
ComponentVersion: 1.0.0
updatedDate: 2026-10-30
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #78 SQL provider provisioning/injection; custom trust #82 unbuilt**. [Published source](https://github.com/thatapp/connector-mysql/tree/5bc8892d4a9f2465025d3dbe93d14c27ad31b25f) · [Release scope](https://github.com/thatapp/connector-mysql/blob/5bc8892d4a9f2465025d3dbe93d14c27ad31b25f/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-mysql/blob/5bc8892d4a9f2465025d3dbe93d14c27ad31b25f/INTAKE.json).

22 npm tests and 12 exact cases across five entries pass; the actual host executes 19 worker contracts including clean-room cases. Require allowlist and secret scan pass with zero network attempts. Host and harness are pinned to `bee0303eabdd41b37cdaae6f30d09a0a1a722e6e` in [MR !152](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/152). These are offline synthetic checks; database interoperability and installation remain **UNVERIFIED**.

This is a new scoped contract, using the reviewed PostgreSQL bulk/query pattern and the shared SQL parameter compiler. It does not claim parity with every PostgreSQL feature or an older MySQL documentation page.

## Connection and host prerequisites

The declared connection fields are server, port (default 3306), database, username, password and encrypt (default true). The host binds these fields and injects its mysql2 provider; the connector has no direct database socket or driver dependency. Provider provisioning and runtime integration are tracked in [#78](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/78). Certificate validation defaults on; custom CA/self-signed policy requires [#82](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/82).

## Actions and polling

| Entry | Contract |
|---|---|
| SELECT action | Emits each row, an empty body for no rows, or `{rows: [...]}` in batch mode. |
| INSERT/UPDATE/DELETE | One prepared mutation with actual affectedRows and optional insertId; clean-room returns recorded intent without invented counts. |
| INSERT Bulk | `cfg.tableName`, comma-separated `cfg.columns`, and `msg.body.values` as object rows; one prepared multi-row INSERT. |
| SQL Query | `cfg.sql` and explicit read/mutation operation; reads return `{rows: [...]}`, mutations return counts. |
| SELECT polling | Bound lower/upper timestamp markers; snapshot advances only after complete reads and successful awaited emissions. |

Queries accept `@name:type` or `${name:type}` placeholders, supplied from message-body fields. Both compile to positional prepared parameters; repeated names bind repeated values. The default type is string. Types are string, number (Int32), bigint (exact signed Int64 decimal string), boolean, float, real, money and date (ISO timestamp). Zero, false and null retain their values. JavaScript expressions, raw interpolation, SQL Injection actions and procedure/DDL bypasses are not offered.

Bulk inserts accept a plain table or database.table identifier, 1–100 unique plain column names, 1–1,000 rows, and at most 1,000 bound values in total. Values must be finite numbers, booleans, strings or null; unsafe integer numbers are refused. Large exact integers can be supplied as decimal strings. There is no implicit chunking or partial success assertion.

## Bounds and polling behavior

The default read bound is 1,000 rows, configurable to 10,000. SQL text is limited to 64 KiB, parameters to 1,000, result size to 5 MiB, and execution to 15 seconds. Exceeding bounds fails before successful data delivery. The host restricts syntax: comments, quoted identifiers, CTEs, DDL, procedures, arbitrary functions, locking reads and multiple statements are refused.

Use `%%AVA_LAST_POLL%%` (or `%%EIO_LAST_POLL%%`) and optional `%%AVA_POLL_UNTIL%%` as whole timestamp placeholders in a SELECT trigger. The first lower bound is the Unix epoch; the upper bound is invocation time or a configured past `pollUntil`. Both are prepared values, including when written as whole quoted literals. The successful snapshot keeps existing fields and saves the upper bound in `lastPoll`. Failed reads or emissions do not advance it. Delivery is at least once; timed-out mutations may have unknown outcomes and are not retried automatically.

See [technical notes](technical-notes) for release evidence. Installation is handed off through the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62); publication alone does not establish readiness of the host.
