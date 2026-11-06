---
title: ODATA component
layout: component
section: Protocol components
description: OData stands for Open Data Protocol and it is used to querying and updating data.
icon: odata.png
category: odata
icontext: ODATA component
updatedDate: 2023-04-06
ComponentVersion: 3.0.3
---

## AVA 1.0.0 release status — 2026-10-30

**Published conditionally; not installed or live verified.** [Exact source](https://github.com/thatapp/connector-odata/tree/466adc8944ba02297fd499bc6120081137c725ae) · [Complete field and qualification report](https://github.com/thatapp/connector-odata/blob/466adc8944ba02297fd499bc6120081137c725ae/REPORT.md) · [Immutable final intake](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/blob/3cb714010647d373f743cdf5127febfff9fb363e/docs/ipaas/source-inventory-2026-10-30/odata-release-intake/qualification.json).

This release implements Lookup Object By Field, Upsert Object By ID and Get Objects Polling. Configure an HTTPS OData v4 service root and No Auth, Basic Auth or custom-header API Key Auth; OAuth and refresh are unsupported. Verification lists matching service-document entity sets and does not prove write or delta permissions. Dynamic object/field selectors and input/output models run in isolated callbacks; production saved-step UI remains conditional on #72/#57.

Lookup builds typed equality with `$top=2` and requires exactly one result. With Allow Empty Criteria enabled, missing/null/empty-string input emits an empty object without HTTP; zero and false are values. Upsert creates by POST when all keys are absent and updates by PATCH with `If-Match: *` when all keys are present. Partial keys refuse. Composite, inherited and aliased complex keys are supported; cloned update payloads omit keys. A returned representation must contain valid keys matching the addressed update identity; only then is `isNew` added. PATCH204 performs an additional representation GET. A write can apply before response validation fails; retries are not transactional.

**Every nonempty lookup and every upsert fetches current CSDL, including warm state.** Normal actions use two HTTP calls; PATCH204 uses three. Cached field/key drift requires reset. Int64/Decimal action fields use exact strings, including known nested complex collections; input values for those types must be strings. Raw JSON arrives as UTF-8 bytes, negotiates IEEE754Compatible and refuses native numeric values that would lose precision, including unsafe integral floating values. Safe native numbers remain supported. This is a bounded original-token check, not full media-parameter or OData conformance. Unknown/open and navigation values remain opaque; Decimal string exponents are unsupported.

Polling performs one GET per invocation, emits records and then stores next/delta state. Relative links resolve using payload context or the actual request URL and remain confined to the configured service origin/path. The initial pages contain existing records, followed by provider-supported deltas. Tombstones pass through; no output metadata, time-range controls, timestamps or `isNew` are added. Checkpoints store bounded numeric control bytes and a SHA-256 configuration scope, not business records or credential strings. This is not encryption. Credential/configuration or cached-metadata changes require explicit reset; legacy/corrupt state refuses. Actual snapshot storage and fresh-worker resume were tested with synthetic memory dependencies; production durability remains unverified.

Limits include4MiB JSON/CSDL,1MiB write/input,1,000 records,256KiB callback envelopes,16keys and5KiB serialized checkpoints. CSDL has namespace, depth, node and expansion limits; DTDs, external models, unsupported encodings and partial metadata responses refuse. Primitive/enum types, type definitions, bounded inheritance and complex collections are modeled. Facets, capability/writability annotations, every inheritance semantic, spatial/navigation structure and full vendor conformance are not. The historical approximately12MiB CRM metadata sample exceeds the supported cap.

Exact final Node20.20.2/24.13.0 qualification passes137 npm tests,34 canonical outcomes, the unchanged require allowlist and291-file secret scans, plus standalone hostcheck and68 supplemental process workers/16metadata callbacks/101mockHTTP per runtime. Independent runtime review passes161checks/198processworkers/59real snapshot-store roundtrips each; separate metadata review passes137checks comprising113metadata callbacks and24process actions. Six original findings are resolved; original failures and reviewer-test corrections are preserved. All checks use synthetic data with zero external network attempts.

Conditions #57 installation/UI, #72 production callbacks, #75 binary transport and #80 durable control/polling state and explicit compatibility bounds remain. Complete OData/provider behavior, live write/delta permission and deployment are UNVERIFIED. Annotated tag 5960a37c6c7af66538c053e6013894af7e1c0f48 peels to the exact source above; main remains unchanged. Installation follows the single [#62 table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62). Historical upstream documentation below remains historical.

---

A component designed to work with generic APIs which implement the [OData v4 specification](http://www.odata.org).

## Authentication

{% include img.html max-width="100%" url="img/odata-credentials.png" title="Authentication" %}

## Triggers

### Get Objects Polling

Get objects which have recently been modified or created.

{% include img.html max-width="100%" url="img/odata-get-objects-polling.png" title="Get Objects Polling" %}

All types of objects programmatically detectable are covered.  When selecting this trigger, the first input that must be configured is **Object type to fetch**.  This drop-down when opened will produce a list of all object types on the system.

This trigger relies on the service implementing OData's delta links.  Not all services (e.g. TripPin and NAV/Business Center) support this.

### Technical Notes

* Time range options are not supported.
* Standardized `isNew`,`createdOn` and `modifiedOn` not included in
output.
* This trigger could not be tested directly but can the code path can be tested through dynamics CRM component
* This trigger will throw an exception if no delta links are provided.
* The schema of the snapshot stored by this trigger is `{"deltaLink": "string delta link"}`
* The first iteration will produce all the objects in the system.  Subsequent iterations will produce changes from the first iteration.
* This trigger makes one API call per invocation
* Does not produce metadata.

## Actions

### Lookup Object by Field

Given a field and a field value that matches exactly one record, find that matching record.

{% include img.html max-width="100%" url="img/odata-get-lookup-object.png" title="Lookup Object by Field" %}

There are three configuration drop downs:

* **Object Type to Lookup**: All types of objects programmatically detectable are covered.  This drop down when opened will produce a list of all object types on the system.
* **Name of Field to Match**: Select a field to compare against.  Currently, this will return a list of all fields on the object selected in the `Object Type to Lookup` drop-down.
* **Allow Empty Criteria**: Should the lookup operation be skipped (i.e. this component becomes a No-op which emits the empty message) if all criteria are empty?

### Technical Notes

* All Objects Programmatically Detectable Covered.
* Shows all fields, not just unique fields.
* In metadata is dynamic where based on
  * The selected field, a type for the field is inferred
  * Allow Empty Criteria, the required attribute for the field is inferred
* OData has a complexity that in some values when placed in filters must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
* The schema of the snapshot stored by this action is

```json
{
  "version": 1,
  "fieldName": "Value selected from Name of Field to Match",
  "objectType": "Value selected from Object Type to Lookup",
  "operationType": "lookupObject",
  "wrapFieldInQuotes": true/false
}
```

* PseudoCode:

```
IF empty field value AND allowEmptyCriteria THEN
  emit empty object
ELSE
  CONST results = Fetch objects with value for field
  IF results.length !== 1 THEN
    Throw exception
  emit result
```

* One API call per invocation

### Upsert Object By ID

Update an existing entry with the id provided.  Otherwise create a new entry.

{% include img.html max-width="100%" url="img/odata-upsert-object.png" title="Upsert Object By ID" %}

All types of objects programmatically detectable are covered.  When selecting this trigger, the first input that must be configured is **Object type to fetch**.  This drop-down when opened will produce a list of all object types on the system.

### Technical Notes

* All Objects Programmatically Detectable Covered.
* Adds an `isNew` flag to show update vs create
* Metadata is dynamic. The object structure is learned from OData metadata.  The ID field(s) are flagged with `(Primary Key)`
* OData has a complexity that in some values when placed PUT by ID calls must be wrapped in quotes while others do not.  This action can query the OData metadata to learn which should be applied for this field.
* The schema of the snapshot stored by this action is

```
{
  "version": 1,
  "objectType": "Value selected from Object Type to Lookup",
  "operationType": "upsert",
  "wrapFieldInQuotes": true/false

}
```

* PseudoCode:

```
IF there is not a value for any key THEN
  make POST request to create object
ELSE IF there is a value for every key THEN
  make PATCH request to update object
ELSE
  throw error
END
```

*   Limitation: Does not work if the system can create objects based on an external key
*   TripPin does not work for updating/creating information.
*   One API call per invocation

## Other Limitations

*   Sometimes there are false positive when verifying credentials
*   List of selectable object types for an action/trigger don't reflect that some object types are read-only or not modifiable/deletable
*   Metadata does not expose the ids of linked objects as fields
*   Not successfully tested on local agent

## Configuration Info

### Required environment variables

No environment variables are required for deployment.

### Version and compatibility information

This component interacts with OData version 4.  It has been
tested with the [OData TripPin Reference Service](http://www.odata.org/odata-services/).
