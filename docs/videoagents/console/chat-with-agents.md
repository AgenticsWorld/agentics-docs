---
title: Chat with agents
description: Send instructions to the Workflow Orchestrator or any single agent, add to a running task, attach local files, pick skills and set a model per agent.
tags: [beginner, how-to]
order: 20
---

# Chat with agents

Every agent in the left column has its own chat. Most of the time you talk to the **Workflow Orchestrator**, which plans the work and dispatches it to the rest of the team. You can also give one agent a direct instruction, for example to redo a single image or rewrite one scene.

## Send an instruction

1. Pick an agent in the left column. The console opens on the **Workflow Orchestrator** by default.
2. Type your instruction in the box at the bottom.
3. Press **Enter** or click **Send**. Press **Shift+Enter** for a new line.

The agent's answer streams into the chat. While it works you see a box marked **⏳ Working…** with the tools it is using and a short progress line. When the run ends, the box is replaced by the final reply.

![An agent's reply above an instruction marked "Dispatched by the Producer"](/images/videoagents/console/chat-with-agents.webp)

Good to know:

- The input box of the Workflow Orchestrator has a blue glow; the boxes of other agents are amber, so you can tell at a glance who you are talking to.
- If the agent is already busy, a new message becomes a new task and waits in the queue behind the running one.
- What you have typed but not sent is kept in the browser, so you can open a settings page and come back without losing it.
- Each project has separate conversations. The chat always belongs to the project selected in the top bar.
- Messages that start with `/` (such as `/stop all` or `/retry 1`) are system commands. See [Chat commands](/videoagents/console/chat-commands).

## Add to a running task

Press **Ctrl+Enter** (**⌘+Enter** on macOS) instead of Enter to add your message to the task the agent is running now. The agent reads it after its current tool call finishes and takes it into account without starting a new task.

This works with the Claude Code, Pi, Agentics and OpenCode 2 engines. With other engines, or when the task is already finishing, the message is queued as a new task. A note under your message tells you what happened:

| Note | Meaning |
| --- | --- |
| **↪ Interjection: added to the running task** | Delivered to the running task |
| **↪ Interjection: merged into the queued task** | Added to a task that had not started yet |
| **⏳ Interjection: this engine can't take messages mid-run; queued as a new task** | The engine has no way to receive it mid-run |
| **⏳ Interjection: the task was finishing; queued as a new task** | Too late for the running task |
| **⏳ Interjection: this agent has several tasks running; queued as a new task** | The console could not tell which task you meant |

## Message labels

A small line above a message shows where it came from or how a run ended:

| Label | Meaning |
| --- | --- |
| **📨 Dispatched by the Producer** | The Workflow Orchestrator sent this work order to the agent |
| **🤖 Auto-Run** | Sent by auto-run when the project was idle. See [Auto run](/videoagents/console/auto-run). |
| **⚙️ Settings Change Notification** | A settings change the agents were told about |
| **💬 From WeChat ClawBot**, **✈️ From Feishu**, **🟢 From WhatsApp** | Sent from your phone. See [Mobile messages](/videoagents/console/mobile-messages). |
| **⏹ Stopped manually** | You stopped the run |
| **⚠ Run error** | The run ended with an error |

## Attach local files

Click the round **+** at the top-right of the input box and pick files on your computer. Each file shows as a small tag above the box; click **×** to remove one.

Nothing is uploaded. The absolute paths of the files are added to the end of your message, and the agent, which runs on the same computer, reads them from there. If the system file dialog cannot open (for example when the service runs on another machine), a box appears where you paste absolute paths, one per line. **Shift+click** the **+** to open that box directly.

Attached files are kept with your unsent draft.

## Use a skill

Some agents have skills: extra instructions for a particular task or model. The **Skill** button in the chat header shows how many the agent has.

1. Click **Skill**.
2. Click a skill to insert its path (for example `skills/sd25-pe`) into the input box, then say in your instruction what the skill should be used for.
3. Click **View text** to read the skill's full `SKILL.md`.

![The agent skills dialog with one always-on skill, its path and the Load skill link](/images/videoagents/console/chat-with-agents-skills.webp)

**Load skill** installs a skill from a `.zip` (containing a `SKILL.md`) or a single `SKILL.md` file on this agent. Skills you install yourself go into the app's data folder, so they survive app updates, and you can delete them from the same list. See [Install and use skills](/videoagents/extend/skills).

To decide which skills an agent applies on its own in this project, use [Project skills](/videoagents/console/project-skills).

## Give one agent its own model

The **Model** button shows the engine and model the agent uses. Click it to give this agent its own engine and language model:

1. Pick an **Engine**, or **Follow global (top right)**.
2. Pick a **Language Model**, or **Custom…** to type a model ID.
3. Click **Save**.

![The Agent Model Config dialog with Engine and Language Model menus](/images/videoagents/console/chat-with-agents-model.webp)

The setting applies to this agent only and overrides the top bar, except when the Workflow Orchestrator dispatches with an explicit engine or model. **Restore policy default** removes it.

::: warning
Changing the **Engine** or **Language Model** in the top bar clears every per-agent setting made here.
:::

## SOUL.md

With **Debug mode** on (**⚙️ → Advanced → Agent Advanced Settings**), the chat header shows a **SOUL.md** button. It shows the agent's role description in place of the chat; click it again to go back.

## Related

- [Chat commands](/videoagents/console/chat-commands)
- [Run Panel](/videoagents/console/run-panel)
- [The agent crew](/videoagents/concepts/agent-crew)
- [Voice input](/videoagents/console/voice-input)
