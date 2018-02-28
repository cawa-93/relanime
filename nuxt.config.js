module.exports = {
  /*
  ** Headers of the page
  */
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

  /*
  ** Add axios globally
  */
  plugins:[
    '~/plugins/vuetify',
    '~/plugins/vue-cookie',
    '~/plugins/vue-async-computed',
  ],
  build: {
    vendor: ['axios', 'vuetify', 'vue-cookie', 'vue-async-computed'],
  }
}
