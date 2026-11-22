---
title: Setting up API login and password
layout: component
description: Setting up Magento 1 API login and password
icon: magento.png
icontext: Magento 1 Component
category: magento1
updatedDate: 2023-04-06
ComponentVersion: 1.3.2
---

## AVA 1.0.0 verified source publication — 2026-10-30

**PUBLISHED conditional #57 metadata authentication, #72 dynamic session integration, #80 bounded enumeration/field parity.** [Exact source](https://github.com/thatapp/connector-magento1/tree/a29252e6229acde3129b82388e4a014c9df940d0) · [Full contract report](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/REPORT.md) · [Packaged intake](https://github.com/thatapp/connector-magento1/blob/a29252e6229acde3129b82388e4a014c9df940d0/INTAKE.json).

Three actions and two full-enumeration triggers use XML-RPC v1. Product upsert resolves SKU, category assignment preserves the optional position, and inventory uses the product stock-data path. Triggers hydrate orders/customers and repeat the current bounded set on each run; their completion snapshots are not incremental change cursors.

Dynamic session IDs must be acknowledged by the host secret-registration capability before business or cleanup requests. Host MR161 runtime `d9dd758ca8ab3580c584d5c602c51ad9d853dc8d` is required. A host without that capability refuses before login. Generic UI metadata authentication remains conditional because a clean-room login POST is recorded unsent.

The published implementation is derived from the explicitly non-vendor-hosted OpenMage archive of Magento1.9.4.5. Broad historical version/edition compatibility and the unnamed31/425/38 field counts are not established. Triggers cap200 records; mutations are nontransactional, do not retry, and may have happened before a cleanup error. Domain/subdirectory/complex-product and ID/SKU limits remain in the report. The historical account-setup screenshots are vendor prerequisites, not implemented account-provisioning actions.

Publisher evidence reports52 offline tests,53 sealed-loader tests and21 canonical worker outcomes per runtime, plus30 independent workers. The packaged intake scans36 files; its final external scan includes the receipt itself. Zero network attempts are reported.

This documentation chat independently checked the published tag/peeled commit and read the accepted packaged intake through GitHub. The counts above are attributed to the publisher/reviewer; this chat did not rerun those connector suites. All four packaged intake gates pass. Source publication is not installation, deployment, UI acceptance or live vendor certification. The historical ComponentVersion and content below do not override this release scope. The single [#62 install table](https://gitlab.com/TECHeGO/thatapp-ai-powered/-/issues/62) carries the current installation prerequisites.

---

## Description

These are the instructions on how to set the API login and API password for Magento 1
installation to be used for [credentials section](index#credentials) of Magento 1 component.

We are going to assume that we have a fresh Magento 1 installation The default setup
for the new installed Magento 1 has no API users nor API roles, which means we
need to configure both. Here are the steps necessary to follow.

## Login to Magento admin panel

![Login to admin panel](img/magento-login.png)

Here we use admin username and password to login into the Magento installation.

## Create API Role

Go to **System** > **WebServices** > **SOAP/XML-RPC - Roles**:

![Navigate to SOAP/XML-RPC - Roles](img/magento-admin-API-Roles1.png)

After when you click you are given an opportunity to **Add New Role**. If you
had already added an API Role then keep reading further.

![Add new role](img/magento-admin-API-Roles2.png)

For a simplicity, we can name this new Role `full` since we are going to give
this role full access. Please type your administrative password to create this role.

![Add new role step 2](img/magento-admin-API-Roles3.png)

When the role is created we can check to see the setup of that role. The _**Role Info**_
is currently displayed here.

![Add new role step 3](img/magento-admin-API-Roles4.png)

Role Resources tab has the necessary setup option that we need to tune. If we
pull-down the menu near the **Resource Access** we can choose between All or Custom.
From here we can do all sorts of customizations but for simplicity, we will choose
**All** and save this role.

![Add new role step 4](img/magento-admin-API-Roles5.png)

The **Role Users** tab is empty by default if you have just created this role.
However, it would contain the users who have this particular role if you have
already done this procedure before.

## Create a new user with this specific role

Go to **System** > **WebServices** > **SOAP/XML-RPC - Users**:

![Navigate to SOAP/XML-RPC -Users](img/magento-admin-web-services.png)

Here we need to add a new user:

![Creating a new user](img/magento-new-user0.png)

Now we need to fill in all the necessary information:

![Filling the user information](img/magento-new-user1.png)

*   **User Name** - give a username which you can remember. This username is going to be used as API Login.
*   **First Name** - Fill in as appropriate.
*   **Last Name** - Same, fill-in as appropriate.
*   **Email** - a valid e-mail address.
*   **Current Admin Password** - give the current Magento installation admin password.
*   **API Key** - type-in a memorable phrase so that you can remember. This is not the same as admin password.
*   **API Key Confirmation** - re-type the same memorable phrase.

Navigate here to the _**User Role**_ tab and make sure that this newly created
user has the appropriate API Role. Since we named our role as `full` and we knew
that it actually means a full access:

![Check the user roles](img/magento-new-user2.png)

After all our efforts, we can come back and add all the necessary
credentials in the **My New Magento Credential** form.

![Magento 1 Credentials](img/credentials.png)

Go [back and input the values](index#credentials) in the correct places as it is shown above.
