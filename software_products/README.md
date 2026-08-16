# Software Products

This section contains domain-specific software products that go beyond standalone notebooks or reports. These projects emphasize application architecture, runnable interfaces, backend services, testing, local data workflows, and packaging.

## Projects

| Project | Focus | Folder |
| --- | --- | --- |
| ChemPulse | Local-first chemical intelligence product with a Python backend, Reflex frontend, chemistry services, synthetic data generation, tests, and desktop packaging paths. | [`chempulse`](chempulse) |
| MomentumProdigy | Offline-first mastery-learning product with a React/TypeScript frontend, tested learning engine, content pipeline, searchable course bundle, local tutor behavior, and desktop/mobile packaging paths. | [`momentum_prodigy`](momentum_prodigy) |

## Suggested Review Path

1. Start with [`chempulse/README.md`](chempulse/README.md) for the product overview, setup instructions, architecture, and verification checklist.
2. Read [`momentum_prodigy/README.md`](momentum_prodigy/README.md) for the product architecture, run instructions, learning engine overview, and documentation map.
3. Review `chempulse/backend/` for APIs, chemistry logic, data repositories, services, search, reports, integrations, and tests.
4. Review `chempulse/frontend/` for the Reflex application structure, UI components, state, desktop launcher support, and frontend tests.
5. Review `momentum_prodigy/backend/` for the content pipeline, scheduler, mastery engine, search/tutor logic, and tests.
6. Review `momentum_prodigy/frontend/` for the Vite app, product screens, app context, routes, styles, and Tauri/Capacitor packaging configuration.
