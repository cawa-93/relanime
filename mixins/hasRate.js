export default {
	computed: {
		user_rate () {
			if (!this.anime) return null
			return this.$store.state.user.userRates.find(rate => rate.target_id === this.anime.id) || null
		},
		user_rate_meta () {
			const status = this.user_rate ? this.user_rate.status : null
			switch (status) {
				case 'planned' : return {text: 'Запланировано', color: 'blue', icon: 'watch_later'}
				case 'watching' : return {text: 'Смотрю', color: 'blue', icon: 'play_circle_filled'}
				case 'rewatching' : return {text: 'Пересматриваю', color: 'blue', icon: 'history'}
				case 'completed' : return {text: 'Просмотрено', color: 'green', icon: 'done'}
				case 'on_hold' : return {text: 'Отложено', color: 'grey', icon: 'pause_circle_outline'}
				case 'dropped' : return {text: 'Брошено', color: 'red', icon: 'cancel'}
				default : return {text: 'Запланировать просмотр', color: 'grey', icon: 'schedule'}
			}
		}
	}
}
