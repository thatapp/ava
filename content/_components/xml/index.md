---
title: XML component
layout: component
section: Utility components
description: An iPaaS component that converts data between XML and JSON formats.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.4.2
updatedDate: 2025-12-04
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-xml-component/tree/2730719ed80d6064f0bcca806654318f32287f1f) · [Complete field and qualification report](https://github.com/thatapp/connector-xml-component/blob/2730719ed80d6064f0bcca806654318f32287f1f/REPORT.md) · [Immutable final intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/309f1fa35189512cc260b945cb1eb3586b08f615/docs/ipaas/source-inventory-2026-10-30/xml-release-intake/qualification.json).

The release implements XML to JSON, JSON to XML, XML Attachment to JSON and the original deprecated JSON-to-XML action. No credentials or triggers are added. XML-to-JSON emits the parsed root object; attributes use `_attr`, inner text uses `_` and repeated children become arrays. The historical prose's `#` text key is not the implemented mapping. JSON-to-XML accepts an already mapped `body.input` object with exactly one root. JSONata evaluation belongs to the host mapper. Optional upload/header/standalone fields are strict booleans; current standalone defaults to no, while the deprecated body-direct action defaults to yes.

Saxes validates XML 1.0 grammar and namespaces before historical xml2js conversion. DTDs, malformed or partial XML, invalid characters, unsupported encodings and normalized-name collisions refuse before output. **Conversion retains literal CRLF/CR text and attribute whitespace; this is not XML-standard normalization or full XML conformance.** Mixed-content order and namespace-preserving roundtrip are not lossless, and no XSD/DTD validation is provided. Comments and processing instructions do not become JSON fields. UTF-8 and ASCII are supported; an ASCII declaration additionally restricts raw source characters, while numeric character references may produce Unicode.

Attachment upload uses scoped parent storage. Output `attachmentUrl` is a reference object, alongside `attachmentSize` and the same reference in `attachments['jsonToXml.xml']`; it is not a downloadable Maester URL. Incoming attachments may be public HTTPS URLs or scoped references. Complete200 downloads are required; partial/range or mismatched uncompressed lengths refuse. Clean-room upload records the attempt then refuses without a fabricated successful reference. Failed emission cleans up only the new attachment; incoming caller-owned references are retained. Delivery is not transactional or exactly-once.

Inputs/outputs are bounded to4MiB, depth40 and10,000 elements/attributes or JSON values; batches contain at most25 files, and all files are validated before the first emission. `MAX_FILE_SIZE` is in MiB and may lower the4MiB cap, subject to host environment injection. The historical5/10MiB statements are not current supported limits. Patterns apply only to legacy lowercase `.xml` filenames and use bounded RE2 syntax; backreferences and lookaround refuse. Modern body attachment arrays are not filename-filtered, and an explicitly empty array stays empty. Debug attachment JSON above512KiB refuses instead of producing a fabricated sample. Old ordinary internal attachment URLs and memory-setting environment names are not interchangeable with this host's capabilities.

Final Node20.20.2 and24.13.0 each pass95 npm tests,100 canonical outcomes, the unchanged require allowlist and198-file secret scans, plus standalone hostcheck and113 supplementary process workers/two metadata workers/two scoped stores. Independent review passes149 process workers, two metadata callbacks and two sealed cleanup controls per runtime, resolving original XML-R1/R2 findings. Root additionally verifies eight encoding workers and eight old/corrected conversion controls each. All use synthetic data and zero external network attempts. Original failed reviews, fixture-encoding error and normalization-test expectation error remain preserved separately.

Host #75 attachment/binary integration, #58 environment injection, #72 production integration, #57 UI/mapping and #80 explicit contract limits remain conditional. The complete restaurant/webhook/JSONata/email example, real provider/storage behavior and deployment remain UNVERIFIED. Tag 082036ce14194fdecc8986a5322e25e90f0ca592 peels to the source above; original main is unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical examples and upstream release notes below remain historical.

---

## Table of Contents

* [Description](#description)
  * [Purpose](#purpose)
  * [Requirements and Conversion Behavior](#requirements-and-conversion-behavior)
  * [Environment variables](#environment-variables)
* [Actions](#actions)
  * [XML to JSON](#xml-to-json)
  * [XML Attachment to JSON](#xml-attachment-to-json)
  * [JSON to XML](#json-to-xml)
* [Usage Example](#usage-example)
* [Known limitations](#known-limitations)

## Description

{{page.description}}

### Purpose
This component converts XML attachments or strings to and from JSON. It exposes three actions that accept either well‑formed XML/JSON strings or XML attachments and returns the converted payload as a string or attachment. The result can be consumed by downstream components.

### Requirements and Conversion Behavior

Provided XML document (for XML to JSON) should be [well-formed](https://en.wikipedia.org/wiki/Well-formed_document) in order to be parsed correctly. You will get an error otherwise.

JSON inputs must be objects with exactly one field as XML documents must be contained in a single 'root' tag.
[JSON inputs can not have any field names which are not valid as XML tag names:](https://www.w3schools.com/xml/xml_elements.asp)

* They must start with a letter or underscore
* They cannot start with the letters xml (or XML, or Xml, etc)
* They must only contain letters, digits, hyphens, underscores, and periods

XML attributes on a tag can be read and set by setting an `_attr` sub-object in the JSON.  
The inner-text of an XML element can also be controlled with `#` sub-object.

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

For example:

```json
{
  "someTag": {
    "_attr": {
      "id": "my id"
    },
    "_": "my inner text"
  }
}
```

is equivalent to

```xml
<someTag id="my id">my inner text</someTag>
```

</details>

### Environment variables

* `MAX_FILE_SIZE`: *optional* - Controls the maximum size of an attachment to be read or written in MB.
  Defaults to 10 MB where 1 MB = 1024 * 1024 bytes.

* `AVA_REQUIRED_RAM_MB`: *optional* - You can increase memory usage limit for component if you going to work with big files
  Defaults to 256 MB where 1 MB = 1024 * 1024 bytes.

## Trigger

This component has no trigger functions. This means you can not select it as a first
component during the integration flow design.

## Actions

It allows users to convert XML attachments and strings to and from JSON. This component has 3 actions allowing users to pass in either generic but well-formatted XML/JSON strings or XML attachments and produces a generic string or attachment of the other file type. The output then can be mapped and used in other components.

### XML to JSON

Takes XML string and converts it to a generic JSON object.

![XML to JSON](img/xml-to-json.png)

### Limitation

Value inside xml tags will be converting into string only. It means that first, you need to convert string numbers - to numbers.

* `$number("5")` => `5`
* `["1", "2", "3", "4", "5"].$number()` => `[1, 2, 3, 4, 5]`

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

given xml

```xml
<note>
  <date>2015-09-01</date>
  <hour>08:30</hour>
  <to>Tove</to>
  <from>Jani</from>
  <body>Don't forget me this weekend!</body>
</note>
```

{% include img.html max-width="100%" url="img/xml-to-json-1.png" title="XML string" %}

will be converted into:

```json
{
  "note": {
    "id": "322",
    "to": "Tove",
    "from": "Jani",
    "heading": "Reminder",
    "body": "Don't forget me this weekend!"
  }
}
```

{% include img.html max-width="100%" url="img/xml-to-json-2.png" title="Convert into JSON" %}

</details>

### XML Attachment to JSON

Looks at the JSON array of attachments passed in to component and converts all
XML that it finds to generic JSON objects and produces one outbound message per
matching attachment. As input, the user can enter a patter pattern for filtering
files by name or leave this field empty for processing all incoming `*.xml` files.

{% include img.html max-width="100%" url="img/xml-attachment.png" title="XML Attachment" %}

#### Configuration Fields

* **Pattern** - (string, optional): RegEx for filtering files by name provided via old attachment mechanism (outside message body)
* **Upload single file** - (checkbox, optional): Use this option if you want to upload a single file

#### Input Metadata

If `Upload single file` is checked, there will be 2 fields:
* **URL** - (string, required): link to file on the Internet or platform

If `Upload single file` is unchecked:
* **Attachments** - (array, required): Collection of files to upload, each record contains object with two keys:
  * **URL** - (string, required): link to file on the Internet or platform

If you going to use this option with static data, you need to switch to Developer mode

<details close markdown="block"><summary><strong>Sample</strong></summary>

```json
  {
    "attachments": [
      {
        "url": "https://example.com/files/file1.xml"
      },
      {
        "url": "https://example.com/files/file2.xml"
      }
    ]
  }
  ```

</details>

#### Output Metadata

Resulting JSON object

### JSON to XML

Provides an input where a user provides a JSONata expression that should evaluate to an object to convert to JSON.
See [Requirements & Conversion Behavior](#requirements-and-conversion-behavior) for details on conversion logic.

{% include img.html max-width="100%" url="img/json-to-xml.png" title="XML Attachment to JSON" %}

When creating XML files with invalid XML tags, the name of the potentially invalid tag will not be reported. XML tags are case-sensitive. The tag `<Text>` is different from the tag `<text>`.

Opening and closing tags must be written with the same case:

`<message>Hello, World!</message>`

The following options are supported:

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

* **Upload XML as file to attachments**: When checked, the resulting XML will be placed directly into an attachment.
The attachment information will be provided in both the message's attachments section as well as `attachmentUrl` and `attachmentSize`
will be populated. The attachment size will be described in bytes.  
When this box is not checked, the resulting XML will be provided in the `xmlString` field.

* **Exclude XML Header/Description**: When checked, no XML header of the form `<?xml version="1.0" encoding="UTF-8" standalone="no"?>` will be prepended to the XML output.

* **Is the XML file standalone**: When checked, the xml header/description will have a value of `yes` for standalone. Otherwise, the value will be `no`. Has no effect when XML header/description is excluded.

The incoming message should have a single field `input`. When using integrator mode, this appears as the input **JSON to convert** When building mappings in developper mode, one must set the `input` property. E.g.:

```
{
  "input": {
             "someTag": {
               "_attr": {
                 "id": "my id"
               },
               "_": "my inner text"
             }
           }
}
```

{% include img.html max-width="100%" url="img/json-to-xml-2.png" title="JSON to XML" %}

</details>

## Usage Example

We have created a special [document](use-case) that contains an example to better understand how the XML component works.

## Known limitations

 *   The maximum size of incoming file for processing is 5 MB. If the size of incoming file will be more than 5 MB, action will throw an error:

```sh
Attachment *.xml is to large to be processed my XML component.
File limit is: 5242880 byte, file given was: * byte
```

- All actions involving attachments are not supported on local agents due to current platform limitations.
- When creating XML files with invalid XML tags, the name of the potentially invalid tag will not be reported.
- When you try to retrieve a sample in `XML Attachment to JSON` action and it's size is more than 500Kb, there will be generated new smaller sample with the same structure as original
