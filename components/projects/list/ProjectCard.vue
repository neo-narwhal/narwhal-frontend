<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="project-card" :elevation="hover ? 12 : 2" link nuxt :to="`/projects/${id}`">
      <v-toolbar dark color="primary">
        <v-card-title class="title" v-text="name" />
      </v-toolbar>
      <v-divider />
      <v-card-text class="subtitle-1" v-text="description" />
      <v-card-actions>
        <v-chip
          class="mx-2"
          label
          outlined
          color="primary"
          small
        >
          Node
        </v-chip>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    name: {
      type: String,
      required: true,
      default: undefined
    },
    id: {
      type: String,
      required: true,
      default: undefined
    },
    description: {
      type: String,
      required: true,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  height: 240px;
  margin: auto;

  @media (min-width: 600px) {
    & {
      max-width: 480px;
    }
  }
}
</style>
