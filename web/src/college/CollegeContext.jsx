/* Multi-college context (Phase 4).
   Resolves the active college from the URL slug:
   - local registry (src/data/colleges.js) when the backend is offline,
   - the `colleges` Supabase table when BACKEND_LIVE.
   Provides the college object, a SITE-shaped `site` view, theme wiring
   (CSS vars + body[data-college] + document title), and a friendly
   "college not found" state. */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LLink } from '../i18n/LangContext.jsx';
import { SITE } from '../config.js';
import { getLocalCollege, DEFAULT_COLLEGE_SLUG } from '../data/colleges.js';
import { backendReady, fetchCollegeBySlug } from '../lib/supabase.js';

/* Map a DB `colleges` row onto the local college shape. */
export function mapCollegeRow(r) {
  if (!r) return null;
  const c = r.contact || {};
  return {
    id: r.id,
    slug: r.slug,
    logo_url: r.logo_url || '',
    primary_color: r.primary_color || '#0A1B33',
    accent_color: r.accent_color || '#C9A227',
    whatsapp: c.whatsapp || '',
    site: {
      name: r.name || SITE.name,
      shortName: r.short_name || r.name || SITE.shortName,
      tagline: r.tagline || SITE.tagline,
      motto: c.motto || SITE.motto,
      address: c.address || SITE.address,
      phone: c.phone || SITE.phone,
      email: c.email || SITE.email,
      website: c.website || SITE.website,
      founded: c.founded || SITE.founded,
      board: c.board || SITE.board,
      principalName: c.principal_name || SITE.principalName,
      principalTitle: c.principal_title || SITE.principalTitle,
      coordinatorName: c.coordinator_name || SITE.coordinatorName,
      coordinatorTitle: c.coordinator_title || SITE.coordinatorTitle,
    },
    _local: false,
  };
}

const CollegeCtx = createContext({
  college: null,
  site: SITE,
  slug: DEFAULT_COLLEGE_SLUG,
  status: 'loading', // 'loading' | 'ready' | 'not-found'
  isDefault: true,
});

export function useCollege() {
  return useContext(CollegeCtx);
}

/** SITE-shaped view of the active college (falls back to config SITE). */
export function useSite() {
  const { site } = useCollege();
  return site || SITE;
}

export function CollegeProvider({ slug, children }) {
  const [state, setState] = useState(() => {
    const local = getLocalCollege(slug);
    // With a live backend, ALWAYS resolve from Supabase: the local entry's
    // id ('local-brighton') is not a UUID, and UUID-scoped queries
    // (news/results/ticker/contact) fail on it, leaving public pages empty.
    // Local is only the offline fallback (backend not ready).
    if (!backendReady()) {
      return local
        ? { college: local, status: 'ready' }
        : { college: null, status: 'not-found' };
    }
    return { college: null, status: 'loading' };
  });

  useEffect(() => {
    let alive = true;
    if (!backendReady()) {
      const local = getLocalCollege(slug);
      setState(local ? { college: local, status: 'ready' } : { college: null, status: 'not-found' });
      return;
    }
    setState({ college: null, status: 'loading' });
    fetchCollegeBySlug(slug)
      .then((row) => {
        if (!alive) return;
        const college = mapCollegeRow(row);
        setState(college ? { college, status: 'ready' } : { college: null, status: 'not-found' });
      })
      .catch(() => { if (alive) setState({ college: null, status: 'not-found' }); });
    return () => { alive = false; };
  }, [slug]);

  const { college, status } = state;

  /* Theme wiring. Page <title> is owned by the Seo component per page;
     only the not-found case (no Seo rendered) sets a title here. */
  useEffect(() => {
    const root = document.documentElement;
    if (college) {
      root.style.setProperty('--college-primary', college.primary_color || '#0A1B33');
      root.style.setProperty('--college-accent', college.accent_color || '#C9A227');
      document.body.dataset.college = college.slug;
    } else {
      document.body.dataset.college = slug || '';
      document.title = 'College not found';
    }
    return () => { delete document.body.dataset.college; };
  }, [college, slug]);

  const value = useMemo(() => ({
    college,
    site: (college && college.site) || SITE,
    slug: (college && college.slug) || slug || DEFAULT_COLLEGE_SLUG,
    status,
    isDefault: ((college && college.slug) || slug) === DEFAULT_COLLEGE_SLUG,
  }), [college, slug, status]);

  return <CollegeCtx.Provider value={value}>{children}</CollegeCtx.Provider>;
}

/* Friendly "college not found" page — never a crash. If the backend is
   live and the slug exists there (just not in the local registry),
   redirect into it instead. */
export function CollegeNotFoundPage({ slug, lang }) {
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (backendReady()) {
          const row = await fetchCollegeBySlug(slug);
          if (row && alive) {
            window.location.replace(`/${row.slug}/${lang === 'ur' ? 'ur' : 'en'}/`);
            return;
          }
        }
      } catch {}
      if (alive) setChecking(false);
    })();
    return () => { alive = false; };
  }, [slug, lang]);

  if (checking) return <div className="loading" style={{ padding: 80 }}>Loading…</div>;
  return (
    <div className="section">
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏫</div>
        <h1>College not found</h1>
        <p className="lead" style={{ margin: '0 auto 24px' }}>
          There is no college called “{slug}” on this platform yet.
        </p>
        <LLink className="btn btn-gold" to={`/brighton/${lang === 'ur' ? 'ur' : 'en'}/`}>Back to {SITE.shortName}</LLink>
      </div>
    </div>
  );
}
