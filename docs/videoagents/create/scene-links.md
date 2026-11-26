---
title: Scene links
description: How a match cut or relay between two scenes is drafted in the screenplay, approved by the director and written into both video prompts.
tags: [screenplay, directing, advanced]
order: 15
---

# Scene links

A scene link pairs the last image or sound of one scene with the first image or sound of the next, so the cut between them is designed rather than improvised: a match cut on the same shape, a character running out of frame right and in from frame left, a sound that turns into another sound. The screenwriter drafts the link in the screenplay, the director decides whether to use it, and the system carries that decision into the shot list and both generation groups' prompts.

::: tip
Available from v1.0.39. Scene links work in every project and have no switch. A screenplay without links works exactly as before.
:::

## Why links start in the screenplay

The two ends of a match cut are the end of one scene and the start of the next, and the screenplay decides what those are. By the time the storyboard is drawn, the content of both ends is fixed and a match can only be forced. So the Screenplay Adaptation agent drafts the pair while writing, and the director rules on it later.

| Who | Decides | Doesn't decide |
| --- | --- | --- |
| Screenwriter | What joins: this scene's last image or sound, the next scene's first, and the kind of link | Shot length, framing, lens, dissolves or black, title cards, sound bridges |
| Director | Whether to use it, which transition it becomes, and how both shots are framed so they meet | New content at either end |
| The system | Registers adopted links in the shot list and writes a matching sentence into both groups' prompts | The content of either end, or the director's ruling |

## The seven kinds

| Kind | Both ends must show | Transition word | Default result when the director adopts it |
| --- | --- | --- | --- |
| **Shape match** (trial) | Two objects of the same shape at the same place on screen | `MATCH CUT TO` | Match cut |
| **Action match** (trial) | One action that starts in this scene and finishes in the next | `MATCH CUT TO` | Match cut |
| **Same framing** | The same place and framing with one thing changed, such as time passing | `MATCH CUT TO` | Match cut |
| **Motion relay** | The exit direction equals the entry direction | `CUT TO` | Hard cut |
| **Sound relay** | A sound in this scene becomes a sound in the next | `CUT TO` | Hard cut |
| **Line relay** | The last line asks about or names something the next scene's first image answers | `CUT TO` | Hard cut |
| **Contrast cut** | A hard contrast: quiet to loud, bright to dark | `SMASH CUT TO` | Smash cut |

The two **trial** kinds need both pictures to line up frame by frame. Video models make the two clips separately from text, so the alignment is not guaranteed. Downstream they are treated as annotations: a mismatch is not logged as a defect, and more than two trial links in one episode get a warning. The other five can be delivered with the tools the pipeline already has (whitebox camera checks, camera direction, sound cues and the content of the next scene's first shot).

## How a link travels through the pipeline

1. **Screenplay.** By default a scene ends with a plain `CUT TO`. The screenwriter adds a link only when all three conditions hold: both ends are really written in the scene text (this scene's last action, line or sound, and the next scene's first), the two ends have a clear common element that fits one of the seven kinds, and the link joins the next scene in order. The last scene of an episode never has one.
2. **Script Preview.** The transition block at the end of the scene shows the link. See below.
3. **Director's plan.** The Director agent lists every link in the plan's transition list and adopts, modifies or drops each one. Adopt and modify name the transition it becomes (hard cut, match cut, smash cut or dissolve; never a fade or a cut to black); modify and drop give a reason. A check fails the plan if a link is left without a ruling. You can read the plan under **🎬 Director plan** on the [Storyboard](/videoagents/create/storyboard) page.
4. **Storyboard and shot list.** For an adopted or modified link, the storyboard sets the transition into the next scene's first group and frames the last shot of one scene and the first shot of the next to meet. A check confirms the boundary carries the transition the director chose.
5. **Transition design and prompts.** The system registers the link on that boundary and adds one **Scene link** sentence to each side's prompt: the previous group's last shot is told to end on the "out" image or sound, and the next group's first shot is told to open on the "in" image or sound. Each kind has its own pair of sentences. Each sentence only describes its own shot, because the two clips are generated separately and can't see each other. For a shape match, both sides ask for the object at the same fixed place and size on screen.

Depending on the episode's transition mode, a link can also bring a device with it:

| Link | Device | Cinematic | Classic / Custom | Minimal |
| --- | --- | --- | --- | --- |
| Motion relay | A paired camera move in the exit direction | Added automatically; with the whitebox on it is only offered as a candidate, because the whitebox video sets the camera | Offered as a candidate | — |
| Sound relay, Line relay | A sound bridge where the next scene's audio starts first (J-cut) | Added automatically | Offered as a candidate | — |
| Shape, Action, Same framing, Contrast | None | — | — | — |

See [Transitions](/videoagents/create/transitions) for the transition modes and the transition cards.

## See a link in Script Preview

Open [Script Preview](/videoagents/create/screenplay) and scroll to the end of the scene. The left column shows only the transition word; the right column shows **🔗** with the kind, **Scene ends on** and **Next scene opens on**. Trial kinds carry a **Trial** tag.

![A transition block in Script Preview: CUT TO S020 on the left; on the right a Motion relay chip, "Scene ends on" the girl running out of frame right with the soap bucket, and "Next scene opens on" her running in from frame left](/images/videoagents/create/scene-links-script.webp)

On the [Storyboard preview](/videoagents/create/storyboard-preview) page, the transition card for that boundary shows the link as **🔗 Script link** with the kind and the director's ruling (**Director adopted**, **Director modified** or **Director dropped**), and a design that came from a script link is tagged **📜 Script link**.

## Add, change or remove a link

- **Ask the screenwriter.** Click **✏️ Edit** on the transition block in Script Preview and describe the link you want (or want removed). It goes to the Screenplay Adaptation agent.
- **Override at the cut.** On the transition card in Storyboard preview, pick another candidate or keep a hard cut. Your choice wins: the system stops registering the link for that boundary.
- **Edit the screenplay by hand.** Put the link in braces at the end of the scene's last transition line:

  ```markdown
  TRANSITION: MATCH CUT TO S04 {link: shape, out: the sigil flares into a ring, in: the same glowing sigil on the gate}
  ```

  The keys are `link`, `out` and `in` (the Chinese keys `衔接`, `出`, `入` work too). `link` takes one of `shape`, `action`, `position`, `motion`, `sound`, `line` or `contrast`. A scene number after the transition word must be the next scene.

The screenplay check fails a link with an unknown kind, a missing `out` or `in`, a link from the last scene, a link to a scene that isn't next, braces anywhere but the scene's last transition line, a line relay in a scene with no lines, or `MATCH CUT` / `SMASH CUT` written without braces. It warns when the `out` or `in` text can't be found in the scene, when a relay is paired with a fade or black, and when links cover more than half of an episode's scene boundaries. Screenplays written before scene links existed only get warnings.

If the director drops a link or the screenwriter removes it, the next transition design run removes the registration, and the sentences come out of both prompts the next time they are synced.

## Related

- [Screenplay and Script Preview](/videoagents/create/screenplay)
- [Transitions](/videoagents/create/transitions)
- [Storyboard preview](/videoagents/create/storyboard-preview)
- [Video prompts and prompt skills](/videoagents/create/video-prompts)
