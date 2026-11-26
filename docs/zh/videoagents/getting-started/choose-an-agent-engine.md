---
title: 选择 Agent 引擎
description: 在顶栏选择运行 Agent 的引擎，从设置对话框安装并登录它的 CLI，再选择语言模型或智能分配。
tags: [engines, beginner, how-to]
order: 40
---

# 选择 Agent 引擎

Agent 引擎是运行每个 Agent 的程序：读取项目文件、写入新文件、运行命令，并和语言模型对话。你在控制台顶栏为整个团队选一个引擎，随时可以更换。

无论选哪个引擎，Agent 的分工和工作流都一样。不同的是 Agent 用哪些语言模型、由哪个账号付费，以及少量引擎特有的行为。

## 可选的引擎 {#the-engines}

| 顶栏里的名称 | 是什么 | 怎么登录 |
| --- | --- | --- |
| **agentics** | 内置引擎。随 VideoAgents 附带的一份 Pi 编程 Agent，无需安装。 | 桌面应用里的 Agentics 账号，或本地、云端的 OpenAI 兼容模型 |
| **claudecode** | Claude Code | `claude auth login` |
| **codex** | Codex CLI | `codex login` |
| **kimicode** | Kimi Code | `kimi login` |
| **pi** | 你自己安装的 Pi Coding Agent | 在 `pi` 里输入 `/login` |
| **opencode** | OpenCode | `opencode auth login` |
| **grok** | Grok Build | `grok login` |
| **antigravity** | Antigravity CLI（命令为 `agy`） | 运行一次 `agy`，用你的 Google 账号登录 |

每个 CLI 引擎都使用你自己在该厂商的账号，用量也计入这个账号。各引擎的对比见 [Agent 引擎](/zh/videoagents/models/agent-engines)。

新安装时，桌面应用默认使用 **agentics**。浏览器版在中文界面下默认使用 **kimicode**，其他语言界面下默认使用 **claudecode**。

## 选择引擎 {#pick-the-engine}

1. 在顶栏打开 **引擎** 菜单，选一个引擎。
2. 控制台会立即检测这个引擎。如果已经就绪，不会弹出任何东西。
3. 如果 CLI 没有安装、没有登录或版本过旧，会打开设置对话框。按下面的步骤操作。

![顶栏：项目、引擎、语言模型菜单和智能分配设置按钮](/images/videoagents/getting-started/choose-an-agent-engine-top-bar.webp)

每次打开控制台时也会检测一遍，所以如果某个 CLI 被卸载或退出了登录，你会再次看到这个对话框。

## 从设置对话框安装 CLI {#install-a-cli-from-the-setup-dialog}

找不到命令时，对话框标题为 **⚠️ 未检测到 `<name>` 命令**，并显示厂商官方的安装命令。

1. 点 **一键安装**。官方安装脚本在后台运行，对话框会显示安装日志和已下载的大小。通常需要几分钟；网速慢时可能超过十分钟。
2. 如果安装失败，对话框会显示可能的原因，例如无法联网、所在地区不提供该服务，或者缺少 Node.js。点 **在终端中安装**，在终端窗口里运行同一条命令，这样可以回答脚本提出的问题。
3. 安装完成后，对话框会进入登录步骤。

其他按钮：**重新检测** 会重新查找 CLI（例如你自己装好之后），**稍后再说** 关闭对话框。

::: tip 提示
一键安装和登录只在运行 VideoAgents 的那台电脑上有效。如果你从别的设备打开控制台，请在那台电脑上自己运行这些命令。
:::

## 登录 {#sign-in}

CLI 已安装但没有登录时，对话框标题为 **🔑 `<CLI>` 尚未登录**。

1. 点 **登录**。会打开一个终端窗口，运行这个 CLI 自己的登录命令。
2. 在浏览器里用你自己的账号授权。
3. 对话框检测到登录成功后会自动关闭。

VideoAgents 不会看到也不会保存你的登录凭据，它们由 CLI 自己保管。

## 更新 CLI {#update-a-cli}

已安装的 CLI 比厂商最新版本旧时，对话框标题为 **⬆️ `<CLI>` 有新版本**，并显示两个版本号和更新命令。

