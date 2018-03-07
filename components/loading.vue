<template>
  <div id="progress-container">
    <v-progress-linear :active="show" height="5" :color="color" v-model="progress" class="ma-0"></v-progress-linear>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    floatProgress: 0,
    color: "success"
  }),
  computed: {
    progress() {
      return Math.min(100, Math.floor(this.floatProgress))
    }
  },
  methods: {
    start() {
      this.floatProgress = 0
      this.color = 'success'
      this.show = true
    },
    set(num) {
      this.show = true
      this.floatProgress = num
    },
    finish() {
      this.floatProgress = 100
      setTimeout(() => this.show = false, 300)      
    },
    fail() {
      this.color = 'error'
    },
    increase(num) {
      this.show = true
      this.floatProgress += num
    }
  }
}
</script>

<style>
  #progress-container {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }
</style>