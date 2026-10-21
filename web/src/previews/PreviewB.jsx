import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE, PROGRAMS, NEWS, GALLERY, STATS, PreviewBadge, IArrow, IBook, IPhone, IMail, IPin } from './shared.jsx';

/* B — "Modern Light": clean white/cream, friendly rounded cards,
   Inter, colorful accent chips. */
const ACCENTS = [
  { bg: '#e0f5f3', fg: '#0b7c78', icon: 'book' },
  { bg: '#fef3e2', fg: '#b45309', icon: 'book' },
  { bg: '#ffe9ee', fg: '#be123c', icon: 'book' },
];

export default function PreviewB() {
  return (
    <div className="pv pv-b">
      <PreviewBadge label="Design B — Modern Light" />

      {/* Friendly header */}
      <header className="pv-b-head">
        <Link to="/brighton/en" className="pv-b-brand">
          <img src="/logo-crest.png" alt="The Brighton College crest" />
          <span><strong>{COLLEGE.name}</strong><small>{COLLEGE.ofScience}</small></span>
        </Link>
        <nav className="pv-b-nav">
          <Link to="/brighton/en/programs">Programs</Link>
          <Link to="/brighton/en/news">News</Link>
          <Link to="/brighton/en/results">Results</Link>
          <Link to="/brighton/en/gallery">Gallery</Link>
        </nav>
        <Link to="/brighton/en/admissions" className="pv-b-cta">Visit the College <IArrow width={15} height={15} /></Link>
      </header>

      {/* Hero — bright collage */}
      <section className="pv-b-hero">
        <div className="pv-b-hero-text">
          <span className="pv-b-pill">Admissions open · 11th &amp; 12th</span>
          <h1>Brighten Your <span className="pv-b-hi">Future</span> in Brighton</h1>
          <p>{COLLEGE.motto} — intermediate classes for boys &amp; girls in Razzar, Swabi, with weekly tests and monthly results you can trust.</p>
          <div className="pv-b-hero-btns">
            <Link to="/brighton/en/admissions" className="pv-b-btn">Visit the College</Link>
            <Link to="/brighton/en/courses" className="pv-b-btn-soft">Free Courses</Link>
          </div>
          <div className="pv-b-chips">
            {STATS.map((s) => (
              <div key={s.l} className="pv-b-chip"><strong>{s.n}</strong><span>{s.l}</span></div>
            ))}
          </div>
        </div>
        <div className="pv-b-hero-pics">
          <img src="/gallery/facility-classroom.jpg" alt="Smart classroom" className="pv-b-pic-main" />
          <img src="/gallery/award-1.jpg" alt="Award ceremony" className="pv-b-pic-a" />
          <img src="/gallery/facility-sports.jpg" alt="Sports gala" className="pv-b-pic-b" />
          <div className="pv-b-float-card">
            <strong>3rd Position</strong>
            <span>Aroosa Gul · BISE Mardan</span>
          </div>
        </div>
      </section>

      {/* Programs — colorful cards */}
      <section className="pv-b-sec">
        <h2 className="pv-b-title">Choose your path</h2>
        <p className="pv-b-sub">Three focused intermediate programs, one caring campus.</p>
        <div className="pv-b-cards">
          {PROGRAMS.map((p, i) => (
            <article key={p.name} className="pv-b-card" style={{ '--ac': ACCENTS[i % 3].bg, '--acf': ACCENTS[i % 3].fg }}>
              <span className="pv-b-icon"><IBook width={22} height={22} /></span>
              <h3>{p.name}</h3>
              <p className="pv-b-subj">{p.subjects}</p>
              <p>{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* News — horizontal friendly cards */}
      <section className="pv-b-sec pv-b-sec-tint">
        <h2 className="pv-b-title">Good news, every week</h2>
        <div className="pv-b-news">
          {NEWS.map((n) => (
            <article key={n.title} className="pv-b-newscard">
              <span className="pv-b-tag">{n.tag}</span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery — rounded grid */}
      <section className="pv-b-sec">
        <h2 className="pv-b-title">Life at Brighton</h2>
        <div className="pv-b-grid">
          {GALLERY.map((g) => (
            <figure key={g.src}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pv-b-foot">
        <div className="pv-b-foot-grid">
          <div className="pv-b-foot-brand">
            <img src="/logo-crest.png" alt="The Brighton College crest" />
            <div><strong>{COLLEGE.name}</strong><p>{COLLEGE.tagline}</p></div>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/brighton/en/about">About</Link>
            <Link to="/brighton/en/programs">Programs</Link>
            <Link to="/brighton/en/news">News</Link>
            <Link to="/brighton/en/gallery">Gallery</Link>
          </div>
          <div>
            <h4>Study</h4>
            <Link to="/brighton/en/courses">Courses</Link>
            <Link to="/brighton/en/material">Study Material</Link>
            <Link to="/brighton/en/results">Test Results</Link>
            <Link to="/brighton/en/admissions">Visit the College</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p><IPhone width={14} height={14} /> {COLLEGE.phones.join(' · ')}</p>
            <p><IMail width={14} height={14} /> {COLLEGE.email}</p>
            <p><IPin width={14} height={14} /> {COLLEGE.address}</p>
          </div>
        </div>
        <p className="pv-b-copy">© 2026 {COLLEGE.name} {COLLEGE.ofScience} · Razzar, Swabi</p>
      </footer>
    </div>
  );
}
