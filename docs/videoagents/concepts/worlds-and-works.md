---
title: Worlds and works
description: How VideoAgents splits a project into the world your story lives in and the works made inside it, and why the world is built first.
tags: [beginner, world-bible, film]
order: 10
---

# Worlds and works

VideoAgents splits every story project into two layers: the **world** the story takes place in, and the **works** made inside that world. The crew builds the world first and then uses it as fact for every episode, which is what keeps a long series consistent.

## The world

The world is everything that stays true from one episode to the next:

| Part | What it holds | Where it lives |
| --- | --- | --- |
| **World bible** | World overview and rules, timeline, geography, religion, culture, politics, economy, magic or cultivation systems, a dictionary of terms | `bible/` |
| **Characters** | Appearance, personality, relationships, growth, voice and way of speaking, costumes for each occasion and period | `bible/characters/`, `bible/costumes.json` |
| **Creatures, scenes and props** | Creature and mount cards, scene and environment settings, prop cards with materials and sizes | `bible/creatures/`, `bible/scenes/`, `bible/props.json` |
| **Art style** | The visual style, colour script and aspect ratio | `bible/style.json`, `bible/color_script.json` |
| **Assets** | Concept art and reference sheets, voice samples, the music library | `assets/` |

One anchor per asset serves the whole series: the same reference sheet for a character, the same card for a prop, the same voice. Every image and video generated later is tied to these anchors.

![Worldview Preview of the alices project, listing the world bible files on the left and the World Overview on the right](/images/videoagents/concepts/worlds-and-works-world-bible.webp)

### One source of truth

The world bible is the single source of truth for settings. Only one agent, the **Memory / Bible Agent**, writes to it. When another agent finds a conflict with the bible, it reports it instead of changing the bible. Changes are recorded in `bible/changelog.md`.

When the novel says nothing about a detail that production needs, such as the colour of a coat or the size of a room, the design agents decide it themselves, in line with the rest of the bible and the art style, and mark it as their own decision. Your sign-off makes those decisions part of the world. Details the novel deliberately keeps secret stay secret in the story, but still get a look that can be drawn.

### You approve the world before it is used

The world is built in the first phases of the [workflow](/videoagents/concepts/workflow) and locked by three [sign-off gates](/videoagents/concepts/sign-off-gates): the world bible (H1), characters and assets (H1A), and the art style (H2). After a gate is signed, a change goes through the change process: the affected downstream steps are marked to be redone, and sign-offs that depended on the old version must be given again.

The building blocks of the world each have their own guide in [Build the world](/videoagents/world/).

## The works

A work is something made from the world. For a film project, the works are the episodes of the series:

1. The episode plan splits the novel into episodes.
2. For each episode, the crew writes the screenplay, plans the storyboard and shots, optionally stages a 3D whitebox, writes video prompts, generates the video and sound, edits, finishes, reviews and publishes it.
3. Every shot reuses the world's anchors: the character sheets, scene plates and prop cards it must match.

Episodes are made one at a time by default, starting with episode 1. Episode 1 also has two extra sign-offs, its screenplay (H3) and its final cut (H4), so it works as a pilot: problems with style or quality are caught before they spread across the season. If you turn on **Multi-episode parallel**, later episodes run side by side only after episode 1 has passed H4.

The steps for making episodes are covered in [Create inside it](/videoagents/create/).

## Other works from the same world

Because the world is stored as files, other kinds of work can use it too. Plugins add teams for them:

- **Derivative fiction** writes new novels set in the same world, such as prequels, side stories or what-if versions. It reads the world bible but never changes it; new settings go into its own folder until you approve them.
- **Fusion fiction** merges two books into one new story, taking the plot and characters from one and the world from the other, and writes the result into the world bible so the usual preview pages show it.
- **Audio drama** is available as a plugin too.

See [Derivative fiction](/videoagents/project-types/derivative-fiction), [Fusion fiction](/videoagents/project-types/fusion-fiction) and [Audio drama](/videoagents/project-types/audio-drama).

## Project types that don't build a full world

Audio to video, digital human, mashup and motion graphics projects follow their own shorter workflows, made for their inputs (a recording, photos, a footage library or a topic). They skip the parts of the novel-to-video pipeline they don't need. See [Choose a project type](/videoagents/project-types/choose-a-project-type).

## Related

- [Projects and the project folder](/videoagents/concepts/projects)
- [The workflow](/videoagents/concepts/workflow)
- [World bible](/videoagents/world/world-bible)
- [Characters](/videoagents/world/characters)
