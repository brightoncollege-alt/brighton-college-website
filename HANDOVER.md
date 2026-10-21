# THE BRIGHTON COLLEGE — Handover

Website + platform is **built and push-ready** at `~/workspace/brighton-college/`.
Nothing has been pushed anywhere — everything waits on your new Google account.

## ✅ What was built

**Public site** (React + Vite, navy + gold, mobile responsive, English):
| Page | Route |
|---|---|
| Home — hero, notice ticker, stats, programs preview, latest news | `/` |
| About — story, mission/vision, principal's message | `/about` |
| Programs — 11th/12th: Pre-Med, Pre-Eng, ICS, Commerce, FA + subjects | `/programs` |
| **Video Courses** — course-wise video library (first-class nav item) | `/courses`, `/courses/:id` |
| News & Updates — blog from Supabase | `/news`, `/news/:id` |
| Test Results — weekly/monthly, filter by class | `/results` |
| Study Material — teacher picks + full Drive library browser | `/material` |
| Gallery — from Supabase | `/gallery` |
| Contact — form + WhatsApp + map | `/contact` |
| Admissions — online form → Supabase + fee info (info only) | `/admissions` |

**Admin panel** at `/secure-admin/` (app-level password — see below):
News (CRUD) • **Courses (add title + Drive folder ID — videos auto-list)** •
Test Results (weekly/monthly entries) • Study Material (type: video/document/image) •
Admissions (view + mark reviewed) • Gallery • Contact messages.

**Explicitly NOT built** (your orders): student login, online fee payment.

**Backend:** `supabase/schema.sql` — tables: `news_posts`, `courses`, `test_results`,
`study_material`, `admission_applications`, `gallery_images`, `contact_messages`.
RLS = open pattern (public read; public insert on the two forms; admin writes
app-password-gated). Harden with Supabase Auth later if spam appears.

## 📋 Your taps (in order)

