<template>
	<v-layout row wrap>
		<v-flex xs12 v-if="anime" class="graph-container">
			<div v-if="prequels" class="pt-3">
				<anime-card-related class="related-card pb-5" v-for="anime in prequels" :anime="anime" :key="anime.id"></anime-card-related>
			</div>
			<anime-card :anime="anime" id="target-anime"></anime-card>
			<div v-if="sequels">
				<anime-card-related v-for="(anime, i) in sequels" :anime="anime" :key="anime.id" :class="{
					'related-card pt-5': true,
					'last': i+1 === sequels.length
				}" ></anime-card-related>
			</div>
		</v-flex>


		<!-- <template v-if="related && related.length">
			<v-flex xs12 class="pb-0 pt-3" id="franchise">
				<v-subheader>Связанное</v-subheader>
			</v-flex>
			<v-flex xs12 sm6 v-for="rel in related" :key="rel.id">
				<anime-card-related :related="rel" :class="{
					'text-xs-center': $vuetify.breakpoint.smAndDown
				}"></anime-card-related>
			</v-flex>
		</template> -->

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
	export default {
		name: 'anime-single',
		layout: 'right-navbar',
		components: {animeCard, progressCircular, animeCardRelated},
		data () {
			return {
				anime: null,
				franchise: null,
				relatedLoaded: false,
			}
		},
		computed: {
			prequels () {
				return this.getSortedNodes('prequel').reverse()
			},
			sequels () {
				return this.getSortedNodes('sequel')
			},
		},
		methods: {
			getLink (id, type) {
				return this.franchise.links.find(l => l.relation === type && l.source === id)
			},
			getSortedNodes (type) {
				const nodes = []

				if (!this.franchise) {
					return nodes
				}

				let node = this.getLink(this.franchise.nodes.findIndex(n => n.id === this.anime.id), type)
				while (node !== undefined) {
					nodes.push(this.franchise.nodes[node.target])
					node = this.getLink(node.target, type)
				}
				return nodes
			},
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
		z-index: 5;
	}
</style>
<style>
	.b-prgrph {
		margin-bottom: 16px;
	}
</style>
