// cockpit
const cockpitRouter = {
  path: "/cockpit",
  redirect: "/cockpitWork",
  component: () => import("@/views/cockpit/cockpitHome.vue"),
  children: [
    {
      path: "/cockpitWork",
      component: () => import("@/views/cockpit/workSession.vue"),
    },
    {
      path: "/cockpitInfo",
      component: () => import("@/views/cockpit/infoSession.vue"),
    },
  ],
};

export default cockpitRouter;
