<template>

  <v-list-tile :to="`/${anime.id}`" nuxt
    :class="user_rate_meta.color === 'grey' ? '' : `${user_rate_meta.color} ${user_rate_meta.color}--text lighten-5`"
  >
    <v-list-tile-action>
      <v-tooltip top>
        <v-btn flat slot="activator" icon @click.stop.prevent="addRate" >
          <v-icon :color="user_rate_meta.color">{{user_rate_meta.icon}}</v-icon>
        </v-btn>
        <span>{{user_rate_meta.text}}</span>
      </v-tooltip>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title v-text="anime.russian || anime.name"></v-list-tile-title>

    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import hasRate from '~/mixins/hasRate'

export default {
	name: 'anime-status',
	mixins: [hasRate],
	props: {
		anime: {
			type: Object,
			required: true
		}
	},
	computed: {
	},
	methods: {
		async addRate () {
			await this.$store.dispatch('user/updateRate', {
				user_rate: {
					id: this.user_rate ? this.user_rate.id : null,
					status: this.user_rate && this.user_rate.status === 'planned' ? 'delete' : 'planned',
					target_id: this.anime.id,
					target_type: 'Anime'
				}
			})
		}
	}
}
</script>
