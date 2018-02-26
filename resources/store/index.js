export const state = () => ({
  user: null
})

export const mutations = {
  USER (state, user) {
    state.user = user
  },
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.session && req.session.user) {
      commit('USER', req.session.user)
    }
  },
}
