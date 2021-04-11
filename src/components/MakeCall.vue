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
        v-model="friendId"
        :label="$t('message.inputTheirId')"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text class="pb-2">
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='1'">
            <h2>1</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='2'">
            <h2>2</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='3'">
            <h2>3</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='4'">
            <h2>4</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='5'">
            <h2>5</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='6'">
            <h2>6</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='7'">
            <h2>7</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='8'">
            <h2>8</h2>
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='9'">
            <h2>9</h2>
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row class="numericpad-area">
        <v-col class="d-flex justify-center">
          <v-btn fab dark color="primary" @click="friendId+='0'">
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
          <MakeCalling ref="makeCallingDialog" :friendId="friendId" />
          <v-btn
            icon
            large
            color="green"
            @click="makeCalling"
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
import { mapActions } from 'vuex'
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

  computed: {
    friendId: {
      get () {
        return this.$store.getters['skyway/friendId'];
      },
      set (value) {
        this.$store.commit('skyway/setFriendId', value);
      }
    }
  },

  methods: {
    ...mapActions('skyway', [
      'connect'
    ]),
    makeCalling() {
      this.dialog = false;
      this.$refs.makeCallingDialog.dialog = true;

      // データチャネル接続(Connect to data channel)
      this.connect();
    },
    sliceInputId() {
      let result = this.friendId.slice(0, -1);
      this.friendId = result;
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