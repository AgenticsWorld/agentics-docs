---
title: Write a skill
description: Write a SKILL.md that teaches one agent one craft, give it a name and description agents can act on, then install, test and share it.
tags: [skills, advanced, how-to]
order: 40
---

# Write a skill

A skill is a folder with a `SKILL.md` file that tells one agent how to do one kind of task well. Write it as instructions to the agent: when the skill applies, what it needs, the steps, and the checks before it hands the work over. This page covers the format, how agents decide to use a skill, and how to test and share it.

## Before you start

- Pick the agent the skill is for. A skill belongs to one agent; its id is `<agent id>/<skill folder>`, for example `08-video-gen/prompt/kling4-pe`.
- Read a built-in skill for the same agent. Open the agent's **Skill** dialog and click **View text** (see [Install and use skills](/videoagents/extend/skills)).
- Read the agent's `SOUL.md` (the **SOUL.md** button in the chat header, shown when Debug mode is on in **⚙️ → Advanced → Agent Advanced Settings**) so the skill fits its job and doesn't contradict it.

## Anatomy of a skill

```text
my-skill/
├── SKILL.md            # required
└── references/         # optional: longer material SKILL.md points to
    └── examples.md
```

- **Folder name.** The skill's name on disk. Letters, digits, `_` and `-` only.
- **`SKILL.md`.** Starts with a short YAML frontmatter, followed by the instructions in Markdown.
- **Other files.** Anything the instructions refer to, such as worked examples or reference tables. Built-in skills keep longer material in `references/` and point to it from `SKILL.md`, so the agent reads it only when needed.

### Frontmatter

```markdown
---
name: my-skill
description: Write establishing-shot prompts for night exteriors. Use when a
  group opens a new scene at night outdoors; skip interiors and daytime scenes.
---

# Night exteriors

…instructions…
```

VideoAgents reads two fields:

| Field | Used for |
| --- | --- |
| `name` | The name shown in the Skill and Project skills dialogs. When you upload a single `.md` file, it also becomes the folder name. Without it, the folder name is shown. |
| `description` | The one-line summary in both dialogs (the first 400 characters), and what agents read to decide whether the skill fits a task. Multi-line values (`\|` or `>`) are fine. |

Without frontmatter, VideoAgents takes the first quoted line (`> …`) or the first line of the file as the description. Write the frontmatter anyway; it's what agents rely on.

## How agents use a skill

There are two ways a skill gets used:

- **You point the agent at it.** Clicking the skill in the **Skill** dialog inserts its path into your message, and the agent reads it for that task.
- **The project turns it on.** For skills ticked in **🎛️ → Project skills**, every task the agent starts includes the list of ticked skills with their paths and descriptions. The agent first judges from the description, the task and any condition whether the skill applies. If it does, it reads the whole `SKILL.md` before starting the work, follows its prerequisites and steps, and applies its checks before delivering. If it doesn't, it skips it and says why. The Workflow Orchestrator also sees the ticked skills and assigns them to the matching tasks.

For each ticked skill, the agent records whether it was running, completed, skipped, failed or unverified, for each episode and group it worked on. These reports appear in **🎛️ → Project skills → Execution records**, with the version of the skill file used (its SHA-256). You don't have to add any of this to your skill; VideoAgents tells the agent to do it.

Skills you write are **generic**: they have no built-in trigger, so the description is the trigger.

## Write a good skill

- **Make the description decide.** Say what the skill does, when to use it and when not to. "Use when… skip when…" works well. A vague description makes the agent skip the skill or apply it everywhere.
- **List what it needs.** Name the inputs (files in the project, settings, earlier products). The agent reports missing inputs instead of guessing.
- **Give steps in order**, with concrete formats and paths. Use paths inside the project folder (`story/`, `directing/`, `assets/…`, see [Project folder](/videoagents/reference/project-folder)) rather than absolute paths on your computer.
- **End with checks** the agent can run before delivering, and say what to put in its report.
- **Stay inside the agent's job.** Agents are told that a skill must not change frozen dialogue, the project's structure or what each agent is responsible for. A skill that asks for that will be ignored in those parts.
- **Keep the main file short.** Move long examples and tables into `references/` and say when to read them.

## Install and test it

1. Zip the skill folder, or use the `SKILL.md` on its own if it has no other files. Name the zip after the skill if `SKILL.md` sits at the zip's root.
2. Pick the agent, open **Skill**, click **Load skill** and choose the file. The skill appears with the **Uploaded** tag.
3. Click **View text** to check it was read correctly.
4. Test it by hand: click the card to insert its path, add a task, and send.
5. Test automatic use: tick it in **🎛️ → Project skills**, save, and give the agent a task that should trigger it. Check **Execution records** for completed or the reason it was skipped.

To change an installed skill, delete it in the **Skill** dialog and load the new version. Uploading over an existing skill with the same name is refused.

## Share it

- Share the zip. Others install it with **Load skill** on the same agent.
- To ship a skill with a plugin, put it in the plugin agent's folder: `agents/<category>/<name>/skills/<skill>/SKILL.md`. Skills of enabled plugin agents are listed like built-in ones. Plugin packages can only contain `.md`, `.json` and `.yaml` files (see [Write a plugin](/videoagents/extend/write-a-plugin)).
- The [VideoAgents-Skills](https://github.com/AgenticsWorld/VideoAgents-Skills) repository collects published skills.

::: tip
Pick a name no built-in skill of that agent uses. If a later version of VideoAgents adds a built-in skill with the same name, yours stops being used and shows as not in effect.
:::

## Related

- [Install and use skills](/videoagents/extend/skills)
- [Project skills](/videoagents/console/project-skills)
- [Write a plugin](/videoagents/extend/write-a-plugin)
- [Video prompts and prompt skills](/videoagents/create/video-prompts)
