---
title: package.json and Dependencies
description: Here is how to make sure to have all the correct dependencies for your component.
layout: article
section: Behaviour Checks
order: 1
redirect_from:
  - /guides/package-json-and-dependencies.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Declare the dependencies used by your component

List the modules your component actually imports in `package.json` and include its dependency lockfile in operator review. Do not add renamed platform packages merely to satisfy the former SDK template. A component does not need a message-construction package to emit a body envelope.

## Local checks and host intake

Resolve and test the chosen dependencies in an isolated development environment, using the package manager and Node.js version agreed for that build. A local dependency check does not install or approve the component on the host. See [component intake](/developers/deploying-component.html).

The earlier npm commands were candidate instructions, not failures reproduced by this change. Package availability, compatibility and clean-environment installation remain **UNVERIFIED** until their specific checks are run. This page does not replace them with another vendor's unverified package name.
