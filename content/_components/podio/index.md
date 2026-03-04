---
title: Podio component
layout: component
section: CRM components
description: Podio component is designed to implement the Podio API.
icon: podio.png
icontext: Podio component
category: podio
ComponentVersion: 2.0.0
updatedDate: 2026-03-03
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [App: Poll for Changes](#app-poll-for-changes)
  * [Item: Poll for Changes](#item-poll-for-changes)
  * [Org: Poll for Changes](#org-poll-for-changes)
  * [Space: Poll for Changes](#space-poll-for-changes)
  * [Hook: Webhook Receiver](#hook-webhook-receiver)
* [Actions](#actions)
  * [Credential Actions](#credential-actions)
    * [Credential: Get Tokens](#credential-get-tokens)
    * [Credential: Show](#credential-show)
  * [Item Actions](#item-actions)
    * [Item: Create](#item-create)
    * [Item: Create (Dynamic)](#item-create-dynamic)
    * [Item: Update](#item-update)
    * [Item: Get](#item-get)
    * [Item: Get Value V2](#item-get-value-v2)
    * [Item: Get Field Values V2](#item-get-field-values-v2)
    * [Item: Clone](#item-clone)
    * [Item: Delete](#item-delete)
    * [Item: Get Count](#item-get-count)
    * [Item: Get References](#item-get-references)
    * [Item: Find Referenceable](#item-find-referenceable)
    * [Item: Get References by Field](#item-get-references-by-field)
    * [Item: Get Revision Difference](#item-get-revision-difference)
    * [Items: Filter](#items-filter)
    * [Items: Filter by View](#items-filter-by-view)
    * [Items: Get All by App](#items-get-all-by-app)
  * [App Actions](#app-actions)
    * [App: Get](#app-get)
    * [App: Create](#app-create)
    * [App: Update](#app-update)
    * [App: Activate](#app-activate)
    * [App: Deactivate](#app-deactivate)
    * [App: Delete](#app-delete)
    * [App: Add Field](#app-add-field)
    * [App: Delete Field](#app-delete-field)
    * [App: Update Field](#app-update-field)
    * [App: Get Field](#app-get-field)
    * [App: Get by Labels](#app-get-by-labels)
    * [App: Get by Space URL Label](#app-get-by-space-url-label)
    * [App: Get Apps by Space](#app-get-apps-by-space)
    * [App: Get Dependencies](#app-get-dependencies)
    * [App: Get Inverse Dependencies](#app-get-inverse-dependencies)
    * [App: Get Space App Dependencies](#app-get-space-app-dependencies)
    * [App: Get Features](#app-get-features)
    * [App: Get All Apps](#app-get-all-apps)
    * [App: Install from Share](#app-install-from-share)
  * [Space Actions](#space-actions)
    * [Space: Get](#space-get)
    * [Space: Create](#space-create)
    * [Space: Update](#space-update)
    * [Space: Get Members](#space-get-members)
    * [Space: Get Member](#space-get-member)
    * [Space: Get Membership](#space-get-membership)
    * [Space: Add Member](#space-add-member)
    * [Space: End Membership](#space-end-membership)
    * [Space: Update Membership V2](#space-update-membership-v2)
    * [Space: Get Apps](#space-get-apps)
  * [Organization Actions](#organization-actions)
    * [Org: Get Organization](#org-get-organization)
    * [Org: Get by URL](#org-get-by-url)
    * [Org: Get All Spaces](#org-get-all-spaces)
  * [Search Actions](#search-actions)
    * [Search: Global](#search-global)
    * [Search: Organization](#search-organization)
    * [Search: Space](#search-space)
    * [Search: App](#search-app)
  * [Comment Actions](#comment-actions)
    * [Comment: Get](#comment-get)
    * [Comment: Get Revision](#comment-get-revision)
    * [Comment: Get by Object](#comment-get-by-object)
    * [Comment: Add](#comment-add)
    * [Comment: Update](#comment-update)
    * [Comment: Delete](#comment-delete)
  * [File Actions](#file-actions)
    * [File: Get](#file-get)
    * [File: Download](#file-download)
    * [File: Upload from URL](#file-upload-from-url)
    * [File: Upload from Base64](#file-upload-from-base64)
    * [File: Upload V2](#file-upload-v2)
    * [File: Copy](#file-copy)
    * [Files: Get All by App](#files-get-all-by-app)
    * [Files: Attach File](#files-attach-file)
  * [Task Actions](#task-actions)
    * [Task: Get](#task-get)
    * [Task: Get Tasks (List)](#task-get-tasks-list)
    * [Task: Create](#task-create)
    * [Task: Update](#task-update)
    * [Task: Delete](#task-delete)
    * [Task: Complete](#task-complete)
    * [Task: Incomplete (Reopen)](#task-incomplete-reopen)
    * [Task: Get Summary](#task-get-summary)
    * [Task: Assign](#task-assign)
  * [Hook Actions](#hook-actions)
    * [Hooks: Create](#hooks-create)
    * [Hooks: Get](#hooks-get)
    * [Hooks: Delete](#hooks-delete)
    * [Hook: Verify](#hook-verify)
  * [View Actions](#view-actions)
    * [View: Get](#view-get)
    * [View: List All](#view-list-all)
  * [Tag Actions](#tag-actions)
    * [Tag: Create](#tag-create)
    * [Tag: Update](#tag-update)
    * [Tag: Remove](#tag-remove)
    * [Tag: Get by App](#tag-get-by-app)
    * [Tag: Get Top by App](#tag-get-top-by-app)
    * [Tag: Get Items by Tag](#tag-get-items-by-tag)
    * [Tag: Search in App](#tag-search-in-app)
    * [Tag: Search in Organization](#tag-search-in-organization)
    * [Tag: Search in Space](#tag-search-in-space)
    * [Tag: Get by Space](#tag-get-by-space)
    * [Tag: Get by Organization](#tag-get-by-organization)
  * [Embed Actions](#embed-actions)
    * [Embed: Add](#embed-add)
* [Deprecated Actions](#deprecated-actions)
  * [Space: Update Membership (Deprecated)](#space-update-membership-deprecated)

## Description

Podio component is designed to implement the following API:
- [Podio API](https://developers.podio.com/)

The component provides comprehensive coverage of Podio's REST API including items, apps, spaces, organizations, tasks, comments, files, tags, hooks, views, embeds, and search functionality.

## Credentials

Podio component uses the OAuth 2.0 authentication protocol.

Before building any integration flow you must first configure the app:
1. In your Podio account go to `My Account` - `Account Settings` - `API keys`
2. Under the `API Key Generator` section input:
- **Application name (displayed in stream byline)**: The name of your app.
- **Full domain (without protocol) of your return URL (e.g. mypodioapp.com)**: The URL of the tenant on the integration platform you are using. E.g. {your-tenant-address}. You don't have to specify the full callback URL like the most of the components require (`https://{your-tenant-address}/callback/oauth2`). You only need the domain, without `https://` and without `/callback/oauth2`.
- Click `Generate API key`. This will give you Client ID and Client Secret.

Now you can create new credentials for the component on the platform:
* **Type** (dropdown, required) - `OAuth2`
* **Choose Auth Client** (dropdown, required) - select one of created before or `Add New Auth Client`:
  * **Name** (string, required) - provide any name you want
  * **Client ID** (string, required) - put here `Client ID` from the Podio credentials
  * **Client Secret** (string, required) - put here `Client Secret` from the Podio credentials
  * **Authorization Endpoint** (string, required) - Podio authorization endpoint `https://podio.com/oauth/authorize`
  * **Token Endpoint** (string, required) - Podio refresh token endpoint `https://podio.com/oauth/token`
* **Name Your Credential** (string, required) - provide any name you want
* **Scopes (Comma-separated list)** (string, required) - Put here scopes to get access to your Podio account - `https://developers.podio.com/authentication/scopes`. Note that omitting to specify the scope parameter or giving it an empty value is equivalent to requesting access to the Global scope with all permissions or: `global:all`
* **Additional parameters (Comma-separated list)** (string, required) - set it as `access_type:offline,prompt:consent` to make component works properly
* **Number of retries** (number, optional, 5 by default) - How many times component should retry to make request
* **Delay between retries** (number ms, optional, 10000 by default) - How much time wait until new try

## Triggers

### App: Poll for Changes

Polls Podio for new or updated applications.

#### Input Metadata

- **app_id** - (number, required): The ID of the application to poll.

#### Output Metadata

Returns application data when changes are detected.

### Item: Poll for Changes

Polls Podio for new or updated items in an application.

#### Input Metadata

- **item_id** - (number, required): The ID of the item to poll.

#### Output Metadata

Returns item data when changes are detected.

### Org: Poll for Changes

Polls Podio for organization changes.

#### Input Metadata

- **org_id** - (number, required): The ID of the organization to poll.

#### Output Metadata

Returns organization data when changes are detected.

### Space: Poll for Changes

Polls Podio for new or updated spaces.

#### Input Metadata

- **space_id** - (number, required): The ID of the space to poll.

#### Output Metadata

Returns space data when changes are detected.

### Hook: Webhook Receiver

Receives and processes incoming webhook notifications from Podio.

#### Input Metadata

- **hook_id** - (number, required): The ID of the hook to verify.
- **code** - (string, required): The verification code sent by Podio.

#### Output Metadata

Returns the webhook payload when a notification is received.

## Actions

### Credential Actions

#### Credential: Get Tokens

Retrieves the current OAuth tokens for debugging or external use.

##### Configuration Fields

- **Trigger Value** - (string, required): Enter any value to trigger token retrieval.

##### Output Metadata

Returns the current OAuth configuration including access and refresh tokens.

#### Credential: Show

Displays current credential information for debugging purposes.

##### Output Metadata

Returns the credential configuration object.

### Item Actions

#### Item: Create

Creates a new item in a Podio application using a schema-based field mapper. The app_id is configured statically in the configuration fields, and input metadata is dynamically generated from the app's field schema.

##### Configuration Fields

- **Podio Application** - (string, required): The Podio Application ID (`app_id`) to create items in.
- **Execute Hooks** - (checkbox, optional): Execute webhooks and automation flows for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications and activity stream updates (default: false).
- **Auto-Add Missing Category Options** - (checkbox, optional): Automatically add missing category values to the app field configuration before creating the item. When enabled, if the input contains a category value that doesn't exist in the field configuration, the component will add it automatically.

##### Input Metadata

Dynamically generated based on the selected application's field schema. Fields are mapped according to their Podio field types (text, number, category, date, relationship, etc.).

##### Output Metadata

Returns the created item object from Podio including `item_id`, field values, and metadata.

#### Item: Create (Dynamic)

Creates a new item with a dynamic `app_id` and raw JSON payload. No schema lookup is performed — this is an advanced mode for routing items to any app at runtime.

##### Configuration Fields

- **Execute Hooks** - (checkbox, optional): Execute webhooks and automation flows for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications and activity stream updates (default: false).
- **Auto-Add Missing Category Options** - (checkbox, optional): Automatically add missing category values to the app field configuration before creating the item.

##### Input Metadata

- **app_id** - (number, required): The Podio Application ID to create the item in.
- **fields** - (object, required): The field values to set on the new item, structured as a Podio fields object.
- **file_ids** - (array, optional): Array of file IDs to attach to the item.
- **tags** - (array, optional): Array of tags to apply to the item.
- **reminder** - (object, optional): Reminder settings for the item.
- **recurrence** - (object, optional): Recurrence settings for the item.
- **linked_account_id** - (number, optional): Linked account ID.
- **ref** - (object, optional): Reference object containing `type` and `id`.

##### Output Metadata

Returns the created item object from Podio.

#### Item: Update

Updates an existing item using a schema-based field mapper. The app_id is configured statically, and input metadata is dynamically generated.

##### Configuration Fields

- **Podio Application** - (string, required): The Podio Application ID.
- **Execute Hooks** - (checkbox, optional): Execute webhooks and automation flows for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications and activity stream updates (default: false).
- **Auto-Add Missing Category Options** - (checkbox, optional): Automatically add missing category values to the app field configuration before updating the item.

##### Input Metadata

Dynamically generated based on the selected application's field schema plus:

- **item_id** - (number, required): The ID of the item to update.

##### Output Metadata

Returns the updated item object from Podio.

#### Item: Get

Retrieves a single item by ID with all field values.

##### Input Metadata

- **item_id** - (number, required): The ID of the item to retrieve.

##### Output Metadata

Returns the complete item object including all field values, metadata, comments, and files.

#### Item: Get Value V2

Retrieves item field values in V2 format, which provides a simplified structure compared to the standard item response.

##### Input Metadata

- **item_id** - (number, required): The ID of the item to retrieve.

##### Output Metadata

Returns the item with field values in the simplified V2 format.

#### Item: Get Field Values V2

Retrieves values for a specific field on an item in the V2 format.

##### Input Metadata

- **item_id** - (number, required): The ID of the item.
- **field_id** - (number, required): The ID of the field to retrieve values for.

##### Output Metadata

Returns the field values in V2 format.

#### Item: Clone

Creates a copy of an existing item.

##### Input Metadata

- **item_id** - (number, required): The ID of the item to clone.
- **silent** - (boolean, optional): Suppress notifications (default: false).

##### Output Metadata

Returns the cloned item object with the new `item_id`.

#### Item: Delete

Permanently deletes an item from Podio.

##### Input Metadata

- **item_id** - (number, required): The ID of the item to delete.
- **silent** - (boolean, optional): Suppress notifications (default: false).
- **hook** - (boolean, optional): Execute webhooks (default: true).

##### Output Metadata

Returns confirmation of the deletion.

#### Item: Get Count

Gets the total number of items in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns the total item count for the application.

#### Item: Get References

Gets all items that reference the specified item.

##### Input Metadata

- **item_id** - (number, required): The ID of the item to find references for.

##### Output Metadata

Returns an array of items that reference the specified item.

#### Item: Find Referenceable

Searches for items that can be referenced by a specific field. Useful for finding valid relationship targets.

##### Input Metadata

- **field_id** - (number, required): The field ID of the relationship field.
- **limit** - (number, optional): Maximum number of results to return.
- **offset** - (number, optional): Number of results to skip.
- **sort** - (string, optional): Sort order for results.
- **text** - (string, optional): Search text to filter results.

##### Output Metadata

Returns an array of items that can be referenced by the specified field.

#### Item: Get References by Field

Gets items that reference the specified item through a specific relationship field.

##### Input Metadata

- **item_id** - (number, required): The ID of the item.
- **field_id** - (number, required): The ID of the relationship field.

##### Output Metadata

Returns an array of items referencing this item through the specified field.

#### Item: Get Revision Difference

Compares two revisions of an item to see what changed between them.

##### Input Metadata

- **item_id** - (number, required): The ID of the item.
- **revision_from** - (number, required): The starting revision number.
- **revision_to** - (number, required): The ending revision number.

##### Output Metadata

Returns the differences between the two revisions including changed fields and their before/after values.

#### Items: Filter

Filters items in an application using custom filter criteria with auto-pagination. Automatically retrieves all matching items across multiple API calls.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to filter items in.
- **sort_by** - (string, optional): Field ID or attribute to sort results by.
- **sort_desc** - (boolean, optional): Sort in descending order (default: false).
- **filters** - (object, optional): Filter criteria object. See [Podio API filter documentation](https://developers.podio.com/doc/items/filter-items-4496747) for filter format.
- **limit** - (number, optional): Number of items per batch (default: 15).
- **offset** - (number, optional): Starting offset for pagination.

##### Output Metadata

Returns all matching items as an array. Items are automatically paginated and collected until all results are retrieved.

#### Items: Filter by View

Filters items using a saved view's criteria. The view itself contains the filters, so no filter parameters need to be provided.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **view_id** - (number, required): The ID of the saved view to use for filtering.
- **sort_by** - (string, optional): Field to sort results by.
- **sort_desc** - (boolean, optional): Sort in descending order (default: false).
- **limit** - (number, optional): Number of items per batch (default: 15).

##### Output Metadata

Returns all items matching the view's filter criteria. Results are automatically paginated.

#### Items: Get All by App

Retrieves all items in an application with auto-pagination. Optionally filter by a saved view.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **view_id** - (number, optional): Optional view ID to filter results.
- **sort_by** - (string, optional): Field to sort results by.
- **sort_desc** - (boolean, optional): Sort in descending order (default: false).
- **filters** - (object, optional): Filter criteria object (only used when no view_id is specified).
- **limit** - (number, optional): Number of items per batch (default: 15).
- **offset** - (number, optional): Starting offset for pagination.

##### Output Metadata

Returns all items in the application as an array.

### App Actions

#### App: Get

Retrieves detailed information about an application including its configuration and field definitions.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to retrieve.

##### Output Metadata

Returns the complete application object including fields, configuration, and settings.

#### App: Create

Creates a new application in a Podio space.

##### Configuration Fields

- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **space_id** - (number, required): The ID of the space to create the app in.
- **config** - (object, required): Application configuration object containing:
  - **name** - (string, required): The name of the app.
  - **item_name** - (string, required): The singular name for items in the app.
  - **description** - (string, optional): Description of the app.
  - **icon** - (string, optional): Icon identifier.
  - **icon_color** - (string, optional): Icon color.
- **fields** - (array, required): Array of field definition objects.

##### Output Metadata

Returns the created application object with `app_id`.

#### App: Update

Updates any aspect of an application including name, description, and settings.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to update.
- **config** - (object, required): Updated configuration object.

##### Output Metadata

Returns confirmation of the update.

#### App: Activate

Re-activates a previously deactivated application, making it visible and usable again.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to activate.

##### Output Metadata

Returns confirmation of the activation.

#### App: Deactivate

Deactivates an application, hiding it from the workspace without deleting it or its data.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to deactivate.

##### Output Metadata

Returns confirmation of the deactivation.

#### App: Delete

Permanently deletes an application and all its items. This action cannot be undone.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to delete.

##### Output Metadata

Returns confirmation of the deletion.

#### App: Add Field

Adds a new field to an existing application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **type** - (string, required): The field type (e.g., `text`, `number`, `category`, `date`, `app`, `contact`, `money`, `progress`, `calculation`, `embed`, `image`, `duration`, `question`).
- **config** - (object, required): Field configuration including label, description, settings, and type-specific options.

##### Output Metadata

Returns the created field object with `field_id`.

#### App: Delete Field

Permanently deletes a field from an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **field_id** - (number, required): The ID of the field to delete.

##### Output Metadata

Returns confirmation of the field deletion.

#### App: Update Field

Updates the configuration of an existing field in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **field_id** - (number, required): The ID of the field to update.
- **config** - (object, required): Updated field configuration.

##### Output Metadata

Returns the updated field object.

#### App: Get Field

Retrieves configuration details for a specific field in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **field_id** - (number, required): The ID of the field.

##### Output Metadata

Returns the complete field configuration object.

#### App: Get by Labels

Retrieves an application by its organization, space, and app URL labels (slugs).

##### Input Metadata

- **org_slug** - (string, required): The organization URL label.
- **space_slug** - (string, required): The space URL label.
- **app_slug** - (string, required): The app URL label.

##### Output Metadata

Returns the application object matching the provided labels.

#### App: Get by Space URL Label

Retrieves an application using the space ID and app URL label.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **app_slug** - (string, required): The app URL label.

##### Output Metadata

Returns the application object matching the space and label.

#### App: Get Apps by Space

Lists all applications in a specific space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.

##### Output Metadata

Returns an array of all applications in the space.

#### App: Get Dependencies

Gets applications that this app depends on (i.e., apps that this app has relationship fields pointing to).

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns an object containing the dependency tree.

#### App: Get Inverse Dependencies

Gets applications that depend on this app (i.e., apps that have relationship fields pointing to this app).

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns an array of applications that reference this app.

#### App: Get Space App Dependencies

Gets all application dependencies within a space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.

##### Output Metadata

Returns the complete dependency graph for all apps in the space.

#### App: Get Features

Gets available features (filters, sortings) for an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns available features including filter and sort options.

#### App: Get All Apps

Retrieves all applications accessible to the authenticated user.

##### Input Metadata

None required. Returns all accessible apps.

##### Output Metadata

Returns an array of all accessible applications.

#### App: Install from Share

Installs an application from the Podio App Market (or a shared app link) into a space.

##### Input Metadata

- **app_id** - (number, required): The ID of the shared app to install.
- **space_id** - (number, required): The ID of the space to install into.

##### Output Metadata

Returns the newly installed application object.

### Space Actions

#### Space: Get

Retrieves details for a specific workspace.

##### Input Metadata

- **space_id** - (number, required): The ID of the space to retrieve.

##### Output Metadata

Returns the complete space object including settings and metadata.

#### Space: Create

Creates a new workspace in a Podio organization.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization to create the space in.
- **Space Privacy** - (dropdown, required): Select privacy level — `Open` (visible to all organization members) or `Closed` (invite only).
- **Auto Join** - (checkbox, optional): Automatically add new organization employees to this space.
- **Announce New Apps** - (checkbox, optional): Post a status update when new apps are created in this space.
- **Announce New Members** - (checkbox, optional): Post a status update when new members join this space.

##### Input Metadata

Dynamically generated. Typically includes:

- **name** - (string, required): The name of the space.

##### Output Metadata

Returns the created space object with `space_id`.

#### Space: Update

Updates workspace settings and configuration.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization.
- **Space Privacy** - (dropdown, required): Select privacy level.
- **Auto Join** - (checkbox, optional): Automatically add new organization employees.
- **Announce New Apps** - (checkbox, optional): Post status updates for new apps.
- **Announce New Members** - (checkbox, optional): Post status updates for new members.

##### Input Metadata

Dynamically generated. Includes space settings to update.

##### Output Metadata

Returns confirmation of the update.

#### Space: Get Members

Lists all members of a space with their roles.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization.
- **Podio Space** - (dropdown, required): Select the space.

##### Output Metadata

Returns an array of space members with their roles and profile information.

#### Space: Get Member

Retrieves details for a specific member in a space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **user_id** - (number, required): The ID of the user.

##### Output Metadata

Returns the member's details including role and profile.

#### Space: Get Membership

Retrieves membership details for a user in a space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **user_id** - (number, required): The ID of the user.

##### Output Metadata

Returns the membership object with role and permissions.

#### Space: Add Member

Adds one or more users to a workspace.

##### Configuration Fields

- **Member Role** - (dropdown, required): Select the permission level — `Admin` (full access), `Regular` (standard access), `Light` (limited access), or `Grant Only` (invite others only).
- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **message** - (string, optional): Welcome message to send to new members.
- **users** - (array, optional): Array of user IDs to add.
- **profiles** - (array, optional): Array of profile IDs to add.
- **mails** - (array, optional): Array of email addresses to invite.
- **context_ref_type** - (string, optional): Context reference type.
- **context_ref_id** - (string, optional): Context reference ID.
- **invite_context** - (string, optional): Invitation context.

##### Output Metadata

Returns confirmation of the membership additions.

#### Space: End Membership

Removes a user from a workspace.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **user_id** - (number, required): The ID of the user to remove.

##### Output Metadata

Returns confirmation of the membership removal.

#### Space: Update Membership V2

Updates a user's role in a space. This is the current recommended version.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **user_id** - (number, required): The ID of the user.
- **role** - (string, required): The new role for the user (`admin`, `regular`, `light`).

##### Output Metadata

Returns confirmation of the role update.

#### Space: Get Apps

Lists all applications in a selected space.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization.
- **Podio Space** - (dropdown, required): Select the space.

##### Output Metadata

Returns an array of applications in the selected space.

### Organization Actions

#### Org: Get Organization

Retrieves details for a specific organization.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization.

##### Output Metadata

Returns the complete organization object.

#### Org: Get by URL

Retrieves organization details using its URL slug.

##### Input Metadata

- **url** - (string, required): The organization URL label/slug.

##### Output Metadata

Returns the organization object matching the URL.

#### Org: Get All Spaces

Lists all spaces in an organization.

##### Input Metadata

- **org_id** - (number, required): The ID of the organization.

##### Output Metadata

Returns an array of all spaces in the organization.

### Search Actions

#### Search: Global

Searches across all Podio content including items, tasks, files, conversations, and profiles.

##### Configuration Fields

- **Search Query** - (string, required): The text to search for across Podio.
- **Content Type** - (dropdown, optional): Filter results to a specific type — `Items`, `Tasks`, `Files`, `Conversations`, `Profiles`, or `Apps`.
- **Include Counts** - (checkbox, optional): Include the total count of matching results.
- **Include Highlights** - (checkbox, optional): Include text snippets showing where matches were found.
- **Limit** - (string, optional): Maximum number of results to return (default: 20).
- **Offset** - (string, optional): Number of results to skip for pagination.

##### Output Metadata

Returns an array of search results matching the query.

#### Search: Organization

Searches for content within a specific organization.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization to search in.

##### Input Metadata

Dynamically generated. Includes search query and filter parameters.

##### Output Metadata

Returns search results scoped to the selected organization.

#### Search: Space

Searches for content within a specific space.

##### Configuration Fields

- **Podio Organisation** - (dropdown, required): Select the organization.
- **Podio Space** - (dropdown, required): Select the space to search in.

##### Input Metadata

Dynamically generated. Includes search query and filter parameters.

##### Output Metadata

Returns search results scoped to the selected space.

#### Search: App

Searches for items within a specific application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application to search in.
- **query** - (string, required): The search text.
- **limit** - (number, optional): Maximum number of results.
- **offset** - (number, optional): Number of results to skip.
- **ref_type** - (string, optional): Reference type filter.
- **counts** - (boolean, optional): Include result counts.
- **highlights** - (boolean, optional): Include text highlights.

##### Output Metadata

Returns search results scoped to the specified application.

### Comment Actions

#### Comment: Get

Retrieves a specific comment by ID.

##### Input Metadata

- **comment_id** - (number, required): The ID of the comment to retrieve.

##### Output Metadata

Returns the complete comment object.

#### Comment: Get Revision

Retrieves a specific revision of a comment, showing its content at a point in time.

##### Input Metadata

- **comment_id** - (number, required): The ID of the comment.

##### Output Metadata

Returns the comment revision object.

#### Comment: Get by Object

Retrieves all comments on a specific object (item, task, etc.).

##### Input Metadata

- **type** - (string, required): The type of object (`item`, `task`, `status`, etc.).
- **id** - (number, required): The ID of the object.

##### Output Metadata

Returns an array of all comments on the specified object.

#### Comment: Add

Adds a comment to an item, task, or other Podio object.

##### Configuration Fields

- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **type** - (string, required): The type of object to comment on (`item`, `status`, etc.).
- **id** - (number, required): The ID of the object.
- **value** - (string, required): The comment text.
- **external_id** - (string, optional): External identifier for the comment.
- **file_ids** - (array, optional): Array of file IDs to attach to the comment.
- **embed_url** - (string, optional): URL to embed in the comment.

##### Output Metadata

Returns the created comment object with `comment_id`.

#### Comment: Update

Updates an existing comment.

##### Configuration Fields

- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **comment_id** - (number, required): The ID of the comment to update.
- **value** - (string, required): The updated comment text.
- **external_id** - (string, optional): External identifier.
- **file_ids** - (array, optional): Array of file IDs.
- **embed_url** - (string, optional): URL to embed.

##### Output Metadata

Returns the updated comment object.

#### Comment: Delete

Deletes a comment.

##### Input Metadata

- **comment_id** - (number, required): The ID of the comment to delete.

##### Output Metadata

Returns confirmation of the deletion.

### File Actions

#### File: Get

Retrieves file metadata by ID.

##### Input Metadata

- **file_id** - (number, required): The ID of the file.

##### Output Metadata

Returns the file metadata object including name, size, mimetype, and links.

#### File: Download

Gets the actual file content (binary data or download URL).

##### Input Metadata

- **file_id** - (number, required): The ID of the file to download.

##### Output Metadata

Returns the file content or a download URL.

#### File: Upload from URL

Uploads a file to Podio by providing a URL. Podio will fetch the file from the URL.

##### Input Metadata

- **url** - (string, required): The URL of the file to upload.
- **filename** - (string, required): The desired filename in Podio.

##### Output Metadata

Returns the uploaded file object with `file_id`.

#### File: Upload from Base64

Uploads a file to Podio from Base64-encoded data.

##### Input Metadata

- **filename** - (string, required): The desired filename.
- **data** - (string, required): The Base64-encoded file content.

##### Output Metadata

Returns the uploaded file object with `file_id`.

#### File: Upload V2

Legacy file upload action.

##### Input Metadata

- **filename** - (string, required): The desired filename.
- **source** - (string, required): The file source URL or path.

##### Output Metadata

Returns the uploaded file object with `file_id`.

#### File: Copy

Creates a copy of an existing file in Podio.

##### Input Metadata

- **file_id** - (number, required): The ID of the file to copy.

##### Output Metadata

Returns the new file object with a new `file_id`.

#### Files: Get All by App

Retrieves all files attached to items in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns an array of all files in the application.

#### Files: Attach File

Attaches an uploaded file to a Podio object (item, task, status update, comment, or space).

##### Configuration Fields

- **Object Type** - (dropdown, required): The type of object to attach the file to — `Item`, `Task`, `Status Update`, `Comment`, or `Space`.

##### Input Metadata

- **file_id** - (number, required): The ID of the file to attach.
- **ref_id** - (number, required): The ID of the object to attach the file to.

##### Output Metadata

Returns confirmation of the file attachment.

### Task Actions

#### Task: Get

Retrieves a single task by ID.

##### Input Metadata

- **task_id** - (number, required): The ID of the task.

##### Output Metadata

Returns the complete task object.

#### Task: Get Tasks (List)

Gets all tasks with powerful filtering options.

##### Input Metadata

- **completed** - (boolean, optional): Filter by completion status.
- **responsible** - (number, optional): Filter by responsible user ID.
- **created_by** - (number, optional): Filter by creator user ID.
- **app** - (number, optional): Filter by application ID.
- **space** - (number, optional): Filter by space ID.
- **org** - (number, optional): Filter by organization ID.
- **grouping** - (string, optional): Group results (`due_date`, `created_by`, `responsible`, `app`, `space`, `org`).
- **sort_by** - (string, optional): Sort field.
- **sort_desc** - (boolean, optional): Sort descending.
- **limit** - (number, optional): Maximum number of results.
- **offset** - (number, optional): Number of results to skip.
- **reference** - (string, optional): Filter by reference.

##### Output Metadata

Returns an array of tasks matching the filter criteria.

#### Task: Create

Creates a new task, optionally linked to a Podio object.

##### Configuration Fields

- **Execute Hooks** - (checkbox, optional): Execute hooks for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **text** - (string, required): The task description.
- **description** - (string, optional): Detailed task description.
- **private** - (boolean, optional): Whether the task is private.
- **due_date** - (string, optional): Due date in `YYYY-MM-DD` format.
- **due_time** - (string, optional): Due time in `HH:mm` format.
- **responsible** - (number, optional): User ID of the responsible person.
- **ref_type** - (string, optional): Reference type (e.g., `item`, `app`).
- **ref_id** - (number, optional): Reference object ID.
- **labels** - (array, optional): Array of label IDs.
- **external_id** - (string, optional): External identifier.
- **file_ids** - (array, optional): Array of file IDs to attach.
- **reminder** - (object, optional): Reminder settings.
- **recurrence** - (object, optional): Recurrence settings.

##### Output Metadata

Returns the created task object with `task_id`.

#### Task: Update

Updates any aspect of an existing task.

##### Configuration Fields

- **Execute Hooks** - (checkbox, optional): Execute hooks for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **task_id** - (number, required): The ID of the task to update.
- **text** - (string, optional): Updated task description.
- **description** - (string, optional): Updated detailed description.
- **private** - (boolean, optional): Whether the task is private.
- **due_date** - (string, optional): Updated due date.
- **due_time** - (string, optional): Updated due time.
- **responsible** - (number, optional): Updated responsible user ID.
- **labels** - (array, optional): Updated label IDs.
- **external_id** - (string, optional): Updated external identifier.
- **file_ids** - (array, optional): Updated file IDs.
- **reminder** - (object, optional): Updated reminder settings.
- **recurrence** - (object, optional): Updated recurrence settings.

##### Output Metadata

Returns the updated task object.

#### Task: Delete

Permanently deletes a task.

##### Input Metadata

- **task_id** - (number, required): The ID of the task to delete.

##### Output Metadata

Returns confirmation of the deletion.

#### Task: Complete

Marks a task as completed.

##### Configuration Fields

- **Execute Hooks** - (checkbox, optional): Execute hooks for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **task_id** - (number, required): The ID of the task to complete.

##### Output Metadata

Returns confirmation of the task completion.

#### Task: Incomplete (Reopen)

Reopens a previously completed task, marking it as incomplete.

##### Configuration Fields

- **Execute Hooks** - (checkbox, optional): Execute hooks for this change (default: true).
- **Silent Mode** - (checkbox, optional): Suppress notifications (default: false).

##### Input Metadata

- **task_id** - (number, required): The ID of the task to reopen.

##### Output Metadata

Returns confirmation that the task has been reopened.

#### Task: Get Summary

Gets a summary of tasks grouped by status (overdue, today, upcoming, etc.).

##### Input Metadata

- **limit** - (number, optional): Maximum number of tasks per group.

##### Output Metadata

Returns a summary object with tasks grouped by their due date status.

#### Task: Assign

Assigns a task to another user.

##### Input Metadata

- **task_id** - (number, required): The ID of the task to assign.
- **responsible** - (number, required): The user ID to assign the task to.

##### Output Metadata

Returns confirmation of the assignment.

### Hook Actions

#### Hooks: Create

Creates a webhook to receive notifications when objects change in Podio.

##### Configuration Fields

- **Hook Type** - (dropdown, required): The type of object to attach the webhook to — `Space`, `App`, or `Field`.
- **Events** - (multi-select, required): Select the events that will trigger the webhook.

##### Input Metadata

- **ref_id** - (number, required): The ID of the object to hook.
- **url** - (string, required): The URL to receive webhook notifications.

##### Output Metadata

Returns the created hook object with `hook_id`.

#### Hooks: Get

Retrieves all webhooks configured for an object.

##### Input Metadata

- **ref_id** - (number, required): The ID of the object.
- **ref_type** - (string, required): The type of object (`app`, `space`, `field`).

##### Output Metadata

Returns an array of webhooks configured for the object.

#### Hooks: Delete

Removes a webhook.

##### Input Metadata

- **hook_id** - (number, required): The ID of the webhook to delete.

##### Output Metadata

Returns confirmation of the webhook deletion.

#### Hook: Verify

Manually verifies a webhook. Useful after creation when the automatic verification was missed.

##### Input Metadata

- **hook_id** - (number, required): The ID of the hook to verify.
- **code** - (string, required): The verification code sent by Podio.

##### Output Metadata

Returns confirmation of the verification.

### View Actions

#### View: Get

Retrieves a saved view's configuration including its filters, sorting, and grouping.

##### Input Metadata

- **view_id** - (number, required): The ID of the view.

##### Output Metadata

Returns the complete view configuration object.

#### View: List All

Lists all saved views in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns an array of all views defined for the application.

### Tag Actions

#### Tag: Create

Adds one or more tags to a Podio object.

##### Input Metadata

- **ref_type** - (string, required): The type of object (`item`, `task`, `status`, etc.).
- **ref_id** - (number, required): The ID of the object.
- **tags** - (array, required): Array of tag strings to add.

##### Output Metadata

Returns confirmation of the tags being added.

#### Tag: Update

Replaces all tags on a Podio object with a new set of tags.

##### Input Metadata

- **ref_type** - (string, required): The type of object.
- **ref_id** - (number, required): The ID of the object.
- **tags** - (array, required): Array of tag strings (replaces all existing tags).

##### Output Metadata

Returns confirmation of the tag update.

#### Tag: Remove

Removes a specific tag from an object.

##### Input Metadata

- **ref_type** - (string, required): The type of object.
- **ref_id** - (number, required): The ID of the object.
- **tag** - (string, required): The tag to remove.

##### Output Metadata

Returns confirmation of the tag removal.

#### Tag: Get by App

Lists all tags used across items in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.

##### Output Metadata

Returns an array of tags with usage counts.

#### Tag: Get Top by App

Lists the most frequently used tags in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **limit** - (number, optional): Maximum number of tags to return.

##### Output Metadata

Returns an array of the most used tags with counts.

#### Tag: Get Items by Tag

Finds items with a specific tag in an application within a space.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **tag** - (string, required): The tag to search for.
- **space_id** - (number, required): The ID of the space.

##### Output Metadata

Returns an array of items matching the specified tag.

#### Tag: Search in App

Finds objects with a specific tag in an application.

##### Input Metadata

- **app_id** - (number, required): The ID of the application.
- **tag** - (string, required): The tag to search for.

##### Output Metadata

Returns an array of objects matching the tag within the app.

#### Tag: Search in Organization

Finds objects with a specific tag across an organization.

##### Input Metadata

- **org_id** - (number, required): The ID of the organization.
- **tag** - (string, required): The tag to search for.

##### Output Metadata

Returns an array of objects matching the tag within the organization.

#### Tag: Search in Space

Finds objects with a specific tag in a space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **tag** - (string, required): The tag to search for.

##### Output Metadata

Returns an array of objects matching the tag within the space.

#### Tag: Get by Space

Lists all tags used in a space.

##### Input Metadata

- **space_id** - (number, required): The ID of the space.

##### Output Metadata

Returns an array of tags used in the space with counts.

#### Tag: Get by Organization

Lists all tags used in an organization.

##### Input Metadata

- **org_id** - (number, required): The ID of the organization.

##### Output Metadata

Returns an array of tags used in the organization with counts.

### Embed Actions

#### Embed: Add

Fetches metadata for a URL (title, description, thumbnail) to create an embed object in Podio.

##### Input Metadata

- **url** - (string, required): The URL to fetch metadata for.

##### Output Metadata

Returns the embed object including title, description, URL, and thumbnail information.

## Deprecated Actions

### Space: Update Membership (Deprecated)

**This action is deprecated.** Please use [Space: Update Membership V2](#space-update-membership-v2) instead.

Updates a user's role in a space.

#### Input Metadata

- **space_id** - (number, required): The ID of the space.
- **user_id** - (number, required): The ID of the user.
- **role** - (string, required): The new role.

#### Output Metadata

Returns confirmation of the role update.
