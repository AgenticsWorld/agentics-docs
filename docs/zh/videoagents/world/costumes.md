---
title: 服装
description: 每个角色的衣橱怎样按场合和时期规划、每套额外服装怎样各出一张设定图，以及在哪里审阅和修改服装。
tags: [characters, art-style, film, how-to]
order: 45
---

# 服装

角色会换衣服：审判时穿礼服，战斗后披着沾满泥的斗篷。VideoAgents 为每个角色规划衣橱，每套服装画一张设定图（同一个人穿不同的衣服），并给每个镜头配上对应的设定图，这样服装不会又变回默认那套。

## 服装是怎样做出来的 {#how-costumes-are-made}

1. **衣橱。** 在[工作流](/zh/videoagents/concepts/workflow)的第 4 阶段，美术风格确定后，服装 Agent 为每个 S、A、B 级角色建立衣橱：按场合（日常、正式、战斗、特殊）和故事时期划分服装。它会标出 **换装点**（角色在哪个事件之后换成另一套服装），并为每个角色选一套 **默认装**。结果是 `bible/costumes.json`。
2. **穿默认装的角色设定图。** [角色](/zh/videoagents/world/characters)设定图（`sheet.png`）按默认装绘制，所以它同时也是这套服装的设定图。
3. **每套额外服装一张设定图。** 服装概念 Agent 把每套非默认服装画成完整的四视图设定图 `sheet_<outfit-id>.png`，以角色设定图作为脸和身材的参考。它把每套服装记在图片旁边的台账 `costume_sheets.json` 里。

准备每一集时，美术总监会检查这一集镜头需要的每套服装是否都有设定图，并为缺的下单。

## 一套服装记录什么 {#what-an-outfit-records}

| 字段 | 含义 |
| --- | --- |
| ID 和名称 | 例如 `COS-001`、「蓝色夏季连衣裙配白色围裙」 |
| 场合和时期 | 什么时候穿这套服装 |
| 默认 | 是否是角色的默认装 |
| `visual_en` | 服装的完整描述：层次、材质、颜色、磨损。绘制这套服装的设定图、以及角色穿着它的镜头时，原样写进提示词 |
| 变体和状态 | 同一套服装的不同状态，例如「湿透」或「撕破」，以差异的方式描述 |
| 章节、分集、场景 | 这套服装在哪里出现 |

每套服装的描述都必须能独立成立，所以不用看其他服装，就能根据它画出设定图。「湿透」这类小状态仍是某套服装的变体，靠镜头提示词的措辞体现，不单独出设定图。

一套服装也可能被 **免出**（例如在画面上分辨不出来），或被 **阻塞**（例如它所属的年龄版本还没有角色设定图）。两种情况都会显示原因。

## 审阅服装 {#review-costumes}

### 在人物预览页 {#on-the-character-preview-page}

从 **预览设定产物** 菜单打开 **👤 人物预览**，选一个角色。图片下方的 **👕 服装** 区显示这个角色有几套服装、几套已经出了设定图。角色列表里的 👕 标记显示同样的数字，例如 **2/2**。

![Alice 的服装区：默认装 COS-001 复用 sheet.png，COS-002 是一套成人日装，有自己的四视图设定图，每套都写有场合、时期、出场位置和描述](/images/videoagents/world/costumes.webp)

每张服装卡片显示：

- 设定图；没有设定图时显示 **未出图**、**阻塞：…** 或 **免出：…**。点设定图看大图。
- 名称和 ID；默认装还显示 **默认装** 和「（sheet.png 复用）」。
- **场合**、**时期**、**出场**（分集、章节、场景）和 **子状态**。
- 服装描述。点击展开或收起。
- 图片存在但没有登记在台账里时，显示一条警告。

在[分镜预览](/zh/videoagents/create/storyboard-preview)里，生成组中角色的 👕 标签链接到本页的这套服装，并高亮显示。

### 在世界观预览页 {#on-the-worldview-preview-page}

**🌍 世界观预览 → 服饰** 显示完整的 `costumes.json`，包括每个角色的场合矩阵和换装点列表。

## 提出修改 {#ask-for-a-change}

- 服装卡片上的 **✏️ 修改** 把关于这套服装描述或设定图的意见发给修改师。修改师会按服装和服装概念 Agent 的方式处理。
- 已出图的设定图上的 **🖌 画板** 在[画板](/zh/videoagents/world/image-canvas)里打开它。

如果你在画板上改了服装的样子，设为最终版时勾选把改动发给修改师的选项，这样服装描述也会同步更新。

## 使用你自己的服装参考 {#use-your-own-costume-references}

把服装图片放进[参考文件](/zh/videoagents/world/reference-files)页的 **🗡 道具** 或 **👤 角色** 板块，在注释里写明是哪套服装，例如「Alice 的围裙，COS-001」。服装相关的 Agent 会优先使用它们。

## 文件 {#files}

| 内容 | 位置 |
| --- | --- |
| 衣橱和换装点 | `bible/costumes.json` |
| 默认装设定图 | `assets/concepts/characters/<id>/sheet.png` |
| 其他服装设定图 | `assets/concepts/characters/<id>/sheet_<outfit-id>.png` |
| 设定图与服装对应关系的台账 | `assets/concepts/characters/<id>/costume_sheets.json` |

## 相关文档 {#related}
- [角色](/zh/videoagents/world/characters)
- [道具](/zh/videoagents/world/props)
- [美术风格](/zh/videoagents/world/art-style)
- [分镜预览](/zh/videoagents/create/storyboard-preview)
