import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from predict import load_saved_models
from preprocessor import Preprocessor

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js

print("Initializing API Server...")
# Load models globally so they don't reload on every request
ml_components, dl_components = load_saved_models()
ml_model, tfidf, ml_label_encoder = ml_components
dl_model, tokenizer, max_length, dl_label_encoder = dl_components
preprocessor = Preprocessor(apply_stemming=False)
num_classes = len(dl_label_encoder.classes_)

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Ensure VADER lexicon is downloaded for real-world NLP analysis
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

sia = SentimentIntensityAnalyzer()

def generate_explanation(text, sentiment, confidence):
    """Generate a dynamic, highly-aligned explanation based on the actual policy text."""
    # Extract the core theme from the first substantial sentence
    sentences = [s.strip() for s in text.split('.') if len(s.strip()) > 10]
    core_theme = sentences[0][:80] + "..." if sentences else "this proposed initiative"
    
    text_lower = text.lower()
    keywords = {
        'financial costs and taxes': ['tax', 'cost', 'expensive', 'money', 'budget', 'fund', 'economy'],
        'environmental impact': ['green', 'climate', 'pollution', 'energy', 'environment', 'sustainability', 'eco'],
        'community welfare': ['public', 'community', 'people', 'social', 'welfare', 'health', 'education'],
        'regulations and compliance': ['law', 'rule', 'ban', 'restrict', 'mandate', 'enforce', 'regulate']
    }
    
    found_topics = []
    for topic, words in keywords.items():
        if any(word in text_lower for word in words):
            found_topics.append(topic)
            
    topic_str = f" its impact on {', '.join(found_topics)}" if found_topics else " its general provisions"
    
    if sentiment == 'positive':
        return f"This policy is predicted to be Accepted. The core focus on '{core_theme}' resonates positively with the public. Sentiment analysis indicates strong favorable reactions regarding{topic_str}. Citizens believe the long-term benefits strongly outweigh any initial concerns."
        
    elif sentiment == 'negative':
        return f"This policy is likely to be Rejected. Our NLP analysis shows a distinctly negative public reaction towards '{core_theme}'. Specifically, concerns regarding{topic_str} are driving significant resistance. Re-evaluating these key provisions is highly recommended."
        
    else:
        return f"This policy currently stands in a Neutral situation. The public's stance on '{core_theme}' is ambivalent or divided. While there is interest in{topic_str}, citizens require more clarity, better communication, or policy adjustments to fully support it."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Domain Validation: Ensure it's actually a policy
    text_lower = text.lower()
    policy_keywords = [
        'policy', 'government', 'law', 'regulation', 'tax', 'community', 
        'public', 'act', 'bill', 'initiative', 'fund', 'budget', 'citizen',
        'health', 'education', 'infrastructure', 'compliance', 'mandate',
        'state', 'federal', 'municipal', 'council', 'ordinance', 'amendment',
        'reform', 'proposal', 'committee', 'rule', 'ban', 'restrict', 'program'
    ]
    
    is_policy = any(word in text_lower for word in policy_keywords)
    
    if not is_policy:
        return jsonify({
            'sentiment': 'Neutral',
            'confidence': 0.0,
            'explanation': "Domain Error: This text does not appear to be a government policy or legislative document. Please submit text related to laws, regulations, public initiatives, or government programs to receive a valid sentiment analysis.",
            'raw_prediction': 'out_of_domain'
        })

    # NLP Prediction using VADER for robust real-world sentiment analysis
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    
    # Map compound score (-1.0 to 1.0) to sentiments and realistic confidence percentages
    if compound >= 0.15:
        pred_ml = 'positive'
        confidence = 50 + (compound * 50)  # Maps to 57.5% - 100%
    elif compound <= -0.15:
        pred_ml = 'negative'
        confidence = 50 + (abs(compound) * 50) # Maps to 57.5% - 100%
    else:
        pred_ml = 'neutral'
        # For neutral, confidence is how close it is to 0 (the closer to 0, the more confident it is neutral)
        confidence = 100 - (abs(compound) * 333)
        confidence = max(50.0, min(100.0, confidence))
        
    # Map to UI Expected Values
    sentiment_map = {
        'positive': 'Yes',
        'negative': 'No',
        'neutral': 'Neutral'
    }
    
    ui_sentiment = sentiment_map.get(pred_ml, 'Neutral')
    explanation = generate_explanation(text, pred_ml, confidence)
    
    return jsonify({
        'sentiment': ui_sentiment,
        'confidence': round(confidence, 1),
        'explanation': explanation,
        'raw_prediction': pred_ml
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
