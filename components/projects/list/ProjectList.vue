<template>
  <div v-if="isLoading" style="height: 300px" class="d-flex justify-center align-center">
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <v-row v-else class="px-3">
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <ProjectCreateButtonCard />
    </v-col>
    <v-col
      v-for="(project, index) in projects"
      :key="`project-card-col-${index}`"
      cols="12"
      sm="6"
      md="4"
    >
      <ProjectCard :key="`project-card-${project.name}`" v-bind="project" @delete="$emit('refresh')" />
    </v-col>
  </v-row>
</template>

<script>
import ProjectCard from '@/components/projects/list/ProjectCard'
import ProjectCreateButtonCard from '@/components/projects/list/ProjectCreateButtonCard'
export default {
  name: 'ProjectList',
  components: {
    ProjectCard,
    ProjectCreateButtonCard
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    projects: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
