require('dotenv').config()

module.exports = {
	env: {
		NAME: 'Поиск cвязанных аниме',
		CLIENT_ID: process.env.CLIENT_ID,
		REDIRECT_URI: process.env.REDIRECT_URI,
		NODE_ENV: process.env.NODE_ENV,
	},
  /*
  ** Build configuration
  */
	build: {
		extractCSS: true,
		analyze: {
			analyzerMode: 'static',
		},
		babel: {
			plugins: ['lodash'],
		},
		vendor: [
			'~/plugins/vuetify',
			'~/plugins/axios',
			'~/plugins/install-banner-event',
		],
	},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
	head: {
		title: 'Поиск cвязанных аниме',
    // script : [
    //   {defer: true, src: 'https://use.fontawesome.com/releases/v5.0.8/js/brands.js', integrity: 'sha384-sCI3dTBIJuqT6AwL++zH7qL8ZdKaHpxU43dDt9SyOzimtQ9eyRhkG3B7KMl6AO19', crossorigin: 'anonymous'},
    //   {defer: true, src: 'https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js', integrity: 'sha384-7ox8Q2yzO/uWircfojVuCQOZl+ZZBg2D2J5nkpLqzH1HY0C1dHlTKIbpRz/LG23c', crossorigin: 'anonymous'},
    // ],
	},
	css: [
		'node_modules/material-design-icons/iconfont/material-icons.css',
		'~/assets/style.css',
	],
  /*
  ** Customize the progress-bar color
  */
	loading: '~/components/progress-linear.vue',
	transition: {
		name: 'fade-transition',
		mode: 'out-in',
	},
  /*
  ** Customize app manifest
  */
	manifest: {
		theme_color: '#388e3c',
		name: 'Поиск cвязанных аниме',
		short_name: 'Поиск аниме',
		start_url: '/?utm_source=homescreen',
		background_color: '#fafafa',
	},
  /*
  ** Modules
  */
	modules: [
		'@nuxtjs/pwa',
		'cookie-universal-nuxt',
    ['@nuxtjs/google-tag-manager', {id: 'GTM-56KN3GC'}],
		['@nuxtjs/google-analytics', {
			id: 'UA-114783379-1',
			autoTracking: {
				exception: true,
			},
			// debug: {
			// 	enabled: process.env.NODE_ENV === 'development',
			// },
		}],
	],

	serverMiddleware: [
		'~/server/shiki-proxy.js',
		'~/server/login-handler.js',
	],

	plugins: [
		'~/plugins/vuetify',
		{src: '~/plugins/install-banner-event', ssr: false},
	],

	workbox: {
		runtimeCaching: [
			{
				urlPattern: 'https://shikimori.org/.*',
				handler: 'cacheFirst',
				method: 'GET',
			},
			{
				urlPattern: 'https://use.fontawesome.com/.*',
				handler: 'cacheFirst',
				method: 'GET',
			},
			{
				urlPattern: '/shiki/.*',
				handler: 'networkFirst',
				method: 'GET',
			},
		],
	},

	meta: {
		lang: 'ru',
		ogHost: 'relanime.herokuapp.com',
		theme_color: '#388e3c',
	},

}
