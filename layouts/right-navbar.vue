<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="sidebar"
      app
      clipped
      disable-route-watcher
    >
      <v-subheader>Фильтры</v-subheader>
      <filters-menu></filters-menu>
      <v-subheader>Контакты</v-subheader>

    </v-navigation-drawer>
    <no-ssr>
      <v-toolbar color="primary" dark fixed app class="app-toolbar" clipped-left flat :height="56">
        <v-toolbar-side-icon @click="sideIconClick" v-if="showTitle">
          <v-icon v-if="routeName !== 'index'">arrow_back</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title v-if="showTitle">
          <nuxt-link to="/"><h1  class="white--text">{{title}}</h1></nuxt-link>
        </v-toolbar-title>

        <v-text-field
          :class="{
            'main-search-input': true,
            'full-width': this.$vuetify.breakpoint.smAndDown
          }"
          flat
          solo-inverted
          label="Введите название ..."
          v-model="search"
          v-if="open"
          prepend-icon="search"
          append-icon="close"
          :append-icon-cb="() => {searchOpened = false}"
        ></v-text-field>
        <v-btn icon v-else @click="searchOpened = true" class="main-search-btn">
          <v-icon>search</v-icon>
        </v-btn>

      </v-toolbar>
    </no-ssr>
    <v-content>
      <v-container grid-list-xl class="full-with-xs">
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import filtersMenu from '~/components/filters-menu'
  import mainSearch from '~/components/main-search'
  export default {
  	components: {filtersMenu, mainSearch},
  	data() {
      return {
        search: '',
        sidebar: null,
        searchOpened: false,
        title: process.env.NAME,
      }
    },
    computed: {
      routeName() {
        return this.$route.name
      },
      open: {
        get() { return this.searchOpened || this.$vuetify.breakpoint.mdAndUp },
        set(value) { return this.searchOpened = value },
      },
      showTitle() {
        return !this.searchOpened || this.$vuetify.breakpoint.mdAndUp
      }
    },
    methods: {
      updateSearch() {
        this.$store.commit('filters/SET_SEARCH', this.search)
      },
      sideIconClick() {
        if (this.routeName !== 'index') {
          this.$router.go(-1)
        } else {
          this.sidebar = !this.sidebar
        }
      },
    },
    watch: {
      $route(to, from) {
        if (to.name === 'id') {
          this._sidebar = this.sidebar
          this.sidebar = false
        } else {
          this.sidebar = this._sidebar
        }
      }
    }
  }
</script>

<style>
  .app-toolbar .toolbar__title h1 {
    font-size: 82%;
    font-weight: normal;
  }
  .main-search-btn {
    margin-left: auto;
  }
  .main-search-input {
    max-width: 700px;
    margin-left: 100px;
  }
  .main-search-input.full-width {
    margin: 0;
  }
  @media (max-width: 600px) {
    .container.grid-list-xl.full-with-xs {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
