---
title: 图库搜图
description: 在参考文件页搜索 Openverse、Pexels 和 Pixabay，把免费图片加入参考，并记下来源和许可。
tags: [art-style, storage, beginner, how-to]
order: 22
---

# 图库搜图

[参考文件](/zh/videoagents/world/reference-files)页上的 **🔎 图库** 按钮可以搜索免费图库，把你选中的图片加入参考的某个板块。每张图都会记下作者、来源和许可，你可以知道哪些需要署名。

## 开始之前 {#before-you-start}
- **Openverse** 不需要 Key。
- **Pexels** 和 **Pixabay** 需要免费的 API Key。添加之前，它们在图源菜单里是灰色的，后面标着「（需 API Key：⚙️ 设置 → 存储与图库）」。
- **译成英文** 按钮使用内置 Agentics 引擎的文本模型。见[内置 Agentics 引擎](/zh/videoagents/models/agentics-engine)。

## 添加 Pexels 和 Pixabay 的 Key {#add-pexels-and-pixabay-keys}

1. 在控制台打开 **⚙️ → 存储与图库**。
2. 在 **🖼 图库 API Key** 卡片里，把 Key 粘贴到 **Pexels** 或 **Pixabay** 旁边。输入框下方的链接通往注册页（pexels.com/api 和 pixabay.com/api/docs）。
3. 点 **测试**，用这个 Key 真实搜索一次。显示「✓ 可用」说明 Key 没问题。
4. 点页面底部的 **保存设置**。

![图库 API Key 卡片：Pexels 和 Pixabay 的 Key 输入框（已模糊处理）、显示和测试按钮，以及免费注册链接](/images/videoagents/world/stock-images-keys.webp)

需要知道的：

- Pexels 每小时 200 次、每月 20,000 次请求；Pixabay 每分钟 100 次。
- 输入框为空时，改用环境变量 `PEXELS_API_KEY` 和 `PIXABAY_API_KEY`。
- 素材库的视频搜索也用这两个 Key。

## 搜索和添加图片 {#search-and-add-images}

1. 在参考文件页，点要补充的板块上的 **🔎 图库**（例如 **👤 角色**）。这个板块就是目标板块。
2. 选择 **图源**：Openverse、Pexels 或 Pixabay。选择会被记住。
3. 输入关键词，按 Enter 或点 **搜索**。
4. 需要的话筛选结果：**全部方向**（横图、竖图、方图）和 **全部类型**（照片、插画 / 艺术品）。Pexels 只有照片，所以选它时不显示类型菜单。
5. 用下面两种方式之一添加图片：
   - **逐张添加：** 点结果下方的板块图标。图片直接进入那个板块，不管你是从哪个板块打开的图库。
   - **一次添加多张：** 点图片勾选，在底栏确认目标板块，可以写一条 **注释**，然后点 **加入参考文件**。
6. 点 **✕** 或按 Esc 关闭窗口。参考文件页会显示新文件。

![图库窗口：选中了 Openverse，有搜索框、译成英文和搜索按钮、方向和类型筛选，底栏是目标板块、注释输入框和加入参考文件按钮](/images/videoagents/world/stock-images-dialog.webp)

点结果上的 **🔍** 可以看大图，以及作者、来源页、许可和尺寸。也可以在那里直接添加。

需要知道的：

- 底栏的注释只对加入目标板块的图片生效。之后随时可以在参考文件页添加或修改注释。
- **加载更多** 获取下一页结果。
- 状态行显示结果数；如果图库提供，还会显示剩余额度。
- 24 小时内相同的搜索走缓存，不消耗额度。

## 把搜索词译成英文 {#translate-a-search-into-english}

Openverse 的图片标题大多是英文，用其他语言搜，结果很少。关键词里有中文、日文或韩文时，**译成英文** 可以点。它用 Agentics 引擎当前的文本模型把关键词译成英文，再搜一次。每点一次调用一次模型。

## 图源和许可 {#image-sources-and-licenses}

| 图源 | Key | 内容 | 许可 |
| --- | --- | --- | --- |
| **Openverse** | 不需要 | 来自 Flickr、Wikimedia Commons、Europeana、大都会艺术博物馆、史密森学会、克利夫兰艺术博物馆等馆藏的开放许可图片 | 只提供 CC0、公有领域和 CC BY。CC BY 图片如果出现在成片里，需要署名 |
| **Pexels** | 需要 | 照片 | Pexels License：可商用，无需署名 |
| **Pixabay** | 需要 | 照片和插画 | Pixabay Content License：可商用，无需署名；含商标的图片不能商用 |

没有 Key 时，Openverse 每分钟可搜 20 次、每天 200 次，每次最多 240 条结果。如果你在 **🎨 生成模型** 页为音效保存过 Openverse 的 Client ID 和 Secret，图片搜索也会使用它们。

## 保存了什么 {#what-gets-saved}

- 图片下载到 `refs/<section>/`，文件名类似 `openverse_1a2b3c4d.jpg` 或 `pexels_123456.jpg`。长边超过 2,560 px 的图片缩小到 2,560 px；透明图片保持 PNG。
- 同一张图再次加入同一个板块，不会重复下载。
- 来源信息（网站、作者、许可、页面、署名行和你的搜索词）保存在 `refs/annotations.json`。卡片在文件名下方显示来源，CC BY 许可标为黄色。
- `refs/CREDITS.md` 列出所有导入的图片，并标出 CC BY 的那些。每次导入或删除时都会重写。

::: tip 提示
只用来指导 Agent、不出现在画面里的图片不需要署名。如果 CC BY 图片最终出现在成片、封面或宣传物料里，在片尾字幕或发布说明里使用 `refs/CREDITS.md` 中它的署名行。
:::

从图库来的图片和你上传的图片一样对待：Agent 按它所在的板块和你的注释使用。

## 常见问题 {#troubleshooting}

**Pexels 或 Pixabay 是灰色的。**
在 **⚙️ → 存储与图库** 里添加它的 Key 并保存。然后重新打开参考文件页：图源列表在每次打开页面时加载一次。

**在 Openverse 上几乎搜不到东西。**
用几个简短的英文关键词。如果关键词是其他语言，试试 **译成英文**。

**「译成英文」失败。**
翻译使用 Agentics 引擎当前的渠道。检查它是否配置了文本模型，或者自己输入英文关键词。

## 相关文档 {#related}
- [参考文件](/zh/videoagents/world/reference-files)
- [生成参考图](/zh/videoagents/world/generate-reference-images)
- [对象存储与图库](/zh/videoagents/models/object-storage)
- [素材库](/zh/videoagents/project-types/footage-library)
