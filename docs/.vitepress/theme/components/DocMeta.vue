<script setup>
// Above each doc: the category (and sub-group) it belongs to.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang } from '../i18n.js'

const { page } = useData()
const { t } = useLang()

const current = computed(() => pages.find((p) => p.path === page.value.relativePath))
const trail = computed(() => {
  const doc = current.value
  if (!doc || doc.kind === 'category') return []
  const same = (p) => p.lang === doc.lang && p.category === doc.category
  const category = pages.find((p) => same(p) && p.kind === 'category')
  const group = doc.kind === 'doc' && doc.group ? pages.find((p) => same(p) && p.kind === 'group' && p.group === doc.group) : null
  return [category, group].filter(Boolean)
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
