import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//echart
// import echarts from "./echarts";
//router
import router from "./router";

const app = createApp(App);

// app.config.globalProperties.$echarts = echarts

app.use(ElementPlus);
app.use(router);
app.mount("#app");
