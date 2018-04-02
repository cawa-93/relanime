export const state = () => ({
	filters: [
    {title: 'Альтернативная вселенная', key: 'Alternative setting', enabled: true},
    {title: 'Альтернативная история', key: 'Alternative version', enabled: true},
    {title: 'Другая история', key: 'Side story', enabled: true},
    {title: 'Обобщение', key: 'Summary', enabled: true},
    {title: 'Ответвление', key: 'Spin-off', enabled: true},
    {title: 'Предыстория', key: 'Prequel', enabled: true},
    {title: 'Продолжение', key: 'Sequel', enabled: true},
    {title: 'Просмотренные', key: 'showWatched', enabled: false},
    {title: 'Прочее', key: 'Other', enabled: true},
	],
	searchField: '',
})

export const getters = {
	keyedFilters (state) {
		const keyedFilters = {}
		state.filters.forEach(f => (keyedFilters[f.key] = f.enabled))
		return keyedFilters
	},
}

export const mutations = {
	TOGGLE_FILTER (state, key) {
		const filter = state.filters.find(f => f.key === key)
		if (filter) {
			filter.enabled = !filter.enabled
		}
	},
	SET_SEARCH (state, string) {
		state.searchField = string
	},
}
