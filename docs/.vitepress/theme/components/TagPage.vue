<script setup>
// One tag's page (tags/[tag].md): every doc of this language with that tag, under its product's name when docs from
// more than one product have the tag.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang, byOrder } from '../i18n.js'
import { tagLabel } from '../../tags.js'
import DocList from './DocList.vue'

const { params } = useData()
const { lang, t } = useLang()

const tag = computed(() => params.value?.tag)
const docs = computed(() =>
  pages.filter((p) => p.lang === lang.value && p.kind === 'doc' && p.tags.includes(tag.value)).sort(byOrder)
)
const byProduct = computed(() =>
  pages
    .filter((p) => p.lang === lang.value && p.kind === 'product')
    .sort(byOrder)
    .map((product) => ({ ...product, docs: docs.value.filter((doc) => doc.product === product.product) }))
    .filter((product) => product.docs.length)
)
</script>

<template>
  <div class="ag-tagpage">
    <p class="ag-docmeta"><a :href="withBase(t.tagsHome)">{{ t.allTags }}</a></p>
    <h1 class="ag-tagpage__title"><span class="ag-tag__hash">#</span>{{ tagLabel(tag, lang) }}</h1>
    <p class="ag-tagpage__count">{{ t.docCount(docs.length) }}</p>
    <template v-if="byProduct.length > 1">
      <section v-for="product in byProduct" :key="product.url" class="ag-category__group">
        <h2 :id="`product-${product.product}`" class="ag-category__group-title">
          <a :href="withBase(product.url)">{{ product.title }}</a>
        </h2>
        <DocList :docs="product.docs" />
      </section>
    </template>
    <DocList v-else-if="docs.length" :docs="docs" />
    <p v-else class="ag-empty">{{ t.noTagged }}</p>
  </div>
</template>
