# Tamil Heritage

Tamil Heritage is an image-rich, bilingual exploration of Tamil culture with a scroll-driven cinematic introduction.

## Run locally

From this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```text
app/
  components/       Interactive cinematic intro and static website UI
  context/          Global language and entry state
  data/             Culture entries, scene copy, and translations
  globals.css       Shared cinematic and editorial styling
  layout.tsx        Root metadata and document layout
  page.tsx          Home page composition
public/
  images/heritage/  Category-organized Tamil culture images
  videos/           Cinematic introduction video
```

## Useful commands

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Serve the production build
npm run lint   # Run ESLint
npm run test:e2e # Run browser checks against a local production server on port 3001
```

## Browser checks

Run `npm run build`, then `npm run start -- --port 3001` in one terminal and `npm run test:e2e` in another. The test uses Chrome and writes desktop and mobile captures to `tests/screenshots/`.

## Deploy to Vercel

The existing Vercel project is named `tamil-heritage` and has the verified domain `tamil-heritage.vercel.app`. It is connected to `vigneshwar0246/tamil-mandram-` on `main`. Deploy after `npm run build` passes. No custom environment variables are required. The canonical URL, Open Graph URL, sitemap, and robots file use Vercel's `VERCEL_PROJECT_PRODUCTION_URL`; local builds use `tamil-heritage.vercel.app`.
