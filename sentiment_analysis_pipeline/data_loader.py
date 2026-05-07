import pandas as pd
import os

class DataLoader:
    def __init__(self, text_column_keywords=None, label_column_keywords=None):
        if text_column_keywords is None:
            self.text_column_keywords = ['text', 'review', 'sentence', 'tweet', 'content', 'message']
        else:
            self.text_column_keywords = text_column_keywords
            
        if label_column_keywords is None:
            self.label_column_keywords = ['label', 'sentiment', 'target', 'class', 'score', 'rating']
        else:
            self.label_column_keywords = label_column_keywords

    def load_data(self, file_path):
        """Loads data based on the file format and normalizes columns."""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
            
        ext = os.path.splitext(file_path)[1].lower()
        
        try:
            if ext == '.csv':
                df = pd.read_csv(file_path)
            elif ext in ['.xls', '.xlsx']:
                df = pd.read_excel(file_path)
            elif ext == '.json':
                df = pd.read_json(file_path)
            elif ext == '.txt':
                # Assume tab-separated or try comma-separated if error
                try:
                    df = pd.read_csv(file_path, sep='\t')
                    if df.shape[1] < 2:
                        df = pd.read_csv(file_path, sep=',')
                except:
                    df = pd.read_csv(file_path, sep=',')
            else:
                raise ValueError(f"Unsupported file format: {ext}")
                
            return self._normalize_columns(df)
            
        except Exception as e:
            raise Exception(f"Error loading file {file_path}: {str(e)}")

    def _normalize_columns(self, df):
        """Finds and renames the input and target columns to 'text' and 'label'."""
        df_lower_cols = {col: str(col).lower() for col in df.columns}
        
        text_col = None
        for col, lower_col in df_lower_cols.items():
            if any(keyword in lower_col for keyword in self.text_column_keywords):
                text_col = col
                break
                
        label_col = None
        for col, lower_col in df_lower_cols.items():
            if any(keyword in lower_col for keyword in self.label_column_keywords):
                label_col = col
                break
                
        if text_col is None or label_col is None:
            print(f"Could not automatically detect text and/or label columns. Found columns: {list(df.columns)}.")
            if 'text' not in df.columns or 'label' not in df.columns:
                print("Defaulting to first column as 'text' and second as 'label'.")
                text_col = df.columns[0]
                label_col = df.columns[1]
            
        # Rename columns and keep only the necessary ones
        df = df.rename(columns={text_col: 'text', label_col: 'label'})
        return df[['text', 'label']]
