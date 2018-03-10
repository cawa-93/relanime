<template>
  <v-app>
    <v-content>
      <v-container v-if="!isLogin && vm.firstScreen" >
        <v-layout align-center  justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-title primary-title key="hello-text">
                <p class="headline mb-2">Приветствуем!</p>
                <p>Мы автоматически просканируем список просмотренного вами аниме, чтобы найти то, что вы ещё не видели!</p>
                <v-btn
                  color="primary"
                  :href="loginUrl"
                >
                  Начать
                </v-btn>
              </v-card-title>

              <v-divider class="mt-3 mb-3"></v-divider>
              <v-card-text>
                <p>Или введите название интересующего вас аниме:</p>
                <form @submit.prevent="searchAnime">
                  <v-text-field placeholder="Введите название" key="mainSearch" flat v-model="mainSearch"></v-text-field>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else fluid v-bind="{
        'grid-list-xl': $vuetify.breakpoint.mdAndUp,
        'grid-list-xs': $vuetify.breakpoint.smAndDown,
        'pa-0': $vuetify.breakpoint.smAndDown,
      }">
        <v-layout row wrap align-content-start >
          <v-flex xs12 md4 order-xs1 order-sm2>
            <v-card v-if="!isLogin" class="mb-3" color="primary" dark :tile="$vuetify.breakpoint.smAndDown">
              <v-card-title primary-title key="hello-text">
                <p class="headline mb-2">Приветствуем!</p>
                <p>Мы автоматически просканируем список просмотренного вами аниме, чтобы найти то, что вы ещё не видели!</p>
                <v-btn
                  color="accent"
                  :href="loginUrl"
                >
                  Начать
                </v-btn>
              </v-card-title>
            </v-card>

            <div class="filters mb-3">
              <v-card :tile="$vuetify.breakpoint.smAndDown">
                <v-card-text>
                  <form @submit.prevent="searchAnime">
                    <v-text-field label="Поиск" key="mainSearch" flat v-model="mainSearch"></v-text-field>
                  </form>
                  <v-btn small round depressed v-for="(filter, key) in filters" :key="key" 
                    v-if="key !== 'showWatched' || isLogin"
                    :dark="filter.enabled"
                    :color="filter.enabled ? 'blue darken-2' : 'grey lighten-2'"
                    @click="filter.enabled = !filter.enabled"
                  >
                    {{filter.title}}
                  </v-btn>
                  </v-card-text>
              </v-card>

              <app-footer class="hidden-sm-and-down mt-3"></app-footer>
            </div>

            
          </v-flex>
          <v-flex xs12 md8 order-xs2 order-sm1>
						<div>
							
	            <transition-group name="slide-y-transition" tag="div">
	              <anime-card 
	                v-for="anime in animeToShow" :key="anime.id" 
	                :anime="anime"
	                :filters="filters"
	                @toggle-planned="setPlanned"
	                class="anime-item mb-3"
	              ></anime-card>

								<div class="content-loading justify-center mb-3" key="content-loading" v-if="busy">
		              <v-progress-circular
		                indeterminate
		                :color="$nuxt.$loading.color"
		              ></v-progress-circular>
								</div>

	            </transition-group>
	            <div v-if="vm.isAllLoad" class="mb-3 text-xs-center grey--text">Больше ничего нет</div>
						</div>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <app-footer class="hidden-md-and-up"></app-footer>


    <v-snackbar top v-model="vm.error.visible">
      <span v-html="vm.error.text"></span>
      <v-btn flat color="pink" icon @click="vm.error.visible = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import qs from 'qs'
import clone from 'lodash.clonedeep'

import animeCard from '~/components/anime-card'
import appFooter from '~/components/Footer'

