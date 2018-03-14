<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-card-title primary-title key="hello-text">
        <p class="headline mb-2">Приветствуем!</p>
        <p>Мы автоматически просканируем список просмотренного вами аниме, чтобы найти то, что вы ещё не видели!</p>
        <v-btn
          color="primary"
          :href="loginUrl"
        >
          Начать
        </v-btn>
      </v-card-title>

      <v-divider class="mt-3 mb-3"></v-divider>
      <v-card-text>
        <p>Или введите название интересующего вас аниме:</p>
        <form method="GET" action="/">
          <v-text-field placeholder="Введите название" name="search" flat v-model="mainSearch"></v-text-field>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import qs from 'qs'
  export default {
    middleware: 'auth',
    layout: 'center',
    data () {
      return {
        loginUrl: 'https://shikimori.org/oauth/authorize?' + qs.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        response_type: 'code'
      }),
        mainSearch: ''
      }
    }
  }
</script>
