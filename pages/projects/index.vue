<template>
  <v-card v-if="$store.getters.isLoggedIn" class="page-container my-3">
    <v-card-title class="headline font-weight-bold py-5 primary--text">
      <v-icon color="primary">
        mdi-format-list-bulleted
      </v-icon>專案列表
    </v-card-title>
    <v-divider />
    <ProjectList :is-loading="isLoadingProjects" :projects="projects" />
  </v-card>
</template>

<script>
import ProjectList from '@/components/projects/list/ProjectList'

export default {
  name: 'ProjectsPage',
  middleware: 'isTokenValid',
  components: {
    ProjectList
  },
  data () {
    return {
      projects: [],
      isLoadingProjects: false
    }
  },
  async created () {
    await this.loadProjects()
  },
  methods: {
    async loadProjects () {
      this.isLoadingProjects = true
      const projectIds = await this.$api.getProjectIds()
      const projects = await Promise.all(projectIds.map(async (projectId) => {
        const project = await this.$api.getProjectById(projectId)
        return project
      }))
      this.isLoadingProjects = false
      this.projects = projects
    }
  }
}
</script>
