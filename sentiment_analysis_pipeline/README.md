# Sentiment Analysis Pipeline

A complete end-to-end Sentiment Analysis pipeline that loads multi-format datasets, trains both traditional Machine Learning and Deep Learning models, evaluates them, and provides a way to make custom text predictions.

## Features
- **Multi-format Support**: Automatically detects and loads data from `.csv`, `.xlsx`, `.json`, and `.txt`.
- **Data Normalization**: Detects common input columns ('text', 'review', 'tweet') and target columns ('label', 'sentiment', 'score') and normalizes them.
- **Preprocessing**: Cleans text, tokenizes, removes stopwords, encodes labels.
- **Models**: 
  - Machine Learning: Logistic Regression (with TF-IDF)
  - Deep Learning: LSTM (with Keras Tokenizer & Embeddings)
- **Evaluation**: Calculates Accuracy, Precision, Recall, F1-Score.
- **Visualizations**: Confusion matrix heatmap, Training Loss/Accuracy curves, Sentiment distribution (pie & bar charts), and Model comparison.
- **Interactive Predictor**: Input custom text to see predictions from both models.

## Requirements
To install the necessary dependencies, run:
```bash
pip install -r requirements.txt
```

## Usage
Run the pipeline by providing a dataset path:
```bash
python main.py --dataset path/to/dataset.csv
```

Optional arguments:
- `--output_dir`: Directory to save the graphs and metrics CSV (default is `results`).

Example:
```bash
python main.py --dataset data/reviews.json --output_dir my_results
```

## Output
When the pipeline finishes, the following artifacts will be saved in the output directory:
- `Logistic_Regression_metrics.csv`, `LSTM_metrics.csv`, `all_models_metrics_summary.csv`
- `sentiment_distribution_bar.png`, `sentiment_distribution_pie.png`
- `Logistic_Regression_confusion_matrix.png`, `LSTM_confusion_matrix.png`
- `LSTM_training_history.png`
- `model_comparison.png`

Trained models and their tokenizers/vectorizers are saved to the `saved_models` directory.
