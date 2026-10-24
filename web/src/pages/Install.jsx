/* Dedicated app-install page. The install button lives HERE and in
   the footer only — never in the Home hero (design must stay clean).
   On mobile, visitors open this page and tap Install App directly. */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import InstallApp from '../components/InstallApp.jsx';

const EN = {
  title: 'Install the App',
  sub: 'Add The Brighton College to your phone — one tap, then it opens like an app, from your home screen.',
  stepsTitle: 'If the button does not open an install prompt',
  steps: [
    ['Android (Chrome)', 'Open this page in the Chrome app, tap the menu ⋮, then tap Install app.'],
    ['iPhone (Safari)', 'Open this page in Safari, tap Share, then tap Add to Home Screen.'],
    ['Opened inside another app?', 'WhatsApp, Facebook and other in-app browsers cannot install apps. Open this page directly in Chrome (Android) or Safari (iPhone) instead.'],
  ],
  note: 'Installing is free and does not change anything on the website — it just gives you a home-screen icon for faster access to books, papers and notices.',
};

const UR = {
  title: 'ایپ انسٹال کریں',
  sub: 'دی برائٹن کالج کو اپنے فون میں شامل کریں — ایک ٹیپ، پھر یہ ہوم اسکرین سے ایپ کی طرح کھلے گا۔',
  stepsTitle: 'اگر بٹن سے انسٹال کا آپشن نہ کھلے',
  steps: [
    ['اینڈرائیڈ (کروم)', 'یہ صفحہ کروم ایپ میں کھولیں، مینو ⋮ پر ٹیپ کریں، پھر Install app پر ٹیپ کریں۔'],
    ['آئی فون (سفاری)', 'یہ صفحہ سفاری میں کھولیں، Share پر ٹیپ کریں، پھر Add to Home Screen پر ٹیپ کریں۔'],
    ['کسی اور ایپ کے اندر کھلا ہے؟', 'واٹس ایپ، فیس بک اور دیگر ایپس کے اندر والا براؤزر ایپ انسٹال نہیں کر سکتا۔ یہ صفحہ براہِ راست کروم (اینڈرائیڈ) یا سفاری (آئی فون) میں کھولیں۔'],
  ],
  note: 'انسٹال کرنا مفت ہے اور ویب سائٹ میں کچھ نہیں بدلتا — بس آپ کو ہوم اسکرین پر ایک آئیکن مل جاتا ہے تاکہ کتابیں، پیپرز اور نوٹس جلدی کھل سکیں۔',
};

export default function Install() {
  const { t, lang } = useLang();
  const c = lang === 'ur' ? UR : EN;
  return (
    <>
      <Seo page="install" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {c.title}</div>
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ marginBottom: 28 }}>
            <InstallApp />
          </div>
          <h2 style={{ fontSize: 22 }}>{c.stepsTitle}</h2>
          {c.steps.map(([h, p], i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{ margin: '0 0 4px', fontSize: 17 }}>{h}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8 }}>{p}</p>
            </div>
          ))}
          <div className="card" style={{ marginTop: 26 }}>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8 }}>{c.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
