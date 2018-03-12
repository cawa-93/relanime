<template>
  <transition-group name="slide-y-transition" tag="div">
    <anime-card
      v-for="anime in list" :key="anime.id"
      :anime="anime"
      class="anime-item mb-3"
    ></anime-card>

<!--     <div class="content-loading justify-center mb-3" key="content-loading" v-if="busy">
      <v-progress-circular
        indeterminate
        :color="$nuxt.$loading.canSuccess ? 'success' : 'error'"
      ></v-progress-circular>
    </div> -->

  </transition-group>
</template>

<script>
import animeCard from '~/components/anime-card'
export default {
	name: 'anime-list',
	components: {animeCard},
	props: {
		list: {
			type: Array
        // required: true,
		}
	}
}
</script>
