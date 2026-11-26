---
title: 图像模型
description: 选择绘制角色设定图、场景、道具、关键帧和故事板草图的服务商与模型，并填写各服务商需要的 Key。
tags: [providers, image-generation, how-to]
order: 30
---

# 图像模型

项目里所有静态图都由图像模型绘制：角色和服装设定图、场景图和分镜背景图、生物、道具、关键帧、封面和故事板草图。你在生成模型页为整个应用选定一个服务商和模型，部分预览页还可以单独覆盖这个设置。

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 找到 **🖼 图像模型** 卡片。
3. 点某个标签页，查看或修改这个服务商的设置。
4. 在卡片标题栏右侧的 **生效渠道** 里，选择 Agent 实际使用的服务商。✅ 标在它的标签上。

输入框失去焦点或菜单改动时，修改会自动保存，页面右上角显示 **✓ 已自动保存**。

![图像模型卡片，当前打开 Fal 标签页](/images/videoagents/models/image-models-card.webp)

## 服务商 {#providers}

| 标签页 | 是什么 | 需要填写 | 默认模型 |
| --- | --- | --- | --- |
| **Agentics** | 你的 VideoAgents 桌面端账号 | 不用填，登录即可。选一个 **文生图模型** 和一个 **图生图模型** | MiniMax-H3-Image（`minimax-h3-image-t2i` / `minimax-h3-image-i2i`）；v1.0.45 及更早版本为 FLUX.2 dev |
| **OpenRouter** | [OpenRouter](https://openrouter.ai) 上的图像模型 | **API Key**（`sk-or-v1-…`）、**模型** | Seedream 4.5 |
| **火山引擎** | [火山方舟](https://console.volcengine.com/ark/)上的 Seedream | 方舟 **API Key**、**模型** | Seedream 5.0 Pro |
| **BytePlus** | [BytePlus ModelArk](https://console.byteplus.com/ark) 上的 Seedream（中国以外地区） | ModelArk **API Key**、**模型** | Seedream 5.0 Lite |
| **Fal** | [fal.ai](https://fal.ai/dashboard/keys) 托管的图像端点 | **API Key**、**模型** | Seedream 5.0 Lite |
| **RH** | RunningHub 的标准模型 API | **渠道**（站点）、该站点的 **API Key**、**文生图模型**、**图生图模型** | Seedream 5.0 Lite |
| **ComfyUI** | 你自己的工作流，运行在本地 ComfyUI、Comfy Cloud 或 RunningHub 上 | 参见 [ComfyUI](/zh/videoagents/models/comfyui) | — |

新安装时，生效渠道默认是 **Agentics**。

### 什么时候用哪个模型 {#which-model-is-used-when}

出图任务有两种：只有文字，或者带参考图（角色设定图、场景、之前的版本）。服务商会自动处理：

- **Agentics、RH 和 ComfyUI** 有两项设置，一项用于文生图，一项用于图生图。只要附了参考图，就用图生图那一项。
- **Fal**：你选的是一个模型系列；没有参考图时用文生图端点，有参考图时用编辑端点。尺寸、参考图上限和 seed 按各模型分别映射。
- **OpenRouter、火山引擎、BytePlus**：一个模型两种都能做。

## 各服务商说明 {#provider-notes}

**OpenRouter。** 点 **验证 Key** 检查 Key，会显示你的额度。模型列表从 OpenRouter 的模型目录加载，推荐模型排在最前（标 ⭐）。如果目录加载失败，会显示推荐列表；点 **刷新列表** 重试。其他模型 ID 选 **自定义…** 填写。

**火山引擎和 BytePlus。** 模型菜单列出在售的 Seedream 版本。要用更新的模型，选 **自定义…**，填入它的 Model ID 或推理接入点 ID（`ep-…`）。Seedream 5.0 Pro 和 Flash 要求输出至少 1280×720。BytePlus 默认用 Seedream 5.0 Lite，因为用它生成的带人脸图片默认能通过 Seedance 视频审核。

**Fal。** 内置列表包括 Seedream 5.0 Lite / Pro / Flash 和 4.5、Nano Banana 2.1 / Pro / 2、GPT Image 2.5 和 2、FLUX.3、FLUX.2 Pro / Max、FLUX Kontext Max、Qwen Image 3、HunyuanImage 3.0 和 Ideogram V4.5。要用其他模型：

1. 在 **搜索 Fal 模型** 里输入关键词（例如 `flux`），点 **搜索**。留空则列出热门模型。
2. 点结果旁的 **选用**。它会填进 **模型** 并保存。

标有 **按参数表自动适配** 的结果不在内置列表里：请求按该端点的参数表构建，尺寸取最接近的支持值，端点不接受的输入（例如参考图）会直接报错。Fal 的 Key 和视频模型卡片共用，只需填一次。

**RH。** 在 **渠道** 里选站点（runninghub.ai 或 runninghub.cn）。两个站点的账号和 Key 互不通用，各自的 Key 分开保存。第一次打开这个标签页时，会从 RunningHub 的文档读取模型菜单（大约一分钟），之后缓存一天；**刷新模型列表** 会重新读取。RH 模型 API 只接受企业共享 API Key。

**MiniMax。** 还有一个用于 Image-01 的 MiniMax 标签页，但只有它已经是生效渠道时才会显示。

## 在页面上覆盖图像模型 {#override-the-image-model-on-a-page}

有些页面顶部有自己的 **🎨 图像模型** 菜单：故事板（用于草图），以及场景预览、人物预览、生物预览和道具预览。**跟随全局** 表示沿用生成模型页的设置；选一个服务商和模型，就只对这类图片改用它。例如，用便宜、快速的模型画故事板草图。这个选择按图片类型保存，不按项目保存。

画板页有自己的服务商和模型菜单，只对在该页做的编辑生效。参见[画板：编辑图片](/zh/videoagents/world/image-canvas)。

## 几点说明 {#good-to-know}
- 每次生成都会记录所用的模型、服务商和参考图。参见[文件、运行与版本](/zh/videoagents/concepts/files-and-runs)。
- 开启 **NSFW 模式** 后，被标记的工作可以改用单独的备用图像模型。参见 [NSFW 模式](/zh/videoagents/models/nsfw-mode)。
- 费用由各服务商向你自己的账号收取。参见[成本控制](/zh/videoagents/models/cost-control)。

## 常见问题 {#troubleshooting}

**在生效渠道里选了 Agentics，又跳了回去。**
Agentics 渠道需要桌面应用和已登录的账号。原因会显示在页面右上角。

**火山引擎模型报错「ClosedEndpoint」之类。**
火山会下线旧的 Seedream 版本。从菜单里选模型，菜单列出的是在售版本。

**搜索到的 Fal 模型出错。**
它可能不接受任务发送的输入，例如参考图。从内置列表里选，或者选标有 **已内置适配** 的模型。

## 相关文档 {#related}
- [设置服务商](/zh/videoagents/getting-started/set-up-providers)
- [图像与视频生成](/zh/videoagents/create/image-and-video-generation)
- [生成参考图](/zh/videoagents/world/generate-reference-images)
- [ComfyUI](/zh/videoagents/models/comfyui)
- [成本控制](/zh/videoagents/models/cost-control)
