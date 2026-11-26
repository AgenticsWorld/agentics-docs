<script setup>
// The default VitePress layout plus the Agentics pieces: the product at the top of the sidebar, the trail above each
// doc, tags below it, site footer.
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocMeta from './components/DocMeta.vue'
import DocTags from './components/DocTags.vue'
import SidebarProduct from './components/SidebarProduct.vue'
import SiteFooter from './components/SiteFooter.vue'

const { Layout } = DefaultTheme
const route = useRoute()

// Every sidebar section starts open (lib/content.js), so the list is long: when the current page's entry is out of
// view, scroll the sidebar (only the sidebar) to bring it to the upper third.
function revealActiveLink() {
  requestAnimationFrame(() => {
    const sidebar = document.querySelector('.VPSidebar')
    const active = sidebar && sidebar.querySelector('.VPSidebarItem.is-active > .item')
    if (!active) return
    const box = sidebar.getBoundingClientRect()
    const item = active.getBoundingClientRect()
    if (item.top >= box.top + 80 && item.bottom <= box.bottom - 24) return
    sidebar.scrollTop += item.top - box.top - box.height / 3
  })
}

onMounted(() => nextTick(revealActiveLink))
watch(
  () => route.path,
  () => nextTick(revealActiveLink)
)
</script>

<template>
  <Layout>
    <template #sidebar-nav-before><SidebarProduct /></template>
    <template #doc-before><DocMeta /></template>
    <template #doc-footer-before><DocTags /></template>
    <template #layout-bottom><SiteFooter /></template>
  </Layout>
</template>
