<script setup>
// Footer of every page, styled like the agentics.world WorldOS footer. Beside the sidebar on wide screens.
import { useSidebar } from 'vitepress/theme'
import { useData } from 'vitepress'
import { useLang } from '../i18n.js'
import { links, site } from '../../site.js'

const { hasSidebar } = useSidebar()
const { lang, t } = useLang()
const { frontmatter } = useData()

const footerLinks = {
  en: [
    { name: 'Agentics', url: links.home },
    { name: 'WorldOS', url: links.worldos },
    { name: 'Updates', url: links.updates },
    { name: 'GitHub', url: links.github },
    { name: 'Docs source', url: site.repo },
    { name: 'Discord', url: links.discord },
    { name: 'X', url: links.x }
  ],
  zh: [
    { name: 'Agentics', url: links.home },
    { name: 'WorldOS', url: links.worldos },
    { name: '更新日志', url: links.updates },
    { name: 'GitHub', url: links.github },
    { name: '文档源码', url: site.repo },
    { name: 'Discord', url: links.discord },
    { name: 'X', url: links.x }
  ]
}
</script>

<template>
  <footer v-if="frontmatter.footer !== false" class="ag-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="ag-footer__content">
      <ul class="ag-footer__links">
        <li v-for="link in footerLinks[lang]" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.name }}</a>
        </li>
      </ul>
      <p class="ag-footer__copyright">{{ t.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.ag-footer {
  position: relative;
  width: 100%;
  padding: 0 24px 40px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

@media (min-width: 960px) {
  .ag-footer.has-sidebar {
    padding-left: calc(var(--vp-sidebar-width) + 32px);
  }
}

@media (min-width: 1440px) {
  .ag-footer.has-sidebar {
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width) + 32px);
  }
}

.ag-footer__content {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 40px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.ag-footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 32px;
}

.ag-footer__links a {
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  transition: opacity 0.2s ease;
}

.ag-footer__links a:hover {
  opacity: 0.7;
}

.ag-footer__copyright {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
}
</style>
