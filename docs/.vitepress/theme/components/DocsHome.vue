<script setup>
// Docs home: hero, one card per category (from the categories' index.md frontmatter) and links to WorldOS resources.
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang, byOrder } from '../i18n.js'
import { links } from '../../site.js'

const { lang, t } = useLang()

const copy = {
  en: {
    title: 'WorldOS Docs',
    subtitle: 'Build the world once. Create inside it as often as you like.',
    tagline:
      'Guides for Agentics WorldOS (VideoAgents): install the app, build a virtual world with an AI crew, then make episodic video, novels and more inside it.',
    start: 'Get started',
    download: 'Download',
    resources: [
      { title: 'Download', description: 'The desktop app for Mac (Apple silicon) and Windows (x64).', url: links.download },
      { title: 'Updates', description: 'What changed in each release of WorldOS.', url: links.updates },
      { title: 'Samples', description: 'Complete projects to open and explore.', url: links.samples },
      { title: 'Plugins', description: 'Add-on agent teams and workflows.', url: links.plugins },
      { title: 'Skills', description: 'SKILL.md packs that teach one agent one craft.', url: links.skills },
      { title: 'Community', description: 'Ask questions and share what you made on Discord.', url: links.discord }
    ]
  },
  zh: {
    title: 'WorldOS 文档',
    subtitle: '世界只建一次，在里面想创作多少就创作多少。',
    tagline: 'Agentics WorldOS（VideoAgents）使用文档：安装应用，由 AI 团队构建虚拟世界，再在世界里创作剧集视频、小说等作品。',
    start: '快速开始',
    download: '下载',
    resources: [
      { title: '下载', description: 'Mac（Apple 芯片）与 Windows（x64）桌面应用。', url: links.download },
      { title: '更新日志', description: 'WorldOS 每个版本的改动。', url: links.updates },
      { title: '示例项目', description: '可以直接打开浏览的完整项目。', url: links.samples },
      { title: '插件', description: '扩展的 Agent 团队与工作流。', url: links.plugins },
      { title: '技能', description: '教会单个 Agent 一门手艺的 SKILL.md 包。', url: links.skills },
      { title: '社区', description: '在 Discord 提问、分享你的作品。', url: links.discord }
    ]
  }
}

const c = computed(() => copy[lang.value])

const categories = computed(() =>
  pages
    .filter((p) => p.lang === lang.value && p.kind === 'category')
    .sort(byOrder)
    .map((category, i) => ({
      ...category,
      index: String(i + 1).padStart(2, '0'),
      count: pages.filter((p) => p.lang === lang.value && p.category === category.category && p.kind === 'doc').length
    }))
)

const firstCategory = computed(() => categories.value[0]?.url || t.value.home)
</script>

<template>
  <div class="ag-home">
    <section class="ag-hero">
      <div class="ag-hero__grid" aria-hidden="true"></div>
      <div class="ag-hero__content">
        <img class="ag-hero__logo" :src="withBase('/worldos-logo.png')" alt="" width="64" height="64" />
        <h1 class="ag-hero__title">{{ c.title }}</h1>
        <p class="ag-hero__subtitle">{{ c.subtitle }}</p>
        <p class="ag-hero__tagline">{{ c.tagline }}</p>
        <div class="ag-hero__buttons">
          <a class="ag-btn ag-btn--solid" :href="withBase(firstCategory)">{{ c.start }}</a>
          <a class="ag-btn" :href="links.download" target="_blank" rel="noopener noreferrer">{{ c.download }}</a>
        </div>
      </div>
    </section>

    <section class="ag-home__section">
      <h2 class="ag-home__heading">{{ t.browse }}</h2>
      <ul class="ag-cards">
        <li v-for="category in categories" :key="category.url">
          <a class="ag-card" :href="withBase(category.url)">
            <span class="ag-card__index">{{ category.index }}</span>
            <span class="ag-card__title">{{ category.title }}</span>
            <span class="ag-card__description">{{ category.description }}</span>
            <span v-if="category.count" class="ag-card__meta">{{ t.docCount(category.count) }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="ag-home__section">
      <h2 class="ag-home__heading">{{ t.resources }}</h2>
      <ul class="ag-cards ag-cards--compact">
        <li v-for="item in c.resources" :key="item.url">
          <a class="ag-card ag-card--compact" :href="item.url" target="_blank" rel="noopener noreferrer">
            <span class="ag-card__title">{{ item.title }}</span>
            <span class="ag-card__description">{{ item.description }}</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
