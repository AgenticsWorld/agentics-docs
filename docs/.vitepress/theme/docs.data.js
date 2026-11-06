// Every category page, sub-group page and doc in both languages, with its frontmatter, for the home page,
// the category pages, the tag pages and the tags shown above each doc. Rebuilt when any Markdown file changes.
import { scanPages } from '../lib/content.js'

export default {
  watch: ['../../**/*.md'],
  load() {
    return scanPages().map(({ relativePath, order, ...page }) => ({
      ...page,
      path: relativePath,
      // JSON has no Infinity: pages without `order` get null and sort after the numbered ones.
      order: Number.isFinite(order) ? order : null
    }))
  }
}
