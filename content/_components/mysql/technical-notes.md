---
title: MySQL technical notes
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

## Changelog

### 1.0.0 — 2026-10-30

First scoped AVA MySQL release: prepared SELECT/mutations, bulk INSERT, SQL Query and polling. See the [component contract](index) for fields, syntax restrictions, bounds and snapshot behavior.

Validation: 22 npm tests, 12 exact cases covering all five entries, and 19 actual-worker executions including recorded clean-room mutations. Require allowlist and secret scan pass; zero network attempts. The SQL host's separate tests use fake drivers to check binding and cleanup, not a live database.

The immutable release commit is `5bc8892d4a9f2465025d3dbe93d14c27ad31b25f`; host/harness commit is `bee0303eabdd41b37cdaae6f30d09a0a1a722e6e`. Provider installation/injection (#78), custom trust (#82), real database behavior and end-to-end installation remain unverified. No existing MySQL page was available in the reviewed AVA source; this page records the new contract without inventing historical coverage.
