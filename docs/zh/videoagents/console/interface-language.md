---
title: 界面语言
description: 把控制台切换到 12 种语言之一；这个选择也决定 Agent 和你对话所用的语言，以及语音输入的识别语言。
tags: [beginner, how-to]
order: 94
---

# 界面语言

控制台支持 12 种语言。界面语言不只是屏幕上的文字：Agent 也用它和你对话，所以请选你想用来阅读 Agent 汇报的语言。

## 切换语言 {#change-the-language}

1. 打开 **⚙️ → 界面语言**。
2. 点一种语言。当前语言旁边有 **✓**。

页面会以新语言重新加载。

| 语言 | 显示为 |
| --- | --- |
| 英语 | English |
| 中文 | 中文 |
| 日语 | 日本語 |
| 韩语 | 한국어 |
| 越南语 | Tiếng Việt |
| 西班牙语 | Español |
| 法语 | français |
| 德语 | Deutsch |
| 印度尼西亚语 | Indonesia |
| 葡萄牙语 | Português |
| 俄语 | русский |
| 阿拉伯语 | عربي |

切换到阿拉伯语时，页面布局会改为从右到左。

第一次打开控制台时，会按浏览器的语言选择界面语言；12 种都不匹配时用英语。之后，你的选择会对整个安装保存，所以桌面应用重启后、在任何打开控制台的浏览器里，都保持这个语言。

## 界面语言会改变什么 {#what-the-interface-language-changes}

| 内容 | 怎么变 |
| --- | --- |
| 控制台和预览页 | 文字标签、按钮和提示 |
| Agent 的回复和汇报 | Agent 用界面语言和你对话、汇报进度 |
| 图片和视频提示词 | Agent 用界面语言写图片和视频提示词的正文。固定部分，例如参考标记和负面词列表，保持英文。 |
| 风格库提示词 | 从[风格库](/zh/videoagents/console/creative-brief)填入的风格提示词使用界面语言 |
| 语音输入 | 按界面语言识别语音。见[语音输入](/zh/videoagents/console/voice-input)。 |
| 系统消息 | 签字点消息、回执等系统发出的文字：中文界面下是中文，其他所有语言下是英文 |
| 初始引擎 | 首次安装时，中文界面默认用 Kimi Code 引擎，其他语言默认用 Claude Code |

## 界面语言不会改变什么 {#what-it-does-not-change}

作品本身的语言（剧本、对白、旁白、字幕和配音）由每个项目在[输出设置](/zh/videoagents/console/output-settings)里的 **输出语言** 决定。例如，你可以用中文界面做一部日语影片。

## 几点说明 {#good-to-know}
- 切换到其他语言后，控制台里少数还没有翻译的文字会显示中文。
- 有些命令的回复，例如 `/clear` 和 `/auto`，目前只有中文，切换到其他语言也一样。见[聊天命令](/zh/videoagents/console/chat-commands#reply-language)。
- Agent 已经写好的文件保持原来的语言。Agent 会原样沿用已有的提示词片段，而不是翻译它们，所以切换语言后，项目里较早的提示词会保持原来的语言，直到那部分工作重做。

## 相关文档 {#related}
- [输出设置](/zh/videoagents/console/output-settings)
- [语音输入](/zh/videoagents/console/voice-input)
- [控制台导览](/zh/videoagents/console/console-tour)
- [聊天命令](/zh/videoagents/console/chat-commands)
