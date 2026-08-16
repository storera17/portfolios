import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 633 experiments, A/B testing, bandits, factorial designs, switchbacks, and causal inference. */
export const EXPERIMENTS_CAUSAL_WORKSHEETS = [
  worksheet({
    id: 'isa633-ab-test-binary',
    title: 'A/B Test for Binary Conversion',
    language: 'python',
    difficulty: 2,
    topics: ['A/B testing', 'binary response', 'conversion rate', 'hypothesis testing'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 633/2. Module 2_ A-B Testing/Notes/2. ab-testing-binary-response.html',
      'Classes /Spring 2026/ISA 633/2. Module 2_ A-B Testing/Notes/4. Designing_valid_AB_tests.html',
      'Classes /Spring 2026/ISA 633/633-source/[3] AB binary.pdf',
    ],
    chunks: [
      chunk({
        id: 'ab-01',
        title: 'Create treatment summaries',
        prompt: 'Create a dataframe with visitors and conversions for variants A and B.',
        solution: 'import pandas as pd\nab = pd.DataFrame({\n    "variant": ["A", "B"],\n    "visitors": [1000, 980],\n    "conversions": [92, 115],\n})',
        hints: ['Each row is one experimental variant.', 'Keep counts aggregated for this worksheet.'],
      }),
      chunk({
        id: 'ab-02',
        title: 'Calculate conversion rates',
        prompt: 'Add a conversion_rate column.',
        solution: 'ab["conversion_rate"] = ab["conversions"] / ab["visitors"]',
        hints: ['Conversion rate is conversions divided by visitors.', 'Use vectorized pandas math.'],
      }),
      chunk({
        id: 'ab-03',
        title: 'Calculate lift',
        prompt: 'Calculate the relative lift of B compared with A.',
        solution: 'rate_a = ab.loc[ab["variant"] == "A", "conversion_rate"].iloc[0]\nrate_b = ab.loc[ab["variant"] == "B", "conversion_rate"].iloc[0]\nlift = (rate_b - rate_a) / rate_a',
        hints: ['Relative lift divides the difference by the baseline.', 'Variant A is the baseline.'],
      }),
      chunk({
        id: 'ab-04',
        title: 'Run a two-proportion z-test',
        prompt: 'Use statsmodels proportions_ztest to test whether conversion rates differ.',
        solution: 'from statsmodels.stats.proportion import proportions_ztest\n\ncount = ab["conversions"].to_numpy()\nnobs = ab["visitors"].to_numpy()\nz_stat, p_value = proportions_ztest(count, nobs)',
        hints: ['count holds successes.', 'nobs holds total observations.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa633-bandit-epsilon-greedy',
    title: 'Epsilon-Greedy Bandit Simulation',
    language: 'python',
    difficulty: 3,
    topics: ['multi-armed bandits', 'epsilon-greedy', 'exploration', 'exploitation'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 633/6. Module 5_ Multi-arm bandits/Notes/Introduction to Multi Arm Bandits.Rmd',
      'Classes /Spring 2026/ISA 633/633-source/[18] Bandits-binary.pdf',
      'Classes /Spring 2026/ISA 633/633-source/[19] Bandits--cont..pdf',
    ],
    chunks: [
      chunk({
        id: 'bandit-01',
        title: 'Initialize reward tracking',
        prompt: 'Create arrays for arm counts and estimated values for three arms.',
        solution: 'import numpy as np\n\nn_arms = 3\ncounts = np.zeros(n_arms)\nvalues = np.zeros(n_arms)\nepsilon = 0.1',
        hints: ['counts tracks how often each arm is pulled.', 'values stores estimated average reward.'],
      }),
      chunk({
        id: 'bandit-02',
        title: 'Choose an arm',
        prompt: 'Choose a random arm with probability epsilon, otherwise choose the arm with the highest estimated value.',
        solution: 'if np.random.random() < epsilon:\n    arm = np.random.randint(n_arms)\nelse:\n    arm = np.argmax(values)',
        hints: ['Random choice is exploration.', 'argmax is exploitation.'],
      }),
      chunk({
        id: 'bandit-03',
        title: 'Simulate a reward',
        prompt: 'Given true_rates, simulate a binary reward for the selected arm.',
        starterCode: 'true_rates = np.array([0.05, 0.08, 0.11])',
        solution: 'reward = 1 if np.random.random() < true_rates[arm] else 0',
        hints: ['A binary reward is 1 or 0.', 'Higher true rate means success is more likely.'],
      }),
      chunk({
        id: 'bandit-04',
        title: 'Update the selected arm estimate',
        prompt: 'Increment the selected arm count and update its running average reward.',
        solution: 'counts[arm] += 1\nvalues[arm] = values[arm] + (reward - values[arm]) / counts[arm]',
        hints: ['This is an online mean update.', 'Only the selected arm changes.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa633-causal-inference-did',
    title: 'Difference-in-Differences Setup',
    language: 'python',
    difficulty: 3,
    topics: ['causal inference', 'difference-in-differences', 'treatment effect', 'regression'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 633/10. Module 8_ Causal Inference/rmd notes/Introduction to Causal Inference.Rmd',
      'Classes /Spring 2026/ISA 633/10. Module 8_ Causal Inference/html Notes/Introduction-to-Causal-Inference.html',
      'Classes /Spring 2026/ISA 633/633-source/[22] Intro causal.pdf',
    ],
    chunks: [
      chunk({
        id: 'did-01',
        title: 'Create indicator columns',
        prompt: 'Create treated, post, and treated_post columns in df.',
        solution: 'df["treated"] = (df["group"] == "treated").astype(int)\ndf["post"] = (df["period"] == "post").astype(int)\ndf["treated_post"] = df["treated"] * df["post"]',
        hints: ['The interaction is treated times post.', 'astype(int) converts True/False to 1/0.'],
      }),
      chunk({
        id: 'did-02',
        title: 'Fit the DiD regression',
        prompt: 'Use statsmodels to regress outcome on treated, post, and treated_post.',
        solution: 'import statsmodels.formula.api as smf\n\nmodel = smf.ols("outcome ~ treated + post + treated_post", data=df).fit()',
        hints: ['The interaction coefficient is the DiD estimate.', 'OLS formula syntax uses ~.'],
      }),
      chunk({
        id: 'did-03',
        title: 'Extract the treatment effect estimate',
        prompt: 'Store the treated_post coefficient in did_effect.',
        solution: 'did_effect = model.params["treated_post"]',
        hints: ['params is indexed by coefficient name.', 'treated_post is the estimated causal contrast under assumptions.'],
      }),
      chunk({
        id: 'did-04',
        title: 'Summarize uncertainty',
        prompt: 'Store the p-value and confidence interval for treated_post.',
        solution: 'did_p_value = model.pvalues["treated_post"]\ndid_ci = model.conf_int().loc["treated_post"]',
        hints: ['pvalues stores significance information.', 'conf_int() returns lower and upper bounds.'],
      }),
    ],
  }),
];
