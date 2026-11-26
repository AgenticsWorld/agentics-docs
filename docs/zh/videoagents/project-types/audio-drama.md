---
title: 有声剧
description: 安装 audio-drama 插件，把项目的分集剧本、角色和声音做成一部有声剧或一期播客，得到混好音、通过响度检查的母带。
tags: [audio-drama, plugins, audio]
order: 80
---

# 有声剧

audio-drama 插件把项目的世界、分集剧本和声音做成有声剧或播客。最终产物是每一集的音频母带和发布包，不需要视频。

它不随 VideoAgents 一起提供，而是 [VideoAgents-Plugins](https://github.com/AgenticsWorld/VideoAgents-Plugins) 仓库里的一个附加插件。

## 开始之前 {#before-you-start}
- 一个有世界圣经和角色列表的项目（`bible/world.json`、`bible/characters/index.json`）。
- 要改编的分集剧本：剧本，以及各集已有的对白和旁白文件（`story/episodes/epNN/`）。角色声音（`bible/characters/*/voice.json`、`assets/audio/voice/casting.json`）以及已经做好的配音、音乐或音效都会复用。
- 在 **⚙️ → 生成模型** 里设置好语音、音乐和音效服务商。

## 安装和启用 {#install-and-enable}

1. 从插件仓库的 `plugins/` 文件夹下载 `audio-drama.zip`。
2. 打开 **⚙️ → 插件**，点 **⬆ 安装插件包（zip）**，选择这个文件。大约 30 秒内就会被识别。
3. 点 **audio-drama** 旁边的 **启用**。新安装的插件在你启用之前一直是停用状态。

会新增三个 Agent：有声化编剧、声音导演和播客包装。其余工作都由内置的配音、旁白、音乐、音效、环境音、混音和审核 Agent 完成。见[安装插件](/zh/videoagents/extend/install-plugins)。

::: warning 注意
插件的指令会原封不动地交给 AI 模型。安装之前先读一遍插件的文件。
:::

## 开始一集 {#start-an-episode}

在项目里选中 **总制片**，说明要做哪一集。例如：

```text
启动 audio-drama 工作流：把第 1 集的剧本做成一期播客。
沿用 casting.json 里已有的角色声音绑定。
先跑 ad0 有声化改编，把有声化脚本和提示表交给我做 ADH1 签字。
```

如果项目里已经有可用于音频的素材，例如对白、旁白、选角，甚至一集成片，有声化改编这一步会复用它们，而不是从头开始。

## 工作流和签字 {#workflow-and-sign-offs}

| 阶段 | 做什么 | 你的签字 |
| --- | --- | --- |
| ad0 有声化改编 | 有声化编剧把剧本改写成适合听的版本：听不出来的内容改成旁白、说出口的反应或声音提示。每句台词标明说话人、情绪、语速和停顿；每个音效、环境声和音乐提示标明进出点 | **ADH1** 有声化脚本和提示表 |
| ad1 声音导演 | 声音导演给每个角色绑定声音，并逐句写出情绪、语速、停顿和表演说明 | — |
| ad2 声音素材生产 | 配音、旁白、音乐、音效和环境声由内置的音频 Agent 并行制作 | — |
| ad3 混音与母带 | 混音并检查：−14 LUFS ±1，真峰值不高于 −1 dBTP，没有削波，每个提示都已覆盖。之后是音频审核 | **ADH2** 母带、片头和片尾 |
| ad4 发布包装 | 内容安全和版权审核，然后由播客包装写出标题、简介、节目笔记、章节和元数据 | **ADH3** 发布 |

## 文件 {#files}

插件只写入项目的 `audio-drama/` 文件夹：

| 文件夹 | 内容 |
| --- | --- |
| `audio-drama/scripts/` | 有声化脚本和提示表 |
| `audio-drama/casting/` | 每一集的声音导演方案 |
| `audio-drama/voices/` | 生成的配音和旁白音轨清单 |
| `audio-drama/mix/` | 母带（`master.wav`）、混音和响度报告、音乐和音效提示表 |
| `audio-drama/publish/` | 元数据、节目笔记，以及安全和版权审核结果 |

最终文件要等你确认之后，才会复制到项目的 `publish/audio/` 文件夹。

## 几点说明 {#good-to-know}
- **正史不会改动。** 有声剧专用的说明留在 `audio-drama/` 里。
- **视频工作会暂停。** 有声剧开始时，只与视频有关的阶段（美术风格、分镜、视觉生成、视频剪辑、成片终审和视频发布，以及它们的签字点）会标记为跳过，但前提是其中还没有一个开始；如果视频工作已经在进行，就什么都不跳过。剧本和音频阶段保持有效，被跳过的阶段之后可以恢复。
- **片头和片尾是可复用的素材。** 它们是有版本的音频文件，不会每次混音都重新生成。
- **插件只准备发布包，不会上传** 到任何平台。

## 相关文档 {#related}
- [安装插件](/zh/videoagents/extend/install-plugins)
- [对白、配音与旁白](/zh/videoagents/create/dialogue)
- [音乐与音效](/zh/videoagents/create/music-and-sound)
- [声音](/zh/videoagents/world/voices)
- [选择项目类型](/zh/videoagents/project-types/choose-a-project-type)
