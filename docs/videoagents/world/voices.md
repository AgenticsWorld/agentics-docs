---
title: Voices
description: How each speaking character gets a voice card and a short voice sample that keeps the voice steady across episodes, plus the narrator's voice.
tags: [voice, characters, film, how-to]
order: 50
---

# Voices

Every character who speaks gets a voice: a written voice card and a 3–5 second voice sample. The sample is attached whenever that character speaks in a generated shot, so the character sounds the same in every scene and every episode. You listen to the samples on the **👤 Character Preview** page.

## How a voice is made

Voices are made together with the [characters](/videoagents/world/characters), in Phase 3 of the [workflow](/videoagents/concepts/workflow), not episode by episode.

1. **Voice card.** The voiceprint agent writes `bible/characters/<id>/voice.json` for every character with lines. It takes the character's gender from the appearance profile (the voice must match it) and derives the rest from appearance and personality:

   | Field | Meaning |
   | --- | --- |
   | `gender` | Copied from the appearance profile |
   | `timbre`, `pitch`, `accent` | The sound of the voice, in purely acoustic words |
   | `speed_cpm` (and `speed_wpm` for English lines) | Speaking rate |
   | `reference_style` | The kind of speaker and how they talk, in plain words |
   | `emotion_range` | How speed and pitch shift when the character is calm, agitated, whispering … |
   | `age_variants` | One voice per age version, each with the chapters it covers |

2. **Casting and sample.** The voice-generation agent registers the voice for each character and age version in the project's casting list, `assets/audio/voice/casting.json`, and makes a 3–5 second sample of calm, neutral speech with no music or room sound: `assets/audio/voice/refs/<id>_voiceprint.mp3`, or `<id>_<variant>_voiceprint.mp3` for an age version.
3. **Sign-off.** Voices are part of the **Characters & assets sign-off** (H1A). See [Sign-off gates](/videoagents/concepts/sign-off-gates).

Before an episode's videos are generated, the team checks that every character who speaks in it has a sample for the right age version, and makes any that are missing. Minor characters may have no sample; their voice is then described in words in the video prompt.

## Voice design or voice library

How the sample is made depends on the **Mode** of your text-to-speech provider on the **🎨 Generation Models** page:

- **Voice design:** the sample is generated from the voice card's description. No stock voice is picked.
- **Voice library:** the team picks a voice from the provider's library that matches the card (gender first, then age, language and timbre), avoiding voices already given to another character, and records it in `casting.json`.

See [Voice models](/videoagents/models/voice-models) for the providers and their modes.

## How the samples are used

With **🎛️ → Output Settings → Dialogue voice** set to **Native video audio (default)**, the video model speaks the dialogue itself, in sync with the lips. Each speaking character's sample is attached to the shot as reference audio, so the model knows how that character sounds. The sample only sets the voice; it never goes into the film, and dialogue is not replaced with text-to-speech.

The samples, cards and casting list are also used when you turn on other dialogue options, such as **Post-production dubbing** or **Generate dialogue speech**. See [Dialogue, voices and narration](/videoagents/create/dialogue).

## Listen to the voices

Open **👤 Character Preview** from the **Preview design outputs** menu (the picture icon in the console's top bar) and pick a character. The voice rows are below the character's name.

![Voice rows for Alice: default and age02 entries from the casting list, an age02 voice sample with a player, and the primary voice sample with a player, each with an Edit button](/images/videoagents/world/voices.webp)

Each row shows:

- 🔊 the variant name, or **Primary voice** for the character's main voice.
- The provider's voice name and model, when the casting list records them, and the status if it is not yet confirmed.
- A player for the sample, or "(voice sample not generated yet)".
- **✏️ Edit** to ask for a change.

A row comes from the casting list; a sample file in `assets/audio/voice/refs/` that the casting list does not point to is listed as an extra row. That is why a character can show a variant twice, once without a sample and once with one.

The full voice card is in the **Voice/voice-over** section further down the page.

## The narrator's voice

When **Narration** is turned on in **🎛️ → Output Settings**, the project gets one narrator voice for the whole film:

- A voice card, `assets/audio/voice/narrator.json`, designed from the project's tone, and a frozen sample, `assets/audio/voice/refs/NARRATOR_voiceprint.mp3`. It is chosen so that it does not sound like any character's voice.
- Once made, it stays fixed. Changing the text-to-speech settings on the Generation Models page does not change the narrator's voice.
- It appears as **🎙 Narration** at the top of the Character Preview list, with its sample and its **Narrator voice card**.

With narration turned off, no narrator voice is made.

## Change a voice

Click **✏️ Edit** on a voice row, write what is wrong (for example "too old for a ten-year-old; brighter and quicker") and click **Send**. The Reviser works as the voiceprint and voice-generation agents would: it updates the voice card and makes a new sample. See [The Reviser and revision notes](/videoagents/concepts/reviser).

::: tip
Change voices before videos are generated. Shots that are already generated keep the voice they were made with until they are generated again.
:::

## Related

- [Characters](/videoagents/world/characters)
- [Dialogue, voices and narration](/videoagents/create/dialogue)
- [Voice models](/videoagents/models/voice-models)
- [Output settings](/videoagents/console/output-settings)
