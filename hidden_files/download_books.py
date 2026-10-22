#!/usr/bin/env python3
"""Download 11th/12th class textbooks from taleem360.com for all Pakistani boards."""
import os, re, sys, time, json
import urllib.request, urllib.error

BASE = "https://www.taleem360.com"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUTDIR = os.path.expanduser("~/workspace/brighton-college/hidden_files/books")
os.makedirs(OUTDIR, exist_ok=True)

# category -> (board_key, class_num)
CATEGORIES = {
    "11th-text-books-kpk": ("kpk", "11th"),
    "12th-text-books-kpk": ("kpk", "12th"),
    "11th-text-books-punjab": ("punjab", "11th"),
    "12th-text-books-punjab": ("punjab", "12th"),
    "11th-text-books-federal": ("federal", "11th"),
    "12th-text-books-federal": ("federal", "12th"),
    "11th-textbooks-sindh": ("sindh", "11th"),
    "12th-textbooks-sindh": ("sindh", "12th"),
    "11th-books-balochistan": ("balochistan", "11th"),
    "12th-books-balochistan": ("balochistan", "12th"),
}

# slug keyword -> subject key for filename
SUBJECTS = [
    ("physics", "physics"),
    ("chemistry", "chemistry"),
    ("biology", "biology"),
    ("mathematic", "math"),        # catches mathematics/mathematicss
    ("computer", "computer-science"),
    ("english", "english"),
    ("urdu", "urdu"),
    ("islamiat", "islamic-studies"),
    ("islamic", "islamic-studies"),
    ("pak-study", "pakistan-studies"),
    ("pakistan", "pakistan-studies"),
    ("tarjuma", "quran-translation"),
    ("statistics", "statistics"),
]

def fetch(url, referer=None, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    if referer:
        req.add_header("Referer", referer)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")

def get_book_links(cat_slug):
    html = fetch(f"{BASE}/categories/{cat_slug}")
    links = set()
    for m in re.finditer(r'href="(https://www\.taleem360\.com/[a-z0-9\-]+)"', html):
        u = m.group(1)
        if "/categories/" in u or "/books" == u.replace(BASE, ""):
            continue
        # book detail pages have slug-like paths without further slashes
        path = u.replace(BASE, "")
        if path.count("/") == 1 and len(path) > 5:
            links.add(u)
    return sorted(links)

def get_download_url(book_url):
    html = fetch(book_url)
    m = re.search(r'download/([a-z0-9\-]+)\?f=([a-z0-9]+)', html)
    if m:
        return f"{BASE}/download/{m.group(1)}?f={m.group(2)}"
    return None

def subject_of(slug):
    slug_l = slug.lower()
    for kw, subj in SUBJECTS:
        if kw in slug_l:
            return subj
    return None

def download_file(url, dest, referer):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": referer})
    with urllib.request.urlopen(req, timeout=300) as r:
        total = 0
        with open(dest, "wb") as f:
            while True:
                chunk = r.read(1024 * 256)
                if not chunk:
                    break
                f.write(chunk)
                total += len(chunk)
    return total

def main():
    only = sys.argv[1:]  # optional category slugs to limit run
    results = {"ok": [], "fail": [], "skip": []}
    for cat_slug, (board, cls) in CATEGORIES.items():
        if only and cat_slug not in only:
            continue
        print(f"\n=== {cat_slug} ({board} {cls}) ===", flush=True)
        try:
            books = get_book_links(cat_slug)
        except Exception as e:
            print(f"  category fetch FAILED: {e}", flush=True)
            results["fail"].append((cat_slug, "category-fetch"))
            continue
        print(f"  found {len(books)} book pages", flush=True)
        seen_subjects = set()
        for book_url in books:
            slug = book_url.rsplit("/", 1)[-1]
            subj = subject_of(slug)
            if not subj:
                continue
            if subj in seen_subjects:
                continue  # one book per subject per board/class
            fname = f"{cls}-{subj}-{board}.pdf"
            dest = os.path.join(OUTDIR, fname)
            if os.path.exists(dest) and os.path.getsize(dest) > 100000:
                print(f"  SKIP {fname} (exists)", flush=True)
                results["skip"].append(fname)
                seen_subjects.add(subj)
                continue
            try:
                dl = get_download_url(book_url)
                if not dl:
                    print(f"  NO-DL-LINK {slug}", flush=True)
                    results["fail"].append((fname, "no-download-link"))
                    continue
                print(f"  DL {fname} ...", flush=True)
                size = download_file(dl, dest, book_url)
                # verify it's a PDF
                with open(dest, "rb") as f:
                    head = f.read(5)
                if head != b"%PDF-":
                    os.remove(dest)
                    print(f"  BAD-FILE {fname} (not PDF)", flush=True)
                    results["fail"].append((fname, "not-a-pdf"))
                    continue
                print(f"  OK {fname} ({size/1048576:.1f} MB)", flush=True)
                results["ok"].append((fname, size))
                seen_subjects.add(subj)
                time.sleep(1.5)
            except Exception as e:
                print(f"  FAIL {fname}: {e}", flush=True)
                results["fail"].append((fname, str(e)[:80]))
                if os.path.exists(dest):
                    try: os.remove(dest)
                    except: pass
                time.sleep(2)
        time.sleep(2)

    print("\n\n===== SUMMARY =====")
    print(f"OK: {len(results['ok'])}")
    for f, s in results["ok"]:
        print(f"  {f} ({s/1048576:.1f} MB)")
    print(f"SKIP: {len(results['skip'])}")
    print(f"FAIL: {len(results['fail'])}")
    for f, e in results["fail"]:
        print(f"  {f}: {e}")
    with open(os.path.join(OUTDIR, "_report.json"), "w") as f:
        json.dump({"ok": [(x, y) for x, y in results["ok"]], "fail": results["fail"], "skip": results["skip"]}, f, indent=1)

if __name__ == "__main__":
    main()
