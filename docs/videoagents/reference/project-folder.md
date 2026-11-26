---
title: Project folder
description: Where every input, design file, image, video and run record lives in a project folder, and what VideoAgents keeps outside it.
tags: [reference, beginner]
order: 10
---

# Project folder

Every project is one folder of ordinary files. The world bible, the screenplay, every shot list, image, clip and QA report the crew makes is a file you can open, copy or back up. This page maps the folders, using the *alices* sample project as the example.

## Find the folder

Click the folder icon in the console's top bar (**Open the current project directory in Finder**) to open the current project's folder on the computer running VideoAgents.

Projects live in the `projects/` folder of VideoAgents' data folder:

| How you run VideoAgents | Projects folder |
| --- | --- |
| Desktop app on macOS | `~/Library/Application Support/@videoagents/desktop/data/projects/` |
| From source | `data/projects/` in the repository |

Each project's folder name is its project name, for example `projects/alices/`. You can move the whole data folder with `VIDEOAGENTS_DATA_DIR` (see [Configuration](/videoagents/reference/configuration)).

::: tip
Look and copy freely. Edit files by hand only when you know what reads them: agents and machine checks expect the formats they wrote, and the preview pages are usually the safer way to change things (**✏️ Edit** sends a change to the Reviser).
:::

## Top level

```text
alices/
├── brief.md          creative brief: main idea, design style, narrative rhythm
├── settings.json     project settings and project type
├── novel/            the source text
├── refs/             your reference files
├── story/            story analysis and per-episode screenplays
├── bible/            the world bible
├── directing/        per-episode storyboards, shot lists and whitebox plans
├── assets/           prompts, images, clips, audio
├── edit/             per-episode cuts, subtitles and final video
├── qa/               QA reports and defect tickets
├── publish/          per-platform release packages
├── code/             scripts agents wrote for this project
└── runs/             the workflow and every task's records
```

| File or folder | What's in it | Set or shown in |
| --- | --- | --- |
| `brief.md` | The main idea, design style and narrative rhythm | [Creative brief](/videoagents/console/creative-brief), [Video pacing](/videoagents/console/video-pacing) |
| `settings.json` | Output, episode length and shot duration, model limits, review strength, packaging, transitions, prompt skill and project skills. The project type and numbering are fixed when the project is created. | The **🎛️** menu: [Output settings](/videoagents/console/output-settings), [Model limits](/videoagents/console/model-limits), [Review settings](/videoagents/console/review-settings), [Project skills](/videoagents/console/project-skills) |
| `novel/` | The novel or script you imported, split by chapter | [Import and read the novel](/videoagents/world/novel) |

## refs/: your reference files

What you upload on the **Reference Files** page lands here, one folder per section. Agents check these before inventing their own designs.

| Folder | Holds |
| --- | --- |
| `style/` | Overall look: style, rendering, colour, composition |
| `characters/`, `creatures/`, `props/`, `scenes/` | Looks for characters, creatures and mounts, props and costumes, places |
| `models3d/` | GLB 3D models, uploaded or generated from reference images |
| `music/` | Music you want used |
| `video/` | Example videos for motion, camera work, pacing, transitions |
| `thumbnail/` | Thumbnail examples |
| `fonts/` | Your fonts (TTF, OTF, TTC), used first for fancy text, thumbnails, titles and subtitles |
| `text/` | Text material: settings, copy, scripts |
| `other/` | Anything else (PDF, spreadsheets, project files), used when a note or work order points to it |
| `NOTES.md`, `annotations.json` | Your per-file notes from the Reference Files page |
| `CREDITS.md` | Source, author and licence of images imported from the stock image search |

Some project types add folders here, such as `refs/audio/` for the narration of an audio-to-video project. See [Reference files](/videoagents/world/reference-files).

## story/: the story

| Path | Contents |
| --- | --- |
| `chapter_manifest.json`, `structured_story.json`, `structured_story/chNNN.json` | The novel parsed into structured chapters |
| `events.json`, `story_graph.json`, `story_timeline.json` | Events, relationships and timeline |
| `episode_plan.json` | How the story is split into episodes |
| `episodes/ep01/screenplay.md` | The episode's screenplay, with `dialogue.md` and `narration.md` where present |
| `episodes/ep01/script_breakdown.json` | Scenes, characters, lines, pacing and hooks: the data behind **Script Preview** |
| `episodes/ep01/hooks.json`, `pacing.json` | Hooks and pacing notes |

## bible/: the world bible

| Path | Contents |
| --- | --- |
| `world.json`, `timeline.json`, `geography.json`, `politics.json`, `economy.json`, `culture.json`, `religion.json`, `cultivation.json`, `dictionary.json` | The world's lore, one topic per file |
| `characters/index.json`, `characters/<CHAR-id>/` | The cast list and each character's files (appearance, personality, voice and more) |
| `creatures/`, `scenes/` | Creatures and mounts; places, each `scenes/<SCN-id>/` with its environment, architecture and lighting, and the 3D whitebox (`whitebox.json`) |
| `style.json`, `color_script.json` | Art style and colour script |
| `props.json`, `costumes.json` | Props and costumes |
| `changelog.md` | Every change to the bible |

