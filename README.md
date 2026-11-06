# Agentics WorldOS Docs

Source of **https://docs.agentics.world**, the documentation of [Agentics WorldOS](https://agentics.world/worldos/) (VideoAgents). Built with [VitePress](https://vitepress.dev) in the agentics.world style; English at `/`, 简体中文 at `/zh/`.

以下是维护说明。

## 发布

**把改动推到 `main` 就会发布。** GitHub Actions（`.github/workflows/deploy.yml`）构建站点并发布到 GitHub Pages，通常 1–2 分钟后 docs.agentics.world 就能看到。进度在仓库的 **Actions** 页；构建失败时网站保持上一版不变。

提 Pull Request 时也会构建一遍（不发布），可以在合并前发现写错的页面。

## 本地预览

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev        # http://localhost:5173 ，改了 Markdown 立即刷新；草稿也会显示
npm run build      # 和线上一样的构建；未登记的标签会在这里打印警告
npm run preview    # 预览 build 的结果
```

新增或删除文件后侧栏不会自动更新，重启 `npm run dev` 即可。

## 写一篇文档

1. 复制 `templates/doc.md` 到对应分类目录，例如 `docs/world/characters.md`（中文版放 `docs/zh/world/characters.md`）。文件名就是网址：`/world/characters`。
2. 填好 frontmatter：

   | 字段 | 说明 |
   | --- | --- |
   | `title` | 标题，用于侧栏、列表卡片和浏览器标题 |
   | `description` | 一句话简介，用于列表、搜索结果和分享卡片 |
   | `tags` | 标签 id 列表，见下方“标签” |
   | `order` | 分类内排序，小的在前；不写则排在有序号的文档之后，按标题排 |
   | `draft` | `true` 时只在本地 `npm run dev` 显示，不会发布 |

3. 推到 `main`。侧栏、分类页、首页卡片的文档数、标签页都会自动更新，不需要改任何配置。

中英文是两棵独立的目录树，可以只写其中一种语言。右上角的语言切换会跳到另一种语言的同名路径，所以两边用同样的文件名；某篇还没有译文时，切换过去会是 404 页（页面上有返回文档首页的链接）。

一个分类里文档多了，可以建子目录分组：`docs/create/directing/whitebox.md`，子目录里放一个 `index.md`（写 `title`、`order`）作为分组名和分组页，侧栏会显示为可折叠的小组。

**图片**放在 `docs/public/images/<分类>/`，在文中写 `![说明](/images/world/sheet.jpg)`；也可以放在文档旁边用相对路径引用。

**站内链接**写不带 `.md` 的绝对路径：`[场景](/world/scenes)`、`[场景](/zh/world/scenes)`。

**提示框**：`::: tip`、`::: warning`、`::: danger`、`::: details`，用 `:::` 结束。

## 目录结构

```text
docs/
  index.md                 首页（分类卡片和相关资源，内容来自各分类的 index.md）
  <分类>/index.md          分类页：frontmatter 写 title、description、order；正文里的 <CategoryIndex /> 列出本分类文档
  <分类>/<文档>.md         文档
  tags/                    标签总览页与每个标签的页面（自动生成，不用改）
  zh/                      中文，结构同上
  public/                  原样复制到网站根目录的文件（图标、robots.txt、图片）
  .vitepress/
    config.js              站点配置：导航、语言、搜索、SEO
    tags.js                标签登记表（id、中英文名、分组）
    site.js                主站、下载、GitHub 等链接
    lib/content.js         扫描 Markdown 与 frontmatter，生成侧栏、标签页和草稿列表
    theme/                 agentics.world 风格主题（样式、顶栏、页脚、列表组件）
