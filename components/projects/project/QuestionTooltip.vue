<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-icon size="20" color="primary" v-on="on">
        mdi-help-circle-outline
      </v-icon>
    </template>
    <span v-text="text" />
  </v-tooltip>
</template>

<script>
export default {
  name: 'QuestionTooltip',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
