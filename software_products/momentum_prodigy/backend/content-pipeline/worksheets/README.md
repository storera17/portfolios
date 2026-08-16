# Coding Worksheets

This folder stores public-safe, original coding worksheets derived from the
course/source inventory. Each worksheet is made of small fill-in chunks:

- `prompt`: what the learner should write.
- `starterCode`: optional code already shown in the editor.
- `solution`: the expected chunk answer.
- `hints`: progressively helpful nudges.
- `sourceRefs`: local source folders/files that inspired the worksheet topic.

## Add a New Worksheet

1. Pick the best module file, for example `python-data.mjs` or
   `experiments-causal.mjs`.
2. Import `chunk` and `worksheet` from `./schema.mjs`.
3. Add a new `worksheet({ ... })` object to that module's exported array.
4. Split the task into as many `chunk({ ... })` objects as you want.
5. From `frontend/`, run:

```bash
npm run generate:worksheets
```

The generator writes:

```text
frontend/public/worksheets/worksheets.json
```

## Current Modules

- `powerbi-dax.mjs` — ISA 512 / Power BI / DAX.
- `python-data.mjs` — ISA 514 / Python / SQL / text mining.
- `r-modeling.mjs` — ISA 591 / R / modeling.
- `analytics-workflow.mjs` — ISA 616 / reproducibility and communication.
- `optimization.mjs` — ISA 634 / Gurobi and network-flow patterns.
- `deep-learning.mjs` — ISA 630 / gradients, CNNs, RNNs.
- `spark-genai.mjs` — ISA 632 / Spark, recommenders, RAG, GenAI.
- `experiments-causal.mjs` — ISA 633 / A/B tests, bandits, causal inference.
