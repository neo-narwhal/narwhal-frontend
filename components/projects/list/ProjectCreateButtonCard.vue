<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="project-card" :elevation="hover ? 12 : 2" link nuxt to="/projects/create">
      <div class="fill-parent d-flex flex-column justify-center align-center">
        <v-icon size="56" :class="{ 'primary--text': hover }">
          mdi-plus
        </v-icon>
        <span :class="{ 'primary--text': hover }">新建專案</span>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'ProjectCard'
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
