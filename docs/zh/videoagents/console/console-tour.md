---
title: 控制台导览
description: 熟悉 VideoAgents 控制台：顶栏、Agent 列表、对话区、运行面板、资源消耗，以及两个设置菜单。
tags: [beginner, reference]
order: 10
---

# 控制台导览

控制台是你最常用的页面：在这里选项目、和 Agent 对话、查看运行情况，所有设置也都从这里打开。本页逐一介绍各个区域，帮你找到要用的东西。

桌面应用启动后会直接打开控制台。从源码运行 VideoAgents 时，控制台默认地址是 `http://127.0.0.1:8630/`。

![控制台：左边是 Agent 列表，中间是某个 Agent 的对话，右边是运行面板和资源消耗](/images/videoagents/console/console-tour.webp)

控制台分四个区域：

| 区域 | 用途 |
| --- | --- |
| 顶栏 | 选择项目、引擎和语言模型；打开各个预览页、项目文件夹和设置菜单 |
| Agent 列表（左） | 当前项目的所有 Agent，按部门分组 |
| 对话区（中） | 和所选 Agent 的对话，以及输入指令的输入框 |
| 右栏 | **运行面板**（运行中和已完成的任务）和 **资源消耗**（引擎额度和账户余额） |

## 顶栏 {#top-bar}

从左到右依次是：

| 控件 | 作用 |
| --- | --- |
| **项目** | 显示当前项目。点击打开项目列表，在里面切换、新建或导入项目。见[切换、导入和导出项目](/zh/videoagents/console/projects)。 |
| **引擎** | 运行 Agent 的 Agent 引擎：claudecode、codex、kimicode、pi、opencode、grok、antigravity 或 agentics。见 [Agent 引擎](/zh/videoagents/models/agent-engines)。 |
| **语言模型** | 引擎使用的模型。**智能分配** 给创作核心（调度、剧情、角色、场景、美术、导演）分配高档模型，其余 Agent 用低档模型；旁边的滑杆按钮可以改这两档具体用哪个模型。见[语言模型和智能分配](/zh/videoagents/models/language-models)。 |
| 圆点 | 和服务的实时连接状态：已连接为绿色，页面断开连接时为红色。鼠标悬停可查看 Web 和 API 端口。 |
| 图片图标 | 预览菜单：**参考文件**、**小说文本**、**工作流预览**、**世界观预览**、**场景预览**、**人物预览**、**生物预览** 和 **道具预览**。 |
| 页面图标 | **剧本预览**、**故事板**、**分镜预览**、**📺 导演台**、**后期处理** 和 **成片发布**。动效短片项目显示 **🖥️ 代码预览**，不显示导演台。鼠标悬停在图标上可查看名称。 |
| 文件夹图标 | 在你的电脑上打开当前项目的文件夹。 |
| **🎛️** | 项目设置，只对当前项目生效。 |
| **⚙️** | 全局设置，对所有项目生效。 |

所有预览页打开的都是顶栏当前选中的项目。

### 🎛️ 项目设置菜单 {#the-🎛️-project-settings-menu}

![🎛️ 菜单：版本管理、创作定调、视频节奏、输出设置、模型限制、项目技能、审核设置、音乐库和缺陷单](/images/videoagents/console/console-tour-project-menu.webp)

| 菜单项 | 指南 |
| --- | --- |
| **版本管理** | [复制和删除项目](/zh/videoagents/console/project-versions) |
| **创作定调** | [创作定调](/zh/videoagents/console/creative-brief) |
| **视频节奏** | [视频节奏](/zh/videoagents/console/video-pacing) |
| **输出设置** | [输出设置](/zh/videoagents/console/output-settings) |
| **模型限制** | [模型限制](/zh/videoagents/console/model-limits) |
| **项目技能** | [项目技能](/zh/videoagents/console/project-skills) |
| **审核设置** | [审核设置](/zh/videoagents/console/review-settings) |
| **音乐库** | [音乐库](/zh/videoagents/world/music-library) |
| **缺陷单** | [审核与缺陷单](/zh/videoagents/create/qa-reviews) |

### ⚙️ 全局设置菜单 {#the-⚙️-global-settings-menu}

![⚙️ 菜单，「高级」子菜单已展开](/images/videoagents/console/console-tour-settings-menu.webp)

| 菜单项 | 指南 |
| --- | --- |
| **生成模型** | [引擎与模型](/zh/videoagents/models/) |
| **存储与图库** | [对象存储和图库](/zh/videoagents/models/object-storage) |
| **自动运行** | [自动运行](/zh/videoagents/console/auto-run) |
| **资源消耗** | [资源消耗](/zh/videoagents/console/resource-usage) |
| **插件** | [安装插件](/zh/videoagents/extend/install-plugins) |
| **高级 → Agent 高级设置** | [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings) |
| **高级 → 虚拟人像资产库** | [虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library) |
| **高级 → 素材库** | [素材库](/zh/videoagents/project-types/footage-library) |
| **高级 → 直播** | [直播生成](/zh/videoagents/create/live) |
| **高级 → 手机消息** | [手机消息](/zh/videoagents/console/mobile-messages) |
| **高级 → NSFW 模式** | [NSFW 模式](/zh/videoagents/models/nsfw-mode) |
| **高级 → 语音输入** | [语音输入](/zh/videoagents/console/voice-input) |
| **高级 → 网络检测** | [网络检测](/zh/videoagents/console/network-check) |
| **界面语言** | [界面语言](/zh/videoagents/console/interface-language) |
| **账号** | 仅桌面应用：显示当前登录的账号和余额，可在这里登录或退出登录 |
| **关于** | 打开 GitHub 上的 VideoAgents 仓库 |

## Agent 列表 {#agent-list}

左栏列出当前项目的 Agent，按部门分组（**00-调度层**、**01-剧情**、**02-世界设定** 等）。点击组名可以折叠或展开。

- **⭐ 管理组** 始终在最上面，里面是 **总制片**，标有 **调度**。和它对话就能驱动整个团队。
- Agent 旁边的黄色闪烁圆点，表示它在这个项目里有正在运行或排队的任务。
- 在 **搜索 Agent…** 里输入名称或 ID 可以筛选，命中的组会自动展开。
- 每种项目类型有自己的团队，所以切换到另一种类型的项目时，列表会跟着变。

左栏底部显示 VideoAgents 版本（例如 `v1.0.45`）和带数字的 **待提交问题**。见[待提交问题](/zh/videoagents/console/issues-to-submit)。

## 对话区 {#chat}

点击一个 Agent 打开它的对话。标题栏显示 Agent 的名称和 ID，以及 **技能**、**模型** 按钮（Debug 模式下还有 **SOUL.md**）。在底部输入框里输入内容，按 Enter 发送。见[和 Agent 对话](/zh/videoagents/console/chat-with-agents)。

每个项目的对话是分开保存的，所以切换项目后，会重新载入所选 Agent 在新项目里的对话。

## 右栏 {#right-column}

- **运行面板** 列出当前项目的任务，显示状态、用时和费用，并提供 **⏹ 停止**、**▶ 继续** 和 **🤖** 自动运行按钮。见[运行面板](/zh/videoagents/console/run-panel)。
- **资源消耗** 显示引擎额度和各服务商的余额。见[资源消耗](/zh/videoagents/console/resource-usage)。

Agent 需要你答复时，确认卡片和签字卡片会出现在页面右下角。

## 相关文档 {#related}
- [和 Agent 对话](/zh/videoagents/console/chat-with-agents)
- [运行面板](/zh/videoagents/console/run-panel)
- [切换、导入和导出项目](/zh/videoagents/console/projects)
- [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)
