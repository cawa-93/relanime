require('dotenv').config()

module.exports = {
	env: {
		NAME: 'Поиск аниме',
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URI,
		NODE_ENV: process.env.NODE_ENV
	},
  /*
  ** Build configuration
  */
	build: {
		extractCSS: true,
		analyze: {
			analyzerMode: 'static'
		},
		babel: {
			plugins: [
				'transform-async-generator-functions'
			]
		},
		vendor: [
			'~/plugins/vuetify',
			'~/plugins/axios'
		]
	},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
	head: {
		title: 'Поиск аниме'
	},
	css: [
		'node_modules/material-design-icons/iconfont/material-icons.css'
	],
  /*
  ** Customize the progress-bar color
  */
	loading: '~/components/progress-linear.vue',
  /*
  ** Customize app manifest
  */
	manifest: {
		theme_color: '#3B8070'
	},
  /*
  ** Modules
  */
	modules: [
		'@nuxtjs/pwa',
		'cookie-universal-nuxt',
    ['@nuxtjs/google-tag-manager', {id: 'GTM-56KN3GC'}]
	],

	serverMiddleware: [
		'~/server/shiki-proxy.js',
		'~/server/login-handler.js'
	],

	plugins: [
		'~/plugins/vuetify'
	],


  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://shikimori.org/.*',
        handler: 'cacheFirst',
        method: 'GET'
      },
      {
        urlPattern: '/shiki/.*',
        handler: 'networkFirst',
        method: 'GET'
      },
    ]
  },

}
