<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => (
    {
      //
    }
  ),
};
</script>

<style>
@import './assets/css/general.css';

html {
    height: 100%;
}
body {
    height: 100%;
}
</style>