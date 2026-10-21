# THE BRIGHTON COLLEGE — Deploy Guide (Vercel)

Do this under the **NEW Google/GitHub account** (not personal accounts).

## 1. Push to GitHub (assistant does this once you give the repo)

```bash
cd ~/workspace/brighton-college
# repo: <new-github-username>/brighton-college-website
python3 ~/workspace/custom-connectors/custom.legacy-github/bin/gh.py upload \
  <owner> brighton-college-website web <files...>
```

(The Contents API is used because the git-database API is unreliable here.)

## 2. Import into Vercel

1. Go to **vercel.com** → sign up/log in with the **new GitHub account**.
2. **Add New → Project → Import** `brighton-college-website`.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` · Output directory: `dist` (defaults are fine).
5. No environment variables needed (config lives in `web/src/config.js`).
6. **Deploy.**

`vercel.json` already rewrites all routes to `index.html`, so
`/secure-admin/`, `/courses/:id`, `/news/:id` all work on refresh.

## 3. Custom domain (optional, later)

Vercel → Project → Settings → Domains → add e.g. `brightoncollege.edu.pk`
(or a `.pk`/`.com` domain you buy). Follow Vercel's DNS instructions.

## 4. Search Console (your tap, after deploy)

1. Google Search Console (new account) → **Add property** → the Vercel URL
   (or custom domain).
2. Verify ownership (DNS or HTML file method).
3. Submit sitemap: the site serves a static sitemap at `/sitemap.xml`
   (add one before submitting, or submit key page URLs manually —
   max ~10 indexing requests/day per property).

## 5. Redeploy = push to GitHub

Every push to `main` auto-redeploys on Vercel. If a deploy ever looks stale,
check it built the latest commit; if stuck, reconnect Git and redeploy HEAD.
