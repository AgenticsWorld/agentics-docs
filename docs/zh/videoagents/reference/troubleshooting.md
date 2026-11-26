---
title: 问题排查
description: 常见问题的解决办法：Agent 引擎、卡住或失败的运行、服务商 Key 和内容拒收、FFmpeg、端口、手机访问、插件和技能。
tags: [troubleshooting, reference]
order: 70
---

# 问题排查

先找到对应的现象，再按解决办法操作。大多数问题是三类：引擎没准备好、网络连不上引擎，或者服务商拒绝了请求。一般性的问题见[常见问题](/zh/videoagents/reference/faq)。

## Agent 引擎 {#agent-engines}

**弹窗提示「未检测到 … 命令」。**
顶栏选中的引擎没有安装。点 **一键安装**，在后台运行它的官方安装脚本。如果安装失败，或者安装脚本需要你回答问题，点 **在终端中安装**。装好后点 **重新检测**。见[选择 Agent 引擎](/zh/videoagents/getting-started/choose-an-agent-engine)。

**弹窗提示「… 尚未登录」。**
点 **登录**。会打开一个终端，运行引擎自己的登录命令；在浏览器里完成登录，检测到登录成功后弹窗会自动关闭。VideoAgents 不会看到你的登录令牌。

**看不到安装和登录按钮。**
这些按钮只在运行 VideoAgents 的电脑上提供。如果你是从另一台设备打开的控制台，请到那台电脑上安装和登录，或者在那台电脑上自己运行弹窗里显示的安装命令。

**提示「未找到内置的 Agentics 引擎」。**
从源码运行时，用 `make install-pi` 安装一次（需要 Node.js 22.19 或更新版本）。桌面应用已经自带。

**Agentics 引擎提示「登录后即可开始使用」。**
Agentics 引擎使用你的 VideoAgents 账号。在桌面应用里登录，或者在 **⚙️ → 生成模型 → 语言模型/Agentics** 里改用本地模型或云端模型。见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。

**提示「… 有新版本」，但一键更新失败。**
有些安装方式（例如通过 Homebrew 安装）无法自行更新。点 **在终端中更新**，按提示操作，或者用你当初安装它的工具更新。在 Windows 上，引擎正被任务使用时无法更新；等任务结束，或者先停止任务。点 **暂不更新**，这个版本的提示 24 小时内不再出现。

## 运行和 Agent {#runs-and-agents}

**运行失败，提示以「🔌 网络中断」开头。**
引擎和它的 API 之间的连接断了（连接被重置或超时）。VideoAgents 会立刻停止这类运行，不让它们花几分钟反复重试。检查你的代理或 VPN：很多代理只对浏览器生效，对命令行工具不生效。**⚙️ → 高级 → 网络检测** 会显示命令行环境能否访问 Claude、Google 等网站。修好之后给总制片发 **▶ 继续**。见[网络检测](/zh/videoagents/console/network-check)。

