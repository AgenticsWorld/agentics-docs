---
title: 网络检测
description: 测试运行 VideoAgents 的电脑能否在命令行环境里访问 Google、YouTube、OpenAI 和 Claude，并查看你的公网 IP 和归属地。
tags: [troubleshooting, engines]
order: 92
---

# 网络检测

Agent 引擎（Claude Code、Codex 等）是运行在 VideoAgents 所在电脑上的命令行程序。在浏览器里能用的 VPN，不一定能覆盖到它们。**网络检测** 按这些程序看到的方式测试连接，帮你判断引擎或下载失败是不是网络问题。

## 运行检测 {#run-the-check}

打开 **⚙️ → 高级 → 网络检测**。检测立即开始，几秒钟就能完成。点 **↻ 重新检测** 可以再测一次，例如在改了 VPN 设置之后。

![网络检测对话框：五个站点全部可达；IP 地址已打码，归属地已隐藏](/images/videoagents/console/network-check.webp)

对话框显示：

- **当前出口 IP**：你的流量出去时使用的公网 IP 地址，以及它的归属地和网络运营商。用它确认 VPN 或代理是否生效。
- 一张站点表，每个站点显示 **✓** 和响应时间，或者 **✗** 和错误信息：

| 站点 | 为什么测它 |
| --- | --- |
| **baidu.com (基线)** | 几乎在哪里都能访问的站点，用来确认网络本身是否正常 |
| **google.com** | Google 服务 |
| **www.youtube.com** | YouTube，例如通过链接导入素材时会用到 |
| **openai.com** | OpenAI 服务 |
| **claude.ai/install.sh (Claude Code 安装脚本)** | 安装和更新 Claude Code |

## 看懂判定结果 {#read-the-verdict}

| 判定 | 含义 | 怎么办 |
| --- | --- | --- |
| **判定:全部站点可达,terminal 网络正常。** | 问题不在网络 | 从别处找原因：引擎登录、服务商 Key、额度 |
| **判定:网络正常但部分国外站点不通……** | 基线站点能访问，但部分站点被拦截 | 打开 VPN 的 TUN（全局）模式，让它覆盖命令行程序，然后重新检测。Astrill 用户请把协议切到 StealthVPN、OpenVPN 或 WireGuard。 |
| **判定:基线站点也不通……** | 网络本身似乎断了 | 先检查网络连接；这不是 VPN 的问题 |

## 什么时候用 {#when-to-use-it}

- 引擎安装、登录或响应失败。
- 运行以网络错误结束，例如 API 连接断开或超时。
- 你刚改过 VPN 或代理设置。

检测只读取信息，不会改任何设置。

## 相关文档 {#related}
- [Agent 引擎](/zh/videoagents/models/agent-engines)
- [安装桌面应用](/zh/videoagents/getting-started/install-desktop-app)
- [问题排查](/zh/videoagents/reference/troubleshooting)
- [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)
