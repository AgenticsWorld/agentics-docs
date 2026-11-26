---
title: 声音
description: 每个有台词的角色怎样得到一张声纹卡和一段简短的声音样本，让声音在各集之间保持一致；以及旁白的声音。
tags: [voice, characters, film, how-to]
order: 50
---

# 声音

每个有台词的角色都有自己的声音：一张文字声纹卡和一段 3–5 秒的声音样本。生成的镜头里只要这个角色开口说话，就会附上这段样本，所以角色在每场戏、每一集里听起来都一样。你在 **👤 人物预览** 页试听这些样本。

## 声音是怎样做出来的 {#how-a-voice-is-made}

声音和[角色](/zh/videoagents/world/characters)一起，在[工作流](/zh/videoagents/concepts/workflow)的第 3 阶段制作，不是逐集制作。

1. **声纹卡。** 声纹设定 Agent 为每个有台词的角色写 `bible/characters/<id>/voice.json`。它从外貌设定里取角色的性别（声音必须与之相符），其余部分根据外貌和性格推导：

   | 字段 | 含义 |
   | --- | --- |
   | `gender` | 从外貌设定复制 |
   | `timbre`、`pitch`、`accent` | 声音听起来怎样，只用纯声学的词描述 |
   | `speed_cpm`（英文台词还有 `speed_wpm`） | 语速 |
   | `reference_style` | 用平实的话描述是哪类说话人、怎么说话 |
   | `emotion_range` | 角色平静、激动、耳语……时语速和音高怎样变化 |
   | `age_variants` | 每个年龄版本一种声音，各自注明覆盖的章节 |

2. **选角和样本。** 配音 Agent 把每个角色、每个年龄版本的声音登记到项目的选角表 `assets/audio/voice/casting.json`，并制作一段 3–5 秒、语气平静中性、不带音乐和环境声的样本：`assets/audio/voice/refs/<id>_voiceprint.mp3`，年龄版本为 `<id>_<variant>_voiceprint.mp3`。
3. **签字。** 声音属于 **角色与资产确认**（H1A）的一部分。见[签字点](/zh/videoagents/concepts/sign-off-gates)。

生成一集的视频之前，团队会检查这一集里每个开口说话的角色是否都有对应年龄版本的样本，缺的会补做。次要角色可能没有样本，这时它的声音在视频提示词里用文字描述。

## 音色设计还是音色库 {#voice-design-or-voice-library}

样本怎样制作，取决于 **🎨 生成模型** 页上文字转语音服务商的 **模式**：

- **音色设计：** 根据声纹卡的描述生成样本，不挑现成音色。
- **音色库：** 团队从服务商的音色库里挑一个与声纹卡相符的音色（先看性别，再看年龄、语言和音色），避开已经分给其他角色的音色，并记入 `casting.json`。

各服务商及其模式见[语音模型](/zh/videoagents/models/voice-models)。

## 样本怎样使用 {#how-the-samples-are-used}

**🎛️ → 输出设置 → 对白配音** 设为 **视频原声（默认）** 时，由视频模型自己说出对白，并与口型同步。每个开口角色的样本作为参考音频附在镜头上，让模型知道这个角色的声音是什么样的。样本只用来确定声音，永远不会进入成片，对白也不会被替换成文字转语音。

当你开启其他对白选项（例如 **后期配音** 或 **生成对白语音**）时，也会用到这些样本、声纹卡和选角表。见[对白、配音和旁白](/zh/videoagents/create/dialogue)。

## 试听声音 {#listen-to-the-voices}

从 **预览设定产物** 菜单（控制台顶栏的图片图标）打开 **👤 人物预览**，选一个角色。声音行在角色名字下方。

![Alice 的声音行：选角表里的 default 和 age02 两条、一段带播放器的 age02 声音样本，以及一段带播放器的主音色样本，每行都有修改按钮](/images/videoagents/world/voices.webp)

每一行显示：

- 🔊 变体名称；角色的主声音显示为 **主音色**。
- 选角表里记录了的话，显示服务商的音色名和模型；尚未确认时显示状态。
- 样本播放器，或「（音色样本未生成）」。
- **✏️ 修改**，用来提出修改。

每一行来自选角表；`assets/audio/voice/refs/` 里有、但选角表没有指向的样本文件，会作为额外的一行列出。所以一个角色可能出现同一个变体两次：一次没有样本，一次有样本。

完整的声纹卡在页面下方的 **声音/配音** 小节里。

## 旁白的声音 {#the-narrator-s-voice}

在 **🎛️ → 输出设置** 里开启 **旁白** 后，项目会为整部片子准备一个旁白声音：

- 一张根据项目基调设计的声纹卡 `assets/audio/voice/narrator.json`，以及一段冻结的样本 `assets/audio/voice/refs/NARRATOR_voiceprint.mp3`。挑选时会确保它听起来不像任何角色的声音。
- 做好之后就固定不变。修改生成模型页上的文字转语音设置，不会改变旁白的声音。
- 它显示为人物预览列表顶部的 **🎙 旁白**，带有样本和 **旁白声线卡**。

关闭旁白时，不会制作旁白声音。

## 修改声音 {#change-a-voice}

点声音行上的 **✏️ 修改**，写下问题（例如「对一个十岁孩子来说太老了；要更明亮、更快」），点 **发送**。修改师会按声纹设定和配音 Agent 的方式处理：更新声纹卡，并重新制作样本。见[修改师和修改意见](/zh/videoagents/concepts/reviser)。

::: tip 提示
在生成视频之前改好声音。已经生成的镜头会保留生成时的声音，直到重新生成。
:::

## 相关文档 {#related}
- [角色](/zh/videoagents/world/characters)
- [对白、配音与旁白](/zh/videoagents/create/dialogue)
- [语音模型](/zh/videoagents/models/voice-models)
- [输出设置](/zh/videoagents/console/output-settings)
