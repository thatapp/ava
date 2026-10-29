---
title: "Real-time Flows and component re-deployment — not offered"
description: "Former platform feature; not offered on the current host."
layout: article
section: How-Tos and Tutorials
order: 5
redirect_from:
  - /guides/realtime-flows-and-component-re-deployment.html
---

## Not offered

The following former platform feature is **not offered** on the current {{site.data.tenant.name}} host: The old indefinitely running container redeployment workflow. Its setup and installation recipe has been removed so it is not mistaken for a supported deployment path.

A git push does not redeploy a running flow. The former promise that publishing restarts every container is not a current host guarantee; reviewed builds are selected through operator intake.

See [Node.js component authoring](/developers/building-nodejs-component.html) and [component intake](/developers/deploying-component.html).

Runtime and deployment validation remain **UNVERIFIED** pending [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
