---
title: CSV actions
layout: component
description: CSV component actions.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2024-06-03
ComponentVersion: 3.3.0
---

## AVA candidate status — stream aggregation blocked

**Not released or installed.** Corrected runtime [b3c2864](https://github.com/thatapp/connector-csv/tree/b3c2864b91f6c9f3518e30b2c85c5654d27bcbac) and its [review/evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199) are in [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). [Full report](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/REPORT.md) and [exact rejected runtime intake](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/evidence/empty-row-qualified/csv-empty-row-final-intake-node24.json) distinguish partial implementation from whole-connector acceptance.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL pass actual worker tests. Reads cover Fetch All/Individual/Batch, headers, delimiters, comments, empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Anonymous HTTPS must return complete 200 binary bytes; partial 206/Content-Range refuses. Scoped inputs are caller-owned. attachmentUrl is a scoped reference object, not the legacy downloadable URL (#75/#80).

Independent review found that empty/null/missing final single-column rows could disappear on write/read. The corrected writer explicitly quotes those empty records; true empty-file and header-only inputs still yield zero rows. Both Node 20/24 now pass 78 npm tests, allowlist, 126-file runtime secret scans, 52 existing supplemental workers and 24 scoped round-trip workers across 12 stores. Independent recheck passes 95 checks/106 workers/28 stores plus 3 sealed controls each. Original failures and all exact corrected receipts remain archived. The evidence-only follow-up changes no runtime or fixtures; its separate scans cover additional evidence files.

Create CSV From Message Stream still refuses 501 before I/O. Original v3 source in six sealed workers per runtime proves that stream calls return without data before an unawaited 10-second timer, then the worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity closure, leased delivery and generation/crash fencing. Canonical intake and standalone hostcheck remain REJECTED solely for missing positive stream-window coverage. There is no CSV tag and no release count includes it.

Bounds are 4 MiB input/aggregate serialized output, 5000 rows and 256 columns. Duplicate/empty/reserved headers and invalid UTF-8 refuse. The trigger rereads the whole file and emits an empty completion snapshot, with no change watermark/deduplication. Typed conversion preserves dates, empty fields and unsafe-range numbers as strings. Column inference uses all row keys; false/zero survive; nonprimitive cells become [object Object]. Custom environment overrides (#58), UI mapping, spreadsheet-client formula interpretation, live operation and deployed storage remain unverified. Both recovered 2.2.2 and current 3.3.0 source, four docs pages and 14 screenshots are preserved; deprecated functions and historical notes below remain historical.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Read CSV file from URL

This trigger read the CSV file from the URL provided in the configuration fields and output the result as a JSON object.
The trigger works pretty much the same as the [Read CSV attachment action](#read-CSV-attachment). The difference is that all the settings are to be provided in the configuration fields, not in the body message. As the triggers do not have input messages.

#### Config Fields

* `Emit Behavior` (dropdown, required) - this selector configures output behavior of the component.
  * `Fetch All` - the component emits an array of messages.
  * `Emit Individually` - the component emits a message per row.
  * `Emit Batch` - component will produce a series of message where each message has an array of max length equal to the `Batch Size`.
* `Skip empty lines` (checkbox, optional) - by default, empty lines are parsed if checked they will be skipped.
* `Comment char` (string, optional) - if specified, skips lines starting with this string.

#### Input Metadata

*   `URL` (string, required) - URL of the CSV file to parse.
*   `Contains headers` (boolean, optional) - If true, the first row of parsed data will be interpreted as field names, false by default.
*   `Delimiter` (string, optional) - The delimiting character. Leave blank to auto-detect from a list of most common delimiters or provide your own.
    
      **Example**
      
    If you use "$" as Delimiter, this CSV:

        `a$b$c$d`
      
      can be parsed into this JSON:

      ```
      {
      "column0": "a",
      "column1": "b",
      "column2": "c",
      "column3": "d"
      }
      ```

*   `Convert Data types` (boolean, optional) - Numeric data and boolean data will be converted to their type instead of remaining strings, false by default.

#### Output Metadata
- For `Fetch page` and `Emit Batch`: An object with key ***result*** that has an array as its value.
- For `Emit Individually`:  Each object fills the entire message.

## Read CSV attachment

This action will read the CSV attachment of the incoming message or from the specified URL and output a JSON object.

An example of an object stored in the github repository:

![Addresses](img/addresses.png)

To configure this action the following fields can be used:

![Read CVS attachments](img/read-CSV-attachment.png)

Here you can see an example of a sample:

![Read CVS attachments sample](img/read-sample.png)

### Config Fields

* `Emit Behavior` (dropdown, required) - this selector configures output behavior of the component.
  * `Fetch All` - the component emits an array of messages;
  * `Emit Individually` - the component emits a message per row;
  * `Emit Batch` - component will produce a series of message where each message has an array of max length equal to the `Batch Size`;
* `Skip empty lines` (checkbox, optional) - by default, empty lines are parsed if checked they will be skipped
* `Comment char` (string, optional) - if specified, skips lines starting with this string

### Input Metadata

*   `URL` - We will fetch this URL and parse it as CSV file
*   `Contains headers` - if true, the first row of parsed data will be interpreted as field names, false by default.
*   `Delimiter` - The delimiting character. Leave blank to auto-detect from a list of most common delimiters or provide your own

<details close markdown="block"><summary><strong>Example</strong></summary>

if you use "$" as Delimiter, this CSV:

```
a$b$c$d
```

can be parsed into this JSON

``` json
   {
    "column0": "a",
    "column1": "b",
    "column2": "c",
    "column3": "d"
   }
```

</details>


*   `Convert Data types` - numeric data and boolean data will be converted to their type instead of remaining strings, false by default.

If `Emit Behavior` equals to `Emit Batch` - new field appears: `Batch Size` - max length of array for each message

### Output Metadata

- For `Fetch page` and `Emit Batch`: An object with key *result* that has an array as its value
- For `Emit Individually`:  Each object fill the entire message

### Limitations

* If you use `Fetch All` then component needs to store whole file and object in memory that cause big memory usage
* In `Emit Batch` use wisely `Batch Size`, bigger number cause bigger memory usage
* Possible exception: `[ERR_STREAM_PREMATURE_CLOSE]` could be thrown when flow stopped before finish emiting all data in file, as stream stopped

## Create CSV From Message Stream

Here you can see an Message Stream example created using the Node.js component:

![Node.js stream](img/nodejs-stream.png)

This action will combine multiple incoming events into a CSV file until there is a gap
of more than 10 seconds between events. Afterwards, the CSV file will be closed
and attached to the outgoing message.

To configure this action the following fields can be used:

![Create CSV From Message Stream](img/create-csv-from-message-stream.png)

### Config Fields

* `Upload CSV as file to attachments` (checkbox, optional) -  If checked store the generated CSV data as an attachment. If unchecked, place the CSV as a string in the outbound message.
* `Separator` (string, optional) - A single char used to delimit the CSV file. Default to "`,`" but you can set any

<details close markdown="block"><summary><strong>Example</strong></summary>

if you use "$" as Delimiter, this CSV:

```
a$b$c$d
```

can be parsed into this JSON

``` json
    {
     "column0": "a",
     "column1": "b",
     "column2": "c",
     "column3": "d"
    }
```

</details>

* `Column Order` (string, optional) - A string delimited with the separator indicating which columns & in what order the columns should appear in the resulting file. If omitted, the column order in the resulting file will not be deterministic. Columns names will be trimmed (removed spaces in beginning and end of column name, for example: 'col 1,col 2 ,col 3, col 4' => ['col 1', 'col 2', 'col 3', 'col 4'])
* `New line delimiter` (string, optional, defaults to `\r\n`) - The character used to determine newline sequence.
* `Escape formulae` (checkbox, optional) - If checked, field values that begin with `=`, `+`, `-`, `@`, `\t`, or `\r`, will be prepended with a **"`"** to defend against injection attacks, because Excel and LibreOffice will automatically parse such cells as formulae

### Input Metadata

* `Include Headers` - Indicates if a header row should be included in the generated file. Must be a `boolean`.
* `Input Object` - Object to be written as a row in the CSV file. If the Column Order is specified, then individual properties can be specified.

### Output Metadata

* If **Upload CSV as file to attachments** is checked:
  * `attachmentUrl` - A URL to the CSV output
  * `type` - Always set to `.csv`
  * `size` - Size in bytes of the resulting CSV file
  * `attachmentCreationTime` - When the attachment was generated
  * `attachmentExpiryTime` - When the attachment is set to expire
  * `contentType` - Always set to `text/csv`

* If **Upload CSV as file to attachments** is not checked:
  * `csvString` - The output CSV as a string inline in the body

## Create CSV From JSON Array

This action will convert an incoming array into a CSV file.
Here you can see an JSON Array example created using the Webhook component:

![Array Example](img/array-example.png)

To configure this action the following fields can be used:

![Create CSV From JSON Array](img/create-csv-from-json-array.png)

### Config Fields

* `Upload CSV as file to attachments` (checkbox, optional) -  If checked store the generated CSV data as an attachment. If unchecked, place the CSV as a string in the outbound message.
* `Separator` (string, optional) - A single char used to delimit the CSV file. Default to "`,`" but you can set any

<details close markdown="block"><summary><strong>Example</strong></summary>

default:

```
a,b,c,d
```

using "`;`" as separator:

```
a;b;c;d
```

</details>

* `Column Order` (string, optional) - A string delimited with the separator indicating which columns & in what order the columns should appear in the resulting file. If omitted, the column order in the resulting file will not be deterministic. Columns names will be trimmed (removed spaces in beginning and end of column name, for example: 'col 1,col 2 ,col 3, col 4' => ['col 1', 'col 2', 'col 3', 'col 4'])
* `New line delimiter` (string, optional, defaults to `\r\n`) - The character used to determine newline sequence.
* `Escape formulae` (checkbox, optional) - If checked, field values that begin with `=`, `+`, `-`, `@`, `\t`, or `\r`, will be prepended with a  **"`"** to defend against injection attacks, because Excel and LibreOffice will automatically parse such cells as formulae

### Input Metadata

* `Include Headers` - Indicates if a header row should be included in the generated file. Must be a `boolean`.
* `Input Array` - Array of objects to be written as rows in the CSV file. (One row per object + headers) If the Column Order is specified, then individual properties can be specified. The component will throw an error when the array is empty.

### Output Metadata

If **Upload CSV as file to attachments** is checked:

![Checked](img/checked.png)

  * `attachmentUrl` - A URL to the CSV output
  * `type` - Always set to `.csv`
  * `size` - Size in bytes of the resulting CSV file
  * `attachmentCreationTime` - When the attachment was generated
  * `attachmentExpiryTime` - When the attachment is set to expire
  * `contentType` - Always set to `text/csv`

If **Upload CSV as file to attachments** is not checked:

![Not Checked](img/not-checked.png)

  * `csvString` - The output CSV as a string inline in the body

## Limitations

* You may get `Component run out of memory and terminated.` error during run-time, that means that component needs more memory, please add
 `AVA_REQUIRED_RAM_MB` environment variable with an appropriate value (e.g. value `1024` means that 1024 MB will be allocated) for the component in this case.
* Maximal possible size for an attachment is 10 MB.
* The platform VPN Agent / Local Agent service is **not offered**; the former Agent attachment limitation is not a current setup option.
* Inbound message in `Message Stream` and each element of `JSON Array` should be a plain Object, if value not a primitive type it will be set as `[object Object]`
