<template>
  <v-card :tile="$vuetify.breakpoint.smAndDown" class="anime-card">
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
        <v-flex pa-0 xs12 md9>
          <div>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{anime.russian || anime.name}}</div>
                <span v-if="anime.russian" class="grey--text">{{anime.name}}</span>
              </div>
            </v-card-title>

            <v-layout row wrap>
              <v-flex xs12 sm6 md4>
                <v-subheader>Статус</v-subheader>
                <div class="pt-2 pr-3 pb-2 pl-3">
                  <span v-if="anime.anons" class="red--text">
                    {{anime.aired_on ? `Начало показа: ${anime.aired_on}` : 'Анонс'}}
                  </span>
                  <span v-else-if="anime.ongoing" class="blue--text">
                    Онгоинг {{anime.episodes_aired}}/{{anime.episodes}}
                  </span>
                  <span v-else class="green--text">
                    {{anime.released_on ? `Дата выхода: ${anime.released_on}` : 'Вышел'}}
                  </span>
                </div>
                  <v-select
                    :color="status.color"
                    :class="['user-rate', status.color === 'grey' ? '' : `${status.color} ${status.color}--text lighten-5`]"
                    :prepend-icon="status.icon"
                    solo
                    clearable
                    flat
                    hide-details
                    loading
                    :hide-selected="true"
                    :items="rates"
                    v-model="currentRate"
                    label="Добавить в список"
                    single-line
                  ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md3 v-if="!anime.anons">
                <v-subheader>Оценка</v-subheader>
                <div class="pt-2 pr-3 pb-2 pl-3">{{anime.score}}/10</div>
                <v-btn :href="`https://play.shikimori.org/animes/${anime.id}`" target="_blank">
                  <span v-if="currentRate === 'watching' || currentRate === 'rewatching'">
                    Продолжить просмотр
                  </span>
                  <span v-else-if="currentRate === 'completed'">Пересмотреть</span>
                  <span v-else-if="currentRate === 'completed'">Пересмотреть</span>
                  <span v-else-if="currentRate === 'dropped'">Возобновить просмотр</span>
                  <span v-else>Начать просморт</span>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-expansion-panel class="elevation-0" expand>
              <v-expansion-panel-content v-if="anime.description" >
                <div slot="header">Описание</div>
                <div v-html="anime.description_html" class="pl-3 pr-3 pb-3"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
// import animeCardRelated from '~/components/anime-card-related'

export default {
	name: 'single-anime-card',
	// components: {animeCardRelated},
	props: {
		anime: {
			type: Object,
			required: true
		}
	},
  data() {
    return {
      currentRate: this.anime.user_rate ? this.anime.user_rate.status : null,
      rates: [
        {text: 'Запланировано', value: 'planned'},
        {text: 'Смотрю', value: 'watching'},
        {text: 'Пересматриваю', value: 'rewatching'},
        {text: 'Просмотрено', value: 'completed'},
        {text: 'Отложено', value: 'on_hold'},
        {text: 'Брошено', value: 'dropped'},
      ],
    }
  },
  computed: {
    status () {
      switch (this.currentRate) {
        case 'planned' : return {text: 'Запланировано', color: 'blue', icon: 'watch_later'}
        case 'watching' : return {text: 'Смотрю', color: 'blue', icon: 'play_circle_filled'}
        case 'rewatching' : return {text: 'Пересматриваю', color: 'blue', icon: 'history'}
        case 'completed' : return {text: 'Просмотрено', color: 'green', icon: 'done'}
        case 'on_hold' : return {text: 'Отложено', color: 'grey', icon: 'pause_circle_outline'}
        case 'dropped' : return {text: 'Брошено', color: 'red', icon: 'cancel'}
        default : return {text: 'Запланировать', color: 'grey', icon: 'schedule'}
      }
    }
  },
	// methods: {
	// 	planned (...args) {
	// 		this.$emit('toggle-planned', ...args)
	// 	},
	// 	showSection (key) {
	// 		const filter = this.$store.state.filters.filters.find(f => f.key === key)
	// 		return filter && filter.enabled
	// 	}
	// }
}
</script>

<style>
  .user-rate .input-group__prepend-icon,
  .user-rate .input-group__selections__comma {
    color: inherit !important;
  }
</style>
