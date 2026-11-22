---
title: S2 (Simple Storage) Technical Notes
layout: component
description: Technical Notes for S2 (Simple Storage) component.
icon: s2-component.png
icontext: S2 (Simple Storage) component
category: s2-component
updatedDate: 2025-12-19
ComponentVersion: 1.1.3
redirect_from:
  - /components/s2-component/completeness-matrix.html
  - /components/s2-component/changelog.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.3 (December 19, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 1.1.1 (November 13, 2020)

* Update Sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Annual npm vulnerabilities audit
* Refactoring code

### 1.1.0 (May 22, 2020)

* Update Sailor version to 2.6.7

### 1.0.0 (November 2, 2016)

* Initial release

## Completeness Matrix

Here is S2 (Simple Storage) Completeness Matrix:

{% include img.html max-width="70%" url="img/completeness-matrix.png" title="Completeness Matrix" %}