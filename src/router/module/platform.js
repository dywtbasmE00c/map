// cockpit
// import platformLayout from "@/layout/platformLayout.vue";
const platformRouter = [
  {
    path: "/platform",
    // redirect: "/cockpitWork",
    // component: cockpitLayout,
    component: () => import("@/views/platform/index.vue"),
    hidden: true,
  //   children: [
  //     {
  //       path: "/cockpitWork",
  //       component: () => import("@/views/cockpit/workSession.vue"),
  //     }
  //   ],
  },
];

export default platformRouter;
