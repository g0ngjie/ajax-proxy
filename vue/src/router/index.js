import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/index.vue";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      component: Home,
    },
  ],
});
