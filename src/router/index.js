import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/HomeView.vue"),
  },
  {
    path: "/permission/:id?",
    name: "permission",
    component: () =>
      import("../views/PermissionView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
