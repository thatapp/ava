---
title: Mercado Pago Technical Notes
layout: component
description: Technical Notes for the Mercado Pago component
icon: mercado.png
icontext: Mercado component
category: mercado
updatedDate: 2025-11-14
ComponentVersion: 1.0.2
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.2 (November 14, 2025)

* Force the component builds to be dockerized ad pushed to the Docker Hub

### 1.0.1 (April 22, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 1.0.0 (February 25, 2022)

- Added `Make Raw Request` action
- Added `Get New And Updated Objects Polling` trigger
- Added `Lookup Object (at most 1)` action
