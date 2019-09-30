<template>
  <div class="px-8 pb-6">
    <div class="text-center">
      <v-avatar size="128px">
        <v-img src="/images/narwhal.png" />
      </v-avatar>
    </div>
    <v-text-field
      v-model="inputs.account"
      class="my-2"
      :error="!!errorMessage"
      hide-details
      :disabled="isDataTransferring"
      prepend-inner-icon="mdi-account"
      label="帳號"
    />
    <v-text-field
      v-model="inputs.password"
      class="my-2"
      :error="!!errorMessage"
      hide-details
      :disabled="isDataTransferring"
      prepend-inner-icon="mdi-lock"
      :append-icon="inputs.passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      label="密碼"
      :type="inputs.passwordVisible ? 'text' : 'password'"
      @click:append="inputs.passwordVisible = !inputs.passwordVisible"
    />
    <div style="height: 20px;" class="error--text caption" v-text="errorMessage" />
    <v-btn
      class="mt-2"
      :loading="isDataTransferring"
      :disabled="isDataTransferring"
      color="primary"
      block
      @click="submit"
    >
      登入
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      inputs: {
        account: '',
        password: '',
        passwordVisible: false
      },
      isDataTransferring: false,
      errorMessage: ''
    }
  },
  watch: {
    isDataTransferring (newValue) {
      this.$emit('change-status', newValue)
    }
  },
  methods: {
    async submit () {
      this.isDataTransferring = true
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.errorMessage = '帳號或密碼錯誤'
      this.isDataTransferring = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
