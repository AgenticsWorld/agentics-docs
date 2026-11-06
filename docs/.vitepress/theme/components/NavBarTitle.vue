<script setup>
// Replaces VitePress's VPNavBarTitle (see the alias in config.js). Same brand as the agentics.world WorldOS top bar:
// the Agentics mark links to agentics.world, then a slash, then the product logo and name link to the docs home.
import { useSidebar } from 'vitepress/theme'
import { withBase } from 'vitepress'
import { useLang } from '../i18n.js'
import { links } from '../../site.js'

const { hasSidebar } = useSidebar()
const { t } = useLang()
</script>

<template>
  <div class="VPNavBarTitle ag-brand" :class="{ 'has-sidebar': hasSidebar }">
    <a :href="links.home" class="ag-brand__home" aria-label="Agentics home">
      <svg width="28" height="28" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M560 320V160L400 320H240L80 480H240V640L400 480H560V640L720 480H560L720 320H560Z" fill="currentColor" />
      </svg>
    </a>
    <span class="ag-brand__slash" aria-hidden="true">/</span>
    <a :href="withBase(t.home)" class="ag-brand__product">
      <img :src="withBase('/worldos-logo.png')" alt="" width="24" height="24" />
      <span>{{ t.docsTitle }}</span>
    </a>
  </div>
</template>

<style scoped>
.ag-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  height: var(--vp-nav-height);
  border-bottom: 1px solid transparent;
  color: var(--vp-c-text-1);
}

@media (min-width: 960px) {
  .ag-brand {
    flex-shrink: 0;
  }

  .ag-brand.has-sidebar {
    border-bottom-color: var(--vp-c-divider);
  }
}

.ag-brand__home {
  display: flex;
  flex: none;
  color: var(--vp-c-text-1);
}

.ag-brand__slash {
  color: var(--vp-c-text-3);
}

.ag-brand__product {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-family: var(--ag-font-heading);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

.ag-brand__product img {
  flex: none;
  border-radius: 6px;
}

.ag-brand a {
  transition: opacity 0.2s ease;
}

.ag-brand a:hover {
  opacity: 0.7;
}

@media (max-width: 420px) {
  .ag-brand {
    gap: 8px;
  }

  .ag-brand__home svg {
    width: 22px;
    height: 22px;
  }

  .ag-brand__product {
    font-size: 14px;
  }
}
</style>
