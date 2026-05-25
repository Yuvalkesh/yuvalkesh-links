# yuvalkesh — Linktree alternative

A single-page, Linktree-style link page for Yuval Keshtcher.

- **Handle:** @yuvalkesh
- **Link:** להצטרפות לקבוצה בינה מלאכותית עסקית של יובל קשטכר → WhatsApp group

## Preview locally

```bash
cd /Users/Yuval/Dev/apps/yuvalkesh-links
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Render (Static Site)

1. Push this folder to a GitHub repo.
2. Render → **New** → **Static Site** → connect the repo.
3. Settings:
   - **Build Command:** *(leave empty)*
   - **Publish Directory:** `.`
4. Deploy. `render.yaml` is included for Blueprint deploys (Render → New → Blueprint).
