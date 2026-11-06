import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { sidebar, draftFiles, isBuild, warnUnknownTags } from './lib/content.js'
import { tagLabel } from './tags.js'
import { site, links } from './site.js'

if (isBuild) warnUnknownTags()

const description =
  'Guides for Agentics WorldOS (VideoAgents): build a virtual world with an AI crew, then create episodic video, novels and more inside it.'
const descriptionZh =
  'Agentics WorldOS（VideoAgents）使用文档：先由 AI 团队构建虚拟世界，再在世界里创作剧集视频、小说等作品。'

// MiniSearch splits text on spaces and punctuation, which leaves a whole Chinese sentence as one word.
// This tokenizer also cuts runs of CJK characters into overlapping pairs, so 白模 matches 白模系统.
// It is serialized into the page (VitePress turns config functions into source text), so it must not use
// anything from outside its own body.
const tokenize = (text) => {
  const cjk = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힯]+/g
  const tokens = []
  for (const word of String(text).split(/[\s\p{P}\p{S}]+/u)) {
    if (!word) continue
    // Latin parts of the word stay whole; each CJK run becomes its overlapping pairs (or itself if one character).
    for (const part of word.split(cjk)) if (part) tokens.push(part)
    for (const run of word.match(cjk) || []) {
      if (run.length === 1) tokens.push(run)
      for (let i = 0; i + 1 < run.length; i++) tokens.push(run.slice(i, i + 2))
    }
  }
  return tokens
}

const nav = {
  en: [
    { text: 'Tags', link: '/tags/', activeMatch: '^/tags/' },
    { text: 'Updates', link: links.updates },
    { text: 'Download', link: links.download, noIcon: true }
  ],
  zh: [
    { text: '标签', link: '/zh/tags/', activeMatch: '^/zh/tags/' },
    { text: '更新日志', link: links.updates },
    { text: '下载', link: links.download, noIcon: true }
  ]
}

export default defineConfig({
  title: 'WorldOS Docs',
  titleTemplate: ':title | Agentics WorldOS Docs',
  description,
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  // Drafts (`draft: true`) are shown by `npm run dev` and left out of the published site.
  srcExclude: isBuild ? draftFiles() : [],
  sitemap: { hostname: site.url },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/worldos-logo.png' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Agentics' }],
    ['meta', { property: 'og:image', content: 'https://agentics.world/worldos/media/storyboard-preview.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@AgenticsWorld' }],
    // Same Google Analytics property as agentics.world
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XHNFECL63F' }],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XHNFECL63F');"
    ]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description,
      themeConfig: {
        nav: nav.en,
        sidebar: { '/': sidebar('en') },
        editLink: { pattern: `${site.repo}/edit/main/docs/:path`, text: 'Edit this page on GitHub' },
        outline: { level: [2, 3], label: 'On this page' },
        notFound: {
          title: 'PAGE NOT FOUND',
          quote: 'This page is not in the world yet. It may have moved, or it has not been written.',
          linkLabel: 'Go to the docs home',
          linkText: 'Back to docs home'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'WorldOS 文档',
      titleTemplate: ':title | Agentics WorldOS 文档',
      description: descriptionZh,
      themeConfig: {
        nav: nav.zh,
        sidebar: { '/zh/': sidebar('zh') },
        editLink: { pattern: `${site.repo}/edit/main/docs/:path`, text: '在 GitHub 上编辑此页' },
        outline: { level: [2, 3], label: '本页内容' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        langMenuLabel: '切换语言',
        notFound: {
          title: '页面不存在',
          quote: '这个页面还不在这个世界里：它可能已经移动，或者还没有写。',
          linkLabel: '前往文档首页',
          linkText: '返回文档首页'
        }
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: links.github, ariaLabel: 'Agentics WorldOS on GitHub' },
      { icon: 'discord', link: links.discord, ariaLabel: 'Discord' },
      { icon: 'x', link: links.x, ariaLabel: 'X' }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: { options: { tokenize } },
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到结果',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  },

  // Tag pages come from one template per language (tags/[tag].md); give each its own title and description.
  transformPageData(pageData) {
    const tag = pageData.params && pageData.params.tag
    if (!tag) return
    const zh = pageData.relativePath.startsWith('zh/')
    const label = tagLabel(tag, zh ? 'zh' : 'en')
    pageData.title = zh ? `标签：${label}` : `Tag: ${label}`
    pageData.description = zh ? `标记为「${label}」的 WorldOS 文档。` : `Agentics WorldOS docs tagged ${label}.`
  },

  // Canonical URL and per-page Open Graph tags
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) return []
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = `${site.url}/${path}`
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },

  vite: {
    resolve: {
      // The brand in the top bar holds two links (agentics.world and the docs home), which the default
      // title component (a single link) cannot, so it is replaced.
      alias: [
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/NavBarTitle.vue', import.meta.url))
        }
      ]
    }
  }
})
