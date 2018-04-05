<template>
  <v-flex xs12>

    <div class="">
      <v-switch
        label="Скрыть просмотренные"
        :input-value="hideWatched"
        hide-details
        class="ma-3"
        @change="toggleFilter"
      />
    </div>

    <anime-card
      :hide-watched="hideWatched"
      v-for="anime in list.items"
      :key="anime.id"
      :anime="anime"
      class="anime-item mb-3"
      @onload="(loadedIds) => {
        if (loadedIds && loadedIds.length) {
          cache.excludeIds.push(...loadedIds)
          cache.items = cache.items.filter(anime => !loadedIds.includes(anime.id))
        }
        $set(anime, 'isLoad', true)
      }"
    />

    <progress-circular
      indeterminate
      color="red"
      class="mt-3"
      v-if="showLoading || busy"/>

    <v-btn
      block
      to="/bot"
      class="accent"
      v-if="isAllResultsShowed">
      Найти больше аниме</v-btn>
  </v-flex>
</template>

<script>
import {cloneDeep} from 'lodash'
import axios from '~/plugins/axios'
import animeCard from '~/components/feed/anime-card'
import progressCircular from '~/components/progress-circular'
export default {
	name: 'AnimeList',
	components: {animeCard, progressCircular},
	props: {
		params: {
			type: Object,
			default: () => ({
				limit: 1,
			}),
		},
	},
	data () {
		return {
			isLoadingInProgress: false,
			hideWatched: false,
			bottom: false,
			showLoading: true,
			list: {
				items: [],
			},
			cache: {
				items: [],
				page: 0,
				excludeIds: [],
				isAllLoaded: false,
				itemsPerRequest: 100,
			},
		}
	},
	computed: {
		isAllCardsLoaded () {
			return this.list.items.every(r => r.isLoad)
		},
		busy () {
			return this.isLoadingInProgress || !this.isAllCardsLoaded
		},
		isAllResultsShowed () {
			return !this.cache.items.length && this.cache.isAllLoaded
		},
	},
	methods: {
		async loadPage (clearCache = false) {
			if (this.busy || (!this.params.ids && !this.params.search)) return

			if (clearCache) {
				this.cache.items = []
				this.cache.page = 0
				this.cache.isAllLoaded = false
			}

			if (this.isAllResultsShowed) return

			this.showLoading = true
			this.isLoadingInProgress = true

			if (this.cache.items.length < this.params.limit && !this.cache.isAllLoaded) {
				await this.loadToCach()
			}

			this.list.items.push(
				...this.cache.items.splice(0, this.params.limit)
			)

			await this.$nextTick()
			this.isLoadingInProgress = false
			this.showLoading = false
		},

		async loadToCach () {
			const params = cloneDeep(this.params)
			params.page = ++this.cache.page
			params.limit = this.cache.itemsPerRequest
			if (this.list.excludeIds && this.list.excludeIds.length) {
				params.exclude_ids = this.list.excludeIds.join(',')
			}
			const {data} = await axios.get('/shiki/animes', {params})
			this.cache.items.push(
        ...data
      )
			if (data.length < params.limit) {
				this.cache.isAllLoaded = true
			}
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
		},
		async toggleFilter () {
			this.hideWatched = !this.hideWatched
			await this.$nextTick()
			setTimeout(() => {
				this._toggleBottom()
			}, 400)
		},
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
			} else {
				this._toggleBottom()
			}
		},
		async params (to, from) {
			if (JSON.stringify(to) !== JSON.stringify(from)) {
				this.list.items = []
				await this.loadPage(true)
			}
		},
		bottom (bottom) {
			if (bottom && !this.isAllResultsShowed) {
				this.loadPage()
			}
		},
	},
}
</script>

<style scoped>

</style>
