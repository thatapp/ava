---
title: Understanding Secrets
description: This document provides basic information about Secrets feature.
order: 5
layout: article
section: Building integration flows
category: building integration flows
redirect_from:
  - /getting-started/secrets.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Introduction

The platform serializes OAuth grant renewal using a per-grant in-process lock and a stored compare-and-set lock across processes.

For supported platform OAuth grants, the platform owns renewal; components do not maintain a second refresh-token lifecycle. Locks are source-supported mechanisms, not proof that every deployed race condition has been tested.

## How it works

There are two entities involved in the work of Secrets feature as a service: the
Authentication Client (`auth-client`) and the Authentication Secret (`auth-secret`).

The `auth-client` takes the responsibility of communication between the Application (platform)
and the Service (3rd party service), while the `auth-secret` takes the role of the User
(user of the platform) and communicates with the Client in the normal
[3-leg OAuth2 authorisation process](/developers/how-the-oauth2-process-works).

Let us consider the case of Google OAuth2 authentication:

*   The `auth-client` would hold the `client_id`, `client_secret`, `auth_uri`, `token_uri` and `refresh_token_uri` values. These values would guarantee connection between the platform and third party service.
*   The `auth-secret` would hold the actual `access_token`, `refresh_token`, `expires_in`, `expires_at` and `scope` of this connection.
*   There can be more than one `auth-secret` for each `auth-client`.
*   Using `auth-client` and `auth-secret`, the Secrets feature as a service updates all credentials when necessary, without waiting for the components to initiate the process.

## Auth Client Creation

Before you can create your `auth-client` you must know that:

*   The `auth-client` can have `workspace`, `contract` and `tenant` visibility levels. For each level you need to have a matching permission. For example only tenant administrator can create a Client with `tenant` visibility level.

