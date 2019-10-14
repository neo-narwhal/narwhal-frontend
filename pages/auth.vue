<template>
  <div class="fill-parent d-flex justify-center align-center">
    <v-card max-width="300">
      <v-tabs v-model="currentTab" fixed-tabs>
        <v-tab
          key="login"
          :disabled="isDataTransferring"
          class="font-weight-black"
          href="#tab-login"
        >
          登入
        </v-tab>
        <v-tab
          key="register"
          :disabled="isDataTransferring"
          class="font-weight-black"
          href="#tab-register"
        >
          註冊
        </v-tab>

        <v-tab-item key="login" value="tab-login">
          <Login @change-status="isDataTransferring = $event" />
        </v-tab-item>

        <v-tab-item key="register" value="tab-register">
          <Register @change-status="isDataTransferring = $event" @registered="registered" />
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-snackbar v-model="showRegisteredSnackbar" :timeout="3000" color="primary" top right>
      註冊成功！
    </v-snackbar>
  </div>
</template>

<script>
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

export default {
  name: 'AuthPage',
  layout: 'guest',
  components: {
    Login,
    Register
  },
  data () {
    return {
      currentTab: 'tab-login',
      isDataTransferring: false,
      showRegisteredSnackbar: false
    }
  },
  created () {
    if (this.$store.getters.isLoggedIn) {
      this.$router.replace('/projects')
    }
  },
  methods: {
    registered () {
      this.showRegisteredSnackbar = true
      this.currentTab = 'tab-login'
    }
  }
}
</script>
