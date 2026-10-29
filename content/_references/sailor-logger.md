---
title: Sailor Logger
description: Information about currently used logger in components and how to implement it in your components. This document describes the changes in node.js sailor from January 2020.
layout: article
section: Sailor
since: 20200116
order: 1
category: sailor
---

## Host logging

The host records both this.logger and console output against the step and applies its redactor; Sailor version numbers do not determine this host's logging contract.

```js
exports.process = async function process(msg) {
  this.logger.info('Processing step');
  this.emit('data', { body: msg.body });
};
```

Do not log credential values or assume every arbitrary secret is redacted. Current Logs UI behavior has not been verified. Java component hosting and its old logging interface are **not offered**.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
