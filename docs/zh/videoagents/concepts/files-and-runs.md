---
title: 文件、运行记录与版本
description: 团队做出的一切都是你能打开的文件。了解每个任务留下什么记录、媒体怎样记录它的来源，以及旧版本怎样保留。
tags: [beginner, reference]
order: 60
---

# 文件、运行记录与版本

VideoAgents 不是黑箱。每张设定卡、每条提示词、分镜表、审核报告和视频都是项目目录里的文件；每个任务都会留下它做了什么的记录；每张生成的图片、每段生成的片段都记录着生成它的模型、服务商和参考素材。

## 一切都是文件 {#everything-is-a-file}

每个 Agent 的输出都是项目目录里固定位置的一个文件。这个路径写在 Agent 的职责说明里，所以下一个 Agent 知道去哪里找。几个例子：

| 内容 | 位置 |
| --- | --- |
| 某个人物的外貌 | `bible/characters/<character id>/appearance.json` |
| 道具卡 | `bible/props.json` |
| 第 1 集剧本 | `story/episodes/ep01/screenplay.md` |
| 第 1 集分镜表和生成组 | `directing/ep01/shot_list.json` |
| 某个组的视频提示词 | `assets/prompts/ep01/grp005.json` |
| 某个组的视频 | `assets/clips/ep01/grp005.mp4` |
| 第 1 集字幕和成片 | `edit/ep01/subtitles_final.srt`、`edit/ep01/final.mp4` |
| 审核缺陷单 | `qa/defects/DEF-ep01-visual-0042.json` |

预览页读取这些文件，用更易读的形式展示出来，但你随时可以打开文件本身。完整结构见[项目与项目目录](/zh/videoagents/concepts/projects)。

## 生成的媒体从哪里来 {#where-generated-media-comes-from}

生成的媒体会保留它是怎样生成的记录：

- **图片。** 概念图目录里有一个 `prompts.json`，记录每张设定图的提示词、它依据的世界圣经文件，以及用到了你的哪些参考文件、怎样用的。
- **视频。** 每个组片段旁边都有一个 `.meta.json`，记录模型和服务商、请求内容、参考文件、通过的检查和用量。
- **用量。** `usage_ledger.jsonl` 文件列出每次生成调用的服务商、模型、尺寸，以及消耗的 tokens 或计费单位。
- **你的参考素材。** 只要 Agent 用了 `refs/` 里的东西，输出里就会在 `user_refs` 下记录下来。

所以你总能查到某个版本的人物或某个镜头是怎么来的。

## 运行记录：每个任务留下什么 {#runs-what-each-task-leaves-behind}

[工作流](/zh/videoagents/concepts/workflow)里的每个任务都有自己的目录 `runs/<task id>/`，里面有三个文件：

| 文件 | 由谁写 | 内容 |
| --- | --- | --- |
| `result.json` | 执行任务的 Agent | 输出文件、它自己的检查，以及它发现的和世界圣经的冲突 |
| `eval.json` | 质量评委 | 每个评分项的得分和结论（仅在打开质量评分时） |
| `meta.json` | 总制片 | 运行 ID、第几次尝试、模型、消耗的 tokens、开始和结束时间、输入文件，以及它产出的文件的版本 |

任务的记录不完整，就不会被标记为完成。`runs/` 里的其他记录：

- `runs/dag.json`：工作流本身，包含每个任务的状态。
- `runs/<gate>/gate.json`：每个签字点的记录，包括你的签字。见[签字点](/zh/videoagents/concepts/sign-off-gates)。
- `runs/revisions/`：[修改师](/zh/videoagents/concepts/reviser)每做一次修改就有一条记录。

这些文件你很少需要自己打开。在 **工作流预览** 页点一个任务，就能看到它的状态、Agent、用时、输出和备注；控制台里每个 Agent 的对话也会显示它的回复。

![工作流预览页上任务 p6-shots-ep01 的详情：状态为已通过，Agent 为镜头规划，实际用时 21m04s，依赖 g6s-ep01，输出 directing/ep01/shot_list.json，以及一条备注](/images/videoagents/concepts/files-and-runs-task-detail.webp)

### 缺陷单 {#defects}

审核 Agent 发现问题时，会在 `qa/defects/` 里提交一张缺陷单，写明严重程度（阻断级 blocker、严重级 major 或轻微级 minor）、违反了哪条规则、证据、应该由谁修复以及当前状态。打开 **🎛️ → 缺陷单**，可以查看项目的缺陷单，并把它们发给总制片。见[审核与缺陷单](/zh/videoagents/create/qa-reviews)。

## 版本 {#versions}

VideoAgents 用好几种方式保留旧版本，从整个项目到单张图片。

### 整个项目 {#whole-projects}

| 方式 | 怎样工作 | 在哪里找 |
| --- | --- | --- |
| **副本** | **🎛️ → 版本管理 → 📋 复制项目** 会完整复制一份，作为新项目。 | **项目** 对话框 **备份** 列里、源项目的下方 |
| **自动备份** | 打开 **💾 自动备份**（版本管理页）后，每次签字都会把整个项目压缩成 zip。 | 你选的目录；用 **› 导入项目…** 还原 |
| **快照** | Agent 开始工作前，VideoAgents 会给项目目录拍快照，最多每 30 分钟一次。保留最新的 3 份，以及最近 7 天里每天最新的一份。 | Mac 上在 `~/Library/Application Support/VideoAgents-Snapshots`，Windows 上在 `%LOCALAPPDATA%\VideoAgents-Snapshots` |

快照只覆盖项目目录，不包括对话和设置。在 Mac 上，快照刚开始几乎不占额外空间。目前还没有还原快照的按钮，需要用命令行操作。见[命令行](/zh/videoagents/reference/command-line)。

VideoAgents 还会拒绝执行 Agent 发出的、会删除数据目录或整个项目目录的命令。这项检查在 pi 和 agentics 引擎上最严格；在其他引擎上只能尽力而为。

### 项目内部 {#inside-a-project}

- **世界圣经** 有受控的版本和 `bible/changelog.md` 里的变更日志。签字之后的改动要走变更流程，不会悄悄覆盖。
- **后期处理** 的调整是叠加在母本片段上的版本，母本永远不会被覆盖。你可以 A|B 对比，也可以回退。见[后期处理](/zh/videoagents/create/post-production)。
- **导演台** 会为 3D 白模的每次改动保存版本，并能 A|B 对比版本。见[导演台](/zh/videoagents/create/directors-console)。
- **画板** 会保留你在里面编辑过的图片的每个版本，由你选定哪一版是最终版。见[画板：编辑图片](/zh/videoagents/world/image-canvas)。
- **修改师重新生成** 分镜背景图时，会新增一张图片并保留原图。

## 相关文档 {#related}
- [项目与项目目录](/zh/videoagents/concepts/projects)
- [工作流](/zh/videoagents/concepts/workflow)
- [复制和删除项目](/zh/videoagents/console/project-versions)
- [项目目录](/zh/videoagents/reference/project-folder)
