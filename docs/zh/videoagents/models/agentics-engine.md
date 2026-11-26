---
title: 内置 Agentics 引擎
description: 用 VideoAgents 自带的引擎运行 Agent，语言模型可以来自你的 Agentics 账号、本地的 OpenAI 兼容模型或云端端点。
tags: [engines, providers, how-to]
order: 15
---

# 内置 Agentics 引擎

**agentics** 引擎随 VideoAgents 一起提供，不用另外安装。它用你在生成模型页选定的语言模型运行 Agent：可以是你的 Agentics 账号，也可以是在你自己电脑上运行的模型，或任意 OpenAI 兼容的云服务。

桌面应用新安装后默认使用这个引擎。

## 工作原理 {#how-it-works}

这个引擎是随应用打包的一份 [Pi Coding Agent](https://github.com/earendil-works/pi)。它跑在桌面应用自带的运行时上，所以不需要 Node.js。它和你可以自己安装的 **pi** 引擎互不相干：内置的这份不会读取你自己的 Pi 设置、扩展和登录信息。

每次运行都会拿到一份独立的配置，里面是你选定的端点和模型。API Key 以私密方式传给这次运行，不会写进项目文件。

## 选择语言模型的来源 {#choose-where-the-language-model-comes-from}

打开 **⚙️ → 生成模型**，找到 **🧩 语言模型/Agentics** 卡片。在卡片标题栏右侧的 **生效渠道** 里选择来源。标签页只用来切换正在查看的设置，✅ 标在生效的渠道上。修改会自动保存。

![语言模型/Agentics 卡片，当前打开本地模型标签页](/images/videoagents/models/agentics-engine-language-card.webp)

| 渠道 | 用的是什么 | 需要填写 |
| --- | --- | --- |
| **Agentics** | 已登录的 VideoAgents 桌面端账号 | 不用填。在账号提供的列表里选一个 **模型**，**刷新列表** 会重新加载列表 |
| **本地模型** | 你电脑或局域网里的 OpenAI 兼容服务（LM Studio、Ollama、vLLM…） | **Base URL**（默认 `http://127.0.0.1:1234/v1`）、**API Key**（本地服务一般随便填都行，例如 `lm-studio`）、**默认模型** |
| **云端模型** | 任意 OpenAI 兼容的云端 API | **Base URL**、**API Key** 和 **默认模型**。三项都没有默认值，必须全部填写 |

Agentics 渠道的默认模型是 `deepseek/deepseek-v4.1-flash-1017`。

::: tip 提示
还有一个 OpenRouter 渠道，但只有当它已经是生效渠道时才会显示。
:::

### 使用你的 Agentics 账号 {#use-your-agentics-account}

1. 使用桌面应用。网页版没有 Agentics 渠道。
2. 在 **Agentics** 标签页，**账号** 一行显示当前登录的账号和余额。没有登录时点 **登录**。
3. 选一个 **模型**。
4. 在 **生效渠道** 里选 **Agentics**。

登录后，同一个按钮会变成 **充值**，点击会在 Agentics 控制台打开你的钱包。你也可以在桌面应用里打开 **⚙️ → 账号**，查看账号 ID 和余额，或退出登录。登录或退出登录后，应用会重启。

### 使用本地模型 {#use-a-local-model}

1. 启动你的模型服务。LM Studio 运行 `lms server start`（默认端口 1234）。
2. 在 **本地模型** 标签页填入 **Base URL** 和 **API Key**。
3. 点 **测试连接**。它会列出服务上已加载的模型，在 **默认模型** 里选一个。
4. 在 **生效渠道** 里选 **本地模型**。

### 使用云端端点 {#use-a-cloud-endpoint}

1. 在 **云端模型** 标签页填入服务商的 OpenAI 兼容 **Base URL** 和 **API Key**。
2. 点 **测试连接**，从列表里选一个模型；或者选 **自定义…**，手动输入模型 ID。
3. 在 **生效渠道** 里选 **云端模型**。

如果云端模型是生效渠道，却没有填 Base URL，引擎会拒绝启动，并提示你填写。

### 图片输入 {#image-input}

本地模型和云端模型标签页都有一个 **图片输入** 复选框，默认勾选。如果模型能看图，保持勾选，这样 Agent 打开图片时能看到内容（例如检查分镜背景图时）。纯文本模型要取消勾选，否则带图片的请求可能失败。

Agentics 渠道会根据 OpenRouter 的模型目录自动判断：目录里标明支持图片输入的模型可以看图，其他模型一律按纯文本模型处理。

## 在顶栏切换引擎和模型 {#switch-the-engine-and-model-from-the-top-bar}

1. 在控制台顶栏把 **引擎** 设为 **agentics**。
2. 这时 **语言模型** 列出的是渠道（Agentics 和本地模型；云端模型只在它是生效渠道时出现）。
3. 旁边的第二个菜单列出这个渠道的模型。在这里选的模型会写回生成模型页，两处始终保持一致。

这个引擎不提供 **智能分配**：所有 Agent 都用你设定的渠道和模型。要给某个 Agent 换引擎，用它的 **模型** 按钮（参见[语言模型与智能分配](/zh/videoagents/models/language-models#give-one-agent-its-own-model)）。

## 登录提示 {#sign-in-prompt}

如果生效渠道是 Agentics，但没有登录账号，选中这个引擎时控制台会显示 **登录后即可开始使用**。

- 在桌面应用里，点 **登录**。登录后应用会重启。
- 在网页版里，提示会说明这个渠道需要桌面应用，或者你可以把卡片切换到本地模型。

## 几点说明 {#good-to-know}
- 每次回复最多可输出 65,536 个 token（本地模型渠道为 8,192），模型的上下文窗口为 128,000 个 token。上下文快满时会先压缩会话。如果某次运行的最后一条回复因输出上限被截断，这次运行记为失败。
- 这个引擎运行 Agent 时无需人工确认。
- 会话在多次运行之间保留，Agent 会接着之前的对话继续。在它的对话框里发 `/clear` 可以重新开始（参见[聊天命令](/zh/videoagents/console/chat-commands)）。
- **⚙️ → 高级 → Agent 高级设置** 里的 **思考深度** 对这个引擎生效，本地模型除外。

::: details 从源码运行
先运行一次 `make install-pi` 安装内置引擎（需要 Node.js 22.19 或更新版本）。如果你的模型服务允许更大的值，可以调高模型限制：

```bash
AGENTICS_CONTEXT_WINDOW=262144 AGENTICS_MAX_OUTPUT_TOKENS=131072 ./run.sh
```

参见[从源码运行](/zh/videoagents/getting-started/run-from-source)。
:::

## 常见问题 {#troubleshooting}

**提示「未找到内置的 Agentics 引擎」。**
内置引擎缺失。从源码运行时，执行 `make install-pi`。桌面应用请重新安装。

**在生效渠道里选了 Agentics，又跳回了之前的渠道。**
页面会在 **修改即自动保存** 的位置说明原因：Agentics 渠道需要桌面应用、已登录的账号，并且列表里至少有一个模型。

**Agent 说它看不到图片。**
这个模型被当成了纯文本模型。如果用的是本地模型或云端模型，而模型确实支持图片，勾选 **图片输入**；或者换一个支持图片的模型。

## 相关文档 {#related}
- [Agent 引擎](/zh/videoagents/models/agent-engines)
- [语言模型与智能分配](/zh/videoagents/models/language-models)
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)
- [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)
