// cockpit
import cockpitLayout from "@/layout/cockpitLayout.vue";
const cockpitRouter = [
  {
    path: "/cockpit",
    redirect: "/cockpitWork",
    component: cockpitLayout,
    hidden: true,
    children: [
      {
        path: "/cockpitWork",
        component: () => import("@/views/cockpit/workSession.vue"),
      },
      // {
      //   path: "/cockpitInfo",
      //   name: 'infoSession',
      //   component: () => import("@/views/cockpit/infoSession.vue"),
      // },
    ],
  },
];

export default cockpitRouter;
