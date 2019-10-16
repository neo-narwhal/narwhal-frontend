<template>
  <div v-if="isLoading" style="height: 300px" class="d-flex justify-center align-center">
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </div>
  <div v-else class="pa-4">
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" sm="6">
          <div class="subheading font-weight-medium primary--text">
            專案名稱
          </div>
          <v-text-field
            :value="value.name"
            :rules="inputs.name.rules"
            :disabled="disabled || isEditMode"
            :error-messages="inputs.name.errorMessages"
            counter="25"
            @input="update('name', $event)"
            @focus="inputs.name.errorMessages = []"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="subheading font-weight-medium primary--text">
            專案敘述（選填）
          </div>
          <v-text-field
            :value="value.description"
            :rules="inputs.description.rules"
            :disabled="disabled"
            :placeholder="descriptionPlaceholder"
            counter="50"
            @input="update('description', $event)"
          />
        </v-col>
        <v-col cols="12">
          <div class="subheading font-weight-medium primary--text">
            資源調整
          </div>
          <v-row>
            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text d-flex align-center">
                <span class="mr-1">vCPU</span>
                <QuestionTooltip :text="`vCPU（顆/時）：${feeRate.cpu} 台幣`" />
              </div>
              <v-select
                :value="value.cpu"
                prefix=" "
                suffix="顆"
                :rules="inputs.cpu.rules"
                :items="[1,2]"
                :disabled="disabled"
                @input="update('cpu', $event)"
              />
            </v-col>
            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text d-flex align-center">
                <span class="mr-1">RAM</span>
                <QuestionTooltip :text="`RAM（MB/時）：${feeRate.storage} 台幣`" />
              </div>
              <v-text-field
                :value="value.memory"
                prefix=" "
                suffix="MB"
                :rules="inputs.memory.rules"
                :disabled="disabled"
                @input="update('memory', $event)"
              />
            </v-col>

            <v-col cols="4">
              <div class="subheading font-weight-medium primary--text d-flex align-center">
                <span class="mr-1">Disk</span>
                <QuestionTooltip :text="`Disk（GB/時）：${feeRate.storage} 台幣（無法減少只能增加）`" />
              </div>
              <v-text-field
                :value="value.storage"
                prefix=" "
                suffix="GB"
                :rules="inputs.storage.rules"
                :disabled="disabled"
                @input="update('storage', $event)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div class="subheading font-weight-medium primary--text">
            選擇服務
          </div>
          <ServiceSelect
            :is-custom="value.isCustom"
            :docker-pull-command="value.dockerPullCommand"
            :disabled="disabled || isEditMode"
            :available-services="availableServices"
            @type-change="update('isCustom', $event)"
            @docker-pull-command-change="update('dockerPullCommand', $event)"
            @service-label-change="serviceLabel = $event"
          >
            <v-text-field
              :value="value.dockerPullCommand"
              class="hidden-input"
              :rules="inputs.dockerPullCommand.rules"
              :disabled="disabled || isEditMode"
            />
          </ServiceSelect>
        </v-col>
        <v-col cols="12">
          <div class="subheading font-weight-medium primary--text">
            花費試算
          </div>
          <div class="pl-3 subtitle-2 grey--text">
            <div class="pt-2">
              vCPU: {{ feeRate.cpu }} x {{ value.cpu }} = {{ costs.cpu }} 台幣/時
            </div>
            <div class="pt-2">
              RAM: {{ feeRate.memory }} x {{ value.memory }} = {{ costs.memory }} 台幣/時
            </div>
            <div class="pt-2">
              Disk: {{ feeRate.storage }} x {{ value.storage }} = {{ costs.storage }} 台幣/時
            </div>
            <div class="pt-2">
              總計: {{ costs.cpu }} + {{ costs.memory }} + {{ costs.storage }} = <span class="primary--text">{{ costs.total }} 台幣/時</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import ServiceSelect from './ServiceSelect'
import QuestionTooltip from './QuestionTooltip'

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
    ServiceSelect,
    QuestionTooltip
  },
  props: {
    mode: {
      type: String,
      default: 'create'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        cpu: 1,
        memory: 512,
        storage: 5,
        isCustom: false,
        dockerPullCommand: ''
      })
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
      serviceLabel: '',
      inputs: {
        name: {
          rules: [
            () => validator.required(this.value.name),
            () => validator.projectName(this.value.name),
            () => validator.maxLength(this.value.name, 25)
          ],
          errorMessages: []
        },
        description: {
          rules: [
            () => validator.maxLength(this.value.description, 50)
          ]
        },
        cpu: {
          rules: [
            () => validator.required(this.value.cpu),
            () => validator.number(this.value.cpu),
            () => validator.minInteger(this.value.cpu, 1),
            () => validator.maxInteger(this.value.cpu, 2)
          ]
        },
        memory: {
          rules: [
            () => validator.required(this.value.memory),
            () => validator.number(this.value.memory),
            () => validator.minInteger(this.value.memory, 512),
            () => validator.maxInteger(this.value.memory, 8192)
          ]
        },
        storage: {
          rules: [
            () => validator.required(this.value.storage),
            () => validator.number(this.value.storage),
            () => validator.minInteger(this.value.storage, 2),
            () => validator.maxInteger(this.value.storage, 25)
          ]
        },
        dockerPullCommand: {
          rules: [
            () => validator.serviceRequired(this.value.dockerPullCommand),
            () => validator.dockerPullCommand(this.value.dockerPullCommand)
          ]
        }
      },
      feeRate: {
        cpu: 1,
        memory: 0.0001,
        storage: 0.001
      }
    }
  },
  computed: {
    isEditMode () { return this.mode === 'edit' },
    descriptionPlaceholder () {
      return `A ${this.value.isCustom ? 'Custom' : this.serviceLabel} project`
    },
    costs () {
      const cpu = +(this.feeRate.cpu * this.value.cpu).toFixed(12)
      const memory = +(this.feeRate.memory * this.value.memory).toFixed(12)
      const storage = +(this.feeRate.storage * this.value.storage).toFixed(12)
      const total = +(cpu + memory + storage).toFixed(12)
      return { cpu, memory, storage, total }
    }
  },
  methods: {
    update (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    validate () {
      return this.$refs.form.validate()
    },
    handlerErrors (errorCode) {
      if (errorCode === 409) {
        this.inputs.name.errorMessages.push('專案名稱重複')
      }
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
