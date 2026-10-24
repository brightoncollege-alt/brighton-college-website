/* Book Reader — read textbooks & past papers right on the website.
   Route: /read/:id. Data: Supabase `books` table. PDF shown via Drive embed. */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import { sba, backendReady } from '../lib/supabase.js';

export default function BookReader() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!backendReady() || !id) { setLoading(false); return; }
    sba.get(`/rest/v1/books?select=*&id=eq.${id}&limit=1`)
      .then((r) => setBook(r && r[0] ? r[0] : null))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  const embedUrl = book ? `https://drive.google.com/file/d/${book.drive_file_id}/preview` : null;

  return (
    <>
      <Seo page="books" seoTitle={book ? `${book.title} — Read Online` : undefined} />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <LLink to="/">{t.common.backHome}</LLink> / <LLink to="/books">{lang === 'ur' ? 'کتب' : 'Books'}</LLink> / {lang === 'ur' ? 'مطالعہ' : 'Read'}
          </div>
          <h1>{book ? book.title : (lang === 'ur' ? 'کتاب' : 'Book Reader')}</h1>
          {book && (
            <p>{book.board} • {book.class_level} • {book.subject}</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading" style={{ textAlign: 'center', padding: 40 }}>
              {lang === 'ur' ? 'لوڈ ہو رہا ہے...' : 'Loading...'}
            </div>
          ) : !book ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p className="muted">{lang === 'ur' ? 'کتاب نہیں ملی۔' : 'Book not found.'}</p>
              <LLink to="/books" className="btn btn-gold">{lang === 'ur' ? 'واپس کتب پر' : 'Back to Books'}</LLink>
            </div>
          ) : (
            <div className="reader-wrap">
              <iframe
                src={embedUrl}
                title={book.title}
                style={{ width: '100%', height: 'calc(100dvh - 230px)', minHeight: 520, border: '1px solid var(--line)', borderRadius: 12 }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                <LLink to="/books" className="btn">{lang === 'ur' ? '← واپس' : '← Back'}</LLink>
                <a
                  href={`https://drive.google.com/uc?export=download&id=${book.drive_file_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  {lang === 'ur' ? '↓ ڈاؤن لوڈ کریں' : '↓ Download'}
                </a>
                <a
                  href={`https://drive.google.com/file/d/${book.drive_file_id}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {lang === 'ur' ? 'ڈرائیو میں کھولیں' : 'Open in Drive'}
                </a>
              </div>
              <p className="muted" style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
                {lang === 'ur'
                  ? 'مشورہ: اگر صفحات آہستہ لوڈ ہوں تو Download پر ٹیپ کریں اور کتاب اپنے موبائل کے PDF ریڈر میں پڑھیں — وہ زیادہ تیز چلے گا اور آف لائن بھی کام کرے گا۔'
                  : 'Tip: if pages load slowly, tap Download and read the book in your phone’s own PDF reader — it loads much faster and works offline.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
