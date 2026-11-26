---
title: Configuration
description: Where VideoAgents stores global and project settings, and the environment variables that change ports, folders, agent permissions and safety features.
tags: [reference, advanced, source]
order: 20
---

# Configuration

You change almost everything in the console: global settings in the **⚙️** menu, project settings in the **🎛️** menu. VideoAgents saves them as files in its data folder. A small set of environment variables, read once at startup, controls the rest: ports, folders, agent permissions and a few safety features.

## Where settings are saved

Everything lives in the data folder:

| How you run VideoAgents | Data folder |
| --- | --- |
| Desktop app on macOS | `~/Library/Application Support/@videoagents/desktop/data/` |
| From source | `data/` in the repository |

| File or folder | What it holds | Changed from |
| --- | --- | --- |
| `.videoagents/genconfig.json` | Generation providers, models and their API keys | **⚙️ → Generation Models** |
| `.videoagents/state.json` | Global switches: interface language, auto-run idle time and threshold, agent advanced settings, Resource Usage settings (including any keys entered there), enabled plugins, disabled skills | **⚙️ → Auto-Run**, **⚙️ → Resource Usage**, **⚙️ → Advanced → Agent Advanced Settings**, **⚙️ → Plugins**, and others |
| `.videoagents/agentmodels.json` | Per-agent engine and model choices | **Model** in the chat header, Smart Assignment |
| `.videoagents/feishu.json`, `wechat.json`, `whatsapp.json` | Mobile messaging links | **⚙️ → Advanced → Mobile Messages** |
| `.videoagents/chats/` | Chat histories, per project and agent | The chat panel |
| `.videoagents/runtime.sqlite3` | Runs, confirmations and the event log | The Run Panel |
| `projects/<name>/settings.json` | Project settings | The **🎛️** menu |
| `projects/<name>/brief.md` | Creative brief and narrative rhythm | **🎛️ → Creative Brief**, **Video Rhythm** |
| `plugins/`, `skills/` | Plugins and skills you installed | **⚙️ → Plugins**, an agent's **Skill** dialog |

::: warning
`genconfig.json` and `state.json` can contain API keys in plain text, and the chats and projects are your private work. Don't share the `.videoagents/` folder or commit `data/` to Git.
:::

Edit these files by hand only while VideoAgents is stopped, and keep a copy first. The console is the supported way to change them.

## Environment variables

VideoAgents doesn't read a `.env` file. Set variables in the shell that starts it. `.env.example` in the repository lists the common ones.

```bash
# macOS / Linux
VIDEOAGENTS_PORT=8650 videoagents-web
```

```powershell
# Windows PowerShell
$env:VIDEOAGENTS_PORT = "8650"; videoagents-web
```

The desktop app passes its environment on to its service, with the exceptions noted in the tables: it always listens on `127.0.0.1`, picks free ports unless you set them, and uses its own data folder unless you set `VIDEOAGENTS_DATA_DIR`.

### Network and ports

| Variable | Default | Effect |
| --- | --- | --- |
| `VIDEOAGENTS_HOST` | `127.0.0.1` | Address the console listens on. Read [Security and LAN access](/videoagents/reference/security) before changing it. |
| `VIDEOAGENTS_PORT` | `8630` | Console port. |
| `VIDEOAGENTS_WEB_HOST`, `VIDEOAGENTS_WEB_PORT` | The two above | Override host and port for the console only. The desktop app always uses `127.0.0.1` and a free port. |
| `VIDEOAGENTS_API_PORT` | `8640` | Port of the internal API service the console starts. It always listens on `127.0.0.1`. |
| `VIDEOAGENTS_API_URL` | — | Use an API service that is already running at this address instead of starting one. |
| `VIDEOAGENTS_START_API` | On, unless `VIDEOAGENTS_API_URL` is set | Whether the console starts its own API service. |
| `VIDEOAGENTS_DRAW_HOST`, `VIDEOAGENTS_DRAW_PORT` | `0.0.0.0`, console port + 1 | The page phones open to [sketch a storyboard](/videoagents/create/sketch-on-your-phone). `VIDEOAGENTS_DRAW_PORT=0` turns it off. |
| `VIDEOAGENTS_LAN_IP` | Detected | The computer's address used in the sketch QR code. Set it when the code shows a VPN or proxy address. |
| `VIDEOAGENTS_FILM_PORT` | Console port + 2 | The motion graphics code preview. `0` turns it off; a busy port falls back to a free one. |

