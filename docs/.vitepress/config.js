import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { scanPages, sidebars, productNav, draftFiles, isBuild, warnUnknownTags } from './lib/content.js'
import { writeRedirects } from './lib/redirects.js'
import { writeLlms, markdownCopyUrl } from './lib/llms.js'
import { restartOnPageChanges } from './lib/dev-restart.js'
import { tagLabel } from './tags.js'
import { site, links } from './site.js'

if (isBuild) warnUnknownTags()

const description = 'Guides for every Agentics product: install it, learn how it works, and get the most out of it.'
const descriptionZh = 'Agentics 各产品的使用文档：安装、理解它如何工作，以及用好它的每一项功能。'

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

// One entry per product (a menu of the `nav` links in its index.md), then the tags shared by all products.
const nav = {
  en: [...productNav('en'), { text: 'Tags', link: '/tags/', activeMatch: '^/tags/' }],
  zh: [...productNav('zh'), { text: '标签', link: '/zh/tags/', activeMatch: '^/zh/tags/' }]
}

// The product each page belongs to, by path relative to docs/, for page titles and share images.
const productOfPage = (() => {
  const all = scanPages({ includeDrafts: true })
  const productPages = new Map(all.filter((p) => p.kind === 'product').map((p) => [`${p.lang}/${p.product}`, p]))
  return new Map(all.map((p) => [p.relativePath, productPages.get(`${p.lang}/${p.product}`)]))
})()

// The Markdown copy of each product page (written by lib/llms.js), linked from the page's head. The docs homes
// link to the llms.txt index of their language instead.
const markdownOfPage = new Map([
  ...scanPages().map((p) => [p.relativePath, markdownCopyUrl(p)]),
  ['index.md', `${site.url}/llms.txt`],
  ['zh/index.md', `${site.url}/zh/llms.txt`]
])

export default defineConfig({
  title: 'Agentics Docs',
  titleTemplate: ':title | Agentics Docs',
  description,
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  // Drafts (`draft: true`) are shown by `npm run dev` and left out of the published site.
  srcExclude: isBuild ? draftFiles() : [],
  sitemap: { hostname: site.url },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Agentics' }],
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
        sidebar: sidebars('en'),
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
      title: 'Agentics 文档',
      titleTemplate: ':title | Agentics 文档',
      description: descriptionZh,
      themeConfig: {
        nav: nav.zh,
        sidebar: sidebars('zh'),
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
      { icon: 'github', link: links.github, ariaLabel: 'Agentics on GitHub' },
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

  transformPageData(pageData) {
    const zh = pageData.relativePath.startsWith('zh/')

    // Tag pages come from one template per language (tags/[tag].md); give each its own title and description.
    const tag = pageData.params && pageData.params.tag
    if (tag) {
      const label = tagLabel(tag, zh ? 'zh' : 'en')
      pageData.title = zh ? `标签：${label}` : `Tag: ${label}`
      pageData.description = zh ? `标记为「${label}」的 Agentics 文档。` : `Agentics docs tagged ${label}.`
      return
    }

    // A product's pages are titled after it: "Chat commands | VideoAgents Docs", and its home (titled with the
    // product's name) "VideoAgents Docs | Agentics".
    const product = productOfPage.get(pageData.relativePath)
    if (product && pageData.frontmatter.titleTemplate === undefined) {
      const docs = zh ? `${product.title} 文档` : `${product.title} Docs`
      const isHome = product.relativePath === pageData.relativePath
      return { titleTemplate: isHome ? (zh ? ':title 文档 | Agentics' : ':title Docs | Agentics') : `:title | ${docs}` }
    }
  },

  // Canonical URL and per-page Open Graph tags; a product's pages share the image in its index.md (`image`).
  transformHead({ pageData, title, description }) {
    if (pageData.isNotFound) return []
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = `${site.url}/${path}`
    const image = productOfPage.get(pageData.relativePath)?.frontmatter.image
    const markdown = markdownOfPage.get(pageData.relativePath)
    return [
      ['link', { rel: 'canonical', href: url }],
      ...(markdown
        ? [['link', { rel: 'alternate', type: markdown.endsWith('.txt') ? 'text/plain' : 'text/markdown', href: markdown }]]
        : []),
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ...(image ? [['meta', { property: 'og:image', content: String(image) }]] : []),
      ['meta', { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },

  // Pages at the addresses the VideoAgents docs had before products were added (see lib/redirects.js), and the
  // llms.txt files and Markdown copies of the pages for AI tools (see lib/llms.js). The sitemap (sitemap.xml, with
  // each page's English/Chinese pair and last-updated date) comes from VitePress itself.
  buildEnd(siteConfig) {
    writeRedirects(siteConfig.outDir)
    writeLlms(siteConfig.outDir)
  },

  vite: {
    // `npm run dev` restarts itself when pages are added or removed, so the sidebars stay complete (lib/dev-restart.js)
    plugins: [restartOnPageChanges(fileURLToPath(import.meta.url))],
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
