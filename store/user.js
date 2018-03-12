import axios from '~/plugins/axios'

export const state = () => ({
	authUser: null,
	userRates: []
})

export const getters = {
	defaultResults (state) {
		return state.userRates
			.filter(rate => rate.status === 'rewatching' || rate.status === 'completed')
			.map(rate => rate.target_id)
	}
}

export const mutations = {
	SET_USER (state, user) {
		state.authUser = user
	},

	ADD_RATES (state, rates) {
		state.userRates.push(...rates)
	}
}

export const actions = {
	async loadUser ({commit}) {
		const {data: user} = await axios.get('/shiki/users/whoami')
		if (user && user.id) {
			commit('SET_USER', user)
			const {data: userRate} = await axios.get('/shiki/v2/user_rates', {
				params: {
					user_id: user.id
				},
				progress: false
			})

			commit('ADD_RATES', userRate.filter(rate => rate.target_type === 'Anime'))
		}
	}
}
