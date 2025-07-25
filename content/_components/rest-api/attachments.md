---
title: Attachments
layout: component
description: Information on attachments in Rest API component.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2025-07-10
ComponentVersion: 2.2.0
---

## Attachments

With the *REST API component*, you can send binary data as attachment. You just need to choose
`multipart/form-data` Content type and attachments from the input message will be
included to the request payload automatically.

*REST API component* automatically load binary data to attachments with next content
types in response headers:

*   `image/*`
*   `text/csv`
*   `application/msword`
*   `application/msexcgel`
*   `application/pdf`
*   `application/octet-stream`
*   `application/x-binary`
*   `application/binary`
*   `application/macbinary`
