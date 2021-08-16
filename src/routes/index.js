import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Exporter from "../views/Exporter.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/user/:userId",
    name: "user",
    component: User,
  },
  {
    path: "/exportar/",
    name: "exporter",
    component: Exporter,
  },
  {
    path: "*",
    name: "404",
    redirect: { name: "home" },
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
