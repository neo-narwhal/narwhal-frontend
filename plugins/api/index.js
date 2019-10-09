import Vue from 'vue'

import publicAPI from './public'
import createPrivateAPI from './private'

const api = {
  ...publicAPI,
  injectPrivateAPI (token) {
    const toBeAssigned = {
      ...createPrivateAPI(token),
      removePrivateAPI () {
        const toBeRemoved = [Object.keys(createPrivateAPI('')), 'removePrivateAPI']
        toBeRemoved.forEach(key => delete api[key])
      }
    }
    Object.assign(api, toBeAssigned)
  }
}

const token = localStorage.getItem('token')
if (token) {
  api.injectPrivateAPI(token)
}

const plugin = {
  install (Vue) {
    Vue.prototype.$api = api
  }
}

Vue.use(plugin)

export default function ({ app }) {
  app.api = api
}
