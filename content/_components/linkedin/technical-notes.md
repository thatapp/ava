---
layout: component
title: LinkedIn Technical Notes
description: Technical Notes for LinkedIn component.
icon: linkedin.png
icontext: LinkedIn component
category: linkedin
ComponentVersion: 1.0.0
updatedDate: 2026-04-20
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally: #57/#72/#75/#80 remain required; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-linkedin/tree/4d7da148f840eaa9050fb0c34660f65f1d3754ea) · [Full report](https://github.com/thatapp/connector-linkedin/blob/4d7da148f840eaa9050fb0c34660f65f1d3754ea/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-linkedin/blob/4d7da148f840eaa9050fb0c34660f65f1d3754ea/evidence/prepared/intake-24.json).

This release provides Posts polling, Create or Reshare Post and Raw Request. It defaults to the captured current version 202610; the old 202401 example is historical. Own-app OAuth declarations, synthetic client/credential persistence, authorization start/completion, sealed grants and worker resolution are tested. Live browser consent, UI/save behavior, app permissions and scope grants remain unverified (#57). Personal polling requires restricted r_member_social access absent from the page's example; profile verification is also permission-dependent. Reviewed host integration remains #72.

Polling uses the native author finder, inclusive start/exclusive end and lastModifiedAt. Author choices include Current Member and eligible managed organizations; labels come from checked organization lookup responses, with explicit URN fallback only for individual denied/missing items. Page size is bounded to 1–100. All pages validate before emission, with limits of 100 pages, 10,000 rows, 25 MiB and 55 seconds between calls. Offset paging is not an atomic snapshot and can omit/repeat rows; advancing to poll-start time does not reconcile late indexing. Emit page means one results array for the completed interval, not one emission per API page. Other unspecified object types and complete rich-content metadata are not built.

State is exactly numeric v2 {stateVersion:2,configurationHash:[eight uint32 words],lastTimestamp:integerMilliseconds}, retaining all SHA256 bits without reversible business data. Null/omitted/empty state initializes; exact valid legacy state migrates; malformed, redacted, extra-field or changed-scope state refuses and requires explicit reset. Normalized ISO offsets, pre-epoch and epoch values are supported. Author/interval changes require reset; page size, emission mode and token rotation preserve progress. Self-account changes are detected after profile lookup. With an explicit author URN, changing the authenticated account while retaining that author requires an operator reset because the URN does not identify the current account. Checkpoints must fit 5120 serialized bytes before emission. Delivery/persistence are not transactional or exactly-once.

Create/Reshare uses the actual provider ID, with explicit PUBLIC/MAIN_FEED/PUBLISHED defaults because the documented mapper exposes no controls for them. Raw requests stay on api.linkedin.com with bounded JSON and selected protocol/version headers. GET bodies refuse (#75/#80); all real unsent previews refuse without fabricated output, while native recorded/clean_room business fields survive. Full endpoint schemas, media creation, broad historical-version support and unsupported permission alternatives are not claimed.

The publisher/reviewer record final Node 20.20.2/24.13.0 results: 127 offline tests, 128 sealed tests, 36 canonical outcomes and all four gates; 84 source workers/35 stores plus 40 OAuth groups/8 workers; 69 independent workers/24 stores plus 3 direct sealed controls. Zero network attempts. This docs chat read the full report, checked exact tag/main state, accepted packaged intake and all 12 external final receipt hashes; these test suites are attributed to their authors. Annotated tag a92964c08c1608373946ae921791f78acbd31f87 peels to the source above; main remains 7562706d9814b9fea8cfed9ebbfc4d9a1ea1aa53. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical material below remains historical.

---

## Changelog

### 1.0.0 (April 20, 2026)

* Initial release of the LinkedIn component.
* **Added:**
  * `Get New and Updated Objects (Polling)` trigger for polling LinkedIn posts and other objects.
  * `Create or Reshare Post` action for creating new content or resharing existing posts.
  * `Make Raw Request` action for custom LinkedIn API calls.
  * Full support for the LinkedIn Versioned API (202401+).