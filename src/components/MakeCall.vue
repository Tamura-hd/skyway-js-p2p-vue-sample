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
        @click="dialog=false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="pb-1">
      <v-text-field
        v-model="theirId"
        :label="$t('message.inputTheirId')"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text class="pb-2">
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=1">
            <h2>1</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=2">
            <h2>2</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=3">
            <h2>3</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=4">
            <h2>4</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=5">
            <h2>5</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=6">
            <h2>6</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=7">
            <h2>7</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=8">
            <h2>8</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=9">
            <h2>9</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="theirId+=0">
            <h2>0</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
        </v-col>
        <v-col class="d-flex justify-center">
          <MakeCalling ref="makeCallingDialog" :theirId="theirId" />
          <v-btn
            icon
            large
            color="green"
            @click="showMakeCallingDialog"
          >
            <v-icon large>
              mdi-phone
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn
            icon
            large
            @click="sliceInputId"
          >
            <v-icon large>
              mdi-close-circle
            </v-icon>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-actions>
  </v-card>
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
      theirId: '',
    }
  },

  methods: {
    showMakeCallingDialog() {
      this.dialog = false;
      this.$refs.makeCallingDialog.dialog = true;
    },
    sliceInputId() {
      let result = this.theirId.slice(0, -1);
      this.theirId = result;
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