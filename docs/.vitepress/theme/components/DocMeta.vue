<script setup>
// Above each doc: the product, category and sub-group it belongs to. Category pages show their product.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang } from '../i18n.js'

const { page } = useData()
const { t } = useLang()

const current = computed(() => pages.find((p) => p.path === page.value.relativePath))
const trail = computed(() => {
  const doc = current.value
  if (!doc || doc.kind === 'product') return []
  const same = (p) => p.lang === doc.lang && p.product === doc.product
  const product = pages.find((p) => same(p) && p.kind === 'product')
  const category =
    doc.kind === 'category' ? null : pages.find((p) => same(p) && p.kind === 'category' && p.category === doc.category)
  const group =
    doc.kind === 'doc' && doc.group
      ? pages.find((p) => same(p) && p.kind === 'group' && p.category === doc.category && p.group === doc.group)
      : null
  return [product, category, group].filter(Boolean)
})
</script>

<template>
  <div v-if="trail.length || current?.draft" class="ag-docmeta">
    <template v-for="(item, i) in trail" :key="item.url">
      <span v-if="i" class="ag-docmeta__sep" aria-hidden="true">/</span>
      <a :href="withBase(item.url)">{{ item.title }}</a>
    </template>
    <span v-if="current?.draft" class="ag-draft">{{ t.draft }}</span>
  </div>
</template>
