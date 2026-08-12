---
title: "Build an AI Agent Team That Actually Works Together"
description: "A practical guide to multi-agent orchestration with five specialists, one coordinator, review loops, approval gates, and real-world debugging."
pubDate: 2026-08-12
lang: en
tags: ["AI agent orchestration", "multi-agent systems", "OpenClaw", "Claude Code", "Codex"]
translationOf: build-ai-agent-team-orchestration-he
faq:
  - q: "What is AI agent orchestration?"
    a: "AI agent orchestration is the control layer that routes work between specialized agents, preserves shared context, manages tools and permissions, and handles failures and approvals."
  - q: "When should I use multiple AI agents instead of one?"
    a: "Add agents when the work requires genuinely different responsibilities, permission boundaries, context sets, or independent review. One capable agent is often better than several vague ones."
  - q: "How do you keep a multi-agent system safe?"
    a: "Use least-privilege access, keep secrets outside prompts and repositories, require human approval for external actions, preserve source links, and bound retries and escalation behavior."
  - q: "Can Claude Code and Codex review another agent's work?"
    a: "Yes. Use them as independent reviewers with the same explicit rubric, evidence requirements, and blocking criteria rather than asking for an unstructured score."
---

## The night five agents walked into one room

At 2:37 in the morning on August 11, 2026, I opened AnyDesk with my technical partner, Itamar Melul. There was no polished demo script. We had a text file with connection details, a working GitHub knowledge base, Composio, Green API, a social publishing service, Spinach meeting transcripts, and a business with too many moving parts.

Seventy minutes later we had five standalone AI agents, a shared control room, Claude Code and Codex acting as reviewers, and the beginning of a workflow that could turn yesterday's meetings into today's content.

It also broke twice.

That is exactly why this is a useful tutorial. Agent orchestration is not a diagram with friendly circles. It is the operating layer that decides **who does what, which context they receive, which tools they may use, how work moves between them, and what happens when something fails.**

In this guide you will build the same architecture without exposing credentials, confusing agents with tools, or pretending that five agents are automatically better than one.

> **Safety rule:** never paste API keys into a tutorial, repository, screenshot, or shared chat. Store secrets in your platform's encrypted environment or credential manager. External actions such as publishing, emailing, invoicing, or messaging customers should require explicit approval until the workflow is proven.

---

## Before you orchestrate: know the four layers

People often mix up the model, the agent, the tool, and the orchestrator. They are different things.

1. **Model** — the reasoning engine, such as Claude, Codex, or another LLM.
2. **Harness** — the instructions, memory files, skills, permissions, and loops surrounding the model. Itamar's useful definition from our call was that the harness is everything that determines *how* the model works. A weaker model in a strong harness can outperform a stronger model in a chaotic one.
3. **Agent** — a model inside a harness, with a role, workspace, tools, memory, and boundaries.
4. **Orchestrator** — the control layer that routes work, preserves shared context, handles queues and failures, and coordinates agents.

Use the lowest level of complexity that reliably solves the job. One capable agent with three tools is often better than five vague agents. Add another agent when you need a genuinely different responsibility, permission boundary, context set, or independent review.

## The architecture we built

We created five standalone specialists, each with its own workspace:

- **Content Studio** — learns my writing styles and content skills, then drafts for each platform.
- **Invoice Agent** — finds invoices in email, extracts the data, builds an organized table, and sends it to me for approval before anything reaches the accountant.
- **WhatsApp Agent Builder** — a Green API specialist that knows how to create customer-service, sales, collection, and notification agents. It is not the customer-service bot itself; it is the specialist that builds and maintains those bots.
- **Meeting Operator** — reads Spinach meeting records, creates summaries and action items, and prepares follow-up drafts.
- **Lead Operator** — detects potential leads from approved channels and prepares CRM updates.

Above them sits a **Main Coordinator**. The coordinator holds the shared context, routes tasks, checks that nothing falls through, and asks specialists to collaborate. It should not quietly do every specialist's job itself.

We then created a shared channel, similar to a small Slack room, and added the five agents. Separate channels can hold separate workflows. Our first dedicated channel was for content: Content Studio produced the draft while Claude Code and Codex reviewed it independently.

This is a supervisor-and-specialists pattern with a reviewer loop:

~~~text
You
  ↓
Main Coordinator
  ├── Content Studio ──→ Claude Code review ──┐
  │                         Codex review ──────┤→ Human approval
  ├── Invoice Agent                           │
  ├── WhatsApp Agent Builder                  │
  ├── Meeting Operator                        │
  └── Lead Operator                           │
            ↑                                 │
      Shared tools + knowledge base ──────────┘
~~~

## Milestone 1: map responsibilities before creating agents

Do not start with names or avatars. Start with work.