- **一键更新** 在后台运行 CLI 自己的更新命令，并显示日志。如果更新后版本号没变（例如用 Homebrew 安装的需要 `brew upgrade`），对话框会提示你，并提供 **在终端中更新**。
- **暂不更新** 会在这个浏览器里把该引擎、该版本的提示隐藏 24 小时。

在 Windows 上，CLI 正被任务使用时无法更新。在 Mac 上会照常更新，正在运行的任务用旧版本跑完。

::: tip 提示
更新检查从 v1.0.45 起可用。
:::

## 使用内置 Agentics 引擎 {#use-the-built-in-agentics-engine}

**agentics** 无需安装。它的语言模型从哪里来，在 **⚙️ → 生成模型 → 🧩 语言模型/Agentics** 里设置：

- **Agentics**：使用桌面应用里的 Agentics 账号。如果没有登录，控制台会显示 **🔑 登录后即可开始使用** 和一个 **登录** 按钮；登录后应用会重新启动。
- **本地模型**：你自己电脑或局域网里的 OpenAI 兼容服务。
- **云端模型**：任何 OpenAI 兼容的服务商，需要填写 Base URL、API Key 和模型。

引擎为 **agentics** 时，顶栏会显示生效渠道，旁边多一个选模型的菜单。见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。

## 选择语言模型 {#choose-a-language-model}

除 **agentics** 以外的所有引擎，**语言模型** 菜单默认都是 **智能分配**。它按任务复杂度把 Agent 分成两档，每档用一个模型：

- **高档(创作核心)**：调度、剧情、角色、场景、美术、导演等工作。
- **低档(其余)**：分析、索引、审核和机械性工作。

要更换模型，点菜单右侧的设置按钮。对话框会列出内置默认模型和每档的 Agent 数量。**保存** 会把改动应用到所有使用智能分配的 Agent；**恢复默认** 回到内置模型。

![claudecode 引擎的智能分配模型对话框，有高档和低档两个模型菜单](/images/videoagents/getting-started/choose-an-agent-engine-smart-assignment.webp)

你也可以在 **语言模型** 菜单里直接选一个模型，让所有 Agent 都用它。见[语言模型与智能分配](/zh/videoagents/models/language-models)。

## 给单个 Agent 换引擎 {#give-one-agent-a-different-engine}

每个 Agent 对话框的标题栏都有一个 **模型** 按钮。它会打开 **🧠 Agent 模型配置**，在这里可以只给这个 Agent 设置引擎和语言模型。**跟随全局(右上角)** 表示这个 Agent 使用顶栏的选择。单独设置过的 Agent，在你修改顶栏时会保持自己的设置。

## 几点说明 {#good-to-know}
- 在顶栏切换引擎或语言模型，会更新所有跟随顶栏的 Agent。已经在运行的任务不受影响。
- **Ctrl+Enter**（Mac 上是 ⌘+Enter）会把一条消息插进 Agent 正在运行的任务。claudecode、pi、agentics 和 opencode（2.x）引擎会在任务进行中接收这条消息；其他引擎会把它加到该 Agent 的下一个任务里。见[与 Agent 对话](/zh/videoagents/console/chat-with-agents)。
- 控制台右侧的 **资源消耗** 面板显示引擎的会话额度和每周额度用了多少（限于会上报用量的引擎）。见[资源消耗](/zh/videoagents/console/resource-usage)。

## 常见问题 {#troubleshooting}

**安装失败，提示地区或网络问题。**
有些服务只在部分国家和地区提供。在 **⚙️ → 高级 → 网络检测** 里检查网络或代理，或者换一个引擎。

**已经登录了，对话框还显示「尚未登录」。**
点 **重新检测**。如果对话框在等你时超时了，它也会提示你这样做。

**换了引擎之后 Agent 一运行就出错。**
打开这个 Agent 的对话，看看报错内容。确认新引擎已安装并登录：在顶栏重新选一次它，就会触发检测。

## 相关文档 {#related}
- [Agent 引擎](/zh/videoagents/models/agent-engines)
- [内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)
- [语言模型与智能分配](/zh/videoagents/models/language-models)
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)
