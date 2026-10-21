import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ApplyRail from './components/ApplyRail.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import Admissions from './pages/Admissions.jsx';
import News from './pages/News.jsx';
import NewsPost from './pages/NewsPost.jsx';
import Results from './pages/Results.jsx';
import Material from './pages/Material.jsx';
import Courses from './pages/Courses.jsx';
import CourseView from './pages/CourseView.jsx';
import Gallery from './pages/Gallery.jsx';
import StoryPage from './pages/StoryPage.jsx';
import Faculty from './pages/Faculty.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import { LangProvider, LANGS, storedLang, useLang } from './i18n/LangContext.jsx';
import { CollegeProvider, CollegeNotFoundPage, useCollege } from './college/CollegeContext.jsx';
import { DEFAULT_COLLEGE_SLUG, getLocalCollege } from './data/colleges.js';
import { ADMIN_PANEL_PATH, WHATSAPP_NUMBER } from './config.js';

const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

/* Mobile sticky Apply bar (R10) — inside LangProvider so labels translate. */
function MobileApplyBar() {
  const { t, lp } = useLang();
  const { college } = useCollege();
  const wa = (college && college.whatsapp) || WHATSAPP_NUMBER;
  return (
    <div className="mobile-apply-bar" role="navigation" aria-label={t.applyNow}>
      <a className="btn btn-gold" href={lp('/admissions')}>{t.applyNow}</a>
      <a className="btn btn-outline-light" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a>
    </div>
  );
}

function WaFloat() {
  const { college } = useCollege();
  const wa = (college && college.whatsapp) || WHATSAPP_NUMBER;
  if (!wa) return null;
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${wa}?text=${encodeURIComponent('Assalam-o-Alaikum! I want information about admission at The Brighton College.')}`}
      target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
    >💬</a>
  );
}

function SiteChrome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsPost />} />
          <Route path="/results" element={<Results />} />
          <Route path="/material" element={<Material />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:storySlug" element={<StoryPage />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to=".." replace />} />
        </Routes>
      </main>
      <Footer />
      <ApplyRail />
      <BackToTop />
      <MobileApplyBar />
      <WaFloat />
    </>
  );
}

/* Gates the site on the resolved college: unknown slugs get the friendly
   "not found" page instead of a crash. */
function SiteInner({ collegeSlug, lang }) {
  const { status, slug } = useCollege();
  if (status === 'loading') {
    return <div className="loading" style={{ padding: 90, textAlign: 'center' }}>Loading…</div>;
  }
  if (status === 'not-found') {
    return <CollegeNotFoundPage slug={collegeSlug} lang={lang} />;
  }
  return (
    <LangProvider lang={lang} collegeSlug={slug}>
      <SiteChrome />
    </LangProvider>
  );
}

function Site({ collegeSlug, lang }) {
  return (
    <CollegeProvider slug={collegeSlug}>
      <SiteInner collegeSlug={collegeSlug} lang={lang} />
    </CollegeProvider>
  );
}

/* Two-segment URLs: /:collegeSlug/:lang/*  (legacy /:lang/* folds into Brighton). */
function CollegeRoute() {
  const { seg1, seg2, '*': splat } = useParams();
  const rest = splat ? '/' + splat : '';
  if (LANGS.includes(seg1)) {
    // Legacy /en/about → /brighton/en/about (seg2 is part of the path)
    return <Navigate to={`/${DEFAULT_COLLEGE_SLUG}/${seg1}/${seg2}${rest}`} replace />;
  }
  if (!LANGS.includes(seg2)) {
    // /brighton/about → /brighton/en/about
    return <Navigate to={`/${seg1}/${storedLang()}${rest}`} replace />;
  }
  return <Site collegeSlug={seg1} lang={seg2} />;
}

/* Known public page slugs — flat legacy URLs (/about) redirect to their
   canonical /:college/:lang/:slug form instead of 404ing. */
const PAGE_SLUGS = ['about', 'programs', 'admissions', 'news', 'results',
  'material', 'courses', 'gallery', 'faculty', 'contact', 'privacy', 'terms'];

/* Single-segment URLs: /en, /brighton, /about (legacy), or an unknown slug. */
function SingleSegRoute() {
  const { seg1, '*': splat } = useParams();
  const rest = splat ? '/' + splat : '';
  if (LANGS.includes(seg1)) {
    // /en → /brighton/en
    return <Navigate to={`/${DEFAULT_COLLEGE_SLUG}/${seg1}${rest}`} replace />;
  }
  if (getLocalCollege(seg1)) {
    // /brighton → /brighton/en
    return <Navigate to={`/${seg1}/${storedLang()}${rest}`} replace />;
  }
  if (PAGE_SLUGS.includes(seg1)) {
    // /about → /brighton/en/about (legacy flat URL → canonical)
    return <Navigate to={`/${DEFAULT_COLLEGE_SLUG}/${storedLang()}/${seg1}${rest}`} replace />;
  }
  // Unknown slug → friendly page (it also checks Supabase when live).
  return <CollegeNotFoundPage slug={seg1} lang={storedLang()} />;
}

export default function App() {
  const adminPath = ADMIN_PANEL_PATH.replace(/\/$/, '');
  return (
    <Routes>
      <Route
        path={`${adminPath}/*`}
        element={
          <Suspense fallback={<div className="loading">Loading admin…</div>}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="/:seg1/:seg2/*" element={<CollegeRoute />} />
      <Route path="/:seg1/*" element={<SingleSegRoute />} />
      <Route path="/" element={<Navigate to={`/${storedLang()}`} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
