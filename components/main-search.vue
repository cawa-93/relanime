<template>
  <div class="root">
    <v-text-field
      flat
      class="main-search-field"
      ref="mainSearch"
      solo-inverted
      label="Поиск аниме"
      v-model="search"
      v-if="value"
      prepend-icon="search"
      append-icon="close"
      :append-icon-cb="clear"
    ></v-text-field>
    <v-btn icon v-else @click="open" class="main-search-btn">
      <v-icon>search</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'main-search',
    props: ['value'],
    data() {
      return {
        search: '',
      }
    },
    methods: {
      clear() {
        this.search = ''
        if (this.$vuetify.breakpoint.smAndDown) {
          this.$emit('input', false)
        }
      },
      open() {
        this.$emit('input', true)
      },
    },
  }
</script>

<style scoped>
  .main-search-field {
    flex: 1;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .main-search-btn {
    margin-left: auto;
  }
</style>
