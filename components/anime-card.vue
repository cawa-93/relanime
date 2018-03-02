<template>
  <v-card>
    <v-container fluid pa-0>
      <v-layout ma-0 v-bind="{
        column:$vuetify.breakpoint.smAndDown
      }">
        <v-flex xs12 md3 pa-0>
           <v-card-media
              class="white--text"
              :height="$vuetify.breakpoint.smAndDown ? '200px' : '300px'"
              :src="`https://shikimori.org${anime.image.preview}`"
            ></v-card-media>


        </v-flex>
        <v-flex pa-0 pt-3>
          <div>
            <div class="headline pl-3 pr-3">{{anime.russian}}</div>
            <template 
              v-for="(relation, key) in anime.relateds"
              v-if="filters[key] && filters[key].enabled && relation.items && relation.items.length"
            >
              <v-subheader>{{relation.title}}</v-subheader>
              <v-list>
                <v-list-tile v-for="anime in relation.items" :key="anime.id" :href="`https://shikimori.org${anime.url}`" target="_blank">
                  <v-list-tile-action>
                  	<v-tooltip top>
            					<v-btn flat slot="activator" icon @click.stop.prevent="planned(anime, anime.planned)">
                    		<v-icon :color="anime.planned || anime.watched ? 'green' : 'grey'">{{anime.watched ? 'done' : 'watch_later'}}</v-icon>
            					</v-btn>
            					<span>{{anime.watched ? 'Просмотрено': anime.planned ? 'Запланировано' : 'Запланировать'}}</span>
          					</v-tooltip>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="anime.russian || anime.name"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </template>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
	export default {
		name: 'anime-card',
		props: {
      anime: {
        type: Object,
        require: true
      },
			filters: {
				type: Object,
				require: true
			},
		},
		methods: {
			planned(...args) {
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