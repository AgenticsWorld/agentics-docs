---
title: 自动运行
description: 项目闲置时让 VideoAgents 自动唤醒总制片，可设置闲置时间、用量阈值、常任指令和防止系统休眠。
tags: [automation, cost, how-to]
order: 70
---

# 自动运行

开启自动运行后，你不用一遍遍催团队继续。只要项目闲置了一段时间、还有工作要做，VideoAgents 就会唤醒总制片，由它派发下一批任务。遇到签字点时，它会停下来等你。

## 开关自动运行 {#turn-auto-run-on-or-off}

点[运行面板](/zh/videoagents/console/run-panel)里的 **🤖** 按钮。开启时显示 **🤖 自动运行**，关闭时显示 **🤖 已停**。

- 每个项目各有一个开关，默认关闭，重启后保持原来的状态。
- 开关作用于顶栏当前选中的项目。
- 也可以在任何对话框里或从手机发送 `/auto on`、`/auto off` 或 `/auto off all`。见[聊天命令](/zh/videoagents/console/chat-commands)。
- 项目列表里，开启了自动运行的项目在 **自动** 列显示 **🤖**。

## 自动运行做什么 {#what-auto-run-does}

每隔一个闲置时间，自动运行检查一遍开启了它的每个项目：

1. 如果有任务在运行，或者有确认在等你答复，什么都不做。
2. 如果工作流里还有可以开始的工作，给总制片发一条状态检查消息，由它派发下一批任务。这条消息在对话里标着 **🤖 自动运行**。
3. 如果只剩下签字，改为给你发一条桌面通知。
4. 如果总制片所用引擎的会话用量已达到阈值，跳过这一轮。

**多集并行** 关闭时（默认，在 [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings) 里），团队做完一集再做下一集。如果当前这一集卡在被暂缓或被阻塞的步骤上，自动运行会告诉你后面的集在等待。

## 设置 {#settings}

打开 **⚙️ → 自动运行**，修改数值后点 **保存**。

![自动运行设置对话框：当前用量、阈值、闲置时间、防止系统休眠和常任指令](/images/videoagents/console/auto-run.webp)

| 字段 | 作用 | 范围 | 默认 | 适用于 |
| --- | --- | --- | --- | --- |
| **当前会话用量** | 显示 Claude Code 和 Codex 当前 5 小时窗口的会话用量。用来判断阈值的引擎标有 **(门控引擎)**。 | — | — | — |
| **阈值(%)** | 总制片所用引擎的会话用量达到这个值时，自动运行跳过这一轮。读不到用量时照常进行。 | 1–100 | 80 | 所有项目 |
| **闲置时间(min)** | 自动运行多久检查一次 | 1–720 | 5 | 所有项目 |
| **防止系统休眠** | 只要有任一项目开着自动运行，就阻止电脑因闲置进入睡眠。屏幕照常可以熄灭，合盖和关机不会被阻止。退出应用后自动解除。仅支持 macOS 和 Windows。 | 开 / 关 | 开 | 所有项目 |
| **常任指令** | 附加在自动运行发给总制片的每条消息里的文字。即使总制片的会话重开，也不会丢失。 | 最多 2,000 字符 | 空 | 当前项目 |

### 常任指令 {#standing-orders}

常任指令适合放需要长期遵守的规则。建议写成条件式，例如：

> 在 ep01–ep10 剧本全部完成前，不派设定类工单。

留空则不附加任何内容。

## 什么时候用 {#when-to-use-it}

- 长时间无人值守的运行，例如通宵生成。在 [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings) 里设好 **重跑次数**，让不合格的工作不用你在场也能重做。
- 你不在电脑前时：绑定[手机消息](/zh/videoagents/console/mobile-messages)，在手机上接收通知、答复签字卡片。

::: warning 注意
你不在的时候，自动运行会持续消耗引擎额度和生成费用。留意[资源消耗](/zh/videoagents/console/resource-usage)；如果想给自己的工作留一部分会话额度，就调低阈值。
:::

## 停止 {#stopping}

**⏹ 停止**（或 `/stop all`）会停止正在运行的任务，但下一个闲置时间过后，自动运行又会开始派单。要彻底停下来，还要用 **🤖** 按钮或 `/auto off` 关闭自动运行。

## 相关文档 {#related}
- [聊天命令](/zh/videoagents/console/chat-commands)
- [运行面板](/zh/videoagents/console/run-panel)
- [Agent 高级设置](/zh/videoagents/console/agent-advanced-settings)
- [签字点](/zh/videoagents/concepts/sign-off-gates)
