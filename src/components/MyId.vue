<template>
<v-dialog v-model="dialog">
  <v-card>
    <v-card-text>
      My ID - 0123456789
    </v-card-text>
    <v-card-actions>
      <v-btn @click="dialog=false">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'MyId',

  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
@media (max-width: 540px) {
  ::v-deep .v-dialog.v-dialog--active {
    width: 80%;
  }
}
@media (min-width: 540px) {
  ::v-deep .v-dialog.v-dialog--active {
    width: 50%;
  }
}
</style>