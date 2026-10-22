/* Notes — chapter-wise key notes & guides. Coming soon. Route: /notes */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import { HubLinks } from '../components/BookLibrary.jsx';
import { IBook } from '../components/icons.jsx';

export default function Notes() {
  const { t } = useLang();
  const P = t.pages.notes;
  return (
    <>
      <Seo page="notes" />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs"><LLink to="/">{t.common.backHome}</LLink> / {P.crumbs}</div>
          <h1>{P.title}</h1>
          <p>{P.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="soon-hero">
            <div className="big" aria-hidden><IBook size={52} /></div>
            <h2>{P.soonTitle}</h2>
            <p>{P.soonText}</p>
            <p style={{ marginTop: 14 }}>
              <LLink className="btn btn-gold" to="/books">{t.library.hub.books} →</LLink>
            </p>
          </div>
          <HubLinks current="notes" />
        </div>
      </section>
    </>
  );
}
