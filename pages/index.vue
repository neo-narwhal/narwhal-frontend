<template>
  <div class="fill-parent d-flex justify-center align-center">
    <img src="~/static/images/narwhal.png">
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout ({ app }) {
    return app.store.getters.isLoggedIn ? 'default' : 'guest'
  },
  created () {
    const redirectTo = this.$store.getters.isLoggedIn ? '/projects' : '/auth'
    this.$router.replace(redirectTo)
  }
}
</script>
