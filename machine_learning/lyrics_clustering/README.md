# Lyrics Clustering and Playlist Segmentation

This project uses unsupervised learning to examine whether song lyrics can be grouped into meaningful thematic clusters that could support playlist generation and music recommendation strategies.

## Project Objective

The goal is to identify latent relationships between songs based on lyrical content. The project evaluates whether natural language processing and clustering can reveal interpretable groups of songs that are useful for playlist design, music discovery, and listener engagement.

## Methods

- Lyric text preprocessing
- CountVectorizer and TF-IDF feature extraction
- Unigram and bigram representation
- Dimensionality reduction with truncated SVD
- MiniBatch K-Means clustering
- Cluster selection using inertia and silhouette score
- Cluster interpretation using representative terms and phrases

## Repository Contents

```text
.
|-- README.md
|-- designing_a_data_driven_segmentation_strategy.ipynb
`-- executive_report.md
```

## Key Results

The final clustering analysis identified nine lyrical segments with interpretable themes.

| Cluster | Size | Interpreted Theme |
| ---: | ---: | --- |
| 0 | 2,196 | Religious/Spiritual Worship |
| 1 | 6,403 | Conversational/Narrative |
| 2 | 9,882 | Everyday Reflection/Personal Thoughts |
| 3 | 8,429 | Time, Journey, and Passage of Life |
| 4 | 7,512 | Romantic Love and Emotional Relationships |
| 5 | 5,440 | Confidence/Self-Assertion/Agency |
| 6 | 7,016 | Urban Life/Social Attitude/Street Perspective |
| 7 | 5,125 | Mortality, Conflict, and Dark Themes |
| 8 | 5,644 | Romantic Desire/Relationship Communication |

The results suggest that lyrical similarity can serve as a complementary signal for playlist design and thematic recommendation systems.

## Data Availability

The raw lyrics dataset is not included because it was provided as course material. The notebook and executive report are included so reviewers can inspect the preprocessing, modeling approach, cluster interpretation, and business recommendation.

## How to Review

1. Read [`executive_report.md`](executive_report.md) for the business framing, cluster interpretation, and recommendation.
2. Open [`designing_a_data_driven_segmentation_strategy.ipynb`](designing_a_data_driven_segmentation_strategy.ipynb) to inspect the unsupervised learning workflow.

## Tools

- Python
- Jupyter Notebook
- pandas and NumPy
- scikit-learn
- CountVectorizer and TfidfVectorizer
- TruncatedSVD
- MiniBatchKMeans
