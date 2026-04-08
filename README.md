# Sleeper Frame Clone

Static multi-page clone scaffold inspired by `telhaclarke.com.au`, built to run without a build step and deploy cleanly to GitHub Pages.

## Included

- `index.html` for the homepage
- `works/` for the portfolio listing
- `studio/`, `process/`, `contact/`
- `project/` for a dynamic project detail page driven by the `slug` query param
- shared layout, design tokens, transitions, filters, grid/list switch, team preview, initiatives, and footer CTA

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In repository settings, enable GitHub Pages.
3. Use `Deploy from a branch`.
4. Select your default branch and `/ (root)`.

## Note

- Several visual reference assets are currently hotlinked from the live source site so the frame looks close to the original during review.
- Replace those remote assets with licensed local assets before using this commercially.
