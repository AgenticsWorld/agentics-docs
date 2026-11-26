---
title: 编写插件
description: 用 plugin.json、每个 Agent 一份 SOUL.md 和一个可选的工作流文件编写你自己的插件，测试后打包成 zip。
tags: [plugins, advanced, reference]
order: 20
---

# 编写插件

插件用新的 Agent 扩展团队，如果需要，还可以带上它们自己的工作流，而不用改动 VideoAgents 本身。插件完全用文本编写：一个 JSON 清单、每个 Agent 一份角色说明，以及一个 YAML 工作流。本页列出格式和 VideoAgents 会检查的规则。

## 开始之前 {#before-you-start}
- 读一个 VideoAgents 自带的插件。[VideoAgents 仓库](https://github.com/AgenticsWorld/VideoAgents)里的 `plugins/derivative-fiction/` 是参考示例；它遵循的编写指南是 `plugins/README.md`。
- 读 `agents/_TEMPLATE.md`，这是每个 Agent 的 `SOUL.md` 都遵循的骨架；再读 `agents/WORKFLOW.md` §10，那里定义了插件怎样调度。
- 知道怎样[安装和启用插件](/zh/videoagents/extend/install-plugins)。

## 文件夹结构 {#folder-layout}

```text
my-plugin/
├── plugin.json                         # 清单（必需）
├── README.md                           # 插件做什么（建议提供）
├── agents/
│   └── <NN-category>/<name>/SOUL.md    # 每个 Agent 一个文件夹（必需）
└── workflows/<name>.yaml               # 插件的工作流（可选）
```

插件不含程序代码。Agent 工作时写的脚本放进项目的 `code/` 文件夹，和内置 Agent 一样。

## plugin.json {#plugin-json}

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "One sentence on what the team does.",
  "categories": { "19-my-team": "My team" },
  "agents": [
    { "id": "19-my-team/planner" },
    { "id": "19-my-team/writer" },
    { "id": "11-qa/my-qa", "stateless": true }
  ],
  "workflows": ["workflows/main.yaml"],
  "outputs_ns": "mine",
  "requires": {
    "artifacts": ["bible/world.json", "bible/characters/index.json"],
    "plugins": []
  }
}
```

| 字段 | 必需 | 规则和作用 |
| --- | --- | --- |
| `name` | 是 | 必须和文件夹名相同。英文字母、数字、`_` 和 `-`，以字母或数字开头，最多 60 个字符。 |
| `version` | 否 | 显示在插件卡片上。 |
| `description` | 否 | 显示在卡片上，并加进总制片和插件里每个 Agent 的指令。 |
| `categories` | 否 | 新的 Agent 分组：文件夹名 → Agent 列表里显示的名称。文件夹名用英文字母、数字、`_` 和 `-`。 |
| `agents` | 是 | 团队成员。每个 `id` 分两部分 `<category>/<name>`，并且需要有 `agents/<id>/SOUL.md`。可选标志：`stateless` 和 `dispatcher`（见下文）。 |
| `workflows` | 否 | 工作流文件的路径，相对于插件文件夹。每个都必须以 `.yaml` 或 `.yml` 结尾、真实存在，并且不能包含 `..`。 |
| `outputs_ns` | 否 | 插件在每个项目里的文件夹：它的 Agent 把结果写到 `<project>/<outputs_ns>/`。 |
| `requires.artifacts` | 否 | 插件开始之前需要的项目文件。总制片会检查它们，缺了就先跑主工作流里相应的步骤。 |
| `requires.plugins` | 否 | 这个插件依赖的其他插件。 |

### Agent id 和分组 {#agent-ids-and-categories}

- Agent id 在整个 VideoAgents 里唯一。已经被内置 Agent 或其他插件占用的 id 会被拒绝，整个插件也就不会注册。
- 内置分组使用编号 00–12 和 15–18；官方插件使用 13 和 14。你自己的分组从 19 开始编号。如果你用了内置分组的名字，以内置的显示名称为准。
- Agent 也可以放在内置分组里，例如把一个审核 Agent 放在 `11-qa/` 下。`11-qa/` 下的 Agent 本来就是无状态运行。
- `"stateless": true` 表示每张工单都自成一体：Agent 每次都开一个新会话，可以同时跑好几张。适合审核 Agent 和逐项处理的 Agent。
- `"dispatcher": true` 让这个 Agent 有权给其他 Agent 派单。大多数插件用不到；插件的工作由总制片派发。

## SOUL.md {#soul-md}

每个 Agent 的 `SOUL.md` 就是它的岗位说明，VideoAgents 会原封不动地把它写进这个 Agent 的指令里。按 `agents/_TEMPLATE.md` 的骨架写；总制片靠这些章节分派工作：

| 章节 | 写什么 |
| --- | --- |
| 我是谁 | 分组、文件夹、所处的流水线阶段和工作粒度（全书、每集、每个镜头、每个角色），用一句话说明使命。 |
| 职责 | 三到六项具体职责，每项以动词开头。 |
| 不做什么（边界） | 至少两件这个 Agent 不做的事，每件都写明由哪个 Agent 来做。 |
| 输入、输出 | 用表格列出来源和产物，写明路径和格式。 |
| 接受的工作指令（Work Order） | Agent 读取的字段，以及一张贴近实际的工单示例。 |
| 质量标准（Definition of Done） | 机器检查项，以及带及格线的评分标准。 |
| 校验与返工 | 谁来验收，不合格时怎么处理。 |
| 上下游协作 | 谁给这个 Agent 提供输入，谁使用它的产出。 |

你不需要重复插件的身份信息：VideoAgents 会自动把插件名称和简介、插件文件夹、工作流文件，以及「只在 `outputs_ns` 里写」这条规则，加进每个成员的指令。

插件里的 Agent 也可以有技能：放在 `agents/<category>/<name>/skills/<skill>/SKILL.md`。见[编写技能](/zh/videoagents/extend/write-a-skill)。

## 工作流文件 {#the-workflow-file}

插件工作流的结构和主工作流 `agents/workflow.yaml` 相同：阶段里包含任务，带有 `depends_on`、`for_each` 扇出、`validation`（机器检查、评分标准和审核 Agent）以及签字点。用户要求做插件负责的工作时，总制片把这些步骤加进项目的工作流，并和主工作流的步骤一起跟踪。

```yaml
version: 1
plugin: my-plugin
defaults:
  eval_threshold: 80
  max_retries: 3
  on_fail: escalate_human

