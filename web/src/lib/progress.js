/* ==========================================================================
   THE BRIGHTON COLLEGE — course progress helpers (research rule R6).
   localStorage-backed today, Supabase-ready tomorrow (see SUPABASE_SWAP_NOTE
   at the bottom). Pure functions — no React, no DOM, no side effects beyond
   the storage layer, so these are trivially unit-testable.

   Key namespace: `bcp_prog_`
     bcp_prog_course_<courseId>  -> { watched: { [videoId]: { at, ratio } },
                                      updatedAt }
     bcp_prog_recent             -> { courseId, videoId, position, title, at }
   ========================================================================== */

const NS = 'bcp_prog_';
const COURSE_KEY = (courseId) => `${NS}course_${courseId}`;
const RECENT_KEY = `${NS}recent`;
const COMPLETE_RATIO = 0.9; // a lesson counts as watched at >= 90% played

function isBrowser() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

function read(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback; // corrupt JSON / private mode -> behave as empty
  }
}

function write(key, value) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // quota / private mode -> progress just isn't persisted
  }
}

function remove(key) {
  if (!isBrowser()) return;
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
}

function validId(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function clampRatio(r) {
  const n = Number(r);
  if (!isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function courseRecord(courseId) {
  const rec = read(COURSE_KEY(courseId), null);
  if (rec && typeof rec === 'object' && rec.watched && typeof rec.watched === 'object') {
    return rec;
  }
  return { watched: {}, updatedAt: null };
}

/**
 * Progress summary for one course.
 * @param {string} courseId
 * @param {number} totalLessons — total lesson count of the course
 * @returns {{ watched: string[], percent: number }}
 */
export function getCourseProgress(courseId, totalLessons) {
  if (!validId(courseId)) return { watched: [], percent: 0 };
  const rec = courseRecord(courseId);
  const watched = Object.keys(rec.watched).filter((vid) => {
    const e = rec.watched[vid];
    return e && typeof e.at === 'string';
  });
  const total = Number(totalLessons);
  const percent = total > 0 ? Math.min(100, Math.round((watched.length / total) * 100)) : 0;
  return { watched, percent };
}

/**
 * Record playback progress for a lesson.
 * - Always refreshes the "continue learning" pointer (most recent activity).
 * - Marks the lesson watched (with a timestamp) once positionRatio >= 0.9.
 * @param {string} courseId
 * @param {string} videoId
 * @param {number} positionRatio — 0..1 fraction of the video played
 * @param {string} [title] — lesson title, stored for the continue-learning card
 * @returns {{ watched: string[], completed: boolean }}
 */
export function markLessonWatched(courseId, videoId, positionRatio, title) {
  if (!validId(courseId) || !validId(videoId)) {
    return { watched: [], completed: false };
  }
  const ratio = clampRatio(positionRatio);
  const now = new Date().toISOString();

  const rec = courseRecord(courseId);
  const completed = ratio >= COMPLETE_RATIO;
  if (completed) {
    rec.watched[videoId] = { at: now, ratio };
    rec.updatedAt = now;
    write(COURSE_KEY(courseId), rec);
  }

  // Most-recent activity pointer — updated on every call, even partial views.
  write(RECENT_KEY, {
    courseId,
    videoId,
    position: ratio,
    title: typeof title === 'string' ? title : '',
    at: now,
  });

  return { watched: Object.keys(rec.watched), completed };
}

/**
 * Where the learner left off, across all courses.
 * @returns {{ courseId: string, videoId: string, position: number, title: string } | null}
 */
export function getContinueLearning() {
  const r = read(RECENT_KEY, null);
  if (!r || !validId(r.courseId) || !validId(r.videoId)) return null;
  return {
    courseId: r.courseId,
    videoId: r.videoId,
    position: clampRatio(r.position),
    title: typeof r.title === 'string' ? r.title : '',
  };
}

/**
 * Wipe all progress for one course (and the continue-learning pointer if it
 * points into this course).
 * @param {string} courseId
 */
export function resetCourseProgress(courseId) {
  if (!validId(courseId)) return;
  remove(COURSE_KEY(courseId));
  const r = read(RECENT_KEY, null);
  if (r && r.courseId === courseId) remove(RECENT_KEY);
}

/* ==========================================================================
   SUPABASE_SWAP_NOTE
   --------------------------------------------------------------------------
   When the backend is live, replace the storage layer above with Supabase
   upserts — the function signatures and return shapes stay IDENTICAL, so no
   component needs to change. Suggested schema (run once in the SQL editor):

     create table lesson_progress (
       user_id    uuid        not null,          -- auth.users.id (or device id pre-login)
       course_id  text        not null,
       video_id   text        not null,
       ratio      numeric     not null default 0,
       watched_at timestamptz,
       updated_at timestamptz not null default now(),
       primary key (user_id, course_id, video_id)
     );

     create table learning_state (               -- one row per learner
       user_id   uuid        primary key,
       course_id text        not null,
       video_id  text        not null,
       position  numeric     not null default 0,
       title     text        not null default '',
       at        timestamptz not null default now()
     );

   Exact swap points (using the existing plain-fetch helper in
   ../lib/supabase.js — see backendReady() / req() there):

     markLessonWatched ->
       await req('POST', '/rest/v1/lesson_progress',
         { prefer: 'resolution=merge-duplicates',
           json: { user_id, course_id, video_id, ratio,
                   watched_at: completed ? now : null, updated_at: now } });
       await req('POST', '/rest/v1/learning_state',
         { prefer: 'resolution=merge-duplicates',
           json: { user_id, course_id, video_id, position: ratio, title, at: now } });

     getCourseProgress ->
       const rows = await req('GET',
         `/rest/v1/lesson_progress?user_id=eq.${user_id}&course_id=eq.${courseId}` +
         `&watched_at=not.is.null&select=video_id`);
       watched = rows.map(r => r.video_id);   // percent computed the same way

     getContinueLearning ->
       const rows = await req('GET',
         `/rest/v1/learning_state?user_id=eq.${user_id}&select=course_id,video_id,position,title`);
       return rows[0] || null;

     resetCourseProgress ->
       await req('DELETE',
         `/rest/v1/lesson_progress?user_id=eq.${user_id}&course_id=eq.${courseId}`);

   Keep localStorage as a write-through cache / offline fallback even after the
   swap: try Supabase first (backendReady()), fall back to the current
   implementation on failure. Enable RLS with `auth.uid() = user_id` policies.
   ========================================================================== */
