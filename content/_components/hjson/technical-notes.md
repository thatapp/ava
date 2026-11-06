---
title: HJSON Technical Notes
layout: component
description: Changelog for the HJSON component
icon: hjson.png
icontext: HJSON component
category: hjson
updatedDate: 2024-10-02
ComponentVersion: 1.0.6
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.6 (September 10, 2024)

* Made the component more whitelabel-friendly by removing the company name from the title

### 1.0.5 (October 21, 2022)

* Fix error when component makes double HJSON stringify
* Fix error when component does not convert HJSON to JSON

### 1.0.4 (October 07, 2022)

* Fixed error while receiving attachment from Maester
* Update Sailor version to 2.7.0

### 1.0.3 (September 09, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update component-commons-library version to 3.0.2

### 1.0.2 (June 03, 2022)

* Fixed url in attachment

### 1.0.1 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config
* Update component-commons-library version to 2.0.2

### 1.0.0 (December 22, 2021)

* Added `Convert` action
