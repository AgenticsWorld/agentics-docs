---
title: 资源消耗
description: 在控制台右栏查看引擎额度还剩多少，以及 OpenRouter、火山引擎、RunningHub 和 Agentics 账户的余额。
tags: [cost, beginner, how-to]
order: 35
---

# 资源消耗

运行面板下方的 **资源消耗** 面板显示 Agent 引擎的额度用了多少，以及各服务商账户里还剩多少钱。长时间运行之前先看一眼，免得额度或余额耗尽，制作停在半路。

![资源消耗面板：Claude Code 的 Session 和 Weekly 用量条；余额已打码](/images/videoagents/console/resource-usage.webp)

## 面板显示什么 {#what-the-panel-shows}

**引擎用量。** 每个开启了用量检查的引擎显示两条进度条：

- **Session**：当前用量窗口（Claude Code、Codex 和 OpenCode Go 是 5 小时窗口）。
- **Weekly**：周窗口。

用量到 60% 时进度条变黄，到 85% 时变红。进度条下方显示窗口何时重置，例如「2d 18h 后重置」。显示 **未知** 表示没能读到用量。

顶栏选中的引擎会自动显示。选 **pi** 时显示的是 Codex 的用量，因为 pi 通常配的是 ChatGPT 订阅。

**余额。** 每个已配置的账户占一行：

| 行 | 什么时候显示 |
| --- | --- |
| **Agentics 余额** | 你已在桌面应用里登录（shumati.cn 版以人民币显示，agentics.world 版以美元显示） |
| **OpenRouter 余额** | 已填写 OpenRouter Management Key |
| **火山引擎 余额** | 已开启火山引擎余额检查 |
| **RunningHub.ai**、**RunningHub.cn** | 已开启 RunningHub 余额检查；每个填了 Key 的站点一行，单位是 RH 积分 |

面板每 10 分钟刷新一次。点 **⟳ 刷新** 可以立即重新读取全部数据。**更新于:** 显示最近一次读取的时间。

## 开启用量检查和余额查询 {#turn-on-usage-checks-and-balances}

1. 打开 **⚙️ → 资源消耗**。
2. 勾选需要的检查项，填入 Key。
3. 点 **保存**。面板会按新设置立即刷新。

![资源消耗设置对话框：用量检查和余额 Key；Key 已打码](/images/videoagents/console/resource-usage-settings.webp)

| 设置 | 作用 |
| --- | --- |
| **Claude 用量检查** | 读取 Claude Code 的会话用量。在 macOS 上，第一次读取会弹出钥匙串提示，点「始终允许」。如果设置了环境变量 `VIDEOAGENTS_ENABLE_CLAUDE_USAGE_PROBE`，这项检查始终开启，这个开关不起作用。 |
| **Codex 用量检查** | 从本地 Codex CLI 会话文件读取 5 小时和周窗口的用量。Codex 跑过之后才有读数。 |
| **KimiCode 用量检查** 和 **Kimi API Key** | 查询 KimiCode 的会话和周用量。Key 留空则使用本机的 kimi 登录凭证。Key 在 [kimi.com/code/console](https://www.kimi.com/code/console) 创建。 |
| **OpenCode Go 用量** 和 **OpenCode API Key** | 查询 OpenCode Go 订阅用量（5 小时和周窗口）。Key 留空则使用本机的 opencode 登录凭证。 |
| **OpenRouter Key** | 用来读取 OpenRouter 余额的 Management Key（`sk-or-…`）。留空则不查。在 [openrouter.ai/settings/management-keys](https://openrouter.ai/settings/management-keys) 创建。 |
| **火山引擎余额**、**Access Key**、**Secret Key** | 读取火山引擎账户的可用余额。两个 Key 都必须填写。在 [console.volcengine.com/iam/keymanage](https://console.volcengine.com/iam/keymanage) 获取。 |
| **RunningHub 余额**、**.ai API Key**、**.cn API Key** | 读取 RH 积分。runninghub.ai 和 runninghub.cn 是两套独立的账号：用哪个站点就填哪个站点的 Key，至少填一个。 |

所有 Key 都只保存在你的电脑上，位于应用本地的 `webui/state.json`，不会上传。

## 你的 Agentics 账户 {#your-agentics-account}

在桌面应用里，**⚙️ → 账号** 显示你的账号 ID 和余额，可以在这里登录或退出登录。登录或退出后应用会重启。面板里的 **Agentics 余额** 一行不受资源消耗设置的影响。

## 用量和自动运行的关系 {#how-usage-connects-to-auto-run}

自动运行参考的是总制片所用引擎的会话用量：达到你设定的阈值时，自动运行跳过这一轮。见[自动运行](/zh/videoagents/console/auto-run)。

## 相关文档 {#related}
- [成本控制](/zh/videoagents/models/cost-control)
- [自动运行](/zh/videoagents/console/auto-run)
- [Agent 引擎](/zh/videoagents/models/agent-engines)
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)
