#!/usr/bin/env python3
"""Scan Drive for all courses (recursive) and populate Supabase drive_course_index.
Each course gets its own thumbnail (first video's thumbnailLink).
"""
import json, sys, time, urllib.request, urllib.parse

API_KEY = "AIzaSyBNYgDGeVAaziLh1NpMu1s5nvx4wT4TrKk"
ROOT = "1RelBjy9voLLcGwv91Y-sK5bazdvx8tLv"
SUPA_URL = "https://vhmqofxciisnrxrzbovq.supabase.co"
SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobXFvZnhjaWlzbnJ4cnpib3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1OTg5NjksImV4cCI6MjEwODE3NDk2OX0.gLm7UZmhrQ3dWS4id-jrjni9OFnBc3QshqlObB1w-2I"

def drive_list(parent_id, mime_filter=None, page_size=100):
    q = f"'{parent_id}' in parents and trashed = false"
    if mime_filter:
        q += f" and {mime_filter}"
    url = f"https://www.googleapis.com/drive/v3/files?q={urllib.parse.quote(q)}&fields=files(id,name,mimeType,thumbnailLink,size)&pageSize={page_size}&key={API_KEY}"
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            return json.load(r).get("files", [])
    except Exception as e:
        print(f"  Drive error: {e}", file=sys.stderr)
        return []

def clean_name(raw):
    import re
    s = str(raw or "")
    s = re.sub(r"@[\w.]+", " ", s)
    s = re.sub(r"(?:https?://)?(?:www\.)?[\w-]+\.(?:com|app|me|net|org|pk|io)[\w/.-]*", " ", s, flags=re.I)
    s = re.sub(r"\b[\w.-]*(?:ahm7|ahmtech)[\w.-]*\b", " ", s, flags=re.I)
    s = re.sub(r"[-–—|]+", " ", s)
    s = s.replace("_", " ")
    s = re.sub(r"\bgoogle drive\b", " ", s, flags=re.I)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def is_bundle(files):
    folders = [f for f in files if f["mimeType"] == "application/vnd.google-apps.folder"
               and "for more premium" not in f["name"].lower()]
    videos = [f for f in files if f["mimeType"].startswith("video/")]
    return folders if (len(folders) >= 2 and len(videos) <= 2) else None

def first_thumb(folder_id):
    vids = drive_list(folder_id, "mimeType contains 'video/'", 1)
    if vids and vids[0].get("thumbnailLink"):
        return vids[0]["thumbnailLink"], 1
    # check first subfolder
    subs = drive_list(folder_id, "mimeType = 'application/vnd.google-apps.folder'", 1)
    if subs:
        vids = drive_list(subs[0]["id"], "mimeType contains 'video/'", 1)
        if vids and vids[0].get("thumbnailLink"):
            return vids[0]["thumbnailLink"], 1
    return None, 0

def supa_upsert(course):
    url = f"{SUPA_URL}/rest/v1/drive_course_index"
    data = json.dumps(course).encode()
    req = urllib.request.Request(url, data=data, headers={
        "apikey": SUPA_KEY, "Authorization": f"Bearer {SUPA_KEY}",
        "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status
    except Exception as e:
        print(f"  Supa error: {e}", file=sys.stderr)
        return 0

def scan(folder_id, parent_id, parent_title, depth, courses):
    files = drive_list(folder_id)
    bundle_subs = is_bundle(files)
    if bundle_subs:
        for sub in bundle_subs:
            scan(sub["id"], folder_id, clean_name(files[0]["name"] if files else ""), depth + 1, courses)
        return
    # It's a course (or leaf) — record it
    for f in files:
        if f["mimeType"] == "application/vnd.google-apps.folder" and "for more premium" not in f["name"].lower():
            # Recurse one more level to catch nested courses
            sub_files = drive_list(f["id"])
            sub_bundle = is_bundle(sub_files)
            if sub_bundle:
                for sub in sub_bundle:
                    scan(sub["id"], f["id"], clean_name(f["name"]), depth + 1, courses)
            else:
                thumb, vcount = first_thumb(f["id"])
                courses.append({
                    "drive_folder_id": f["id"],
                    "title": clean_name(f["name"]),
                    "parent_folder_id": folder_id,
                    "parent_title": parent_title,
                    "depth": depth,
                    "video_count": vcount,
                    "thumbnail_url": thumb,
                    "is_bundle": False,
                })
                print(f"  + {clean_name(f['name'])[:50]}")

def main():
    courses = []
    print("Scanning Drive for courses...")
    top = drive_list(ROOT, "mimeType = 'application/vnd.google-apps.folder'", 200)
    print(f"Top-level folders: {len(top)}")
    for f in top:
        if "for more premium" in f["name"].lower():
            continue
        files = drive_list(f["id"])
        bundle_subs = is_bundle(files)
        if bundle_subs:
            print(f"Bundle: {clean_name(f['name'])[:40]} ({len(bundle_subs)} sub-courses)")
            for sub in bundle_subs:
                scan(sub["id"], f["id"], clean_name(f["name"]), 1, courses)
        else:
            thumb, vcount = first_thumb(f["id"])
            courses.append({
                "drive_folder_id": f["id"],
                "title": clean_name(f["name"]),
                "parent_folder_id": ROOT,
                "parent_title": "data uploaaad",
                "depth": 0,
                "video_count": vcount,
                "thumbnail_url": thumb,
                "is_bundle": False,
            })
    print(f"\nTotal courses found: {len(courses)}")
    print("Upserting to Supabase...")
    ok = 0
    for c in courses:
        if supa_upsert(c):
            ok += 1
        time.sleep(0.1)
    print(f"Upserted: {ok}/{len(courses)}")

if __name__ == "__main__":
    main()
