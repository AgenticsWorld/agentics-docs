---
title: "Canvas: edit an image"
description: Mark exactly what to change on an image, upscale or crop it, keep every version, and choose which one the project uses.
tags: [image-generation, characters, how-to]
order: 95
---

# Canvas: edit an image

The **🖌 Canvas** page edits one existing image precisely. Draw around the part you want changed and say what it should become, add reference images, upscale, crop, flip or rotate. Every result is kept as a version in the image's history, and nothing in the project changes until you click **Set as final**.

Use it when **✏️ Edit** is too coarse: Edit sends written notes to the Reviser, while the Canvas lets you point at the exact spot, see the result and compare versions side by side.

## Open an image in the Canvas

Click **🖌 Canvas** next to an image. The button is on:

| Page | Images |
| --- | --- |
| [Character Preview](/videoagents/world/characters) | Character sheets and costume sheets |
| [Scene Preview](/videoagents/world/scenes) | Scene images and shot background plates |
| [Creature Preview](/videoagents/world/creatures), [Prop Preview](/videoagents/world/props) | Creature sheets and prop images |
| [Storyboard board](/videoagents/create/storyboard) | Sketches |
| [Final Release](/videoagents/create/publishing) | Covers |
| [Reference Files](/videoagents/world/reference-files) | PNG, JPG and WebP images (not GIF, BMP or TIFF) |

The Canvas opens in the same window. Click **&lt;** at the top left to go back; the page you came from shows the new image if you set one as final.