See [World bible](/videoagents/world/world-bible).

## directing/: per-episode directing

Inside `directing/ep01/`:

| Path | Contents |
| --- | --- |
| `directing_plan.md` | The director's plan for the episode |
| `storyboard.json` | The storyboard draft (shown on **Storyboard**) |
| `shot_list.json` | Final shots and their generation groups |
| `continuity_plan.json` | Continuity between shots and groups |
| `shots/sh001/` | Each shot's `camera.json`, `composition.json` and `blocking.json` |
| `whitebox/` | 3D whitebox plans, decisions and Director's Console overrides |
| `shot_plates.json` | Which background plate each shot uses |

## assets/: images, clips and sound

| Path | Contents |
| --- | --- |
| `concepts/characters/<CHAR-id>/` | Character sheets (`sheet.png`), costume sheets and the prompts used |
| `concepts/scenes/<SCN-id>/` | Top-down layouts (`layout_top.png`), panoramas, plates |
| `concepts/creatures/`, `concepts/props/` | Creature and prop images |
| `storyboard/ep01/` | Storyboard sketches and the animatic (`animatic.mp4`) |
| `prompts/ep01/` | Image prompts per shot (`shNNN.json`) and video prompts per group (`grpNNN.json`) |
| `keyframes/ep01/` | Each group's reference image pack |
| `clips/ep01/` | Group videos: `grp001.mp4`, its `.meta.json` (model, provider, references) and last frame |
| `whitebox/ep01/<grp>/` | Exported whitebox camera videos (`camera.mp4`) |
| `sketches/` | Your phone sketches |
| `canvas/` | Image versions from the Canvas page, used only after you set one as final |
| `audio/voice/`, `narration/`, `bgm/`, `sfx/`, `ambience/` | Voices (`voice/casting.json` is the cast's voice list), narration, music, sound effects, ambience |
| `audio/library/music/` | The project's music library |
| `group_settings/` | Per-episode and per-group model overrides |

## edit/, qa/, publish/

| Path | Contents |
| --- | --- |
| `edit/ep01/` | `timeline.json`, `cut_v1.mp4`, `subtitles.srt` (timed to the cut), `subtitles_final.srt` (timed to the final video), `captions.json`, `intro_outro/`, `thumbnail.png` and `final.mp4` |
| `qa/reports/` | QA review reports |
| `qa/defects/` | Defect tickets, also listed on the **Defects** page |
| `publish/<platform>/package/<ep>/` | The release package for each platform and episode, with `seo.json`, `metadata.json` and `receipts/` beside them |

## code/ and runs/

| Path | Contents |
| --- | --- |
| `code/` | One-off scripts agents wrote for this project (batch jobs, checks) |
| `runs/dag.json` | The project's workflow and the state of every step (shown on **Workflow Preview**) |
| `runs/<task-id>/` | Each task's records: `result.json` (the agent's report), `eval.json` (score) and `meta.json` |
| `runs/revisions/` | Changes made by the Reviser |

See [Files, runs and versions](/videoagents/concepts/files-and-runs).

## Extra folders for project types and plugins

Some project types and plugins keep their working files in a folder of their own:

| Folder | Used by |
| --- | --- |
| `av/` | Audio to video |
| `mashup/` | Mashup |
| `digital-human/` | Digital human |
| `codevideo/` | Motion graphics |
| `derivative/` | The `derivative-fiction` plugin (chapters, outline, `bible-delta/` for new lore) |
| `fusion/` | The `fusion-fiction` plugin |

## What is not in the project folder

| What | Where |
| --- | --- |
| Chats with agents | `.videoagents/chats/<project>/` in the data folder |
| Run history, confirmations and the event log | `.videoagents/runtime.sqlite3` |
| Global settings and provider keys | `.videoagents/genconfig.json`, `.videoagents/state.json` and other files there |
| Plugins and skills you installed | `plugins/` and `skills/` in the data folder |
| Automatic snapshots taken before agents start | Outside the data folder; see [Command line](/videoagents/reference/command-line#restore-a-project-snapshot) |

So a project folder you zip and import elsewhere with **› Import Project…** brings all its files, but not its chat history and not your keys. See [Switch, import and export projects](/videoagents/console/projects).

## Good to know

- Folder and file names inside a project use ASCII letters, digits, `-` and `_`. Ids such as `CHAR-alice`, `SCN-courtroom`, `ep01`, `grp001` and `sh001` appear throughout.
- Agents can delete files and folders inside a project. VideoAgents blocks them from deleting a whole project folder or the data folder, and snapshots the project before an agent starts (from v1.0.43). See [Security and LAN access](/videoagents/reference/security#agent-permissions-and-safeguards).

## Related

- [Projects and the project folder](/videoagents/concepts/projects)
- [Files, runs and versions](/videoagents/concepts/files-and-runs)
- [Configuration](/videoagents/reference/configuration)
- [Switch, import and export projects](/videoagents/console/projects)
