'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Поиск продолжения аниме',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Быстрый поиск продолжения аниме'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      },
      {
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
        rel: 'stylesheet'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources'),
  plugins: [
    '~/plugins/vuetify.js',
  ],
  modules: [
    ['@nuxtjs/google-analytics'],
    ['@nuxtjs/google-adsense']
  ],

 'google-analytics': {
    id: 'UA-114783379-1'
  },
  'google-adsense': {
    id: 'ca-pub-4115206962507729',
    pageLevelAds: true,
    analyticsUacct: 'UA-114783379-1',
    analyticsDomainName: 'search-sequels.herokuapp.com'
  }
}
