---
title: Google Spreadsheets triggers
layout: component
description: Google Spreadsheets component triggers.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
updatedDate: 2022-10-07
ComponentVersion: 2.0.4
---

## AVA 1.0.0 release status — 2026-10-30

**Published with conditional host requirements #57/#58/#72/#80.** Both historical Google Spreadsheets page families now map to one [AVA source release](https://github.com/thatapp/connector-gspreadsheets/tree/d62d1881439c669408752fbef477f03e5bdefbf1). The complete [contract report](https://github.com/thatapp/connector-gspreadsheets/blob/d62d1881439c669408752fbef477f03e5bdefbf1/REPORT.md) and [intake evidence](https://github.com/thatapp/connector-gspreadsheets/blob/d62d1881439c669408752fbef477f03e5bdefbf1/INTAKE.json) define its implemented scope. Historical page versions are not installation versions.

The release combines five actions—Create new Spreadsheet, Add Spreadsheet Row, Read Spreadsheet, Create/Upsert/Update Spreadsheet Row and Get Spreadsheet Row—with the Get Spreadsheet Row polling trigger. The older GData Add Row and Rows entries remain removed; they are not aliases for the Sheets v4 implementation.

All four local intake gates and standalone hostcheck pass on Node 20.20.2 and 24.13.0: 74 offline tests, 50 canonical actual-worker outcomes, 55 supplemental workers and zero network attempts. The final scan covers 62 files. A separate reviewer reran 28 actual workers per runtime, including sparse-state and metadata regressions. Qualification pins host `4576be108e21b597d1fbffd4163fb05cd821c834` and harness `f05a0c4d81f8b79dde6912da8b2b8f8384b40cf7`.

Installation, live Google consent/permissions, UI behavior and host integration remain **UNVERIFIED**. See the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). The scope below supersedes conflicting historical runtime claims; historical changelogs and examples remain for context.

Current action, polling, credential and size constraints are stated in the release contract report above. The historical mapping UI and deprecated examples below do not establish current UI support.

---

## Get Spreadsheet Row

The  **New Spreadsheet Row** *trigger* reads the data in each row of a given Google Spreadsheet
and passes it to the next stage of your integration flow.

![Get Spreadsheet Row](img/get-spreadsheet-row.png)

### Input fields description

| Input field | Required | Description | Example |
|---------------------|--------|---------|---------|
| Spreadsheet                    | true | Spreadsheet which will be used for data reading | `MyTestSpreadsheet` |
| Worksheet                      | true | Worksheet of spreadsheet which will be used for data reading | `Sheet1` |
| Dimension                      | true | The major dimension of the values | `ROWS`, `COLUMNS` |
| Use first row/column as header | true | You should specify Yes if your data has a header in the first row/column and you want to use these values as json key in the output message. If you specify No, json key will be taken from row/column index according to A1 notation. Se example below | `Yes` |
| Select All Data                | true | You should specify Yes if you want to fetch all spreadsheet data whenever step starts. If you specify No, a step will be emitting only delta changes (lines which were added after last step runs) | `No` |

> **IMPORTANT:** Using `Use first row/column as header` feature, you must be sure that header values are unique.

Values from spreadsheets return as `UNFORMATTED_VALUE` [type](https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption)

### The process

First, the system reads all the rows from a given Google
Spreadsheet and processes it further along with your designed integration flow. It will
also create an initial state of your spreadsheet, we call it a ***snapshot***,
in order to have something to compare with after your data is updated.

After the initial read, any further requests for an update will be compared to this
snapshot and in case any changes are detected they will be passed along with the integration
flow as well. If `Select All Data` configuration property has value `Yes`, the system will read all the rows from a given Google
Spreadsheet whenever flow processes the message.

### Cases with ROWS dimension:

