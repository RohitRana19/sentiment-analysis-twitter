from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import pickle
import nltk
import re

nltk_dir = "./static/nltk_data"

nltk.data.path = [nltk_dir]

with open("./static/model_data/svcmodel.pkl", "rb") as f:
    trained_model = pickle.load(f)

with open("./static/model_data/feature_vector.pkl", "rb") as f:
    feat_vec = pickle.load(f)

nltk.download('punkt', download_dir=nltk_dir)
nltk.download('wordnet', download_dir=nltk_dir)
nltk.download('omw-1.4', download_dir=nltk_dir)


class Pipeline:

    def __init__(self, autoFlush=True):
        self.pipe = []
        self.pipe_output = {}
        self.final_output = ""
        self.data_list = []
        self.autoFlush = autoFlush

    def show(self):
        return [func.__name__ for func in self.pipe]

    def show_processed(self):
        return self.pipe_output

    def add(self, func):
        self.pipe.append(func)
        return self

    def remove(self):
        value = self.pipe.pop()
        return self.show(), value

    def flush(self):
        self.data_list = []
        return True

    def process(self, text):
        f_input = text
        for func in self.pipe:
            f_output = func(f_input)
            self.pipe_output[func.__name__] = f_output
            f_input = f_output
        self.final_output = f_output
        if not self.autoFlush:
            self.data_list.append(self.final_output)
        return self.final_output


def cleaner(text: str) -> str:
    res = re.sub(r'[^\w\s]', '', text)
    res = re.sub('[0-9]+', '', res)
    res = re.sub(r'\w+:\/{2}[\d\w-]+(\.[\d\w-]+)*(?:(?:\/[^\s/]*))*', ' ', res)
    res = res.lower()
    return res


def tokenizer(text: str) -> list:
    return nltk.word_tokenize(text)


def lemmatizer(data: list) -> list:
    lm = nltk.WordNetLemmatizer()
    text = [lm.lemmatize(word) for word in data]
    return text


def save_feature_vector(data_list, dir_path="./static/model_data"):
    vec = TfidfVectorizer(ngram_range=(1, 2), max_features=500000).fit(
        pd.Series(data=data_list).astype(str))

    with open(f"{dir_path}/feature_vector.pkl", "wb") as f:
        pickle.dump(vec, f)

    return True


def vectorizer(data_list):
    global feat_vec
    data = pd.Series(data=data_list).astype(str)
    return feat_vec.transform(data)


def sentiment_analyzer(data_list):
    global trained_model
    transformed_data = vectorizer(data_list)
    predicted = trained_model.predict(transformed_data)
    output = predicted.tolist()
    return output
