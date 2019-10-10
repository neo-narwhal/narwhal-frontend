<template>
  <v-row class="px-3">
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <ProjectCreateButtonCard />
    </v-col>
    <v-col
      v-for="(project, index) in projects"
      :key="`project-card-${index}`"
      cols="12"
      sm="6"
      md="4"
    >
      <ProjectCard v-bind="project" />
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
    projects: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
