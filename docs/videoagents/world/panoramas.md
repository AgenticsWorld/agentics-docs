---
title: 360° panoramas
description: Create 360° panoramas at chosen spots in a scene's 3D set, look around them in the viewer, and save any view as a background plate.
tags: [world-model, scenes, 3d, how-to]
order: 76
---

# 360° panoramas

A panorama is a full 360° picture of a scene, taken from one spot in its 3D set called an anchor. You can look around it in the 360° viewer, save any view as a background plate, and build a [world model](/videoagents/world/world-models) from it.

Each panorama is a 2:1 image, 2880 × 1440 pixels. The image model draws it from a grey panorama of the 3D set taken at the anchor, the top-down layout and the scene's lighting scheme, so walls, doors and furniture land where the set has them.

## Before you start

- **Whitebox is on** (**🎛️ → Output Settings → Whitebox**) and the scene has a [3D set](/videoagents/world/3d-sets).
- **Your panorama model can draw 2:1 images.** Choose it with **🌐 Panorama model** at the top of Scene Preview. **Follow global** uses the image model on the **Generation Models** page.

  | Provider | 2:1 panoramas |
  | --- | --- |
  | Volcano Engine, BytePlus (Seedream) | Yes |
  | ComfyUI, Agentics | Yes |
  | Fal | Yes, except Nano Banana, Kontext and HunyuanImage |
  | MiniMax, OpenRouter | No |
  | Other providers | Not verified, treated as no |

::: warning
Each panorama is one image generation with your panorama model, billed by your provider.
:::

## When you need panoramas

In the default background plate modes (nine-grid), panoramas are not made automatically. You create them where you want them:

- to capture background plates by hand with **💾 Plate** (needed for shots waiting for a manual fill-in);
- as the source for a world model;
- for transitions: the transition designer can turn a panorama into a panning establishing shot (see [Transitions](/videoagents/create/transitions)).

Projects that still use the older Panorama plate mode get their anchors planned automatically from the shots' camera positions.

## The Panoramas panel

Open **🏔 Scene Preview**, pick a scene and find **🌐 Panoramas**, below the 3D set.

![The Panoramas panel for The Long Hall: anchors A1–A5 marked on the top-down plan, and anchor cards with their panoramas](/images/videoagents/world/panoramas-section.webp)

