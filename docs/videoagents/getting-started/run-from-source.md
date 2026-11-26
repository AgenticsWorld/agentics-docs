---
title: Run from source
description: Clone the VideoAgents repository, install it in a Python virtual environment and open the console in your browser at 127.0.0.1:8630.
tags: [source, advanced, how-to]
order: 30
---

# Run from source

Run VideoAgents from its source code when you want the latest changes, a system the desktop app doesn't cover, or to work on VideoAgents itself. You get the same console in your browser.

## Before you start

You need:

- **Python 3.10 or newer.**
- **FFmpeg**, for media inspection, audio and editing. Install it with your system's package manager (for example `brew install ffmpeg` on a Mac).
- **At least one agent engine**: a CLI such as Claude Code or Codex CLI, or an OpenAI-compatible model for the built-in Agentics engine. See [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine).
- **Git**, to clone the repository.

Node.js is needed only for the built-in Agentics engine (see below), for installing some engine CLIs on Windows, and for desktop development.

## Install and start

```bash
git clone https://github.com/AgenticsWorld/VideoAgents.git
cd VideoAgents
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e .
python apps/web/check.py
python apps/web/server.py
```

What these steps do:

1. Clone the repository and create a virtual environment in `.venv`.
2. Install VideoAgents and its Python dependencies into it.
3. `apps/web/check.py` checks that the console's files are complete.
4. `apps/web/server.py` starts the console.

::: tip
On Windows, activate the virtual environment with `.venv\Scripts\activate` instead of `source .venv/bin/activate`.
:::

## Open the console

Open <http://127.0.0.1:8630> in your browser. The API documentation is at <http://127.0.0.1:8630/api/v1/docs>.

Then pick an engine in the top bar, add your providers and create a project:

1. [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine)
2. [Set up providers](/videoagents/getting-started/set-up-providers)
3. [Create your first project](/videoagents/getting-started/create-your-first-project)

## Start it again later

Each time, go to the repository folder, activate the virtual environment and start the console:

```bash
cd VideoAgents
source .venv/bin/activate
videoagents-web
```

`videoagents-web` is the same as `python apps/web/server.py`; the install adds it. Use `videoagents-api` when you need only the API service, without the console. See [Command line](/videoagents/reference/command-line) for all commands.

## Use the built-in Agentics engine from source

The built-in **agentics** engine is the Pi coding agent shipped with the app. In a source checkout it is not installed yet. Install it once with:

```bash
make install-pi
```

This needs Node.js 22.19 or newer on your `PATH`. Then, on **⚙️ → Generation Models → Language Model / Agentics**, choose a local or cloud OpenAI-compatible model. The **Agentics** channel there uses an account signed in to the desktop app, so it is not available in the browser version. See [The built-in Agentics engine](/videoagents/models/agentics-engine).

## Where your data lives

When you run from source, everything is under the repository's `data/` folder:

| Folder | What is in it |
| --- | --- |
| `data/projects/<name>/` | Each project: the novel, the world bible, prompts, generated media and run records |
| `data/.videoagents/` | Settings, chat histories and the service's own state |

Both can contain private data and are excluded from Git. See [Projects and the project folder](/videoagents/concepts/projects) and [Configuration](/videoagents/reference/configuration).

## Change the address or port

The console listens on `127.0.0.1:8630`, so only your own computer can open it. To use another port, set `VIDEOAGENTS_PORT` before you start, for example `VIDEOAGENTS_PORT=8640 videoagents-web`. The full list of settings is in `.env.example` and on the [Configuration](/videoagents/reference/configuration) page.

::: warning
VideoAgents is a local tool, not an Internet-facing service: agents read and write project files and can run local commands. Keep `VIDEOAGENTS_HOST=127.0.0.1` unless you really need LAN access, never expose the console to the public Internet, and read [Security and LAN access](/videoagents/reference/security) first.
:::

## Unattended runs

By default, agents on the `claude` engine need approval to run shell commands. For unattended pipelines, start the console in full-auto mode instead:

```bash
make run-auto
```

(`./run.sh` does the same without `make`.) Agents on the `claude` engine can then run any command without asking. The `codex`, `pi` and `agentics` engines already run unattended.

::: warning
In full-auto mode an agent can run any command on your computer. Use it only on a machine you trust.
:::

## Update

To get the latest version, pull the changes and reinstall:

```bash
cd VideoAgents
git pull
source .venv/bin/activate
python -m pip install -e .
```

Then restart the console.

## Related

- [Install the desktop app](/videoagents/getting-started/install-desktop-app)
- [Command line](/videoagents/reference/command-line)
- [Configuration](/videoagents/reference/configuration)
- [Security and LAN access](/videoagents/reference/security)
