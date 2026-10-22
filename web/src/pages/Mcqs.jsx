/* MCQs — chapter-wise MCQ banks. Coming soon (MCQs currently ship
   inside the past-paper compilations). Route: /mcqs */
import React from 'react';
import { LLink, useLang } from '../i18n/LangContext.jsx';
import Seo from '../seo/Seo.jsx';
import { HubLinks } from '../components/BookLibrary.jsx';
import { ICheck } from '../components/icons.jsx';

export default function Mcqs() {
  const { t } = useLang();
  const P = t.pages.mcqs;
  return (
    <>
      <Seo page="mcqs" />
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
            <div className="big" aria-hidden><ICheck size={52} /></div>
            <h2>{P.soonTitle}</h2>
            <p>{P.soonText}</p>
            <p style={{ marginTop: 14 }}>
              <LLink className="btn btn-gold" to="/past-papers">{t.library.hub.pastPapers} →</LLink>
            </p>
          </div>
          <HubLinks current="mcqs" />
        </div>
      </section>
    </>
  );
}