*   They divide into two distinct groups: `oauth2` and others:
    *   For `oauth2` type you must supply `client_id`, `client_secret`, `auth_uri`, `token_uri` and `refresh_token_uri` values to create the Client. Since some services have their own flavour of OAuth2, this is the right place to give them as well. Check the [Creating OAuth2 Clients](#creating-oauth2-clients) section for more explanation.
    *   For other types you have relative freedom. However, our system already knows about `noauth` (use no authentication), `basic` (use username/password pair) and `api_key` (use header and API Key) types. Contact us if you need something more.

### Creating OAuth2 Clients

You can create OAuth2 `auth-client` using the UI. After creating a `auth-client`, its visibility level will be `workspace`. To create a client for the entire `contract` or `tenant`, use the [API call](#creating-oauth2-clients-using-api-call).

To create via UI you can use the [REST API](/components/rest-api/) component as
an example to create an OAuth2 `auth-client` when selecting to add a credentials:

{% include img.html max-width="100%" url="/assets/img/getting-started/secrets/choose-oauth2.png" title="Choose OAuth2 type credential in REST-API component." %}

After clicking on ***+ Add New Auth Client*** a form will show-up to fill-in the details for
OAuth2 client:

{% include img.html max-width="60%" url="/assets/img/getting-started/secrets/fillin-oauth2-form.png" title="Fill in the form to create the OAuth client." %}

After this step you can create the `auth-secret` the same way as one would create
a credential.

For more advanced cases we recommend using an [API call](#creating-oauth2-clients-using-api-call) to create `auth-client`. We also recommend you to read our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients) on this topic.

### Creating other clients

To create other `auth-client` types using the [Create Auth Client]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients/post_auth_clients) API documentation. However, our platform knows already about the following types:

*   `noauth` - to use for no authentication.
*   `basic` - to use for regular `username`/`password` pair.
*   `api_key` - to use for the `header`/`API Key` pair.

## Auth Secret Creation

Before we can proceed with `auth-secret` creation, couple points needs to be considered:

*   Before you can create a secret for any component you must create a client first.
*   Your component might have only one defined `auth-client` in the system. It will be auto-selected by default.
*   In case you have more than one `auth-client` defined in the system, a drop-down window to select a clients will appear.
*   In case of OAuth2 type authorisation a drop-down with defined OAuth clients will be available. If you have only one OAuth2 client defined, it will be selected by default. Here you have also chance to create a new OAuth client.
*   You can create `auth-secret` on UI identically as you would create a credential
for any component.


OAuth2 secret creation has more options since the real power of Secrets feature
becomes evident here. For example when we create a OAuth2 credential we can add
`scopes` and Additional parameters here:

{% include img.html max-width="100%" url="/assets/img/getting-started/secrets/create-oauth2-secret.png" title="Create OAuth2 Secret." %}

Here is an example when you have only one OAuth2 client. It will be selected as a default client,
unless you add a new client:

{% include img.html max-width="100%" url="/assets/img/getting-started/secrets/create-oauth2-secret-choose-client.png" title="Create OAuth2 Secret." %}

### Auth Secret Creation via API calls

Of course, you can also create an Auth secret using the appropriate API endpoint. We recommend you to familiarize yourself with this feature, which is described in detail in our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/auth%20secrets). Please note that there are cases where creating secrets will be much easier and more convenient using API calls.

## Managing Auth Clients using API call

As already mentioned in advance, you can create a `auth-client` for a `contract` only using a API call. This resource allows you to create an `auth-client`:

<details close markdown="block"><summary><strong>Click to expand</strong></summary>

```json
{
"data":{
  "type":"auth-client",
  "attributes":{
     "type":"oauth2",
     "name":"Auth client",
     "credentials":{
        "client_id":"{CLIENT_ID}",
        "client_secret":"{CLIENT_SECRET}",
        "refresh_token_uri":"http://example.com",
        "token_expires_in":18000,
        "token_uri":"{TOKEN_URI}",
        "auth_uri":"{AUTH_URI}"
     }
  },
  "relationships":{
     "components":{
        "data":[
           {
              "id":"{COMPONENT_ID}",
              "type":"component"
           }
        ]
     },
     "contract":{
        "data":{
           "id":"{CONTRACT_ID}",
           "type":"contract"
        }
      }
    }
  }
}
```
</details>

Of course, you can create a `auth-client` for the `workspace` using a API call. You can select a visibility level for a `auth-client` in a relationship: `workspace`, `contract` or `tenant`. No relationship means that `auth-client` visibility level will be global.

* `CLIENT_ID` - this is a unique identification of **Application**.
* `CLIENT_SECRET` - this is also provided by the **Application**.
* `TOKEN_URI` - this is the URL which the **Application** is going to use to get the **User** authenticated.
* `AUTH_URI` - the is the URL which is going to be used by Application to request the `access_token` and `refresh_token`.

As an example, you can see how these parameters are defined in the [Salesforce component](/components/salesforce/creating-oauth-app-for-salesforce).

Below you can see where to find `CONTRACT_ID`(**1**) and `COMPONENT_ID`(**2**):

{% include img.html max-width="100%" url="/assets/img/getting-started/secrets/ids.png" title="Contact and Clients ID" %}

> Please check the [Create Auth Client]({{site.data.tenant.apiDocsUri}}/v2#/auth%20clients/post_auth_clients) API documentation for more. Also note that in addition to the creation itself, you can use API calls for a variety of other tasks. For example, you can [lists]({{site.data.tenant.apiDocsUri}}/v2#/auth%20secrets/get_workspaces__workspace_id__secrets) all auth secrets of the specified workspace or [return]({{site.data.tenant.apiDocsUri}}/v2#/auth%20secrets/get_workspaces__workspace_id__secrets__secret_id_) the specified auth secret from the defined workspace. You can also [update]({{site.data.tenant.apiDocsUri}}/v2#/auth%20secrets/patch_workspaces__workspace_id__secrets__secret_id_) or [remove]({{site.data.tenant.apiDocsUri}}/v2#/auth%20secrets/delete_workspaces__workspace_id__secrets__secret_id_)
 the specified auth secret.

## Auth Secret Expiration Behavior

Updating an auth client's client secret clears its refusal state; a grant whose refresh token was refused still requires reconnection.

Rotate an expiring client secret through the supported credential workflow. If a refresh token has been refused, reconnect the grant; changing the client secret alone does not replace that token.
