import React from 'react';
import { Link } from 'react-router-dom';
import { IPhone, IMail, IPin, IArrow, IBook, IChevron } from '../components/icons.jsx';

/* Real college data — only verified facts. */
export const COLLEGE = {
  name: 'THE BRIGHTON COLLEGE',
  ofScience: 'OF SCIENCE',
  tagline: 'Brighten Your Future in Brighton',
  motto: 'Realizing dreams through the light of knowledge',
  address: 'KKS Plaza, Main Mardan Swabi Road, Shewa Adda, Near Police Station, Kalu Khan (Razzar, Swabi)',
  phones: ['0317-9609048', '0314-9649602'],
  email: 'infothebrightoncollege@gmail.com',
  founded: '1 May 2023',
  principal: 'Mr. Fayoun Khan',
  principalTitle: 'Principal — PhD Research Scholar, Urdu',
  coordinator: 'Mr. Imranullah',
  coordinatorTitle: 'Academic Coordinator — M.Phil Physics',
};

export const PROGRAMS = [
  { name: 'Pre-Medical', subjects: 'Physics · Chemistry · Biology', note: 'For future doctors — 11th & 12th, BISE Mardan.' },
  { name: 'Pre-Engineering', subjects: 'Physics · Chemistry · Mathematics', note: 'For future engineers — 11th & 12th, BISE Mardan.' },
  { name: 'General Science', subjects: 'Physics · Computer Science · Mathematics', note: 'Science + computing — 11th & 12th, BISE Mardan.' },
];

export const NEWS = [
  { tag: 'Board Result', title: 'Aroosa Gul secures 3rd position in BISE Mardan Board', text: 'A shining moment for Brighton — our student stood third across the Mardan board.' },
  { tag: 'Sports Gala 2025', title: 'Qasim House lifts the Sports Gala trophy', text: 'Khalid, Qasim, Tipu and Iqbal houses battled it out — Qasim House took the crown.' },
  { tag: 'Academics', title: 'Weekly tests, CCTV-monitored', text: 'Every week, every subject — tested and proven, month after month.' },
];

export const GALLERY = [
  { src: '/gallery/award-1.jpg', cap: 'Award ceremony' },
  { src: '/gallery/event-1.jpg', cap: 'Campus event' },
  { src: '/gallery/exam-1.jpg', cap: 'Weekly test in progress' },
  { src: '/gallery/facility-classroom.jpg', cap: 'Smart classroom' },
  { src: '/gallery/facility-library.jpg', cap: 'Library' },
  { src: '/gallery/facility-sports.jpg', cap: 'Sports gala' },
];

export const STATS = [
  { n: '2023', l: 'Founded' },
  { n: '26+', l: 'Faculty members' },
  { n: '3', l: 'Study programs' },
  { n: '2', l: 'Boys & girls sections' },
];

/* Small floating label: which design + link back to the live site. */
export function PreviewBadge({ label, to }) {
  return (
    <div className="pv-badge">
      <span className="pv-badge-tag">{label}</span>
      <Link to={to || '/brighton/en'} className="pv-badge-back">
        ← Back to site
      </Link>
    </div>
  );
}

export function ContactLines({ dark }) {
  const c = dark ? '#fff' : 'inherit';
  return (
    <div className="pv-contact-lines" style={{ color: c }}>
      <span><IPhone width={15} height={15} /> {COLLEGE.phones.join(' · ')}</span>
      <span><IMail width={15} height={15} /> {COLLEGE.email}</span>
      <span><IPin width={15} height={15} /> {COLLEGE.address}</span>
    </div>
  );
}

export { IPhone, IMail, IPin, IArrow, IBook, IChevron };
