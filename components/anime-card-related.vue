<template>

	<v-list-tile :to="`/${anime.id}`" nuxt
		:class="status.color === 'grey' ? '' : `${status.color} ${status.color}--text lighten-5`"
	>
		<v-list-tile-action>
			<v-tooltip top>
				<v-btn flat slot="activator" icon @click.stop.prevent="togglePlanned(anime)" >
					<v-icon :color="status.color">{{status.icon}}</v-icon>
				</v-btn>
				<span>{{status.text}}</span>
			</v-tooltip>
		</v-list-tile-action>
		<v-list-tile-content>
			<v-list-tile-title v-text="anime.russian || anime.name"></v-list-tile-title>
		</v-list-tile-content>
	</v-list-tile>
</template>

<script>
	export default {
		name: 'anime-status',
		props: {
			anime: {
				type: Object,
				required: true
			}
		},
		computed: {
			status () {
				switch (this.anime.rate.status) {
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
		methods: {
			async togglePlanned (anime) {
				this.$nuxt.$loading.start()
        try {
          await this.$store.dispatch('anime/togglePlanned', anime)
        } catch (e) {

        }
				this.$nuxt.$loading.finish()
			}
		}
	}
</script>


<i class="material-icons">pause_circle_outline</i>
