---
title: Zendesk Technical Notes
layout: component
description: Technical Notes for the Zendesk component.
icon: zendesk.png
icontext: Zendesk component
category: zendesk
updatedDate: 2022-09-09
ComponentVersion: 1.0.2
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.2 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.0.1 (April 14, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2
* Fix attachments processing

### 1.0.0 (June 6, 2021)

* Initial release

* Add new actions:

- `Lookup Object By Id`
- `Lookup Objects`
- `Make Raw Request`
- `Upsert Object By Id`
- `Add Attachment to Ticket`

* Add new trigger:

- `Subscribe To Ticket Audits`

## Completeness Matrix

Here is the Completeness Matrix for the Zendesk component:

![Completeness Matrix](img/completeness-matrix.png)
