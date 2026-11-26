---
title: 从源码运行
description: 克隆 VideoAgents 仓库，在 Python 虚拟环境里安装，然后在浏览器里打开 127.0.0.1:8630 上的控制台。
tags: [source, advanced, how-to]
order: 30
---

# 从源码运行

如果你想用最新的改动、你的系统没有桌面应用版本，或者想参与开发 VideoAgents，可以从源代码运行。你会在浏览器里得到同样的控制台。

## 开始之前 {#before-you-start}
你需要：

- **Python 3.10 或更高版本。**
- **FFmpeg**，用于检查媒体文件、处理音频和剪辑。用系统的包管理器安装（例如在 Mac 上运行 `brew install ffmpeg`）。
- **至少一个 Agent 引擎**：Claude Code、Codex CLI 等 CLI，或者给内置 Agentics 引擎用的 OpenAI 兼容模型。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。
- **Git**，用来克隆仓库。

只有以下情况需要 Node.js：使用内置 Agentics 引擎（见下文）、在 Windows 上安装部分引擎 CLI，以及开发桌面应用。

## 安装并启动 {#install-and-start}

```bash
git clone https://github.com/AgenticsWorld/VideoAgents.git
cd VideoAgents
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e .
python apps/web/check.py
python apps/web/server.py
```

这些步骤的作用：

1. 克隆仓库，并在 `.venv` 里创建虚拟环境。
2. 把 VideoAgents 和它的 Python 依赖装进这个虚拟环境。
3. `apps/web/check.py` 检查控制台的文件是否完整。
4. `apps/web/server.py` 启动控制台。

::: tip 提示
在 Windows 上，用 `.venv\Scripts\activate` 激活虚拟环境，而不是 `source .venv/bin/activate`。
:::

## 打开控制台 {#open-the-console}

在浏览器里打开 <http://127.0.0.1:8630>。API 文档在 <http://127.0.0.1:8630/api/v1/docs>。

然后在顶栏选一个引擎，添加服务商，再新建项目：

1. [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)
2. [设置服务商](/zh/videoagents/getting-started/set-up-providers)
3. [创建第一个项目](/zh/videoagents/getting-started/create-your-first-project)

## 以后再次启动 {#start-it-again-later}

每次都要进入仓库目录，激活虚拟环境，再启动控制台：

```bash
cd VideoAgents
source .venv/bin/activate
videoagents-web
```

`videoagents-web` 和 `python apps/web/server.py` 作用相同，安装时会自动添加。如果只需要 API 服务、不需要控制台，用 `videoagents-api`。全部命令见[命令行](/zh/videoagents/reference/command-line)。

## 从源码使用内置 Agentics 引擎 {#use-the-built-in-agentics-engine-from-source}

内置的 **agentics** 引擎是随应用附带的 Pi 编程 Agent。从源码检出时它还没有安装，需要运行一次：

```bash
make install-pi
```

这一步要求 `PATH` 里有 Node.js 22.19 或更高版本。然后在 **⚙️ → 生成模型 → 🧩 语言模型/Agentics** 里，选择一个本地或云端的 OpenAI 兼容模型。那里的 **Agentics** 渠道要用桌面应用里登录的账号，所以在浏览器版里不可用。见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。

## 数据保存在哪里 {#where-your-data-lives}

从源码运行时，所有数据都在仓库的 `data/` 目录下：

| 目录 | 内容 |
| --- | --- |
| `data/projects/<name>/` | 每个项目：小说、世界圣经、提示词、生成的媒体和运行记录 |
| `data/.videoagents/` | 设置、对话记录和服务自身的状态 |

这两个目录都可能含有私人数据，已从 Git 中排除。见[项目与项目目录](/zh/videoagents/concepts/projects)和[配置](/zh/videoagents/reference/configuration)。

## 修改地址或端口 {#change-the-address-or-port}

控制台监听 `127.0.0.1:8630`，所以只有你自己的电脑能打开它。要换端口，启动前设置 `VIDEOAGENTS_PORT`，例如 `VIDEOAGENTS_PORT=8640 videoagents-web`。全部设置项见 `.env.example` 和[配置](/zh/videoagents/reference/configuration)页。

::: warning 注意
VideoAgents 是本地工具，不是面向互联网的服务：Agent 会读写项目文件，还能运行本地命令。除非确实需要局域网访问，否则请保持 `VIDEOAGENTS_HOST=127.0.0.1`；永远不要把控制台暴露到公网，并先阅读[安全与局域网访问](/zh/videoagents/reference/security)。
:::

## 无人值守运行 {#unattended-runs}

默认情况下，`claude` 引擎上的 Agent 运行 shell 命令前需要你批准。要无人值守地跑流水线，改用全自动模式启动控制台：

```bash
make run-auto
```

（不用 `make` 的话，`./run.sh` 效果相同。）这样 `claude` 引擎上的 Agent 运行任何命令都不再询问。`codex`、`pi` 和 `agentics` 引擎本来就是无人值守运行的。

::: warning 注意
在全自动模式下，Agent 可以在你的电脑上运行任何命令。只在你信任的机器上使用。
:::

## 更新 {#update}

要获取最新版本，拉取改动后重新安装：

```bash
cd VideoAgents
git pull
source .venv/bin/activate
python -m pip install -e .
```

然后重新启动控制台。

## 相关文档 {#related}
- [安装桌面应用](/zh/videoagents/getting-started/install-desktop-app)
- [命令行](/zh/videoagents/reference/command-line)
- [配置](/zh/videoagents/reference/configuration)
- [安全与局域网访问](/zh/videoagents/reference/security)
