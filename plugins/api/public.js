import Axios from 'axios'
import qs from 'qs'

const baseURL = 'https://narwhal.ntut.club'
const httpClient = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default {
  async canConnectToServer () {
    try {
      await httpClient.get('/api/helloworld')
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  },

  async register ({ email, username, password }) {
    await httpClient.post('/api/register', qs.stringify({
      email,
      username,
      password
    }))
  },

  async login ({ email, password }) {
    const { data } = await httpClient.post('/api/login', qs.stringify({
      email,
      password
    }))
    return data.access_token
  }
}
