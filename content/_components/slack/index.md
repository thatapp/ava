---
title: Slack component
layout: component
section: Service components
description: Component is designed to connect with Slack API
icon: slack.png
icontext: Slack component
category: slack
updatedDate: 2025-02-02
ComponentVersion: 1.1.1
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped stored-token action installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-slack/tree/3effc2853be155437516bbdbe84c5ee56a94e51a) · [Release scope](https://github.com/thatapp/connector-slack/blob/3effc2853be155437516bbdbe84c5ee56a94e51a/REPORT.md) · [Intake evidence](https://github.com/thatapp/connector-slack/blob/3effc2853be155437516bbdbe84c5ee56a94e51a/INTAKE.json).

15 npm tests; 175 inherited/new entry smoke checks; 7 exact documented-action cases; require allowlist and secret scan PASS; zero network attempts.

The supported documented actions are Lookup Object (User by ID or email), Make Raw Request (GET/POST within Slack API), and Post Message. The stored OAuth token is consumed by the connector; provisioning and renewal remain host #57. Missing lookup values/users produce an empty object only when their corresponding allow option is enabled.

The 172 inherited wrappers remain for compatibility. Their loader smoke pass does not establish current Slack endpoint availability. Historical generic Delete/Lookup Objects/Upsert selectors are not implemented with the documented generic interface. Webhook subscription lifecycle is blocked by host #74. No full historical or UI parity is claimed.

Installation is handed off through the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Publication is not installation. No live vendor account, customer data, server access or deployment was used to establish these results.

The older reference below describes its source version. The scope and limits above supersede any conflicting runtime, attachment, environment-variable, or availability claim; historical release facts remain preserved.

---

## Credentials

To use component you need to [create APP](https://api.slack.com/apps/new) than go to `OAuth & Permissions` section and provide needed [Scopes](https://api.slack.com/scopes), after that [install it to slack Workspace](https://api.slack.com/authentication/basics#installing).

Component credentials configuration fields:

* **OAuth Token**  (string, required) - OAuth Tokens for Your Workspace. This token automatically generated when you installed the app to your team.

>**Please Note:** To successfully verify credentials you need to provide access to `channels:read` scopes.

>**Warning:** To maintain a smooth experience, we recommend reusing stored credentials where possible. Duplicating secrets across OAuth clients can result in errors and complications.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Lookup Object (at most one)

Lookup a single object by a selected field that uniquely identifies it.

#### Configuration Fields

* **Object Type** - (string, required): Object-type to lookup on. E.g `User`.
* **Lookup Criteria** - (object, required): A list of object parameters that can uniquely identify the object in the database.
* **Allow criteria to be omitted** - (boolean, optional): If selected field `Lookup Criteria Value` becomes optional.
* **Allow zero results** - (boolean, optional): When selected, if the object is not found - an empty object will be returned instead of throwing error.

> **Please Note**: To use this action on `User` Object Type you need to provide access to `users:read.email`, `users:read` scopes
`User ID` can be found in user Profile:
![image](https://user-images.githubusercontent.com/7985390/177800857-06ebed5b-0ad8-47d9-bac5-569133899213.png)

#### Input Metadata

* **Lookup Criteria Value** - (string, required unless `Allow criteria to be omitted` is selected): Value for unique search criteria in `Lookup Criteria` configuration field.

#### Output Metadata

Object with result of lookup.

### Make Raw Request

Executes custom request.

#### Configuration Fields

There is no Configuration Fields.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Post Message

Implements [post message](https://api.slack.com/methods/chat.postMessage) API endpoint.

#### Configuration Fields

There is noConfiguration Fields.

#### Input Metadata

* **Channel ID** - (string, required): ID of channel where user can post message. All available channels can be retrieved by [conversation.list API method](https://api.slack.com/methods/conversations.list). Example `C03ND7QEN5T`
* **attachmentsBlocksText** - (object, required): Object with properties `attachments`, `blocks` and `text`. One of these properties is required to describe the content of the message. If attachments or blocks are included, text will be used as fallback text for notifications only. See [there](https://api.slack.com/methods/chat.postMessage#args).
* **optionalArguments** - (object, optional): All possible arguments see [there](https://api.slack.com/methods/chat.postMessage#args).

#### Output Metadata

Output metadata include response data from `Post Message` API endpoint.
