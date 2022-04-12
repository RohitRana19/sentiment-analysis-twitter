import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const service = {
  byUserId: (userId, count) => {
    return axios.get(`${base_url}id/user/${userId}/${count}`);
  },
  byScreenName: (screenName, count) => {
    return axios.get(`${base_url}screen_name/${screenName}/${count}`);
  },

  byTweetId: (tweetId) => {
    return axios.get(`${base_url}id/user/${tweetId}`);
  },
};

export default service;
