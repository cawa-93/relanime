module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',

  head: {
    title: 'Поиск',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Поиск схожих аниме' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },

  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', {only: ['CLIENT_ID', 'REDIRECT_URI']}],
  ],

  /*
  ** Add axios globally
  */
  plugins:[
    '~/plugins/vuetify',
    '~/plugins/vue-cookie',
  ],
  build: {
    vendor: ['vuetify', 'vue-cookie'],
  }
}
