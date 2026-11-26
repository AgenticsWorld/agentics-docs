---
title: 安装和使用技能
description: 查看一个 Agent 有哪些技能，让它在某个任务里用某个技能，为项目开启技能，以及安装或删除你自己的 SKILL.md 技能包。
tags: [skills, beginner, how-to]
order: 30
---

# 安装和使用技能

技能是一个 `SKILL.md` 文件，有时旁边还带几个参考文件，用来教会一个 Agent 一门手艺，例如为某个视频模型写提示词，或者填写发布草稿。每个 Agent 有自己的技能。你可以让 Agent 在某个任务里用某个技能，为整个项目开启技能，也可以安装你自己的技能。

## VideoAgents 自带的技能 {#skills-that-come-with-videoagents}

| Agent | 技能 | 用途 |
| --- | --- | --- |
| Prompt 工程师 | `sd25-pe`、`sd20-pe`、`h3-pe`、`wan3-pe`、`kling4-pe` | 为 Seedance 2.5、Seedance 2.0 系列、MiniMax H3、Wan 3.0 和 Kling 4.0 写组视频提示词。自动使用与生效的视频模型相匹配的那一个。 |
| Prompt 工程师 | `performance-direction` | 在对白组和情绪高潮的提示词里写表演指导。默认关闭。 |
| Prompt 工程师 | `fight-choreography` | 一招一式地写打斗戏。默认关闭。 |
| 视频生成 | `agentics-media-generation` | 通过 Agentics 渠道提交和取回视频。 |
| 视频生成 | `runninghub-cloud-workflow` | ComfyUI 视频渠道处于 RunningHub 模式时，运行 RunningHub 云端工作流。 |
| 音频转文字 | `audio-transcription` | 在你的电脑上用 faster-whisper 把语音转成带时间戳的文字。 |
| 花字 | `caption-styling` | 花字（风格化字幕）的设计手册。 |
| 发布执行 | `skill-youtube-cdp-draft`，以及 TikTok、Instagram、抖音、小红书和 Bilibili 的草稿技能 | 在你自己的 Chrome 里填好平台的上传草稿，最后的「发布」由你来点。 |

