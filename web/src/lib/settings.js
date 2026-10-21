/* Site settings — admin-editable global switches (Supabase site_settings
   table, per college), with a localStorage fallback so the public site
   always shows an honest state even when the backend is offline.
   Keys: 'admissions_open' ('true'/'false', default false = CLOSED),
         'show_ads' ('true'/'false', default true),
         'rewarded_ads' ('true'/'false', default true). */
import { useState, useEffect } from 'react';
import { backendReady, sba } from './supabase.js';
import { useCollege } from '../college/CollegeContext.jsx';

const LS_PREFIX = 'bcp_setting_';

export function localSetting(key, def) {
  try {
    const v = localStorage.getItem(LS_PREFIX + key);
    return v === null ? def : v;
  } catch { return def; }
}

export function saveLocalSetting(key, value) {
  try { localStorage.setItem(LS_PREFIX + key, value); } catch {}
}

/* Read one setting from Supabase; falls back to the local value (or def)
   when the backend is offline or the row is missing. */
export async function getSetting(collegeId, key, def) {
  if (!backendReady() || !collegeId) return localSetting(key, def);
  try {
    const q = '/rest/v1/site_settings?select=value'
      + '&college_id=eq.' + encodeURIComponent(collegeId)
      + '&key=eq.' + encodeURIComponent(key) + '&limit=1';
    const rows = await sba.get(q);
    if (rows && rows[0] && rows[0].value !== undefined && rows[0].value !== null) {
      saveLocalSetting(key, String(rows[0].value));
      return String(rows[0].value);
    }
  } catch {}
  return localSetting(key, def);
}

/* Write one setting (upsert by college_id+key). Also updates the local
   fallback immediately so the public site reflects the change at once. */
export async function setSetting(collegeId, key, value) {
  const v = String(value);
  saveLocalSetting(key, v);
  if (!backendReady() || !collegeId) return v;
  const base = '/rest/v1/site_settings';
  const match = '?college_id=eq.' + encodeURIComponent(collegeId)
    + '&key=eq.' + encodeURIComponent(key) + '&limit=1';
  const rows = await sba.get(base + '?select=id&' + match.slice(1));
  if (rows && rows[0]) {
    await sba.patch(base + '?id=eq.' + encodeURIComponent(rows[0].id),
      { value: v, updated_at: new Date().toISOString() });
  } else {
    await sba.post(base, { college_id: collegeId, key, value: v });
  }
  return v;
}

/* React hook: live value of a setting ('true'/'false' strings).
   Starts from localStorage so first paint is never wrong. */
export function useSiteSetting(key, def) {
  const [value, setValue] = useState(() => localSetting(key, def));
  const { college } = useCollege();
  useEffect(() => {
    let live = true;
    const cid = college && college.id;
    if (!backendReady() || !cid) return undefined;
    getSetting(cid, key, def).then((v) => { if (live) setValue(v); }).catch(() => {});
    return () => { live = false; };
  }, [college, key, def]);
  return value;
}

/* Admissions status for the public site. Default = CLOSED (false). */
export function useAdmissionsOpen() {
  return useSiteSetting('admissions_open', 'false') === 'true';
}

/* Whether ad slots should render. Default = true. */
export function useShowAds() {
  return useSiteSetting('show_ads', 'true') === 'true';
}

/* Whether rewarded pre-roll ads gate course videos. Default = true. */
export function useRewardedAds() {
  return useSiteSetting('rewarded_ads', 'true') === 'true';
}
