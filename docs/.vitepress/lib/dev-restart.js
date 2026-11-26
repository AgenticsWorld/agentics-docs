// `npm run dev` builds the top bar and the sidebars once, when it starts (see lib/content.js). This Vite plugin restarts
// it when a Markdown page is added or removed, or when a page's title, order or draft flag changes, so the sidebars of
// both languages always list the pages that exist. It restarts by touching the config file, which VitePress watches
// and answers by reloading the whole site config. It does nothing in `npm run build`.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { scanPages, docsDir } from './content.js'

/** @param {string} configFile absolute path of docs/.vitepress/config.js */
export function restartOnPageChanges(configFile) {
  const vitepressDir = path.dirname(configFile) + path.sep
  // Frontmatter fields the sidebars and the top bar are built from, per page, as last seen.
  const seen = new Map()
  const fieldsOf = (data) => JSON.stringify([data.title, data.order, data.draft, data.nav])
  const navFields = (file) => {
    try {
      return fieldsOf(matter(fs.readFileSync(file, 'utf8')).data)
    } catch {
      return null
    }
  }
  const isPage = (file) => file.endsWith('.md') && !file.startsWith(vitepressDir)
  let timer = null
  const restart = () => {
    // Several files often change at once (a new folder, a batch of pages): restart once, after they settle.
    clearTimeout(timer)
    timer = setTimeout(() => {
      const now = new Date()
      fs.utimesSync(configFile, now, now)
    }, 300)
  }

  return {
    name: 'agentics-restart-on-page-changes',
    apply: 'serve',
    configureServer(server) {
      for (const page of scanPages({ includeDrafts: true })) {
        seen.set(path.join(docsDir, page.relativePath), fieldsOf(page.frontmatter))
      }
      server.watcher.on('add', (file) => isPage(file) && restart())
      server.watcher.on('unlink', (file) => isPage(file) && restart())
      server.watcher.on('change', (file) => {
        if (!isPage(file) || !seen.has(file)) return // new pages arrive through 'add'
        const fields = navFields(file)
        const before = seen.get(file)
        seen.set(file, fields)
        if (before !== fields) restart()
      })
    }
  }
}
