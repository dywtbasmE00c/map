export const platformMenu = [
  {
    name: "名单管理",
    path: "/platformWork/roster-begin",
    authority: 2,
    children: [
      {
        name: "初筛名单",
        path: "/platformWork/roster-begin",
      },
      {
        name: "名单核定",
        path: "/platformWork/roster-confirm",
      },
      {
        name: "最终名单",
        path: "/platformWork/roster-final",
      },
      {
        name: "省核定核定",
        path: "/platformWork/roster-province",
      },
    ],
  },
  {
    name: "整治提升",
    path: "/platformWork/improvement",
    authority: 2,
  },
  {
    name: "结果评估",
    path: "/platformWork/result",
    authority: 2,
  },
  {
    name: "协同执法",
    path: "/platformWork/enforce",
    authority: 2,
  },
  {
    name: "多维分析",
    path: "/platformWork/analysis",
    authority: 2,
  },
  {
    name: "用户管理",
    path: "/platformWork/userManagement",
    authority: 1,
  },
];