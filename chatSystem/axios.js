const axios = require('axios');
const {backendAPI} = require('../src/fetch.js');

const baseENDPOINT = axios.create({baseURL :backendAPI});

module.exports = baseENDPOINT;