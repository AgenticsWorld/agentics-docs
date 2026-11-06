<script setup>
// The default VitePress layout plus the Agentics pieces: category trail above each doc, tags below it, site footer.
import DefaultTheme from 'vitepress/theme'
import DocMeta from './components/DocMeta.vue'
import DocTags from './components/DocTags.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before><DocMeta /></template>
    <template #doc-footer-before><DocTags /></template>
    <template #layout-bottom><SiteFooter /></template>
  </Layout>
</template>
