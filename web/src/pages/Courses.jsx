/* Courses — self-contained video course platform module.
   Route: /courses (grid) and /courses/:id (player). Deliberately modular:
   this folder can later be split into its own site without touching the rest. */
import React, { useEffect, useState } from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useCollege, useSite } from '../college/CollegeContext.jsx';

import { fetchCourses, backendReady } from '../lib/supabase.js';
import { getContinueLearning } from '../lib/progress.js';
import Seo from '../seo/Seo.jsx';

/* "Continue learning" resume card (R6) — most recent watch position. */
function ContinueLearning() {
  const [item, setItem] = useState(null);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    try {
      const c = getContinueLearning();
      setItem(c);
      if (c && backendReady()) {
        import('../lib/supabase.js').then((m) =>
          m.fetchCourseById(c.courseId).then(setCourse).catch(() => {}));
      }
    } catch {}
  }, []);
  if (!item) return null;
  const mins = Math.floor((item.position || 0) / 60);
  return (
    <div className="card" style={{ marginBottom: 26, borderColor: 'var(--gold-400)', background: 'linear-gradient(120deg, #fffdf6, #fff)' }}>
      <span className="eyebrow">Continue learning</span>
      <h3 style={{ margin: '4px 0 8px' }}>{item.title || (course && course.title) || 'Your course'}</h3>
      <p style={{ margin: '0 0 14px' }}>Resume from {mins}:{String(Math.floor((item.position || 0) % 60)).padStart(2, '0')}</p>
      <LLink className="btn btn-gold" to={`/courses/${item.courseId}`}>▶ Resume</LLink>
    </div>
  );
}

export default function Courses() {
  const { t } = useLang();
  const { college } = useCollege();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!backendReady()) { setLoading(false); return; }
    fetchCourses({ collegeId: college && college.id }).then((r) => setCourses(r || [])).catch(() => {}).finally(() => setLoading(false));
  }, [college]);

  return (
    <>
      <Seo page="courses" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {t.pages.courses.crumbs}</div>
          <h1>{t.pages.courses.title}</h1>
          <p>Full video courses from the college's library — pick a course and start learning.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ContinueLearning />
          {loading ? <div className="loading">Loading courses…</div>
            : courses.length === 0 ? (
              <div className="empty">
                <div className="big">🎬</div>
                <h3>No courses published yet</h3>
                <p>Video courses will appear here once the admin adds them.</p>
              </div>
            ) : (
              <div className="grid grid-3">
                {courses.map((c) => (
                  <div className="card" key={c.id} style={{ padding: 0, overflow: 'hidden' }}>
                    {c.thumbnail_url && (
                      <LLink to={`/courses/${c.id}`} style={{ display: 'block', aspectRatio: '16/9', background: '#0a1c33' }}>
                        <img src={c.thumbnail_url} alt={c.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </LLink>
                    )}
                    <div style={{ padding: 22 }}>
                      <span className="tag">🎬 Video Course</span>{' '}
                      {c.class_level && <span className="tag navy">{c.class_level}</span>}
                      <h3 style={{ marginTop: 8 }}>
                        <LLink to={`/courses/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{c.title}</LLink>
                      </h3>
                      {c.description && <p>{c.description}</p>}
                      <LLink className="btn btn-navy" to={`/courses/${c.id}`}>Open Course →</LLink>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>
    </>
  );
}
