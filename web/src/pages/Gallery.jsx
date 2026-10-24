import React, { useEffect, useState } from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useCollege, useSite } from '../college/CollegeContext.jsx';

import { fetchGallery, backendReady } from '../lib/supabase.js';
import { STORIES } from '../data/stories.js';
import Seo from '../seo/Seo.jsx';

/* Default gallery — real campus photos cropped from the college prospectus.
   Once the admin adds photos in /secure-admin/, those appear first. */
const DRIVE = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
const DRIVE_VIDEO = (id) => `https://drive.google.com/file/d/${id}/preview`;

/* Two videos open on a black frame, so Drive's poster thumbnail is a
   black box — use a related real college photo for those two instead. */
const VIDEO_THUMB_OVERRIDE = {
  '1uWkavYa8PI1RsFVj1dIjVZh1OnRzLHJl': DRIVE('1m2WFVran1pLgVobiH5LIK-gWHxPGFeBz'),
  '1tixCpPe3WDZ0xTe8UKpaF_SUs05ikMum': DRIVE('1QdxTT3QaqwsuS71eK0EI7uLBgrMY0jFM'),
};
const FB_MEDIA = [
  { id: 'fb-campus', type: 'image', src: DRIVE('1v60IYWhMxsP1pVO_tGq2iGVHP7X-yQ6y'), caption: 'Campus — Aerial View' },
  { id: 'fb-principal', type: 'image', src: DRIVE('1CYTnm--mHOCB8USgCd8Sb63zlUxcpD4s'), caption: 'Principal — Mr. Fayoun Khan' },
  { id: 'fb-teacher-1', type: 'image', src: DRIVE('1m2WFVran1pLgVobiH5LIK-gWHxPGFeBz'), caption: 'Welcome Party 2026' },
  { id: 'fb-teacher-2', type: 'image', src: DRIVE('1QdxTT3QaqwsuS71eK0EI7uLBgrMY0jFM'), caption: 'Teachers Address' },
  { id: 'fb-teacher-3', type: 'image', src: DRIVE('1d44ayMWKSOkD7IzKLYkssK8OpSWvUAMc'), caption: 'Welcome Party 2026' },
  { id: 'fb-vid-welcome', type: 'video', src: DRIVE_VIDEO('1uWkavYa8PI1RsFVj1dIjVZh1OnRzLHJl'), thumb: DRIVE('1m2WFVran1pLgVobiH5LIK-gWHxPGFeBz'), caption: 'Welcome Party 2026 — Highlights' },
  { id: 'fb-vid-excellence', type: 'video', src: DRIVE_VIDEO('1tixCpPe3WDZ0xTe8UKpaF_SUs05ikMum'), thumb: DRIVE('1QdxTT3QaqwsuS71eK0EI7uLBgrMY0jFM'), caption: 'Excellence is Tested, Not Just Taught' },
  { id: 'fb-vid-hockey', type: 'video', src: DRIVE_VIDEO('1kpyDlI_G5TBKkWBplrMWGjzJJG0eCIgQ'), thumb: DRIVE('1kpyDlI_G5TBKkWBplrMWGjzJJG0eCIgQ'), caption: 'Hockey — Through to the Semi-Final' },
  { id: 'fb-vid-mdcat', type: 'video', src: DRIVE_VIDEO('17qy7ZK-Lf1aeTokWq-8hGJoiyJQpTO6n'), thumb: DRIVE('17qy7ZK-Lf1aeTokWq-8hGJoiyJQpTO6n'), caption: 'MDCAT 2026 Qualifier — Munazza Hamid' },
  { id: 'fb-reel-teachers', type: 'video', src: DRIVE_VIDEO('1rY42FQteXJDDo1OS0ZB6L5RRTD-bHVmc'), thumb: DRIVE('1rY42FQteXJDDo1OS0ZB6L5RRTD-bHVmc'), caption: 'Invitation for Our Respected Teachers' },
  { id: 'fb-reel-campus', type: 'video', src: DRIVE_VIDEO('1m9xrHNKOCL91BcuHblt_vo_FI_cPoLQb'), thumb: DRIVE('1m9xrHNKOCL91BcuHblt_vo_FI_cPoLQb'), caption: 'Campus Life' },
];

/* HD Gallery — all photos from the college official Facebook page.
   Old blurry prospectus crops REMOVED. */
const DEFAULT_GALLERY = [
  { id: 'hd-campus', image_url: DRIVE('1v60IYWhMxsP1pVO_tGq2iGVHP7X-yQ6y'), caption: 'Campus' },
  { id: 'hd-principal', image_url: DRIVE('1CYTnm--mHOCB8USgCd8Sb63zlUxcpD4s'), caption: 'Principal — Mr. Fayoun Khan' },
  { id: 'hd-teacher-1', image_url: DRIVE('1m2WFVran1pLgVobiH5LIK-gWHxPGFeBz'), caption: 'Welcome Party 2026' },
  { id: 'hd-teacher-2', image_url: DRIVE('1QdxTT3QaqwsuS71eK0EI7uLBgrMY0jFM'), caption: 'Teachers Address' },
  { id: 'hd-teacher-3', image_url: DRIVE('1d44ayMWKSOkD7IzKLYkssK8OpSWvUAMc'), caption: 'Welcome Party 2026' },
];

