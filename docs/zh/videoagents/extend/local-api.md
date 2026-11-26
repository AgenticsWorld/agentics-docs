---
title: 本地 API
description: 通过带版本号的 /api/v1 HTTP API，用你自己的脚本操作 VideoAgents，内置交互式 OpenAPI 文档，可以管理运行、签字审批和项目文件。
tags: [api, advanced, reference]
order: 50
---

# 本地 API

控制台做的所有事都通过 `/api/v1` 下一个带版本号的 HTTP API 完成，你也可以从自己的脚本或工具里调用同一个 API：给 Agent 发消息、跟踪它的运行、答复签字，或者读取项目里的文件。每个接口都有内置的交互式文档。

::: warning 没有登录
这个 API 没有账号、密码或令牌。任何能访问到它的程序都能读取你的项目和服务商密钥、修改设置、启动会在你电脑上执行命令的 Agent，并花掉你在服务商那里的额度。只在你自己的电脑上使用。见[安全与局域网访问](/zh/videoagents/reference/security)。
:::

## 找到地址 {#find-the-address}

| 运行 VideoAgents 的方式 | API 基础地址 |
| --- | --- |
| 从源码运行（`videoagents-web`、`make run`） | `http://127.0.0.1:8630/api/v1`，或者你用 `VIDEOAGENTS_PORT` 设置的端口 |
| 桌面应用 | 应用每次启动都会挑一个空闲端口。把鼠标停在控制台顶栏的连接状态圆点上，提示里会显示 Web 端口和 API 端口。使用 Web 端口。 |

通过和控制台相同的地址调用 API。控制台的 Web 服务会把 `/api/v1` 转发给一个单独的 API 服务，这个服务只监听 `127.0.0.1`（默认端口 8640）。在同一台电脑上直接调用 API 服务的端口也可以。

在控制台地址上请求 `GET /api/v1/runtime`，会返回这两个端口。

## 打开 API 文档 {#open-the-api-docs}

在控制台地址上打开 `/api/v1/docs`，例如 <http://127.0.0.1:8630/api/v1/docs>。页面按功能分组列出所有接口，展开一个就能看到它的参数并试用。机器可读的 OpenAPI 描述在 `/api/v1/openapi.json`，可以用来生成客户端。

![VideoAgents API 文档页，版本 1.0.45，显示 system 和 projects 两个分组](/images/videoagents/extend/local-api-docs.webp)

::: tip 提示
文档页里的 **Try it out** 会发出真实的请求。在那里发 `POST`，会像在控制台里操作一样修改你的数据。
:::

## API 里有什么 {#what-s-in-the-api}

v1.0.45 大约有 285 个路径。文档里按以下分组：

| 分组 | 内容 |
| --- | --- |
| system | `health`（版本检查）和 `capabilities` |
| projects | 列出、创建、导入、复制和删除项目；创作定调、项目设置、项目技能、提示词技能 |
| agents | Agent 列表、每个 Agent 的模型设置、每个 Agent 的 `SOUL.md` |
| runs | 发送消息（启动运行）、运行状态、停止运行、给运行中的任务追加内容、对话记录、修改师记录 |
| approvals | 等待答复的确认和签字 |
| events | 实时事件流，见[实时事件](/zh/videoagents/extend/live-events) |
| artifacts | 项目文件，以及预览页背后的数据（世界圣经、角色、场景、分镜等） |
| storyboard | 分镜、草图、组和集的设置 |
| configuration | 生成模型、全局模型、引擎（安装、登录、版本） |
| automation | 自动运行、Agent 高级设置、技能、并发、Agent 记忆、全自动模式 |
| providers | 服务商测试和模型列表 |
| plugins | 列出、安装、启用和删除插件 |
| resources | 资源消耗数据及其设置 |
| footage、live、avatar-assets、voice-input、wechat、feishu、whatsapp、network、nsfw、diagnostics | 对应名称的各个页面 |

## 约定 {#conventions}

- 读取用 `GET`；修改用 `POST`，带 JSON 请求体。少数删除操作用 `DELETE`。
- 很多请求体是自由格式的 JSON 对象，所以文档页只把它们显示为「object」。想知道具体要发什么，在控制台里做同样的操作，同时打开浏览器的开发者工具，在 Network 标签页里查看那个请求。
- 出错时返回 `{"detail": "…"}`，HTTP 状态码如 400、404 或 409。有的错误消息跟随控制台的界面语言，有的只有中文。
- 不存在的 `/api/…` 路径返回 `404`，消息为 `Unknown API endpoint: …`。
- Agent id 包含斜杠，例如 `00-orchestration/workflow-orchestrator`。Agent id 作为路径的一部分时（如 `/agents/{agent}/messages`），斜杠可以原样写。
- 安装、登录和更新 Agent 引擎，只允许在运行 VideoAgents 的那台电脑上进行。

## 常见任务 {#common-tasks}

示例用 `curl` 访问默认的源码运行地址。把 `API` 设成你自己的基础地址。

```bash
API=http://127.0.0.1:8630/api/v1
```

### 检查服务并列出内容 {#check-the-service-and-list-things}

```bash
curl -s $API/health          # {"status":"ok","version":"1.0.45","api_version":"v1"}
curl -s $API/projects        # ["alices", ...]
curl -s $API/agents          # [{"id": "...", "name": "...", "category": "...", ...}, ...]
```

