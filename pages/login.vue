<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-card-title primary-title key="hello-text">
        <p class="headline mb-2">Приветствуем!</p>
        <p>Этот сайт предназначен для быстрого поиска продолжений (или других связей) тех аниме, которые вы уже смотрели!</p>
        <v-btn
          color="primary"
          :href="loginUrl"
        >
          Начать
        </v-btn>
      </v-card-title>

      <v-divider class="mt-3 mb-3"></v-divider>
      <v-card-text>
        <p>Или воспользуйтесь нашим ботом, чтобы найти новое аниме себе по вкусу:</p>
        <bot-buttons color="blue" dark icon flat class="bot-buttons" large ></bot-buttons>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import qs from 'qs'
  import botButtons from '~/components/bot-buttons'
  export default {
  	layout: 'center',
    components: {botButtons},
  	data () {
  		return {
  			loginUrl: 'https://shikimori.org/oauth/authorize?' + qs.stringify({
  				client_id: process.env.CLIENT_ID,
  				redirect_uri: process.env.REDIRECT_URI,
  				response_type: 'code'
  			}),
  		}
  	}
  }
</script>

<style>
  .bot-buttons {
    justify-content: space-around;
  }
  .bot-buttons .btn {
    font-size: 1.5em;
    width: 70px;
    height: 70px;
  }
</style>
