<template>
  <div>
    <transition name="slide-y-reverse-transition">
      <v-card
        :tile="$vuetify.breakpoint.smAndDown"
        nuxt
        :to="`/${anime.id}`"
        v-if="filtered.length">
        <v-container
          fluid
          pa-0>
          <v-layout
            ma-0
            v-bind="{
              column:$vuetify.breakpoint.smAndDown
          }">
            <v-flex
              xs12
              md3
              pa-0>
              <v-card-media
                class="white--text grey lighten--2"
                :height="$vuetify.breakpoint.smAndDown ? '200px' : '350px'"
                :src="`https://shikimori.org${anime.image.original}`"
              />
            </v-flex>
            <v-flex
              xs12
              md9
              pa-0>
              <div class="franchise">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ anime.russian || anime.name }}</div>
                    <span
                      v-if="anime.russian"
                      class="grey--text">{{ anime.name }}</span>
                  </div>
                </v-card-title>
                <v-list
                  subheader
                  class="pb-0">
                  <v-subheader>Хронология</v-subheader>
                  <transition-group
                    name="slide-x-transition"
                    tag="div">
                    <anime-card-related
                      v-for="row in filtered"
                      :key="row.id"
                      :anime="row"
                    />
                  </transition-group>
                </v-list>
                <v-btn
                  nuxt
                  :to="`/${anime.id}`"
                  flat
                  block
                  large>Прочее</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <!-- <p v-if="filtered.length">{{ anime }}</p> -->
    </transition>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import animeCardRelated from '~/components/feed/anime-card-related'
import franchise from '~/mixins/franchise'

export default {
	name: 'AnimeCard',
	components: {animeCardRelated},
	mixins: [franchise],
	props: {
		anime: {
			type: Object,
			required: true,
		},
		hideWatched: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		franchise: null,
		show: true,
	}),
	computed: {
		filtered () {
			if (!this.hideWatched) return this.chronology
			return this.chronology.filter(anime => {
				const rate = this.$store.state.user.userRates.find(rate => rate.target_id === anime.id)
				return !rate || rate.status !== 'completed'
			})
		},
		chronology () {
			if (!this.prequels.length && !this.sequels.length) return []
			return this.prequels.concat([this.anime]).concat(this.sequels)
		},
	},

	async mounted () {
		this.franchise = (await axios.get(`/shiki/animes/${this.anime.id}/franchise`)).data
		await this.$nextTick()
		this.$emit('onload', this.chronology.map(anime => anime.id))
	},
}
</script>

<style scoped>
.franchise {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.franchise .btn {
  margin: auto 0 0 0;
  max-height:44px;
}
</style>
