---
title: Install the desktop app
description: Download VideoAgents for Mac (Apple silicon) or Windows (x64), go through the first launch, sign in, set up FFmpeg and keep the app up to date.
tags: [beginner, macos, windows, how-to]
order: 20
---

# Install the desktop app

The desktop app is the easiest way to run VideoAgents. It is the same console as the web version, wrapped in an app that installs its own runtime, signs you in to your Agentics account and updates itself.

## Before you start

- A Mac with Apple silicon, or a Windows PC (x64). There is no build for Intel Macs; on other systems, [run from source](/videoagents/getting-started/run-from-source).
- Free disk space for your projects. Generated video takes room quickly; a single project can use several gigabytes.
- An internet connection for the first launch.

## Download and open the app

| Platform | Download |
| --- | --- |
| macOS (Apple silicon) | [VideoAgents.zip](https://s3.agentics.world/packages/video-agents/mac/VideoAgents.zip) |
| Windows (x64) | [VideoAgents.zip](https://s3.agentics.world/packages/video-agents/win/VideoAgents.zip) |

The same links are on the [download page](https://agentics.world/videoagents/#download). They always point to the latest release.

1. Download the zip for your system.
2. Unzip it.
3. Open **VideoAgents**.

## First launch

The first launch takes a few extra steps. You only go through them once.

### 1. Sign in or skip

A small window asks you to sign in to VideoAgents (this window is currently shown in Chinese only). Click the blue sign-in button to open the sign-in page in your browser. After you sign in and authorize, the app continues by itself. To skip, click the grey link under the button.

Signing in links the app to your Agentics account, so the built-in Agentics engine and the Agentics generation providers work right away, without API keys. If you skip, you can still use VideoAgents with your own engine and provider keys, and sign in later from **⚙️ → Account**.

### 2. Wait for the runtime download

The app package does not include Python. On first launch, the app downloads its own Python environment and shows a progress window. After that, the runtime is only downloaded again when an app update needs a newer one, or when you ask for it (see [Updates](#updates)).

### 3. Set up FFmpeg

When the main window opens, the app looks for FFmpeg, which VideoAgents uses for media inspection, audio and editing. If none is found, a dialog offers to install it (shown in Chinese only):

- The first button installs it automatically. On a Mac this runs Homebrew, so [Homebrew](https://brew.sh) must be installed first. On Windows the app downloads a portable FFmpeg build itself, with no administrator rights needed.
- The second button skips it for now. Everything else in VideoAgents keeps working, but some video processing may not.

You can also install FFmpeg yourself. On a Mac with Homebrew, run `brew install ffmpeg`.

### 4. Pick an engine and providers

The console opens. On a new desktop install, the top bar is set to the built-in **agentics** engine, and the image, video, voice and music providers are set to Agentics. If you signed in, you can start right away. Otherwise, continue with:

- [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine)
- [Set up providers](/videoagents/getting-started/set-up-providers)

## Your account

Open **⚙️ → Account** (desktop app only) to see the signed-in account ID and balance, sign in if you skipped it, or sign out. The app restarts after you sign in or out from here.

::: tip
Generation on the Agentics providers is billed to this account. Providers that use your own API keys bill you directly.
:::

## Updates

When you open the app and a new version is available, a dialog titled **VideoAgents Update Available** offers:

| Button | What it does |
| --- | --- |
| **Install Now** | Downloads and installs the update right away, then restarts the app. |
| **Install on Next Launch** | Downloads the update in the background while you keep working, and installs it the next time you open the app. |
| **Not Now** | Keeps the current version. |

If your version is older than the minimum supported version, the dialog is titled **VideoAgents Update Required**, and you must update to keep using the app. These dialogs follow the console's interface language.

The Python runtime is updated separately. To check for a newer runtime yourself, use the item in the app menu (on a Mac, the **VideoAgents** menu; on Windows, the first menu). This menu item is currently shown in Chinese only.

## Where your data lives

The desktop app keeps your projects, settings and chat histories in its own data folder on your computer. To open the current project's folder, click the folder button in the console's top bar. See [Projects and the project folder](/videoagents/concepts/projects).

## Troubleshooting

**The app doesn't find a CLI engine I installed.**
On a Mac, the app reads the `PATH` of your login shell and also looks in common install locations (Homebrew, `~/.local/bin` and others). Open a new terminal and check that the command runs there. Then switch the engine in the top bar again; the app checks it each time. See [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine).

**The FFmpeg install failed on Windows.**
The dialog offers to open the FFmpeg download page so you can install it by hand, or to skip. You can restart the app to try the automatic install again.

**Agentics features ask me to sign in.**
You skipped the sign-in on first launch. Sign in from **⚙️ → Account**.

## Related

- [What is VideoAgents](/videoagents/getting-started/what-is-videoagents)
- [Run from source](/videoagents/getting-started/run-from-source)
- [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine)
- [The built-in Agentics engine](/videoagents/models/agentics-engine)
