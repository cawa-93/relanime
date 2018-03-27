<template>
  <v-layout row wrap v-if="anime">
    <v-flex xs12>
      <anime-card :anime="anime"></anime-card>
    </v-flex>
    <v-flex xs12 v-if="relatedLoading">
      <progress-circular indeterminate color="red"></progress-circular>
    </v-flex>

    <template v-if="related && related.length">
      <v-flex xs12 class="pb-0 pt-3">
        <v-subheader>Связанное</v-subheader>
      </v-flex>
      <v-flex xs12 sm6 v-for="rel in related" :key="rel.id">
        <anime-card-related :related="rel" :class="{
          'text-xs-center': $vuetify.breakpoint.smAndDown
        }"></anime-card-related>
      </v-flex>
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
  	layout: 'right-navbar',
  	components: {animeCard, animeCardRelated, progressCircular},
  	data () {
  		return {
  			anime: null,
  			related: null,
  			relatedLoading: false
  		}
  	},
  	async mounted () {
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
<style scoped>
  .root {
  width: 100%;
  }
</style>
<style>
  .b-prgrph {
    margin-bottom: 16px;
  }
</style>
