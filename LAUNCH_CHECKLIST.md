# 🚀 Pre-Launch Checklist

> Complete every item before pointing your domain to Vercel.

## 📄 Content (must do)

- [ ] **Replace placeholder CV** — drop real `Nafis_Fuad_Tanvir_CV.pdf` into `public/`
- [ ] **Confirm publication** — update `title` and `venue` in `content/profile.json` with actual Elsevier paper details
- [ ] **Confirm IEEE role** — update `role` from `"Student Member"` to your actual IEEE position title
- [ ] **Real email** — change `nafisfuadtanvir@example.com` in `profile.json` to your real address
- [ ] **Verify GitHub username casing** — confirm `NafisFuadTanvir` matches your GitHub account exactly

## 🔐 Environment Variables (Vercel dashboard)

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_BASE_URL` | `https://nafisfuadtanvir.com` | ✅ |
| `RESEND_API_KEY` | From resend.com | ✅ contact form |
| `CONTACT_TO_EMAIL` | Your real inbox | ✅ contact form |
| `GITHUB_TOKEN` | Fine-grained PAT — `public_repo` read | ✅ live repo data |

## ⚙️ Vercel Setup

1. Push this repo to GitHub as `NafisFuadTanvir/nafis-portfolio`
2. Go to [vercel.com/new](https://vercel.com/new) → Import project
3. Set all env vars above in the Vercel dashboard
4. Set Production Branch → `main`

## 🔍 SEO Validation

- Verify OG image: `https://nafisfuadtanvir.com/opengraph-image`
- Test with [opengraph.xyz](https://www.opengraph.xyz/)
- JSON-LD: [Google Rich Results Test](https://search.google.com/test/rich-results)
- Sitemap: `https://nafisfuadtanvir.com/sitemap.xml`
- Submit sitemap to [Google Search Console](https://search.google.com/search-console)

## ✅ Post-launch smoke tests

```bash
# Security headers
curl -I https://nafisfuadtanvir.com | grep -E "x-frame|x-content|referrer"

# Sitemap
curl https://nafisfuadtanvir.com/sitemap.xml | head -20
```

- [ ] Lighthouse → Performance ≥ 85, Accessibility ≥ 95
- [ ] Send a test contact form message → confirm email arrives
- [ ] Test on real mobile device (not emulator)
- [ ] Verify resume PDF loads and downloads
- [ ] Share to LinkedIn → check link preview image

## 📊 README badge

Add to your `README.md`:
```md
[![CI](https://github.com/NafisFuadTanvir/nafis-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/NafisFuadTanvir/nafis-portfolio/actions)
```
