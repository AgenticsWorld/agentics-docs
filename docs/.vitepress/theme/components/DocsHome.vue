<script setup>
// Docs home: hero, one card per product (from the products' index.md) listing its categories, and Agentics links.
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang, byOrder } from '../i18n.js'
import { links } from '../../site.js'

const { lang, t } = useLang()

const copy = {
  en: {
    title: 'Agentics Docs',
    subtitle: 'Guides for every Agentics product.',
    tagline: 'Pick a product to install it, learn how it works and get the most out of each feature.',
    resources: [
      { title: 'Agentics', description: 'All Agentics products and news.', url: links.home },
      { title: 'GitHub', description: 'Source code, releases and issues.', url: links.github },
      { title: 'Discord', description: 'Ask questions and share what you made.', url: links.discord },
      { title: 'X', description: 'Announcements and previews.', url: links.x }
    ]
  },
  zh: {
    title: 'Agentics 文档',
    subtitle: 'Agentics 全部产品的使用文档。',
    tagline: '选择一个产品：从安装开始，了解它如何工作，用好每一项功能。',
    resources: [
      { title: 'Agentics', description: 'Agentics 的全部产品与动态。', url: links.home },
      { title: 'GitHub', description: '源代码、版本发布与问题反馈。', url: links.github },
      { title: 'Discord', description: '提问、分享你的作品。', url: links.discord },
      { title: 'X', description: '新功能公告与预览。', url: links.x }
    ]
  }
}

const c = computed(() => copy[lang.value])

const products = computed(() =>
  pages
    .filter((p) => p.lang === lang.value && p.kind === 'product')
    .sort(byOrder)
    .map((product) => {
      const inProduct = pages.filter((p) => p.lang === lang.value && p.product === product.product)
      return {
        ...product,
        categories: inProduct
          .filter((p) => p.kind === 'category')
          .sort(byOrder)
          .map((category, i) => ({ ...category, index: String(i + 1).padStart(2, '0') })),
        count: inProduct.filter((p) => p.kind === 'doc').length
      }
    })
)
</script>

<template>
  <div class="ag-home">
    <section class="ag-hero">
      <div class="ag-hero__grid" aria-hidden="true"></div>
      <div class="ag-hero__content">
        <svg class="ag-hero__mark" width="64" height="64" viewBox="0 0 800 800" fill="none" aria-hidden="true">
          <path d="M560 320V160L400 320H240L80 480H240V640L400 480H560V640L720 480H560L720 320H560Z" fill="currentColor" />
        </svg>
        <h1 class="ag-hero__title">{{ c.title }}</h1>
        <p class="ag-hero__subtitle">{{ c.subtitle }}</p>
        <p class="ag-hero__tagline">{{ c.tagline }}</p>
      </div>
    </section>

    <section class="ag-home__section">
      <h2 class="ag-home__heading">{{ t.products }}</h2>
      <ul class="ag-products">
        <li v-for="product in products" :key="product.url" class="ag-product">
          <a class="ag-product__head" :href="withBase(product.url)">
            <img v-if="product.logo" :src="withBase(product.logo)" alt="" width="48" height="48" />
            <span class="ag-product__name">{{ product.title }}</span>
          </a>
          <p v-if="product.description" class="ag-product__description">{{ product.description }}</p>
          <ul v-if="product.categories.length" class="ag-product__categories">
            <li v-for="category in product.categories" :key="category.url">
              <a :href="withBase(category.url)">
                <span class="ag-product__index">{{ category.index }}</span>{{ category.title }}
              </a>
            </li>
          </ul>
          <div class="ag-product__footer">
            <a class="ag-product__more" :href="withBase(product.url)">{{ t.openProduct(product.title) }} →</a>
            <span v-if="product.count" class="ag-card__meta">{{ t.docCount(product.count) }}</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="ag-home__section">
      <h2 class="ag-home__heading">{{ t.community }}</h2>
      <ul class="ag-cards ag-cards--compact ag-cards--four">
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
