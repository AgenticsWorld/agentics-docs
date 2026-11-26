---
title: Audio drama
description: Install the audio-drama plugin to turn a project's episode scripts, characters and voices into an audio drama or podcast episode with a mixed, loudness-checked master.
tags: [audio-drama, plugins, audio]
order: 80
---

# Audio drama

The audio-drama plugin turns a project's world, episode scripts and voices into an audio drama or podcast. The end product is an audio master and a release package for each episode; no video is needed.

It is not bundled with VideoAgents. It is an add-on from the [VideoAgents-Plugins](https://github.com/AgenticsWorld/VideoAgents-Plugins) repository.

## Before you start

- A project with a world bible and a character list (`bible/world.json`, `bible/characters/index.json`).
- Episode scripts to adapt: the screenplay, and if they exist the dialogue and narration files of each episode (`story/episodes/epNN/`). Character voices (`bible/characters/*/voice.json`, `assets/audio/voice/casting.json`) and any finished voices, music or effects are reused.
- Voice, music and sound-effect providers set up on **⚙️ → Generation Models**.

## Install and enable

1. Download `audio-drama.zip` from the `plugins/` folder of the plugin repository.
2. Open **⚙️ → Plugins**, click **⬆ Install plugin package (zip)** and choose the file. It is picked up within about 30 seconds.
3. Click **Enable** next to **audio-drama**. Newly installed plugins are disabled until you do.

Three agents are added: Audio Adapter, Voice Director and Podcast Packager. Everything else is done by the built-in voice, narration, music, sound-effect, ambience, mixing and review agents. See [Install plugins](/videoagents/extend/install-plugins).

::: warning
A plugin's instructions are passed to the AI models word for word. Read a plugin's files before you install it.
:::

## Start an episode

Pick the **Workflow Orchestrator** in the project and say which episode to make. For example:

```text
Start the audio-drama workflow: turn episode 1's script into a podcast episode.
Keep the existing character-voice bindings from casting.json.
Run ad0 audio adaptation first, and give me the audio script and cue sheet
for the ADH1 sign-off.
```

If the project already has audio-ready material, such as dialogue, narration, casting or even a finished episode, the adaptation step reuses it instead of starting from scratch.

## Workflow and sign-offs

| Stage | What happens | Your sign-off |
| --- | --- | --- |
| ad0 Audio adaptation | The Audio Adapter rewrites the script for the ear: what can't be heard becomes narration, a spoken reaction or a sound cue. Every line gets its speaker, emotion, pace and pauses; every effect, ambience and music cue gets its in and out points | **ADH1** audio script and cue sheet |
| ad1 Voice direction | The Voice Director binds each character to a voice and writes per-line emotion, pace, pause and performance notes | — |
| ad2 Sound | Voices, narration, music, sound effects and ambience are made in parallel by the built-in audio agents | — |
| ad3 Mix and master | The mix is made and checked: −14 LUFS ±1, true peak at or below −1 dBTP, no clipping, every cue covered. The audio review follows | **ADH2** master, intro and outro |
| ad4 Release package | Content safety and copyright reviews, then the Podcast Packager writes titles, description, show notes, chapters and metadata | **ADH3** release |

## Files

The plugin writes only into the project's `audio-drama/` folder:

| Folder | Content |
| --- | --- |
| `audio-drama/scripts/` | Audio scripts and cue sheets |
| `audio-drama/casting/` | Voice direction for each episode |
| `audio-drama/voices/` | Lists of the generated voice and narration tracks |
| `audio-drama/mix/` | The master (`master.wav`), mix and loudness reports, music and effect cue sheets |
| `audio-drama/publish/` | Metadata, show notes and safety and copyright results |

Final files are copied to the project's `publish/audio/` folder only after you confirm.

## Good to know

- **The canon is not changed.** Notes specific to the audio drama stay in `audio-drama/`.
- **Video work is paused.** When an audio drama starts, the video-only stages (art style, storyboard, visual generation, video editing, final video review and video publishing, with their sign-offs) are marked as skipped, but only if none of them has started yet; if video work is already under way, nothing is skipped. The screenplay and audio stages stay active, and the skipped stages can be resumed later.
- **Intro and outro are reusable assets.** They are versioned audio files, not regenerated for every mix.
- **The plugin prepares the release package but does not upload it** to any platform.

## Related

- [Install plugins](/videoagents/extend/install-plugins)
- [Dialogue, voices and narration](/videoagents/create/dialogue)
- [Music and sound effects](/videoagents/create/music-and-sound)
- [Voices](/videoagents/world/voices)
- [Choose a project type](/videoagents/project-types/choose-a-project-type)
