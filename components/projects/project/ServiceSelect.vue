<template>
  <div class="pa-4">
    <v-tabs v-model="currentTab" fixed-tabs>
      <v-tab
        key="default-services"
        class="font-weight-black"
        href="#tab-default-services"
        :disabled="disabled"
      >
        現有服務
      </v-tab>
      <v-tab
        key="custom-service"
        class="font-weight-black"
        href="#tab-custom-service"
        :disabled="disabled"
      >
        客製化服務
      </v-tab>
      <v-tabs-items v-model="currentTab" touchless>
        <v-tab-item key="default-services" value="tab-default-services">
          <div class="services-container px-2 pt-4 pb-2 text-center">
            <div
              v-for="(availableService , index) in availableServices"
              :key="`service-select-card-${index}`"
              class="d-inline-block"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="(hover && !disabled) ? 6 : 2"
                  class="pa-2"
                  :class="{ 'mr-3': index !== availableServices.length - 1 }"
                  width="180"
                  :style="`opacity: ${availableService.value !== internal.service ? 0.4 : 1}`"
                  @click="!disabled && (() => service = availableService.value)()"
                >
                  <div class="py-3 text-center">
                    {{ availableService.label }}
                  </div>
                  <div class="service-image-container">
                    <img
                      class="service-image"
                      :class="{ selected: availableService.value === internal.service }"
                      :src="availableService.logoUrl"
                    >
                  </div>
                  <v-select
                    :value="availableService.value === service ? version : undefined"
                    label="版本"
                    :items="availableService.subList.map(a => a.label)"
                    :menu-props="{ top: true }"
                    :disabled="disabled || availableService.value !== internal.service"
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
            <v-text-field :value="dockerPullCommand" @input="$emit('docker-pull-command-change', $event)" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <slot class="mt-n4" />
  </div>
</template>

<script>
export default {
  name: 'ServiceSelect',
  props: {
    isCustom: {
      type: Boolean,
      default: false
    },
    dockerPullCommand: {
      type: String,
      default: ''
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
      internal: {
        isCustom: false,
        service: undefined,
        version: undefined
      }
    }
  },
  computed: {
    currentTab: {
      get () { return this.isCustom ? 'tab-custom-service' : 'tab-default-services' },
      set (tab) {
        this.service = undefined
        this.version = undefined
        this.$nextTick()
          .then(() => this.$emit('type-change', tab === 'tab-custom-service'))
      }
    },
    serviceData () {
      return this.getServiceDataByDockerPullCommand(this.dockerPullCommand)
    },
    service: {
      get () { return this.serviceData.service },
      set (service) {
        this.internal.service = service
        this.internal.version = undefined
        this.$emit('docker-pull-command-change', this.getDockerPullCommand(service, undefined))
        this.$emit('service-label-change', this.serviceLabels[service] || '')
      }
    },
    version: {
      get () { return this.serviceData.version },
      set (version) {
        this.internal.version = version
        this.$emit('docker-pull-command-change', this.getDockerPullCommand(this.internal.service, version))
      }
    },
    serviceLabels () {
      const labels = {}
      this.availableServices.forEach((service) => { labels[service.value] = service.label })
      return labels
    }
  },
  methods: {
    getDockerPullCommand (service, version) {
      if (!service || !version) {
        return ''
      }
      return `docker pull ${service}:${version}`
    },
    getServiceDataByDockerPullCommand (dockerPullCommand) {
      const [ service, version ] = dockerPullCommand.split(' ').pop().split(':')
      return {
        service,
        version
      }
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
