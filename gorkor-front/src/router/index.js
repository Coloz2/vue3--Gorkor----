// router.js

import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import home from "@/views/layout/component/home.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Layout,
    children: [
      {
        path: "",
        component: home,
        name: "home",
      },
      {
        path: "/island",
        name: "island",
        component: () => import("@/views/layout/component/island.vue"),
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("@/views/layout/component/mine.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
