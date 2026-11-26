---
title: Interface language
description: Switch the console to one of 12 languages; the choice also sets the language agents use to talk to you and the language of voice input.
tags: [beginner, how-to]
order: 94
---

# Interface language

The console is available in 12 languages. The interface language is more than the labels on screen: agents also use it to talk to you, so pick the language you want to read their reports in.

## Change the language

1. Open **⚙️ → UI Language**.
2. Click a language. The current one has a **✓**.

The page reloads in the new language.

| Language | Shown as |
| --- | --- |
| English | English |
| Chinese | 中文 |
| Japanese | 日本語 |
| Korean | 한국어 |
| Vietnamese | Tiếng Việt |
| Spanish | Español |
| French | français |
| German | Deutsch |
| Indonesian | Indonesia |
| Portuguese | Português |
| Russian | русский |
| Arabic | عربي |

Arabic switches the layout to right-to-left.

The first time you open the console, the language is chosen from your browser's language, or English if none of the 12 matches. After that, your choice is saved for the whole installation, so it is kept when the desktop app restarts and in every browser that opens the console.

## What the interface language changes

| What | How |
| --- | --- |
| Console and preview pages | Labels, buttons and tips |
| Agents' replies and reports | Agents talk to you and report progress in the interface language |
| Image and video prompts | Agents write the prose of image and video prompts in the interface language. Fixed parts, such as reference markers and negative word lists, stay in English. |
| Style Library prompts | The style prompt filled in from the [Style Library](/videoagents/console/creative-brief) is in the interface language |
| Voice input | Speech is recognized in the interface language. See [Voice input](/videoagents/console/voice-input). |
| System messages | Gate messages, receipts and similar texts from the system are in Chinese for the Chinese interface and in English for every other language |
| First engine | On a first install, the default engine is Kimi Code for the Chinese interface and Claude Code for the others |

## What it does not change

The language of the work itself (the screenplay, dialogue, narration, subtitles and voice-over) is set per project by **Output Language** in [Output settings](/videoagents/console/output-settings). You can, for example, use the console in English and make a film in Japanese.

## Good to know

- A few texts in the console have no translation yet and show in Chinese.
- Some command replies, such as those of `/clear` and `/auto`, are currently in Chinese only. See [Chat commands](/videoagents/console/chat-commands#reply-language).
- Files the agents already wrote stay in the language they were written in. Agents copy existing prompt fragments word for word instead of translating them, so after a switch, older prompts of a project keep their language until that work is redone.

## Related

- [Output settings](/videoagents/console/output-settings)
- [Voice input](/videoagents/console/voice-input)
- [Console tour](/videoagents/console/console-tour)
- [Chat commands](/videoagents/console/chat-commands)
