<template>
	<div class="root">
		<div class="vertical-line grey lighten-2"></div>

		<div class="icon-container grey lighten-2" >
			<v-btn icon large @click="addRate"
			:class="[
			'ma-0',
			user_rate_meta.color !== 'grey' ?
			`${user_rate_meta.color} ${user_rate_meta.color}--text lighten-5` :
			'white'
			]"
			>
			<v-icon medium>{{user_rate_meta.icon}}</v-icon>
		</v-btn>
		</div>

			<v-card hover nuxt :to="`/${anime.id}`"
			:class="[
      'card-content',
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
								<span v-if="user_rate">({{user_rate_meta.text}})</span>
							</div>
							<div class="headline">{{anime.russian || anime.name}}</div>
						</div>
					</v-flex>
					<v-flex xs12 v-if="$vuetify.breakpoint.smAndUp" style="max-width: 96px;">
						<v-card-media
						:src="anime.image_url"
						height="125px"
						contain
						></v-card-media>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</div>
</template>

<script>
	import hasRate from '~/mixins/hasRate'
	export default {
		name: 'single-anime-card-related',
		mixins: [hasRate],
		props: {
			anime: {
				type: Object,
				required: true,
			},
		},
		methods: {
			async addRate () {
				await this.$store.dispatch('user/updateRate', {
					user_rate: {
						id: this.user_rate ? this.user_rate.id : null,
						status: this.user_rate && this.user_rate.status === 'planned' ? 'delete' : 'planned',
						target_id: this.anime.id,
						target_type: 'Anime',
					},
				})
			},
		},
	}
</script>

<style scoped="">
	.root {
		display: flex;
		align-items: start;
		position: relative;
		padding-left: 105px;

	}
	.vertical-line {
		position: absolute;
		width: 5px;
		height: 100%;
		top: 0;
		left: 129px;
	}
	.root.last .vertical-line {
		height: 80px;
	}
	.icon-container {
		border: 4px solid #000;
		border-radius: 50%;
		margin-right: 10px;
	}
  .card-content {
    z-index: 2;
  }

	@media (max-width: 960px) {
		.root {
			flex-direction: column;
			align-items: center;
			padding-left: 0;
		}

		.vertical-line {
			left: calc(50% - 2.5px)
		}

		.icon-container {
			margin-right: 0;
			margin-bottom: 10px;
		}

	}
</style>
