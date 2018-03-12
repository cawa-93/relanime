require('dotenv').config()

module.exports = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV
  },
  /*
  ** Build configuration
  */
	build: {
		babel: {
			'plugins': ['transform-async-generator-functions']
		}
	},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
	head: {},
	css: [
		'node_modules/material-design-icons/iconfont/material-icons.css'
	],
  /*
  ** Customize the progress-bar color
  */
	loading: { color: '#3B8070' },
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
		['@nuxtjs/pwa', { icon: false, oneSignal: false, workbox: false }],
		'@nuxtjs/axios',
		'cookie-universal-nuxt',
    ['@nuxtjs/google-tag-manager', {id: 'GTM-56KN3GC'}],
	],

	serverMiddleware: [
    '~/server/shiki-proxy.js',
		'~/server/login-handler.js',
	],

	plugins: [
		'~/plugins/vuetify'
	]
}
