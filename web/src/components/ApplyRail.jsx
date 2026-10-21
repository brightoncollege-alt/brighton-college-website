/* Persistent gold "Apply" side rail — desktop only (R2, Brighton UK pattern). */
import React from 'react';
import { useLang } from '../i18n/LangContext.jsx';

export default function ApplyRail() {
  const { t, lp } = useLang();
  return (
    <a className="apply-rail" href={lp('/admissions')} aria-label={t.applyNow}>
      {t.applyNow}
    </a>
  );
}
