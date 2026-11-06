---
title: NetSuite REST API OAuth Client Credentials
layout: component
section: ERP components
description: The NetSuite REST API Component is specifically crafted to interact with the NetSuite REST API.
icon: netsuite_rest_api_client_credentials.png
icontext: NetSuite REST API client credentials component
category: netsuite-rest-api-client-credentials
updatedDate: 2026-03-27
ComponentVersion: 1.1.0
---

## AVA 1.0.0 release status — 2026-10-30

**READY for scoped source installation; vendor and installation checks UNVERIFIED**. [Published source](https://github.com/thatapp/connector-netsuite-rest-api-client-credentials/tree/dc836c968c505d2dfca4a0a03e4be9da405ed293) · [Release scope](https://github.com/thatapp/connector-netsuite-rest-api-client-credentials/blob/dc836c968c505d2dfca4a0a03e4be9da405ed293/REPORT.md) · [Intake evidence](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/795641eb286faba8ca12c44f067342e44a73201e/docs/ipaas/connector-submissions/netsuite-rest-api-client-credentials-evidence/audit-standalone-intake.json).

37 offline npm tests, 24 canonical exact isolated-worker cases and 37 sealed-loader tests pass. Twelve supplemental actual-host outcomes include six independent PS256 signature/form verifications and six clean-room refusals. Require allowlist and secret scan pass with zero network attempts. Harness `82cf1920f75833cb9757a4eaa980ff3c295faf18` generates temporary RSA3072 test keys only in memory. Dynamic assertion bodies are omitted from canonical matching; the separate cryptographic probe verifies their wire content and signatures.

The two actions are SuiteQL and Make Raw Request; there are no triggers. Authentication uses the account's fixed NetSuite HTTPS origin, client ID, certificate ID and an RSA3072/4096 private key. A five-minute PS256 client assertion requests `rest_webservices` scope with a form-encoded token POST. Tokens are held only for the invocation. No OAuth authorization-code refresh flow or global token cache is claimed.

The legacy form still requires Client Secret for field parity, but the M2M certificate flow does not use that value as a token-request secret. Administrator certificate/role registration is required and was not performed. Credential verification obtains a token; it does not establish access to every record or SuiteQL permission.

SuiteQL `@name` substitution follows the documented direct-substitution contract: it does not escape or parameterize values. Callers must supply correctly escaped SQL values. Null/nonscalar substitutions are refused; limit/offset are reserved. Page size is 1–1,000, offset 0–99,999 and divisible by the limit, with at most 100 pages/100,000 records. All pages are collected before emission; original-response mode emits each page's original response. The connector's 25 MiB aggregate bound is also constrained by host HTTP and execution limits.

Raw GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS stays on the account's REST origin, supports optional 404 handling and returns status/headers/body while removing credential headers. A clean-room token POST returns an explicit 501 because it was not sent; this does not indicate a production OAuth defect. Real key registration, token issuance, server compatibility and customer results remain unverified.

No root `INTAKE.json` is claimed: canonical and standalone receipts are in the pinned sibling evidence directory. The release branch later corrects punctuation in REPORT/PROVENANCE at `890621c`; runtime and immutable tag remain unchanged.

Installation is tracked in the single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). These checks use synthetic data and refused networking. Publication and offline compatibility do not establish live vendor behavior, UI rendering or installation; those checks remain **UNVERIFIED**.

The older reference below describes its source version, including the version in this page's metadata. The AVA scope and limits above supersede conflicting behavior, setup and availability claims. Historical release facts remain preserved.

---

## Table of Contents

* [Description](#description)
* [Authentication](#authentication)
* [Actions](#actions)
  * [Execute SuiteQL Query](#execute-suiteql-query)  
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

### Execute SuiteQL Query 

This action allows you to interact with NetSuite [SuiteQL](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_156257770590.html).

#### Configuration Fields

* **SuiteQL Query** - (string, required): Enter your query here. You can also use parameters such as <i>@value1</i> and <i>@value2</i>.
* **Emit Behavior** - (dropdown, optional, `Emit individually` by default): Select the emit behavior: `Emit individually` or `Emit original response`.
* **Collect all results** - (checkbox, optional): If selected, the component automatically retrieves all query results (up to 100,000 records).

#### Input Metadata
If `Collect all results` is unchecked:
* **Limit** - (string, required): The number of records to retrieve.
* **Offset** - (string, required): The number of records to skip.
* Additional fields will be available for any parameters used in `SuiteQL Query`.

#### Output Metadata
For `Emit Individually` mode: Each item populates the entire message.
For `Emit original response` mode: The original data returned from NetSuite, including all items and technical information.

#### Limitation
* [SuiteQL Limitations and Exceptions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_156257796125.html)
* SuiteQL queries can return a maximum of 100,000 results.
* The component directly replaces parameters with values from the message body, so make sure to properly escape them in the input metadata when needed.<br><br>For example, if your query is `SELECT * FROM account WHERE fullname = '@name'` and the message body (input metadata) is `{ "name": "John's account" }`, the resulting query will be `SELECT * FROM account WHERE fullname = 'John's account'` - this will cause an error! <br><br>You can escape this parameter using a JSONATA expression in the input metadata, for example: `$replace("John's account", "'", "''")` - this will result in the query `SELECT * FROM account WHERE fullname = 'John''s account'`, which is valid and will execute without errors.

### Make Raw Request
Enables you to run your own custom requests directly through the Netsuite REST API.

#### Configuration Fields

* **Don't Throw Error on 404 Response** - (optional, boolean): This setting configures the handling of 404 HTTP responses as non-errors. By default, it is set to `false`.

#### Input Metadata

* **URL** - (string, required): The specific path of the resource, which is appended to the base URL `https://${accountId}.suitetalk.api.netsuite.com/services/rest`. E.g. `record/v1/customer/1234`
* **Method** - (string, required): Determines the HTTP method for the request.
* **Request Body** - (object, optional): Contains the content for the request.
* **Request Headers** - (object, optional): Additional headers can  be put here.

#### Output Metadata

* **Status Code** - (number, required): Indicates the HTTP response status code.
* **HTTP Headers** - (object, required): Showcases the HTTP headers of the response.
* **Response Body** - (object, optional): Represents the body of the HTTP response.