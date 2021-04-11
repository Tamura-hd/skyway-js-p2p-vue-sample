import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import Home from './views/Home.vue'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
];

export default new Router({
  mode: 'history',
  routes
});
