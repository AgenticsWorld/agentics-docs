---
title: 场景和俯视图
description: 在场景预览页查看世界里的每个地点，以及它的设定、光照方案、俯视图和由此搭建出的一切。
tags: [scenes, world-bible, beginner, how-to]
order: 70
---

# 场景和俯视图

场景是世界里的一个地点：一个房间、一座院子、一段河岸。场景 Agent 给每个地点一个 ID、一份文字设定和若干光照方案，然后画出一张俯视图，3D 场景、全景图和分镜背景图都从它搭建出来。你在 **场景预览** 页审阅这些内容。

## 什么算一个场景 {#what-counts-as-a-scene}

- **一个场景就是一个空间。** 它必须能画成一张带一套地标的俯视平面图。如果故事从机场大厅进到飞机里，那就是两个场景。
- **每个场景都有一个 ID**，例如 `SCN-mad-tea-party`。镜头、光照方案、背景图和文件夹都通过它引用这个场景。
- **场景是嵌套的**：区域 › 建筑 › 房间。房间把所属的建筑记为 **父级**。只用来归类其他场景的区域级条目，没有自己的俯视图。
- **内景和外景。** 每个场景标为 INT、EXT 或 INT/EXT（半开放空间，例如亭子）。只有故事在内外两侧都有戏时，一个地点才会分成内景和外景两个场景。

## 谁做什么 {#who-makes-what}

| 内容 | 制作者 | 时间 | 保存位置 |
| --- | --- | --- | --- |
| 场景列表，带 ID、层级、别名和章节 | **场景户籍官** | 建立世界圣经期间 | `bible/scenes/index.json` |
| 建筑：形制、材料、细节、需要避免的东西 | **建筑风格** | 同上 | `bible/scenes/<SCN-ID>/architecture.json` |
| 环境：每个故事节点的天气、季节和时间 | **环境设定** | 同上 | `bible/scenes/<SCN-ID>/environment.json` |
| 光照方案 | **光照方案** | 同上 | `bible/scenes/<SCN-ID>/lighting.json` |
| 俯视图（开启 **白模** 的项目） | **场景概念** | 每集开始时 | `assets/concepts/scenes/<SCN-ID>/layout_top.png` 和 `layout.json` |
| 正向和反向场景图（关闭 **白模** 的项目） | **场景概念**，然后由系统完成 | 每集开始时 | `assets/concepts/scenes/<SCN-ID>/main_01.png`、`reverse_01.png` |
| 3D 场景 | **场景建模** | 俯视图之后，按集 | `bible/scenes/<SCN-ID>/whitebox.json` |

图片按集绘制：只画这一集用到、而且还没有图片的场景。前面各集画过的场景会复用，所以还没有任何一集用到的场景只有设定、没有图片。这是正常的。

## 俯视图 {#top-down-layouts}

**🎛️ → 输出设置 → 白模** 开启时，每个场景会有一个布局包：

- **`layout_top.png`**：整个空间的正俯视平面图，至少 2560 × 1440。图上没有人物、文字或箭头，也没有时间：光线平淡中性。它是空间参照，不是用在成片里的画面。3D 场景按它测量，全景图和九宫格背景图会用到它，但它永远不会发给视频模型。
- **`layout.json`**：用文字描述同一个空间。它记录平面图上方朝哪个方向、至少三个地标（门、窗、主要家具、地形）及其位置，以及九个有名字的机位（「从门口看向壁炉，全景，平视」）。

如果你在 `refs/scenes/` 或 `refs/style/` 里放了图片（见[参考文件](/zh/videoagents/world/reference-files)），场景概念 Agent 画图时会把它们交给图像模型。

