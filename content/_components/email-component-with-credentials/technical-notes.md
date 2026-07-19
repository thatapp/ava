---
title: Email component with Credentials Technical Notes
layout: component
description: Technical Notes for the Email component with Credentials.
icon: email-with-credentials.png
icontext: Email component with Credentials
category: email
ComponentVersion: 1.0.1
updatedDate: 2026-05-07
---

## Changelog

### 1.0.1 (May 07, 2026)

* Enabled automatic CSS inlining for HTML emails by adding `inline_css: true` to Mandrill API requests.
* Updated `README.md` with documentation on HTML email styling best practices and provided an inlined HTML example.
* Upgraded dependencies to latest stable versions:
    * `thatapp-sailor-nodejs`: 2.7.4 -> 2.7.8
    * `@thatapp.io/component-commons-library`: 3.2.1 -> 4.0.0
    * `axios`: 1.7.7 -> 1.16.0
    * `moment`: 2.29.4 -> 2.30.1
* Removed `thatapp-node` dependency and replaced it with a local utility.

### 1.0.0 (November 22, 2024)

* Initial release
* Copy of the existing [Email component](/components/email/index.html), enhanced with the ability to set custom credentials, allowing flexible management of different domains, workflows, and API keys.