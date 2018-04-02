import axios from '~/plugins/axios'

export const state = () => ({
	authUser: null,
	userRates: [],
})

export const mutations = {
	SET_USER (state, {user}) {
		state.authUser = user
	},

	ADD_RATES (state, rates) {
		state.userRates.push(...rates)
	},
	UPDATE_RESULT_RATE (state, rate) {
		const targetIndex = state.userRates.findIndex(r => r.target_id === rate.target_id)
		if (targetIndex >= 0) {
			state.userRates.splice(targetIndex, 1, rate)
		} else {
			state.userRates.push(rate)
		}
	},
	DELETE_RESULT_RATE (state, id) {
		const targetIndex = state.userRates.findIndex(r => r.target_id === id)
		if (targetIndex >= 0) {
			state.userRates.splice(targetIndex, 1)
		}
	},
}

export const actions = {
	async loadUser ({commit}) {
		const {data: user} = await axios.get('/shiki/users/whoami')
		if (user && user.id) {
			commit('SET_USER', {user,
				meta: {
					analytics: [
          ['set', 'userId', user.id],
					],
				}})
			const {data: userRate} = await axios.get('/shiki/v2/user_rates', {
				params: {
					user_id: user.id,
				},
				progress: false,
			})

			commit('ADD_RATES', userRate.filter(rate => rate.target_type === 'Anime'))
		}
	},

	async getAnimeRate ({state}, id) {
		if (state.userRates.length) {
			const rate = state.userRates.find(r => r.anime && r.anime.id === id)
			if (rate) {
				return rate
			}
		}

		const {data: {user_rate}} = await axios.get(`/shiki/animes/${id}`)
		return user_rate
	},

	async updateRate ({commit, state}, {user_rate}) {
		user_rate.user_id = state.authUser.id
		if (!user_rate.status || user_rate.status === 'delete') {
			const currentRate = state.userRates.find(r => r.target_id === user_rate.target_id)
			if (currentRate) {
				commit('DELETE_RESULT_RATE', currentRate.target_id)
				return await axios.delete('/shiki/v2/user_rates/' + currentRate.id)
			}
		} else {
			const {data: newRate} = await axios.post('/shiki/v2/user_rates/', {user_rate}, {
				params: {user_id: user_rate.user_id},
			})
			commit('UPDATE_RESULT_RATE', newRate)
			return newRate
		}
	},
}

