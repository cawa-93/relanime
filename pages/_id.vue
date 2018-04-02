<template>
	<v-layout row wrap>
		<v-flex xs12 v-if="anime" class="graph-container">
			<div v-if="prequels" class="pt-3">
				<anime-card-related class="related-card pb-5" v-for="anime in prequels" :anime="anime" :key="anime.id"></anime-card-related>
			</div>
			<anime-card :anime="anime" :franchise="franchise" id="target-anime"></anime-card>
			<div v-if="sequels">
				<anime-card-related v-for="(anime, i) in sequels" :anime="anime" :key="anime.id" :class="{
					'related-card pt-5': true,
					'last': i+1 === sequels.length
				}" ></anime-card-related>
			</div>
		</v-flex>

		<v-flex xs12 v-if="!relatedLoaded">
			<progress-circular indeterminate color="red"></progress-circular>
		</v-flex>
	</v-layout>
</template>

<script>
	import axios from '~/plugins/axios'
	import animeCard from '~/components/single/anime-card'
	import animeCardRelated from '~/components/single/anime-card-related'
	import progressCircular from '~/components/progress-circular'
	import franchise from '~/mixins/franchise'
	export default {
		name: 'anime-single',
		layout: 'right-navbar',
		mixins: [franchise],
		components: {animeCard, progressCircular, animeCardRelated},
		data () {
			return {
				anime: null,
				franchise: null,
				relatedLoaded: false,
			}
		},
		async mounted () {
			const {data: anime} = await axios.get(`/shiki/animes/${this.$route.params.id}`)
			this.anime = anime
			const {data: franchise} = await axios.get(`/shiki/animes/${this.anime.id}/franchise`)
			this.franchise = franchise
			await this.$nextTick()
			this.$vuetify.goTo('#target-anime', {duration: 0})
			this.relatedLoaded = true
		},
	}
</script>
<style scoped>
	.root {
		width: 100%;
	}

	.graph-container {
		position: relative;
	}

	#target-anime {
		z-index: 2;
	}
</style>
<style>
	.b-prgrph {
		margin-bottom: 16px;
	}
</style>