### Folders

| Variable | Default | Effect |
| --- | --- | --- |
| `VIDEOAGENTS_DATA_DIR` | See the table above | The whole data folder: projects, settings, plugins, skills. The desktop app also honours it. |
| `VIDEOAGENTS_RUNTIME_DIR` | `<data folder>/.videoagents` | Settings, chats and run state only. |
| `VIDEOAGENTS_PLUGINS_DIR` | `<data folder>/plugins` | Where uploaded plugins go. |
| `VIDEOAGENTS_SKILLS_DIR` | `<data folder>/skills` | Where skills you load go. |

### Agents and engines

| Variable | Default | Effect |
| --- | --- | --- |
| `VIDEOAGENTS_PERMISSION_MODE` | `acceptEdits` from source; `bypassPermissions` in the desktop app and with `make run-auto` or `./run.sh` | Permission mode for agents on the Claude Code engine. `bypassPermissions` lets them run any command without asking. See [Security and LAN access](/videoagents/reference/security#agent-permissions-and-safeguards). |
| `CLAUDE_BIN`, `CODEX_BIN`, `KIMI_BIN`, `PI_BIN`, `OPENCODE_BIN`, `GROK_BIN`, `AGY_BIN` | Found on `PATH` | Path to an engine's command when it isn't on `PATH`. |
| `VIDEOAGENTS_NODE` | `node` on `PATH` | Node.js used to run the built-in Agentics engine from source. |
| `AGENTICS_CONTEXT_WINDOW` | `128000` | Context window declared for the Agentics engine's model. |
| `AGENTICS_MAX_OUTPUT_TOKENS` | `65536` (`8192` for a local model) | Output limit for the Agentics engine. Raise it only if the model server allows more. |
| `VIDEOAGENTS_NET_RETRY_LIMIT` | `0` | How many connection drops a Claude Code run may retry before it is stopped as a network failure. `0` stops at the first one. |
| `VIDEOAGENTS_ENABLE_CLAUDE_USAGE_PROBE` | `false` | Lets VideoAgents read your local Claude sign-in to show usage in Resource Usage. It also turns on when Claude Code is the top-bar engine or when you tick it in **⚙️ → Resource Usage**. |

### Project snapshots

Before an agent starts, VideoAgents copies the project outside the data folder so you can recover from accidental deletes (from v1.0.43).

| Variable | Default | Effect |
| --- | --- | --- |
| `VIDEOAGENTS_SNAPSHOT` | On | `0` turns snapshots off. |
| `VIDEOAGENTS_SNAPSHOT_DIR` | macOS: `~/Library/Application Support/VideoAgents-Snapshots`; Windows: `%LOCALAPPDATA%\VideoAgents-Snapshots`; others: `~/.local/share/videoagents-snapshots` | Where snapshots go. It must be on the same drive as the projects, or snapshots are skipped. |
| `VIDEOAGENTS_SNAPSHOT_INTERVAL` | `1800` | Seconds before the same project is snapshotted again. |
| `VIDEOAGENTS_SNAPSHOT_KEEP` | `3` | Newest snapshots kept per project, plus the newest of each day… |
| `VIDEOAGENTS_SNAPSHOT_DAYS` | `7` | …within this many days. Older ones are removed. |

See [Command line](/videoagents/reference/command-line#restore-a-project-snapshot) to restore one.

## Related

- [Security and LAN access](/videoagents/reference/security)
- [Command line](/videoagents/reference/command-line)
- [Project folder](/videoagents/reference/project-folder)
- [Run from source](/videoagents/getting-started/run-from-source)
