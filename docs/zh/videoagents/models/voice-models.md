---
title: 语音模型
description: 为角色嗓音、对白和旁白选择语音合成服务商，并在按描述设计嗓音和从音色库选音色两种方式之间做选择。
tags: [providers, voice, audio, how-to]
order: 50
---

# 语音模型

语音模型（文字转语音，TTS）负责说出角色的对白和旁白；在音色设计模式下，它还会为每个角色生成嗓音样本。整个应用选一个服务商，每个服务商支持其中一种或两种音色模式。

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 找到 **🎙 TTS语音模型** 卡片。
3. 点某个标签页，查看或修改这个服务商的设置，然后在卡片标题栏的 **生效渠道** 里选择要用的服务商。

修改会自动保存。

![TTS语音模型卡片，当前打开火山引擎标签页，处于音色设计模式](/images/videoagents/models/voice-models-card.webp)

## 两种音色模式 {#two-voice-modes}

每个服务商标签页的第一项是 **模式**：

| 模式 | 嗓音怎么来 | 需要设置 |
| --- | --- | --- |
| **音色设计** | **Voice Design 模型** 根据每个角色嗓音的文字描述生成嗓音样本。之后 **Voice Clone 模型** 以这段样本为参考说出每一句台词，同一个角色的嗓音始终一致 | 两个模型 |
| **音色库** | 系统拉取一个现成的音色库，按每个角色的声纹卡为它挑一个音色，并把结果登记到项目的选角表 | **音色库** 来源和一个 **模型** |

你不用在这个页面手动挑音色。音色库模式下选角是自动完成的；角色的声纹卡怎么来，参见[嗓音](/zh/videoagents/world/voices)。

## 服务商 {#providers}

| 标签页 | 模式 | 需要填写 | 默认值 |
| --- | --- | --- | --- |
| **Agentics** | 音色设计、音色库 | 不用填，登录即可。选一个 **Voice Design 模型** 和一个 **Voice Clone 模型** | 音色设计，使用 `qwen3tts-voicedesign` 和 `qwen3tts-clone` |
| **OpenRouter** | 仅音色库 | **API Key**、**模型** | Grok Voice TTS 1.0 |
| **火山引擎** | 音色设计、音色库 | 新版语音控制台的 **API Key**；音色库模式还要填 **Access Key** 和 **Secret Key** | 音色设计用 Doubao-音频生成 1.0；音色库模型为 Doubao-Seed-TTS 2.0 |
| **ElevenLabs** | 仅音色库 | **API Key**、**模型** | Eleven v3 |
| **MiniMax** | 仅音色库 | **接口区域**、该区域的 **API Key**、**模型** | Speech 2.8 HD |
| **ComfyUI** | 音色设计、音色库 | 运行方式和工作流，参见 [ComfyUI](/zh/videoagents/models/comfyui) | 音色库 |

新安装时，生效渠道默认是 **Agentics**。

## 各服务商说明 {#provider-notes}

**Agentics。** 音色库模式下，**音色库** 为 **本地(data/TimbreModel)**：系统从本地音色库里为每个角色挑一段参考音频，再由 Voice Clone 模型照着它说话。

**OpenRouter。** 可用的音色是所选模型自带的那些。没有公开音色列表的模型（例如 Fish Audio）不能用。菜单把推荐模型排在最前（⭐）：Grok Voice TTS、Gemini 3.1 Flash TTS、MiniMax Speech 2.8、Fish Audio、Qwen Audio TTS、MAI-Voice-2、Deepgram Aura-2、Voxtral、Kokoro 等。

**火山引擎（豆包语音）。** API Key 来自火山新版语音技术控制台的 **API Key 管理**，不是方舟的 Key。音色设计模式下，角色嗓音按每个角色的声纹卡描述生成，旁白用旁白者的声纹卡。项目里某个角色一旦有了嗓音样本，就以它为参考，保证前后台词的嗓音不走样。音色库模式还需要你账号的 **Access Key** 和 **Secret Key**（在火山引擎控制台的 **API 访问密钥** 里创建），用来拉取音色列表。

**ElevenLabs。** 只使用你 ElevenLabs 账号里已有的音色。请先把公共 Voice Library 里的音色添加到你的账号。模型：Eleven v3（默认；用文本里的 `[audio tags]` 控制情绪）、Multilingual v2、Turbo v2.5 和 Flash v2.5。

**MiniMax。** 国际站（minimax.io）和国内站（minimaxi.com）的账号和 Key 互不通用。把 **接口区域** 设成你的 Key 所属的站点；每个区域的 Key 分开保存。模型：Speech 2.8 HD 和 Turbo、Speech 2.6 HD、Speech 02 HD。

**ComfyUI。** 音色设计模式用两个工作流：**Voice Design API** 和 **Voice Clone API**；音色库模式只用 Voice Clone，参考音频取自本地音色库。推荐模板是 `tts-indextts2-api.json`（IndexTTS-2）；另外还附带 `tts-qwen3tts-voicedesign-api.json` 和 `tts-qwen3tts-clone-api.json`。

## 语音模型用在哪里 {#where-the-voice-model-is-used}

- **角色嗓音**：音色设计模式下，每个角色的嗓音样本。参见[嗓音](/zh/videoagents/world/voices)。
- **旁白**：在 **🎛️ → 输出设置** 里开启 **旁白** 后的旁白音轨。
- **对白**：**对白配音** 设为 **后期配音** 时，每句台词由语音模型说出，再贴合到画面上。用默认的 **视频原声(默认)** 时，对白由视频模型直接说出。无论哪种方式，开启 **生成对白语音** 都会维护一份逐句语音库，供动态样片和白模样片使用。参见[对白、嗓音与旁白](/zh/videoagents/create/dialogue)。
- **有声剧** 和 **音频配画** 项目大量依赖语音模型。参见[项目类型](/zh/videoagents/project-types/choose-a-project-type)。

## 常见问题 {#troubleshooting}

**火山引擎在音色库模式下找不到音色。**
在火山引擎标签页填写 **Access Key** 和 **Secret Key**。只有 API Key 时只能做语音合成。

**MiniMax 提示 Key 无效。**
检查 **接口区域** 是否和你创建 Key 的站点一致。

**ElevenLabs 给某个角色分配了意外的音色。**
自动选角只用你账号里的音色。把你想用的音色添加到账号里。

## 相关文档 {#related}
- [声音](/zh/videoagents/world/voices)
- [对白、配音与旁白](/zh/videoagents/create/dialogue)
- [音乐与音效模型](/zh/videoagents/models/music-and-sound-models)
- [ComfyUI](/zh/videoagents/models/comfyui)
