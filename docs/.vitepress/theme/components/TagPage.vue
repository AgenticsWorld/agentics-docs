<script setup>
// One tag's page (tags/[tag].md): every doc of this language with that tag.
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
</script>

<template>
  <div class="ag-tagpage">
    <p class="ag-docmeta"><a :href="withBase(t.tagsHome)">{{ t.allTags }}</a></p>
    <h1 class="ag-tagpage__title"><span class="ag-tag__hash">#</span>{{ tagLabel(tag, lang) }}</h1>
    <p class="ag-tagpage__count">{{ t.docCount(docs.length) }}</p>
    <DocList v-if="docs.length" :docs="docs" />
    <p v-else class="ag-empty">{{ t.noTagged }}</p>
  </div>
</template>
