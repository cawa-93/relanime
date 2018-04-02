import createMutationsSharer from 'vuex-shared-mutations'
import { analyticsMiddleware } from 'vue-analytics'

export const actions = {
	nuxtServerInit ({commit}, {query, app}) {
		if (query.search) {
			commit('filters/SET_SEARCH', query.search)
		}
	},
}

export const plugins = [
	createMutationsSharer({ predicate: ['user/UPDATE_RESULT_RATE', 'user/DELETE_RESULT_RATE'] }),
	analyticsMiddleware,

	async function ({dispatch}) {
		if (process.client) {
			await dispatch('user/loadUser')
		}
	},
]

export const state = () => ({})
