<template>
<v-dialog
  v-model="dialog"
  fullscreen
>
  <v-card>
    <v-toolbar dark color="primary">
    </v-toolbar>
    <v-card-title>
      <span class="headline">{{ friendId }}</span>
    </v-card-title>
    <v-card-text>
      <p>{{ $t("index.incoming") }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="ma-1"
        icon
        color="green"
        @click="acceptCall"
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
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },

  computed: {
    dialog: {
      get () {
        return this.$store.getters['incomingCallModalShow'];
      },
      set (value) {
        this.$store.commit('setIncomingCallModalShow', value, { root: true });
      }
    },
    friendId: {
      get () {
        return this.$store.getters['skyway/friendId'];
      }
    }
  },

  methods: {
    ...mapActions('skyway', [
      'replyConnection',
      'rejectDataConnection'
    ]),
    async acceptCall() {
      await this.replyConnection();
      this.dialog = false;
    },
    async shutOffCall() {
      await this.rejectDataConnection();
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>