import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 632 Spark, scalable ML, recommender systems, Spark NLP, RAG, and GenAI material. */
export const SPARK_GENAI_WORKSHEETS = [
  worksheet({
    id: 'isa632-pyspark-transformations',
    title: 'PySpark DataFrame Transformations',
    language: 'python',
    difficulty: 2,
    topics: ['Spark', 'PySpark', 'DataFrames', 'distributed computing'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 632/Module 2. Spark/ISA632_Module 2. Spark.ipynb',
      'Classes /Spring 2026/ISA 632/Module 4. Distributed Computing on Spark/ISA632-M04_Lab1_20260316.pdf',
      'Literature to Know/DB, BI, & Analytics/the-data-intelligence-platform-for-dummies-databricks-special-edition.pdf',
    ],
    chunks: [
      chunk({
        id: 'spark-01',
        title: 'Import Spark functions',
        prompt: 'Import col, avg, and count from pyspark.sql.functions.',
        solution: 'from pyspark.sql.functions import col, avg, count',
        hints: ['Spark column expressions use col().', 'Aggregations come from pyspark.sql.functions.'],
      }),
      chunk({
        id: 'spark-02',
        title: 'Filter active accounts',
        prompt: 'Create active_accounts by filtering accounts where status equals "active".',
        solution: 'active_accounts = accounts.filter(col("status") == "active")',
        hints: ['Use filter().', 'Compare a Spark column with ==.'],
      }),
      chunk({
        id: 'spark-03',
        title: 'Aggregate by segment',
        prompt: 'Create segment_metrics with count and average revenue by segment.',
        solution: 'segment_metrics = active_accounts.groupBy("segment").agg(\n    count("*").alias("account_count"),\n    avg("revenue").alias("avg_revenue")\n)',
        hints: ['Use groupBy().agg().', 'Aliases make output readable.'],
      }),
      chunk({
        id: 'spark-04',
        title: 'Sort distributed results',
        prompt: 'Sort segment_metrics by avg_revenue descending.',
        solution: 'segment_metrics = segment_metrics.orderBy(col("avg_revenue").desc())',
        hints: ['Use orderBy().', 'desc() sorts high to low.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa632-recommender-als',
    title: 'Collaborative Filtering with ALS',
    language: 'python',
    difficulty: 3,
    topics: ['recommender systems', 'ALS', 'collaborative filtering', 'Spark ML'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 632/Module 6. Recommender Systems/isa632_m06_eg_1 (1).ipynb',
      'Classes /Spring 2026/ISA 632/Module 6. Recommender Systems/ISA632-M06_RecSys_20260404.pdf',
      'Classes /Spring 2026/ISA 632/crossing_books.html',
    ],
    chunks: [
      chunk({
        id: 'als-01',
        title: 'Import ALS and evaluator',
        prompt: 'Import ALS and RegressionEvaluator from Spark ML.',
        solution: 'from pyspark.ml.recommendation import ALS\nfrom pyspark.ml.evaluation import RegressionEvaluator',
        hints: ['ALS handles collaborative filtering.', 'RMSE is often used for rating prediction.'],
      }),
      chunk({
        id: 'als-02',
        title: 'Create the ALS model',
        prompt: 'Create an ALS model using userId, itemId, rating, and coldStartStrategy="drop".',
        solution: 'als = ALS(userCol="userId", itemCol="itemId", ratingCol="rating", coldStartStrategy="drop")',
        hints: ['Cold-start rows can produce NaN predictions.', 'Dropping them keeps evaluation cleaner.'],
      }),
      chunk({
        id: 'als-03',
        title: 'Fit and predict',
        prompt: 'Fit ALS on train_df and predict ratings for test_df.',
        solution: 'als_model = als.fit(train_df)\npredictions = als_model.transform(test_df)',
        hints: ['fit() trains the model.', 'transform() adds predictions.'],
      }),
      chunk({
        id: 'als-04',
        title: 'Evaluate RMSE',
        prompt: 'Evaluate predictions using RMSE with rating as the label and prediction as the prediction column.',
        solution: 'evaluator = RegressionEvaluator(metricName="rmse", labelCol="rating", predictionCol="prediction")\nrmse = evaluator.evaluate(predictions)',
        hints: ['Lower RMSE is better.', 'Use the same label column used during training.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa632-rag-evaluation',
    title: 'RAG Retrieval Evaluation Table',
    language: 'python',
    difficulty: 2,
    topics: ['GenAI', 'RAG', 'retrieval evaluation', 'LLM systems'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 632/Module 8. GenAI (1) -  Prompt Engineering & RAG/ISA632-M08_GenAI-1_20260426.pdf',
      'Classes /Spring 2026/ISA 632/Module 9. GenAI(2) - Evaluation & Deployment/ISA632-M09_GenAI-2_20260428.pdf',
      'Classes /Spring 2026/ISA 632/Module 10. GenAI(3) - Agentic AI & LLM Fine-tuning/ISA632-M10-_GenAI-3_20260506.pdf',
    ],
    chunks: [
      chunk({
        id: 'rag-01',
        title: 'Create a reviewed retrieval table',
        prompt: 'Create a dataframe with query, retrieved_doc, relevant, and answer_supported columns.',
        solution: 'import pandas as pd\nreviews = pd.DataFrame(columns=["query", "retrieved_doc", "relevant", "answer_supported"])',
        hints: ['A simple review table is enough to start.', 'Separate retrieval relevance from answer support.'],
      }),
      chunk({
        id: 'rag-02',
        title: 'Add a reviewed query',
        prompt: 'Append one row for a query where the retrieved document is relevant and supports the answer.',
        solution: 'reviews.loc[len(reviews)] = ["What is feature leakage?", "model_validation_notes", True, True]',
        hints: ['Use booleans for review fields.', 'A relevant doc should actually answer the query.'],
      }),
      chunk({
        id: 'rag-03',
        title: 'Calculate context recall proxy',
        prompt: 'Calculate the share of reviewed queries where relevant is True.',
        solution: 'context_recall_proxy = reviews["relevant"].mean()',
        hints: ['True averages as 1, False averages as 0.', 'This is a simple proxy, not a full benchmark.'],
      }),
      chunk({
        id: 'rag-04',
        title: 'Calculate answer support rate',
        prompt: 'Calculate the share of reviewed queries where answer_supported is True.',
        solution: 'answer_support_rate = reviews["answer_supported"].mean()',
        hints: ['Support means the answer can be traced to retrieved content.', 'This helps separate retrieval failure from generation failure.'],
      }),
    ],
  }),
];
