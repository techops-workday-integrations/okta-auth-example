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
  url: 'https://stg.api.thoughtworks.net/echo',//use this when you need to know the status of Platform API server
  // url: 'https://stg.api.thoughtworks.net/timecard-service/timecards?startDate=2019-02-11&endDate=2019-02-24&payrollCountry=United%20States&page=1',//use this when you need to know the Time card API service is working or not
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => response.data);

getAccessToken()
.then(echo) // comment this line if you need to get the Bearer token displayed on screen
.then(console.log)
.catch(console.error);