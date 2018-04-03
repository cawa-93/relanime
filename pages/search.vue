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
	layout: 'right-navbar',
	components: {resultsList},
	head () {
		return {
			title: `Результаты поиска: ${this.$route.query.q}`,
		}
	},
	data () {
		return {
			result_per_page: 5,
		}
	},

	computed: {
		params () {
			const params = {
				limit: this.result_per_page,
				search: this.$route.query.q,
			}

			return params
		},
	},
}
</script>
