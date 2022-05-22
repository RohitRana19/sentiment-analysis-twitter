from tweepy import API, OAuth2BearerHandler
from dotenv import find_dotenv, load_dotenv
from utils.model import Model
import math
import time
import os

load_dotenv(find_dotenv())

auth = OAuth2BearerHandler(bearer_token=os.getenv("bearer_token"))
api = API(auth=auth)

md = Model()

# Functions for Structuring Data


def response_tweet_filter(responses):
    tweetsObj = [{
        "created_at": resp.created_at,
        "id_str": resp.id_str,
        "text": resp.text,
        "entities": resp.entities,
        "retweet_count": resp.retweet_count,
        "favorite_count": resp.favorite_count
    } for resp in responses]

    return tweetsObj


def response_user_filter(responses):
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

    return userObj


def response_filter(userObj, tweetsObj):

    respObj = {"user": userObj, "tweets": tweetsObj}

    return respObj


def tweet_extractor(respObj):
    return [tweet["text"] for tweet in respObj["tweets"]]


def tweet_influence(user, tweet, sentiment):
    followers = user["followers_count"]
    friends = user["friends_count"]
    listed = user["listed_count"]
    favorite = tweet["favorite_count"]
    retweet = tweet["retweet_count"]
    return (sentiment * math.pow(10, 8) *
            (favorite + retweet)) / (followers + friends + listed)


def response_modifier(respObj, sentiments):
    tweetObj = []
    tifs = {-1: [], 0: [], 1: []}
    date_metrics = {}
    negc, neuc, posc = 0, 0, 0
    prevDate = str(respObj["tweets"][0]["created_at"]).split(" ")[0]

    for tweet, sentiment in zip(respObj["tweets"], sentiments):
        tweet["sentiment"] = sentiment
        temp = tweet_influence(respObj["user"], tweet, sentiment)
        tweet["influence_polarity"] = temp
        tweet["influence"] = abs(temp)
        currDate = str(tweet["created_at"]).split(" ")[0]
        if currDate != prevDate:
            date_metrics[prevDate] = [posc, negc, neuc]
            prevDate = currDate
            negc, neuc, posc = 0, 0, 0

        if sentiment > 0:
            tifs[1].append(temp)
            posc += 1
        elif sentiment < 0:
            tifs[-1].append(temp)
            negc += 1
        else:
            tifs[0].append(temp)
            neuc += 1
        tweetObj.append(tweet)
    respObj["tweets"] = tweetObj
    respObj["user"]["count"] = len(tweetObj)
    negs, neus, poss = sum(tifs[-1]), sum(tifs[0]), sum(tifs[1])
    negl, neul, posl = len(tifs[-1]), len(tifs[0]), len(tifs[1])
    respObj["user"]["sum_metrics"] = [negs, neus, poss]
    respObj["user"]["len_metrics"] = [negl, neul, posl]
    respObj["user"]["date_metrics"] = date_metrics
    respObj["user"]["influence"] = (poss + negs) / (posl + negl)
    return respObj


# Functions for Flask Routes


def get_by_screen_name(screen_name, count):
    total_responses = []
    while len(total_responses) < count:
        if len(total_responses) >= 20:
            response = api.user_timeline(screen_name=screen_name,
                                         max_id=total_responses[-1]["id_str"])
        else:
            response = api.user_timeline(screen_name=screen_name)
            user = response_user_filter(response)
        total_responses += response_tweet_filter(response)[1:]
    respObj = response_filter(user, total_responses)
    sentiments = [md.output(resp) for resp in tweet_extractor(respObj)]
    response = response_modifier(respObj, sentiments)
    return response


def get_by_user_id(uid, count):
    total_responses = []
    while len(total_responses) < count:
        if len(total_responses) >= 20:
            response = api.user_timeline(user_id=uid,
                                         max_id=total_responses[-1]["id_str"])
        else:
            response = api.user_timeline(user_id=uid)
            user = response_user_filter(response)
        total_responses += response_tweet_filter(response)[1:]
    respObj = response_filter(user, total_responses)
    sentiments = [md.output(resp) for resp in tweet_extractor(respObj)]
    response = response_modifier(respObj, sentiments)
    return response
