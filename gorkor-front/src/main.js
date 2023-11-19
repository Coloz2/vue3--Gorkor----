import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

//初始化样式
import "@/styles/main.scss";

//路由
import router from "./router/index";
app.use(router);

app.mount("#app");
