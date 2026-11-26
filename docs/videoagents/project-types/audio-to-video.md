---
title: Audio to video
description: Put AI-generated pictures on a narration recording. Your audio stays the final soundtrack, untouched, and the pictures are cut to fit its measured length.
tags: [audio-to-video, how-to, video-generation]
order: 20
---

# Audio to video

Audio to video puts AI-generated pictures on a narration recording, such as a history story, an explainer or a podcast. Your recording is the finished video's soundtrack exactly as you gave it: it is not transcoded, trimmed or normalised. The pictures are planned and cut to fit its measured length.

This is the film workflow turned around. In a film project the pictures come first and the narration is fitted to them. Here the audio is fixed and the pictures adapt.

## Before you start

- An agent engine that is signed in, and image and video providers set up on **⚙️ → Generation Models**.
- The narration recording (`.mp3`, `.wav`, `.flac`, `.m4a`, `.aac` or `.ogg`, up to 100 MB in the wizard).
- The script, matching the recording word for word. It is used to line the pictures up with what is being said. The workflow does not transcribe the audio for you.

## Create an audio-to-video project

1. Click the project name in the top bar, then **＋ New Project…**.
2. **Step 1/4 · Project type:** click **More**, then **Audio to video**. Click **Next**.
3. **Step 2/4 · Basic info:**

   | Field | What to enter | Saved to |
   | --- | --- | --- |
   | **Project name** | Letters and digits only | — |
   | **Narration audio** | Click **Choose files** and pick the recording | `refs/audio/` |
   | **Script** | Paste the script that matches the recording | `refs/text/transcript.txt` |
   | **Content Positioning** | Subject and period, tone, target audience, what to show or leave out | `brief.md` |
   | **Visual Style** | The look of the pictures; click **🎨 Choose from Style Library** to start from a preset | `brief.md` |

   ![The Basic info step for an audio-to-video project](/images/videoagents/project-types/audio-to-video-basic.webp)

4. **Step 3/4 · Model Limits:** match the limits to your video model, or leave the defaults. See [Model limits](/videoagents/console/model-limits).
5. **Step 4/4 · Output Settings:** aspect ratio, output language, draft resolution and final-cut resolution. Click **Create**.

If you skip the recording now, upload it later on the **🖼 Reference Files** page under **Narration audio**.

## Start the work

After the project is created, the Workflow Orchestrator checks the recording and the script and tells you what is missing. When everything is there, reply in the chat that it can start. It plans the workflow, measures and aligns the audio, and sends you the timeline for the first sign-off.

## How the pictures fit the audio

1. The recording's length is measured exactly, and its pauses are found.
2. The script is split into sentences, each sentence's timing is estimated from its length, and the boundaries are snapped to the nearest pause.
3. The timeline is cut into picture groups of whole seconds, each 4 to 14 seconds long, preferring paragraph breaks as cut points. The last group takes up the leftover fraction of a second.
4. Each group is generated as a silent video clip of exactly that many seconds, so no picture ever drifts away from the voice.
5. The clips are joined and your recording is laid on as the soundtrack without re-encoding.

Subtitles come almost for free: the timeline already holds each sentence's timing, so the subtitle file is written straight from it.

## Workflow and sign-offs

| Stage | What happens | Your sign-off |
| --- | --- | --- |
| av0 Audio intake | Measures the audio, finds pauses, aligns the script | **AVH1** timeline baseline, the most important one |
| av1 Setting and art | Light research into the period (clothing, buildings, objects, customs), art style, concept art, costumes, props, scenes | **AVH2** style and period research |
| av2 Picture plan | The Visual Scripter decides what each passage shows; the Timeline Planner fixes how long each group lasts; continuity is planned | **AVH3** picture plan and storyboard |
| av3 Generation | Prompt, images and silent video for each group, plus character consistency checks | **AVH4** generated pictures |
| av4 Editing | The cut, subtitles, title and thumbnail | — |
| av5 Final review | Audio-picture sync, visuals, world consistency, content safety, copyright; loudness is measured and reported only | **AVH5** final video |

The team is the five agents in the **Audio to video** group of the left panel (Audio Ingest, Transcript Aligner, Era Researcher, Visual Scripter, Timeline Planner) and the AV Sync QA reviewer, plus the built-in art, scene, video generation, editing and QA agents.

Even though no full world bible is built, art style, costumes, props and scenes are still created: the video prompts must quote them, and generation is refused without them.

## Where to see the results

The results are written into the usual project folders, so the existing pages show them:

| What | Page |
| --- | --- |
| Period research and setting | **🌍 Worldview Preview** |
| Characters and scenes | **👤 Character Preview**, **🏔 Scene Preview** |
| Picture script, storyboard, prompts and images per group | **🎦 Storyboard Preview** |
| Group clips and the finished video | **🎞️ Final Release** |
| Progress and cost | **🧭 Workflow Preview** (stages av0–av5) |

The finished video is `edit/ep01/final.mp4`.

## Good to know

- **Make a copy before you start.** The workflow writes directly into the project's `bible/`, `story/` and `directing/` folders and keeps no versions of its own. Use **🎛️ → Version History** to copy the project first. See [Copy and delete projects](/videoagents/console/project-versions).
- **Loudness is left alone.** The audio review only measures loudness and peaks and reports them; it does not change your recording.
- **Intro, outro and teaser are off.** An intro would re-encode the audio and push the narration later.
- **Publishing re-encodes.** Platform versions made at publishing are transcoded to each platform's format, so the untouched-audio promise ends at `edit/ep01/final.mp4`.
- **One recording, one project.** Each project makes one video (`ep01`). Background music, ambience and multiple episodes are not supported.

::: tip
For a first try, use a recording of 60 to 90 seconds (about 6 to 8 picture groups). It shows you the real cost and where the workflow gets stuck before you commit a full-length piece.
:::

::: warning
Every picture group generates images and a video clip with your providers, and each call is charged.
:::

## Related

- [Choose a project type](/videoagents/project-types/choose-a-project-type)
- [Mashup](/videoagents/project-types/mashup)
- [Sign-off gates](/videoagents/concepts/sign-off-gates)
- [Video models](/videoagents/models/video-models)
- [Reference files](/videoagents/world/reference-files)
