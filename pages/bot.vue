<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-card-title primary-title>
        <h1 class="headline mb-2">Чат бот для поиска аниме</h1>
        <p>Используйте нашего чат-бота, чтобы моментально подобрать любые аниме по вашему вкусу</p>
      </v-card-title>
      <v-list>
        <template v-for="(link, i) in links">
          <v-list-tile  :key="link.title" :href="link.url" target="_blank">
            <v-list-tile-action>
              <img :src="link.icon" :alt="link.title+' icon'" height="40">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset v-if="i+1 < links.length"></v-divider>

        </template>
      </v-list>
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
  export default {
  	head: {
  		title: 'Чат бот для поиска аниме'
  	},
  	layout: 'center',
  	data: () => ({
      links: [
        {title: 'Messanger', icon: '/messengerIcon.svg', url: 'https://m.me/animeFoxBot'},
        {title: 'Telegram', icon: '/telegramIcon.svg', url: 'https://t.me/animeFoxBot'},
        {title: 'Skype', icon: 'skypeIcon.svg', url: 'https://join.skype.com/bot/a6d9971b-a7ed-476b-980d-e1fc41db0d12'},
      ]
    })
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
