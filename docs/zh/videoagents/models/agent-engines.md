---
title: Agent 引擎
description: 对比 VideoAgents 支持的八种 Agent 引擎：各自需要什么、怎么安装和登录，以及怎样给不同 Agent 搭配不同引擎。
tags: [engines, reference, beginner]
order: 10
---

# Agent 引擎

Agent 引擎是执行每个 Agent 工作的程序：它读取 Agent 的指令，调用语言模型，读写项目文件，运行工具。VideoAgents 不绑定某个固定模型。你在控制台顶栏选择引擎，也可以给单个 Agent 换一个引擎。

## 引擎一览 {#the-engines}

| 顶栏里的引擎 | 程序 | 需要什么 | 登录命令 |
| --- | --- | --- | --- |
| **agentics** | 内置的 [Pi Coding Agent](https://github.com/earendil-works/pi)，随 VideoAgents 一起提供 | 不用安装。需要已登录的 VideoAgents 桌面端账号，或你自己的本地、云端模型 | 随桌面应用登录 |
| **claudecode** | [Claude Code](https://code.claude.com/docs/en/quickstart) | Claude 账号 | `claude auth login` |
| **codex** | [Codex CLI](https://learn.chatgpt.com/docs/codex/cli#getting-started) | ChatGPT 账号 | `codex login` |
| **kimicode** | [Kimi Code](https://www.kimi.com/code) | Kimi Code 账号 | `kimi login` |
| **pi** | 你自己安装的 [Pi Coding Agent](https://pi.dev/docs/latest/quickstart) | Pi 能登录的任意服务商 | 先运行 `pi`，再输入 `/login` |
| **opencode** | [OpenCode](https://opencode.ai/docs/) | OpenCode 账号（Go 订阅或 Zen） | `opencode auth login` |
| **grok** | [Grok Build](https://grok.com/build) | grok.com 账号 | `grok login` |
| **antigravity** | [Antigravity CLI](https://antigravity.google/docs/getting-started?tab=cli)（`agy`） | Google 账号 | 在终端里运行一次 `agy` |

**agentics** 引擎有单独的说明页：[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。它和 **pi** 引擎互不相干：内置的这份不会读取你自己的 `~/.pi/agent` 设置和登录信息。

### 首次启动时默认选哪个引擎 {#which-engine-is-selected-on-first-start}

浏览器和服务端都没有保存过选择时：

- 桌面应用默认选 **agentics**。
- 网页版在中文界面下默认选 **kimicode**，其他语言默认选 **claudecode**。

之后控制台会记住你的选择。

## 选择引擎 {#choose-the-engine}

1. 在控制台顶栏打开 **引擎**，选一个引擎。
2. 旁边的 **语言模型** 会列出这个引擎可用的模型。参见[语言模型与智能分配](/zh/videoagents/models/language-models)。

![控制台顶栏的引擎和语言模型菜单](/images/videoagents/models/agent-engines-topbar.webp)

你选的引擎对所有没有单独设置的 Agent 生效。切换到某个引擎后，控制台会马上检测它。

## 在控制台里安装和登录 {#install-and-sign-in-from-the-console}

如果引擎程序没装或没登录，会弹出设置对话框。

**程序未安装。** 对话框显示 **未检测到 `<name>` 命令**，并给出官方安装命令。

1. 点 **一键安装**。安装在后台进行，日志显示在对话框里。通常需要几分钟；官方脚本下载时不输出进度，网络慢时会更久。
2. 如果安装失败，点 **在终端中安装**。终端窗口会运行同一条命令，脚本提问时你可以直接回答（例如是否先安装 Node.js）。
3. 安装完成后，对话框会进入登录步骤。

**程序未登录。** 对话框显示 **`<program>` 尚未登录**，并给出登录命令。

1. 点 **登录**。会打开一个终端窗口，运行该程序自己的登录命令。
2. 在浏览器里用你自己的账号完成登录。
3. 对话框检测到登录后会自动关闭。如果没有关闭，点 **重新检测**。

点 **稍后再说** 可以直接关闭对话框。

几点说明：

- 一键安装和登录只在运行 VideoAgents 的那台电脑上打开控制台时可用。从其他设备访问时，请在那台电脑的终端里运行命令，再点 **重新检测**。
- VideoAgents 接触不到你的引擎令牌，登录信息由各程序自己保存。
- 在 macOS 上，桌面应用能找到你之前装好的程序（Homebrew、`~/.local/bin` 等位置），不用重装。
- 有些安装需要 Node.js 22.19 或更新版本。在 Windows 上，有些程序要先装好 Node.js（含 npm）才能安装。

## 更新引擎 {#update-an-engine}

程序装好并登录后，控制台会把它的版本和最新发布版比较。版本较旧时，会弹出对话框提示 **`<program>` 有新版本**。

- **一键更新**：在后台运行该程序自己的更新命令，并显示日志。
- **在终端中更新**：在终端窗口里运行同一条命令。一键更新失败，或提示版本没有变化时用它（例如用 Homebrew 安装的程序需要 `brew upgrade`）。
- **暂不更新**：在这个浏览器里，24 小时内不再提示这个版本。

在 Windows 上，有任务正在使用某个引擎时无法更新它。在 macOS 和 Linux 上会照常更新，正在运行的任务继续用旧版本跑完。

## 给不同 Agent 用不同引擎 {#use-different-engines-for-different-agents}

每个 Agent 都可以有自己的引擎和模型：

1. 在左栏选中这个 Agent。
2. 点对话区顶部的 **模型**。
3. 选择 **引擎** 和 **语言模型**，点 **保存**。

之后这个 Agent 不再跟随顶栏。**恢复策略默认** 会清除它的单独设置。参见[语言模型与智能分配](/zh/videoagents/models/language-models#give-one-agent-its-own-model)。

运行面板里的每条运行记录都会显示它用的引擎和模型。

## 各引擎的差异 {#differences-between-engines}

| | claudecode | codex | kimicode | pi | opencode | grok | antigravity | agentics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 模型菜单里有 **智能分配** | 有 | 有 | 有 | 有 | 有 | 有 | 有 | 无 |
| 向运行中的任务插话（Ctrl+Enter） | 支持 | 不支持 | 不支持 | 支持 | 支持（OpenCode 2） | 不支持 | 不支持 | 支持 |
| 模型列表来源 | 内置列表 | Codex CLI 模型目录 | Kimi Code 配置 | `pi --list-models` | `opencode models` | `grok models` | `agy models` | 生成模型页 |
| 遵循 **思考深度** 设置 | 是 | 是 | 否 | 是 | 是 | 是 | 是 | 是（本地模型除外） |

**思考深度** 在 **⚙️ → 高级 → Agent 高级设置** 里统一设置，对所有引擎生效。默认值 **引擎默认** 不改动各程序自己的设置。参见 [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)。

如果引擎不支持在任务进行中接收消息，按 Ctrl+Enter 时，你的消息会追加到这个 Agent 排队中的任务里，或作为新任务发出，对话里会注明。参见[与 Agent 对话](/zh/videoagents/console/chat-with-agents)。

### 免确认运行 {#running-without-approval-prompts}

codex、pi 和 agentics 引擎运行 Agent 时无需人工确认。claudecode 引擎下，Agent 执行 shell 命令前会先征求确认，除非你从源码以全自动模式（`make run-auto`）启动 VideoAgents。这种模式允许 Agent 执行任意命令，只应在你信任的电脑上使用。参见[安全与局域网访问](/zh/videoagents/reference/security)。

## 查看引擎用量 {#watch-your-engine-usage}

控制台右侧的 **资源消耗** 面板可以显示当前引擎的用量：Claude Code、Codex 和 Kimi Code 的会话窗口与每周窗口，以及 OpenCode Go 订阅的用量。在 **⚙️ → 资源消耗** 里开启这些检查。选中 pi 引擎时，面板显示的是 Codex 的用量，因为 pi 常配合 ChatGPT 订阅使用。参见[资源消耗](/zh/videoagents/console/resource-usage)。

::: details 使用自定义位置的程序
从源码运行时，可以在 `.env` 里用 `CLAUDE_BIN`、`CODEX_BIN`、`PI_BIN` 或 `OPENCODE_BIN` 指定可执行文件的路径。参见[配置](/zh/videoagents/reference/configuration)。
:::

## 常见问题 {#troubleshooting}

**设置对话框反复弹出。**
程序已经装了，但 VideoAgents 找不到它，或者它还没登录。在同一台电脑的终端里运行登录命令，再点 **重新检测**。

**安装失败，提示网络或地区问题。**
官方下载地址无法访问。有些服务只在部分国家和地区提供（例如 Claude Code）。在 **⚙️ → 高级 → 网络检测** 里检查网络连通性，或者换一个引擎。

**模型菜单很短，或者提示「模型列表读取失败」。**
模型列表是从引擎程序读取的。先登录该程序，再重新切换一次引擎，列表会重新加载。

## 相关文档 {#related}
- [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)
- [内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)
- [语言模型与智能分配](/zh/videoagents/models/language-models)
- [网络检测](/zh/videoagents/console/network-check)
- [资源消耗](/zh/videoagents/console/resource-usage)
