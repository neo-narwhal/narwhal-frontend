import Axios from 'axios'
import qs from 'qs'

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
    },

    async createProject (projectData) {
      await httpClient.post('/api/projects', qs.stringify(projectData))
    },

    async deleteProjectById (projectId) {
      await httpClient.delete(`/api/projects/${projectId}`)
    },

    async updateProjectById (projectId, projectData) {
      await httpClient.put(`/api/projects/${projectId}`, qs.stringify(projectData))
    },

    async getProjectIds () {
      const { data } = await httpClient.get('/api/projects')
      return data
    },

    async getProjectById (projectId) {
      const { data: p } = await httpClient.get(`/api/projects/${projectId}`)
      const newProjectObj = {}
      newProjectObj.id = p.id
      newProjectObj.name = p.name
      newProjectObj.description = p.description
      newProjectObj.isCustom = Boolean(p.is_custom)
      newProjectObj.imageTag = p.image_tag
      newProjectObj.dockerPullCommand = `docker pull ${p.image_tag}`
      newProjectObj.cpu = Number(p.cpu)
      newProjectObj.memory = Number(p.memory)
      newProjectObj.storage = Number(p.storage)
      return newProjectObj
    },

    async getUserData () {
      const { data } = await httpClient.get('/api/users')
      return data
    }
  }
}
