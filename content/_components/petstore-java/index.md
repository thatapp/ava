---
title: Petstore-java component
layout: component
section: Utility components
description: A first step component to deploy into our platform.
category: petstore-java
icon: petstore.png
icontext: Petstore-java componentt
updatedDate: 2026-03-18
ComponentVersion: 1.0.9
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

> **Not offered: this Java connector build.** Java component hosting is not offered on the current host. The action/schema and release details below are retained as reference for that Java build; they do not describe an installed Node.js replacement. Current installation and runtime remain **UNVERIFIED**.

## Description

A fully working and operational component template to use for starting development of your
own component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}})..
This component comes with a basic architecture which you can use on the platform.

Our documentation on [building components in java](/guides/building-java-component)
has more about each including file and their function.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Petstore-nodejs component like [changelog](/components/petstore-nodejs/technical-notes#changelog).

## Requirements

To use this component you must be registered platform user. Please see our home
page at [{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}) to learn how to register.

### Authentication

To authenticate use `secret` as an API key.

## Triggers

### Get Pets By Status

Retrieves pets from the Petstore API by given pet status using Dynamic or Static
Data Sample. The difference is how these functions are made. However, both can have
the following statuses defined by the Petstore API.

![Get Pets By Status](img/petstore-trigger.png)

The input fields are:

*   `Available` - select to get all pets with status `Available`.
*   `Pending` - select for `Pending`.
*   `Sold` - select for `Sold`.

## Actions

### Creates a new pet

Creates a new Pet by making a `POST` to `/pet` endpoint of the API.

![Creates a new pet](img/create-a-new-pet.png)

The input fields are:

*   `name` - the name of the pet.
*   `status` - the status which can have one `Available`, `Pending` and `Sold` values.