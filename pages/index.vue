<template>
  <v-layout
    row
    wrap>
    <results-list :params="params"/>
  </v-layout>
</template>

<script>
import resultsList from '~/components/feed/results-list'
export default {
	middleware: 'auth',
	layout: 'right-navbar',
	components: {resultsList},
	data () {
		return {
			result_per_page: 1,
		}
	},

	computed: {
		params () {
			const params = {
				limit: this.result_per_page,
				order: 'aired_on',
				ids: this.defaultIds,
			}

			return params
		},
		defaultIds () {
			const ids = []
			this.$store.state.user.userRates.forEach(rate => {
				if (rate.status === 'rewatching' || rate.status === 'completed') {
					ids.push(rate.target_id)
				}
			})
			return ids.join(',')
		},
	},
}
</script>
