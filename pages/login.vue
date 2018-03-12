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
          <v-text-field placeholder="Введите название" name="mainSearch" flat v-model="mainSearch"></v-text-field>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
  	layout: 'center',
  	data () {
  		return {
  			loginUrl: '/',
  			mainSearch: ''
  		}
  	}
  }
</script>
