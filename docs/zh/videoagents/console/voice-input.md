---
title: 语音输入
description: 用麦克风按钮口述指令和修改意见；语音由本机的 faster-whisper 转成文字，不需要 API Key。
tags: [beginner, how-to]
order: 90
---

# 语音输入

语音输入会在控制台的输入框和预览页的 **修改** 浮窗里加一个麦克风按钮。点一下，说话，你说的话就会自动输入进去。录音由你自己电脑上的 faster-whisper 模型转成文字：音频不会离开这台机器，也不需要 API Key。

## 开启语音输入 {#turn-it-on}

1. 打开 **⚙️ → 高级 → 语音输入**。
2. 勾选 **启用语音输入**。
3. 选一个 **识别模型**；如果显示「未下载」，点 **⬇ 下载模型**。
4. 等到显示 **✓ 模型已就绪,可直接使用**，然后点 **关闭**。

这个对话框里的改动即改即存。

![语音输入对话框：已启用语音输入，small 模型已下载](/images/videoagents/console/voice-input.webp)

模型下载到这台电脑的 `data/models/faster-whisper/` 里。下载期间可以关闭对话框，下载会在后台继续。

## 选择模型 {#choose-a-model}

| 模型 | 大小 | 说明 |
| --- | --- | --- |
| tiny | 75 MB | 最快，精度最低 |
| base | 145 MB | 快，精度一般 |
| small | 484 MB | 均衡（推荐） |
| medium | 1.5 GB | 较慢，精度高 |
| large-v3-turbo | 1.6 GB | 精度接近 large-v3，速度快得多 |
| large-v3 | 3.1 GB | 慢，精度最高 |

建议先用 **small**。在 Apple 芯片的电脑上，**medium** 或 **large-v3-turbo** 效果不错。

这里选的模型，也是 VideoAgents 里所有本机语音识别统一使用的模型：素材库的对白识别、数字人等流程里的音频转文字，以及字幕和混剪的语音对齐。即使关闭了语音输入也是如此；这个开关只控制麦克风按钮。如果这些流程用到的模型还没下载，会自动下载。

## 口述 {#dictate}

1. 点输入框右下角的麦克风。录音时它会变红。
2. 说话。
3. 再点一次停止。录音满 60 秒会自动停止。

文字插入在光标所在的位置。检查一遍再发送。

![控制台输入框：右上角是附件按钮，右下角是麦克风](/images/videoagents/console/voice-input-composer.webp)

识别语言跟随[界面语言](/zh/videoagents/console/interface-language)。要用其他语言口述，切换界面语言即可。

## 常见问题 {#troubleshooting}

| 提示 | 怎么办 |
| --- | --- |
| **麦克风权限被拒绝** | 在系统设置里允许浏览器或桌面应用使用麦克风 |
| **没有找到麦克风设备** | 连接或选择一个麦克风 |
| **录音需要 HTTPS 或本机地址** | 浏览器只允许在安全页面上录音。用 `localhost` 或 `127.0.0.1` 打开控制台，或者使用桌面应用。 |
| **没有识别到语音** | 录音太短或没有声音。离麦克风近一点，再试一次。 |
| **未检测到 ffmpeg,录音无法解码** | 在运行 VideoAgents 的电脑上安装 ffmpeg |
| 模型未下载 | 在 **⚙️ → 高级 → 语音输入** 里下载 |

## 相关文档 {#related}
- [和 Agent 对话](/zh/videoagents/console/chat-with-agents)
- [界面语言](/zh/videoagents/console/interface-language)
- [修改师与修改意见](/zh/videoagents/concepts/reviser)
- [素材库](/zh/videoagents/project-types/footage-library)
