<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-items>
        <v-btn text class="px-2">
          <v-img :width="iconSize" :height="iconSize" src="/images/narwhal.png" />
          <v-toolbar-title class="headline font-weight-medium text-capitalize" v-text="title" />
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
import '~/assets/global.scss'

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
