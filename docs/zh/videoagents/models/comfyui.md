---
title: ComfyUI
description: 用你自己的 ComfyUI 工作流生成图像、视频、音乐、嗓音、数字人和超分，运行在本地 ComfyUI、Comfy Cloud 或 RunningHub 上。
tags: [comfyui, providers, advanced, how-to]
order: 80
---

# ComfyUI

如果你想自己决定具体用哪个模型、哪些节点和参数，或者想在自己的 GPU 上跑开源模型，就用 ComfyUI。凡是有 **ComfyUI** 标签页的生成卡片，都能运行 ComfyUI 工作流，工作流可以在三个地方运行：你自己的 ComfyUI、Comfy Cloud 或 RunningHub。

## 哪些卡片支持 ComfyUI {#where-comfyui-is-available}

**⚙️ → 生成模型** 里的这些卡片有 **ComfyUI** 标签页。每张卡片的连接和工作流各自独立。

| 卡片 | 工作流 |
| --- | --- |
| **🖼 图像模型** | **文生图API** 和 **图生图API**（附了参考图时用后者） |
| **🎬 视频模型** | **工作流 API** |
| **🎵 音乐模型** | **工作流 API** |
| **🎙 TTS语音模型** | **Voice Clone API**，音色设计模式下还有 **Voice Design API** |
| **🧑 数字人** | **InfiniteTalk 工作流** |
| **🔍 超分** | **超分工作流 API** |

使用方法：先设置好 ComfyUI 标签页，再在这张卡片的 **生效渠道** 里选 **ComfyUI**。

## 运行方式 {#run-modes}

在 **运行方式** 里选一种：

