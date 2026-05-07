import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import pandas as pd
import numpy as np
import os

class Evaluator:
    def __init__(self, output_dir='results'):
        self.output_dir = output_dir
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

    def evaluate_model(self, y_true, y_pred, label_encoder, model_name="Model"):
        # For DL models, y_pred might be probabilities
        if len(y_pred.shape) > 1 and y_pred.shape[1] > 1:
            y_pred = np.argmax(y_pred, axis=1)
        elif len(y_pred.shape) > 1 and y_pred.shape[1] == 1:
            y_pred = (y_pred > 0.5).astype(int).flatten()

        accuracy = accuracy_score(y_true, y_pred)
        precision = precision_score(y_true, y_pred, average='weighted', zero_division=0)
        recall = recall_score(y_true, y_pred, average='weighted', zero_division=0)
        f1 = f1_score(y_true, y_pred, average='weighted', zero_division=0)
        cm = confusion_matrix(y_true, y_pred)
        
        metrics = {
            'Model': model_name,
            'Accuracy': accuracy,
            'Precision': precision,
            'Recall': recall,
            'F1-Score': f1
        }
        
        print(f"\n--- {model_name} Evaluation ---")
        print(f"Accuracy:  {accuracy:.4f}")
        print(f"Precision: {precision:.4f}")
        print(f"Recall:    {recall:.4f}")
        print(f"F1-Score:  {f1:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_true, y_pred, target_names=label_encoder.classes_))
        
        # Save metrics to CSV
        pd.DataFrame([metrics]).to_csv(os.path.join(self.output_dir, f"{model_name}_metrics.csv"), index=False)
        
        # Plot Confusion Matrix
        self.plot_confusion_matrix(cm, label_encoder.classes_, model_name)
        
        return metrics

    def plot_confusion_matrix(self, cm, classes, model_name):
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=classes, yticklabels=classes)
        plt.title(f'Confusion Matrix - {model_name}')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, f"{model_name}_confusion_matrix.png"))
        plt.close()

    def plot_loss_vs_epoch(self, history, model_name="DL_Model"):
        if history is None:
            return
            
        plt.figure(figsize=(12, 5))
        
        plt.subplot(1, 2, 1)
        plt.plot(history.history['loss'], label='Train Loss')
        plt.plot(history.history['val_loss'], label='Val Loss')
        plt.title(f'{model_name} Loss vs Epoch')
        plt.xlabel('Epochs')
        plt.ylabel('Loss')
        plt.legend()
        
        plt.subplot(1, 2, 2)
        plt.plot(history.history['accuracy'], label='Train Accuracy')
        plt.plot(history.history['val_accuracy'], label='Val Accuracy')
        plt.title(f'{model_name} Accuracy vs Epoch')
        plt.xlabel('Epochs')
        plt.ylabel('Accuracy')
        plt.legend()
        
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, f"{model_name}_training_history.png"))
        plt.close()

    def plot_sentiment_distribution(self, df, label_col='label'):
        # Bar chart
        plt.figure(figsize=(8, 6))
        sns.countplot(data=df, x=label_col, palette='viridis', hue=label_col, legend=False)
        plt.title('Sentiment Distribution (Bar Chart)')
        plt.xlabel('Sentiment')
        plt.ylabel('Count')
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, "sentiment_distribution_bar.png"))
        plt.close()
        
        # Pie chart
        plt.figure(figsize=(8, 8))
        df[label_col].value_counts().plot.pie(autopct='%1.1f%%', cmap='viridis')
        plt.title('Sentiment Distribution (Pie Chart)')
        plt.ylabel('')
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, "sentiment_distribution_pie.png"))
        plt.close()

    def plot_model_comparison(self, metrics_list):
        if not metrics_list:
            return
        df_metrics = pd.DataFrame(metrics_list)
        df_melted = df_metrics.melt(id_vars='Model', var_name='Metric', value_name='Score')
        
        plt.figure(figsize=(10, 6))
        sns.barplot(data=df_melted, x='Metric', y='Score', hue='Model')
        plt.title('Model Performance Comparison')
        plt.ylim(0, 1.1)
        plt.legend(loc='lower right')
        plt.tight_layout()
        plt.savefig(os.path.join(self.output_dir, "model_comparison.png"))
        plt.close()

        df_metrics.to_csv(os.path.join(self.output_dir, "all_models_metrics_summary.csv"), index=False)
