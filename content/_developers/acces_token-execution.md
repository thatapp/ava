---
title: How to access access_token during component execution?
description: This article describes credentials structure and how to access access_token during component execution?
layout: article
section: Tokens in OAuth2 components
order: 5
category: tokens-in-oauth2-components
redirect_from:
  - /references/how-to-access-access_token-during-component-execution.html
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## Description

Secret credential fields are sealed with AES-256-GCM, and writes requiring a sealing key are refused when that key is unavailable; non-secret configuration fields are not covered by this encryption claim.

This describes storage protection for secret fields, not the on-disk or API representation of every configuration field. Do not log access or refresh tokens.

## Example

So for example, if in the `component.json` it is named like `oauth` then it will be stored under that name. For obvious reasons we did not include a real data in the above example but the structure of stored data is the same.

>It is entierly up to the component developer how to name that particular section in the `component.json`. It can be `myOauth` or something else. **The system will use that exact name (`myOauth`) to store the structure in the database.**

To access, and modify values they would need to be addressed accordingly like `credentials.oauth.access_token` or through any other name the structure was called. For example in case if it was called `myOauth` then using something like this `credentials.myOauth.access_token`.

## Credentials field name

The name of the credentials field inside the `component.json` is used to access OAuth data during the component execution. If for example the field was set to be **myOAuth** inside the component.json then the credentials would be like:

```js
{
     "myOAuth":  {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"bearer",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
     }
}
```
