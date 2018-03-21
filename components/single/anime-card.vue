<template>
  <v-card :tile="$vuetify.breakpoint.smAndDown" class="anime-card">
    <v-container fluid pa-0>
      <v-layout ma-0 v-bind="{
        column:$vuetify.breakpoint.smAndDown
      }">
        <v-flex xs12 md3 pa-0>
          <v-card-media
            class="white--text grey lighten--2"
            :height="$vuetify.breakpoint.smAndDown ? '200px' : '377px'"
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
            <v-list two-line>
              <v-list-tile class="red--text red lighten-5" v-if="anime.anons">
                <v-list-tile-action>
                  <v-icon color="red">info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Анонс</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{anime.aired_on ? `Начало показа: ${anime.aired_on}` : 'Дата начала не известна'}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile class="blue--text blue lighten-5" v-else-if="anime.ongoing">
                <v-list-tile-action>
                  <v-icon color="blue">info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Онгоинг</v-list-tile-title>
                    <v-list-tile-sub-title>
                      Вышло {{anime.episodes_aired || 0}} из {{anime.episodes || '?'}} эпизодов
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile class="green--text green lighten-5" v-else>
                <v-list-tile-action>
                  <v-icon color="green">info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Вышел</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{anime.released_on ? `Дата выхода: ${anime.aired_on}` : 'Дата выхода не известна'}}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-if="anime.score !== '0.0'" :class="ratingColor ? `${ratingColor} ${ratingColor}--text lighten-5` : ''">
                <v-list-tile-action>
                  <v-icon :color="ratingColor">star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{anime.score}}/10</v-list-tile-title>
                    <v-list-tile-sub-title>
                      Средняя оценка других пользователей
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-else>
                <v-list-tile-action>
                  <v-icon>star</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Ещё нет оценок от других пользователей</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-menu offset-y class="d-block">
                <v-list-tile
                 slot="activator"
                  :class="[
                    'user-rate',
                    user_rate_meta.color !== 'grey' ?
                    `${user_rate_meta.color} ${user_rate_meta.color}--text lighten-5` :
                    ''
                  ]"
                >
                  <v-list-tile-action>
                    <v-icon :color="user_rate_meta.color !== 'grey' ? user_rate_meta.color : ''">
                      {{user_rate_meta.icon}}
                    </v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                      <v-list-tile-title>{{user_rate_meta.text}}</v-list-tile-title>
                      <v-list-tile-sub-title v-if="anime.user_rate && anime.user_rate.score">
                        <span >
                          Ваша оценка: {{anime.user_rate.score}}/10
                        </span>
                      </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list>

                <v-list-tile
                  v-for="r in rates"
                  v-if="r.value !== 'delete' || (user_rate && user_rate.id)"
                  @click="addRate(r.value)"
                  :key="r.value"
                >
                  <v-list-tile-action>
                    <v-icon>{{r.icon}}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{r.text}}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            </v-list>

            <v-card-actions>
              <v-btn :href="`https://play.shikimori.org/animes/${anime.id}`" target="_blank" flat color="accent">
                Смотреть онлайн
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn flat v-if="anime.description" @click.native="showDescription = !showDescription">
                <span>Описание</span>
                <v-icon>{{ showDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition v-if="anime.description">
              <v-card-text v-show="showDescription" v-html="anime.description_html"></v-card-text>
            </v-slide-y-transition>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
// import animeCardRelated from '~/components/anime-card-related'
import hasRate from '~/mixins/hasRate'

export default {
  name: 'single-anime-card',
  // components: {animeCardRelated},
  mixins: [hasRate],
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDescription: false,
      rates: [
        {text: 'Запланировано', value: 'planned', icon: 'watch_later'},
        {text: 'Смотрю', value: 'watching', icon: 'play_circle_filled'},
        {text: 'Пересматриваю', value: 'rewatching', icon: 'history'},
        {text: 'Просмотрено', value: 'completed', icon: 'done'},
        {text: 'Отложено', value: 'on_hold', icon: 'pause_circle_outline'},
        {text: 'Брошено', value: 'dropped', icon: 'cancel'},
        {text: 'Удалить из списка', value: 'delete', icon: 'delete'},
      ],
    }
  },
  computed: {
    ratingColor() {
      const colors = ['red', 'deep-orange', 'orange', 'amber', 'yellow', 'lime', 'light-green', 'green']
      return colors[Math.floor( this.anime.score/(10/colors.length) )] || 'green'
    },
  },
  methods: {
    async addRate (status) {
      const newRate = await this.$store.dispatch('user/updateRate', {
        user_rate: {
          id: this.user_rate ? this.user_rate.id : undefined,
          status,
          target_id: this.anime.id,
          target_type: 'Anime',
        }
      })
    },
  }
}
</script>

<style>
  .user-rate .input-group__prepend-icon,
  .user-rate .input-group__selections__comma {
    color: inherit !important;
  }
</style>
