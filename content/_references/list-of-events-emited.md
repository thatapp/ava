---
title: List of events emitted by the components
description: Here is a growing list of events emitted by the components.
layout: article
section: Sailor
since: 20180430
order: 2
category: events
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

This is a legacy event vocabulary. Current behavior is defined by the host, not by a Sailor version; the rows below are not a conformance certification.

## List of events

| Event | Description |
|------ |-------------|
| [data](/references/emitdata) | This event is used to emit or return the values from the executions.|
| [error](/references/emiterror) | This event is used to emit the error messages which are occurring in the executions.|
| snapshot | 	Using this event one can emit the Snapshot object.|
| [end](/references/emitend) | 	Accepted for compatibility; does not control completion. Return or await process() instead.|
| updateKeys | 	Legacy event; supported platform OAuth grants renew through the platform path.|
| httpReply | This event emits/sends back the HTTP Reply.|
