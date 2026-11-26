---
title: 安装桌面应用
description: 下载 Mac（Apple 芯片）或 Windows（x64）版 VideoAgents，完成首次启动、登录和 FFmpeg 设置，并让应用保持最新。
tags: [beginner, macos, windows, how-to]
order: 20
---

# 安装桌面应用

桌面应用是运行 VideoAgents 最简单的方式。它和网页版是同一个控制台，外面包了一层应用：自己安装运行环境，帮你登录 Agentics 账号，还能自动更新。

## 开始之前 {#before-you-start}
- 一台 Apple 芯片的 Mac，或一台 Windows 电脑（x64）。没有 Intel Mac 版本；其他系统请[从源码运行](/zh/videoagents/getting-started/run-from-source)。
- 给项目留出磁盘空间。生成的视频很占地方，一个项目就可能用掉好几 GB。
- 首次启动时需要联网。

## 下载并打开应用 {#download-and-open-the-app}

| 平台 | 下载 |
| --- | --- |
| macOS（Apple 芯片） | [VideoAgents.zip](https://s3.agentics.world/packages/video-agents/mac/VideoAgents.zip) |
| Windows（x64） | [VideoAgents.zip](https://s3.agentics.world/packages/video-agents/win/VideoAgents.zip) |

[下载页](https://agentics.world/videoagents/#download)上也有同样的链接，始终指向最新版本。

1. 下载对应系统的 zip 包。
2. 解压。
3. 打开 **VideoAgents**。

## 首次启动 {#first-launch}

首次启动要多走几步，只需走一次。

### 1. 登录或跳过 {#_1-sign-in-or-skip}

一个标题为「登录 VideoAgents」的小窗口会请你登录，窗口里写着「登录后使用 VideoAgents」。点蓝色的 **登录** 按钮，浏览器会打开登录页面。登录并完成授权后，应用会自动继续。想跳过，点按钮下方灰色的 **暂不登录**。

登录会把应用和你的 Agentics 账号关联起来，内置的 Agentics 引擎和 Agentics 生成服务商不用 API Key 就能直接用。如果跳过，你仍然可以用自己的引擎和服务商 Key 使用 VideoAgents，之后再从 **⚙️ → 账号** 登录。

### 2. 等待运行环境下载 {#_2-wait-for-the-runtime-download}

应用安装包里不含 Python。首次启动时，应用会下载自己的 Python 环境，并显示一个「正在准备 VideoAgents」的进度窗口。之后只有在应用更新需要更新的运行环境时，或者你手动要求时，才会重新下载（见[更新](#updates)）。

### 3. 设置 FFmpeg {#_3-set-up-ffmpeg}

主窗口打开时，应用会查找 FFmpeg。VideoAgents 用它检查媒体文件、处理音频和剪辑。如果没找到，会弹出「需要 FFmpeg 才能使用完整视频功能」对话框：

- **自动安装**：自动安装 FFmpeg。在 Mac 上会调用 Homebrew，所以要先装好 [Homebrew](https://brew.sh)。在 Windows 上，应用会自己下载一个免安装版 FFmpeg，不需要管理员权限。
- **暂时忽略**：先跳过。VideoAgents 的其他功能照常可用，但部分视频处理功能可能用不了。

你也可以自己安装 FFmpeg。装有 Homebrew 的 Mac 上，运行 `brew install ffmpeg`。

### 4. 选择引擎和服务商 {#_4-pick-an-engine-and-providers}

控制台打开了。新装的桌面应用里，顶栏的引擎已设为内置的 **agentics**，图像、视频、配音和音乐服务商都设为 Agentics。如果你已登录，现在就可以开始。否则请继续：

- [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)

## 你的账号 {#your-account}

打开 **⚙️ → 账号**（仅桌面应用），可以查看已登录的账号 ID 和余额；如果之前跳过了登录，可以在这里登录，也可以退出登录。在这里登录或退出后，应用会重新启动。

::: tip 提示
使用 Agentics 服务商生成的费用记在这个账号上。使用你自己 API Key 的服务商直接向你收费。
:::

## 更新 {#updates}

打开应用时，如果有新版本，会弹出标题为 **发现 VideoAgents 更新** 的对话框：

| 按钮 | 作用 |
| --- | --- |
| **立即安装** | 马上下载并安装更新，然后重新启动应用。 |
| **下次启动时安装** | 在后台下载更新，不打断你的工作，下次打开应用时安装。 |
| **暂不更新** | 保留当前版本。 |

如果你的版本低于最低支持版本，对话框标题会是 **必须更新 VideoAgents**，必须更新后才能继续使用。这些对话框跟随控制台的界面语言。

Python 运行环境单独更新。想自己检查有没有更新的运行环境，用应用菜单里的 **检查并更新 Python 环境…**（在 Mac 上位于 **VideoAgents** 菜单，在 Windows 上位于第一个菜单 **环境**）。

## 数据保存在哪里 {#where-your-data-lives}

桌面应用把你的项目、设置和对话记录保存在电脑上它自己的数据目录里。要打开当前项目的目录，点控制台顶栏的文件夹按钮。见[项目与项目目录](/zh/videoagents/concepts/projects)。

## 常见问题 {#troubleshooting}

**应用找不到我已经安装的 CLI 引擎。**
在 Mac 上，应用会读取登录 shell 的 `PATH`，还会查找常见的安装位置（Homebrew、`~/.local/bin` 等）。打开一个新终端，确认这个命令能在里面运行。然后在顶栏重新选一次引擎，应用每次都会重新检测。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。

**在 Windows 上安装 FFmpeg 失败。**
对话框会提供 **前往下载**，打开 FFmpeg 下载页让你手动安装，也可以点 **暂时跳过**。重新启动应用可以再试一次自动安装。

**用 Agentics 功能时提示要登录。**
你在首次启动时跳过了登录。从 **⚙️ → 账号** 登录即可。

## 相关文档 {#related}
- [VideoAgents 是什么](/zh/videoagents/getting-started/what-is-videoagents)
- [从源码运行](/zh/videoagents/getting-started/run-from-source)
- [选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)
- [内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)
