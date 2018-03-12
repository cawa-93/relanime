export const actions = {
	nuxtServerInit ({commit}, {query}) {
		if (query.search)			{ commit('filters/SET_SEARCH', query.search) }
	}
}
