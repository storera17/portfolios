# Pipeline

The pipeline turns approved source material and authored knowledge into the
static course bundle consumed by the app.

For this public repository, the default generator is intentionally synthetic:

```bash
npm run generate:demo
```

That command writes `frontend/public/course/course.json` from demo-only
concepts and sources. It proves the end-to-end app experience without
publishing private course packets, extracted textbook text, or the full private
generated course.

## Folders

- `knowledge/` contains the authored course knowledge layer.
- `reference/` preserves legacy reference code used for comparison and
  provenance during the pipeline rewrite.
- `extracted/` is ignored and reserved for local extracted text from approved
  source files.

## Commands

- `npm run extract` extracts local source files into `backend/content-pipeline/extracted/`.
- `npm run generate:demo` builds the safe public demo course.
- `npm run generate:full` builds the full local course from authored knowledge.

Only run and publish the full generator when you have rights to redistribute the
resulting course data.
