<template>
  <v-flex
    xs12
    md10>
    <v-container class="grid-list-xl">
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          sm6>
          <h1 class="display-1">Фокси<br><span class="subheading grey--text"> — индивидуальный подбор аниме по вкусу</span></h1>
          <p>Ты можешь искать аниме по жанру (например, фантастика, повседневность, меха и т.д.) или названию. Я даже могу найти тебе лучшие аниме в своем жанре и показать тебе их целыми списками! Только спроси!</p>
          <p>Вот, что у меня часто спрашивают:</p>
          <ul>
            <li>лучшие аниме</li>
            <li>школа</li>
            <li>Тетрадь смерти</li>
            <li>список аниме в жанре этти</li>
          </ul>

          <p>И не ругай меня, я только учусь ☺️</p>
          <v-btn
            v-for="link in links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            icon
            fab>
            <img
              height="40px"
              :src="link.icon"
              :alt="link.title">
          </v-btn>
        </v-flex>

        <v-flex
          xs12
          sm6
          class="text-xs-center">
          <iframe
            class="elevation-12"
            height="530"
            src="https://console.dialogflow.com/api-client/demo/embedded/f0afbab9-ebd7-4520-8122-1354510b0c79"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
export default {
	head: {
		title: 'Чат бот для поиска аниме',
	},
	layout: 'center',
	data: () => ({
		links: [
      {title: 'Messanger', icon: '/messengerIcon.svg', url: 'https://m.me/animeFoxBot'},
      {title: 'Telegram', icon: '/telegramIcon.svg', url: 'https://t.me/animeFoxBot'},
      {title: 'Skype', icon: 'skypeIcon.svg', url: 'https://join.skype.com/bot/a6d9971b-a7ed-476b-980d-e1fc41db0d12'},
		],
	}),
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
  iframe {
    border: 0;
    width: 100%;
  }
</style>
