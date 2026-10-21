import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE, PROGRAMS, NEWS, GALLERY, STATS, PreviewBadge, IArrow } from './shared.jsx';

/* A — "Editorial Classic": deep navy + gold, Fraunces serif,
   newspaper masthead, generous whitespace. */
export default function PreviewA() {
  return (
    <div className="pv pv-a">
      <PreviewBadge label="Design A — Editorial Classic" />

      {/* Masthead */}
      <header className="pv-a-mast">
        <div className="pv-a-mast-top">
          <span>Est. {COLLEGE.founded}</span>
          <span>Razzar · Swabi · Khyber Pakhtunkhwa</span>
        </div>
        <div className="pv-a-brand">
          <img src="/logo-crest.png" alt="The Brighton College crest" />
          <div>
            <h1>{COLLEGE.name}</h1>
            <p className="pv-a-of">{COLLEGE.ofScience}</p>
          </div>
        </div>
        <nav className="pv-a-nav">
          <Link to="/brighton/en">Home</Link>
          <Link to="/brighton/en/programs">Programs</Link>
          <Link to="/brighton/en/news">News</Link>
          <Link to="/brighton/en/results">Results</Link>
          <Link to="/brighton/en/gallery">Gallery</Link>
          <Link to="/brighton/en/contact">Contact</Link>
        </nav>
      </header>

      {/* Hero — editorial lead story */}
      <section className="pv-a-hero">
        <p className="pv-a-eyebrow">The College Newspaper · Vol. IV</p>
        <h2 className="pv-a-headline">
          Brighten Your <em>Future</em> in Brighton
        </h2>
        <p className="pv-a-dek">
          Intermediate education for 11th &amp; 12th — boys and girls sections —
          tested every week, proven every month, under the light of knowledge.
        </p>
        <div className="pv-a-hero-cta">
          <Link to="/brighton/en/admissions" className="pv-a-btn">Visit the College <IArrow width={16} height={16} /></Link>
          <Link to="/brighton/en/programs" className="pv-a-btn-ghost">Explore Programs</Link>
        </div>
      </section>

      {/* Stats — ruled ledger row */}
      <section className="pv-a-stats">
        {STATS.map((s) => (
          <div key={s.l} className="pv-a-stat">
            <span className="pv-a-stat-n">{s.n}</span>
            <span className="pv-a-stat-l">{s.l}</span>
          </div>
        ))}
      </section>

      {/* Main editorial split: programs + the week at Brighton */}
      <section className="pv-a-main">
        <div className="pv-a-col-main">
          <h3 className="pv-a-sec-title">Programs of Study</h3>
          {PROGRAMS.map((p, i) => (
            <article key={p.name} className="pv-a-program">
              <span className="pv-a-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4>{p.name}</h4>
                <p className="pv-a-subj">{p.subjects}</p>
                <p>{p.note}</p>
              </div>
            </article>
          ))}
          <div className="pv-a-quote">
            <p>“{COLLEGE.motto}.”</p>
            <cite>— {COLLEGE.principal}, {COLLEGE.principalTitle}</cite>
          </div>
        </div>
        <aside className="pv-a-col-side">
          <h3 className="pv-a-sec-title">The Week at Brighton</h3>
          {NEWS.map((n) => (
            <article key={n.title} className="pv-a-news">
              <span className="pv-a-tag">{n.tag}</span>
              <h4>{n.title}</h4>
              <p>{n.text}</p>
            </article>
          ))}
        </aside>
      </section>

      {/* Gallery plates */}
      <section className="pv-a-gallery">
        <h3 className="pv-a-sec-title">From the Campus</h3>
        <div className="pv-a-plates">
          {GALLERY.map((g) => (
            <figure key={g.src}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Colophon footer */}
      <footer className="pv-a-foot">
        <div className="pv-a-foot-grid">
          <div>
            <h4>{COLLEGE.name} {COLLEGE.ofScience}</h4>
            <p>{COLLEGE.tagline}.</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>{COLLEGE.address}</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{COLLEGE.phones.join(' · ')}<br />{COLLEGE.email}</p>
          </div>
        </div>
        <p className="pv-a-colophon">Set in Fraunces &amp; Inter · Printed at Shewa Adda, Kalukhan</p>
      </footer>
    </div>
  );
}
