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
      <p>{{ $t("index.calling") }}</p>
    </v-card-text>
    <v-card-actions>
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
  name: 'MakeCalling',
  props: {
    friendId: String,
  },

  data () {
    return {
    }
  },

  computed: {
    dialog: {
      get () {
        return this.$store.getters['makeCallingModalShow'];
      },
      set (value) {
        this.$store.commit('setMakeCallingModalShow', value, { root: true });
      }
    }
  },

  methods: {
    ...mapActions('skyway', [
      'closeMediaConnection'
    ]),
    async shutOffCall() {
      await this.closeMediaConnection();
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>