---
title: Approach to send requests to OAuth2 APIs
description: This document provides information on the process of obtaining and refreshing the tokens.
layout: article
section: Tokens in OAuth2 components
order: 1
category: tokens-in-oauth2-components
redirect_from:
  - /references/approach-to-send-requests-to-oauth2-apis.html
---

## Platform-managed OAuth renewal

The platform renews supported OAuth grants within five minutes of expiry; callers such as REST API V2 can force renewal after a 401.

The platform stores a replacement refresh token returned during renewal and preserves the previous token if no replacement is returned.

These statements apply to supported platform-managed grants. Component code must not implement a second refresh-token store or emit `updateKeys` as the renewal procedure for this path. The old Java refresh examples have been removed; Java component hosting is **not offered**.

Configure the provider's authorization requirements through the supported credential workflow. Provider compatibility and live renewal remain unverified.

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).
