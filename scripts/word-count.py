"""Body word count for each blog post (excludes front matter, imports and component blocks)."""
import glob
import os
import re

for f in sorted(glob.glob('src/content/blog/*.mdx')):
    s = open(f, encoding='utf-8').read()
    body = s[s.index('---', 3) + 3:]
    lines = [l for l in body.split('\n') if l.strip() and not l.startswith(('<', 'import', ' ', '{', '}', ']', '/>', '---'))]
    date = re.search(r'date: (\S+)', s).group(1)[:10]
    print(f"{len(' '.join(lines).split()):>5}  {date}  {os.path.basename(f)}")
