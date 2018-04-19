'use strict';
const axios = require('axios')

const getAccessToken = () => axios({
  method: 'POST',
  url: `${process.env.OKTA_URL}/oauth2/${process.env.OKTA_AUTH_SERVER_ID}/v1/token`,
  auth: {
    username: process.env.OKTA_CLIENT_ID,
    password: process.env.OKTA_CLIENT_SECRET
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  params: {
    grant_type: 'client_credentials',
    scope: 'api'
  }
})
.then(response => response.data.access_token);

const echo = token => axios({
  method: 'GET',
  url: 'https://stg.api.thoughtworks.net/echo',
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => response.data);

getAccessToken()
.then(echo)
.then(console.log)
.catch(console.error);