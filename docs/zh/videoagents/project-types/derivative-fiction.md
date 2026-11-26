---
title: 衍生小说
description: 启用内置的 derivative-fiction 插件，根据项目的世界圣经和角色写一部前传、外传或假如线小说，得到 EPUB 和 TXT 文件。
tags: [novel, plugins, how-to]
order: 60
---

# 衍生小说

衍生小说在你项目的世界里写一部新小说：前传、外传、支线或假如线。它沿用项目已有的世界圣经、角色和场景，并保持它们不变，最后交付 EPUB、纯文本和逐章文件形式的成书。

它作为插件随 VideoAgents 一起提供，默认关闭，启用后才能用。

## 开始之前 {#before-you-start}
- 一个已有世界圣经和角色列表的项目：`bible/world.json`、`bible/dictionary.json` 和 `bible/characters/index.json`，并且世界圣经已签字（H1）。
- 还没有这样的项目？新建一个[影视剧](/zh/videoagents/project-types/film-and-series)项目，让它跑到世界圣经和角色完成为止。不需要做任何视频。

## 启用插件 {#enable-the-plugin}

1. 打开 **⚙️ → 插件**。
2. 找到 **derivative-fiction**，点 **启用**。

   ![Agent 插件对话框，列出 derivative-fiction、digital-human 和 fusion-fiction](/images/videoagents/project-types/plugins-dialog.webp)

3. 关闭对话框。插件的 Agent 会出现在左栏：**衍生创作** 分组（衍生企划、小说架构、文风圣经、章节规划、章节写作、润色定稿），外加文本质量审核和小说发布排版。

这个插件随应用一起提供，所以只能停用，不能删除。见[安装插件](/zh/videoagents/extend/install-plugins)。

## 开始写小说 {#start-a-novel}

打开项目，选中 **总制片**，描述你想要的书：哪种衍生作品、以谁的视角、发生在故事的哪个时间段、文风、读者，以及篇幅（可选）。例如：

```text
我想基于这个项目写一部衍生小说，使用 derivative-fiction 工作流。
保留每个角色的姓名、性格和身份，故事和地点以项目的剧情、世界设定、
角色和地点为基础。文风抒情、细腻，面向成年读者，去掉剧本腔。
篇幅按故事需要来定。
```

你也可以把想法写进 **🎛️ → 创作定调**；衍生企划也会读它。

## 工作流和签字 {#workflow-and-sign-offs}

| 阶段 | 做什么 | 你的签字 |
| --- | --- | --- |
| nv0 衍生立项 | 衍生企划确定作品类型、视角人物、在故事时间线上的位置、可以使用哪些正史、哪些不能碰，以及（假如线）从原作的哪里分岔 | — |
| nv1 架构与文风 | 全书结构、主要冲突和人物弧线；同时并行写一份文风圣经：叙事人称、视角、基调、章节格式 | **DH1** 企划与大纲 |
| nv2 章节规划 | 把大纲拆成章节，写明每章的节拍、人物和章末钩子 | — |
| nv3 章节写作 | 逐章写作，再由润色定稿润色并审核。第一章作为试点先写 | **DH2** 首章试读 |
| nv4 全书终审 | 情节逻辑、世界观一致性、角色一致性、文字质量，以及对每个新增设定的审查 | **DH3** 发布 |
| nv5 发布 | 把各章装订成一本书并导出 | — |

## 文件 {#files}

插件写的所有内容都在项目的 `derivative/` 文件夹里：

| 路径 | 内容 |
| --- | --- |
| `derivative/premise.json` | 企划：类型、主角、时间线锚点、禁用的正史、分岔点 |
| `derivative/outline.json` | 全书大纲 |
| `derivative/prose_style.md` | 文风圣经 |
| `derivative/chapters_plan.json` | 章节规划 |
| `derivative/chapters/chNNN.md` | 各章正文 |
| `derivative/bible-delta/` | 小说新创的设定 |
| `derivative/publish/` | 装订好的书，EPUB、TXT，以及供网文平台使用的逐章文件 |

## 几点说明 {#good-to-know}
- **正史保持原样。** 项目的 `bible/` 只读不写。新的人物、地点或事件写进 `derivative/bible-delta/`。要把它们并入正史，需要经过审核和你的签字。
- **视频工作只是暂停，不会丢失。** 小说开始时，视频相关的阶段（配音选角、光照、美术风格、从剧本到发布的各阶段，以及它们的签字点）会标记为跳过，前提是其中没有一个已经开始。如果视频工作已经开始，或者你要求小说和视频一起做，就什么都不跳过。想做视频时，随时让总制片恢复这些阶段。
- **各项审核看什么：** 文本质量审核检查写作质量、节奏、视角漂移、重复和机器腔。内置的逻辑、世界观和角色一致性审核按正史核对故事。
- **润色定稿只改语言。** 情节上的修改退回给写作者。
- **DH1–DH3 是这个插件的签字点。** 它们和数字人项目无关，数字人项目没有签字点。

## 相关文档 {#related}
- [安装插件](/zh/videoagents/extend/install-plugins)
- [融合创作](/zh/videoagents/project-types/fusion-fiction)
- [世界圣经](/zh/videoagents/world/world-bible)
- [世界与作品](/zh/videoagents/concepts/worlds-and-works)
- [选择项目类型](/zh/videoagents/project-types/choose-a-project-type)
