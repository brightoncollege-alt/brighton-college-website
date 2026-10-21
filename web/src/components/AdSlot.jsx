import React from 'react';

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
  return (
    <div className="ad-slot-wrap">
      <div
        className={`ad-slot ad-slot-${format}`}
        role="complementary"
        aria-label="Advertisement"
        data-ad-slot-id={id}
        data-ad-client=""
        data-ad-slot=""
      >
        <span className="ad-slot-label">Advertisement</span>
        <span className="ad-slot-size">{SIZES[format] || format}</span>
      </div>
    </div>
  );
}
