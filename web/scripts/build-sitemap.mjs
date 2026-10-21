/* Prebuild: regenerate public/sitemap.xml including live course pages from Supabase.
   Runs before `vite build` (see package.json "prebuild"). If Supabase is
   unreachable, keeps the existing static sitemap — build never fails. */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outPath = join(root, 'public', 'sitemap.xml');

const BASE = 'https://brighton-college-website.vercel.app';
const COLLEGE = 'brighton';

// Static routes (must match App.jsx public routes)
const STATIC_ROUTES = [
  '', '/about', '/programs', '/faculty', '/admissions', '/news', '/courses',
  '/results', '/material', '/gallery', '/contact', '/privacy', '/terms',
];
const STORY_SLUGS = [
  'sports-gala', 'award-ceremonies', 'weekly-tests', 'science-labs',
  'computer-lab', 'library', 'smart-classrooms', 'campus-events',
];

function urlEntry(loc, priority = '0.8', changefreq = 'weekly') {
  const en = `${BASE}/${COLLEGE}/en${loc}`;
  const ur = `${BASE}/${COLLEGE}/ur${loc}`;
  return `  <url>
    <loc>${en}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="ur" href="${ur}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  let courseIds = [];
  try {
    // Read Supabase creds from src/config.js (public-safe anon key)
    const cfg = readFileSync(join(root, 'src', 'config.js'), 'utf8');
    const urlM = cfg.match(/SUPABASE_URL\s*=\s*'([^']+)'/);
    const keyM = cfg.match(/SUPABASE_ANON_KEY\s*=\s*'([^']+)'/);
    const liveM = cfg.match(/BACKEND_LIVE\s*=\s*(true|false)/);
    if (urlM && keyM && urlM[1] && keyM[1] && liveM && liveM[1] === 'true') {
      const r = await fetch(`${urlM[1]}/rest/v1/courses?select=id&published=eq.true&limit=500`, {
        headers: { apikey: keyM[1], Authorization: `Bearer ${keyM[1]}` },
      });
      if (r.ok) {
        const rows = await r.json();
        courseIds = rows.map((c) => c.id).filter(Boolean);
      }
    }
  } catch (e) {
    console.warn('[sitemap] Supabase fetch failed, keeping static sitemap:', e.message);
  }

  const entries = [];
  entries.push(urlEntry('', '1.0', 'daily'));
  for (const r of STATIC_ROUTES.slice(1)) entries.push(urlEntry(r));
  for (const slug of STORY_SLUGS) entries.push(urlEntry(`/gallery/${slug}`, '0.7'));
  for (const id of courseIds) entries.push(urlEntry(`/courses/${id}`, '0.8'));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  writeFileSync(outPath, xml);
  console.log(`[sitemap] wrote ${entries.length} URLs (${courseIds.length} course pages)`);
}

main();
