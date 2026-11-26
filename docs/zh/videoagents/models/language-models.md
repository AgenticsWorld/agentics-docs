---
title: 语言模型与智能分配
description: 选择 Agent 用的语言模型，用智能分配给创作类 Agent 配更强的模型、给常规 Agent 配更便宜的模型，或者给单个 Agent 指定模型。
tags: [engines, cost, how-to]
order: 20
---

# 语言模型与智能分配

语言模型是 Agent 写作、规划和检查工作时用来思考的模型。你可以让所有 Agent 用同一个模型，也可以用 **智能分配** 把 Agent 分成强、省两档，或者给单个 Agent 指定自己的引擎和模型。

本页讲的是 Agent 背后的语言模型。图像、视频、语音和音乐模型在生成模型页设置，参见[图像模型](/zh/videoagents/models/image-models)和本栏目的其他页面。

## 选择语言模型 {#pick-the-language-model}

在控制台顶栏打开 **语言模型**。列表内容取决于旁边的 **引擎**：

| 选项 | 作用 |
| --- | --- |
| **智能分配** | 按任务难度，每个 Agent 分到这个引擎的高档或低档模型。除 agentics 外，所有引擎默认用它 |
| 某个模型名 | 所有没有单独设置的 Agent 都用这个模型 |
| **默认(CLI配置)** | 不传模型，由引擎程序使用它自己配置里的模型 |
| **自定义…** | 输入引擎接受的任意模型 ID |

模型名尽量从引擎程序读取（例如 `pi --list-models` 或 `opencode models`），所以列出的是你的账号实际能用的模型。**agentics** 引擎的菜单用法不同，参见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine#switch-the-engine-and-model-from-the-top-bar)。

::: warning 注意
在顶栏更换引擎或语言模型，会重新同步所有 Agent，并清除你用 **模型** 按钮给单个 Agent 设的模型。
:::

## 智能分配 {#smart-assignment}

智能分配把 Agent 分为两档：

- **高档（创作核心）**：调度、剧情、角色、场景、美术和导演，各项目类型的团队（音频配画、混剪、数字人、动效短片），以及世界总览、修改师、Prompt 工程师和视频生成 Agent。
- **低档（其余）**：审核、世界设定、生物、音频、剪辑、发布和视频生成部门的其余 Agent，以及索引和机械类工作：质量评委、事件与时间线提取、角色索引、画幅规则、画板修图师和画板动图师。

各引擎的内置模型：

| 引擎 | 高档 | 低档 |
| --- | --- | --- |
| claudecode | `opus`（最新） | `sonnet`（最新） |
| codex | `gpt-6.1-sol` | `gpt-6.1-terra` |
| kimicode | `kimi-code/k3` | `kimi-code/kimi-for-coding` |
| pi | `openai-codex/gpt-6.1-sol` | `openai-codex/gpt-6-luna` |
| opencode | `opencode-go/deepseek-v4-pro` | `opencode-go/deepseek-v4.1-flash` |
| grok | `grok-4.7` | `grok-4.6` |
| antigravity | `gemini-4-argon-high` | `gemini-3.8-flash-medium` |

把鼠标停在菜单里的 **智能分配** 上，可以看到当前用的两个模型。

### 修改两档模型 {#change-the-two-tiers}

1. 在 **语言模型** 里选 **智能分配**。
2. 点菜单右侧的滑块按钮，打开当前引擎的 **⚙ 智能分配模型** 对话框。
3. 为 **高档(创作核心)** 和 **低档(其余)** 各选一个模型。内置的选项标有 **默认**，每个菜单下方的一行显示这一档有多少个 Agent。
4. 点 **保存**。

![智能分配模型对话框，包含高档和低档两个菜单](/images/videoagents/models/language-models-smart.webp)

新的两档设置立即对所有走智能分配的 Agent 生效。正在运行的任务不受影响，有单独设置的 Agent 保持原样。某一档和内置模型不同时，滑块按钮会加上边框。

**恢复默认** 把两档都恢复为内置模型。如果你保存的某一档正好等于内置模型，以后 VideoAgents 新版本更换内置模型时，这一档会跟着换。

## 给单个 Agent 指定模型 {#give-one-agent-its-own-model}

1. 在左栏选中这个 Agent。
2. 点对话区顶部的 **模型**。按钮上显示这个 Agent 当前用的模型，例如 **模型 · claude·opus**。
3. 在 **🧠 Agent 模型配置** 对话框里选择 **引擎** 和 **语言模型**。**跟随全局(右上角)** 表示沿用顶栏的引擎。
4. 点 **保存**。

![总制片的 Agent 模型配置对话框](/images/videoagents/models/language-models-agent.webp)

对话框里还会显示这个 Agent 的策略默认，也就是它按顶栏设置会分到的模型。Agent 的单独设置优先于顶栏，只有一种例外：总制片派单时显式指定了引擎或模型。**恢复策略默认** 会清除这个 Agent 的单独设置。

这个对话框只设置引擎和语言模型。图像和视频服务商始终以生成模型页为准。

## 几点说明 {#good-to-know}
- 运行面板里的每条运行记录都会显示它用的引擎和模型。
- **⚙️ → 高级 → Agent 高级设置** 里的 **思考深度** 对所有 Agent 生效，不管它用哪个模型。
- 智能分配是在语言模型上省钱最简单的办法：审核和索引类工作用不着能力最强的模型。参见[成本控制](/zh/videoagents/models/cost-control)。

## 常见问题 {#troubleshooting}

**找不到滑块按钮。**
它只在选中 **智能分配** 时出现，而 agentics 引擎没有智能分配。

**某个 Agent 一直在用旧模型。**
它有单独设置。打开它的 **模型** 对话框，点 **恢复策略默认**。

**列表里的某个模型报错「model unavailable」。**
你的引擎账号用不了这个模型。换一个模型，或者选 **自定义…**，填入你的账号支持的模型 ID。

## 相关文档 {#related}
- [Agent 引擎](/zh/videoagents/models/agent-engines)
- [内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)
- [Agent 团队](/zh/videoagents/concepts/agent-crew)
- [成本控制](/zh/videoagents/models/cost-control)
