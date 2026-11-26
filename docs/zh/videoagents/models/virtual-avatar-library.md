---
title: 虚拟人像资产库
description: 把角色图片登记到火山方舟的私域虚拟人像库，让 Seedance 接受写实人脸作为参考图；可以手动登记，也可以全自动管理。
tags: [characters, video-generation, advanced, how-to]
order: 95
---

# 虚拟人像资产库

火山方舟的视频模型（Seedance）会拒收看起来像真人的参考图。登记在方舟私域虚拟人像库里的图片可以通过：VideoAgents 以资产链接（`asset://<id>`）的形式发送它们，而不是直接发送图片。本页介绍怎样把 VideoAgents 接入这个库。

只有当视频服务商是火山引擎、并且你的角色是写实人脸时才需要它。

## 开始之前 {#before-you-start}
- 在火山方舟开通 **高级创作权益包**。私域虚拟人像库需要它。
- 在火山引擎控制台的 **API 访问密钥管理** 里创建 IAM **Access Key** 和 **Secret Key**。它不是生成时用的 `ark-` 开头的 API Key。
- 设置好[对象存储](/zh/videoagents/models/object-storage)。方舟只从公网 URL 登记图片，所以本地图片要先上传到你的存储桶。页面上的 **对象存储自检** 一行会告诉你存储是否就绪。

## 打开资产库 {#open-the-library}

打开 **⚙️ → 高级 → 虚拟人像资产库**。

![虚拟人像资产库页面的使用前准备卡片](/images/videoagents/models/virtual-avatar-library-setup.webp)

## 启用 {#turn-it-on}

1. 在 **🔑 密钥与开关** 卡片上填入 **Access Key** 和 **Secret Key**。留空时，使用存储与图库页上火山引擎 TOS 标签页的密钥。
2. 把 **ProjectName** 设为你生成视频所用 API Key 所属的方舟项目（通常是 `default`）。素材按方舟项目分开保存。
3. 点 **保存设置**。
4. 点 **启用**。标记从 **已停用** 变为 **已启用**，并出现 **🗂 已入库素材** 列表。

![密钥与开关卡片，密钥已模糊处理](/images/videoagents/models/virtual-avatar-library-credentials.webp)

## 登记图片 {#register-images}

**手动登记。** 资产库启用后，人物预览页上的每张角色图片都会出现 **入库** 按钮。登记要经过方舟审核：素材从 **审核中** 变为 **可用**（或 **失败**）。只有 **可用** 的素材会被使用。重新生成某个组时，它处于可用状态的参考图会自动以资产链接发送。

**全自动管理。** 勾选 **全自动管理** 并保存。视频服务商是火山引擎时，每一集开始生成视频之前：

1. 这一集第一次生成视频时，先清空资产库（方舟限制了库里能存放的素材数量）。
2. 登记这一集各组提示词用到的所有角色图片。
3. 生成最多等待 10 分钟，让审核结果变为可用。

同一集之后的运行会跳过已登记的图片。失败只会在这次运行的进度行里显示警告，从不阻塞生成。因为每一集都会清空资产库，这个选项适合角色数量较少的项目。

勾选 **生物入库**，可以把生物图片（来自 `assets/concepts/creatures/`）和角色一起登记。

**长镜头。** 项目使用长镜头、且视频模型是火山方舟上的 Seedance 2.x 时，上一个组的尾帧或尾段会在下一个组接着生成之前自动登记。

## 管理已入库素材 {#manage-registered-assets}

**🗂 已入库素材** 列表显示库里的每个素材，包括名称、ID、时间和状态。

- 输入名称后点 **搜索**；**刷新** 重新加载列表。
- **🗑 删除** 删除一个素材。**🗑 全部删除** 清空资产库。

::: warning 注意
删除素材后无法恢复。
:::

## 常见问题 {#troubleshooting}

**Seedance 视频因隐私原因被拒。**
有参考图没有登记，或者它的审核还没变为可用。在人物预览页登记它，或者打开全自动管理。不要为了绕过检查而重画人脸。

**登记立即失败。**
查看页面顶部的 **对象存储自检** 一行。没有可用的对象存储，方舟拉取不到图片。

**登记过的图片没有被使用。**
检查 **ProjectName** 是否和生成模型页上方舟 API Key 所属的项目一致。

## 相关文档 {#related}
- [角色](/zh/videoagents/world/characters)
- [对象存储与图库](/zh/videoagents/models/object-storage)
- [视频模型](/zh/videoagents/models/video-models)
- [长镜头与连贯性](/zh/videoagents/create/long-takes)
