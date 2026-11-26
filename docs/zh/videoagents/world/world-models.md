---
title: 世界模型
description: 用 World Labs Marble 或你自己的 GPU（HunyuanWorld）从场景全景图生成可漫游的 3D 世界，在里面漫游并截取分镜背景图。
tags: [world-model, scenes, providers, how-to]
order: 78
---

# 世界模型

世界模型把场景的某张 [360° 全景图](/zh/videoagents/world/panoramas)变成一个可以在里面走动的 3D 世界。它与场景的 [3D 场景](/zh/videoagents/world/3d-sets)对齐，所以你可以在这个地点里漫游，从任意位置把视角保存为分镜背景图，还可以在导演台里把它当作背景。

世界模型是一个高斯泼溅（Gaussian splat）场景，由云端的 World Labs Marble 或你自己 GPU 机器上的 HunyuanWorld 生成。

## 开始之前 {#before-you-start}
- **已开启白模**（**🎛️ → 输出设置 → 白模**），并且场景有 3D 场景。否则不会出现 **🌍 世界模型** 面板。
- **场景至少有一张全景图。** 世界模型总是从全景图搭建。见 [360° 全景图](/zh/videoagents/world/panoramas)。
- **已配置世界模型服务商**：在 **⚙️ → 生成模型 → 🌍 世界模型** 里。卡片标题栏的 **生效渠道** 菜单决定运行哪一个：

  | 服务商 | 需要填写 | 说明 |
  | --- | --- | --- |
  | **World Labs**（Marble） | 你的 World Labs **API Key**（在 [platform.worldlabs.ai](https://platform.worldlabs.ai/api-keys) 创建）和一个模型：**Marble 1.1**（默认）、**Marble 1.1 Plus**（适合室外和大空间的更大世界，消耗更多 credits）、**Marble 1.0**、**Marble 1.0 Draft** | **验证 Key** 检查 Key 并显示剩余 credits |
  | **HunyuanWorld** | 你在 GPU 机器上运行的 worker 的 **worker 地址** 和 token。**高级参数** 里：视角数（默认 32）、训练步数（默认 8000）、FP8 量化（默认关） | **验证** 显示 GPU、是否忙碌和剩余磁盘空间。部署指南：[VideoAgents-hunyuan-rpc](https://github.com/AgenticsWorld/VideoAgents-hunyuan-rpc)。v1.0.40 起可用。 |

  这个页面上的其他卡片见[引擎和模型](/zh/videoagents/models/)。

::: warning 注意
每个 Marble 世界模型都会消耗你账户里的 World Labs credits。HunyuanWorld 不消耗 credits，但每个世界会占用你的 GPU 20–40 分钟。
:::

## 生成世界模型 {#generate-a-world-model}

1. 打开 **🏔 场景预览**，选择场景，在 **🌐 全景图** 下方找到 **🌍 世界模型**。
2. 在 **全景来源** 里选择要用的全景图，例如 **全景图 A1**。如果某个锚点有多个光照方案的全景图，名称后会加上方案名。
3. 点 **➕ 生成世界模型**。日志显示进度。Marble 大约需要 5–10 分钟，HunyuanWorld 大约需要 20–40 分钟。
4. 完成后，会出现新世界模型的卡片。

![The Long Hall 的世界模型面板：全景来源菜单、生成世界模型按钮和世界模型 W1 的卡片](/images/videoagents/world/world-models-section.webp)

每点一次就新增一个世界模型，依次编号为 W1、W2 等，已有的会保留。每张卡片显示正面预览图、所依据的全景图、模型和日期。有多个时，默认世界模型带有 **★ 默认** 标记。

如果场景还没有全景图，按钮是灰色的。点 **➕ 前往创建全景图** 跳到全景图面板，并打开创建表单。

## 漫游世界模型 {#explore-a-world-model}

点一张卡片，打开全屏查看器。

![The Long Hall 里的世界模型查看器，右侧打开了设置面板](/images/videoagents/world/world-models-viewer.webp)

| 动作 | 操作 |
| --- | --- |
| 环视 | 拖动 |
| 前进 / 后退 | W / S，或用滚轮前进 |
| 左 / 右 | A / D |
| 上升 / 下降 | Q / E |
| 加速 | 按住 Shift |
| 回到拍摄全景图的位置 | **⟲** |
| 关闭 | Esc 或 **✕** |

在设置输入框里打字时，这些按键不起作用。底部一行显示相机位置（单位米）、罗盘朝向（北 0°、东 90°）、俯仰角和视场角。

**⚙ 设置** 打开以下选项：

| 设置 | 作用 |
| --- | --- |
| **精度** | 加载多少个泼溅点：**500k**（默认）、**full_res**、**150k** 或 **100k**，取决于这个世界有哪些档位。越低加载越快。 |
| **白模线框** | 把 3D 场景以线框画在世界上，用来检查对齐 |
| **世界** | 显示或隐藏世界本身 |
| **yaw 微调°**、**尺度微调** | 微调世界与 3D 场景的对齐。**保存对齐微调** 为这个世界模型保留这些值。 |
| **设为默认世界模型** | 把它设为默认（已经是默认时，按钮显示 **已是默认世界模型**） |
| **在 Marble 中打开 ↗** | 在 World Labs 网站上打开这个世界（仅限 Marble 世界） |

## 截取分镜背景图 {#capture-background-plates}

走到一个视点，转动到虚线 16:9 框里是你想要的画面，点 **💾 背景图**。这个视角会作为场景的一张新分镜背景图保存，并记下相机位置。它会出现在 **🎦 分镜背景图** 里，标为「手工截取（世界模型）」，也会出现在分镜预览的 **换图** 列表里。见[分镜背景图](/zh/videoagents/create/background-plates)。

## 默认世界模型 {#the-default-world-model}

每个场景有一个默认世界模型：默认是第一个，除非你在 **⚙ 设置** 里另选。用到默认世界模型的地方：

- [导演台](/zh/videoagents/create/directors-console)：**世界模型视角** 用世界替换灰色的 3D 场景，并保留人物、道具、路径和摄像机。**对象透视**（默认开启）把它们画在墙的前面，方便你看清它们的移动；
- 旧版的 **世界模型** 背景图模式，一些现有项目仍在使用。

## 文件 {#files}

| 路径 | 内容 |
| --- | --- |
| `assets/concepts/scenes/<SCN-ID>/world/worlds/W<n>/` | 一个世界模型：`world.json`、泼溅文件 `splats_<quality>.spz`、`collider.glb`、`thumbnail.jpg`、`world_pano.jpg`、来源 `pano.png` 和 `input.json` |
| `assets/concepts/scenes/<SCN-ID>/world/index.json` | 哪个世界模型是默认的 |

支持多个世界模型之前生成的世界直接放在 `world/` 里，显示为 W1。

## 几点说明 {#good-to-know}
- **它只是大致贴合 3D 场景。** 世界是从一张图片重建出来的，所以墙的位置可能和 3D 场景稍有偏差。打开 **白模线框**，用微调把它对齐。
- **在全景图附近效果最好。** 离拍摄全景图的位置越远，世界越容易崩坏。大场景可能需要用不同位置的全景图搭建多个世界模型。
- **Marble 的限制。** World Labs 大约允许每分钟 3 次、每小时 60 次世界请求。
- **HunyuanWorld 的限制。** 一个 worker 同一时间只运行一个任务；如果它正忙，稍后再试。首次运行会下载约 60 GB 的模型权重。清晰度受训练视角限制（默认 1600 × 900），所以要从清晰的全景图开始。
- **HunyuanWorld 许可。** HunyuanWorld-1.0 社区许可不覆盖欧盟、英国和韩国，月活用户超过 100 万的产品需要从腾讯获得许可。详情见 worker 仓库的 README。

## 常见问题 {#troubleshooting}

**没有 🌍 世界模型 面板。**
项目关闭了白模，或者场景没有 3D 场景。

**➕ 生成世界模型 是灰色的。**
场景还没有全景图，或者此刻正有一个世界模型在生成。

**查看器加载世界失败。**
打开 **⚙ 设置**，选一个更低的 **精度**。

## 相关文档 {#related}
- [360° 全景图](/zh/videoagents/world/panoramas)
- [3D 场景](/zh/videoagents/world/3d-sets)
- [分镜背景图](/zh/videoagents/create/background-plates)
- [导演台](/zh/videoagents/create/directors-console)
- [3D 模型服务商](/zh/videoagents/models/3d-model-providers)
