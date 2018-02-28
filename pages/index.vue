<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <template v-if="!isLogin">
          
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12 pa-4">

                <p class="headline mb-2">Приветствуем!</p>
                <p>Мы автоматически просканируем спасок просмотренного вами аниме, чтобы найти то, что вы ещё не видели</p>
                <v-btn
                  color="primary"
                  href="https://shikimori.org/oauth/authorize?client_id=50a11432c298574cef0f34ed591e4a0d36adace23305b24f2d8e5372d2b270e8&redirect_uri=https%3A%2F%2Fsearch-sequels.herokuapp.com%2Flogin-handler&response_type=code"
                >
                  Начать
                </v-btn>

                <v-divider class="mt-3 mb-3"></v-divider>
                <p>Или просто введите название интересующего вас аниме</p>
                <v-text-field placeholder="Введите название" key="mainSearch" flat autofocus v-model="mainSearch"></v-text-field>
              </v-card>
            </v-flex>
          </v-layout>

        </template>
        <template v-else>
          <v-layout align-start justify-start>
            <v-text-field placeholder="Поиск" key="mainSearch" flat autofocus v-model="mainSearch"></v-text-field>
          </v-layout>

          </v-text-field>
        </template>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import debounce from 'lodash.debounce'
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      mainSearch: '',
    }
  },
  computed: {
    isLogin() {
      return process.client && !!(this.mainSearch || this.$cookie.get('session'))
    }
  },
  asyncComputed: {
     async list() {
      if (!this.mainSearch) return []
      const {data: list} = await axios.get('/api/list?s='+this.mainSearch)
      return list
    }
  }
}
</script>
