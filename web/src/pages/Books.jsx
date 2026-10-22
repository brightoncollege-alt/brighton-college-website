/* Books — official textbook PDFs for 11th & 12th, all boards.
   Route: /books. Data: Supabase `books` table (Drive-hosted PDFs). */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import BookLibrary, { HubLinks } from '../components/BookLibrary.jsx';

export default function Books() {
  const { t } = useLang();
  const P = t.pages.books;
  return (
    <>
      <Seo page="books" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {P.crumbs}</div>
          <h1>{P.title}</h1>
          <p>{P.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookLibrary kind="book" />
          <HubLinks current="books" />
        </div>
      </section>
    </>
  );
}
