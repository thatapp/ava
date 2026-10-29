---
title: Deploying a component
description: Here is a step-by-step guide to help you understand how our system works and the steps necessary to get a simple component pushed and ready for a successful integration.
layout: article
section: How-Tos and Tutorials
category: component
order: 0
redirect_from:
  - /guides/deploying-component.html
---

## Component intake

Customer git-push deployment, the old SSH receiver, the platform CLI and the former component registry are **not offered**.

Prepare the component source, descriptor and declared dependencies for review. An operator reviews the source and validation evidence, installs an approved build, and explicitly configures the build available to flows. A repository push or a successful local dependency install does not perform that installation.

Do not run the removed `git push ipaas master` recipe or substitute a renamed npm/Maven package. No package installation or deployment was reproduced for this documentation change.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

See [Node.js authoring](/developers/building-nodejs-component.html) and [dependencies](/developers/package-json-and-dependencies.html).
