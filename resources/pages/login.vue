{{{{raw}}}}
<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout
        justify-center
        align-center
      >

      <div class="elevation-3 login pa-4">
       <p class="headline mb-2">Приветствуем!</p>
       <p>Нажмите кнопку <b>начать</b> и мы просканирует все аниме, которые вы уже смотрели, чтобы найти продолжение которого вы ещё не видели</p>
       <v-btn
        color="primary"
        href="https://shikimori.org/oauth/authorize?client_id=50a11432c298574cef0f34ed591e4a0d36adace23305b24f2d8e5372d2b270e8&redirect_uri=https%3A%2F%2Fsearch-sequels.herokuapp.com%2Flogin-handler&response_type=code">Начать</v-btn>
      </div>
      </v-layout>
    </v-container>
  </v-app>
</template>
{{{{/raw}}}}
<script>
export default {}
</script>

<style scoped>

.login {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}
</style>
