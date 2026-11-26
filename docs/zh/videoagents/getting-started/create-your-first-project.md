---
title: 创建第一个项目
description: 用新建项目向导从一部小说创建影视项目，启动团队，并完成第一次签字。
tags: [beginner, film, tutorial]
order: 60
---

# 创建第一个项目

这篇教程从一部小说创建一个影视项目，启动团队，一直带你走到第一次签字。这里只讲第一次运行需要的内容；向导里每个字段的说明见[新建项目向导](/zh/videoagents/console/new-project-wizard)。

## 开始之前 {#before-you-start}
- 一个已安装并登录的 Agent 引擎。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。
- 至少设置好图像、视频和配音服务商。见[设置服务商](/zh/videoagents/getting-started/set-up-providers)。
- 小说的文本。可以粘贴到向导里，也可以先不填，之后再补。

::: tip 提示
想先看看完成后的项目是什么样子？[打开示例项目](/zh/videoagents/getting-started/open-a-sample-project)。
:::

## 1. 打开向导 {#_1-open-the-wizard}

1. 在控制台顶栏，点 **项目** 旁边的项目名，打开 **项目** 对话框。
2. 点 **＋ 新建项目…**。

## 2. 选择项目类型 {#_2-choose-the-project-type}

第 1 步是 **项目类型**。保持选中 **🎬 影视剧**。它会把小说改编成多集视频，并在关键节点停下来等你签字。点 **下一步**。

![新建项目向导第 1 步：选中影视剧，旁边是数字人、动效短片和更多](/images/videoagents/getting-started/create-your-first-project-type.webp)

其他类型走不同的工作流。见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。

## 3. 填写基础信息 {#_3-fill-in-the-basic-info}

第 2 步是 **基础信息**。

| 字段 | 填什么 |
| --- | --- |
| **项目名称** | 只能用英文字母和数字，例如 `MyNovel01`。它会成为项目目录的名字。 |
| **故事文本** | 粘贴小说。可以留空，之后再把文本放进项目的 `novel/` 目录。 |
| **内容定位** | 用几句话说明你要做什么：剧情片还是纪录片、题材和基调、目标观众、原著哪些保留哪些删减。 |
| **画面风格** | 点 **🎨 选择风格库** 选一种风格，或者自己描述：影像质感、色调、光影、构图。 |

![向导第 2 步：项目名称为 MyNovel01，故事文本、内容定位和画面风格为空](/images/videoagents/getting-started/create-your-first-project-basic.webp)

内容定位和画面风格保存在项目的 `brief.md` 里，会作为最高创作前提交给每个 Agent。所以在这里写几句清楚的话，会影响整部剧。之后可以在 **🎛️ → 创作定调** 里修改。

## 4. 检查设置步骤 {#_4-check-the-setup-steps}

第 3 到第 5 步用来设置项目。每个字段都有默认值，之后都可以在 **🎛️** 项目设置菜单里修改。

| 步骤 | 设置什么 | 详细说明 |
| --- | --- | --- |
| **视频节奏** | 叙事节奏、每集时长、镜头时长、长镜头、过场 | [视频节奏](/zh/videoagents/console/video-pacing) |
| **模型限制** | 生成组的最长时长，以及每组最多带几个参考文件。必须和你的视频模型匹配。 | [模型限制](/zh/videoagents/console/model-limits) |
| **输出设置** | 画幅、语言、草稿分辨率和成片分辨率等 | [输出设置](/zh/videoagents/console/output-settings) |

从第 3 步起，可以点 **跳过向导创建**，其余步骤保留默认值。

在最后一步点 **创建**。

## 5. 让总制片完成项目初始化 {#_5-let-the-workflow-orchestrator-set-up-the-project}

控制台切换到新项目，并打开和 **总制片** 的对话。总制片是规划工作、分派任务的 Agent。它首先完成项目初始化：

- 创建项目目录结构；
- 清洗小说文本，分章放进 `novel/`；
- 读你的内容定位和画面风格，总结它的理解，方便你纠正。

然后它会停下来，提醒你可以添加参考素材。这时还不会开始剧情方面的工作。

## 6. 添加参考素材（可选） {#_6-add-references-optional}

如果你有体现影片样子的图片、想用的音乐、字体或笔记，现在就加进来。打开预览菜单（顶栏里的图片图标），选 **参考文件**。按分类上传文件，并给每个文件写一条注释。设计和配乐 Agent 会先读这些内容。见[参考文件](/zh/videoagents/world/reference-files)。

## 7. 启动团队 {#_7-start-the-crew}

在总制片的对话里回复它，例如：

> 参考素材准备好了，请开始。

如果没有参考素材：

> 没有参考素材，直接开始吧。

总制片会建立项目的工作流，并派出第一批任务：读小说、梳理故事，然后是世界圣经。你可以随时查看进度：

- 右侧的 **运行面板** 列出正在运行和排队中的任务。
- **工作流预览** 页（预览菜单 → **工作流预览**）显示每个任务、它的状态和签字点。见[工作流](/zh/videoagents/concepts/workflow)。
- 每个 Agent 的对话里都能看到它做了什么、写了哪些文件。

如果工作停了，而又没有什么在等你处理，点运行面板里的 **▶ 继续**，让总制片接着干。想让项目闲置时自动继续，打开 **🤖** 自动运行。见[自动运行](/zh/videoagents/console/auto-run)。

## 8. 完成第一次签字 {#_8-answer-your-first-sign-off}

世界圣经合并完成后，团队会停在第一个签字点 **H1 世界圣经确认**。控制台右下角会出现签字卡片，同时你会收到桌面通知。

1. 在 **世界观预览**（预览菜单）里审看世界圣经。人物、场景和道具在之后的签字点审看。
2. 如果有不对的地方，用预览页上的 **✏️ 修改** 按钮，或者在总制片的对话里告诉它。
3. 满意之后，点卡片上的 **签字**。想先停在这里，点 **暂缓**。

签字卡片不会超时。之后团队会继续做人物与资产、美术风格和第 1 集剧本，并在各自的签字点停下。完整列表见[签字点](/zh/videoagents/concepts/sign-off-gates)。

::: warning 注意
付费的图像生成从美术风格阶段开始，这时会画人物概念图和设定图。视频要等你签完每集的分镜表（H3A）和视频提示词（H3V）之后才会生成。签这两个之前，请先查看服务商的价格和[成本控制](/zh/videoagents/models/cost-control)。
:::

## 几点说明 {#good-to-know}
- **新项目跳过质量评分和审核。** 所有审核力度初始都是 0。如果想让质量评委和审核 Agent 检查工作，在 **🎛️ → 审核设置** 里调高。见[审核设置](/zh/videoagents/console/review-settings)。
- **自动重跑是关闭的。** 某一步没通过检查时，会交给你决定，而不是自动重做。可以在 **⚙️ → 高级 → Agent 高级设置 → 重跑次数** 里修改，或者用 `/retry` [聊天命令](/zh/videoagents/console/chat-commands)。
- **默认一次做一集**，从第 1 集开始。

## 相关文档 {#related}
- [新建项目向导](/zh/videoagents/console/new-project-wizard)
- [导入和阅读小说](/zh/videoagents/world/novel)
- [工作流](/zh/videoagents/concepts/workflow)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
- [和 Agent 对话](/zh/videoagents/console/chat-with-agents)
