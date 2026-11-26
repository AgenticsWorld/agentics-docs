// Reads every Markdown page under docs/ with its frontmatter. The top bar, the sidebars, the list of drafts left out of
// the build, the tag pages and the page lists on the home, product and category pages all come from here, so a doc's
// place on the site is decided only by its folder and its frontmatter:
//
//   docs/<product>/index.md                       a product: its docs home (title, description, order, logo, nav ...)
//   docs/<product>/<category>/index.md            a category of that product (title, description, order)
//   docs/<product>/<category>/<doc>.md            a doc in that category (title, description, tags, order, draft)
//   docs/<product>/<category>/<group>/index.md    optional sub-group inside a category (title, order)
//   docs/<product>/<category>/<group>/<doc>.md    a doc in that sub-group
//
// Chinese pages mirror the same layout under docs/zh/.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { tags as tagRegistry } from '../tags.js'

export const docsDir = fileURLToPath(new URL('../..', import.meta.url))

// The English pages live at the root, the Chinese ones under zh/.
export const languages = [
  { lang: 'en', dir: '', base: '/' },
  { lang: 'zh', dir: 'zh', base: '/zh/' }
]

// Folders at a language root that are not products.
const reserved = new Set(['tags', 'zh', 'public'])

// `vitepress build` leaves drafts out; `vitepress dev` shows them with a Draft badge.
export const isBuild = process.argv.includes('build')

const toPosix = (p) => p.split(path.sep).join('/')

function urlOf(relativePath) {
  return '/' + relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
}

