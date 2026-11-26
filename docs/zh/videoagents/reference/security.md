---
title: 安全与局域网访问
description: VideoAgents 自带的安全默认值，能打开控制台的人能做什么，怎样谨慎地向局域网开放，以及怎样约束 Agent。
tags: [security, reference, advanced]
order: 30
---

# 安全与局域网访问

VideoAgents 是一个人在自己电脑上用的制作工具，不是面向多人的网络服务。它没有账号和密码，它的 Agent 会在这台电脑上读写文件、运行命令。本页说明保证安全的默认设置、向其他设备开放控制台后会有什么变化，以及怎样限制 Agent 能做的事。

## 默认设置 {#the-defaults}

| 设置 | 默认值 | 原因 |
| --- | --- | --- |
| 控制台地址 | `127.0.0.1`（只有本机） | 网络上的其他设备访问不到控制台和它的 API。 |
| 内部 API 服务 | 始终是 `127.0.0.1` | 其他设备只能经过控制台访问它。 |
| 引擎的安装、登录和更新 | 只能在本机操作 | 来自其他设备的请求无法启动安装程序或打开终端。 |
| Claude 用量检查 | 关闭，除非顶栏引擎是 Claude Code 或你手动开启 | 读取用量就要读取你本机的 Claude 登录信息。 |
| Agent 权限模式（Claude Code） | 从源码运行时为 `acceptEdits` | Agent 不会得到随意运行命令的权限。桌面应用使用 `bypassPermissions`，见[下文](#agent-permissions-and-safeguards)。 |

## 能打开控制台的人能做什么 {#what-anyone-who-reaches-the-console-can-do}

控制台没有登录，所以只要能打开控制台的地址，不管是用浏览器还是通过 [API](/zh/videoagents/extend/local-api)，就能做你能做的一切：

- 查看每个项目、每段对话和每个生成的文件；
- 查看保存在生成模型页的服务商 API Key；
- 修改任何设置，安装插件和技能；
- 启动 Agent：它们会在你的电脑上运行命令，消耗你在服务商那里的额度。

修改地址之前，先想清楚这一点。

## 允许局域网访问 {#allow-access-from-your-local-network}

从源码运行时，可以让同一网络里的平板或另一台电脑使用控制台。

1. 停止 VideoAgents。
2. 让它监听所有网络接口（或你电脑的局域网地址）后重新启动：

   ```bash
   VIDEOAGENTS_HOST=0.0.0.0 videoagents-web
   ```

3. 在另一台设备上打开 `http://<电脑的局域网地址>:8630`。

在另一台设备上，控制台照常使用，区别如下：

- 不提供 Agent 引擎的 **一键安装**、**登录** 和 **一键更新**。这些操作请在运行 VideoAgents 的电脑上做。
- 打开文件夹或文件选择器的按钮，打开的是运行 VideoAgents 那台电脑上的窗口。

桌面应用总是监听 `127.0.0.1`，不能从其他设备打开。

::: danger 只在可信的网络里使用
- 不要在路由器上做端口转发，也不要把控制台暴露到互联网。
- 只在你信任其中每台设备的网络里使用，不要在公共或共享 Wi-Fi 上使用。
- 不再需要时，停止服务，不带 `VIDEOAGENTS_HOST` 重新启动。
- 如果一定要从别处访问，请把它放在你自己掌控的 VPN 或网关后面，由它们提供加密（TLS）和登录。VideoAgents 本身两样都不提供。
:::

## 不需要局域网访问的手机功能 {#phone-features-that-don-t-need-lan-access}

在手机上使用 VideoAgents，不必向网络开放控制台：

- **在手机上画分镜。** 一个单独的小服务只提供画分镜页面和它的上传接口，端口是控制台端口 + 1（默认 8631），监听所有网络接口。每个画分镜链接都带随机令牌，30 分钟后失效。设置 `VIDEOAGENTS_DRAW_PORT=0` 可以关闭它。见[在手机上画分镜](/zh/videoagents/create/sketch-on-your-phone)。
- **手机消息。** 在飞书、微信或 WhatsApp 里和总制片对话，在飞书里回复签字卡片。见[手机消息](/zh/videoagents/console/mobile-messages)。从这些通道发来的消息，对项目的作用和在控制台里输入的消息一样，所以绑定的账号只能你自己用。

## Agent 权限和保护措施 {#agent-permissions-and-safeguards}

Agent 运行在能修改文件、运行命令的引擎上（Claude Code、Codex CLI、Agentics 等）。

**权限模式。** `VIDEOAGENTS_PERMISSION_MODE` 设置 Claude Code 引擎的权限模式：

| 值 | 使用场景 | 含义 |
| --- | --- | --- |
| `acceptEdits` | 从源码运行（`videoagents-web`、`make run`） | Agent 修改文件不用询问，但不会得到随意运行命令的权限。处理不可信的输入时推荐使用。 |
| `bypassPermissions` | 桌面应用、`make run-auto`、`./run.sh` | Agent 不经询问就能运行任何命令。只在可信的电脑上使用。 |

Codex CLI、Pi 和 Agentics 引擎始终无人值守运行。

**在任何模式下都开启的保护：**

- **工作流保护。** 总制片不能自己运行生成命令，必须把工作派给负责的 Agent。
- **删除保护**（v1.0.43 起）。数据目录、其中的设置目录、存放项目的 `projects/` 目录、每个项目的目录、安装目录、自带的 Python、快照目录和你的用户主目录，以及它们的所有上级目录，都受保护。删除或清空其中任何一个都会被拒绝。项目里的文件和子目录仍然可以删除。在 Pi 和 Agentics 引擎上，每次工具调用都会检查；在其他引擎上只能尽力检查，Windows 上暂时还没有拦截 `rm` 的替身命令。
- **项目快照**（v1.0.43 起）。Agent 启动前，项目会被复制到数据目录之外，同一项目最多每 30 分钟一次。恢复方法见[命令行](/zh/videoagents/reference/command-line#restore-a-project-snapshot)，相关设置见[配置](/zh/videoagents/reference/configuration#project-snapshots)。

## 不是你写的内容 {#content-you-didn-t-write}

把小说、参考文件、提示词和模型输出都当作不可信内容：Agent 会读取它们，并按里面写的去做。

- **插件和技能**是给 Agent 的指令。插件里的 `SOUL.md` 会一字不差地复制进 Agent 的指令，Agent 也会照着技能的 `SKILL.md` 做。安装别人做的插件或技能之前，把每个文件都读一遍。见[安装插件](/zh/videoagents/extend/install-plugins)和[安装和使用技能](/zh/videoagents/extend/skills)。
- 处理陌生人的项目时，在电脑上另建一个用户账户运行 VideoAgents，或者放在容器里运行。

## Key 和私人数据 {#keys-and-private-data}

- 服务商 Key 保存在数据目录的 `.videoagents/genconfig.json` 里；在 **⚙️ → 资源消耗** 里填的 Key 保存在 `.videoagents/state.json` 里。两者都是明文。Key 只放在这里或密钥管理工具里，不要写进项目或脚本。
- 不要分享或提交数据目录、日志、对话记录或设置文件。仓库已经把 `data/` 排除在 Git 之外。
- 项目目录里没有你的 Key，也没有你的对话，所以可以把项目打成 zip 分享；分享前先检查 `refs/` 和生成的文件里有没有私人内容。

## 报告安全问题 {#report-a-security-problem}

尚未修复的漏洞或泄露的密钥，不要提公开 issue。请使用 [VideoAgents 仓库](https://github.com/AgenticsWorld/VideoAgents)的 GitHub 私密漏洞报告功能，或在 GitHub 上联系 AgenticsWorld 组织的所有者。写明受影响的版本、复现步骤和影响，但不要附真实的 API Key 或私人项目数据。修复会发布在最新版本里。

## 相关文档 {#related}
- [配置](/zh/videoagents/reference/configuration)
- [本地 API](/zh/videoagents/extend/local-api)
- [手机消息](/zh/videoagents/console/mobile-messages)
- [命令行](/zh/videoagents/reference/command-line)
