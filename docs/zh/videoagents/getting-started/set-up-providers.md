---
title: 设置服务商
description: 在生成模型页选择由哪个服务生成图像、视频、配音、音乐和音效，并填入它们需要的 Key。
tags: [providers, beginner, how-to]
order: 50
---

# 设置服务商

服务商是生成媒体的服务：图像、视频、配音、音乐、音效等。你在 **生成模型** 页为每一类媒体选一个服务商，所以可以混用不同厂商，有更好的模型时随时切换。

[Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)单独设置。引擎负责运行 Agent；服务商负责生成 Agent 要的画面和声音。

## 开始之前 {#before-you-start}
- 想好要用哪些服务，去这些服务那里注册账号、创建 API Key。生成模型页上很多服务商标签页都有指向服务商网站的链接。
- 在桌面应用里，如果你已登录 Agentics 账号，默认的服务商不用 Key 就能直接用。

## 打开生成模型页 {#open-the-generation-models-page}

打开 **⚙️ → 生成模型**。页面标题是 **🎨 生成模型设置**，每类媒体一张卡片。

改动会自动保存：文本框和 Key 输入框在你离开输入框或按 Enter 时保存，下拉菜单和复选框一改就保存。页面上没有保存按钮。

## 设置一张卡片 {#set-up-a-card}

1. 在卡片标题栏打开 **生效渠道**，选择要用的服务。Agent 调用的就是它。
2. 点这个服务商的标签页，查看它的设置。生效渠道的标签页带 ✅。
3. 填入 API Key，选一个模型。有些服务商还有额外的字段，例如站点或区域，或者一个测试按钮。

![图像模型卡片：生效渠道为火山引擎，下面是 API Key 输入框和模型菜单](/images/videoagents/getting-started/set-up-providers-image-card.webp)

标签页只用来查看和编辑。你可以修改未生效服务商的设置；在 **生效渠道** 里选中它之前，它不会被使用。

## 各张卡片 {#the-cards}

| 卡片 | 生成什么 | 服务商 | 新安装时的默认值 |
| --- | --- | --- | --- |
| **🧩 语言模型/Agentics** | 只供内置 **agentics** 引擎使用的语言模型 | Agentics、本地模型、云端模型 | Agentics |
| **🖼 图像模型** | 概念图、设定图、草图、关键帧和背景图 | Agentics、OpenRouter、火山引擎、BytePlus、Fal、RH（RunningHub）、ComfyUI | Agentics |
| **🎬 视频模型** | 每个生成组的视频，连同原生对白和声音 | Agentics、OpenRouter、火山引擎、BytePlus、Fal、RH、ComfyUI | Agentics |
| **🎙 TTS语音模型** | 角色声音样本、旁白和配音 | Agentics、OpenRouter、火山引擎、ElevenLabs、MiniMax、ComfyUI | Agentics |
| **🎵 音乐模型** | 背景音乐 | 代码作曲、Agentics、OpenRouter、ElevenLabs、ComfyUI | 代码作曲（新装的桌面应用为 Agentics） |
| **🔊 音效模型** | 音效片段 | 代码音效、Openverse、ElevenLabs、Fal | 代码音效 |
| **🧑 数字人** | 数字人项目的说话人视频 | Agentics、HeyGen、Kling AI、ComfyUI | Agentics |
| **🔍 超分** | 把草稿分辨率的视频放大到成片分辨率 | ffmpeg、Agentics、火山引擎、MiniMax、ComfyUI | ffmpeg |
| **🌍 世界模型** | 场景的可探索 3D 世界 | World Labs、HunyuanWorld | World Labs |
| **🧊 3D 模型** | 由参考图生成 3D 模型 | Tripo、Fal、RH、本地 Hunyuan3D | Tripo |
| **🛡 审核模型** | 在 NSFW 模式下判定被拒的请求 | Agentics、OpenRouter | Agentics |

Agentics 服务商的费用记在你的 Agentics 账号上，需要在桌面应用里登录该账号。**代码作曲**、**代码音效** 和 **ffmpeg** 在你的电脑上运行，不花钱。Openverse 不生成音效，而是查找现成的免费音效。

::: tip 提示
**🧊 3D 模型** 卡片是 v1.0.45 之后新增的。如果看不到，请更新 VideoAgents。
:::

## 第一个影视项目需要什么 {#what-a-first-film-project-needs}

做影视剧集，至少要设置：

- **图像模型** 和 **视频模型**。
- **TTS语音模型**，用于角色声音样本。
- **音乐模型** 和 **音效模型** 一开始可以保持代码作曲和代码音效。
- **语言模型/Agentics** 只在引擎为 **agentics** 时需要设置。

其他卡片只和用到它们的功能有关，例如世界模型、3D 模型或数字人项目。

::: warning 注意
图像、视频、配音和音乐的生成费用由服务商收取。开始前请查看各服务商的价格，并参阅[成本控制](/zh/videoagents/models/cost-control)，了解哪些设置可以压低花费。
:::

## 参考视频需要对象存储 {#object-storage-for-reference-videos}

有些视频模型只接受公网地址上的参考视频，火山引擎（Seedance）就是其中之一。这时 VideoAgents 会把本地文件上传到对象存储，再把临时链接传给模型。如果你打算使用参考视频（例如 3D 白模的运镜视频），请在 **⚙️ → 存储与图库** 里设置一个存储服务。见[对象存储与图库](/zh/videoagents/models/object-storage)。

## 单页覆盖 {#per-page-overrides}

有些预览页的顶栏有自己的模型菜单。例如人物预览有一个 **🎨 图像模型** 菜单。设为 **跟随全局** 时，这个页面使用生成模型页的设置。

## 了解更多 {#learn-more}

每类媒体都有单独的页面，介绍模型、设置和限制：

- [图像模型](/zh/videoagents/models/image-models)
- [视频模型](/zh/videoagents/models/video-models)
- [配音模型](/zh/videoagents/models/voice-models)
- [音乐与音效模型](/zh/videoagents/models/music-and-sound-models)
- [数字人模型](/zh/videoagents/models/digital-human-models)
- [超分](/zh/videoagents/models/upscale)
- [3D 模型服务商](/zh/videoagents/models/3d-model-providers)
- [ComfyUI](/zh/videoagents/models/comfyui)（本地、Comfy Cloud 或 RunningHub）

## 相关文档 {#related}
- [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)
- [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)
- [成本控制](/zh/videoagents/models/cost-control)
- [NSFW 模式](/zh/videoagents/models/nsfw-mode)
