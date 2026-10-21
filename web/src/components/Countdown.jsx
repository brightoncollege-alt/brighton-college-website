/* Countdown to an admission/event deadline — date-driven from config.
   Renders NOTHING when COUNTDOWN.date is empty or in the past (no fake data). */
import React, { useEffect, useState } from 'react';
import { COUNTDOWN } from '../config.js';
import { LLink, useLang } from '../i18n/LangContext.jsx';

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export default function Countdown() {
  const { lang } = useLang();
  const [now, setNow] = useState(() => Date.now());

  const target = COUNTDOWN.date ? new Date(COUNTDOWN.date).getTime() : 0;
  const live = target && target > now;

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [live]);

  if (!live) return null;
  const p = parts(target - now);
  const cells = [
    [p.d, lang === 'ur' ? 'دن' : 'Days'],
    [p.h, lang === 'ur' ? 'گھنٹے' : 'Hours'],
    [p.m, lang === 'ur' ? 'منٹ' : 'Mins'],
    [p.s, lang === 'ur' ? 'سیکنڈ' : 'Secs'],
  ];
  return (
    <div className="countdown" role="timer" aria-live="off">
      <span className="countdown-label">
        {lang === 'ur' ? COUNTDOWN.label_ur : COUNTDOWN.label_en}
      </span>
      <span className="countdown-cells">
        {cells.map(([v, l]) => (
          <span className="cd-cell" key={l}>
            <b>{String(v).padStart(2, '0')}</b><i>{l}</i>
          </span>
        ))}
      </span>
      {COUNTDOWN.link && (
        <LLink className="btn btn-gold btn-sm" to={COUNTDOWN.link}>
          {lang === 'ur' ? 'کالج آئیں' : 'Visit Us'}
        </LLink>
      )}
    </div>
  );
}