**某个 Agent 在长对话里反复失败，或者提示请求过大。**
它的会话太长，无法续接了。给这个 Agent 发 `/clear`；下一条消息会开启全新会话，重新读取项目文件。见[聊天命令](/zh/videoagents/console/chat-commands#clear-reset-a-session)。

**任务一直在跑，或者停了之后又开始跑。**
**⏹ 停止** 和 `/stop all` 只停止当前的任务。开着自动运行时，闲置一段时间后项目又会被接着做。再发 `/auto off`（或 `/auto off all`）。见[自动运行](/zh/videoagents/console/auto-run)。

**重启后，原来在运行的任务显示为出错。**
退出 VideoAgents 会停止正在运行的任务。给总制片发 **▶ 继续**，接着做。

**Claude Code 或 Grok 上的运行跑了很多步之后，以退出码 1 结束。**
多半是撞到了轮次上限（默认 250）。撞到上限时引擎会被直接切断，无法续跑。让 Agent 分小批处理，或者在 **⚙️ → 高级 → Agent 高级设置** 里调高 **轮次上限**。已经写好的文件会保留。见 [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)。

**Agentics 引擎上的运行失败，提示「输出被截断」。**
回复达到了单次输出上限。让 Agent 分段写；如果你的模型服务允许，也可以调高 `AGENTICS_MAX_OUTPUT_TOKENS` 后重新启动 VideoAgents（见[配置](/zh/videoagents/reference/configuration#agents-and-engines)）。

**什么都没发生。**
- 看看有没有签字或确认卡片在等你。工作流在每个[签字点](/zh/videoagents/concepts/sign-off-gates)都会停下。
- **多集并行** 关闭时（默认），一次只做一集。后面的集要等当前这一集全部做完，包括它的签字。
- 打开 **工作流预览**，看哪些步骤被阻塞了。从源码运行时，`python3 services/runtime/dagcheck.py --project <name> --frontier` 会列出可以运行的步骤。
- 发 **▶ 继续**，或者开启自动运行。

**Agent 一遍遍重做，或者从不重试。**
这由[重跑次数](/zh/videoagents/console/chat-commands#retry-retry-count)决定，范围 0–10，默认 0。设为 0 时，第一次失败就交给你决定。

## 服务商和生成 {#providers-and-generation}

**生成失败，提示认证错误（401 之类）。**
服务商的 Key 没填、填错了，或者属于另一个地区或站点。打开 **⚙️ → 生成模型**，在该服务商的标签页里检查 Key，有 **验证 Key** 或 **测试连接** 按钮的就点一下。确认这个服务商是对应媒体类型的生效渠道。见[配置服务商](/zh/videoagents/getting-started/set-up-providers)。

**服务商因为内容拒收图片、视频或提示词。**
开启 [NSFW 模式](/zh/videoagents/models/nsfw-mode)并选好备用模型。**审核拒收后自动切换** 开启时（默认），主服务商因内容拒收的请求会在备用模型上重提一次，不占用重跑次数。语言模型拒绝时，任务下一次重试会改用备用语言模型。

**火山方舟拒收带人脸的参考图（PrivacyInformation）。**
这张图不在虚拟人像资产库里。把它入库；以库内资产提交的图片会被接受。不要重绘人脸。见[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。

**在火山方舟或 MiniMax 上用参考视频生成视频失败。**
这些服务商要求参考视频有公网地址。在 **⚙️ → 存储与图库** 里配置一个存储渠道，本地文件就会上传并以临时链接传过去。见[对象存储与图库](/zh/videoagents/models/object-storage)。

**参考视频的数量或时长超过上限。**
分镜预览会标出超过模型上限的组，但不会替你删除任何素材。在组卡片的 **🎬 视频** 对话框里删掉参考视频，或者换一个上限更高的模型。见[模型限制](/zh/videoagents/console/model-limits)。

## FFmpeg 和本地工具 {#ffmpeg-and-local-tools}

**剪辑、音频或视频步骤因为缺少 FFmpeg 而失败。**
安装 FFmpeg。在 Windows 上，桌面应用找不到 FFmpeg 时会提出帮你下载。在 macOS 上，运行 `brew install ffmpeg`（桌面应用也可以通过 Homebrew 帮你安装）。从源码运行时，用系统的包管理器安装，然后重启 VideoAgents。

**语音输入或语音转写不工作。**
从源码运行时，执行 `python3 modules/transcription.py doctor`。它会报告 faster-whisper 能否加载，以及 VideoAgents 运行在哪个 Python 上。见[语音输入](/zh/videoagents/console/voice-input)。

## 控制台和服务 {#console-and-service}

**端口被占用，控制台启动不了。**
另一个程序（常常是另一个 VideoAgents）正在使用 8630 端口。停掉它，或者换个端口启动：`VIDEOAGENTS_PORT=8650 videoagents-web`。如果 8640 端口被无关的程序占用，设置 `VIDEOAGENTS_API_PORT`。上一次运行残留的 VideoAgents API 会被自动替换。桌面应用会自己选空闲端口。见[命令行](/zh/videoagents/reference/command-line)。

**控制台不再更新。**
顶栏的连接状态圆点显示实时连接是否正常，把鼠标悬停在上面可以看详情。服务在运行时，控制台每 2 秒会自动重连一次。如果一直连不上，说明服务已经停止：重启桌面应用或 `videoagents-web`，再刷新页面。

**手机扫二维码打不开画分镜页面。**
- 手机必须和电脑在同一个网络里。
- 如果开着 TUN 模式的 VPN 或代理，二维码里可能是它们的地址。把 `VIDEOAGENTS_LAN_IP` 设为电脑的局域网地址，再启动 VideoAgents。
- 在防火墙里允许控制台端口 + 1（默认 8631）的入站连接。
- 按显示的 `http://` 链接原样打开，不要让浏览器自动换成 `https://`。
- 链接 30 分钟后失效。重新打开一个。

见[在手机上画分镜](/zh/videoagents/create/sketch-on-your-phone)。

**在飞书、微信或 WhatsApp 里发消息没有回复。**
在 **⚙️ → 高级 → 手机消息** 里查看该通道的「互通状态」和「最近错误」，并先给机器人发一条消息，它才能回复你。见[手机消息](/zh/videoagents/console/mobile-messages)。

## 插件、技能和项目 {#plugins-skills-and-projects}

**插件显示为无效。**
按插件卡片上红字列出的原因逐条修正。见[安装插件](/zh/videoagents/extend/install-plugins#troubleshooting)。

**桌面应用更新后，我加载的技能不见了。**
v1.0.41 之前，技能存放在应用内部。重新加载一次；现在它们会留在数据目录里。见[安装和使用技能](/zh/videoagents/extend/skills)。

**Agent 删掉了我需要的文件。**
把项目最新的快照恢复到一个新目录。见[命令行](/zh/videoagents/reference/command-line#restore-a-project-snapshot)。

**导入项目失败。**
zip 文件最大 20 GB。如果已经有同名项目，导入的项目名后面会加上 `-2`、`-3` 等。见[切换、导入和导出项目](/zh/videoagents/console/projects)。

## 还是解决不了？ {#still-stuck}

Agent 列表底部的 **待提交问题** 会收集 Agent 发现的 VideoAgents 自身的问题；看一看，把它们提交上去。你也可以在 [GitHub](https://github.com/AgenticsWorld/VideoAgents/issues) 上搜索或提 issue。写明你的版本（显示在 Agent 列表底部）、你做了什么、看到了什么，但不要附上 API Key。见[待提交问题](/zh/videoagents/console/issues-to-submit)。

## 相关文档 {#related}
- [常见问题](/zh/videoagents/reference/faq)
- [聊天命令](/zh/videoagents/console/chat-commands)
- [配置](/zh/videoagents/reference/configuration)
- [安全与局域网访问](/zh/videoagents/reference/security)
