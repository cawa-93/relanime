const qs = require('qs')

const axios = require('axios')
const api = axios.create({
	baseURL: 'https://shikimori.org/api',
	headers: {'User-Agent': 'Find Sequel'}
})

export default class Anime {
	constructor() {
		this.auth = null
	}

	getOauthUrl() {
		return 'https://shikimori.org/oauth/authorize'+qs.stringify({
			client_id:process.env.CLIENT_ID,
			redirect_uri:process.env.REDIRECT_URI,
			response_type: 'code'
		})
	}

	async getToken(code) {
		const {data: auth} = await axios.post(`https://shikimori.org/oauth/token`, {
			code,
			grant_type: 'authorization_code',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			redirect_uri: process.env.REDIRECT_URI
		})
		return auth
	}

	async getMe(token) {
		const {data: user} = await api.get('/users/whoami', {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    return user
	}

	async getAnime(params) {
		const {data: list} = await api.get('animes', {params})
		return list
	}

	async getRelated (id) {
		const {data: list} = await api.get(`animes/${id}/related`)
		return list
	}

	async getList(token, params) {
		const {data: rates} = await api.get('/v2/user_rates', {
			params,
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })

    return rates
	}

}
