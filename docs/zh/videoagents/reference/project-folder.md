---
title: 项目目录
description: 项目目录里每类输入、设定文件、图片、视频和运行记录放在哪里，以及 VideoAgents 把哪些内容存在项目目录之外。
tags: [reference, beginner]
order: 10
---

# 项目目录

每个项目就是一个装着普通文件的目录。世界圣经、剧本，以及 Agent 团队做出的每张分镜表、每张图、每段视频和每份审核报告，都是你能打开、复制或备份的文件。本页以示例项目 *alices* 为例，逐个介绍这些目录。

## 找到项目目录 {#find-the-folder}

点控制台顶栏的文件夹图标（**在 Finder 中打开当前项目目录**），就会在运行 VideoAgents 的电脑上打开当前项目的目录。

项目都放在 VideoAgents 数据目录下的 `projects/` 目录里：

| 运行方式 | 项目所在目录 |
| --- | --- |
| macOS 桌面应用 | `~/Library/Application Support/@videoagents/desktop/data/projects/` |
| 从源码运行 | 仓库里的 `data/projects/` |

每个项目的目录名就是项目名，例如 `projects/alices/`。整个数据目录可以用 `VIDEOAGENTS_DATA_DIR` 换到别处（见[配置](/zh/videoagents/reference/configuration)）。

::: tip 提示
随便看、随便复制都没问题。只有清楚某个文件会被谁读取时，才手动修改它：Agent 和机检都按它们写入时的格式读取文件。要改内容，通常走预览页更稳妥（**✏️ 修改** 会把修改交给修改师）。
:::

## 顶层 {#top-level}

```text
alices/
├── brief.md          创作定调：内容定位、画面风格、叙事节奏
├── settings.json     项目设置和项目类型
├── novel/            原著文本
├── refs/             你的参考文件
├── story/            故事分析和每集剧本
├── bible/            世界圣经
├── directing/        每集的故事板、分镜表和白模方案
├── assets/           提示词、图片、视频、音频
├── edit/             每集的剪辑、字幕和成片
├── qa/               审核报告和缺陷单
├── publish/          各平台的发布包
├── code/             Agent 为本项目写的脚本
└── runs/             工作流和每个任务的记录
```

| 文件或目录 | 内容 | 在哪里设置或查看 |
| --- | --- | --- |
| `brief.md` | 内容定位、画面风格和叙事节奏 | [创作定调](/zh/videoagents/console/creative-brief)、[视频节奏](/zh/videoagents/console/video-pacing) |
| `settings.json` | 输出、每集时长和镜头时长、模型限制、审核力度、包装、转场、提示词技能和项目技能。项目类型和编号在创建项目时就已确定。 | **🎛️** 菜单：[输出设置](/zh/videoagents/console/output-settings)、[模型限制](/zh/videoagents/console/model-limits)、[审核设置](/zh/videoagents/console/review-settings)、[项目技能](/zh/videoagents/console/project-skills) |
| `novel/` | 你导入的小说或剧本，按章节拆分 | [导入和阅读小说](/zh/videoagents/world/novel) |

## refs/：你的参考文件 {#refs-your-reference-files}

你在 **参考文件** 页上传的内容会放到这里，每个分区一个目录。Agent 自己设计之前，会先查看这些文件。

| 目录 | 存放内容 |
| --- | --- |
| `style/` | 整体视觉：风格、渲染、色彩、构图 |
| `characters/`、`creatures/`、`props/`、`scenes/` | 人物、生物和坐骑、道具和服装、场所的外观参考 |
| `models3d/` | GLB 格式的 3D 模型，上传的或由参考图生成的 |
| `music/` | 你希望用到的音乐 |
| `video/` | 示例视频，参考动作、运镜、节奏、转场 |
| `thumbnail/` | 封面示例 |
| `fonts/` | 你的字体（TTF、OTF、TTC），花字、封面、标题和字幕优先使用 |
| `text/` | 文字资料：设定、文案、剧本 |
| `other/` | 其他文件（PDF、表格、工程文件），注释或工单指向它们时才会用到 |
| `NOTES.md`、`annotations.json` | 你在参考文件页给每个文件写的注释 |
| `CREDITS.md` | 从图库搜索导入的图片的来源、作者和许可证 |