关闭白模时没有布局包，每个场景改为出一张正向场景图（见[分镜背景图](/zh/videoagents/create/background-plates#projects-with-whitebox-off-scene-plates)）。

## 打开场景预览 {#open-scene-preview}

1. 在控制台顶栏打开预览菜单（图片图标，**预览设定产物**），选择 **🏔 场景预览**。在其他预览页，也可以从右上角的页面菜单选它。
2. 在左侧列表里选一个场景。在 **搜索场景…** 里输入名称、ID 或别名筛选，或在旁边的菜单里选一集，只看这一集用到的场景。

![场景预览，选中了 The Tea-Table 场景：场景列表、场景标题、俯视图和叠加检查图，以及 3D 场景的开头](/images/videoagents/world/scenes-preview.webp)

列表里的标记：

| 标记 | 含义 |
| --- | --- |
| **building**、**room**、**region** | 在场景层级中的级别 |
| **🖼** 加数字 | 场景文件夹里有几张图 |
| **🧊** | 这个场景有 3D 场景 |

要把某个场景直接发给别人，在页面地址后加 `?id=<SCN-ID>`，例如 `/preview/scenes?id=SCN-mad-tea-party`。

## 场景页显示什么 {#what-the-scene-page-shows}

最上面是场景名称和 ID、层级、重要或频繁出现的地点带有 **关键场景** 标记，以及 **✏️ 修改**。下面一行在有数据时列出 **别名**、**父级**、**出现章节** 和 **频次**。再往下依次是这些板块：

| 板块 | 内容 | 详见 |
| --- | --- | --- |
| **🖼 场景图** | 场景文件夹里的每张图：`layout_top.png`、`whitebox_overlay.png`（3D 场景的布局检查图）和概念图。`candidates/`（被替换的图片）这类子文件夹显示为文件夹卡片。点图片放大。 | |
| **3D 白模** | 场景的 3D 场景 | [3D 场景](/zh/videoagents/world/3d-sets) |
| **🌐 全景图** | 在 3D 场景里拍的 360° 图片 | [360° 全景图](/zh/videoagents/world/panoramas) |
| **🌍 世界模型** | 从全景图搭建出的可漫游 3D 世界 | [世界模型](/zh/videoagents/world/world-models) |
| **🎦 分镜背景图** | 场景的背景图库 | [分镜背景图](/zh/videoagents/create/background-plates) |
| **🖼 场景图（正向 / 反向）** | 正向和反向场景图，仅限关闭白模的项目 | [分镜背景图](/zh/videoagents/create/background-plates#projects-with-whitebox-off-scene-plates) |
| **建筑/空间结构**、**环境设定**、**光照设定**、**whitebox** | 场景的世界圣经文件，逐字段显示 | |

点板块标题折叠或展开。页面会记住你折叠了哪些板块，切换到其他场景时也保持折叠。

## 光照方案 {#lighting-schemes}

打开 **光照设定** 查看场景的光照方案。光照方案 Agent 为故事实际用到的每种时间和天气组合各写一个方案，例如「傍晚、晴」。每个方案记录主光、主光方向、补光、画面内的实际光源、色温和反差。

![茶桌场景的一个光照方案，从方案 ID 和条件一直到它的提示词片段](/images/videoagents/world/scenes-lighting.webp)

`prompt_fragment_en` 字段是一句写好的光照描述。用到这个方案的每个镜头组，都会把这句话原样写进视频提示词，所以同一个地点的光线在每个镜头里都一致。全景图和背景图使用同样的方案 ID（`LGT-…`），这也是创建全景图时要选光照方案的原因。

## 修改场景 {#change-a-scene}

- 场景名称旁边的 **✏️ 修改** 会在右下角打开一个意见浮窗，场景已经填好。写下要改什么（「厨房门在东墙，不在北墙」）并发送。意见会发给[修改师](/zh/videoagents/concepts/reviser)，由它更新场景文件。
- 图片下方的 **✏️ 修改** 把关于这张图的意见发给修改师。
- 图片下方的 **画板** 在图片编辑器里打开它，你可以自己动手修改。见[画板：编辑图片](/zh/videoagents/world/image-canvas)。

## 场景图片的图像模型 {#image-models-for-scene-pictures}

页面顶部有两个选择器，为本页的图片选择图像模型，与全局 **生成模型** 设置分开：

| 选择器 | 用于 |
| --- | --- |
| **🎨 图像模型** | 俯视图、概念图和分镜背景图 |
| **🌐 全景模型** | 只用于 2:1 全景图。它必须支持任意画幅。 |

**跟随全局** 使用 **生成模型** 页上设置的图像模型。全景模型选择器不会回退到本页的 **🎨 图像模型**。

## 文件 {#files}

| 路径 | 内容 |
| --- | --- |
| `bible/scenes/index.json` | 场景列表 |
| `bible/scenes/<SCN-ID>/architecture.json`、`environment.json`、`lighting.json` | 场景的设定和光照方案 |
| `bible/scenes/<SCN-ID>/whitebox.json` | 3D 场景 |
| `assets/concepts/scenes/<SCN-ID>/layout_top.png`、`layout.json` | 俯视图及其地标 |
| `assets/concepts/scenes/<SCN-ID>/whitebox_overlay.png` | 3D 场景的布局检查图 |
| `assets/concepts/scenes/<SCN-ID>/plates/`、`panos/`、`world/` | 分镜背景图、全景图、世界模型 |

## 相关文档 {#related}
- [3D 场景](/zh/videoagents/world/3d-sets)
- [360° 全景图](/zh/videoagents/world/panoramas)
- [分镜背景图](/zh/videoagents/create/background-plates)
- [世界圣经](/zh/videoagents/world/world-bible)
- [美术风格](/zh/videoagents/world/art-style)
