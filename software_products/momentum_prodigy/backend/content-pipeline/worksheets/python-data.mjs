import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 514 Python, SQL, APIs, NoSQL, mining, and text-mining material. */
export const PYTHON_DATA_WORKSHEETS = [
  worksheet({
    id: 'isa514-python-pandas-cleaning',
    title: 'Python Data Cleaning with pandas',
    language: 'python',
    difficulty: 1,
    topics: ['Python', 'pandas', 'data cleaning', 'groupby'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 514/Module 2 - Python/Module 2 - Python (I)/Tutorial01_PythonBasics.ipynb',
      'Classes /Fall 2025/ISA 514/Module 3 - Python (II)/isa514-m03_eg1.ipynb',
      'Classes /Fall 2025/ISA 514/Homework Assignments/Homework 1/FDIC-1.ipynb',
    ],
    chunks: [
      chunk({
        id: 'py-clean-01',
        title: 'Import pandas and create a dataframe',
        prompt: 'Import pandas as pd and create a dataframe named orders from the provided dictionary.',
        imports: ['import pandas as pd'],
        starterCode: 'raw_orders = {"order_id": [1, 2, 3], "segment": ["A", "B", "A"], "revenue": [120, None, 440]}',
        solution: 'import pandas as pd\norders = pd.DataFrame(raw_orders)',
        hints: ['pd.DataFrame(...) creates a dataframe.', 'Keep the dataframe name orders.'],
      }),
      chunk({
        id: 'py-clean-02',
        title: 'Fill missing revenue',
        prompt: 'Replace missing revenue values with 0 and store the result back in orders["revenue"].',
        solution: 'orders["revenue"] = orders["revenue"].fillna(0)',
        hints: ['Use fillna(0).', 'Assign the cleaned column back to the same column name.'],
      }),
      chunk({
        id: 'py-clean-03',
        title: 'Create a high-value flag',
        prompt: 'Add a boolean column named high_value that is True when revenue is at least 300.',
        solution: 'orders["high_value"] = orders["revenue"] >= 300',
        hints: ['A comparison creates True/False values.', 'Use >= 300.'],
      }),
      chunk({
        id: 'py-clean-04',
        title: 'Summarize revenue by segment',
        prompt: 'Create segment_summary with total revenue and order count by segment.',
        solution: 'segment_summary = orders.groupby("segment").agg(total_revenue=("revenue", "sum"), order_count=("order_id", "count")).reset_index()',
        hints: ['Use groupby("segment").', 'Named aggregations make the output readable.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa514-sql-flights-joins',
    title: 'SQL Joins and Aggregation for Flight Data',
    language: 'sql',
    difficulty: 2,
    topics: ['SQL', 'joins', 'aggregation', 'flight data'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 514/Module 3 - Python (II)/CreateTables.ddl',
      'Classes /Fall 2025/ISA 514/Module 3 - Python (II)/airline_data.sql',
      'Classes /Fall 2025/ISA 514/Module 3 - Python (II)/flights_data.sql',
    ],
    chunks: [
      chunk({
        id: 'sql-flight-01',
        title: 'Select the flight grain',
        prompt: 'Write a query that returns flight_id, carrier, origin, destination, and arrival_delay from flights.',
        solution: 'SELECT flight_id, carrier, origin, destination, arrival_delay\nFROM flights;',
        hints: ['Start by naming the columns you need.', 'The base table is flights.'],
      }),
      chunk({
        id: 'sql-flight-02',
        title: 'Filter delayed flights',
        prompt: 'Return only flights with arrival_delay greater than 15 minutes.',
        solution: 'SELECT flight_id, carrier, origin, destination, arrival_delay\nFROM flights\nWHERE arrival_delay > 15;',
        hints: ['Use WHERE for row filters.', 'The threshold is 15.'],
      }),
      chunk({
        id: 'sql-flight-03',
        title: 'Join airline names',
        prompt: 'Join flights to airlines so the output includes airline_name.',
        solution: 'SELECT f.flight_id, a.airline_name, f.origin, f.destination, f.arrival_delay\nFROM flights AS f\nJOIN airlines AS a\n  ON f.carrier = a.carrier;',
        hints: ['Use table aliases for readability.', 'Join on the shared carrier code.'],
      }),
      chunk({
        id: 'sql-flight-04',
        title: 'Average delay by airline',
        prompt: 'Calculate average arrival delay and flight count by airline_name, sorted from highest delay to lowest.',
        solution: 'SELECT a.airline_name,\n       AVG(f.arrival_delay) AS avg_arrival_delay,\n       COUNT(*) AS flight_count\nFROM flights AS f\nJOIN airlines AS a\n  ON f.carrier = a.carrier\nGROUP BY a.airline_name\nORDER BY avg_arrival_delay DESC;',
        hints: ['Aggregated columns need GROUP BY.', 'ORDER BY can use the alias.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa514-text-mining-tfidf',
    title: 'Text Mining Pipeline with TF-IDF',
    language: 'python',
    difficulty: 2,
    topics: ['text mining', 'TF-IDF', 'classification', 'scikit-learn'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 514/Module 7 - Text Mining/Exercises and Presentations/isa514-m07_demo1.ipynb',
      'Classes /Fall 2025/ISA 514/Module 7 - Text Mining/Exercises and Presentations/isa514-m07_ex1.ipynb',
      'Classes /Fall 2025/ISA 514/Module 7 - Text Mining/spam.ipynb',
    ],
    chunks: [
      chunk({
        id: 'text-01',
        title: 'Import the text-mining tools',
        prompt: 'Import train_test_split, TfidfVectorizer, LogisticRegression, and accuracy_score.',
        solution: 'from sklearn.model_selection import train_test_split\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score',
        hints: ['TF-IDF lives in sklearn.feature_extraction.text.', 'Logistic regression is a solid baseline classifier.'],
      }),
      chunk({
        id: 'text-02',
        title: 'Split text and labels',
        prompt: 'Split df["text"] and df["label"] into train/test sets with test_size=.25 and random_state=42.',
        solution: 'X_train, X_test, y_train, y_test = train_test_split(df["text"], df["label"], test_size=0.25, random_state=42)',
        hints: ['Use train_test_split once.', 'Keep names X_train, X_test, y_train, y_test.'],
      }),
      chunk({
        id: 'text-03',
        title: 'Vectorize the documents',
        prompt: 'Fit a TfidfVectorizer on the training text and transform both training and test text.',
        solution: 'vectorizer = TfidfVectorizer(stop_words="english", min_df=2)\nX_train_vec = vectorizer.fit_transform(X_train)\nX_test_vec = vectorizer.transform(X_test)',
        hints: ['Fit only on training text.', 'Transform the test text with the fitted vectorizer.'],
      }),
      chunk({
        id: 'text-04',
        title: 'Train and evaluate a classifier',
        prompt: 'Train LogisticRegression and calculate accuracy on the test set.',
        solution: 'model = LogisticRegression(max_iter=1000)\nmodel.fit(X_train_vec, y_train)\npreds = model.predict(X_test_vec)\naccuracy = accuracy_score(y_test, preds)',
        hints: ['Call fit before predict.', 'Compare predictions to y_test.'],
      }),
    ],
  }),
];