1. **New Gmail/Google account** — give me the details when ready.
2. **New GitHub account** → create repo `brighton-college-website` → tell me; I'll push.
3. **Supabase project** (under the new account) → SQL Editor → run `supabase/schema.sql`.
4. **`web/src/config.js`** — fill: `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
   `DRIVE_API_KEY`, `DRIVE_FOLDER_ID`, `WHATSAPP_NUMBER`, then set `BACKEND_LIVE = true`.
5. **Admin password** — open `/secure-admin/` once deployed and set your password
   on the first visit (stored hashed in that browser only — never in git).
6. **Vercel** (new account) → import the GitHub repo → deploy (steps in DEPLOY.md).
7. **Search Console** → add property + sitemap (after deploy).
8. **Content:** college photos for the gallery (34 real photos already wired in as
   defaults from the prospectus — replace/add via admin when you have more).

## 🎬 Video courses — how it works

- **One Drive folder per course** (e.g. "Cyber Security"). Share each as
  **"Anyone with the link can view"**.
- Admin → Courses → **Add New**: paste the **folder ID** (the long code in the
  folder URL: `drive.google.com/drive/folders/PASTE_THIS_PART`), title, thumbnail.
- Videos inside list **automatically** — pagination (100/page) + 10-minute cache
  keep it inside Drive API rate limits. Playback uses the Drive preview embed,
  which costs **no API quota**.
- Your Google One **2TB** plan covers the ~700GB library. If you ever outgrow it,
  split courses across a second Google account and add its folders as courses.

## 🔑 Drive API key (your tap)

Google Cloud Console (new account) → new project → enable **Google Drive API** →
Credentials → Create **API key** → restrict it to the Drive API.
Paste into `DRIVE_API_KEY` in config.js. Public ("anyone with the link") files
need no OAuth — the key is enough.

## 📸 Photos

Send your college pictures whenever ready — I'll wire them into the Gallery
(admin can also add image URLs directly).

## 🎨 PHASE 3 REDESIGN (2026-10-21) — world-class UK/USA standard
Research: `~/workspace/research_notes/world-class-college-design-research-20261021-1347/report.md` (R1–R10, all implemented).

- **Bilingual (R1):** routes under `/:lang/*` (`/en`, `/ur`); header pill toggle shows the OTHER language; full RTL mirror (logical CSS); Noto Nastaliq Urdu; preference in localStorage; old flat URLs redirect to the persisted language. UI chrome translated (EN/UR); page body stays authored (Almentor pattern).
- **Home (R2/R3/R9):** full-viewport proof headline ("Tested every week. Proven every month."), real-photo band, gold Apply side rail (desktop) + sticky mobile Apply bar, animated counter stats band (2023/26/3/2, each linked), program cards, principal welcome (real photo), editorial newsroom + event date-cards, admissions CTA.
- **Courses (R4/R5/R6):** dark trust header, custom VideoPlayer (play/pause, ±10s, speed 0.5–2x, volume, PiP, fullscreen, EN/UR subtitles when provided, bookmarks, timestamped notes, transcript, keyboard shortcuts, auto-resume; Drive-preview fallback on stream error), curriculum accordion (Drive folders = sections, lazy-loaded), what-you'll-learn, instructor card, sticky enroll card with progress, "Continue learning" resume card.
- **Design system (R7/R8):** Fraunces (display) + Inter (body) + Noto Nastaliq Urdu; navy `#0A1B33` + gold `#C9A227` single accent.
- **Trust footer (R10):** Mardan Board affiliation line, policy links, socials; skip-link, focus-visible states, alt text, `prefers-reduced-motion`.
- Admin panel `/secure-admin/` untouched and working. Nothing pushed to GitHub (waiting on new account).

## 🏫 PHASE 4 MULTI-COLLEGE (2026-10-21) — platform foundation
The site is now a **platform that can host any college**, not just Brighton.
Brighton is the default college; everything renders exactly as before.

**URL pattern**
| URL | Resolves to |
|---|---|
| `/` | → `/brighton/en` (persisted language) |
| `/:lang/*` (e.g. `/en/about`, `/ur/news`) | → `/brighton/:lang/*` (legacy preserved) |
| `/:collegeSlug` (e.g. `/brighton`) | → `/:collegeSlug/:lang` |
| `/:collegeSlug/:lang/*` (e.g. `/brighton/ur/courses`) | that college, that language |
| unknown slug (e.g. `/foo/`) | friendly **"College not found"** page (never a crash) |

**How it works**
- `supabase/migrations/002_multi_college.sql` — run AFTER `schema.sql`. Adds the
  `colleges` table (id, slug, name, tagline, logo_url, primary_color,
  accent_color, contact JSON) + nullable `college_id` on all 7 content tables
  + backfills existing rows to Brighton + seeds the Brighton row.
- `supabase/migrations/003_storage_delete.sql` — run AFTER `002`. Adds public
  DELETE policies on the `results`/`gallery`/`news` storage buckets so the admin
  panel's delete buttons also remove the uploaded file (frees bucket space).
  Same trust model as the public INSERT policy (admin UI is password-gated).
- `supabase/migrations/004_news_published.sql` — run AFTER `003`. Adds the
  `published` boolean to `news_posts` (default true) for the blog draft/publish
  workflow. Public pages filter `published=true`; the admin sees all + toggles.
- `web/src/data/colleges.js` — local registry (Brighton only) used while the
  backend is offline. No invented colleges.
- `web/src/college/CollegeContext.jsx` — resolves the college by slug
  (Supabase when live, local registry otherwise); sets document title,
  `--college-primary`/`--college-accent` CSS vars and `body[data-college]`.
  Non-Brighton colleges re-theme via a scoped override in `styles.css`
  (Brighton explicitly excluded → zero visual change).
- Header/footer/hero use the active college's name, tagline, logo, contact
  and WhatsApp automatically.
- **Admin** (`/secure-admin/`) has a college switcher in the sidebar
  (dropdown when 2+ colleges exist; single-college mode shows just Brighton).
  All list views filter by the active college; all creates stamp `college_id`.
- All public forms (admissions, contact) submit with the active `college_id`.

**Onboarding a 2nd college** (your tap, when the time comes)
1. Supabase SQL: `insert into colleges (slug, name, short_name, tagline, primary_color, accent_color, contact) values ('newslug', 'Full Name', 'Short Name', 'Tagline', '#123456', '#C9A227', '{"address":"…","phone":"…","email":"…","whatsapp":"92…"}'::jsonb);`
2. Open `https://your-site/newslug/en/` — done. Optional: upload a `logo_url`
   (shows in the header), pick brand colors (site re-themes automatically).
3. In `/secure-admin/`, switch colleges in the sidebar to manage each
   college's news, courses, results, material, gallery separately.

**Shared vs per-college:** programs/faculty/houses copy (in `data/college.js`)
is currently Brighton-specific and shared; per-college programs/faculty move
to Supabase tables when the 2nd college onboards. Design system, video player,
bilingual engine and admin shell are shared by all colleges.

## SEO + QA + WORLD-CLASS FEATURES PASS (2026-10-21)
Luffy: "websites par research, SEO, koi ghalti ho to sab sahi karo, world-class features add karo" + "WORLD BEST WEBSITE CHAHIYE — muqable me UK wala website hai".

### SEO (all implemented)
- `src/seo/Seo.jsx`: per-page `<title>`/meta/OG/Twitter/canonical/hreflang (en/ur/x-default) for all 13 pages × 2 languages; JSON-LD: WebSite (always), CollegeOrUniversity (home), BreadcrumbList, FAQPage (admissions), NewsArticle (news detail), Person ×2 (principal/coordinator, home), EducationalOccupationalProgram ×3 (programs), Event (published events). og:site_name = "The Brighton College" everywhere; zero "vercel" in src+dist (verified by grep).
- `src/seo/seoStrings.js`: EN+UR titles/descriptions per page + 6 real FAQs (EN+UR).
- `public/sitemap.xml`: 42 canonical URLs (13 pages + 8 photo stories, each EN+UR) with hreflang alternates + x-default→EN. `public/video-sitemap.xml`: template with how-to comments (fill when first course publishes). `public/robots.txt`: Disallow /secure-admin/, lists both sitemaps.
- `SITE_URL` in config.js (update after deploy). `og-image.jpg` (1200×630) generated.
- Real college crest as icon: cropped from prospectus photo (99/…jpg, 134px source → cleaned, circular mask, 4x Lanczos upscale). favicon.ico, apple-touch-icon.png, icon-192/512.png, site.webmanifest, theme-color #0A1B33. Header brand uses real crest (logo-crest.png).

### URL map
- `URL-MAP.md`: 42 canonical URLs + legacy /en/* + flat /{page} redirects (all → /brighton/{lang}/{page}, implemented in App.jsx PAGE_SLUGS). /foo/ → friendly not-found. /secure-admin/ excluded from sitemap.
- **Sitemap on publish (manual, 2 min):** news_posts and courses are dynamic (admin-created), so they are NOT in the static sitemap. After publishing: (1) open `web/public/sitemap.xml`, copy any `<url>` block, set `<loc>` to the new page URL (`/brighton/en/news/<id>` etc.) with en/ur/x-default alternates; (2) if it has a video, add a `<video:video>` block in `web/public/video-sitemap.xml` (template + instructions inside the file); (3) rebuild + redeploy. Then request indexing in Search Console.
- New pages: /privacy, /terms (real EN+UR content, incl. student safety section with #safety anchor). Footer policy links now point to real pages.

### QA fixes (all found via headless-Chromium crawl, all fixed)
1. `DRIVE_FOLDER_ID is not defined` — Material page crashed (missing import). Fixed.
2. `Countdown is not defined` — Admissions page crashed (missing import + stray duplicate Seo import). Fixed.
3. Title conflict: CollegeContext overwrote Seo per-page titles. Fixed (Seo owns titles).
4. UR hero title overflow on mobile: root cause = `.hero-v2-inner{padding:96px 0 120px}` overrode `.container{padding:0 20px}` → zero horizontal padding. Fixed → `padding:96px 20px 120px`. (Also added flex fallbacks + no-synthetic-italic for Nastaliq during diagnosis.)
- Verified: 33 URLs crawled (26 canonical + 7 redirect/edge) — all render, correct lang/dir, correct titles; 6 JSON-LD blocks on home; mobile 375px EN+UR screenshots verified.

### World-class features added (UK site lacks these)
- FAQ accordion on Admissions + FAQPage schema (EN+UR).
- Countdown to deadline (config-driven `COUNTDOWN.date`; hidden when unset — no fake dates).
- Back-to-top floating button.
- (Already had, kept) Custom video player, bilingual EN/UR RTL, weekly/monthly results, multi-college platform, announcement ticker, WhatsApp float, animated stats.

### vs brightoncollege.org.uk (real, implemented differences only)
| Feature | UK site | Ours |
|---|---|---|
| Bilingual (EN + Urdu, full RTL) | English only | ✅ |
| Custom video course player | None | ✅ (speed, ±10s, subtitles, notes, transcript, auto-resume) |
| Public weekly/monthly test results | Not public | ✅ |
| Multi-college platform | Single school | ✅ |
| FAQ + schema | No | ✅ |
| Deadline countdown | No | ✅ (date-driven) |
