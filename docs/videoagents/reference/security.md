---
title: Security and LAN access
description: The safe defaults VideoAgents ships with, what anyone who reaches the console can do, how to open it to your local network carefully, and how agents are kept in check.
tags: [security, reference, advanced]
order: 30
---

# Security and LAN access

VideoAgents is a production tool for one person on their own computer, not a web service for many users. It has no accounts or passwords, and its agents read and write files and run commands on the machine. This page explains the defaults that keep that safe, what changes when you open the console to other devices, and how to limit what agents can do.

## The defaults

| Setting | Default | Why |
| --- | --- | --- |
| Console address | `127.0.0.1` (this computer only) | Nothing else on the network can reach the console or its API. |
| Internal API service | Always `127.0.0.1` | Other devices only ever reach it through the console. |
| Engine install, sign-in and update | Only from this computer | Requests from other devices can't start installers or open terminals. |
| Claude usage probe | Off unless Claude Code is the top-bar engine or you turn it on | Reading usage means reading your local Claude sign-in. |
| Agent permission mode (Claude Code) | `acceptEdits` from source | Agents don't get blanket permission to run commands. The desktop app uses `bypassPermissions`; see [below](#agent-permissions-and-safeguards). |

## What anyone who reaches the console can do

There is no sign-in, so whoever can open the console's address, in a browser or with the [API](/videoagents/extend/local-api), can do everything you can:

- read every project, chat and generated file;
- read the provider API keys saved on the Generation Models page;
- change any setting, install plugins and skills;
- start agents, which run commands on your computer and spend your provider credits.

Keep that in mind before you change the address.

## Allow access from your local network

Running from source, you can let a tablet or another computer on the same network use the console.

1. Stop VideoAgents.
2. Start it listening on all network interfaces (or on your computer's LAN address):

   ```bash
   VIDEOAGENTS_HOST=0.0.0.0 videoagents-web
   ```

3. On the other device, open `http://<your computer's LAN address>:8630`.

On the other device, the console works as usual with these differences:

- **One-click install**, **Sign in** and **One-click update** for agent engines aren't offered. Do those on the computer running VideoAgents.
- Buttons that open a folder or a file picker open it on the computer running VideoAgents.

The desktop app always listens on `127.0.0.1` and can't be opened from other devices.

::: danger Only on a network you trust
- Never forward the port on your router or expose the console to the internet.
- Use it only on networks where you trust every device, not on public or shared Wi-Fi.
- Stop and restart without `VIDEOAGENTS_HOST` when you no longer need it.
- If you must reach it from elsewhere, put it behind a VPN or a gateway you control that adds encryption (TLS) and sign-in. VideoAgents provides neither.
:::

## Phone features that don't need LAN access

You don't have to open the console to your network to use VideoAgents from a phone:

- **Sketching on your phone.** A separate small server serves only the sketch page and its upload, on the console's port + 1 (8631 by default), on all interfaces. Each sketch link carries a random token and expires after 30 minutes. Set `VIDEOAGENTS_DRAW_PORT=0` to turn it off. See [Sketch on your phone](/videoagents/create/sketch-on-your-phone).
- **Mobile Messages.** Chat with the Workflow Orchestrator from Feishu, WeChat or WhatsApp, and answer sign-off cards in Feishu. See [Mobile messages](/videoagents/console/mobile-messages). Messages from these channels act on your projects like messages typed in the console, so keep the linked accounts to yourself.

## Agent permissions and safeguards

Agents run on an engine (Claude Code, Codex CLI, Agentics and others) that can edit files and run commands.

**Permission mode.** `VIDEOAGENTS_PERMISSION_MODE` sets the permission mode for the Claude Code engine:

| Value | Used by | Meaning |
| --- | --- | --- |
| `acceptEdits` | Running from source (`videoagents-web`, `make run`) | Agents edit files without asking but get no blanket permission to run commands. Recommended for untrusted input. |
| `bypassPermissions` | The desktop app, `make run-auto`, `./run.sh` | Agents run any command without asking. Use only on a trusted machine. |

The Codex CLI, Pi and Agentics engines always run unattended.

**Guards that stay on in every mode:**

- **Workflow guard.** The Workflow Orchestrator can't run generation commands itself; it has to dispatch the work to the agent responsible.
- **Delete guard** (from v1.0.43). The data folder, the settings folder inside it, the projects folder, every project folder, the install folder, the bundled Python, the snapshot folder and your home folder, plus every folder above them, are protected. Deleting one of them, or emptying it, is refused. Files and subfolders inside a project can still be deleted. On the Pi and Agentics engines every tool call is checked; on other engines the check is best effort, and on Windows there is no stand-in for `rm` yet.
- **Project snapshots** (from v1.0.43). Before an agent starts, the project is copied outside the data folder, at most every 30 minutes. See [Command line](/videoagents/reference/command-line#restore-a-project-snapshot) to restore one and [Configuration](/videoagents/reference/configuration#project-snapshots) for the settings.

## Content you didn't write

Treat novels, reference files, prompts and model output as untrusted: agents read them and act on what they say.

- **Plugins and skills** are instructions for agents. A plugin's `SOUL.md` files are copied word for word into agent instructions, and agents follow a skill's `SKILL.md`. Read every file before installing one from someone else. See [Install plugins](/videoagents/extend/install-plugins) and [Install and use skills](/videoagents/extend/skills).
- When you process projects from people you don't know, run VideoAgents under a separate user account on your computer, or in a container.

## Keys and private data

- Provider keys are saved in `.videoagents/genconfig.json` in the data folder; keys entered under **⚙️ → Resource Usage** are saved in `.videoagents/state.json`. Both are plain text. Keep them there or in a secret manager, not in projects or scripts.
- Don't share or commit the data folder, logs, chat histories or settings files. `data/` is excluded from Git in the repository.
- A project folder doesn't contain your keys or your chats, so you can zip and share a project; check its `refs/` and generated files for anything private first.

## Report a security problem

Don't open a public issue for an unpatched vulnerability or a leaked secret. Use GitHub's private vulnerability reporting on the [VideoAgents repository](https://github.com/AgenticsWorld/VideoAgents), or contact the AgenticsWorld organization owners on GitHub. Include the affected version, steps to reproduce and the impact, but no real API keys or private project data. Fixes go into the latest release.

## Related

- [Configuration](/videoagents/reference/configuration)
- [Local API](/videoagents/extend/local-api)
- [Mobile messages](/videoagents/console/mobile-messages)
- [Command line](/videoagents/reference/command-line)
