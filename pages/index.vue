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
            <div
              v-infinite-scroll="nextPage"
              infinite-scroll-disabled="vm.loading"
              infinite-scroll-distance="20"
            >
              
              <transition-group name="slide-y-transition" tag="div">
                <anime-card 
                  v-for="anime in animeToShow" :key="anime.id" 
                  :anime="anime"
                  :filters="filters"
                  @toggle-planned="setPlanned"
                  class="anime-item mb-3"
                ></anime-card>

                <div v-if="vm.loading" key="content-loading" class="content-loading mx-auto grey lighten-2 mb-3">
                  <v-progress-circular indeterminate color="success"></v-progress-circular>
                  <div>Загрузка</div>
                </div>

              </transition-group>
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
import debounce from 'lodash.debounce'
import qs from 'qs'
import clone from 'lodash.clonedeep'

import infiniteScroll from 'vue-infinite-scroll'

import animeCard from '~/components/anime-card'
import appFooter from '~/components/Footer'

export default {
  components: {animeCard, appFooter},
  directives: {infiniteScroll},
  data() {
    return {
      mainSearch: '',
      animes: [],
      user_rate: [],
      limit: 5,
      prevRequest: {},
      vm: {
        loading: false,
        firstScreen: true,
        error: {
          visible: false,
          text: ''
        }
      },
      loginUrl: 'https://shikimori.org/oauth/authorize?'+qs.stringify({
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
        'Other': {title: 'Прочее', enabled: true},
      }
    }
  },
  computed: {
    isLogin() {
      return !!this.$cookie.get('session')
    },
    animeToShow() {
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
    unwatchedAnime() {
      if (this.filters.showWatched.enabled) {
        return this.animes
      }

      return this.animes.map(anime => {
        anime = clone(anime)
        for (let f in anime.relateds) {
          anime.relateds[f].items = anime.relateds[f].items
            .filter(i => !i.rate.status || i.rate.status === 'planned' ||  i.rate.status === 'on_hold' )
          if (!anime.relateds[f].items.length) {
            delete anime.relateds[f]
          }
        }

        return anime
      })
    },
    animeToLoad() {
      return this.user_rate
        .filter(rate => rate.status === 'rewatching' || rate.status === 'completed')
        .map(rate => rate.target_id)
    }
  },
  methods: {
    sleep(sec) {
      return new Promise(res => {
        setTimeout(() => res(), sec*1000)
      })
    },

    async loadAnime(params) {
      this.$nuxt.$loading.start()
      this.prevRequest = params
      try {
        const animes = await this.$axios.$get('/api/anime', {params, progress: false })
        const loadingStep = 100/(animes.length*2)

        await Promise.all(animes.map(async (anime) => {
          this.$nuxt.$loading.increase(loadingStep)
          let relateds = await this.$axios.$get('/api/anime/'+anime.id, {progress: false })
          relateds = relateds.filter(r => r && r.anime)
          if (relateds.length) {
            anime.relateds = {}
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
          this.animes.push(anime)
          this.$nuxt.$loading.increase(loadingStep)
        }))

      } catch (e) {
        console.error(e)
        $nuxt.$loading.fail()
        this.vm.error.text = `Во время загрузки произошла ошибка`
        this.vm.error.visible = true
      }
      this.$nuxt.$loading.finish()
    },

    async searchAnime() {
      if (this.mainSearch) {
        this.vm.loading = true
        this.vm.firstScreen = false
        this.animes = []
        this.loadAnime({search:this.mainSearch, limit: this.limit, page: 1})
        this.vm.loading = false
      }
    },

    async loadLists() {
      this.vm.loading = true
      try {
        const {user, user_rate} = await this.$axios.$get('/api/list', {progress: false})
        this.user = user
        this.user_rate = user_rate.filter(rate => rate.target_type === 'Anime')
        if (this.animeToLoad.length) {
          this.animes = []
          await this.loadAnime({ids: this.animeToLoad.join(','), limit: this.limit, page: 1})
        }
      } catch (e) {
        console.error(e)
      }
      this.vm.loading = false
    },

    async nextPage () {
      if (this.vm.loading)
        return
      this.vm.loading = true
      this.prevRequest.page = (this.prevRequest.page || 1) + 1
      await this.loadAnime(this.prevRequest)
      this.vm.loading = false
    }, 

    async setPlanned(anime) {
      if (!this.isLogin) {
        this.vm.error.text = `Вы должны быть <a href="${this.loginUrl}">авторизованы</a> для этого действия`
        this.vm.error.visible = true
        return 
      }

      if (anime.rate.status !== 'planned') {
        const newRate = await this.$axios.$post('/api/anime/'+anime.id, {
          "user_rate": {
            "status": "planned",
            "target_id": anime.id,
            "target_type": "Anime",
            "user_id": this.user.id,
          }
        })
        anime.rate = newRate
      } else {
        await this.$axios.$delete('/api/anime/'+anime.rate.id)
        anime.rate = {}
      }
    }
  },
  async mounted() {
    if (this.isLogin) {
      await this.loadLists()
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
    justify-content: space-between;
    align-items: center;
    border-radius: 50px;
    width: 125px;
    padding: 5px 20px 5px 5px;
  }

    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  background-color: grey;
</style>