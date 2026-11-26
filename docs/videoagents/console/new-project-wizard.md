---
title: New project wizard
description: Create a project step by step - pick the project type, add the story or source files, and set the pacing, model limits and output before production starts.
tags: [beginner, how-to]
order: 45
---

# New project wizard

The **New Project** wizard creates a project and sets it up in one pass: you pick the type, give it its text and files, and choose the first settings. When you click **Create**, the Workflow Orchestrator starts preparing the project.

## Open the wizard

Click the project name in the top bar, then **＋ New Project…**.

## Step 1: Project type

Pick what you are making. The box under the cards says what the type does and what you need to provide.

![Step 1 of the wizard with the Film & series card selected and the More types shown](/images/videoagents/console/new-project-wizard-type.webp)

| Type | Makes | You provide | Steps |
| --- | --- | --- | --- |
| **🎬 Film & series** | A multi-episode video adapted from a novel, with sign-off points along the way | The novel text (can be added later) | 5 |
| **🧑‍💼 Digital human** | Lip-synced talking-head video from photos and a recording | The audio and one photo per speaker | 3 |
| **🖥️ Motion graphics** | A short animated film written as a web page, rendered frame by frame, without a video model | A topic or script and a style | 4 |
| **🎙️ Audio to video** (under **⋯ More**) | AI pictures laid over a narration recording, which stays the soundtrack | The narration audio and its script | 4 |
| **✂️ Mashup** (under **⋯ More**) | A video cut from your own footage library, matched sentence by sentence to a script | The script and a ready footage library | 3 |

The number of steps changes with the type. See [Choose a project type](/videoagents/project-types/choose-a-project-type) for the details of each.

## Step 2: Basic info

![Step 2 of the wizard for a Film & series project, with Project name, Story text, Content Positioning and Visual Style](/images/videoagents/console/new-project-wizard-basic.webp)

| Field | Types | What to enter |
| --- | --- | --- |
| **Project name** | All | Letters and digits only, for example `MyNovel01`. It becomes the name of the project folder. |
| **Story text** / **Script** / **Topic / script** | All | Film: paste the novel, or leave it empty and put the text in the project's `novel/` folder later. Audio to video: the script that matches the narration word for word. Mashup: the narration script. Motion graphics: what the film is about. Digital human: optional script with times and speakers (without one, the audio is transcribed). |
| **Content Positioning** | All | Genre and tone, audience, what to keep or drop. For digital human this field is **Speaker mapping**: say which photo belongs to which speaker. |
| **Visual Style** | Film, Audio to video | A style prompt. Click **🎨 Choose from Style Library** to start from a preset. See [Creative brief](/videoagents/console/creative-brief). |
| **Narration audio** / **Master audio** | Audio to video, Mashup, Digital human | The recording (`.mp3`, `.wav`, `.flac`, `.m4a`, `.aac`, `.ogg`). Optional for mashup: without it, a voice-over is made from the script. |
| **Voice source** | Digital human | **Original recording** or **Cloned voices**. With cloned voices you upload a 5–30 second sample per speaker and write the script as `Speaker: line`; the TTS provider must support voice cloning. |
| **Portraits** | Digital human | One photo per speaker |
| **Footage Library** | Mashup | Tick one or more ready libraries. Prepare them first under **⚙️ → Advanced → Footage Library**. |
| **Assets (optional)** | Motion graphics | Logos, photos, fonts, recordings, music |

Each file can be up to 100 MB. Files are uploaded into the project's reference files after it is created: recordings into **Narration audio**, voice samples into **Cloned voices**, portraits into **Characters**, and motion graphics assets by file type (images into **Other**, fonts into **Font**, audio into **Audio**, video into **Video**). Anything you skip can be added later on the **Reference Files** page.

## Step 3 (Film & series): Video Rhythm

Narrative rhythm, episode and shot length, long takes and transitions. The fields are the same as in **🎛️ → Video Rhythm**; see [Video pacing](/videoagents/console/video-pacing). New projects start with 300-second episodes, shots of 0.5–15 seconds and the **Classic** transition mode.

## Step 3 (Motion graphics): Style

Pick one of the styles. **Full styles** come with a complete style specification and a demo film; **Light styles · OPUSCAR 98** are only a style prompt, and the director fills in the rest. The style sets the look, type, motion and sound; the story and shots follow your topic. Choosing a style also sets the frame rate in the last step. See [Motion graphics](/videoagents/project-types/motion-graphics).

## Step 4 (Film & series, Audio to video): Model Limits

How long one generated video group may be and how many reference images, videos and audio clips it may use. The wizard picks the preset that matches the video model active on the **Generation Models** page, and warns you when your choice differs from it. See [Model limits](/videoagents/console/model-limits).

![Step 4 of the wizard with the Seedance 2.5 preset selected](/images/videoagents/console/new-project-wizard-model.webp)

For Film & series, **Whitebox** in the next step starts on only when the **Seedance 2.5** preset is selected; the other presets turn it off. You can change it in the next step.

## Last step: Output Settings

Aspect ratio, output language and resolution, plus the film-only switches (whitebox, background plates, NPC staging, narration, dialogue voice, sound-picture split). The fields are the same as in **🎛️ → Output Settings**; see [Output settings](/videoagents/console/output-settings).

![The last step of the wizard with output aspect ratio, language, resolutions and the film switches](/images/videoagents/console/new-project-wizard-output.webp)

For new projects: 16:9, the output language follows the interface language, draft 480p, final cut 1080p, narration off.

Motion graphics projects instead get **Target length (s)** (5–600, default 45; 30–60 seconds works best), **Frame rate** (24, 25, 30 or 60 fps), **Narration**, **Subtitles**, **Review storyboard first** (all on by default) and **Music** (code composition by default, a music model, or a track from the project music library).

## Create the project

Click **Create** on the last step. On the steps between **Basic info** and the last step, you can also click **Skip wizard and create**: the remaining steps keep their current values (the defaults if you did not touch them) and the project is created at once.

When the project is created:

1. Your files are uploaded (the button shows **Uploading 1/3…**).
2. The console switches to the new project and opens the **Workflow Orchestrator**.
3. The Workflow Orchestrator prepares the project. For Film & series it creates the folders, cleans up the novel text and splits it into chapters, then reminds you to add reference images on the **Reference Files** page. For the other types it checks your inputs, reports what is missing, and starts when you reply.

Your content positioning, visual style and narrative rhythm are given to every agent as the top creative premise.

## Defaults you can change later

Everything set in the wizard can be changed later in the **🎛️** menu. A few things are set only at creation:

- **Review Settings** are not in the wizard. New projects start with every review at 0 (no reviews, no quality judge). See [Review settings](/videoagents/console/review-settings).
- Intro, outro and next-episode teaser start off; switch them on the **Post-production** page.
- Publishing channels are chosen later on the **Final Release** page.

## Troubleshooting

**"Project names may only contain letters and digits".** Remove spaces, dashes and other characters from the name.

**"The project was created, but these files failed to upload".** The project exists; add the listed files on the **Reference Files** page.

**"Please choose a style".** Motion graphics needs a style in step 3.

## Related

- [Create your first project](/videoagents/getting-started/create-your-first-project)
- [Choose a project type](/videoagents/project-types/choose-a-project-type)
- [Switch, import and export projects](/videoagents/console/projects)
- [Reference files](/videoagents/world/reference-files)