templates/doc.md           新文档模板（不会被发布）
```

## 文档分类

分类按 WorldOS 的产品结构划分：先装好、理解概念，然后按“构建世界 → 在世界中创作”的主流程，再到项目类型、引擎模型、控制台、扩展和参考。下面的主题是建议，按需要写，没写的不会出现在网站上。

| # | 目录 | 分类 | 对应产品部分 | 建议主题 |
| --- | --- | --- | --- | --- |
| 01 | `getting-started` | Getting Started / 快速开始 | README Quickstart | 什么是 WorldOS；安装桌面应用（Mac / Windows）；从源码运行；选择并登录 Agent 引擎；配置服务商；第一个世界（新建项目、导入小说）；从 VideoAgents 更名说明 |
| 02 | `concepts` | Core Concepts / 核心概念 | `agents/README.md`、`agents/WORKFLOW.md` | 世界与作品两层结构；项目与项目文件夹；Agent 团队与 17 个部门；工作流 DAG 与阶段；人工签字点（H 门）；文件而非黑盒（产物、运行记录、版本）；修改师与修改流程 |
| 03 | `world` | Build the World / 构建世界 | `agents/02`–`06`，声线 `09` | 世界圣经；角色、服装与参考图；声线；生物与坐骑；场景、俯视布局与背景图；道具；画面风格库；3D 白模场景；360° 全景与世界模型（Marble / HunyuanWorld）；音乐库 |
| 04 | `create` | Create Inside It / 在世界中创作 | `agents/01`、`07`–`12` | 剧本与剧本预览；分镜与动态分镜；白模预演与机位；导演台；提示词与图像、视频生成；对白、音乐与音效；剪辑、字幕与包装；后期工作台；八项质量审核；发布到各平台 |
| 05 | `project-types` | Project Types / 项目类型 | 项目类型、`agents/15`–`18`、`plugins/` | 影视剧集与衍生模式；音频配画；数字人；混剪；动效短片；衍生小说与融合小说；有声剧 |
| 06 | `models` | Engines & Models / 引擎与模型 | ⚙️ 设置 → 生成模型 | Agent 引擎对比（Agentics 内置、Claude Code、Codex CLI、Kimi Code、Pi、OpenCode、Grok Build、Antigravity CLI）；图像 / 视频 / 语音 / 音乐 / 音效 / 数字人 / 超分服务商；ComfyUI（本地、Comfy Cloud、RunningHub）；对象存储；NSFW 模式与备用模型；成本控制 |
| 07 | `console` | Console & Settings / 控制台与设置 | Web 控制台、🎛️ 项目设置、⚙️ 全局设置 | 控制台导览；各预览页；新建项目向导；项目设置（输出、审核、视频节奏、模型限制、构想与风格）；自动运行；资源消耗；Agent 高级设置；界面语言；手机消息（微信、飞书、WhatsApp）；项目导入导出 |
| 08 | `extend` | Plugins, Skills & API / 插件、技能与 API | `plugins/`、技能、`/api/v1` | 安装插件；编写插件（plugin.json、SOUL.md、workflows）；技能（SKILL.md）；示例项目；本地 API 与 OpenAPI；实时事件（SSE） |
| 09 | `reference` | Reference & Help / 参考与帮助 | `docs/ARCHITECTURE.md`、`.env.example`、`SECURITY.md` | 项目目录结构；配置与环境变量；安全默认值与局域网访问；命令行（`videoagents-web`、`videoagents-api`、`make run-auto`）；术语表；常见问题；问题排查 |

**新增分类**：建目录 `docs/<id>/index.md`（和 `docs/zh/<id>/index.md`），frontmatter 写 `title`、`description`、`order`，正文放 `<CategoryIndex />`。首页卡片和侧栏会自动出现。

## 标签

分类回答“这篇在哪”，标签回答“还有哪些相关的”：一篇文档只属于一个分类，但可以有多个标签。每篇建议 2–5 个，通常是 **一个难度 + 适用的项目类型 + 主题 + 文档类型**。

登记表在 `docs/.vitepress/tags.js`，同时定义中英文显示名和标签页上的分组：

| 分组 | 标签 id |
| --- | --- |
| 难度 | `beginner` `advanced` |
| 项目类型 | `film` `audio-to-video` `digital-human` `mashup` `motion-graphics` `novel` `audio-drama` |
| 世界构建 | `world-bible` `characters` `voice` `creatures` `scenes` `props` `art-style` `3d` `world-model` `music` |
| 制作 | `screenplay` `storyboard` `directing` `image-generation` `video-generation` `audio` `editing` `qa` `publishing` `sign-off` |
| 模型与系统 | `engines` `providers` `comfyui` `cost` `nsfw` `automation` `storage` `plugins` `skills` `api` `security` |
| 平台 | `macos` `windows` `source` |
| 文档类型 | `tutorial` `how-to` `troubleshooting` `reference` |

- 每个用到的标签自动生成页面：`/tags/<id>`（中文 `/zh/tags/<id>`），总览在 `/tags/`。只出现被文档用到的标签。
- 文档底部显示它的标签，分类页和标签页的文档卡片上也会显示。
- 新标签先加到 `tags.js`；未登记的标签也能用（显示为 id），但 `npm run build` 会打印警告，方便发现拼写错误。

## 托管与域名

- GitHub Pages（Settings → Pages，来源为 GitHub Actions），自定义域名 `docs.agentics.world`，强制 HTTPS。
- DNS：Route 53 托管区 `agentics.world`（`Z0796375CVZ17QQT5CB2`）中的 CNAME `docs.agentics.world → agenticsworld.github.io`。
- agentics.world 的入口在 `agentics-front` 仓库：WorldOS 页顶栏的 **Guide**（`www-agentics/src/components/videoagents/VideoAgentsNav.vue`）和首页页脚 WorldOS 列的 **Guide**（`www-agentics/src/components/FooterSection.vue`），地址都来自 `www-agentics/src/content/videoagents/site.js` 的 `links.docs`。
- 统计使用与 agentics.world 相同的 Google Analytics（`G-XHNFECL63F`）。
