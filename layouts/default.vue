<template>
  <v-app>
    <v-app-bar fixed app dark color="grey darken-4">
      <v-toolbar-items>
        <v-btn :ripple="false" text class="px-2" @click="$router.push('/projects')">
          <v-img :width="iconSize" :height="iconSize" src="/images/narwhal.png" />
          <v-toolbar-title class="headline font-weight-medium text-capitalize ml-2" v-text="title" />
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn :ripple="false" text class="px-2" @click="logout">
          登出
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app class="justify-center">
      <span>Narwhal &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      iconSize: 48,
      title: 'Narwhal'
    }
  },
  methods: {
    async logout () {
      this.$api.removePrivateAPI()
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.replace('/')
      await this.$nextTick()
      location.reload()
    }
  }
}
</script>
