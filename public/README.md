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
│   ├── projects/      Project imagery — card cover art + detail-page media.
│   │   ├── cinemind_banner.png        CineMind flagship card cover (wired)
│   │   ├── interview_pro_banner.png   InterviewPro card cover (wired)
│   │   ├── nerdbot_banner.png         NerdBot card cover (wired)
│   │   ├── wizard_battle_banner.png   Wizard Battle card cover (wired)
│   │   │   ── earlier-work covers (in card order), sourced from the old
│   │   │      Personal-Website-2.0 icons; wired via each EARLIER_WORK `cover` ──
│   │   ├── orm_strength_tracker_banner.png
│   │   ├── tyes_banner.png
│   │   ├── intelligent_tutoring_systems_banner.png  (low-res, 200×200 source)
│   │   ├── ape_unit_banner.png
│   │   ├── chaos_colleagues_banner.png
│   │   └── project_shatter_banner.png
│   │
│   └── experiences/   Experience imagery — card cover art + detail-page media.
│       ├── instagram_banner.png     Instagram flagship card cover
│       └── orangeworks_banner.png   OrangeWorks flagship card cover
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
- Card covers follow `<slug>_banner.png` and live in the folder matching the
  item's domain — project covers in `projects/`, experience covers in
  `experiences/` (e.g. CineMind is a project → `projects/cinemind_banner.png`) —
  wired via the `cover` field in `src/content/work.js`.
- An empty folder keeps a `.gitkeep` so it stays in version control; delete it
  once real images land. Both `projects/` and `experiences/` now hold real covers
  but still carry a leftover `.gitkeep` that can be removed.
