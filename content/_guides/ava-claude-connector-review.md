---
title: Review AVA Workflows for the Claude Connectors Directory
description: Prepare the AVA remote connector listing, test every advertised tool, and record submission and installation evidence.
layout: article
section: Building integration flows
category: building integration flows
order: 9
---

Use this runbook to prepare **AVA Workflows** as a remote MCP connector for the Claude Connectors Directory. It does not authorize a portal submission, provider declaration, runtime change or publication claim.

The universal production endpoint is `https://mcp.thatapp.io/api/mcp`. Complete the [AVA workflow setup guide](/guides/ava-workflows-in-chat) before this review.

## Listing record

Record these values against one tested server revision.

| Field | Candidate value or required evidence |
|---|---|
| Name | **AVA Workflows** |
| Slug | **ava-workflows**; the slug becomes permanent after publication |
| One-liner | **Build AVA workflows, test mappings and inspect execution results in the workspace you select.** |
| Company | **TECHeGO, LLC** |
| Product | `https://thatapp.io/automation` |
| Documentation | The published URL for this guide and the workflow setup guide |
| Support | `https://thatapp.io/help/` and the verified support contact entered by the publisher |
| Privacy policy | `https://thatapp.io/privacy` |
| Terms | `https://thatapp.io/terms` |
| Endpoint | `https://mcp.thatapp.io/api/mcp` |
| Authentication | OAuth 2.0 through the existing AVA sign-in and workspace membership |
| Release evidence | Exact backend revision, deployment receipt, `tools/list` inventory, test time and test result for every tool |
| Directory evidence | Submission receipt, scan/review state, public listing URL and eligible-user installation receipt |

Detail-card description:

> Use Claude with your AVA account to find installed components and connection references, create an inactive workflow draft, and check how each step maps data. With the appropriate workspace role and permission, you can publish, start or stop a workflow, run it and inspect its results. Connected steps can change records and send messages.

Select one to five categories in the portal. Use a square approved icon. Carousel screenshots are required only if AVA adds an MCP App interface; the text-only remote connector does not claim that capability.

## Permissions and component boundary

- **Read** covers installed components, connection references, workflows and execution history.
- **Draft** covers creating and editing inactive drafts.
- **Run** covers sample tests, publication, start, stop and immediate execution.

The installed component owns its authentication, token refresh, configuration and mapping behavior. AVA passes the saved connection reference and selected component revision into the flow. Do not use a platform scanner result as a substitute for exercising the selected revision.

## Test inventory

Export the exact `tools/list` response from the deployed candidate and create one result row for every advertised tool. Do not use a representative subset. Each row needs:

| Evidence | Required value |
|---|---|
| Tool | Exact advertised name and title |
| Annotation | Advertised read-only or destructive behavior and why it matches the implementation |
| Permission | Read, Draft or Run grant required |
| Prompt | The exact reviewer prompt |
| Input | Synthetic workspace, component, draft, version or run identifier |
| Result | Success or expected refusal, with bounded observable output |
| Cross-check | Matching Hoist/API state where the tool changes or reads saved state |
| Safety | Confirmation that no customer data, credential value or unintended external write was used |

Use Claude with AVA installed as a custom connector, or MCP Inspector, to call each tool. A unit test or source inspection does not satisfy the provider's every-tool confirmation.

## Core reviewer walkthrough

Use a dedicated sample workspace with a fixed polling trigger, a transformation step and no external provider write.

1. “Show my AVA workspaces and the installed polling trigger in the reviewer workspace.” Confirm the selected workspace and installed revision in Hoist.
2. “Create an inactive draft named AVA Review that maps the sample name to displayName. Read the saved draft back.” Confirm the flow ID, inactive state and mapping in the designer.
3. “Test the mapping. If it passes, publish it, start it, run the polling flow once and stop it.” Confirm the returned version, run ID, output and final stopped state.
4. “Show that run and its step results.” Confirm the execution and mapped output.
5. Repeat a read request with read-only consent. Then request a write and verify that no write tool is available or invoked.

The complete every-tool matrix remains required even when these walkthrough cases pass.

## Submission gate

Before the authorized publisher opens the portal:

- Confirm the submitting account is on a paid Claude plan.
- Confirm the remote HTTPS endpoint is the deployed candidate, not a local or test endpoint.
- Confirm OAuth 2.0 sign-in works through Claude's connector client.
- Confirm every tool has a non-empty title and the applicable `readOnlyHint` or `destructiveHint`.
- Complete the every-tool matrix with synthetic data.
- Verify the documentation URL, privacy policy, support contact, icon and company contact.
- Declare the connector's actual read/write behavior and required user setup.
- Declare data handling accurately: AVA controls its workflow API; installed connector steps can call user-configured third-party services.
- Review each required compliance acknowledgment against the actual product. Do not infer answers for health data, financial actions, AI media, sponsored content or conversation-data handling.
- If the connector later declares `ui/open-link`, list only URI origins controlled by the submitting organization.
- Keep credentials out of the portal, source, issue notes and recordings. If Anthropic selects the submission for Verified review, provide test access only through the reviewer-requested channel.

Use the current [Claude connector submission instructions](https://claude.com/docs/connectors/building/submission), [Anthropic Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy) and [Directory Terms](https://support.claude.com/en/articles/13145338-anthropic-software-directory-terms) on the submission date.

## State record

Report each state separately:

1. Package and listing prepared.
2. Exact candidate deployed.
3. Every advertised tool tested.
4. Submitted through the developer portal.
5. Automated scan pending, passed or findings received.
6. Community listing published, or human/Verified review pending.
7. Reviewer feedback resolved and provider decision recorded.
8. Public listing URL verified.
9. Installed from the directory by an eligible Claude user.
10. OAuth sign-in, tool discovery and one bounded QA workflow operation verified.

Do not call a prepared draft submitted. Do not call a portal receipt approved. Do not call a Community or Verified listing installed until an eligible user completes the directory install and signed-in QA check.
