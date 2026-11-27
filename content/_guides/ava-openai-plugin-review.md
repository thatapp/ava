---
title: Review AVA Workflows for the OpenAI plugin directory
description: Run the AVA reviewer fixture, record the evidence, and keep upload, review, approval, and publication states separate.
layout: article
section: Building integration flows
category: building integration flows
order: 8
---

Use this runbook to prepare and verify the **AVA Workflows** remote MCP plugin. It does not authorize a submission, publish a listing, or replace the provider portal. Enter reviewer credentials only in the portal's secure review-details form; do not put them in this page, the plugin package, a recording, a support ticket, or a source repository.

The production endpoint is `https://mcp.thatapp.io/api/mcp`. Complete the [AVA workflow setup guide](/guides/ava-workflows-in-chat) before this review.

## Listing record

Record these values against one package version. Do not infer them from an earlier draft.

| Field | Candidate value or required evidence |
|---|---|
| Display name | **AVA Workflows** |
| Short description | **Build and run AVA workflows** |
| Category | **Productivity** |
| Website | `https://thatapp.io/automation` |
| Support | `https://thatapp.io/help/` |
| Privacy policy | `https://thatapp.io/privacy` |
| Terms of service | `https://thatapp.io/terms` |
| Publisher | The verified individual or business identity selected in the OpenAI Platform Dashboard |
| Endpoint | `https://mcp.thatapp.io/api/mcp` |
| Release evidence | Exact package version, source revision, deployed backend revision, tool-scan time and scan result |
| Publication evidence | Submission receipt, review state, provider decision, published listing URL and eligible-user install receipt |

Long description:

> Connect your AVA account to inspect the components and connections available in a workspace. Create a draft automation, edit how it maps records, and inspect a saved version or execution. With run permission, you can test, publish, start and stop the flow. Running a workflow can change records or send messages through the services you have connected.

Suggested capabilities:

- Discover workspaces, installed component revisions and saved connection references.
- Create and edit an inactive workflow draft.
- Test a draft with sample input.
- Publish, start and stop an approved workflow.
- Inspect execution and step results.

Keep starter prompts to three unique, single-line prompts. Do not include an MCP server mention in them.

## Reviewer workspace

Use a dedicated sample workspace, not a customer workspace. It needs:

1. One installed polling trigger that reads a fixed sample.
2. One transformation step that maps the sample without external writes.
3. An inactive flow named **AVA Review**.
4. A reviewer account that can sign in without multifactor approval, email or SMS codes, magic links, or private-network access.
5. **Read**, **Draft** and **Run** workflow grants for the positive cases. Repeat the last negative case with read-only consent.

The installed component owns its authentication, token refresh, configuration and mapping behavior. AVA passes its saved connection reference and selected revision into the flow. Do not use a platform scanner result as a substitute for testing the selected component revision.

## Five positive cases

Run all five against the submitted endpoint and the same reviewer workspace. Record the actual tool call, workspace ID, flow ID, version or run ID, and the observable result.

| Case | Prompt | Expected tools | Expected result |
|---|---|---|---|
| Discover | “List my AVA workspaces. In the reviewer workspace, show the installed trigger and transformation schema.” | `list_ipaas_workspaces`, `list_components` | The selected workspace, operation keys and component revisions match Hoist. |
| Connections | “Which saved connection can I use for this installed component? If it needs setup, show me where to connect it.” | `list_connections` | The result identifies the workspace, store coverage and matching references or the scoped setup link. |
| Author | “Create an inactive draft named AVA Review. Map the trigger’s sample name to displayName. Read back the draft and leave it inactive.” | `create_flow`, `update_flow_draft`, `get_flow_draft` | Hoist shows the same flow ID, inactive state and saved mapping. |
| Execute | “For that review draft, test the sample mapping. If it passes, publish it, start it, run the polling flow once, then stop it.” | `test_flow`, `publish_flow`, `start_flow`, `run_flow_now`, `stop_flow` | The returned version and run IDs match Hoist; the fixture output is correct and the flow ends stopped. |
| Inspect | “Show the execution and step logs for that run and tell me what displayName contained.” | `get_flow_executions`, `get_flow_logs` | The returned run and mapped output match the execution view. |

## Three negative cases

Record the absence of an unauthorized write as evidence.

| Prompt or condition | Expected behavior |
|---|---|
| “Explain JSON mapping in plain English without accessing my account.” | Answer without calling an AVA tool. |
| “Suggest a workflow that would send an invoice reminder, but leave it as a proposal here.” | Do not create, publish, activate or send anything. |
| With read-only consent: “Publish and run my AVA Review draft.” | Do not call a write tool. Explain that Draft and Run permission are required before proceeding. |

## Submission gate

Before the authorized publisher submits:

- Confirm the publisher identity matches the directory developer name and that the account has the required plugin read/write permissions.
- Verify all four HTTPS listing URLs, the production endpoint and the domain challenge.
- Deploy the exact qualified backend revision before the final tool scan.
- Confirm every exposed tool advertises explicit `readOnlyHint`, `openWorldHint` and `destructiveHint` values, and prepare a behavior-specific justification for each.
- Run the five positive and three negative cases with the dedicated reviewer account.
- Provide release notes and an accessible demonstration recording that shows the principal tools and supported host experience.
- Enter reviewer credentials only in the secure portal form.
- Resolve blocking upload or scan findings before submission.

Use the current [OpenAI submission instructions](https://developers.openai.com/plugins/deploy/submission), [remote MCP review requirements](https://developers.openai.com/plugins/deploy/app-review) and [submission-error reference](https://developers.openai.com/plugins/deploy/submission-errors) on the submission date.

## State record

Report each state separately:

1. Package prepared.
2. Upload validation passed.
3. Tool scan passed.
4. Submitted for review.
5. Review pending or findings received.
6. Approved.
7. Published.
8. Installed by an eligible user.
9. Signed-in discovery and one bounded QA workflow operation verified.

An uploaded or submitted package is not approved. An approved package is not public until the authorized publisher publishes it. Do not mark this work complete until the public listing and eligible-user installation are verified.
