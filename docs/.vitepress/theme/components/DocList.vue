<script setup>
// A list of docs as cards: title, one-line description and tags.
import { withBase } from 'vitepress'
import { useLang } from '../i18n.js'
import TagChip from './TagChip.vue'

defineProps({
  docs: { type: Array, required: true }
})

const { t } = useLang()
</script>

<template>
  <ul class="ag-doclist">
    <li v-for="doc in docs" :key="doc.url" class="ag-doclist__item">
      <a :href="withBase(doc.url)" class="ag-doclist__link">
        <span class="ag-doclist__title">
          {{ doc.title }}<span v-if="doc.draft" class="ag-draft">{{ t.draft }}</span>
        </span>
        <span v-if="doc.description" class="ag-doclist__description">{{ doc.description }}</span>
      </a>
      <div v-if="doc.tags.length" class="ag-doclist__tags">
        <TagChip v-for="tag in doc.tags" :key="tag" :tag="tag" />
      </div>
    </li>
  </ul>
</template>
