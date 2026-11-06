---
title: Defining environment variables for components
description: This article explain why and how to define environment variables for components on examples.
layout: article
section: Developer Reference
order: 1
category: environment-variables
redirect_from:
  - /references/how-to-define-envirament-variables-for-components.html
---

## Description

> **Beta behavior:** Repository environment values are stored sealed. Running steps do not receive values entered on a repository record. The examples below describe component authoring.

Environment variables are an essential part of the {{site.data.tenant.name}} platform environment. Apart from the ever growing [list of system-wide variables](env-vars-execution), it is possible and rather encouraged, to define custom environment variables.

## Why use environment variables?

Let us consider the following use case when a component is developed for a CRM, Shop or ERP. If this particular component is intended to be used only for one specific client then many values can be hard-coded inside the component.

What if the component is developed to work for different clients? All the hard-coded values for the different clients need to be rewritten again and again. This will introduce an unnecessary amount of overhead work and be the potential source of errors.

Here are a couple of examples where the environment variables are implemented.

## Example1: Environment Variables as OAuth Client keys

Connecting an external service with {{site.data.tenant.name}} platform is usually handled through the security credentials which are used to establish a communication between our platform and the external service.

When a system-wide deployed component is used, the login/password pair or API Keys are usually enough. The establishment of a secure connection with the external servers is handled by our system using our own OAuth Client keys and OAuth Apps created by us. For this case no further configuration is necessary.

When the component is deployed separately into your repository on the main tenant or on your own dedicated tenant, then it is necessary to establish custom OAuth keys and create separate OAuth Apps in addition to supplying the usual login/password information.

For example, here is how you can [create your own OAuth App for Salesforce](/components/salesforce/creating-oauth-app-for-salesforce). After the creation of OAuth App {{site.data.tenant.name}} platform needs to be given the specific details such as the **OAuth client key** and the **OAuth client secret** so that it can connect to your Salesforce instance. {{site.data.tenant.name}} Salesforce component is configured to expect these parameters as environment variables.

### Exposing envVars in the Node.js code

When you define any environment variables in your code {{site.data.tenant.name}} platform has no knowledge of them unless they are properly exposed. To expose all the environment variables they must be declared in the component descriptor file component.json, as shown below. This is required to inform the {{site.data.tenant.name}} platform that these environmental variables are required for the component to operate properly.

In the most cases `envVars` are defined in the `component.json` as it is done in the case of Salesforce:

```js
"envVars": {
  "OAUTH_CLIENT_ID": {
    "required": true,
    "description": "Your Salesforce OAuth client key"
    },
"OAUTH_CLIENT_SECRET": {
    "required": true,
    "description": "Your Salesforce OAuth client secret"
   }
}
```

Following the above definition it is then used further down like this:

```js
"oauth2": {
  "client_id": "{{OAUTH_CLIENT_ID}}",
  "client_secret": "{{OAUTH_CLIENT_SECRET}}",
  "auth_uri": "https://{{prodEnv}}.salesforce.com/services/oauth2/authorize",
  "token_uri": "https://{{prodEnv}}.salesforce.com/services/oauth2/token"
}
```

These are just small parts of the whole component.json which can be viewed fully in [Salesforce-component GitHub repository](https://github.com/thatapp/salesforce-component).

>**Please note:** the actual `clent_id` and `clent_secret` [are defined inside](https://github.com/thatapp/salesforce-component/blob/master/lib/helpers/oauth-utils.js) the`oauth-utils.js` and not only in `component.json`

## Related links

- [Environment variables available during component execution](env-vars-execution)
- [Creating OAuth App for Salesforce](/components/salesforce/creating-oauth-app-for-salesforce)
- [Salesforce-component GitHub repository](https://github.com/thatapp/salesforce-component)
