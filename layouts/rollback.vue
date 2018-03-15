<template>
  <v-app id="inspire">
      <v-toolbar color="primary" dark fixed app class="app-toolbar" clipped-right flat :height="56">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title><h1>{{title}}</h1></v-toolbar-title>
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
  	data: () => ({
  		title: process.env.NAME
  	}),
  }
</script>

<style>
  .app-toolbar .toolbar__title h1 {
    font-size: 82%;
    font-weight: normal;
  }
</style>
