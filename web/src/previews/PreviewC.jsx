import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE, PROGRAMS, NEWS, GALLERY, STATS, PreviewBadge, IArrow, IPhone, IMail, IPin } from './shared.jsx';

/* C — "Bold Vibrant": strong color blocks, big imagery,
   dynamic angles, youthful student energy. */
export default function PreviewC() {
  return (
    <div className="pv pv-c">
      <PreviewBadge label="Design C — Bold Vibrant" />

      {/* Bold top bar */}
      <header className="pv-c-top">
        <Link to="/brighton/en" className="pv-c-brand">
          <img src="/logo-crest.png" alt="The Brighton College crest" />
          <span>{COLLEGE.name}<small>{COLLEGE.ofScience}</small></span>
        </Link>
        <nav className="pv-c-nav">
          <Link to="/brighton/en/programs">Programs</Link>
          <Link to="/brighton/en/news">News</Link>
          <Link to="/brighton/en/results">Results</Link>
          <Link to="/brighton/en/gallery">Gallery</Link>
        </nav>
        <Link to="/brighton/en/admissions" className="pv-c-cta">Visit <IArrow width={15} height={15} /></Link>
      </header>

      {/* Ticker */}
      <div className="pv-c-ticker"><div className="pv-c-ticker-in">
        <span>Admissions Open 2026-27</span><span>Weekly Tests</span><span>3rd Position — BISE Mardan</span><span>Sports Gala Champions</span><span>Boys &amp; Girls Sections</span>
        <span>Admissions Open 2026-27</span><span>Weekly Tests</span><span>3rd Position — BISE Mardan</span><span>Sports Gala Champions</span><span>Boys &amp; Girls Sections</span>
      </div></div>

      {/* Hero — full-bleed energy */}
      <section className="pv-c-hero">
        <div className="pv-c-hero-in">
          <p className="pv-c-kicker">Razzar · Swabi · Est. 2023</p>
          <h1>YOUR FUTURE<br /><span>STARTS HERE.</span></h1>
          <p className="pv-c-lead">{COLLEGE.tagline} — intermediate science for 11th &amp; 12th. Tested every week. Proven every month.</p>
          <div className="pv-c-btns">
            <Link to="/brighton/en/admissions" className="pv-c-btn-y">Visit the College</Link>
            <Link to="/brighton/en/programs" className="pv-c-btn-o">See Programs</Link>
          </div>
        </div>
        <div className="pv-c-hero-pic">
          <img src="/gallery/event-1.jpg" alt="Campus event at Brighton College" />
          <div className="pv-c-stamp">3rd<br />BISE<br />Mardan</div>
        </div>
      </section>

      {/* Stats — bold blocks */}
      <section className="pv-c-stats">
        {STATS.map((s, i) => (
          <div key={s.l} className={'pv-c-stat pv-c-s' + (i % 3)}>
            <strong>{s.n}</strong><span>{s.l}</span>
          </div>
        ))}
      </section>

      {/* Programs — angled bold cards */}
      <section className="pv-c-sec">
        <h2 className="pv-c-h2">PICK YOUR <span>BATTLE</span></h2>
        <div className="pv-c-progs">
          {PROGRAMS.map((p, i) => (
            <article key={p.name} className={'pv-c-prog pv-c-p' + (i % 3)}>
              <span className="pv-c-pnum">0{i + 1}</span>
              <h3>{p.name}</h3>
              <p className="pv-c-psub">{p.subjects}</p>
              <p>{p.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* News — high contrast list */}
      <section className="pv-c-sec pv-c-dark">
        <h2 className="pv-c-h2 pv-c-h2w">BRIGHTON <span>WINS</span></h2>
        <div className="pv-c-wins">
          {NEWS.map((n) => (
            <article key={n.title}>
              <span className="pv-c-wtag">{n.tag}</span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery — big blocks */}
      <section className="pv-c-sec">
        <h2 className="pv-c-h2">CAMPUS <span>ENERGY</span></h2>
        <div className="pv-c-gal">
          {GALLERY.map((g, i) => (
            <figure key={g.src} className={i === 0 ? 'pv-c-wide' : ''}>
              <img src={g.src} alt={g.cap} loading="lazy" />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer — bold */}
      <footer className="pv-c-foot">
        <h2>COME SEE IT <span>YOURSELF.</span></h2>
        <Link to="/brighton/en/admissions" className="pv-c-btn-y">Visit the College</Link>
        <div className="pv-c-foot-grid">
          <div><h4>Find us</h4><p><IPin width={14} height={14} /> {COLLEGE.address}</p></div>
          <div><h4>Call</h4><p><IPhone width={14} height={14} /> {COLLEGE.phones.join(' · ')}</p></div>
          <div><h4>Write</h4><p><IMail width={14} height={14} /> {COLLEGE.email}</p></div>
        </div>
        <p className="pv-c-copy">© 2026 {COLLEGE.name} {COLLEGE.ofScience}</p>
      </footer>
    </div>
  );
}
