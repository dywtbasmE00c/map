export const entList = [
  {
    label: "企业名称",
    prop: "entName",
    width: 200,
  },
  {
    label: "统一社会信用代码",
    prop: "creditCode",
    width: 240,
  },
  {
    label: "低效工作展开年份",
    prop: "dataYear",
    width: 160,
  },
  {
    label: "区域名",
    prop: "county",
    width: 120,
  },
  {
    label: "行业名",
    prop: "industryNameSimple",
    width: 280,
  },
  {
    label: "企业规模(0-规上，1-规下)",
    prop: "entRule",
    width: 200,
  },
  {
    label: "企业评价结果",
    prop: "entType",
    width: 120,
  },
  {
    label: "腾出用地面积（亩）",
    prop: "landAreaVacate",
    width: 160,
  },
  {
    label: "腾出用能（吨标煤）",
    prop: "allEnergyConsumeVacate",
    width: 160,
  },
  {
    label: "经度",
    prop: "longitude",
    width: 120,
  },
  {
    label: "纬度",
    prop: "latitude",
    width: 120,
  },
];

export const addFormItem = [
  {
    label: "企业名称",
    prop: "entName",
  },
  {
    label: "统一社会信用代码",
    prop: "creditCode",
  },
  {
    label: "低效工作展开年份",
    prop: "dataYear",
    children: [
      {
        childLabel: 2023,
        childValue: 2023,
      },
      {
        childLabel: 2022,
        childValue: 2022,
      },
      {
        childLabel: 2021,
        childValue: 2021,
      },
      {
        childLabel: 2020,
        childValue: 2020,
      },
    ],
  },
  {
    label: "区域名",
    prop: "county",
    children: [],
    childLabelKey: "county",
    childValueKey: "county",
  },
  {
    label: "行业名",
    prop: "code",
    children: [],
    childLabelKey: "industryName",
    childValueKey: "code",
  },
  {
    label: "企业规模(0-规上，1-规下)",
    prop: "entRule",
  },
  {
    label: "企业评价结果",
    prop: "entType",
    children: [
      {
        childLabel: "A",
        childValue: "A",
      },
      {
        childLabel: "B",
        childValue: "B",
      },
      {
        childLabel: "C",
        childValue: "C",
      },
      {
        childLabel: "D",
        childValue: "D",
      },
      {
        childLabel: "暂无评价",
        childValue: "暂无评价",
      },
    ],
  },
  {
    label: "腾出用地面积（亩）",
    prop: "landAreaVacate",
  },
  {
    label: "腾出用能（吨标煤）",
    prop: "allEnergyConsumeVacate",
  },
  {
    label: "经度",
    prop: "longitude",
  },
  {
    label: "纬度",
    prop: "latitude",
  },
];

export const addFormRules = {
  entName: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  creditCode: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  dataYear: [
    { required: true, message: "该字段不能为空", trigger: ["change"] },
  ],
  county: [{ required: true, message: "该字段不能为空", trigger: ["change"] }],
  code: [
    { required: true, message: "该字段不能为空", trigger: ["change"] },
  ],
  entRule: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
  ],
  entType: [{ required: true, message: "该字段不能为空", trigger: ["change"] }],
  latitude: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
    {
      pattern: /^[0-9]*$/,
      //pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确纬度（数字）",
    },
  ],
  longitude: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
    {
      pattern: /^[0-9]*$/,
      //pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确经度（数字）",
    },
  ],
  landAreaVacate: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
    {
      pattern: /^[0-9]*$/,
      //pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确纬度（数字）",
    },
  ],
  allEnergyConsumeVacate: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
    {
      pattern: /^[0-9]*$/,
      //pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确纬度（数字）",
    },
  ],
};