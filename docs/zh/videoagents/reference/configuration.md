---
title: 配置
description: VideoAgents 把全局设置和项目设置存在哪里，以及修改端口、目录、Agent 权限和安全功能的环境变量。
tags: [reference, advanced, source]
order: 20
---

# 配置

几乎所有设置都在控制台里改：全局设置在 **⚙️** 菜单，项目设置在 **🎛️** 菜单。VideoAgents 把它们存成数据目录里的文件。其余的由少数几个环境变量控制，只在启动时读一次：端口、目录、Agent 权限和几项安全功能。

## 设置存在哪里 {#where-settings-are-saved}

所有内容都在数据目录里：

| 运行方式 | 数据目录 |
| --- | --- |
| macOS 桌面应用 | `~/Library/Application Support/@videoagents/desktop/data/` |
| 从源码运行 | 仓库里的 `data/` |

| 文件或目录 | 保存内容 | 在哪里修改 |
| --- | --- | --- |
| `.videoagents/genconfig.json` | 生成服务商、模型和它们的 API Key | **⚙️ → 生成模型** |
| `.videoagents/state.json` | 全局开关：界面语言、自动运行的闲置时间和阈值、Agent 高级设置、资源消耗设置（包括在那里填的 Key）、启用的插件、停用的技能 | **⚙️ → 自动运行**、**⚙️ → 资源消耗**、**⚙️ → 高级 → Agent 高级设置**、**⚙️ → 插件** 等 |
| `.videoagents/agentmodels.json` | 每个 Agent 的引擎和模型选择 | 对话框顶部的 **模型**、智能分配 |
| `.videoagents/feishu.json`、`wechat.json`、`whatsapp.json` | 手机消息的绑定信息 | **⚙️ → 高级 → 手机消息** |
| `.videoagents/chats/` | 对话记录，按项目和 Agent 分开 | 对话区 |
| `.videoagents/runtime.sqlite3` | 运行记录、确认和事件日志 | 运行面板 |
| `projects/<name>/settings.json` | 项目设置 | **🎛️** 菜单 |
| `projects/<name>/brief.md` | 创作定调和叙事节奏 | **🎛️ → 创作定调**、**视频节奏** |
| `plugins/`、`skills/` | 你安装的插件和技能 | **⚙️ → 插件**、Agent 的 **技能** 对话框 |

::: warning 注意
`genconfig.json` 和 `state.json` 里可能有明文的 API Key，对话和项目也是你的私人作品。不要分享 `.videoagents/` 目录，也不要把 `data/` 提交到 Git。
:::

只在 VideoAgents 停止时手动修改这些文件，改之前先备份。正式的修改方式是用控制台。

## 环境变量 {#environment-variables}

VideoAgents 不读 `.env` 文件。在启动它的 shell 里设置变量。仓库里的 `.env.example` 列出了常用的变量。

```bash
# macOS / Linux
VIDEOAGENTS_PORT=8650 videoagents-web
```

```powershell
# Windows PowerShell
$env:VIDEOAGENTS_PORT = "8650"; videoagents-web
```

桌面应用会把自己的环境变量传给它启动的服务，例外情况在下面的表里注明：它总是监听 `127.0.0.1`；除非你指定端口，否则自动选空闲端口；除非你设置了 `VIDEOAGENTS_DATA_DIR`，否则使用自己的数据目录。

### 网络和端口 {#network-and-ports}

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `VIDEOAGENTS_HOST` | `127.0.0.1` | 控制台监听的地址。修改前先读[安全与局域网访问](/zh/videoagents/reference/security)。 |
| `VIDEOAGENTS_PORT` | `8630` | 控制台端口。 |
| `VIDEOAGENTS_WEB_HOST`、`VIDEOAGENTS_WEB_PORT` | 上面两项的值 | 只覆盖控制台的地址和端口。桌面应用总是用 `127.0.0.1` 和空闲端口。 |
| `VIDEOAGENTS_API_PORT` | `8640` | 控制台启动的内部 API 服务的端口。它总是监听 `127.0.0.1`。 |
| `VIDEOAGENTS_API_URL` | — | 使用这个地址上已在运行的 API 服务，不再另外启动。 |
| `VIDEOAGENTS_START_API` | 开启；设置了 `VIDEOAGENTS_API_URL` 时关闭 | 控制台是否自己启动 API 服务。 |
| `VIDEOAGENTS_DRAW_HOST`、`VIDEOAGENTS_DRAW_PORT` | `0.0.0.0`、控制台端口 + 1 | 手机打开的[画分镜](/zh/videoagents/create/sketch-on-your-phone)页面。`VIDEOAGENTS_DRAW_PORT=0` 关闭它。 |
| `VIDEOAGENTS_LAN_IP` | 自动检测 | 画分镜二维码里用的电脑地址。二维码显示的是 VPN 或代理的地址时，设置这一项。 |
| `VIDEOAGENTS_FILM_PORT` | 控制台端口 + 2 | 动效短片的代码预览。`0` 关闭；端口被占用时改用空闲端口。 |

