<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { useLang } from '../i18n.js'
import { tagLabel } from '../../tags.js'

const props = defineProps({
  tag: { type: String, required: true },
  count: { type: Number, default: null }
})

const { lang, t } = useLang()
const href = computed(() => withBase(t.value.tagsHome + encodeURIComponent(props.tag)))
</script>

<template>
  <a :href="href" class="ag-tag">
    <span class="ag-tag__hash" aria-hidden="true">#</span>{{ tagLabel(tag, lang) }}<span v-if="count !== null" class="ag-tag__count">{{ count }}</span>
  </a>
</template>
