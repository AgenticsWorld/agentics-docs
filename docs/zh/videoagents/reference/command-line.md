---
title: 命令行
description: 从源码运行 VideoAgents、全自动模式、打包插件、恢复项目快照和几条诊断命令。
tags: [reference, source, advanced]
order: 40
---

# 命令行

桌面应用不需要命令行。从源码运行 VideoAgents 时，用下面这些命令启动控制台、开启全自动模式、打包插件、恢复项目快照和排查问题。

## 开始之前 {#before-you-start}
- 从源码安装 VideoAgents：见[从源码运行](/zh/videoagents/getting-started/run-from-source)。
- 在仓库目录里运行命令，并激活它的虚拟环境（macOS 和 Linux 上执行 `source .venv/bin/activate`）。`make` 目标和 `./run.sh` 在 `.venv` 存在时会自动使用它。

## 启动和停止 {#start-and-stop}

| 命令 | 作用 |
| --- | --- |
| `videoagents-web` | 启动控制台和它需要的全部服务。等同于 `python apps/web/server.py` 或 `make run`。 |
| `videoagents-api` | 只启动 API 服务，不启动控制台。等同于 `python -m services.api` 或 `make api`。 |
| `make run-auto` | 以全自动模式启动控制台（见下文）。 |
| `./run.sh` | 等同于 `make run-auto`，用于没有 `make` 的电脑。 |

`videoagents-web` 会启动：

| 部分 | 地址 | 说明 |
| --- | --- | --- |
| 控制台 | `http://127.0.0.1:8630` | 在浏览器里打开。API 文档在 `/api/v1/docs`。 |
| API 服务 | `http://127.0.0.1:8640` | 由控制台启动和停止。控制台把 `/api/v1` 转发给它。 |
| 手机画分镜页面 | 8631 端口，监听所有网络接口 | 只有画分镜页面和受令牌保护的上传接口。 |
| 动效短片预览 | 8632 端口 | 8632 被占用时改用空闲端口。 |

启动时每一项都会打印一行。控制台端口用 `VIDEOAGENTS_PORT` 修改（画分镜和预览端口跟着变），API 端口用 `VIDEOAGENTS_API_PORT` 修改；见[配置](/zh/videoagents/reference/configuration)。

按一次 **Ctrl+C** 停止。VideoAgents 会关闭 API 服务、画分镜页面和消息连接，并停止正在运行的 Agent 任务。这些任务会显示「服务关闭，任务已停止」；下次启动后给总制片发 **▶ 继续**，就能接着做。

如果上一次运行被强制结束，留下了还在运行的 API 服务，下次执行 `videoagents-web` 时会先停掉这个残留服务，再启动新的。它不会动占用这个端口的其他程序，只会打印一条提示。

只有其他客户端要直接调用 API 时，才单独运行 `videoagents-api`。单独运行时，它监听 `VIDEOAGENTS_HOST`:`VIDEOAGENTS_PORT`（默认 127.0.0.1:8630），所以不要在同一个端口上和 `videoagents-web` 同时启动。

## 全自动模式 {#full-auto-mode}

```bash
make run-auto
# 或
./run.sh
```

两者都会设置 `VIDEOAGENTS_PERMISSION_MODE=bypassPermissions`，Claude Code 引擎上的 Agent 运行 shell 命令时不再弹出确认，适合无人值守的流水线。Codex CLI、Pi 和 Agentics 引擎本来就是无人值守运行。阻止总制片自己运行生成命令的保护仍然开启。

::: warning 注意
这样 Agent 就能运行任何命令。只在可信的电脑上使用。桌面应用默认就是这样运行的。见[安全与局域网访问](/zh/videoagents/reference/security#agent-permissions-and-safeguards)。
:::

`./run.sh` 会检查依赖是否已安装，并依次尝试 `.venv/bin/python`、`python`、`python3`。要指定其他 Python，设置 `PYTHON=/path/to/python`。

这和 **工作流预览** 页上的 **全自动模式** 复选框不是一回事，那个复选框会在单个项目里替你签字。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

## 安装和维护 {#install-and-maintain}

| 命令 | 作用 |
| --- | --- |
| `make install` | 安装 VideoAgents 和它的 Python 依赖（`pip install -e .`）。 |
| `pip install -e ".[storage]"` | 加装对象存储的 SDK（火山引擎 TOS、阿里云 OSS、腾讯云 COS、S3）。 |
| `make install-pi` | 安装内置的 Agentics 引擎。需要 `PATH` 里有 Node.js 22.19 或更新版本。 |
| `make install-dev` | 加装测试工具。 |
| `make test` | 运行测试。 |
| `python apps/web/check.py` | 检查控制台的文件和 API 路径是否完整。 |

桌面应用的开发（`make desktop-dev`、`make desktop`）见仓库里的 `docs/DEVELOPMENT.md`。

## 打包插件 {#package-a-plugin}

```bash
make plugin-package PLUGIN=path/to/my-plugin
# 或
python3 scripts/package_plugin.py path/to/my-plugin --out-dir dist
```

生成 `dist/<name>-<version>.zip`，用于 **⚙️ → 插件 → ⬆ 安装插件包(zip)**。见[编写插件](/zh/videoagents/extend/write-a-plugin#package-it-as-a-zip)。

## 恢复项目快照 {#restore-a-project-snapshot}

Agent 启动前，VideoAgents 会把它的项目复制到数据目录之外（v1.0.43 起）。目前还没有恢复按钮，需要用命令行：

```bash
# 列出全部快照
python -m services.runtime.project_snapshot list

# 恢复到一个新的项目目录
python -m services.runtime.project_snapshot restore \
  "<快照目录>" "<数据目录>/projects/alices-restored"
```

- `list` 每行打印一个快照目录，按日期和时间命名（`YYYYmmdd-HHMMSS`）。如果用 `VIDEOAGENTS_SNAPSHOT_DIR` 换过快照位置，在 `list` 后面加上那个目录。
- `restore` 从不覆盖：目标目录已经存在时会拒绝执行。恢复成一个新名字，在控制台里检查无误后，再自己替换或删除损坏的项目。
- 快照只包含项目目录，不包含对话和设置。

## 诊断 {#diagnostics}

| 命令 | 显示内容 |
| --- | --- |
| `python3 services/runtime/dagcheck.py --project <name>` | 检查项目的工作流文件（`runs/dag.json`）有没有错误。 |
| `python3 services/runtime/dagcheck.py --project <name> --frontier` | 列出现在就能运行的工作流步骤，以及因为当前集还没做完而暂缓的后续集。项目好像卡住时很有用。 |
| `python3 modules/genmedia.py info` | 当前生效的生成服务商和模型。 |
| `python3 modules/transcription.py doctor` | 本地语音识别（faster-whisper）能不能用，以及它运行在哪个 Python 上。 |

## 相关文档 {#related}
- [从源码运行](/zh/videoagents/getting-started/run-from-source)
- [配置](/zh/videoagents/reference/configuration)
- [安全与局域网访问](/zh/videoagents/reference/security)
- [问题排查](/zh/videoagents/reference/troubleshooting)
