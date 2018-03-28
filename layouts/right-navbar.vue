<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="sidebar"
      app
      clipped
      disable-route-watcher
    >
      <v-card color="blue" dark nuxt to="/bot">
        <v-card-title primary-title>
          <h3 class="headline mb-0">Найди аниме по вкусу</h3>
          <div>Используйте нашего чат-бота, чтобы моментально подобрать любые аниме по вашему вкусу</div>
        </v-card-title>
        <v-card-actions>
          <bot-buttons flat></bot-buttons>
        </v-card-actions>
      </v-card>

      <v-subheader>Фильтры</v-subheader>
      <filters-menu></filters-menu>
    </v-navigation-drawer>
    <no-ssr>
      <v-toolbar color="primary" dark fixed app class="app-toolbar" clipped-left flat :height="56">
        <v-toolbar-side-icon @click="sideIconClick">
          <v-icon v-if="routeName === 'id'">arrow_back</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title v-if="showTitle">
          <nuxt-link to="/"><h1  class="white--text">{{title}}</h1></nuxt-link>
        </v-toolbar-title>

        <form
          @submit.prevent="$router.push({name: 'search', query:{q: search}})"
          action="/search"
          v-if="open"
          :class="{
              'main-search-input': true,
              'full-width': this.$vuetify.breakpoint.smAndDown
            }"
          >
          <v-text-field
            name="q"
            flat
            solo-inverted
            label="Введите название ..."
            v-model="search"
            prepend-icon="search"
            :append-icon="search ? 'close' : ''"
            :append-icon-cb="clearSearch"
          ></v-text-field>
        </form>
        <v-btn icon v-else @click="searchOpened = true" class="main-search-btn">
          <v-icon>search</v-icon>
        </v-btn>

      </v-toolbar>
    </no-ssr>
    <v-content>
      <v-container grid-list-xl class="full-with-xs">
      <offline-indicator></offline-indicator>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import offlineIndicator from '~/components/offline-indicator'
  import filtersMenu from '~/components/filters-menu'
  import botButtons from '~/components/bot-buttons'
  export default {
  	components: {filtersMenu, offlineIndicator, botButtons},
  	data () {
  		return {
  			search: '',
  			sidebar: null,
  			searchOpened: false,
  			title: process.env.NAME
  		}
  	},
  	computed: {
  		routeName () {
  			return this.$route.name
  		},
  		open: {
  			get () { return this.searchOpened || this.$vuetify.breakpoint.mdAndUp },
  			set (value) { this.searchOpened = value }
  		},
  		showTitle () {
  			return !this.searchOpened || this.$vuetify.breakpoint.mdAndUp
  		}
  	},
  	methods: {
  		updateSearch () {
  			this.$store.commit('filters/SET_SEARCH', this.search)
  		},
  		sideIconClick () {
  			if (this.routeName === 'id') {
  				this.$router.push({name: 'index'})
  			} else {
  				this.sidebar = !this.sidebar
  			}
  		},
  		clearSearch () {
  			this.searchOpened = false
  			this.search = ''
  			this.$router.push('/')
  		}
  	},
  	mounted () {
  		if (this.$route.query.q) {
  			this.search = this.$route.query.q
  			this.searchOpened = true
  		}
  	},
  	watch: {
  		$route (to, from) {
  			if (to.name === 'id') {
  				if (from.name !== 'id') {
  					this._sidebar = this.sidebar
  					this.sidebar = false
  				}
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
    flex: 1;
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
