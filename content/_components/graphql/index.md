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

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-blendededge-graphql-component-oih/tree/a76d6ddc58a5ae043797cc86ea4104166717715b) · [Complete field and qualification report](https://github.com/thatapp/connector-blendededge-graphql-component-oih/blob/a76d6ddc58a5ae043797cc86ea4104166717715b/REPORT.md) · [Immutable final intake and host receipts](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/1e02a2fc121b3ef7ff4208b401e299f254098a58/docs/ipaas/source-inventory-2026-10-30/graphql-release-intake/qualification.json).

Raw Request accepts one GraphQL query or mutation and emits `body.data`. Configured Request introspects the selected root operation, maps its arguments/defaults and expands output fields. Credentials support no auth, Basic and a custom API-key header. No triggers or automatic pagination are added. Archived OIH query/mutate actions and triggers are historical source, not the current AVA contract. The historical API-key section incorrectly repeats Basic Auth wording.

Configured metadata and Object Type selection require [reviewed host MR164](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/merge_requests/164), exact host commit cac38ac10c623706b086454a5ccf91f84adab89b, installed and explicitly enabled for the connector's full release commit. Its saved-step POST routes resolve static credentials in the parent, verify the saved flow/step/build/scope and issue one fixed introspection request. An isolated worker receives only a no-auth schema replay. The older general metadata routes remain unavailable, and ordinary clean-room POSTs remain unsent. UI adoption and saved-credential integration are not established by this release. NoAuth also needs a saved endpoint credential. OAuth/reference credentials are unsupported by this metadata capability.

Input metadata is limited across all arguments to1500 expanded nodes and256KiB before a business POST. Recursive/deeper-than12 schemas, output expansion above1500 fields or64KiB selections, and nested fields needing unmapped arguments refuse. ENUM inputs cannot be supplied; omission may use a provider default, including for a non-null ENUM. Custom scalars are opaque JSON. The historical depth control does not truncate execution. Requests are bounded to1MiB and responses to4MiB/depth40. Provider partial-data errors throw before emission. Short credential values that collide with schema identifiers cause a fixed refusal before metadata replay. Full limits and delivery semantics are in the report.

Final Node20.20.2 and24.13.0 each pass72 unit tests,18 canonical outcomes, unchanged require allowlist and86-file secret scans, standalone hostcheck and31 source workers. The exact release package passes122 focused checks against host88 on each runtime (eight model and15 adversarial workers), plus the host's66/78/109 regression suites qualified during integration. Independent connector review passes125 actual workers plus three direct sealed checks per runtime. Independent integrated-host review passes48 service checks with nine model workers and24 fixed mock fetches; it does not claim authenticated-route execution. All use synthetic data and zero external attempts. The earlier delegated route review remains incomplete; original failures and corrections are preserved. Two baseline workspace API documentation omissions and three Podio NO-SAMPLE groups remain.

Host #88 installation/enabling, #72 production integration, #57 UI/save verification and #80 explicit contract limits remain conditional. Live TLS/provider/compressed-response interoperability and complete deployed behavior remain unverified. Tag d2adce7e0974f698386c34e8c4aaef1b4e29e5ee peels to the source above; original main is unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical examples and release notes below remain historical.

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
