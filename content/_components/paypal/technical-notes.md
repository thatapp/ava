---
title: PayPal Technical Notes
layout: component
description: Technical Notes for the PayPal component
icon: paypal.png
icontext: PayPal component
category: paypal
updatedDate: 2022-09-23
ComponentVersion: 1.3.2
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.3.2 (September 23, 2022)

* Update Sailor version to 2.6.29
* Get rid of vulnerabilities in dependencies
* Update maester-client version to 4.0.3

### 1.3.1 (May 20, 2022)

* Added checking for duplicate of incoming message for `Receive Instant Payment Notification` trigger

### 1.3.0 (May 06, 2022)

* Added `Receive Instant Payment Notification` trigger
* Added `Receive Payment Data Transfer` trigger
* Added `Webhook` trigger
* Added `Create Object` action
* Added `Update Object` action
* Improvement input metadata in `Make a Payment` action

### 1.2.0 (April 08, 2022)

* Added `Get New And Updated Objects Polling` trigger

### 1.1.0 (April 08, 2022)

* Added `Make a Payment` action
* Added `Lookup Object (at most one)` action

### 1.0.0 (March 25, 2022)

* Added `Make Raw Request` action
