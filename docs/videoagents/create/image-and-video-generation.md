---
title: Image and video generation
description: How each generation group becomes a video clip, which references go with it, how drafts are checked, signed off and upscaled, and how to redo a group.
tags: [video-generation, image-generation, sign-off, cost, how-to]
order: 70
---

# Image and video generation

After you sign off an episode's video prompts, VideoAgents generates the episode group by group: it gathers reference images, makes one multi-shot clip per generation group with the video model, checks it, and later upscales the approved clips to the final resolution. This page explains each step and what you can steer.

## Before you start

- A video provider and model are set up on **⚙️ → Generation Models**. See [Video models](/videoagents/models/video-models) and [Image models](/videoagents/models/image-models).
- The episode's video prompts are signed off. See [Video prompts and prompt skills](/videoagents/create/video-prompts).

::: warning
Every group video is a paid call to the video provider, and so is every regeneration. Higher resolutions cost more. Check your provider's prices and see [Cost control](/videoagents/models/cost-control).
:::

## What happens for each group

| Step | Agent | Result |
| --- | --- | --- |
| 1. Anchor pack | **Image Generation Agent** | The group's reference images. Existing concept art (character sheets, costume sheets, scenes, props, creatures) is reused first; new images are made only for real gaps |
| 2. Consistency check | **Character Consistency Agent** | Newly made character images are compared with the character sheets (face similarity and gender first). Reused concept art needs no check |
| 3. Group video | **Video Generation Agent** | One call per group: the prompt plus its reference images, reference videos and voice samples. Sound (dialogue, effects, ambience) is generated with the picture |
| 4. Fixes, only when needed | **Lip Sync Agent**, **Animation Agent** | Repairs for specific defects, such as an audio offset or a broken movement |
| 5. Upscale | **Upscale Agent** | The approved clip at the final resolution |

With **Post-production dubbing** on, an extra step replaces the dialogue in each clip with synthesized speech. See [Dialogue, voices and narration](/videoagents/create/dialogue).

Files land in the project folder:

| Path | Contents |
| --- | --- |
| `assets/keyframes/<ep>/<group>/` | Newly generated anchor images, with a `meta.json` saying where each anchor came from |
| `assets/clips/<ep>/<group>.mp4` | The group clip |
| `assets/clips/<ep>/<group>.meta.json` | Generation settings and the detected cut points |
| `assets/clips/<ep>/<group>.last_frame.png` | The clip's last frame, used for previews, transitions and long takes |

Group videos also appear on the **🎦 Storyboard Preview** page under **🎬 Group video**, and a new clip is pushed to Feishu when you have linked it. See [Mobile messages](/videoagents/console/mobile-messages).

## Generation order

With **Long take** off (the default), each group stands on its own and groups can be generated in parallel. With **Long take** on, groups in the same scene build on the previous group's last frame or tail, so they are generated in order. See [Long takes and continuity](/videoagents/create/long-takes).

## Reference images

The images a group receives are listed under **🖼 Reference images** on its card, in the order the prompt cites them (`[Image 1]`, `[Image 2]`…). To add your own:

1. Click **🖼 Image** on the group card.
2. Pick a category: **👤 Characters**, **🏔 Scenes**, **🗡 Props**, **🐎 Creatures** or **🖊 Sketches** (storyboard shot sketches). **🎨 Sketch Reference** lets you draw on your phone, and **⬆ Upload** takes a file from your computer.
3. Click an image (double-click to zoom), then click **➕ Add to references**.

![The Add Reference Image dialog for grp002: seven current references at the top, the category buttons, the character list and two character sheets, one already in the references](/images/videoagents/create/image-and-video-generation-references.webp)

The counter in the title (for example **References 7/30**) shows how many references the group's model accepts. Images you added carry a 🗑 button on the card; images the pipeline added can only be changed through **✏️ Edit**. Changes take effect the next time the group is generated.

