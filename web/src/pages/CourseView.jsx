/* CourseView — R4 course-page template (Udemy skeleton, premium-ified).
   Dark trust header → custom VideoPlayer (R5) → curriculum accordion
   (Drive folders = sections) → what-you'll-learn → instructor.
   Progress tracked via lib/progress.js (R6, localStorage, Supabase-ready). */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useCollege, useSite } from '../college/CollegeContext.jsx';

import VideoPlayer from '../components/VideoPlayer.jsx';
import { getCourseProgress, markLessonWatched } from '../lib/progress.js';
import { fetchCourseById, backendReady } from '../lib/supabase.js';
import { driveListAll, drivePreviewUrl, driveDownloadUrl, driveReady, isFolder } from '../lib/drive.js';
import Seo from '../seo/Seo.jsx';

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return ''; }
}

/* One accordion section = one Drive subfolder (lazy-loaded on expand). */
function CurriculumSection({ folder, activeId, onPlay, watched }) {
  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (open) { setOpen(false); return; }
    setOpen(true);
    if (videos !== null) return;
    setLoading(true);
    try {
      const files = await driveListAll(folder.id);
      setVideos(files.filter((f) => !isFolder(f.mimeType) && f.mimeType.startsWith('video/')));
    } catch { setVideos([]); }
    setLoading(false);
  }

  return (
    <div className={'cur-sec' + (open ? ' open' : '')}>
      <button className="cur-sec-head" onClick={toggle} aria-expanded={open}>
        <span className="chev" aria-hidden>▶</span>
        <h4>{folder.name}</h4>
        <span className="count">{videos ? `${videos.length} lessons` : ''}</span>
      </button>
      {open && (
        <ul className="cur-lessons">
          {loading && <li className="cur-lesson"><span className="t">Loading…</span></li>}
          {videos && videos.length === 0 && <li className="cur-lesson"><span className="t">No videos here yet.</span></li>}
          {videos && videos.map((v, i) => (
            <li key={v.id}
              className={'cur-lesson' + (activeId === v.id ? ' active' : '')}
              onClick={() => onPlay(v)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onPlay(v); }}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="play-ic" aria-hidden>▶</span>
              <span className="t">{v.name}</span>
              {watched && watched.has(v.id) && <span className="done" title="Watched">✓</span>}
              <span className="dur">{v.size ? Math.round(Number(v.size) / 1048576) + ' MB' : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Root-level videos section: loads with the course. */
function RootSection({ videos, ...rest }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={'cur-sec' + (open ? ' open' : '')}>
      <button className="cur-sec-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="chev" aria-hidden>▶</span>
        <h4>All Lessons</h4>
        <span className="count">{videos.length} lessons</span>
      </button>
      {open && (
        <ul className="cur-lessons">
          {videos.map((v, i) => (
            <li key={v.id}
              className={'cur-lesson' + (rest.activeId === v.id ? ' active' : '')}
              onClick={() => rest.onPlay(v)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') rest.onPlay(v); }}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="play-ic" aria-hidden>▶</span>
              <span className="t">{v.name}</span>
              {rest.watched && rest.watched.has(v.id) && <span className="done" title="Watched">✓</span>}
              <span className="dur">{v.size ? Math.round(Number(v.size) / 1048576) + ' MB' : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CourseView() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const { college } = useCollege();
  const [course, setCourse] = useState(null);
  const [folders, setFolders] = useState([]);
  const [rootVideos, setRootVideos] = useState([]);
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [watched, setWatched] = useState(new Set());
  const [streamFallback, setStreamFallback] = useState(false);

  useEffect(() => {
    if (!backendReady()) { setLoading(false); return; }
    fetchCourseById(id, college && college.id)
      .then(async (c) => {
        setCourse(c || null);
        if (c && c.drive_folder_id && driveReady()) {
          try {
            const files = await driveListAll(c.drive_folder_id);
            setFolders(files.filter((f) => isFolder(f.mimeType)));
            setRootVideos(files.filter((f) => !isFolder(f.mimeType) && f.mimeType.startsWith('video/')));
          } catch (e) {
            setErr('Could not load videos. Check that the Drive folder is shared ("Anyone with the link") and the API key is set.');
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Progress (R6): restore watched marks via progress.js
  useEffect(() => {
    try {
      const p = getCourseProgress(id, 1);
      setWatched(new Set(p.watched || []));
    } catch {}
  }, [id]);

  function onPlay(v) {
    setWatch(v);
    setStreamFallback(false);
    setTimeout(() => document.getElementById('course-player')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }

  function handleEnded(v) {
    try {
      const p = markLessonWatched(id, v.id, 1.0, v.name);
      setWatched(new Set(p.watched || []));
    } catch {}
  }

  /* Subtitle tracks — active when the course row provides VTT URLs. */
  const subtitles = [];
  if (course && course.subtitles_en) subtitles.push({ label: 'English', srcLang: 'en', src: course.subtitles_en });
  if (course && course.subtitles_ur) subtitles.push({ label: 'اردو', srcLang: 'ur', src: course.subtitles_ur });

  const learnPoints = course && course.learn_points
    ? (Array.isArray(course.learn_points) ? course.learn_points : String(course.learn_points).split('\n').filter(Boolean))
    : [];

  /* Video SEO (ranking weapon): VideoObject JSON-LD for Google Video results.
     Emitted only when a real playable video exists — never faked. */
  const videoSeo = [];
  const firstVideo = rootVideos && rootVideos.length ? rootVideos[0] : null;
  if (course && firstVideo && firstVideo.id) {
    const vo = {
      '@type': 'VideoObject',
      name: (course.title || 'Course video') + ' — ' + firstVideo.name,
      description: (course.description || '').slice(0, 300) || ('Video lesson from ' + (course.title || 'this course') + ' at The Brighton College.'),
      uploadDate: course.created_at || new Date().toISOString(),
      contentUrl: driveDownloadUrl(firstVideo.id),
      embedUrl: (typeof window !== 'undefined' ? window.location.href : ''),
    };
    if (course.thumbnail_url) vo.thumbnailUrl = [course.thumbnail_url];
    videoSeo.push(vo);
  }

  return (
    <>
      <Seo page="courses"
        pathOverride={college ? `/${college.slug}/${lang}/courses/${id}` : null}
        extra={videoSeo.length ? videoSeo : null}
      />
      {/* ---------- Dark trust header (R4) ---------- */}
      <section className="course-hero">
        <div className="container">
          <div className="crumbs">
            <LLink to="/">{t.common.backHome}</LLink> / <LLink to="/courses">{t.pages.courses.crumbs}</LLink>
          </div>
          <h1>{course ? course.title : '…'}</h1>
          {course && course.description && <p className="sub">{course.description.slice(0, 220)}</p>}
          {course && (
            <div className="trust-row">
              {course.class_level && <span className="tag">{course.class_level}</span>}
              <span>🎬 <b>{rootVideos.length}{folders.length ? '+' : ''}</b> video lessons</span>
              {folders.length > 0 && <span>🗂️ <b>{folders.length}</b> sections</span>}
              {course.updated_at && <span>Updated {fmtDate(course.updated_at)}</span>}
              <span>{lang === 'ur' ? 'اردو اور انگریزی' : 'English & Urdu'}</span>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? <div className="loading">{t.common.loading}</div>
            : !course ? (
              <div className="empty"><div className="big">🔍</div><h3>Course not found</h3>
                <p><LLink to="/courses">{t.common.backTo} {t.pages.courses.crumbs}</LLink></p></div>
            ) : !driveReady() ? (
              <div className="empty">
                <div className="big">🔑</div>
                <h3>Video library not connected yet</h3>
                <p>Add the Drive API key in the site config to stream this course's videos.</p>
              </div>
            ) : (
              <div className="course-layout">
                <div>
                  {/* ---------- Custom video player (R5) ---------- */}
                  {watch && (
                    <div id="course-player" style={{ marginBottom: 26 }}>
                      <VideoPlayer
                        src={driveDownloadUrl(watch.id)}
                        title={watch.name}
                        videoId={watch.id}
                        subtitles={subtitles}
                        onEnded={() => handleEnded(watch)}
                        onStreamError={() => setStreamFallback(true)}
                      />
                      {streamFallback && (
                        <div className="video-frame" style={{ marginTop: 12 }}>
                          <div className="vf-head"><span className="play">▶</span> {watch.name} — Drive preview</div>
                          <iframe src={drivePreviewUrl(watch.id)} title={watch.name}
                            allow="autoplay; fullscreen" allowFullScreen />
                        </div>
                      )}
                    </div>
                  )}
                  {err && <div className="alert err">{err}</div>}

                  {/* ---------- Curriculum accordion ---------- */}
                  <h2 style={{ marginBottom: 14 }}>Course Content</h2>
                  <div className="curriculum" style={{ marginBottom: 34 }}>
                    {rootVideos.length > 0 && (
                      <RootSection videos={rootVideos} activeId={watch && watch.id} onPlay={onPlay} watched={watched} />
                    )}
                    {folders.map((f) => (
                      <CurriculumSection key={f.id} folder={f}
                        activeId={watch && watch.id} onPlay={onPlay} watched={watched} />
                    ))}
                    {rootVideos.length === 0 && folders.length === 0 && (
                      <div className="empty"><div className="big">📂</div><h3>No videos in this course yet</h3></div>
                    )}
                  </div>

                  {/* ---------- What you'll learn ---------- */}
                  {learnPoints.length > 0 && (
                    <>
                      <h2 style={{ marginBottom: 14 }}>What You&apos;ll Learn</h2>
                      <ul className="learn-grid" style={{ marginBottom: 34 }}>
                        {learnPoints.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </>
                  )}

                  {/* ---------- Description ---------- */}
                  {course.description && (
                    <>
                      <h2 style={{ marginBottom: 14 }}>About This Course</h2>
                      <div className="prose" style={{ marginBottom: 34 }}>
                        <p>{course.description}</p>
                      </div>
                    </>
                  )}

                  {/* ---------- Instructor ---------- */}
                  <h2 style={{ marginBottom: 14 }}>Instructor</h2>
                  {course.instructor_name ? (
                    <div className="instructor-card">
                      {course.instructor_photo && <img src={course.instructor_photo} alt={course.instructor_name} />}
                      <div>
                        <h3 style={{ margin: '0 0 4px' }}>{course.instructor_name}</h3>
                        {course.instructor_bio && <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14.5 }}>{course.instructor_bio}</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="instructor-card">
                      <div className="avatar-circle" style={{ margin: 0, flex: 'none' }}>B</div>
                      <div>
                        <h3 style={{ margin: '0 0 4px' }}>The Brighton College Faculty</h3>
                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14.5 }}>
                          Lessons recorded by the college&apos;s own subject teachers — the same teachers from your classroom.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------- Sticky enroll card ---------- */}
                <aside>
                  <div className="enroll-card">
                    <div className="enroll-card-thumb">
                      {course.thumbnail_url
                        ? <img src={course.thumbnail_url} alt="" />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>🎬</div>}
                    </div>
                    <div className="enroll-card-body">
                      {rootVideos.length > 0 && (
                        <button className="btn btn-gold" onClick={() => onPlay(rootVideos[0])}>
                          ▶ Start Learning
                        </button>
                      )}
                      {watched.size > 0 && (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, margin: '6px 0' }}>
                            <span>Your progress</span>
                            <b>{watched.size} / {rootVideos.length || '…'}</b>
                          </div>
                          <div className="progress-track"><div className="progress-fill"
                            style={{ width: rootVideos.length ? (watched.size / rootVideos.length * 100) + '%' : '0%' }} /></div>
                        </>
                      )}
                      <ul className="includes">
                        <li>{rootVideos.length}{folders.length ? '+' : ''} video lessons</li>
                        <li>Watch at your own pace</li>
                        <li>Works on mobile & desktop</li>
                        <li>{lang === 'ur' ? 'اردو اور انگریزی میں' : 'In English & Urdu'}</li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            )}
        </div>
      </section>
    </>
  );
}
