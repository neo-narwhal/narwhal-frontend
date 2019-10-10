import Axios from 'axios'

export default function createPrivateAPI (token) {
  const baseURL = 'https://narwhal.ntut.club'
  const httpClient = Axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return {
    async isTokenValid () {
      try {
        await httpClient.get('/api/helloworld/jwt')
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },

    async getAvailableServices () {
      const { data } = await httpClient.get('/api/services')
      return data
    }
  }
}
