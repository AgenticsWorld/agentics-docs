---
title: 角色
description: 角色怎样登记、写设定、各画成一张角色设定图，以及怎样在人物预览页审阅和修改。
tags: [characters, film, sign-off, beginner]
order: 40
---

# 角色

故事里的每个角色都有一个 ID 和一份文字设定；主要角色还有一张角色设定图：一张图里包含角色的正面、侧面、背面和一个大的胸像特写。之后所有图片和视频都以这张设定图为参考，所以角色在每个镜头里都长得一样。你在 **👤 人物预览** 页审阅这些内容。

## 角色是怎样做出来的 {#how-characters-are-made}

| 步骤 | Agent | 结果 |
| --- | --- | --- |
| 登记 | 角色户籍官 | 小说里的每个角色（包括群演）都有唯一的 ID（例如 `CHAR-0001` 或 `CHAR-alice`）。别名和曾用名会合并，同名的不同人会分开，每个角色定一个等级：**S**（主角）、**A**（重要角色）、**B**（配角）或 **extra**（群演） |
| 设定 | 外观设定、性格设定、语言风格、关系图谱、成长形象 | 外貌（包括性别）、性格与动机、说话方式、人物关系，以及故事中会长大或变老的角色的各年龄版本 |
| 声音 | 声纹设定，然后是配音 | 一张声音卡和一段简短的声音样本。见[声音](/zh/videoagents/world/voices) |
| 服装 | 服装，然后是服装概念 | 衣橱，以及每套额外服装一张设定图。见[服装](/zh/videoagents/world/costumes) |
| 角色设定图 | 角色概念 | 每个 S 级和 A 级角色的设定图，按美术风格和角色的默认服装绘制 |

文字设定在[工作流](/zh/videoagents/concepts/workflow)的第 3 阶段写出，和生物、场景一起在 **角色与资产确认**（H1A）接受检查。设定图在第 4 阶段美术风格确定后绘制，主要角色的设定图属于 **美术风格锁定**（H2）的一部分。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

在后面某一集才首次出场的配角，在准备那一集时出设定图：每集故事板签字之前，美术总监会检查这一集里的每个角色是否都有设定图，并为缺的角色下单。

## 关于角色设定图 {#about-the-character-sheet}

- 一张图，至少 2560×1440，并排放着全身正面、侧面、背面视图和一个胸像特写。它永远不会被切成单独的图片；视频生成使用整张设定图。
- 每个角色只画一张，不是画一批让你挑。如果 Agent 自检发现问题，只会在你设置的重跑次数之内重画（**⚙️ → 高级 → Agent 高级设置 → 重跑次数**；默认值 0 表示把问题报告给你，不自己重画）。
- 有年龄版本的角色，每个版本一张设定图（`sheet_<version>.png`）。
- `refs/characters/` 里注释写明这个角色的图片，会作为设定图的参考。见[参考文件](/zh/videoagents/world/reference-files)。

## 文件在哪里 {#where-the-files-are}

| 内容 | 位置 |
| --- | --- |
| 角色列表、ID、别名、等级 | `bible/characters/index.json` |
| 单个角色的设定 | `bible/characters/<id>/` — `appearance.json`、`personality.json`、`dialogue_style.json`、`voice.json`、`age_versions.json` |
| 角色之间的关系 | `bible/characters/relationship.json` |
| 设定图 | `assets/concepts/characters/<id>/sheet.png`（以及年龄版本和服装设定图） |
| 之前的尝试 | `assets/concepts/characters/<id>/candidates/` |

## 在人物预览页审阅角色 {#review-characters-on-the-character-preview-page}

打开 **预览设定产物** 菜单（控制台顶栏的图片图标），选择 **👤 人物预览**。

![CHAR-alice 的人物预览：左侧是带等级、图片和服装标记的角色列表；右侧是声音行、角色设定图和服装区的开头](/images/videoagents/world/characters.webp)

**左侧列表** 显示每个角色，并带有标记：等级，**🖼** 加图片数，**👕** 加已出图的服装设定图数 / 总套数。有图片和设定的角色排在前面。

- **搜索角色…** 匹配 ID、名字和别名。
- 旁边的分集菜单（**全部集**、`ep01`、`ep02`……）只显示在那一集出场的角色。场景、生物和道具预览页使用同一个选择。

**右侧详情**，从上到下：

- 名字、ID、等级和 **✏️ 修改**，然后是别名、首次登场和备注。
- 角色的声音，每段声音样本带一个播放器。见[声音](/zh/videoagents/world/voices)。
- 图片：角色设定图和角色文件夹里的其他图片。`candidates/` 这类子文件夹显示为文件夹卡片；点开进入，点 **← 返回** 回来。点图片看大图。
- **👕 服装**：每套服装及其设定图。见[服装](/zh/videoagents/world/costumes)。
- 设定，每个文件一个可折叠小节：**外貌设定**、**性格设定**、**台词风格**、**声音/配音**、**年龄版本**。

如果项目开启了旁白，列表顶部会固定一条 **🎙 旁白**，对应旁白的声音。

### 角色图片的图像模型 {#image-model-for-character-images}

页面顶部的 **🎨 图像模型** 决定绘制角色设定图和服装设定图时使用的渠道和模型。**跟随全局** 使用 **🎨 生成模型** 页上的图像设置。这个选择只保存在本页。见[图像模型](/zh/videoagents/models/image-models)。

## 提出修改 {#ask-for-a-change}

- 名字旁边的 **✏️ 修改** 把关于角色设定的修改意见发给修改师。
- 图片下方的 **✏️ 修改** 发送关于这张图的意见，例如「她的头发应该更深、更长」。修改师会按需更新设定并重画这张图。
- 图片下方的 **🖌 画板** 在[画板](/zh/videoagents/world/image-canvas)里打开它，你可以精确标出要改的地方，保留每个版本，自己选定最终版。

每个 **✏️ 修改** 都会打开一个 **修改意见** 浮窗，目标已经填好。写下要改什么，点 **发送**。见[修改师和修改意见](/zh/videoagents/concepts/reviser)。

::: tip 提示
在画板上改了角色的样子后，设为最终版时勾选把改动发给修改师的选项。否则设定里描述的还是旧样子，下次重画时旧样子又会回来。
:::

## 虚拟人像资产库 {#virtual-portrait-library}

如果开启了虚拟人像资产库（**⚙️ → 高级 → 虚拟人像资产库**），每张图片下会多一个 **⬆ 入库** 按钮。入库的图片以资产 ID 的形式发给火山引擎视频模型，可以避免带人脸的参考图被拒。见[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。

## 相关文档 {#related}
- [服装](/zh/videoagents/world/costumes)
- [声音](/zh/videoagents/world/voices)
- [美术风格](/zh/videoagents/world/art-style)
- [画板：编辑图片](/zh/videoagents/world/image-canvas)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
