---
title: NetSuite REST API OAuth Client Credentials
layout: component
description: Technical Notes for the NetSuite REST API client credentials component.
icon: netsuite_rest_api_client_credentials.png
icontext: NetSuite REST API client credentials component
category: netsuite-rest-api-client-credentials
updatedDate: 2026-03-27
ComponentVersion: 1.1.0
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-netsuite-rest-api-client-credentials/tree/dc836c968c505d2dfca4a0a03e4be9da405ed293) · [Release scope](https://github.com/thatapp/connector-netsuite-rest-api-client-credentials/blob/dc836c968c505d2dfca4a0a03e4be9da405ed293/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/795641eb286faba8ca12c44f067342e44a73201e/docs/ipaas/connector-submissions/netsuite-rest-api-client-credentials-evidence/audit-standalone-intake.json).

37 offline npm tests, 24 canonical exact isolated-worker cases and 37 sealed-loader tests pass. Twelve supplemental actual-host outcomes include six independent PS256 signature/form verifications and six clean-room refusals. Require allowlist and secret scan pass with zero network attempts. Harness `82cf1920f75833cb9757a4eaa980ff3c295faf18` generates temporary RSA3072 test keys only in memory. Dynamic assertion bodies are omitted from canonical matching; the separate cryptographic probe verifies their wire content and signatures.

The two actions are SuiteQL and Make Raw Request; there are no triggers. Authentication uses the account's fixed NetSuite HTTPS origin, client ID, certificate ID and an RSA3072/4096 private key. A five-minute PS256 client assertion requests `rest_webservices` scope with a form-encoded token POST. Tokens are held only for the invocation. No OAuth authorization-code refresh flow or global token cache is claimed.

The legacy form still requires Client Secret for field parity, but the M2M certificate flow does not use that value as a token-request secret. Administrator certificate/role registration is required and was not performed. Credential verification obtains a token; it does not establish access to every record or SuiteQL permission.

SuiteQL `@name` substitution follows the documented direct-substitution contract: it does not escape or parameterize values. Callers must supply correctly escaped SQL values. Null/nonscalar substitutions are refused; limit/offset are reserved. Page size is 1–1,000, offset 0–99,999 and divisible by the limit, with at most 100 pages/100,000 records. All pages are collected before emission; original-response mode emits each page's original response. The connector's 25 MiB aggregate bound is also constrained by host HTTP and execution limits.

Raw GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS stays on the account's REST origin, supports optional 404 handling and returns status/headers/body while removing credential headers. A clean-room token POST returns an explicit 501 because it was not sent; this does not indicate a production OAuth defect. Real key registration, token issuance, server compatibility and customer results remain unverified.

No root `INTAKE.json` is claimed: canonical and standalone receipts are in the pinned sibling evidence directory. The release branch later corrects punctuation in REPORT/PROVENANCE at `890621c`; runtime and immutable tag remain unchanged.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Historical component releases.** The entries below record upstream/component release facts. They do not establish the build installed on the current host. Sailor versions and renamed package coordinates in these entries are historical references, not installation instructions or a current runtime support matrix.

## Changelog

### 1.1.0 (March 27, 2026)

* Added `Execute SuiteQL Query` action
* Added `Request Headers` parameter to `Make Raw Request` action
* Bumped Sailor version from 2.7.3 to 2.7.8
* Updated dependencies
* Removed unnecessary dependencies

### 1.0.1 (November 07, 2024)

* Changed the OAuth2 token algorithm from RS256 to PS256
* Bumped Sailor version from 2.7.2 to 2.7.3
* Bumped axios and component-commons-library non-breaking versions

### 1.0.0 (June 03, 2024)

* Added `Make Raw Request` Action.
* Initial component release.
