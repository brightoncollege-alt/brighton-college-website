/* Theme (dark/light mode) — persisted in localStorage, respects
   prefers-color-scheme on first visit. Applied via data-theme on
   <html> so CSS variables switch cleanly; no white flash because
   index.html sets data-theme before first paint. */
import { useState, useCallback } from 'react';

const KEY = 'bcp_theme';

export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {}
  return 'light';
}

export function applyTheme(theme) {
  const el = document.documentElement;
  el.classList.add('theming');
  el.dataset.theme = theme;
  try { localStorage.setItem(KEY, theme); } catch {}
  window.setTimeout(() => el.classList.remove('theming'), 350);
}

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light'
  );
  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  }, [theme]);
  return [theme, toggle];
}
