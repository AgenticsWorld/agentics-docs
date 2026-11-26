---
title: Troubleshooting
description: Fixes for common problems with agent engines, stuck or failing runs, provider keys and content rejections, FFmpeg, ports, phone access, plugins and skills.
tags: [troubleshooting, reference]
order: 70
---

# Troubleshooting

Find the symptom, then follow the fix. Most problems are an engine that isn't ready, a network that doesn't reach the engine, or a provider that refuses a request. For general questions, see the [FAQ](/videoagents/reference/faq).

## Agent engines

**A dialog says "Command … not found".**
The engine selected in the top bar isn't installed. Click **One-click install** to run its official install script in the background. If that fails or the script asks questions, click **Install in a terminal**. Then click **Re-check**. See [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine).

**A dialog says "… is not signed in".**
Click **Sign in**. A terminal opens with the engine's own login command; finish signing in in your browser, and the dialog closes when the login is detected. VideoAgents never sees your tokens.

**The install and sign-in buttons are missing.**
They are only offered on the computer running VideoAgents. If you opened the console from another device, install and sign in on that computer, or run the install command shown in the dialog there yourself.

**"Built-in Agentics engine not found".**
Running from source, install it once with `make install-pi` (needs Node.js 22.19 or newer). The desktop app includes it.

**"Sign in to get started" for the Agentics engine.**
The Agentics engine uses your VideoAgents account. Sign in in the desktop app, or switch it to a local or cloud model under **⚙️ → Generation Models → Language Model**. See [The built-in Agentics engine](/videoagents/models/agentics-engine).

**"A new version of … is available", and One-click update fails.**
Some installs (for example through Homebrew) can't update themselves. Click **Update in a terminal** and follow what it asks, or update with the tool you installed it with. On Windows an engine can't be updated while a task is using it; wait for the task or stop it. **Not now** hides the dialog for that version for 24 hours.

## Runs and agents

**A run fails with a 🔌 network message.**
The engine lost its connection to its API (connection reset or timed out). VideoAgents stops such runs at once instead of letting them retry for minutes. Check your proxy or VPN: many only cover the browser, not command-line tools. **⚙️ → Advanced → Network Check** shows whether the command-line environment reaches sites such as Claude and Google. Then send **▶ Continue** to the Workflow Orchestrator. See [Network check](/videoagents/console/network-check).

