---
title: Editing, subtitles and packaging
description: How an episode is cut from its group clips, how subtitles and fancy text are made, and how to add intros, outros, teasers, burned-in subtitles and letterboxing.
tags: [editing, film, how-to]
order: 85
---

# Editing, subtitles and packaging

Once an episode's group clips are signed off and its audio is mixed, the editing agents turn them into a finished episode: a rough cut, transitions, subtitles, on-screen text, an intro and outro, and thumbnails. This page explains each step, what you can switch on, and where the files end up.

## Before you start

- The episode's group clips are signed off (H3B) and its audio mix is done. See [Image and video generation](/videoagents/create/image-and-video-generation) and [Music and sound effects](/videoagents/create/music-and-sound).
- The **Output Language** in **🎛️ → Output Settings** is the language of the subtitles and the publishing materials.

## The editing chain

Each step is done by its own agent. Files are saved in the episode's `edit/<ep>/` folder.

| Step | Agent | Result |
| --- | --- | --- |
| 1. Rough cut | **Edit Agent** | `cut_v1.mp4` and `timeline.json`: the group clips in order, trimmed and retimed to the episode's pacing |
| 2. Transitions | **Transition Agent** | `cut_v2.mp4` with the accepted transitions rendered at the group boundaries |
| 3. Subtitles | **Subtitle Agent** | `subtitles.srt` for dialogue and narration |
| 4. Fancy text | **Caption Agent** | On-screen text designs (`captions.json`), only when fancy text is on |
| 5. Intro and outro | **Title Agent** | The intro, outro and next-episode teaser in `intro_outro/`, only when switched on |
| 6. Thumbnails | **Thumbnail Agent** | `thumbnail_*.png`: two versions (A and B) for each target platform's aspect ratio |
| 7. Final assembly | **Post Finishing Agent** | `final.mp4` and its variants, after your post-production work. See [Post-production](/videoagents/create/post-production) |

The rough cut keeps the episode within 5% of its planned length, at 24 fps, without black or skipped frames. If the editor finds a small continuity slip in a clip (a sleeve, a prop), it opens a defect so the clip is fixed with a video-to-video edit rather than regenerated.

## Subtitles

The Subtitle Agent writes subtitles for every line of dialogue and narration, timed to the audio within 200 ms. Each line stays within the platform's character limit. Off-screen and voice-over lines are subtitled too, marked `(O.S.)` or `(V.O.)`.

When subtitles are burned into the picture, they follow a small, unobtrusive style: at the bottom centre, letters no taller than 4% of the frame, two lines at most, white with a black outline and no large background box. To change the style, add a **Subtitle style** adjustment in the **Packaging** section of the **🎚️ Post-production** page; the monitor previews it.

Subtitles are written against the episode without its intro. When an intro is added, the final assembly shifts the subtitles (and the audio) by the intro's measured length into `subtitles_final.srt`, so they stay in sync with `final.mp4`.

## Packaging switches

Packaging is switched on per project in the **Packaging** section of the **🎚️ Post-production** page. Each switch is marked **Episode · project settings**: it applies to every episode.

![The Packaging section on the Post-production page: Intro & outro with Intro, Outro, Teaser and Burn-in subtitles, Fancy Text with its mode, and Letterbox bars with the final output aspect ratio](/images/videoagents/create/editing-packaging.webp)

### Intro & outro

| Switch | What it adds |
| --- | --- |
| **Intro** | An opening title sequence |
| **Outro** | Closing titles |
| **Teaser** | A next-episode teaser. It has no narration unless you ask for it: the hook is shown as text cards over the picture's own sound and music |
| **Burn-in subtitles** | A copy of the final cut with the subtitles burned in, `final_sub.mp4`. The clean `final.mp4` is kept |

All four are off for new projects. When you tick **Intro** or **Outro**, a box asks what it should contain. You can leave it empty and let the system design it in the project's style. Credits, web addresses and copyright notices are shown exactly as you write them; to use a logo or QR code, put the file in `refs/` and give its path. Click **✎ Content** next to the switch to change the text later.

Intros, outros and teasers follow the project's art style. The intro is placed before the episode, and the outro after the episode's ending hold.

### Fancy Text

Fancy text is designed on-screen text: character introductions, location labels, a creature or prop card the first time it appears, and similar. Each design includes the wording, a template, size, animation and a matching sound effect.

- Tick **Enable fancy text** to turn it on (off by default).
- **Mode: Auto** lets the Caption Agent choose types that suit the genre. Click **View catalog** to see the available types.
- **Mode: manual** opens the type list so you can tick the types allowed. A ticked type is used whenever the episode has something for it, and any type left out is explained.

The text is burned into copies of the group clips (the originals are never changed), and the episode gets a second final cut, `final_caption.mp4`, next to the clean `final.mp4`. On **🎦 Storyboard Preview**, **✨ Fancy Text** on a group card shows its designs, and the group video shows the fancy-text version.

Fancy text uses your fonts from `refs/fonts/` first.

### Letterbox bars

Tick **Enable letterbox bars** and choose a **Final output aspect ratio** (16:9, 9:16, 4:3, 3:4 or 1:1). When the final cut is rendered, the picture is scaled to fit and padded with black bars to that ratio. The production aspect ratio does not change. Render the final cut again after changing this.

### Watermark

To put a logo in a corner of the whole episode, add a **Watermark / bug** adjustment in **Packaging** with a PNG file. It is applied when the final cut is built, not to the group versions.

## Thumbnails

The Thumbnail Agent makes two thumbnail versions for each platform aspect ratio from the episode's best frames. If you put example covers in `refs/thumbnail/`, it borrows their composition, layout and text style. Choose the one to publish with **Set as default** on the **🎞️ Final Release** page. See [Final videos and publishing](/videoagents/create/publishing).

## Sign-offs

- **H3P** (every episode): your post-production sign-off on the **🎚️ Post-production** page. See [Post-production](/videoagents/create/post-production).
- **H4** (first episode only): you review the first finished episode before the rest of the season follows its lead.

See [Sign-off gates](/videoagents/concepts/sign-off-gates).

## Related

- [Post-production](/videoagents/create/post-production)
- [Transitions](/videoagents/create/transitions)
- [Final videos and publishing](/videoagents/create/publishing)
- [Output settings](/videoagents/console/output-settings)
