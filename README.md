# Voxlo Editing — Portfolio Site

Professional portfolio website for Voxlo Editing by Anakin Grierson.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Supabase · Vercel

---

## Deploying

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run the migration file: `supabase/migrations/001_leads.sql`
3. Create the admin user: **Authentication → Users → Add User**
   - Email: `griersonanakin@gmail.com`
   - Password: set your password here
4. Copy your project URL and anon/service keys from **Settings → API**

### 2. Deploy to Vercel

1. Push this repo to GitHub
2. Connect the repo to [vercel.com](https://vercel.com)
3. Add these environment variables in Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_xxxxxxxx          # Optional — for lead email alerts
ADMIN_EMAIL=griersonanakin@gmail.com # Where lead alerts go
NEXT_PUBLIC_SITE_URL=https://voxloediting.com
```

4. Deploy. Done.

### 3. Connect a custom domain

Vercel → Settings → Domains → Add `voxloediting.com`

---

## Updating content

### Add a new portfolio video

Edit `lib/data/portfolio.ts`. Each video uses this shape:

```ts
{
  id: "unique-id",
  title: "Video Title",
  description: "Short description shown in the lightbox.",
  category: "3d" | "gaming" | "irl" | "short-form" | "long-form" | "branded" | "before-after",
  youtubeId: "dQw4w9WgXcQ",  // YouTube video ID (11 chars after youtu.be/)
  thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),  // auto-generated
  whatWasDone: ["Color grading", "Motion graphics"],  // bullet list in lightbox
  featured: true,  // true = in the featured 6, false = in the More Work grid
}
```

To fill in the two placeholder featured slots, find the entries with `placeholder: true` and replace `youtubeId: null` with the real YouTube ID.

### Update copy / taglines

- **Hero tagline:** `components/home/Hero.tsx` — change the `TAGLINE` constant at the top. Three options are listed in the comment above it.
- **Services copy:** `app/services/page.tsx` — edit the `services` array
- **About copy:** `app/about/page.tsx`
- **Footer social links:** `components/layout/Footer.tsx` — update the `href` values in `socialLinks`

### Change accent color

In `tailwind.config.ts`, update `colors.accent.DEFAULT` and `colors.accent.hover`. Then do a find-replace for `#3B82F6` in the codebase for any hardcoded instances.

### Add a testimonial

In `components/home/TestimonialsSection.tsx`, add an entry to the `testimonials` array:

```ts
{
  quote: "The edit Anakin did for us got 2M views.",
  name: "Client Name",
  handle: "@clienthandle",
}
```

### Add a new admin user

Supabase Dashboard → Authentication → Users → Add User.

---

## Dashboard

Access at `/dashboard` (the subtle gear icon in the top-right of every page).

Login with the admin credentials you set in Supabase Auth.

The dashboard shows all contact form submissions with:
- Status tags (New → Contacted → Quoted → Won/Lost/Archived) — click to update
- Full lead detail panel (slides in from right)
- One-click reply via email (opens pre-filled mailto link)
- Search and filter by status

---

## What's stubbed / needs finishing

| Item | Status | What to do |
|------|--------|------------|
| Supabase connection | Stubbed | Add env vars to Vercel (see Deploy section) |
| Admin user | Stubbed | Create in Supabase Dashboard → Auth |
| Email notifications | Stubbed | Add `RESEND_API_KEY` to Vercel env. Sign up at resend.com (free tier = 3k/month) |
| Social link URLs | Placeholder | Update `socialLinks` in `components/layout/Footer.tsx` |
| 2 placeholder videos | Placeholder | Fill in `youtubeId` in `lib/data/portfolio.ts` (Long-Form + Short-Form slots) |
| Logo files | SVG approximation | Replace `components/layout/Navbar.tsx` `VoxloLogo` SVG with your actual logo, or place logo PNGs in `/public/` and use `next/image` |
| Hero background reel | Gradient placeholder | When you have a reel, add a `<video>` element to `components/home/Hero.tsx` |
| More Work grid | 6 placeholder slots | Add real video data to `moreWorkVideos` in `lib/data/portfolio.ts` |
| Favicon/app icons | SVG only | Generate a full icon set (PNG 16/32/180/192/512) and update `app/layout.tsx` metadata |
| OG image | Auto-generated | Works at `/api/og` — no action needed |
