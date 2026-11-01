---
title: Stripe Technical Notes
layout: component
description: Technical Notes for the Stripe component.
icon: stripe.png
icontext: Stripe component
category: stripe
updatedDate: 2026-05-05
ComponentVersion: 1.3.0
---

## AVA 1.0.0 candidate — 2026-10-31

**Published conditionally; not installed or deployment-ready.** [Exact source](https://github.com/thatapp/connector-stripe/tree/9e2363812ea695efa6957b53020c2ebb871782d1) · [Complete report and bounds](https://github.com/thatapp/connector-stripe/blob/9e2363812ea695efa6957b53020c2ebb871782d1/REPORT.md) · [Draft review PR](https://github.com/thatapp/connector-stripe/pull/1).

Three actions/no triggers. All seven documented object types; nested/legacy form input, bounded10-page/1000-object searches, metadata-array last-key-wins. Raw default version2026-04-22.dahlia; other operations use account default. Custom API environment settings are withheld by the tested host; no production custom timeout/retry claim.

39 tests/40 canonical/40 standalone/62-file secrets each Node20/24;43 process+7 metadata workers. All four intake gates pass with synthetic data and zero external attempts. Receipts use host b48061d6ac446698d772a3aec2b156e018e4a760 and harness6746b51f6f9673493b2ead12ed1b1f1efeb599bf. These are separate-host checks; final combined-host qualification is pending. Conditions #57/#58/#72/#80 remain. Installation status is governed by the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62); historical release notes below do not establish current runtime support.

---


> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.3.0 (May 5, 2026)

* Added `Upsert Object` action
* Updated default Stripe API version to `2026-04-22.dahlia` in `Make Raw Request` action
* Modernized dependencies:
    * `Node.js`: 18 -> 24
    * `axios`: 0.27.2 -> 1.15.2
    * `qs`: 6.11.0 -> 6.15.1
    * `@thatapp.io/component-commons-library`: 3.1.5 -> 4.0.0
    * `thatapp-sailor-nodejs`: 2.7.1 -> 2.7.8
    * `uuid`: 8.3.2 -> 9.0.1
* Removed legacy `thatapp-node` and `thatapp-rest-node` libraries

### 1.2.0 (March 01, 2024)

* Added `Lookup Objects (plural)` Action

### 1.1.0 (December 30, 2022)

* Changed internal library from stringify to qs.stringify to properly encode JSON data into application/x-www-form-urlencoded required by Stripe.
Now instead of specifying an input body in 'application/x-www-form-urlencoded' format as required by the Stripe API you can put either a plain JSON body or application/x-www-form-urlencoded data.

### 1.0.0 (July 1, 2022)

* Added `Make Raw Request` Action
* Initial component release
