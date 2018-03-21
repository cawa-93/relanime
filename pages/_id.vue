<template>
  <v-layout column class="page-container" v-if="anime">
    <anime-card :anime="anime"></anime-card>
    <progress-circular indeterminate color="red" class="mt-3" v-if="relatedLoading"></progress-circular>

    <template v-if="related && related.length">
      <v-subheader class="mt-4">Связанное</v-subheader>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="rel in related" :key="rel.id">
          <anime-card-related :related="rel"></anime-card-related>
        </v-flex>
      </v-layout>
    </template>

  </v-layout>
</template>

<script>
  import axios from '~/plugins/axios'
  import animeCard from '~/components/single/anime-card'
  import animeCardRelated from '~/components/single/anime-card-related'
  import progressCircular from '~/components/progress-circular'
  export default {
    name: 'anime-single',
    middleware: 'auth',
    layout: 'rollback',
    components: {animeCard, animeCardRelated, progressCircular},
    data() {
      return {
        anime: null,
        related: null,
        relatedLoading: false,
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

<style>
  .page-container {
    max-width: 100%;
  }
  .content-busy {
    display: flex;
  }
  .b-prgrph {
    margin-bottom: 16px;
  }
</style>
