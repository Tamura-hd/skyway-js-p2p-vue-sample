<template>
<div class="home">
  <v-container fluid>
    <v-card color="blue-grey lighten-3">
      <video id="theirVideo" :srcObject.prop="theirVideo" autoplay :muted="muted" playsinline></video>
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
            @click="showMakeCallDialog">
            <v-icon large>
              mdi-phone
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            icon
            color="red">
            <v-icon large>
              mdi-phone
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-1"
            icon
            color="red"
            @click="mute">
            <v-icon large>
              {{ volumeIconName }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</div>
</template>

<script>
import Peer from 'skyway-js'
import Consts from '../const'
import MyId from '../components/MyId.vue'
import MakeCall from '../components/MakeCall.vue'

export default {
  name: 'Home',
  components: {
    MyId,
    MakeCall
  },

  data () {
    return {
      peer: undefined,
      peerId: '',
      theirVideo: undefined,
      myVideo: undefined,
      muted: false,
      volumeIconName: 'mdi-volume-high',
    }
  },

  mounted: function() {
    /**
     * カメラ映像取得
     */
    navigator.mediaDevices.getUserMedia(Consts.MEDIA_STREAM_CONSTRAINTS)
      .then( stream => {
        // 成功時にvideo要素にカメラ映像をセットして再生
        this.myVideo = stream;
        // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく(Save it in a global variable.)
        // localStream = stream;

        // Peer ID を生成(Generate peer ID)
        let generateId = ''
        for (var i = 0, k = Consts.CODE_TABLE.length; i < 10; i++) {
          generateId += Consts.CODE_TABLE.charAt(Math.floor(k * Math.random()));
        }

        this.peer = new Peer(generateId, {
          key: process.env.VUE_APP_SKYWAY_API_KEY,
          debug: 3
        });

        this.peer.on('open', () => {
          this.peerId = this.peer.id;
        });
      }).catch( error => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
  },

  methods: {
    showMyIdDialog() {
      this.$refs.myIdDialog.dialog = true;
    },
    showMakeCallDialog() {
      this.$refs.makeCallDialog.dialog = true;
    },
    shutOffCall() {

    },
    mute() {
      if (this.muted) {
        this.volumeIconName = 'mdi-volume-high';
      } else {
        this.volumeIconName = 'mdi-volume-off';
      }
      this.muted = !this.muted
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

#theirVideo {
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