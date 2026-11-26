// Machine-readable copies of the docs, written into the built site after every build (https://llmstxt.org):
//
//   /llms.txt                     index of the English docs: every product, category and doc with its description
//   /llms-full.txt                every English doc in full, in sidebar order, as one Markdown file
//   /<product>/llms.txt           the same for one product
//   /<product>/llms-full.txt
//   /zh/llms.txt, /zh/llms-full.txt, /zh/<product>/llms.txt ...   the Chinese docs
//   /<page>.md                    each page as Markdown, next to its HTML: /videoagents/world/characters.md,
//                                 /videoagents/world/index.md for a category (linked from each page's <head>)
//
// The Markdown is the source file without its frontmatter. Links inside the site point to the .md copies and
// images to absolute addresses, so each file can be read on its own. The list components of the home, product and
// category pages (<ProductHome />, <CategoryIndex />) are replaced by the lists they show.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { scanPages, byOrder, docsDir } from './content.js'
import { site } from '../site.js'

const intro = {
  en: {
    title: 'Agentics Docs',
    summary: 'Guides for every Agentics product: install it, learn how it works, and get the most out of it.',
    about:
      'Agentics (https://agentics.world/) makes AI products for creators. Each section below is one product: its categories, ' +
      'and the guides in each category with a one-line description. Every link points to the Markdown version of the page; ' +
      'the same address without `.md` is the web page.',
    full: 'The full text of every guide, in reading order',
    home: (p) => `${p.title} docs home`,
    productIndex: (p) => `Index of the ${p.title} docs only`,
    productFull: (p) => `Every ${p.title} guide in full`,
    other: { label: 'Optional', text: '简体中文文档 (Chinese docs)', path: '/zh/llms.txt' },
    product: (p) => `${p.title} docs`
  },
  zh: {
    title: 'Agentics 文档',
    summary: 'Agentics 各产品的使用文档：安装、理解它如何工作，以及用好它的每一项功能。',
    about:
      'Agentics（https://agentics.world/）为创作者打造 AI 产品。下面每一节是一个产品：它的分类，以及每个分类中的文档和一句话简介。' +
      '链接都指向页面的 Markdown 版本；去掉 `.md` 就是网页。',
    full: '全部文档的全文（按阅读顺序）',
    home: (p) => `${p.title} 文档首页`,
    productIndex: (p) => `只含 ${p.title} 文档的索引`,
    productFull: (p) => `${p.title} 全部文档的全文`,
    other: { label: 'Optional', text: 'English docs', path: '/llms.txt' },
    product: (p) => `${p.title} 文档`
  }
}

const abs = (url) => site.url + url
/** Address of a page's Markdown copy: /a/b → /a/b.md, /a/ → /a/index.md */
const mdPath = (url) => (url.endsWith('/') ? `${url}index.md` : `${url}.md`)

function readBody(page) {
  return matter(fs.readFileSync(path.join(docsDir, page.relativePath), 'utf8')).content
}

/** Make links and images in a page's Markdown absolute; links to pages of the site point to their .md copy. */
function rewriteLinks(markdown, pageUrls) {
  return markdown.replace(/(!?)\[([^\]]*)\]\((\/[^)\s]*)((?:\s+"[^"]*")?)\)/g, (all, bang, text, target, title) => {
    const [pathPart, hash = ''] = target.split('#')
    let url = abs(pathPart)
    if (!bang && !/\.[a-z0-9]+$/i.test(pathPart)) {
      const page = pageUrls.has(pathPart) ? pathPart : pageUrls.has(`${pathPart}/`) ? `${pathPart}/` : null
      if (page) url = abs(mdPath(page))
    }
    return `${bang}[${text}](${url}${hash ? `#${hash}` : ''}${title})`
  })
}

const link = (page) => `[${page.title}](${abs(mdPath(page.url))})`
const item = (page) => `- ${link(page)}${page.description ? `: ${page.description}` : ''}`

/** The docs of one category in sidebar order: loose docs first, then each sub-group with its docs. */
function categoryDocs(pages, category) {
  const inCategory = pages.filter((p) => p.product === category.product && p.category === category.category)
  const loose = inCategory.filter((p) => p.kind === 'doc' && !p.group).sort(byOrder)
  const groupNames = [...new Set(inCategory.filter((p) => p.group).map((p) => p.group))]
  const groups = groupNames
    .map((name) => {
      const head = inCategory.find((p) => p.kind === 'group' && p.group === name)
      const docs = inCategory.filter((p) => p.kind === 'doc' && p.group === name).sort(byOrder)
      return { head, docs, order: head ? head.order : Infinity, title: head ? head.title : name }
    })
    .sort(byOrder)
  return { loose, groups }
}

function categoryList(pages, category) {
  const { loose, groups } = categoryDocs(pages, category)
  const lines = loose.map(item)
  for (const g of groups) {
    lines.push(g.head ? item(g.head) : `- ${g.title}`)
    lines.push(...g.docs.map((d) => `  ${item(d)}`))
  }
  return lines.join('\n')
}

function categoriesOf(pages, product) {
  return pages.filter((p) => p.kind === 'category' && p.product === product.product).sort(byOrder)
}

