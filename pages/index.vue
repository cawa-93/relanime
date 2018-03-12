<template>
  <v-layout column class="page-container">
    <results-list :list="results"></results-list>
    <v-flex v-if="busy" class="content-busy justify-center mt-3 mb-5">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </v-flex>
    <v-flex text-xs-center v-if="isAllResultsLoaded">
      {{results.length ? 'Все результаты загружены' : 'Ничего не найдено'}}
    </v-flex>
    <v-flex text-xs-center v-if="!online">Нет интернета</v-flex>
  </v-layout>
</template>

<script>
  import debounce from 'lodash.debounce'
  import resultsList from '~/components/results-list'
  import online from '~/mixins/online.js'
  export default {
  	middleware: 'auth',
  	components: {resultsList},
  	mixins: [online],
  	data () {
  		return {
  			bottom: false,
  			busy: false
  		}
  	},

  	computed: {
  		results () {
  			return this.$store.getters['anime/filteredResults']
  		},
  		isAllResultsLoaded () {
  			return this.$store.state.anime.allResulrsLoaded
  		},
  		searchString () {
  			return this.$store.state.filters.searchField
  		}
  	},

  	methods: {
  		isBottomVisible () {
  			const scrollY = window.scrollY
  			const visible = document.documentElement.clientHeight
  			const pageHeight = document.documentElement.scrollHeight
  			const bottomOfPage = visible + scrollY >= pageHeight
  			return bottomOfPage || pageHeight < visible
  		},
  		async nextPage (force = false) {
  			if ((this.busy && !force) || this.isAllResultsLoaded || !this.online)				{ return }

  			this.busy = true
  			this.$nuxt.$loading.start()
  			await this.$store.dispatch('anime/loadNextPage')
  			this.bottom = this.isBottomVisible()
  			if (this.bottom) {
  				await this.nextPage(true)
  			}
  			this.busy = false
  			this.$nuxt.$loading.finish()
  		},
  		initSearch: debounce(async function () {
  			if (this.searchString) {
  				await this.$store.dispatch('anime/initQuery', {search: this.searchString, limit: 5})
  				await this.nextPage()
  			}
  		}, 1000),

  		async initDefaultResults () {
  			console.log('initDefaultResults')
  			if (this.$store.getters['user/defaultResults'].length) {
  				await this.$store.dispatch('anime/initQuery', {ids: this.$store.getters['user/defaultResults'], limit: 5})
  				await this.nextPage()
  			}
  		}
  	},

  	async mounted () {
  		if (this.$cookies.get('session')) {
  			await this.$store.dispatch('user/loadUser')
  		}

  		if (this.searchString) {
  			await this.initSearch()
  		} else {
  			await this.initDefaultResults()
  		}

  		window.addEventListener('scroll', () => {
  			this.bottom = this.isBottomVisible()
  		})
  	},
  	watch: {
  		bottom (bottom) {
  			if (bottom) {
  				this.nextPage()
  			}
  		},
  		online (online) {
  			if (online && this.bottom) {
  				this.nextPage()
  			}
  		},
  		searchString (searchString) {
  			if (searchString) {
  				this.initSearch()
  			} else {
  				this.initDefaultResults()
  			}
  		}
  	}

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
