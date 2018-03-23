<template>
  <v-flex xs12>
    <anime-card
      v-for="anime in results" :key="anime.id"
      :anime="anime"
      class="anime-item mb-3"
      @onload="() => {$set(anime, 'isLoad', true)}"
    ></anime-card>
    <progress-circular indeterminate color="red" class="mt-3" v-if="busy"></progress-circular>
  </v-flex>
</template>

<script>
import {cloneDeep} from 'lodash'
import axios from '~/plugins/axios'
import animeCard from '~/components/feed/anime-card'
import progressCircular from '~/components/progress-circular'
export default {
	name: 'anime-list',
	components: {animeCard, progressCircular},
	props: {
		params: {
			type: Object
		}
	},
	data () {
		return {
			isPageLoaded: true,
			bottom: false,
			results: [],
			currentPage: 0
		}
	},
	computed: {
		isAllCardsLoaded () {
			return this.results.every(r => r.isLoad)
		},
		busy () {
			return !this.isPageLoaded || !this.isAllCardsLoaded
		}
	},
	methods: {
		async loadPage () {
			if (this.busy || (!this.params.ids && !this.params.search))				{ return }

			this.isPageLoaded = false
			const params = cloneDeep(this.params)
			params.page = ++this.currentPage
			const {data} = await axios.get('/shiki/animes', {params})
			this.results.push(
        ...data
      )
			this.$nextTick(function () {
				this.isPageLoaded = true
			})
		},
		_toggleBottom () {
			this.bottom = this.isBottomVisible()
		},
		isBottomVisible () {
			const scrollY = window.scrollY
			const visible = document.documentElement.clientHeight + 600
			const pageHeight = document.documentElement.scrollHeight
			const bottomOfPage = visible + scrollY >= pageHeight
			return bottomOfPage || pageHeight < visible
		}
	},
	created () {
		if (process.client) {
			window.addEventListener('scroll', this._toggleBottom)
		}
	},
	async mounted () {
		await this.loadPage()
	},
	destroyed () {
		window.removeEventListener('scroll', this._toggleBottom)
	},
	watch: {
		busy (busy) {
			if (!busy && this.isBottomVisible()) {
				this.loadPage()
			}
		},
		async params (to, from) {
			if (JSON.stringify(to) !== JSON.stringify(from)) {
				this.results = []
				this.currentPage = 0
				await this.loadPage()
			}
		},
		bottom (bottom) {
			if (bottom) {
				this.loadPage()
			}
		}
	}
}
</script>
