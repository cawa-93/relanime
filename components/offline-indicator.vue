<template>
  <div class="text-xs-center mb-4" v-if="!online">
    <v-chip color="error" text-color="white">Offline</v-chip>
  </div>
</template>

<script>
import online from '~/mixins/online.js'
export default {
	mixins: [online],
}
</script>
