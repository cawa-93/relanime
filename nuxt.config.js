require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV,
  },
  head: {
    title: 'Поиск связанных аниме',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Поиск связанных аниме. Найдите продолжение или предысторию вашего любимого аниме' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },

  modules: [
    '@nuxtjs/axios',
  ],
 
  axios: {
    https: process.env.NODE_ENV === 'production' // Can be also an object with default options
  },

  plugins:[
    '~/plugins/vuetify',
    '~/plugins/vue-cookie',
  ],
  build: {
    extractCSS: true,
    vendor: ['vuetify', 'vue-cookie'],
  }
}
