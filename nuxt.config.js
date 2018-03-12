module.exports = {
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
		'@nuxtjs/pwa',
		'@nuxtjs/axios',
		'cookie-universal-nuxt'
	],

	serverMiddleware: [
		'~/server/shiki-proxy.js'
	],

	plugins: [
		'~/plugins/vuetify'
	]
}
