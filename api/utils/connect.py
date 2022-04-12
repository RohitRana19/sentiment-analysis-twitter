from tweepy import API, OAuth2BearerHandler
from dotenv import find_dotenv, load_dotenv
from utils.model import sentiment_analyzer
import time
import os

load_dotenv(find_dotenv())

auth = OAuth2BearerHandler(bearer_token=os.getenv("bearer_token"))
api = API(auth=auth)

# Functions for Structuring Data


def response_filter(responses):

    user = responses[0].user

    userObj = {
        "id_str": user.id_str,
        "name": user.name,
        "screen_name": user.screen_name,
        "location": user.location,
        "description": user.description,
        "followers_count": user.followers_count,
        "friends_count": user.friends_count,
        "favourites_count": user.favourites_count,
        "listed_count": user.listed_count,
        "created_at": user.created_at,
        "verified": user.verified,
        "statuses_count": user.statuses_count,
        "profile_background_image_url_https":
        user.profile_background_image_url_https,
        "profile_image_url": user.profile_image_url,
        "entities": user.entities
    }

    tweetsObj = [{
        "created_at": resp.created_at,
        "id_str": resp.id_str,
        "text": resp.full_text,
        "entities": resp.entities,
        "retweet_count": resp.retweet_count,
        "favorite_count": resp.favorite_count
    } for resp in responses]

    respObj = {"user": userObj, "tweets": tweetsObj}

    return respObj


def tweet_extracter(respObj):
    return [tweet["text"] for tweet in respObj["tweets"]]


def response_modifier(respObj, sentiments, influence_score=0):
    respObj["user"]["influence"] = influence_score
    tweetObj = []
    for tweet, sentiment in zip(respObj["tweets"], sentiments):
        tweet["sentiment"] = int(sentiment)
        tweetObj.append(tweet)
    respObj["tweets"] = tweetObj
    return respObj


# Functions for Flask Routes


def get_by_screen_name(screen_name, count):
    response = api.user_timeline(screen_name=screen_name,
                                 count=count,
                                 tweet_mode="extended")
    time.sleep(1)
    respObj = response_filter(response)
    sentiments = sentiment_analyzer(tweet_extracter(respObj))
    response = response_modifier(respObj, sentiments, 50)
    return response


def get_by_user_id(uid, count):
    response = api.user_timeline(user_id=uid, count=count)
    time.sleep(1)
    respObj = response_filter(response)
    sentiments = sentiment_analyzer(tweet_extracter(respObj))
    response = response_modifier(respObj, sentiments, 50)
    return response


def get_by_tweet_id(tid):
    response = api.get_status(id=tid, include_entities=True)
    time.sleep(1)
    respObj = response_filter([response])
    sentiments = sentiment_analyzer(tweet_extracter(respObj))
    response = response_modifier(respObj, sentiments, 50)
    return response
