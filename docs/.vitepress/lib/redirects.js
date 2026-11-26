// Until 2026-11-26 the VideoAgents docs were the whole site: /getting-started/, /console/chat-commands and so on (and
// /zh/... in Chinese). They now live under /videoagents/. GitHub Pages cannot answer with a redirect, so the build
// writes a small page at each old address that sends the reader on to the same page, anchor included, under its new
// address. Docs added to these categories later get one too, which does no harm.

import fs from 'node:fs'
import path from 'node:path'
import { scanPages } from './content.js'
import { site } from '../site.js'

const moved = {
  product: 'videoagents',
  categories: ['getting-started', 'concepts', 'world', 'create', 'project-types', 'models', 'console', 'extend', 'reference']
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function redirectPage(to, lang) {
  const href = escape(to)
  const text = lang === 'zh' ? '此页面已移至' : 'This page has moved to'
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en-US'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${text} ${href}</title>
<link rel="canonical" href="${escape(site.url + to)}">
<meta http-equiv="refresh" content="0; url=${href}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head>
<body>
<p>${text} <a href="${href}">${href}</a>.</p>
</body>
</html>
`
}

/** Write the redirect pages into the built site (`outDir`). */
export function writeRedirects(outDir) {
  let count = 0
  for (const page of scanPages()) {
    if (page.product !== moved.product || !moved.categories.includes(page.category)) continue
    const from = page.url.replace(`/${moved.product}/`, '/')
    // cleanUrls: /console/chat-commands is served from console/chat-commands.html, /console/ from console/index.html.
    const file = path.join(outDir, from.endsWith('/') ? `${from}index.html` : `${from}.html`)
    if (fs.existsSync(file)) {
      console.warn(`[docs] not writing a redirect over ${path.relative(outDir, file)}: a page is already there`)
      continue
    }
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, redirectPage(page.url, page.lang))
    count++
  }
  console.log(`[docs] wrote ${count} redirect pages from the old addresses to /${moved.product}/`)
}
