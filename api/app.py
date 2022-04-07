from flask import Flask
from flask_cors import CORS
from utils.connect import *

app = Flask(__name__)

CORS(app)


@app.route("/screen_name/<name>/<count>")
def by_screen_name(name, count):
    return get_by_screen_name(name, count)


@app.route("/id/user/<uid>/<count>")
def by_user_id(uid, count):
    return get_by_user_id(uid, count)


@app.route("/id/tweet/<tid>")
def by_tweet_id(tid):
    return get_by_tweet_id(tid)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
