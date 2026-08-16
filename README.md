# Data Science Portfolio

This repository contains a collection of graduate-level analytics, machine learning, optimization, and data mining projects. The portfolio is organized by project area, with each folder containing notebooks, reports, code, and supporting documentation for a specific body of work.

The projects emphasize practical analytical workflows: data preparation, modeling, evaluation, interpretation, and communication of results.

## Portfolio Areas

| Area | Folder | Description |
| --- | --- | --- |
| Machine Learning | [`ML_portfolio`](ML_portfolio) | Supervised learning, unsupervised learning, neural networks, transfer learning, anomaly detection, and loan default prediction projects using Python and R. |
| Big Data | [`big_data_portfolio`](big_data_portfolio) | API data collection, NoSQL querying, text mining, feature engineering, and machine learning workflows in Python. |
| Optimization | [`optimization_portfolio`](optimization_portfolio) | Integer programming and optimization modeling applied to NFL expansion site selection. |
| Experimental Design | `experimental_design` | Planned section for experimental design, statistical testing, and related R-based analysis projects. |

## Highlighted Projects

### Loan Default Prediction

A multi-model machine learning project focused on predicting loan default risk. The project compares decision trees, random forests, boosting models, logistic regression, and neural networks. Special attention is given to class imbalance, undersampling, sensitivity, specificity, F1 score, and AUC.

Location: [`ML_portfolio/R/loan_default`](ML_portfolio/R/loan_default)

### Python Machine Learning Projects

A set of Python notebooks covering image classification, fraud anomaly detection, and unsupervised text segmentation. These projects demonstrate model development, feature engineering, evaluation, visualization, and business interpretation.

Location: [`ML_portfolio/Python`](ML_portfolio/Python)

### Big Data and Data Mining

A collection of notebooks demonstrating API-based data collection, MongoDB aggregation, text processing, sentiment analysis, TF-IDF feature engineering, and classification modeling.

Location: [`big_data_portfolio`](big_data_portfolio)

### NFL Expansion Optimization

An optimization project using binary integer programming to evaluate possible NFL expansion locations. The model considers geographic coverage, candidate city feasibility, population and economic thresholds, and budget constraints.

Location: [`optimization_portfolio`](optimization_portfolio)

## Tools and Languages

This portfolio includes work in:

- Python
- R
- Jupyter Notebook
- R Markdown
- pandas, NumPy, scikit-learn, TensorFlow/Keras
- tidyverse, caret, rpart, randomForest, xgboost
- MongoDB
- Gurobi optimization
- matplotlib, seaborn, and related visualization tools

## Data Notes

Large raw datasets are generally not included in this repository. When data files are required to reproduce an analysis, the project README explains the expected data source, file structure, or local path adjustments needed to run the notebook or report.

This approach keeps the repository lightweight while preserving the code, methodology, results, and interpretation needed for portfolio review.

## Suggested Review Order

1. Start with the root README to understand the portfolio structure.
2. Review each folder-level README for project summaries.
3. Open rendered reports or notebooks for detailed modeling workflows and results.
4. Use source notebooks and R Markdown files to inspect the underlying code.