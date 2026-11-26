// Every product home, category page, sub-group page and doc in both languages, with its frontmatter, for the home
// page, the product and category pages, the tag pages, the trail above each doc and its tags. Rebuilt when any
// Markdown file changes.
import { scanPages } from '../lib/content.js'

export default {
  watch: ['../../**/*.md'],
  load() {
    return scanPages().map(({ relativePath, order, frontmatter, ...page }) => ({
      ...page,
      path: relativePath,
      // JSON has no Infinity: pages without `order` get null and sort after the numbered ones.
      order: Number.isFinite(order) ? order : null,
      // Products also carry their logo and their page on agentics.world, for the home page, sidebar and footer.
      ...(page.kind === 'product' ? { logo: frontmatter.logo || null, homepage: frontmatter.homepage || null } : {})
    }))
  }
}
