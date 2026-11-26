---
title: Live events
description: Subscribe to the /api/v1/events stream to follow runs, agent replies, sign-off requests and settings changes as they happen, without polling.
tags: [api, advanced, reference]
order: 60
---

# Live events

`GET /api/v1/events` is a Server-Sent Events (SSE) stream. While you stay connected, VideoAgents pushes an event for every change the console shows live: runs starting and finishing, agents' text as it streams, chat messages, confirmations and sign-offs, and switches such as auto-run. The console and the preview pages use this same stream.

## Before you start

- Know the API's address and that it has no sign-in. See [Local API](/videoagents/extend/local-api).
- Any SSE client works: `curl -N`, a browser `EventSource`, or an SSE library in your language.

## Connect

```bash
curl -N http://127.0.0.1:8630/api/v1/events
```

```text
data: {"type":"hello"}

data: {"type":"run","run":{"id":"3f2a9c1b7d4e","agent":"00-orchestration/workflow-orchestrator","project":"alices","status":"running",...}}

: ping
```

- Each event is one `data:` line holding a JSON object, followed by a blank line. The `type` field says what it is.
- The first event after you connect is always `{"type":"hello"}`.
- When nothing has happened for 15 seconds, the server sends a `: ping` comment line to keep the connection open. SSE clients ignore it.
- You only get events that happen while you are connected; nothing is replayed. After you reconnect, read the current state with the normal `GET` endpoints (`/runs`, `/approvals`, chat history) before relying on events again. The console reconnects after 2 seconds when the stream drops.
- The stream carries events for all projects. Filter on `project` (or, for streaming text, on the run's project).

In a browser page served from the console's address:

```js
const es = new EventSource('/api/v1/events')
es.onmessage = (e) => {
  const ev = JSON.parse(e.data)
  if (ev.type === 'run') console.log(ev.run.agent, ev.run.status)
}
```

## Core events

| `type` | When | Fields |
| --- | --- | --- |
| `hello` | Right after you connect | — |
| `run` | A run is created or changes: queued, running, new activity or files, done, error | `run`: `id`, `agent`, `agent_name`, `project`, `status` (`queued`, `running`, `done`, `error`), `source`, `parent` (the run that dispatched it), `created`, `started`, `ended`, `engine`, `model`, `tokens`, `cost`, `turns`, `error`, `stopped`, `net_error`, `progress`, `activity` (last 8 lines), `files` (last 20), `message` (first 120 characters) |
| `chat` | A message is added to an agent's chat: your message, a command's reply, or the agent's final reply | `agent`, `project`, `role` (`user` or `assistant`), `text`, `ts`, and when relevant `run_id`, `source` (for example a message from Feishu), `status` |
| `text` | A piece of an agent's reply while it is being written | `run_id`, `agent`, `text` |
| `tool` | An agent uses a tool or gets a tool result | `run_id`, `agent`, `desc` (a one-line description), `kind` (`result` for results) |
| `progress` | The status line of a running task changes (thinking, running a tool, waiting) | `run_id`, `agent`, `note` (empty when cleared) |
| `file` | An agent writes or edits a file | `run_id`, `agent`, `path` |
| `confirm` | A question or sign-off needs your answer | `id`, `kind` (`sign` or `confirm`), `question`, `options`, `default`, `timeout`, `remaining` (seconds, none for sign-offs), `parent`, and when relevant `project`, `gate_id`, `checkpoint`, `gate_label` |
| `confirm_done` | A question or sign-off was answered, from the console, a phone channel or the API | `id`, `answer` |
| `watchdog` | Auto-run was turned on or off for a project | `project`, `enabled` |
| `full_auto` | Full-auto mode was turned on or off for a project | `project`, `enabled` |
| `revision` | The Reviser finished a revision | `project`, `id`, `status`, `target` |
| `project_skills` | A project's skill selection was saved | `project` |
| `prompt_skill` | A project's video prompt skill setting changed | `project`, `resolved`, `config` |

`text`, `tool`, `progress` and `file` events carry a `run_id` but no project. Keep the `run` events you receive to look up the project and agent of each run id.

The `answer` in `confirm_done` and the choices in `options` use the internal Chinese keys for the standard choices (for example 签字 for sign off, 暂缓 for hold). When you answer through the API you can send the English words; see [Local API](/videoagents/extend/local-api#answer-a-confirmation-or-sign-off).

## Page events

The preview pages listen for events about their own work. Most carry `project` and, where it applies, `ep` and `grp`:

| `type` | Used by |
| --- | --- |
| `board_sketch`, `board_animatic`, `dialogue_tts` | Storyboard board: new sketches, the animatic, dialogue voice lines |
| `sketchgen`, `group_settings`, `episode_settings`, `transition_design`, `shot_plate_upscale` | Storyboard Preview: sketch generation, per-group and per-episode model settings, transitions, plate upscaling |
| `post_job` | Post-production page jobs |
| `scene_panos`, `scene_world` | Scenes page: panoramas and world models |
| `director` | Director's Console |
| `canvas`, `refgen`, `refgen3d`, `offscreen_lines`, `codevideo_pack`, `codevideo_render` | Canvas, reference image and 3D model generation, off-screen lines, motion graphics renders |

Their fields follow what each page needs and may change between versions. Use the core events for integrations.

## Example: wait for a run and answer sign-offs

```python
import json, urllib.request

API = "http://127.0.0.1:8630/api/v1"
direct = urllib.request.build_opener(urllib.request.ProxyHandler({}))

with direct.open(API + "/events") as stream:
    for raw in stream:
        line = raw.decode().strip()
        if not line.startswith("data:"):
            continue                      # blank lines and ": ping"
        ev = json.loads(line[5:])
        if ev["type"] == "run" and ev["run"]["status"] in ("done", "error"):
            r = ev["run"]
            print(f'{r["project"]} · {r["agent"]}: {r["status"]}')
        elif ev["type"] == "confirm" and ev["kind"] == "sign":
            print("Sign-off waiting:", ev.get("gate_label") or ev["question"])
```

## Good to know

- Events are also written to the run-state database in the data folder, but there is no endpoint to read past events. Use `GET /runs`, `GET /approvals` and the chat history endpoint for the current state.
- Some status text inside events (activity lines, run errors) is written by the service in the console's interface language or in Chinese only. Use `status`, `kind`, `net_error` and similar fields, not the wording, in your code. A network failure, for example, sets `net_error: true` and its error text starts with 🔌.

## Related

- [Local API](/videoagents/extend/local-api)
- [Run panel](/videoagents/console/run-panel)
- [Sign-off gates](/videoagents/concepts/sign-off-gates)
- [Auto-run](/videoagents/console/auto-run)
