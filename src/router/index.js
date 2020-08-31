import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Deleted from '../views/Deleted.vue';
import Finished from '../views/Finished.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Deleted',
    component: Deleted

  },
  {
    path: '/Finished',
    component: Finished

  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
