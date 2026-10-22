/* Past Papers — solved past papers & paper compilations for 11th & 12th.
   Route: /past-papers. Data: Supabase `books` table (title contains "paper"). */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import BookLibrary, { HubLinks } from '../components/BookLibrary.jsx';

export default function PastPapers() {
  const { t } = useLang();
  const P = t.pages.pastPapers;
  return (
    <>
      <Seo page="past-papers" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {P.crumbs}</div>
          <h1>{P.title}</h1>
          <p>{P.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BookLibrary kind="paper" />
          <HubLinks current="pastPapers" />
        </div>
      </section>
    </>
  );
}
