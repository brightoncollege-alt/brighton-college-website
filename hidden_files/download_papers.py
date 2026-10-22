#!/usr/bin/env python3
"""Download past papers & MCQ banks from taleem360.com."""
import os, re, sys, time, json
import urllib.request

BASE = "https://www.taleem360.com"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUTDIR = os.path.expanduser("~/workspace/brighton-college/hidden_files/books/past-papers")
os.makedirs(OUTDIR, exist_ok=True)

CATEGORIES = [
    "11th-class-past-papers",
    "12th-class-past-papers",
]

SUBJECTS = [
    ("physics", "physics"), ("chemistry", "chemistry"), ("biology", "biology"),
    ("math", "math"), ("computer", "computer-science"), ("english", "english"),
    ("urdu", "urdu"), ("islamic", "islamic-studies"), ("islamiat", "islamic-studies"),
    ("pakistan", "pakistan-studies"), ("pak-study", "pakistan-studies"),
]

def fetch(url, referer=None, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    if referer: req.add_header("Referer", referer)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")

def get_book_links(cat_slug):
    html = fetch(f"{BASE}/categories/{cat_slug}")
    links = set()
    for m in re.finditer(r'href="(https://www\.taleem360\.com/[a-z0-9\-]+)"', html):
        u = m.group(1)
        path = u.replace(BASE, "")
        if "/categories/" in u or path in ("/books", "/contact", "/gcs"):
            continue
        if path.count("/") == 1 and len(path) > 5:
            links.add(u)
    return sorted(links)

def get_download_url(book_url):
    html = fetch(book_url)
    m = re.search(r'download/([a-z0-9\-]+)\?f=([a-z0-9]+)', html)
    return f"{BASE}/download/{m.group(1)}?f={m.group(2)}" if m else None

def subject_of(slug):
    for kw, subj in SUBJECTS:
        if kw in slug.lower(): return subj
    return None

def download_file(url, dest, referer):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": referer})
    with urllib.request.urlopen(req, timeout=300) as r:
        total = 0
        with open(dest, "wb") as f:
            while True:
                chunk = r.read(1024*256)
                if not chunk: break
                f.write(chunk); total += len(chunk)
    return total

def main():
    results = {"ok": [], "fail": [], "skip": []}
    for cat_slug in CATEGORIES:
        cls = "11th" if cat_slug.startswith("11th") else "12th"
        print(f"\n=== {cat_slug} ===", flush=True)
        try: books = get_book_links(cat_slug)
        except Exception as e:
            print(f"  category fetch FAILED: {e}", flush=True); continue
        print(f"  found {len(books)} pages", flush=True)
        seen = set()
        for book_url in books:
            slug = book_url.rsplit("/", 1)[-1]
            subj = subject_of(slug)
            if not subj or subj in seen: continue
            fname = f"{cls}-{subj}-past-papers.pdf"
            dest = os.path.join(OUTDIR, fname)
            if os.path.exists(dest) and os.path.getsize(dest) > 50000:
                print(f"  SKIP {fname}", flush=True); results["skip"].append(fname); seen.add(subj); continue
            try:
                dl = get_download_url(book_url)
                if not dl:
                    print(f"  NO-DL {slug}", flush=True); results["fail"].append((fname, "no-link")); continue
                print(f"  DL {fname} ...", flush=True)
                size = download_file(dl, dest, book_url)
                with open(dest, "rb") as f: head = f.read(5)
                if head != b"%PDF-":
                    os.remove(dest); print(f"  BAD {fname}", flush=True)
                    results["fail"].append((fname, "not-pdf")); continue
                print(f"  OK {fname} ({size/1048576:.1f} MB)", flush=True)
                results["ok"].append((fname, size)); seen.add(subj); time.sleep(1.5)
            except Exception as e:
                print(f"  FAIL {fname}: {e}", flush=True)
                results["fail"].append((fname, str(e)[:60]))
                if os.path.exists(dest):
                    try: os.remove(dest)
                    except: pass
                time.sleep(2)
        time.sleep(2)
    print(f"\nOK:{len(results['ok'])} FAIL:{len(results['fail'])} SKIP:{len(results['skip'])}")
    json.dump(results, open(os.path.join(OUTDIR, "_report.json"), "w"), indent=1)

if __name__ == "__main__":
    main()
