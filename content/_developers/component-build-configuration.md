---
title: "Components build configuration requirements — not offered"
description: "Former platform feature; not offered on the current host."
layout: article
section: Component Template Features
order: 1
category: component-descriptor
---

## Not offered

The following former platform feature is **not offered** on the current {{site.data.tenant.name}} host: The old component-build-helper service, platform Docker registry publishing and Java image builder. Its setup and installation recipe has been removed so it is not mistaken for a supported deployment path.

Do not install a renamed build-helper package or supply registry credentials using the former recipe. A component build must pass operator intake and be explicitly configured for the host.

See [Node.js component authoring](/developers/building-nodejs-component.html) and [component intake](/developers/deploying-component.html).

Runtime and deployment validation remain **UNVERIFIED** pending [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
