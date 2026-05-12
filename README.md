# Kisankart
Kisan kart is a full-stack organic food delivery platform that connects farmers with customers and delivers fresh, organic produce directly to their doorsteps.

## Login page (starter)

This repo contains a simple starter website (no frameworks) with:
- `login.html` (login UI + validation)
- `dashboard.html` (protected page + logout)
- `assets/auth.js` (small demo “auth” using storage)
- `assets/styles.css` (modern styling)

### Demo credentials

- Email: `farmer@kisankart.com`
- Password: `password123`

### How to run locally

Browsers can behave differently when opening `.html` directly, so use a local server.

**Option A: VS Code Live Server**
- Install the “Live Server” extension
- Right-click `login.html` → “Open with Live Server”

**Option B: Python (if installed)**

From this folder:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500/login.html`
