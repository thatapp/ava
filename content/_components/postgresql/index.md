---
title: PostgreSQL component
layout: component
section: Database components
description: PostgreSQL is a general purpose and open source object-relational database management system.
icon: postgresql.png
icontext: PostgreSQL component
category: postgresql-component
updatedDate: 2025-11-14
ComponentVersion: 1.4.3
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

## Description

This is an open source component for working with [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)
object-relational database management system on {{site.data.tenant.name}} platform.The component also works well with [AWS Redshift](https://aws.amazon.com/redshift/).

## Overview

With this component you will have the following trigger:

*   `SELECT` - this trigger will execute an SQL query that returns multiple results, it has no limitations on the query but apparently best suited for SELECT type of queries

Following actions are also inside:

*   `SELECT` - same as above but as an action
*   `INSERT`/`UPDATE`/`DELETE` - this action executes the SQL query that returns no data, for example insert, delete or update. After query is executed original message will be pushed to the next component.
*   `INSERT Bulk` - this action executes the bulk INSERT SQL query and returns execution result.
*   `SQL Injection` - **Expert mode.** This action executes the SQL query or SQL script without prepared statements and returns an array of results of execution each query.
*   `SQL Query` - **Expert mode.** This action executes the SQL query or SQL script with prepared statements and returns an array of results of execution each query. **JSONata expression can be used as a source of SQL query.**

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about PostgreSQL component like [changelog](/components/postgresql/technical-notes#changelog) and [completeness matrix](/components/postgresql/technical-notes#completeness-matrix).

## Environment Variables

> **Please Note:** From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

The component completeness matrix is also [available separately](completeness-matrix).

## Authentication

There are two options for authentication:

1. Filling out the Connection URI (host), Connection port, Database Name, User, and Password fields. This is the recommended method.
2. Adding a full PostgreSQL connection URL in the Connection String field to connect to your database, as follows:

```
postgresql://user:password@your.postgresql.host:5432/dbname
```

>**Please Note:** If you fill out both the Connection String and all the other connection data fields, the platform will use the connection string to connect to the database.

The option `Allow self-signed certificates` add to connection options following:

```
ssl: {
    rejectUnauthorized: false
  }
```

It could be useful for instances that are is using self-signed SSL certificates (like [Heroku](https://devcenter.heroku.com/articles/ssl-certificate-self))

See more in [documentation](https://www.postgresql.org/docs/current/static/libpq-connect.html#LIBPQ-CONNSTRING).

## Triggers

PostgreSQL component includes the following triggers:

  1. [SELECT trigger](/components/postgresql/triggers#select-trigger-and-action)
  This trigger and action are actually the same but can be used in two different scenarios - trigger as a first step and action in between other steps.

## Actions


1. [SELECT action](/components/postgresql/actions#select-action)
This trigger and action are actually the same but can be used in two different scenarios - trigger as a first step and action in between other steps.

2. [INSERT/UPDATE/DELETE action](/components/postgresql/actions#insertupdatedelete-action)
Use this action to insert, update or delete some data, returned value is ignored, number of affected rows you can see in the log file.

3. [INSERT Bulk action](/components/postgresql/actions#insert-bulk-action)
This action is useful to execute a bulk insert query in one transaction. An incoming message needs to contain a body with an array of objects.

4. [SQL Query action](/components/postgresql/actions#sql-query-action)
**Expert mode**. You can execute SQL query or SQL script in this action.

5. [SQL Injection action](/components/postgresql/actions#sql-injection-action)
**Expert mode**. You can execute SQL Injection in this action. You can not use prepare statement there, for this purpose use [SQL Query Action](/components/postgresql/actions#sql-query-action).

## How SQL templates work

SQL language is pretty extensive and complicated, so we tried to design the
templating as minimum invasive so that you could express your self in SQL with
maximum flexibility. Implementation of the templating is based on
[prepared statement](https://www.postgresql.org/docs/9.3/static/sql-prepare.html)
and hence should be safe to many SQL injection attacks. Second technology that is
used here is [JavaScript template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Expression_interpolation) (we are using [this library](https://github.com/felixfbecker/node-sql-template-strings) internally) so you can even property traversal and string manipulation
in the templates. Let us demonstrate how the templating works on a sample. Let's
take an incoming message like this:

```json
{
  "body": {
    "name": "Homer Simpson",
    "age": 38,
    "address": {
      "street": "742 Evergreen Terrace",
      "city": "Springfield"
    }
  }
}
```

If we would like to insert it into the database, we would use following template:

```sql
INSERT INTO customers (name, age, address) VALUES (${name},${age},${address.street + address.city})
```

So as you can see in the example above type conversion will happen automatically
and you can traverse and concatenate values.

Now the SELECT example:

```sql
SELECT * FROM customers WHERE address LIKE ${'%' + address.city + '%'}
```
Same as above, concatenation and traversal in action.

## Known limitations

There are several limitations of the component:

* We are relying on standard type default js<->postgresql data-type coercion
[see here](https://github.com/brianc/node-postgres#features).