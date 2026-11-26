---
title: 音乐与音效模型
description: 选择背景音乐和音效的来源：从免费的代码渲染音频、Openverse 检索，到 ElevenLabs、OpenRouter、Fal 和 ComfyUI。
tags: [providers, music, audio, how-to]
order: 60
---

# 音乐与音效模型

生成模型页上有两张卡片决定语音以外的音频从哪里来：**🎵 音乐模型** 负责背景音乐（BGM），**🔊 音效模型** 负责音效和环境声。两张卡片都有不花钱的选项。

打开 **⚙️ → 生成模型**，点标签页查看某个服务商的设置，在卡片标题栏的 **生效渠道** 里选择服务商。修改会自动保存。

## 音乐 {#music}

![音乐模型卡片，当前打开代码作曲标签页，显示采样乐器库](/images/videoagents/models/music-and-sound-models-music.webp)

| 标签页 | 作用 | 需要填写 | 默认模型 |
| --- | --- | --- | --- |
| **代码作曲** | 不调用音乐模型。Agent 写一份作曲脚本，VideoAgents 用采样乐器和合成器把它渲染成音频。不收费，节拍可以和画面逐帧对齐 | 不用填 | — |
| **Agentics** | 你的 VideoAgents 桌面端账号上的音乐模型 | 不用填，登录即可。选一个 **模型** | `minimax-music-3` |
| **OpenRouter** | [OpenRouter](https://openrouter.ai) 上的 Google Lyria 3 | **API Key**、**模型** | Lyria 3 Clip（30 秒片段和循环）；Lyria 3 Pro 可以生成完整歌曲 |
| **ElevenLabs** | [Eleven Music](https://elevenlabs.io/app/settings/api-keys) | **API Key**、**模型**、**强制纯音乐** | Eleven Music v1（列表里也有 v2） |
| **ComfyUI** | 你自己的音乐工作流 | 参见 [ComfyUI](/zh/videoagents/models/comfyui) | — |

桌面应用新安装时默认用 **Agentics**；网页版默认用 **代码作曲**。动效短片项目默认用代码作曲。

### 代码作曲 {#code-composition}

- **自动下载**：作曲脚本用到电脑上还没有的采样库时，只下载那一个库。默认开启。
- **采样乐器库** 列出五个库（管弦乐、打击乐与民族乐器、通用乐器与鼓组、木管与铜管、三角钢琴），附带大小和 **下载** 或 **删除** 按钮。一个库都没有时，只能用合成器音色。
- **试听** 里的 **渲一段示范配乐** 会播放一段简短示例。
- 这些库来自开源项目 lemo-opuscar，存放在 `data/.videoagents/codevideo/`。如果作品用到了许可要求署名的乐器（Salamander 钢琴、FreePats 鼓组），署名行会自动加进影片的片尾字幕。

### ElevenLabs {#elevenlabs}

**强制纯音乐(无人声,适合 BGM)** 默认开启。每段配乐可以是 3–600 秒，也可以交给模型决定。输出格式只有 `.mp3` 或 `.opus`。

### ComfyUI {#comfyui}

推荐的本地模板是 `music-ace-step-v1-api.json`（ACE-Step 3.5B）。背景音乐默认是纯音乐。

## 音效 {#sound-effects}

![音效模型卡片，当前打开 Openverse 标签页](/images/videoagents/models/music-and-sound-models-sfx.webp)

| 标签页 | 作用 | 需要填写 |
| --- | --- | --- |
| **代码音效** | 不检索，也不调用模型。Agent 写一份音效脚本，VideoAgents 用程序合成（点击、嗖声、闷响、纸张、环境底噪……），每个声音都能落在画面事件的那一帧上。不收费 | 不用填 |
| **Openverse** | 不生成音频。按英文关键词在 [Openverse](https://openverse.org) 上检索现成的免费音效，主要来自 Freesound | 可选的 **Client ID** 和 **Client Secret** |
| **ElevenLabs** | 用 ElevenLabs Sound Effects v2 生成。按条计费；0.5–30 秒 | **API Key**（留空则沿用音乐或 TTS 卡片上的 Key） |
| **Fal** | Fal 托管的同一个模型。按条计费；0.5–22 秒，描述最多 450 个字符 | **API Key**（留空则沿用图像或视频卡片上的 Key） |

新安装时默认用 **代码音效**。它适合动效短片；写实的拟音用 Openverse 或可以生成音效的服务商效果更好。

### Openverse {#openverse}

- **许可范围**：**CC0 / 公有领域(免署名,默认)**，或者同时包括需要署名的 CC BY。禁止商用或禁止修改的许可一律不用。
- **来源**：**Freesound(默认)**，或者 Freesound 加 Wikimedia Commons。
- **Client ID** / **Client Secret**：可选。不填时每分钟可检索 20 次、每天 200 次。需要更高额度，参见 [Openverse API 文档](https://api.openverse.org/v1/#tag/auth)。
- **搜索测试**：输入英文关键词（例如 `door slam`），点 **搜索**。结果可以直接在页面上试听，并显示时长、许可、来源和作者；CC BY 的结果会标明需要署名。检索要求每个关键词都匹配，所以用 2–3 个简短的词。

每条下载的音效都会把许可、作者和来源页记在它的 `.meta.json` 里。版权审核会检查 CC BY 音效是否在片尾字幕中署名。

### 什么时候生成音效 {#when-sound-effects-are-generated}

当审核缺陷单要求补一个缺失的音效或环境声时，音效和环境声 Agent 会使用音效服务商。如果 Openverse 什么都没找到，这些 Agent 会换关键词再试，然后向你报告。它们不会自行改用付费服务商。

## 相关文档 {#related}
- [音乐与音效](/zh/videoagents/create/music-and-sound)
- [音乐库](/zh/videoagents/world/music-library)
- [动效短片](/zh/videoagents/project-types/motion-graphics)
- [语音模型](/zh/videoagents/models/voice-models)
- [成本控制](/zh/videoagents/models/cost-control)
