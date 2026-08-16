import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 616 reproducible analytics, business value, and communication material. */
export const ANALYTICS_WORKFLOW_WORKSHEETS = [
  worksheet({
    id: 'isa616-reproducible-analysis-plan',
    title: 'Reproducible Analytics Project Skeleton',
    language: 'r',
    difficulty: 2,
    topics: ['reproducibility', 'analytics workflow', 'R project structure'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 616/Module 2 - Reproducible Data Science - Analytics Workflow/Module 2 - Week 6/Day 1/Reproducible Data Science-Part 1-1.pdf',
      'Classes /Fall 2025/ISA 616/Module 2 - Reproducible Data Science - Analytics Workflow/Module 2 - Week 6/Day 1/Roger Peng Article - Reproducible Research.pdf',
      'Classes /Fall 2025/ISA 616/Car Price Project Group 3B.Rmd',
    ],
    chunks: [
      chunk({
        id: 'repro-01',
        title: 'Load reproducible workflow packages',
        prompt: 'Load tidyverse and here so file paths are project-relative.',
        solution: 'library(tidyverse)\nlibrary(here)',
        hints: ['here() avoids hard-coded local paths.', 'tidyverse handles the data workflow.'],
      }),
      chunk({
        id: 'repro-02',
        title: 'Read data from a stable path',
        prompt: 'Read data/car_prices.csv using here() and store it as cars.',
        solution: 'cars <- read_csv(here("data", "car_prices.csv"))',
        hints: ['Use read_csv().', 'Pass folder and file parts separately to here().'],
      }),
      chunk({
        id: 'repro-03',
        title: 'Create a modeling-ready dataframe',
        prompt: 'Keep price, mileage, year, make, and condition, then remove rows with missing values.',
        solution: 'cars_model <- cars %>%\n  select(price, mileage, year, make, condition) %>%\n  drop_na()',
        hints: ['select() narrows the data.', 'drop_na() removes incomplete rows.'],
      }),
      chunk({
        id: 'repro-04',
        title: 'Write a compact audit summary',
        prompt: 'Create audit_summary with row count, average price, and average mileage.',
        solution: 'audit_summary <- cars_model %>%\n  summarize(rows = n(), avg_price = mean(price), avg_mileage = mean(mileage))',
        hints: ['summarize() creates one-row summaries.', 'n() counts rows.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa616-data-story-outline',
    title: 'Data Storytelling Prep Table',
    language: 'python',
    difficulty: 1,
    topics: ['data storytelling', 'audience', 'decision framing', 'communication'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 616/Module 3 - Communication/Module 3 - Week 10 2025/Day 1/Data Storytelling - Right Questions, Audience, Purpose and Storyline-1.pdf',
      'Classes /Fall 2025/ISA 616/Module 3 - Communication/Module 3 - Week 9 2025/Day 1/Project-Scoping-Worksheet-1.docx',
      'Classes /Fall 2025/ISA 616/Module 3 - Communication/Module 3 - Week 9 2025/Day 1/Ten Steps for Implementing Analytics.docx',
    ],
    chunks: [
      chunk({
        id: 'story-01',
        title: 'Create the storyline table',
        prompt: 'Create a pandas dataframe named story with columns section, audience_question, and evidence_needed.',
        solution: 'import pandas as pd\nstory = pd.DataFrame(columns=["section", "audience_question", "evidence_needed"])',
        hints: ['Use pd.DataFrame().', 'Start with empty columns so you can append rows later.'],
      }),
      chunk({
        id: 'story-02',
        title: 'Add the decision row',
        prompt: 'Add one row describing the decision the audience needs to make.',
        solution: 'story.loc[len(story)] = ["Decision", "What choice needs to be made?", "A clear recommendation and tradeoff summary"]',
        hints: ['loc[len(story)] appends a row.', 'Keep the wording decision-focused.'],
      }),
      chunk({
        id: 'story-03',
        title: 'Add the evidence row',
        prompt: 'Add one row for the evidence that supports the recommendation.',
        solution: 'story.loc[len(story)] = ["Evidence", "What data supports the recommendation?", "Metric trend, segment comparison, model output, or experiment result"]',
        hints: ['Evidence should connect directly to the decision.', 'Avoid listing every analysis if it does not change the choice.'],
      }),
      chunk({
        id: 'story-04',
        title: 'Add the risk row',
        prompt: 'Add one row explaining the main limitation or risk.',
        solution: 'story.loc[len(story)] = ["Risk", "What could make this conclusion wrong?", "Data quality issue, model assumption, sample bias, or operational constraint"]',
        hints: ['Good analytics communication names uncertainty.', 'The risk row builds trust.'],
      }),
    ],
  }),
];
