import clone from 'lodash.clonedeep'

export const state = () => ({
	results: null,
	iterator: null,
	allResulrsLoaded: false
})

export const getters = {
	filteredResults (state, getters, rootState, rootGetters) {
		if (!state.results) {
			return []
		}

		return getters.unwatched.filter(anime => {
			if (!anime.relateds) {
				return false
			}

			for (let f in anime.relateds) {
				if (rootGetters['filters/keyedFilters'][f]) {
					return true
				}
			}

			return false
		})
	},
	unwatched (state, getters, rootState, rootGetters) {
		if (!state.results || rootGetters['filters/keyedFilters'].showWatched) {
			return state.results
		}

		return clone(state.results).map(anime => {
			for (let f in anime.relateds) {
				anime.relateds[f].items = anime.relateds[f].items.filter(i => !i.rate.status || i.rate.status === 'planned' || i.rate.status === 'on_hold')
				if (!anime.relateds[f].items.length) {
					delete anime.relateds[f]
				}
			}

			return anime
		})
	}
}

export const mutations = {
	SET_ITERATOR (state, iterator) {
		state.iterator = iterator
		state.results = null
		state.allResulrsLoaded = false
	},
	ADD_RESULTS (state, results) {
		if (!state.results) {
			state.results = []
		}
		state.results.push(...results)
	},
	TOGGLE_DONE (state, done) {
		if (done !== undefined) {
			state.allResulrsLoaded = done
		} else {
			state.allResulrsLoaded = !state.allResulrsLoaded
		}
	}
}

export const actions = {
	async initQuery ({dispatch, commit, state}, params) {
		const iterator = await dispatch('getIterator', params)
		commit('SET_ITERATOR', iterator)
	},

	getIterator: async function* ({dispatch, commit, rootState}, params) {
		if (!params.page)			{ params.page = 0 }

		let animes = []

		try {
			do {
				params.page++
				animes = await this.$axios.$get('/shiki/animes', {params, progress: false})

				if (animes.length === 0)					{ return [] }

				await Promise.all(animes.map(async (anime) => {
					let relateds = await this.$axios.$get(`/shiki/animes/${anime.id}/related`, {progress: false})
					relateds = relateds.filter(r => r && r.anime)

					anime.relateds = {}
					if (relateds.length) {
						relateds.forEach(r => {
							if (!anime.relateds[r.relation]) {
								anime.relateds[r.relation] = {
									title: r.relation_russian,
									items: []
								}
							}
							r.anime.rate = rootState.user.userRates.find(rate => rate.target_id === r.anime.id) || {}
							anime.relateds[r.relation].items.push(r.anime)
						})
					}
				}))

				yield animes
			} while (animes.length !== 0)
		} catch (e) {
			console.error(e)
		}
	},

	async loadNextPage ({commit, state}) {
		if (!state.iterator) {
			console.error('Async iterator is NULL')
			return
		}
		const results = await state.iterator.next()
		if (results.done) {
			commit('TOGGLE_DONE', true)
		} else {
			commit('ADD_RESULTS', results.value)
		}
	}
}
