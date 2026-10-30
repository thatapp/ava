---
title: CSV Deprecated functions
layout: component
description: Technical Notes for the CSV component.
icon: csv.png
icontext: CSV component
category: csv
updatedDate: 2023-05-02
ComponentVersion: 3.2.0
---

## AVA candidate status — stream aggregation blocked

**Not released or installed.** Corrected runtime [b3c2864](https://github.com/thatapp/connector-csv/tree/b3c2864b91f6c9f3518e30b2c85c5654d27bcbac) and its [review/evidence-only follow-up](https://github.com/thatapp/connector-csv/tree/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199) are in [Draft PR1](https://github.com/thatapp/connector-csv/pull/1). [Full report](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/REPORT.md) and [exact rejected runtime intake](https://github.com/thatapp/connector-csv/blob/2b19ba3bc1feaedc656dbcdf0a940acbb59ec199/evidence/empty-row-qualified/csv-empty-row-final-intake-node24.json) distinguish partial implementation from whole-connector acceptance.

Read CSV attachment, Create CSV From JSON Array and Read CSV file from URL pass actual worker tests. Reads cover Fetch All/Individual/Batch, headers, delimiters, comments, empty-line policy and bounded numeric/boolean conversion. Arrays map items/header with optional column order/separator/newline and the documented backtick formula prefix. Anonymous HTTPS must return complete 200 binary bytes; partial 206/Content-Range refuses. Scoped inputs are caller-owned. attachmentUrl is a scoped reference object, not the legacy downloadable URL (#75/#80).

Independent review found that empty/null/missing final single-column rows could disappear on write/read. The corrected writer explicitly quotes those empty records; true empty-file and header-only inputs still yield zero rows. Both Node 20/24 now pass 78 npm tests, allowlist, 126-file runtime secret scans, 52 existing supplemental workers and 24 scoped round-trip workers across 12 stores. Independent recheck passes 95 checks/106 workers/28 stores plus 3 sealed controls each. Original failures and all exact corrected receipts remain archived. The evidence-only follow-up changes no runtime or fixtures; its separate scans cover additional evidence files.

Create CSV From Message Stream still refuses 501 before I/O. Original v3 source in six sealed workers per runtime proves that stream calls return without data before an unawaited 10-second timer, then the worker exits. [Host #87](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/87) requires durable scoped aggregation, inactivity closure, leased delivery and generation/crash fencing. Canonical intake and standalone hostcheck remain REJECTED solely for missing positive stream-window coverage. There is no CSV tag and no release count includes it.

Bounds are 4 MiB input/aggregate serialized output, 5000 rows and 256 columns. Duplicate/empty/reserved headers and invalid UTF-8 refuse. The trigger rereads the whole file and emits an empty completion snapshot, with no change watermark/deduplication. Typed conversion preserves dates, empty fields and unsafe-range numbers as strings. Column inference uses all row keys; false/zero survive; nonprimitive cells become [object Object]. Custom environment overrides (#58), UI mapping, spreadsheet-client formula interpretation, live operation and deployed storage remain unverified. Both recovered 2.2.2 and current 3.3.0 source, four docs pages and 14 screenshots are preserved; deprecated functions and historical notes below remain historical.

---

## Deprecated Triggers

Up to component version 2.2.0

### Read CSV file from URL

This trigger will fetch the CSV file from a given URL. The address must be accessible
to the component. The fetched CSV file will be placed in the attachment part of the
outgoing message.

![Read CVS file from URL](img/read-CVS-file-from-URL.png)

*   `CSV URL` - the full URL to the file for retrieving data.
*   `Emit all messages` - this checkbox configures output behavior of the component. If the option is checked - the component emits an array of messages, otherwise - the component emits a message per row.
*   `CSV Header` - this is a required field. Input the names of headers separated with a comma.
*   `Separators` - Specify the separator type. Usually it is a comma (`,`) but values like Semicolon (`;`), Space (` `), Tab (`\t`) and Hash (`#`) are also supported.
*   `Skip rows` - if you know that the incoming CSV file has certain number of headers you can indicate to skip them. The supported values are `None`, `First row`, `First two`, `First three` and `First four`.
*   `Data columns` - here the values will be added dynamically based on the values in the `CSV Header` field. Here each data column will be listed with the name, Data Type and the Format to enable further configuration.

## Deprecated Actions

### Read CSV attachment

This action will read the CSV attachment of the incoming message or from the specified URL and output a JSON object.
To configure this action the following fields can be used:

![Read CVS attachments](img/read-CSV-attachment-old.png)

*   `CSV URL` - the full URL to the file for retrieving data. Leave the field blank and action will read CSV attachment of the incoming message (if any). Error will be thrown if URL of the CSV is missing and no CSV file in incoming message found
*   `Emit all messages` - this checkbox configures output behavior of the component. If the option is checked - the component emits an array of messages, otherwise - the component emits a message per row.
*   `CSV Header` - this is a required field. Input the names of headers separated with a comma.
*   `Separators` - Specify the separator type. Usually it is a comma (`,`) but values like Semicolon (`;`), Space (` `), Tab (`\t`) and Hash (`#`) are also supported.
*   `Skip rows` - if you know that the incoming CSV file has certain number of headers you can indicate to skip them. The supported values are `None`, `First row`, `First two`, `First three` and `First four`.
*   `Data columns` - here the values will be added dynamically based on the values in the `CSV Header` field. Here each data column will be listed with the name, Data Type and the Format to enable further configuration.

### Write CSV attachment

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.

This action will combine multiple incoming events into a CSV file until there is a gap
of more than 10 seconds between events. Afterwards, the CSV file will be closed
and attached to the outgoing message.

As part of the component setup, one must specify the columns of the CSV file.
These columns will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
{"foo":"myfoo", "bar":"mybar"}
{"foo":"myfoo", "bar":[1,2]}
{"bar":"mybar", "baz":"mybaz"}
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
myfoo,"[1,2]"
,mybar
```

When columns are added in the UI, you will be presented with an opportunity to
provide a JSONata expression per column. If you require number formatting that
is specific to a locale, the JSONata expression should handle that concern.

![Configure Input](img/configure-input.png)

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments.

### Write CSV attachment from JSON Object

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.
* `Separator` - this select configures type of CSV delimiter in an output file. There are next options: `Comma (,)`, `Semicolon (;)`, `Space ( )`, `Tab (\t)`, `Pipe (¦)`.

This action will combine multiple incoming events into a CSV file until there is a gap
of more than 10 seconds between events. Afterwards, the CSV file will be closed
and attached to the outgoing message.

![Write CSV attachment from JSON Object](img/inputObject.png)

This action will convert an incoming array into a CSV file by following approach:

* Header inherits names of keys from the input message;
* Payload will store data from Values of relevant Keys (Columns);
* Undefined values of a JSON Object won't be joined to result set (`{ key: undefined }`);
* False values of a JSON Object will be represented as empty string (`{ key: false }` => `""`).

#### Requirements:

* The inbound message is an JSON Object, wrapped by 'inputObject' object;
* This JSON object has plain structure without nested levels (structured types `objects` and `arrays` are not supported as values). Only primitive types are supported: `strings`, `numbers`, `booleans` and `null`. Otherwise, the error message will be thrown: `Inbound message should be a plain Object. At least one of entries is not a primitive type`.

The keys of an input JSON will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
{"foo":"myfoo", "bar":"mybar"}
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
```

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments.

### Write CSV attachment from JSON Array

* `Include Header` - this select configures output behavior of the component. If option is `Yes` or no value chosen than header of csv file will be written to attachment, this is default behavior. If value `No` selected than csv header will be omitted from attachment.
* `Separator` - this select configures type of CSV delimiter in an output file. There are next options: `Comma (,)`, `Semicolon (;)`, `Space ( )`, `Tab (\t)`, `Pipe (¦)`.

![Write CSV attachment from JSON Array](img/inputArray.png)

This action will convert an incoming array into a CSV file by following approach:

* Header inherits names of keys from the input message;
* Payload will store data from Values of relevant Keys (Columns);
* Undefined values of a JSON Object won't be joined to result set (`{ key: undefined }`);
* False values of a JSON Object will be represented as empty string (`{ key: false }` => `""`).

#### Requirements:

* The inbound message is an JSON Array of Objects with identical structure, wrapped by 'inputArray' object;
* Each JSON object for a message has plain structure without nested levels (structured types `objects` and `arrays` are not supported as values). Only primitive types are supported: `strings`, `numbers`, `booleans` and `null`. Otherwise, the error message will be thrown: `Inbound message should be a plain Object. At least one of entries is not a primitive type`.

The keys of an input JSON will be published as the header in the first row. For each incoming
event, the value for each header will be `stringified` and written as the value
for that cell. All other properties will be ignored. For example, headers
`foo,bar` along with the following JSON events:

```
[
        {"foo":"myfoo", "bar":"mybar"},
        {"foo":"myfoo2", "bar":"1"},
        {"bar":"mybar", "baz":"mybaz"}
]
```

will produce the following `.csv` file:

```
foo,bar
myfoo,mybar
myfoo2, 1
mybar
```

The output of the CSV Write component will be a message with an attachment. There will be one CSV file generated per incoming message. In order to access this attachment, the component following the CSV Write must be
able to handle file attachments.
