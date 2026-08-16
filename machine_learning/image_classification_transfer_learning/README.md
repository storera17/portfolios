# Image Classification with CNNs and Transfer Learning

This project compares two approaches for classifying food images as pizza or steak: a convolutional neural network built from scratch and an EfficientNetB0 transfer learning model.

## Project Objective

The goal is to determine which modeling approach is more suitable for a practical image classification system that could support menu photo organization, food delivery tagging, restaurant analytics, or content moderation.

## Methods

- Image resizing to 224 by 224 pixels
- Pixel scaling for the scratch CNN
- EfficientNetB0-specific preprocessing for the transfer learning model
- Data augmentation with flips, rotations, zooms, and shifts
- CNN architecture with convolutional blocks, batch normalization, ReLU activations, max pooling, dropout, and sigmoid output
- Two-phase transfer learning with frozen EfficientNetB0 layers followed by fine tuning
- Evaluation using test accuracy, test loss, misclassification counts, classification reports, and confusion matrices

## Repository Contents

```text
.
|-- README.md
|-- CNNs_and_Transfer_Learning_in_Practice.ipynb
`-- executive_report.md
```

## Key Results

The EfficientNetB0 transfer learning model substantially outperformed the CNN trained from scratch.

| Model | Test Accuracy | Test Loss | Misclassifications |
| --- | ---: | ---: | ---: |
| CNN from Scratch | 89.4% | 0.2646 | 53 out of 500 |
| EfficientNetB0 Transfer Learning | 99.4% | 0.0229 | 3 out of 500 |

The transfer learning model correctly classified 497 out of 500 test images and made only three errors, all pizza images predicted as steak. It also trained more reliably and showed more stable validation performance than the scratch CNN.

## Data Availability

The image dataset is not stored directly in this repository. The notebook documents the data loading and modeling workflow, and the executive report preserves the key results and interpretation.

## How to Review

1. Read [`executive_report.md`](executive_report.md) for the business framing, comparison, results, error analysis, and recommendation.
2. Open [`CNNs_and_Transfer_Learning_in_Practice.ipynb`](CNNs_and_Transfer_Learning_in_Practice.ipynb) to inspect the modeling workflow.

## Tools

- Python
- Jupyter Notebook
- TensorFlow/Keras
- EfficientNetB0
- pandas and NumPy
- scikit-learn evaluation tools
- matplotlib and seaborn
