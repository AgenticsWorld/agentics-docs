---
title: 实时事件
description: 订阅 /api/v1/events 事件流，实时跟踪运行、Agent 回复、签字请求和设置变化，不用轮询。
tags: [api, advanced, reference]
order: 60
---

# 实时事件

`GET /api/v1/events` 是一个 Server-Sent Events（SSE）事件流。只要你保持连接，控制台上每一项实时显示的变化，VideoAgents 都会推送一个事件：运行的开始和结束、Agent 正在输出的文字、对话消息、确认和签字，以及自动运行这类开关。控制台和各预览页用的也是这个事件流。

## 开始之前 {#before-you-start}
- 知道 API 的地址，并且清楚它没有登录。见[本地 API](/zh/videoagents/extend/local-api)。
- 任何 SSE 客户端都可以：`curl -N`、浏览器的 `EventSource`，或者你所用语言的 SSE 库。

## 连接 {#connect}

```bash
curl -N http://127.0.0.1:8630/api/v1/events
```

```text
data: {"type":"hello"}

data: {"type":"run","run":{"id":"3f2a9c1b7d4e","agent":"00-orchestration/workflow-orchestrator","project":"alices","status":"running",...}}

: ping
```

- 每个事件是一行 `data:`，内容是一个 JSON 对象，后面跟一个空行。`type` 字段说明事件类型。
- 连接后的第一个事件总是 `{"type":"hello"}`。
- 15 秒内没有任何事件时，服务端会发一行 `: ping` 注释来保持连接。SSE 客户端会忽略它。
- 你只会收到连接期间发生的事件，之前的不会补发。重新连接后，先用普通的 `GET` 接口（`/runs`、`/approvals`、对话记录）读取当前状态，再继续依赖事件。事件流断开时，控制台会在 2 秒后重新连接。
- 事件流包含所有项目的事件。按 `project` 过滤（流式文字则按所属运行的项目过滤）。

在一个由控制台地址提供的浏览器页面里：

```js
const es = new EventSource('/api/v1/events')
es.onmessage = (e) => {
  const ev = JSON.parse(e.data)
  if (ev.type === 'run') console.log(ev.run.agent, ev.run.status)
}
```

## 核心事件 {#core-events}

| `type` | 什么时候 | 字段 |
| --- | --- | --- |
| `hello` | 刚连接上时 | — |
| `run` | 一次运行被创建或发生变化：排队、运行中、有新的活动或文件、完成、出错 | `run`：`id`、`agent`、`agent_name`、`project`、`status`（`queued`、`running`、`done`、`error`）、`source`、`parent`（派出它的那次运行）、`created`、`started`、`ended`、`engine`、`model`、`tokens`、`cost`、`turns`、`error`、`stopped`、`net_error`、`progress`、`activity`（最后 8 行）、`files`（最后 20 个）、`message`（前 120 个字符） |
| `chat` | 某个 Agent 的对话里新增一条消息：你的消息、命令的回复，或者 Agent 的最终回复 | `agent`、`project`、`role`（`user` 或 `assistant`）、`text`、`ts`，以及视情况出现的 `run_id`、`source`（例如来自飞书的消息）、`status` |
| `text` | Agent 正在写的回复中的一段 | `run_id`、`agent`、`text` |
| `tool` | Agent 调用了一个工具，或者拿到了工具结果 | `run_id`、`agent`、`desc`（一行说明）、`kind`（结果为 `result`） |
| `progress` | 运行中任务的状态行发生变化（思考中、正在执行工具、等待中） | `run_id`、`agent`、`note`（清除时为空） |
| `file` | Agent 写入或编辑了一个文件 | `run_id`、`agent`、`path` |
| `confirm` | 一个问题或签字需要你答复 | `id`、`kind`（`sign` 或 `confirm`）、`question`、`options`、`default`、`timeout`、`remaining`（秒数，签字没有这一项）、`parent`，以及视情况出现的 `project`、`gate_id`、`checkpoint`、`gate_label` |
| `confirm_done` | 一个问题或签字已答复，来自控制台、手机消息通道或 API | `id`、`answer` |
| `watchdog` | 某个项目的自动运行被打开或关闭 | `project`、`enabled` |
| `full_auto` | 某个项目的全自动模式被打开或关闭 | `project`、`enabled` |
| `revision` | 修改师完成了一次修改 | `project`、`id`、`status`、`target` |
| `project_skills` | 某个项目的技能选择已保存 | `project` |
| `prompt_skill` | 某个项目的视频提示词技能设置发生变化 | `project`、`resolved`、`config` |

`text`、`tool`、`progress` 和 `file` 事件带 `run_id`，但不带项目。把收到的 `run` 事件保存下来，用来查每个运行 id 对应的项目和 Agent。

`confirm_done` 里的 `answer` 和 `options` 里的选项，对标准选项一律使用内部的中文键（例如 `签字`、`暂缓`），与界面语言无关。通过 API 答复时也可以发英文词；见[本地 API](/zh/videoagents/extend/local-api#answer-a-confirmation-or-sign-off)。

## 页面事件 {#page-events}

各预览页会监听和自己工作有关的事件。大多数带 `project`，适用时还带 `ep` 和 `grp`：

| `type` | 使用方 |
| --- | --- |
| `board_sketch`、`board_animatic`、`dialogue_tts` | 故事板页：新的草图、动态样片、对白配音 |
| `sketchgen`、`group_settings`、`episode_settings`、`transition_design`、`shot_plate_upscale` | 分镜预览：草图生成、按组和按集的模型设置、过场、分镜背景图超分 |
| `post_job` | 后期处理页的任务 |
| `scene_panos`、`scene_world` | 场景页：全景图和世界模型 |
| `director` | 导演台 |
| `canvas`、`refgen`、`refgen3d`、`offscreen_lines`、`codevideo_pack`、`codevideo_render` | 画板、参考图和 3D 模型生成、画外台词、动效短片渲染 |

这些事件的字段随各页面的需要而定，不同版本之间可能会变。做集成时用核心事件。

## 示例：等待运行结束并答复签字 {#example-wait-for-a-run-and-answer-sign-offs}

```python
import json, urllib.request

API = "http://127.0.0.1:8630/api/v1"
direct = urllib.request.build_opener(urllib.request.ProxyHandler({}))

with direct.open(API + "/events") as stream:
    for raw in stream:
        line = raw.decode().strip()
        if not line.startswith("data:"):
            continue                      # 空行和 ": ping"
        ev = json.loads(line[5:])
        if ev["type"] == "run" and ev["run"]["status"] in ("done", "error"):
            r = ev["run"]
            print(f'{r["project"]} · {r["agent"]}: {r["status"]}')
        elif ev["type"] == "confirm" and ev["kind"] == "sign":
            print("Sign-off waiting:", ev.get("gate_label") or ev["question"])
```

## 几点说明 {#good-to-know}
- 事件也会写进数据文件夹里的运行状态数据库，但没有读取历史事件的接口。当前状态请用 `GET /runs`、`GET /approvals` 和对话记录接口获取。
- 事件里的一些状态文字（活动行、运行错误）由服务端按控制台的界面语言写出，有的只有中文。代码里请用 `status`、`kind`、`net_error` 这类字段判断，不要依赖文字内容。例如网络故障会设置 `net_error: true`，错误文字以 🔌 开头。

## 相关文档 {#related}
- [本地 API](/zh/videoagents/extend/local-api)
- [运行面板](/zh/videoagents/console/run-panel)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
- [自动运行](/zh/videoagents/console/auto-run)
