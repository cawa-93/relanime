<template>
  <v-card hover nuxt :to="`/${anime.id}`"
    :class="[
      user_rate_meta.color !== 'grey' ?
      `${user_rate_meta.color} ${user_rate_meta.color}--text lighten-5` :
      ''
    ]"
  >
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs12>
          <div>
            <div>
              {{related.relation_russian}}
              <span v-if="user_rate">({{user_rate_meta.text}})</span>
            </div>
            <div class="headline">{{anime.russian || anime.name}}</div>
          </div>
        </v-flex>
        <v-flex xs12 v-if="$vuetify.breakpoint.smAndUp" style="max-width: 96px;">
          <v-card-media
            :src="`https://shikimori.org${anime.image.x96}`"
            height="125px"
            contain
          ></v-card-media>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import hasRate from '~/mixins/hasRate'
  export default {
  	name: 'single-anime-card-related',
  	mixins: [hasRate],
  	props: {
  		related: {
  			type: Object,
  			required: true,
  		},
  	},
  	computed: {
  		anime () {
  			return this.related.anime
  		},
  	},
  }
</script>
