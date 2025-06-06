---
title: Netsuite REST API OAuth Client Credentials
layout: component
section: ERP components
description: The NetSuite REST API Component is specifically crafted to interact with the NetSuite REST API.
icon: netsuite_rest_api_client_credentials.png
icontext: Netsuite REST API client credentials component
category: netsuite
updatedDate: 2024-11-07
ComponentVersion: 1.0.1
---

## Table of Contents

* [Description](#description)
* [Authentication](#authentication)
* [Actions](#actions) 
  * [Make Raw Request](#make-raw-request)

## Description

The NetSuite REST API Component is specifically crafted to interact with the [NetSuite REST API](https://system.netsuite.com/help/helpcenter/en_US/APIs/REST_API_Browser/record/v1/2023.1/index.html).

The current version of the component has been tested with API version `2023.1`.

## Authentication

The Netsuite REST API component authenticates through [OAuth2.0 Client credentials](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162730264820.html) flow which is a machine-to-machine authentication method and does not require user's manual interaction. To utilize the component, you must first accomplish a few steps:
- Create a new integration in NetSuite:
  - In the NetSuite account go to **Setup** -> **Integration** -> **Manage Integrations**.
  - Click **New**.
  - Make sure nothing in the Token-based Authentication section is checked (you might first want to check the `TOKEN-BASED AUTHENTICATION` to activate the rest of the checkboxes, disable them and finally uncheck the main one).
  ![Integration Setup](img/Integration_setup.png)
  - Check **Client Credentials (Machine to Machine) Grant**.
  - Check **REST Web Services**.
  - Save the integration.
  - Copy the values of **Client ID (Consumer ID)** and **Client Secret (Consumer Secret)**. They will not be visible anymore after you leave the page.
- Generate and load the certificate (RSA Key):
  - On your local computer generate the keys (openssl must be installed) `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -days 730`
  - In the NetSuite account go to **Setup -> Integration -> OAuth 2.0 Client Credentials (M2M) Setup**.
  ![Integration OAuth](img/Integration_oauth.png)
  - Click **Create New**
  - Select the entity (user) and the role. They must have the permission `Log in using OAuth 2.0 Access Tokens`.
  - Under **Application** select the integration you created above.
  - Load the public key file (**cert.pem**).
  - Save and write down the **Certificate ID**.

Component credentials configuration fields:

- **Account ID** (string, required) - Account ID (E.g. **1234567-sb1** (sandbox) or **1234567**). You can find it by going to Setup -> Company -> Company Information. Note that if you are using a sandbox account and an account ID is, e.g. `1234567_SB1`, you must input `1234567-SB1`.
- **Client ID** (string, required) - Client ID of the integration you created above
- **Client Secret** (string, required) - Client Secret of the integration you created above
- **Certificate ID** (string, required) - ID of the certificate you created
- **Certificate Private Key** (string, required) - Private Key of the certificate you created (full content of the key.pem file generated by the openssl command previously). The field must contain the header (`-----BEGIN PRIVATE KEY-----`) and the footer (`-----END PRIVATE KEY-----`)

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Make Raw Request
Enables you to run your own custom requests directly through the Netsuite REST API.

#### Configuration Fields
- **Don't Throw Error on 404 Response** - (optional, boolean): This setting configures the handling of 404 HTTP responses as non-errors. By default, it is set to `false`.
#### Input Metadata
- URL - (string, required): The specific path of the resource, which is appended to the base URL `https://${accountId}.suitetalk.api.netsuite.com/services/rest`. E.g. `record/v1/customer/1234`.
- Method - (string, required): Determines the HTTP method for the request.
- Request Body - (object, optional): Contains the content for the request.
#### Output Metadata
- **Status Code** - (number, required): Indicates the HTTP response status code.
- **HTTP Headers** - (object, required): Showcases the HTTP headers of the response.
- **Response Body** - (object, optional): Represents the body of the HTTP response.
