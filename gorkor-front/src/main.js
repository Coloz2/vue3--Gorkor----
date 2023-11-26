import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
//初始化样式
import "@/styles/main.scss";

//路由
import router from "./router/index";
app.use(router);
app.use(pinia);
app.mount("#app");
