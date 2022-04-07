from tweepy import API, OAuth2BearerHandler
from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

auth = OAuth2BearerHandler(bearer_token=os.getenv("bearer_token"))
api = API(auth=auth)


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

    respArr = [{
        "created_at": resp.created_at,
        "id_str": resp.id_str,
        "text": resp.text,
        "entities": resp.entities,
        "retweet_count": resp.retweet_count,
        "favorite_count": resp.favorite_count
    } for resp in responses]

    respObj = {"user": userObj, "tweets": respArr}

    return respObj


def get_by_screen_name(screen_name, count):
    global api

    responses = api.user_timeline(screen_name=screen_name, count=count)
    return response_filter(responses)


def get_by_user_id(uid, count):
    global api

    responses = api.user_timeline(user_id=uid, count=count)
    return response_filter(responses)


def get_by_tweet_id(tid):
    global api

    response = api.get_status(id=tid, include_entities=True)
    return response_filter([response])