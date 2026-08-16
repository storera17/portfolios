# Machine Learning Portfolio

This repository is a collection of machine learning coursework and portfolio projects in Python and R. The projects span supervised learning, unsupervised learning, deep learning, natural language processing, anomaly detection, and predictive modeling for financial risk.

The folder is organized as a portfolio rather than a single deployable application. Each notebook or R Markdown file is intended to stand on its own and document the modeling workflow, assumptions, evaluation approach, and business interpretation for that project.

## Project Highlights

### Python

| Project | File | Focus |
| --- | --- | --- |
| CNNs and Transfer Learning in Practice | [`Python/supervised_learning/CNNs_and_Transfer_Learning_in_Practice.ipynb`](Python/supervised_learning/CNNs_and_Transfer_Learning_in_Practice.ipynb) | Binary image classification comparing a CNN trained from scratch against an EfficientNetB0 transfer learning model. Includes preprocessing, augmentation, model evaluation, confusion matrices, t-SNE feature visualization, and a deployment recommendation. |
| GOTCHA! Autoencoder Fraud Detection | [`Python/supervised_learning/GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb`](Python/supervised_learning/GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb) | Fraud anomaly detection using autoencoders trained on normal claims. Produces reconstruction-error risk scores, top-risk investigation lists, threshold-based diagnostics, latent-space visualizations, and stability checks. |
| Lyrics Clustering Analysis | [`Python/unsupervised_learning/designing_a_data_driven_segmentation_strategy.ipynb`](Python/unsupervised_learning/designing_a_data_driven_segmentation_strategy.ipynb) | Unsupervised text segmentation using lyric preprocessing, count vectorization, TF-IDF, truncated SVD, MiniBatchKMeans, silhouette scoring, and representative term review. |

### R

The R project is a multi-part predictive statistics workflow focused on loan default classification.

| Stage | File | Focus |
| --- | --- | --- |
| Data preprocessing | [`R/predictive_statistics/loan_default/part_one_preprocessing.rmd`](R/predictive_statistics/loan_default/part_one_preprocessing.rmd) | Data cleaning, missing-value handling, outlier treatment, transformations, feature engineering, and creation of train/holdout datasets. |
| Decision trees | [`R/predictive_statistics/loan_default/part_two_decision_tree.rmd`](R/predictive_statistics/loan_default/part_two_decision_tree.rmd) | Interpretable classification trees using Gini/entropy splits, pruning, class balance comparisons, ROC/AUC, and F1 evaluation. |
| Random forests | [`R/predictive_statistics/loan_default/part_two_random_forest.rmd`](R/predictive_statistics/loan_default/part_two_random_forest.rmd) | Ensemble tree models with cross-validation, undersampling, threshold tuning, F1 analysis, ROC comparison, and variable importance. |
| Boosting | [`R/predictive_statistics/loan_default/part_two_boosting_tree.rmd`](R/predictive_statistics/loan_default/part_two_boosting_tree.rmd) | Boosted tree methods including XGBoost, AdaBoost, and LogitBoost, with model comparison across accuracy, sensitivity, specificity, F1, and AUC. |
| Logistic regression | [`R/predictive_statistics/loan_default/part_three_logistic_regression.rmd`](R/predictive_statistics/loan_default/part_three_logistic_regression.rmd) | Regularized logistic regression with lasso/elastic net style tuning, cross-validation, ROC/AUC, F1 scoring, and comparison of original versus undersampled training data. |
| Neural networks | [`R/predictive_statistics/loan_default/part_four_neural_network.rmd`](R/predictive_statistics/loan_default/part_four_neural_network.rmd) | Neural network modeling for loan default using feature sets selected from logistic regression and random forest importance, with F1-optimized thresholding and business-focused model selection. |

## Repository Structure

```text
.
|-- Python
|   |-- supervised_learning
|   |   |-- CNNs_and_Transfer_Learning_in_Practice.ipynb
|   |   `-- GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb
|   `-- unsupervised_learning
|       `-- designing_a_data_driven_segmentation_strategy.ipynb
|-- R
|   `-- predictive_statistics
|       `-- loan_default
|           |-- part_one_preprocessing.rmd
|           |-- part_two_decision_tree.rmd
|           |-- part_two_random_forest.rmd
|           |-- part_two_boosting_tree.rmd
|           |-- part_three_logistic_regression.rmd
|           `-- part_four_neural_network.rmd
`-- README.md
```

## Tools and Libraries

The projects use a mix of Python and R tooling.

**Python:** Jupyter, pandas, NumPy, scikit-learn, TensorFlow/Keras, matplotlib, seaborn, gdown, and text feature extraction tools such as CountVectorizer and TfidfVectorizer.

**R:** R Markdown, tidyverse, caret, recipes, skimr, DataExplorer, ROCR, MLmetrics, rpart, rpart.plot, randomForest, doParallel, keras, tensorflow, and related modeling/visualization packages.

## Data Notes

Large source data and saved model artifacts are not included in this folder. Several files reference local or Colab-specific datasets and `.rds` objects, including:

- Loan default files such as `train.csv`, `holdout.csv`, `3B_Palmer-Storer_train_raw.rds`, `3B_Palmer-Storer_holdout_raw.rds`, and model objects such as `rf_clean_0.rds` or `nn_on_rf.rds`.
- Fraud detection data at `/content/insurance_fraud_dataset (1).csv`.
- Lyrics clustering data named `spotify_song_lyrics-1.csv`.
- The pizza/steak image notebook downloads a dataset from Google Drive using `gdown`.

To rerun a project, place the required data in the path expected by the notebook or R Markdown file, or update the path variables before running.

## How to Use

1. Clone or download the repository.
2. Open Python notebooks in Jupyter Notebook, JupyterLab, or Google Colab.
3. Open R Markdown files in RStudio or another R Markdown-compatible environment.
4. Install the required packages for the specific project you want to run.
5. Add the required datasets locally, then run the notebook or render the R Markdown file.

## Portfolio Themes

Across the projects, the work emphasizes:

- End-to-end model development from preprocessing through evaluation.
- Model comparison across interpretable, ensemble, regularized, and neural network approaches.
- Careful handling of class imbalance, especially for loan default and fraud detection.
- Threshold selection and F1/sensitivity tradeoffs for high-cost positive classes.
- Translation of technical results into practical business recommendations.