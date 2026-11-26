---
title: 世界圣经
description: 团队怎样从小说建立世界圣经、每个文件写什么，以及怎样在世界观预览页阅读、签字和修改它。
tags: [world-bible, film, sign-off, beginner]
order: 30
---

# 世界圣经

世界圣经是故事世界唯一的权威依据：历史、地点、势力、风俗、货币、信仰和专有名词都以它为准。团队根据你的小说写出世界圣经，你签字之后，所有剧本、图片和视频都要遵循它。你在 **🌍 世界观预览** 页阅读它。

## 在流程中的位置 {#where-it-fits}

世界圣经在[工作流](/zh/videoagents/concepts/workflow)的第 2 阶段建立，此时小说已经解析完、故事分析也已完成：

1. 九个世界设定 Agent 并行工作，每个负责一个领域（见下表）。
2. 记忆圣经管理者把它们的文件合并成 **Bible v1**，解决冲突，并在修订记录里记下每一处改动。它解决不了的冲突会交给你。
3. 审核 Agent 交叉核对九个文件（同一件事说法不一就记为缺陷），并检查时间线。
4. 你审阅世界圣经，在 **世界圣经确认**（H1）签字。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

签字后世界圣经就锁定了。之后的任何修改都要走变更流程：记忆圣经管理者评估影响范围，把变更写进修订记录，并告诉总制片哪些已完成的工作需要重做。

## 世界圣经里有什么 {#what-is-in-the-bible}

这些文件放在项目的 `bible/` 文件夹里。

| Agent | 文件 | 内容 |
| --- | --- | --- |
| 世界总览 | `world.json` | 世界概况：背景、国家与势力、世界规则、基调 |
| 世界史官 | `timeline.json` | 世界历史、历法和重大事件 |
| 地理 | `geography.json` | 地形、山川河流、城市以及各地之间的关系 |
| 宗教 | `religion.json` | 宗教、神祇和信仰 |
| 文化 | `culture.json` | 风俗、语言和礼仪 |
| 政治 | `politics.json` | 政体、阵营和外交 |
| 经济 | `economy.json` | 货币、贸易和物价 |
| 修炼体系 | `cultivation.json` | 力量、魔法或修炼体系：等级、能力及其排序 |
| 词典官 | `dictionary.json` | 每个专有名词统一的含义和写法 |

后续阶段还会往 `bible/` 里添加文件：[美术风格](/zh/videoagents/world/art-style)（`style.json`）、色彩脚本和画幅规范、[服装](/zh/videoagents/world/costumes)（`costumes.json`）和[道具](/zh/videoagents/world/props)（`props.json`）。[角色](/zh/videoagents/world/characters)、[生物](/zh/videoagents/world/creatures)和[场景](/zh/videoagents/world/scenes)有各自的子文件夹。变更历史在 `bible/changelog.md`。

## 团队怎么写 {#how-the-team-writes-it}

- **每条设定都注明出处。** 每个条目都写明出自哪一章。
- **空白要设计，不能留空。** 小说没写、但制作需要的内容，Agent 会设计一个和世界其他部分相符的值，标记 `inferred: true` 并写明理由。不允许写「未知」之类的占位，写了会被退回。
- **术语以词典为准。** 所有文件里的名字和术语都用词典里的写法。
- **只有一个人写。** 只有记忆圣经管理者能写 `bible/`。其他 Agent 发现冲突只报告、不改动，解决不了的冲突会上报给你。

没有魔法体系的故事也会有一个 `cultivation.json`。在示例项目 *alices*（《爱丽丝梦游仙境》的写实改编）里，它记录了书中每个不可能的元素在现实中怎样拍出来。

## 在世界观预览页阅读世界圣经 {#read-the-bible-on-the-worldview-preview-page}

打开 **预览设定产物** 菜单（控制台顶栏的图片图标），选择 **🌍 世界观预览**。

![世界观预览页：左侧是板块列表（世界观总纲、地理、政治、文化等），右侧是 alices 项目的世界观总纲](/images/videoagents/world/world-bible.webp)

- **左侧：** `bible/` 顶层的每个文件一条，带图标、名称和文件名：世界观总纲、地理、政治、文化、修炼体系、经济、宗教、术语词典、时间线、美术风格、色彩脚本、服饰、画幅规范、道具、修订记录。`bible/` 顶层的其他文件排在最后，显示文件名。
- **搜索板块或内容…** 按名称以及文件里写的任何内容筛选列表。
- **右侧：** 选中的文件，带大小和最后更新时间。简单的顶层值归在 **基础信息** 下；每个列表或分组单独成一节。点小节标题可以折叠。
- Markdown 文件（例如修订记录）按纯文本显示。

角色、生物和场景不在这个页面上，它们有各自的预览页。

## 提出修改 {#ask-for-a-change}

1. 选中文件，点名称旁边的 **✏️ 修改**。
2. 角落里弹出 **修改意见** 浮窗，发给 **修改师**，输入框里已经填好文件路径。
3. 写下要改什么，按 Enter 或点 **发送**。

![发给修改师的修改意见浮窗，已预填 world.json 的路径，下方有顺带重跑受影响的下游任务选项](/images/videoagents/world/world-bible-edit.webp)

默认情况下，修改师只改你指出的地方，并记下这次变更。如果依赖它的已完成工作需要马上重做，勾选 **顺带重跑受影响的下游任务**；不勾时，由总制片之后根据变更记录决定。见[修改师和修改意见](/zh/videoagents/concepts/reviser)。

你也可以在控制台对话里和总制片沟通，例如对它报告的冲突做出裁决。

## 常见问题 {#common-questions}

**我可以自己编辑 JSON 文件吗？**
它们是 `bible/` 里的普通文件，可以编辑。但团队之外的改动会跳过检查和修订记录，所以优先用 **✏️ 修改**。如果你确实改了文件，告诉总制片你改了什么。

**小说和我的想法不一致，以哪个为准？**
世界圣经首先遵循原著。要偏离原著，在项目的创作定调（**🎛️ → 创作定调**）里写明，或告诉总制片；这项改动会作为裁决记入修订记录。见[创作定调](/zh/videoagents/console/creative-brief)。

## 相关文档 {#related}
- [导入和阅读小说](/zh/videoagents/world/novel)
- [角色](/zh/videoagents/world/characters)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
- [修改师与修改意见](/zh/videoagents/concepts/reviser)
- [工作流](/zh/videoagents/concepts/workflow)
