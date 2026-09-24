# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three coequal audiences hiring Voxlo Editing as a freelance video editor (confirmed: no lead discipline — all three are equally central):

- **3D/motion clients** — brands, creators, and agencies wanting distinctive footage most editors in their niche can't produce (3D compositing, motion tracking, VFX).
- **Gaming content creators** — YouTubers/streamers wanting high-energy, retention-optimized cuts (montages, commentary-driven long-form, Shorts).
- **IRL/lifestyle creators and brands** — vloggers and branded-content clients wanting cinematic-but-real editing that respects the moment and the audience's time.

Primary job across all three: hand off raw footage and get back a polished, retention-optimized final cut without managing the edit themselves.

## Product Purpose

Voxlo Editing is the freelance video-editing portfolio and lead-generation site for Anakin Matthew (operating as "Voxlo"). It exists to (1) prove editing quality through real client work, (2) convert visitors into qualified leads via the contact flow, and (3) let the founder manage those leads through a private dashboard. Success means qualified leads that convert into paid editing work.

## Positioning

Versatility across genres is the confirmed differentiator: one editor fluent in 3D/VFX motion graphics, gaming edits, and IRL/lifestyle/branded content, where most freelance editors specialize narrowly in a single genre. The site's tagline, "Cuts that keep people watching," backs that breadth with one retention-first execution standard applied across all three disciplines — the versatility is the same bar met in three different genres a competitor would typically split across three separate editors.

## Operating Context

- **Lead pipeline is functional infrastructure, not decoration:** contact form → Supabase `leads` table → `/dashboard` (gear icon, top-right of every page) with a status pipeline (New → Contacted → Quoted → Won/Lost/Archived) and one-click mailto reply.
- **Real workflow tools** appear per delivered piece in `lib/data/portfolioPieces.ts`: DaVinci Resolve, Fusion, Fairlight, Photopea, OBS, and Claude — AI-assisted editing is named as a tool alongside traditional NLE tools on several delivered pieces.
- **Pricing is presented two ways simultaneously:** `/services` says pricing is "discussed in the conversation," while `/pricing` lists concrete starting rates per project type. Both pages are live; treat this as an existing product fact, not a bug to silently resolve.
- Currently a solo freelance operation (single admin login on the dashboard).

## Capabilities and Constraints

- Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase, Vercel, Resend (email), react-three-fiber/drei/three (3D, currently unused — see rebrand plan).
- `lib/data/portfolioPieces.ts` is the live portfolio dataset (used by the homepage reveal, `/work`, and piece detail components). `lib/data/portfolio.ts` and the `components/work/PortfolioGrid.tsx`/`VideoCard.tsx`/`VideoLightbox.tsx` trio are legacy/unused — no current import references them.
- Known incomplete items (from README "What's stubbed"): Supabase env vars not yet set in production, admin user not yet created in Supabase Auth, Resend email notifications not yet enabled, some Footer social links are placeholder, 2 placeholder videos still need real YouTube IDs, navbar logo is an inline SVG (no exported file), Hero has no background reel yet (the built-but-unused `Showreel.tsx` component is a candidate once a real reel exists), "More Work" grid has 6 placeholder slots, favicon/app icons are SVG-only.

## Brand Commitments

- Name: **Voxlo Editing**. Founder credited sitewide (metadata, About page) as **Anakin Matthew** — the README still says "Anakin Grierson," which is stale; git history and live site copy confirm the current name is Anakin Matthew.
- Current identity: warm amber/ember accent (`#F5A623` dark-mode) on warm-charcoal neutrals, Clash Display + Satoshi type, a persistent film-grain overlay (`components/ui/FilmGrain.tsx`). A major visual rebrand ("The Voxlo Blueprint" — navy/technical-grid/gold/cream/royal-blue) is in active planning; see the rebrand plan for the full direction.
- Founder-personal narrative details (age, solo status, full-time claim, East Coast location) are deliberately excluded from this product record per the founder's choice — they stay on the About page as narrative copy and should not be treated as durable facts driving future design/product decisions.

## Evidence on Hand

- Real client roster with real results in `lib/data/portfolioPieces.ts`: Ren, @klentbolt, RustyOldMan, cilua_, Vincent Global Services, and others — each with real YouTube IDs, thumbnails, tools used, and (where given) results.
- Real testimonials with named channels and subscriber counts in `components/home/TestimonialsSection.tsx` (Vincent Global Services, cilua_, RustyOldMan).
- `design-references/{apple,framer,runway}-DESIGN.md` are competitor/inspiration references for design work, not this project's own DESIGN.md.
- Do not fabricate additional clients, testimonials, view counts, or results beyond what's in these files.

## Product Principles

1. **Versatility is the wedge, not a weakness to narrow away.** The 3D/gaming/IRL spread is the confirmed differentiator — don't push future work toward specializing in just one lane.
2. **Retention is the execution standard everywhere**, not just short-form — pacing and structure decisions should serve "cuts that keep people watching" across all three disciplines.
3. **Craft over speed, but done-right beats done-fast** (About page values) — don't trade off finish quality for turnaround claims.
4. **Real proof outranks generic claims.** Testimonials, the client roster, and delivered pieces are load-bearing evidence; never invent clients, stats, or results to fill a gap.
5. **The lead pipeline is core product surface**, not marketing chrome — dashboard and contact-flow changes carry the same weight as public-facing pages.
