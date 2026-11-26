---
title: Music library
description: Listen to every score track your project has made, see its mood, theme and the episodes using it, and how later episodes reuse it.
tags: [music, audio, how-to]
order: 100
---

# Music library

Every project keeps a library of its score. Each time an episode's music is delivered, its new tracks are added with their mood, genre and tempo. Later episodes look in the library first: a recurring theme can come back as is or as a variation, and new music is made only where nothing fits.

The **Music library** page lets you listen to every track, see where it is used, and send notes about it to the **Music Agent**.

::: tip
The music library is available from v1.0.37. Themes, variations and the reuse quota were added in v1.0.38.
:::

## How tracks get into the library

1. The **Music Agent** scores an episode. For each cue it picks, in this order: your own music in `refs/music/` (the **🎵 Audio** section on the Reference Files page), a track from the project library, or new music from the music model.
2. When it delivers the episode, the tracks it added (newly generated ones and the music of yours it used) are copied into the library with their data: mood, genre, tempo, instruments, length, generation prompt and licence.
3. Every cue of the episode is recorded as a use of its track: which episode, which cue, in and out points, and scene.

The first episode starts with an empty library, so all its music is new.

## Themes, one-offs and variations

Tracks come in two kinds:

| Kind | What it is | Can later episodes reuse it as is? |
| --- | --- | --- |
| **Theme** | A motif that runs through the season (a hero, a villain, a place, a mood). It has a theme ID such as `T-MAIN`, a name and a short description of the motif. | Yes |
| **One-off** | A cue written for one moment of one episode | No |

For each cue, the Music Agent chooses one of three things and writes down why:

- **Reuse** a theme track as it is, so the theme returns.
- **Make a variation**: the same motif, regenerated with a different tempo, instrumentation, intensity or length. A variation is a new track that belongs to the same theme and records which track it varies.
- **Make new music** when the library has nothing suitable.

Each episode has to keep a balance, and the music check rejects an episode that does not:

| Rule | Limit |
| --- | --- |
| Cues reused as is | At most 40% of the episode's cues (at least one is always allowed) |
| New music and variations | At least 30% of the cues |
| Same track in one episode | Once |
| One track across episodes | At most 3 episodes, then only variations |
| What may be reused | Theme tracks only |
| Length of a reused cue | At least 60% of the track |
| Mood | The cue's intensity within 0.25 of the track's |

## Open the music library

In the console's top bar, open **🎛️** (project settings) and choose **Music library**. The page shows the library of the project selected in the top bar.

![The Music library page for a project whose first episode is scored but not yet synced: filters, totals, reuse quota and the Sync to library banner](/images/videoagents/world/music-library.webp)

## What the page shows

The filters at the top:

| Filter | Options |
| --- | --- |
| Episode | **All episodes**, or one episode: tracks added in it or used in it |
| Source | **All sources**, **Generated**, **User-provided**, **Reused across episodes**, **Theme variations** |
| Theme | **All themes**, one theme, or **One-off tracks** |
| Search | Words in the mood, genre, instruments, tags or prompt |
| **Show replaced old tracks** | Also list tracks an episode stopped using after its score was redone |

The line below gives the totals (tracks, reused, theme tracks, one-offs, variations) and the reuse quota.

Each track is one row:

| Column | Meaning |
| --- | --- |
| ▶ | **Listen**. Click again to stop. |
| **Track ID** | `MUS-0001`, `MUS-0002`… |
| **Mood** | The mood and intensity the track was made for |
| **Theme** | The theme ID and name, or **One-off** |
| **Genre / tempo / instruments** | Style, bpm and instrumentation |
| **Length** | Duration in seconds |
| **Source** | **Generated** or **User-provided**; **Variation of MUS-…** for variations; **Replaced** or **file missing** when that applies |
| **Added in** | The episode that added it |
| **Used in** | Episodes that use it. Episodes other than the one that added it are shown in green. |
| **Uses** | Number of cues that use it |
| **Reuse eps** | Episodes that reused it as is, out of 3. Red when the limit is reached. |
| **Edit** | Opens a note box at the bottom right, filled in with the track, that goes to the **Music Agent** |

Click a row to open its details: an audio player, the track's title, mood, genre, tempo, instruments, intensity, tags and notes, its theme and what it varies, the generation prompt, the library file, where and when it was added, the audio format, the licence record, and a **Usage** table listing every cue that uses it (episode, cue, in and out points, cue length, scene, mood segment, and whether it was a first use or a reuse).

## Sync to library

**Sync to library** (top right) compares each episode's cue sheet with the library: it copies in score tracks that are missing and recounts which episodes use each track. It generates nothing and costs nothing.

You need it for episodes scored before the library existed. When an episode's score is not in the library yet, a yellow banner names it and offers the same button.

## Files

| Path | What it is |
| --- | --- |
| `assets/audio/library/music/index.json` | The library: tracks, their data, themes and uses |
| `assets/audio/library/music/MUS-NNNN.<ext>` | The track files |
| `assets/audio/bgm/<ep>/cue_sheet.json` | One episode's cues and the tracks they use |

## Good to know

- **Library files are never changed.** A reused track is copied into the episode's own music folder. If it is trimmed or looped for a cue, the episode uses the edited copy, marked **Derivative** in the usage table.
- **Replaced tracks are kept.** When an episode's score is redone, tracks it no longer uses are marked **Replaced**. They stay on disk but are not offered for new episodes.
- **Older episodes.** Episodes scored before the reuse rules existed may fail the music check as they are. Whether to rescore them is your call.
- **Motion graphics.** A motion graphics project can take its music from the project library or your own music instead of composing it. See [Motion graphics](/videoagents/project-types/motion-graphics).

## Related

- [Music and sound effects](/videoagents/create/music-and-sound)
- [Music and sound models](/videoagents/models/music-and-sound-models)
- [Reference files](/videoagents/world/reference-files)
