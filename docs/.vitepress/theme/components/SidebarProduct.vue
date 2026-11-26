<script setup>
// Top of the sidebar: the product the sidebar belongs to, linking to its docs home.
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as pages } from '../docs.data.js'

const { page } = useData()

const product = computed(() => {
  const current = pages.find((p) => p.path === page.value.relativePath)
  return current && pages.find((p) => p.lang === current.lang && p.kind === 'product' && p.product === current.product)
})
</script>

<template>
  <a v-if="product" :href="withBase(product.url)" class="ag-sidebar-product">
    <img v-if="product.logo" :src="withBase(product.logo)" alt="" width="28" height="28" />
    <span>{{ product.title }}</span>
  </a>
</template>
