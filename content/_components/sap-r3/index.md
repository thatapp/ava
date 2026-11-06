---
title: SAP ECC (R/3, ERP) component
layout: component
section: ERP components
description: A component that communicates with provided SAP ECC (R/3, ERP) system.
icon: sap-r3.png
icontext: SAP ECC component
category: sap-r3
updatedDate: 2020-01-17
ComponentVersion: 1.2.0
---

> **Verification status:** The corrections on this page are supported by source review. Runtime behavior, UI availability and deployed settings remain **UNVERIFIED** until the relevant ledger lines are rerun in [issue #64](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/64).

## General Information

### How works

Communication with SAP ECC (R3) established using SAP Java Connector (SAP JCo).

### API Version

SAP Java Connector 3.0.19 SDK is being used.

## Requirements

### Environment Variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `AVA_REQUIRED_RAM_MB` | false | Recommended value of allocated memory, MB | `512` |

> Please Note: From the platform version 20.51 we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

## Credentials

1. `Connection Type` - Mandatory. type of connection. Options: `Application Server` and `Message Server`. Application Server (AS) provides programming interfaces to handle data (get, create, update, delete). The application server exposes two interfaces: ABAP and Java.
The SAP Message Server manages communication between the application servers, passes requests from one application server to another within the system and contains information about application server groups and the current load balancing within them. It uses this information to choose an appropriate server when a user logs on to the system.

2. `SAP Message Service` - Mandatory for connection type: `Message Server`.

3. `SAP System Number` - Mandatory. System Number of SAP ECC (R/3, ERP) DB.

4. `SAP Client Number` - Client Number of SAP ECC (R/3, ERP). Client number may be different for different installations. But here is an example of clients available in one of the standard installation types (an extraction from SAP's official documentation):
  -    `000` - serves as standard delivery client (as usual in on-premise deployments)
  -    `100` - is the primary demo client that contains the pre-configured scenarios and sample data.
  -    `200` - can be used to experience the activation of SAP Best Practices on your own (see the SAP Best Practices implementation guide for details)
  -    `300` - contains the activated Best Practices based on the White-list approach
  -    `400` - contains the activated Best Practices based on the merged-client-000 approach

5.  `SAP Hostname` - Mandatory. Domain or IP of SAP ECC (R/3, ERP) System.

6.  `SAP User Name` - Mandatory. Username that used for SAP ECC (R/3, ERP) connection.

7.  `SAP Password` - Mandatory. Password that used for SAP ECC (R/3, ERP) connection.

8.  `SAP Language` - Language to operate in SAP ECC (R/3, ERP).

## Triggers

SAP ECC (R/3, ERP) component includes the following triggers:

  1. [RFC Server (Only for Realtime flows)](/components/sap-r3/triggers#rfc-server-only-for-realtime-flows)
  Generic trigger which gives possibility to receive RFC calls from the SAP ECC platform.

## Actions

SAP ECC (R/3, ERP) component includes the following actions:

  1. [Call RFC Service](/components/sap-r3/actions#call-rfc-service)
  Generic action which gives possibility to call an RFC function on the SAP ECC platform.

## Known Limitations

1. Chain function call in one transaction context not supported.
2. IDOC mechanism of RFC function call not supported.
3. Component does not support Local Agents.
4. Asynchronous operations are not supported.
5. `RFC Server` trigger currently supports callback requests only. RFC server can not define the RFC call response.
After receiving the request the server responses with an input BAPI structure.
6. `RFC Server` trigger works for realtime flows only.

## Deployment status

The former git-push, platform Docker registry and VPN/subnet deployment recipe is **not offered**. Do not modify legacy registry database records or publish an image using that recipe.

The SAP JCo details above describe vendor dependencies. They do not establish a supported or installed build on this host. An operator must review the exact component and dependencies through component intake. Installation, native/Java prerequisites and current runtime behavior remain **UNVERIFIED**.
