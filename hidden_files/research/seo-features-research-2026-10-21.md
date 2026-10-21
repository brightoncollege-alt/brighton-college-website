# Web Research Report — SEO + World-Class Features for the Brighton College Platform
Researched 2026-10-21. Every item implementable in a React+Vite static site.

---

## Section A — SEO Best Practices for College Websites in 2026

### 1. JSON-LD schema stack (priority order, per Ibex Insights' higher-ed field guide)
Ship in this order; #1–3 give ~80% of the lift:
1. **`EducationalOrganization`** (sitewide root) — name, url, logo, `sameAs` (Facebook etc.), address, `telephone`, `contactPoint`. Note: educational sites are in the privileged group where Google still allows FAQ rich results.
2. **`Person`** for named faculty (Principal, Academic Coordinator).
3. **`EducationalOccupationalProgram`** on each program page (Pre-Medical, Pre-Engineering, General Science) + **`Course`** for individual subjects/courses.
4. **`FAQPage`** on FAQ/admissions-help pages — 5–8 Q&As, answers visible on the page word-for-word; one JSON-LD block in `<head>`, use `@graph` + `@id` to link entities.
5. **`Event`** for open houses, scholarship test, admissions deadlines — feeds Event rich results and AI citations.
6. **`Article`/`BlogPosting`** on every news item + **`BreadcrumbList`** sitewide.
7. Rule: JSON-LD only (no mixed microdata), generate markup from the same data that renders the page, full absolute URLs, ISO 8601 dates, validate with Rich Results Test + Schema validator. (Sources: https://www.ibexinsights.co/blog/json-ld-field-guide-higher-ed.html, https://thegeolab.net/faqpage-schema/)
8. **Nov 2026 note:** Google announced May 2026 that FAQ rich results no longer appear in Search results (removed from GSC/Rich Results Test June 2026). Keep FAQPage schema anyway — it aids classification and AI (GEO) extraction.

### 2. Sitemap / robots (React+Vite static patterns)
- Generate `sitemap.xml` at build time from the route list (only 200, canonical, indexable URLs; accurate `<lastmod>`; exclude `/secure-admin/`, staging); separate sitemap per language or one sitemap with `hreflang` alternates.
- `robots.txt`: allow crawlers, `Disallow: /secure-admin/`, include `Sitemap:` line. robots.txt blocks crawling only — use `noindex` meta for pages to exclude from indexing (robots-blocked pages can still surface via external links).
- One canonical host, HTTPS everywhere, real 404 status (not homepage fallback) — Vite preview/SPA setups returning 200 for any path hurt indexing.
- Submit sitemap in Google Search Console + Bing Webmaster; ~10–12 index requests/day per property (known pattern).

### 3. hreflang for EN/UR bilingual (with RTL)
- One stable URL per language per page: `/en/...` and `/ur/...`. **Never** serve different languages on the same URL via JS-only toggle for the indexed version — give each its own URL.
- Every page: self-referencing `<link rel="canonical">` + reciprocal hreflang set: `hreflang="en"`, `hreflang="ur"`, `hreflang="x-default"`. Bidirectional links required; use `ur` (language-only, not `ur-PK` unless truly regional).
- `lang="ur"` + `dir="rtl"` on Urdu pages; structured data in Urdu where it describes visible Urdu content.
- Full metadata per language: title, meta description, OG tags, image alt, translated URL slugs. Separate keyword research — Urdu users search different terms; don't just translate English keywords.
- Technical RTL: CSS logical properties (`margin-inline-start` etc.), subset Arabic fonts (Noto Nastaliq), `font-display: swap`, `<bdi>` around mixed-direction fragments (phone numbers, emails). Sources: https://dev.to/kreetiveqatar/how-to-build-a-fast-bilingual-website-with-rtl-and-ltr-support-44bc, https://http.dev/hreflang

### 4. Meta / OG best practices (2026)
- Title ≤60 chars, primary keyword first, unique per page; meta description 150–160 chars, action-oriented (CTR driver, not rank driver).
- OG image 1200×630 (1.91:1); set both `og:*` AND `twitter:card/title/description/image` (X doesn't reliably fall back to OG); absolute image URLs; `og:site_name` + `og:locale:alternate` for the two languages.
- One H1 per page, logical H2/H3; first 150 words answer the page's intent (AI-Overview friendly).
- Favicons present (mobile SERP display; some rich-result eligibility requires them).

### 5. Core Web Vitals priorities (unchanged 2026 thresholds)
LCP ≤ 2.5s | INP ≤ 200ms | CLS ≤ 0.1 — all at 75th percentile of real users (CrUX 28-day). INP (replaced FID Mar 2024) is the most commonly failed (~43% of sites).
- For Vite/React static: pre-render to HTML and serve from CDN (per-request SSR buys nothing on content pages); code-split, route-level lazy loading; preload LCP hero image `fetchpriority="high"` + WebP/AVIF; width/height on every image/video; `font-display: swap`; defer non-critical JS; keep third-party scripts minimal (INP killer); TTFB < 800ms.
- Vitals are a **tiebreaker**, not the win — relevance first; but fast clean HTML also gets cited more by AI answers (GEO). Sources: https://bejamas.com/insights/operations/seo-guide-page-experience-and-core-web-vitals, https://www.pagespeedmatters.com/resources/guides/complete-core-web-vitals-guide

### 6. Local SEO (NAP consistency)
- Decide ONE master NAP format (name exactly "THE BRIGHTON COLLEGE", full address, 0317-9609048 / 0314-9649602); Google Business Profile is the source of truth; copy-paste it character-for-character into site footer + contact page JSON-LD address.
- Claim GBP (category: College/University or Coaching Center equivalent), Bing Places, Apple Business Connect, Facebook; fix aggregators first; kill duplicates; collect reviews + respond (review velocity is a 2026 prominence factor).
- On-site: full NAP + hours + map/directions link in footer, embedded map, `sameAs` links in schema, local keywords (Kalukhan, Swabi, KPK) in titles/H1s. Sources: https://www.seo-web-consulting.com/local-seo, https://medium.com/@itsmuhammad-seo/the-citation-cleanup-checklist-i-run-before-any-local-seo-work-b79c035f5e98

---

## Section B — 5 World-Class Features on Top College Websites (2024–2026)

### 1. Interactive 360° virtual campus tour with admissions hotspots
- Examples: **AUB 360° (Arts University Bournemouth)** — grouped-by-discipline menus, multilingual interface; **Fleming College** (Sep 2026) — multi-campus 360° tours; **Wells College** — interactive-card tour with customizable tracks. India vendor case: The Ardee School's Matterport digital twin.
- Implementation: static 360° photo panos (panorama viewer lib), hotspot menu (Classrooms → Labs → Library → Canteen), each hotspot linking to program/admissions pages. Zero backend.

### 2. Admission deadline + event countdown timers
- Pattern on high-converting US college landing pages (AlmaBase 2026 analysis flags urgency elements); **Kent College, UK** and **Porter Gaud School** pair countdown-style CTAs with testimonial sliders.
- Implementation: date-driven countdown component on homepage hero + admissions page (e.g. "Scholarship Test — X days left"), rendered at build time from a config file. Auto-hides after the date.

### 3. Event calendar with countdowns + Event schema
- Examples: **Wheaton College** — event-focused UX calendar (recitals, lectures, athletics); **Bates College** — simple event visibility feeding engagement.
- Implementation: static JSON event list → month calendar grid, per-event countdown chip, each event page emitting `Event` JSON-LD (rankable rich results). Admin adds events via the panel.

### 4. Testimonial + success-stats sliders (social proof engine)
- Examples: **Alverno College** — stats like "100% internship placement" as trust blocks; **Amherst College** — student success stats + "day in the life" videos; **Porter Gaud School** — unique testimonial slider; **Kent College** — AI chatbot + testimonial pattern.
- Implementation: homepage stat counters (animated, e.g. pass %, scholarships), testimonial carousel with parent/student quotes, topper-result cards (weekly/monthly results page doubles as proof).

### 5. WhatsApp deep-link chat + announcement ticker (parent-facing layer)
- Examples: **Stanford / UC Berkeley** — live chat support on site; **University of Northern Iowa** admissions — bottom-right chat box ("a quick chat away"); school-platform pattern (ExamActive) — WhatsApp parent notifications with 90%+ read rates.
- Implementation: floating WhatsApp button (`wa.me/923179609048` deep link) + site-wide announcement ticker under header (exam dates, holidays, result releases) driven from admin panel content. No backend chat needed; two-way chat can come later via embedded widget.
