---
title: Write a plugin
description: Build your own plugin from plugin.json, one SOUL.md per agent and an optional workflow file, then test it and package it as a zip.
tags: [plugins, advanced, reference]
order: 20
---

# Write a plugin

A plugin extends the crew with new agents and, if you want, a workflow of their own, without changing VideoAgents itself. You write it entirely in text: a JSON manifest, a role description for each agent and a YAML workflow. This page lists the format and the rules VideoAgents checks.

## Before you start

- Read one of the plugins that ship with VideoAgents. `plugins/derivative-fiction/` in the [VideoAgents repository](https://github.com/AgenticsWorld/VideoAgents) is the reference example; `plugins/README.md` is the authoring guide it follows.
- Read `agents/_TEMPLATE.md`, the outline every agent's `SOUL.md` follows, and `agents/WORKFLOW.md` §10, which defines how plugins are scheduled.
- Know how to [install and enable a plugin](/videoagents/extend/install-plugins).

## Folder layout

```text
my-plugin/
├── plugin.json                         # manifest (required)
├── README.md                           # what the plugin does (recommended)
├── agents/
│   └── <NN-category>/<name>/SOUL.md    # one folder per agent (required)
└── workflows/<name>.yaml               # the plugin's workflow (optional)
```

A plugin holds no program code. Scripts an agent writes while it works go into the project's `code/` folder, as for the built-in agents.

## plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "One sentence on what the team does.",
  "categories": { "19-my-team": "My team" },
  "agents": [
    { "id": "19-my-team/planner" },
    { "id": "19-my-team/writer" },
    { "id": "11-qa/my-qa", "stateless": true }
  ],
  "workflows": ["workflows/main.yaml"],
  "outputs_ns": "mine",
  "requires": {
    "artifacts": ["bible/world.json", "bible/characters/index.json"],
    "plugins": []
  }
}
```

| Field | Required | Rules and effect |
| --- | --- | --- |
| `name` | Yes | Must equal the folder name. Letters, digits, `_` and `-`, starting with a letter or digit, up to 60 characters. |
| `version` | No | Shown on the plugin's card. |
| `description` | No | Shown on the card and added to the instructions of the Workflow Orchestrator and of every agent in the plugin. |
| `categories` | No | New agent groups: folder name → display name in the agent list. Folder names use letters, digits, `_` and `-`. |
| `agents` | Yes | The team. Each `id` has two parts, `<category>/<name>`, and needs `agents/<id>/SOUL.md`. Optional flags: `stateless` and `dispatcher` (see below). |
| `workflows` | No | Paths of workflow files relative to the plugin folder. Each must end in `.yaml` or `.yml`, exist, and not contain `..`. |
| `outputs_ns` | No | The plugin's folder inside each project: its agents write their results to `<project>/<outputs_ns>/`. |
| `requires.artifacts` | No | Project files the plugin needs before it can start. The orchestrator checks them and runs the missing main-workflow steps first. |
| `requires.plugins` | No | Other plugins this one needs. |

### Agent ids and categories

- Agent ids are unique across VideoAgents. An id already used by a built-in agent or by another plugin is refused, and the whole plugin is then not registered.
- Built-in categories use the numbers 00–12 and 15–18; the official plugins use 13 and 14. Start your own categories at 19. If you reuse a built-in category name, the built-in display name wins.
- An agent can also live in a built-in category, for example a reviewer in `11-qa/`. Agents under `11-qa/` already run stateless.
- `"stateless": true` means every work order is self-contained: the agent starts a fresh session for each one, and several can run at once. Use it for reviewers and per-item workers.
- `"dispatcher": true` gives the agent the right to dispatch work to other agents. Most plugins don't need it; the Workflow Orchestrator dispatches plugin work.

## SOUL.md

Each agent's `SOUL.md` is its job description, and VideoAgents copies it word for word into the agent's instructions. Follow the outline in `agents/_TEMPLATE.md`; the orchestrator relies on these sections to route work:

| Section | What to write |
| --- | --- |
| Who I am | Category, folder, pipeline stage and granularity (whole book, per episode, per shot, per character), mission in one sentence. |
| Responsibilities | Three to six concrete duties, each starting with a verb. |
| Not my job | At least two things the agent doesn't do, each naming the agent that does. |
| Inputs and Outputs | Tables of sources and products with their paths and formats. |
| Work orders | The fields the agent reads and a realistic example order. |
| Definition of done | Machine checks and the scoring rubric with its pass mark. |
| Validation and rework | Who accepts the work and what happens when it fails. |
| Upstream and downstream | Who feeds the agent and who uses its output. |

You don't need to repeat the plugin's identity: VideoAgents adds the plugin name and description, the plugin folder, its workflow files and the rule to write inside `outputs_ns` to every member's instructions automatically.

An agent in a plugin can also have skills: put them in `agents/<category>/<name>/skills/<skill>/SKILL.md`. See [Write a skill](/videoagents/extend/write-a-skill).

## The workflow file

A plugin workflow has the same shape as the main workflow, `agents/workflow.yaml`: phases containing tasks, with `depends_on`, `for_each` fan-out, `validation` (machine checks, a rubric and QA reviewers) and gates. When the user asks for the plugin's work, the orchestrator adds these steps to the project's workflow and tracks them with the main ones.

```yaml
version: 1
plugin: my-plugin
defaults:
  eval_threshold: 80
  max_retries: 3
  on_fail: escalate_human

