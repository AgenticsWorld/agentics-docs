---
title: Background plates
description: Empty-set pictures from each shot's camera that anchor video generation. How they are made, the plate modes, and how to swap, edit, crop or capture them.
tags: [storyboard, video-generation, scenes, how-to]
order: 55
---

# Background plates

A background plate is a picture of the empty set as seen from one shot's camera. The video model gets it as a reference for that shot, so the framing, perspective, camera height and set dressing match the 3D set, and the same place looks the same from shot to shot.

Plates are references only. The video model adds the characters and the motion, and never freezes the shot on the plate.

## Before you start

- **Whitebox is on** (**🎛️ → Output Settings → Whitebox**). Projects with Whitebox off use front and reverse scene plates instead; see [the last section](#projects-with-whitebox-off-scene-plates).
- **The whitebox is signed off.** Plates are made after you approve the episode's whitebox staging (the H3W sign-off) and its whitebox videos are exported, and before the storyboard sign-off (H3A). See [Sign-off gates](/videoagents/concepts/sign-off-gates).

## How plates are made

The **Shot Plates** agent makes them for each episode:

- **Every shot gets a start plate.** A moving shot (a long tracking move, a crane or an orbit) also gets an end plate for where the move ends.
- **Plates are always 16:9**, whatever the project's aspect ratio, so portrait projects get landscape plates too.
- **Plates go into the scene's plate library** and are shared by all shot groups and episodes in that scene.
- **They use the scene image model**: **🎨 Image model** at the top of Scene Preview, or the global image model when it is set to **Follow global**.

### Background plate modes

The mode decides where plates come from. Both current modes start the same way. For each scene and lighting scheme, one 3×3 grid is drawn from the top-down layout:

- all nine tiles share one standpoint, placed in the middle of the episode's camera positions at a camera height taken from the shots;
- eight tiles look out every 45° at eye level (north, north-east, east and so on);
- the ninth looks up where shots look up, or adds one more eye-level view when none do.

The grid is cut into nine plates, and each shot gets the closest tile. A tile does not fit when its direction is more than 30° off, its tilt more than 20° off, it is more than 6 m away, or its camera height is two bands off.

| Mode | When no tile fits |
| --- | --- |
| **Nine-grid, auto fill-in** (default) | A fill-in plate is made automatically. Shots facing the same way share one fill-in, made by editing a library plate to the new viewpoint. Each fill-in costs one image generation. |
| **Nine-grid, manual fill-in** | Nothing is generated. The nearest tile stands in, marked "waiting for manual fill-in", until you capture a plate with **💾 Plate** in a panorama or world-model viewer, or swap one in by hand. Then ask for the plates to be run again. |

Choose the mode in **🎛️ → Output Settings → Background plate mode**. The row only shows when Whitebox is on, and the new-project wizard has it too. To use a different mode for one scene, open **🏔 Scene Preview**, pick the scene and change **Background plate mode** in the heading of **🎦 Shot background plates**: **Follow global**, **Nine-grid, auto fill-in** or **Nine-grid, manual fill-in**.

Older projects may still show the **Panorama** or **World model** modes. They are hidden for new projects but keep working where they are set.

Two more things happen on their own:

- **Your picks come first** (from v1.0.45). If you swapped a plate by hand for a shot that faces the same way, in the same scene and lighting scheme, the automatic choice reuses your pick for other such shots.
- **Grid tiles are upscaled** (from v1.0.44). A tile cut from the grid is small, so every tile a shot uses is redrawn at full size with the scene image model: when the plates run ends, right after you swap one in, and before video generation. If upscaling fails, the shot keeps the smaller tile.

## See a shot's plates

In **Storyboard Preview**, each shot ends with **🖼 Shot background plates**.

![A shot card in Storyboard Preview with its start and end plates and their Swap buttons](/images/videoagents/create/background-plates-shot.webp)

- Each plate is labelled **Start** or **End** with where it came from, for example **Nine-grid**, **nine-grid fill-in**, **canvas fill**, **manual capture**, **manually swapped**, **regenerated from feedback** or **same-direction hand pick**. For grid tiles the label adds **upscaling…**, **upscaled** or **interpolated tile** (not upscaled yet).
- Click the label to open the plate in Scene Preview. Click the picture to enlarge it.
- **📍** next to the title moves the group's whitebox to the start of this shot.

## Swap a plate

1. Click **🔁 Swap** under the plate.
2. Pick another plate from the scene's library. Plates that other shots facing the same way already use come first, marked **⭐ Same direction**. Double-click a picture to enlarge it.
3. Click **✔ Replace with this one**.
4. If other shots in this episode face the same way and have not been swapped by hand, the dialog lists them, all ticked. Click **✔ Swap together** to give them the same plate, or untick the ones to keep.

![The Swap Shot Plate dialog listing library plates, with same-direction plates marked](/images/videoagents/create/background-plates-swap.webp)

The swap takes effect in the video the next time the group is generated. A normal re-run of the plates keeps your choice; only a forced re-run decides again from the camera positions.

## Ask for a changed plate

You can describe a change in words, and an agent makes a new plate from the current one. The original plate stays in the library.

| Where you click **✏️ Edit** | Who gets the note | What is replaced |
| --- | --- | --- |
| Under a plate in **Storyboard Preview** | The [Reviser](/videoagents/concepts/reviser) | Only this shot's plate |
| Under a plate in Scene Preview's **🎦 Shot background plates** | The **Shot Plates** agent directly | Every shot that uses this plate, unless your note names only some |

In Scene Preview you can also attach up to four reference images with **+** in the note box, for example a picture of the lamp you want. They are read from your computer, not uploaded.

The new plate is saved as `<key>_rev1`, `_rev2` and so on, at 1920 × 1080. Shots in later episodes that pick plates automatically still get the original. To use the revised one there, swap it in.

## The plate library

Scene Preview's **🎦 Shot background plates** section lists every plate of the scene.

![The Shot background plates section of The Long Hall in Scene Preview, with the per-scene Background plate mode menu and plate cards](/images/videoagents/create/background-plates-library.webp)

Each caption gives the facing, camera height, lens in mm, time of day and where the plate came from, and the last line lists the shots that use it. The buttons:

| Button | What it does |
| --- | --- |
| **✂ Crop** | Drag a 16:9 box over the plate and click **✂ Confirm crop**. The cropped plate replaces the original; a `.orig` backup is kept. |
| **⧉ Copy** | Adds a copy to the library. The original is untouched, and the copy can be picked with **Swap**. |
| **✏️ Edit** | Sends a note to the Shot Plates agent (see above) |
| **Canvas** | Opens the plate in the image editor. See [Canvas: edit an image](/videoagents/world/image-canvas). |

## Capture plates by hand

Any view in a panorama or a world model can become a plate:

1. In Scene Preview, open a panorama from **🌐 Panoramas** or a world model from **🌍 World model**.
2. Turn until the dashed 16:9 frame holds the picture you want.
3. Click **💾 Plate**.

The plate is saved at 1920 × 1080 with its camera position, captioned "hand-captured (panorama A3)" or "hand-captured (world model)", and is offered in **Swap**. In **Nine-grid, manual fill-in** mode, a hand capture that fits a waiting shot is picked up the next time plates run. See [360° panoramas](/videoagents/world/panoramas) and [World models](/videoagents/world/world-models).

## Projects with Whitebox off: scene plates

Without a 3D set there are no per-shot plates. Each scene gets up to two scene plates instead, at 2560 × 1440:

- **Front plate**: standing in the doorway, looking in, with the main furnishings in view and nobody in it. The **Environment Concept Agent** draws it at the start of the first episode that uses the scene.
- **Reverse plate**: from the far end, looking back at the doorway. It is made from the front plate when a shot needs it. The storyboard marks each shot as front or reverse.
- **Lighting variants**: when a group uses a different lighting scheme from the plate's (night instead of day), a copy with only the light changed is made from it.

Choose how many plates in **🎛️ → Output Settings → Scene plate mode** (shown only when Whitebox is off):

| Option | What you get |
| --- | --- |
| **Auto: front always, reverse as shots need** (default) | A front plate for every scene, plus a reverse plate when a shot looks back |
| **Front only** | Front plates only. Good for flat animation or one-sided sets. |
| **Both front and reverse** | Both plates for every scene |

To change it for one scene, use **Scene mode** in the scene's **🖼 Scene plates (front / reverse)** section in Scene Preview. The section shows both plates with where the camera stands, what it looks at and what is in frame, and marks a reverse plate **Stale** when the front plate has been redrawn. In Storyboard Preview, each shot shows which scene plate it uses.

## Files

| Path | What it is |
| --- | --- |
| `assets/concepts/scenes/<SCN-ID>/plates/` | The scene's plate library: `<key>.png` with a `.json` record each, and `index.json` |
| `directing/<ep>/shot_plates.json` | Which plate each shot of the episode uses |
| `assets/concepts/scenes/<SCN-ID>/main_01.png`, `reverse_01.png`, `scene_plates.json` | Scene plates (Whitebox off) |

## Troubleshooting

**The plate section says there are no shot plates yet.**
Plates are made after the whitebox sign-off (H3W) and export. Sign off the episode's whitebox first.

**A shot says "waiting for manual fill-in".**
The scene uses manual fill-in and no tile fits. Capture a plate with **💾 Plate** or swap one in, then ask the Workflow Orchestrator to run the plates again.

**A yellow note says the plate mode is World model but there is no world model.**
Plate generation for that scene stops. Generate a world model with **➕ Generate world model**, or switch the scene back to a nine-grid mode.

## Related

- [3D whitebox previs](/videoagents/create/whitebox-previs)
- [Storyboard preview](/videoagents/create/storyboard-preview)
- [360° panoramas](/videoagents/world/panoramas)
- [World models](/videoagents/world/world-models)
- [Image and video generation](/videoagents/create/image-and-video-generation)
