// Tag registry. A doc lists tag ids in its frontmatter (`tags: [whitebox, film]`); this file gives each id its
// English and Chinese label and the group it is listed under on the Tags page.
//
// To add a tag, add an entry here. A tag a doc uses but this file does not list still gets its own page
// (labelled with the bare id), and `npm run build` prints a warning so typos are caught.

export const tagGroups = [
  { id: 'level', en: 'Level', zh: '难度' },
  { id: 'type', en: 'Project type', zh: '项目类型' },
  { id: 'world', en: 'World', zh: '世界构建' },
  { id: 'create', en: 'Production', zh: '制作' },
  { id: 'system', en: 'Models & system', zh: '模型与系统' },
  { id: 'platform', en: 'Platform', zh: '平台' },
  { id: 'kind', en: 'Doc type', zh: '文档类型' }
]

export const tags = {
  // Level
  beginner: { group: 'level', en: 'Beginner', zh: '入门' },
  advanced: { group: 'level', en: 'Advanced', zh: '进阶' },

  // Project types (the built-in types and the plugin-based works)
  film: { group: 'type', en: 'Film & series', zh: '影视剧集' },
  'audio-to-video': { group: 'type', en: 'Audio to video', zh: '音频配画' },
  'digital-human': { group: 'type', en: 'Digital human', zh: '数字人' },
  mashup: { group: 'type', en: 'Mashup', zh: '混剪' },
  'motion-graphics': { group: 'type', en: 'Motion graphics', zh: '动效短片' },
  novel: { group: 'type', en: 'Novels', zh: '小说' },
  'audio-drama': { group: 'type', en: 'Audio drama', zh: '有声剧' },

  // Building the world
  'world-bible': { group: 'world', en: 'World bible', zh: '世界圣经' },
  characters: { group: 'world', en: 'Characters', zh: '角色' },
  voice: { group: 'world', en: 'Voices', zh: '声音' },
  creatures: { group: 'world', en: 'Creatures', zh: '生物' },
  scenes: { group: 'world', en: 'Scenes', zh: '场景' },
  props: { group: 'world', en: 'Props', zh: '道具' },
  'art-style': { group: 'world', en: 'Art style', zh: '画面风格' },
  '3d': { group: 'world', en: '3D sets & whitebox', zh: '3D 场景与白模' },
  'world-model': { group: 'world', en: 'Panoramas & world models', zh: '全景与世界模型' },
  music: { group: 'world', en: 'Music', zh: '音乐' },

  // Creating works
  screenplay: { group: 'create', en: 'Screenplay', zh: '剧本' },
  storyboard: { group: 'create', en: 'Storyboard', zh: '分镜' },
  directing: { group: 'create', en: 'Directing', zh: '导演' },
  'image-generation': { group: 'create', en: 'Image generation', zh: '图像生成' },
  'video-generation': { group: 'create', en: 'Video generation', zh: '视频生成' },
  audio: { group: 'create', en: 'Dialogue & sound', zh: '对白与音效' },
  editing: { group: 'create', en: 'Editing & post', zh: '剪辑与后期' },
  qa: { group: 'create', en: 'QA reviews', zh: '质量审核' },
  publishing: { group: 'create', en: 'Publishing', zh: '发布' },
  'sign-off': { group: 'create', en: 'Sign-off gates', zh: '人工签字' },

  // Models, engines and the system around them
  engines: { group: 'system', en: 'Agent engines', zh: 'Agent 引擎' },
  providers: { group: 'system', en: 'Providers', zh: '服务商' },
  comfyui: { group: 'system', en: 'ComfyUI', zh: 'ComfyUI' },
  cost: { group: 'system', en: 'Cost control', zh: '成本控制' },
  nsfw: { group: 'system', en: 'NSFW mode', zh: 'NSFW 模式' },
  automation: { group: 'system', en: 'Auto run', zh: '自动运行' },
  storage: { group: 'system', en: 'Storage', zh: '存储' },
  plugins: { group: 'system', en: 'Plugins', zh: '插件' },
  skills: { group: 'system', en: 'Skills', zh: '技能' },
  api: { group: 'system', en: 'API', zh: 'API' },
  security: { group: 'system', en: 'Security & privacy', zh: '安全与隐私' },

  // Platforms
  macos: { group: 'platform', en: 'macOS', zh: 'macOS' },
  windows: { group: 'platform', en: 'Windows', zh: 'Windows' },
  source: { group: 'platform', en: 'From source', zh: '源码运行' },

  // Doc types
  tutorial: { group: 'kind', en: 'Tutorial', zh: '教程' },
  'how-to': { group: 'kind', en: 'How-to', zh: '操作指南' },
  troubleshooting: { group: 'kind', en: 'Troubleshooting', zh: '问题排查' },
  reference: { group: 'kind', en: 'Reference', zh: '参考' }
}

/** Label for a tag in a language ('en' or 'zh'); unknown tags show their id. */
export function tagLabel(id, lang = 'en') {
  const tag = tags[id]
  return (tag && (tag[lang] || tag.en)) || id
}
