# Loan Default Prediction

This project evaluates multiple machine learning approaches for predicting loan default. The analysis compares interpretable tree models, ensemble methods, regularized logistic regression, and neural networks, with special attention to class imbalance and the tradeoff between precision and recall.

## Project Objective

The goal is to identify a model that can help estimate loan default risk and support more consistent lending decisions. Because loan default is an imbalanced classification problem, the analysis compares models trained on the full training dataset against models trained on undersampled data.

## Methods

- Data cleaning, missing-value handling, transformation, and feature engineering
- Decision trees using Gini and entropy splitting criteria
- Cross-validated pruned decision trees
- Random forest models using `randomForest` and `ranger`
- Boosting models including XGBoost and LogitBoost
- Regularized logistic regression with lasso, ridge, and elastic net
- Neural networks using variables selected from logistic regression and random forest importance
- Evaluation using accuracy, balanced accuracy, precision, sensitivity/recall, specificity, F1 score, and AUC

## Repository Contents

```text
.
|-- README.md
|-- reports
|   |-- report.rmd
|   |-- decision_trees.rmd
|   |-- random_forest.rmd
|   |-- boosting_ensembles.rmd
|   |-- logistic_regression.rmd
|   `-- neural_network.rmd
|-- outputs
|   |-- Boosting Ensemble Modeling for Predicting Loan Default.html
|   |-- Decision Tree Modeling for Predicting Loan Default.html
|   |-- Logistic Regression Modeling for Predicting Loan Default.html
|   |-- Neural Network Modeling for Predicting Loan Default.html
|   `-- Random Forest Ensemble Modeling for Predicting Loan Default.html
`-- data
    |-- boosting_ensemble_results
    |-- decision_tree_results
    |-- logistic_regression_results
    |-- neural_network_results
    `-- random_forest_results
```

## Key Results

The strongest overall model was the undersampled medium XGBoost model. It produced the best balance between identifying default cases and limiting false positives, with an F1 score of approximately 0.773 and AUC of approximately 0.952.

| Model Class | Best Model | Sample Strategy | Main Takeaway |
| --- | --- | --- | --- |
| Decision Tree | Entropy or Gini pruned tree | Full data | Strong interpretability and competitive F1 score, but lower recall than undersampled trees. |
| Random Forest | Cross-validated `randomForest` | Full data | Strong precision and specificity, with moderate recall. |
| Boosting | Medium XGBoost | Undersampled data | Best overall balance of F1 score, AUC, recall, and specificity. |
| Logistic Regression | Elastic net | Full/undersampled reported similarly | Stable and interpretable, but less flexible than tree ensembles. |
| Neural Network | Lasso-selected neural network | Full data | Competitive performance, but did not exceed boosted trees. |

## Data Availability

The raw `train.csv` and `holdout.csv` datasets are not included because they were provided as course materials. The R Markdown files are included to show the full modeling workflow, and rendered HTML outputs are included so results, plots, tables, and model comparisons can be reviewed without access to the original raw datasets.

The `data` subfolders contain saved model result summaries used by the final report.

## How to Review

1. Start with [`reports/report.rmd`](reports/report.rmd) for the full combined analysis.
2. Review the rendered files in [`outputs`](outputs) to inspect model-specific outputs without rerunning the R Markdown files.
3. Use the individual R Markdown files in [`reports`](reports) to inspect model code by class.
4. Review the saved result artifacts in [`data`](data) for model comparison outputs.

## Tools

- R Markdown
- tidyverse
- caret
- rpart and rpart.plot
- randomForest and ranger
- xgboost
- regularized logistic regression tooling
- neural network tooling
