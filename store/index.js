export const state = () => ({
  token: localStorage.getItem('token') || null
})

export const getters = {
  isLoggedIn ({ token }) {
    return !!token
  }
}

export const mutations = {
  SET_TOKEN (state, token) {
    if (!token) {
      localStorage.removeItem('token')
      state.token = null
      return
    }
    localStorage.setItem('token', token)
    state.token = token
  }
}

export const actions = {
  setToken ({ commit }, token) {
    commit('SET_TOKEN', token)
  }
}
