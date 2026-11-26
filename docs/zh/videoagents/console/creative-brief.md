---
title: 创作定调
description: 写下项目的内容定位和画面风格，或从风格库里选一种风格，让每个 Agent 都从同一个创作前提出发。
tags: [art-style, beginner, how-to]
order: 50
---

# 创作定调

创作定调告诉整个团队：这是一部什么样的作品，它应该是什么样子。它的两个字段会作为最高创作前提交给每个 Agent，所以剧本、美术和视频提示词都从同一个想法出发。

创建项目时你就会填写创作定调。之后可以随时在 **🎛️ → 创作定调** 里修改。

![创作定调对话框：内容定位和画面风格](/images/videoagents/console/creative-brief.webp)

## 字段 {#fields}

| 字段 | 写什么 | 用于 |
| --- | --- | --- |
| **内容定位** | 剧情片还是纪录片、题材类型与基调、目标受众、改编时保留或舍弃什么 | 每个 Agent 的决策：剧情、节奏、对白、设计 |
| **画面风格** | 风格提示词：影像质感、色调、光影、构图 | 所有画面产出：概念图、故事板草图、图片和视频提示词 |

两个字段都可以不填。写得简短、具体；内容定位往往一两句话就够，例如「由童话改编的写实奇幻电影」。

## 从风格库里选风格 {#pick-a-style-from-the-library}

1. 点 **🎨 选择风格库**。
2. 按 **全部**、**真人**、**3D** 或 **2D** 筛选，或在 **搜索风格…** 里输入关键词。
3. 点卡片上的 **🔍** 可以看大图样张。
4. 点一张卡片，它的风格提示词会填进 **画面风格**。

![风格库：真人、3D 和 2D 风格卡片](/images/videoagents/console/creative-brief-style-library.webp)

风格提示词按界面语言填入。选好之后可以随意修改；只有文本没改动时，当前风格的卡片才会保持高亮。点 **自定义风格提示词** 会关闭风格库，回去自己写。

## 保存 {#save}

点 **保存**。几点说明：

- 创作定调保存在项目的 `brief.md` 里。
- 它对保存之后派发的任务生效。已经在运行的工作仍用旧的设定。
- 两个字段都清空后保存，会移除创作定调。
- 新的创作定调不会自动重做已完成的工作。可以问总制片哪些步骤需要重做，或者提交修改意见。见[修改师和修改意见](/zh/videoagents/concepts/reviser)。

叙事节奏以前是创作定调的一部分，现在移到了 **🎛️ → 视频节奏**，见[视频节奏](/zh/videoagents/console/video-pacing)。

## 相关文档 {#related}
- [美术风格](/zh/videoagents/world/art-style)
- [视频节奏](/zh/videoagents/console/video-pacing)
- [新建项目向导](/zh/videoagents/console/new-project-wizard)
- [输出设置](/zh/videoagents/console/output-settings)
