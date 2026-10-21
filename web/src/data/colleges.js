/* Multi-college registry (Phase 4).
   Local fallback used when the Supabase backend is not connected yet.
   The Brighton entry mirrors web/src/config.js SITE exactly, so the
   default site renders pixel-identical with or without the backend.
   NO invented colleges — only Brighton exists. New colleges are added
   as rows in the `colleges` table (see supabase/migrations/002). */
import { SITE, WHATSAPP_NUMBER } from '../config.js';

export const DEFAULT_COLLEGE_SLUG = 'brighton';

/* Local shape mirrors the DB row + a `site` block shaped like SITE. */
export const COLLEGES = {
  brighton: {
    id: 'local-brighton', // replaced by the real uuid once the backend is live
    slug: 'brighton',
    logo_url: '',
    primary_color: '#0A1B33',
    accent_color: '#C9A227',
    whatsapp: WHATSAPP_NUMBER,
    site: { ...SITE },
    _local: true,
  },
};

/** Synchronous local lookup — safe to call during routing. */
export function getLocalCollege(slug) {
  return COLLEGES[slug] || null;
}

export function knownLocalSlugs() {
  return Object.keys(COLLEGES);
}
