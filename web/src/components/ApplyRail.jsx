/* Persistent gold "Visit" side rail — desktop only (owner's order:
   no online admission; the rail invites a campus visit). */
import React from 'react';
import { useLang } from '../i18n/LangContext.jsx';

export default function ApplyRail() {
  const { t, lp } = useLang();
  return (
    <a className="apply-rail" href={lp('/contact')} aria-label={t.visitCampus}>
      {t.visitCampus}
    </a>
  );
}
