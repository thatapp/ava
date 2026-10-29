---
title: EmitError
description: Emit `error` event is used to return an error which occurs during the execution of the component.
layout: article
section: Sailor
since: 20180430
order: 4
category: events
---

## Emit an error

A component can report an error through the host context without a message-construction SDK:

```js
exports.process = async function process(msg) {
  if (!msg || !msg.body) {
    this.emit('error', new Error('A message body is required'));
    return;
  }
  this.emit('data', { body: msg.body });
};
```

Return or await asynchronous work. The former Keen.io example depended on renamed packages and an unreturned promise chain, so it has been removed.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