更多技能发布在 [VideoAgents-Skills](https://github.com/AgenticsWorld/VideoAgents-Skills) 仓库里。

## 打开 Agent 的技能 {#open-an-agent-s-skills}

1. 在左侧的 Agent 列表里选一个 Agent。
2. 点对话区顶部的 **技能**。Agent 有技能时，按钮会显示数量，例如 **技能 · 2**。

![视频生成 Agent 对话区顶部的「技能 · 2」按钮](/images/videoagents/extend/skills-button.webp)

对话框列出这个 Agent 的技能。每张卡片显示：

- 技能名称，以及一个表示启用方式的标签：

  | 标签 | 含义 |
  | --- | --- |
  | **条件** | 只在条件满足时使用，条件写在标签旁边（例如「视频渠道为 ComfyUI RunningHub 运行方式」）。 |
  | **常驻** | 在 Agent 自己的指令里针对某类任务点名使用。 |
  | **依赖库** | 供其他技能使用的资源，不单独运行。 |
  | **通用** | 其他所有技能，包括你自己安装的技能。 |

- 你自己安装的技能带 **已上传** 标签，对所有项目关闭的技能带 **已禁用** 标签；
- Agent 使用的路径（右上角）、一行简介，以及 `SKILL.md` 所在的位置；
- **查看文本**，在对话框里显示整份 `SKILL.md`。**返回列表** 回到列表。

![视频生成 Agent 的技能对话框，列出 agentics-media-generation 和 runninghub-cloud-workflow](/images/videoagents/extend/skills-dialog.webp)

## 在某个任务里使用技能 {#use-a-skill-for-one-task}

1. 打开这个 Agent 的 **技能** 对话框，点技能卡片。它的路径会插入输入框：内置技能是 `skills/<name>`，你自己安装的技能是 `SKILL.md` 的完整路径。
2. 把消息写完整，说明要用这个技能做什么，例如 `用 skills/kling4-pe 重写 ep01 里 grp012 的提示词。`
3. 发送。

不管这个技能有没有为项目开启，这样都能用。

## 为项目开启技能 {#turn-skills-on-for-a-project}

装了技能并不代表 Agent 会自动使用它。哪些技能自动使用，是在 **🎛️ → 项目技能** 里按项目设置的：

- 勾选的技能，只要任务符合它的描述和条件，对应的 Agent 就会读取并应用它。Agent 会针对每个技能报告是完成、跳过还是失败，以及原因。同一个对话框里的 **执行记录** 列出这些报告。
- 默认只勾选与项目视频模型相匹配的视频提示词技能。其他技能，包括表演指导，一开始都不勾选。
- 技能的条件仍然要满足：视频渠道不是 RunningHub 时，勾选 `runninghub-cloud-workflow` 不起作用。

对话框的用法见[项目技能](/zh/videoagents/console/project-skills)；提示词技能怎样选定、怎样在分镜签字时冻结，见[视频提示词与提示词技能](/zh/videoagents/create/video-prompts)。

## 安装技能 {#install-a-skill}

::: warning 安装之前先读一遍技能
Agent 会严格照着技能的指令做。安装别人的技能之前，打开 `SKILL.md` 和旁边的所有文件读一遍。
:::

1. 选中这个技能对应的 Agent，打开它的 **技能** 对话框。
2. 点左下角的 **加载技能**。
3. 选择以下两种之一：
   - **一个 zip 文件**，`SKILL.md` 放在根目录或一个文件夹里。技能的文件夹名取内层文件夹的名字；`SKILL.md` 在根目录时，取 zip 的文件名；
   - **单个 `SKILL.md`**（或任意 `.md` 文件）。技能按 frontmatter 里的 `name:` 命名，没有就按文件名命名。文件名正好是 `SKILL.md` 的，必须有 `name:` 这一行。
4. 技能出现在列表里，带 **已上传** 标签。

限制和插件相同：zip 最大 50 MB，解压后最大 200 MB，最多 5,000 个文件。技能名只能包含英文字母、数字、`_` 和 `-`。`__MACOSX` 和 `.DS_Store` 这类 macOS 杂项会被跳过。

如果这个 Agent 已经有同名的内置技能，或者你已经装过同名的技能，就会拒绝安装。先删除旧的。

### 安装的技能存放在哪里 {#where-installed-skills-are-kept}

你安装的技能放在数据文件夹里，而不是应用里，所以更新桌面应用不会丢失它们（v1.0.41 起）：

| 运行 VideoAgents 的方式 | 文件夹 |
| --- | --- |
| macOS 桌面应用 | `~/Library/Application Support/@videoagents/desktop/data/skills/<category>/<agent>/<skill>/` |
| 从源码运行 | `data/skills/<category>/<agent>/<skill>/` |

设置 `VIDEOAGENTS_SKILLS_DIR` 可以放到别处。技能是装给某一个 Agent 的；要给另一个 Agent 同样的技能，在那里再加载一次。

## 删除自己安装的技能 {#delete-a-skill-you-installed}

在卡片上点 **删除**，然后在 4 秒内点 **确认删除**。内置技能不能删除。

如果后来的 VideoAgents 版本自带了一个和你安装的技能同名的内置技能，会使用内置的那个。你的那份仍留在列表里，显示为灰色，标注 **与内置技能同名，未生效**，并带有 **删除** 按钮。

## 几点说明 {#good-to-know}
- 已启用插件的 Agent 也会扫描技能。
- 在 **项目技能** 里勾选了、但已经不再安装的技能（例如随旧版桌面应用一起丢失的技能），会在那里显示为灰色的未安装状态。取消勾选并保存，就能把它从项目里去掉。
- **已禁用** 标签来自一个全局开关，以前由一个旧的设置页设置。那个页面已经没有了；被禁用的技能永远不会自动应用。

## 常见问题 {#troubleshooting}

**加载技能失败，因为这个 Agent 已经有同名的内置技能。**
给技能改个名（文件夹名、zip 文件名或 frontmatter 里的 `name:`），再加载一次。

**加载单个 `SKILL.md` 失败，提示缺少名称。**
文件名是 `SKILL.md`，而 frontmatter 里没有 `name:` 这一行，所以没有东西可以用来给技能命名。加上一行，或者把文件改名为 `<skill-name>.md`。

**桌面应用更新后，我上传的技能不见了。**
v1.0.41 之前，上传的技能存放在应用包里，更新会替换应用包。重新加载它们；现在它们存放在数据文件夹里。

**Agent 不用我的技能。**
在 **🎛️ → 项目技能** 里勾选它，并确保它的描述清楚说明了适用于哪些任务。Agent 根据描述判断技能是否适合某个任务；跳过的原因会显示在 **执行记录** 里。

## 相关文档 {#related}
- [编写技能](/zh/videoagents/extend/write-a-skill)
- [项目技能](/zh/videoagents/console/project-skills)
- [视频提示词与提示词技能](/zh/videoagents/create/video-prompts)
- [安装插件](/zh/videoagents/extend/install-plugins)
