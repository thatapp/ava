---
layout: article
title: Release Process
order: 1
section: Operation Guides
description: This document describes a common approach for release delivery for OEM customers.
category: operation
---

{: .no_toc}

{{page.description}}

1. TOC
{:toc}

## Roadmap planning

### {{site.data.tenant.name}} responsibility:

To ensure that platform will evaluate according to the customers and market needs,
{{site.data.tenant.name}} will gather feedback from OEM customers on a regular basis regarding:

*   General feedback
*   Suggested components improvements
*   Suggested functionality improvements
*   Required functionality
*   Required components

Then the feedback would be help prioritise the roadmap for at least two next releases
(2 months). Roadmap update information will be communicated to the OEM customers.

### OEM customer responsibility:

Provide feedback to {{site.data.tenant.name}}:

*   Platform usage experience
*   Future/ongoing projects
*   Future/ongoing use cases

> Frequency and communication methods should be agreed individually with OEM customer and {{site.data.tenant.name}} Customer Success

## Release acceptance

Before installing release should be approved by OEM customer. {{site.data.tenant.name}} installs
new releases on the {{site.data.tenant.appURL}} production every 2nd week. OEM customers will
receive release notes to understand what was done. New functionality can be tested
by OEM customers on the {{site.data.tenant.name}} production.

Once every four weeks a general release notes will published in our
[documentation portal](/releases). All release changes
will be tested and approved by the OEM customer on the {{site.data.tenant.name}} production.

> {{site.data.tenant.name}} will ensure release quality, each release tested by {{site.data.tenant.name}} QA
> team before deploying to {{site.data.tenant.name}} production and on the moment of delivery
> to the OEM WL instance will be already tested by {{site.data.tenant.name}} production users.

## Release delivery

By default, {{site.data.tenant.name}} will install releases on OEM instances on a monthly
(once in four weeks) basis. If all release changes are tested and approved by the
OEM customer {{site.data.tenant.name}} will install release to the OEM instance in a week after
release date. Documentation on the White-labeled portal can be updated with two
strategies:

1.   {{site.data.tenant.name}} handles updates documentation updates
2.   OEM customer handles documentation updates

## Summary

*   Release cycle:  Roadmap planning => Release acceptance => Release delivery
*   Roadmap planning based on customers feedback
*   Release acceptance based on release notes review and testing on the {{site.data.tenant.name}} production
*   Release delivery consist from platform and documentation portal update
*   Platform update usually performed in a week after release date once in a four weeks
