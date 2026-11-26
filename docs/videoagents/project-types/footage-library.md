---
title: Footage Library
description: Upload videos or paste YouTube and Bilibili links, split them into clips automatically, add subtitles and AI visual notes, and use the clips in mashups and reference files.
tags: [mashup, how-to, editing]
order: 45
---

# Footage Library

The Footage Library turns your own videos into a searchable set of clips. Upload a video file or paste a YouTube or Bilibili link, and it splits the video into shots, exports each shot as a clip, and lets you add subtitles and AI-written visual notes to every clip. [Mashup](/videoagents/project-types/mashup) projects pick their shots from it, and the **🖼 Reference Files** page can grab still frames from it.

The library is shared by all projects. Each library entry is called a footage project and lives in its own folder, `data/footage/<name>/`.

## Open the Footage Library

In the console, open **⚙️ → Advanced → Footage Library**. The page opens on the list of footage projects. The chip in the top-right corner shows the engine and model used for AI analysis.

## Create a footage project and import a video

1. Type a name in the box at the top (letters, digits, `_` and `-`), or leave it empty to get an automatic name such as `fp20261103-095619`. Click **＋ New project**.
2. The new project opens. Choose how to bring in the video:
   - **📤 Upload video file:** click the drop area or drag a video onto it. Common formats work, including `.mp4`, `.mov`, `.mkv`, `.webm`, `.m4v`, `.avi`, `.flv` and `.ts`.
   - **🔗 YouTube / Bilibili link:** paste the link and click **⬇ Download & process**. The video is downloaded at up to 1080p. The site's own subtitles (Chinese and English, manual ones preferred) are downloaded too. Downloads depend on your network and on the site; Bilibili HD may need you to be signed in.

   ![The YouTube / Bilibili link tab with the link box and the Download & process button](/images/videoagents/project-types/footage-library-link.webp)

3. Wait while the status chip moves through **Downloading** or upload progress, **Processing**, and **Ready**. You can click **Cancel** while it runs. Processing makes a small low-resolution copy for analysis, detects the shots, and exports every shot from the original video as a clip with a thumbnail.

Subtitles are not created automatically. Add them with **🎙 Speech to subtitles** when you need them.

## The project page

![A footage project page with tags, the minimum shot length and the action buttons](/images/videoagents/project-types/footage-library-project.webp)

The top of the page shows the source, duration and resolution, a link to the source video, the number of clips and how many are analysed, the subtitle files, and the status. Below it:

| Control | What it does |
| --- | --- |
| **🏷 Tags** | Type tags as `#tag1 #tag2`, separated by spaces. Saved when you leave the box |
| **🤖 AI analysis question** | The question asked about every clip in this project. Saved when you leave the box. **📋 Templates** fills in one of three presets: **Shot content analysis** (the default: picture, message, subject, tags), **Shot design analysis** (shot size, lighting, camera movement, art style, technique, set) and **Visual style analysis** (style, hard cuts, stable range) |
| **✂ Min shot length (s)** | Cuts closer together than this are merged into one shot. Default 0.5. Lower it for fast-cut footage, then click **✂ Re-split** |
| **🤖 Analyse all** | Runs AI analysis on every clip that has no visual notes yet, in the background |
| **🎙 Speech to subtitles** | Fills every clip's subtitle box. Uses the site's subtitles when they were downloaded, otherwise speech recognition on your computer |
| **🎙 Re-run with Whisper** | Shown when site subtitles exist: ignores them and uses local speech recognition instead |
| **✂ Re-split** | Detects the shots again |
| **📤 Re-import** | Upload another file or paste another link |
| **📂 Open folder** | Opens the project folder |
| **🗑 Delete project** | Deletes the project and its folder |

The output line links to `clips.json`, which lists every clip with its file, thumbnail, times, subtitle and visual notes.

## Clips

Each clip has its own card.

![A clip card with its thumbnail, timecodes, AI analysis and Delete buttons, and the subtitle and visual notes boxes](/images/videoagents/project-types/footage-library-clip.webp)

- Click the thumbnail to play the clip.
- Under it: start and end timecode, duration, and **⧉** to copy the clip's path inside the project.
- **Subtitles (speech-to-text, editable)** and **Visual notes (AI analysis or manual, editable)** save when you leave the box, or with Ctrl+S / Cmd+S.
- **🤖 AI analysis** builds a contact sheet from several moments of the clip and sends it, with the project's question, to the default engine. The answer is written into **Visual notes** in your interface language, and a **contact sheet** link appears next to the timecodes.
- **🗑 Delete** removes the clip, its file, subtitle and notes. The other clips keep their numbers, so a deleted number stays as a gap.

To print the clips, click **🖨️** in the bottom-right corner. It builds a page with two columns, clip screenshot and visual notes, and opens the print dialog, where you can also save a PDF.

## Find projects in the list

- The list shows every project's source, status, number of clips and analysed clips, and tags. Click a row to open it.
- Type `#tag` in the filter box to show matching projects. With several tags, a project must have all of them. Clicking a tag chip adds it to the filter or removes it.
- **🏷** on a row edits that project's tags in place; **⧉** copies the project's folder path.

## Use the clips

- **Mashup projects:** in the New Project wizard, the **Footage Library** field lists every footage project that has finished shot detection and has clips. The agents search the visual notes and subtitles to find shots, so analyse every clip first. See [Mashup](/videoagents/project-types/mashup).
- **Reference files:** on the **🖼 Reference Files** page, the **🎞 Footage Library** button in an image section opens a player for any footage project's original video. Find the frame and click **📸 Add screenshot to reference files** to save it at full resolution into that section. See [Reference files](/videoagents/world/reference-files).

## Good to know

- **AI analysis uses your default engine.** It follows the engine and model chosen in the console's top bar; with smart assignment, the engine's low-tier model is used. The engine has to be able to read images.
- **The preset questions are written in Chinese.** Write your own question if you prefer; the answer comes back in your interface language either way.
- **Subtitles overwrite.** **🎙 Speech to subtitles** replaces subtitles already in the boxes; you are asked first.
- **Speech recognition is local.** It uses faster-whisper, which downloads its model the first time.

::: warning
**✂ Re-split** and **📤 Re-import** delete the existing clips together with any subtitles and visual notes you edited. **🗑 Delete project** removes the whole folder, including the source video. None of these can be undone.
:::

## Related

- [Mashup](/videoagents/project-types/mashup)
- [Reference files](/videoagents/world/reference-files)
- [Stock image search](/videoagents/world/stock-images)
- [Language models and smart assignment](/videoagents/models/language-models)
