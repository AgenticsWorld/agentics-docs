---
title: 导入和阅读小说
description: 把小说放进影视剧项目，让总制片清洗并分章，在小说文本页阅读结果。
tags: [novel, film, beginner, how-to]
order: 10
---

# 导入和阅读小说

影视剧项目从一部小说开始。你在创建项目时粘贴正文（或之后把文件放进项目的 `novel/` 文件夹），团队会清洗文本并分章。写剧本之前，你可以在 **📖 小说文本** 页阅读结果。

## 开始之前 {#before-you-start}
- 一个 **影视剧** 项目。其他项目类型的输入是讲述音频、文稿或主题，不是小说；见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。
- 一个能运行 **总制片** 的 Agent 引擎。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。

## 创建项目时导入小说 {#import-the-novel-when-you-create-the-project}

1. 在控制台点顶栏的 **项目** 框，再点 **＋ 新建项目…**。在向导第一步选 **🎬 影视剧**。
2. 在 **故事文本** 里粘贴小说。这一项可以不填，留空之后再补正文。
3. 填写其他步骤（或保留默认值），创建项目。

接下来会发生的事：

- 粘贴的正文保存为项目文件夹里的 `novel/original.txt`。
- 总制片初始化项目。有小说时，它会清洗文本（乱码、多余空行），规范章节和段落，并拆成 `novel/` 下的分章文件。篇幅长的书，它会交给小说解析 Agent 处理。
- 没有小说时，它会在报告里提醒你把正文放进 `novel/`。
- 完成后，它会回报结果，并提醒你在[参考文件](/zh/videoagents/world/reference-files)页上传参考图。在你确认参考已备好、或说明要跳过之前，它不会开始故事部分的工作。

向导的每一步见[新建项目向导](/zh/videoagents/console/new-project-wizard)。

## 之后添加或替换小说 {#add-or-replace-the-novel-later}

小说放在项目的 `novel/` 文件夹里。项目建好后要补充或替换小说，自己把文件放进去即可。点控制台顶栏的文件夹图标（**在 Finder 中打开当前项目目录**）打开项目文件夹。

- 小说文本页显示的是 Markdown 文件（`.md`）。可以有子文件夹，例如 `novel/chapters/`。
- 其他文件（例如 `original.txt`）留在文件夹里，但小说文本页不列出它们，只告诉你有几个。
- 如果故事部分已经开始后你改了小说，在控制台对话里告诉总制片，由它决定哪些要重做。

## 打开小说文本页 {#open-the-novel-text-page}

打开 **预览设定产物** 菜单（控制台顶栏的图片图标），选择 **📖 小说文本**。在任何预览页，也可以用右上角的页面菜单切换过来。

![控制台顶栏的预览设定产物菜单，列出参考文件、小说文本和其他预览页](/images/videoagents/world/novel-preview-menu.webp)

![小说文本页：左侧是文件列表，中间是《爱丽丝梦游仙境》的一章，右侧是带页码标记的章节目录](/images/videoagents/world/novel.webp)

页面分三栏：

| 栏 | 显示内容 |
| --- | --- |
| 左：文件列表 | `novel/` 下所有 `.md` 文件及大小。顶层文件在前，然后是各个子文件夹。按自然顺序排列，`ch2` 排在 `ch10` 前面。最多列出 2,000 个文件。 |
| 中：正文 | 选中的文件，按 Markdown 渲染。顶部显示路径、大小、大致字数和最后更新时间。 |
| 右：章节目录 | 文件的前两级标题。点标题跳到对应位置。窄屏时这一栏隐藏。 |

## 阅读长篇 {#read-a-long-book}

长文件按约 60,000 字分页，在章节标题处切开，所以很大的网文也能很快打开。

- 用正文上方和下方的 **‹ 上一页** 和 **下一页 ›** 翻页。翻页条显示 **第 1 / 3 页** 等。
- 在 **章节目录** 里，每个标题带页码标记（`p1`、`p2`……）。点另一页上的标题，会先翻到那一页。
- 页面会在浏览器里记住每个项目上次读的文件，以及每个文件的页码和滚动位置。

这个页面只读。要修改正文，编辑 `novel/` 里的文件，然后点 **刷新**。

## 团队怎么使用小说 {#what-the-team-does-with-the-novel}

小说是[工作流](/zh/videoagents/concepts/workflow)前几个阶段的输入：

- **扫描和解析。** 小说解析 Agent 把整章合成约 10,000–15,000 字一批（章节不会被拆开），再逐批解析：场景、带说话人的对白，以及提到的人物、地点和物品。结果写入 `story/`。
- **故事分析。** 其他剧情 Agent 根据解析结果建立故事结构、事件列表和时间线。
- **世界和角色。** [世界圣经](/zh/videoagents/world/world-bible)和[角色](/zh/videoagents/world/characters)都从小说中提取。每条设定都注明出自哪一章。

::: tip 提示
小说文本页 v1.0.45 起可用。
:::

## 常见问题 {#common-questions}

**页面提示还没有 md 文件。**
页面只列出 Markdown 文件。如果你在向导里粘贴了小说，`original.txt` 已经在文件夹里，只是不显示；总制片完成项目初始化后，分章文件才会出现。

**小说的语言决定成片的语言吗？**
不决定。剧本、对白、旁白和字幕的语言在 **🎛️ → 输出设置** 里设置。见[输出设置](/zh/videoagents/console/output-settings)。

## 相关文档 {#related}
- [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)
- [新建项目向导](/zh/videoagents/console/new-project-wizard)
- [参考文件](/zh/videoagents/world/reference-files)
- [世界圣经](/zh/videoagents/world/world-bible)
- [项目与项目目录](/zh/videoagents/concepts/projects)