phases:
  - id: mp0
    name: Plan
    tasks:
      - id: mp0-plan
        agent: 19-my-team/planner
        outputs: [mine/plan.json]
        validation:
          auto: [schema]
          rubric: creative_v1
      - { id: gm0, gate: true, human: true, checkpoint: MPH1-Plan sign-off,
          depends_on: [mp0-plan] }
```

Rules:

- **Use your own id prefix** for tasks and gates (`derivative-fiction` uses `nv…` and `gn…`). Don't use the main workflow's `p0-`–`p11-` and `g0`–`g10`.
- **Human sign-offs** are gates with `human: true` and a `checkpoint` label. They work like the built-in [sign-off gates](/videoagents/concepts/sign-off-gates).
- **Pausing unrelated main steps.** An optional top-level `main_dag_on_start.skip` lists main-workflow steps your plugin makes pointless (`p4-*` matches every step starting with `p4-`, gates are listed by exact id). When the plugin's steps are added, these are set to skipped, but only if none of them has started; if one has, nothing is skipped. Skipped steps resume when the user later asks for that work. List the gates inside those stages too, or they wait forever. See `plugins/derivative-fiction/workflows/novel.yaml` for a complete list.

## Rules for well-behaved plugins

1. **Write only inside your own folder** (`outputs_ns`). Run records in `runs/` and defect tickets in `qa/defects/` are the exception.
2. **Never edit the world bible.** New lore goes into `<outputs_ns>/bible-delta/`. Moving it into `bible/` goes through the Memory Bible agent and the user's sign-off.
3. **Reuse what exists.** Score with the existing rubrics (such as `writing_v1`, `creative_v1`, `analysis_v1`) and use the built-in `11-qa/*` reviewers where they fit. Add your own QA agent only for a new kind of check.
4. **No executable code.** Only JSON, YAML and Markdown.

## Test your plugin

1. Copy the plugin folder into the data folder's `plugins/` folder (see [Install plugins](/videoagents/extend/install-plugins#by-copying-the-folder)).
2. Within about 30 seconds, open **⚙️ → Plugins**. If the card says **invalid**, fix the reasons shown in red. The checks are:
   - `plugin.json` exists, is a JSON object, and its `name` matches the folder;
   - every category name and agent id is well formed, and every agent has a `SOUL.md`;
   - at least one agent is listed;
   - every workflow file exists and ends in `.yaml` or `.yml`;
   - no agent id collides with a built-in agent or another plugin.
3. Click **Enable**. Chat with each new agent in the agent list to check it understands its role.
4. Ask the Workflow Orchestrator to run the plugin's work on a test project and follow it on **Workflow Preview**.

## Package it as a zip

From a source checkout, run:

```bash
make plugin-package PLUGIN=path/to/my-plugin
# or
python3 scripts/package_plugin.py path/to/my-plugin --out-dir dist
```

This writes `dist/<name>-<version>.zip` and `dist/<name>-<version>.json` (name, version, SHA-256, size and file list). The script:

- checks the manifest the way the installer does (name, agent ids, `SOUL.md` files, workflow paths) and stops on the first problem;
- wraps the files in a folder named after the plugin, so unzipping gives a folder you can copy straight into `plugins/`;
- packs only `.json`, `.yaml`, `.yml` and `.md` files, skipping other files with a note;
- stops with an error if it finds scripts or binaries (`.py`, `.sh`, `.js`, `.exe` and similar);
- leaves out `.DS_Store`, `__pycache__`, `.git` and similar clutter, and builds the same zip from the same files every time.

Users install the zip with **⬆ Install plugin package (zip)**. Increase `version` when you publish a new release; users delete the old version before installing the new one.

## Related

- [Install plugins](/videoagents/extend/install-plugins)
- [Write a skill](/videoagents/extend/write-a-skill)
- [Workflow](/videoagents/concepts/workflow)
- [The agent crew](/videoagents/concepts/agent-crew)
- [Project folder](/videoagents/reference/project-folder)
