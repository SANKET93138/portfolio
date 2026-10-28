# Sanket Parmar – Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or in VS Code use the Live Server extension (right-click `index.html` > Open with Live Server). Or run `python -m http.server 8000` and visit http://localhost:8000.

## Add your videos
Open `assets/script.js` and fill in the `WORK` list. Put a YouTube video ID in `youtube` (the part after `v=`), or a full URL in `link`.

## Deploy on GitHub Pages
1. Create a new repository (for example `portfolio`) and push these files to the `main` branch.
2. Go to Settings > Pages. Under Build and deployment, choose Deploy from a branch, pick `main` and `/ (root)`, then Save.
3. Your site goes live at `https://<your-username>.github.io/<repo-name>/` in a minute or two.

## Use your own domain
1. In Settings > Pages, enter your domain under Custom domain and Save (GitHub creates a `CNAME` file). Or rename `CNAME.example` to `CNAME` and put your domain in it.
2. At your domain registrar add DNS records:
   - For `www.yourdomain.com`: a CNAME record pointing to `<your-username>.github.io`
   - For `yourdomain.com`: four A records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Wait for DNS to update, then tick Enforce HTTPS in Settings > Pages.
