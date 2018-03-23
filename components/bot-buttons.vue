<template>
  <v-layout row>
    <v-btn class="ma-0" v-bind="$attrs" @click.stop tag="a" target="_blank" :href="facebook.url">
      <font-awesome-icon :icon="facebook.icon"  size="2x"/>
    </v-btn>
    <v-btn class="ma-0" v-bind="$attrs" @click.stop tag="a" target="_blank" :href="telegram.url">
      <font-awesome-icon :icon="telegram.icon" size="2x" />
    </v-btn>
    <v-btn class="ma-0" v-bind="$attrs" @click.stop tag="a" target="_blank" :href="skype.url">
      <font-awesome-icon :icon="skype.icon" size="2x" />
    </v-btn>
  </v-layout>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTelegram from '@fortawesome/fontawesome-free-brands/faTelegram'
import faSkype from '@fortawesome/fontawesome-free-brands/faSkype'
import faFacebookMessenger from '@fortawesome/fontawesome-free-brands/faFacebookMessenger'

export default {
	components: {FontAwesomeIcon},
	data: () => ({
		facebook: {icon: faFacebookMessenger, url: 'https://m.me/animeFoxBot'},
		telegram: {icon: faTelegram, url: 'https://t.me/animeFoxBot'},
		skype: {icon: faSkype, url: 'https://join.skype.com/bot/a6d9971b-a7ed-476b-980d-e1fc41db0d12'}
	})
}
</script>
