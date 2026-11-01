---
layout: component
title: MsSQL component
section: Database components
description: MsSQL designed for use in corporate applications, both on-premises and in the cloud.
icon: mssql.png
icontext: MsSQL component
category: mssql
ComponentVersion: 1.1.5
updatedDate: 2023-04-06
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

## Authentication

You may use following properties to configure a connection:


{% include img.html max-width="100%" url="img/mssql-credentials.png" title="Properties to configure a connection" %}

other types of configuration parameters are also supported, more information and samples you can find [here](https://www.npmjs.com/package/mssql#formats)

## Environment Variables

> Please Note: From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about MsSQL component like [changelog](/components/mssql/technical-notes#changelog).

## Triggers

### SELECT Trigger and Action

With this action you may fetch data out of the database, e.g. using ``SELECT`` statement.

{% include img.html max-width="100%" url="img/select-configure-input.png" title="SELECT Trigger and Action - configure input" %}

This trigger & action has no limitations on the number of rows so you may expect to get all of these
via sequential fetching that is implemented within the node.js ``mssql`` driver.

#### Polling

Component will remember last execution timestamp and let you build queries on it:

```sql
select * from Leads where Created >= '%%AVA_LAST_POLL%%'
```

where just before executing the statement the ``%%AVA_LAST_POLL%%`` will be replaced with ISO Date of the last execution, for example ``2017-08-25T07:43:48.127Z``. During the first execution, date will be equal to [the bigging of time](http://www.onthisday.com/date/1970/january/1) - ``1970-01-01T00:00:00.000Z``.

## Actions

### SELECT action

Check the [SELECT Action description above](#select-trigger-and-action).

### INSERT/DELETE/UPDATE Action

{% include img.html max-width="100%" url="img/insert-update-delete-configure-input.png" title="INSERT/DELETE/UPDATE Action - configure input" %}

You may use this action to do the operations that are not producing output rows but do the database manipulations,
e.g. ``INSERT``, ``UPDATE`` or ``DELETE`` statements. Internally we use prepared statements, so all incoming data is
validated against SQL injection, however we had to build a connection from JavaScript types to the MSSQL data types
therefore when doing a prepared statements you would need to add ``:type`` to **each prepared statement variable**.

For example if you have a following SQL statement:

```sql
INSERT INTO
  Test2.dbo.Tweets
(Lang, "Text", id, CreatedAt, Username, ScreenName)
VALUES
(@lang, @text, @id, @created_at, @username, @screenname)
```

you should add ``:type`` to each ``@parameter`` so your SQL query will looks like this:

```sql
INSERT INTO
  Test2.dbo.Tweets
(Lang, "Text", id, CreatedAt, Username, ScreenName)
VALUES
(@lang, @text, @id:bigint, @created_at:date, @username, @screenname)
```

Following types are supported:
 * ``string`` (also default type if type is omitted)
 * ``number`` (will be converted to MSSQL ``int``)
 * ``bigint``
 * ``boolean`` (will be converted to MSSQL ``bit``)
 * ``float``
 * ``date`` (will be converted to ``DateTime2``)
 * ``money``

more details can be found [here](https://github.com/thatapp/mssql-component/blob/master/lib/actions/insert.js#L25)

Component supports dynamic incoming metadata - as soon as your query is in place it will be parsed and incoming metadata will be generated accordingly.
