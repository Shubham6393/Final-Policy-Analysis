import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

class Trainer:
    def __init__(self, max_features=5000, max_length=100):
        self.max_features = max_features
        self.max_length = max_length
        self.tfidf_vectorizer = TfidfVectorizer(max_features=max_features)
        self.tokenizer = Tokenizer(num_words=max_features, oov_token='<OOV>')
        
    def prepare_ml_data(self, df):
        X = self.tfidf_vectorizer.fit_transform(df['cleaned_text']).toarray()
        y = df['label_encoded'].values
        return train_test_split(X, y, test_size=0.2, random_state=42)
        
    def prepare_dl_data(self, df):
        self.tokenizer.fit_on_texts(df['cleaned_text'])
        sequences = self.tokenizer.texts_to_sequences(df['cleaned_text'])
        X = pad_sequences(sequences, maxlen=self.max_length, padding='post', truncating='post')
        y = df['label_encoded'].values
        return train_test_split(X, y, test_size=0.2, random_state=42)
        
    def train_ml_model(self, model, X_train, y_train):
        model.fit(X_train, y_train)
        return model
        
    def train_dl_model(self, model, X_train, y_train, X_test, y_test, epochs=5, batch_size=32):
        history = model.fit(
            X_train, y_train,
            validation_data=(X_test, y_test),
            epochs=epochs,
            batch_size=batch_size,
            verbose=1
        )
        return model, history

    def save_artifacts(self, model, label_encoder, model_type, model_path='model.pkl', artifacts_path='artifacts.pkl'):
        if model_type == 'ml':
            with open(model_path, 'wb') as f:
                pickle.dump(model, f)
            with open(artifacts_path, 'wb') as f:
                pickle.dump({'tfidf': self.tfidf_vectorizer, 'label_encoder': label_encoder}, f)
        elif model_type == 'dl':
            # Save Keras model in h5 format
            model.save(model_path.replace('.pkl', '.h5'))
            with open(artifacts_path, 'wb') as f:
                pickle.dump({'tokenizer': self.tokenizer, 'max_length': self.max_length, 'label_encoder': label_encoder}, f)
