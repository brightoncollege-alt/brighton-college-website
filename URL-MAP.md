# URL MAP — The Brighton College Platform
Definitive inventory of every public URL. Base: `https://www.thebrightoncollege.org`
Generated 2026-10-21. Rule: every page has ONE canonical URL; all variants redirect.

## Canonical URLs (42) — the only URLs in sitemap.xml
| Page | EN (canonical) | UR (canonical) |
|---|---|---|
| Home | /brighton/en | /brighton/ur |
| About | /brighton/en/about | /brighton/ur/about |
| Programs | /brighton/en/programs | /brighton/ur/programs |
| Admissions | /brighton/en/admissions | /brighton/ur/admissions |
| Faculty | /brighton/en/faculty | /brighton/ur/faculty |
| Video Courses | /brighton/en/courses | /brighton/ur/courses |
| News | /brighton/en/news | /brighton/ur/news |
| Results | /brighton/en/results | /brighton/ur/results |
| Study Material | /brighton/en/material | /brighton/ur/material |
| Gallery | /brighton/en/gallery | /brighton/ur/gallery |
| Contact | /brighton/en/contact | /brighton/ur/contact |
| Privacy Policy | /brighton/en/privacy | /brighton/ur/privacy |
| Terms of Use | /brighton/en/terms | /brighton/ur/terms |
| Story: Sports Gala | /brighton/en/gallery/sports-gala | /brighton/ur/gallery/sports-gala |
| Story: Award Ceremonies | /brighton/en/gallery/award-ceremonies | /brighton/ur/gallery/award-ceremonies |
| Story: Weekly Tests | /brighton/en/gallery/weekly-tests | /brighton/ur/gallery/weekly-tests |
| Story: Science Labs | /brighton/en/gallery/science-labs | /brighton/ur/gallery/science-labs |
| Story: Computer Lab | /brighton/en/gallery/computer-lab | /brighton/ur/gallery/computer-lab |
| Story: Library | /brighton/en/gallery/library | /brighton/ur/gallery/library |
| Story: Smart Classrooms | /brighton/en/gallery/smart-classrooms | /brighton/ur/gallery/smart-classrooms |
| Story: Campus Events | /brighton/en/gallery/campus-events | /brighton/ur/gallery/campus-events |

Dynamic (not in sitemap — created by admin content):
- /brighton/en/news/:id and /brighton/ur/news/:id (news detail)
- /brighton/en/courses/:id and /brighton/ur/courses/:id (course detail)

## Redirect variants (all 301-style client redirects → canonical)
- Legacy language URLs: /en/* and /ur/* → /brighton/en/* and /brighton/ur/* (26 URLs)
- Flat legacy URLs: /about, /programs, /admissions, /news, /results, /material, /courses, /gallery, /faculty, /contact, /privacy, /terms → /brighton/{lang}/{page} (13 URLs, language from saved preference)
- Root: / → /brighton/en (or saved language)

## Special routes
- /secure-admin/ — admin panel (NOT in sitemap, Disallow in robots.txt)
- /:unknown-slug (e.g. /foo/) — friendly "College not found" page, no crash
- /brighton/en/:unknown-page — redirects safely to /brighton/en, no crash

## hreflang
Every canonical page carries: canonical self-link + hreflang en + hreflang ur + hreflang x-default (→ EN).
