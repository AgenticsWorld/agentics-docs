---
title: 术语表
description: 控制台和文档里常见术语的简短解释，从动态样片到世界模型，每条都链接到详细介绍它的指南。
tags: [reference, beginner]
order: 50
---

# 术语表

控制台和本文档里会遇到的术语，按中文术语的拼音排序，括号里是对应的英文名称。界面名称按中文界面的写法。

## A–C {#a–c}

| 术语 | 含义 |
| --- | --- |
| **Agent** | AI 团队里负责一项工作的成员，例如剧本改编、Prompt 工程师或某个审核 Agent。每个 Agent 都有一份角色说明（`SOUL.md`），并出现在控制台左栏的 Agent 列表里。见 [Agent 团队](/zh/videoagents/concepts/agent-crew)。 |
| **Agent 引擎**（Agent engine） | 运行 Agent 的命令行 AI 工具：内置的 Agentics 引擎、Claude Code、Codex CLI、Kimi Code、Pi、OpenCode、Grok Build 或 Antigravity CLI。在顶栏选择，也可以为单个 Agent 单独指定。见 [Agent 引擎](/zh/videoagents/models/agent-engines)。 |
| **Agentics 引擎**（Agentics engine） | VideoAgents 自带的引擎（内置的 Pi Coding Agent）。它使用你已登录的 Agentics 账号，或你配置的模型端点。见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。 |
| **白模**（Whitebox） | 场景的简易 3D 模型，用替身人形代替角色，在生成视频之前规划摄影机和站位；它的摄影机视频会成为视频生成的参考。在 H3W 签字。见 [3D 白模预演](/zh/videoagents/create/whitebox-previs)。 |
| **背景 NPC**（Background extras） | 加进某个场景各镜头里的无名路人和前景物体，让空间更有纵深。按场次决定。界面里对应的设置叫 **NPC 参与构图**。见[背景 NPC](/zh/videoagents/create/background-extras)。 |
| **背景图**（Plate） | 见 *分镜背景图*。 |
| **参考文件**（Reference files） | 你上传给 Agent 团队参考的图片、音乐、视频、字体和文档，存放在 `refs/`。见[参考文件](/zh/videoagents/world/reference-files)。 |
| **草稿分辨率**（Draft resolution） | 迭代和审看期间生成视频所用的分辨率。成片由通过审核的视频超分得到，不会重新生成。在 **🎛️ → 输出设置** 里设置。见[输出设置](/zh/videoagents/console/output-settings)。 |
| **插件**（Plugin） | 增加一组 Agent 和一套工作流的扩展包，例如 `derivative-fiction`。见[安装插件](/zh/videoagents/extend/install-plugins)。 |
| **场间衔接**（Scene links） | 在剧本里规划好的、一场结尾和下一场开头之间的匹配剪辑与交接。见[场间衔接](/zh/videoagents/create/scene-links)。 |
| **场景**（Scene） | 世界圣经里的一个场所（`SCN-…`），有自己的外观、布局和光照。也指剧本里的一场戏。见[场景与俯视图](/zh/videoagents/world/scenes)。 |
| **长镜头**（Long take） | 接着上一组的尾帧或最后几秒继续拍的镜头，动作不中断、不切镜。见[长镜头与连贯性](/zh/videoagents/create/long-takes)。 |
| **重跑次数**（Retry count） | Agent 可以自行重做失败工作的次数，0–10，默认 0（不自动重跑）。在 **⚙️ → 高级 → Agent 高级设置** 里设置，或用 `/retry` 修改。见[聊天命令](/zh/videoagents/console/chat-commands)。 |
| **创作定调**（Creative Brief） | 项目的内容定位和画面风格，在 **🎛️ → 创作定调** 里设置，保存在 `brief.md`。见[创作定调](/zh/videoagents/console/creative-brief)。 |

## D–L {#d–l}

