<template>
  <div id="progress-container">
    <v-progress-linear :active="show" height="5" :color="canSuccess ? 'success' : 'error'" v-model="percent" class="ma-0"></v-progress-linear>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'nuxt-loading',
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
    }
  },
  methods: {
    start () {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 90) {
          this.pause()
        }
      }, 100)
      return this
    },
    set (num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor(this.percent)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease (num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      return this
    },
    pause () {
      clearInterval(this._timer)
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      this.canSuccess = false
      return this
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