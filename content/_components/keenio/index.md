---
title: Keenio component
layout: component
section: Service components
description: Keenio component for the platform.
icon: keenio.png
icontext: Keenio component
category: keenio
updatedDate: 2023-04-06
ComponentVersion: 1.0.0
---

## AVA 1.0.0 candidate — 2026-10-31

**Published conditionally; not installed or deployment-ready.** [Exact source](https://github.com/thatapp/connector-keenio/tree/c39771157905f7211d72ac89de7af21495c23338) · [Complete report and bounds](https://github.com/thatapp/connector-keenio/blob/c39771157905f7211d72ac89de7af21495c23338/REPORT.md) · [Draft review PR](https://github.com/thatapp/connector-keenio/pull/1).

Send Event uses fixed HTTPS POST and Authorization Write Key,64KiB bounded object input and awaited provider acknowledgement. No automatic retry or exactly-once claim. Write-only credential verification explicitly refuses501 without creating a probe event; a successful authentication check is not offered.

28 tests/7 canonical/7 standalone/53-file secrets each Node20/24;11 actual workers. All four intake gates pass with synthetic data and zero external attempts. Receipts use host b48061d6ac446698d772a3aec2b156e018e4a760 and harness6746b51f6f9673493b2ead12ed1b1f1efeb599bf. These are separate-host checks; final combined-host qualification is pending. Conditions #57/#72/#80 remain. Installation status is governed by the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62); historical release notes below do not establish current runtime support.

---


## Description

This is an open source component template for [Keen.io](https://keen.io/) Online Analytics System which is developed specifically to run on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Keenio component like [changelog](/components/keenio/technical-notes#changelog).

## Credentials

{% include img.html max-width="100%" url="img/keenio-credentials.png" title="Credentials" %}

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Send Event

{% include img.html max-width="100%" url="img/send-event.png" title="Send Event" %}
