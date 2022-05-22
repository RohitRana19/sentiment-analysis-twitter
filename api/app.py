from flask import Flask
from flask_cors import CORS
from utils.connect import *

app = Flask(__name__)

CORS(app)


@app.route("/trial_run/<name>/<int:count>")
def trial_run(name, count):
    return get_from_trial(name, count)

@app.route("/screen_name/<name>/<int:count>")
def by_screen_name(name, count):
    return get_by_screen_name(name, count)


@app.route("/id/user/<uid>/<int:count>")
def by_user_id(uid, count):
    return get_by_user_id(uid, count)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", threaded=True)
