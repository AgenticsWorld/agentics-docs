---
title: Glossary
description: Short definitions of the terms you meet in the VideoAgents console and docs, from animatic to world model, each linked to the guide that explains it.
tags: [reference, beginner]
order: 50
---

# Glossary

Terms you meet in the console and in these docs, in alphabetical order. UI names are written as the English interface shows them.

## A–C

| Term | Meaning |
| --- | --- |
| **Agent** | One member of the AI crew with one job, such as the screenwriter, the Prompt Agent or a QA reviewer. Each has a role description (`SOUL.md`) and appears in the agent list on the left of the console. See [The agent crew](/videoagents/concepts/agent-crew). |
| **Agent engine** | The command-line AI tool that runs agents: the built-in Agentics engine, Claude Code, Codex CLI, Kimi Code, Pi, OpenCode, Grok Build or Antigravity CLI. Picked in the top bar, or per agent. See [Agent engines](/videoagents/models/agent-engines). |
| **Agentics engine** | The engine that comes with VideoAgents (a bundled Pi Coding Agent). It uses your signed-in Agentics account or a model endpoint you configure. See [The built-in Agentics engine](/videoagents/models/agentics-engine). |
| **Animatic** | A moving version of an episode's storyboard: the sketches timed to the shots, with dialogue voices. Made on the **Storyboard** page before any video is generated. See [Animatic](/videoagents/create/animatic). |
| **Auto-Run** | A per-project switch (**🤖** in the Run Panel). When the project has been idle for a while and work can still be done, VideoAgents wakes the Workflow Orchestrator to continue. See [Auto-run](/videoagents/console/auto-run). |
| **Background extras (NPCs)** | Unnamed passers-by and foreground objects added to a scene's shots to give the space depth. Decided per scene. See [Background extras](/videoagents/create/background-extras). |
| **Background plate** | An image of the empty set for a shot, made from the 3D whitebox camera, used as the scene reference when the group video is generated. See [Background plates](/videoagents/create/background-plates). |
| **Bible** | Short for world bible. |
| **Canvas** | A page for editing one image: circle what to change, describe it, keep every version and set one as final. See [Canvas: edit an image](/videoagents/world/image-canvas). |
| **Casting** | Which voice each character uses, kept for the whole project in `assets/audio/voice/casting.json`. See [Voices](/videoagents/world/voices). |
| **Creative Brief** | The project's main idea and design style, set in **🎛️ → Creative Brief** and saved in `brief.md`. See [Creative brief](/videoagents/console/creative-brief). |

## D–L

