<template>
<div class="elevation-3 anime-card card">
  <v-layout>
    <div>
      <img :src="`https://shikimori.org${anime.image.preview}`" :alt="anime.name">
    </div>
    <div class="card-content">
      <p class="title pl-3 mt-3">{{anime.russian}}</p>
      <template v-for="(relation, key) in anime.relateds" v-if="filters[key] && filters[key].enabled && relation.items && relation.items.length">
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
  </v-layout>
</div>
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