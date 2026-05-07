import argparse
import os
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from data_loader import DataLoader
from preprocessor import Preprocessor
from models import get_ml_model, get_dl_model
from trainer import Trainer
from evaluator import Evaluator

def main(dataset_path, output_dir='results'):
    # Initialize components
    data_loader = DataLoader()
    preprocessor = Preprocessor(apply_stemming=False)
    trainer = Trainer(max_features=5000, max_length=100)
    evaluator = Evaluator(output_dir=output_dir)

    print(f"Loading data from {dataset_path}...")
    df = data_loader.load_data(dataset_path)
    
    print("Plotting sentiment distribution...")
    evaluator.plot_sentiment_distribution(df, label_col='label')

    print("Preprocessing data...")
    df, label_encoder = preprocessor.preprocess(df)
    
    metrics_list = []
    
    # ------------------ ML MODEL ------------------
    print("\nPreparing data for ML model...")
    X_train_ml, X_test_ml, y_train_ml, y_test_ml = trainer.prepare_ml_data(df)
    
    print("Training Logistic Regression Model...")
    ml_model = get_ml_model('logistic_regression')
    ml_model = trainer.train_ml_model(ml_model, X_train_ml, y_train_ml)
    
    print("Evaluating Logistic Regression Model...")
    y_pred_ml = ml_model.predict(X_test_ml)
    ml_metrics = evaluator.evaluate_model(y_test_ml, y_pred_ml, label_encoder, model_name="Logistic_Regression")
    metrics_list.append(ml_metrics)
    
    # Save ML model
    if not os.path.exists('saved_models'):
        os.makedirs('saved_models')
    trainer.save_artifacts(ml_model, label_encoder, 'ml', 'saved_models/ml_model.pkl', 'saved_models/ml_artifacts.pkl')

    # ------------------ DL MODEL ------------------
    print("\nPreparing data for DL model...")
    X_train_dl, X_test_dl, y_train_dl, y_test_dl = trainer.prepare_dl_data(df)
    
    print("Training LSTM Model...")
    num_classes = len(label_encoder.classes_)
    dl_model = get_dl_model(vocab_size=trainer.max_features, num_classes=num_classes, embedding_dim=128, max_length=trainer.max_length)
    
    dl_model, history = trainer.train_dl_model(dl_model, X_train_dl, y_train_dl, X_test_dl, y_test_dl, epochs=5, batch_size=32)
    
    print("Evaluating LSTM Model...")
    y_pred_dl = dl_model.predict(X_test_dl)
    dl_metrics = evaluator.evaluate_model(y_test_dl, y_pred_dl, label_encoder, model_name="LSTM")
    metrics_list.append(dl_metrics)
    
    print("Plotting training history for LSTM...")
    evaluator.plot_loss_vs_epoch(history, model_name="LSTM")
    
    # Save DL model
    trainer.save_artifacts(dl_model, label_encoder, 'dl', 'saved_models/dl_model.h5', 'saved_models/dl_artifacts.pkl')
    
    # ------------------ COMPARISON ------------------
    print("\nGenerating model comparison chart...")
    evaluator.plot_model_comparison(metrics_list)
    print(f"All results and graphs have been saved to '{output_dir}' directory.")
    
    # ------------------ INTERACTIVE PREDICTION ------------------
    print("\n--- Pipeline Complete ---")
    print("You can now enter custom text to predict sentiment. Type 'exit' to quit.")
    while True:
        try:
            text = input("Enter text: ")
        except EOFError:
            break
            
        if text.lower() == 'exit':
            break
        
        # Predict with ML
        cleaned = preprocessor.clean_text(text)
        vec = trainer.tfidf_vectorizer.transform([cleaned]).toarray()
        pred_ml_encoded = ml_model.predict(vec)[0]
        pred_ml = label_encoder.inverse_transform([pred_ml_encoded])[0]
        
        # Predict with DL
        seq = trainer.tokenizer.texts_to_sequences([cleaned])
        pad_seq = pad_sequences(seq, maxlen=trainer.max_length, padding='post', truncating='post')
        pred_dl_prob = dl_model.predict(pad_seq, verbose=0)
        
        if num_classes == 2:
            pred_dl_encoded = int(pred_dl_prob[0][0] > 0.5)
        else:
            pred_dl_encoded = np.argmax(pred_dl_prob[0])
            
        pred_dl = label_encoder.inverse_transform([pred_dl_encoded])[0]
        
        print(f"Logistic Regression Prediction: {pred_ml}")
        print(f"LSTM Prediction: {pred_dl}")
        print("-" * 30)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sentiment Analysis Pipeline")
    parser.add_argument('--dataset', type=str, required=True, help='Path to the dataset file (csv, json, xlsx, txt)')
    parser.add_argument('--output_dir', type=str, default='results', help='Directory to save output results and graphs')
    args = parser.parse_args()
    
    main(args.dataset, args.output_dir)
