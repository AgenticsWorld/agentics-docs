---
title: 常见问题
description: 关于运行 VideoAgents、费用、文件位置、手机、语言、扩展 Agent 团队和作品安全的常见问题简答。
tags: [reference, beginner]
order: 60
---

# 常见问题

大家常问的问题，这里给出简短回答，并附上完整指南的链接。报错信息和功能不正常的情况，见[问题排查](/zh/videoagents/reference/troubleshooting)。

## 快速开始 {#getting-started}

**运行 VideoAgents 需要什么？**
macOS（Apple 芯片）或 Windows（x64）的桌面应用；或者 Python 3.10 及以上版本，用来从源码运行。另外还需要至少一个 [Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)、你想用的生成[服务商](/zh/videoagents/getting-started/set-up-providers)的账号，以及处理媒体用的 FFmpeg。见[安装桌面应用](/zh/videoagents/getting-started/install-desktop-app)或[从源码运行](/zh/videoagents/getting-started/run-from-source)。

**免费吗？**
VideoAgents 以 GPL-3.0 协议开源。你接入的引擎和服务商是独立的服务，各有各的价格。Agentics 渠道向你在桌面应用里登录的 Agentics 账号计费；其他服务商用你自己的 Key，直接向你收费。见[成本控制](/zh/videoagents/models/cost-control)。

**做一个视频要花多少钱？**
取决于所用的模型、分辨率、每集时长，以及工作重做了几次。VideoAgents 在 [资源消耗](/zh/videoagents/console/resource-usage) 面板里显示引擎用量和服务商余额。想少花钱，在视频通过审核之前保持较低的草稿分辨率，并把[重跑次数](/zh/videoagents/console/chat-commands#retry-retry-count)保持为 0。

**该选哪个引擎？**
见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)和 [Agent 引擎](/zh/videoagents/models/agent-engines)。也可以用对话框顶部的 **模型** 按钮，给单个 Agent 指定不同的引擎或模型。

**能不能不从零开始，先试一试？**
可以：导入一个完整的示例项目，例如 *alices*。见[打开示例项目](/zh/videoagents/getting-started/open-a-sample-project)。

**怎么更新？**
桌面应用启动时会检查新版本，更新前会先询问你。从源码运行时，拉取最新代码，再执行一次 `make install`。

## 使用项目 {#working-with-projects}

**我的文件在哪里？**
在项目目录里，都是普通文件。点顶栏的文件夹图标就能打开。见[项目目录](/zh/videoagents/reference/project-folder)。

**我能自己改这些文件吗？**
可以，但 Agent 和检查程序都按它们写入时的格式读取文件。通常走预览页和 **✏️ 修改**（把你的修改交给修改师）更稳妥。见[修改师与修改意见](/zh/videoagents/concepts/reviser)。

**为什么工作停了？**
通常是停在某个[签字点](/zh/videoagents/concepts/sign-off-gates)等你批准，或者所有任务都做完了、没人再让总制片继续。回复签字卡片、发 **▶ 继续**，或者开启[自动运行](/zh/videoagents/console/auto-run)，让项目闲置一段时间后自动接着做。

**能不能不用我盯着？**
自动运行会在项目闲置时继续派单，但遇到签字点仍会停下。**工作流预览** 上的 **全自动模式** 复选框还会替你签字。两者都按项目单独设置。

**怎样停下所有工作？**
点运行面板里的 **⏹ 停止**，或发 `/stop all`。如果开着自动运行，再发 `/auto off`，否则过一阵它又会开始派单。见[聊天命令](/zh/videoagents/console/chat-commands)。

**怎样把项目搬到另一台电脑，或者备份？**
把项目目录打成 zip，在另一台电脑上用顶栏项目菜单里的 **› 导入项目…** 导入（最大 20 GB）。对话记录和服务商 Key 不在项目目录里，不会一起带过去。见[切换、导入和导出项目](/zh/videoagents/console/projects)。

**Agent 删掉的东西能恢复吗？**
从 v1.0.43 起，VideoAgents 会在 Agent 开始处理项目之前给项目拍快照，并且不允许 Agent 删除整个项目。用命令行恢复快照：见[命令行](/zh/videoagents/reference/command-line#restore-a-project-snapshot)。

## 手机、语言和访问 {#phones-languages-and-access}

**能在手机上用 VideoAgents 吗？**
在[手机消息](/zh/videoagents/console/mobile-messages)里绑定飞书、微信或 WhatsApp，就能和总制片对话、发送[聊天命令](/zh/videoagents/console/chat-commands)。在飞书里还能回复签字卡片、接收新生成的图片和视频。你也可以扫二维码，[在手机上画分镜](/zh/videoagents/create/sketch-on-your-phone)。

**能从另一台电脑打开控制台，或者和团队共用吗？**
VideoAgents 是为一个人设计的，没有账号和密码。从源码运行时，可以向局域网开放，但能访问它的每个人都拥有全部控制权，包括你的服务商 Key。见[安全与局域网访问](/zh/videoagents/reference/security)。

**切换到其他界面语言后，为什么还能看到中文？**
控制台的大部分文字都有 12 种语言的版本，但有些文字来自别处：插件和技能里写的说明、服务端生成的部分消息，以及少数还没翻译的文字。Agent 的回复跟随你选择的界面语言。见[界面语言](/zh/videoagents/console/interface-language)。

**可以离线使用吗？**
控制台和你的项目都在你自己的电脑上运行，有些工具也能在本地工作，例如语音输入用的语音识别、在你自己 GPU 上运行的 ComfyUI。但大多数 Agent 引擎和生成服务商都是在线服务，用它们需要联网。见 [ComfyUI](/zh/videoagents/models/comfyui)。

## 扩展 VideoAgents {#extending-videoagents}

**能添加自己的 Agent 或工作流吗？**
可以，用插件：一份清单文件、每个 Agent 一份角色说明，再加一套可选的工作流，不用写代码。见[安装插件](/zh/videoagents/extend/install-plugins)和[编写插件](/zh/videoagents/extend/write-a-plugin)。

**能教 Agent 一项技巧吗？**
可以，用技能：给某个 Agent 写一个 `SKILL.md` 文件。见[安装和使用技能](/zh/videoagents/extend/skills)和[编写技能](/zh/videoagents/extend/write-a-skill)。

**能用自己的脚本控制 VideoAgents 吗？**
可以，通过本地 HTTP API 和它的实时事件流。见[本地 API](/zh/videoagents/extend/local-api) 和[实时事件](/zh/videoagents/extend/live-events)。

**在哪里报告 bug？**
在控制台里，Agent 列表底部的 **待提交问题** 会收集 Agent 发现的 VideoAgents 自身的问题，整理好可以直接提交。你也可以在 [GitHub](https://github.com/AgenticsWorld/VideoAgents/issues) 上提 issue。见[待提交问题](/zh/videoagents/console/issues-to-submit)。

## 相关文档 {#related}
- [问题排查](/zh/videoagents/reference/troubleshooting)
- [术语表](/zh/videoagents/reference/glossary)
- [VideoAgents 是什么](/zh/videoagents/getting-started/what-is-videoagents)
