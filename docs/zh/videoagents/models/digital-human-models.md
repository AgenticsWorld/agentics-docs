---
title: 数字人模型
description: 为数字人项目选择服务商，把人物图片和对白录音变成人物说话的片段。
tags: [providers, digital-human, how-to]
order: 65
---

# 数字人模型

数字人模型接收一张人物图片和这个人的台词录音，返回这个人在说话的视频片段。数字人项目用它制作主持人和口播类视频。

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 找到 **🧑 数字人** 卡片。
3. 点某个标签页，查看或修改这个服务商的设置，然后在卡片标题栏的 **生效渠道** 里选择要用的服务商。

修改会自动保存。

![数字人卡片，当前打开 HeyGen 标签页](/images/videoagents/models/digital-human-models-card.webp)

## 服务商 {#providers}

| 标签页 | 是什么 | 需要填写 |
| --- | --- | --- |
| **Agentics** | 你的 VideoAgents 桌面端账号上的数字人模型 | 不用填，登录即可。选一个 **模型**，例如 `infiniteTalk-1char`（单人）或 `infiniteTalk-2char`（双人） |
| **HeyGen** | [HeyGen](https://app.heygen.com/settings/api) | **API Key**、**分辨率**（720p 或 1080p）、**画幅**（16:9、9:16 或 1:1） |
| **Kling AI** | Kling AI 的 API | **API Key**、**生成模式**（Standard 或 Professional） |
| **ComfyUI** | 在本地 ComfyUI、Comfy Cloud 或 RunningHub 上运行的 InfiniteTalk 工作流 | **运行方式** 和连接信息、**InfiniteTalk 工作流** |

新安装时，生效渠道默认是 **Agentics**。HeyGen 默认 720p、16:9；Kling AI 默认 Standard。

## 验证服务商 {#verify-the-provider}

- **HeyGen** 和 **Kling AI**：点 **验证 Key**。Key 有效时显示 **✓ Key 有效**，服务商提供额度信息时还会显示剩余额度。
- **ComfyUI**：点 **测试连接**。对本地或 Comfy Cloud 服务器，它会检查 InfiniteTalk（MultiTalk）节点是否已安装、工作流文件是否存在，并显示 **✓ InfiniteTalk 就绪** 或缺少的节点。对 RunningHub，它检查 Key 并显示你的 RH 币余额；上传的素材在生成片段时才检查。

## 各服务商说明 {#provider-notes}

**Kling AI。** 当前版本固定使用中国（北京）接口 `api-beijing.klingai.com`。

::: v-pre
**ComfyUI，本地或 Comfy Cloud。** **InfiniteTalk 工作流** 菜单列出附带的模板：`digitalhuman-infinitetalk-api.json`（默认）和 `digitalhuman-infinitetalk-fp8-lightx2v-api.json`（单人说话，更快的 fp8 版本）。自定义工作流使用占位符 `{{IMAGE}}`、`{{AUDIO}}`、`{{PROMPT}}`、`{{SEED}}` 和 `{{FRAMES}}`。Comfy Cloud 上可能没有 MultiTalk 之类的自定义节点，以 **测试连接** 的结果为准。

**ComfyUI，RunningHub。** 先在你的 RunningHub 工作区里把数字人工作流成功运行一次，再把它的 ID 或页面网址粘贴到 **添加工作流**，点 **验证并添加**。直接导出的普通工作流也能用，前提是其中实际使用的 `LoadImage` 和 `LoadAudio` 节点各只有一个：VideoAgents 会自动替换示例图片和音频。如果不止一个，把它们各减到一个，或者改用 `{{IMAGE}}` 和 `{{AUDIO}}` 占位符。
:::

运行方式、Key 和运行模式（机器规格）参见 [ComfyUI](/zh/videoagents/models/comfyui)。

## 几点说明 {#good-to-know}
- 输入是任意人物图片加上已经生成好的对白音频。先用[语音模型](/zh/videoagents/models/voice-models)生成嗓音。
- 各服务商向你自己的账号收费。RunningHub 上的工作流按运行时长以 RH 币逐秒计费；Agentics 渠道从你的桌面端账号扣费。

## 相关文档 {#related}
- [数字人](/zh/videoagents/project-types/digital-human)
- [语音模型](/zh/videoagents/models/voice-models)
- [ComfyUI](/zh/videoagents/models/comfyui)
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)
