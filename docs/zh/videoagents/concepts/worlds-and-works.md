---
title: 世界与作品
description: VideoAgents 怎样把一个项目分成故事所在的世界和在世界里创作的作品，以及为什么要先构建世界。
tags: [beginner, world-bible, film]
order: 10
---

# 世界与作品

VideoAgents 把每个故事项目分成两层：故事发生的**世界**，以及在这个世界里创作的**作品**。团队先构建世界，再把它当作每一集都要遵守的事实。长篇剧集能前后一致，靠的就是这一点。

## 世界 {#the-world}

世界是从一集到下一集都保持不变的一切：

| 部分 | 包含什么 | 保存在哪里 |
| --- | --- | --- |
| **世界圣经** | 世界观总纲与规则、时间线、地理、宗教、文化、政治、经济、魔法或修炼体系、术语词典 | `bible/` |
| **人物** | 外貌、性格、关系、成长、声音和说话方式、各种场合和时期的服装 | `bible/characters/`、`bible/costumes.json` |
| **生物、场景和道具** | 生物和坐骑设定卡、场景与环境设定、带材质和尺寸的道具卡 | `bible/creatures/`、`bible/scenes/`、`bible/props.json` |
| **美术风格** | 画面风格、色彩剧本和画幅 | `bible/style.json`、`bible/color_script.json` |
| **资产** | 概念图和设定图、声音样本、音乐库 | `assets/` |

每项资产只有一个锚点，供整部剧使用：同一个人物用同一张设定图，同一件道具用同一张设定卡，同一个声音。之后生成的每张图、每段视频都和这些锚点绑定。

![alices 项目的世界观预览：左侧列出世界圣经文件，右侧是世界观总纲](/images/videoagents/concepts/worlds-and-works-world-bible.webp)

### 唯一的事实来源 {#one-source-of-truth}

世界圣经是设定的唯一事实来源。只有一个 Agent 能写入它，就是 **记忆圣经管理者**。其他 Agent 发现和世界圣经有冲突时，会上报，而不是自己改世界圣经。改动记录在 `bible/changelog.md` 里。

如果小说对制作需要的某个细节只字未提，例如一件外套的颜色或一个房间的大小，设计类 Agent 会自己决定，和世界圣经的其余部分以及美术风格保持一致，并标明这是它们自己的决定。你签字之后，这些决定就成为世界的一部分。小说刻意保密的细节在故事里仍然保密，但依然会有一个能画出来的样子。

### 世界先经你批准才会使用 {#you-approve-the-world-before-it-is-used}

世界在[工作流](/zh/videoagents/concepts/workflow)的前几个阶段构建，并由三个[签字点](/zh/videoagents/concepts/sign-off-gates)锁定：世界圣经（H1）、角色与资产（H1A）和美术风格（H2）。签字之后再要改，就得走变更流程：受影响的下游步骤会被标记为需要重做，依赖旧版本的签字也必须重新签。

构成世界的各个部分，在[构建世界](/zh/videoagents/world/)里各有一篇指南。

## 作品 {#the-works}

作品是用这个世界做出来的东西。对影视项目来说，作品就是剧集的每一集：

1. 拆集规划把小说分成若干集。
2. 每一集，团队都要写剧本、规划故事板和镜头、搭建 3D 白模（可选）、写视频提示词、生成视频和声音、剪辑、后期精修、审核，最后发布。
3. 每个镜头都复用世界里的锚点：它必须匹配的人物设定图、场景背景图和道具卡。

默认一次做一集，从第 1 集开始。第 1 集还多两个签字点：剧本（H3）和成片（H4），所以它相当于试播集：风格或质量上的问题，在扩散到整季之前就能发现。如果打开 **多集并行**，后面的几集要等第 1 集通过 H4 之后才会并行制作。

制作剧集的步骤见[在世界中创作](/zh/videoagents/create/)。

## 同一个世界的其他作品 {#other-works-from-the-same-world}

因为世界是以文件形式保存的，其他类型的作品也能用它。插件会为它们添加专门的团队：

- **衍生小说**：在同一个世界里写新小说，例如前传、外传或「如果」版本。它会读世界圣经，但从不修改；新设定放在它自己的目录里，等你批准。
- **融合小说**：把两本书融合成一个新故事，取一本的情节和人物、另一本的世界，并把结果写进世界圣经，让常用的预览页都能显示。
- **有声剧**：同样以插件形式提供。

见[衍生小说](/zh/videoagents/project-types/derivative-fiction)、[融合小说](/zh/videoagents/project-types/fusion-fiction)和[有声剧](/zh/videoagents/project-types/audio-drama)。

## 不构建完整世界的项目类型 {#project-types-that-don-t-build-a-full-world}

音频配画、数字人、混剪和动效短片项目走各自更短的工作流，专为它们的输入（一段录音、照片、素材库或一个主题）设计。它们会跳过小说转视频流水线中用不到的部分。见[选择项目类型](/zh/videoagents/project-types/choose-a-project-type)。

## 相关文档 {#related}
- [项目与项目目录](/zh/videoagents/concepts/projects)
- [工作流](/zh/videoagents/concepts/workflow)
- [世界圣经](/zh/videoagents/world/world-bible)
- [角色](/zh/videoagents/world/characters)
