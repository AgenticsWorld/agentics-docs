---
title: 图像与视频生成
description: 每个生成组怎样变成一段视频，随它发送哪些参考素材，草稿怎样检查、签字和超分，以及怎样重做一个组。
tags: [video-generation, image-generation, sign-off, cost, how-to]
order: 70
---

# 图像与视频生成

你给一集的视频提示词签字后，VideoAgents 按组生成这一集：收集参考图，用视频模型为每个生成组做一段多镜头视频，检查它，之后再把通过的视频超分到成片分辨率。本页逐步说明每个环节，以及你能控制什么。

## 开始之前 {#before-you-start}
- 在 **⚙️ → 生成模型** 里配好了视频渠道和模型。见[视频模型](/zh/videoagents/models/video-models)和[图像模型](/zh/videoagents/models/image-models)。
- 这一集的视频提示词已经签字。见[视频提示词与提示词技能](/zh/videoagents/create/video-prompts)。

::: warning 注意
每段组视频都是一次向视频渠道付费的调用，每次重新生成也是。分辨率越高越贵。请先查看渠道的价格，并参阅[成本控制](/zh/videoagents/models/cost-control)。
:::

## 每个组经历什么 {#what-happens-for-each-group}

| 步骤 | Agent | 结果 |
| --- | --- | --- |
| 1. 锚点包 | **图像生成** | 这一组的参考图。优先复用已有的概念图（人物设定图、服装设定图、场景、道具、生物），只为真正缺的部分新出图 |
| 2. 一致性检查 | **角色一致性** | 把新出的人物图和人物设定图比对（先比脸部相似度和性别）。复用的概念图不用检查 |
| 3. 组视频 | **视频生成** | 每组调用一次：提示词加上参考图、参考视频和声音样本。声音（对白、音效、环境声）和画面一起生成 |
| 4. 修复（仅在需要时） | **口型同步**、**动作修复** | 修复具体缺陷，例如音画错位或动作崩坏 |
| 5. 超分 | **超分** | 通过的视频，放大到成片分辨率 |

开启 **后期配音** 后，会多一步：用合成语音替换每段视频里的对白。见[对白、配音与旁白](/zh/videoagents/create/dialogue)。

文件保存在项目文件夹里：

| 路径 | 内容 |
| --- | --- |
| `assets/keyframes/<ep>/<group>/` | 新生成的锚点图，以及记录每张锚点图来源的 `meta.json` |
| `assets/clips/<ep>/<group>.mp4` | 组视频 |
| `assets/clips/<ep>/<group>.meta.json` | 生成参数和检测到的切点 |
| `assets/clips/<ep>/<group>.last_frame.png` | 视频的最后一帧，用于预览、转场和长镜头 |

组视频也会显示在 **🎦 分镜预览** 页的 **🎬 组视频** 下；如果绑定了飞书，新视频会推送到飞书。见[手机消息](/zh/videoagents/console/mobile-messages)。

## 生成顺序 {#generation-order}

**长镜头** 关闭时（默认），每个组各自独立，可以并行生成。**长镜头** 开启时，同一场里的组要接着上一组的最后一帧或结尾往下做，所以按顺序生成。见[长镜头与连贯性](/zh/videoagents/create/long-takes)。

## 参考图 {#reference-images}

一个组收到的参考图列在组卡的 **🖼 参考图** 下，顺序就是提示词引用它们的顺序（`[Image 1]`、`[Image 2]`…）。要加你自己的图：

1. 点组卡上的 **🖼 图片**。
2. 选一个分类：**👤 人物**、**🏔 场景**、**🗡 道具**、**🐎 生物** 或 **🖊 草图**（故事板镜头草图）。**🎨 手绘参考图** 让你在手机上画，**⬆ 本地上传** 从电脑选文件。
3. 点一张图（双击放大），再点 **➕ 加入参考图**。

![grp002 的「添加参考图」对话框：顶部是当前的七张参考图，下面是分类按钮、人物列表和两张人物设定图，其中一张已在参考图里](/images/videoagents/create/image-and-video-generation-references.webp)

