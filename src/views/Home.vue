<template>
<div class="home">
  <v-container fluid>
    <v-card color="blue-grey lighten-3">
      <video id="friendVideo" :srcObject.prop="friendVideo" autoplay :muted="muted" playsinline></video>
      <v-row class="h-80 ma-0">
        <v-col>
          <video id="myVideo" :srcObject.prop="myVideo" autoplay muted playsinline></video>
        </v-col>
      </v-row>
      <v-row align="center" class="h-20 ma-0">
        <v-col cols="3" class="d-flex justify-center">
          <MyId ref="myIdDialog" :myId="peerId" />
          <v-btn
            icon
            color="primary"
            @click="showMyIdDialog">
            <v-icon large>
              mdi-badge-account-outline
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="9" class="d-flex justify-center">
          <MakeCall ref="makeCallDialog" />
          <v-btn
            class="ma-1"
            icon
            color="green"
            :disabled="makeCallDisabled"
            @click="showMakeCallDialog"
          >
            <v-icon large>
              mdi-phone
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            icon
            color="red"
            @click="shutOffCall"
          >
            <v-icon large>
              mdi-phone
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            icon
            color="red"
            @click="mute"
          >
            <v-icon large>
              {{ volumeIconName }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

<IncomingCall ref="incomingCallDialog" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import Consts from '../const'
import MyId from '../components/MyId.vue'
import MakeCall from '../components/MakeCall.vue'
import IncomingCall from '../components/IncomingCall.vue'

export default {
  name: 'Home',
  components: {
    MyId,
    MakeCall,
    IncomingCall
  },

  data () {
    return {
      muted: false,
      volumeIconName: 'mdi-volume-high',
    }
  },

  mounted: function() {
    // カメラ映像取得
    navigator.mediaDevices.getUserMedia(Consts.MEDIA_STREAM_CONSTRAINTS)
      .then(async (stream) => {
        this.myVideo = stream;

        // Generate peer ID
        let generateId = '';
        for (var i = 0, k = Consts.CODE_TABLE.length; i < 10; i++) {
          generateId += Consts.CODE_TABLE.charAt(Math.floor(k * Math.random()));
        }

        // Create a new Peer instance.
        await this.initPeer(generateId);
      }).catch(error => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
  },

  computed: {
    peerId: {
      get () {
        return this.$store.getters['skyway/peerId'];
      },
      set (value) {
        this.$store.commit('skyway/setPeerId', value);
      }
    },
    myVideo: {
      get () {
        return this.$store.getters['skyway/mediaStream'];
      },
      set (value) {
        this.$store.commit('skyway/setMediaStream', value);
      }
    },
    friendVideo: {
      get () {
        return this.$store.getters['skyway/friendMediaStream'];
      },
      set (value) {
        this.$store.commit('skyway/setFriendMediaStream', value);
      }
    },
    makeCallDisabled: {
      get () {
        return this.$store.getters['makeCallDisabled'];
      },
      set (value) {
        this.$store.commit('setMakeCallDisabled', value);
      }
    }
  },

  methods: {
    ...mapActions('skyway', [
      'initPeer',
      'closeMediaConnection'
    ]),
    showMyIdDialog() {
      this.$refs.myIdDialog.dialog = true;
    },
    showMakeCallDialog() {
      this.$store.dispatch('skyway/resetFriendId');
      this.$refs.makeCallDialog.dialog = true;
    },
    shutOffCall() {
      this.closeMediaConnection();
    },
    mute() {
      if (this.muted) {
        this.volumeIconName = 'mdi-volume-high';
      } else {
        this.volumeIconName = 'mdi-volume-off';
      }
      this.muted = !this.muted;
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
.container {
  height: 100%;
}
.v-card {
  height: 100%;
}

#friendVideo {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

#myVideo {
  width: 15%;
}
</style>