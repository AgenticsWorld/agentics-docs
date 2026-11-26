---
title: 打开示例项目
description: 导入改编自《爱丽丝梦游仙境》的 alices 示例项目，免费浏览真实的世界圣经、人物设定图和故事板。
tags: [beginner, film, tutorial]
order: 70
---

# 打开示例项目

想知道 VideoAgents 能做出什么，最快的办法是打开一个别人已经做过的项目。[VideoAgents-Samples](https://github.com/AgenticsWorld/VideoAgents-Samples) 仓库里有可以直接导入浏览的完整项目。浏览不花钱：在你让某个 Agent 做事之前，什么都不会生成。

## 示例里有什么 {#what-is-in-the-sample}

仓库目前只有一个项目 **alices**，改编自刘易斯·卡罗尔的《爱丽丝梦游仙境》（*Alice's Adventures in Wonderland*），语言为英文。它包含：

| 内容 | 在哪里看 |
| --- | --- |
| 分好章的小说 | **小说文本** |
| 世界圣经：世界观总纲、地理、文化、时间线、美术风格、服装等 | **世界观预览** |
| 带设定图和服装的人物，以及生物、场景、道具和它们的概念图 | **人物预览**、**生物预览**、**场景预览**、**道具预览** |
| 第 1 集剧本 | **剧本预览** |
| 第 1 集的故事板和分镜表，以及 3D 白模方案 | **故事板**、**分镜预览**、**导演台** |
| 工作流和已经完成的签字 | **工作流预览** |
| Agent 写的每个文件，以及它们的运行记录 | 项目目录 |

示例已经签字到第 1 集的故事板。

## 开始之前 {#before-you-start}
- VideoAgents 已安装并在运行。只是浏览的话，不需要引擎和服务商。
- 约 260 MB 的空闲空间用于下载，导入后的项目还要再占差不多这么多。

## 获取示例 {#get-the-sample}

1. 下载仓库：在 [VideoAgents-Samples](https://github.com/AgenticsWorld/VideoAgents-Samples) 页面上用 **Code → Download ZIP**，或者克隆：

   ```bash
   git clone https://github.com/AgenticsWorld/VideoAgents-Samples.git
   ```

2. 需要的话先解压下载的文件，里面有 `alices` 目录。
3. 用系统自带的压缩功能，把 `alices` 目录单独压缩成 `alices.zip`。

::: warning 注意
不要直接导入 GitHub 给你的 zip。它把整个仓库又包了一层目录，VideoAgents 会把仓库目录当成项目。请压缩 `alices` 目录本身。
:::

## 导入 {#import-it}

1. 在控制台顶栏，点 **项目** 旁边的项目名。
2. 在 **项目** 对话框里点 **› 导入项目…**。
3. 选择 `alices.zip`。

![项目对话框：项目列表上方是导入项目和新建项目按钮](/images/videoagents/getting-started/open-a-sample-project-dialog.webp)

右上角的状态框会先显示上传进度，再显示解压进度。显示 **✅ 已导入项目 alices** 时，控制台会切换到这个新项目。

项目名取自 zip 里的目录名。如果已经有同名项目，导入时会换一个新名字（例如 `alices-2`），并告诉你原来的名字。

## 四处看看 {#look-around}

从预览菜单（顶栏里的图片图标）和它旁边的图标打开各个页面。建议按这个顺序：

1. **小说文本**，看原文。
2. **世界观预览**，看世界圣经，之后的每一步都以它为准。
3. **人物预览**，看人物设定卡、设定图、声音和服装。
4. **场景预览** 和 **道具预览**。
5. **剧本预览**，看第 1 集剧本，以及它的时长、事件和钩子。
6. **故事板** 和 **分镜预览**，看分镜表和生成组。
7. **工作流预览**，看哪些步骤已经完成、签字点在哪里。

打开页面、播放媒体、阅读文件都是免费的。要小心会生成或重新生成内容的按钮，例如先点 **✏️ 修改** 再点 **发送**：它们会在你的引擎上启动 Agent 任务，还可能调用付费服务商。

要打开项目目录本身，点顶栏的文件夹按钮。各个目录分别放什么，见[项目与项目目录](/zh/videoagents/concepts/projects)。

## 几点说明 {#good-to-know}
- **Agent 的对话是空的。** 对话记录保存在项目目录之外，所以不在项目 zip 里。Agent 的汇报仍保存在项目的 `runs/` 目录里。
- **项目自带设置。** 输出、节奏、模型限制和审核设置都来自示例。在这个项目里生成任何东西之前，请对照你的视频模型检查 **🎛️ → 模型限制**，并检查 **🎛️ → 输出设置**。
- **任何项目 zip 都能导入**，不只是示例：你自己压缩的项目，或者 **💾 自动备份** 生成的备份都可以。一个 zip 最大 20 GB，最多 200,000 个文件。
- **用完后可以删除**，在 **🎛️ → 版本管理** 里操作。见[复制与删除项目](/zh/videoagents/console/project-versions)。

## 接着做示例 {#continue-the-sample}

你可以从示例停下的地方继续，例如生成第 1 集的视频。先确认已经设置好[引擎](/zh/videoagents/getting-started/choose-an-agent-engine)和[服务商](/zh/videoagents/getting-started/set-up-providers)，然后在总制片的对话里告诉它你想做什么，或者点运行面板里的 **▶ 继续**。

::: warning 注意
继续制作会用你的服务商生成图像、视频和声音，费用记在你的账户上。
:::

## 相关文档 {#related}
- [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)
- [切换、导入和导出项目](/zh/videoagents/console/projects)
- [项目与项目目录](/zh/videoagents/concepts/projects)
- [世界与作品](/zh/videoagents/concepts/worlds-and-works)
