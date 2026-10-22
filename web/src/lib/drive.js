/* The Brighton College — Google Drive helper (study material library).
   Lists files inside the configured Drive folder via the public Drive API.
   Needs DRIVE_API_KEY + DRIVE_FOLDER_ID in config.js. Returns [] when the
   key is missing so the UI can show its "coming soon" state. */
import { DRIVE_API_KEY, DRIVE_FOLDER_ID } from '../config.js';

export function driveReady() {
  return !!DRIVE_API_KEY && !!DRIVE_FOLDER_ID;
}

/* List files in a folder (defaults to the configured root folder). */
export async function driveList(folderId) {
  if (!driveReady()) return [];
  const q = encodeURIComponent(`'${folderId || DRIVE_FOLDER_ID}' in parents and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}` +
    `&fields=files(id,name,mimeType,size,modifiedTime,thumbnailLink)` +
    `&orderBy=name&key=${encodeURIComponent(DRIVE_API_KEY)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Drive ' + r.status);
  const j = await r.json();
  return j.files || [];
}

export function drivePreviewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/* Get a single file/folder's metadata (used for Drive-folder courses:
   folder name becomes the course title). */
export async function driveGetFile(fileId) {
  if (!driveReady()) return null;
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}` +
    `?fields=id,name,mimeType,thumbnailLink&key=${encodeURIComponent(DRIVE_API_KEY)}`;
  const r = await fetch(url);
  if (!r.ok) return null;
  return r.json();
}

export function driveDownloadUrl(fileId) {
  /* Direct streaming via Drive API (supports range requests, works for public files) */
  if (DRIVE_API_KEY) {
    return `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media&key=${encodeURIComponent(DRIVE_API_KEY)}`;
  }
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function isFolder(mimeType) {
  return mimeType === 'application/vnd.google-apps.folder';
}

/* Clean a Drive folder/file name into a professional course title:
   removes @mentions (@AHM7TECH etc), underscores -> spaces,
   trims, collapses whitespace, title-cases sensibly. */
export function cleanCourseName(raw) {
  if (!raw) return '';
  let s = String(raw);
  s = s.replace(/@[\w.]+/g, '');        // remove @mentions
  s = s.replace(/_/g, ' ');            // underscores -> spaces
  s = s.replace(/\s+/g, ' ').trim();   // collapse whitespace
  return s;
}

/* ---------- Paginated folder listing with simple caching ----------
   Drive API has rate limits; 700GB+ libraries mean many files.
   driveListAll walks all pages (100/page via pageToken) and caches the
   result per folder for CACHE_TTL_MS so repeated visits don't hammer
   the API. Playback itself (preview iframe) costs no API quota. */
const CACHE_TTL_MS = 10 * 60 * 1000;
const _cache = {}; // folderId -> { at, files }

export function clearDriveCache(folderId) {
  if (folderId) delete _cache[folderId];
  else Object.keys(_cache).forEach((k) => delete _cache[k]);
}

export async function driveListAll(folderId, { orderBy = 'name' } = {}) {
  if (!driveReady()) return [];
  const cached = _cache[folderId];
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.files;

  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  let files = [];
  let pageToken = '';
  // Safety cap: 2000 files per folder per load (20 pages) — plenty for a course.
  for (let page = 0; page < 20; page++) {
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}` +
      `&fields=nextPageToken,files(id,name,mimeType,size,modifiedTime,thumbnailLink)` +
      `&orderBy=${orderBy}&pageSize=100` +
      (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '') +
      `&key=${encodeURIComponent(DRIVE_API_KEY)}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('Drive ' + r.status);
    const j = await r.json();
    files = files.concat(j.files || []);
    pageToken = j.nextPageToken || '';
    if (!pageToken) break;
  }
  _cache[folderId] = { at: Date.now(), files };
  return files;
}
