---
title: Choose an agent engine
description: Pick the engine that runs your agents in the top bar, install and sign in to its CLI from the setup dialog, and choose a language model or Smart Assignment.
tags: [engines, beginner, how-to]
order: 40
---

# Choose an agent engine

The agent engine is the program that runs each agent: it reads the project files, writes new ones, runs commands and talks to a language model. You pick one engine for the whole crew in the console's top bar, and you can change it at any time.

The agents' roles and the workflow are the same whichever engine you choose. What changes is which language models the agents use, which account pays for them, and a few engine-specific behaviours.

## The engines

| In the top bar | What it is | How you sign in |
| --- | --- | --- |
| **agentics** | Built in. A copy of the Pi coding agent that ships with VideoAgents; nothing to install. | Your Agentics account in the desktop app, or a local or cloud OpenAI-compatible model |
| **claudecode** | Claude Code | `claude auth login` |
| **codex** | Codex CLI | `codex login` |
| **kimicode** | Kimi Code | `kimi login` |
| **pi** | Pi Coding Agent that you installed yourself | `/login` inside `pi` |
| **opencode** | OpenCode | `opencode auth login` |
| **grok** | Grok Build | `grok login` |
| **antigravity** | Antigravity CLI (command `agy`) | Run `agy` once and sign in with your Google account |

Each CLI engine uses your own account with that vendor, and its usage counts against that account. For a side-by-side comparison, see [Agent engines](/videoagents/models/agent-engines).

On a new install, the desktop app starts on **agentics**. The browser version starts on **kimicode** when the interface is in Chinese and on **claudecode** otherwise.

## Pick the engine

1. In the top bar, open the **Engine** menu and choose an engine.
2. The console checks that engine right away. If it is ready, nothing else appears.
3. If the CLI is missing, not signed in or out of date, a setup dialog opens. Follow the steps below.

![The top bar with the Project, Engine and Language Model menus and the Smart Assignment settings button](/images/videoagents/getting-started/choose-an-agent-engine-top-bar.webp)

The check also runs every time the console opens, so you will see the dialog again if a CLI was removed or signed out.

## Install a CLI from the setup dialog

When the command is not found, the dialog is titled **⚠️ Command `<name>` not found** and shows the vendor's official install command.

1. Click **One-click install**. The official install script runs in the background, and the dialog shows its log and how much has been downloaded. It usually takes a few minutes; on a slow connection it can take more than ten.
2. If the install fails, the dialog shows the likely cause, such as no network access, a region where the service isn't offered, or a missing Node.js. Click **Install in a terminal** to run the same command in a terminal window, where you can answer the script's questions.
3. When the install finishes, the dialog moves on to sign-in.

Other buttons: **Re-check** looks for the CLI again (for example after you installed it yourself), and **Later** closes the dialog.

::: tip
One-click install and sign-in only work on the computer that runs VideoAgents. If you open the console from another device, run the commands on that computer yourself.
:::

## Sign in

When the CLI is installed but not signed in, the dialog is titled **🔑 `<CLI>` is not signed in**.

1. Click **Sign in**. A terminal window opens and runs the CLI's own login command.
2. Authorize in your browser with your own account.
3. The dialog notices the login and closes by itself.

VideoAgents never sees or stores your login tokens; the CLI keeps them.

## Update a CLI

When the installed CLI is older than the vendor's latest release, the dialog is titled **⬆️ A new version of `<CLI>` is available** and shows both version numbers and the update command.

- **One-click update** runs the CLI's own update command in the background and shows the log. If the version did not change afterwards (for example, a Homebrew install that wants `brew upgrade`), the dialog says so and offers **Update in a terminal**.
- **Not now** hides the prompt for that engine and version for 24 hours in this browser.

On Windows, a CLI can't be updated while a task is using it. On a Mac, the update goes ahead and running tasks finish on the old version.

::: tip
The update check is available from v1.0.45.
:::

## Use the built-in Agentics engine

**agentics** needs no install. Where its language model comes from is set on **⚙️ → Generation Models → Language Model / Agentics**:

- **Agentics**: uses your Agentics account in the desktop app. If you are not signed in, the console shows **🔑 Sign in to get started** with a **Sign in** button; the app restarts after you sign in.
- **Local model**: an OpenAI-compatible server on your own machine or network.
- **Cloud model**: any OpenAI-compatible provider; you fill in the base URL, API key and model.

When **agentics** is the engine, the top bar shows the active channel and a second menu for the model. See [The built-in Agentics engine](/videoagents/models/agentics-engine).

## Choose a language model

For every engine except **agentics**, the **Language Model** menu defaults to **Smart Assignment**. It splits the agents into two tiers by task complexity and gives each tier a model:

- **High tier (creative core)**: orchestration, story, characters, scenes, art, directing and similar work.
- **Low tier (others)**: analysis, indexing, review and mechanical work.

To change the models, click the settings button to the right of the menu. The dialog lists the built-in default and the number of agents in each tier. **Save** applies the change to every agent on Smart Assignment; **Reset to default** goes back to the built-in models.

![The Smart Assignment models dialog for the claudecode engine, with a high-tier and a low-tier model menu](/images/videoagents/getting-started/choose-an-agent-engine-smart-assignment.webp)

You can also pick a single model in the **Language Model** menu so that every agent uses it. See [Language models and smart assignment](/videoagents/models/language-models).

## Give one agent a different engine

Each agent's chat has a **Model** button in its header. It opens **🧠 Agent Model Config**, where you can set an engine and a language model for that agent only. **Follow global (top right)** means the agent uses the top-bar choice. An agent with its own setting keeps it when you change the top bar.

## Good to know

- Switching the engine or the language model in the top bar updates every agent that follows it. Tasks already running are not affected.
- **Ctrl+Enter** (⌘+Enter on a Mac) adds a message to the task an agent is running. The claudecode, pi, agentics and opencode (2.x) engines take it mid-task; the others add it to the agent's next task. See [Chat with agents](/videoagents/console/chat-with-agents).
- The **Resource Usage** panel on the right of the console shows how much of your engine's session and weekly quota is used, for the engines that report it. See [Resource usage](/videoagents/console/resource-usage).

## Troubleshooting

**The install fails with a region or network message.**
Some services are only offered in certain countries and regions. Check your network or proxy under **⚙️ → Advanced → Network Check**, or switch to another engine.

**I signed in, but the dialog still shows "not signed in".**
Click **Re-check**. If the dialog timed out while it was waiting for you, it asks you to do this too.

**Agents fail right after I changed the engine.**
Open the agent's chat and read the error. Check that the new engine is installed and signed in: choose it again in the top bar to run the check.

## Related

- [Agent engines](/videoagents/models/agent-engines)
- [The built-in Agentics engine](/videoagents/models/agentics-engine)
- [Language models and smart assignment](/videoagents/models/language-models)
- [Set up providers](/videoagents/getting-started/set-up-providers)