export default function Gallery() {
  const { t, lang } = useLang();
  const { college } = useCollege();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [light, setLight] = useState(null);

  useEffect(() => {
    if (!backendReady()) { setItems(DEFAULT_GALLERY); setLoading(false); return; }
    fetchGallery(college && college.id).then((r) => {
      if (r && r.length) {
        // Map gallery_media rows to display format
        const mapped = r.filter((m) => m.is_active !== false).map((m) => ({
          id: m.id,
          type: m.media_type === 'video' ? 'video' : 'image',
          src: m.media_type === 'video' ? DRIVE_VIDEO(m.drive_file_id) : DRIVE(m.drive_file_id),
          thumb: VIDEO_THUMB_OVERRIDE[m.drive_file_id] || DRIVE(m.drive_file_id),
          drive_file_id: m.drive_file_id,
          caption: m.title,
          description: m.description,
        }));
        setItems(mapped.length ? mapped : DEFAULT_GALLERY);
      } else {
        setItems(DEFAULT_GALLERY);
      }
    }).catch(() => setItems(DEFAULT_GALLERY)).finally(() => setLoading(false));
  }, [college]);

  return (
    <>
      <Seo page="gallery" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {t.pages.gallery.crumbs}</div>
          <h1>{t.pages.gallery.title}</h1>
          <p>Campus life at The Brighton College — Shewa Adda, Kalu Khan, Swabi.</p>
        </div>
      </section>

      {/* Latest from Facebook — HD photos & reels */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h2 style={{ marginBottom: 6 }}>{lang === 'ur' ? 'فیس بک سے تازہ ترین' : 'Latest from Facebook'}</h2>
          <p className="muted" style={{ marginBottom: 22 }}>
            {lang === 'ur'
              ? 'کالج کے آفیشل فیس بک پیج سے HD تصاویر اور ریلز۔'
              : 'HD photos and reels from the college official Facebook page.'}
          </p>
          <div className="gallery-grid">
            {(loading ? FB_MEDIA : items).map((m) => (
              <div className="g-item" key={m.id} onClick={() => setLight(m)} style={{ cursor: 'pointer' }}>
                {m.type === 'video' ? (
                  <div style={{ position: 'relative' }}>
                    <img src={m.thumb || m.src} alt={m.caption} loading="lazy" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff' }}>▶</div>
                    </div>
                  </div>
                ) : (
                  <img src={m.src} alt={m.caption} loading="lazy" />
                )}
                {m.caption && <div className="g-cap">{m.caption}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo stories — each theme gets its own page with a hand-written narrative */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h2 style={{ marginBottom: 6 }}>{t.pages.gallery.stories}</h2>
          <p className="muted" style={{ marginBottom: 22 }}>
            {lang === 'ur'
              ? 'ہر تصویر کے پیچھے ایک کہانی ہے — پڑھیں اور دیکھیں۔'
              : 'Every picture has a story behind it — read and see.'}
          </p>
          <div className="news-grid">
            {STORIES.map((s) => {
              const L = s[lang] || s.en;
              return (
                <LLink key={s.slug} to={`/gallery/${s.slug}`} className="news-card">
                  <div className="news-card-img">
                    <img src={s.photos[0].src} alt={L.title} loading="lazy" />
                  </div>
                  <div className="news-card-body">
                    <span className="eyebrow">{s.photos.length} {t.pages.gallery.photos}</span>
                    <h3>{L.title}</h3>
                    <p className="muted sm">{L.excerpt}</p>
                    <span className="sm" style={{ color: 'var(--gold)', fontWeight: 700 }}>
                      {t.common.readMore} →
                    </span>
                  </div>
                </LLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: 18 }}>{t.pages.gallery.allPhotos}</h2>
          {loading ? <div className="loading">Loading gallery…</div> : (
            <div className="gallery-grid">
              {items.map((g) => (
                <div className="g-item" key={g.id} onClick={() => setLight(g)} style={{ cursor: 'zoom-in' }}>
                  <img src={g.image_url || (g.type === 'video' ? (g.thumb || g.src) : g.src)} alt={g.caption || 'College photo'} loading="lazy" />
                  {g.type === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff' }}>▶</div>
                    </div>
                  )}
                  {g.caption && <div className="g-cap">{g.caption}</div>}
                </div>
              ))}
            </div>
          )}
          {light && (
            <div className="lightbox" onClick={() => setLight(null)} style={{ zIndex: 9999 }}>
              <button className="lb-close" onClick={() => setLight(null)}>×</button>
              {light.type === 'video' ? (
                <iframe src={light.src} style={{ width: '90vw', height: '80vh', border: 0, borderRadius: 12 }} allow="autoplay; fullscreen" allowFullScreen title={light.caption} onClick={(e) => e.stopPropagation()} />
              ) : (
                <img src={light.image_url || light.src} alt={light.caption || ''} onClick={(e) => e.stopPropagation()} />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
