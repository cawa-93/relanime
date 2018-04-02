<template>
  <v-card :tile="$vuetify.breakpoint.smAndDown" hover nuxt :to="`/${anime.id}`" v-if="listOfRelateds.length">
    <v-container fluid pa-0>
      <v-layout ma-0 v-bind="{
        column:$vuetify.breakpoint.smAndDown
      }">
        <v-flex xs12 md3 pa-0>
          <v-card-media
            class="white--text grey lighten--2"
            :height="$vuetify.breakpoint.smAndDown ? '200px' : '300px'"
            :src="`https://shikimori.org${anime.image.original}`"
          ></v-card-media>
        </v-flex>
        <v-flex xs12 md9 pa-0>
          <div>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{anime.russian || anime.name}}</div>
                <span v-if="anime.russian" class="grey--text">{{anime.name}}</span>
              </div>
            </v-card-title>
            <v-list subheader>
              <template v-for="(row, i) in listOfRelateds">
                <v-subheader
                  v-if="i === 0 || listOfRelateds[i-1].relation !== row.relation"
                  :key="i"
                >
                  {{row.relation_russian}}
                </v-subheader>
                <anime-card-related
                  :key="row.anime.id"
                  :anime="row.anime"
                ></anime-card-related>
              </template>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import {sortBy} from 'lodash'
import axios from '~/plugins/axios'
import animeCardRelated from '~/components/feed/anime-card-related'

export default {
	name: 'anime-card',
	components: {animeCardRelated},
	props: {
		anime: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		relateds: [],
	}),
	computed: {
		unwatchedRelateds () {
			return this.relateds.filter(r => {
				const rate = this.$store.state.user.userRates.find(rate => rate.target_id === r.anime.id)
				return !rate || !rate.status || rate.status === 'planned' || rate.status === 'on_hold'
			})
		},
		filteredRelateds () {
      /* eslint-disable standard/computed-property-even-spacing */
			return this[
				this.$store.getters['filters/keyedFilters'].showWatched
          ? 'relateds'
          : 'unwatchedRelateds'
        ]
        /* eslint-enable standard/computed-property-even-spacing */

				.filter(r => this.$store.getters['filters/keyedFilters'][r.relation])
		},
		listOfRelateds () {
			if (!this.relateds)				{ return [] }
			return sortBy(this.filteredRelateds, 'relation')
		},
	},
	methods: {
		showSection (key) {
			const filter = this.$store.state.filters.filters.find(f => f.key === key)
			return filter && filter.enabled
		},
	},
	async mounted () {
		this.relateds = (await axios.get(`/shiki/animes/${this.anime.id}/related`)).data.filter(r => r.anime)
		this.$nextTick(function () {
			this.$emit('onload')
		})
	},
}
</script>

<style scoped>
  .anime-card  {
    max-width: 100%;
  }
  .anime-card .card-content {
    overflow-x: hidden;
    flex: 1;
  }
</style>
