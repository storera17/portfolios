# Contributing

MomentumProdigy is currently maintained as a focused learning-platform project.
Before accepting outside contributions, choose a public license and define the
review policy for educational content, generated worksheets, and source
provenance.

## Local Checks

Run these commands from `frontend/` before submitting changes:

```bash
npm test
npm run build
```

## Content Rules

- Do not commit raw private course files, extracted textbook text, credentials,
  local model weights, or generated build folders.
- Keep generated course and worksheet content public-safe.
- Add source references for new worksheets so future maintainers know which
  course/module inspired the exercise.
