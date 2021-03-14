<template>
<div class="welcome">
  <v-container>
    <v-row align="center">
      <v-col>
        <h1>{{ $t("index.title") }}</h1>
        <v-btn icon large>
          <router-link to="/home" tag="button">Try WebRTC sample started!</router-link>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  //
}
</script>

<style scoped>
.welcome {
  height: 100%;
  text-align: center;
}
.container {
  height: 100%;
}
.row {
  height: 100%;
}
</style>
