---
title: 对象存储与图库
description: 接入一个私有对象存储桶，让本地文件能交给视频模型；再填好 Pexels 和 Pixabay 的 Key，用来检索免费图片和视频素材。
tags: [storage, providers, how-to]
order: 85
---

# 对象存储与图库

**📦 存储与图库** 页管两件事：一个对象存储桶，让 VideoAgents 能以临时链接的形式把本地文件交给视频服务；以及检索免费图库图片用的 API Key。

从 **⚙️ → 存储与图库** 打开。和生成模型页不同，这个页面有 **保存设置** 按钮：改完之后要点它。

## 对象存储 {#object-storage}

有些服务只接受公网 URL 形式的文件。VideoAgents 先把文件上传到你的存储桶，再发送一个会过期的预签名链接；存储桶本身保持私有。用到它的地方有：

- **发给火山方舟的参考视频。** 方舟要求参考视频必须是公网 URL，不接受内联数据，例如用参考视频修复片段时。
- **虚拟人像资产库。** 把图片登记到方舟需要公网 URL。参见[虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)。
- **MiniMax Regenerate-2K 超分的较大源片段。**

如果不用这些功能，就不需要对象存储。

![存储渠道卡片，当前打开火山引擎 TOS 标签页，所有字段已模糊处理](/images/videoagents/models/object-storage-storage.webp)

### 设置存储桶 {#set-up-a-bucket}

1. 在你的云服务商那里创建一个私有存储桶，以及一个能向它写入的访问密钥。
2. 在 **📦 存储渠道** 卡片上点这个服务商的标签页。保存后，选中的标签页（✅）就是生效渠道。
3. 填好各项，点 **保存设置**。

| 字段 | 填什么 | 默认值 |
| --- | --- | --- |
| 访问密钥 / 私密密钥 | 账号的密钥对（视服务商不同，名称为 AccessKey / SecretKey、AccessKey ID / Secret、SecretId / SecretKey 或 Access Key / Secret Key） | — |
| **Bucket** | 存储桶名 | — |
| **Endpoint** | 服务商在存储桶所在地域的访问域名 | TOS `tos-cn-beijing.volces.com`，OSS `oss-cn-beijing.aliyuncs.com` |
| **Region** | 存储桶所在地域 | TOS `cn-beijing`，COS `ap-beijing`，S3 `us-east-1` |
| **对象前缀** | 上传文件在存储桶里存放的文件夹 | `genmedia-refs/` |
| **链接有效期(秒)** | 每个预签名链接的有效时长 | `86400`（一天） |

### 服务商 {#providers}

| 标签页 | 说明 |
| --- | --- |
| **火山引擎 TOS** | 配合火山方舟时推荐使用：同一账号、同一地域，方舟拉取文件最快。在 [TOS 控制台](https://console.volcengine.com/tos)创建存储桶，在[密钥管理](https://console.volcengine.com/iam/keymanage)里创建密钥。要用 IAM AccessKey，不是 `ark-` 开头的 API Key |
| **阿里云 OSS** | RAM 用户的 AccessKey ID 和 Secret。Endpoint 已包含地域，Region 可以留空。北京的存储桶离方舟近 |
| **腾讯云 COS** | CAM 的 SecretId 和 SecretKey。存储桶名必须带 APPID 后缀，例如 `mybucket-1250000000`。Endpoint 留空，会按 Region 自动确定 |
| **S3 兼容** | AWS S3、Cloudflare R2、MinIO、Backblaze B2 等。用 AWS 时 Endpoint 留空；R2 填 `https://<account ID>.r2.cloudflarestorage.com`，Region 填 `auto`。中国以外的存储桶，方舟拉取可能较慢或不稳定 |

::: tip 提示
给对象前缀下的文件加一条 7 天后自动删除的生命周期规则，旧的上传文件会自行清理。
:::

从源码运行时，每个服务商都需要对应的 Python 包：`pip install tos`、`oss2`、`cos-python-sdk-v5` 或 `boto3`。

## 图库 {#stock-image-libraries}

**🖼 图库 API Key** 卡片保存参考文件页 **🔎 图库** 用的 Key。图库会检索免费的图库图片，把你选中的加入某个参考板块。素材库的视频搜索也用这些 Key。

![图库 API Key 卡片，Pexels 和 Pixabay 的 Key 已模糊处理](/images/videoagents/models/object-storage-stock.webp)

| 图库 | Key | 限额 |
| --- | --- | --- |
| Openverse | 不需要 | — |
| Pexels | 在 [pexels.com/api](https://www.pexels.com/api/) 免费申请 | 每小时 200 次，每月 20,000 次 |
| Pixabay | 在 [pixabay.com/api/docs](https://pixabay.com/api/docs/) 免费申请；登录后那个页面上会直接显示你的 Key | 每分钟 100 次 |

1. 把 Key 粘贴到 **Pexels** 或 **Pixabay** 旁边。
2. 点 **测试**。Key 可用时显示 **✓ 可用**，以及搜索「mountain」得到的结果数。
3. 点 **保存设置**。

填了 Key 之后，就能在图库里选用 Pexels 和 Pixabay。某个字段为空时，VideoAgents 会从环境变量读取 `PEXELS_API_KEY` 或 `PIXABAY_API_KEY`。

参见[图库图片检索](/zh/videoagents/world/stock-images)。

## 常见问题 {#troubleshooting}

**虚拟人像资产库提示对象存储自检失败。**
生效的存储标签页缺少存储桶或密钥，或者（从源码运行时）没有安装它的 Python 包。把生效的标签页填完整，保存，再重新加载资产库页面。

**视频服务商拉取不到参考文件。**
检查链接有效期是否够这个任务用，以及服务商能否访问存储桶所在的地域。用火山方舟时，同一地域的 TOS 存储桶效果最好。

## 相关文档 {#related}
- [虚拟人像资产库](/zh/videoagents/models/virtual-avatar-library)
- [图库搜图](/zh/videoagents/world/stock-images)
- [参考文件](/zh/videoagents/world/reference-files)
- [视频模型](/zh/videoagents/models/video-models)
