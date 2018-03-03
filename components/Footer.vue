<template>
  <v-footer class="pl-3 pr-3"  dark height="48px">
    <div>
    	<v-menu top>
	      <v-btn flat dark slot="activator">
	      	<v-icon>contacts</v-icon>
					<span class="ml-2">
						Alex Kozak
					</span>
	      </v-btn>
	      <v-list>
	        <v-list-tile href="https://t.me/kozack" tag="a" target="_blank"><v-list-tile-title>Telegram</v-list-tile-title></v-list-tile>
	        <v-list-tile href="mailto:kozackunisoft@gmail.com" tag="a" target="_blank"><v-list-tile-title>Email</v-list-tile-title></v-list-tile>
	      </v-list>
	    </v-menu>
    </div>
    <v-spacer></v-spacer>
    <div>Powered by <a href="http://shikimori.org/" rel="nofollow" target="_blank">Shikimori.org</a></div>
  </v-footer>
</template>
