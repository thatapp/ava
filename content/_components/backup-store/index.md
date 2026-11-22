---
layout: component
title: Sync Backup Store
section: Utility components
description: Store a page of queried Salesforce records in an active ThatApp backup.
icon: salesforce.png
icontext: Salesforce backup
category: backup-store
ComponentVersion: 1.0.0
updatedDate: 2026-11-22
---

## Write a Salesforce backup page

The managed Salesforce backup recipe uses this action after it queries an object. The flow must belong to the active backup deployment in the same organization and workspace. The profile determines which objects can be written and where their records are stored.

Set **Salesforce object API name** to the name used by the query, for example `Account`. Map the query page to the action input. Each record in `records` needs its Salesforce `Id` and `SystemModstamp`. If it includes `attributes.type`, that value must match the configured object. Records marked as deleted require separate deletion verification.

The result reports `object`, `received` and `written`. The action uses each record’s ID and modification time when updating its backup, so an older page cannot overwrite a newer copy. Compare the two counts when checking repeated pages. If a page is refused, inspect its object, records and active deployment. A refused page leaves the backup cursor in place.
