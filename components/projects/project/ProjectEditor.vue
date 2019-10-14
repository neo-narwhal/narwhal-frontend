<template>
  <div class="pa-4">
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="subheading font-weight-medium primary--text">
            專案名稱
          </div>
          <v-text-field
            v-model="inputs.name.value"
            :rules="inputs.name.rules"
            :disabled="disabled"
            counter="25"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="subheading font-weight-medium primary--text">
            專案敘述（選填）
          </div>
          <v-text-field
            v-model="inputs.description.value"
            :rules="inputs.description.rules"
            :disabled="disabled"
            counter="50"
          />
        </v-col>
        <v-col cols="12">
          <div class="subheading font-weight-medium primary--text">
            資源調整
          </div>
          <v-row>
            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text">
                vCPU
              </div>
              <v-select
                v-model="inputs.cpu.value"
                prefix=" "
                suffix="顆"
                :rules="inputs.cpu.rules"
                :items="[1,2]"
                :disabled="disabled"
              />
            </v-col>
            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text">
                RAM
              </div>
              <v-text-field
                v-model="inputs.memory.value"
                prefix=" "
                suffix="MB"
                :rules="inputs.memory.rules"
                :disabled="disabled"
              />
            </v-col>

            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text">
                儲存空間
              </div>
              <v-text-field
                v-model="inputs.storage.value"
                prefix=" "
                suffix="GB"
                :rules="inputs.storage.rules"
                :disabled="disabled"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div class="subheading font-weight-medium primary--text">
            選擇服務
          </div>
          <ServiceSelect
            v-model="inputs.serviceData.value"
            :disabled="disabled"
            :available-services="availableServices"
          >
            <v-text-field
              v-model="inputs.serviceData.value.dockerPullCommand"
              class="hidden-input"
              :rules="inputs.serviceData.rules"
              :disabled="disabled"
            />
          </ServiceSelect>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import ServiceSelect from './ServiceSelect'

const validator = {
  required: input => !!input || '必填',
  minLength: (input, limit) => (input.length >= limit) || `長度需大於等於 ${limit}`,
  maxLength: (input, limit) => (input.length <= limit) || `長度需小於等於 ${limit}`,
  minInteger: (input, limit) => (input >= limit) || `必須為大於等於 ${limit} 整數`,
  maxInteger: (input, limit) => (input <= limit) || `必須為小於等於 ${limit} 整數`,
  number: input => /^\d*$/.test(input) || '僅能輸入數字',
  projectName: input => /^[a-zA-Z0-9-_]*$/.test(input) || '必須為英文字母、數字、-、_',
  serviceRequired: input => !!input || '未選擇服務或版本',
  dockerPullCommand: (input) => {
    const splited = input.split(' ')
    if (splited.length !== 3 || splited[0] !== 'docker' || splited[1] !== 'pull' || !splited[2]) {
      return '指令參數有誤'
    }
    return true
  }
}

export default {
  name: 'ProjectEditor',
  components: {
    ServiceSelect
  },
  props: {
    value: {
      type: Object,
      default: null
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
      valid: null,
      inputs: {
        name: {
          value: '',
          rules: [
            () => validator.required(this.inputs.name.value),
            () => validator.projectName(this.inputs.name.value),
            () => validator.maxLength(this.inputs.name.value, 25)
          ]
        },
        description: {
          value: '',
          rules: [
            () => validator.maxLength(this.inputs.description.value, 50)
          ]
        },
        cpu: {
          value: 1,
          rules: [
            () => validator.required(this.inputs.cpu.value),
            () => validator.number(this.inputs.cpu.value),
            () => validator.minInteger(this.inputs.cpu.value, 1),
            () => validator.maxInteger(this.inputs.cpu.value, 2)
          ]
        },
        memory: {
          value: 512,
          rules: [
            () => validator.required(this.inputs.memory.value),
            () => validator.number(this.inputs.memory.value),
            () => validator.minInteger(this.inputs.memory.value, 512),
            () => validator.maxInteger(this.inputs.memory.value, 8192)
          ]
        },
        storage: {
          value: 5,
          rules: [
            () => validator.required(this.inputs.storage.value),
            () => validator.number(this.inputs.storage.value),
            () => validator.minInteger(this.inputs.storage.value, 2),
            () => validator.maxInteger(this.inputs.storage.value, 25)
          ]
        },
        serviceData: {
          value: {
            idCustom: false,
            dockerPullCommand: ''
          },
          rules: [
            () => validator.serviceRequired(this.inputs.serviceData.value.dockerPullCommand),
            () => validator.dockerPullCommand(this.inputs.serviceData.value.dockerPullCommand)
          ]
        }
      }
    }
  },
  computed: {
    imageTag () {
      for (const rule of this.inputs.serviceData.rules) {
        if (rule() !== true) {
          return ''
        }
      }
      return this.inputs.serviceData.value.dockerPullCommand.split(' ').pop()
    },
    formdata () {
      return {
        name: this.inputs.name.value,
        description: this.inputs.description.value,
        isCustom: this.inputs.serviceData.value.isCustom,
        imageTag: this.imageTag,
        cpu: this.inputs.cpu.value,
        memory: this.inputs.memory.value,
        storage: this.inputs.storage.value
      }
    }
  },
  watch: {
    formdata (newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden-input {
  margin: 0;
  padding: 0;

  ::v-deep.v-input__slot {
    display: none;
  }
}
</style>
