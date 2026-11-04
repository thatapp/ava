---
title: EmitData
description: Emit `data` event is used to return the results of the component execution.
layout: article
section: Sailor
since: 20180430
order: 3
category: events
---

## Emit a body envelope

```js
exports.process = async function process(msg) {
  this.emit('data', { body: msg.body });
};
```

This example does not require a renamed SDK package. Return or await asynchronous work; `emit('end')` does not control completion.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
