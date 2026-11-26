---
title: 3D sets
description: How each scene's top-down layout becomes a metric-scale 3D set, how to inspect it in Scene Preview, and what panoramas and plates use it for.
tags: [3d, scenes, how-to]
order: 74
---

# 3D sets

A 3D set is a simple, metric-scale model of a scene, built from boxes, spheres and cylinders laid over the top-down layout. Every shot group in that scene is staged inside the same set, so characters, cameras, panoramas and background plates all share one consistent space.

In the app the 3D set is called the **3D blockout**, and the project option that turns it on is **Whitebox**.

## Before you start

- **Whitebox must be on.** Check **🎛️ → Output Settings → Whitebox**. In the new-project wizard it follows the model-limits step: ticked for the Seedance 2.5 preset (the default when your active video model is Seedance 2.5), unticked for the other presets. You can change it either way.
- With Whitebox off there are no 3D sets. Scenes get front and reverse scene plates instead (see [Background plates](/videoagents/create/background-plates#projects-with-whitebox-off-scene-plates)).
- A scene needs its top-down layout before it can be modeled (see [Scenes and top-down layouts](/videoagents/world/scenes)).

## How a 3D set is made

1. At the start of an episode, the **Environment Concept Agent** draws the top-down layout of every new scene the episode uses.
2. The **Scene Modeling** agent then turns each new layout into a 3D set and saves it as `bible/scenes/<SCN-ID>/whitebox.json`. A set has:
   - its overall size in metres (width × height × depth);
   - objects for walls, door and window openings, furniture, trees and terrain, each a box, sphere or cylinder;
   - a note on how the scale was found.
3. Walls, doors and windows are measured off the plan. A wall that is not on the plan is not added, even if the description mentions it.
4. When the source gives no real measurements, the agent sets the scale from something with a known size, such as a door, a table or a person, and marks the size as estimated.
5. A layout check compares the set with the plan and saves `whitebox_overlay.png`: the plan with a 1 m grid, walls outlined in red, furniture footprints in blue and landmarks as yellow dots. It appears in the scene's **🖼 Scene plates** gallery, next to `layout_top.png`.

Each scene is modeled once, for the first episode that needs it. Later episodes reuse it. Characters are not part of the scene set: they are added per shot group during [3D whitebox previs](/videoagents/create/whitebox-previs).

## Look at a 3D set

1. Open **🏔 Scene Preview** and pick a scene. Scenes with a 3D set show **🧊** in the list.
2. The **3D blockout** panel sits right below the image gallery.

![The 3D blockout panel for the tea-table scene in orbit view: house, tree, long table and chairs on a 1 m grid](/images/videoagents/world/3d-sets-orbit.webp)

The line above the view gives the size (width × depth, height), the 1 m grid, the aspect ratio and whether the size is **Estimated dimensions** or **Calibrated dimensions**.

Choose how to look at the set in the menu at the top right:

| View | What you see |
| --- | --- |
| **Orbit view** | A free camera you fly through the set (default) |
| **Top view** | The set from straight above |
| **Real-scene view** | The top-down layout image laid on the floor, with the grey geometry hidden. Use it to check that the set matches the plan and that plates face the right way. |

![The same panel in Real-scene view: the layout image laid flat on the floor of the set](/images/videoagents/world/3d-sets-real-view.webp)

Moving in orbit view:

| Action | Control |
| --- | --- |
| Look around (turn in place) | Drag |
| Move forward along the view | Scroll wheel |
| Forward / back | Click the view, then W / S |
| Left / right | A / D |
| Up / down | Q / E |
| Faster | Hold Shift |

Also in the panel:

- **Status** shows whether the scene model file exists: **Present**, **Not generated** or **Unknown**. If it says the status is unknown, restart the service and refresh the page.
- **Modeling basis and checks** (click to open) shows the agent's note on how the scale was found, and any warnings from checking the set.

## Create a panorama from the current view

**➕ Create panorama** in the panel header makes a 360° panorama from where the orbit camera is now:

1. Switch to **Orbit view** and fly to the spot. Face the direction you want at the centre of the panorama.
2. Click **➕ Create panorama**. A confirmation lists the position (x, y, z), the heading (yaw) and the lighting scheme.
3. Confirm. Progress shows in the **🌐 Panoramas** panel below. When it finishes, the page reloads and the 3D view returns to the same spot.

The camera must be inside the floor area of the set (at least 0.5 m from the edge) and above the ground. Each panorama costs one image generation. See [360° panoramas](/videoagents/world/panoramas).

## Change a 3D set

Send a message to the **Scene Modeling** agent in the console (in the **05-Scenes** group), or to the **Workflow Orchestrator**. Name the scene and say what is wrong, for example "SCN-mad-tea-party: the table should be 6 m long and parallel to the house". After changing a set, the agent re-renders the whitebox videos of the shot groups already staged in it.

::: warning
If a set changes after you have signed off the whitebox (H3W), the affected groups need to be checked and signed off again, and their background plates redone. Redoing plates costs image generations.
:::

## Good to know

- **Coordinates.** 1 unit is 1 metre. Y points up, X to the right of the plan and Z toward the bottom of the plan. The origin is the centre of the scene, and the top of the plan is north. Panorama positions use the same numbers.
- **The floor matches the plan.** The set's width and depth have the same proportions as the layout image (a 16:9 plan gives depth = width × 9/16), because the plan covers the whole floor.
- **Open spaces.** A shaft, a cliff edge or a place in mid-air can be modeled without a floor and without the grid.
- **One set per scene.** If a place has two forms that cannot share one layout, it is split into two scenes.
- **No generation cost.** 3D sets are drawn in your browser and rendered on your computer.
- **Not the same as 3D models.** GLB models of characters or props live in reference files. See [3D models](/videoagents/world/3d-models).

## Files

| Path | What it is |
| --- | --- |
| `bible/scenes/<SCN-ID>/whitebox.json` | The 3D set as written by the agent |
| `assets/concepts/scenes/<SCN-ID>/whitebox.scene.json` | The checked, compiled set the viewers load |
| `assets/concepts/scenes/<SCN-ID>/whitebox_overlay.png` | Layout check image |

## Related

- [Scenes and top-down layouts](/videoagents/world/scenes)
- [3D whitebox previs](/videoagents/create/whitebox-previs)
- [Director's Console](/videoagents/create/directors-console)
- [360° panoramas](/videoagents/world/panoramas)
- [Background plates](/videoagents/create/background-plates)
