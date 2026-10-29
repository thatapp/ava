---
title: EmitEnd
description: Emit `end` event is used to inform the flow that the component has finished the execution.
layout: article
section: Sailor
since: 20180430
order: 5
category: events
---

## Completion

Return or await a promise from process() for asynchronous work; emit('end') is accepted but does not control completion on this host.

```js
exports.process = async function process(msg) {
  await Promise.resolve();
  this.emit('data', { body: msg.body });
};
```

An unreturned callback can finish after the host considers the call complete. This example does not certify all emit-contract behavior.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
