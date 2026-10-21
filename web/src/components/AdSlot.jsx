import React from 'react';
import { useLang } from '../i18n/LangContext.jsx';

/* Placeholder ad slot — clearly labeled "Advertisement", static only:
   never sticky, never floating, never pop-up, never covers content.
   Space is reserved so dropping in real AdSense code later causes
   no layout shift. To go live: fill data-ad-client + data-ad-slot
   and render the <ins class="adsbygoogle"> tag inside. */
const SIZES = {
  leaderboard: '970 × 90',
  incontent: '728 × 90',
  box: '300 × 250',
};

export default function AdSlot({ id, format = 'leaderboard' }) {
  const { t } = useLang();
  const label = (t.common && t.common.advertisement) || 'Advertisement';
  return (
    <div className="ad-slot-wrap">
      <div
        className={`ad-slot ad-slot-${format}`}
        role="complementary"
        aria-label={label}
        data-ad-slot-id={id}
        data-ad-client=""
        data-ad-slot=""
      >
        <span className="ad-slot-label">{label}</span>
        <span className="ad-slot-size">{SIZES[format] || format}</span>
      </div>
    </div>
  );
}