| 运行方式 | 工作流在哪里运行 | 需要填写 |
| --- | --- | --- |
| **本地** | 你自己的 ComfyUI 服务 | **服务地址**（默认 `http://127.0.0.1:8188`） |
| **云端(Comfy Cloud)** | [Comfy Cloud](https://cloud.comfy.org/) | 在 [platform.comfy.org](https://platform.comfy.org) 获取的 **API Key** |
| **RunningHub 国内(.cn)** / **RunningHub 国际(.ai)** | 你的 RunningHub 工作区 | 该站点的 **API Key**，以及你添加的工作流 |

### 本地 {#local}

![视频模型卡片的 ComfyUI 标签页，运行方式为本地](/images/videoagents/models/comfyui-local.webp)

1. 启动 ComfyUI。如果要从另一台电脑访问，启动时加上 `--listen`。
2. 填入 **服务地址**。
3. 点 **测试连接**。它会显示 ComfyUI 版本，并把服务器上的 checkpoint 填进 **Checkpoint** 菜单。
4. 除非工作流要从 VideoAgents 接收 checkpoint，否则 **Checkpoint** 保持 **(默认/由工作流决定)**。
5. 在 **工作流 API** 里选一个工作流。菜单列出 `comfy/` 文件夹里 API 格式的工作流，文件名以这张卡片的前缀开头（`image-`、`video-`、`music-`、`tts-`、`digitalhuman-`、`scale-`）。点 📖 可以阅读模板说明：要装什么、要下载哪些模型文件，以及它的参数设置。**自定义…** 可以填你自己工作流的路径，例如 `comfy/my.json`。

### Comfy Cloud {#comfy-cloud}

工作流在 Comfy Cloud 上运行，不需要 GPU。API Key 需要 Comfy Cloud 订阅，并和网页版共用每月额度；免费套餐不能用 API。工作流菜单和本地方式相同。需要自定义节点的工作流（例如 ACE-Step、IndexTTS-2 或 MiniMax-H3）在那里可能无法运行，用 **测试连接** 确认。

### RunningHub {#runninghub}

![图像模型卡片的 ComfyUI 标签页，运行方式为 RunningHub，工作流 ID 已模糊处理](/images/videoagents/models/comfyui-runninghub.webp)

工作流在你的 RunningHub 工作区里运行，按运行时长以 RH 币逐秒计费。这种方式不使用本地服务地址和 `comfy/` 里的文件。

1. 在你所用站点的 RunningHub API 服务页面获取 API Key。国内站和国际站的账号和 Key 互不通用，各自分开保存。
2. 在你的 RunningHub 工作区里，把工作流成功运行一次。和本地工作流一样，要把占位符（见下文）写进节点的输入里。
3. 把工作流 ID 或页面网址粘贴到 **添加工作流**，可以加一个备注名，然后点 **验证并添加**。状态行会显示节点数量和找到的占位符。没有占位符的工作流，VideoAgents 能识别出输入的地方会自动绑定。
4. 在云端工作流菜单里选择刚添加的工作流（图像卡片是 **云端文生图工作流** 和 **云端图生图工作流**）。**移除** 会把它从列表中删掉。
5. 选择 **运行模式**（机器规格）：Standard（24 GB 显存）、Plus（48 GB）或 Ultra（更高）。规格越高，每秒单价越高；以 RunningHub 的计费说明为准。

**测试连接** 会检查 Key，并显示你的 RH 币余额和正在运行的任务。每次保存设置时，VideoAgents 都会刷新它保存的 RunningHub 工作流副本；如果刷新失败，页面会提示，生成时继续使用旧副本。

## 在自己的工作流里使用占位符 {#placeholders-in-your-own-workflows}

::: v-pre
VideoAgents 会在 API 格式的工作流里填充这些文本占位符：

| 类型 | 占位符 |
| --- | --- |
| 文本 | `{{PROMPT}}`、`{{NEGATIVE}}`、`{{CHECKPOINT}}`、`{{FIRST_FRAME}}`、`{{LAST_FRAME}}`、`{{TEXT}}`、`{{LYRICS}}`、`{{VOICE}}`、`{{REF_AUDIO}}` |
| 数字 | `{{WIDTH}}`、`{{HEIGHT}}`、`{{SEED}}`、`{{DURATION}}`（秒）、`{{FRAMES}}`、`{{SPEED}}` |
| 数字人 | `{{IMAGE}}`、`{{AUDIO}}`、`{{PROMPT}}`、`{{SEED}}`、`{{FRAMES}}` |

音频结果必须用 `SaveAudio` 或 `SaveAudioMP3` 节点保存。嗓音工作流中，`{{TEXT}}` 是要说的台词，`{{REF_AUDIO}}` 是上传到 ComfyUI 的参考音频；音乐工作流会填充 `{{LYRICS}}` 和 `{{DURATION}}`。图像工作流能接受几张参考图，按其中的 `LoadImage` 节点数量读取。
:::

## 附带的模板 {#bundled-templates}

| 卡片 | `comfy/` 里的模板 |
| --- | --- |
| 图像 | FLUX.2 dev、Krea 2 Turbo、MiniMax-H3-Image（v1.0.45 之后新增）、NoctQ v4、Qwen-Image 2.1（bf16 和 GGUF）、Z-Image Turbo（以上各有 `-t2i` 和 `-i2i` 两版），Ideogram 4（文生图），Qwen-Image-Edit 2511（图生图） |
| 视频 | MiniMax H3（Ref2VA、首尾帧 360° 环绕）、FastH3、LTX 2.5、Sulphur、Wan 2.1（文生视频和 Fun Camera） |
| 音乐 | ACE-Step v1（推荐）、MiniMax Music 3 |
| 嗓音 | IndexTTS-2（推荐）、Qwen3-TTS Voice Clone 和 Voice Design |
| 数字人 | InfiniteTalk、InfiniteTalk fp8 + lightx2v |
| 超分 | SeedVR2 |

点模板旁的 📖 查看安装步骤和模型下载。商用前请确认每个模型的许可协议。

## 几点说明 {#good-to-know}
- 在 [NSFW 模式](/zh/videoagents/models/nsfw-mode)里，把 ComfyUI 选为备用图像或视频服务商时，第二个菜单选的是运行方式。
- 预览页的 **🎨 图像模型** 菜单里，ComfyUI 对应的第二个菜单也是运行方式。

## 常见问题 {#troubleshooting}

**本地方式下测试连接失败。**
检查 ComfyUI 是否在运行，服务地址和端口是否正确。从另一台电脑访问时，ComfyUI 必须以 `--listen` 启动。

**任务因缺少节点或模型文件而失败。**
点开这个模板的 📖，安装列出的自定义节点和模型文件。

**验证并添加时 RunningHub 工作流被拒。**
确认运行方式和工作流所属的站点一致，并且这个工作流已经在你的工作区里成功运行过。

## 相关文档 {#related}
- [图像模型](/zh/videoagents/models/image-models)
- [视频模型](/zh/videoagents/models/video-models)
- [语音模型](/zh/videoagents/models/voice-models)
- [数字人模型](/zh/videoagents/models/digital-human-models)
- [超分](/zh/videoagents/models/upscale)
