export const state = () => ({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user') || null)
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
  },
  SET_USER (state, user) {
    if (!user) {
      localStorage.removeItem('user')
      state.user = null
      return
    }
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  }
}

export const actions = {
  setToken ({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  }
}
