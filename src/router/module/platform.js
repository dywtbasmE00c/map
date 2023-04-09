// cockpit
import platformLayout from "@/layout/platformLayout.vue";
const platformRouter = [
  {
    path: "/platform",
    redirect: "/platformWork",
    component: platformLayout,
    // component: () => import("@/views/platform/index.vue"),
    hidden: true,
    children: [
      {
        path: "/platformWork",
        name: "platformWork",
        redirect: "/platformWork/roster-begin",
        children: [
          {
            path: "/platformWork/roster-begin",
            name: "platformWork/roster-begin",
            component: () => import("@/views/platform/roster/roster-begin.vue"),
          },
          {
            path: "/platformWork/roster-confirm",
            name: "platformWork/roster-confirm",
            component: () =>
              import("@/views/platform/roster/roster-confirm.vue"),
          },
          {
            path: "/platformWork/roster-final",
            name: "platformWork/roster-final",
            component: () => import("@/views/platform/roster/roster-final.vue"),
          },
          {
            path: "/platformWork/roster-province",
            name: "platformWork/roster-province",
            component: () =>
              import("@/views/platform/roster/roster-province.vue"),
          },
        ],
        // component: () => import("@/views/platform/index.vue"),
      },
      {
        path: "/platformWork/improvement",
        name: "platformWork/improvement",
        component: () => import("@/views/platform/improvement.vue"),
      },
      {
        path: "/platformWork/result",
        name: "platformWork/result",
        component: () => import("@/views/platform/result.vue"),
      },
      {
        path: "/platformWork/enforce",
        name: "platformWork/enforce",
        component: () => import("@/views/platform/enforce.vue"),
      },
      {
        path: "/platformWork/analysis",
        name: "platformWork/analysis",
        component: () => import("@/views/platform/analysis.vue"),
      },
      {
        path: "/platformWork/userManagement",
        name: "platformWork/userManagement",
        component: () => import("@/views/platform/userManagement.vue"),
      },
    ],
  },
];

export default platformRouter;