function prettify(name) {
  return name.replace(/^\d+[-_.]/, '').replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

/** Tag ids are lower case with dashes for spaces: `World Model` → `world-model`. */
export function normalizeTag(tag) {
  return String(tag).trim().toLowerCase().replace(/\s+/g, '-')
}

function readPage(file, extra) {
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  const relativePath = toPosix(path.relative(docsDir, file))
  const heading = content.match(/^#\s+(.+?)\s*$/m)
  const rawTags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : []
  return {
    relativePath,
    url: urlOf(relativePath),
    title: String(data.title || (heading && heading[1]) || prettify(path.basename(file, '.md'))),
    description: data.description ? String(data.description) : '',
    tags: [...new Set(rawTags.map(normalizeTag).filter(Boolean))],
    order: Number.isFinite(Number(data.order)) && data.order !== null && data.order !== '' ? Number(data.order) : Infinity,
    draft: data.draft === true,
    ...extra,
    frontmatter: data
  }
}

function markdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && !entry.name.startsWith('_'))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** Sort by `order`, then by title. */
export function byOrder(a, b) {
  return a.order - b.order || a.title.localeCompare(b.title)
}

/** The categories of one product folder, with their docs and sub-groups. */
function scanCategories(productDir, base) {
  const pages = []
  for (const entry of markdownFiles(productDir)) {
    if (!entry.isDirectory()) continue
    const categoryDir = path.join(productDir, entry.name)
    const categoryIndex = path.join(categoryDir, 'index.md')
    if (!fs.existsSync(categoryIndex)) continue
    const inCategory = { ...base, category: entry.name }
    pages.push(readPage(categoryIndex, { ...inCategory, kind: 'category', group: null }))

    for (const item of markdownFiles(categoryDir)) {
      const itemPath = path.join(categoryDir, item.name)
      if (item.isFile() && item.name.endsWith('.md') && item.name !== 'index.md') {
        pages.push(readPage(itemPath, { ...inCategory, kind: 'doc', group: null }))
      } else if (item.isDirectory()) {
        // A sub-group: every Markdown file below it, at any depth, is listed in that group.
        const walk = (dir) => {
          for (const child of markdownFiles(dir)) {
            const childPath = path.join(dir, child.name)
            if (child.isDirectory()) walk(childPath)
            else if (child.name.endsWith('.md')) {
              const isGroupIndex = dir === itemPath && child.name === 'index.md'
              pages.push(readPage(childPath, { ...inCategory, kind: isGroupIndex ? 'group' : 'doc', group: item.name }))
            }
          }
        }
        walk(itemPath)
      }
    }
  }
  return pages
}

/**
 * All pages that belong to a product, in both languages.
 * kind: 'product' (a product's index.md), 'category' (a category's index.md), 'group' (a sub-group's index.md) or 'doc'.
 * Every page carries `product`; categories, groups and docs also carry `category`, and docs in a sub-group `group`.
 */
export function scanPages({ includeDrafts = !isBuild } = {}) {
  const pages = []
  for (const { lang, dir } of languages) {
    const root = path.join(docsDir, dir)
    if (!fs.existsSync(root)) continue
    for (const entry of markdownFiles(root)) {
      if (!entry.isDirectory() || reserved.has(entry.name)) continue
      const productDir = path.join(root, entry.name)
      const productIndex = path.join(productDir, 'index.md')
      if (!fs.existsSync(productIndex)) continue
      const base = { lang, product: entry.name }
      pages.push(readPage(productIndex, { ...base, kind: 'product', category: null, group: null }))
      pages.push(...scanCategories(productDir, base))
    }
  }
  return includeDrafts ? pages : pages.filter((page) => !page.draft)
}

/** Drafts, as paths relative to docs/, for `srcExclude` in production builds. */
export function draftFiles() {
  return scanPages({ includeDrafts: true })
    .filter((page) => page.draft)
    .map((page) => page.relativePath)
}

/** The products of one language, in order. */
export function products(lang) {
  return scanPages()
    .filter((page) => page.lang === lang && page.kind === 'product')
    .sort(byOrder)
}

function sidebarItem(page) {
  return { text: page.draft ? `${page.title} <span class="ag-draft">Draft</span>` : page.title, link: page.url }
}

const overviewLabel = { en: 'Overview', zh: '概览' }

/**
 * A sidebar section that opens and closes when its title is clicked. VitePress toggles a section on a title click
 * only when the section has no link of its own, so the section's page (a category or sub-group page) becomes the
 * first entry inside it, labelled "Overview". Every section starts open; a reader can close the ones they don't need.
 */
function section(lang, title, url, children) {
  const overview = url ? [{ text: overviewLabel[lang] || overviewLabel.en, link: url }] : []
  return { text: title, collapsed: false, items: [...overview, ...children] }
}

/** Sidebar of one product: one section per category (and per sub-group inside it), all open. */
export function sidebar(lang, product) {
  const pages = scanPages().filter((page) => page.lang === lang && page.product === product)
  return pages
    .filter((page) => page.kind === 'category')
    .sort(byOrder)
    .map((category) => {
      const inCategory = pages.filter((page) => page.category === category.category)
      const items = inCategory.filter((page) => page.kind === 'doc' && !page.group).sort(byOrder).map(sidebarItem)

      const groupNames = [...new Set(inCategory.filter((page) => page.group).map((page) => page.group))]
      const groups = groupNames
        .map((name) => {
          const head = inCategory.find((page) => page.kind === 'group' && page.group === name)
          const docs = inCategory.filter((page) => page.kind === 'doc' && page.group === name).sort(byOrder)
          const title = head ? head.title : prettify(name)
          return { title, order: head ? head.order : Infinity, item: section(lang, title, head?.url, docs.map(sidebarItem)) }
        })
        .filter((group) => group.item.items.length)
        .sort(byOrder)
        .map((group) => group.item)

      const children = [...items, ...groups]
      // A category without docs stays a plain link to its page. The empty `items` list keeps it a section header of
      // its own; without it VitePress merges consecutive plain links into one untitled section.
      return children.length
        ? section(lang, category.title, category.url, children)
        : { text: category.title, link: category.url, items: [] }
    })
}

/** Sidebars of one language, one per product, keyed by the product's address: `{ '/videoagents/': [...] }`. */
export function sidebars(lang) {
  return Object.fromEntries(products(lang).map((product) => [product.url, sidebar(lang, product.product)]))
}

/**
 * Top-bar entries of one language, one per product: a menu of the `nav` links in the product's index.md, or a plain
 * link to the product's docs home when it lists none. Either is highlighted on every page of the product.
 */
export function productNav(lang) {
  return products(lang).map((product) => {
    const activeMatch = `^${product.url}`
    const links = Array.isArray(product.frontmatter.nav) ? product.frontmatter.nav : []
    return links.length
      ? { text: product.title, activeMatch, items: links.map(({ text, link }) => ({ text: String(text), link: String(link) })) }
      : { text: product.title, link: product.url, activeMatch }
  })
}

/** Tags used by the docs of one language, most used first. */
export function usedTags(lang) {
  const counts = new Map()
  for (const page of scanPages()) {
    if (page.lang !== lang || page.kind !== 'doc') continue
    for (const tag of page.tags) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag)
}

/** Print a warning for each tag a doc uses that docs/.vitepress/tags.js does not list. */
export function warnUnknownTags() {
  for (const page of scanPages()) {
    const unknown = page.tags.filter((tag) => !tagRegistry[tag])
    if (unknown.length) {
      console.warn(`[docs] ${page.relativePath}: tag(s) not in docs/.vitepress/tags.js: ${unknown.join(', ')}`)
    }
  }
}
