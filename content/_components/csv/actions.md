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

## AVA 1.0.1 release status — 2026-10-31

**Published conditionally; installation and final combined-host qualification remain open.** [Exact source](https://github.com/thatapp/connector-csv/tree/6f272f25722604283340fa1ac477baee59ded31c) · [Full report](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/REPORT.md) · [Pinned qualification](https://github.com/thatapp/connector-csv/blob/6f272f25722604283340fa1ac477baee59ded31c/evidence/qualified-1.0.1/qualification.json) · [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). Conditions remain #57/#58/#72/#75/#80/[#87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87), trusted production storage/clock and live/UI interoperability. Follow the sole [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). No READY, install or deployment is claimed.

All four declared entries have positive isolated-worker proof. Reads require complete anonymous HTTPS200 binary bytes or a caller-owned scoped attachment. They cover Fetch All/Individual/Batch, header/delimiter/comments/empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Empty final single-column rows are explicitly quoted. attachmentUrl contains a scoped reference object; clean-room attachment writes remain unsent501. The polling trigger rereads its full URL and has no change watermark/deduplication.

Create CSV From Message Stream validates one mapped items object and boolean header, then stages a bounded row in the parent durable window. Pending acceptance emits no CSV or snapshot. New input extends the inactivity deadline; a gap strictly longer than ten seconds closes the window. A leased immutable flush renders stored rows and follows the ordinary downstream mapper/walker, starting at the aggregator without repeating its predecessors. First-seen column union and the original header persist. The unmerged [host MR174](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/174), runtime38f7d5047f61b019060927e7fd196708f2fd2553, supplies the capability; a tag does not install it.

Binding includes owner/org/workspace/flow/step/published version/graph/settings/config/exact clean installed build. Stop/delete/cancel/generation changes fence old delivery. Majority+journal persistence/readback precede acceptance; only a matching durable successful downstream run marks completion. Lost work completion can adopt its exact successful run without replay. Unknown/running/failed outcomes after an execution fence require explicit recovery; new run IDs remain new deliveries and can duplicate rows. No exactly-once or rollback promise is made. Clean-room/VCR require explicitly isolated storage and simulated clock, with completed rehearsal output distinct from live delivery.

Read/array bounds are4MiB/5000rows/256columns. Stream bounds are48KiB for the complete persisted window, at most1000rows/256columns, ten unresolved windows per binding, and seven-day raw-row retention with eventual TTL cleanup. The byte cap can bind first. Clock correctness is a production prerequisite. The component has no worker timer, socket, direct DB or filesystem privilege. Mapper/logging UI, deployed storage and live interoperability remain unverified; historical source notes/screenshots retain attribution below.

Both Node20.20.2 and24.13.0 pass84 unit checks,46 canonical and46 standalone cases,61 supplemental plus3 metadata workers,24 scoped empty-record workers and14 actual durable lifecycle cases. Final package scans cover211 text files with zero test/host network attempts. Twelve source blobs and20 raw artifacts are pinned. Corrected host suites pass70 focused/122 offline regression checks each; independent unchanged expiry controls pass3/3 each, clearing that bounded finding only. Earlier expired-lease source/failed probes are retained. Strict post-read lease/retention checks and journaled heartbeats stop further walker nodes on lease loss; already-started effects remain potentially partial.

The immutable1.0.0 tag [a5083af](https://github.com/thatapp/connector-csv/tree/a5083afbb0670bc6d299102749dab2245e92d04d) passed functional gates but contained one Windows report punctuation byte that stopped UTF-8 PR-body publication after its atomic push. Version1.0.1 corrects report encoding and version metadata, with unchanged action runtime code and fresh full qualification. Neither tag was rewritten. Recovered2.2.2/current3.3.0 source, four original docs and14 screenshots remain pinned; deprecated functions below remain historical.


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