### 目录 {#folders}

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `VIDEOAGENTS_DATA_DIR` | 见上面的表 | 整个数据目录：项目、设置、插件、技能。桌面应用也认这个变量。 |
| `VIDEOAGENTS_RUNTIME_DIR` | `<数据目录>/.videoagents` | 只放设置、对话和运行状态。 |
| `VIDEOAGENTS_PLUGINS_DIR` | `<数据目录>/plugins` | 上传的插件放在这里。 |
| `VIDEOAGENTS_SKILLS_DIR` | `<数据目录>/skills` | 你加载的技能放在这里。 |

### Agent 和引擎 {#agents-and-engines}

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `VIDEOAGENTS_PERMISSION_MODE` | 从源码运行时为 `acceptEdits`；桌面应用、`make run-auto` 和 `./run.sh` 为 `bypassPermissions` | Claude Code 引擎上的 Agent 的权限模式。`bypassPermissions` 让 Agent 不经询问就能运行任何命令。见[安全与局域网访问](/zh/videoagents/reference/security#agent-permissions-and-safeguards)。 |
| `CLAUDE_BIN`、`CODEX_BIN`、`KIMI_BIN`、`PI_BIN`、`OPENCODE_BIN`、`GROK_BIN`、`AGY_BIN` | 在 `PATH` 里查找 | 引擎命令不在 `PATH` 里时，填它的路径。 |
| `VIDEOAGENTS_NODE` | `PATH` 里的 `node` | 从源码运行时，运行内置 Agentics 引擎所用的 Node.js。 |
| `AGENTICS_CONTEXT_WINDOW` | `128000` | 为 Agentics 引擎的模型声明的上下文窗口。 |
| `AGENTICS_MAX_OUTPUT_TOKENS` | `65536`（本地模型为 `8192`） | Agentics 引擎的单次输出上限。只有模型服务允许更大值时才调高。 |
| `VIDEOAGENTS_NET_RETRY_LIMIT` | `0` | Claude Code 的一次运行最多容忍几次连接中断，超过就按网络故障停止。`0` 表示第一次中断就停。 |
| `VIDEOAGENTS_ENABLE_CLAUDE_USAGE_PROBE` | `false` | 允许 VideoAgents 读取本机的 Claude 登录信息，在资源消耗里显示用量。顶栏引擎是 Claude Code，或你在 **⚙️ → 资源消耗** 里勾选时，它也会开启。 |

### 项目快照 {#project-snapshots}

Agent 启动前，VideoAgents 会把项目复制到数据目录之外，误删后可以恢复（v1.0.43 起）。

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `VIDEOAGENTS_SNAPSHOT` | 开启 | `0` 关闭快照。 |
| `VIDEOAGENTS_SNAPSHOT_DIR` | macOS：`~/Library/Application Support/VideoAgents-Snapshots`；Windows：`%LOCALAPPDATA%\VideoAgents-Snapshots`；其他系统：`~/.local/share/videoagents-snapshots` | 快照存放位置。必须和项目在同一个磁盘上，否则跳过快照。 |
| `VIDEOAGENTS_SNAPSHOT_INTERVAL` | `1800` | 同一个项目两次快照之间至少间隔的秒数。 |
| `VIDEOAGENTS_SNAPSHOT_KEEP` | `3` | 每个项目保留最新的几份快照，另外再保留每天最新的一份…… |
| `VIDEOAGENTS_SNAPSHOT_DAYS` | `7` | ……限于最近这么多天。更早的会被删除。 |

恢复快照见[命令行](/zh/videoagents/reference/command-line#restore-a-project-snapshot)。

## 相关文档 {#related}
- [安全与局域网访问](/zh/videoagents/reference/security)
- [命令行](/zh/videoagents/reference/command-line)
- [项目目录](/zh/videoagents/reference/project-folder)
- [从源码运行](/zh/videoagents/getting-started/run-from-source)
