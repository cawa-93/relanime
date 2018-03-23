<template>
  <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-card-title primary-title>
          <h1 class="headline mb-2">Чат бот для поиска аниме</h1>
          <p>Используйте нашего чат-бота, чтобы моментально подобрать любые аниме по вашему вкусу</p>
        </v-card-title>
        <no-ssr>
          <v-card-text>
            <bot-buttons color="blue" dark icon flat class="bot-buttons" large ></bot-buttons>
          </v-card-text>
        </no-ssr>
      </v-card>
      <p class="text-xs-center mt-5">
        <nuxt-link to="/">Вернуться на главную</nuxt-link>
      </p>
      <p class="text-xs-center mt-5">
        <a class="caption grey--text" target="_blank" href="https://github.com/cawa-93/dialogflow-anime/blob/master/Privacy%20Policy.txt">Privacy Policy</a>
      </p>
  </v-flex>
</template>

<script>
  import botButtons from '~/components/bot-buttons'
  export default {
    head: {
      title: 'Чат бот для поиска аниме',
    },
    layout: 'center',
    components: {botButtons}
  }
</script>

<style>
  .bot-buttons {
    justify-content: space-around;
  }
  .bot-buttons .btn {
    font-size: 2em;
    width: 70px;
    height: 70px;
  }
</style>
