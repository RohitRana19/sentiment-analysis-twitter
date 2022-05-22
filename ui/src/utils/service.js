import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const service = {
  byUserId: (userId, count) => {
    return axios.get(`${base_url}id/user/${userId}/${count}`);
  },
  byScreenName: (screenName, count) => {
    return axios.get(`${base_url}screen_name/${screenName}/${count}`);
  },
  trialRun: (screenName, count) => {
    return axios.get(`${base_url}trial_run/${screenName}/${count}`);
  }
};

export default service;
