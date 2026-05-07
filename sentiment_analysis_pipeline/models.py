from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout

def get_ml_model(model_type='logistic_regression'):
    if model_type == 'logistic_regression':
        return LogisticRegression(max_iter=1000)
    elif model_type == 'naive_bayes':
        return MultinomialNB()
    else:
        raise ValueError("Unsupported ML model type. Choose 'logistic_regression' or 'naive_bayes'.")

def get_dl_model(vocab_size, num_classes, embedding_dim=128, max_length=100):
    model = Sequential()
    # input_length is generally handled differently in recent keras, but we can pass it to Embedding
    model.add(Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=max_length))
    model.add(LSTM(64, return_sequences=True))
    model.add(Dropout(0.5))
    model.add(LSTM(32))
    model.add(Dropout(0.5))
    
    if num_classes == 2:
        # Binary classification
        model.add(Dense(1, activation='sigmoid'))
        model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    else:
        # Multi-class classification
        model.add(Dense(num_classes, activation='softmax'))
        model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        
    return model
