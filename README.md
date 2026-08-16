# Data Science Portfolio

This repository contains a project-based portfolio of graduate-level analytics, machine learning, data mining, and optimization work. The projects emphasize the full analytical workflow: problem framing, data preparation, modeling, evaluation, interpretation, and communication of business recommendations.

The portfolio is organized by project area first, then by individual project. Each project README explains the objective, methods, files, data availability, and recommended review path.

## Portfolio Areas

| Area | Folder | Focus |
| --- | --- | --- |
| Machine Learning | [`machine_learning`](machine_learning) | Supervised learning, unsupervised learning, transfer learning, anomaly detection, predictive modeling, and model comparison. |
| Big Data | [`big_data`](big_data) | API data collection, NoSQL querying, text mining, feature engineering, and Python-based machine learning workflows. |
| Optimization | [`optimization`](optimization) | Integer programming and scenario analysis for NFL expansion site selection. |

## Featured Projects

| Project | Area | Methods | Folder |
| --- | --- | --- | --- |
| Loan Default Prediction | Machine Learning | Decision trees, random forests, boosting, logistic regression, neural networks, class imbalance handling | [`machine_learning/loan_default_prediction`](machine_learning/loan_default_prediction) |
| Fraud Anomaly Detection | Machine Learning | Autoencoders, reconstruction error scoring, latent-space analysis, risk ranking | [`machine_learning/fraud_anomaly_detection`](machine_learning/fraud_anomaly_detection) |
| Image Classification with Transfer Learning | Machine Learning | CNN from scratch, EfficientNetB0 transfer learning, image augmentation, model comparison | [`machine_learning/image_classification_transfer_learning`](machine_learning/image_classification_transfer_learning) |
| Lyrics Clustering | Machine Learning | TF-IDF, dimensionality reduction, MiniBatch K-Means, cluster interpretation | [`machine_learning/lyrics_clustering`](machine_learning/lyrics_clustering) |
| Electricity Tariff and Consumption Modeling | Machine Learning | Regression modeling, feature preparation, tree models, random forests | [`machine_learning/tariff_prediction`](machine_learning/tariff_prediction) |
| Big Data and Data Mining | Big Data | APIs, MongoDB aggregation, NLP, sentiment analysis, TF-IDF, classification | [`big_data`](big_data) |
| NFL Expansion Optimization | Optimization | Binary integer programming, coverage modeling, threshold sensitivity analysis | [`optimization`](optimization) |

## Tools and Languages

- Python, Jupyter Notebook, pandas, NumPy, scikit-learn, TensorFlow/Keras, matplotlib, seaborn
- R, R Markdown, tidyverse, caret, rpart, randomForest, xgboost, neural network tooling
- MongoDB and API-based data collection
- Gurobi optimization and integer programming
- Model evaluation metrics including accuracy, precision, recall, F1 score, AUC, RMSE, reconstruction error, and sensitivity analysis

## Data Availability

Some raw datasets are not included because they were provided as course materials, require external credentials, or are not appropriate to redistribute publicly. When raw data is unavailable, the repository preserves the analysis through notebooks, R Markdown files, rendered reports, result artifacts, and project-level documentation.

Each project README explains what is included, what data is required to rerun the work, and how to review the project as a portfolio artifact.

## Suggested Review Path

1. Start with [`machine_learning`](machine_learning) for the broadest modeling work.
2. Review [`machine_learning/loan_default_prediction`](machine_learning/loan_default_prediction) for the most complete multi-model comparison.
3. Review [`machine_learning/fraud_anomaly_detection`](machine_learning/fraud_anomaly_detection) and [`machine_learning/image_classification_transfer_learning`](machine_learning/image_classification_transfer_learning) for applied neural network projects.
4. Review [`big_data`](big_data) for data acquisition, database, and text mining workflows.
5. Review [`optimization`](optimization) for mathematical modeling and decision optimization.

## Repository Structure

```text
.
|-- README.md
|-- big_data
|-- machine_learning
|   |-- fraud_anomaly_detection
|   |-- image_classification_transfer_learning
|   |-- loan_default_prediction
|   |-- lyrics_clustering
|   `-- tariff_prediction
`-- optimization
```
