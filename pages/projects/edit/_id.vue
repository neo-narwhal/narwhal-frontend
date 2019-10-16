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
        </v-icon>編輯專案
      </v-card-title>
      <v-divider />
      <ProjectEditor
        ref="projectEditor"
        v-model="projectData"
        mode="edit"
        :is-loading="isLoading"
        :available-services="availableServices"
        :disabled="isDataTransferring"
      />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="isDataTransferring" :disabled="isDataTransferring" color="primary" @click="updateProject">
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ProjectEditor from '@/components/projects/project/ProjectEditor'

export default {
  name: 'ProjectEditPage',
  middleware: 'isTokenValid',
  components: {
    ProjectEditor
  },
  data () {
    return {
      isDataTransferring: false,
      isLoading: false,
      availableServices: [],
      projectData: null
    }
  },
  async created () {
    this.isLoading = true
    this.isDataTransferring = true
    await this.loadAvailableServices()
    await this.loadProjectData()
    this.isDataTransferring = false
    this.isLoading = false
  },
  methods: {
    async updateProject () {
      if (!this.$refs.projectEditor.validate()) { return }

      this.isDataTransferring = true
      await this.$api.updateProject(this.$route.params.id, this.projectData)
      this.$router.replace('/projects')
    },
    async loadAvailableServices () {
      this.availableServices = await this.$api.getAvailableServices()
    },
    async loadProjectData () {
      this.projectData = await this.$api.getProjectById(this.$route.params.id)
    }
  }
}
</script>
