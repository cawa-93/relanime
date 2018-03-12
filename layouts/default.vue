<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="filters"
      app
      right
    >
      <filters-menu></filters-menu>

    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">Подбор связанных аниме</v-toolbar-title>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-text-field
        class="main-search"
        id="main-search"
        solo-inverted
        label="Поиск"
        autofocus
        v-model="search"
        v-if="searchOpened || $vuetify.breakpoint.mdAndUp"
      ></v-text-field>
      <v-spacer v-if="!searchOpened || $vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-btn icon @click="searchOpened = false" v-if="searchOpened && $vuetify.breakpoint.smAndDown">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn icon @click="searchOpened = true" v-if="!searchOpened && $vuetify.breakpoint.smAndDown">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click="filters = !filters" v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">
        <v-icon>filter_list</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt/>
      </v-container>
    </v-content>
<!--     <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>

  import filtersMenu from '~/components/filters-menu'
  export default {
  	components: {filtersMenu},
  	data: () => ({
  		filters: null,
  		searchOpened: true
  	}),
  	computed: {
  		search: {
  			get () {
  				return this.$store.state.filters.searchField
  			},
  			set (value) {
  				this.$router.replace({query: {search: value}})
  				return this.$store.commit('filters/SET_SEARCH', value)
  			}
  		}
  	}
    // methods: {
    //   initSearch: debounce(async function () {
    //     if (this.search) {
    //       await this.$store.dispatch('anime/initQuery', {
    //         search: this.search,
    //         limit: 5
    //       })
    //     }
    //   }, 1000)
    // },
  }
</script>

<style>
  .main-search {
    flex-grow: 3;
  }
</style>
