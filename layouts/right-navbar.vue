<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="filters"
      app
      right
      clipped
      disable-route-watcher
    >
      <v-subheader>Фильтры</v-subheader>
      <filters-menu></filters-menu>
      <v-subheader>Контакты</v-subheader>

    </v-navigation-drawer>
    <no-ssr>
      <v-toolbar color="primary" dark fixed app class="app-toolbar" clipped-right flat :height="56">
        <template v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">
          <v-toolbar-title><h1>{{title}}</h1></v-toolbar-title>
          <v-spacer></v-spacer>
        </template>

        <form @submit.prevent="updateSearch">
          <v-text-field
            flat
            class="main-search"
            ref="mainSearch"
            solo-inverted
            label="Поиск аниме"
            v-model="search"
            v-if="searchOpened || $vuetify.breakpoint.mdAndUp"
            prepend-icon="search"
            append-icon="close"
            :append-icon-cb="() => {searchOpened = false; search = ''}"
          ></v-text-field>
        </form>

        <template v-if="!searchOpened || $vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-btn icon @click="searchOpened = true" v-if="$vuetify.breakpoint.smAndDown">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon @click="filters = !filters">
            <v-icon>filter_list</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
    </no-ssr>
    <v-content>
      <v-container fill-height>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import filtersMenu from '~/components/filters-menu'
  export default {
  	components: {filtersMenu},
  	data() {
      return {
        filters: null,
        searchOpened: !!this.$store.state.filters.searchField,
        title: process.env.NAME,
        search: this.$store.state.filters.searchField,
      }
    },
    methods: {
      updateSearch() {
        this.$store.commit('filters/SET_SEARCH', this.search)
      }
    }
  }
</script>

<style>
  .app-toolbar .toolbar__title h1 {
    font-size: 82%;
    font-weight: normal;
    margin-left: 15px;
  }
  .main-search {
    flex-grow: 3;
  }
</style>
