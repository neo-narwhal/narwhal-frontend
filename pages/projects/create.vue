<template>
  <div class="page-container" style="max-width: 650px !important;">
    <v-card class="ma-3">
      <v-card-actions class="pa-0">
        <v-btn text @click="$router.replace('/projects')">
          <v-icon>mdi-arrow-left</v-icon>返回
        </v-btn>
      </v-card-actions>
      <v-card-title class="headline font-weight-bold py-5 primary--text">
        <v-icon color="primary">
          mdi-plus
        </v-icon>創建專案
      </v-card-title>
      <v-divider />
      <ProjectEditor ref="projectEditor" v-model="projectData" :is-loading="isLoading" :available-services="availableServices" :disabled="isDataTransferring" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="isDataTransferring" :disabled="isDataTransferring" color="primary" @click="createProject">
          建立
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProjectEditor from '@/components/projects/project/ProjectEditor'

export default {
  name: 'ProjectCreatePage',
  middleware: 'isTokenValid',
  components: {
    ProjectEditor
  },
  data () {
    return {
      isDataTransferring: false,
      isLoading: false,
      availableServices: [],
      projectData: undefined
    }
  },
  async created () {
    this.isLoading = true
    this.isDataTransferring = true
    await this.getAvailableServices()
    this.isDataTransferring = false
    this.isLoading = false
  },
  methods: {
    async createProject () {
      if (!this.$refs.projectEditor.validate()) { return }

      const project = {
        ...this.projectData,
        description: this.projectData.description.trim() || this.$refs.projectEditor.descriptionPlaceholder,
        imageTag: this.projectData.dockerPullCommand.split(' ').pop()
      }

      this.isDataTransferring = true
      try {
        await this.$api.createProject(project)
        this.$router.replace('/projects')
      } catch (e) {
        if (e.response) {
          const status = e.response.status
          this.$refs.projectEditor.handlerErrors(status)
          this.isDataTransferring = false
        }
      }
    },
    async getAvailableServices () {
      this.availableServices = await this.$api.getAvailableServices()
    }
  }
}
</script>
