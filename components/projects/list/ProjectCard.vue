<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="project-card" :elevation="hover ? 12 : 2">
      <div v-if="isDeleting" class="fill-parent d-flex justify-center align-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
      <template v-else>
        <v-toolbar dark color="primary">
          <div class="headline" v-text="name" />
        </v-toolbar>
        <v-card-text>
          <v-overlay v-model="hover" z-index="1" absolute :opacity="0.9">
            <div class="fill-parent d-flex justify-center align-center">
              <v-card class="pa-3" dark width="270">
                <div class="mb-3 grey--text">
                  專案存取 URL
                </div>
                <v-card flat color="#222222" width="100%">
                  <v-card-text class="py-0">
                    <div class="py-4" style="white-space: nowrap;overflow: auto; text-overflow: clip;">
                      {{ `https://${user.username}.narwhal.ntut.club/${imageTag.split('/').pop().split(':').shift()}/${name}` }}
                    </div>
                  </v-card-text>
                </v-card>
                <div class="pt-5 d-flex justify-center">
                  <v-tooltip bottom color="grey darken-4">
                    <template v-slot:activator="{ on }">
                      <v-btn :id="`btn-copy-${name}`" :data-clipboard-text="`https://${user.username}.narwhal.ntut.club/${imageTag.split('/').pop().split(':').shift()}/${name}`" icon v-on="on">
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                    <span>複製 URL</span>
                  </v-tooltip>
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn icon class="mx-7" v-on="on" @click="$router.push(`/projects/edit/${id}`)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>編輯專案</span>
                  </v-tooltip>
                  <v-tooltip bottom color="error">
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on" @click="deleteProject(id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>刪除專案</span>
                  </v-tooltip>
                </div>
              </v-card>
            </div>
          </v-overlay>
          <div style="white-space: nowrap;overflow: auto; text-overflow: clip;" class="subtitle-1 mb-2" v-text="description || '無'" />
          <div class="caption mb-2" v-text="`vCPU： ${cpu} 顆`" />
          <div class="caption mb-2" v-text="`RAM：${memory} MB`" />
          <div class="caption mb-2" v-text="`儲存空間：${storage} GB`" />
          <div class="caption" v-text="`費率$：${fee} 台幣/時`" />
        </v-card-text>
      </template>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from 'vuex'
import ClipboardJS from 'clipboard'

export default {
  name: 'ProjectCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: NaN
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
  },
  data () {
    return {
      feeRate: {
        cpu: 1,
        memory: 0.0001,
        storage: 0.001
      },
      isDeleting: false
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    fee () {
      const cpu = +(this.feeRate.cpu * this.cpu).toFixed(12)
      const memory = +(this.feeRate.memory * this.memory).toFixed(12)
      const storage = +(this.feeRate.storage * this.storage).toFixed(12)
      const total = +(cpu + memory + storage).toFixed(12)
      return total
    }
  },
  mounted () {
    // eslint-disable-next-line no-new
    new ClipboardJS(`#btn-copy-${this.name}`)
  },
  methods: {
    async deleteProject (id) {
      this.isDeleting = true
      await this.$api.deleteProjectById(id)
      this.$emit('delete')
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
