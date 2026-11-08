# Saint Boctor Energy: Website

Landing page for **Saint Boctor Energy**, solar panel and home battery installation across Sydney, NSW (based in Moorebank).

Built with **Nuxt 3 (Vue 3)** and pre-rendered to static HTML so search engines receive the full content.

## Features

- Single-page layout: hero, services, work carousel, reviews, process, service areas, FAQ, quote form
- SEO: meta tags, canonical URL, `Electrician` and `FAQPage` JSON-LD, `sitemap.xml`, `robots.txt`
- Quote form delivered by email via [Web3Forms](https://web3forms.com) (no backend)
- Scroll animations, image carousel with lightbox, sticky mobile call bar
- Respects `prefers-reduced-motion`
- Self-hosted fonts (Outfit + Inter)

## Getting started

Requires Node 20+.

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
```

> `--legacy-peer-deps` is needed: a plain `npm install` fails with an npm arborist error on this project.

## Build for production

```bash
npm run generate   # static site in .output/public
npm run preview
```

Upload `.output/public` to any static host (Netlify, Vercel, Cloudflare Pages, etc.). Build command: `npm run generate`; output directory: `.output/public`.

## Configuration

Environment variables (all optional):

| Variable | Purpose | Default |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | Canonical/OG URL | `https://www.saintboctorenergy.com.au` |
| `NUXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the quote form | key set in `nuxt.config.ts` |

### Live reviews (Google + Facebook)

`server/api/reviews.get.ts` fetches reviews at build time (`npm run generate`) or request time (SSR). Without credentials the page shows the static reviews in `utils/business.ts`.

| Variable | Purpose |
|---|---|
| `NUXT_GOOGLE_PLACES_API_KEY` | Google Cloud key with Places API (New) enabled |
| `NUXT_GOOGLE_PLACE_ID` | Place ID of the Google Business Profile |
| `NUXT_FACEBOOK_PAGE_TOKEN` | Page access token (needs `pages_read_user_content`) |

Google returns at most 5 reviews. On a static host, reviews refresh on each rebuild, so set up a scheduled rebuild (e.g. a daily deploy hook).

Web3Forms access keys are designed to be public; they only route submissions to the owner's inbox.

## Editing content

- Business details, services, reviews, service areas and FAQs: [utils/business.ts](utils/business.ts)
- Section layout: [components/](components/)
- Styles: [assets/css/main.css](assets/css/main.css)
- Work carousel photos: drop images into `assets/images/gallery/` (sorted by filename; name them `NN-description.webp`) and add a caption in [components/GallerySection.vue](components/GallerySection.vue)
- Hero background: replace `assets/images/hero.webp` (2000px wide or more recommended)

## Before going live

- [ ] Replace placeholder licence number and contact email in `utils/business.ts`
- [ ] Set the real domain (`NUXT_PUBLIC_SITE_URL`, `public/robots.txt`, `public/sitemap.xml`)
- [ ] Replace the stock hero photo with a photo of your own work
- [ ] Add the website URL to the Google Business Profile
- [ ] Submit the sitemap in Google Search Console
- [ ] Send a test enquiry through the quote form

## Photo credit

Hero background: stock photo from [Unsplash](https://unsplash.com) by Raze Solar (free to use under the Unsplash licence).
