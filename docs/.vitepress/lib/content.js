// Reads every Markdown page under docs/ with its frontmatter. The sidebar, the list of drafts left out of the build,
// the tag pages and the page lists on the home and category pages all come from here, so a doc's place on the site
// is decided only by its folder and its frontmatter:
//
//   docs/<category>/index.md            a category (frontmatter: title, description, order)
//   docs/<category>/<doc>.md            a doc in that category (title, description, tags, order, draft)
//   docs/<category>/<group>/index.md    optional sub-group inside a category (title, order)
//   docs/<category>/<group>/<doc>.md    a doc in that sub-group
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

// Folders at a language root that are not categories.
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
    ...extra
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

/**
 * All pages that belong to a category, in both languages.
 * kind: 'category' (a category's index.md), 'group' (a sub-group's index.md) or 'doc'.
 */
export function scanPages({ includeDrafts = !isBuild } = {}) {
  const pages = []
  for (const { lang, dir } of languages) {
    const root = path.join(docsDir, dir)
    if (!fs.existsSync(root)) continue
    for (const entry of markdownFiles(root)) {
      if (!entry.isDirectory() || reserved.has(entry.name)) continue
      const categoryDir = path.join(root, entry.name)
      const categoryIndex = path.join(categoryDir, 'index.md')
      if (!fs.existsSync(categoryIndex)) continue
      const base = { lang, category: entry.name }
      pages.push(readPage(categoryIndex, { ...base, kind: 'category', group: null }))

      for (const item of markdownFiles(categoryDir)) {
        const itemPath = path.join(categoryDir, item.name)
        if (item.isFile() && item.name.endsWith('.md') && item.name !== 'index.md') {
          pages.push(readPage(itemPath, { ...base, kind: 'doc', group: null }))
        } else if (item.isDirectory()) {
          // A sub-group: every Markdown file below it, at any depth, is listed in that group.
          const walk = (dir) => {
            for (const child of markdownFiles(dir)) {
              const childPath = path.join(dir, child.name)
              if (child.isDirectory()) walk(childPath)
              else if (child.name.endsWith('.md')) {
                const isGroupIndex = dir === itemPath && child.name === 'index.md'
                pages.push(readPage(childPath, { ...base, kind: isGroupIndex ? 'group' : 'doc', group: item.name }))
              }
            }
          }
          walk(itemPath)
        }
      }
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

function sidebarItem(page) {
  return { text: page.draft ? `${page.title} <span class="ag-draft">Draft</span>` : page.title, link: page.url }
}

/** Sidebar for one language: one collapsible section per category, opened on the section of the current page. */
export function sidebar(lang) {
  const pages = scanPages().filter((page) => page.lang === lang)
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
          return {
            title: head ? head.title : prettify(name),
            order: head ? head.order : Infinity,
            item: { text: head ? head.title : prettify(name), link: head?.url, collapsed: true, items: docs.map(sidebarItem) }
          }
        })
        .filter((group) => group.item.items.length || group.item.link)
        .sort(byOrder)
        .map((group) => group.item)

      const children = [...items, ...groups]
      // An empty `items` list keeps a category without docs a section header of its own; without it VitePress
      // merges consecutive plain links into one untitled section.
      return children.length
        ? { text: category.title, link: category.url, collapsed: true, items: children }
        : { text: category.title, link: category.url, items: [] }
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
