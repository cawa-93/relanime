<template>
  <v-app>
    <v-content>
      <v-container v-if="!isLogin && !mainSearch" >
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
                <v-text-field placeholder="Введите название" key="mainSearch" flat autofocus v-model="mainSearch"></v-text-field>
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

            <v-card class="mb-3 filters" :tile="$vuetify.breakpoint.smAndDown">
              <v-card-text>
                <v-text-field label="Поиск" key="mainSearch" flat autofocus v-model="mainSearch"></v-text-field>
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
            
          </v-flex>
          <v-flex xs12 md8 order-xs2 order-sm1>
            <anime-card 
              v-for="anime in animeToShow" :key="anime.id" 
              :anime="anime"
              :filters="filters"
              @toggle-planned="setPlanned"
              class="mb-3"
            ></anime-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

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
import animeCard from '~/components/anime-card'
import clone from 'lodash.clonedeep'

export default {
  components: {animeCard},
  data() {
    return {
      mainSearch: '',
      animes: [],
      watched: [],
      planned: [],
      vm: {
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
        'showWatched': {title: 'Просмотренные', enabled: true},
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
      if (!this.filters.showWatched.enabled) {
        return this.animes
      }

      return this.animes.map(anime => {
        anime = clone(anime)
        for (let f in anime.relateds) {
          anime.relateds[f].items = anime.relateds[f].items.filter(i => !i.watched)
        }

        return anime
      })
    }
  },
  methods: {
    async loadAnime(params) {
      const animes = await this.$axios.$get('/api/anime', {params})
      this.animes = []
      for (let i in animes) {
        let anime = animes[i]
        let relateds = await this.$axios.$get('/api/anime/'+anime.id)
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
            r.anime.watched = this.watched.includes(r.anime.id)
            r.anime.planned = this.planned.includes(r.anime.id)
            anime.relateds[r.relation].items.push(r.anime)
          })
        }
        this.animes.push(anime)
      }
    },

    searchAnime: debounce(async function () {
      if (this.mainSearch) {
        this.loadAnime({search:this.mainSearch})
      }
    }, 500),

    async loadLists() {
      try {

        const {user, lists} = await this.$axios.$get('/api/list')
        this.user = user
        const toLoad = []
        lists.forEach(item => {
          if (item.target_type !== 'Anime') {
            return
          }


          if (item.status === 'planned') {
            this.planned.push(item.target_id)
          } else {
            if (item.status === 'rewatching' || item.status === 'completed') {
              toLoad.push(item.target_id)
            }
            this.watched.push(item.target_id)
          }
        })

        if (toLoad.length) {
          await this.loadAnime({ids: toLoad.join(',')})
        }
      } catch (e) {
        console.error(e)
      }
    },

    setPlanned(anime) {
      if (!this.isLogin) {
        this.vm.error.text = `Вы должны быть <a href="${this.loginUrl}">авторизованы</a> для этого действия`
        this.vm.error.visible = true
        return 
      }

      if (!anime.planned) {
        anime.planned = true
        this.planned.push(anime.id)
        this.$axios.post('/api/anime/'+anime.id, {
          "user_rate": {
            "status": "planned",
            "target_id": anime.id,
            "target_type": "Anime",
            "user_id": this.user.id,
          }
        })
      } else {
        // anime.planned = false
        // this.$axios.delete('/api/anime/'+anime.id)
      }
    }
  },
  watch: {
    mainSearch() {
      this.searchAnime()
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
/*  #top-container {
    padding-left: 0;
    padding-right: 0;
  }*/
  .filters {
    position: sticky;
    top: 0px;
  }
  .filters .btn {
    font-weight: lighter;
  }
</style>