有些项目类型会在这里加目录，例如音频配画项目放旁白的 `refs/audio/`。见[参考文件](/zh/videoagents/world/reference-files)。

## story/：故事 {#story-the-story}

| 路径 | 内容 |
| --- | --- |
| `chapter_manifest.json`、`structured_story.json`、`structured_story/chNNN.json` | 解析成结构化章节的小说 |
| `events.json`、`story_graph.json`、`story_timeline.json` | 事件、关系和时间线 |
| `episode_plan.json` | 故事怎样分集 |
| `episodes/ep01/screenplay.md` | 这一集的剧本；有对白和旁白时还有 `dialogue.md` 和 `narration.md` |
| `episodes/ep01/script_breakdown.json` | 场次、人物、台词、节奏和钩子：**剧本预览** 背后的数据 |
| `episodes/ep01/hooks.json`、`pacing.json` | 钩子和节奏说明 |

## bible/：世界圣经 {#bible-the-world-bible}

| 路径 | 内容 |
| --- | --- |
| `world.json`、`timeline.json`、`geography.json`、`politics.json`、`economy.json`、`culture.json`、`religion.json`、`cultivation.json`、`dictionary.json` | 世界设定，每个主题一个文件 |
| `characters/index.json`、`characters/<CHAR-id>/` | 角色清单，以及每个角色的文件（外貌、性格、声音等） |
| `creatures/`、`scenes/` | 生物和坐骑；场所，每个 `scenes/<SCN-id>/` 里有环境、建筑、光照和 3D 白模（`whitebox.json`） |
| `style.json`、`color_script.json` | 美术风格和色彩脚本 |
| `props.json`、`costumes.json` | 道具和服装 |
| `changelog.md` | 世界圣经的每一次改动 |

见[世界圣经](/zh/videoagents/world/world-bible)。

## directing/：每集的导演方案 {#directing-per-episode-directing}

`directing/ep01/` 里有：

| 路径 | 内容 |
| --- | --- |
| `directing_plan.md` | 导演对这一集的方案 |
| `storyboard.json` | 故事板草稿（在 **故事板** 页显示） |
| `shot_list.json` | 最终的镜头和它们的生成组 |
| `continuity_plan.json` | 镜头之间、组之间的连贯性 |
| `shots/sh001/` | 每个镜头的 `camera.json`、`composition.json` 和 `blocking.json` |
| `whitebox/` | 3D 白模方案、决定，以及导演台的覆盖修改 |
| `shot_plates.json` | 每个镜头用哪张分镜背景图 |

## assets/：图片、视频和声音 {#assets-images-clips-and-sound}

| 路径 | 内容 |
| --- | --- |
| `concepts/characters/<CHAR-id>/` | 角色设定图（`sheet.png`）、服装设定图和用到的提示词 |
| `concepts/scenes/<SCN-id>/` | 俯视图（`layout_top.png`）、全景图、背景图 |
| `concepts/creatures/`、`concepts/props/` | 生物和道具的图片 |
| `storyboard/ep01/` | 故事板草图和动态样片（`animatic.mp4`） |
| `prompts/ep01/` | 每个镜头的图片提示词（`shNNN.json`）和每个组的视频提示词（`grpNNN.json`） |
| `keyframes/ep01/` | 每个组的参考图包 |
| `clips/ep01/` | 组视频：`grp001.mp4`、它的 `.meta.json`（模型、服务商、参考素材）和尾帧 |
| `whitebox/ep01/<grp>/` | 导出的白模摄影机视频（`camera.mp4`） |
| `sketches/` | 你在手机上画的草图 |
| `canvas/` | 画板页产生的图片版本，只有你把某一版设为定稿后才会被使用 |
| `audio/voice/`、`narration/`、`bgm/`、`sfx/`、`ambience/` | 配音（`voice/casting.json` 是角色的选角表）、旁白、音乐、音效、环境声 |
| `audio/library/music/` | 项目的音乐库 |
| `group_settings/` | 按集、按组覆盖的模型设置 |

