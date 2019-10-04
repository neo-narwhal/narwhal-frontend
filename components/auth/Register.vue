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
        @keypress.enter="submit"
      />
      <v-text-field
        v-model="inputs.username.value"
        class="my-2"
        counter="20"
        label="使用者名稱"
        prepend-inner-icon="mdi-account"
        :disabled="isDataTransferring"
        :rules="inputs.username.rules"
        :error-messages="inputs.username.errorMessages"
        @input="inputs.username.errorMessages = []"
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
        :append-icon="inputs.passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="inputs.passwordVisible ? 'text' : 'password'"
        @click:append="inputs.passwordVisible = !inputs.passwordVisible"
        @input="inputs.password.errorMessages = []"
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
const validator = {
  required: input => !!input || '必填',
  minLength: (input, limit) => input.length >= limit || `長度需大於等於 ${limit}`,
  maxLength: (input, limit) => input.length <= limit || `長度需小於等於 ${limit}`,
  alphabetNumber: input => /^[a-zA-Z0-9]*$/.test(input) || '僅允許英文字母與數字',
  email: input => /\S+@\S+\.\S+/.test(input) || '不正確的信箱格式'
}

export default {
  name: 'Register',
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
        username: {
          value: '',
          errorMessages: [],
          rules: [
            () => validator.required(this.inputs.username.value),
            () => validator.minLength(this.inputs.username.value, 6),
            () => validator.maxLength(this.inputs.username.value, 20),
            () => validator.alphabetNumber(this.inputs.username.value)
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
      isDataTransferring: false,
      errorMessage: ''
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
    async submit () {
      if (!this.$refs.form.validate() || !this.canSubmit) { return }
      this.isDataTransferring = true
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.isDataTransferring = false
    }
  }
}
</script>