Create a file named \`agent-map.md\` and give your coding agent this prompt:

~~~text
I want to design a small AI agent team for my business.

First, interview me about:
1. The recurring outcomes I need each week
2. Where the source data lives
3. Which actions are read-only and which change the outside world
4. Which tasks require a different expertise, context set, or permission boundary
5. Which decisions must remain human

Then propose the smallest useful set of agents. For each agent define:
- Name and one-sentence mission
- Inputs and outputs
- Tools and knowledge sources
- Explicit non-goals
- Approval gates
- Success check
- Failure and escalation behavior

Save the result to agent-map.md. Do not create agents yet.
~~~

Review the map. Merge roles that use the same context and permissions. Split roles when one agent would otherwise receive an unsafe number of tools or conflicting goals.

**What good looks like:** every agent owns an observable outcome. “Marketing Agent” is vague. “Turn one approved meeting insight into three platform-specific drafts and place them in Google Docs” is testable.

## Milestone 2: create separate workspaces and role contracts

In our live session, Itamar corrected an important ambiguity: these were not disposable subagents. They were standalone agents with separate workspaces. That matters because each one needs durable instructions, memory, skills, and permissions.

Use this prompt in a platform that supports multiple agents, or adapt it to separate project folders:

~~~text
Create the standalone agents described in agent-map.md.

Requirements:
- Each agent gets a separate workspace.
- Each workspace contains an AGENT.md with mission, inputs, outputs,
  allowed tools, forbidden actions, approval gates, success criteria,
  retry limits, and escalation rules.
- Do not copy every credential to every agent.
- Do not schedule recurring jobs yet.
- Do not perform any external action.
- Return a manifest showing every created workspace and file.
~~~

A compact role contract can look like this:

~~~markdown
# Meeting Operator

## Mission
Turn approved meeting transcripts into accurate summaries, action items,
and follow-up drafts.

## Sources
- Spinach meeting records
- Calendar participant metadata
- CRM account context

## Outputs
- Source-linked summary
- Action items with owner and due date
- Follow-up email draft

## Boundaries
- Never send email without approval
- Never infer a commitment that was not stated
- If speaker attribution is uncertain, flag it

## Success check
Every action item links to the meeting and has an owner or is marked unassigned.
~~~

## Milestone 3: connect tools as capabilities, not as a credential dump

The live build began with a text file describing available services. The useful part was not the secret values; it was the routing information: which service handles which job and how the agent should access it.

Create a safe \`tool-registry.md\`:

~~~markdown
| Capability | Provider | Access path | Agents | Mode | Approval |
|---|---|---|---|---|---|
| GitHub knowledge | Composio | Connected account | Content, Main | Read | No |
| Calendar | Composio | Connected account | Meetings, Main | Read | No |
| Email | Composio | Connected account | Invoices, Meetings | Draft | Send requires approval |
| WhatsApp | Green API | Direct API | WhatsApp Builder, Leads | Read/Draft | Send requires approval |
| Social publishing | Approved provider | Direct API | Content | Draft | Publish requires approval |
| Meeting transcripts | Spinach | Connected integration/API | Meetings | Read | No |
~~~

Then instruct the coordinator:

~~~text
Read tool-registry.md and assign capabilities by least privilege.
Give each agent only the tools required by its role contract.
For every write-capable tool, default to draft or dry-run mode.
Before using a direct API, fetch the current official documentation when needed.
Never print, copy, summarize, or store secret values in logs or memory files.
Return a permissions matrix and run read-only smoke tests.
~~~

### MCP or direct API?

In the session, Itamar preferred direct API calls for some operations because of call quality and control, not because every MCP connection is inherently insecure. The practical rule is more nuanced:

- Use a mature connector when it gives reliable authentication, clear schemas, and the required operation.
- Use the direct API when you need an endpoint the connector does not expose, precise payload control, predictable error handling, or current provider features.
- In both cases, validate scopes, fetch current documentation, log the result without secrets, and require approval for irreversible actions.

The transport is not your safety model. Permissions and approval gates are.

## Milestone 4: build the control room

Create a general channel containing the coordinator and all specialists. Then create narrower channels for workflows that need their own context.

For example:

- \`#general-operations\` — coordinator + all specialists
- \`#content-studio\` — coordinator + Content Studio + two reviewers
- \`#meeting-follow-up\` — coordinator + Meeting Operator + Lead Operator
- \`#finance-review\` — coordinator + Invoice Agent; human approval required

Send this bootstrap message to the general channel:

~~~text
Wake every agent in this channel. Before I assign work, introduce each agent
with: its mission, the sources it can access, the outputs it owns, and the
actions it is forbidden to take without approval. Then explain who I am using
the approved business profile in the shared knowledge base. Do not infer
personal facts that are not in the source material.
~~~

Test each agent with a tiny deterministic request such as “reply with HI only.” This confirms routing before you spend time debugging a complex task.

## Milestone 5: connect the company brain

My writing knowledge already lived in an Obsidian wiki synced to GitHub. Instead of re-explaining my voice in a prompt, we told the coordinator to find the correct repository through the connected GitHub account, extract the relevant writing rules and skills, and teach Content Studio.

Use this pattern:

~~~text
Using the approved GitHub connection, locate my business knowledge repository.
Do not guess the repository from its name alone: inspect the README and index.

Find the minimum relevant material for Content Studio:
- Voice and style rules
- Platform-specific templates
- High-performing examples
- Content creation and Google Docs export skills
- Claims or facts that require verification

Create a source manifest with repository paths and commit SHA.
Teach Content Studio from those sources without copying unrelated private data.
Run a retrieval test: ask it to explain three differences between my LinkedIn,
Facebook, and WhatsApp writing styles, citing the source paths.
~~~

The source manifest prevents “I learned your style” from becoming an unverifiable claim. It also gives you a clean way to refresh knowledge when the repository changes.

## Milestone 6: add independent reviewers

Our content channel used Content Studio as the creator and Claude Code plus Codex as judges. This is useful only if the judges have an explicit rubric. “Rate this” produces theatre. A checklist produces evidence.

Create \`content-review-rubric.md\`:

~~~markdown
Score each criterion from 0-5 and cite the exact sentence you evaluated:
1. Hook earns attention without manufactured suspense
2. Claim is source-backed or clearly framed as opinion
3. Voice matches the target platform
4. Concrete example replaces generic advice
5. Structure is easy to scan
6. CTA matches the reader's intent
7. No private information or unsupported claims

Blocking failures: invented quote, exposed secret, false attribution,
unapproved publication, or score below 4 on factual grounding.
~~~

Then define the loop:

~~~text
Content Studio creates draft v1 from approved sources.
Claude Code reviews factual grounding and structure using content-review-rubric.md.
Codex reviews clarity, voice match, and failure cases using the same rubric.
Content Studio revises once using both reports.
If either reviewer finds a blocking failure, stop and escalate to me.
Otherwise present the final draft and both scorecards for approval.
Never publish automatically.
~~~

Two models agreeing is not proof. Independent evidence and a blocking rubric are what make the review useful.

## Milestone 7: run one real workflow

The workflow we wanted was simple and valuable: every morning, prepare a draft about a current AI topic using ideas from the previous day's meetings and my established writing style.

Do not schedule it immediately. Run it manually first:

~~~text
Run a manual preview of the daily content workflow for yesterday.

1. Meeting Operator lists the meetings I was authorized to access.
2. It extracts candidate insights with source links and timestamps.
3. Main Coordinator asks me to choose one insight.
4. Content Studio creates one draft for X using the approved voice sources.
5. Claude Code and Codex review it using content-review-rubric.md.
6. Content Studio revises once.
7. Return the draft and scorecards. Do not publish.

Record duration, tool failures, missing permissions, and token usage for each step.
~~~

Only after three clean manual runs should you schedule it. Start in draft-only mode. Automation is the last step, not the first.

## What broke in the live demo — and what it teaches

### 1. Model changes restarted the gateway

Switching the active model caused a gateway restart and interrupted the run. Treat model or CLI installation changes as maintenance events. Do them before the workflow begins, not in the middle.

### 2. Messages appeared stuck between channels

We moved between channels while one agent was still working. The task entered a queue, but the interface did not clearly show that it was running. A production orchestrator needs visible states: queued, running, waiting for approval, complete, failed, and timed out.

### 3. The first message triggered bootstrap work

New agents may need to load initial files and build context. Test them with a minimal request, then run the real task. Measure cold-start time separately.

### 4. We tried several things at once

When Telegram worked but the web chat stalled, the system had multiple conversations and turns in flight. Debug one path at a time. Use a correlation ID for every workflow run.

### 5. A restart fixed symptoms, not the cause

We checked system health and restarted the gateway. That restored operation, but a restart is not a diagnosis. Preserve logs, inspect the failing step, and record whether the cause was authentication, timeout, queue state, compaction, model restart, or tool response.

## Production checklist

Before you let an agent team touch real customers or money, verify:

- Every role has one clear outcome and explicit non-goals.
- Every tool has the minimum required scope.
- Secrets live outside prompts, repositories, screenshots, and memory.
- External writes require approval or a tightly scoped policy.
- Every output keeps a link to its source.
- Retries are bounded and idempotent.
- Queues, timeouts, and agent status are visible.
- A failed specialist escalates instead of silently improvising.
- Model changes and deployments happen outside active runs.
- You can replay a run from logs without exposing chain-of-thought or secrets.
- Cost and latency are measured per step.
- A single-agent baseline exists so you can prove orchestration adds value.

## The finished system

You now have more than a group chat full of bots. You have:

- Specialists with bounded responsibilities
- Separate workspaces and durable role contracts
- A coordinator that routes rather than hoards work
- A least-privilege tool registry
- Shared channels for collaboration
- Independent review loops with blocking criteria
- Human approval before external actions
- A manual-to-scheduled rollout path
- A debugging model for queues, restarts, and cold starts

That is orchestration: not “agents talking to agents,” but a system where responsibility, context, tools, state, evidence, and failure behavior are designed on purpose.

---

## Keep building with us

I share the experiments that survive contact with real work — including the failures — with the Future Proof Agents community. Use the WhatsApp community link below and bring the first workflow you want to orchestrate.

*Case study source: Yuval Keshtcher and Itamar Melul working session, August 11, 2026. Product interfaces and limits change; verify current documentation before implementation.*