## edit/、qa/、publish/ {#edit-qa-publish}

| 路径 | 内容 |
| --- | --- |
| `edit/ep01/` | `timeline.json`、`cut_v1.mp4`、`subtitles.srt`（按剪辑版对时）、`subtitles_final.srt`（按成片对时）、`captions.json`、`intro_outro/`、`thumbnail.png` 和 `final.mp4` |
| `qa/reports/` | 审核报告 |
| `qa/defects/` | 缺陷单，也会列在 **缺陷单** 页 |
| `publish/<platform>/package/<ep>/` | 每个平台、每一集的发布包，旁边是 `seo.json`、`metadata.json` 和 `receipts/` |

## code/ 和 runs/ {#code-and-runs}

| 路径 | 内容 |
| --- | --- |
| `code/` | Agent 为本项目写的一次性脚本（批处理、检查） |
| `runs/dag.json` | 项目的工作流和每一步的状态（在 **工作流预览** 显示） |
| `runs/<task-id>/` | 每个任务的记录：`result.json`（Agent 的回执）、`eval.json`（评分）和 `meta.json` |
| `runs/revisions/` | 修改师做的修改 |

见[文件、运行记录与版本](/zh/videoagents/concepts/files-and-runs)。

## 项目类型和插件的专用目录 {#extra-folders-for-project-types-and-plugins}

有些项目类型和插件把工作文件放在自己的目录里：

| 目录 | 使用者 |
| --- | --- |
| `av/` | 音频配画 |
| `mashup/` | 混剪 |
| `digital-human/` | 数字人 |
| `codevideo/` | 动效短片 |
| `derivative/` | `derivative-fiction` 插件（章节、大纲、存放新设定的 `bible-delta/`） |
| `fusion/` | `fusion-fiction` 插件 |

## 不在项目目录里的内容 {#what-is-not-in-the-project-folder}

| 内容 | 位置 |
| --- | --- |
| 与 Agent 的对话 | 数据目录下的 `.videoagents/chats/<project>/` |
| 运行历史、确认和事件日志 | `.videoagents/runtime.sqlite3` |
| 全局设置和服务商 Key | `.videoagents/genconfig.json`、`.videoagents/state.json` 及同目录下的其他文件 |
| 你安装的插件和技能 | 数据目录下的 `plugins/` 和 `skills/` |
| Agent 启动前自动拍的快照 | 在数据目录之外；见[命令行](/zh/videoagents/reference/command-line#restore-a-project-snapshot) |

所以，把项目目录打成 zip，在别处用 **› 导入项目…** 导入，会带上项目的全部文件，但不会带上对话记录，也不会带上你的 Key。见[切换、导入和导出项目](/zh/videoagents/console/projects)。

## 几点说明 {#good-to-know}
- 项目里的目录名和文件名只用 ASCII 字母、数字、`-` 和 `_`。`CHAR-alice`、`SCN-courtroom`、`ep01`、`grp001`、`sh001` 这类编号随处可见。
- Agent 可以删除项目里的文件和目录。VideoAgents 不允许它们删除整个项目目录或数据目录，并且在 Agent 启动前给项目拍快照（v1.0.43 起）。见[安全与局域网访问](/zh/videoagents/reference/security#agent-permissions-and-safeguards)。

## 相关文档 {#related}
- [项目与项目目录](/zh/videoagents/concepts/projects)
- [文件、运行记录与版本](/zh/videoagents/concepts/files-and-runs)
- [配置](/zh/videoagents/reference/configuration)
- [切换、导入和导出项目](/zh/videoagents/console/projects)
