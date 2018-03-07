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
    ],
    script: [
      {src: 'https://use.fontawesome.com/releases/v5.0.8/js/all.js', defer: true}
    ]
  },

  loading: '~/components/loading.vue',

  plugins:[
    '~/plugins/vuetify',
    '~/plugins/vue-cookie',
    '~/plugins/vue-infinite-scroll',
  ],

  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics'],
    ['@nuxtjs/google-adsense'],
  ],

 'google-analytics': {
    id: 'UA-114783379-1'
  },
  'google-adsense': {
    id: 'ca-pub-4115206962507729',
    pageLevelAds: true,
    analyticsUacct: 'UA-114783379-1',
    analyticsDomainName: 'search-sequels.herokuapp.com'
  },

  build: {
    extractCSS: true,
    vendor: ['vuetify', 'vue-cookie', 'vue-infinite-scroll'],
    extend (config, { isDev }) {
      if (isDev) {
        config.devtool = (isDev ? 'eval-source-map' : false)
      }
    }
  },
}
