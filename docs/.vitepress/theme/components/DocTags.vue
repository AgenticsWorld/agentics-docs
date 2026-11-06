<script setup>
// Below each doc: its tags, each linking to the tag's page.
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as pages } from '../docs.data.js'
import { useLang } from '../i18n.js'
import TagChip from './TagChip.vue'

const { page } = useData()
const { t } = useLang()
const tags = computed(() => pages.find((p) => p.path === page.value.relativePath)?.tags || [])
</script>

<template>
  <div v-if="tags.length" class="ag-doctags">
    <span class="ag-label">{{ t.tagged }}</span>
    <TagChip v-for="tag in tags" :key="tag" :tag="tag" />
  </div>
</template>