/** A page's Markdown copy: title, description, address, then the page body with its list components filled in. */
function pageMarkdown(page, pages, pageUrls, lang) {
  let body = readBody(page).replace(/^\s*#\s+.+\n/, '') // the title is written above
  if (page.kind === 'category' || page.kind === 'group') {
    const category = pages.find((p) => p.kind === 'category' && p.product === page.product && p.category === page.category)
    body = body.replace(/<CategoryIndex\s*\/>/g, categoryList(pages, category))
  }
  if (page.kind === 'product') {
    const fm = page.frontmatter
    const parts = []
    if (fm.subtitle) parts.push(String(fm.subtitle))
    for (const category of categoriesOf(pages, page)) {
      parts.push(`## ${category.title}\n\n${category.description ? `${category.description}\n\n` : ''}${categoryList(pages, category)}`)
    }
    const resources = Array.isArray(fm.resources) ? fm.resources : []
    if (resources.length) {
      parts.push(
        `## ${lang === 'zh' ? '资源' : 'Resources'}\n\n` +
          resources.map((r) => `- [${r.title}](${r.link.startsWith('/') ? abs(r.link) : r.link}): ${r.description}`).join('\n')
      )
    }
    body = body.replace(/<ProductHome\s*\/>/g, parts.join('\n\n'))
  }
  body = rewriteLinks(body.trim(), pageUrls)
  const head = [`# ${page.title}`]
  if (page.description) head.push(`> ${page.description}`)
  head.push(`${lang === 'zh' ? '网页' : 'Web page'}: ${abs(page.url)}`)
  return `${head.join('\n\n')}\n\n${body}\n`
}

/** llms.txt for a language, for all products or one. */
function indexFile(lang, products, pages, scope) {
  const t = intro[lang]
  const base = lang === 'zh' ? '/zh' : ''
  const out = []
  if (scope) {
    out.push(`# ${t.product(scope)}`, `> ${scope.description}`)
  } else {
    out.push(`# ${t.title}`, `> ${t.summary}`, t.about)
  }
  out.push(`${t.full}: ${abs(`${scope ? scope.url : `${base}/`}llms-full.txt`)}`)
  for (const product of products) {
    if (!scope) {
      out.push(
        `## ${product.title}\n\n${product.description}\n\n` +
          `- [${t.home(product)}](${abs(mdPath(product.url))})\n` +
          `- [${product.url.slice(1)}llms.txt](${abs(`${product.url}llms.txt`)}): ${t.productIndex(product)}\n` +
          `- [${product.url.slice(1)}llms-full.txt](${abs(`${product.url}llms-full.txt`)}): ${t.productFull(product)}`
      )
    }
    for (const category of categoriesOf(pages, product)) {
      const heading = scope ? category.title : `${product.title}: ${category.title}`
      const list = categoryList(pages, category)
      out.push(`## ${heading}\n\n${category.description ? `${category.description}\n\n` : ''}${item(category)}${list ? `\n${list}` : ''}`)
    }
  }
  if (!scope) out.push(`## ${t.other.label}\n\n- [${t.other.text}](${abs(t.other.path)})`)
  return `${out.join('\n\n')}\n`
}

/** llms-full.txt: every page of the products in reading order (product home, then each category and its docs). */
function fullFile(lang, products, pages, pageUrls, scope) {
  const t = intro[lang]
  const sections = [scope ? `# ${t.product(scope)}\n\n> ${scope.description}` : `# ${t.title}\n\n> ${t.summary}`]
  const demote = (md) => md.replace(/^(#{1,5}) /gm, '#$1 ') // nest each page under the file's title
  for (const product of products) {
    sections.push(demote(pageMarkdown(product, pages, pageUrls, lang)))
    for (const category of categoriesOf(pages, product)) {
      const { loose, groups } = categoryDocs(pages, category)
      sections.push(demote(pageMarkdown(category, pages, pageUrls, lang)))
      for (const doc of loose) sections.push(demote(pageMarkdown(doc, pages, pageUrls, lang)))
      for (const g of groups) {
        if (g.head) sections.push(demote(pageMarkdown(g.head, pages, pageUrls, lang)))
        for (const doc of g.docs) sections.push(demote(pageMarkdown(doc, pages, pageUrls, lang)))
      }
    }
  }
  return `${sections.join('\n\n---\n\n')}\n`
}

function write(outDir, file, text) {
  const target = path.join(outDir, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, text)
}

/** Write llms.txt, llms-full.txt and the per-page Markdown copies into the built site (`outDir`). */
export function writeLlms(outDir) {
  const all = scanPages()
  const pageUrls = new Set(all.map((p) => p.url))
  let copies = 0
  for (const lang of ['en', 'zh']) {
    const pages = all.filter((p) => p.lang === lang)
    const products = pages.filter((p) => p.kind === 'product').sort(byOrder)
    if (!products.length) continue
    const base = lang === 'zh' ? 'zh/' : ''
    write(outDir, `${base}llms.txt`, indexFile(lang, products, pages))
    write(outDir, `${base}llms-full.txt`, fullFile(lang, products, pages, pageUrls))
    for (const product of products) {
      const dir = product.url.slice(1)
      write(outDir, `${dir}llms.txt`, indexFile(lang, [product], pages, product))
      write(outDir, `${dir}llms-full.txt`, fullFile(lang, [product], pages, pageUrls, product))
    }
    for (const page of pages) {
      write(outDir, mdPath(page.url).slice(1), pageMarkdown(page, pages, pageUrls, lang))
      copies++
    }
  }
  console.log(`[docs] wrote llms.txt, llms-full.txt and ${copies} Markdown copies of the pages`)
}

/** Full address of a page's Markdown copy (for the <link rel="alternate"> in its head). */
export function markdownCopyUrl(page) {
  return abs(mdPath(page.url))
}
