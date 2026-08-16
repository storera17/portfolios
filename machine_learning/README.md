# Machine Learning Portfolio

This folder contains applied machine learning projects in Python and R. The projects cover classification, regression, anomaly detection, transfer learning, unsupervised clustering, and model comparison.

The work is organized by project rather than by programming language so that each folder represents a complete analytical problem.

## Projects

| Project | Type | Primary Methods | Files |
| --- | --- | --- | --- |
| Loan Default Prediction | Supervised classification | Decision trees, random forests, XGBoost, LogitBoost, logistic regression, neural networks | [`loan_default_prediction`](loan_default_prediction) |
| Fraud Anomaly Detection | Unsupervised anomaly detection | Autoencoder neural network, reconstruction error scoring, latent-space visualization | [`fraud_anomaly_detection`](fraud_anomaly_detection) |
| Image Classification with Transfer Learning | Computer vision classification | CNN from scratch, EfficientNetB0 transfer learning, augmentation, fine tuning | [`image_classification_transfer_learning`](image_classification_transfer_learning) |
| Lyrics Clustering | Unsupervised text mining | CountVectorizer, TF-IDF, truncated SVD, MiniBatch K-Means | [`lyrics_clustering`](lyrics_clustering) |
| Electricity Tariff and Consumption Modeling | Regression and predictive modeling | Feature preparation, linear regression, decision trees, random forests | [`tariff_prediction`](tariff_prediction) |

## Common Workflow

Across the projects, the machine learning work generally follows this pattern:

1. Define the business or analytical problem.
2. Prepare, clean, encode, or transform the source data.
3. Train one or more candidate models.
4. Evaluate model performance using task-appropriate metrics.
5. Interpret model behavior and discuss practical business implications.
6. Document limitations, data requirements, and recommendations.

## Tools and Libraries

| Language | Tools |
| --- | --- |
| Python | Jupyter Notebook, pandas, NumPy, scikit-learn, TensorFlow/Keras, matplotlib, seaborn, NLTK |
| R | R Markdown, tidyverse, caret, rpart, randomForest, xgboost, keras, tensorflow |

## Data Availability

Some raw datasets are not included because they were provided as course materials or require external access. Project notebooks, reports, model result artifacts, and rendered outputs are retained where possible so the modeling approach and results can still be reviewed.

See each project README for project-specific data notes and review guidance.

## Suggested Review Order

1. [`loan_default_prediction`](loan_default_prediction) for the most complete supervised model comparison.
2. [`image_classification_transfer_learning`](image_classification_transfer_learning) for a clear transfer learning benchmark.
3. [`fraud_anomaly_detection`](fraud_anomaly_detection) for unsupervised neural network anomaly scoring.
4. [`lyrics_clustering`](lyrics_clustering) for text-based unsupervised learning.
5. [`tariff_prediction`](tariff_prediction) for regression modeling with customer and tariff features.