![Table](https://user-images.githubusercontent.com/13310949/59919432-14cf9400-9430-11e9-9522-3d20c3fa2337.png)

After a trigger execution, data will be extracted from the table above and the following message will be emitted:

#### 1) Dimension: `ROWS`, Use first row/column as header: `Yes`

```js
  {
    "FirstName": "Tom1",
    "LastName": "Smith1"
  }
  {
    "FirstName": "Tom2",
    "LastName": "Smith2"
  }
  -----------------------
  {
    "FirstName": "Tom10",
    "LastName": "Smith10"
  }

```

#### 2) Dimension: `ROWS`, Use first row/column as header: `No`

```js
  {
    "A": "FirstName",
    "B": "LastName"
  }
  {
    "A": "Tom1",
    "B": "Smith1"
  }
  {
    "A": "Tom2",
    "B": "Smith2"
  }
 ---------------------
  {
    "A": "Tom10",
    "B": "Smith10"
  }
```

### Cases with COLUMNS dimension:

![Table](https://user-images.githubusercontent.com/13310949/59920466-45fd9380-9433-11e9-91bc-35e2043b15a4.png)

After a trigger execution, data will be extracted from the table above and the following message will be emitted:

#### 1) Dimension: `COLUMNS`, Use first row/column as header: `Yes`

```javascript
  {
    "FirstName": "Tom1",
    "LastName": "Smith1"
  }
  {
    "FirstName": "Tom2",
    "LastName": "Smith2"
  }
  -----------------------
  {
    "FirstName": "Tom10",
    "LastName": "Smith10"
  }

```

#### 2) Dimension: `COLUMNS`, Use first row/column as header: `No`

```js
  {
    "1": "FirstName",
    "2": "LastName"
  }
  {
    "1": "Tom1",
    "2": "Smith1"
  }
  {
    "1": "Tom2",
    "2": "Smith2"
  }
 ---------------------
  {
    "1": "Tom10",
    "2": "Smith10"
  }
```

### Limitations

Trigger can emit maximum 1000 messages per one execution.

Trigger uses version 4 of [Google Sheet API](https://developers.google.com/sheets/api/).
You can find more information in the [Google Sheets API Documentation](https://developers.google.com/sheets/api/samples/reading).

## Rows(deprecated)

Trigger is `deprecated` - please use [Get Spreadsheet Row](/components/gspreadsheet/triggers#get-spreadsheet-row) trigger.

The  **Rows** *trigger* reads the data in each row of a given Google Spreadsheet
and passes it to the next stage of your integration flow.

### The process

In the beginning, the system will read all the rows from a given Google
Spreadsheet and process it further along with your designed integration flow. It will
also create an initial state of your spreadsheet, we call it a ***snapshot***,
in order to have something to compare after your data is updated.

After the initial read, any further requests for an update will be compared to this
snapshot and if any changes are detected they will be passed along the integration
flow as well. It is, therefore, imperative to provide a **readable spreadsheet**
for smooth integration.

### What is a readable spreadsheet?

The nature of API that the platform uses to read the rows in Google Spreadsheets
dictates the use of certain rules that it is useful to follow for a smooth
integration of your data. In addition to the **Minimum Requirements** your spreadsheet
must have:

1.  **No empty spaces** - This means no empty columns, no empty rows, and no spaces or newlines after each record. The **reading process stops if it encounters empty columns or rows** since there is no way to know if there are new or more records afterward.
2.  **Only `STRING` values** - Your data will be processed as a `STRING` data type.
3.  **No formula** - If you calculate the value of any field using a formula the system will only read the `VALUE` of that field and convert it into a `STRING` data type.
4.  **One sheet only** - Your Google Spreadsheet must contain **only one sheet**. Even if you insert a second one, it will be ignored by the system.

### External and internal ID for each row

When any given row is processed by the system it receives a *unique name* or a
unique ID so that it can be recognized by the system afterward if you want to
make any changes to the values in that specific row.

> In our system the row number in the Google Spreadsheet is taken as a unique ID to process through the integration flow.
