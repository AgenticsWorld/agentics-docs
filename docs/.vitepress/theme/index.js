import DefaultTheme from 'vitepress/theme'
// Inter and Montserrat are bundled from Fontsource like on agentics.world (no request to Google Fonts).
import '@fontsource-variable/inter'
import '@fontsource-variable/montserrat'
import './style.css'
import Layout from './Layout.vue'
import CategoryIndex from './components/CategoryIndex.vue'
import DocsHome from './components/DocsHome.vue'
import TagIndex from './components/TagIndex.vue'
import TagPage from './components/TagPage.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Usable in any Markdown page
    app.component('CategoryIndex', CategoryIndex)
    app.component('DocsHome', DocsHome)
    app.component('TagIndex', TagIndex)
    app.component('TagPage', TagPage)
  }
}
