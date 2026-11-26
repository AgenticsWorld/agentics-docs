// Interface text for the two languages. `useLang()` returns 'en' or 'zh' for the page being shown.
import { computed } from 'vue'
import { useData } from 'vitepress'

export const strings = {
  en: {
    home: '/',
    docsTitle: 'Docs',
    tags: 'Tags',
    tagsHome: '/tags/',
    allTags: 'All tags',
    noTags: 'No docs are tagged yet. Tags appear here as soon as a doc lists them.',
    noDocs: 'Docs for this section are on the way.',
    noTagged: 'No published docs use this tag yet.',
    docCount: (n) => (n === 1 ? '1 doc' : `${n} docs`),
    draft: 'Draft',
    products: 'Products',
    openProduct: (name) => `Open the ${name} docs`,
    browse: 'Browse the docs',
    resources: 'Resources',
    community: 'Agentics',
    tagged: 'Tagged',
    copyright: '© Agentics 2026'
  },
  zh: {
    home: '/zh/',
    docsTitle: '文档',
    tags: '标签',
    tagsHome: '/zh/tags/',
    allTags: '全部标签',
    noTags: '还没有文档使用标签。文档在 frontmatter 里写上标签后会出现在这里。',
    noDocs: '这个分类的文档正在编写中。',
    noTagged: '还没有已发布的文档使用这个标签。',
    docCount: (n) => `${n} 篇文档`,
    draft: '草稿',
    products: '产品',
    openProduct: (name) => `进入 ${name} 文档`,
    browse: '浏览文档',
    resources: '相关资源',
    community: 'Agentics',
    tagged: '标签',
    copyright: '© Agentics 2026'
  }
}

export function useLang() {
  const { localeIndex } = useData()
  const lang = computed(() => (localeIndex.value === 'zh' ? 'zh' : 'en'))
  const t = computed(() => strings[lang.value])
  return { lang, t }
}

/** Sort by `order` (missing order last), then by title. */
export function byOrder(a, b) {
  const ao = a.order ?? Infinity
  const bo = b.order ?? Infinity
  return ao - bo || a.title.localeCompare(b.title)
}
