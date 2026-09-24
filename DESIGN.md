---
name: Voxlo Editing
description: One large technical drawing the visitor travels through — an editorial studio site for a freelance video editor.
colors:
  navy: "#0B1550"
  navy-deep: "#070E3A"
  gold: "#E8B94F"
  cream: "#FAF8E1"
  white: "#FFFFFF"
  line: "#7892CC"
  muted-foreground: "#A6B2D4"
typography:
  display: "Newsreader (opsz), Georgia, serif — normal + light italic"
  sans: "Schibsted Grotesk, system-ui, sans-serif"
  mono: "IBM Plex Mono, ui-monospace, monospace — 10.5px, 0.16em tracking, uppercase"
rounded:
  default: "2px"
  full: "avatars only"
---

# Design System: Voxlo Editing

## North star

**The board.** The homepage is a single large drawing, not a stack of sections. Scroll moves a camera through it in two dimensions, following the founder's sketch:

```
01 Hero (top-left) → 02 Work (centre, then pans right along a timeline)
→ 03 Testimonials (back left) → long swoop along the bottom (disciplines)
→ 04 Who I am (top-right) → 05 Get in touch (bottom, right of centre)
```

All geometry lives in `lib/canvas/world.ts` — station centres, the Work track, connectors, waypoints, and the camera timeline. Units: x in viewport widths, y in viewport heights. Change the composition there, nowhere else.

## Colour — one job each

- **Navy** `#0B1550` — the environment. `navy-deep` is the void outside the board's sheet edge.
- **Cream** `#FAF8E1` — all reading text and display type.
- **Warm gold** `#E8B94F` — spent only on: the route line, the playhead, active/current states, one emphasised word per headline (light italic), primary buttons, station indices. Never decorative fill.
- **Line blue** `#7892CC` (derived from navy) — grid, hairlines, inactive technical labels. Never interactive.

No gradients, no glows, no glass, no drop shadows. Elevation is a hairline or a fill step.

## Typography — three registers

- **Display — Newsreader**, weight 400, tight tracking (−0.025em), leading ~0.92. The emphasised phrase is Newsreader light italic in gold ("*watching.*", "*Real channels.*", "*Matthew.*", "*in mind?*"). One per headline.
- **Reading — Schibsted Grotesk**, 13–16px body.
- **Measuring — IBM Plex Mono**, 10.5px uppercase, 0.16em tracking (`Mono` primitive). Station tags, grid references, legends, coordinates. Content must be real (index, client, runtime, tool) — never invented jargon.

Gotcha: `cn()` uses tailwind-merge, which drops `leading-*` if a `text-[size]` class comes after it in the same call. Put `leading-*` last.

## The blueprint system (structural, not decorative)

- **World grid** (`.world-grid`): minor 32px / major 128px, very low contrast, travels with the camera.
- **Grid references**: column bubbles A–F along the bottom edge, rows 1–5 down the left. Each station carries its reference (`[B-2]`).
- **Route**: faint dashed planned path always visible; a solid gold line inks itself as the camera travels each connector. Diamond nodes mark where it enters/leaves a station.
- **Work = edit timeline**: the route becomes the ruler; each client piece is a clip (`V1 · 01`…); a fixed playhead at screen centre draws the ruler and lights the clip beneath it (others desaturate).
- **Minimap** (bottom-right): the sketch as navigation — stations are buttons, the camera rectangle is live.
- **Title block**: the Contact station and footer close the drawing like a sheet's title block.

## Motion

- **Camera** (`SpatialHome.tsx`): one rAF loop, critically-damped follow of scroll progress, Catmull-Rom paths, a pull-back (`dip`) proportional to travel distance. No springs, no snapping. React only re-renders on station/clip change.
- **Construction** (`construct.ts`, Anime.js): `[data-draw]` strokes ink in, then `[data-reveal]` elements settle, once per station on first arrival. Headlines rise line-by-line from behind masks. Stalled timelines are force-completed so content can never stay hidden.
- **Framer Motion**: navbar menu, stacked-layout rail progress.

## Responsive & accessibility

- Board: `≥1024px` and `prefers-reduced-motion: no-preference`. Switched by CSS (`.board-wrap` / `.stack-wrap`), so no layout flash; the hidden layout is `display:none`.
- Stacked (mobile + reduced motion): same five stations, same order and language, with a vertical rail in place of the board.
- Reduced-motion desktop visitors can opt into the board (`voxlo-motion` in localStorage → `html.force-motion`) and back.
- Keyboard focus inside the board moves the camera to the focused element's station. DOM order = route order. Visible gold focus rings.

## Real content only

Clips come from `lib/data/portfolioPieces.ts` (client pieces only); testimonials are verbatim; principles are from the About page. Never invent clients, quotes, stats or results.
