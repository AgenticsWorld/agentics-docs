<script setup>
// Put <CategoryIndex /> in a category's index.md: lists the docs in that category (and its sub-groups).
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang, byOrder } from '../i18n.js'
import DocList from './DocList.vue'

const { page } = useData()
const { lang, t } = useLang()

const current = computed(() => pages.find((p) => p.path === page.value.relativePath))

const inCategory = computed(() =>
  current.value ? pages.filter((p) => p.lang === lang.value && p.category === current.value.category) : []
)

const looseDocs = computed(() => inCategory.value.filter((p) => p.kind === 'doc' && !p.group).sort(byOrder))

const groups = computed(() => {
  const names = [...new Set(inCategory.value.filter((p) => p.group).map((p) => p.group))]
  return names
    .map((name) => {
      const head = inCategory.value.find((p) => p.kind === 'group' && p.group === name)
      return {
        name,
        title: head ? head.title : name,
        url: head ? head.url : null,
        order: head ? head.order : null,
        docs: inCategory.value.filter((p) => p.kind === 'doc' && p.group === name).sort(byOrder)
      }
    })
    .filter((group) => group.docs.length)
    .sort(byOrder)
})
</script>

<template>
  <div class="ag-category">
    <DocList v-if="looseDocs.length" :docs="looseDocs" />
    <section v-for="group in groups" :key="group.name" class="ag-category__group">
      <h2 :id="`group-${group.name}`" class="ag-category__group-title">
        <a v-if="group.url" :href="group.url">{{ group.title }}</a>
        <template v-else>{{ group.title }}</template>
      </h2>
      <DocList :docs="group.docs" />
    </section>
    <p v-if="!looseDocs.length && !groups.length" class="ag-empty">{{ t.noDocs }}</p>
  </div>
</template>
