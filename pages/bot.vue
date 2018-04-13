<template>
  <v-flex
    xs12>
    <v-container class="pa-0">
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          md6
          pa-0
          mb-3>
          <div class="iphone-container">
            <transition-group
              name="slide-y-reverse-transition"
              tag="div"
              class="messages-wrapper">
              <div
                class="message-container mt-1"
                v-for="mess in messages"
                :key="mess.id"
                :class="{'out':mess.out}">
                <div
                  class="message">
                  <v-avatar
                    size="36"
                  >
                    <img
                      v-if="mess.ava"
                      src="/alice.png"
                      alt="avatar">
                  </v-avatar>
                  <div
                    class="message-text pa-2 my-0"
                    :class="{
                      'grey lighten-2': mess.out,
                      'accent white--text': !mess.out,
                    }"
                    v-html="mess.text"/>
                </div>
              </div>

            </transition-group>
          </div>
          <!-- <iframe
            class="elevation-12"
            height="530"
            src="https://console.dialogflow.com/api-client/demo/embedded/f0afbab9-ebd7-4520-8122-1354510b0c79"/>
        </v-flex> -->
        </v-flex>
        <v-flex
          xs12
          md6>
          <h1 class="display-1 text-xs-center text-md-left mb-2">Фокси<br><span class="subheading grey--text">индивидуальный подбор аниме по вкусу</span></h1>
          <div class="text-xs-center text-sm-left mb-2">
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
          </div>
          <p>Ты можешь искать аниме по жанру (например, фантастика, повседневность, меха и т.д.) или названию. Я даже могу найти тебе лучшие аниме в своем жанре и показать тебе их целыми списками! Только спроси!</p>
          <p>Вот, что у меня часто спрашивают:</p>
          <ul>
            <li>лучшие аниме</li>
            <li>школа</li>
            <li>Тетрадь смерти</li>
            <li>список аниме в жанре этти</li>
          </ul>

          <p>И не ругай меня, я только учусь ☺️</p>
        </v-flex>

      </v-layout>
    </v-container>
    <p class="mt-5 text-xs-center"><nuxt-link
      to="/"
      class="grey--text">Главная</nuxt-link></p>
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
		messages: [],
	}),
	mounted () {
		const messagesToShow = [
      {id: 1, out: 0, ava: 1, interval: 1, text: 'Привет'},
      {id: 2, out: 0, ava: 0, interval: 1, text: 'Я — Фокси'},
      {id: 3, out: 0, ava: 0, interval: 1, text: 'Какое аниме тебе нравится?'},
      {id: 4, out: 1, ava: 0, interval: 2, text: 'Посоветуй лучший триллер или детектив'},
      {id: 5, out: 0, ava: 1, interval: 2, text: 'Думаю, <a href="/1535">«Тетрадь смерти»</a> Тебе понравится'},
      {id: 6, out: 1, ava: 0, interval: 5, text: 'А что-то более свежее?'},
      {id: 7, out: 0, ava: 1, interval: 2, text: 'Хм...'},
      {id: 8, out: 0, ava: 0, interval: 1, text: 'Как насчет <a href="/37291">«Рассвет мира»</a>?'},
      {id: 9, out: 1, ava: 0, interval: 3, text: 'Я бы хотел какой-то сериал, а не ONA'},
      {id: 10, out: 0, ava: 1, interval: 2, text: 'В таком случае, <a href="/35994">«Ангел кровопролития»</a> — TV Сериал'},
      {id: 11, out: 1, ava: 0, interval: 5, text: 'А что есть из комедий?'},
      {id: 12, out: 0, ava: 1, interval: 3, text: 'Из свежих комедийных сериалов могу посоветовать <a href="/33010">«Фури-кури 2»</a>'},
      {id: 13, out: 1, ava: 0, interval: 3, text: 'А что eщё?'},
      {id: 14, out: 0, ava: 1, interval: 3, text: '... и <a href="/34134">«Ванпанчмен 2»</a>'},
      {id: 15, out: 1, ava: 0, interval: 3, text: 'Это мне подходит. Спасибо.'},
      {id: 16, out: 0, ava: 1, interval: 2, text: 'Всегда рада ☺️'},
      {id: 17, out: 0, ava: 1, interval: 2, text: 'Пиши мне в месенджере:<br>' + this.links.map(l => `– <a href="${l.url}" target="_blank">${l.title}</a>;`).join('<br>')},
		]
		let totalTime = 0
		messagesToShow.forEach(mess => {
			setTimeout(() => this.messages.push(mess), totalTime += (mess.interval * 1000))
		})
	},
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
  /* iframe {
    border: 0;
    width: 100%;
  } */

  .iphone-container {
    background-image: url(/iphonex-frame.png);
    background-position: top center;
    padding: 18px 25px 23px;
    background-size: cover;
    height: 600px;
    max-width: 300px;
    margin: 0 auto;
    position: relative;
  }
  .messages-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    border-radius: 24px;
  }
  .iphone-container:before {
    content: "";
    display: block;
    height: 20px;
    background-image: url(/iphonex-head.png);
    position: absolute;
    top: 18px;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    left: 0;
  }
  .message {
    display: flex;
    align-items: center;
    text-align: left;
    width: 80%;
  }
  .out .message {
    margin-left: auto;
    justify-content: flex-end;
  }
  .message .avatar {
    min-width: 36px;
  }

  .message-text {
    border-radius: 10px;
  }
  .message-text a {
    color: inherit;
  }
</style>
