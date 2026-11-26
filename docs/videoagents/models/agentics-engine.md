---
title: The built-in Agentics engine
description: Run agents on the engine that ships with VideoAgents, using your Agentics account, a local OpenAI-compatible model or a cloud endpoint.
tags: [engines, providers, how-to]
order: 15
---

# The built-in Agentics engine

The **agentics** engine comes with VideoAgents, so there is nothing to install. It runs agents with a language model that you choose on the Generation Models page: your Agentics account, a model running on your own computer, or any OpenAI-compatible cloud service.

New desktop installs start on this engine.

## How it works

The engine is a copy of [Pi Coding Agent](https://github.com/earendil-works/pi) bundled with the app. It runs on the desktop app's own runtime, so you don't need Node.js. It is separate from the **pi** engine you can install yourself: the bundled copy never reads your own Pi settings, extensions or logins.

Each run gets a private configuration with the endpoint and model you chose. The API key is passed to the run privately and is not written into the project.

## Choose where the language model comes from

Open **⚙️ → Generation Models** and find the **🧩 Language Model / Agentics** card. Pick the source in **Active provider** at the right of the card's title bar. The tabs only switch which settings you are looking at; the ✅ marks the active one. Changes save automatically.

![The Language Model / Agentics card with the Local model tab open](/images/videoagents/models/agentics-engine-language-card.webp)

| Provider | What it uses | What you enter |
| --- | --- | --- |
| **Agentics** | Your signed-in VideoAgents desktop account | Nothing. Pick a **Model** from the list your account offers. **Refresh List** reloads it |
| **Local model** | An OpenAI-compatible server on your computer or network (LM Studio, Ollama, vLLM…) | **Base URL** (default `http://127.0.0.1:1234/v1`), **API Key** (local servers usually accept anything, for example `lm-studio`), **Default model** |
| **Cloud model** | Any OpenAI-compatible cloud API | **Base URL**, **API Key** and **Default model**. None of them has a default; fill all three in |

The Agentics provider's default model is `deepseek/deepseek-v4.1-flash-1017`.

::: tip
An OpenRouter provider also exists, but it is hidden unless it is already your active provider.
:::

### Use your Agentics account

1. Use the desktop app. The Agentics provider is not available in the web version.
2. On the **Agentics** tab, the **Account** row shows who is signed in and your balance. Click **Sign in** if you are not signed in.
3. Pick a **Model**.
4. Choose **Agentics** in **Active provider**.

When you are signed in, the same button reads **Top up** and opens your wallet in the Agentics console. You can also open **⚙️ → Account** in the desktop app to see your account ID and balance or to sign out. Signing in or out restarts the app.

### Use a local model

1. Start your model server. For LM Studio, run `lms server start` (default port 1234).
2. On the **Local model** tab, enter the **Base URL** and an **API Key**.
3. Click **Test Connection**. It lists the models loaded on the server; pick one in **Default model**.
4. Choose **Local model** in **Active provider**.

### Use a cloud endpoint

1. On the **Cloud model** tab, enter your provider's OpenAI-compatible **Base URL** and **API Key**.
2. Click **Test Connection** and pick a model from the list, or choose **Custom…** and type the model ID.
3. Choose **Cloud model** in **Active provider**.

If Cloud model is active without a Base URL, the engine refuses to start and asks you to fill it in.

### Image input

The Local model and Cloud model tabs have an **Image input** checkbox, ticked by default. Leave it ticked if the model can read images, so agents can look at the pictures they open (for example when checking scene plates). Untick it for a text-only model, otherwise a request that includes an image may fail.

For the Agentics provider this is decided automatically from OpenRouter's model catalog: a model listed with image input can see images, and any other model is treated as text-only.

## Switch the engine and model from the top bar

1. In the console's top bar, set **Engine** to **agentics**.
2. **Language Model** now lists the providers (Agentics and Local model; Cloud model only while it is active).
3. A second menu next to it lists the models of that provider. Picking one writes it back to the Generation Models page, so both places always match.

**Smart Assignment** is not offered on this engine: every agent uses the provider and model you set. To give one agent another engine, use its **Model** button (see [Language models and smart assignment](/videoagents/models/language-models#give-one-agent-its-own-model)).

## Sign-in prompt

If the Agentics provider is active and no account is signed in, the console shows **Sign in to get started** when you select the engine.

- In the desktop app, click **Sign in**. After signing in, the app restarts.
- In the web version, the message explains that the provider needs the desktop app, or that you can switch the card to a local model.

## Good to know

- Each reply can use up to 65,536 output tokens (8,192 for the Local model provider), and models are given a 128,000-token context window. The session is compacted before the window fills. A run whose last reply is cut off by the output cap is marked as failed.
- The engine runs agents without approval prompts.
- Sessions are kept between runs, so an agent continues its conversation. Send `/clear` in its chat to start fresh (see [Chat commands](/videoagents/console/chat-commands)).
- The **Thinking effort** setting under **⚙️ → Advanced → Agent Advanced Settings** applies to this engine, except for local models.

::: details Running from source
Run `make install-pi` once to install the bundled engine (needs Node.js 22.19 or newer). You can raise the model limits when your model server allows larger values:

```bash
AGENTICS_CONTEXT_WINDOW=262144 AGENTICS_MAX_OUTPUT_TOKENS=131072 ./run.sh
```

See [Run from source](/videoagents/getting-started/run-from-source).
:::

## Troubleshooting

**"Built-in Agentics engine not found".**
The bundled engine is missing. From source, run `make install-pi`. In the desktop app, reinstall the app.

**Choosing Agentics in Active provider jumps back to the previous provider.**
The page shows why next to **Changes save automatically**: the Agentics provider needs the desktop app, a signed-in account, and at least one model in the list.

**An agent says it can't see an image.**
The model is treated as text-only. For Local model or Cloud model, tick **Image input** if the model really supports images, or choose a model that does.

## Related

- [Agent engines](/videoagents/models/agent-engines)
- [Language models and smart assignment](/videoagents/models/language-models)
- [Set up providers](/videoagents/getting-started/set-up-providers)
- [Agent advanced settings](/videoagents/console/agent-advanced-settings)
