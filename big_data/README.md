# Big Data Portfolio

A concise portfolio of Jupyter notebooks demonstrating practical data mining workflows with Python. The projects cover API-based data collection, MongoDB aggregation, natural language processing, feature engineering, supervised machine learning, and data visualization.

This repository is designed for portfolio review: each notebook highlights a different part of the analytics workflow, from collecting and preparing data to modeling, evaluation, and communicating results.

## Portfolio Overview

| Notebook | Focus Area | What It Demonstrates |
| --- | --- | --- |
| [`api_data_mining.ipynb`](api_data_mining.ipynb) | API data mining | Collects yearly New York Times article counts for "Cincinnati" from 2010-2019, handles rate limits, stores results in a dataframe, and visualizes the trend. |
| [`NoSQL_data_mining.ipynb`](NoSQL_data_mining.ipynb) | NoSQL / MongoDB analytics | Connects to a MongoDB movies collection and uses aggregation pipelines to answer analytical questions about movie budgets, ratings, genres, release years, and cost per minute. |
| [`text_mining_ml.ipynb`](text_mining_ml.ipynb) | Text mining and machine learning | Uses Yelp review text to create sentiment and TF-IDF features, then trains Random Forest classifiers for review classification. |

## Skills Demonstrated

- Python data analysis with `pandas`
- API requests and response handling with `requests`
- Rate-limit-aware data collection
- MongoDB querying and aggregation pipelines
- Text cleaning, tokenization, stop-word removal, and stemming with `nltk`
- Sentiment analysis with VADER
- TF-IDF vectorization with `scikit-learn`
- Train/test splitting, classification modeling, and accuracy reporting
- Data visualization with `matplotlib`
- Notebook-based analytical storytelling

## Repository Structure

```text
.
|-- README.md
|-- NoSQL_data_mining.ipynb
|-- api_data_mining.ipynb
`-- text_mining_ml.ipynb
```

## Notebook Summaries

### API Data Mining

[`api_data_mining.ipynb`](api_data_mining.ipynb) uses the New York Times Article Search API to estimate the yearly visibility of Cincinnati in NYT coverage from 2010 through 2019.

The notebook:

- Queries the API once per year using date-bounded search parameters
- Includes a delay and retry path for rate-limit responses
- Stores article counts in a `pandas` dataframe
- Plots article count trends over time

Saved notebook output shows article counts declining from 1,018 in 2010 to 462 in 2019.

### NoSQL Data Mining

[`NoSQL_data_mining.ipynb`](NoSQL_data_mining.ipynb) analyzes a MongoDB movies collection with aggregation pipelines.

The notebook answers questions such as:

- Which romance movies have the lowest non-zero budgets?
- How does average movie rating change by release year?
- Which drama movies have the highest production cost per minute?

It demonstrates MongoDB stages such as `$match`, `$project`, `$group`, `$sort`, and `$limit`, along with type conversion for numeric calculations.

### Text Mining and Machine Learning

[`text_mining_ml.ipynb`](text_mining_ml.ipynb) builds a text classification workflow using Yelp review data.

The notebook:

- Loads review text and class labels from a CSV file
- Generates VADER positive, negative, neutral, and compound sentiment scores
- Cleans text through tokenization, punctuation removal, lowercasing, stop-word removal, and stemming
- Converts cleaned review text into normalized TF-IDF features
- Trains Random Forest classifiers using sentiment features, TF-IDF features, and combined feature sets
- Reports accuracy and classification metrics

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd big_data_portfolio
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate
```

On Windows:

```bash
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install jupyter pandas matplotlib requests pymongo nltk scikit-learn
```

Download the NLTK resources used by the text mining notebook:

```bash
python -m nltk.downloader vader_lexicon stopwords punkt
```

### 4. Start Jupyter

```bash
jupyter notebook
```

Then open the notebook you want to review or run.

## Data and Credential Requirements

Some notebooks require external data sources or credentials that are not included in this repository.

| Notebook | Requirement |
| --- | --- |
| `api_data_mining.ipynb` | New York Times Article Search API key. Replace the placeholder API key before running. |
| `NoSQL_data_mining.ipynb` | Access to the MongoDB server, database, and `movies` collection referenced in the notebook. |
| `text_mining_ml.ipynb` | Yelp review CSV with `class` and `review` columns. Update the local CSV path before running on a new machine. |

For public sharing, keep API keys, database credentials, and local file paths out of committed notebook outputs.

## Suggested Review Order

1. Start with [`api_data_mining.ipynb`](api_data_mining.ipynb) for a compact API collection and visualization example.
2. Review [`NoSQL_data_mining.ipynb`](NoSQL_data_mining.ipynb) for database querying and aggregation logic.
3. Finish with [`text_mining_ml.ipynb`](text_mining_ml.ipynb) for the most complete machine learning workflow.

## Notes for Reproducibility

- The notebooks are portfolio examples and may require path, credential, or connection updates before running end to end.
- API results can change over time as source systems update their data.
- Database-backed results depend on the MongoDB collection available in the target environment.
- To make the repository fully reproducible, consider adding sample data, a `requirements.txt`, and an `.env.example` file for credential setup.
