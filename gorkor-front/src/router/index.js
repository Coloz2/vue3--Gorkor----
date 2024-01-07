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
        meta: { needLogin: true },
      },
    ],
  },
  {
    path: "/write/:id",
    name: "write",
    component: () => import("@/views/write/index.vue"),
    meta: { needLogin: true },
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/preView/:id",
    name: "priView",
    component: () => import("@/views/preView/index.vue"),
    meta: { needLogin: true },
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/send/:id",
    name: "send",
    component: () => import("@/views/send/index.vue"),
    meta: { needLogin: true },
    props: (route) => ({ id: route.params.id }),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/test",
    component: () => import("@/views/text.vue"),
  },
  {
    path: "/mailbox",
    name: "mailbox",
    component: () => import("@/views/mailbox/mailbox.vue"),
    meta: { needLogin: true },
  },
  {
    path: "/read/:id/:time",
    name: "read",
    component: () => import("@/components/readLetter.vue"),
    props: (route) => ({ id: route.params.id, time: route.params.time }),
  },
  {
    path: "/shop/stamp",
    name: "shop",
    component: () => import("@/views/shop/index.vue"),
    children: [
      {
        path: "",
        name: "stamp",
        component: () => import("@/views/shop/component/stampShop.vue"),
      },
      {
        path: "/shop/letter",
        name: "letterShop",
        component: () => import("@/views/shop/component/letterShop.vue"),
      },
    ],
  },
  {
    path: "/skeleton/:cid/:sid",
    name: "skeleton",
    component: () => import("@/views/skeleton/index.vue"),
    props: (route) => ({ cid: route.params.cid, sid: route.params.sid }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//判断是否登录
import { useUserStore } from "@/stores/user.js";

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (!userStore.userInfo.token && to.meta.needLogin) {
    return { name: "login" };
  }
  //嵌套路由时 to包含多个路劲 此时需要matched
  // to.matched.some((item) => console.log(item))
  //
});

export default router;
