<template>
<v-dialog
  v-model="dialog"
  fullscreen
>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn
        icon
        dark
        @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        :label="$t('message.inputTheirId')"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>1</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>2</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>3</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>4</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>5</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>6</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>7</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>8</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>9</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-col class="d-flex justify-center">
          <v-btn fab dark large color="primary">
            <h2>0</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
      <v-row class="numericpad-area">
        <v-btn
          icon
          large
          color="green"
          @click="showMakeCallingDialog">
          <v-icon large>
            mdi-phone
          </v-icon>
        </v-btn>
      </v-row>
    <v-card-actions>
    </v-card-actions>
  </v-card>

  <MakeCalling ref="makeCallingDialog" />
</v-dialog>
</template>

<script>
import MakeCalling from '../components/MakeCalling.vue'

export default {
  name: 'MakeCall',
  components: {
    MakeCalling
  },

  data () {
    return {
      dialog: false,
    }
  },

  methods: {
    showMakeCallingDialog() {
      this.dialog = false;
      this.$refs.makeCallingDialog.dialog = true;
    }
  }
}
</script>

<style scoped>
::v-deep .numericpad-area {
  align-content: center;
  justify-content: center;
}
</style>