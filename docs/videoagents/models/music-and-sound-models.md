---
title: Music and sound models
description: Choose how background music and sound effects are made, from free code-rendered audio and Openverse search to ElevenLabs, OpenRouter, Fal and ComfyUI.
tags: [providers, music, audio, how-to]
order: 60
---

# Music and sound models

Two cards on the Generation Models page decide where audio other than speech comes from: **🎵 Music Model** for background music (BGM) and **🔊 SFX Model** for sound effects and ambience. Both include options that cost nothing.

Open **⚙️ → Generation Models**, click a tab to see a provider's settings, and choose the provider in **Active provider** in the card's title bar. Changes save automatically.

## Music

![The Music Model card with the Code composition tab and its sampled instrument libraries](/images/videoagents/models/music-and-sound-models-music.webp)

| Tab | What it does | What you enter | Default model |
| --- | --- | --- | --- |
| **Code composition** | No music model is called. An agent writes a composition script, and VideoAgents renders it with sampled instruments and synthesizers. Free, and the beat can line up with the picture frame by frame | Nothing | — |
| **Agentics** | Music models on your VideoAgents desktop account | Nothing; sign in. Pick a **Model** | `minimax-music-3` |
| **OpenRouter** | Google Lyria 3 on [OpenRouter](https://openrouter.ai) | **API Key**, **Model** | Lyria 3 Clip (30-second clips and loops); Lyria 3 Pro makes full songs |
| **ElevenLabs** | [Eleven Music](https://elevenlabs.io/app/settings/api-keys) | **API Key**, **Model**, **Force instrumental** | Eleven Music v1 (v2 is also listed) |
| **ComfyUI** | Your own music workflow | See [ComfyUI](/videoagents/models/comfyui) | — |

New installs of the desktop app use **Agentics**; the web version starts on **Code composition**. Motion graphics projects use code composition by default.

### Code composition

- **Auto-download**: when a composition script uses a sample library that isn't on your computer yet, only that library is downloaded. On by default.
- **Sampled instrument libraries** lists the five libraries (orchestral, percussion and world, general instruments and drum kits, woodwinds and brass, grand piano) with their size and a **Download** or **Delete** button. Without any library, only synthesizer sounds are available.
- **Render a demo track** under **Listen** plays a short example.
- The libraries come from the open-source project lemo-opuscar and are stored in `data/.videoagents/codevideo/`. When a piece uses an instrument whose license requires credit (the Salamander piano, the FreePats drum kits), the credit line is added to the film's credits automatically.

### ElevenLabs

**Force instrumental (no vocals — suited for BGM)** is on by default. Cues can be 3–600 seconds long, or left to the model. Output is `.mp3` or `.opus` only.

### ComfyUI

The recommended local template is `music-ace-step-v1-api.json` (ACE-Step 3.5B). Background music is instrumental by default.

## Sound effects

![The SFX Model card with the Openverse tab](/images/videoagents/models/music-and-sound-models-sfx.webp)

| Tab | What it does | What you enter |
| --- | --- | --- |
| **Code SFX** | No search and no model. An agent writes a sound-effect script and VideoAgents synthesizes it (clicks, whooshes, thuds, paper, room tone…), so each sound lands on the frame of its on-screen event. Free | Nothing |
| **Openverse** | Generates nothing. Searches [Openverse](https://openverse.org) for existing free sound effects by English keywords, mostly from Freesound | Optional **Client ID** and **Client Secret** |
| **ElevenLabs** | Generates with ElevenLabs Sound Effects v2. Billed per clip; 0.5–30 seconds | **API Key** (leave blank to reuse the key from the Music or TTS card) |
| **Fal** | The same model hosted on Fal. Billed per clip; 0.5–22 seconds, description up to 450 characters | **API Key** (leave blank to reuse the key from the Image or Video card) |

New installs use **Code SFX**. It suits motion graphics; for realistic foley, Openverse or a generating provider works better.

### Openverse

- **Licenses**: **CC0 / public domain (no attribution, default)**, or also CC BY, which requires credit. Licenses that forbid commercial use or changes are never used.
- **Source**: **Freesound (default)**, or Freesound plus Wikimedia Commons.
- **Client ID** / **Client Secret**: optional. Without them you get 20 searches a minute and 200 a day. See the [Openverse API docs](https://api.openverse.org/v1/#tag/auth) for higher limits.
- **Test search**: type English keywords (for example `door slam`) and click **Search**. Results play in the page with duration, license, source and author; CC BY results are marked as needing credit. Searches need every keyword to match, so use 2–3 short words.

Each downloaded effect records its license, author and source page in its `.meta.json`. The copyright review checks that CC BY effects are credited in the end credits.

### When sound effects are generated

The SFX provider is used by the sound-effect and ambience agents when a QA defect asks for a missing effect or ambience patch. If Openverse finds nothing, those agents try other keywords and then report back. They don't switch to a paid provider on their own.

## Related

- [Music and sound effects](/videoagents/create/music-and-sound)
- [Music library](/videoagents/world/music-library)
- [Motion graphics](/videoagents/project-types/motion-graphics)
- [Voice models](/videoagents/models/voice-models)
- [Cost control](/videoagents/models/cost-control)
