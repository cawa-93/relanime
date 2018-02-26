{{{{raw}}}}
<template>
  <v-app>
    <v-toolbar fixed app>
      <v-btn
        round
        small
        v-for="(filter, key) in filters"
        :key="key"
        :color="filter.value ? 'primary' : 'grey lighten-1'" @click="filter.value = !filter.value"
        dark
        >{{filter.title}}</v-btn>
        <v-chip>
          <v-avatar>
            <img :src="user.image.x48" alt="avatar">
          </v-avatar>
          {{user.nickname}}
        </v-chip>
    </v-toolbar>
    <v-content>

      <v-layout wrap>
        <v-flex xs12 md6 xl4 class="pa-3" v-for="anime in toShow"  :key="anime.id" v-if="anime && anime.related && anime.related.length">

          <div class="elevation-3 anime-card card">
            <v-layout>
              <div>
                <img :src="`https://shikimori.org${anime.image.preview}`" :alt="anime.name">
              </div>
              <div class="card-content">
                <p class="title pl-3 mt-3">{{anime.russian}}</p>
                <template v-for="(filter, key) in filters" v-if="anime[key]">
                  <v-subheader>{{filter.title}}</v-subheader>
                  <v-list>
                    <v-list-tile avatar v-for="related in anime[key]" :key="related.id" :href="`https://shikimori.org${related.anime.url}`" target="_blank">
                      <v-list-tile-avatar>
                        <img :src="`https://shikimori.org${related.anime.image.x48}`" :alt="related.anime.name">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-text="related.anime.russian || related.anime.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </template>
              </div>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 md6 xl4 class="pa-3" v-if="!done">
          <div class="elevation-3 card loading-card">
            <v-progress-linear :indeterminate="true" class="ma-0"></v-progress-linear>
            <v-layout>
              <div class="fake-image grey lighten-1"></div>
              <div class="card-content">
                <v-list>
                  <v-list-tile avatar v-for="i in 4" :key="i">
                    <v-list-tile-avatar>
                      <div class="fake-image grey lighten-1"></div>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title><div class="fake-text grey lighten-1"></div></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-content>
</v-app></template>
{{{{/raw}}}}

<script>
  const axios = require('axios')

  export default {
    name: 'root',
    middleware: 'auth',
    data() {
      return {
        done: false,
        animes: [],
        filters: {
          Sequel: {
           title: 'Продолжение',
           value: true
          },
          Prequel: {
           title: 'Предистория',
           value: true
          },
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      toShow() {
        return this.animes.filter(a => {
          if (this.filters.Sequel.value && a.Sequel && a.Sequel.length) {
            return true
          }
          if (this.filters.Prequel.value && a.Prequel && a.Prequel.length) {
            return true
          }
          return false
        })
      },
    },
    methods: {
      async start() {
        try {
          const {data: lists} = await axios('/api/list')
          for (var i = lists.completed.length - 1; i >= 0; i--) {
            const {data: anime} = await axios(`/api/list/${lists.completed[i].id}`)
            anime.related = anime.related.filter(a => !!a.anime)
            if (anime.related.length) {
              anime.related.forEach(r => {
                if (!anime[r.relation])
                  anime[r.relation] = []
                anime[r.relation].push(r)
              })
              this.animes.push(anime)
            }
          }
        } catch (e) {
          console.error(e)
        }
        this.done = true
      },
    },
    mounted() {
      this.start()
    }
  }
</script>

<style>
  .card-content {
    flex: 1;
    overflow-x: hidden;
  }

  .toolbar .chip {
    margin-left: auto;
  }

  .loading-card .fake-image {
    height: 240px;
    width: 160px;
  }
  .loading-card .avatar .fake-image {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
  .fake-text {
    width: 80%;
    height: 1.4em;
    border-radius: 50px;
}
  .btn--small {
    padding: 0 12px;
    font-weight: lighter;
  }
</style>
