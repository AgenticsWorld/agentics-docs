---
title: 待提交问题
description: 查看 Agent 在 VideoAgents 本身遇到问题时整理的缺陷报告和功能需求，并在 GitHub 上提交给开发者。
tags: [troubleshooting, security]
order: 96
---

# 待提交问题

Agent 工作时，有时会发现问题不在你的项目里，而在 VideoAgents 本身：应用代码里的缺陷，或者应用缺少的功能。它们会把这些整理成 issue，收集起来给你。由你决定把哪些发给开发者，帮助在以后的版本里修复。

## 打开列表 {#open-the-list}

点 Agent 列表底部的 **待提交问题**。橙色数字表示有几个 issue 在等你处理，每分钟更新一次。

![待提交问题对话框：一条已处理的功能需求已展开](/images/videoagents/console/issues-to-submit.webp)

每个 issue 显示：

- 标题（如果已经在 GitHub 上，标题是一个链接）。
- 它是 **宿主缺陷**（bug）还是 **功能需求**，发现它的 Agent，以及涉及应用的哪个部分。
- 整理的时间。
- 当前状态。

还没处理的 issue 排在前面。已经提交的折叠在 **已处理的问题** 下面。

## 提交 issue {#submit-an-issue}

1. 阅读这个 issue。
2. 点 **提交**。会在 VideoAgents 的 GitHub 仓库打开一个预先填好的「新建 issue」页面。
3. 检查内容，用你的 GitHub 账号发布。

没有你的确认，什么都不会发出去：GitHub 不接受匿名 issue，所以总要由你在 GitHub 上确认。点 **提交** 之后，这个 issue 移到 **已处理的问题** 下面。在那里仍然可以再点 **提交**。

| 状态 | 含义 |
| --- | --- |
| **… 待提交** | 等你处理 |
| **✓ 已提交** | 你已经打开过它的 GitHub 页面 |
| **✓ 已发布** | 已直接发布到 GitHub |
| **≡ 已有同款 issue** | GitHub 上已经有一样的 issue |
| **✗ 发布失败** | 直接发布失败，会显示错误信息 |

## issue 里有什么 {#what-an-issue-contains}

issue 只描述应用的行为，不含其他内容。issue 列出之前，会去掉路径、项目名称和 Key，也不包含故事、提示词或项目内容。相同的 issue 会合并成一个。报告里还会注明你的 VideoAgents 版本，以及你用的是桌面应用还是浏览器。

即便如此，发布之前还是要逐条读一遍：一旦发到 GitHub 上，就是公开的。

## 自动发布 issue {#post-issues-automatically}

如果是无人值守的部署，把环境变量 `VIDEOAGENTS_GITHUB_TOKEN` 设为一个带 `public_repo` 权限的 GitHub classic token。之后 VideoAgents 会直接发布 issue，对话框里会注明这一点，并提供 **↻ 重新发布未成功的** 按钮，重试发布失败的 issue。

## 相关文档 {#related}
- [问题排查](/zh/videoagents/reference/troubleshooting)
- [安全与局域网访问](/zh/videoagents/reference/security)
- [配置](/zh/videoagents/reference/configuration)
- [常见问题](/zh/videoagents/reference/faq)
