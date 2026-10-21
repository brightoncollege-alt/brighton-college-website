# The Brighton College — website + platform

Intermediate college platform for **THE BRIGHTON COLLEGE**,
Shwe Adda, Kalukhan, Swabi (KPK, Pakistan).

- **Stack:** React 18 + Vite 5 + react-router-dom 7, plain-fetch Supabase client
  (no supabase-js), Google Drive API for the video/material library.
- **Pages:** Home, About, Programs, Courses (`/courses`, `/courses/:id`),
  News, Results, Material, Gallery, Contact, Admissions.
- **Admin:** `/secure-admin/` — app-level password
  (copy `web/src/admin-config.example.js` → `web/src/admin-config.js`).
- **Backend:** `supabase/schema.sql` — run in Supabase SQL Editor, then fill
  `web/src/config.js` and set `BACKEND_LIVE = true`.

```bash
cd web
npm install
npm run dev      # local preview
npm run build    # production build → dist/
```

See **HANDOVER.md** (owner's taps) and **DEPLOY.md** (Vercel steps).
