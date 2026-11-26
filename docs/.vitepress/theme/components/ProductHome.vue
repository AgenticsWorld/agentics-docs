<script setup>
// Put <ProductHome /> in a product's index.md: a hero from its frontmatter (title, logo, subtitle, description,
// actions), one card per category of the product, and the product's `resources` links.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang, byOrder } from '../i18n.js'

const { page, frontmatter } = useData()
const { lang, t } = useLang()

const product = computed(() => pages.find((p) => p.path === page.value.relativePath))
const isExternal = (link) => /^https?:\/\//.test(link)
const href = (link) => (isExternal(link) ? link : withBase(link))

const actions = computed(() => (Array.isArray(frontmatter.value.actions) ? frontmatter.value.actions : []))
const resources = computed(() => (Array.isArray(frontmatter.value.resources) ? frontmatter.value.resources : []))

const categories = computed(() => {
  const inProduct = (p) => p.lang === lang.value && p.product === product.value?.product
  return pages
    .filter((p) => inProduct(p) && p.kind === 'category')
    .sort(byOrder)
    .map((category, i) => ({
      ...category,
      index: String(i + 1).padStart(2, '0'),
      count: pages.filter((p) => inProduct(p) && p.category === category.category && p.kind === 'doc').length
    }))
})
</script>

<template>
  <div v-if="product" class="ag-home">
    <section class="ag-hero">
      <div class="ag-hero__grid" aria-hidden="true"></div>
      <div class="ag-hero__content">
        <img v-if="product.logo" class="ag-hero__logo" :src="withBase(product.logo)" alt="" width="64" height="64" />
        <p class="ag-label ag-hero__eyebrow">{{ t.docsTitle }}</p>
        <h1 class="ag-hero__title">{{ product.title }}</h1>
        <p v-if="frontmatter.subtitle" class="ag-hero__subtitle">{{ frontmatter.subtitle }}</p>
        <p v-if="product.description" class="ag-hero__tagline">{{ product.description }}</p>
        <div v-if="actions.length" class="ag-hero__buttons">
          <a
            v-for="(action, i) in actions"
            :key="action.link"
            class="ag-btn"
            :class="{ 'ag-btn--solid': i === 0 }"
            :href="href(action.link)"
            :target="isExternal(action.link) ? '_blank' : undefined"
            :rel="isExternal(action.link) ? 'noopener noreferrer' : undefined"
            >{{ action.text }}</a
          >
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

    <section v-if="resources.length" class="ag-home__section">
      <h2 class="ag-home__heading">{{ t.resources }}</h2>
      <ul class="ag-cards ag-cards--compact">
        <li v-for="item in resources" :key="item.link">
          <a
            class="ag-card ag-card--compact"
            :href="href(item.link)"
            :target="isExternal(item.link) ? '_blank' : undefined"
            :rel="isExternal(item.link) ? 'noopener noreferrer' : undefined"
          >
            <span class="ag-card__title">{{ item.title }}</span>
            <span class="ag-card__description">{{ item.description }}</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
