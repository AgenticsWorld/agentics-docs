---
title: 美术风格
description: 用画面风格提示词或风格库确定成片的样子，了解美术总监怎样写风格圣经，以及怎样锁定它。
tags: [art-style, film, sign-off, beginner]
order: 90
---

# 美术风格

美术风格决定项目里每张图、每段视频的样子：真人还是动画，色调、光影、质感，以及绝不能出现的东西。你用画面风格提示词和参考图定方向；美术总监把它写成项目的风格圣经。你锁定之后，后面所有画面都遵循它。

## 定方向 {#set-the-direction}

### 创作定调里的画面风格 {#visual-style-in-the-creative-brief}

每个项目都有一段 **画面风格**：描述成片样子的简短系统提示词（影像质感、色调、光影、构图）。你在[新建项目向导](/zh/videoagents/console/new-project-wizard)里设置它，之后在 **🎛️ → 创作定调** 里修改。

1. 打开 **🎛️ → 创作定调**。
2. 在 **画面风格** 下自己写提示词，或点 **🎨 选择风格库** 再点一种风格，它的提示词会填进输入框。
3. 点 **保存**。

风格库收录了 1,300 多种风格，可以按 **真人**、**3D** 和 **2D** 筛选，也可以搜索。点卡片上的 **🔍** 看大图。**自定义风格提示词** 会关掉风格库，让你自己写。风格名称和提示词按界面语言显示。

![从创作定调打开的风格库：有全部、真人、3D 和 2D 筛选、搜索框、自定义风格提示词卡片和一格格风格卡片](/images/videoagents/world/art-style-library.webp)

创作定调保存在项目的 `brief.md` 里，作为最高创作前提加进每个 Agent 的指令；画面风格约束所有画面视觉工作。修改对保存之后启动的任务生效。见[创作定调](/zh/videoagents/console/creative-brief)。

### 参考图 {#reference-images}

把你想要的样子的图片放进[参考文件](/zh/videoagents/world/reference-files)页的 **🎨 视觉风格** 板块。散放在 `refs/` 文件夹里的文件也算风格参考。美术总监的决定和你的参考图不一致时，以参考图为准。

## 风格圣经 {#the-style-bible}

在[工作流](/zh/videoagents/concepts/workflow)的第 4 阶段，世界圣经和角色签字之后，美术总监写出 `bible/style.json`。它先查看你的参考图，再看世界圣经和你的创作定调。

| 部分 | 内容 |
| --- | --- |
| 美术风格和渲染流派 | 整体样子，以及是 2D 赛璐璐、3D 还是混合 |
| 参考作品 | 三到五部参考影片，每部写明借鉴什么、避免什么 |
| 风格锚点和风格片段 | 一些短语和一句风格描述，原样加进每一条图片和视频提示词 |
| 负面清单 | 绝不能出现的东西：破坏世界观的物品、模型容易画错的构图 |
| `user_refs` | 你的哪张参考图影响了哪项决定 |

风格描述句有界面语言版（`style_fragment_ui`）和英文版（`style_fragment_en`）；负面清单始终是英文。

同一阶段还会产出三类相关文件：

- **色彩脚本**（`bible/color_script.json`），由色彩剧本 Agent 编写：每一集、每一幕的色调和情绪，以及故事的高潮与低谷，全部从风格圣经推导。
- **画幅规范**（`bible/aspect_ratio.json`），由画幅规格 Agent 编写：主画幅（来自 **🎛️ → 输出设置**），以及针对你在 **🎞️ 成片发布** 页勾选的每个平台怎样裁切或缩放。见[输出设置](/zh/videoagents/console/output-settings)和[成片与发布](/zh/videoagents/create/publishing)。
- **角色和服装设定图**，按这个风格绘制。见[角色](/zh/videoagents/world/characters)和[服装](/zh/videoagents/world/costumes)。

## 阅读风格圣经 {#read-the-style-bible}

从 **预览设定产物** 菜单打开 **🌍 世界观预览**，选择 **美术风格**。**色彩脚本** 和 **画幅规范** 在同一个列表里。

![世界观预览页显示 alices 项目的美术风格：美术风格、渲染流派，以及界面语言版和英文版的风格描述句](/images/videoagents/world/art-style.webp)

## 锁定风格 {#lock-the-style}

风格圣经和主要角色的设定图准备好后，你在 **美术风格锁定**（H2）签字。这时美术总监会说明哪张参考图带来了哪项决定。如果你没有上传参考，它会提醒你仍可以在参考文件页补充，然后重做风格。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

锁定之后：

- 所有视觉产出都遵循 `style.json`。
- 改风格要走变更申请。美术总监会先估算哪些需要重画。场景、道具和生物图是按集绘制的，所以只影响已经做过的那几集。

::: tip 提示
在第一集做得太深之前把风格定下来。大多数项目都是在第一集改变对画面样子的想法，所以场景、道具和生物图按集绘制，而不是一次全部画完。
:::

## 提出修改 {#ask-for-a-change}

- 在世界观预览页选中 **美术风格**，点 **✏️ 修改**，把意见发给修改师。见[修改师和修改意见](/zh/videoagents/concepts/reviser)。
- 或者在 **🎛️ → 创作定调** 里修改 **画面风格**，再请总制片重做风格。

### 在一张图上试风格 {#try-a-style-on-one-image}

想在一张图上看看某种风格、又不改变项目，可以用[画板](/zh/videoagents/world/image-canvas)或[生成参考图](/zh/videoagents/world/generate-reference-images)里的风格库。两者都只影响那一张图。

## 相关文档 {#related}
- [参考文件](/zh/videoagents/world/reference-files)
- [创作定调](/zh/videoagents/console/creative-brief)
- [角色](/zh/videoagents/world/characters)
- [图像模型](/zh/videoagents/models/image-models)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
