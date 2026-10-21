#!/bin/bash
# Watches the college's listing page (mirrors their Facebook posts) for new posts/photos
URL="https://www.schoolandcollegelistings.com/PK/Swabi/106857235753117/The-Brighton-College-Razzar-Swabi"
SEEN=~/workspace/brighton-college/hidden_files/fb-seen.txt
touch "$SEEN"
HTML=$(curl -sL --max-time 60 "$URL")
# Extract post date headers like "# 23/09/2026" with following headline text
echo "$HTML" | grep -oP '# \d{2}/\d{2}/\d{4}' | sort -u > /tmp/fb-dates.txt
NEW=0
while read -r d; do
  grep -qxF "$d" "$SEEN" || { echo "$d" >> "$SEEN"; echo "NEW POST: $d"; NEW=1; }
done < /tmp/fb-dates.txt
[ "$NEW" = "0" ] && echo "NO_NEW_POSTS"