export default {
	components: {animeCard, appFooter},
	data () {
		return {
			mainSearch: '',
			animes: [],
			user_rate: [],
			limit: 5,
			loaderIterator: null,
			user: null,
			busy: false,
			bottom: false,
			vm: {
				isAllLoad: false,
				firstScreen: true,
				error: {
					visible: false,
					text: ''
				}
			},
			loginUrl: 'https://shikimori.org/oauth/authorize?' + qs.stringify({
				client_id: process.env.CLIENT_ID,
				redirect_uri: process.env.REDIRECT_URI,
				response_type: 'code'
			}),
			filters: {
				'showWatched': {title: 'Просмотренные', enabled: false},
				'Sequel': {title: 'Продолжение', enabled: true},
				'Prequel': {title: 'Предыстория', enabled: true},
				'Spin-off': {title: 'Ответвление', enabled: true},
				'Alternative version': {title: 'Альтернативная история', enabled: true},
				'Summary': {title: 'Обобщение', enabled: true},
				'Side story': {title: 'Другая история', enabled: true},
				'Alternative setting': {title: 'Альтернативная вселенная', enabled: true},
				'Other': {title: 'Прочее', enabled: true}
			}
		}
	},
	computed: {
		isLogin () {
			return !!this.$cookies.get('session')
		},
		animeToShow () {
			return this.unwatchedAnime.filter(anime => {
				if (!anime.relateds) {
					return false
				}

				for (let f in anime.relateds) {
					if (this.filters[f] && this.filters[f].enabled) {
						return true
					}
				}

				return false
			})
		},
		unwatchedAnime () {
			if (this.filters.showWatched.enabled) {
				return this.animes
			}

			return this.animes.map(anime => {
				anime = clone(anime)
				for (let f in anime.relateds) {
					anime.relateds[f].items = anime.relateds[f].items
						.filter(i => !i.rate.status || i.rate.status === 'planned' || i.rate.status === 'on_hold')
					if (!anime.relateds[f].items.length) {
						delete anime.relateds[f]
					}
				}

				return anime
			})
		},
		animeToLoad () {
			return this.user_rate
				.filter(rate => rate.status === 'rewatching' || rate.status === 'completed')
				.map(rate => rate.target_id)
		}
	},
	methods: {
		sleep (sec) {
			return new Promise(resolve => setTimeout(resolve, 1000*sec))
		},

		bottomVisible () {
			const scrollY = window.scrollY
			const visible = document.documentElement.clientHeight
			const pageHeight = document.documentElement.scrollHeight - 200
			const bottomOfPage = visible + scrollY >= pageHeight
			return bottomOfPage || pageHeight < visible
		},

		animeLoader: async function* (params) {

			if (!params.page) 
				params.page = 0

			let animes = []
				
			try {
				do {
					params.page++
					animes = await this.$axios.$get('/shiki/animes', {params, progress: false})

					if (animes.length === 0) 
						return []

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
								r.anime.rate = this.user_rate.find(rate => rate.target_id === r.anime.id) || {}
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

		// async loadAnime (params) {
		// 	this.$nuxt.$loading.start()
		// 	this.prevRequest = params
		// 	try {
		// 		const animes = await this.$axios.$get('/shiki/animes', {params, progress: false})
		// 		const loadingStep = 100 / (animes.length * 2)

		// 		await Promise.all(animes.map(async (anime) => {
		// 			this.$nuxt.$loading.increase(loadingStep)
		// 			let relateds = await this.$axios.$get(`/shiki/animes/${anime.id}/related`, {progress: false})
		// 			relateds = relateds.filter(r => r && r.anime)
		// 			if (relateds.length) {
		// 				anime.relateds = {}
		// 				relateds.forEach(r => {
		// 					if (!anime.relateds[r.relation]) {
		// 						anime.relateds[r.relation] = {
		// 							title: r.relation_russian,
		// 							items: []
		// 						}
		// 					}
		// 					r.anime.rate = this.user_rate.find(rate => rate.target_id === r.anime.id) || {}
		// 					anime.relateds[r.relation].items.push(r.anime)
		// 				})
		// 			}
		// 			this.animes.push(anime)
		// 			this.$nuxt.$loading.increase(loadingStep)
		// 		}))
		// 	} catch (e) {
		// 		console.error(e)
		// 		this.$nuxt.$loading.fail()
		// 		this.vm.error.text = `Во время загрузки произошла ошибка`
		// 		this.vm.error.visible = true
		// 	}
		// 	this.$nuxt.$loading.finish()
		// },

		async searchAnime () {
			if (this.mainSearch) {
				this.vm.firstScreen = false
				this.animes = []
				this.loaderIterator = this.animeLoader({search: this.mainSearch, limit: this.limit})
				await this.loadPage()
			}
		},

		async loadLists () {
			try {
				const userRate = await this.$axios.$get('/shiki/v2/user_rates', {
					params: {
						user_id: this.user.id
					},
					progress: false
				})
				this.userRate = userRate.filter(rate => rate.target_type === 'Anime')
				if (this.animeToLoad.length) {
					this.animes = []
					this.loaderIterator = this.animeLoader({search: this.mainSearch, limit: this.limit})
					await this.loadPage()
				}
			} catch (e) {
				console.error(e)
			}
		},

		async loadPage () {
			if (this.busy || !this.loaderIterator) {
				return
			}

			this.busy = true
			try {
				const results = await this.loaderIterator.next()
				console.log(results)
				this.busy = false
				if (results.done) {
					this.vm.isAllLoad = true
					this.loaderIterator = null
				} else {
					this.animes.push(...results.value)
					await this.sleep(1)
					if (this.bottomVisible()) {
						return await this.loadPage()
					}
				}
			} catch (e) {
				console.error(e)
				this.busy = false
				this.vm.error.text = `Во время загрузки произошла ошибка`
				this.vm.error.visible = true
			}
		},

		async setPlanned (anime) {
			if (!this.isLogin) {
				this.vm.error.text = `Вы должны быть <a href="${this.loginUrl}">авторизованы</a> для этого действия`
				this.vm.error.visible = true
				return
			}

			if (anime.rate.status !== 'planned') {
				const newRate = await this.$axios.$post('/shiki/v2/user_rates/', {
					'user_rate': {
						'status': 'planned',
						'target_id': anime.id,
						'target_type': 'Anime',
						'user_id': this.user.id
					}
				})
				anime.rate = newRate
			} else {
				await this.$axios.$delete('/shiki/v2/user_rates/' + anime.rate.id)
				anime.rate = {}
			}
		}
	},
	async mounted () {
		if (this.isLogin) {
			try {
				const {data: user} = await this.$axios.get('/shiki/users/whoami')
				if (user && user.id) {
					this.user = user
					await this.loadLists()
				}
			} catch (e) {
				if (e.response && e.response.status === 401) {
					this.$cookies.remove('session')
					this.user = null
				}
			}
		}

		this.bottom = this.bottomVisible()
		window.addEventListener('scroll', () => {
			this.bottom = this.bottomVisible()
		})
	},
	watch: {
		bottom (bottom) {
			if (bottom) {
				this.loadPage()
			}
		}
	}
}
</script>

<style scoped>
  .filters {
    position: sticky;
    top: 0px;
  }
  .filters .btn {
    font-weight: lighter;
  }
  .content-loading {
    display: flex;
  }
</style>