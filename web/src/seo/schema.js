/* Builders for extra JSON-LD blocks (Person, programs, events).
   All values are real college facts — never invented. */
import { SITE } from '../config.js';
import { PROGRAMS } from '../data/college.js';

const ORG = { '@type': 'CollegeOrUniversity', name: 'THE BRIGHTON COLLEGE' };

export function personSchemas() {
  return [
    {
      '@type': 'Person',
      name: SITE.principalName,
      jobTitle: 'Principal',
      description: SITE.principalTitle,
      worksFor: ORG,
    },
    {
      '@type': 'Person',
      name: SITE.coordinatorName,
      jobTitle: 'Academic Coordinator',
      description: SITE.coordinatorTitle,
      worksFor: ORG,
    },
  ];
}

export function programSchemas() {
  return PROGRAMS.map((p) => ({
    '@type': 'EducationalOccupationalProgram',
    name: `${p.name} — Intermediate (11th & 12th)`,
    description: p.desc,
    provider: { ...ORG, url: 'https://www.thebrightoncollege.org/' },
    hasCourse: (p.subjects || []).map((s) => ({ '@type': 'Course', name: s })),
    educationalLevel: 'Intermediate',
    timeToComplete: 'P2Y',
  }));
}

export function eventSchema(n) {
  if (!n || !n.published_at) return null;
  return {
    '@type': 'Event',
    name: n.title,
    startDate: n.published_at,
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'The Brighton College',
      address: 'KKS Plaza, Main Mardan Swabi Road, Shewa Adda, Kalu Khan, Swabi, PK',
    },
    organizer: ORG,
    description: (n.body || '').slice(0, 200),
  };
}
