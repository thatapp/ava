---
title: PostgreSQL actions
layout: component
description: PostgreSQL component actions.
icon: postgresql.png
icontext: PostgreSQL component
category: postgresql-component
updatedDate: 2025-11-14
ComponentVersion: 1.4.3
---

## AVA 1.0.0 release status — 2026-10-30

**PUBLISHED scoped; WAITING HOST #78 SQL provider provisioning/injection; custom trust #82 unbuilt**. [Published source](https://github.com/thatapp/connector-postgresql/tree/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3) · [Release scope](https://github.com/thatapp/connector-postgresql/blob/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-postgresql/blob/e26d73905143b440a4dd70cf6bcbcfe64ea8c1d3/INTAKE.json).

All five actions retain the output envelopes described in the AVA release contract. General/raw SQL accepts one restricted SELECT or mutation; SQL scripts, JSONata/JavaScript evaluation, arbitrary SQL bypasses and deadlock retries are not available. Zero affected rows is a valid mutation result. Bulk is bounded to 1,000 parameters and returns success only after an actual provider result; clean-room writes are recorded intent.

See the [AVA release contract](index#ava-100-release-status--2026-10-30) for fields, output shapes, bounds and host prerequisites.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## SELECT action

Please check the [SELECT Action and Trigger](/components/postgresql/triggers#select-trigger-and-action).

## INSERT/UPDATE/DELETE action

Use this action to insert, update or delete some data, returned
value is ignored, number of affected rows you can see in the log file.

{% include img.html max-width="100%" url="img/postgresql-insert-update-delete.png" title="INSERT/UPDATE/DELETE action" %}

Following configuration options are available:

*   **SQL Query** - here you can type your INSERT/UPDATE/DELETE query. Returned data will be ignored, so this component will simply push original message to the next component. You can use variables from incoming messages in the templates, see section below on how it works.

### Known limitations

Action does not support transactions.

## INSERT Bulk action

This action is useful to execute a bulk insert query in one transaction. An
incoming message needs to contain a body with an array of objects.

### Configuration field

{% include img.html max-width="100%" url="img/insert-bulk-action.png" title="INSERT Bulk action" %}

#### Table Name

You need to put the name of the table into field **Table Name** where you want
to put multiple values.

*   **Columns** - You need to determine the name of the columns in which corresponding values will be inserted.
*   **Input metadata** - **Values** - needs to contain an array of objects, each object needs to contain values that will be inserted in corresponding columns.

For example, you need to execute following query:

```sql
INSERT INTO itemstable(id, text) VALUES (1, 'First item'), (2, 'Second item')
```

You need specify field  **Table Name** = 'itemstable', **Columns** = 'id, text'
and **Values** needs to be:

```sql
[
  {
    id: 1,
    text: 'First item'
  },
  {
    id: 2,
    text: 'Second item'
  }
]
```

All changes will rollback, if something wrong with data.

## SQL Query action

**Expert mode**. You can execute SQL query or SQL script in this action.

### Configuration field

#### SQL Query

Put your SQL expression to `SQL Query` for further execution. You can put only one
SQL query or several queries with delimiter `;`. All queries are executed in one
transaction. All changes will rollback if something wrong with one of the executions.
Also if you want to use prepared statements in your query, you need define prepared
statement variables like this way `sqlVariableName = @MetadataVariableName:type` where:

1.  `sqlVariableName` - variable name in sql expression;
2.  `MetadataVariableName` - variable name in metadata (it can be the same as `sqlVariableName`);
3.  `type` - type of variable , following types are supported:
   *  `string` (also default type if type is omitted)
   *  `number`
   *  `boolean`

For example, for SQL expression `SELECT * FROM tableName WHERE column1 = 'text' AND column2 = 15`
you need to use following template: `SELECT * FROM tableName WHERE column1 = @column1:string AND column2 = @column2:number` and put values into generated metadata.

{% include img.html max-width="100%" url="img/sql-query.png" title="SQL Query" %}

#### Input metadata

Input metadata is generated from `SQL Query` configuration field if this field
contains at least one defined value.

#### Output metadata

Output metadata is an array of arrays with the result of query execution and
depends on the count of SQL queries which were executed. There is an empty array
in output metadata, if execution does not return any results. For example, for an
SQL script:

```sql
INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2');
SELECT * FROM table2;
```

the first SQL query `INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2')`
does not return any values and the second sql query `SELECT * FROM table2` returns two records.
Output metadata for this example is:

```sql
[
  [],
  [
    {
      "col2": 123,
      "col1": "abc"
    },
    {
      "col2": 456,
      "col1": "def"
    }
  ]
]
```

## SQL Injection action

**Expert mode**. You can execute SQL Injection in this action.
You can not use prepare statement there, for this purpose use [SQL Query Action](/components/postgresql/actions#sql-query-action).

### Input metadata

Input metadata contains two fields:
*   `SQL Expression`;
*   `Number of retries in case of deadlock transaction`.

#### SQL Expression

You can put there SQL query, SQL script or set of SQL queries from the previous
step. You can put only one SQL query or several queries with delimiter `;`.
All queries are executed in one transaction. All changes will rollback if
something wrong with one of the executions. For example, you have some file with
defined SQL script and want to execute this. You need to use some component
which can read this file on the previous step and return value like this:

```json
  {
    "query_string": "INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2'); SELECT * FROM table2"
  }
```
and in this action you need put `query_string` (or some JSONata expression) to `Sql Injection string`:

{% include img.html max-width="100%" url="img/sql-expression.png" title="SQL Injection actionn" %}

### Number of retries in case of deadlock transaction

You can specify maximum number of retries, that is intended to help to solve
lock's issues in case of a deadlock transaction. The delay between retries is 1
second. Default value for this configuration field is `0`, it means, that such
behavior is switched off (by default) and no any retry will be performed in case
of deadlocked transaction.

### Output metadata

Output metadata is an array of arrays with the result of query execution and
depends on the count of SQL queries which were executed. There is an empty array
in output metadata, if execution does not return any results. For example, for
SQL script:

```sql
INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2');
SELECT * FROM table2;
```
the first SQL query `INSERT INTO tableOne (column1, column2) VALUES ('value1', 'value2')`
does not return any values and the second SQL query `SELECT * FROM table2` returns two records.
Output metadata for this example is:

```sql
[
  [],
  [
    {
      "col2": 123,
      "col1": "abc"
    },
    {
      "col2": 456,
      "col1": "def"
    }
  ]
]
```
