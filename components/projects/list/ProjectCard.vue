<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="project-card" :elevation="hover ? 12 : 2">
      <v-toolbar dark color="primary">
        <div class="headline" v-text="name" />
      </v-toolbar>
      <v-card-text>
        <v-overlay v-model="hover" absolute :opacity="0.7">
          <v-card class="pa-3" color="#111111" dark>
            <div class="mb-3 grey--text">
              專案存取 URL
            </div>
            <div style="overflow-x: auto;" v-text="`https://aaaaaa.narwhal.ntut.club/${name}`" />
          </v-card>
          <div class="pt-5 d-flex justify-center">
            <v-tooltip bottom color="grey darken-4">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>複製 URL</span>
            </v-tooltip>
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on }">
                <v-btn icon class="mx-7" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>編輯專案</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>刪除專案</span>
            </v-tooltip>
          </div>
        </v-overlay>
        <div class="title mb-2" v-text="`敘述：${description || '無'}`" />
        <div class="subtitle-2 mb-2" v-text="`vCPU： ${cpu} 顆`" />
        <div class="subtitle-2 mb-2" v-text="`RAM：${memory} MB`" />
        <div class="subtitle-2" v-text="`儲存空間：${storage} GB`" />
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isCustom: {
      type: Boolean,
      default: false
    },
    imageTag: {
      type: String,
      default: ''
    },
    cpu: {
      type: Number,
      default: 1
    },
    memory: {
      type: Number,
      default: 512
    },
    storage: {
      type: Number,
      default: 5
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
