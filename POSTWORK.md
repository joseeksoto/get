# Post-Generation Deployment Guide — Gridline Institute LLC

---

## 1. Replace Visual Placeholders with Real Assets

### Logo
- Replace the SVG hexagon logo (`GI` in a rose hexagon) with a real logo
- Update in: `public/index.html` (header + footer), `public/privacy.html`, `public/terms.html`, `public/thanks.html`, `public/404.html`
- Replace the inline SVG favicon data URI with a real 32x32 favicon
- Create an Open Graph image (1200x630px) and update all `og:image` meta tags

### Testimonial Photos
- Replace CSS initial-circles (`DM`, `LB`, `JR`) with real headshots or remove them

### Hero
- Hero is text-only (minimal) — optionally add a hero image or background pattern

---

## 2. Connect Real Services

### Form Backend
The quote request form (in `public/index.html` contact section) currently submits to `thanks.html`.
Connect a real backend:

| Option | How |
|---|---|
| Formspree | Change form `action` to `https://formspree.io/f/YOUR_ID`, keep `method="POST"` |
| Netlify Forms | Add `netlify` attribute to `<form>`, deploy on Netlify |
| Custom API | POST to your own server endpoint |

### Analytics
1. Create a Google Tag Manager container
2. In `public/js/main.js`, replace the `console.log('Analytics loaded')` in the cookie-accept handler with your real GTM snippet injection
3. Inside GTM: set up GA4 + Google Ads conversion tracking

### Domain & Hosting
1. Buy a domain matching the company name
2. Set up HTTPS
3. Run with real domain:
   ```
   SITE_URL=https://www.gridlineinstitute.com node server.js
   ```
4. Set up email forwarding for `info@gridlineinstitute.com` and `privacy@gridlineinstitute.com`
5. Replace generated phone (+1 503-276-8134) and address (811 SW Naito Pkwy) with real details

---

## 3. Replace Tailwind CDN with Production Build

1. `npm install tailwindcss @tailwindcss/cli`
2. Extract inline `tailwind.config` to `tailwind.config.js`
3. `npx @tailwindcss/cli -i input.css -o public/css/style.css --minify`
4. Remove `<script src="https://cdn.tailwindcss.com">` from all HTML files
5. Link compiled CSS (already linked via `css/style.css`)

---

## 4. Final Verification

| # | Check | Notes |
|---|---|---|
| 1 | Real logo replaces SVG hexagon | Header, footer, favicon, og:image |
| 2 | Form submits to a real backend | Test full quote request flow |
| 3 | GTM active with real container ID | Verify in GTM Preview mode |
| 4 | Cookie consent blocks analytics until accepted | Decline cookies → verify no GA requests |
| 5 | HTTPS active on domain | Check browser padlock |
| 6 | SITE_URL env var set to real domain | og:url auto-updates via server.js |
| 7 | Phone/email are real and monitored | Call the number, send test email |
| 8 | Mobile tested on real devices | iOS + Android, not just browser resize |
| 9 | PageSpeed 90+ on mobile | After Tailwind production build |
| 10 | All nav links work on all pages | Click every link on every page |
