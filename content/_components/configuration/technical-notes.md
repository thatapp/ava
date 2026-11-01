---
title: Configuration Technical Notes
layout: component
description: Technical Notes for the Configuration component
icon: configuration.png
icontext: Configuration component
category: configuration
updatedDate: 2025-12-03
ComponentVersion: 1.0.2
redirect_from:
  - /components/configuration/changelog.html
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-configuration-component/tree/496585cba0e0ef032229890a5ed357fdd3c4f6e8) · [Full report](https://github.com/thatapp/connector-configuration-component/blob/496585cba0e0ef032229890a5ed357fdd3c4f6e8/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-configuration-component/blob/496585cba0e0ef032229890a5ed357fdd3c4f6e8/INTAKE.json).

The Emit data action parses saved configData as literal JSON and emits one object. The root must be a non-null object, including an empty object; nested arrays are supported. The supplied string is limited to5120 UTF-8 bytes including whitespace and depth30. Nonfinite parsed numbers, invalid Unicode and __proto__/constructor/prototype property names refuse. Duplicate keys keep their last value and numbers retain JavaScript precision. These explicit bounds supersede unrestricted-complexity prose below. Verification and execution share validation; emission is awaited without retry or snapshots.

Saved configuration takes precedence over node and message overrides, and an updated saved value is used by the next tested dispatch. configData is ordinary nonsecret configuration, not encrypted secret storage; downstream values remain intact while normal record masking applies. The actual catalog advertises component_verify available:true and on_save:true, and real verifier calls pass/refuse. #57 concerns authenticated browser/UI acceptance. The inherited JSONataView currently becomes a generic text field; JSONata expressions, Evaluate/editor behavior, realtime caching and transactional updates across flows are unverified. No triggers, network requests, dependencies or environment variables are introduced. The separate Simple/REST/Email example is not qualified by this release.

Final committed checks on both Node20.20.2/24.13.0 pass33 offline tests,36 canonical sealed-worker outcomes, the unchanged require allowlist,61-file secret scan and standalone hostcheck. The saved-configuration proof passes29 checks/23 actual workers/23 real store rounds. Independently authored tests were rerun with92 checks/82 instrumented workers/88 store rounds plus two separate sealed-loader controls per runtime; zero external network attempts. Synthetic in-memory persistence exercises actual flow-store/resolver/dispatcher/verifier code, not a deployed database. Packaged INTAKE.json explicitly identifies reviewed runtimeaf28789 before documentation/evidence packaging; external final publication receipts pin the released commit. Both original source failures and packaging corrections remain disclosed in REPORT. Original source, seven screenshots, three complete pages and historical release text are preserved.

Annotated tag7585442619ddbcf2b2b7435c2bbecbb199cbafb2 peels to the source above; main remainsc3db1f8eaf6c29e9476d3a7551d85990bc6016d2. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical release notes and example material below remain historical, with the release qualifications above controlling current availability.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.0.2 (December 03, 2025)

* Update Sailor version to 2.7.7
* Remove unused `thatapp-node` dependency
* Update the Node engine to version 24.x.

### 1.0.1 (November 04, 2022)

* Update Sailor version to 2.7.1

### 1.0.0 (April 08, 2022)

* Update Sailor version to 2.6.27
* Get rid of vulnerabilities in dependencies
* Add component pusher job to Circle.ci config

### 0.0.7 (November 26, 2021)

* Updated sailor version to 2.6.26

### 0.0.6 (February 12, 2021)

* Update sailor version to 2.6.24

### 0.0.5 (January 29, 2021)

* Update sailor version to 2.6.23

### 0.0.4 (December 17, 2020)

* Update sailor version to 2.6.21

### 0.0.3 (October 30, 2020)

* Update sailor version to 2.6.18
* Annual audit of the component code to check if it exposes a sensitive data in the logs
* Add circle.ci automation build

### 0.0.2 (December 24, 2019)

* Update sailor version to 2.5.4
* Update component to use component logger
* Change build type to docker
