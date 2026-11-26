---
title: 超分
description: 选择把审核通过的片段从草稿分辨率提升到成片分辨率的方式，从免费的 ffmpeg 缩放到 AI 超分模型。
tags: [providers, video-generation, cost, how-to]
order: 70
---

# 超分

VideoAgents 先用较低的草稿分辨率生成和审看视频，再把审核通过的片段提升到成片分辨率。**🔍 超分** 卡片决定最后这一步怎么做。用草稿分辨率生成、只对保留下来的片段做超分，是省钱的主要办法之一。

## 什么时候做超分 {#when-upscaling-happens}

项目的 **🎛️ → 输出设置** 里有 **草稿分辨率**（480p、720p、1080p 或 4K）和 **成片分辨率**（480p、720p、1080p、2K 或 4K）。两者不同时，每个组片段的成片版本通过超分得到，而不是重新生成。目标尺寸是成片分辨率按项目画幅换算后的尺寸；帧率、时长和音轨沿用源片段。

参见[输出设置](/zh/videoagents/console/output-settings)。

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 找到 **🔍 超分** 卡片。
3. 点某个标签页查看这种方式的设置，然后在卡片标题栏的 **生效渠道** 里选择要用的方式。

![超分卡片，当前打开 ffmpeg 标签页](/images/videoagents/models/upscale-card.webp)

## 超分方式 {#methods}

| 标签页 | 作用 | 费用 | 需要设置 |
| --- | --- | --- | --- |
| **ffmpeg**（默认） | 内置插值放大：像素变多，但不增加新细节 | 免费 | **缩放算法**、**CRF**、**编码预设** |
| **Agentics** | 你桌面端账号上的 AI 超分模型 | 从你的账号扣费 | **模型**（默认 `scale-seedvr2`） |
| **火山引擎** | Seedance 2.5 样片模式：从审核通过的 480p 样片生成 1080p 成片 | 成片按正常生成价格计费 | 这个标签页没有要设置的项 |
| **MiniMax** | MiniMax Regenerate-2K | 由 MiniMax 收费 | **接口区域**、该区域的 **API Key**；模型固定 |
| **ComfyUI** | SeedVR2 类超分工作流 | 本地运行免费；在 Comfy Cloud 或 RunningHub 上运行收费 | 运行方式和工作流 |

### ffmpeg {#ffmpeg}

默认方式。适合只需要达到发布尺寸的项目。

| 设置 | 选项 | 默认值 |
| --- | --- | --- |
| **缩放算法** | lanczos（较锐利）、bicubic（平滑）、spline、bilinear（最软） | lanczos |
| **CRF** | 0–51；数值越小画质越高、文件越大；18 约等于视觉无损 | 18 |
| **编码预设** | ultrafast、fast、medium、slow、veryslow | slow |

### 火山引擎（Seedance 2.5 样片模式） {#volcano-engine-seedance-2-5-draft-mode}

选中这种方式就开启了样片模式。它沿用视频模型卡片火山引擎标签页上的 Key 和模型。

只有以下条件全部满足时才生效；否则视频照常按普通模式生成，并在日志里说明原因：

- 视频的生效渠道是火山引擎（或 BytePlus），模型是 Seedance 2.5。
- **输出设置** 里 **草稿分辨率** 为 480p，**成片分辨率** 为 1080p。

工作方式：

1. 生成时，每个组都以 480p 样片提交。样片的费用和普通 480p 视频相同，它的任务 ID 保存在片段的 `.meta.json` 里。
2. 超分这个片段时，火山会按这个任务 ID，用相同的提示词、参考素材、时长、画幅、seed 和音频设置生成 1080p 成片，所以成片保留了你审核通过的内容。成片按正常生成计费。
3. 样片任务 ID 有效期 7 天。过期后只能重新生成样片。

### MiniMax Regenerate-2K {#minimax-regenerate-2k}

只适用于 MiniMax-H3 生成的 768P 片段。源片段必须带音轨、帧率为 24 fps、宽和高都能被 32 整除、面积不超过 768×1344，帧数在 107–362 之间（约 4–15 秒）。2K 结果会再缩放到成片分辨率。国际站（minimax.io）和国内站（minimaxi.com）的 Key 互不通用。

### ComfyUI {#comfyui}

附带的模板是 `scale-seedvr2-api.json`。SeedVR2 节点是 ComfyUI 内置的，所以它也能在 Comfy Cloud 上运行，不过较长的 1080p 及以上片段在那里可能内存不足。在 RunningHub 上，先在你的工作区里运行一次 SeedVR2 类工作流，再用 **添加工作流** 把它加进来；这份工作流列表和视频模型卡片上的列表是分开的。参见 [ComfyUI](/zh/videoagents/models/comfyui)。

## 几点说明 {#good-to-know}
- 没有备用方式。如果所选方式没通过检查或出错，超分任务就会失败，并报告给你。只想做普通缩放时，选 ffmpeg。
- 每个超分后片段的 `.meta.json` 都记录了所用方式。**成片发布** 页会给每个片段打标签：插值放大、AI 超分或未超分。
- 超分后的片段会经过自动瑕疵检查（插值放大查光晕、涂抹和闪烁；AI 超分查闪烁以及与源片段的相似度）。

## 相关文档 {#related}
- [输出设置](/zh/videoagents/console/output-settings)
- [视频模型](/zh/videoagents/models/video-models)
- [成片与发布](/zh/videoagents/create/publishing)
- [成本控制](/zh/videoagents/models/cost-control)
