---
title: X (Twitter) Component
layout: component
section: Marketing-related components
description: X (Twitter) Component is designed to connect with X (Twitter) API v2
icon: x-twitter.png
icontext: X (Twitter) Component
category: twitter
ComponentVersion: 2.0.0
updatedDate: 2023-11-30
---

> **AVA `1.0.0` published; installation conditional.** [Connector PR1](https://github.com/thatapp/connector-x-twitter-component/pull/1) publishes `e3ece748e6bc1159f622eb8606d02b4166a2e53a`. Both documented actions and all four credential fields are built. Node 20/24 each pass 55 unit tests, 18 canonical and 18 standalone rows, allowlist/secret checks, and 32 supplemental isolated workers with 32 independently verified OAuth 1.0a signatures. [The pinned report](https://github.com/thatapp/connector-x-twitter-component/blob/e3ece748e6bc1159f622eb8606d02b4166a2e53a/REPORT.md) records exact scope, limits and historical failures. Host conditions [#57](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/57), [#72](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/72) and [#80](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/80) remain. **No READY/install or final combined-host qualification.** Live X permissions, plan limits and deployment remain UNVERIFIED.


### Credentials

To authenticate the component you will need to create an App in [developer portal’s App page](https://developer.twitter.com/en/portal/projects-and-apps), the component uses OAuth 1.0a. [more info](https://developer.twitter.com/en/docs/apps/overview).

Component credentials configuration fields:
- **Consumer key** (string, required) - Consumer API key
- **Consumer secret** (string, required) - Consumer API secret
- **Access token key** (string, required) - Authentication access token
- **Access token secret** (string, required) - Authentication access secret


## Triggers
This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.


## Actions

### Post tweet

Post new tweet.

#### Configuration Fields

Has no any configuration fields.

#### Input Metadata

* **Text** - (string, required): Text of your tweet.

#### Output Metadata

- **id** - (string, required): Unique identifier of your tweet

- **text** - (string, required): Text of your tweet

- **edit_history_tweet_ids** - (array, required): list of tweet ids edit history

### Make Raw Request

Executes custom request.

#### Configuration Fields

Has no any configuration fields.

#### Input Metadata

- **Url** - (string, required): Path of the resource. e.g.: `/2/users/me`

- **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

- **Request Body or Query** - (object, optional): Body of the request to send for `POST`, `PUT`, and `PATCH` or query for `GET` and `DELETE` methods

#### Output Metadata

- **headers** - (object, required): HTTP headers of the response.
- **responseBody** - (object, optional): HTTP response body.

#### Usage example:
**Get logged user information with creation date using Url**

![Get logged user information with creation date using Url](img/get_logged_user_info_using_URL.png)

```json
{
  "method": "GET",
  "url": "/2/users/me?user.fields=created_at"
}
```

**Get logged user information with creation date using Request Body or Query field**
![Get logged user information with creation date using Request Body or Query field](img/get_logged_user_info_using_request_body_or_query.png)

```json
{
"method": "GET",
"url": "/2/users/me",
"data": {
  "user.fields": "created_at"
  }
}
```

## Known limitations

Please visite [Twitter API v2 API limits](https://developer.twitter.com/en/docs/twitter-api/rate-limits)

> **AVA transport and output:** All four credentials are sealed. The port signs invocation-local requests to the current fixed `api.x.com` v2 origin with a fresh nonce and registers transient signatures/Authorization values before HTTP. `Post tweet` emits the documented data object. Raw Request returns the **complete HTTP JSON response** under `responseBody`, retaining `data`, `includes` and `meta`; this corrects the recovered source’s `data.data` truncation. A 204 omits optional `responseBody`. Authentication/cookie response headers are masked. GET/DELETE `data` becomes query parameters; POST/PUT/PATCH use JSON. Limits: 1 MiB request, 2 MiB response, depth 32, 8 KiB input path/16 KiB assembled URL. No connector-owned authorization flow, refresh, implicit retry or fixed 280-character assumption.
