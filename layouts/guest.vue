<template>
  <v-app>
    <v-app-bar fixed app dark color="grey darken-4">
      <v-toolbar-items>
        <v-btn :ripple="false" text class="px-2" @click="$router.push('/auth')">
          <v-img :width="iconSize" :height="iconSize" src="/images/narwhal.png" />
          <v-toolbar-title class="headline font-weight-medium text-capitalize" v-text="title" />
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-btn :ripple="false" text class="px-2" @click="$router.push('/auth')">
          <span class="primary--text">註冊／登入</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content class="page-container">
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
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 16px;
  margin: auto;
  max-width: 960px;
}
</style>
