---
title: Google PubSub Technical Notes
layout: component
description: Technical Notes for the Google PubSub component.
icon: google-pubsub.png
icontext: Google PubSub component
category: google-pubsub
updatedDate: 2021-07-23
ComponentVersion: 1.7.3
redirect_from:
  - /components/google-pubsub/changelog.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

> **AVA `1.0.0` published; installation conditional.** [Connector PR3](https://github.com/thatapp/connector-blendededge-google-pubsub-oih/pull/3) publishes `2110e96fc88b57be1b979772bad5bfd5c87455de`. Both Subscribe entries now pass exact private-decoder fixtures and synthetic managed lifecycle/accept-before-ACK/continuation checks. Node 20/24 each pass 69 unit tests, 49 canonical and 49 standalone rows, allowlist and secret scan; 24 supplemental workers verify 16 JWT signatures each. [The pinned report](https://github.com/thatapp/connector-blendededge-google-pubsub-oih/blob/2110e96fc88b57be1b979772bad5bfd5c87455de/REPORT.md) records bounds and historical failures. Required host integration: [#57](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/57), [#72](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72), [#80](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/80), and [#83 / MR168](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/168), plus [MR169 canonical decoder intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/169). This is **not an install recommendation or final combined-host qualification**. Live Google behavior and deployment remain UNVERIFIED.

## Changelog

### 1.8.0 (February 01, 2024)

* Added new `Subscribe` trigger (old one set as deprecated)
* Bump dependencies

### 1.7.3 (July 23, 2021)

* Fix bug with not-awaited emits and endless cycle problem
* Bump dependencies

### 1.7.2 (March 25, 2021)

* Update Sailor version to 2.6.24

### 1.7.1 (December 18, 2020)

* Update Sailor version to 2.6.21
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.7.0 (May 22, 2020)

* Update Sailor version to 2.6.7
* Migrate to the latest @google-cloud/pubsub library
* Fix code style

### 1.6.0 (October 12, 2018)

* Fixed nodejs version

### 1.5.0 (June 15, 2017)

* Update Sailor version to 2.1.6
* Update google-pubsub library

### 1.4.0 (April 21, 2017)

* Update Sailor version to 2.1.0
* Update google-pubsub library

### 1.3.0 (February 21, 2017)

* Update google-pubsub library

### 1.2.0 (October 11, 2016)

* Add Subscribe trigger

### 1.1.0 (October 7, 2016)

* Update Sailor version to 1.3.0

### 1.0.0 (September 30, 2016)

* Initial version