**An agent keeps failing on long conversations, or the request is too large.**
Its session has grown too long to resume. Send `/clear` to that agent; the next message starts a fresh session that reads the project files again. See [Chat commands](/videoagents/console/chat-commands#clear-reset-a-session).

**Tasks keep running, or start again after I stopped them.**
**⏹ Stop** and `/stop all` stop the current tasks only. With Auto-Run on, the project is picked up again after the idle time. Send `/auto off` (or `/auto off all`) as well. See [Auto-run](/videoagents/console/auto-run).

**After a restart, the tasks that were running show as errors.**
Quitting VideoAgents stops running tasks. Send **▶ Continue** to the Workflow Orchestrator to pick up the work.

**A run on Claude Code or Grok ends with exit code 1 after many steps.**
It probably hit the turn limit (250 by default), which cuts the engine off without a way to resume. Ask for smaller batches, or raise **Turn limit** in **⚙️ → Advanced → Agent Advanced Settings**. Files already written are kept. See [Agent advanced settings](/videoagents/console/agent-advanced-settings).

**A run on the Agentics engine fails because its reply was cut off.**
The reply reached the output limit. Ask the agent to write in smaller pieces, or, if your model server allows it, start VideoAgents with a higher `AGENTICS_MAX_OUTPUT_TOKENS` (see [Configuration](/videoagents/reference/configuration#agents-and-engines)).

**Nothing is happening.**
- Look for a sign-off or confirmation card waiting for you. The workflow stops at every [sign-off gate](/videoagents/concepts/sign-off-gates).
- With **Multi-episode parallel** off (the default), only one episode is worked on at a time. A later episode waits until the current one is finished, including its sign-offs.
- Open **Workflow Preview** to see which steps are blocked. From source, `python3 services/runtime/dagcheck.py --project <name> --frontier` lists the steps that are ready to run.
- Send **▶ Continue**, or turn on Auto-Run.

**Agents redo work again and again, or never retry.**
That is the [retry count](/videoagents/console/chat-commands#retry-retry-count), 0–10, default 0. At 0, the first failure is handed to you.

## Providers and generation

**Generation fails with an authentication error (401 or similar).**
The provider's key is missing, wrong, or for another region or site. Open **⚙️ → Generation Models**, check the key on the provider's tab and use its **Verify** or **Test** button where there is one. Make sure the provider is the active channel for that kind of media. See [Set up providers](/videoagents/getting-started/set-up-providers).

**A provider rejects an image, video or prompt for its content.**
Turn on [NSFW mode](/videoagents/models/nsfw-mode) and pick fallback models. With **Auto-switch after moderation rejection** on (the default), a request the main provider rejects for content is sent once to the fallback, without using up your retry count. A language model's refusal switches to the fallback language model on the task's next attempt.

**Volcano Engine Ark rejects a reference image with a face (PrivacyInformation).**
The image isn't in the Virtual Portrait Library. Enrol it there; images sent as library assets are accepted. Don't repaint the face. See [Virtual portrait library](/videoagents/models/virtual-avatar-library).

**Video generation with reference videos fails on Volcano Engine Ark or MiniMax.**
These providers need reference videos at a public address. Set up a storage provider under **⚙️ → Storage & Image Libraries** so local files are uploaded and passed as temporary links. See [Object storage and stock libraries](/videoagents/models/object-storage).

**The reference video count or length is over the limit.**
The storyboard preview marks groups over their model's limits but doesn't remove anything for you. Remove reference videos in the group card's **🎬 Video** dialog, or pick a model with higher limits. See [Model limits](/videoagents/console/model-limits).

## FFmpeg and local tools

**Editing, audio or video steps fail because FFmpeg is missing.**
Install FFmpeg. On Windows, the desktop app offers to download it when it can't find it. On macOS, run `brew install ffmpeg` (the desktop app can also install it through Homebrew). When running from source, install it with your system's package manager and restart VideoAgents.

**Voice input or transcription doesn't work.**
From source, run `python3 modules/transcription.py doctor`. It reports whether faster-whisper can be loaded and which Python VideoAgents runs on. See [Voice input](/videoagents/console/voice-input).

## Console and service

**The console doesn't start because the port is in use.**
Another program, often a second VideoAgents, is using port 8630. Stop it, or start with another port: `VIDEOAGENTS_PORT=8650 videoagents-web`. If port 8640 is taken by an unrelated program, set `VIDEOAGENTS_API_PORT`. A leftover VideoAgents API from an earlier run is replaced automatically. The desktop app chooses free ports itself. See [Command line](/videoagents/reference/command-line).

**The console stops updating.**
The connection dot in the top bar shows whether the live connection is up; hover it for details. The console reconnects on its own every 2 seconds while the service is running. If it doesn't come back, the service has stopped: restart the desktop app or `videoagents-web`, then reload the page.

**My phone can't open the sketch page from the QR code.**
- The phone must be on the same network as the computer.
- If a VPN or proxy in TUN mode is active, the QR code may contain its address. Start VideoAgents with `VIDEOAGENTS_LAN_IP` set to the computer's LAN address.
- Allow incoming connections on the console's port + 1 (8631 by default) in your firewall.
- Use the `http://` link exactly as shown; the browser must not switch it to `https://`.
- Links expire after 30 minutes. Open a new one.

See [Sketch on your phone](/videoagents/create/sketch-on-your-phone).

**Messages from Feishu, WeChat or WhatsApp get no reply.**
Check the channel's status and last error in **⚙️ → Advanced → Mobile Messages**, and send the bot a message first so it can reply. See [Mobile messages](/videoagents/console/mobile-messages).

## Plugins, skills and projects

**A plugin shows as invalid.**
Fix the reasons listed in red on its card. See [Install plugins](/videoagents/extend/install-plugins#troubleshooting).

**Skills I loaded disappeared after a desktop update.**
Before v1.0.41 they were stored inside the app. Load them again; they now stay in the data folder. See [Install and use skills](/videoagents/extend/skills).

**An agent deleted files I needed.**
Restore the project's latest snapshot into a new folder. See [Command line](/videoagents/reference/command-line#restore-a-project-snapshot).

**Importing a project fails.**
The zip may be at most 20 GB. If a project with the same name exists, the imported one gets `-2`, `-3` and so on added to its name. See [Switch, import and export projects](/videoagents/console/projects).

## Still stuck?

**Issues to Submit** at the bottom of the agent list collects problems agents found in VideoAgents itself; check it and send them. You can also search or open an issue on [GitHub](https://github.com/AgenticsWorld/VideoAgents/issues). Include your version (shown at the bottom of the agent list), what you did and what you saw, but never API keys. See [Issues to submit](/videoagents/console/issues-to-submit).

## Related

- [FAQ](/videoagents/reference/faq)
- [Chat commands](/videoagents/console/chat-commands)
- [Configuration](/videoagents/reference/configuration)
- [Security and LAN access](/videoagents/reference/security)
