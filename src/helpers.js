// import axios from 'axios';
const axios = require('axios');

const helpers = {};

// api call methods, and some comment reminder
// get something back
helpers.GET = 'get';
// update something
helpers.PUT = 'put';
// add something new
helpers.POST = 'post';
// remove something old
helpers.DELETE = 'delete';

helpers.APICall = async function (method, url, body) {
  if (!this.props.auth0.isAuthenticated) {
    return; // you have no right!
  }
  const res = await this.props.auth0.getIdTokenClaims();
  const jwt = res.__raw;

  const call = {
    headers: { Authorization: `Bearer ${jwt}` },
    method: method,
    baseURL: process.env.REACT_APP_HEROKU_URL,
    url: url,
    data: body,
  };
  return await axios(call);
};

module.exports = helpers;
