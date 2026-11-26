---
title: Sketch on your phone
description: Scan a QR code on the Storyboard page, draw a shot's sketch with your finger on your phone, and have the AI redraw it or use it as drawn.
tags: [storyboard, how-to]
order: 25
---

# Sketch on your phone

When a sketch doesn't show the framing you have in mind, draw it yourself. Scan a QR code on the **📋 Storyboard** page, draw the shot with your finger on your phone, and submit it: the AI redraws your drawing in the storyboard sketch style, or your drawing becomes the shot's sketch as it is.

## Before you start

- Your phone and the computer running VideoAgents are on the same local network (the same Wi-Fi, for example).
- The episode has a storyboard. See [Storyboard board](/videoagents/create/storyboard).

## Draw a sketch

1. On the **📋 Storyboard** page, find the shot and click **✍️ Hand-draw** under its sketch.
2. A dialog opens with a QR code and a link under it. Scan the QR code with your phone's camera. The session is valid for 30 minutes.

   ![The Hand-drawn Sketch dialog for ep01 / S01-04: instructions, a QR code and link (blurred here), and "Waiting for phone submission… (session valid for 30 minutes)"](/images/videoagents/create/sketch-on-your-phone-qr.webp)

3. The drawing page opens on your phone, titled **✏️ Hand-drawn Sketch** with the project, episode and shot (for example `alices / ep01 / S01-04`). Draw on the white canvas.

   ![The phone drawing page held sideways: a stick-figure sketch on a 16:9 canvas, the pen, eraser, undo, clear, aspect and fullscreen buttons, the AI refine checkbox, a note and the Submit button](/images/videoagents/create/sketch-on-your-phone-canvas.webp)

4. Optionally add a note about composition, characters or action. With **✨ AI refine** on, the AI reads it when it redraws your sketch; with it off, the note is kept with the sketch.
5. Leave **✨ AI refine** checked to have the AI redraw your drawing, or uncheck it to use your drawing as is (see below).
6. Tap **Submit**. The page confirms and tries to close itself. If it stays open, close the tab, or tap **✏️ Draw another** to keep drawing.

Back on the computer, the dialog reports that your drawing arrived and closes. With **✨ AI refine** on, the shot's cell shows the sketch being redrawn, and the new sketch appears when it is done. With it off, your drawing appears at once.

## Drawing tools

| Button | What it does |
| --- | --- |
| **✏️ Fine pen** | Thin black line (the default) |
| **🖊 Thick pen** | Thick black line |
| **◻ Eraser** | Erases with a wide stroke |
| **↩ Undo** | Removes the last stroke |
| **🗑 Clear** | Clears the canvas |
| **▭ 16:9** | Shows the canvas shape. Tap it to switch between landscape and portrait (for example 16:9 and 9:16). Strokes stay where they are; anything outside the new frame is cut off, and you can undo. |
| **⛶ Fullscreen** | Hides the toolbar and note so the whole screen is canvas. Tap **✕ Exit fullscreen** to come back. |

The canvas takes the project's aspect ratio and is 1280 pixels on its long side. For a landscape canvas, hold the phone sideways. If your phone's browser is locked to portrait, the page uses the phone's motion sensor to turn the canvas when you hold it sideways. On an iPhone, the browser asks for permission to use the sensor the first time you touch the page.

## AI refine on or off

| **✨ AI refine** | What happens | Cost |
| --- | --- | --- |
| On (default) | Your drawing is kept as `assets/storyboard/<ep>/_hand/<shot>.png` and used as the layout for a new sketch. The sketch model redraws it in the page's current sketch style, with the cast's character sheets as references. If the image model can't take reference images or the drawing fails, your original drawing is used instead. | One image generation |
| Off | Your drawing becomes the shot's sketch as it is. | None |

Either way, the result replaces the shot's sketch at `assets/storyboard/<ep>/<shot>.png`. The sketch's line in the cell shows **✍️ Hand-draw** for a drawing used as is, or ✍️✨ with the model name for a refined one. Like all sketches, it is for checking composition only and is not used as a video reference.

::: tip
The same phone canvas is used on the [Storyboard preview](/videoagents/create/storyboard-preview) page to draw a reference image for a generation group. There, with AI refine on, the drawing and the group's reference images become a finished image in the project's style, and the note is required.
:::

## Troubleshooting

**The phone can't open the page.**
Check that the phone is on the same network as the computer. The drawing page is served on its own port, by default the console's port plus one (8631 when the console runs on 8630). That port serves only the drawing page; the console itself stays private to your computer. A firewall that blocks incoming connections on the computer also blocks the phone.

**The QR code points to a strange address.**
VPN and proxy tools can add virtual network adapters. VideoAgents skips the common ones, but if the link still shows the wrong address, set the `VIDEOAGENTS_LAN_IP` environment variable to your computer's local network address and restart the service.

**The phone says the session is invalid.**
Sessions last 30 minutes and end when the service restarts. Click **✍️ Hand-draw** again for a new QR code.

**Submitting is refused because the sketch is being generated.**
The shot's sketch is being drawn right now. Wait until it finishes, then submit again.

## Related

- [Storyboard board](/videoagents/create/storyboard)
- [Animatic](/videoagents/create/animatic)
- [Storyboard preview](/videoagents/create/storyboard-preview)
- [Security and LAN access](/videoagents/reference/security)
