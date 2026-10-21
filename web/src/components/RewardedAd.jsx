import React, { useEffect, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';

/* Rewarded ad interstitial for course videos.
   Shown INLINE where the player will appear — never a pop-up, never
   floating, never blocking the whole page. The student watches a short
   placeholder ad (5s countdown, no sound, no autoplay tricks), then taps
   "Continue to video" and the lesson unlocks.
   - Clearly labeled "Advertisement" (i18n).
   - data-ad-client / data-ad-slot attributes are in place and empty:
     fill them + render the real AdSense/AdMob rewarded unit to go live.
   - Closing the card returns to the lesson list (video stays locked);
     nothing is forced on the student. */
const COUNTDOWN_SECS = 5;

export default function RewardedAd({ videoTitle, onComplete, onClose }) {
  const { t } = useLang();
  const r = (t.common && t.common.rewarded) || {};
  const [left, setLeft] = useState(COUNTDOWN_SECS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (left <= 0) { setDone(true); return; }
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  const adLabel = (t.common && t.common.advertisement) || 'Advertisement';

  return (
    <div className="rewarded" role="dialog" aria-modal="false"
      aria-label={adLabel + ' — ' + (r.title || 'Rewarded ad')}>
      <div className="rewarded-head">
        <span className="rewarded-tag">{adLabel}</span>
        <button type="button" className="rewarded-x" onClick={onClose}
          aria-label={r.close || 'Close'}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <h3 className="rewarded-title">{r.title || 'Watch this short ad to continue learning'}</h3>
      {videoTitle && <p className="rewarded-video">{videoTitle}</p>}

      {/* Placeholder creative — swap for the real rewarded unit later. */}
      <div className="rewarded-creative"
        data-ad-slot-id="course-rewarded"
        data-ad-client=""
        data-ad-slot="">
        <span className="rewarded-creative-label">{adLabel}</span>
        <span className="rewarded-creative-size">Rewarded · 5s</span>
      </div>

      <p className="rewarded-note">
        {done
          ? (r.thanks || 'Thanks for supporting free learning!')
          : (r.startsIn || 'Your video unlocks in') + ' ' + left + 's'}
      </p>

      <button type="button"
        className={'btn btn-gold rewarded-cta' + (done ? '' : ' is-disabled')}
        onClick={() => done && onComplete()}
        disabled={!done}
        aria-disabled={!done}>
        {r.continue || 'Continue to video'}
      </button>
    </div>
  );
}
