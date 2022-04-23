const axios = require('axios');

enum Method {
  // api call methods, and some comment reminder
  // get something back
  GET = 'get',
  // update something
  PUT = 'put',
  // add something new
  POST = 'post',
  // remove something old
  DELETE = 'delete',
}

const helpers = {
  //same as above, sadly we need these copies so js files can use them as part of the export.
  //No such darn thing as enums outside of this file!
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  DELETE: 'delete',
  APICall: async function (method: Method, url: string, body?: object): Promise<object> {
    if (!this.props.auth0.isAuthenticated) {
      return; // you have no right!
    }
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt: string = res.__raw;
  
    const call = {
      headers: { Authorization: `Bearer ${jwt}` },
      method: method,
      baseURL: process.env.REACT_APP_HEROKU_URL,
      url: url,
      data: body,
    };
    return await axios(call);
  },
};

module.exports = helpers;
