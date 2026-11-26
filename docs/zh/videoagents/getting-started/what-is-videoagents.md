---
title: VideoAgents 是什么
description: VideoAgents 能做什么，一支 AI Agent 团队怎样把小说做成剧集视频，以及开始之前需要准备什么。
tags: [beginner, film, tutorial]
order: 10
---

# VideoAgents 是什么

VideoAgents 让一支由你指挥的 AI Agent 团队，把小说做成剧集视频。故事由你提供，模型由你选择；Agent 一步一步完成工作，在关键节点停下来等你批准。

如果把视频模型比作摄影机，VideoAgents 就是围绕它的整个制片厂：编剧、设计、导演、剪辑和审核，由他们决定摄影机该拍什么，并让每个镜头和上一个镜头保持一致。

![VideoAgents 控制台：左侧是 Agent 列表，中间是与视频生成 Agent 的对话，右侧是运行面板和资源消耗](/images/videoagents/getting-started/what-is-videoagents-console.webp)

## 工作方式 {#how-it-works}

1. **你提供故事。** 新建项目，粘贴或导入小说，描述基调，选一种画面风格。
2. **团队构建世界。** Agent 把小说拆解成事件和时间线，再写出世界圣经、人物、生物、场景、道具和美术风格。之后的每一步都以这些为准。
3. **团队在这个世界里制作剧集。** 剧本、故事板、3D 白模预演（可选）、视频提示词、视频、声音、剪辑、后期处理、审核和发布，一次做一集。
4. **你来签字。** 工作最多会在 12 个签字点停下，从世界圣经一直到发布。在你批准上游那一步之前，花钱的步骤都不会运行。

完整的介绍见[世界与作品](/zh/videoagents/concepts/worlds-and-works)和[工作流](/zh/videoagents/concepts/workflow)。

## 包含哪些部分 {#what-is-in-the-box}

| 部分 | 是什么 |
| --- | --- |
| **Agent 团队** | 17 个部门的 119 个专职 Agent：剧情、世界设定、角色、生物、场景、美术、导演、视频生成、音频、剪辑、审核、发布，以及其他项目类型的团队。见 [Agent 团队](/zh/videoagents/concepts/agent-crew)。 |
| **控制台** | 一个网页，你在这里和 Agent 对话、查看运行情况、打开所有预览页。桌面应用里显示的是同一个控制台。界面支持 12 种语言。 |
| **预览页** | 每类产物一个页面：人物、场景、道具、剧本、故事板、导演台、后期处理、成片等。大多数页面上有 **✏️ 修改** 按钮，把你的修改意见发给[修改师](/zh/videoagents/concepts/reviser)。 |
| **工作流** | 预先声明好的任务流水线，写明任务之间的依赖和签字点。你可以在 **工作流预览** 页查看。 |
| **项目目录** | 每张设定卡、每条提示词、分镜表、审核报告和视频都是项目目录里的文件。见[文件、运行记录与版本](/zh/videoagents/concepts/files-and-runs)。 |

## 项目类型 {#project-types}

新建项目时要选一种类型，它决定项目走哪条工作流。

| 类型 | 你提供 | 你得到 |
| --- | --- | --- |
| 🎬 **影视剧**（默认） | 一部小说 | 由小说改编的多集剧集 |
| 🎙️ **音频配画** | 一段讲述录音和对应文稿 | 贴合录音生成的画面 |
| 🧑‍💼 **数字人** | 一段对话录音，每个说话人一张照片 | 口型同步的说话人视频 |
| ✂️ **混剪** | 一份文稿和你的本地素材库 | 用现成镜头剪出的成片 |
| 🖥️ **动效短片** | 一个主题或一份文稿，加上 59 种风格中的一种 | 用代码写成、逐帧渲染的短片，不用视频模型 |

更多类型由插件提供，例如衍生小说、融合小说和有声剧。见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。

## 自带引擎和服务商 {#bring-your-own-engine-and-providers}

VideoAgents 本身不含语言模型和视频模型，需要你接入自己的：

- **Agent 引擎**负责运行 Agent。可以用内置的 Agentics 引擎，也可以用你已经在用的编程 CLI，例如 Claude Code、Codex CLI、Kimi Code、Pi、OpenCode、Grok Build 或 Antigravity CLI。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。
- **生成服务商**负责生成图像、视频、配音、音乐和音效。每一类单独设置，所以你可以混用不同厂商，有更好的模型时随时切换。见[设置服务商](/zh/videoagents/getting-started/set-up-providers)。

::: warning 注意
图像、视频、配音和音乐的生成费用由你接入的服务商收取。付费步骤之前都有审核，但生成的内容仍要付费。见[成本控制](/zh/videoagents/models/cost-control)。
:::

## 本地优先 {#local-first}

VideoAgents 在你的电脑上运行。小说、项目文件和生成的媒体都保存在本地目录里，服务默认只监听 `127.0.0.1`。每一步需要的内容会发给你接入的服务：文本发给引擎的语言模型，提示词和参考图发给图像或视频服务商，以此类推。

VideoAgents 基于 GPL-3.0 开源，源代码在 [GitHub](https://github.com/AgenticsWorld/VideoAgents) 上。

## 从这里开始 {#start-here}

1. [安装桌面应用](/zh/videoagents/getting-started/install-desktop-app)（Mac 或 Windows），或[从源码运行](/zh/videoagents/getting-started/run-from-source)。
2. [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。
3. [设置服务商](/zh/videoagents/getting-started/set-up-providers)。
4. [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)，或者先[打开示例项目](/zh/videoagents/getting-started/open-a-sample-project)，看看完成后的效果。

## 相关文档 {#related}
- [世界与作品](/zh/videoagents/concepts/worlds-and-works)
- [Agent 团队](/zh/videoagents/concepts/agent-crew)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
- [控制台导览](/zh/videoagents/console/console-tour)