phases:
  - id: mp0
    name: Plan
    tasks:
      - id: mp0-plan
        agent: 19-my-team/planner
        outputs: [mine/plan.json]
        validation:
          auto: [schema]
          rubric: creative_v1
      - { id: gm0, gate: true, human: true, checkpoint: MPH1-Plan sign-off,
          depends_on: [mp0-plan] }
```

规则：

- **任务和签字点用你自己的 id 前缀**（`derivative-fiction` 用 `nv…` 和 `gn…`）。不要用主工作流的 `p0-`–`p11-` 和 `g0`–`g10`。
- **人工签字** 是带 `human: true` 和 `checkpoint` 标签的签字点。它们和内置的[签字点](/zh/videoagents/concepts/sign-off-gates)一样工作。
- **暂停无关的主工作流步骤。** 可选的顶层字段 `main_dag_on_start.skip` 列出你的插件让它们变得多余的主工作流步骤（`p4-*` 匹配所有以 `p4-` 开头的步骤，签字点按完整 id 列出）。插件的步骤加入时，这些步骤会设为跳过，但前提是其中没有一个已经开始；只要有一个开始了，就什么都不跳过。之后用户要求做这部分工作时，被跳过的步骤会恢复。把这些阶段里的签字点也列上，否则它们会一直等下去。完整的列表见 `plugins/derivative-fiction/workflows/novel.yaml`。

## 守规矩的插件要遵守的规则 {#rules-for-well-behaved-plugins}

1. **只在自己的文件夹（`outputs_ns`）里写。** 例外是 `runs/` 里的运行记录和 `qa/defects/` 里的缺陷单。
2. **永远不要修改世界圣经。** 新设定写进 `<outputs_ns>/bible-delta/`。要把它并入 `bible/`，须经过记忆圣经管理者和用户的签字。
3. **复用已有的东西。** 用现有的评分标准打分（例如 `writing_v1`、`creative_v1`、`analysis_v1`），合适的地方用内置的 `11-qa/*` 审核 Agent。只有需要一种新的检查时，才加自己的审核 Agent。
4. **不含可执行代码。** 只有 JSON、YAML 和 Markdown。

## 测试插件 {#test-your-plugin}

1. 把插件文件夹复制到数据文件夹下的 `plugins/` 文件夹（见[安装插件](/zh/videoagents/extend/install-plugins#by-copying-the-folder)）。
2. 大约 30 秒后，打开 **⚙️ → 插件**。如果卡片显示 **无效**，按红字列出的原因修正。检查项有：
   - `plugin.json` 存在、是一个 JSON 对象，并且 `name` 和文件夹名一致；
   - 每个分组名和 Agent id 格式正确，每个 Agent 都有 `SOUL.md`；
   - 至少列了一个 Agent；
   - 每个工作流文件都存在，并以 `.yaml` 或 `.yml` 结尾；
   - 没有 Agent id 和内置 Agent 或其他插件冲突。
3. 点 **启用**。在 Agent 列表里和每个新 Agent 对话，确认它理解自己的角色。
4. 让总制片在一个测试项目上跑插件的工作，在 **工作流预览** 里跟进。

## 打包成 zip {#package-it-as-a-zip}

在源码目录里运行：

```bash
make plugin-package PLUGIN=path/to/my-plugin
# 或者
python3 scripts/package_plugin.py path/to/my-plugin --out-dir dist
```

它会生成 `dist/<name>-<version>.zip` 和 `dist/<name>-<version>.json`（名称、版本、SHA-256、大小和文件清单）。这个脚本会：

- 像安装程序一样检查清单（名称、Agent id、`SOUL.md` 文件、工作流路径），遇到第一个问题就停下；
- 把文件包在一个以插件命名的文件夹里，解压后得到的文件夹可以直接复制进 `plugins/`；
- 只打包 `.json`、`.yaml`、`.yml` 和 `.md` 文件，其他文件跳过并给出提示；
- 发现脚本或二进制文件（`.py`、`.sh`、`.js`、`.exe` 之类）时报错停止；
- 去掉 `.DS_Store`、`__pycache__`、`.git` 之类的杂项，相同的文件每次都打出相同的 zip。

用户用 **⬆ 安装插件包（zip）** 安装这个 zip。发布新版本时调高 `version`；用户要先删除旧版本，再安装新版本。

## 相关文档 {#related}
- [安装插件](/zh/videoagents/extend/install-plugins)
- [编写技能](/zh/videoagents/extend/write-a-skill)
- [工作流](/zh/videoagents/concepts/workflow)
- [Agent 团队](/zh/videoagents/concepts/agent-crew)
- [项目目录](/zh/videoagents/reference/project-folder)
