---
title: GraphQL component
layout: component
section: Protocol components
description: A component that use GraphQL - a query language for APIs and a runtime for fulfilling those queries with your existing data.
icon: graphql.png
icontext: GraphQL component
category:  graphql
updatedDate: 2025-11-14
ComponentVersion: 1.1.3
---

## AVA candidate status — configuration-time introspection blocked

**Untagged; not installed.** [Draft PR4](https://github.com/thatapp/connector-blendededge-graphql-component-oih/pull/4) pins [source 3aa2f2be0d2a165b5820f48b705a1e99ce524462](https://github.com/thatapp/connector-blendededge-graphql-component-oih/tree/3aa2f2be0d2a165b5820f48b705a1e99ce524462) and the [full report](https://github.com/thatapp/connector-blendededge-graphql-component-oih/blob/3aa2f2be0d2a165b5820f48b705a1e99ce524462/REPORT.md). Both Node 20.20.2/24.13.0 committed runs pass all four gates: 60 unit tests, 18 canonical worker outcomes, unchanged require allowlist and 61-file secret scans. Standalone hostcheck and 23 supplemental actual workers pass with zero external network attempts. Packaged precommit receipts cover the same runtime before evidence packaging (54 files); exact committed receipts are tracked separately.

Raw Request maps Query to one GraphQL query/mutation and emits body.data. Configured Request introspects the chosen root operation field, maps its arguments, preserves defaults and expands fields/edges/pagination output. No triggers or automatic pagination are added. Credentials support no auth, Basic and a custom API-key header; the page's repeated Basic Auth wording under API Key is erroneous. Only recorded Axios transport is used; the pure GraphQL.js parser/schema library is pinned, with no vendor SDK. The recovered OIH query/mutate actions/triggers are archived because they do not match this documented contract.

Actual config-time getObjectTypes/getMetaModel calls are blocked: current general-component routes record POST without sending it and do not resolve scoped stored credentials. [Host #88](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/88) specifies authenticated scoped credential resolution and a narrowly validated parent-owned introspection capability. Ordinary POST/mutations must remain unsent. Recorded live-mode metadata success does not establish UI availability; do not put secret values into route query strings. No tag or release count includes this candidate.

The historical depth control remains declared but does not truncate execution, as the limitations below state. Recursive/deeper-than-12 schemas, generated selections beyond 1500 fields/types or 64 KiB, and nested fields requiring unmapped arguments explicitly refuse. ENUM input values remain unsupported; optional values may be omitted. Required/scalar/unknown input checks are enforced. Custom scalars are opaque JSON. Endpoint is HTTPS only; requests are bounded to 1 MiB and responses to 4 MiB/depth 40. GraphQL errors, including partial-data errors, throw before any emission; real unsent previews refuse 501. Native recorded/clean_room business fields remain intact. No live endpoint, UI/save, installed host or exactly-once mutation claim is made. #57/#72/#80 and independent source review remain open qualifications. Historical examples/releases below retain their original facts.

---

* [General information](#general-information)
   * [Description](#description)
   * [Completeness Matrix](/components/graphql/technical-notes#completeness-matrix)
* [Credentials](#credentials)
* [Actions](#actions)
   * [Raw Request](#raw-request)
   * [Configured Request](#configured-request)
* [Known Limitations](#known-limitations)

## General information

### Description
[GraphQL](https://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data.

## Credentials

* **Endpoint** - (string, required) set endpoint to your GraphQL API.
* **Type** - (dropdown, optional, default to `No Auth`) may be used when authorization needed
  * **No Auth** - don't use any authentication
  * **Basic Auth** - use HTTP Basic access authentication
    * **Username** - provide a username
    * **Password** - provide a password
  * **API Key Auth** - use HTTP Basic access authentication
    * **Header Key** - custom HTTP Header
    * **Header Value** - HTTP Header value

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Raw Request

Action to execute provided raw GraphQL request string

#### Config Fields

There is no Config Fields in GraphQL component.

#### Input Metadata

* **Query** (string, required) - Your query, represented as text inside **"query"** key.

![Raw Request](img/raw-request.png)

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

```
{
  allFilms {
    films {
      title
    }
  }
}
```

</details>

#### Output Metadata

* Depends on Query execution result, represented as object inside **"data"** key.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

  ```json
   {
   "allFilms": {
      "films": [
         {
         "title": "A New Hope"
         },
         {
         "title": "The Empire Strikes Back"
         },
         {
         "title": "Return of the Jedi"
         },
         {
         "title": "The Phantom Menace"
         },
         {
         "title": "Attack of the Clones"
         },
         {
         "title": "Revenge of the Sith"
         }
      ]
   }
   }
  ```

</details>

### Configured Request

Action to execute custom GraphQL request for chosen service

![Configured Request](img/configured-request.png)

#### Config Fields

* **Query Type** (dropdown, required) - Select one of the supported query types:
  * **Query** - use to fetch data
  * **Mutation** - use to modify server-side data
* **Object Type** (dropdown, required) - Select Object you want to fetch/modify
* **Response structure max depth** (number, optional) - Set dependent objects depth, defaults to - 1

#### Input Metadata

Autogenerated based on GraphQL introspection mechanism and includes all available query objects fields

#### Output Metadata

Depends on Query execution result, represent An object inside **"data"** key, includes Pagination and Edges


## Known limitations

1. `Configured Request` action does not support ENUM inputs.
2. Only arguments may be used in `Configured Request` action (selection of `fields` is not available yet and all available fields would be returned in response)
3. Configuration of `Response structure max depth` feauture in `Configured Request` action would not affect on actual result: all available fields would be returned with max available depth.
