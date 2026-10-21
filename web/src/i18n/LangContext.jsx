/* Bilingual + multi-college routing (R1, Phase 4).
   Routes live under /:collegeSlug/:lang/* (en | ur). The pill toggle shows
   the OTHER language (Almentor pattern), flips the URL prefix, mirrors dir,
   and persists the preference in localStorage.
   Bare /:lang/* URLs redirect to the default college (see App.jsx). */
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { STRINGS } from './strings.js';
import { DEFAULT_COLLEGE_SLUG } from '../data/colleges.js';

export const LANGS = ['en', 'ur'];
const LS_KEY = 'bcp_lang';

const LangCtx = createContext({ lang: 'en', setLang: () => {}, t: STRINGS.en, lp: (p) => p });

/** Prefix a site path with the current college + language:
    lp('/about') -> '/brighton/en/about'. */
export function useLang() {
  return useContext(LangCtx);
}

export function LangProvider({ children, lang: langProp, collegeSlug: collegeProp }) {
  const { lang: routeLang } = useParams();
  const lang = langProp || (LANGS.includes(routeLang) ? routeLang : 'en');
  const collegeSlug = collegeProp || DEFAULT_COLLEGE_SLUG;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    try { localStorage.setItem(LS_KEY, lang); } catch {}
    window.scrollTo(0, 0);
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    collegeSlug,
    setLang: () => {},
    t: STRINGS[lang],
    lp: (p) => `/${collegeSlug}/${lang}${p === '/' ? '' : p}`,
  }), [lang, collegeSlug]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

/** Language-aware Link — always routes inside the current college/:lang prefix. */
export function LLink({ to, ...rest }) {
  const { lp } = useLang();
  const href = typeof to === 'string' && to.startsWith('/') ? lp(to) : to;
  return <Link to={href} {...rest} />;
}

/** Language-aware NavLink. */
export function LNavLink({ to, ...rest }) {
  const { lp } = useLang();
  const href = typeof to === 'string' && to.startsWith('/') ? lp(to) : to;
  return <NavLink to={href} {...rest} />;
}

/** Read the persisted language choice (for redirects outside the provider). */
export function storedLang() {
  try {
    const l = localStorage.getItem(LS_KEY);
    return LANGS.includes(l) ? l : 'en';
  } catch { return 'en'; }
}
