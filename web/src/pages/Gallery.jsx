import React, { useEffect, useState } from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useCollege, useSite } from '../college/CollegeContext.jsx';

import { fetchGallery, backendReady } from '../lib/supabase.js';
import { STORIES } from '../data/stories.js';
import Seo from '../seo/Seo.jsx';

/* Default gallery — real campus photos cropped from the college prospectus.
   Once the admin adds photos in /secure-admin/, those appear first. */
const DEFAULT_GALLERY = [
  ...Array.from({ length: 8 }, (_, i) => ({ id: 'exam-' + (i + 1), image_url: `/gallery/exam-${i + 1}.jpg`, caption: 'Examinations' })),
  ...Array.from({ length: 12 }, (_, i) => ({ id: 'event-' + (i + 1), image_url: `/gallery/event-${i + 1}.jpg`, caption: 'Events & Sports Gala' })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: 'award-' + (i + 1), image_url: `/gallery/award-${i + 1}.jpg`, caption: 'Awards & Laurels' })),
  { id: 'facility-classroom', image_url: '/gallery/facility-classroom.jpg', caption: 'Smart Classrooms' },
  { id: 'facility-complab', image_url: '/gallery/facility-complab.jpg', caption: 'Computer Lab' },
  { id: 'facility-scilab', image_url: '/gallery/facility-scilab.jpg', caption: 'Science Laboratories' },
  { id: 'facility-library', image_url: '/gallery/facility-library.jpg', caption: 'Library' },
  { id: 'facility-sports', image_url: '/gallery/facility-sports.jpg', caption: 'Sports' },
  { id: 'facility-cooking', image_url: '/gallery/facility-cooking.jpg', caption: 'Co-curricular Activities' },
];

export default function Gallery() {
  const { t, lang } = useLang();
  const { college } = useCollege();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [light, setLight] = useState(null);

  useEffect(() => {
    if (!backendReady()) { setItems(DEFAULT_GALLERY); setLoading(false); return; }
    fetchGallery(college && college.id).then((r) => setItems((r && r.length ? r : DEFAULT_GALLERY))).catch(() => setItems(DEFAULT_GALLERY)).finally(() => setLoading(false));
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
                  <img src={g.image_url} alt={g.caption || 'College photo'} loading="lazy" />
                  {g.caption && <div className="g-cap">{g.caption}</div>}
                </div>
              ))}
            </div>
          )}
          {light && (
            <div className="lightbox" onClick={() => setLight(null)}>
              <button className="lb-close" onClick={() => setLight(null)}>×</button>
              <img src={light.image_url} alt={light.caption || ''} onClick={(e) => e.stopPropagation()} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
