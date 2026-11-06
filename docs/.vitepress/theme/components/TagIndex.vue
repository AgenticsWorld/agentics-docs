<script setup>
// The Tags page: every tag the docs of this language use, grouped as in tags.js, with how many docs use it.
import { computed } from 'vue'
import { data as pages } from '../docs.data.js'
import { useLang } from '../i18n.js'
import { tags as registry, tagGroups, tagLabel } from '../../tags.js'
import TagChip from './TagChip.vue'

const { lang, t } = useLang()

const counts = computed(() => {
  const map = new Map()
  for (const page of pages) {
    if (page.lang !== lang.value || page.kind !== 'doc') continue
    for (const tag of page.tags) map.set(tag, (map.get(tag) || 0) + 1)
  }
  return map
})

const groups = computed(() => {
  const used = [...counts.value.keys()]
  const result = tagGroups
    .map((group) => ({
      id: group.id,
      title: group[lang.value] || group.en,
      tags: Object.keys(registry).filter((tag) => registry[tag].group === group.id && counts.value.has(tag))
    }))
    .filter((group) => group.tags.length)
  const other = used.filter((tag) => !registry[tag]).sort((a, b) => tagLabel(a).localeCompare(tagLabel(b)))
  if (other.length) result.push({ id: 'other', title: lang.value === 'zh' ? '其他' : 'Other', tags: other })
  return result
})
</script>

<template>
  <div class="ag-tagindex">
    <section v-for="group in groups" :key="group.id" class="ag-tagindex__group">
      <h2 :id="`tags-${group.id}`" class="ag-label ag-tagindex__title">{{ group.title }}</h2>
      <div class="ag-tagindex__tags">
        <TagChip v-for="tag in group.tags" :key="tag" :tag="tag" :count="counts.get(tag)" />
      </div>
    </section>
    <p v-if="!groups.length" class="ag-empty">{{ t.noTags }}</p>
  </div>
</template>
