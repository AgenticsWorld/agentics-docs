---
title: 影视剧
description: 默认的项目类型。把一部小说做成多集剧集，或者用衍生模式在小说的世界里讲一个原创故事。
tags: [film, beginner, reference]
order: 10
---

# 影视剧

影视剧是默认的项目类型。它把一部小说改编成多集视频剧集：Agent 先搭建故事所在的世界，再逐集完成剧本、分镜、生成、配音和剪辑，并在关键节点停下来等你签字。

## 开始之前 {#before-you-start}
- 一个已登录的 Agent 引擎。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。
- 在 **⚙️ → 生成模型** 设置好图像、视频和语音服务商。见[设置服务商](/zh/videoagents/getting-started/set-up-providers)。
- 小说的纯文本。也可以先建项目，之后再补正文。

## 创建影视剧项目 {#create-a-film-project}

1. 点顶栏的项目名，再点 **＋ 新建项目…**。
2. **第 1/5 步 · 项目类型：** 已经默认选中 **影视剧**。点 **下一步**。

   ![项目类型步骤，选中了影视剧](/images/videoagents/project-types/choose-a-project-type-wizard.webp)

3. **第 2/5 步 · 基础信息：**

   | 字段 | 填什么 |
   | --- | --- |
   | **项目名称** | 只能用英文字母和数字，例如 `MyNovel01` |
   | **故事文本** | 粘贴小说。如果想之后再把正文放进项目的 `novel/` 文件夹，这里留空 |
   | **内容定位** | 剧情片还是纪录片、题材与基调、目标受众、改编时保留或舍弃什么 |
   | **画面风格** | 描述画面的样子：质感、色调、光影、构图。点 **🎨 选择风格库** 可以从预设开始 |

   内容定位、画面风格和叙事节奏会加进这个项目每个 Agent 的指令里，影响之后所有的工作。

4. **第 3/5 步 · 视频节奏**、**第 4/5 步 · 模型限制** 和 **第 5/5 步 · 输出设置** 都有默认值。按需修改，或者点 **跳过向导创建**，其余步骤全部保留默认值。这些设置之后都能在 **🎛️** 菜单里修改。见[视频节奏](/zh/videoagents/console/video-pacing)、[模型限制](/zh/videoagents/console/model-limits)和[输出设置](/zh/videoagents/console/output-settings)。
5. 点 **创建**。

接着总制片会初始化项目：建文件夹，清洗小说文本并分章。完成后，它会提醒你在 **🖼 参考文件** 页上传参考图、音乐和其他素材。

## 团队做什么 {#what-the-team-does}

工作按固定的工作流推进。每个阶段都把普通文件写进项目文件夹，大多数阶段在控制台里都有一个页面可以查看结果。

| 阶段 | 做什么 | 在哪里看 |
| --- | --- | --- |
| 0 摄入与立项 | 建立项目；把小说分章，并解析出场景、对白，以及有名字的人物、地点和物品 | [导入和阅读小说](/zh/videoagents/world/novel) |
| 1 剧情理解 | 故事结构、事件卡和剧情时间轴 | — |
| 2 世界圣经 | 九个 Agent 并行描写世界，再合并结果 | [世界圣经](/zh/videoagents/world/world-bible) |
| 3 角色与资产 | 角色、服装、声音、生物、场景和道具 | [角色](/zh/videoagents/world/characters)、[场景](/zh/videoagents/world/scenes) |
| 4 美术风格 | 锁定画面风格和主要角色的设计 | [美术风格](/zh/videoagents/world/art-style) |
| 5 剧本改编 | 把书拆成若干集，逐集写剧本 | [剧本](/zh/videoagents/create/screenplay) |
| 6 导演分镜 | 镜头、机位、生成组和 3D 白模 | [分镜](/zh/videoagents/create/storyboard) |
| 7 视觉生成 | 每个组的提示词、参考图和视频 | [图像与视频生成](/zh/videoagents/create/image-and-video-generation) |
| 8 音频 | 对白、旁白、音乐和音效 | [对白](/zh/videoagents/create/dialogue)、[音乐与音效](/zh/videoagents/create/music-and-sound) |
| 9 剪辑合成 | 剪辑、字幕、过场和后期处理 | [剪辑](/zh/videoagents/create/editing)、[后期处理](/zh/videoagents/create/post-production) |
| 10 终审 | 每集并行做八项审核 | [审核](/zh/videoagents/create/qa-reviews) |
| 11 发布 | 各平台版本和发布 | [成片与发布](/zh/videoagents/create/publishing) |

