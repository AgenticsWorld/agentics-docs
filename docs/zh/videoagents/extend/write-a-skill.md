---
title: 编写技能
description: 写一份教会某个 Agent 一门手艺的 SKILL.md，给它起一个 Agent 能据以行动的名称和描述，然后安装、测试和分享。
tags: [skills, advanced, how-to]
order: 40
---

# 编写技能

技能是一个包含 `SKILL.md` 文件的文件夹，告诉某个 Agent 怎样把某一类任务做好。把它写成给 Agent 的指令：技能什么时候适用、需要什么、步骤是什么、交付前要做哪些检查。本页介绍格式、Agent 怎样决定是否使用技能，以及怎样测试和分享。

## 开始之前 {#before-you-start}
- 选定技能对应的 Agent。一个技能只属于一个 Agent；它的 id 是 `<agent id>/<skill folder>`，例如 `08-video-gen/prompt/kling4-pe`。
- 读一个同一 Agent 的内置技能。打开这个 Agent 的 **技能** 对话框，点 **查看文本**（见[安装和使用技能](/zh/videoagents/extend/skills)）。
- 读这个 Agent 的 `SOUL.md`（对话区顶部的 **SOUL.md** 按钮，在 **⚙️ → 高级 → Agent 高级设置** 里打开 **Debug 模式** 后显示），让技能符合它的职责，不和它冲突。

## 技能的构成 {#anatomy-of-a-skill}

```text
my-skill/
├── SKILL.md            # 必需
└── references/         # 可选：SKILL.md 引用的较长资料
    └── examples.md
```

- **文件夹名。** 技能在磁盘上的名字。只能用英文字母、数字、`_` 和 `-`。
- **`SKILL.md`。** 以一段简短的 YAML frontmatter 开头，后面是 Markdown 写的指令。
- **其他文件。** 指令里提到的任何东西，例如完整示例或参考表格。内置技能把较长的资料放在 `references/` 里，并在 `SKILL.md` 里指向它们，这样 Agent 只在需要时才去读。

### Frontmatter {#frontmatter}

```markdown
---
name: my-skill
description: Write establishing-shot prompts for night exteriors. Use when a
  group opens a new scene at night outdoors; skip interiors and daytime scenes.
---

# Night exteriors

…instructions…
```

VideoAgents 读取两个字段：

| 字段 | 用途 |
| --- | --- |
| `name` | 在技能对话框和项目技能对话框里显示的名称。上传单个 `.md` 文件时，它也会成为文件夹名。没有这个字段时，显示文件夹名。 |
| `description` | 两个对话框里的一行简介（前 400 个字符），也是 Agent 判断技能是否适合某个任务时读的内容。可以写成多行（`\|` 或 `>`）。 |

没有 frontmatter 时，VideoAgents 取第一个引用行（`> …`）或文件的第一行作为描述。还是要写 frontmatter；Agent 依赖的就是它。

## Agent 怎样使用技能 {#how-agents-use-a-skill}

技能有两种被使用的方式：

- **你让 Agent 用它。** 在 **技能** 对话框里点这个技能，它的路径会插入你的消息，Agent 在这个任务里读取它。
- **项目开启了它。** 对于在 **🎛️ → 项目技能** 里勾选的技能，Agent 开始的每个任务都会附上勾选技能的列表，带路径和描述。Agent 先根据描述、任务和条件判断技能是否适用。适用就在开始工作之前读完整份 `SKILL.md`，按它的前提和步骤去做，并在交付之前做完它要求的检查。不适用就跳过，并说明原因。总制片也能看到勾选的技能，并把它们分配给相应的任务。

对每个勾选的技能，Agent 会按它处理过的每一集、每一组，记录执行中、已完成、已跳过、失败或未验证。这些报告显示在 **🎛️ → 项目技能 → 执行记录** 里，附带所用技能文件的版本（它的 SHA-256）。这些内容你都不用写进技能；VideoAgents 会告诉 Agent 这样做。

你写的技能属于 **通用** 类：它们没有内置的触发条件，所以描述就是触发条件。

## 写好技能 {#write-a-good-skill}

- **让描述来决定。** 写清技能做什么、什么时候用、什么时候不用。「在……时使用；……时跳过」这种写法效果很好。描述含糊，Agent 要么跳过这个技能，要么到处都用。
- **列出它需要什么。** 写明输入（项目里的文件、设置、之前的产物）。Agent 会报告缺少的输入，而不是去猜。
- **按顺序写步骤**，给出具体的格式和路径。使用项目文件夹里的路径（`story/`、`directing/`、`assets/…`，见[项目文件夹](/zh/videoagents/reference/project-folder)），不要用你电脑上的绝对路径。
- **以检查收尾**：写出 Agent 在交付前可以执行的检查，并说明报告里要写什么。
- **不超出 Agent 的职责。** Agent 被告知，技能不能改动冻结的台词、项目结构或各个 Agent 的分工。技能里要求这些的部分会被忽略。
- **主文件要短。** 把长的示例和表格移到 `references/` 里，并说明什么时候去读。

## 安装和测试 {#install-and-test-it}

1. 把技能文件夹打成 zip；如果没有其他文件，也可以单独用 `SKILL.md`。如果 `SKILL.md` 放在 zip 的根目录，zip 要以技能名命名。
2. 选中对应的 Agent，打开 **技能**，点 **加载技能**，选择文件。技能出现在列表里，带 **已上传** 标签。
3. 点 **查看文本**，确认读取正确。
4. 手动测试：点卡片插入路径，补上一个任务，然后发送。
5. 测试自动使用：在 **🎛️ → 项目技能** 里勾选它并保存，然后给 Agent 一个应该触发它的任务。在 **执行记录** 里查看是已完成，还是跳过的原因。

要修改已安装的技能，先在 **技能** 对话框里删除它，再加载新版本。上传同名技能覆盖已有技能会被拒绝。

## 分享 {#share-it}

- 分享 zip。别人在同一个 Agent 上用 **加载技能** 安装。
- 要让技能随插件一起提供，把它放进插件 Agent 的文件夹：`agents/<category>/<name>/skills/<skill>/SKILL.md`。已启用插件的 Agent 的技能和内置技能一样列出。插件包只能包含 `.md`、`.json` 和 `.yaml` 文件（见[编写插件](/zh/videoagents/extend/write-a-plugin)）。
- [VideoAgents-Skills](https://github.com/AgenticsWorld/VideoAgents-Skills) 仓库收集了已发布的技能。

::: tip 提示
起一个这个 Agent 的内置技能都没用过的名字。如果后来的 VideoAgents 版本加了一个同名的内置技能，你的技能就不再被使用，并显示为未生效。
:::

## 相关文档 {#related}
- [安装和使用技能](/zh/videoagents/extend/skills)
- [项目技能](/zh/videoagents/console/project-skills)
- [编写插件](/zh/videoagents/extend/write-a-plugin)
- [视频提示词与提示词技能](/zh/videoagents/create/video-prompts)
