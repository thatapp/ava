---
title: Mailchimp Technical Notes
layout: component
description: Technical Notes for the Mailchimp component
icon: mailchimp.png
icontext: Mailchimp component
category: mailchimp
updatedDate: 2026-04-21
ComponentVersion: 2.0.0
redirect_from:
  - /components/mailchimp/changelog.html
---

> **AVA `1.0.0` published; installation conditional.** [Connector PR1](https://github.com/thatapp/connector-mailchimp/pull/1) publishes `4b1b77c39d6cf00c12311b8b50f6e48d92cf23ca`. All three documented actions, list/store selectors and dynamic list-specific merge metadata are built. Node 20/24 each pass 45 unit tests, nine canonical and nine standalone rows, allowlist/secret checks and 13 independent isolated workers. [The source-pinned report](https://github.com/thatapp/connector-mailchimp/blob/4b1b77c39d6cf00c12311b8b50f6e48d92cf23ca/REPORT.md) records bounds and retained failures. Host conditions [#57](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/57), [#72](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72) and [#80](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/80) remain. **No READY/install or final combined-host qualification.** Live Mailchimp permissions and deployment remain UNVERIFIED.


> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 2.0.0 (April 21, 2026)

* Added dynamic metadata for `Add new Subscriber` action to support list-specific merge fields.
* **ATTENTION**: Moving to the dynamic metadata might break existing flow mapping. Please check your flows after upgrading.
* Upgraded dependencies to latest stable versions:
    * `thatapp-sailor-nodejs`: 2.7.1 -> 2.7.8
    * `moment`: 2.29.4 -> 2.30.1
* Removed `thatapp-node` dependency and replaced it with a local utility.
* Integrated latest security fixes and `better-npm-audit`.

### 1.0.5 (January 05, 2026)

* Update Sailor version to 2.7.7
* Remove unused `thatapp-node` dependency
* Update the Node engine to version 24.x.

### 1.0.4 (June 12, 2022)

* Fixed credential verification
* Upgrade to Sailor 2.7.1

### 1.0.3 (April 27, 2022)

* Upgrade to sailor 2.6.27
* Fix dependencies
* Added ability to set `Ansprache` field for `Add new Subscriber` action

### 1.0.2 (November 5, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit

### 1.0.1 (December 30, 2019)

* Update component to new sailor version 2.5.4

### 1.0.0 (January 25, 2018)

* Initial release which includes a bunch of previous unversioned releases
