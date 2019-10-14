<template>
  <div class="pa-4">
    <v-tabs v-model="currentTab" fixed-tabs>
      <v-tab
        key="default-services"
        class="font-weight-black"
        href="#tab-default-services"
      >
        現有服務
      </v-tab>
      <v-tab
        key="custom-service"
        class="font-weight-black"
        href="#tab-custom-service"
      >
        客製化服務
      </v-tab>

      <v-tab-item key="default-services" value="tab-default-services">
        <div class="services-container px-2 pt-4 pb-2 text-center">
          <div
            v-for="(availableService , index) in availableServices"
            :key="`service-select-card-${index}`"
            class="d-inline-block"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 6 : 2"
                class="pa-2"
                :class="{ 'mr-3': index !== availableServices.length - 1 }"
                width="180"
                @click="service = availableService.value"
              >
                <div class="py-3 text-center">
                  {{ availableService.label }}
                </div>
                <div class="service-image-container">
                  <img
                    class="service-image"
                    :class="{ selected: availableService.value === service }"
                    :src="availableService.logoUrl"
                  >
                </div>
                <v-select
                  :value="availableService.value === service ? version : undefined"
                  label="版本"
                  :items="availableService.subList.map(a => a.label)"
                  @input="version = $event"
                />
              </v-card>
            </v-hover>
          </div>
        </div>
      </v-tab-item>

      <v-tab-item key="custom-service" value="tab-custom-service">
        <div class="pt-4">
          <div class="subheading font-weight-medium primary--text">
            Docker Hub 上 Image 的 pull 指令
          </div>
          <v-text-field v-model="dockerPullCommand" />
        </div>
      </v-tab-item>
    </v-tabs>
    <slot class="mt-n4" />
  </div>
</template>

<script>
export default {
  name: 'ServiceSelect',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    availableServices: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentTab: 'tab-default-services',
      service: undefined,
      version: undefined,
      dockerPullCommand: ''
    }
  },
  computed: {
    result () {
      if (this.currentTab === 'tab-default-services') {
        if (!this.service || !this.version) {
          return {
            isCustom: false,
            dockerPullCommand: ''
          }
        }
        const imageTag = this.availableServices.filter(a => a.value === this.service)
          .pop()
          .subList
          .filter(a => a.label === this.version)
          .pop()
          .imageTag
        return {
          isCustom: false,
          dockerPullCommand: `docker pull ${imageTag}`
        }
      } else {
        return {
          isCustom: true,
          dockerPullCommand: this.dockerPullCommand
        }
      }
    }
  },
  watch: {
    service () {
      this.version = undefined
    },
    result (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.services-container {
  margin: 0 -16px;
  white-space: nowrap;
  overflow-x: auto;

  .service-image-container {
    position: relative;
    padding-top: 100%;

    .service-image {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(1);

      &.selected {
        filter: grayscale(0);
      }
    }
  }
}
</style>
