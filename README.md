# Sanket Parmar – Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run locally
Use the Live Server extension in VS Code (right-click `index.html` > Open with Live Server), or run `python -m http.server 8000` and open http://localhost:8000. Do not open the file directly: YouTube videos will not play from `file://`.

## Edit your videos
Open `assets/script.js` and edit the `REELS` list at the top. The comment above it explains every field.

## Deploy on GitHub Pages
1. Push these files to the `main` branch of a repository.
2. Settings > Pages > Deploy from a branch > `main` and `/ (root)` > Save.
3. For your own domain, enter it under Custom domain (or rename `CNAME.example` to `CNAME`) and add the DNS records: a CNAME for `www` pointing to `<your-username>.github.io`, and four A records for the root domain: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153.