### 给 Agent 发消息 {#send-a-message-to-an-agent}

`POST /runs` 就是控制台 **发送** 按钮做的事。它启动一次运行，并返回运行 id。

```bash
curl -s -X POST $API/runs \
  -H 'Content-Type: application/json' \
  -d '{"project": "alices",
       "agent": "00-orchestration/workflow-orchestrator",
       "message": "Show me the status of ep01."}'
# {"run_id":"3f2a9c1b7d4e"}
```

| 字段 | 必需 | 含义 |
| --- | --- | --- |
| `project` | 是 | 项目名 |
| `agent` | 是 | Agent id |
| `message` | 是 | 消息文字 |
| `engine`、`model` | 否 | 引擎和模型。不填时和控制台一样，使用这个 Agent 自己的模型设置，或者顶栏的全局选择。 |

`/auto on`、`/stop all` 这类[聊天命令](/zh/videoagents/console/chat-commands)写在 `message` 里也有效。它们会立即处理，不启动运行。

### 跟踪运行 {#follow-a-run}

```bash
curl -s $API/runs/3f2a9c1b7d4e
```

返回内容包括 `status`（`queued`、`running`、`done` 或 `error`）、`error`、引擎和模型、最近的活动和文件，运行结束后还有 Agent 在 `result` 里的回复。`GET /runs` 列出所有项目最近的 100 次运行。想要实时更新而不是轮询，用[实时事件](/zh/videoagents/extend/live-events)。

读取控制台显示的对话：

```bash
curl -s "$API/projects/alices/agents/00-orchestration/workflow-orchestrator/messages?limit=20"
```

### 停止运行 {#stop-runs}

```bash
curl -s -X POST $API/runs/3f2a9c1b7d4e/cancel    # 停止一次运行
curl -s -X POST $API/runs/cancel                 # 停止所有运行中和排队中的运行，同 ⏹ 停止
```

### 答复确认或签字 {#answer-a-confirmation-or-sign-off}

```bash
curl -s $API/approvals                           # 等待答复的问题
curl -s -X POST $API/approvals/<id>/answer \
  -H 'Content-Type: application/json' -d '{"answer": "sign off"}'
```

每个审批条目都有一个 `kind`：`sign` 表示[签字点](/zh/videoagents/concepts/sign-off-gates)，`confirm` 表示「重跑还是跳过」这类问题。签字用 `sign off`（签字）或 `hold`（暂缓）答复，确认用 `rerun`（重跑）或 `skip`（跳过）答复，也可以用该条目自己的 `options` 里的某一项。签字仍可能被拒绝并返回错误，例如签字点的检查还没满足时。

### 读取项目文件 {#read-a-project-file}

```bash
curl -s $API/projects/alices/artifacts/story/episodes/ep01/screenplay.md
curl -s -o grp001.mp4 $API/projects/alices/artifacts/assets/clips/ep01/grp001.mp4
```

项目文件夹里的任何文件都能这样读取；各类文件在哪里，见[项目文件夹](/zh/videoagents/reference/project-folder)。

### 一个简单的 Python 客户端 {#a-small-python-client}

```python
import json, time, urllib.request

API = "http://127.0.0.1:8630/api/v1"
direct = urllib.request.build_opener(urllib.request.ProxyHandler({}))  # 访问 127.0.0.1 时绕过系统代理

def call(path, body=None):
    req = urllib.request.Request(API + path, method="POST" if body is not None else "GET",
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json"})
    with direct.open(req) as r:
        return json.load(r)

run_id = call("/runs", {"project": "alices",
                        "agent": "00-orchestration/workflow-orchestrator",
                        "message": "Show me the status of ep01."})["run_id"]
while (run := call(f"/runs/{run_id}"))["status"] in ("queued", "running"):
    time.sleep(5)
print(run["status"], run.get("result") or run.get("error"))
```

## 从命令行安装插件 {#install-a-plugin-from-the-command-line}

插件安装接口把 zip 作为原始请求体接收：

```bash
curl -X POST --data-binary @dist/my-plugin-1.0.0.zip $API/plugins
```

和在插件对话框里安装一样，装好后是停用状态。见[安装插件](/zh/videoagents/extend/install-plugins)。

## 几点说明 {#good-to-know}
- 运行、确认和事件日志保存在数据文件夹里的一个 SQLite 文件中（`.videoagents/runtime.sqlite3`），重启后仍在。服务停止时还在运行的任务会标记为出错。
- `videoagents-api` 只启动 API 服务，不启动控制台。单独运行时，它监听 `VIDEOAGENTS_HOST`:`VIDEOAGENTS_PORT`（默认 127.0.0.1:8630），所以不要在同一个端口上和 `videoagents-web` 同时运行。见[命令行](/zh/videoagents/reference/command-line)。
- macOS 上有些系统代理会拦截发往 `127.0.0.1` 的请求。如果调用因代理错误失败，像 Python 示例那样让本地地址绕过代理。

## 相关文档 {#related}
- [实时事件](/zh/videoagents/extend/live-events)
- [聊天命令](/zh/videoagents/console/chat-commands)
- [命令行](/zh/videoagents/reference/command-line)
- [安全与局域网访问](/zh/videoagents/reference/security)
- [项目目录](/zh/videoagents/reference/project-folder)
