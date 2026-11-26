---
title: 安装插件
description: 把插件带来的 Agent 团队和工作流加进 VideoAgents，启用它，通过总制片使用它，以及再把它删除。
tags: [plugins, beginner, how-to]
order: 10
---

# 安装插件

插件给 VideoAgents 增加一支新的 Agent 团队，通常还带有自己的工作流，用来做内置团队不做的工作，例如根据你的世界圣经写一部前传小说。从 zip 安装或复制插件文件夹，在插件对话框里启用，然后让总制片去用它。

插件不含任何程序代码。它是一组文本文件：一个清单（`plugin.json`）、每个 Agent 一份角色说明（`SOUL.md`），以及一个可选的工作流文件。它的 Agent 和内置 Agent 一样派单、审核和签字。

## VideoAgents 自带的插件 {#plugins-that-come-with-videoagents}

| 插件 | Agent 数 | 做什么 |
| --- | --- | --- |
| `derivative-fiction` | 8 | 根据项目的世界圣经、角色和资产写一部衍生小说（前传、外传、番外、「假如」支线）：企划、大纲、文风、章节规划、写作、润色、审核和发布。见[衍生小说](/zh/videoagents/project-types/derivative-fiction)。 |
| `fusion-fiction` | 6 | 融合两本书：一本提供故事和人物的内在灵魂，另一本（可以是名著）提供世界和人物的外在形象。见[融合创作](/zh/videoagents/project-types/fusion-fiction)。 |
| `digital-human` | — | 旧的插件包，显示为 **已并入主程序**。数字人现在是一种项目类型。 |

音频配画、数字人和混剪以前是插件。从 v1.0.40 起，它们成了创建项目时选择的项目类型，所以这些插件包不再注册，也不能再安装。见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。

