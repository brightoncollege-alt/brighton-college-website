/* Terms of Use — real content for a college website, incl. student safety. EN / UR. */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import { useSite } from '../college/CollegeContext.jsx';
import Seo from '../seo/Seo.jsx';

const EN = [
  ['Using this website', 'This website provides information about The Brighton College — programs, admissions, results, news and study material. By using it you agree to use the information fairly and not misuse any form, upload or contact feature.'],
  ['Admissions information', 'Program details, fee structures and dates published here are for guidance. The college office confirms all final details at the time of admission. If anything on the website differs from the office record, the office record is final.'],
  ['Results and material', 'Test results published here are for student convenience; official board results are issued by the Board of Intermediate and Secondary Education, Mardan. Study material is provided free for learning.'],
  ['Student safety', 'The campus is monitored by CCTV for the safety of all students. The college maintains separate boys and girls sections. Any safety concern can be reported to the college office directly or on WhatsApp — every report is taken seriously and kept confidential.'],
  ['Changes', 'The college may update these terms or website content at any time. Continued use of the website means you accept the current version.'],
];

const UR = [
  ['ویب سائٹ کا استعمال', 'یہ ویب سائٹ دی برائٹن کالج کے بارے میں معلومات فراہم کرتی ہے — پروگرامز، داخلے، نتائج، خبریں اور مطالعاتی مواد۔ اسے استعمال کر کے آپ اتفاق کرتے ہیں کہ معلومات کا منصفانہ استعمال کریں گے اور کسی فارم یا رابطے کی سہولت کا غلط استعمال نہیں کریں گے۔'],
  ['داخلوں کی معلومات', 'یہاں شائع شدہ پروگرامز کی تفصیل، فیس اور تاریخیں رہنمائی کے لیے ہیں۔ داخلے کے وقت کالج کا دفتر تمام حتمی تفصیلات کی تصدیق کرتا ہے۔ اگر ویب سائٹ اور دفتر کے ریکارڈ میں فرق ہو تو دفتر کا ریکارڈ حتمی ہوگا۔'],
  ['نتائج اور مواد', 'یہاں شائع شدہ ٹیسٹ کے نتائج طلبہ کی سہولت کے لیے ہیں؛ سرکاری بورڈ کے نتائج بورڈ آف انٹرمیڈیٹ اینڈ سیکنڈری ایجوکیشن، مردان جاری کرتا ہے۔ مطالعاتی مواد سیکھنے کے لیے مفت فراہم کیا جاتا ہے۔'],
  ['طلبہ کی حفاظت', 'تمام طلبہ کی حفاظت کے لیے کیمپس میں سی سی ٹی وی نگرانی ہے۔ کالج میں لڑکوں اور لڑکیوں کے الگ سیکشن ہیں۔ حفاظت سے متعلق کوئی بھی تشویش براہِ راست کالج کے دفتر یا واٹس ایپ پر بتائی جا سکتی ہے — ہر رپورٹ کو سنجیدگی سے لیا جاتا ہے اور خفیہ رکھا جاتا ہے۔'],
  ['تبدیلیاں', 'کالج کسی بھی وقت ان شرائط یا ویب سائٹ کے مواد میں تبدیلی کر سکتا ہے۔ ویب سائٹ کا مسلسل استعمال موجودہ شرائط کی قبولیت ہے۔'],
];

export default function Terms() {
  const { t, lang } = useLang();
  const site = useSite();
  const items = lang === 'ur' ? UR : EN;
  return (
    <>
      <Seo page="terms" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {t.footer.terms}</div>
          <h1>{t.footer.terms}</h1>
          <p>{lang === 'ur' ? 'ویب سائٹ کے استعمال کی شرائط۔' : 'The rules for using this website.'}</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {items.map(([h, p], i) => (
            <div key={i} id={i === 3 ? 'safety' : undefined} style={{ marginBottom: 26 }}>
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
