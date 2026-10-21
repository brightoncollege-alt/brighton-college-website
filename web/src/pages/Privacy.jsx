/* Privacy Policy — real content for a college website. EN / UR. */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useSite } from '../college/CollegeContext.jsx';
import Seo from '../seo/Seo.jsx';

const EN = [
  ['Information we collect', 'When you fill the admission form or contact form on this website, we collect your name, phone number, previous academic record and message — only what is needed to process your admission enquiry.'],
  ['How we use it', 'Your information is used only by the college office to contact you about admissions, results and announcements. We never sell or share your personal information with third parties for marketing.'],
  ['WhatsApp contact', 'If you message us on WhatsApp, your chat is handled by the college office under WhatsApp\u2019s own privacy policy.'],
  ['Photos and media', 'Photos of college events published in the gallery may show students. Parents or students who want a photo removed can contact the college office any time and it will be taken down.'],
  ['Cookies', 'This website stores small preferences (like your language choice) in your own browser. We do not use advertising trackers.'],
  ['Your rights', 'You may ask us at any time what information we hold about you, and ask us to correct or delete it — contact us at the phone numbers or email below.'],
];

const UR = [
  ['ہم کون سی معلومات لیتے ہیں', 'جب آپ اس ویب سائٹ پر داخلہ فارم یا رابطہ فارم پُر کرتے ہیں، تو ہم آپ کا نام، فون نمبر، پچھلا تعلیمی ریکارڈ اور پیغام لیتے ہیں — صرف اتنا جتنا آپ کی داخلہ درخواست کے لیے ضروری ہو۔'],
  ['معلومات کا استعمال', 'آپ کی معلومات صرف کالج کا دفتر داخلے، نتائج اور اعلانات کے لیے رابطے میں استعمال کرتا ہے۔ ہم آپ کی ذاتی معلومات کبھی کسی تیسرے فریق کو مارکیٹنگ کے لیے نہیں بیچتے یا دیتے۔'],
  ['واٹس ایپ رابطہ', 'اگر آپ ہمیں واٹس ایپ پر پیغام بھیجتے ہیں، تو آپ کی چیٹ کالج کا دفتر سنبھالتا ہے اور اس پر واٹس ایپ کی اپنی پرائیویسی پالیسی لاگو ہوتی ہے۔'],
  ['تصاویر', 'گیلری میں شائع ہونے والی تقریبات کی تصاویر میں طلبہ نظر آ سکتے ہیں۔ والدین یا طلبہ کسی بھی وقت کالج کے دفتر سے رابطہ کر کے تصویر ہٹانے کی درخواست کر سکتے ہیں۔'],
  ['کوکیز', 'یہ ویب سائٹ آپ کے براؤزر میں چھوٹی ترجیحات (جیسے زبان کا انتخاب) محفوظ کرتی ہے۔ ہم اشتہاری ٹریکرز استعمال نہیں کرتے۔'],
  ['آپ کے حقوق', 'آپ کسی بھی وقت ہم سے پوچھ سکتے ہیں کہ ہم آپ کے بارے میں کون سی معلومات رکھتے ہیں، اور اسے درست یا حذف کرنے کی درخواست کر سکتے ہیں — نیچے دیے گئے فون نمبرز یا ای میل پر رابطہ کریں۔'],
];

export default function Privacy() {
  const { t, lang } = useLang();
  const site = useSite();
  const items = lang === 'ur' ? UR : EN;
  return (
    <>
      <Seo page="privacy" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {t.footer.privacy}</div>
          <h1>{t.footer.privacy}</h1>
          <p>{lang === 'ur' ? 'آپ کی معلومات کی حفاظت ہماری ذمہ داری ہے۔' : 'Protecting your information is our responsibility.'}</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {items.map(([h, p], i) => (
            <div key={i} style={{ marginBottom: 26 }}>
              <h2 style={{ fontSize: 22 }}>{h}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{p}</p>
            </div>
          ))}
          <div className="card" style={{ marginTop: 10 }}>
            <h3 style={{ marginTop: 0 }}>{lang === 'ur' ? 'رابطہ' : 'Contact'}</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              {site.name} — {site.address}<br />
              <bdi>{site.phone}</bdi> · {site.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