![Canvas page for Alice's character sheet: the toolbar with marking tools, view and adjust buttons; a rectangle marked around the pinafore pocket with a numbered region note; the Edit tab on the right with the image model, overall instruction, reference images and Send](/images/videoagents/world/image-canvas.webp)

The toolbar is above the image, and the side panel has five tabs: **Edit**, **Upscale**, **History**, **Info** and **Animate**. The footer shows the version you are viewing and its size.

## Edit with marked regions

1. In the toolbar under **Mark**, pick a tool: **▭ Rectangle**, **◯ Ellipse**, **➰ Lasso** or **🖌 Brush** (the slider sets the brush width). **✋ Pan** drags the picture; scroll to zoom. **Fit** and **100%** change the zoom.
2. Draw around each place you want changed. Each region gets a number, and a line in **Marked regions** where you write what should change there. You can mark up to 12 regions. **↶ Undo** removes the last region, **Clear** removes all, **✕** removes one.
3. In **Overall instruction**, write anything that applies to the whole picture. Without any region, the instruction applies to the whole image.
4. Optionally add **Reference images**: drop or paste images, click **Upload**, or **Pick from project**. Give each a note. Type `@` in your text to mention one (it appears as `@ref1`, `@ref2` …). Up to 8 reference images go with one edit.
5. Check the options:
   - **Lock outside** (on when you mark regions): only the marked areas are pasted back onto the original; everything else stays exactly as it was.
   - **Send straight to the image model, without the agent rewriting it**: faster, good for small edits. When it is off, the Canvas Retouch Agent looks at the picture and your marks and writes the prompt.
   - **Review the prompt first**: the prompt is shown to you to confirm or change before anything is generated.
6. Pick the **Image model** at the top of the tab if you want something other than the global image setting. This choice is for this page only.
7. Click **Send**.

The result is added to **History** as a new version. Edits keep the original resolution.

The rectangle tool can keep a fixed aspect ratio: pick one in the menu next to **▭ Rectangle** (**Free ratio**, 1:1, 4:3, 3:4, 16:9, 9:16 or **Custom…**). The footer shows the selection's size in pixels.

::: warning
Each edit, redraw upscale or video is a paid call to the model you picked.
:::

### When the model moves the whole picture

With **Lock outside** on, the Canvas also measures how much the model changed outside the marks. If it changed a lot (for example, the whole image shifted), the version is tagged **Outside drift**: the seams around the pasted area may not line up. Click **Use full image** on that version in History to save the model's whole image as another version instead.

### Try a style

**🎨 Choose from Style Library**, next to **Overall instruction**, adds a sentence asking to redraw the picture in that style while keeping composition, people and positions. Picking another style replaces it. It is a test on this image only and does not change the project's [art style](/videoagents/world/art-style).

## Upscale

On the **Upscale** tab, pick a **Method**:

- **Redraw:** an image model renders a larger image from the original. You get more detail, but faces, text and textures may drift. The tab shows how large the chosen model can go for this image's aspect ratio.
- **Fidelity upscale:** a dedicated upscaler that does not redraw the content. **Local** interpolation is free and instant but adds no detail; the Fal upscalers (such as SeedVR2, Topaz, Real-ESRGAN, AuraSR, Bria) need a Fal key.

Set the **Target size** and click **Start upscaling**. A result that is not actually larger than the original counts as failed. The result goes into History; compare it there before setting it as final.

## Crop, flip, rotate, resize

Under **Adjust** in the toolbar: **✂ Crop to selection** (crops to the last rectangle you drew), **⇋ Flip horizontal**, **⇅ Flip vertical**, **⟳ Rotate** (90° clockwise) and **⤢ Resize…**. Each one saves a new version. These do not use any model.

## Compare and choose a version

![History tab with version v000 marked Original and Final, and the Viewing, Compare and Download buttons](/images/videoagents/world/image-canvas-history.webp)

The **History** tab lists every version: the original, your edits, upscales and adjustments, and any version that appeared because an agent redrew the image elsewhere. Each version shows its size, date and how it was made.

- **View** shows a version. New edits use the version you are viewing as their base.
- **Compare** picks a version to compare with. Then choose a mode under **Compare** in the toolbar: **Wipe** (a slider), **Blink** (hold **Hold for B** to see the other version) or **Difference**.
- **Download** saves the file. **Delete** removes a version from the list (the file is moved to a trash folder, not deleted).
- **Set as final** makes that version the one the project uses.

### What "Set as final" does

A window first shows what will happen and which shots or groups use the image:

- For a character, costume, creature, prop or scene image, a cover or a reference file, the chosen version overwrites the original file. The replaced image stays in History, so you can switch back at any time.
- For a shot background plate, the original stays; the new version is registered as a new plate (`<name>_revN`), and you can repoint the shots that use the old one.
- **Send this change to the Reviser to update the setting text** (characters, costumes, scenes, plates, creatures and props): tick it so the written description matches the new look. Otherwise a later redraw may bring the old look back.
- Nothing downstream is rerun. Videos already generated keep the old image. When shots use the image, a change record is written so the Workflow Orchestrator can mark what is affected.

## Animate an image

The **Animate** tab makes a short video from the version you are viewing. The video goes only into this image's list of videos and never into the production.

- **Mode:** **Reference image** (the image guides the video, optionally with a second version as **Reference 2**), **First/last frames** (the image is the first frame and another version the last; needs a video model that supports first and last frames) or **360° orbit** (the camera circles the subject and returns to the start; the image must be square, and **✂ Crop to a centred square** fixes that).
- **Video Model:** follows the global video setting unless you pick another; the choice is for this page only.
- **Video settings:** length (default 15 seconds, 2–30), resolution (default 480p) and whether to generate sound.
- **Video prompt:** describe how the picture moves, or click **🎲 Write one from the image** to have an agent write it.
- Click **Generate video**. Finished videos are listed under **Videos from this image**, with **Copy path**, **Copy prompt**, **Reuse prompt**, download and delete.

## Where the files are

Each image's history is kept in `assets/canvas/<image path>.<hash>/`: every version, the reference images you uploaded, the jobs and the videos. Versions are never written into the asset folders until you set one as final.

## Good to know

- One edit or upscale runs at a time per image, and one video at a time; you can edit while a video is being made.
- If NSFW mode is on (**⚙️ → Advanced → NSFW mode**), a **🔞 NSFW** switch appears in the toolbar to send this image's edits and videos to your NSFW fallback models. See [NSFW mode](/videoagents/models/nsfw-mode).
- If the edit agent ends without writing a prompt, the job is marked as failed on the next check.

## Related

- [Characters](/videoagents/world/characters)
- [Reference files](/videoagents/world/reference-files)
- [The Reviser and revision notes](/videoagents/concepts/reviser)
- [Image models](/videoagents/models/image-models)
- [Upscale](/videoagents/models/upscale)
