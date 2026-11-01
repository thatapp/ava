---
title: XML Technical Notes
layout: component
description: Technical Notes for the XML component.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.4.2
updatedDate: 2025-12-04
redirect_from:
  - /components/xml/changelog.html
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

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.4.2 (December 04, 2025)

* Updated `Sailor` version to 2.7.7

### 1.4.1 (November 14, 2025)

* Fix: support maester attachments in `XML Attachment to JSON` action
* Updated `Sailor` version to 2.7.6
* Updated `@thatapp.io/component-commons-library` version to 4.0.0
* Removed `thatapp-node` dependency

### 1.4.0 (June 09, 2023)

* Implemented support `attachments` inside message body for `XML Attachment to JSON` action
* Updated Sailor version to 2.7.1
* Removed old dependencies

### 1.3.7 (September 12, 2022)

* Deleted buildType from component.json to fix component build

### 1.3.6 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.3.5 (April 13, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.3.4 (February 12, 2021)

* Update sailor version to 2.6.24

### 1.3.3 (October 30, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs

### 1.3.2 (June 6, 2020)

* Remove update docs on deploy script

### 1.3.1 (May 22, 2020)

* Update sailor version to 2.6.7
* Correctly handle incoming attachments that are empty.
* Update dependencies.
* Add debug log statements.

### 1.3.0 (April 23, 2020)

* Update dependencies
* Create new JSON to XML action
* Add help links

### 1.2.1 (March 30, 2020)

* Minor logs improvements in "XML to JSON" action

### 1.2.0 (January 30, 2020)

* Update sailor version to 2.6.1
* Refactor console.log to built in sailor logger
* Change build type to docker

### 1.1.1 (September 25, 2019)

* Upload attachments with component commons library

### 1.1.0 (June 24, 2019)

* Update `README`

### 1.0.0 (December 29, 2016)

* Initial release
