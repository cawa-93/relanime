const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://shikimori.org/',
  headers: {'User-Agent': 'Find Sequel'}
});
