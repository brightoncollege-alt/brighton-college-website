import React, { useEffect, useState } from 'react';

/* PWA install button. Lives ONLY on the dedicated /install page
   (never in the Home hero — the hero must stay clean).
   Why a button at all: browsers do NOT put an install link on the
   page by themselves — Chrome only offers "Install app" in its own
   menu, and iOS Safari only via Share → Add to Home Screen. So the
   install page offers its own button: when the browser fires
   beforeinstallprompt it triggers the real install prompt; when it
   doesn't (iOS, in-app browsers), the button shows the manual steps
   instead of doing nothing. Hidden once the app is installed. */
export default function InstallApp({ buttonClass = 'btn btn-gold' }) {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }
    const onBefore = (e) => { e.preventDefault(); setDeferred(e); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onBefore);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBefore);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  const onClick = async () => {
    if (!deferred) { setShowHelp((v) => !v); return; }
    deferred.prompt();
    try { await deferred.userChoice; } catch {}
    setDeferred(null);
  };

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <button type="button" className={buttonClass} onClick={onClick}>Install App</button>
      {showHelp && (
        <span style={{ fontSize: 13.5, color: 'var(--muted)', maxWidth: 340, lineHeight: 1.6 }}>
          Android (Chrome app me kholo): menu ⋮ → Install app. iPhone (Safari me kholo):
          Share → Add to Home Screen. Kisi aur app ke andar khula browser (jaise
          WhatsApp/Facebook) install nahi deta — site ko seedha Chrome/Safari me kholo.
        </span>
      )}
    </span>
  );
}