更多插件发布在 [VideoAgents-Plugins](https://github.com/AgenticsWorld/VideoAgents-Plugins) 仓库里。

## 打开插件对话框 {#open-the-plugins-dialog}

在控制台顶栏打开 **⚙️ → 插件**。

![全局设置菜单，插件位于资源消耗下方](/images/videoagents/extend/install-plugins-menu.webp)

对话框列出 VideoAgents 找到的所有插件。每张卡片显示：

- 插件的名字和版本；
- 状态：**已启用**、**已停用**、**无效**（红字列出原因）或 **已并入主程序**；
- 简介，取自插件的 `plugin.json`；
- Agent 数量和工作流文件。

![Agent 插件对话框，derivative-fiction 和 fusion-fiction 处于停用状态，digital-human 是已并入主程序的旧包](/images/videoagents/extend/install-plugins-dialog.webp)

底部的 **🏪 插件仓库** 链接会在浏览器里打开插件合集。

## 安装插件 {#install-a-plugin}

::: warning 安装之前先读一遍插件
每个 Agent 的 `SOUL.md` 会原封不动地写进这个 Agent 的指令里。来历不明的插件可能让 Agent 覆盖你的世界圣经、写到自己的文件夹之外，或者伪造报告。先打开插件包里的每个文件读一遍。拿不准就不要装。
:::

### 从 zip 文件安装 {#from-a-zip-file}

1. 打开 **⚙️ → 插件**。
2. 点 **⬆ 安装插件包（zip）**，选择 zip 文件。
3. 插件出现在列表里，状态为 **已停用**。

zip 里的插件文件可以放在根目录，也可以放在一个文件夹里。限制：zip 最大 50 MB，解压后最大 200 MB，最多 5,000 个文件。

以下情况会拒绝安装：

- 已经装了同名插件。先删除旧的，免得新旧文件混在一起；
- 名字是已并入主程序的项目类型之一（`audio-to-video`、`digital-human`、`mashup`）；
- zip 里没有 `plugin.json`，或者文件不是有效的 zip。

### 复制文件夹安装 {#by-copying-the-folder}

把插件文件夹复制到 VideoAgents 数据文件夹下的 `plugins/` 文件夹里。VideoAgents 大约 30 秒内会发现它；重新打开插件对话框就能看到。

| 运行 VideoAgents 的方式 | 插件文件夹 |
| --- | --- |
| macOS 桌面应用 | `~/Library/Application Support/@videoagents/desktop/data/plugins/` |
| 从源码运行 | 仓库里的 `data/plugins/` |

文件夹名必须和 `plugin.json` 里的 `name` 一致。想把插件放在别处，在启动 VideoAgents 之前设置 `VIDEOAGENTS_PLUGINS_DIR`（见[配置](/zh/videoagents/reference/configuration)）。

## 启用插件 {#turn-a-plugin-on}

新插件安装后一律是 **已停用**。在它的卡片上点 **启用**，会立即：

- 它的 Agent 出现在左侧的 Agent 列表里，归在插件自己的分组下，你可以和它们对话；
- 总制片得知启用了哪些插件、各有哪些 Agent、工作流在哪里，于是可以给它们派单。

点 **停用** 可以再关掉。文件仍然留在磁盘上。

## 使用插件 {#use-a-plugin}

向 **总制片** 提出插件负责的工作，例如：「用 derivative-fiction 插件写一部关于柴郡猫的前传小说。」总制片会读取插件的工作流，把其中的步骤加进项目的工作流（在 **工作流预览** 里显示）并派单。插件的签字和内置的[签字点](/zh/videoagents/concepts/sign-off-gates)以同样的方式送到你面前。

几点说明：

- 插件可以要求先完成某些前置工作。例如 `derivative-fiction` 需要世界圣经（`bible/world.json`、`bible/dictionary.json`、`bible/characters/index.json`）。如果缺了什么，总制片会先跑主工作流里相应的步骤。
- 每个插件把结果写进项目里自己的文件夹，例如 `derivative-fiction` 写在 `derivative/`。插件新创的设定写进 `<folder>/bible-delta/`；它从不直接修改 `bible/` 里的世界圣经。
- 插件开始时可以暂停主工作流里的视频步骤，前提是这些步骤还没有一个开始。`derivative-fiction` 就会这样做，因为小说不需要画面和声音。这些步骤只是挂起：之后你要做视频时，总制片会恢复它们。

## 删除插件 {#remove-a-plugin}

在卡片上点 **删除** 并确认。插件文件夹会从磁盘上删除，无法撤销。它已经写进你项目里的结果会保留。

VideoAgents 自带的插件没有 **删除** 按钮，只能停用。

## 常见问题 {#troubleshooting}

**卡片显示无效。**
红字说明了原因。有任何错误的插件都完全不会注册。常见原因：

- `plugin.json` 缺失，或者不是有效的 JSON；
- `plugin.json` 里的 `name` 和文件夹名不一致；
- `plugin.json` 里列出的某个 Agent 没有 `agents/<category>/<name>/SOUL.md`；
- 某个 Agent id 已经被内置 Agent 或其他插件占用（先被发现的那个保留它）；
- `plugin.json` 里列出的工作流文件不存在；
- 清单里一个 Agent 都没列。

完整规则见[编写插件](/zh/videoagents/extend/write-a-plugin)。

**启用了插件，但它的 Agent 没有出现。**
确认卡片显示的是 **已启用**，而不是 **无效**。有错误的插件即使启用了，Agent 也不会注册。

**卡片显示已并入主程序。**
这个工作流现在已经内置。改为创建一个这种类型的项目；如果这个旧包不是 VideoAgents 自带的，可以删除。

## 相关文档 {#related}
- [编写插件](/zh/videoagents/extend/write-a-plugin)
- [安装和使用技能](/zh/videoagents/extend/skills)
- [Agent 团队](/zh/videoagents/concepts/agent-crew)
- [工作流](/zh/videoagents/concepts/workflow)
- [安全与局域网访问](/zh/videoagents/reference/security)
