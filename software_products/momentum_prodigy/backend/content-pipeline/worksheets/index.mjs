import { POWERBI_DAX_WORKSHEETS } from './powerbi-dax.mjs';
import { PYTHON_DATA_WORKSHEETS } from './python-data.mjs';
import { R_MODELING_WORKSHEETS } from './r-modeling.mjs';
import { ANALYTICS_WORKFLOW_WORKSHEETS } from './analytics-workflow.mjs';
import { OPTIMIZATION_WORKSHEETS } from './optimization.mjs';
import { DEEP_LEARNING_WORKSHEETS } from './deep-learning.mjs';
import { SPARK_GENAI_WORKSHEETS } from './spark-genai.mjs';
import { EXPERIMENTS_CAUSAL_WORKSHEETS } from './experiments-causal.mjs';

/** All coding worksheets, grouped by source-inspired domain modules. */
export const WORKSHEETS = [
  ...POWERBI_DAX_WORKSHEETS,
  ...PYTHON_DATA_WORKSHEETS,
  ...R_MODELING_WORKSHEETS,
  ...ANALYTICS_WORKFLOW_WORKSHEETS,
  ...OPTIMIZATION_WORKSHEETS,
  ...DEEP_LEARNING_WORKSHEETS,
  ...SPARK_GENAI_WORKSHEETS,
  ...EXPERIMENTS_CAUSAL_WORKSHEETS,
];

/** Compact source map used by docs and future UI provenance labels. */
export const WORKSHEET_SOURCE_MAP = WORKSHEETS.map((w) => ({
  id: w.id,
  title: w.title,
  language: w.language,
  difficulty: w.difficulty,
  topics: w.topics,
  sourceRefs: w.sourceRefs,
}));
