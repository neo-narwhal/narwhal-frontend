<template>
  <div class="px-8 pb-6">
    <div class="text-center">
      <v-avatar size="128px">
        <v-img src="/images/narwhal.png" />
      </v-avatar>
    </div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="inputs.email.value"
        class="my-2"
        label="信箱"
        prepend-inner-icon="mdi-email"
        :disabled="isDataTransferring"
        :rules="inputs.email.rules"
        :error-messages="inputs.email.errorMessages"
        @input="inputs.email.errorMessages = []"
        @focus="inputs.email.errorMessages = []"
        @keypress.enter="submit"
      />
      <v-text-field
        v-model="inputs.password.value"
        class="my-2"
        counter="20"
        label="密碼"
        prepend-inner-icon="mdi-lock"
        :rules="inputs.password.rules"
        :error-messages="inputs.password.errorMessages"
        :disabled="isDataTransferring"
        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordVisible ? 'text' : 'password'"
        @click:append="passwordVisible = !passwordVisible"
        @input="inputs.password.errorMessages = []"
        @focus="inputs.password.errorMessages = []"
        @keypress.enter="submit"
      />
      <v-btn
        class="mt-2"
        :loading="isDataTransferring"
        :disabled="!canSubmit"
        color="primary"
        block
        @click="submit"
      >
        登入
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const validator = {
  required: input => !!input || '必填',
  minLength: (input, limit) => (input && input.length >= limit) || `長度需大於等於 ${limit}`,
  maxLength: (input, limit) => (input && input.length <= limit) || `長度需小於等於 ${limit}`,
  alphabetNumber: input => /^[a-zA-Z0-9]*$/.test(input) || '僅允許英文字母與數字',
  email: input => /\S+@\S+\.\S+/.test(input) || '不正確的信箱格式'
}

export default {
  name: 'Login',
  data () {
    return {
      valid: null,
      inputs: {
        email: {
          value: '',
          errorMessages: [],
          rules: [
            () => validator.required(this.inputs.email.value),
            () => validator.email(this.inputs.email.value)
          ]
        },
        password: {
          value: '',
          errorMessages: [],
          rules: [
            () => validator.required(this.inputs.password.value),
            () => validator.minLength(this.inputs.password.value, 6),
            () => validator.maxLength(this.inputs.password.value, 20),
            () => validator.alphabetNumber(this.inputs.password.value)
          ]
        }
      },
      passwordVisible: false,
      isDataTransferring: false
    }
  },
  computed: {
    canSubmit () {
      return !this.isDataTransferring && this.valid
    }
  },
  watch: {
    isDataTransferring (newValue) {
      this.$emit('change-status', newValue)
    }
  },
  methods: {
    ...mapActions([
      'setToken'
    ]),
    async submit () {
      if (!this.$refs.form.validate() || !this.canSubmit) { return }
      this.isDataTransferring = true
      try {
        const token = await this.$api.login({
          email: this.inputs.email.value,
          password: this.inputs.password.value
        })
        this.setToken(token)
        this.$api.injectPrivateAPI(token)
        this.$router.replace('/projects')
        this.$refs.form.reset()
      } catch (e) {
        if (!e.response) {
          this.inputs.email.errorMessages.push('網路錯誤')
          this.inputs.password.errorMessages.push('網路錯誤')
        } else {
          const status = e.response.status
          if (status === 401) {
            this.inputs.email.errorMessages.push('信箱或密碼錯誤')
            this.inputs.password.errorMessages.push('信箱或密碼錯誤')
          } else {
            this.inputs.email.errorMessages.push('未知錯誤')
            this.inputs.password.errorMessages.push('未知錯誤')
          }
        }
      }
      this.isDataTransferring = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