| Term | Meaning |
| --- | --- |
| **DAG** | The project's workflow as a graph of steps and their dependencies, kept in `runs/dag.json` and shown on **Workflow Preview**. See [Workflow](/videoagents/concepts/workflow). |
| **Defect** | A problem a QA review found, filed as a ticket in `qa/defects/` and listed on the **Defects** page. See [QA reviews and defects](/videoagents/create/qa-reviews). |
| **Director's Console** | A workbench on an episode's 3D whitebox where you write revision notes per object and shot group and compare versions. See [Director's Console](/videoagents/create/directors-console). |
| **Draft resolution** | The resolution videos are generated at while you iterate and review. The final video is made by upscaling the approved clips, not by generating them again. Set in **🎛️ → Output Settings**. See [Output settings](/videoagents/console/output-settings). |
| **Episode** | One instalment of the work, numbered `ep01`, `ep02`… Most production steps run per episode. |
| **Execution records** | The list of which project skills agents applied, skipped or failed, and why. In **🎛️ → Project skills**. See [Project skills](/videoagents/console/project-skills). |
| **Fancy Text** | Stylized on-screen captions (titles, name cards, keywords) designed by the Caption Agent and burned into a separate edition of the video. See [Editing, subtitles and packaging](/videoagents/create/editing). |
| **Footage Library** | A page that splits your own videos or YouTube and Bilibili links into shot clips with transcripts, for mashup projects and references. See [Footage library](/videoagents/project-types/footage-library). |
| **Full-auto mode** | A per-project checkbox on **Workflow Preview** that signs off gates automatically, so the project runs without stopping for you. Gates' checks still apply. See [Sign-off gates](/videoagents/concepts/sign-off-gates). |
| **Generation group** | A run of consecutive shots that is generated as one video clip (`grp001`, `grp002`…). Shown as **Group** in the console. See [Image and video generation](/videoagents/create/image-and-video-generation). |
| **Generation Models** | The **⚙️** page where you choose providers and models and enter their keys. See [Set up providers](/videoagents/getting-started/set-up-providers). |
| **H1, H2, H3A…** | Names of the [sign-off gates](/videoagents/concepts/sign-off-gates), from H1 (world bible summary) to H5 (publishing). |
| **Long take** | A shot that continues from the previous group's last frame or last seconds, so the action runs on without a cut. See [Long takes and continuity](/videoagents/create/long-takes). |

## M–R

| Term | Meaning |
| --- | --- |
| **Model Limits** | Per-project caps on a generation group's length and its number of reference images, videos and audio clips, matched to the video model. See [Model limits](/videoagents/console/model-limits). |
| **Moderation model** | A model that judges whether a language model's reply was a refusal, used by NSFW mode. Set on **Generation Models** under **🛡 Moderation model**. See [NSFW mode](/videoagents/models/nsfw-mode). |
| **NSFW mode** | Fallback language, image and video models for content the main providers refuse. Flagged work goes to the fallbacks, and a content rejection is resubmitted once on the fallback. In **⚙️ → Advanced → NSFW mode**. See [NSFW mode](/videoagents/models/nsfw-mode). |
| **Panorama** | A 360° image of a scene from one spot, used to make consistent backgrounds. See [360° panoramas](/videoagents/world/panoramas). |
| **Plate** | See *Background plate*. |
| **Plugin** | A package that adds a team of agents and a workflow, such as `derivative-fiction`. See [Install plugins](/videoagents/extend/install-plugins). |
| **Producer** | Another name some buttons and messages use for the **Workflow Orchestrator**. |
| **Project** | One work and the world it is built in, kept in one folder. See [Projects and the project folder](/videoagents/concepts/projects). |
| **Project skills** | The skills agents apply automatically in this project, chosen in **🎛️ → Project skills**. See [Project skills](/videoagents/console/project-skills). |
| **Project type** | What kind of work a project makes: film and series, audio to video, digital human, mashup or motion graphics. Chosen when you create the project. See [Choose a project type](/videoagents/project-types/choose-a-project-type). |
| **Prompt skill** | The video prompt skill the Prompt Agent applies, matched to the video model (for example `sd25-pe` for Seedance 2.5). Frozen when you sign off the shot list (H3A). See [Video prompts and prompt skills](/videoagents/create/video-prompts). |
| **Provider** | A service that generates images, video, voices, music or sound, such as Volcano Engine, Fal or ElevenLabs. See [Set up providers](/videoagents/getting-started/set-up-providers). |
| **Reference files** | Images, music, videos, fonts and documents you upload to guide the crew, kept in `refs/`. See [Reference files](/videoagents/world/reference-files). |
| **Retry count** | How many times agents may redo failed work on their own, 0–10, default 0 (no automatic retries). In **⚙️ → Advanced → Agent Advanced Settings**, or with `/retry`. See [Chat commands](/videoagents/console/chat-commands). |
| **Reviser** | The agent that carries out the changes you send with **✏️ Edit** on the preview pages, then records what it changed. See [The Reviser and revision notes](/videoagents/concepts/reviser). |
| **Run** | One task an agent works on, from queued to done or error, shown in the Run Panel. See [Run panel](/videoagents/console/run-panel). |
| **Run Panel** | The right-hand column of the console listing running and recent tasks, with **⏹ Stop**, **▶ Continue** and **🤖**. See [Run panel](/videoagents/console/run-panel). |

## S–Z

| Term | Meaning |
| --- | --- |
| **Scene** | A place in the world bible (`SCN-…`), with its look, layout and lighting. Also a scene of the screenplay. See [Scenes and top-down layouts](/videoagents/world/scenes). |
| **Scene links** | Match cuts and hand-offs between the end of one scene and the start of the next, planned in the screenplay. See [Scene links](/videoagents/create/scene-links). |
| **Shot** | One camera shot (`sh001`…), with its own camera, composition and blocking. Shots are grouped into generation groups. |
| **Shot list** | The final list of an episode's shots and generation groups, in `directing/<ep>/shot_list.json`. |
| **Sign-off gate** | A point where the workflow stops until you approve, for example the episode 1 screenplay (H3) or the shot list (H3A). See [Sign-off gates](/videoagents/concepts/sign-off-gates). |
| **Skill** | A `SKILL.md` pack that teaches one agent one craft. See [Install and use skills](/videoagents/extend/skills). |
| **Smart Assignment** | A language model setting that picks a stronger or lighter model per agent by how demanding its work is. See [Language models and smart assignment](/videoagents/models/language-models). |
| **SOUL.md** | An agent's role description: its job, its limits, inputs, outputs and definition of done. |
| **Storyboard** | The per-scene, per-shot table with pencil sketches that you sign off before shots are planned in detail (H3S). See [Storyboard board](/videoagents/create/storyboard). |
| **Storyboard Preview** | The page showing each generation group's prompt, references and video. See [Storyboard preview](/videoagents/create/storyboard-preview). |
| **Top-down layout** | A floor plan of a scene seen from above, used to keep positions and directions consistent. See [Scenes and top-down layouts](/videoagents/world/scenes). |
| **Virtual Portrait Library** | Volcano Engine Ark's private library for character images. Images enrolled there are accepted as face references that would otherwise be rejected. See [Virtual portrait library](/videoagents/models/virtual-avatar-library). |
| **Whitebox** | A simple 3D model of a scene with stand-in figures, used to plan camera and positions before generating video; its camera videos become references for video generation. Signed off at H3W. See [3D whitebox previs](/videoagents/create/whitebox-previs). |
| **Work order** | The task an agent receives: an id, the agent, the instruction, inputs, expected output and acceptance criteria. See [Files, runs and versions](/videoagents/concepts/files-and-runs). |
| **Workflow Orchestrator** | The agent that plans and dispatches the whole crew's work, checks results and asks you for sign-offs. Some buttons and messages call it the Producer. Talk to it to move a project forward. See [Chat with agents](/videoagents/console/chat-with-agents). |
| **World bible** | The project's canonical lore: world, history, places, characters, creatures, props and style, kept in `bible/`. Everything the crew makes follows it. See [World bible](/videoagents/world/world-bible). |
| **World model** | An explorable 3D world generated from a scene's panorama (World Labs Marble or HunyuanWorld), from which plates can be captured. See [World models](/videoagents/world/world-models). |

## Related

- [What is VideoAgents](/videoagents/getting-started/what-is-videoagents)
- [Workflow](/videoagents/concepts/workflow)
- [Project folder](/videoagents/reference/project-folder)
- [FAQ](/videoagents/reference/faq)
