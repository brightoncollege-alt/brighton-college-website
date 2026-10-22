/* Courses — self-contained video course platform module.
   Route: /courses (grid) and /courses/:id (player). Deliberately modular:
   this folder can later be split into its own site without touching the rest. */
import React, { useEffect, useState } from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useCollege, useSite } from '../college/CollegeContext.jsx';

import { fetchCourses, backendReady } from '../lib/supabase.js';
import { driveListAll, driveFirstVideoThumb, driveReady, isFolder, cleanCourseName, courseThumbFor } from '../lib/drive.js';
import { DRIVE_FOLDER_ID } from '../config.js';
import { getContinueLearning } from '../lib/progress.js';
import Seo from '../seo/Seo.jsx';
import { IVideo } from '../components/icons.jsx';

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
    <div className="card card-gold">
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
  const [driveCourses, setDriveCourses] = useState([]);
  const [driveThumbs, setDriveThumbs] = useState({}); /* folderId -> real video thumbnail */
  const [loading, setLoading] = useState(true);

  /* Fetch each Drive course's first video thumbnail (batched, lazy).
     Gives every course its OWN real thumbnail. */
  useEffect(() => {
    if (!driveCourses.length || !driveReady()) return;
    let live = true;
    const BATCH = 8;
    (async () => {
      for (let i = 0; i < driveCourses.length && live; i += BATCH) {
        const batch = driveCourses.slice(i, i + BATCH);
        const results = await Promise.all(batch.map(async (f) => {
          try {
            const thumb = await driveFirstVideoThumb(f.id);
            return thumb ? [f.id, thumb] : null;
          } catch { return null; }
        }));
        if (!live) return;
        const map = {};
        results.forEach((r) => { if (r) map[r[0]] = r[1]; });
        if (Object.keys(map).length) setDriveThumbs((prev) => ({ ...prev, ...map }));
      }
    })();
    return () => { live = false; };
  }, [driveCourses]);

  useEffect(() => {
    let live = true;
    const jobs = [];
    if (backendReady()) {
      jobs.push(fetchCourses({ collegeId: college && college.id })
        .then((r) => { if (live) setCourses(r || []); }).catch(() => {}));
    }
    /* Drive library: every folder in the Drive root = one course.
       This is how the 151 course folders go live without admin work. */
    if (driveReady() && DRIVE_FOLDER_ID) {
      jobs.push(driveListAll(DRIVE_FOLDER_ID)
        .then((files) => { if (live) setDriveCourses((files || []).filter((f) => isFolder(f.mimeType))); })
        .catch(() => {}));
    }
    Promise.all(jobs).finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
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
          {loading ? (
            <div className="grid grid-3" aria-busy="true" aria-label="Loading courses">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="skel" key={i}>
                  <div className="skel-thumb" />
                  <div className="skel-body">
                    <div className="skel-line" style={{ width: '70%' }} />
                    <div className="skel-line" style={{ width: '45%' }} />
                  </div>
                </div>
              ))}
            </div>
          )
            : (courses.length === 0 && driveCourses.length === 0) ? (
              <div className="empty">
                <div className="big" aria-hidden><IVideo size={44} /></div>
                <h3>No courses published yet</h3>
                <p>Video courses will appear here once the admin adds them.</p>
              </div>
            ) : (<>
              {courses.length > 0 && (
              <div className="grid grid-3">
                {courses.map((c) => (
                  <div className="card" key={'sb-' + c.id} style={{ padding: 0, overflow: 'hidden' }}>
                    <LLink to={`/courses/${c.id}`} style={{ display: 'block', aspectRatio: '16/9' }}>
                      {c.thumbnail_url
                        ? <img src={c.thumbnail_url} alt={c.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : <div className="thumb-fallback">
                            <span className="tf-icon" aria-hidden><IVideo size={36} /></span>
                            <span className="tf-title">{c.title}</span>
                          </div>}
                    </LLink>
                    <div style={{ padding: 22 }}>
                      <span className="tag">Video Course</span>{' '}
                      {c.class_level && <span className="tag navy">{c.class_level}</span>}
                      <h3 style={{ marginTop: 8 }}>
                        <LLink to={`/courses/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{c.title}</LLink>
                      </h3>
                      {c.description && <p>{c.description}</p>}
                      <LLink className="btn btn-navy" to={`/courses/${c.id}`}>Open Course →</LLink>
                    </div>
                  </div>
                ))}
              </div>)}
              {driveCourses.length > 0 && (<>
                {courses.length > 0 && (
                  <h2 style={{ margin: '34px 0 16px' }}>
                    Course Library
                    <span className="tag" style={{ marginInlineStart: 10 }}>{driveCourses.length}</span>
                  </h2>)}
                <div className="grid grid-3">
                  {driveCourses.map((f) => (
                    <div className="card" key={'dr-' + f.id} style={{ padding: 0, overflow: 'hidden' }}>
                      <LLink to={`/courses/${f.id}`} style={{ display: 'block', aspectRatio: '16/9' }}>
                        <img src={driveThumbs[f.id] || courseThumbFor(f.name)} alt={cleanCourseName(f.name)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          loading="lazy" />
                      </LLink>
                      <div style={{ padding: 22 }}>
                        <span className="tag">Video Course</span>
                        <h3 style={{ marginTop: 8 }}>
                          <LLink to={`/courses/${f.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{cleanCourseName(f.name)}</LLink>
                        </h3>
                        <LLink className="btn btn-navy" to={`/courses/${f.id}`}>Open Course →</LLink>
                      </div>
                    </div>
                  ))}
                </div>
              </>)}
            </>)}
        </div>
      </section>
    </>
  );
}
