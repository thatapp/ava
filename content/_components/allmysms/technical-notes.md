---
layout: component
title: Allmysms Technical Notes
description: Technical Notes for the Allmysms component
category: allmysms
icon: allmysms.png
icontext: Allmysms component
ComponentVersion: 1.0.0
updatedDate: 2025-11-13
redirect_from:
  - /components/allmysms/changelog.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.0 (November 13, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 0.0.2 (November 3, 2020)

* Upgrade to sailor 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit
* Add eslint
* Add CircleCI

### 0.0.1 (March 13, 2019)

* Initial release
