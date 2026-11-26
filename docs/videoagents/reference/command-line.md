---
title: Command line
description: Commands for running VideoAgents from source, full-auto mode, packaging plugins, restoring project snapshots and a few diagnostics.
tags: [reference, source, advanced]
order: 40
---

# Command line

The desktop app needs no command line. When you run VideoAgents from source, these commands start the console, switch on full-auto mode, package plugins, restore project snapshots and help diagnose problems.

## Before you start

- Install VideoAgents from source: see [Run from source](/videoagents/getting-started/run-from-source).
- Run the commands from the repository folder, with its virtual environment active (`source .venv/bin/activate` on macOS and Linux). The `make` targets and `./run.sh` use `.venv` automatically when it exists.

## Start and stop

| Command | What it does |
| --- | --- |
| `videoagents-web` | Starts the console and everything it needs. Same as `python apps/web/server.py` or `make run`. |
| `videoagents-api` | Starts only the API service, without the console. Same as `python -m services.api` or `make api`. |
| `make run-auto` | Starts the console in full-auto mode (see below). |
| `./run.sh` | Same as `make run-auto`, for machines without `make`. |

`videoagents-web` starts:

| Part | Address | Notes |
| --- | --- | --- |
| Console | `http://127.0.0.1:8630` | Open it in your browser. API docs at `/api/v1/docs`. |
| API service | `http://127.0.0.1:8640` | Started and stopped by the console. The console forwards `/api/v1` to it. |
| Phone sketch page | port 8631 on all interfaces | Only the sketch page and its token-protected upload. |
| Motion graphics preview | port 8632 | Falls back to a free port when 8632 is busy. |

It prints a line for each when it starts. Change the console port with `VIDEOAGENTS_PORT` (the sketch and preview ports follow it) and the API port with `VIDEOAGENTS_API_PORT`; see [Configuration](/videoagents/reference/configuration).

Press **Ctrl+C** once to stop. VideoAgents shuts down the API service, the sketch page and the messaging connections, and stops running agent tasks. Those tasks show as stopped by the shutdown; send **▶ Continue** to the Workflow Orchestrator after the next start to pick up the work.

If an earlier run was killed and left its API service running, the next `videoagents-web` stops that leftover service and starts a fresh one. It never touches another program on the port; it prints a message instead.

Run `videoagents-api` on its own only when another client talks to the API. Alone, it listens on `VIDEOAGENTS_HOST`:`VIDEOAGENTS_PORT` (127.0.0.1:8630 by default), so don't start it next to `videoagents-web` with the same port.

## Full-auto mode

```bash
make run-auto
# or
./run.sh
```

Both set `VIDEOAGENTS_PERMISSION_MODE=bypassPermissions`, so agents on the Claude Code engine run shell commands without approval prompts, for pipelines that run unattended. The Codex CLI, Pi and Agentics engines already run unattended. The guard that stops the Workflow Orchestrator from running generation commands itself stays on.

::: warning
Agents can then run any command. Use it only on a trusted machine. The desktop app runs this way by default. See [Security and LAN access](/videoagents/reference/security#agent-permissions-and-safeguards).
:::

`./run.sh` checks that the dependencies are installed and picks `.venv/bin/python`, then `python`, then `python3`. Set `PYTHON=/path/to/python` to choose another.

This is a different thing from the **Full-auto mode** checkbox on **Workflow Preview**, which signs off gates for you in one project. See [Sign-off gates](/videoagents/concepts/sign-off-gates).

## Install and maintain

| Command | What it does |
| --- | --- |
| `make install` | Installs VideoAgents and its Python dependencies (`pip install -e .`). |
| `pip install -e ".[storage]"` | Adds the SDKs for object storage (Volcengine TOS, Alibaba OSS, Tencent COS, S3). |
| `make install-pi` | Installs the built-in Agentics engine. Needs Node.js 22.19 or newer on `PATH`. |
| `make install-dev` | Adds the test tools. |
| `make test` | Runs the test suite. |
| `python apps/web/check.py` | Checks that the console's files and API paths are intact. |

Desktop app development (`make desktop-dev`, `make desktop`) is covered in `docs/DEVELOPMENT.md` in the repository.

## Package a plugin

```bash
make plugin-package PLUGIN=path/to/my-plugin
# or
python3 scripts/package_plugin.py path/to/my-plugin --out-dir dist
```

Writes `dist/<name>-<version>.zip` for **⚙️ → Plugins → ⬆ Install plugin package (zip)**. See [Write a plugin](/videoagents/extend/write-a-plugin#package-it-as-a-zip).

## Restore a project snapshot

Before an agent starts, VideoAgents copies its project outside the data folder (from v1.0.43). There is no button to restore one yet; use the command line:

```bash
# list all snapshots
python -m services.runtime.project_snapshot list

# restore one into a new project folder
python -m services.runtime.project_snapshot restore \
  "<snapshot folder>" "<data folder>/projects/alices-restored"
```

- `list` prints one snapshot folder per line, named by date and time (`YYYYmmdd-HHMMSS`). Pass a folder after `list` if you moved the snapshots with `VIDEOAGENTS_SNAPSHOT_DIR`.
- `restore` never overwrites: it refuses if the target folder already exists. Restore into a new name, check it in the console, and then replace or delete the damaged project yourself.
- Snapshots contain the project folder only, not chats or settings.

## Diagnostics

| Command | What it shows |
| --- | --- |
| `python3 services/runtime/dagcheck.py --project <name>` | Checks the project's workflow file (`runs/dag.json`) for errors. |
| `python3 services/runtime/dagcheck.py --project <name> --frontier` | Lists the workflow steps that are ready to run now, and later episodes held back while the current one is unfinished. Useful when a project seems stuck. |
| `python3 modules/genmedia.py info` | The generation providers and models currently in effect. |
| `python3 modules/transcription.py doctor` | Whether local speech recognition (faster-whisper) works, and which Python it runs on. |

## Related

- [Run from source](/videoagents/getting-started/run-from-source)
- [Configuration](/videoagents/reference/configuration)
- [Security and LAN access](/videoagents/reference/security)
- [Troubleshooting](/videoagents/reference/troubleshooting)
