import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 591 R, tidyverse, model evaluation, trees, and neural-network material. */
export const R_MODELING_WORKSHEETS = [
  worksheet({
    id: 'isa591-tidyverse-eda',
    title: 'Tidyverse EDA and Feature Checks',
    language: 'r',
    difficulty: 1,
    topics: ['R', 'tidyverse', 'EDA', 'feature checks'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 591/Module 0 - Pre-Term Review Material/Module 0/Intro-to-Tidyverse.html',
      'Classes /Fall 2025/ISA 591/Module 2 - Exploratory Data Analysis/Module 2/Module-2-Day-1-Notes-Final.html',
      'Literature to Know/DB, BI, & Analytics/ML/ISA591 Textbook.docx',
    ],
    chunks: [
      chunk({
        id: 'r-eda-01',
        title: 'Load tidyverse',
        prompt: 'Load tidyverse so dplyr and ggplot2 verbs are available.',
        solution: 'library(tidyverse)',
        hints: ['library(...) loads an R package.', 'tidyverse includes dplyr and ggplot2.'],
      }),
      chunk({
        id: 'r-eda-02',
        title: 'Select modeling columns',
        prompt: 'Create model_df with only target, age, income, tenure, and channel.',
        solution: 'model_df <- raw_df %>%\n  select(target, age, income, tenure, channel)',
        hints: ['Use select().', 'Keep target in the dataframe.'],
      }),
      chunk({
        id: 'r-eda-03',
        title: 'Summarize numeric predictors',
        prompt: 'Group by target and calculate average income and average tenure.',
        solution: 'summary_df <- model_df %>%\n  group_by(target) %>%\n  summarize(avg_income = mean(income, na.rm = TRUE), avg_tenure = mean(tenure, na.rm = TRUE), .groups = "drop")',
        hints: ['Use group_by(target).', 'Use na.rm = TRUE for missing values.'],
      }),
      chunk({
        id: 'r-eda-04',
        title: 'Plot target by channel',
        prompt: 'Create a bar chart showing target counts by channel.',
        solution: 'ggplot(model_df, aes(x = channel, fill = target)) +\n  geom_bar(position = "dodge") +\n  labs(x = "Channel", y = "Count", fill = "Target")',
        hints: ['geom_bar() counts rows.', 'fill = target separates the classes.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa591-tree-model-baseline',
    title: 'Decision Tree Baseline in R',
    language: 'r',
    difficulty: 2,
    topics: ['R', 'decision tree', 'classification', 'confusion matrix'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 591/Module 6 - Tree-Based Models/Module 6 - Lab 1/Module 6 Lab 1 Customer Churn.Rmd',
      'Classes /Fall 2025/ISA 591/Final projectr/Part 2 - Tree 1 - Decision Tree.Rmd',
      'Classes /Fall 2025/ISA 591/Module 4 - Evaluating Model Performance/Module 4 Notes-Day 1.Rmd',
    ],
    chunks: [
      chunk({
        id: 'r-tree-01',
        title: 'Load modeling packages',
        prompt: 'Load rpart, rpart.plot, and caret.',
        solution: 'library(rpart)\nlibrary(rpart.plot)\nlibrary(caret)',
        hints: ['rpart trains decision trees.', 'caret provides confusionMatrix().'],
      }),
      chunk({
        id: 'r-tree-02',
        title: 'Train the decision tree',
        prompt: 'Train a classification tree predicting churn from all other fields in train_df.',
        solution: 'tree_model <- rpart(churn ~ ., data = train_df, method = "class")',
        hints: ['The formula churn ~ . means use all other columns.', 'method = "class" is for classification.'],
      }),
      chunk({
        id: 'r-tree-03',
        title: 'Predict classes',
        prompt: 'Predict classes for test_df and store them in tree_preds.',
        solution: 'tree_preds <- predict(tree_model, newdata = test_df, type = "class")',
        hints: ['Use newdata = test_df.', 'type = "class" returns class labels.'],
      }),
      chunk({
        id: 'r-tree-04',
        title: 'Evaluate the baseline',
        prompt: 'Create a confusion matrix comparing tree_preds to test_df$churn.',
        solution: 'tree_cm <- confusionMatrix(tree_preds, test_df$churn)',
        hints: ['Predictions go first in confusionMatrix().', 'The truth column is test_df$churn.'],
      }),
    ],
  }),
];
