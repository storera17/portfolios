# Fraud Anomaly Detection with Autoencoders

This project uses an autoencoder neural network to identify potentially fraudulent automobile insurance claims. Instead of directly classifying claims as fraudulent or legitimate, the model learns the structure of normal claims and ranks unusual claims by reconstruction error.

## Project Objective

Insurance fraud is difficult to detect because confirmed fraud cases are rare and fraudulent claims are designed to resemble legitimate claims. This project uses unsupervised anomaly detection to create a prioritized investigation list for fraud analysts.

## Methods

- Standardization of encoded claim features
- Autoencoder training on non-fraudulent claims
- Reconstruction error calculation for test claims
- Risk ranking based on anomaly score
- Evaluation against known fraud labels
- Latent-space visualization for model interpretation

## Repository Contents

```text
.
|-- README.md
|-- GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb
`-- executive_report.md
```

## Key Results

The autoencoder produced reconstruction error scores that can be used to rank claims by anomaly risk. In the executive analysis, the top 1,000 highest-risk claims from a 2,974-claim test set contained 53 confirmed fraudulent claims. This produced an observed precision of approximately 5.3%, which was more than double the dataset's overall fraud rate of approximately 2.49%.

The model is best interpreted as a decision-support system rather than a replacement for human investigation. Its value is in helping investigators focus attention on the claims most likely to require review.

## Data Availability

The raw insurance claim dataset is not included because it was provided as course material. The notebook and executive report are retained so reviewers can inspect the modeling workflow, anomaly scoring approach, visualizations, and business recommendation.

## How to Review

1. Read [`executive_report.md`](executive_report.md) for the business framing, model explanation, evaluation, and final recommendation.
2. Open [`GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb`](GOTCHA!_autoencoder_anomaly_detection_of_fraud.ipynb) to inspect the implementation.

## Tools

- Python
- Jupyter Notebook
- pandas and NumPy
- scikit-learn preprocessing utilities
- TensorFlow/Keras
- matplotlib and related visualization tools
