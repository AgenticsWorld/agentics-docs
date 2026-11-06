// One page per tag used by the English docs (tags/<tag>), rendered by [tag].md.
import { usedTags } from '../.vitepress/lib/content.js'

export default {
  paths: () => usedTags('en').map((tag) => ({ params: { tag } }))
}
