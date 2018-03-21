<template>
  <div>
    <anime-card
      v-for="anime in results" :key="anime.id"
      :anime="anime"
      class="anime-item mb-3"
    ></anime-card>
    <progress-circular indeterminate color="red" class="mt-3" v-if="busy"></progress-circular>
  </div>
</template>

<script>
import clone from 'lodash/clonedeep'
import axios from '~/plugins/axios'
import animeCard from '~/components/feed/anime-card'
import progressCircular from '~/components/progress-circular'
export default {
  name: 'anime-list',
  components: {animeCard, progressCircular},
  props: {
    params: {
      type: Object,
    }
  },
  data() {
    return {
      busy: false,
      bottom: false,
      results: [],
      currentPage: 0,
    }
  },
  computed: {

  },
  methods: {
    async loadPage () {
      if (this.busy || (!this.params.ids && !this.params.search))
        return
      this.busy = true
      const params = clone(this.params)
      params.page = ++this.currentPage
      const {data} = await axios.get('/shiki/animes', {params})
      this.results.push(
        ...data
      )
      this.busy = false
    },
   _toggleBottom() {
      this.bottom = this.isBottomVisible()
    },
    isBottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
  },
  created () {
    if (process.client) {
      window.addEventListener('scroll', this._toggleBottom)
    }
  },
  mounted() {
    this._toggleBottom()
  },
  destroyed () {
    window.removeEventListener('scroll', this._toggleBottom)
  },
  watch: {
    async params(to, from) {
      if (JSON.stringify(to) !== JSON.stringify(from)) {
        this.results = []
        this.currentPage = 0
        await this.loadPage()
      }
    },
    bottom (bottom) {
      if (bottom) {
        this.loadPage()
      }
    },
  }
}
</script>