See [Sketch on your phone](/videoagents/create/sketch-on-your-phone) for phone sketches.

## Reference videos

Click **🎬 Video** to see the group's reference videos, numbered `[Video N]` as in the prompt. With the whitebox on, the group's 3D camera video is added by the pipeline so the model follows its framing and blocking; with long takes using the tail video, the previous group's last seconds are added too.

![The Reference Videos dialog for grp002: one whitebox camera video of 17 seconds, with the total duration and count checked against Seedance 2.5's limits](/images/videoagents/create/image-and-video-generation-reference-videos.webp)

- The dialog totals the duration and count and compares them with the group's model.
- **⬆ Upload** adds an mp4, mov or webm file of up to 45 MB. A video you upload needs its own `[Video N]` sentence, which is written when the prompt is regenerated.
- **🎛 Model** opens the group's model settings, in case you need a model that accepts more video.

With Volcano Engine, reference videos must be reachable by a link, so they are uploaded to your object storage first. Set it up under **⚙️ → Storage & Image Libraries**. See [Object storage and stock libraries](/videoagents/models/object-storage).

::: tip
If the provider rejects reference images that show realistic faces, add the characters to the Virtual Portrait Library (**⚙️ → Advanced → Virtual Portrait Library**). See [Virtual portrait library](/videoagents/models/virtual-avatar-library).
:::

## Draft and final resolution

Groups are generated at the **Draft resolution** set in **🎛️ → Output Settings**. Drafts are what you review and sign off. The **Final-cut resolution** is reached by upscaling the approved clips, never by generating them again at the higher resolution, which would cost more and change the picture.

The upscale method is chosen on **⚙️ → Generation Models → Upscale**: plain interpolation with ffmpeg (the default), or an AI method such as Seedance 2.5 draft mode on Volcano Engine, MiniMax Regenerate-2K, a ComfyUI SeedVR2 workflow or Agentics. When the two resolutions are the same, the drafts are already final and nothing is upscaled. See [Upscale](/videoagents/models/upscale).

The **🎞️ Final Release** page lists each group clip with how it was upscaled: **Not upscaled**, **Interpolated** or **AI upscale**.

## Checks and retries

Each clip is checked automatically (length against the group, audio track, cut points and more), and the visual reviews look for distortion, flicker, drifting faces and props.

How often agents redo failed work on their own is set by **Retry count** in **⚙️ → Advanced → Agent Advanced Settings**, or with the `/retry` chat command. The default is 0: the first failure is handed to you instead of being regenerated. See [Agent advanced settings](/videoagents/console/agent-advanced-settings).

Small mistakes such as a missing sleeve or a wrong prop are fixed by editing the existing clip (video-to-video) rather than regenerating the whole group. It costs less and keeps the performance and camera work that already passed.

## Visual sign-off

When every group of the episode has a clip that passed its checks, the Workflow Orchestrator asks for the visual generation sign-off (H3B). Review the clips on the **🎚️ Post-production** page, then answer the sign-off card in the console. Editing starts only after this sign-off. See [Sign-off gates](/videoagents/concepts/sign-off-gates).

## Redo a group

- Click **✏️ Edit** under the group video (or on the group header) and describe what is wrong. The Reviser takes on the prompt and video work for that group: it adjusts the prompt or references and regenerates the clip as needed.
- Or ask the Workflow Orchestrator in the console chat, naming the episode and group.

On the Post-production page, the group's clip is the master (**v0**), and cuts, repairs and grading made there become new versions that you compare and adopt. See [Post-production](/videoagents/create/post-production).

## Related

- [Storyboard preview](/videoagents/create/storyboard-preview)
- [Video prompts and prompt skills](/videoagents/create/video-prompts)
- [Long takes and continuity](/videoagents/create/long-takes)
- [Video models](/videoagents/models/video-models)
- [Upscale](/videoagents/models/upscale)
