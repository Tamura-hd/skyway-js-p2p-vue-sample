<template>
<v-dialog v-model="dialog">
  <v-card>
    <v-card-title>
      My ID
    </v-card-title>
    <v-text-field
      :value="myId"
      readonly
      class="text-sm-h6 text-field-center pa-2"
    >
    </v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
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
  props: {
    myId: String,
  },
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
    width: 60%;
  }
}
@media (min-width: 540px) {
  ::v-deep .v-dialog.v-dialog--active {
    width: 40%;
  }
}

::v-deep .text-field-center input {
  text-align: center;
}
</style>