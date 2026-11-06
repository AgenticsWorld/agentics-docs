// One page per tag used by the Chinese docs (zh/tags/<tag>), rendered by [tag].md.
import { usedTags } from '../../.vitepress/lib/content.js'

export default {
  paths: () => usedTags('zh').map((tag) => ({ params: { tag } }))
}
