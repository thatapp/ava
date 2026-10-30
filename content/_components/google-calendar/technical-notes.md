---
layout: component
title: Google Calendar Technical Notes
description: Technical Notes for Google Calendar component.
icon: google-calendar.png
icontext: Google Calendar component
category: google-calendar
ComponentVersion: 1.0.0
updatedDate: 2026-02-11
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-google-calendar/tree/35be581702443f31927072be2a01b769022b8040) · [Release scope](https://github.com/thatapp/connector-google-calendar/blob/35be581702443f31927072be2a01b769022b8040/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/0fbb6b5b4d40c9c60491ffc8b5f73f590203dd3f/docs/ipaas/connector-submissions/google-calendar-evidence/intake-standalone.json).

53 offline npm tests and 11 exact isolated-worker outcomes pass; the additional sealed suite has 54 tests including a matrix of 28 host outcomes. Require allowlist and secret scan pass with zero network attempts. Host `1cfd955f35804ddc03a134c048fe70f741f5c84a` and harness `8cd83582eef099b47cf044cee1b9a560c90ba300` are pinned. The harness supplies a test-only clock to verify exact millisecond checkpoints without changing production polling or timers.

The scope is five actions and one polling trigger for Events. Lookup/delete require calendar and event IDs. Upsert with an event ID PATCHes; without one it POSTs a new event. A failed update does not silently create. Raw GET/POST/PATCH/DELETE stays on the Google Calendar origin, supports optional 404 handling and returns actual status, headers and body. Recorded mutations refuse an unsent vendor success.

Event fields come from the official Discovery schema, revision 20261026. The documented page-size range remains 1–100/default 100. List operations collect and deduplicate before emission, bounded to 100 pages, 5,000 events and 25 MiB; exceeding a bound fails without advancing a checkpoint. PATCH replaces supplied arrays rather than appending.

Polling supports created/updated only and filters cancelled/deleted events. Created polling scans the bounded collection; updated polling uses updatedMin plus client filtering. The lower timestamp is exclusive and the upper timestamp is fixed at invocation time. Snapshots advance only after complete successful emission, including successful empty polls. Late arrivals at consumed timestamps can be missed; exactly-once delivery is not promised.

The connector consumes host-owned OAuth access tokens and does not refresh them. Consent, grants and UI rendering remain unverified. No extra saved vendor configuration is needed at execution, so the supplemental OAuth-config propagation blocker does not apply to this scoped release. Source and standalone gate receipts are in the pinned sibling evidence directory above.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## Changelog

### 1.0.0 (February 11, 2026)

* Added `Delete Object By ID` action
* Added `Get New and Updated Objects Polling` trigger
* Added `Lookup Object By ID` action
* Added `Lookup Objects (plural)` action
* Added `Make Raw Request` action
* Added `Upsert Object` action
* Initial component release