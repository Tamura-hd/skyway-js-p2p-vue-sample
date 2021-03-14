<template>
<v-dialog
  v-model="dialog"
  fullscreen
>
  <v-card>
    <v-toolbar dark color="primary">
    </v-toolbar>
    <v-card-title>
      <span class="headline">0123456789</span>
    </v-card-title>
    <v-card-text>
      <p>{{ $t("index.calling") }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="ma-1"
        icon
        color="red"
        @click="dialog = false">
        <v-icon large>
          mdi-phone
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>

</style>