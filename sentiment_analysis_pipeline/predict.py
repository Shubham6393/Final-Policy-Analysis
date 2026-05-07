import os
import pickle
import numpy as np
import warnings
# Suppress TensorFlow logging to keep the console clean
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warnings.filterwarnings('ignore')

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from preprocessor import Preprocessor

def load_saved_models():
    print("Loading saved models and artifacts...")
    
    # Load ML Model & Artifacts
    with open('saved_models/ml_model.pkl', 'rb') as f:
        ml_model = pickle.load(f)
    with open('saved_models/ml_artifacts.pkl', 'rb') as f:
        ml_artifacts = pickle.load(f)
        
    tfidf = ml_artifacts['tfidf']
    ml_label_encoder = ml_artifacts['label_encoder']
    
    # Load DL Model & Artifacts
    dl_model = load_model('saved_models/dl_model.h5')
    with open('saved_models/dl_artifacts.pkl', 'rb') as f:
        dl_artifacts = pickle.load(f)
        
    tokenizer = dl_artifacts['tokenizer']
    max_length = dl_artifacts['max_length']
    dl_label_encoder = dl_artifacts['label_encoder']
    
    return (ml_model, tfidf, ml_label_encoder), (dl_model, tokenizer, max_length, dl_label_encoder)

def predict_interactive():
    try:
        ml_components, dl_components = load_saved_models()
    except Exception as e:
        print(f"Error loading models. Are you sure they are trained and saved in 'saved_models'? Details: {e}")
        return
        
    ml_model, tfidf, ml_label_encoder = ml_components
    dl_model, tokenizer, max_length, dl_label_encoder = dl_components
    
    preprocessor = Preprocessor(apply_stemming=False)
    num_classes = len(dl_label_encoder.classes_)
    
    print("\n" + "="*50)
    print("--- Interactive Sentiment Prediction Ready ---")
    print("Type 'exit' to quit.")
    print("="*50 + "\n")
    
    while True:
        try:
            text = input("Enter text to analyze: ")
        except (EOFError, KeyboardInterrupt):
            print("\nExiting...")
            break
            
        if text.lower() == 'exit':
            break
        
        if not text.strip():
            continue
            
        # Clean text
        cleaned = preprocessor.clean_text(text)
        if not cleaned:
            print("  [Warning] Text is empty after removing stopwords/punctuation.")
            continue
            
        # --- ML Prediction ---
        vec = tfidf.transform([cleaned]).toarray()
        pred_ml_encoded = ml_model.predict(vec)[0]
        pred_ml = ml_label_encoder.inverse_transform([pred_ml_encoded])[0]
        
        # --- DL Prediction ---
        seq = tokenizer.texts_to_sequences([cleaned])
        pad_seq = pad_sequences(seq, maxlen=max_length, padding='post', truncating='post')
        pred_dl_prob = dl_model.predict(pad_seq, verbose=0)
        
        if num_classes == 2:
            pred_dl_encoded = int(pred_dl_prob[0][0] > 0.5)
        else:
            pred_dl_encoded = np.argmax(pred_dl_prob[0])
            
        pred_dl = dl_label_encoder.inverse_transform([pred_dl_encoded])[0]
        
        # Output results
        print(f"\n  -> Logistic Regression : {pred_ml.upper()}")
        print(f"  -> LSTM (Deep Learning): {pred_dl.upper()}")
        print("-" * 50 + "\n")

if __name__ == "__main__":
    if not os.path.exists('saved_models'):
        print("Could not find 'saved_models' directory. Please run main.py to train models first.")
    else:
        predict_interactive()
