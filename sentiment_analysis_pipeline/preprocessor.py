import re
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download necessary NLTK data (quietly)
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

class Preprocessor:
    def __init__(self, apply_stemming=False):
        self.label_encoder = LabelEncoder()
        self.apply_stemming = apply_stemming
        try:
            self.stop_words = set(stopwords.words('english'))
        except:
            self.stop_words = set()
        self.stemmer = PorterStemmer()

    def clean_text(self, text):
        if pd.isna(text):
            return ""
        # Convert to lowercase
        text = str(text).lower()
        # Remove special characters and punctuation
        text = re.sub(r'[^a-z0-9\s]', '', text)
        # Tokenization & remove stopwords
        tokens = text.split()
        if self.stop_words:
            tokens = [word for word in tokens if word not in self.stop_words]
        
        # Lemmatization/Stemming
        if self.apply_stemming:
            tokens = [self.stemmer.stem(word) for word in tokens]
            
        return ' '.join(tokens)

    def preprocess(self, df):
        # Handle missing/null values
        df = df.dropna(subset=['text', 'label']).copy()
        
        # Clean text
        df['cleaned_text'] = df['text'].apply(self.clean_text)
        
        # Remove empty texts after cleaning
        df = df[df['cleaned_text'].str.strip().astype(bool)]
        
        # Encode labels into numeric format
        df['label_encoded'] = self.label_encoder.fit_transform(df['label'].astype(str))
        
        return df, self.label_encoder
