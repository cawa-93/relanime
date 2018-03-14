<template>
  <div class="text-xs-center mb-4">
    <v-chip v-if="!online" color="error" text-color="white">Offline</v-chip>
  </div>
</template>

<script>
import online from '~/mixins/online.js'
export default {
  mixins: [online],
}
</script>
