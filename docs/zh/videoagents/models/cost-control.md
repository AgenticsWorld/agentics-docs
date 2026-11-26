---
title: 成本控制
description: VideoAgents 项目的钱花在哪里，哪些设置能把费用压下来，哪些选项免费，以及怎样查看已经花了多少。
tags: [cost, providers, beginner, how-to]
order: 100
---

# 成本控制

VideoAgents 使用你自己的引擎和服务商账号，所以每一次模型调用都由你付费。工作流的设计是尽量晚花钱：在不花钱的步骤上先审看，签字之后才开始付费生成，已完成的成果会复用，而不是重新生成。本页汇总影响成本的设置，并说明在哪里查看花费。

## 钱花在哪里 {#where-the-money-goes}

| 环节 | 谁收费 | 在哪里设置 |
| --- | --- | --- |
| Agent 思考和写作 | 你的引擎订阅或语言模型服务商 | 顶栏的 **引擎** 和 **语言模型** |
| 图片（设定图、场景、分镜背景图、关键帧、草图） | 图像服务商 | **🖼 图像模型** |
| 视频片段（通常是最大的开销） | 视频服务商 | **🎬 视频模型** |
| 嗓音、音乐、音效 | 语音、音乐和音效服务商 | **🎙 TTS语音模型**、**🎵 音乐模型**、**🔊 音效模型** |
| 超分、数字人、3D 模型、世界模型 | 各卡片的服务商 | **⚙️ → 生成模型** 上对应的卡片 |

## 工作流已经遵循的做法 {#habits-the-workflow-already-follows}

- **先审看，再付费。** 剧本预览、故事板草图和动态样片让你在生成任何视频之前就发现问题。付费的视频生成要等你签字，上游有改动时，签字会被标为过期。参见[签字点](/zh/videoagents/concepts/sign-off-gates)。
- **先出草稿，后做超分。** 片段先按草稿分辨率生成，只有审核通过的才提升到成片分辨率。参见[超分](/zh/videoagents/models/upscale)。
- **先复用，再重新生成。** 角色设定图、场景图和道具参考图在后面的镜头里以引用方式复用，不会为每个镜头重画一遍。
- **默认不自动重跑。** **重跑次数** 默认是 0，检查不通过时交给你处理，而不是自行重新生成。可以在 **⚙️ → 高级 → Agent 高级设置** 里调高，或者发 `/retry N`（0–10）。参见[聊天命令](/zh/videoagents/console/chat-commands#retry-retry-count)。
- **简单工作用便宜模型。** **智能分配** 把审核、索引和机械类工作交给引擎里较便宜的模型。参见[语言模型与智能分配](/zh/videoagents/models/language-models)。

## 影响账单的设置 {#settings-that-change-the-bill}

![输出设置，显示草稿分辨率和成片分辨率菜单](/images/videoagents/models/cost-control-resolution.webp)

**🎛️ → 输出设置**（按项目）：

- **草稿分辨率** 和 **成片分辨率**。分辨率越高，视频生成越贵。草稿保持在低分辨率（最低 480p），成片交给超分。
- **背景图模式**：选 **九宫格自动补图** 时，九宫格里没有合适格子的每张分镜背景图，都会再单独生成一张。**九宫格手动补图** 不额外生成；缺的背景图由你在场景预览页自己截取。

**🎛️ → 模型限制**（按项目）：组时长和参考素材上限应当和视频模型匹配，避免生成失败后再重试。参见[模型限制](/zh/videoagents/console/model-limits)。

**🔍 超分**：**ffmpeg** 免费。在火山引擎上使用 Seedance 2.5 时，样片模式从审核通过的 480p 样片生成 1080p 成片，样片的费用和普通 480p 片段相同。

**预览页上的 🎨 图像模型**：在故事板页给故事板草图单独配一个便宜、快速的模型。参见[图像模型](/zh/videoagents/models/image-models#override-the-image-model-on-a-page)。

**⚙️ → 自动运行**：总制片所用引擎的会话窗口用量超过用量阈值（默认 80%）时，自动运行会跳过这一轮。参见[自动运行](/zh/videoagents/console/auto-run)。

**RunningHub 上的 ComfyUI**：**运行模式**（机器规格）越高，每秒费用越高。

## 免费的选项 {#options-that-cost-nothing}

| 选项 | 位置 |
| --- | --- |
| 音乐用 **代码作曲**，音效用 **代码音效** | 音乐模型和音效模型卡片 |
| 用 **Openverse** 检索现成的免费音效 | 音效模型卡片 |
| **ffmpeg** 超分 | 超分卡片 |
| 本地语言模型（LM Studio、Ollama、vLLM…） | 语言模型/Agentics 卡片，**本地模型** |
| 在你自己的 GPU 上运行本地 ComfyUI 工作流 | 任意 **ComfyUI** 标签页，**本地** 运行方式 |
| 本地 Hunyuan3D 和 HunyuanWorld 服务 | 3D 模型和世界模型卡片 |

本地运行需要合适的硬件和模型文件；[ComfyUI](/zh/videoagents/models/comfyui) 的模板说明里列出了各自的需求。

## 查看花费 {#see-what-you-have-spent}

**运行面板。** 每条运行记录都显示耗时；引擎报告费用和 token 时，也会显示出来。

**资源消耗。** 控制台右侧的面板显示引擎的会话用量和每周用量，以及 OpenRouter、火山引擎和 RunningHub 的余额。在 **⚙️ → 资源消耗** 里逐项开启检查并填写 Key；面板每 10 分钟刷新一次。参见[资源消耗](/zh/videoagents/console/resource-usage)。

**工作流预览。** 汇总栏显示已用时间、剩余时间，以及项目的 **消耗语言tokens**、**消耗视频tokens** 和 **消耗图片tokens** 总量，包括重新生成的部分。

![工作流预览的汇总栏，显示进度、时间和 token 总量](/images/videoagents/models/cost-control-tokens.webp)

**文件。** 服务商报告了某张图片或某段视频的 token 用量时，用量会追加到输出文件夹里的 `usage_ledger.jsonl`；即使文件被重新生成，历史记录也会保留。工作流预览的总量就来自这些记录。

## 几点说明 {#good-to-know}
- 中断的 Fal 任务在再次运行同一生成时会接着取回结果，不会重复计费。
- 审核模型卡片上的 **测试** 会真实调用一次并计费（约 $0.00003）。
- 服务商的价格会变。以各服务商自己的价格页为准。

## 相关文档 {#related}
- [超分](/zh/videoagents/models/upscale)
- [语言模型与智能分配](/zh/videoagents/models/language-models)
- [输出设置](/zh/videoagents/console/output-settings)
- [资源消耗](/zh/videoagents/console/resource-usage)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
