# Big Data and Data Mining Portfolio

This folder contains Python notebooks demonstrating practical data mining workflows. The projects cover API-based data collection, NoSQL querying, text preprocessing, feature engineering, sentiment analysis, TF-IDF vectorization, and machine learning classification.

## Projects

| Notebook | Focus | What It Demonstrates |
| --- | --- | --- |
| [`api_data_mining.ipynb`](api_data_mining.ipynb) | API data collection | Collects New York Times article counts for Cincinnati from 2010-2019, handles request pacing, stores results in a dataframe, and visualizes yearly trends. |
| [`NoSQL_data_mining.ipynb`](NoSQL_data_mining.ipynb) | MongoDB analytics | Uses MongoDB aggregation pipelines to analyze movie budgets, ratings, genres, release years, and cost-per-minute measures. |
| [`text_mining_ml.ipynb`](text_mining_ml.ipynb) | Text mining and classification | Cleans Yelp review text, creates sentiment and TF-IDF features, and trains Random Forest classifiers. |

## Skills Demonstrated

- API request construction and response handling
- Rate-limit-aware data collection
- MongoDB querying and aggregation
- Text cleaning, tokenization, stop-word removal, and stemming
- Sentiment analysis with VADER
- TF-IDF feature engineering with scikit-learn
- Supervised classification and model evaluation
- Notebook-based analytical storytelling

## Repository Contents

```text
.
|-- README.md
|-- NoSQL_data_mining.ipynb
|-- api_data_mining.ipynb
`-- text_mining_ml.ipynb
```

## Data and Credential Requirements

Some notebooks require external data sources or credentials that are not included in this repository.

| Notebook | Requirement |
| --- | --- |
| `api_data_mining.ipynb` | New York Times Article Search API key. |
| `NoSQL_data_mining.ipynb` | Access to the MongoDB database and `movies` collection used in the notebook. |
| `text_mining_ml.ipynb` | Yelp review data with text and class labels. |

Credentials, API keys, database connection details, and large source datasets are intentionally excluded from the repository.

## How to Review

Open the notebooks directly in GitHub, Jupyter Notebook, JupyterLab, or VS Code. The notebooks are intended as portfolio artifacts: they show the workflow, code, and saved outputs, but some cells may require local path or credential updates before rerunning end to end.

## Suggested Review Order

1. Start with [`api_data_mining.ipynb`](api_data_mining.ipynb) for a compact API collection example.
2. Review [`NoSQL_data_mining.ipynb`](NoSQL_data_mining.ipynb) for database querying and aggregation logic.
3. Finish with [`text_mining_ml.ipynb`](text_mining_ml.ipynb) for the most complete text mining and classification workflow.
