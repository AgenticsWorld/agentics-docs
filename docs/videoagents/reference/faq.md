---
title: FAQ
description: Short answers to common questions about running VideoAgents, costs, where files go, phones, languages, extending the crew and keeping work safe.
tags: [reference, beginner]
order: 60
---

# FAQ

Short answers to questions people ask often, with links to the full guides. For error messages and things that don't work, see [Troubleshooting](/videoagents/reference/troubleshooting).

## Getting started

**What do I need to run VideoAgents?**
The desktop app for macOS (Apple silicon) or Windows (x64), or Python 3.10 or newer to run it from source. You also need at least one [agent engine](/videoagents/getting-started/choose-an-agent-engine), accounts with the generation [providers](/videoagents/getting-started/set-up-providers) you want to use, and FFmpeg for media work. See [Install the desktop app](/videoagents/getting-started/install-desktop-app) or [Run from source](/videoagents/getting-started/run-from-source).

**Is it free?**
VideoAgents is open source under GPL-3.0. The engines and providers you connect are separate services with their own pricing. Agentics channels bill the Agentics account you sign in with in the desktop app; other providers bill you directly with your own keys. See [Cost control](/videoagents/models/cost-control).

**How much does a video cost?**
It depends on your models, resolution, episode length and how many times work is redone. VideoAgents shows engine usage and provider balances in the [Resource Usage](/videoagents/console/resource-usage) panel. To spend less, keep the draft resolution low until you approve clips, and leave the [retry count](/videoagents/console/chat-commands#retry-retry-count) at 0.

**Which engine should I choose?**
See [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine) and [Agent engines](/videoagents/models/agent-engines). You can also give individual agents a different engine or model with **Model** in the chat header.

**Can I try it without starting from scratch?**
Yes: import a complete sample project, such as *alices*. See [Open a sample project](/videoagents/getting-started/open-a-sample-project).

**How do I update?**
The desktop app checks for a new version when it starts and asks before updating. From source, pull the latest code and run `make install` again.

## Working with projects

**Where are my files?**
In the project's folder, as ordinary files. Click the folder icon in the top bar to open it. See [Project folder](/videoagents/reference/project-folder).

**Can I edit the files myself?**
Yes, but agents and checks expect the formats they wrote. The preview pages and **✏️ Edit** (which sends your change to the Reviser) are usually safer. See [The Reviser and revision notes](/videoagents/concepts/reviser).

**Why did the work stop?**
Usually it is waiting at a [sign-off gate](/videoagents/concepts/sign-off-gates) for your approval, or every task has finished and nobody asked the Workflow Orchestrator for more. Answer the sign-off card, send **▶ Continue**, or turn on [Auto-Run](/videoagents/console/auto-run) so the project picks up again after an idle period.

**Can it run without me?**
Auto-Run keeps dispatching work when the project is idle, but still stops at sign-off gates. The **Full-auto mode** checkbox on **Workflow Preview** also signs the gates for you. Both are per project.

**How do I stop everything?**
Click **⏹ Stop** in the Run Panel or send `/stop all`. If Auto-Run is on, also send `/auto off`, or it starts work again later. See [Chat commands](/videoagents/console/chat-commands).

**How do I move a project to another computer, or back it up?**
Zip the project folder and import it on the other computer with **› Import Project…** in the top bar's project menu (up to 20 GB). Chats and your provider keys are not part of the project folder and don't come along. See [Switch, import and export projects](/videoagents/console/projects).

**Can I undo something an agent deleted?**
Since v1.0.43, VideoAgents snapshots a project before an agent starts working on it, and blocks agents from deleting a whole project. Restore a snapshot from the command line: see [Command line](/videoagents/reference/command-line#restore-a-project-snapshot).

## Phones, languages and access

**Can I use VideoAgents from my phone?**
Link Feishu, WeChat or WhatsApp in [Mobile messages](/videoagents/console/mobile-messages) to chat with the Workflow Orchestrator and send [chat commands](/videoagents/console/chat-commands). In Feishu you can also answer sign-off cards and receive new images and videos. You can also [sketch storyboards on your phone](/videoagents/create/sketch-on-your-phone) by scanning a QR code.

**Can I open the console from another computer, or share it with my team?**
VideoAgents is built for one person and has no accounts or passwords. Running from source, you can open it to your local network, but everyone who can reach it has full control, including your provider keys. See [Security and LAN access](/videoagents/reference/security).

**Why do I see Chinese text in the English interface?**
The console is available in 12 languages, but some text comes from elsewhere: descriptions written into plugins and skills, some messages generated by the service, and a few strings without a translation yet. Agent replies follow the interface language you choose. See [Interface language](/videoagents/console/interface-language).

**Does it work offline?**
The console and your projects run on your computer, and some tools work locally, such as speech recognition for voice input and ComfyUI on your own GPU. Most agent engines and generation providers are online services, so you need an internet connection for them. See [ComfyUI](/videoagents/models/comfyui).

## Extending VideoAgents

**Can I add my own agents or workflows?**
Yes, with a plugin: a manifest, one role description per agent and an optional workflow, no code. See [Install plugins](/videoagents/extend/install-plugins) and [Write a plugin](/videoagents/extend/write-a-plugin).

**Can I teach an agent a technique?**
Yes, with a skill: a `SKILL.md` file for one agent. See [Install and use skills](/videoagents/extend/skills) and [Write a skill](/videoagents/extend/write-a-skill).

**Can I control VideoAgents from my own scripts?**
Yes, through the local HTTP API and its live event stream. See [Local API](/videoagents/extend/local-api) and [Live events](/videoagents/extend/live-events).

**Where do I report a bug?**
In the console, **Issues to Submit** at the bottom of the agent list collects problems agents found in VideoAgents itself, ready to send. You can also open an issue on [GitHub](https://github.com/AgenticsWorld/VideoAgents/issues). See [Issues to submit](/videoagents/console/issues-to-submit).

## Related

- [Troubleshooting](/videoagents/reference/troubleshooting)
- [Glossary](/videoagents/reference/glossary)
- [What is VideoAgents](/videoagents/getting-started/what-is-videoagents)
