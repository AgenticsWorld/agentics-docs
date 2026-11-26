---
title: Agent engines
description: Compare the eight agent engines VideoAgents can run on, what each one needs, how to install and sign in, and how to mix engines across agents.
tags: [engines, reference, beginner]
order: 10
---

# Agent engines

An agent engine is the program that runs each agent's work: it reads the agent's instructions, calls a language model, reads and writes the project files and runs tools. VideoAgents does not ship one fixed model. You pick an engine in the console's top bar, and you can give single agents a different one.

## The engines

| Engine in the top bar | Program | What you need | Sign-in command |
| --- | --- | --- | --- |
| **agentics** | Built-in [Pi Coding Agent](https://github.com/earendil-works/pi), shipped with VideoAgents | Nothing to install. A signed-in VideoAgents desktop account, or your own local or cloud model | Signs in with the desktop app |
| **claudecode** | [Claude Code](https://code.claude.com/docs/en/quickstart) | A Claude account | `claude auth login` |
| **codex** | [Codex CLI](https://learn.chatgpt.com/docs/codex/cli#getting-started) | A ChatGPT account | `codex login` |
| **kimicode** | [Kimi Code](https://www.kimi.com/code) | A Kimi Code account | `kimi login` |
| **pi** | [Pi Coding Agent](https://pi.dev/docs/latest/quickstart) that you install yourself | Any provider Pi can sign in to | `pi`, then `/login` |
| **opencode** | [OpenCode](https://opencode.ai/docs/) | An OpenCode account (Go subscription or Zen) | `opencode auth login` |
| **grok** | [Grok Build](https://grok.com/build) | A grok.com account | `grok login` |
| **antigravity** | [Antigravity CLI](https://antigravity.google/docs/getting-started?tab=cli) (`agy`) | A Google account | Run `agy` once in a terminal |

The **agentics** engine has its own page: [The built-in Agentics engine](/videoagents/models/agentics-engine). It is separate from the **pi** engine: the bundled copy never reads your own `~/.pi/agent` settings or logins.

### Which engine is selected on first start

When neither the browser nor the service has a saved choice:

- The desktop app selects **agentics**.
- The web version selects **kimicode** when the interface is in Chinese, and **claudecode** for every other language.

After that, the console remembers your choice.

## Choose the engine

1. In the console's top bar, open **Engine** and pick an engine.
2. Next to it, **Language Model** lists the models for that engine. See [Language models and smart assignment](/videoagents/models/language-models).

![The console top bar with the Engine and Language Model menus](/images/videoagents/models/agent-engines-topbar.webp)

The engine you pick applies to every agent that has no setting of its own. The console checks the engine as soon as you switch to it.

## Install and sign in from the console

If the engine's program is missing or not signed in, a setup dialog opens.

**Program not installed.** The dialog says **Command `<name>` not found** and shows the official install command.

1. Click **One-click install**. The install runs in the background and its log appears in the dialog. It usually takes a few minutes; the official scripts print no progress while downloading, so a slow connection can take longer.
2. If it fails, click **Install in a terminal**. A terminal window runs the same command, so you can answer any questions the script asks (for example, whether to install Node.js first).
3. When the install finishes, the dialog moves on to sign-in.

**Program not signed in.** The dialog says **`<program>` is not signed in** and shows the sign-in command.

1. Click **Sign in**. A terminal window opens with the program's own sign-in command.
2. Finish the sign-in in your browser with your own account.
3. The dialog notices the sign-in and closes. If it does not, click **Re-check**.

Click **Later** to close the dialog without doing anything.

Good to know:

- One-click install and sign-in only work in a console opened on the computer that runs VideoAgents. From another device, run the commands in a terminal on that computer, then click **Re-check**.
- VideoAgents never sees your engine tokens. Each program stores its own sign-in.
- On macOS, the desktop app picks up programs you installed before (Homebrew, `~/.local/bin` and similar locations), so you don't need to reinstall them.
- Some installs need Node.js 22.19 or newer. On Windows, some programs need Node.js (with npm) before they can be installed.

## Update an engine

Once the program is installed and signed in, the console compares its version with the latest release. When yours is older, a dialog says **A new version of `<program>` is available**.

- **One-click update** runs the program's own update command in the background and shows the log.
- **Update in a terminal** runs the same command in a terminal window. Use it when the one-click update fails or reports that the version did not change (for example, a Homebrew install that wants `brew upgrade`).
- **Not now** hides the notice for that version for 24 hours in this browser.

On Windows, an engine can't be updated while a task is using it. On macOS and Linux the update goes ahead, and running tasks finish on the old version.

## Use different engines for different agents

Each agent can have its own engine and model:

1. Select the agent in the left column.
2. Click **Model** at the top of the chat.
3. Pick an **Engine** and **Language Model**, then click **Save**.

That agent now ignores the top bar. **Restore policy default** removes its own setting. See [Language models and smart assignment](/videoagents/models/language-models#give-one-agent-its-own-model).

Each run in the Run Panel shows the engine and model it used.

## Differences between engines

| | claudecode | codex | kimicode | pi | opencode | grok | antigravity | agentics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Smart Assignment** in the model menu | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| Add a message to a running task (Ctrl+Enter) | Yes | No | No | Yes | Yes (OpenCode 2) | No | No | Yes |
| Model list comes from | Built-in list | Codex CLI model catalog | Kimi Code configuration | `pi --list-models` | `opencode models` | `grok models` | `agy models` | Generation Models page |
| Follows **Thinking effort** | Yes | Yes | No | Yes | Yes | Yes | Yes | Yes (not for local models) |

**Thinking effort** is set once for all engines under **⚙️ → Advanced → Agent Advanced Settings**. Its default, **Engine default**, leaves each program's own setting in place. See [Agent advanced settings](/videoagents/console/agent-advanced-settings).

When an engine can't take a message mid-task, Ctrl+Enter adds your message to that agent's queued task instead, or sends it as a new task, and the chat says so. See [Chat with agents](/videoagents/console/chat-with-agents).

### Running without approval prompts

The codex, pi and agentics engines run agents unattended. On the claudecode engine, agents ask before running shell commands unless you start VideoAgents from source in full-auto mode (`make run-auto`). That mode lets agents run any command, so use it only on a computer you trust. See [Security and LAN access](/videoagents/reference/security).

## Watch your engine usage

The **Resource Usage** panel on the right of the console can show the usage of the current engine: session and weekly windows for Claude Code, Codex and Kimi Code, and the OpenCode Go subscription. Turn the checks on under **⚙️ → Resource Usage**. With the pi engine selected, the panel shows Codex usage, because pi is often used with a ChatGPT subscription. See [Resource usage](/videoagents/console/resource-usage).

::: details Use a program from a custom location
When running from source, you can point VideoAgents at a specific executable with `CLAUDE_BIN`, `CODEX_BIN`, `PI_BIN` or `OPENCODE_BIN` in `.env`. See [Configuration](/videoagents/reference/configuration).
:::

## Troubleshooting

**The setup dialog keeps opening.**
The program is installed but VideoAgents can't find it, or it is not signed in. Run the sign-in command in a terminal on the same computer, then click **Re-check**.

**The install fails with a network or region message.**
The official download address could not be reached. Some services are only offered in certain countries and regions (Claude Code, for example). Check the connection under **⚙️ → Advanced → Network Check**, or pick another engine.

**The model menu is short or shows a "failed to read" note.**
The model list is read from the engine program. Sign in to the program and switch the engine again to reload it.

## Related

- [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine)
- [The built-in Agentics engine](/videoagents/models/agentics-engine)
- [Language models and smart assignment](/videoagents/models/language-models)
- [Network check](/videoagents/console/network-check)
- [Resource usage](/videoagents/console/resource-usage)
