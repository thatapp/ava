---
title: Rest API OAuth2 Client Credentials component
layout: component
section: Utility components
description: A component that can make REST calls while using OAuth2 Client Credentials Auth Grant Type.
icon: rest-api-client-credentials-auth-component.png
icontext: Rest API OAuth2 Client Credentials component
category: rest-api-client
updatedDate: 2025-05-21
ComponentVersion: 1.4.0
---

## Table of Contents

* [General information](#general-information)
    * [Description](#description)
    * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Actions](#actions)
    * [HTTP request](#http-request)
* [Known Limitations](#known-limitations)

## General information

### Description
Component that can make REST calls while using OAuth2 Client Credentials Auth Grant Type.

More details about OAuth2 Client Credentials Auth Grant Type:

[Client Credentials Auth Overview](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.4)

[Client Credentials Auth Specifics](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)

### Environment variables

Component does not use any environment variables

## Credentials
 * Token URL (required): Full URL from which to retrieve the access token
 * Username (required)
 * Password (required)
 * Base URL (optional): If provided, all requests made with the action should be appended to this base URL (account for trailing / chars in an intelligent way)
 * Scopes (optional): CSV List of scopes to ask for. Example: `client,users`
 * Additional Properties (optional): Comma separated list of additional properties. Each property should have key and value with `:` (example: `client_id:123`)
 * Tokens (JSON String, optional): Place to store access tokens & other received metadata (e.g. expiry time).

Example: 
```json
"{\"access_token\":\"access_token_value\",\"token_type\":\"bearer\",\"expires_in\":86400,\"tokenExpiryTime\":\"2021-11-11T23:18:00.470Z\"}"

```

## Actions
### HTTP request
#### Config Fields

* Error Tolerance (dropdown, required): Determines behavior for when an erroneous HTTP code is received. Options are as follows:
    * **No Errors Tolerated**: Any HTTP status code >= 400 should result in an error being thrown
    * **Only Not Found Errors Tolerated**: HTTP status codes of 404, 410 or similar should result in a message being produced with the status code and the HTTP reponse. All other error codes should result in an error being thrown.
    * **None**: Regardless of the HTTP error code, the component should produce an outbound message with the status code and the HTTP response.
    * **Manual**: A range of error codes to throw errors on can be configured via the message input.
    * **Rebound Selected Codes**: Error codes to rebound can be configured via the message input. If received code doesn't match with provided, error will be thrown.

* Response format (dropdown, optional): By default the response is parsed as JSON. If you want to download file, select `Attachment URL` or `Base64 string`.
* Request timeout in sec (number, optional): How long to wait for a response from the remote server before throwing a timeout error (this timeout value also applies to the token request call).  Default - 60sec
* Maximum request size in bytes (number, optional): You can limit here maximum size of the request body in bytes to prevent OOM errors. Default and maximum is 20971520 bytes (20MB)
* Maximum response size in bytes (number, optional): You can limit here maximum size of the response body in bytes to prevent OOM errors. Default and maximum is 20971520 bytes (20MB)

#### Input Metadata
 * Url (string, required): Path of the resource relative to the URL base. If there is no URL base, or if then this should be treated as the full URl.
 * Method (string enum, required): HTTP Verb for the request.
 * HTTP headers (object, optional): HTTP headers to attach to the request
 * Request Body (object, optional): Body of the request to send
  * If **Error Tolerance** is **Manual**:
    * HTTP Codes to throw errors (array of error ranges, optional default to `[]`): A double array with a list of ranges of HTTP response codes to throw errors upon receiving. Use a syntax that matches retry-axios. Example: `[[400, 403], [405,599]]` - Throw errors on all errors apart from 404.
    If array is empty, no error would be thrown, produce an outbound message with the status code and the HTTP response.
 * If **Error Tolerance** is **Rebound Selected Codes**:
    * HTTP Codes to rebound (string, required): Coma separated list of the codes to rebound, example: `404, 401`. If you put here `*` all codes will be rebounded. If the rebound code doesn’t match the response code, an error will be thrown.


#### Output Metadata
* Status Code (integer, required): HTTP status code of the request
* HTTP Headers (object, optional): HTTP headers of the response
* Response Body (object, optional): The format depends on the selected `Response format`:
  * **JSON** - Returns the response body as a JSON object (default format)
  * **Attachment URL** - Downloads the response to internal storage and provides an `attachmentUrl` key containing the file location
  * **Base64 string** - Converts the response to a Base64-encoded string and returns it in the `base64` key

## Known Limitations
Please note that for the functionality to save and update the token to work correctly, the platform user must have `workspaces.credential.edit` permission (see elastic.io [API docs](https://api.elastic.io/docs/v2#/credentials/patch_credentials__credential_id_)).
