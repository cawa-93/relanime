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
    <no-ssr>
      <v-toolbar color="primary" dark fixed app>

        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-toolbar-title>Подбор связанных аниме</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            class="main-search"
            solo-inverted
            label="Поиск"
            v-model="search"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn icon @click="filters = !filters" v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">
            <v-icon>filter_list</v-icon>
          </v-btn>
        </template>
        <template v-else-if="searchOpened">
          <v-text-field
            class="main-search"
            id="main-search"
            solo-inverted
            label="Поиск"
            autofocus
            v-model="search"
          ></v-text-field>
          <v-btn icon @click="searchOpened = false" v-if="searchOpened && $vuetify.breakpoint.smAndDown">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-toolbar-title>Подбор связанных аниме</v-toolbar-title>
          <v-btn icon @click="searchOpened = true" v-if="!searchOpened && $vuetify.breakpoint.smAndDown">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon @click="filters = !filters" v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">
            <v-icon>filter_list</v-icon>
          </v-btn>

        </template>
      </v-toolbar>
    </no-ssr>
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
  		searchOpened: false
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
  }
</script>

<style>
  .main-search {
    flex-grow: 3;
  }
</style>
