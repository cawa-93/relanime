<template>
  <transition-group
    name="flip-list"
    tag="v-list"
    class="pt-0">
    <v-list-tile
      v-for="filter in sortedFilters"
      :key="filter.key"
      @click="toggle(filter.key)">
      <v-list-tile-action>
        <v-switch
          color="primary"
          :input-value="filter.enabled"/>
      </v-list-tile-action>
      <v-list-tile-content>{{ filter.title }}</v-list-tile-content>
    </v-list-tile>
  </transition-group>
</template>

<script>
export default {
	name: 'FiltersMenu',
	computed: {
		sortedFilters () {
			return [
				...this.$store.state.filters.filters.filter(f => f.enabled),
				...this.$store.state.filters.filters.filter(f => !f.enabled),
			]
		},
	},
	methods: {
		toggle (key) {
			this.$store.commit('filters/TOGGLE_FILTER', key)
		},
	},
}
</script>

<style>
  .flip-list-move {
    transition: transform .3s;
  }
</style>
