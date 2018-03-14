<template>
  <v-layout column class="page-container" v-if="anime">
    <single-anime-card :anime="anime"></single-anime-card>
    <v-flex v-if="relatedLoading" class="justify-center mt-3 mb-5">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </v-flex>

    <template v-if="related && related.length">
      <v-subheader class="mt-5 mb-3">Связанное</v-subheader>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="rel in related" :key="rel.id">
          <v-card hover nuxt :to="`/${rel.anime.id}`" :class="getRateColorClass(rel.anime.rate)" >
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div>{{rel.relation_russian}}</div>
                    <div class="headline">{{rel.anime.russian || rel.anime.name}}</div>
                  </div>
                </v-flex>
                <v-flex xs12 v-if="$vuetify.breakpoint.smAndUp" style="max-width: 96px;">
                  <v-card-media
                    :src="`https://shikimori.org${rel.anime.image.x96}`"
                    height="125px"
                    contain
                  ></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

        </v-flex>
      </v-layout>
    </template>

  </v-layout>
</template>

<script>
  import axios from '~/plugins/axios'
  import singleAnimeCard from '~/components/single-anime-card'
  export default {
    name: 'anime-single',
    middleware: 'auth',
    layout: 'rollback',
    components: {singleAnimeCard},
    data() {
      return {
        anime: null,
        related: null,
        relatedLoading: false,
      }
    },
    methods: {
      getRateColorClass(rate) {
        if (!rate) {
          return ''
        }

        let color = null

        switch (rate.status) {
          case 'planned' : color = 'blue'; break
          case 'watching' : color = 'blue'; break
          case 'rewatching' : color = 'blue'; break
          case 'completed' : color = 'green'; break
          case 'dropped' : color = 'red'; break
        }

        if (!color) {
          return ''
        }

        return  `${color} ${color}--text lighten-5`
      }
    },
    async mounted() {
      const {data: anime} = await axios.get(`/shiki/animes/${this.$route.params.id}`)
      this.anime = anime
      this.relatedLoading = true
      const {data: related} = await axios.get(`/shiki/animes/${this.$route.params.id}/related`)
      this.related = await Promise.all(
        related
          .filter(r => !!r.anime)
          .map(async (r) => {
            r.anime.rate = await this.$store.dispatch('user/getAnimeRate', r.anime.id)
            return r
          })
      )
      this.relatedLoading = false
    }
  }
</script>
