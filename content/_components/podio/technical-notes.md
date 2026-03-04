---
title: Podio component Technical Notes
layout: component
description: Technical Notes for the Podio component.
icon: podio.png
icontext: Podio component
category: podio
ComponentVersion: 2.0.0
updatedDate: 2026-03-03
---

## Changelog

### 2.0.0 (March 3, 2026)

* Major component overhaul with 96 actions and 5 triggers
* Added `Item: Create` Action with dynamic metadata and auto-add category options
* Added `Item: Create (Dynamic)` Action for advanced routing with raw JSON payloads
* Added `Item: Update` Action with dynamic metadata and auto-add category options
* Added `Item: Get` Action
* Added `Item: Get Value V2` Action
* Added `Item: Get Field Values V2` Action
* Added `Item: Clone` Action
* Added `Item: Delete` Action
* Added `Item: Get Count` Action
* Added `Item: Get References` Action
* Added `Item: Find Referenceable` Action
* Added `Item: Get References by Field` Action
* Added `Item: Get Revision Difference` Action
* Added `Items: Filter` Action with auto-pagination
* Added `Items: Filter by View` Action with auto-pagination
* Added `Items: Get All by App` Action with auto-pagination
* Added `App: Get` Action
* Added `App: Create` Action with silent mode
* Added `App: Update` Action
* Added `App: Activate` Action
* Added `App: Deactivate` Action
* Added `App: Delete` Action
* Added `App: Add Field` Action
* Added `App: Delete Field` Action
* Added `App: Update Field` Action
* Added `App: Get Field` Action
* Added `App: Get by Labels` Action
* Added `App: Get by Space URL Label` Action
* Added `App: Get Apps by Space` Action
* Added `App: Get Dependencies` Action
* Added `App: Get Inverse Dependencies` Action
* Added `App: Get Space App Dependencies` Action
* Added `App: Get Features` Action
* Added `App: Get All Apps` Action
* Added `App: Install from Share` Action
* Added `Space: Get` Action
* Added `Space: Create` Action with privacy and notification settings
* Added `Space: Update` Action
* Added `Space: Get Members` Action
* Added `Space: Get Member` Action
* Added `Space: Get Membership` Action
* Added `Space: Add Member` Action with role selection
* Added `Space: End Membership` Action
* Added `Space: Update Membership V2` Action
* Added `Space: Get Apps` Action
* Added `Org: Get Organization` Action
* Added `Org: Get by URL` Action
* Added `Org: Get All Spaces` Action
* Added `Search: Global` Action
* Added `Search: Organization` Action
* Added `Search: Space` Action
* Added `Search: App` Action
* Added `Comment: Get` Action
* Added `Comment: Get Revision` Action
* Added `Comment: Get by Object` Action
* Added `Comment: Add` Action with silent mode
* Added `Comment: Update` Action with silent mode
* Added `Comment: Delete` Action
* Added `File: Get` Action
* Added `File: Download` Action
* Added `File: Upload from URL` Action
* Added `File: Upload from Base64` Action
* Added `File: Upload V2` Action
* Added `File: Copy` Action
* Added `Files: Get All by App` Action
* Added `Files: Attach File` Action
* Added `Task: Get` Action
* Added `Task: Get Tasks (List)` Action with filtering
* Added `Task: Create` Action with hook and silent mode
* Added `Task: Update` Action
* Added `Task: Delete` Action
* Added `Task: Complete` Action
* Added `Task: Incomplete (Reopen)` Action
* Added `Task: Get Summary` Action
* Added `Task: Assign` Action
* Added `Hooks: Create` Action with event selection
* Added `Hooks: Get` Action
* Added `Hooks: Delete` Action
* Added `Hook: Verify` Action
* Added `View: Get` Action
* Added `View: List All` Action
* Added `Tag: Create` Action
* Added `Tag: Update` Action
* Added `Tag: Remove` Action
* Added `Tag: Get by App` Action
* Added `Tag: Get Top by App` Action
* Added `Tag: Get Items by Tag` Action
* Added `Tag: Search in App` Action
* Added `Tag: Search in Organization` Action
* Added `Tag: Search in Space` Action
* Added `Tag: Get by Space` Action
* Added `Tag: Get by Organization` Action
* Added `Embed: Add` Action
* Added `Credential: Get Tokens` Action
* Added `Credential: Show` Action
* Added `App: Poll for Changes` Trigger
* Added `Item: Poll for Changes` Trigger
* Added `Org: Poll for Changes` Trigger
* Added `Space: Poll for Changes` Trigger
* Added `Hook: Webhook Receiver` Trigger
* Added auto-add missing category options feature for item create and update actions
* Added silent mode support for creation and update endpoints
* Added execute hooks toggle for creation and update endpoints
* Fixed filter-by-view endpoint to use clean payload without unsupported parameters
* Fixed null value handling in item create/update payloads
* Fixed date field type checking to prevent errors on non-date fields
* Deprecated `Space: Update Membership` in favor of V2

### 1.1.0 (June 11, 2025)

* Added `Delete Object By ID` Action
* Added `Lookup Object By ID` Action

### 1.0.0 (June 03, 2025)

* Initial component release
* Added `Make Raw Request` Action
