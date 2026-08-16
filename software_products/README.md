# Software Products

This section contains domain-specific software products that go beyond standalone notebooks or reports. These projects emphasize application architecture, runnable interfaces, backend services, testing, local data workflows, and packaging.

## Projects

| Project | Focus | Folder |
| --- | --- | --- |
| ChemPulse | Local-first chemical intelligence product with a Python backend, Reflex frontend, chemistry services, synthetic data generation, tests, and desktop packaging paths. | [`chempulse`](chempulse) |

## Suggested Review Path

1. Start with [`chempulse/README.md`](chempulse/README.md) for the product overview, setup instructions, architecture, and verification checklist.
2. Review `chempulse/backend/` for APIs, chemistry logic, data repositories, services, search, reports, integrations, and tests.
3. Review `chempulse/frontend/` for the Reflex application structure, UI components, state, desktop launcher support, and frontend tests.
4. Review `chempulse/requirement/` and the build scripts for dependency separation and deployment-oriented packaging.
