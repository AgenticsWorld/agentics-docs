---
title: 3D 模型服务商
description: 设置 Tripo、Fal、RunningHub 或本地 Hunyuan3D 服务，把参考图变成角色、生物和道具的 GLB 3D 模型。
tags: [providers, 3d, how-to]
order: 75
---

# 3D 模型服务商

**🧊 3D 模型** 卡片决定由哪个服务把参考图变成 3D 模型（GLB 文件）。你在参考文件页使用它：**🧊 3D 模型** 板块里的 **✨ 生成** 会用一张正面视图，加上可选的侧面和背面视图，为角色、生物或道具生成模型。

::: tip 提示
v1.0.45 之后新增。如果看不到，请更新 VideoAgents。
:::

## 打开设置 {#open-the-settings}

1. 打开 **⚙️ → 生成模型**。
2. 滚动到世界模型卡片下方的 **🧊 3D 模型** 卡片。
3. 点某个标签页，查看或修改这个服务商的设置，然后在卡片标题栏的 **生效渠道** 里选择默认服务商。

修改会自动保存。

![3D 模型卡片，当前打开 Tripo 标签页](/images/videoagents/models/3d-model-providers-card.webp)

## 服务商 {#providers}

| 标签页 | 是什么 | 需要填写 | 默认模型 |
| --- | --- | --- | --- |
| **Tripo** | Tripo3D 官方 API | **站点**、该站点的 **API Key**、**模型** | Tripo H3.1 |
| **Fal** | [fal.ai](https://fal.ai/dashboard/keys) 托管的 3D 端点 | **API Key**、**模型** | Hunyuan 3D 3.1 Pro |
| **RH** | RunningHub 的标准模型 API | **渠道**（站点）、该站点的 **API Key**、**文生 3D 模型**、**图生 3D 模型** | 两项都是 Hunyuan3D 3.1 |
| **本地 Hunyuan3D** | 你电脑或局域网里的 Hunyuan3D-2 服务 | **服务地址**、**服务端模型**、**纹理** | Hunyuan3D-2mini Turbo |

新安装时，生效渠道默认是 **Tripo**。参考文件页的生成对话框默认选中生效渠道，没有 Key 的服务商显示为灰色，并在浏览器里记住你上次的选择。

## Tripo {#tripo}

- **站点**：**tripo3d.ai(国际站)** 或 **tripo3d.com(国内站)**。两个站点的账号互不通用，选你的 Key 所属的站点。每个站点的 Key 分开保存。Key 在 Tripo 开放平台的 **API Keys** 页面获取（标签页上的链接会跟着站点切换）。
- **验证 Key** 显示你的可用积分，有冻结积分时也会显示。
- **模型**：H3.1（最新，质量最好）、H3.0（稳定；精细几何、四边面、智能低模、部件拆分）、H2.5（均衡）、P2（低模，48–50,000 面，可出四边面）和 P1（低模，50–20,000 面）。H 系列生成高细节模型，P 系列生成低模。
- 所有 Tripo 模型都支持多视图；需要正面视图加至少一个其他视图。

## Fal {#fal}

- 内置模型有 Hunyuan 3D 3.1 Pro 和 Rapid、Tripo H3.1 和 P2、Meshy 7.1、Hyper3D Rodin 2.5、TRELLIS 2、Hi3D 3.0、Idol Max 和 Idol Max Turbo。**自定义…** 可以填完整的端点 ID。
- **搜索 Fal 模型** 在 Fal 的图生 3D 和文生 3D 分类里搜索。点 **选用** 把结果填进 **模型**。
- Hunyuan 3D 3.1 Pro、Tripo H3.1、Meshy 7.1、Rodin 2.5 和 Hi3D 3.0 接受多个视图。Hunyuan 3.1 Rapid、Tripo P2、TRELLIS 2 和 Idol Max / Max Turbo 只接受一张图。Fal 上的 Tripo H3.1 按位置读取视图，所以没有左侧视图时，背面和右侧视图会被丢弃。
- Idol Max（约 50 秒）和 Idol Max Turbo（约 20 秒）返回约 30,000 个三角面、带纹理、可直接用于游戏的网格，结果始终带纹理。

## RH {#rh}

- 选择站点（runninghub.ai 或 runninghub.cn），填入该站点的 Key，和图像、视频的 RH 标签页一样。
- 只有文字描述时用 **文生 3D 模型**；有参考图时（包括多视图）用 **图生 3D 模型**。两个菜单都列出 RunningHub 文档里的 Hunyuan3D 3.1、Tripo、Hitem3D、Meshy 和 Miora 端点。
- 第一次打开这个标签页时会加载菜单，可能需要大约一分钟。

## 本地 Hunyuan3D {#local-hunyuan3d}

在你的电脑或局域网里的另一台机器上，运行 [Tencent-Hunyuan/Hunyuan3D-2](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) 自带的 `api_server.py`。它用你自己的 GPU，不消耗云端积分。

1. 填入 **服务地址**（默认 `http://127.0.0.1:8080`；`http://` 可以省略）。
2. 点 **验证**。它检查服务是否有响应、是否具备 VideoAgents 需要的接口，不会启动生成。服务正常时显示 **✓ 服务在线**。
3. 把 **服务端模型** 设成服务实际加载的模型。服务在启动时就选定了模型权重，所以这一项只是记录它运行的是哪个版本（Turbo 版需要 5 步，其他版本需要 30 步或更多）。
4. 只有服务以 `--enable_tex` 启动时才勾选 **纹理**。不勾选时得到的是不带纹理的网格。

官方原版服务只接受一张正面图。

## 生成模型 {#generate-a-model}

在 **参考文件** 页打开 **🧊 3D 模型** 板块，点 **✨ 生成**。填好 **正面** 槽位；如果是多视图模型，再填左侧、背面和右侧槽位。选择服务商和模型，然后生成。采用的模型保存在 `refs/models3d/`。参见 [3D 模型](/zh/videoagents/world/3d-models)。

::: warning 注意
Tripo、Fal 和 RH 每次生成都会向你的账号收费。
:::

## 相关文档 {#related}
- [3D 模型](/zh/videoagents/world/3d-models)
- [参考文件](/zh/videoagents/world/reference-files)
- [世界模型](/zh/videoagents/world/world-models)
- [ComfyUI](/zh/videoagents/models/comfyui)
