/* Back-to-top floating button — appears after scrolling. */
import React, { useEffect, useState } from 'react';
import { useLang } from '../i18n/LangContext.jsx';

export default function BackToTop() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={'to-top' + (show ? ' show' : '')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={lang === 'ur' ? 'اوپر جائیں' : 'Back to top'}
      tabIndex={show ? 0 : -1}
    >↑</button>
  );
}
