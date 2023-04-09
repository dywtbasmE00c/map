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
import store from "./store";

import request from "./Api/request";


const app = createApp(App);

// app.config.globalProperties.$echarts = echarts

app.use(ElementPlus);
app.config.globalProperties.$http = request;
request.defaults.baseURL = 'user_api'

app.use(router);
app.use(store);
app.mount("#app");
