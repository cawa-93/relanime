<template>
  <v-layout row wrap>
<!--     <v-flex xs12>
      <offline-indicator></offline-indicator>
    </v-flex> -->
    <results-list :params="params"></results-list>
  </v-layout>
</template>

<script>
  import resultsList from '~/components/feed/results-list'
  import offlineIndicator from '~/components/offline-indicator'
  export default {
  	middleware: 'auth',
    layout: 'right-navbar',
  	components: {resultsList, offlineIndicator},
  	data () {
  		return {
  			result_per_page: 5,

  		}
  	},

  	computed: {
      params() {
        const params = {
          limit: this.result_per_page,
          order: 'aired_on',
        }

        if (this.$store.state.filters.searchField) {
          params.search = this.$store.state.filters.searchField
        } else if (this.defaultIds.length) {
          params.ids = this.defaultIds
        }

        return params

      },
      defaultIds() {
        const ids = []
        this.$store.state.user.userRates.forEach(rate => {
          if (rate.status === 'rewatching' || rate.status === 'completed')
            ids.push(rate.target_id)
        })
        return ids.join(',')
      }
  	},
  }
</script>

<style>
  .page-container {
    max-width: 100%;
  }
  .content-busy {
    display: flex;
  }
</style>
