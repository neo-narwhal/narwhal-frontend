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
      <ProjectEditor ref="projectEditor" v-model="projectData" :available-services="availableServices" :disabled="isDataTransferring" />
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="isDataTransferring" color="primary" @click="createProject">
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
      availableServices: [],
      projectData: null
    }
  },
  async created () {
    console.log(ProjectEditor)
    this.isDataTransferring = true
    this.availableServices = await this.$api.getAvailableServices()
    this.isDataTransferring = false
  },
  methods: {
    createProject () {
      if (!this.$refs.projectEditor.validate()) { return }
      console.log(this.projectData)
    }
  }
}
</script>
