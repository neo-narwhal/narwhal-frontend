<template>
  <v-card v-if="$store.getters.isLoggedIn" class="page-container my-3">
    <v-card-title class="headline font-weight-bold py-5 primary--text">
      <v-icon color="primary">
        mdi-format-list-bulleted
      </v-icon>專案列表
    </v-card-title>
    <v-divider />
    <ProjectList :projects="projects" />
  </v-card>
</template>

<script>
import ProjectList from '@/components/projects/list/ProjectList'

export default {
  name: 'ProjectsPage',
  components: {
    ProjectList
  },
  data () {
    return {
      projects: []
    }
  },
  created () {
    for (let i = 0; i < 23; i++) {
      this.projects.push({
        name: `專案 ${i}`,
        id: `${Date.now()}`,
        description: `專案 ${i} 的敘述敘述敘述敘述敘述敘述敘述敘述敘述敘述敘述敘述敘述敘述`
      })
    }
  }
}
</script>
