---
title: 视频模型
description: 选择把每个生成组变成视频片段的服务商和模型，填写 Key，并让项目的模型限制和模型能力匹配。
tags: [providers, video-generation, how-to]
order: 40
---

# 视频模型

视频模型把每个生成组（一串镜头，连同它的提示词和参考图）生成为一段视频。它通常是项目里花钱最多的一项，所以要慎重选择，并让项目的限制和它相匹配。

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 找到 **🎬 视频模型** 卡片。
3. 点某个标签页，查看或修改这个服务商的设置。
4. 在卡片标题栏的 **生效渠道** 里，选择 Agent 实际使用的服务商。✅ 标在它的标签上。

修改会自动保存。

![视频模型卡片，当前打开火山引擎标签页](/images/videoagents/models/video-models-card.webp)

## 服务商 {#providers}

| 标签页 | 是什么 | 需要填写 | 默认模型 |
| --- | --- | --- | --- |
| **Agentics** | 你的 VideoAgents 桌面端账号 | 不用填，登录即可。从账号提供的列表里选一个 **模型** | — |
| **OpenRouter** | [OpenRouter](https://openrouter.ai) 上的视频模型 | **API Key**、**模型** | Seedance 2.0 |
| **火山引擎** | [火山方舟](https://console.volcengine.com/ark/)上的 Seedance | 方舟 **API Key**、**模型** | Seedance 2.5 |
| **BytePlus** | [BytePlus ModelArk](https://console.byteplus.com/ark) 上的 Seedance（中国以外地区） | ModelArk **API Key**、**模型** | Seedance 2.5 |
| **Fal** | [fal.ai](https://fal.ai/dashboard/keys) 托管的视频端点 | **API Key**、**模型** | MiniMax H3 Max |
| **RH** | RunningHub 的标准模型 API | **渠道**（站点）、**API Key**、**模型** | `rhart-video/sparkvideo-2.0/multimodal-video` |
| **ComfyUI** | 你自己的工作流，运行在本地 ComfyUI、Comfy Cloud 或 RunningHub 上 | 参见 [ComfyUI](/zh/videoagents/models/comfyui) | — |

新安装时，生效渠道默认是 **Agentics**。

### 内置的模型选项 {#built-in-model-choices}

**火山引擎：** Seedance 2.5（单次生成最长 30 秒，参考素材最多 30 张图片 + 10 段视频 + 10 段音频，480p / 720p）、Seedance 2.0（音画同出，最高 4K）、Seedance 2.0 Fast 和 Seedance 2.0 Mini（480p / 720p）。**自定义…** 可以填其他模型 ID 或推理接入点 ID（`ep-…`）。

**BytePlus：** 同样的 Seedance 2.5 和 2.0 系列，另有 Seedance 1.0 Pro 和 1.0 Pro Fast。

**Fal：** MiniMax H3 Max、H3、H3 Max Turbo 和 H3 Max Lip Sync，Seedance 2.5 和 2.0，Wan 3.0，Kling 4.0，以及 Kling 3.0 Pro / Standard。菜单里每一项都列出它支持的时长、分辨率和参考素材上限。你填的是模型系列，系统会按每个任务发送的内容选用对应端点（文生视频、图生视频或参考生视频）。**搜索 Fal 模型** 可以找到其他模型，搜索的用法参见[图像模型](/zh/videoagents/models/image-models#provider-notes)。Fal 的 Key 和图像模型卡片共用。

**OpenRouter：** 模型列表来自 OpenRouter 的视频模型目录，推荐模型排在最前（⭐），例如 Seedance 2.5 / 2.0、MiniMax H3、Kling 3.0、Wan 3.0、Veo 3.1、FLUX.3 Video、Runway Gen-4.5、Grok Imagine Video 和 Sora 2 Pro。**验证 Key** 用来检查 Key。

**RH：** 选择站点（runninghub.ai 或 runninghub.cn）并填入该站点的 Key。第一次打开这个标签页时，会从 RunningHub 的文档读取模型菜单（大约一分钟）。VideoAgents 按输入（首尾帧、参考素材或纯文本）在所选模型的各个端点之间切换，并取该模型支持的最接近的时长、分辨率和画幅。

**MiniMax：** 还有一个用于 MiniMax-H3 的标签页，但只有它已经是生效渠道时才会显示。

## 让项目和模型匹配 {#match-the-project-to-the-model}

不同视频模型的单次生成时长，以及能接受的参考图片、视频和音频数量各不相同。每个项目把这些限制保存在 **🎛️ → 模型限制** 里，提供 Seedance 2.0、Seedance 2.5、MiniMax H3 和 Wan 3.0（以及 Kling 4.0）的预设。新建项目时，向导会选用和当前生效视频模型匹配的预设。

换用限制不同的模型时，也要同步修改 **模型限制**。例如，改用 Seedance 2.5 之前，先调高组时长和参考素材上限。参见[模型限制](/zh/videoagents/console/model-limits)。

有些模型还会自动加载对应的提示词技能，让 Prompt 工程师按这个模型期望的风格写提示词（例如 Fal 上的 Wan 3.0 用 `wan3-pe`，Kling 4.0 用 `kling4-pe`）。参见[视频提示词与提示词技能](/zh/videoagents/create/video-prompts)。

## 为某一集或某个组换用其他模型 {#use-a-different-model-for-one-episode-or-group}

**分镜预览** 页顶部有一个针对当前这一集的视频服务商菜单；每个组的 **🎛 组视频模型** 对话框也可以把这个组换到另一个服务商和模型。其余内容仍以生成模型页的设置为默认。参见[分镜预览](/zh/videoagents/create/storyboard-preview)。

## 分辨率 {#resolution}

项目的 **🎛️ → 输出设置** 里有两个分辨率：

- **草稿分辨率**：反复修改和审看时使用。
- **成片分辨率**：签字后的目标分辨率。和草稿分辨率不同时，成片版本通过超分得到，而不是重新生成。

分辨率越高越贵。在[超分](/zh/videoagents/models/upscale)卡片上选择超分方式。在火山引擎上使用 Seedance 2.5 时，超分卡片还提供样片模式，从审核通过的 480p 样片生成 1080p 成片。

## 几点说明 {#good-to-know}
- 每次生成都会记录所用的模型、服务商和参考素材。火山引擎还会把每段视频的 token 用量写进该片段的 `.meta.json`，以及同一文件夹里的 `usage_ledger.jsonl`，工作流预览会把它汇总为 **消耗视频tokens**。
- 中断的 Fal 任务，在用相同的提示词和参考素材再次运行同一生成时会接着取回结果，不会重新提交、重复计费。
- 开启 **NSFW 模式** 后，被标记的组可以改用单独的备用视频模型；主服务商因内容拒收时，也可以自动切换到备用模型一次。参见 [NSFW 模式](/zh/videoagents/models/nsfw-mode)。
- 火山方舟会拒收看起来像真人的参考图，除非这些图片已登记在[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)里。

## 常见问题 {#troubleshooting}

**某个组因时长或参考素材数量出错。**
项目的 **模型限制** 超出了模型能接受的范围。选用和你的模型对应的预设。

**火山引擎的视频因隐私或敏感内容被拒。**
如果是人脸问题，把角色图片登记到[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。发给火山方舟的参考视频需要[对象存储](/zh/videoagents/models/object-storage)。

**选了 Agentics，又跳回了之前的服务商。**
它需要桌面应用和已登录的账号。

## 相关文档 {#related}
- [图像与视频生成](/zh/videoagents/create/image-and-video-generation)
- [模型限制](/zh/videoagents/console/model-limits)
- [输出设置](/zh/videoagents/console/output-settings)
- [超分](/zh/videoagents/models/upscale)
- [成本控制](/zh/videoagents/models/cost-control)
