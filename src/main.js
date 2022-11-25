import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//router
import router from "./router";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
