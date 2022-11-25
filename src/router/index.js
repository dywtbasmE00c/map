import { createRouter, createWebHistory } from "vue-router";

import cockpitRouter from "./module/cockpit";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home/userLogin.vue"),
  },
  // {
  //   path: "/cockpit",
  //   redirect: "/cockpitWork",
  //   component: () => import("@/views/cockpit/cockpitHome.vue"),
  //   children: [
  //     {
  //       path: "/cockpitWork",
  //       component: () => import("@/views/cockpit/workSession.vue"),
  //     },
  //     {
  //       path: "/cockpitInfo",
  //       component: () => import("@/views/cockpit/infoSession.vue"),
  //     },
  //   ],
  // },
  ...cockpitRouter, //驾驶舱路由
];

const router = createRouter({
  // history: createWebHashHistory(), // hash路由模式
  history: createWebHistory(), // history路由模式
  routes,
});

export default router;
