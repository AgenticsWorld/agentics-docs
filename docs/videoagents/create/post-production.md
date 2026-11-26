---
title: Post-production
description: Compare group versions, cut and repair clips, grade, add effects, packaging and sound adjustments, then render the final cut and sign off.
tags: [editing, sign-off, film, how-to]
order: 88
---

# Post-production

The **🎚️ Post-production** page is the finishing workbench between the approved group clips and the final cut. Every change you make is an adjustment on top of the original clip: you render it, compare it with the version before, and adopt it or throw it away. When the episode looks and sounds right, you render the final cut and sign off.

## Before you start

- The episode has group clips. Episodes without any are marked **no group clips** in the episode list.
- You also review the group clips here for the visual generation sign-off (H3B). See [Image and video generation](/videoagents/create/image-and-video-generation#visual-sign-off).

## Open the page

In the console, click the **🎚️ Post-production** icon in the top bar, or choose **🎚️ Post-production** from the page menu at the top right of any preview page. Pick the episode in the drop-down at the top left.

![The Post-production page for ep01: the group list on the left, the monitor with grp001 in the middle, Shot editing and Adjustments on the right, and the episode timeline at the bottom](/images/videoagents/create/post-production.webp)

The top row shows the number of groups, the episode's length and a count of adjustments (adopted, dispatched, drafts), the **H3P post sign-off** state, the **Layers** to show (**Picture**, **Packaging**, **Sound**), **📤 Export timeline** and **🎬 Render final**.

## The group list

The left column lists the groups by scene, with the scene's colour-script swatches. Filter it with **All**, **Pending review** (a new version waits for you), **Has drafts**, **Dispatched**, **Has defects** or **Untouched**.

Each row shows a thumbnail, length, number of shots and the current version (**v0** is the original clip). Four small dots show whether picture repair or VFX, grading, packaging and sound adjustments apply. A red dot marks an open defect and a yellow dot work in progress.

Tick **Multi-select** to pick several groups, for example to copy one adjustment to all of them.

## The monitor

| Control | What it does |
| --- | --- |
| **Single group** / **Play episode** / **View final** | Play the selected group, the whole episode group after group (including freeze and black holds at boundaries), or the rendered final cut |
| **A** / **A\|B** / **Wipe** / **Flip** | Show version A alone, A and B side by side, a draggable wipe between them, or flip between them with the space bar |
| **A** and **B** drop-downs | Choose which versions to compare. **★** marks the current version |
| **📷 Grab reference frame** | Save A's current frame as a reference for matching, relighting or repainting |
| **◻ Draw mask** | Drag a rectangle on the picture to limit an adjustment to that area |
| **◇ Mark range** | Set the start, then the end, of a time range in the group. It snaps to a shot cut within 0.3 seconds; hold Alt (⌥) to place it freely |

The arrow keys step one frame. Under the transport bar, the five sound lanes (**Original**, **Dub**, **Narration**, **BGM**, **SFX**) show what plays when, each with a 🔊 button to mute it. Click an item on a lane to select it; you can then jump to it or send feedback with **✏️ Edit**, and on the **Original** lane remove its vocals or ambience.

## Shot editing

The **✂️ Shot editing** panel changes a group's timing:

| Tool | What it does |
| --- | --- |
| **✂ Delete** | Cuts the marked ranges out of version A and joins the rest into a new, shorter version |
| **➕ Insert** | Inserts another version (picked with your system's file dialog, from the episode's archive by default) at the start, the end or the playhead |
| **⬛ Black / freeze** | Holds a frame and adds black at the playhead (a new version), or at the group's start or end (a transition at that boundary). More than a second of black tends to look like a fault |
| **📨 Send to editor** | Sends an instruction, optionally with marked ranges, to the Edit Agent, for example "shot 1 drags, cut it to 1.5 seconds" |

These tools make new versions that wait for you: the group shows **Pending review**, and a banner offers **Compare** and **Set v2 current**. When a group gets shorter or longer, the external audio and subtitles are moved to match when the final cut is assembled.

## Adjustments

The **🎨 Adjustments** panel lists the changes that apply to the selected group. First choose the **Scope**:

| Scope | Applies to |
| --- | --- |
| **Episode** | Every group |
| Scene (shown by its ID) | Every group in that scene |
| **Narrative block** | Every group in a flashback, dream or montage block |
| Group (shown by its ID) | This group |
| **Range** | A marked time range inside this group |

Adjustments at a broader scope are inherited and shown dimmed; **Override in this group** makes a group-level copy. A more specific scope wins over a broader one for the same kind of adjustment.

Then click **+ Add** in a section and pick the kind:

| Section | Adjustments |
| --- | --- |
| **Picture repair** | Local repaint, Deflicker, Logo removal (rectangle), Upscale, Frame interpolation, Slow motion |
| **Grading & light** | Basic correction, LUT preset, Scene palette, Reference frame match, Atmosphere · light, Soften, Follow lighting scheme, Reference frame relight |
| **VFX** | Overlay asset, Generate VFX |
| **Packaging** | Subtitle style, Watermark / bug, Fancy Text, Group transition (in), plus the episode switches for intro, outro, fancy text and letterbox bars |
| **SFX & sound** | Ambience, BGM segment, Dialogue / narration level, Mix target, Remove vocals, Remove ambience, plus the SFX cue sheet |

Adjustments are carried out in one of three ways:

- **Rendered on your computer** (for example basic correction, LUTs, deflicker, logo removal, overlays): **Quick preview**, then **Render**.
- **Done by an agent** (upscale, local repaint, interpolation, slow motion, relighting, generated VFX): **Dispatch** sends it to the **Post Finishing Agent**.
- **Recorded** (subtitle style, fancy text, transitions, ambience, BGM segments, levels, mix target): saved in the ledger and carried out by the responsible agent when the episode is finished.

### Compare and adopt

1. A rendered adjustment shows **A\|B compare**. Click it to see the new version next to the current one.
2. Click **Submit** to adopt it, **Discard** to drop it, or **Adjust & re-render** to change its settings.
3. After you adopt an adjustment on one group, the page offers to copy it as a draft to the other groups in the same scene that do not have it yet. **Copy to…** does the same for groups you choose.

Adjustments marked **🤖** were opened by an agent. For example, the **Grade Planner Agent** prepares grading for flashback and dream blocks; you compare and adopt them like your own.

::: tip
Original clips are never overwritten. Every result is a new version in `assets/post/<ep>/<group>/`, and the ledger of all adjustments is `edit/<ep>/post_plan.json`.
:::

## The episode timeline

The bar at the bottom shows every group along the episode, ◇ marks for transitions and red dots for defects, with one lane each for picture, packaging and sound adjustments. Click a group to select it, a ◇ to edit that transition, or a bar to jump to its adjustment. The button on the right shows the result of the last check (**Check: not run** before the first one).

## Render the final cut

1. Click **🎬 Render final** (or the check button on the timeline).
2. The pre-check lists your adjustments (adopted, rendered but undecided, drafts, dispatched, failed), the inputs it found, the packaging switches, the sign-off state and the result of each check. Anything that blocks rendering is listed in red.
3. If sound adjustments were submitted after the last mix, a warning suggests mixing again first.
4. Click **Render final**. VideoAgents joins the current version of every group, renders the transitions, adds the intro and outro (shifting audio and subtitles by the intro's length) and runs the checks. It usually takes a few minutes.

The result is `edit/<ep>/final.mp4`. The first time it replaces an existing final cut, the old file is kept as `final.pre_post.mp4`. Watch it with **View final**.

**📤 Export timeline** saves the current version chain as a CSV or EDL timeline, in case you want to finish the episode in another editing program.

## Sign off (H3P)

After transitions and subtitles are delivered, the Workflow Orchestrator creates the post-production sign-off.

1. The top row shows **H3P post sign-off · awaiting reply**.
2. Click **✅ Sign off**, or **⏸ Hold**.

Signing is refused while an adjustment is still dispatched or a check fails. When you sign, old version files are cleaned up: the original and the two most recent adopted versions of each group are kept. If you change anything afterwards, the row shows **H3P sign-off expired** and a new sign-off card is created.

## Good to know

- For motion-graphics projects, the picture is rendered from code, so only **SFX & sound** is available here; picture changes go through the code preview.
- Sound adjustments that separate voices (**Remove vocals**, **Remove ambience**) reach the final cut only after the episode is mixed again. Use **Dispatch remix** on the adjustment.

## Related

- [Editing, subtitles and packaging](/videoagents/create/editing)
- [Music and sound effects](/videoagents/create/music-and-sound)
- [Transitions](/videoagents/create/transitions)
- [QA reviews and defects](/videoagents/create/qa-reviews)
- [Sign-off gates](/videoagents/concepts/sign-off-gates)