标题里的计数（例如 **参考图 7/30**）显示这个组的模型最多接受多少张参考图。你加的图在组卡上带一个 🗑 按钮；流水线加的图只能通过 **✏️ 修改** 来改。改动在这个组下次生成时生效。

在手机上画草图，见[在手机上画草图](/zh/videoagents/create/sketch-on-your-phone)。

## 参考视频 {#reference-videos}

点 **🎬 视频** 查看这个组的参考视频，编号 `[Video N]` 和提示词里一致。开启白模时，流水线会加入这个组的 3D 运镜视频，让模型按它的构图和走位来拍；长镜头使用尾段视频时，上一组的最后几秒也会加进来。

![grp002 的「参考视频」对话框：一段 17 秒的白模运镜视频，总时长和数量已按 Seedance 2.5 的上限核对](/images/videoagents/create/image-and-video-generation-reference-videos.webp)

- 对话框会合计总时长和数量，并和这个组的模型上限比较。
- **⬆ 本地上传** 可以加入一个不超过 45 MB 的 mp4、mov 或 webm 文件。你上传的视频需要一句对应的 `[Video N]` 说明，这句在重新生成提示词时写入。
- **🎛 模型** 打开这个组的模型设置，需要换一个接受更多视频的模型时用它。

使用火山引擎时，参考视频必须能通过链接访问，所以会先上传到你的对象存储。在 **⚙️ → 存储与图库** 里设置。见[对象存储与图库](/zh/videoagents/models/object-storage)。

::: tip 提示
如果渠道拒收含有真实人脸的参考图，把这些人物加入虚拟人像资产库（**⚙️ → 高级 → 虚拟人像资产库**）。见[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。
:::

## 草稿分辨率与成片分辨率 {#draft-and-final-resolution}

组视频按 **🎛️ → 输出设置** 里的 **草稿分辨率** 生成。你审阅和签字的都是草稿。**成片分辨率** 靠把通过的视频超分得到，而不是用更高分辨率重新生成：重新生成更贵，画面也会变。

超分方式在 **⚙️ → 生成模型 → 超分** 里选：用 ffmpeg 普通插值放大（默认），或 AI 方式，例如火山引擎上的 Seedance 2.5 草稿模式、MiniMax Regenerate-2K、ComfyUI SeedVR2 工作流或 Agentics。两个分辨率相同时，草稿就是成片，不做超分。见[超分](/zh/videoagents/models/upscale)。

**🎞️ 成片发布** 页列出每段组视频及其超分方式：**未超分**、**插值放大** 或 **AI 超分**。

## 检查与重跑 {#checks-and-retries}

每段视频都会自动检查（时长是否与组一致、音轨、切点等），画面审核会查找变形、闪烁、脸部和道具漂移。

Agent 自动重做失败工作的次数，由 **⚙️ → 高级 → Agent 高级设置** 里的 **重跑次数** 决定，也可以用 `/retry` 聊天命令修改。默认是 0：第一次失败就交给你，不会重新生成。见[Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)。

少了一只袖子、道具不对这类小错，会在现有视频上修改（视频到视频），而不是重新生成整组。这样更省钱，也保住了已经通过的表演和运镜。

## 视觉签字 {#visual-sign-off}

一集的每个组都有通过检查的视频后，总制片会发起「视觉生成确认」签字（H3B）。在 **🎚️ 后期处理** 页审阅这些视频，然后在控制台答复签字卡片。签字之后才开始剪辑。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

## 重做一个组 {#redo-a-group}

- 点组视频下方（或组头上）的 **✏️ 修改**，描述哪里不对。修改师会接手这个组的提示词和视频工作：按需调整提示词或参考素材，并重新生成视频。
- 或者在控制台对话框里告诉总制片，写明集和组。

在后期处理页，组视频是母版（**v0**），在那里做的剪切、修复和调色都会成为新版本，供你比较和采纳。见[后期处理](/zh/videoagents/create/post-production)。

## 相关文档 {#related}
- [分镜预览](/zh/videoagents/create/storyboard-preview)
- [视频提示词与提示词技能](/zh/videoagents/create/video-prompts)
- [长镜头与连贯性](/zh/videoagents/create/long-takes)
- [视频模型](/zh/videoagents/models/video-models)
- [超分](/zh/videoagents/models/upscale)
