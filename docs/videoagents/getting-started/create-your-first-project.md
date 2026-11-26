---
title: Create your first project
description: Create a film project from a novel with the New Project wizard, start the crew, and answer your first sign-off.
tags: [beginner, film, tutorial]
order: 60
---

# Create your first project

This walkthrough creates a film project from a novel, starts the crew, and takes you to your first sign-off. It covers only what you need for a first run; every field of the wizard is explained in [New project wizard](/videoagents/console/new-project-wizard).

## Before you start

- An agent engine that is installed and signed in. See [Choose an agent engine](/videoagents/getting-started/choose-an-agent-engine).
- Providers for at least images, video and voice. See [Set up providers](/videoagents/getting-started/set-up-providers).
- The novel's text. You can paste it into the wizard, or leave it out and add it later.

::: tip
Want to see what a finished project looks like first? [Open a sample project](/videoagents/getting-started/open-a-sample-project).
:::

## 1. Open the wizard

1. In the console's top bar, click the project name next to **Project**. The **Project** dialog opens.
2. Click **＋ New Project…**.

## 2. Choose the project type

Step 1 is **Project type**. Leave **🎬 Film & series** selected. It adapts a novel into a multi-episode video and pauses at key points for your sign-off. Click **Next**.

![Step 1 of the New Project wizard, with Film & series selected and Digital human, Motion graphics and More next to it](/images/videoagents/getting-started/create-your-first-project-type.webp)

The other types follow different workflows. See [Choose a project type](/videoagents/project-types/choose-a-project-type).

## 3. Fill in the basic info

Step 2 is **Basic info**.

| Field | What to enter |
| --- | --- |
| **Project name** | Letters and digits only, for example `MyNovel01`. It becomes the project folder's name. |
| **Story text** | Paste the novel. You can leave it empty and add the text to the project's `novel/` folder later. |
| **Content Positioning** | A few lines on what you are making: drama or documentary, genre and tone, audience, what to keep or cut from the book. |
| **Visual Style** | Click **🎨 Choose from Style Library** to pick a style, or describe it yourself: texture, colour palette, lighting, composition. |

![Step 2 of the wizard with the project name MyNovel01 and empty Story text, Content Positioning and Visual Style fields](/images/videoagents/getting-started/create-your-first-project-basic.webp)

Content Positioning and Visual Style are saved in the project's `brief.md`. They are given to every agent as the top creative premise, so a few clear sentences here shape the whole series. You can change them later under **🎛️ → Creative Brief**.

## 4. Check the setup steps

Steps 3 to 5 set the project up. Every field has a default, and everything can be changed later from the **🎛️** project settings menu.

| Step | What it sets | Details |
| --- | --- | --- |
| **Video Rhythm** | Narrative rhythm, episode length, shot length, long takes, transitions | [Video pacing](/videoagents/console/video-pacing) |
| **Model Limits** | The longest generation group and how many reference files each group may carry. These must match your video model. | [Model limits](/videoagents/console/model-limits) |
| **Output Settings** | Aspect ratio, language, draft and final resolution and more | [Output settings](/videoagents/console/output-settings) |

From step 3 on you can click **Skip wizard and create** to keep the remaining defaults.

On the last step, click **Create**.

## 5. Let the Workflow Orchestrator set up the project

The console switches to the new project and opens the chat with the **Workflow Orchestrator**, the agent that plans the work and hands it out. It starts by setting up the project:

- creates the project folder structure,
- cleans up the novel text and splits it into chapters in `novel/`,
- reads your Content Positioning and Visual Style and sums up how it understood them, so you can correct it.

Then it stops and reminds you that you can add reference material. It does not start the story work yet.

## 6. Add references (optional)

If you have pictures of how the film should look, music you want to use, fonts or notes, add them now. Open the preview menu (the picture icon in the top bar) and choose **Reference Files**. Upload files by category and add a note to each one. The design and music agents read these first. See [Reference files](/videoagents/world/reference-files).

## 7. Start the crew

Reply to the Workflow Orchestrator in its chat, for example:

> The references are ready. Please start.

or, if you have none:

> No references. Go ahead.

The Workflow Orchestrator builds the project's workflow and dispatches the first tasks: reading the novel, mapping the story, then the world bible. You can follow along:

- The **Run Panel** on the right lists running and queued tasks.
- The **Workflow Preview** page (preview menu → **Workflow Preview**) shows every task, its state and the sign-off gates. See [The workflow](/videoagents/concepts/workflow).
- Each agent's chat shows what it did and which files it wrote.

If the work stops while nothing is waiting for you, click **▶ Continue** in the Run Panel to ask the Workflow Orchestrator to carry on. To have this happen by itself when the project is idle, turn on **🤖** auto-run. See [Auto-run](/videoagents/console/auto-run).

## 8. Answer your first sign-off

When the world bible is merged, the crew stops at the first gate, **H1 World bible sign-off**. A sign-off card appears at the bottom right of the console, and you get a desktop notification.

1. Review the world bible on **Worldview Preview** (preview menu). Characters, scenes and props come at the next gates.
2. If something is wrong, use the **✏️ Edit** buttons on the preview page, or tell the Workflow Orchestrator in its chat.
3. When you are happy, click **Sign off** on the card. To stop here for now, click **Hold**.

Sign-off cards never time out. The crew moves on to characters and assets, the art style and the first episode's screenplay, and stops at each of their gates. See [Sign-off gates](/videoagents/concepts/sign-off-gates) for the full list.

::: warning
Paid image generation starts at the art style stage, when character concept art and reference sheets are drawn. Video is generated only after you sign off each episode's shot list (H3A) and video prompts (H3V). Check your providers' prices and [Cost control](/videoagents/models/cost-control) before you sign those.
:::

## Good to know

- **New projects skip the quality scores and QA reviews.** All review strengths start at 0. Raise them under **🎛️ → Review Settings** if you want the Evaluation Agent and the QA agents to check the work. See [Review settings](/videoagents/console/review-settings).
- **Automatic retries are off.** When a step fails a check, it comes to you instead of being redone. Change this under **⚙️ → Advanced → Agent Advanced Settings → Retry count**, or with the `/retry` [chat command](/videoagents/console/chat-commands).
- **Episodes are made one at a time** by default, starting with episode 1.

## Related

- [New project wizard](/videoagents/console/new-project-wizard)
- [Import and read the novel](/videoagents/world/novel)
- [The workflow](/videoagents/concepts/workflow)
- [Sign-off gates](/videoagents/concepts/sign-off-gates)
- [Chat with agents](/videoagents/console/chat-with-agents)
