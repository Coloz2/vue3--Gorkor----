// router.js

import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import home from "@/views/layout/component/home/home.vue";

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
        component: () => import("@/views/island/island.vue"),
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("@/views/mine/mine.vue"),
      },
    ],
  },
  {
    path: "/write",
    component: () => import("@/views/write/index.vue"),
  },
  {
    path: "/preView",
    name: "priView",
    component: () => import("@/views/preView/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
