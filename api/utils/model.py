from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.tag import pos_tag
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import nltk
import pandas as pd
import pickle
import re

# nltk library data download

nltk_dir = "./static/nltk_data"

nltk.data.path = [nltk_dir]

with open("./static/model_data/svcmodel.pkl", "rb") as f:
    trained_model = pickle.load(f)

with open("./static/model_data/feature_vector.pkl", "rb") as f:
    feat_vec = pickle.load(f)

nltk.download('punkt', download_dir=nltk_dir)
nltk.download('wordnet', download_dir=nltk_dir)
nltk.download('omw-1.4', download_dir=nltk_dir)
nltk.download('averaged_perceptron_tagger', download_dir=nltk_dir)
nltk.download('stopwords', download_dir=nltk_dir)

# Processiong Pipeline


class Pipeline:

    def __init__(self, autoFlush=True):
        self.__pipe = []
        self.__pipe_dict = {}
        self.__pipe_output = {}
        self.__final_output = ""
        self.__autoFlush = autoFlush

    def show_pipe(self):
        return [func.__name__ for func in self.__pipe]

    def pipe_output(self):
        return self.__pipe_output

    def output(self):
        return self.__final_output

    def method(self, name):
        try:
            return self.__pipe_dict[name]
        except:
            print(f"No such method: '{name}'")

    def add(self, func):
        self.__pipe.append(func)
        self.__pipe_dict[func.__name__] = func
        return self

    def remove(self):
        value = self.__pipe.pop()
        del self.__pipe_dict[value.__name__]
        return self.show_pipe(), value.__name__

    def empty(self):
        self.__pipe = []
        self.__pipe_dict = {}
        return self

    def flush(self):
        self.__pipe_output = {}
        return self

    def process(self, text):
        f_input = text
        for func in self.__pipe:
            f_output = func(f_input)
            f_input = f_output
        self.__final_output = f_output
        if not self.__autoFlush:
            self.__pipe_output[func.__name__] = f_output
        return self


# Processing Functions


def sentence_tokenizer(text: str) -> list:
    sentences = sent_tokenize(text)
    return sentences


def word_tokenizer(sentences: list) -> list:
    words = [word_tokenize(sentence) for sentence in sentences]
    return words


def cleaner(sent_list: list) -> list:
    clean_token_list = [[
        clean_token.lower() for token in token_list
        if len(clean_token := re.sub(r"[^\w\s]", "", token)) > 0
    ] for token_list in sent_list]
    return clean_token_list


def tagger(sent_list: list) -> list:
    tagged_list = [pos_tag(token_list) for token_list in sent_list]
    return tagged_list


def lemmatizer(sent_list: list) -> list:
    lemma_list = []
    lem = WordNetLemmatizer()

    for token_list in sent_list:
        temp_list = []
        for token, tag in token_list:
            wtag = tag[0].lower()
            if wtag in ['a', 'r', 'n', 'v']: lemma = lem.lemmatize(token, wtag)
            else: lemma = token
            temp_list.append(lemma)
        lemma_list.append(temp_list)
    return lemma_list


def stopwords_remover(sent_list: list) -> list:
    clean_list = [[
        token for token in token_list
        if token not in stopwords.words("english")
    ] for token_list in sent_list]

    return clean_list


def list_flattener(sent_list: list) -> list:
    flat_list = [token for token_list in sent_list for token in token_list]
    return flat_list


# Analysis Functions


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


# Model Class


class Model:

    def __init__(self):
        self.pipeline = Pipeline()
        self.pipeline.add(sentence_tokenizer).add(word_tokenizer).add(
            cleaner).add(tagger).add(lemmatizer).add(stopwords_remover)

    def predict(self, text):
        output = self.pipeline.process(text).output()


'''
CC coordinating conjunction 
CD cardinal digit 
DT determiner 
EX existential there (like: “there is” … think of it like “there exists”) 
FW foreign word 
IN preposition/subordinating conjunction 
JJ adjective – ‘big’ 
JJR adjective, comparative – ‘bigger’ 
JJS adjective, superlative – ‘biggest’ 
LS list marker 1) 
MD modal – could, will 
NN noun, singular ‘- desk’ 
NNS noun plural – ‘desks’ 
NNP proper noun, singular – ‘Harrison’ 
NNPS proper noun, plural – ‘Americans’ 
PDT predeterminer – ‘all the kids’ 
POS possessive ending parent’s 
PRP personal pronoun –  I, he, she 
PRP$ possessive pronoun – my, his, hers 
RB adverb – very, silently, 
RBR adverb, comparative – better 
RBS adverb, superlative – best 
RP particle – give up 
TO – to go ‘to’ the store. 
UH interjection – errrrrrrrm 
VB verb, base form – take 
VBD verb, past tense – took 
VBG verb, gerund/present participle – taking 
VBN verb, past participle – taken 
VBP verb, sing. present, non-3d – take 
VBZ verb, 3rd person sing. present – takes 
WDT wh-determiner – which 
WP wh-pronoun – who, what 
WP$ possessive wh-pronoun, eg- whose 
WRB wh-adverb, eg- where, when
'''