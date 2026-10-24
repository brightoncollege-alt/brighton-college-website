import React, { useEffect, useState } from 'react';

/* PWA install button for the Home hero.
   Why a button at all: browsers do NOT put an install link on the
   page by themselves — Chrome only offers "Install app" in its own
   menu, and iOS Safari only via Share → Add to Home Screen. So the
   site now offers its own button: when the browser fires
   beforeinstallprompt it triggers the real install prompt; when it
   doesn't (iOS, in-app browsers), the button shows the manual steps
   instead of doing nothing. Hidden once the app is installed. */
export default function InstallApp() {
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
      <button type="button" className="btn btn-outline-light" onClick={onClick}>Install App</button>
      {showHelp && (
        <span style={{ fontSize: 13.5, color: '#c8d4e6', maxWidth: 340, lineHeight: 1.6 }}>
          Android (Chrome app me kholo): menu ⋮ → Install app. iPhone (Safari me kholo):
          Share → Add to Home Screen. Kisi aur app ke andar khula browser (jaise
          WhatsApp/Facebook) install nahi deta — site ko seedha Chrome/Safari me kholo.
        </span>
      )}
    </span>
  );
}
