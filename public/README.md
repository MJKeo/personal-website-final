# `public/` — static assets

Everything in this folder is served from the site root (`/`) and referenced by
**root-absolute path**, not imported. In source files (`index.html`,
`manifest.json`, JSX) `%PUBLIC_URL%` resolves to this folder, so
`/images/app-wide/favicon.ico` maps to `public/images/app-wide/favicon.ico`.

## Where to find images

All imagery lives under [`images/`](images/), organized **by scope** — where the
image is used decides which folder it belongs in. When adding a new image, pick
the folder by asking "which part of the site uses this?"

```
public/
├── images/
│   ├── app-wide/      Used across the whole site / browser chrome (branding,
│   │                  icons). Not tied to a single page.
│   │   ├── favicon.ico          Browser tab + manifest icon
│   │   ├── icon.png             Hero avatar (`/images/app-wide/icon.png`) +
│   │   │                        512×512 PWA icon
│   │   ├── apple-touch-icon.png iOS home-screen icon (180×180)
│   │   └── me.png               Portrait / nav avatar candidate
│   │
│   ├── home-page/     Used only on the Home screen (`src/screens/Home/`).
│   │   └── banana.png           Homepage <ParticleField> "banana" particle
│   │
│   ├── projects/      Project imagery — one sub-folder per item, named by `slug`.
│   │                  Each holds `banner.png` (card cover) + an `additional-images/`
│   │                  folder for detail-page media (empty for now).
│   │   ├── cinemind/                      CineMind flagship (wired)
│   │   ├── interviewpro/                  InterviewPro (wired)
│   │   ├── nerdbot/                       NerdBot (wired)
│   │   ├── wizard-battle/                 Wizard Battle (wired)
│   │   │   ── earlier-work covers, sourced from the old Personal-Website-2.0
│   │   │      icons; wired via each EARLIER_WORK `cover` ──
│   │   ├── orm-strength-tracker/
│   │   ├── tyes/
│   │   ├── intelligent-tutoring-systems/  (banner from low-res, 200×200 source)
│   │   ├── ape-unit/
│   │   ├── chaos-colleagues/
│   │   └── project-shatter/
│   │
│   └── experiences/   Experience imagery — same per-`slug` sub-folder layout
│       │              (`banner.png` + `additional-images/`). One per EXPERIENCES
│       │              card; all banners 16:9.
│       ├── instagram/                   Instagram flagship
│       ├── orangeworks-innovation-lab/  OrangeWorks (Home Depot) flagship
│       ├── facebook/                    Facebook
│       ├── mealme/                      MealMe
│       └── dcu/                         Digital Federal Credit Union
│
├── index.html         HTML shell
├── manifest.json      PWA manifest
├── robots.txt         Crawler rules
└── resume_summer_2026.pdf
```

## Conventions

- **Organize by scope, not by file type.** `app-wide` = whole-site/chrome;
  `home-page` = the Home screen; `projects` / `experiences` = imagery for those
  content domains (cards + detail pages).
- **Reference with a leading `/`** from the folder root, e.g.
  `/images/home-page/banana.png`. In `index.html` / `manifest.json` prefer
  `%PUBLIC_URL%/...` so it works under a non-root deploy path.
- **If you move or rename an image, update every reference.** Common reference
  sites: `public/index.html`, `public/manifest.json`, `src/content/`
  (`site.js`, `work.js`), and the screen/component that renders it.
- Each item gets its own sub-folder named by its `slug`, under the folder
  matching its domain — projects in `projects/`, experiences in `experiences/`
  (e.g. CineMind is a project → `projects/cinemind/`). Inside it, the card cover
  is always `banner.png` (wired via the `cover` field in `src/content/work.js`),
  and `additional-images/` holds any detail-page media.
- An empty folder keeps a `.gitkeep` so it stays in version control; delete it
  once real images land. Every `additional-images/` carries a `.gitkeep` while
  empty.