要跟进进度，打开 **🧭 工作流预览**。见[工作流](/zh/videoagents/concepts/workflow)。

## 你的签字点 {#your-sign-offs}

工作流会在这些节点停下来等你：

| 签字点 | 时机 | 你确认的内容 |
| --- | --- | --- |
| H1 | 世界圣经完成后 | 世界圣经摘要 |
| H1A | 角色与资产完成后 | 角色、生物和场景，在美术和剧本开始之前 |
| H2 | 美术风格完成后 | 美术风格和主要角色的设计 |
| H3 | 第 1 集剧本完成后 | 第一集的剧本 |
| H3S、H3A、H3V、H3B、H3P | 每一集 | 故事板草稿、分镜设置、视频提示词、生成的组视频、后期处理 |
| H4 | 第 1 集成片完成后 | 第一集成片 |
| H5 | 发布之前 | 发布 |

每个签字点显示什么、在哪里签，见[签字点](/zh/videoagents/concepts/sign-off-gates)。

## 一次做一集 {#episodes-one-at-a-time}

默认情况下，团队一次只做一集，当前这一集做完才开始下一集。要同时做几集，在 **⚙️ → 高级 → Agent 高级设置** 里打开 **多集并行**。这时第 1 集先走完整个工作流，你签了 H4 之后，其余各集才并行推进。这样风格或质量问题能在扩散到整季之前被发现。见 [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)。

## 衍生模式：在小说的世界里讲原创故事 {#derivative-mode-an-original-story-in-the-novel-s-world}

有时你只想要小说的世界（地点、机构和人物），故事由你自己来编。衍生模式就是为这种情况准备的。

1. 在 **内容定位**（向导里，或之后在 **🎛️ → 创作定调** 里）或者发给总制片的消息里明确写出来，例如：「不改编原著情节，只借原著世界观做原创故事。」
2. 拆集规划随后会把整份分集计划标记为衍生。各集不带小说里的事件，按小说事件核对分集和场次的检查会跳过，每个场次标注 `[EVENTS] none`。
3. 剧本仍然要评分，但「忠于原著」变成忠于借来的世界：场景设定、地理、机构和人物身份都不能走样。

几点说明：

- 衍生模式作用于整部剧。一部剧不能有的集改编小说、有的集原创。
- 只有你用文字明确要求时才会开启这个模式。Agent 不能为了通过某项没过的检查而自行开启。
- 总制片的规则里写明了这几种说法：「不改编原著情节」「不围绕原小说情节」「只借原著世界观做原创衍生」。在你的要求里写上其中一句，意图就不会有歧义。

::: tip 提示
衍生模式 v1.0.39 起可用。
:::

## 同一个世界里的更多作品 {#more-from-the-same-world}

影视剧项目有了世界圣经之后，插件可以用它做其他作品：一部小说（[衍生小说](/zh/videoagents/project-types/derivative-fiction)）、与另一本书的融合（[融合创作](/zh/videoagents/project-types/fusion-fiction)），或者一部有声剧（[有声剧](/zh/videoagents/project-types/audio-drama)）。

## 相关文档 {#related}
- [选择项目类型](/zh/videoagents/project-types/choose-a-project-type)
- [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)
- [世界与作品](/zh/videoagents/concepts/worlds-and-works)
- [工作流](/zh/videoagents/concepts/workflow)
- [创作定调](/zh/videoagents/console/creative-brief)
