# Tamil Mandram

Tamil Mandram is an image-rich, bilingual Tamil heritage exploration website with a scroll-driven cinematic introduction.

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
```
