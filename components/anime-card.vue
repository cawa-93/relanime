<template>
  <v-card :tile="$vuetify.breakpoint.smAndDown">
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
        <v-flex pa-0 pt-3>
          <div>
            <div class="headline pl-3 pr-3">{{anime.russian}}</div>
            <transition-group name="slide-y-transition" tag="div">
              <div 
                v-for="(relation, key) in anime.relateds"
                :key="key"
                v-if="filters[key] && filters[key].enabled && relation.items && relation.items.length"
              >
                <v-subheader>{{relation.title}}</v-subheader>
                <v-list>
                	<anime-card-related 
                    v-for="anime in relation.items" 
                    :key="anime.id"
                    :anime="anime" 
                    @action="planned"
                  ></anime-card-related>
                </v-list>
              </div>
            </transition-group>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import animeCardRelated from '~/components/anime-card-related'

export default {
	name: 'anime-card',
	components: {animeCardRelated},
	props: {
		anime: {
			type: Object,
			required: true
		},
		filters: {
			type: Object,
			required: true
		}
	},
	methods: {
		planned (...args) {
			this.$emit('toggle-planned', ...args)
		}
	}
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