| 术语 | 含义 |
| --- | --- |
| **DAG** | 用步骤及其依赖关系组成的图来表示的项目工作流，保存在 `runs/dag.json`，在 **工作流预览** 里显示。见[工作流](/zh/videoagents/concepts/workflow)。 |
| **导演台**（Director's Console） | 在某一集的 3D 白模现场工作的页面：按对象、按分镜组写修改意见，并比较不同版本。见[导演台](/zh/videoagents/create/directors-console)。 |
| **动态样片**（Animatic） | 会动的分集故事板：草图按镜头时长排好，配上对白配音。在 **故事板** 页制作，早于任何视频生成。见[动态样片](/zh/videoagents/create/animatic)。 |
| **分镜背景图**（Background plate） | 用 3D 白模的摄影机拍出的某个镜头的空场景图，生成组视频时作为场景参考。见[分镜背景图](/zh/videoagents/create/background-plates)。 |
| **分镜表**（Shot list） | 一集最终的镜头和生成组清单，保存在 `directing/<ep>/shot_list.json`。 |
| **分镜预览**（Storyboard Preview） | 显示每个生成组的提示词、参考素材和视频的页面。见[分镜预览](/zh/videoagents/create/storyboard-preview)。 |
| **俯视图**（Top-down layout） | 从上往下看的场景平面图，用来保持位置和方向一致。见[场景与俯视图](/zh/videoagents/world/scenes)。 |
| **服务商**（Provider） | 生成图片、视频、配音、音乐或音效的服务，例如火山引擎、Fal、ElevenLabs。界面里也叫「渠道」。见[配置服务商](/zh/videoagents/getting-started/set-up-providers)。 |
| **工单**（Work order） | Agent 收到的任务：编号、负责的 Agent、指令、输入、预期产出和验收标准。见[文件、运行记录与版本](/zh/videoagents/concepts/files-and-runs)。 |
| **故事板**（Storyboard） | 按场次、按镜头排列、带铅笔草图的表格，在详细规划镜头之前由你签字（H3S）。见[故事板](/zh/videoagents/create/storyboard)。 |
| **H1、H2、H3A……** | [签字点](/zh/videoagents/concepts/sign-off-gates)的名称，从 H1（世界圣经确认）到 H5（发布签字）。 |
| **画板**（Canvas） | 修改单张图片的页面：圈出要改的地方，写明怎么改，保留每个版本，并把其中一版设为定稿。见[画板：修改图片](/zh/videoagents/world/image-canvas)。 |
| **花字**（Fancy Text） | 由花字 Agent 设计的风格化屏幕文字（标题、人名条、关键词），烧录进单独的一版视频（**花字版**）。见[剪辑、字幕与包装](/zh/videoagents/create/editing)。 |
| **集**（Episode） | 作品的一集，编号为 `ep01`、`ep02`……大多数制作步骤按集进行。 |
| **技能**（Skill） | 教某个 Agent 一门手艺的 `SKILL.md` 包。见[安装和使用技能](/zh/videoagents/extend/skills)。 |
| **镜头**（Shot） | 一个摄影机镜头（`sh001`……），有自己的机位、构图和走位。镜头会被分到各个生成组里。 |

## M–R {#m–r}

| 术语 | 含义 |
| --- | --- |
| **模型限制**（Model Limits） | 按项目设置的上限：一个生成组的时长，以及它的参考图、参考视频和参考音频数量，要和视频模型的能力匹配。见[模型限制](/zh/videoagents/console/model-limits)。 |
| **NSFW 模式**（NSFW mode） | 为主服务商拒绝的内容准备的备用语言、图像和视频模型。标记过的工作改走备用模型；因内容被拒的请求会在备用模型上重提一次。在 **⚙️ → 高级 → NSFW 模式** 里设置。见 [NSFW 模式](/zh/videoagents/models/nsfw-mode)。 |
| **签字点**（Sign-off gate） | 工作流停下来等你批准的节点，例如第 1 集剧本（H3）或分镜表（H3A）。见[签字点](/zh/videoagents/concepts/sign-off-gates)。 |
| **全景图**（Panorama） | 从场景中某一点拍的 360° 图像，用来生成前后一致的背景。见 [360° 全景图](/zh/videoagents/world/panoramas)。 |
| **全自动模式**（Full-auto mode） | **工作流预览** 上按项目设置的复选框，自动在签字点签字，项目不必停下来等你。签字点的检查仍然照常进行。见[签字点](/zh/videoagents/concepts/sign-off-gates)。 |
| **缺陷单**（Defect） | 审核发现的问题，以工单形式存放在 `qa/defects/`，列在 **缺陷单** 页。见[审核与缺陷单](/zh/videoagents/create/qa-reviews)。 |

## S–Z {#s–z}

