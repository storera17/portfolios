# Electricity Tariff and Consumption Modeling

This project applies machine learning methods to customer electricity data. The notebook prepares customer and tariff-related features, then models annual electricity consumption using regression and tree-based approaches.

## Project Objective

The goal is to explore whether customer attributes, household characteristics, consumption patterns, and tariff indicators can be used to predict annual electricity consumption. This type of model can support energy providers in demand forecasting, tariff analysis, customer segmentation, and operational planning.

## Methods

- Customer feature preparation and dummy variable encoding
- Train/test splitting with a 70/30 split
- Linear regression baseline modeling
- Decision tree and random forest modeling
- Regression evaluation using root mean squared error
- Exploratory review of customer variables such as age, income level, dwelling area, solar roof status, shiftable load, sustainability attitude, and tariff plan

## Repository Contents

```text
.
|-- README.md
`-- predicting_tariff.ipynb
```

## Data Availability

The notebook expects a source file named `energy_data.csv`. That raw dataset is not included in this repository. The notebook is retained as a portfolio artifact to show the modeling workflow, feature preparation, and evaluation approach.

## How to Review

Open [`predicting_tariff.ipynb`](predicting_tariff.ipynb) in GitHub, Jupyter Notebook, JupyterLab, or VS Code. To rerun the notebook, place the required `energy_data.csv` file in the working directory or update the notebook path to point to the local data location.

## Tools

- Python
- Jupyter Notebook
- pandas
- scikit-learn
- LinearRegression
- DecisionTreeRegressor
- RandomForestRegressor
- GridSearchCV
- RMSE-based evaluation