- **The heading** gives the number of anchors and whether the scene counts as **indoor (ceiling added)** or **outdoor**.
- **The top-down plan** shows each anchor as a blue marker. Scroll to zoom, drag to pan, double-click or **⟲** to reset.
- **Each anchor card** shows the anchor ID, its centre (x, z) in metres, the camera height and the yaw. **🔒 locked** and **manual** mark anchors that were set by hand. **serves cameras** lists the shots that use this anchor; click the line to see all of them.
- **Under each panorama** the caption gives the lighting scheme, the time of day and how it was made: **standalone** (drawn on its own) or **relit** (made from the same anchor's panorama in another lighting scheme, with only the light changed). Older panoramas may say **chained fill**.

## Create a panorama on the plan

1. Click **➕ Create panorama** in the panel heading. A form opens above the plan.
2. Click the spot on the plan. A yellow marker appears and **x** and **z** are filled in. Click again to move it.
3. Set the direction the centre of the panorama faces: drag the short line on the marker, or type **yaw**. It snaps to 0, 90, 180 and 270°; hold Shift to turn freely.
4. Pick a **Lighting scheme**. Schemes the shots use come first; the others say **not used by any camera**. The line below shows the weather, light direction and contrast of the chosen scheme.
5. Click **🌐 Generate panorama**. Progress shows in a log in the panel. When it finishes, the new anchor appears with its panorama.

![Creating a panorama: the new anchor A6 marked in yellow on the plan, with the x, z, y, yaw and lighting scheme fields](/images/videoagents/world/panoramas-create.webp)

| Field | Meaning |
| --- | --- |
| **x**, **z** | Position in metres. The origin is the centre of the scene; x grows to the right of the plan, z toward the bottom. |
| **y** | Height of the surface the camera stands on, in metres (0 = ground). Filled in for you from the 3D set, for example the top of a wall or a platform. When several surfaces are possible, their heights are listed next to the field. The camera sits at eye height above it. |
| **yaw** | Direction of the panorama's centre. 0° faces the top of the plan; 90° faces the left. |
| **Lighting scheme** | Which of the scene's lighting schemes to draw in |

Only this one panorama is made. Other anchors and existing plates stay as they are.

Two checks may stop you:

- **A spot high in mid-air with almost nothing around it.** If the camera is more than 3 m above the ground and the set's blocks fill only a tiny part of the view, a confirmation warns you. Such panoramas usually come out as aerial wide-angle photos, fail the projection check and waste a generation. Cancel and pick a lower or closer spot, or confirm to go ahead.
- **A spot inside a solid block, or above the roof of an indoor scene.** The job fails and lists the heights you can stand at instead.

You can also create a panorama from the camera position in the 3D set's orbit view. See [3D sets](/videoagents/world/3d-sets#create-a-panorama-from-the-current-view).

## Look around in the 360° viewer

Click a panorama to open it full screen.

![The 360° viewer inside The Long Hall, with the Plate, Flat image, reset and close buttons at the top right](/images/videoagents/world/panoramas-viewer.webp)

| Action | Control |
| --- | --- |
| Look around | Drag, or the arrow keys |
| Zoom | Scroll wheel or pinch |
| Reset the view | Double-click or **⟲** |
| See the whole flat image | **🖼 Flat image** (switch back with **🌐 360° preview**) |
| Close | Esc or **✕** |

## Save a view as a background plate

1. Open an anchor's panorama in the viewer.
2. Turn and zoom until the dashed frame holds the picture you want. The frame is always 16:9.
3. Click **💾 Plate**.

The view is saved at 1920 × 1080 together with its camera position and direction. It shows up in the scene's **🎦 Shot background plates** as "hand-captured (panorama A3)" and in the **Swap** list in Storyboard Preview. See [Background plates](/videoagents/create/background-plates).

## Archived panoramas

Every new panorama goes through automatic checks: does it really wrap around like a 360° picture (the projection check), does it follow the 3D set, and is it exactly 2:1. A panorama that fails, and an older version replaced by a redo, is not used. It is listed under its anchor as an archived image with a red badge (**❌ Projection check failed**, **❌ Whitebox conformity failed**, **❌ Not 2:1** or **🗄 Previous version (before redo)**) and the reason.

Click an archived image to inspect it in the 360° viewer. The seam of a panorama sits at its left and right edges, which is behind you in the viewer. Then:

- **✔ Adopt as official panorama** makes it the panorama for its lighting scheme. It costs nothing. The button is greyed out when the image was made for a different anchor position, is not 2:1, or the scheme already has an official panorama.
- **🗑 Discard** moves it to the anchor's `discarded/` folder. It no longer shows on the page; the file is kept, so you can move it back by hand.

## Ask for anchor changes

**✏️ Edit** in the panel heading sends a note straight to the **Shot Plates** agent. Use it to move, add or remove anchors or to have panoramas redrawn.

## Files

| Path | What it is |
| --- | --- |
| `assets/concepts/scenes/<SCN-ID>/panos/index.json` | Anchors, their positions and their panoramas |
| `assets/concepts/scenes/<SCN-ID>/panos/<anchor>/<scheme>.png` | A panorama (with a `.json` record of how it was made) |
| `assets/concepts/scenes/<SCN-ID>/panos/<anchor>/whitebox_pano.jpg` | The grey 3D-set panorama it was drawn from |
| `assets/concepts/scenes/<SCN-ID>/panos/<anchor>/discarded/` | Archived images you discarded |

## Troubleshooting

**➕ Create panorama is greyed out.**
Whitebox is off for the project, the scene has no 3D set yet, a panorama is already being generated, or the service needs a restart after an update.

**A red bar says the panorama model cannot produce 2:1 panoramas.**
Panoramas, and plates that depend on them, are paused. Pick a supported model in **🌐 Panorama model** (or on the **Generation Models** page) and ask for the panoramas again.

**Two panoramas of the same scene don't match.**
Each panorama is drawn on its own, guided by the 3D set and the scene's text. Compare them by eye. Ask the Shot Plates agent to redraw the one that is off, or adopt a better archived version.

## Related

- [3D sets](/videoagents/world/3d-sets)
- [World models](/videoagents/world/world-models)
- [Background plates](/videoagents/create/background-plates)
- [Scenes and top-down layouts](/videoagents/world/scenes)
- [Transitions](/videoagents/create/transitions)