| 术语 | 含义 |
| --- | --- |
| **审核模型**（Moderation model） | 判断语言模型的回复是不是拒绝的模型，供 NSFW 模式使用。在 **生成模型** 页的 **🛡 审核模型** 里设置。见 [NSFW 模式](/zh/videoagents/models/nsfw-mode)。 |
| **生成模型**（Generation Models） | **⚙️** 菜单里的页面，用来选择服务商和模型、填写它们的 Key。见[配置服务商](/zh/videoagents/getting-started/set-up-providers)。 |
| **生成组**（Generation group） | 连续几个镜头合在一起、生成为一段视频（`grp001`、`grp002`……）。界面里也写作 **分镜组**，或简称「组」。见[图像与视频生成](/zh/videoagents/create/image-and-video-generation)。 |
| **圣经**（Bible） | 世界圣经的简称。 |
| **世界模型**（World model） | 由场景全景图生成的可探索 3D 世界（World Labs Marble 或 HunyuanWorld），可以从中截取背景图。见[世界模型](/zh/videoagents/world/world-models)。 |
| **世界圣经**（World bible） | 项目的正式设定：世界、历史、场所、角色、生物、道具和风格，存放在 `bible/`。Agent 团队做的一切都以它为准。见[世界圣经](/zh/videoagents/world/world-bible)。 |
| **SOUL.md** | Agent 的角色说明：它的职责、边界、输入、产出和完成标准。 |
| **素材库**（Footage Library） | 把你自己的视频或 YouTube、Bilibili 链接切成带文字稿的镜头片段的页面，供混剪项目和参考使用。见[素材库](/zh/videoagents/project-types/footage-library)。 |
| **提示词技能**（Prompt skill） | Prompt 工程师所用的视频提示词技能，和视频模型配套（例如 Seedance 2.5 用 `sd25-pe`）。在分镜表签字（H3A）时冻结。见[视频提示词与提示词技能](/zh/videoagents/create/video-prompts)。 |
| **项目**（Project） | 一部作品和它所在的世界，存放在一个目录里。见[项目与项目目录](/zh/videoagents/concepts/projects)。 |
| **项目技能**（Project skills） | 本项目里 Agent 自动使用的技能，在 **🎛️ → 项目技能** 里选择。见[项目技能](/zh/videoagents/console/project-skills)。 |
| **项目类型**（Project type） | 项目要做哪类作品：影视剧、音频配画、数字人、混剪或动效短片。创建项目时选择。见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。 |
| **修改师**（Reviser） | 执行你在预览页用 **✏️ 修改** 发出的修改，并记录改了什么的 Agent。见[修改师与修改意见](/zh/videoagents/concepts/reviser)。 |
| **虚拟人像资产库**（Virtual Portrait Library） | 火山方舟存放人物形象图的私域素材库。入库后的图片可以作为人脸参考图使用，否则会被拒收。见[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。 |
| **选角**（Casting） | 每个角色用哪个音色，整个项目统一，保存在 `assets/audio/voice/casting.json`。见[配音](/zh/videoagents/world/voices)。 |
| **运行**（Run） | Agent 处理的一个任务，从排队到完成或出错，显示在运行面板里。见[运行面板](/zh/videoagents/console/run-panel)。 |
| **运行面板**（Run Panel） | 控制台右栏，列出正在运行和最近的任务，带 **⏹ 停止**、**▶ 继续** 和 **🤖** 按钮。见[运行面板](/zh/videoagents/console/run-panel)。 |
| **智能分配**（Smart Assignment） | 语言模型设置之一：按每个 Agent 工作的难度，为它选较强或较轻的模型。见[语言模型与智能分配](/zh/videoagents/models/language-models)。 |
| **执行记录**（Execution records） | 一份清单，列出 Agent 使用了、跳过了或没能用上哪些项目技能，以及原因。在 **🎛️ → 项目技能** 里查看。见[项目技能](/zh/videoagents/console/project-skills)。 |
| **自动运行**（Auto-Run） | 按项目设置的开关（运行面板里的 **🤖**）。项目闲置一段时间、而且还有能做的工作时，VideoAgents 会唤醒总制片继续。见[自动运行](/zh/videoagents/console/auto-run)。 |
| **总制片**（Workflow Orchestrator） | 规划并派发整个团队的工作、检查结果、请你签字的 Agent。要推进项目，就和它对话。见[与 Agent 对话](/zh/videoagents/console/chat-with-agents)。 |

## 相关文档 {#related}
- [VideoAgents 是什么](/zh/videoagents/getting-started/what-is-videoagents)
- [工作流](/zh/videoagents/concepts/workflow)
- [项目目录](/zh/videoagents/reference/project-folder)
- [常见问题](/zh/videoagents/reference/faq)
