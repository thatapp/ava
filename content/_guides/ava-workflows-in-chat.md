---
title: Build an AVA workflow from ChatGPT or Claude
description: Connect your AVA account, choose a workspace, test a draft, and follow a run in Hoist.
layout: article
section: Building integration flows
category: building integration flows
order: 7
---

Use AVA from a chat to save a workflow in your workspace. You can inspect the draft in Hoist, change its mapping, test a sample and choose when it starts receiving events.

**Pilot availability.** Your AVA sign-in must offer workflow permissions. If the permission screen offers only TurnStyle memory, stop at that screen and ask your AVA administrator whether workflow access is enabled. The customer endpoint is `https://mcp.thatapp.io/api/mcp`. [Open Hoist](https://hoist.thatapp.io)

## Connect your chat account

### ChatGPT

1. Open ChatGPT on the web in the workspace you will use. OpenAI supports custom MCP connections with write actions on Business, Enterprise and Edu. A Business admin or owner creates the connection. Enterprise and Edu can also authorize a developer to create and privately test one. Workspace publication requires an admin or owner.
2. Open **Plugins**, select **+**, then **Add custom MCP server**. Name it **AVA**, enter the customer endpoint above and select **OAuth**. Review the server warning, create the plugin and inspect its available actions. For a workspace using legacy app management, the corresponding setup is under **Settings → Apps → Create**.
3. Install the private plugin, start a new conversation and select **@AVA**. Review each write confirmation ChatGPT shows. If an expected action is missing after a release, ask the workspace admin to refresh the tool list and enable the action for your group. [OpenAI setup and permissions](https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt)

### Claude

1. For an individual account, open **Customize → Connectors** and add a custom web connector. Claude lists Free, Pro, Max, Ultra, Team and Enterprise as supported. Free accounts can add one custom connector. On Team, an owner or primary owner first adds it under **Organization settings → Connectors**. Enterprise can also grant the role permission to manage library access.
2. Name the connector **AVA** and enter the customer endpoint above. Review the detected authentication, choose sign-in and use **Register automatically** when prompted for the OAuth client. AVA supports dynamic client registration. Each member connects with their own AVA account.
3. Enable AVA for the conversation through the chat’s **+ → Connectors** menu. Review the permissions Claude presents for each tool. [Claude remote connector setup](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)

### Choose permissions and workspace

Sign in on AVA’s authorization screen and review the requested permissions. **Read** covers workflows, installed components, connection references and run history. **Draft** permits creating or editing drafts. **Run** permits sample tests, publication, activation, stopping and eligible manual runs. A full authoring session needs all three grants. Your AVA workspace role can further limit the tools you see.

Ask “List my AVA workspaces with their organization and contract.” Choose your test workspace by name and ID. Use the same workspace when opening the draft or retrieving a run in another chat. If a step needs an external service, ask AVA to list connection references for that installed component. Follow the returned **Platform Connectors** link, connect the vendor in the selected workspace, then return to the saved draft and recheck its connection. Enter credentials on the connection form.

AVA’s workflow tools read connection metadata and pass the saved reference to the selected installed-component revision. They do not inspect vendor secrets, certify the connector package or replace that component’s authentication, token refresh, configuration and mapping steps. Complete those steps through the component’s own forms and schemas. A connector remains a versioned installed plugin: if a revision introduces a defect, select the prior working revision in the flow or install a corrected revision. A stale or unavailable platform scanner database is not a reason to block installation.

## Build and test a webhook

Paste this after choosing a test workspace.

> In my selected AVA test workspace, create an inactive workflow named “Quantity check”. Receive a webhook with a numeric quantity. Map it to a field named doubled whose value is twice that quantity. Show me the flow ID, the steps and the saved mapping. Wait for me to approve publication and activation.

1. Open **Flows** in the same workspace on Hoist and find **Quantity check**. Compare the flow ID, trigger and mapping with the chat. Ask for one edit, such as renaming the output to **doubledQuantity**, then read the saved draft again.
2. Ask AVA to test the mapping step with the sample `{"quantity":7}`. Look for `{"doubledQuantity":14}` in the step output. Save the flow ID. A sample verifies the step. A new event verifies the published workflow.
3. When the draft looks right, ask AVA to publish that specific version and start it. Check the published version and active status in Hoist. Save its webhook URL privately. Deliver `{"quantity":7}` from your own test sender. In **Executions**, open the resulting run and check the mapped step output. If the run shows message counts, open the step details, select **Results** and open the individual message to see its output. [Using executions](/guides/executions)
4. Close the authoring chat. While the workflow is active, AVA receives new events and records executions. Open a fresh conversation, select AVA and ask “In workspace [ID], show the latest execution of flow [ID], its status, and the mapped output.” Match the run ID in Hoist. Ask AVA to stop that flow and check its inactive status. Flow versions, connection references and run history belong to the AVA workspace. [Managing flows](/guides/managing-flows)

## If a step is missing or fails

| What you see | What to do |
|---|---|
| Sign-in expired or the host returns 401 | Disconnect AVA in the host’s plugin or connector settings. Reconnect, sign in to AVA and review the grants again. Choose the same workspace, then ask AVA to open your existing flow and show its execution by run ID. |
| AVA asks you to select a workspace | List the available workspaces, choose the intended ID and repeat the request there. |
| A write tool is absent, or the workspace returns 403 | Check the consented grants, your role in that workspace and the host’s action settings. A viewer receives the read tools. Removing membership takes effect on subsequent requests. |
| The connection you expect is missing | Ask AVA to list connections for the installed component in the selected workspace and include the saved draft ID. Check which credential stores were read. If one was unavailable, the list is incomplete. Open the returned Platform Connectors link, check the existing connection and read the references again. |
| A listed connection fails in the workflow | A listed reference identifies a saved account; it is not a platform certification of the installed component. Open that component’s connection form and follow its own sign-in, refresh and configuration steps. Reopen the saved draft and confirm the component revision and reference ID. If the failure began with a new revision, select the prior working revision or install a corrected revision. Do not treat a stale or unavailable platform scanner database as an installation failure. |
| Returning from Platform Connectors | Ask AVA to reopen the saved draft by its flow ID in the same workspace. Confirm its connection reference and current revision before editing. |
| The draft changed during an edit | Read its latest mapping and revision in Hoist. Apply the intended change to that version and verify the saved result. |
| The sample passed but there is no execution | Confirm the published version and active state, send a fresh event to the saved webhook, and inspect that flow’s executions. |

For support, provide the host, time, workspace ID, flow ID, run ID if available and the visible status. Keep access tokens, webhook URLs and vendor credentials private.
