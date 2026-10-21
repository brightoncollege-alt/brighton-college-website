/* Rewarded-ad frequency cap — students must never feel harassed.
   Rules: max ONE rewarded ad per 10 minutes per user (localStorage
   timestamp, survives reloads), AND max one per video per browser
   session (sessionStorage set, so re-tapping the same lesson in one
   sitting never re-gates). */

export const REWARD_CAP_MS = 10 * 60 * 1000; // 10 minutes
const LS_KEY = 'bcp_rewarded_last';
const SS_KEY = 'bcp_rewarded_session';

function lsGet(k) { try { return window.localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch { /* ignore */ } }
function ssGet() {
  try { return JSON.parse(window.sessionStorage.getItem(SS_KEY) || '[]'); }
  catch { return []; }
}
function ssSet(arr) {
  try { window.sessionStorage.setItem(SS_KEY, JSON.stringify(arr)); } catch { /* ignore */ }
}

/* Has the 10-minute global cap elapsed? */
export function rewardCapReady() {
  const last = parseInt(lsGet(LS_KEY) || '0', 10);
  return !last || (Date.now() - last) >= REWARD_CAP_MS;
}

/* Record that a rewarded ad was fully viewed. */
export function markRewardShown() {
  lsSet(LS_KEY, String(Date.now()));
}

/* Was this video already gated once this session? */
export function sessionGated(videoId) {
  return ssGet().includes(String(videoId));
}

/* Remember that this video was gated this session. */
export function markSessionGated(videoId) {
  const arr = ssGet();
  const id = String(videoId);
  if (!arr.includes(id)) { arr.push(id); ssSet(arr); }
}
